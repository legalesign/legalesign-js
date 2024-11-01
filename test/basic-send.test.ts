import { expect, test } from "@jest/globals";
import { Legalesign } from "../src/Legalesign";
import { SendOptions, Recipient } from "../src/types/";

test("Send a template with recipient.", async () => {
  console.log(process.env.TEST_ORGANISATION)
  // Create a draft file
  const lesign = new Legalesign({
    organisationId: process.env.TEST_ORGANISATION || "b3JnNTdjYWRjNmEtM2RmZC00MzA3LTk1MWEtOGVlNmIwOGVlYTg1",
    options: {
      apiUser: process.env.TEST_USER || "it@legalesign.com",
      apiPassword: process.env.TEST_PASSWORD || "D@dgy20T@sters",
    },
  });

  /**
   *     You can get group / template / recipient ID the URL in dashboard and editor
   *     or by running graphQL queries.
   */
  const recipient: Recipient = {
    email: "alex.weinle@legalesign.com",
    firstName: "Alex",
    lastName: "SDK",
  };
  const sendOptions: SendOptions = {
    title: "SDK Test Simple Send",
    groupId: "Z3JwZGVtbzE=",
    templateId: "dHBsNTY5NGNiNmEtMjhjMy0xMWVmLWEyZWUtMGE3ZjBiZjVlZDNi",
    recipients: [recipient],
  };

  const response = await lesign.sender.send(sendOptions);

  expect(response).toBeTruthy();
}, 30000);
