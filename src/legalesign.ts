import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
  FileOptions
} from "../types/legalesign-js";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./tokenizer";
import { Parameters } from "./parameters";
import { Statements } from "./statements/statements";
import { Uploader } from "./extensions/uploader";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import * as fs from "fs";

// Basic information loaded immediately after the Graph QL is set up.
type UserInformation = { id: string; email: string };

///////////////////////////////////////////////////////////////
/// The start point for all actions on the Legalesign SDK
///////////////////////////////////////////////////////////////
export class Legalesign {
  protected options: LegalesignConstructorOptions;
  public organisationId: string;
  public client: GraphQLClient;
  public userInformation: UserInformation;
  public uploader: Uploader;
  private accessToken: undefined | string;

  constructor(legalesignConstructor: LegalesignConstructor) {
    this.options = legalesignConstructor.options;
    this.organisationId = legalesignConstructor.organisationId;

    // Add the action classes as publicly accessible members
    this.uploader = new Uploader(this);
  }

  /**
   * Ensures that the api controller is connected and we know the
   * current users credentials.
   *
   */
  public async setup(): Promise<void> {
    if (!this.client) {
      this.accessToken = await getAccessToken(
        this.options.apiUser,
        this.options.apiPassword
      )

      this.client = new GraphQLClient(Parameters.endpoints.graphQL, {
        headers: {
          Authorization: this.accessToken,
        },
      });

      // Get the essential user details
      const userInfo = await this.client.request(Statements.userInformation);
      if ("user" in userInfo) this.userInformation = userInfo?.user;
    }
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
        await this.setup();
  
        const s3 = await new S3Client({ region: "eu-west-2"});
      
        const uniqueFileId = await uuid().toString();
  
        const command = new PutObjectCommand({
          Bucket: Parameters.buckets.clearing,
          Key: `${fileOptions.fileType}/${this.userInformation.id}/${uniqueFileId}.json`,
          Body: fs.readFileSync(fileOptions.path, "utf8"),
        });
  
        await s3.send(command);
        console.log(uniqueFileId)
  
        // return the newly create UUID for the draft
        return uniqueFileId;
        } catch (e) {
        console.log(e)
        return null;
      }
    }

  /**
   * Send filled templates off to the Legalesign API to be distributed and signed.
   *
   */
  public async query(graphQLQuery: string): Promise<string> {
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
