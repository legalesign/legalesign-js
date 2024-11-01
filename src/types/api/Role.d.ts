/**
 * The Document object.
 */
export type Role = {
  /**
   * Unique identifier for the document.
   */
  id: string;

  /**
   * The title of this role (i.e. Tenant).
   */
  title: string | null;

  /**
   * ISO date of creation.
   */
  created: string | null;

  /**
   * ISO date of modification.
   */
  modified: string;
};
