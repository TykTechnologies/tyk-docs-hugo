---
date: 2018-01-24T17:02:11Z
title: Log into Dashboard with Google
menu:
  main:
    parent: "Social Provider"
weight: 0
aliases:
  - /docs/integrate/3rd-party-identity-providers/social/dashboard-login-with-gplus/
---


## Log into Dashboard with Google

Similarly to logging into an app using Tyk, OAuth and Google Plus, if we have our callback URL and client IDs set up with Google, we can use the following profile setup to access our Dashboard using a social provider:

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

The login to the Dashboard makes use of a one-time nonce to log the user in to the session. The nonce is only accessible for a few seconds. It is recommended that in production use, all of these transactions happen over SSL connections to avoid MITM snooping.

`Domain` constraint ensures that only users from `yourdomain.com` domain-based email accounts are allowed to login. 
 Replace it with correct domain or remove this section if you don't want to set this constraint.


When TIB successfully authorises the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.
