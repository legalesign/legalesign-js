import { Legalesign } from "../../src";

const legalesign = Legalesign("api.user@legalforce.com", "GKJUKFKJS23Y2NkYS00M2MzLWIyNTgtM2FjNmQ2ODI3434");

legalesign.Send({
  title: "DocumentToSign",
  groupId: "Z3JwZGVtbzE=",
  templateId: "dHBsNDBkODJjMmQtY2NkYS00M2MzLWIyNTgtM2FjNmQ2ODI0YjQz",
  recipients: [
    { email: "john.smith@corp.com", firstname: "John", lastname: "Smith" },
  ],
});
