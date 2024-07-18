import { Legalesign } from "../legalesign";
import { Statements } from "../statements/statements";
import { LEObject } from "./LEObject";
import { Role } from "./Role";

type PageDimension = {
  height: number;
  width: number;
};

/**
 * The Template object used to easily fetch and handle template information.
 */
export class Template extends LEObject {
  public id: string;
  public title: string;
  // public pageCount: number | undefined;
  // public pageDimensions: [PageDimension] | undefined;
  // public fileName: string | undefined;
  public link: string;
  // public autoArchive: boolean | undefined;
  // public valid: boolean | undefined;
  // public locked: boolean | undefined;
  // public tags: [string];
  // public groupId: string;
  // public status: string;
  // public roles: [Role];
  // public canOpenSign: boolean;
  // public createdBy: string;
  // public created: Date;
  // public modified: Date;

  constructor(id: string, legalesign: Legalesign) {
    super(id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = legalesign.selector.query(Statements.templateFetch, {
      templateId: id
    });

    this.id = t?.id;
    this.title = t?.title;
    this.link = t?.link;
  }
}
