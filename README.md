# Legalesign.js ES Module

Allows typescript friendly versions of the Legalesign core objects and Send calls, including single and multi-document.

## Installation

Use `npm` to install the Legalesign.js module:

```sh
npm install @legalesign/legalesign-js
```

## Example Code for Node.js (Server side integration)

You'll need several .env variables if you want to run the Jest tests in this SDK, but
this can be used to ensure that your organisation is properly set up and licensed. Most
of these items can be found in Legalesign Console organisation settings.

Here are the minimum settings you'll need to provide
TEST_ORGANISATION=<Organisation UUID>
TEST_USER=<Usually an email address of the user account to use for SDK API  calls>
TEST_PASSWORD=<The password of the API call user>

Additionally you can set the following items for testing or support purposes

cognito_identity_pool_id=
user_pools_web_client_id=
appsync_graphqlEndpoint=
region=
clearing_bucket=

### Instantiate the Legalesign SDK object

All actions are accessed through the `Legalesign` object so our first objective should
always be to create an authenticated version of it.

`const legalesign =`
