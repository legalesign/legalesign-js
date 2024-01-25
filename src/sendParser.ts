import { SendOptions } from "../types/legalesign-js";

/////////////////////////////
/// Verifies SendOptions and parses them into graphQL mutations
/////////////////////////////

export const parseSingleSend = (sendOptions: SendOptions): string => {
  return `mutation sendSingleDocument {
        send(input: ${sendOptions})
        }`;
};
