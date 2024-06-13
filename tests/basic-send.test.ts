import { Legalesign } from "../src/legalesign";
import { SendOptions } from "../types/legalesign-js";
import "dotenv/config";

describe("Send a template.", () => {
  test("Send a template with recipient.", async () => {
    // Create a draft file
    const lesign = new Legalesign({
      organisationId: process.env.TEST_ORGANISATION || "",
      options: {
        apiUser: process.env.TEST_USER || "",
        apiPassword: process.env.TEST_PASSWORD || "",
      },
    });

    // You can get group / template / recipient ID the URL in dashboard and editor
    // or by running graphQL queries.
    const sendOptions: SendOptions = {
      title: "SDK Test Simple Send",
      groupId: "Z3JwZGVtbzE=",
      templateId: "dHBsNTY5NGNiNmEtMjhjMy0xMWVmLWEyZWUtMGE3ZjBiZjVlZDNi",
      recipients: [
        {
          email: "",
          firstName: "",
          lastName: "",
        },
      ],
    };

    const response = await lesign.sender.send(sendOptions);

    console.log(response);

    expect(typeof response === "string").toBeTruthy();
  });
});
