import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from "amazon-cognito-identity-js";

export const getAccessToken = (
  username: string,
  password: string
): Promise<string> => {
  const authenticationData = {
    Username: username,
    Password: password
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const poolData = {
    UserPoolId: "eu-west-2_ygBWGS9Kw",
    ClientId: "707bs7sqosrlpluk96jsavdjuq"
  };

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise<string>((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result.getAccessToken().getJwtToken()),
      onFailure: err => reject(err)
    })
  );
};
