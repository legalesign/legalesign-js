import { expect, describe, test } from "@jest/globals";
import { Legalesign } from "../src/Legalesign";
import { getAccessToken } from "../src/Tokenizer";

describe("validate user credentials", () => {
  test("it should login correctly", async () => {
    // Create an instance of the legalesign SDK
    const token = await getAccessToken(
      process.env.TEST_USER || "",
      process.env.TEST_PASSWORD || ""
    );
    expect(token).toBeDefined();
  }, 15000);

  test("it should return group information for this user and account", async () => {
    // Create an instance of the legalesign SDK
    const lesign = new Legalesign({
      organisationId: process.env.TEST_ORGANISATION || "",
      options: {
        apiUser: process.env.TEST_USER || "",
        apiPassword: process.env.TEST_PASSWORD || "",
      },
    });

    // Send a basic query that gets the current users details
    const jsonResult = await lesign.selector.query(`query ViewMyDetails {
        user {
          id
          name
          email
        }
      }`);
    expect(jsonResult).toHaveProperty("user");
  }, 15000);
});
