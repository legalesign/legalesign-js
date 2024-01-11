import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from "amazon-cognito-identity-js";

// For convenience here we default to the 'general purpose' pool and client - if your
// organisation has security dedicated pool or been provided regional variants you should pass the details provided
// by Legalesign. For more details on dedicated security contact support@legalesign.com .
export const getToken = (
  username: string,
  password: string,
  pool = "eu-west-2_ygBWGS9Kw",
  appClientId = "707bs7sqosrlpluk96jsavdjuq"
): Promise<string> => {
  const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(
    {
      Username: username,
      Password: password
    }
  );

  const userData = {
    Username: username,
    Pool: new CognitoUserPool({
      UserPoolId: pool,
      ClientId: appClientId
    })
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result.getAccessToken().getJwtToken()),
      onFailure: err => reject(err)
    })
  );
};
