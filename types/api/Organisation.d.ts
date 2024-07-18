export type Organisation = {
  /**
   * Unique identifier for the group.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "organisation";

  /**
   * The name of the group.
   */

  name: string;
}
