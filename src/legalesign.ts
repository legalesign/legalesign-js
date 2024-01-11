import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
  SendOptions
} from "../types/legalesign-js";

export class Legalesign {
  options: LegalesignConstructorOptions | undefined;
  organisationId: string;

  /////////////////////////////
  /// The start point for all actions on the Legalesign SDK
  /////////////////////////////
  constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;
  }
  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  send(sendOptions?: SendOptions): boolean {
    if (sendOptions?.groupId) return true;

    return false;
  }

  /**
   * Return true if the security connection for this object is valid.
   *
   */
  isConnected(): boolean {
    if (this.organisationId) return true;

    return false;
  }
}
