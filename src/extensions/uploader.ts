import { FileOptions } from "../../types/legalesign-js";
import { Parameters } from "../parameters";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";

/**
 * Send and track all kinds of files to be used inside the legalesign platform
 * including templates, drafts, images for logos and emails.
 * 
 * This class performs a stateful single upload with the fileOptions given
 * in the constructor.
 *
 */
export class Uploader {
  fileOptions: FileOptions;
  result: string;

  constructor(fileOptions: FileOptions) {
    this.fileOptions = fileOptions;
  }

  /**
   * Upload one of the specific file types for use by Legalesign.
   *
   */
  public async upload(userId: string): Promise<boolean> {
    try {      
      const s3 = new S3Client({ region: "eu-west-2" });

      const command = new PutObjectCommand({
        Bucket: Parameters.buckets.clearing,
        Key: `${this.fileOptions.fileType}/${userId}/${
          this.fileOptions.fileName
        }`,
        Body: fs.readFileSync(this.fileOptions.path, "utf8"),
      });

      await s3.send(command);

      return true;
    } catch (e) {
      return e;
    }
  }
}
