import { Legalesign } from "../src/legalesign";

describe("Get basic user information", () => {
  test("it should return group information for this user and account", () => {
    // Create an instance of the legalesign SDK
    const lesign = new Legalesign({
      organisationId: "1234",
      options: {
        apiUser: "alex.weinle@legalesign.com",
        apiPassword: "@Testdemo123"
      }
    });

    // Send a basic query that gets the current users details
    const jsonResult = lesign.query(`query ViewMyDetails {
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

    console.log(jsonResult);
  });
});
