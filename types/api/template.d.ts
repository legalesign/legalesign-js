import { Group } from "./group";

/**
 * The Document object.
 */
export interface Template {
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
  name: String | null;

  /**
   * A short lease url for downloading or streaming the document.
   */
  link: String | null;

  /**
   * City/District/Suburb/Town/Village.
   */
  status: String;

  /**
   * The group object associated (currently) with this document.
   */
  group: Group;
}
