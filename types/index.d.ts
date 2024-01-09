import {LegalesignConstructor, LegalesignConstructorOptions, Legalesign} from './legalesign-js';
export * from './legalesign-js';
export const loadStripe: (
  publishableKey: string,
  options?: LegalesignConstructorOptions | undefined
) => Promise<Legalesign | null>;

declare global {
  interface Window {
    // Legalesign.js must be loaded directly from https://js.legalesign.com/, which
    // places a `Legalesign` object on the window
    Stripe?: LegalesignConstructor;
  }
}