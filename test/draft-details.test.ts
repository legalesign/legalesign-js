import { describe, expect, it } from "vitest";
import { Legalesign } from "../src/Legalesign";
import { getAccessToken } from "../src/Tokenizer";
import { v4 as uuid } from "uuid";

describe("Get draft information", () => {
  it("it should login correctly", async () => {
    // Create an instance of the legalesign SDK
    const token = await getAccessToken(
      process.env.TEST_USER || "",
      process.env.TEST_PASSWORD || ""
    );
    expect(token).toBeDefined();
  });

  it("Send a test defined draft file to the S3 bucket", async () => {
    // Create a draft file
    const lesign = new Legalesign({
      organisationId: process.env.TEST_ORGANISATION || "",
      options: {
        apiUser: process.env.TEST_USER || "",
        apiPassword: process.env.TEST_PASSWORD || "",
      },
    });

    const fileUUID = await lesign.uploader.upload({
      path: `${__dirname}/draft.json`,
      fileName: `${uuid()}.json`,
      fileType: "drafts",
    });

    console.log(fileUUID);

    expect(typeof fileUUID === "string").toBeTruthy();
  });
});
