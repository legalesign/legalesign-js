/**
 * The Recipient object represents signers, witnesses and approvers that can receive a document.
 */
export interface Recipient {
  /**
   * Unique identifier for the group.
   */
  id?: string;

  /**
   * The name of the group.
   */

  name?: string;

  /**
   * The publc name of the group, used for external circulation.
   */
  email: string;

  /**
   * The phone number to communicate with the recipient (usually via SMS) E.164 number convention
   */
  phoneNumber?: string | null;

  /**
   * The preferred first name for the recipient
   */
  firstName: string | null;

  /**
   * The preferred last name for the recipient (mandatory)
   */
  lastName: string;

  /**
   * The role name that the recipient plays when looking at the document.
   */
  role?: string;

  /**
   * The role type in lowercase (signer, witness or approver).
   */
  roleType?: RoleType;

  /**
   * The status of the recipient processing the document.
   */
  status?: string;

  /**
   * The time zone of the recipient.
   */
  timeZone?: number;

  /**
   * The experience to use with the recipient.
   */
  experience?: string;

  /**
   * The expiry of the recipient.
   */
  expiryDate?: string;

  /**
   * Should this recipient be skipped.
   */
  skipped?: boolean;

  /**
   * Should this recipient nominate the next signer.
   */
  nominate?: boolean;

  /**
   * The date and time the invitation email was first opened
   */
  emailOpenedDateTime?: string;

  /**
   * The date and time the document was first viewed
   */
  documentFirstViewedDateTime?: string;

  /**
   * The date and time the document was signed
   */
  signedDateTime?: string;

  /**
   *  The date and time the document was sent
   */
  sentDateTime?: string;

  /**
   *  The problem description if email delivery has issues
   */
  emailProblem?: string;

  /**
   *  The collection of fields on this signer may have completed
   */
  elementConnection?: [string, unknown];

  /**
   *  The reminder schedule to be used for this recipient.
   */
  schedule?: [string, unknown];
}

export type RoleType = "signer" | "witness" | "approver";
