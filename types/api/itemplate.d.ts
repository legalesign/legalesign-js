import { IGroup } from "./igroup";

/**
 * The Document object.
 */
export interface ITemplate {
  /**
   * Unique identifier for the document.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "template";

  /**
   * The title of a document that has been sent to one or more signers.
   */
  name: string | null;

  /**
   * A short lease url for downloading or streaming the document.
   */
  link: string | null;

  /**
   * City/District/Suburb/Town/Village.
   */
  status: string;

  /**
   * The group object associated (currently) with this document.
   */
  group: IGroup;
}
