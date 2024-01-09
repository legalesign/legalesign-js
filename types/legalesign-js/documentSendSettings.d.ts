import * as api from '../api';

/**
 * All the permissible settings for an invidual document to be sent
 */ 
export interface DocumentSendSettingsInput {
	/**
	 *  The title to give the newly created document
	 */
	title: string
	/**
	 *  The group whose settings will be used to process this document (and reported in)
	 */
	groupId: string;

	/**
	 *  The template originally used (if any)
	 */
	templateId: string | null;
	/** 
	 * The list of Recipients for the document.
	 */
	recipients: [Recipient]
	
	/**
	 * All the values to fill in on the signer fields
	 */
	participantFields: [Field]

	/**
	 * All the values to fill in on the sender fields
	 */
	senderFields: [Field]

	/**
	 * Allow copying of the final document
	 */
	allowCopying: boolean | false;
	

	/**
	 * Allow printing of the final document
	 */
	allowPrinting: boolean | false;
	
	/**
	 * The tag to apply to the final document in the Legalesign system
	 */
	tag: string;
	
	/**
	 * Determines if the recipients will be sent in order or all at the same time
	 */
	sequentialSigning: boolean | false;
}