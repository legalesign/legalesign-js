import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
  SendOptions,
  FileOptions
} from "../types/legalesign-js";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./tokenizer";
import { parseSingleSend } from "./sendParser";
import { S3Client, ListBucketsCommand, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import *  as fs from 'fs';

/////////////////////////////
/// The start point for all actions on the Legalesign SDK
/////////////////////////////
export class Legalesign {
  options: LegalesignConstructorOptions;
  organisationId: string;
  client: GraphQLClient;

  constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;
  }

  async setup(): Promise<void> {
    if (!this.client) {
      this.client = new GraphQLClient(
        "https://k2howlr3ynfy3lbx7oxz4qyrlq.appsync-api.eu-west-2.amazonaws.com/graphql",
        {
          headers: {
            Authorization: await getAccessToken(
              this.options.apiUser,
              this.options.apiPassword
            )
          }
        }
      );
    }
  }

  /**
   * Send one or more templates with recipients to the Legalesign API to be distributed and signed.
   *
   */
  async send(sendOptions: SendOptions): Promise<any> {
    await this.setup();
    try {
      const mut = parseSingleSend(sendOptions);
      
      const response = await this.client.request(mut);
      return response;
    } catch (e) {
      return e;
    }
  }

  /**
   * Upload one of the specific file types for use by Legalesign.
   *
   */
    async upload(fileOptions: FileOptions): Promise<any> {
      await this.setup();
      try {
        // a client can be shared by different commands.
        const client = new S3Client({ region: "eu-west-2" });

        const params = {
          /** input parameters */
        };
        
        const command = new PutObjectCommand({
          "Bucket": "dev-lon-files-clearing",
          "Key": `drafts/${"tsttestsetsetest"}/${fileOptions.fileName}`,
          "Body" : fs.readFileSync(fileOptions.path, "utf8")
        });
        
        const data = await client.send(command);

        return data;
      } catch (e) {
        return e;
      }
    }

  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  async query(graphQLQuery: string): Promise<string> {
    await this.setup();

    return await this.client.request(graphQLQuery);
  }

  /**
   * Return true if the security connection for this object is valid.
   *
   */
  isConnected(): boolean {
    if (this.organisationId) return true;

    return false;
  }
}
