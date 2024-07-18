import { Recipient } from "../src/common";
import { Legalesign } from "../src/Legalesign";
import { SendOptions } from "../types/legalesign-js";
import "dotenv/config";

describe("Send a template.", () => {
  test("Send a template with recipient.", async () => {
    // Create a draft file
    const lesign = new Legalesign({
      organisationId: process.env.TEST_ORGANISATION || "",
      options: {
        apiUser: process.env.TEST_USER || "",
        apiPassword: process.env.TEST_PASSWORD || ""
      }
    });

    // You can get group / template / recipient ID the URL in dashboard and editor
    // or by running graphQL queries.
    const sendOptions: SendOptions = {
      title: "SDK Test Simple Send",
      groupId: "Z3JwZGVtbzE=",
      templateId: "dHBsNTY5NGNiNmEtMjhjMy0xMWVmLWEyZWUtMGE3ZjBiZjVlZDNi",
      recipients: [
        new Recipient({
          email: "alex.weinle@legalesign.com",
          firstName: "Alex",
          lastName: "SDK"
        }, lesign)
      ]
    };

    const response = await lesign.sender.send(sendOptions);

    expect(response).toBeTruthy();
  });
});
