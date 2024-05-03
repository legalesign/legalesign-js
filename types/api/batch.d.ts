import { Group } from "./group";
import { User } from "./user";

/**
 * The Document object.
 */
export interface Batch {
  /**
   * Unique identifier for the document.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "batch";

  /**
   * The title of a document that has been sent to one or more signers.
   */
  name: string | null;

  /**
   * Should the documents in the batch be sent to signers in a particular order.
   */
  enforceOrder: string | null;

  /**
   * A collection of documents within this batch.
   */
  documentConnection: string;

  /**
   * The group object associated (currently) with this document.
   */
  group: Group;

  /**
   * The group object associated (currently) with this document.
   */
  creator: User;

  /**
   * The unique identifier of the process that created this batch.
   */
  requestId: String

  /**
   * The ISO 8601 date format of the time that this resource was created.
   */
  created: Date

  /**
   * The ISO 8601 date format of the time that this resource was modified.
   */
  modified: Date


}
