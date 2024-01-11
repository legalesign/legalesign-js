import { assert, Has } from "conditional-type-checks";

/* 
    Our sample code uses the graphql-request module, you can alter it to use whatever
    graphQL library you wish, such as Apollo. We have also omitted exception handling for clarity but
    you should catching security exceptions and handle them appropraitely for your use case.
*/


// const client = new GraphQLClient(
//   "https://7hfrjecmwjgehp3q2d3c2fbi6m.appsync-api.eu-west-2.amazonaws.com/graphql",
//   {
//     headers: {
//       Authorization: await getToken(
//         "alex.weinle@legalesign.com",
//         "@Testdemo123"
//       )
//     }
//   }
// );

const results = `query ViewMyDetails {
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
  }`;

  assert()
// The returned JSON
console.log(results);