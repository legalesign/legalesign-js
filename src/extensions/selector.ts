import { Legalesign } from "../legalesign";
import { Variables } from "graphql-request";

/**
 * Send GraphQL queries to the API and return the results as JSON.
 *
 */
export class Selector {
  legalesign: Legalesign;
  result: string;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }

      /**
   * Run a query or mutation against the API.
   *
   */
  public async query(graphQLQuery: string, graphQLVariables?: Variables): Promise<string> {
    await this.legalesign.setup();

    return await this.legalesign.client.request(graphQLQuery, typeof(graphQLVariables) === 'undefined' ? {} : graphQLVariables );
  }
}
