import { SendOptions } from "../types/legalesign-js";

/////////////////////////////
/// Verifies SendOptions and parses them into graphQL mutations
/////////////////////////////

export const parseSingleSend = (sendOptions: SendOptions): string => {
  return `mutation sendSingleDocument {
        send(input: 
            title: "${sendOptions.title}", 
            templateId: "${sendOptions.templateId}", 
            sequentialSigning: ${sendOptions.sequentialSigning ? true : false}, 
            groupId: "${sendOptions.groupId}", 
            tag: "", 
            allowPrinting: ${sendOptions.sequentialSigning ? true : false}, 
            allowCopying: ${sendOptions.sequentialSigning ? true : false}, 
            recipients: [{id: "cm9sNzhlMTkxZmUtNTEzZi0xMWVlLWE2NDgtMDIzNmQyNjAzYjlh", order: 0, 
            signerIndex: 1, role: "", 
            roleId: "cm9sNzhlMTkxZmUtNTEzZi0xMWVlLWE2NDgtMDIzNmQyNjAzYjlh", 
            experience: "ZXhwZGVtbzE=", firstName: "Alex", 
            attachments: ["YXR0ODczNTA1ZDQtODMxMy0xMWVlLWJjMTAtMGE5NjMyYmVlYTAw"], 
            lastName: "Why", email: "alex.weinle@legalesign.com", 
            schedule: null, 
            scheduleId: "c2NoNDMz", 
            expiryDate: null, 
            timeZone: "Europe/London", 
            skipped: false, message: "sdfsdfsdf"}]
        }`;
};