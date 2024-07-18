import { FileOptions } from "../../types/legalesign-js";
import { Legalesign } from "../Legalesign";
import { Parameters } from "../parameters";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { v4 as uuid } from "uuid";

/**
 * Send and track all kinds of files to be used inside the legalesign platform
 * including templates, drafts, images for logos and emails.
 *
 * This class performs a stateless upload with the fileOptions given
 * in the constructor.
 *
 * This class should be called via the Legalesign core object, i.e
 *      const legalesign = new Legalesign({params});
 *
 *      await legalesign.uploader.upload( {fileOptions} )
 *
 */
export class Uploader {
  legalesign: Legalesign;
  result: string;

  constructor(legalesign: Legalesign) {
    this.legalesign = legalesign;
  }

  /**
   *
   * @description Upload one of the specific file types for use by Legalesign.
   *
   * @returns a generated UUID used to identify the draft JSON file
   *
   */
  public async upload(fileOptions: FileOptions): Promise<string | null> {
    try {
      // Ensure we're connected.
      await this.legalesign.setup();

      const s3 = await new S3Client({ region: "eu-west-2" });

      const uniqueFileId = await uuid().toString();

      const command = new PutObjectCommand({
        Bucket: Parameters.buckets.clearing,
        Key: `${fileOptions.fileType}/${this.legalesign.userInformation.id}/${uniqueFileId}.json`,
        Body: fs.readFileSync(fileOptions.path, "utf8")
      });

      await s3.send(command);
      console.log(uniqueFileId);

      // return the newly create UUID for the draft
      return uniqueFileId;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
