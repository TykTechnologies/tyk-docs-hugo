---
title: "SSO with Social Identity Providers"
date: 2025-01-10
tags: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
description: "Learn how to integrate external services with Tyk API Gateway. Discover how to use middleware plugins, webhooks, and service discovery to extend your API functionality and connect with third-party systems."
keywords: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
---

## Introduction

The social provider for the Tyk Identity Broker is a thin wrapper around the excellent `goth` social auth library, modified slightly to work with a multi-tenant structure. The social provider should provide seamless integration with:

*   Bitbucket
*   Digital Ocean
*   Dropbox
*   GitHub
*   Google+
*   Linkedin
*   Twitter
*   Salesforce

The social provider is ideal for SSO-style logins for the Dashboard or for the Portal. For certain providers (mainly Google+), where email addresses are returned as part of the user data, a constraint can be added to validate the users domain. This is useful for Google For Business Apps users that want to grant access to their domain users for the Dashboard.

For more social provider examples see the Tyk Identity Broker (TIB) v0.2 Repo [Readme](https://github.com/TykTechnologies/tyk-identity-broker/blob/master/README.md#social).
<br>

{{< note success >}}
**Note**

To activate SSO on the Dashboard or Developer portal, there’s no requirement to install TIB separately; it is integrated into the Dashboard and Developer Portal. You have two configurations for SSO within the dashboard:
1. **Using Embedded TIB**: No need to install it separately.
2. **Using External TIB**: If you are using a previous version of the Dashboard or Portal, you can still use SSO with TIB installed as a separate application.
{{< /note >}}


## Log into an APP with Github OAuth

{{< youtube gqUaDM4aJTw >}}

## Log into an APP with Google (Oauth)

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

### Create an OAuth Client in Tyk Dashboard

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

When TIB successfully authorizes the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.

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


When TIB successfully authorizes the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.


