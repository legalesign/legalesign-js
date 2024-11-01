import { Legalesign } from "../Legalesign";
import { Statements } from "../statements/statements";
import { Template } from "../types";
import { Parameters } from "../Parameters";
import axios from "axios";
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
    _graphQLVariables?: string
  ): Promise<string> {
    console.log(graphQLQuery);
    await this.legalesign.setup();
      if (this.legalesign.accessToken) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, status } = await axios.post<any>(
          Parameters.endpoints.graphQL,
          graphQLQuery,
          {
            headers: {
              Authorization: this.legalesign.accessToken,
            },
          }
        );

        console.log(status, _graphQLVariables);

        return data;
      }

      return Promise.reject();
  }

  /**
   * Fetch a specific template and standard fields.
   *
   *  @returns a promise of a graphQL request
   */
  public async getTemplate(id: string): Promise<Template | string> {
    await this.legalesign.setup();

    const t: Template | string = await this.query(
      Statements.templateFetch,
      JSON.stringify({
        templateId: id,
      })
    );

    return t;
  }
}
