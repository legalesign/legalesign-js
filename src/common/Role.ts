import { Legalesign } from "../Legalesign";
import { Statements } from "../statements/statements";
import { LEObject } from "./LEObject";

/**
 * The Template object used to easily fetch and handle template information.
 */
export class Role extends LEObject {
  public id: string;
  public title: string;
  public created: Date | undefined;
  public modified: Date | undefined;

  constructor(id: string, legalesign: Legalesign) {
    super(id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = legalesign.selector.query(
      Statements.templateFetch,
      JSON.stringify({
        templateId: id,
      })
    );

    this.id = t?.id;
    this.title = t?.title;
  }
}
