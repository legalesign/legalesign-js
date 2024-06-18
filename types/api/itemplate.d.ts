/**
 * The Document object.
 */
export interface ITemplate {
  /**
   * Unique identifier for the document.
   */
  id: string;

  /**
   * The title of a template.
   */
  title: string | null;

  /**
   * A short lease url for downloading or streaming the template PDF.
   */
  link: string | null;

  /**
   * valid or invalid status.
   */
  status: string;

}
