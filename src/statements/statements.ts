////////////////////////////////////////////////////////////////////////
/// Statements used by the SDK for common information calls
////////////////////////////////////////////////////////////////////////
export const Statements = {
  userInformation: `query userInformation {
        user {
          id
          email
          memberConnection {
            groupMembers {
              group {
                id 
                name
            }
          }
        }
      }
    }`,
  templateFetch: `query template($templateId: ID!) {
      template(id: $templateId) {
        id
        title
        link
        roles {
          id
          name
        }
        elementConnection {
          elements {           
            id 
            name
          }
        }
      }
    }
  }`
};
