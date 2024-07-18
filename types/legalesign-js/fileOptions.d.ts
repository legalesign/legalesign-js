/**
 * All the settings for a file to be uploaded to Legalesign storage, note that these will be type and virus checked
 * in clearing, so it is best to make file transations asynchronous.
 */

export interface FileOptions {
  /**
   *  The local path to the file you want to upload
   */
  path: string;

  /**
   *  The title to give the newly created file
   */
  fileName: string;

  /**
   *  The types of document that can be stored on the platform
   */
  fileType: "templates" | "drafts" | "logo";
}
