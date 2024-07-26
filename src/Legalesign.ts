import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
} from "./types/legalesign-js";
import axios from "axios";
import { getAccessToken } from "./Tokenizer";
import { Parameters } from "./Parameters";
import { Statements } from "./statements/statements";
import { Uploader, Selector, Sender, Factory } from "./extensions";

// Basic information loaded immediately after the Graph QL is set up.
type UserInformation = { id: string; email: string };

///////////////////////////////////////////////////////////////
/// The start point for all actions on the Legalesign SDK
///////////////////////////////////////////////////////////////
class Legalesign {
  protected options: LegalesignConstructorOptions;
  public accessToken: undefined | string;
  public organisationId: string;
  public userInformation: UserInformation | undefined;

  // Class extensions
  public uploader: Uploader;
  public selector: Selector;
  public sender: Sender;
  public factory: Factory;

  public constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;

    // Add the action classes as publicly accessible members
    this.uploader = new Uploader(this);
    this.selector = new Selector(this);
    this.sender = new Sender(this);
    this.factory = new Factory(this);
  }

  /**
   * Ensures that the api controller is connected and we know the
   * current users credentials.
   *
   */
  public async setup(): Promise<void> {
    if (!this.accessToken) {
      this.accessToken = await getAccessToken(
        this.options.apiUser,
        this.options.apiPassword
      );

      // Get the essential user details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userInfo = await axios.post<any>(
        Parameters.endpoints.graphQL,
        Statements.userInformation,
        {
          headers: {
            Authorization: this.accessToken,
          },
        }
      );

      //if ("user" in userInfo) this.userInformation = userInfo?.user;
      console.log(userInfo);
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

export { Legalesign };
export default Legalesign;
