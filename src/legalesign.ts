import {
  LegalesignConstructor,
  LegalesignConstructorOptions,
  SendOptions,
  FileOptions,
} from "../types/legalesign-js";
import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./tokenizer";
import { parseSingleSend } from "./sendParser";
import { Parameters } from "./parameters";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { Uploader } from "./extensions/uploader";

///////////////////////////////////////////////////////////////
/// The start point for all actions on the Legalesign SDK
///////////////////////////////////////////////////////////////
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
      this.client = new GraphQLClient(Parameters.endpoints.graphQL, {
        headers: {
          Authorization: await getAccessToken(
            this.options.apiUser,
            this.options.apiPassword
          ),
        },
      });
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
   * (This delegates the legwork to the Uploader class).
   */
  async upload(fileOptions: FileOptions): Promise<boolean> {
    await this.setup();

    const uploader: Uploader = new Uploader(fileOptions);

    uploader.upload("me");

    return true;
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
