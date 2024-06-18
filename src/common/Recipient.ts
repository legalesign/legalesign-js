import { Legalesign } from "../legalesign";
import { Statements } from "../statements/statements";
import { LEObject } from "./LEObject"; 

/**
 * The Template object used to easily fetch and handle template information.
 */
export class Recipient extends LEObject{
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public created: Date
  public modified: Date
  public roleId: string

  constructor(id: string, legalesign: Legalesign) {
    super(id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t:any = legalesign.selector.query(Statements.templateFetch, { templateId: id });

    this.id = t?.id;
    this.email = t?.email;

  }
  


}
