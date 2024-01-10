import { Legalesign, LegalesignConstructor } from "../types";

export type LoadLegalesign = (
  ...args: Parameters<LegalesignConstructor>
) => Promise<Legalesign | null>;

export interface LoadParams {
  advancedFraudSignals: boolean;
}

// `_VERSION` will be rewritten by `@rollup/plugin-replace` as a string literal
// containing the package.json version
declare const _VERSION: string;

const V3_URL = "https://js.legalesign.com/v3";
const V3_URL_REGEX = /^https:\/\/js\.legalesign\.com\/v3\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE =
  "loadStripe.setLoadParameters was called but an existing Legalesign.js script already exists in the document; existing script parameters will be used";

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${V3_URL}"]`
  );

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

const injectScript = (params: null | LoadParams): HTMLScriptElement => {
  const queryString =
    params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  const script = document.createElement("script");
  script.src = `${V3_URL}${queryString}`;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      "Expected document.body not to be null. Legalesign.js requires a <body> element."
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (legalesign: any, startTime: number): void => {
  if (!legalesign || !legalesign._registerWrapper) {
    return;
  }

  legalesign._registerWrapper({
    name: "legalesign-js",
    version: _VERSION,
    startTime
  });
};

let stripePromise: Promise<LegalesignConstructor | null> | null = null;

let onErrorListener: (() => void) | null = null;
let onLoadListener: (() => void) | null = null;

const onError = (reject: (reason?: any) => void) => () => {
  reject(new Error("Failed to load Legalesign.js"));
};

const onLoad = (
  resolve: (
    value:
      | LegalesignConstructor
      | PromiseLike<LegalesignConstructor | null>
      | null
  ) => void,
  reject: (reason?: any) => void
) => () => {
  if (window.Legalesign) {
    resolve(window.Legalesign);
  } else {
    reject(new Error("Legalesign.js not available"));
  }
};

export const loadScript = (
  params: null | LoadParams
): Promise<LegalesignConstructor | null> => {
  // Ensure that we only attempt to load Stripe.js at most once
  if (legalesignPromise !== null) {
    return legalesignPromise;
  }

  legalesignPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Legalesign && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Legalesign) {
      resolve(window.Legalesign);
      return;
    }

    try {
      let script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (
        script &&
        onLoadListener !== null &&
        onErrorListener !== null
      ) {
        // remove event listeners
        script.removeEventListener("load", onLoadListener);
        script.removeEventListener("error", onErrorListener);

        // if script exists, but we are reloading due to an error,
        // reload script to trigger 'load' event
        script.parentNode?.removeChild(script);
        script = injectScript(params);
      }

      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener("load", onLoadListener);

      script.addEventListener("error", onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  // Resets stripePromise on error
  return legalesignPromise.catch(error => {
    legalesignPromise = null;
    return Promise.reject(error);
  });
};

export const initLegalesign = (
  maybeLegalesign: LegalesignConstructor | null,
  args: Parameters<LegalesignConstructor>,
  startTime: number
): Legalesign | null => {
  if (maybeLegalesign === null) {
    return null;
  }

  const stripe = maybeLegalesign.apply(undefined, args);
  registerWrapper(legalesign, startTime);
  return legalesign;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateLoadParams = (params: any): LoadParams => {
  const errorMessage = `invalid load parameters; expected object of shape

    {advancedFraudSignals: boolean}

but received

    ${JSON.stringify(params)}
`;

  if (params === null || typeof params !== "object") {
    throw new Error(errorMessage);
  }

  if (
    Object.keys(params).length === 1 &&
    typeof params.advancedFraudSignals === "boolean"
  ) {
    return params;
  }

  throw new Error(errorMessage);
};
