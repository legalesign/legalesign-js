import { Legalesign } from "../Legalesign";
import { Statements } from "../statements/statements";

type createRecipientInput = {
  firstName: string;
  lastName: string;
  email: string;
};
/**
 * The Template object used to easily fetch and handle template information.
 */
export class Recipient {
  public id: string | undefined;
  public email: string;
  public firstName: string;
  public lastName: string;
  public created: Date | undefined;
  public modified: Date | undefined;
  public roleId: string | undefined;

  constructor(input: string | createRecipientInput, legalesign: Legalesign) {
    if (typeof input === "string") {
 
      this.id = input;
      // This is an existing recipient fetch its details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t: any = legalesign.selector.query(Statements.templateFetch, {
        templateId: input
      });

      this.email = t?.data.recipient.email;
      this.firstName = t?.data.recipient.firstName;
      this.lastName = t?.data.recipient.lastName;
    } else {
  
      this.email = input.email;
      this.firstName = input.firstName;
      this.lastName = input.lastName;
    }
  }
}
