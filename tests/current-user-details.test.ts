import { Legalesign } from "../src/legalesign";
import "dotenv/config";
import { getAccessToken } from "../src/tokenizer";

describe("Get basic user information", () => {
  test("it should login correctly", async () => {
    // Create an instance of the legalesign SDK
    const token = await getAccessToken(
      process.env.TEST_USER || "",
      process.env.TEST_PASSWORD || ""
    );
    expect(token).toBeDefined();
  });

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
          memberConnection {
            groupMembers {
              id
              name
              group {
                id
                name
              }
            }
          }
        }
      }`);
    expect(jsonResult).toHaveProperty("user");
  });
});
