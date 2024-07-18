import { Legalesign } from "../Legalesign";
import { Variables } from "graphql-request";
import { Statements } from "../statements/statements";
import { Template } from "../../types";
/**
 * Send GraphQL queries to the API and return the results as JSON.
 *
 */
export class Selector {
  legalesign: Legalesign;
  result: string | undefined;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }

  /**
   * Run a general query or mutation against the GraphQL API.
   *
   *  @returns a promise of a graphQL request
   */
  public async query(
    graphQLQuery: string,
    graphQLVariables?: Variables
  ): Promise<string> {
    await this.legalesign.setup();

    if (this.legalesign.client)
      return await this.legalesign.client.request(
        graphQLQuery,
        typeof graphQLVariables === "undefined" ? {} : graphQLVariables
      );

    return Promise.reject();
  }

  /**
   * Fetch a specific template and standard fields.
   *
   *  @returns a promise of a graphQL request
   */
  public async getTemplate(id: string): Promise<Template | string> {
    await this.legalesign.setup();

    const t: Template | string = await this.query(Statements.templateFetch, {
      templateId: id,
    });

    return t;
  }
}
