
/**
 * The Group object can represent departments, users of similar role types in an organisation or common interest users from different organisations.
 */
export interface Field {
  /**
   * Unique identifier for the field.
   */
	id: string;

	/**
   * String representing the object's type. Objects of the same type share the same value.
   */
	   object: 'field';


	/**
	 *  A value or preset value if known
	 */
	value: String;

	/**
	 *  A label string to display
	 */
	label: String

	/**
	 *  The index of the signer for this field
	 */
	signer: number

	/**
	 *  The type of this field ()
	 */
	elementType: string; // TODO :: ElementType

}