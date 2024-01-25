import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
  SendOptions
} from "../types/legalesign-js";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./tokenizer";

/////////////////////////////
/// The start point for all actions on the Legalesign SDK
/////////////////////////////
export class Legalesign {
  options: LegalesignConstructorOptions;
  organisationId: string;
  client: GraphQLClient;

  constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;
  }

  async setup(): Promise<void> {
    if (!this.client) {
      this.client = new GraphQLClient(
        "https://k2howlr3ynfy3lbx7oxz4qyrlq.appsync-api.eu-west-2.amazonaws.com/graphql",
        {
          headers: {
            Authorization: await getAccessToken(
              this.options.apiUser,
              this.options.apiPassword
            )
          }
        }
      );
    }
  }

  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  async send(sendOptions?: SendOptions): Promise<boolean> {
    if (sendOptions?.groupId) return true;

    return false;
  }

  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  async query(graphQLQuery: string): Promise<string> {
    await this.setup();

    return await this.client.request(graphQLQuery);
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
