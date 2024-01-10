import { Organisation } from "./organisation";

/**
 * The Group object can represent departments, users of similar role types in an organisation or common interest users from different organisations.
 */
export interface Group {
  /**
   * Unique identifier for the group.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "group";

  /**
   * The organisation to which owns and can administer this group.
   */
  organisation: Organisation;

  /**
   * The name of the group.
   */

  name: string;

  /**
   * The publc name of the group, used for external circulation.
   */
  publicName: string | null;

  /**
   *  All users that have been enrolled in this group.
   */
  // memberConnection(
  // 	first: Int,
  // 	after: ID,
  // 	last: Int,
  // 	before: ID
  // ): GroupMemberConnection

  /**
   * The contacts that this group has saved for reuse.
   */
  // contactConnection(
  // 	first: Int,
  // 	after: ID,
  // 	last: Int,
  // 	before: ID,
  // 	filter: AWSJSON
  // ): ContactConnection
  /** The draft documents this user has prepared.
	draftConnection: DraftConnection
	/** The retention period in days of attachments.
	attachmentRetention: Int!
	/** The retention period in days of PDFs.
	pdfRetention: Int!
	/** The retention period in days of other group items and data.
	retention: Int!
	/** The retention period in days of text files.
	textRetention: Int!
	/** Is this group for API integration?
	apiIntegration: Boolean
	/** The style to use for this group
	style: AWSJSON
	/** Allows a signature for non-certifcation purposes. (4 == certification. , defaults to 4)
	certifySignature: Int
	/** Don't present printable PDF
	stopPDFPrinting: Boolean
	/** Don't allow copying PDF
	stopPDFCopying: Boolean
	/** Appends an audit log to the signed PDF
	appendAuditLog: Boolean
	/** Appends Legalesign and signer information to the end of the PDF
	appendAdditionalSignerInfo: Boolean
	/** Password protection for PDF. (0 = no password, 1 = password kept for future, 2 = password deleted after signing)
	passwordType: Int
	/** Password used to protect the final PDF.
	pdfPassword: String
	/** The number of licenses remaining for this group.
	licensesRemaining: Int
	/** The active cloud storage connection that transfers completed documents into this groups nominated cloud store.
	cloudStore: CloudStore
	/** A JSON structure of the domains that should receive plain text (1) or stripped HTML (2) emails
	emailDomainSettings: AWSJSON
	/** The ID of the user who owns this group
	owner: ID
	/** The number of send credits this group has
	credit: Int
	/** The different experiences for the recipient of a template/document, e.g. language settings.
	experienceConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID
	): ExperienceConnection
	/** The active templates for this group.
	templateConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID,
		archived: Boolean = false
	): TemplateConnection
	/** The active documents for this group.
	documentConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID,
		from: AWSDateTime,
		to: AWSDateTime,
		email: String,
		archived: Boolean = false
	): DocumentConnection
	/** The invitation issued for this group.
	invitationConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID
	): InvitationConnection
	/** The standard messages this group has saved for reuse.
	standardMessageConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID
	): StandardMessageConnection
	/** The schedules this group uses.
	scheduleConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID
	): ScheduleConnection
	/** The attachments this group uses.
	attachmentConnection(
		first: Int,
		after: ID,
		last: Int,
		before: ID
	): AttachmentConnection
	/** Provides the group administrator with reporting data of the type specified in a date band.
	reportData(start: AWSDateTime!, end: AWSDateTime!, reportType: ReportType = SIGNINGTIME): AWSJSON
    */
}
