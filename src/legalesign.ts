import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
} from "../types/legalesign-js";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./tokenizer";
import { Parameters } from "./parameters";
import { Statements } from "./statements/statements";
import { Uploader, Selector, Sender } from "./extensions";

// Basic information loaded immediately after the Graph QL is set up.
type UserInformation = { id: string; email: string };

///////////////////////////////////////////////////////////////
/// The start point for all actions on the Legalesign SDK
///////////////////////////////////////////////////////////////
export class Legalesign {
  protected options: LegalesignConstructorOptions;
  private accessToken: undefined | string;
  public organisationId: string;
  public client: GraphQLClient;
  public userInformation: UserInformation;
  
  // Class extensions
  public uploader: Uploader;
  public selector: Selector;
  public sender: Sender;


  constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;

    // Add the action classes as publicly accessible members
    this.uploader = new Uploader(this);
    this.selector = new Selector(this);
    this.sender = new Sender(this);
  }

  /**
   * Ensures that the api controller is connected and we know the
   * current users credentials.
   *
   */
  public async setup(): Promise<void> {
    if (!this.client) {
      this.accessToken = await getAccessToken(
        this.options.apiUser,
        this.options.apiPassword
      )

      this.client = new GraphQLClient(Parameters.endpoints.graphQL, {
        headers: {
          Authorization: this.accessToken,
        },
      });

      // Get the essential user details
      const userInfo = await this.client.request(Statements.userInformation);
      if ("user" in userInfo) this.userInformation = userInfo?.user;
    }
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
