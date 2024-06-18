import {   SendOptions } from "../../types/legalesign-js";
import { Recipient } from "../common/Recipient";
import { Legalesign } from "../legalesign";
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
  result: string;

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
  
        await this.legalesign.client.request(mut);
  
        return true;
      } catch (e) {
        return false;
      }
    }

    // Fill in recipient roles assuming the correct order if not populated
    fillRecipientRoles = (sendOptions) => {

      const filledRecipients = sendOptions.recipients.map((r: Recipient) => r.roleId ? this.fetchRole(r) : r )

      return {...sendOptions, recipients: filledRecipients};

    }

    fetchRole = (r: Recipient) => {
      const jsonResult = this.legalesign.selector.query(`query GetTemplate {
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
      }`, { id: r.roleId} );

    expect(jsonResult).toHaveProperty("user");
    }

}
