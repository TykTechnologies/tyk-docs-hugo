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

![Tyk OpenID Connect with Auth0](/docs/img/diagrams/openid_connect.png)


For more details about our OpenID Connect support see [OpenID Integration](/docs/integrate/api-auth-mode/open-id-connect/).

See a [worked example of using OpenID Connect with Auth0](/docs/integrate/api-auth-mode/oidc-auth0-example/).
