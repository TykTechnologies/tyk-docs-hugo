---
date: 2018-01-24T17:02:11Z
title: Log into Dashboard with Google
menu:
  main:
    parent: "Social Provider"
weight: 0
---


## Log into Dashboard with Google

Similarly to logging into an app using Tyk, OAuth and Google Plus, if we have our callback URL and client IDs set up with Google, we can use the following profile setup to access our Developer Portal using a social provider:

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "2",
  "IdentityHandlerConfig": null,
  "MatchedPolicyID": "1C",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "CallbackBaseURL": "http://:{TIB-PORT}",
    "FailureRedirect": "http://{DASH-DOMAIN}:{DASH-PORT}/?fail=true",
    "UseProviders": [{
      "Name": "gplus",
      "Key": "GOOGLE-OAUTH-CLIENT-KEY",
      "Secret": "GOOGLE-OAUTH-CLIENT-SECRET"
    }]
  },
  "ProviderConstraints": {
    "Domain": "yourdomain.com",
    "Group": ""
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
  "Type": "redirect"
}
```

It is worth noting in the above configuration that the return URL's have changed for failure and return states.

The login to the Portal, much like the login to the Dashboard, makes use of a one-time nonce to log the user in to the session. The nonce is only accessible for a few seconds. It is recommended that in production use, all of these transactions happen over SSL connections to avoid MITM snooping.


There's a few new things here we need to take into account:

*   `APIListenPath`: This is the listen path of your API, TIB uses this to generate the OAuth token.
*   `BaseAPIID`: The base API ID for the listen path mentioned earlier, this forms the basic access grant for the token (this will be superseded by the `MatchedPolicyID`, but is required for token generation).
*   `ClientId`: The client ID for this profile within Tyk Gateway.
*   `Secret`: The client secret for this profile in Tyk Gateway.
*   `RedirectURI`: The Redirect URL set for this profile in the Tyk Gateway.
*   `ResponseType`: This can be `token` or `authorization_code`, the first will generate a token directly, the second will generate an auth code for follow up access. For SPWA and Mobile Apps it is recommended to just use `token`.

When TIB successfully authorises the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.
