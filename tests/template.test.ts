import { Legalesign } from "../src/legalesign";
import { Template } from "../src/common";

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

    // Get a test template
     
    const t = new Template("dHBsNTY5NGNiNmEtMjhjMy0xMWVmLWEyZWUtMGE3ZjBiZjVlZDNi", lesign);

  
    expect(t).toHaveProperty("link");
  });
});
