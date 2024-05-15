/**
 * All the settings for a file to be uploaded to Legalesign storage
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
     *  The title to give the newly created document
     */
     fileType: "TEMPLATE" | "DRAFT" | "";
  
  }