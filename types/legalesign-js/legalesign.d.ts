import * as api from "../api";

export interface Legalesign {
  /////////////////////////////
  /// The start point for all actions on the Legalesign SDK
  /////////////////////////////

  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  send(options?: object): string;
}

/**
 * Use `Legalesign(publishableKey, options?)` to create an instance of the `Legalesign` object.
 * The Legalesign object is your entrypoint to the rest of the Legalesign.js SDK.
 *
 * Your Legalesign publishable [API key] is required when calling this function, as it identifies you to Legalesign.
 *
 * When you’re ready to send documents, replace the test key with your live key in production.
 */
export interface LegalesignConstructor {
  (
    /**
     * Your publishable key.
     */
    publishableKey: string,

    /**
     * Initialization options.
     */
    options?: LegalesignConstructorOptions
  ): Legalesign;
}

export interface LegalesignConstructorOptions {
  /**
   * Specifying a connected account ID (e.g., `acct_24BFMpJ1svR5A89k`) allows you to send documents on behalf of that account.
   */
  legalesignAccount?: string;

  /**
   * Override your account's [API version](https://legalesign.com/docs/api/versioning).
   */
  apiVersion?: string;
}

export type LegalesignErrorType =
  /**
   * Failure to connect to Legalesign's API.
   */
  | "api_connection_error"

  /**
   * API errors cover any other type of problem (e.g., a temporary problem with Legalesign's servers), and are extremely uncommon.
   */
  | "api_error"

  /**
   * Failure to properly authenticate yourself in the request.
   */
  | "authentication_error"

  /**
   * Idempotency errors occur when an `Idempotency-Key` is re-used on a request that does not match the first request's API endpoint and parameters.
   */
  | "idempotency_error"

  /**
   * Invalid request errors arise when your request has invalid parameters.
   */
  | "invalid_request_error"

  /**
   * Too many requests hit the API too quickly.
   */
  | "rate_limit_error"

  /**
   * Errors triggered by our client-side libraries when failing to validate fields (e.g., when a card number or expiration date is invalid or incomplete).
   */
  | "validation_error";

export interface LegalesignError {
  /**
   * The type of error.
   */
  type: LegalesignErrorType;

  /**
   * For card errors, the ID of the failed charge
   */
  charge?: string;

  /**
   * For some errors that could be handled programmatically, a short string indicating the [error code] reported.
   */
  code?: string;

  /**
   * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
   */
  message?: string;

  /**
   * If the error is parameter-specific, the parameter related to the error.
   * For example, you can use this to display a message near the correct form field.
   */
  param?: string;

  /**
   * The `Source` object for errors returned on a request involving a `Source`.
   */
  source?: string;
}
