
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
    }`
}
