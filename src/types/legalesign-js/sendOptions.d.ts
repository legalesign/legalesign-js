import type { Field, Template, Recipient } from "../api/";

/**
 * All valid options for a single document send action.
 */

export interface SendOptions {
  /**
   *  The title to give the newly created document
   */
  title: string;

  /**
   *  The group UUID whose settings will be used to process this document (and reported in)
   */
  groupId: string;

  /**
   *  The template UUID originally used (if any), if not supplied you must pass HTML.
   */
  templateId: string | Template | null;

  /**
   * The list of Recipients for the document, you must provide at least 1 recipient.
   */
  recipients: [Recipient];

  /**
   * (optional) All the values to fill in on the signer fields (if any).
   */
  participantFields?: [Field] | null;

  /**
   * (optional) All the values to fill in on the sender fields (if any).
   */
  senderFields?: [Field] | null;

  /**
   * Allow copying of the final document
   */
  allowCopying?: boolean;

  /**
   * Allow printing of the final document
   */
  allowPrinting?: boolean;

  /**
   * (optional) The tag to apply to the final document in the Legalesign system
   */
  tag?: string | null;

  /**
   * Determines if the recipients will be sent in order or all at the same time
   */
  sequentialSigning?: boolean;
}
