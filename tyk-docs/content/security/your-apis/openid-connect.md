---
date: 2017-03-23T16:13:12Z
title: OpenID Connect
menu:
  main:
    parent: "Your APIs"
weight: 5 
---

Tyk comes with support for OpenID Connect Identity Tokens provided by any standards compliant OIDC provider.

### The OIDC Flow:

1.  A User logs in via a supported OIDC Provider to request access to their resource.
2.  The User gains access to the Provider and uses their service.
3.  The Identity Provider generates an OIDC `id_token` which is signed by provider with their private key and returned to the user
4.  The User's client utilises OIDC ID Token as access token for an API managed by Tyk Gateway.
5.  Tyk Gateway validates the OIDC ID Token signature.
6.  Tyk Gateway checks the IDP is a recognised IDP (registered as approved).
7.  Tyk Gateway verifies the client ID as one that is trusted and pre-registered with Tyk Gateway.
8.  If the client ID is valid, Tyk applies the policy ID matched with this client to the user session.
9.  Tyk then validates the users session according to the quotas, rate limits and access rules for the matching policy for **either** the bearer of the token across all clients they use from this IDP **or** validates the session on a per client / per identity basis. For example, user Alice will have different Access Rules depending on whether they are using a mobile client or a web client.
10.  The Tyk Gateway then proxies request to the target.

With this flow, Tyk does not need to be aware of the user or the token in advance, it only needs to know about the approved IDPs, approved ClientIDs within those IDPs and which Policy to apply to those Client IDs.

### Auth0 example flow

![Tyk OpenID Connect with Auth0][1]

### Behaviour - Internal Tokens

When an OIDC token is processed, Tyk generates an internal representation of the bearer, this ID is a hash of the organisation and user-id provided by the IDP for this user. Tyk uses this internal ID to hang policy rules off of during the lifetime of the users usage of the API.

It is useful for the downstream service to be able to query this data somehow in order to manage access (e.g. to invalidate the token at some point). To make this possible, Tyk adds the internal Token ID to the meta-data of the session object.

It is possible to inject this as a header into the request moving upstream to the underlying service using header injection and invoking the reserved metadata field: `$tyk_meta.TykJWTSessionID`. Additionally you can access `Client ID` using `$tyk_meta.ClientID`.

It is also possible to access the JWT claims, using `$tyk_context.jwt_claims_CLAIMNAME` by injecting as a context variable in a request header. See [Request Headers][2] for more details.

### Aliases

In order to make OIDC Access tokens meaningful in analytics data, Tyk will also set an Alias for the internal token so the user can be easily identified in analytics. The OIDC Alias will always be the `ClientID + User ID` provided by the IDP. This will be displayed for analytics purposes.

#### Setting up OIDC

To set up an API Definition to use OIDC, add the following block to the definition, and ensure no other access methods are enabled:

```{.copyWrapper}
"use_openid": true,
"openid_options": {
  "providers": [
    {
      "issuer": "accounts.google.com",
      "client_ids": {
        "MTIzNDU2Nzc4OQ==": "5654566b30c55e3904000003"
      }
    }
  ],
  "segregate_by_client": false
}
```

*   `use_openid`: Set to true to enable the OpenID Connect check.
*   `openid_options.providers`: A list of authorised providers and their client IDs/Matched Policies.
*   `openid_options.providers.client_ids`: The list of client IDs and policy IDs to apply to users thereof. **Note:** Client IDs are Base64 encoded, so the map is `base64(clientid):policy_id` .When a valid user appears from a matching IDP/Client ID, the policy listed in this entry will be applied to their token across OIDC ID Tokens.
*   `openid_options.segregate_by_client`: Enable this to have the policy applied to the combination of the User ID AND the Client ID. For example: 
    *   **If disabled**: When Alice uses the mobile app to log into the API, Tyk applies the same rate limit and access rules as if she had logged in via the web app or the desktop client. 
    *   **If enabled**: When Alice uses the mobile app to log into the API, Tyk applies different rate limit and access rules than if she had logged in via the web app or the desktop client, in fact, each client and user combination will have its **own** internal representation.


[1]: /docs/img/diagrams/openid_connect.png
[2]: /docs/transform-traffic/request-headers/
