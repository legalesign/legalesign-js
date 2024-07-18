# Legalesign.js ES Module

Allows typescript friendly versions of the Legalesign core objects and Send calls, including single and multi-document. Note
that you'll need to be using the latest Console version of legalesign UI to see some of the features used in the SDK, such
as `Drafts`.

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

Additionally you can set the following items for testing, isolation or support purposes;

cognito_identity_pool_id=<overrides the deault>
user_pools_web_client_id=<overrides the deault>
appsync_graphqlEndpoint=<overrides the deault>
region=<overrides the deault>
clearing_bucket=<overrides the deault>

### Instantiate the Legalesign SDK object

All actions are accessed through the `Legalesign` object so our first objective should
always be to create an authenticated version of it.

```typescript
const legalesign = new Legalesign({
  organisationId: process.env.TEST_ORGANISATION || "",
  options: {
    apiUser: process.env.TEST_USER || "",
    apiPassword: process.env.TEST_PASSWORD || ""
  }
});
```

If you aren't using environment variables in your project, feel free to replace these with
your variable store or the actual values. Hard-coding values isn't best practice, you should
get some advice from your system administrator is this is acceptable for anything other
than practice code.

## Using SDK to upload files for use on Legalesign platform

The SDK allows you to upload several types of files for use as templates, drafts and other reasons. All these
files pass through virus and content checking to ensure the safety of your customers.
