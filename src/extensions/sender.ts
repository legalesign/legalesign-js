import { SendOptions } from "../../types/legalesign-js";
import { Recipient } from "../common/Recipient";
import { Legalesign } from "../Legalesign";
import { parseSingleSend } from "../sendParser";

/**
 * Send and track all document on legalesign platform
 * including single, bulk and batch documents. This class should be called via the Legalesign core object.
 *
 * @example
 *
 *      const legalesign = new Legalesign({params});
 *
 *      await legalesign.sender.send( {sendOptions} )
 *
 */
export class Sender {
  legalesign: Legalesign;
  result: string | undefined;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }

  /**
   *
   * @description Send a single document via Legalesign.
   *
   * @returns boolean
   *
   */
  async send(sendOptions: SendOptions): Promise<boolean> {
    await this.legalesign.setup();
    try {
      this.fillRecipientRoles(sendOptions);

      const mut = parseSingleSend(sendOptions);

      if (this.legalesign.client) {
        await this.legalesign.client.request(mut);
      return true;
      } 
      
      return false;
    } catch (e) {
      return false;
    }
  }

  // Fill in recipient roles assuming the correct order if not populated
  fillRecipientRoles = (sendOptions: SendOptions) => {
    const filledRecipients = sendOptions.recipients.map((r: Recipient) =>
      r.roleId ? this.fetchRole(r) : r
    );

    return { ...sendOptions, recipients: filledRecipients };
  };

  fetchRole = (r: Recipient) => {
    return this.legalesign.selector.query(
      `query GetTemplate {
        user {
          id
          name
          email
          memberConnection {
            groupMembers {
              id
              name
              group {
                id
                name
              }
            }
          }
        }
      }`,
      { id: r.roleId }
    );

  };
}
