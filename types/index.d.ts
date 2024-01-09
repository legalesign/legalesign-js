import {LegalesignConstructor, LegalesignConstructorOptions, Legalesign} from './legalesign-js';
export * from './legalesign-js';
export const loadStripe: (
  publishableKey: string,
  options?: LegalesignConstructorOptions | undefined
) => Promise<Legalesign | null>;

declare global {
  interface Window {
    // Stripe.js must be loaded directly from https://js.stripe.com/v3, which
    // places a `Stripe` object on the window
    Stripe?: LegalesignConstructor;
  }
}