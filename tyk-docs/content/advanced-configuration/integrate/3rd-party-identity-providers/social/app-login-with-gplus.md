---
date: 2018-01-24T17:02:11Z
title: Log into an APP with Google
menu:
  main:
    parent: "Social Provider"
weight: 0
---


## Log into an APP with Google (OAuth)

A common use case for Tyk Gateway users is to enable users to log into a web app or mobile app using a social provider such as Google, but have that user use a token in the app that is time-delimited and issued by their own API (or in this case, Tyk).

Tyk can act as an OAuth provider, but requires some glue code to work, in particular, generating a token based on the authentication of a third party, which needs to run on a server hosted by the owner of the application. This is not ideal in many scenarios where authentication has been delegated to a third-party provider (such as Google or Github).

In this case, we can enable this flow with Tyk Gateway by Using TIB.

What the broker will do is essentially the final leg of the authentication process without any new code, simply sending the user via TIB to the provider will suffice for them to be granted an OAuth token once they have authenticated in a standard, expected OAuth pattern.

Assuming we have created a client ID and secret in Google Apps to grant ourselves access to the users data, we need those details, and some additional ones from Tyk itself.

### To Set up an OAuth client with Google Apps

1. Go to the [Google Developer Console](https://console.developers.google.com/) and create a new app
2. Register a new OAuth client. Let's call it WebApp 1 (Select "New Credentials -> OAuth Client ID")
3. Select Web App
4. Add the following URL (modify for your domain) to the "Authorized redirect URIs" section: `http://tib-hostname:TIB-PORT/auth/{PROFILE-ID}/gplus/callback`

#### Create an OAuth Client in Tyk Dashboard

TIB will use the OAuth credentials for GPlus to access and authenticate the user, it will then use another set of client credentials to make the request to Tyk to generate a token response and redirect the user, this means we need to create an OAuth client in Tyk Dashboard before we can proceed.

One quirk with the Tyk API is that requests for tokens go via the base APIs listen path (`{listen_path}/toauth/authorize`), so we will need to know the listen path and ID of this API so TIB can make the correct API calls on your behalf.

```{.copyWrapper}
{
  "ActionType": "GenerateOAuthTokenForClient",
  "ID": "3",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{DASHBOARD-API-ID}",
    "DisableOneTokenPerAPI": false,
    "OAuth": {
      "APIListenPath": "{API-LISTEN-PATH}",
      "BaseAPIID": "{BASE-API-ID}",
      "ClientId": "{TYK-OAUTH-CLIENT-ID}",
      "RedirectURI": "http://{APP-DOMAIN}:{PORT}/{AUTH-SUCCESS-PATH}",
      "ResponseType": "token",
      "Secret": "{TYK-OAUTH-CLIENT-SECRET}"
    }
  },
  "MatchedPolicyID": "567a86f630c55e3256000003",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB-DOMAIN}:{TIB-PORT}",
    "FailureRedirect": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/login/?fail=true",
    "UseProviders": [{
      "Key": "GOOGLE-OAUTH-CLIENT-KEY",
      "Name": "gplus",
      "Secret": "GOOGLE-OAUTH-CLIENT-SECRET"
    }]
  },
  "ProviderConstraints": {
    "Domain": "",
    "Group": ""
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "",
  "Type": "redirect"
}
```

There's a few new things here we need to take into account:

*   `APIListenPath`: This is the listen path of your API, TIB uses this to generate the OAuth token.
*   `BaseAPIID`: The base API ID for the listen path mentioned earlier, this forms the basic access grant for the token (this will be superseded by the `MatchedPolicyID`, but is required for token generation).
*   `ClientId`: The client ID for this profile within Tyk Gateway.
*   `Secret`: The client secret for this profile in Tyk Gateway.
*   `RedirectURI`: The Redirect URL set for this profile in the Tyk Gateway.
*   `ResponseType`: This can be `token` or `authorization_code`, the first will generate a token directly, the second will generate an auth code for follow up access. For SPWA and Mobile Apps it is recommended to just use `token`.

When TIB successfully authorises the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.
