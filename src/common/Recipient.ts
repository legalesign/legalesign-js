import { Legalesign } from "../legalesign";
import { Statements } from "../statements/statements";
import { LEObject } from "./LEObject";

type createRecipientInput = {
  firstName: string;
  lastName: string;
  email: string;
};
/**
 * The Template object used to easily fetch and handle template information.
 */
export class Recipient extends LEObject {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public created: Date;
  public modified: Date;
  public roleId: string;

  constructor(input: string | createRecipientInput, legalesign: Legalesign) {
    if (typeof input === "string") {
      super(input);
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
      super(null);
      this.email = input.email;
      this.firstName = input.firstName;
      this.lastName = input.lastName;
    }
  }
}
