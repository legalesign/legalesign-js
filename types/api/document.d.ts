import { IGroup } from "./igroup";
import { ITemplate } from "./itemplate";

/**
 * The Document object.
 */
export interface Document {
  /**
   * Unique identifier for the document.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "document";

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

  /**
   * The whole template object that the document was made from.
   */
  template: ITemplate;

  /**
   * The ID of template that the document was made from (this is for more efficient mass document queries).
   */
  sourceTemplateId: string;

  /**
   * The ISO 8601 date format of the time that this resource was created.
   */
  created: string;
  /**
   * The ISO 8601 date format of the time that this resource was modified.
   */
  modified: string;

  /**
   * The participants that received this document (if any)
   */
  recipients: [object];

  /**
   * The audit log for this document (if any)
   */

  auditLog: [object];

  /**
   * The name of the sender
   */
  senderName: string;

  /**
   * The email of the sender
   */
  senderEmail: string;

  /**
   * The unique identifier of the process that created this document
   */
  taskId: string;
}
