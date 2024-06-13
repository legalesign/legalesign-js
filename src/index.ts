import { LegalesignConstructor } from "../types";
import { loadScript, initLegalesign, LoadLegalesign } from "./shared";

let legalesignPromise: Promise<LegalesignConstructor | null> | null;
let loadCalled = false;

const getLegalesignPromise: () => Promise<LegalesignConstructor | null> = () => {
  if (legalesignPromise) {
    return legalesignPromise;
  }

  legalesignPromise = loadScript(null).catch(error => {
    // clear cache on error
    legalesignPromise = null;
    return Promise.reject(error);
  });
  return legalesignPromise;
};

// Execute our own script injection after a tick to give users time to do their
// own script injection.
Promise.resolve()
  .then(() => getLegalesignPromise())
  .catch(error => {
    if (!loadCalled) {
      console.warn(error);
    }
  });

export const loadLegalesign: LoadLegalesign = (...args) => {
  loadCalled = true;
  const startTime = Date.now();

  // if previous attempts are unsuccessful, will re-load script
  return getLegalesignPromise().then(maybeLegalesign =>
    initLegalesign(maybeLegalesign, args, startTime)
  );
};

declare global {
  interface Window {
    // Legalesign.js must be loaded directly from https://js.legalesign.com/v3, which
    // places a `Legalesign` object on the window
    Legalesign?: LegalesignConstructor;
  }
}
