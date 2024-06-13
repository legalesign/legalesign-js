import { Legalesign } from "../src/legalesign";
import { Statements } from "../src/statements/statements";

import "dotenv/config";

describe("Get template information", () => {

  test("Get the example template.", async () => {
     // Create an instance of the legalesign SDK
     const lesign = new Legalesign({
      organisationId: process.env.TEST_ORGANISATION || "",
      options: {
        apiUser: process.env.TEST_USER || "",
        apiPassword: process.env.TEST_PASSWORD || "",
      },
    });

    // Send a basic query that gets the current users details
    const jsonResult = await lesign.selector.query(Statements.template);
    expect(jsonResult).toHaveProperty("user");
  });
});
