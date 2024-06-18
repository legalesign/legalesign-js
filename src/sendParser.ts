import { Recipient } from "../src/common"
import { SendOptions } from "../types/legalesign-js";

/////////////////////////////
/// Verifies SendOptions and parses them into graphQL mutations
/////////////////////////////


export const parseRecipient = (recipient: Recipient, index: number): string => {
  return `{
    id: "${recipient.id}", 
    order: ${index}, 
    signerIndex: ${index + 1}, 
    role: "", 
    roleId: "${recipient.roleId}", 
    experience: "ZXhwZGVtbzE=", 
    firstName: "${recipient.firstName}", 
    lastName: "${recipient.lastName}", 
    email: "${recipient.email}", 
    attachments: [], 
    schedule: null, 
    scheduleId: null, 
    expiryDate: null, 
    timeZone: "Europe/London", 
    skipped: false, 
    message: "MESSAGE FROM SDK"
  }`;
};

export const parseSingleSend = (sendOptions: SendOptions): string => {
  return `mutation sendSingleDocument {
        send(input: {
            title: "${sendOptions.title}", 
            templateId: "${sendOptions.templateId}", 
            sequentialSigning: ${sendOptions.sequentialSigning ? true : false}, 
            groupId: "${sendOptions.groupId}", 
            tag: "", 
            allowPrinting: ${sendOptions.sequentialSigning ? true : false}, 
            allowCopying: ${sendOptions.sequentialSigning ? true : false}, 
            documentCCEmail: [],
            recipients: ${sendOptions.recipients.map((r, index) => parseRecipient(r, index))},
            senderFields:[],
            participantFields:[]            
        }
        )
      }`;
};
