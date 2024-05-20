---
date: 2017-03-24T16:40:31Z
title: Integrate with JWT and OIDC
menu:
  main:
    parent: "API Authentication Mode"
weight: 0
---

## Using JWTs with a 3rd Party

JSON Web tokens are an excellent, self-contained way to integrate a Tyk Gateway with a third party Identity Provider, without needing any direct integration.

A common use case for JWTs is to implement OpenID Connect (OIDC), since an OIDC access token can be used to access an API managed by Tyk Gateway.

To integrate a 3rd party OAuth2/OIDC IdP (Identity Provider) with Tyk, all you will need to do is ensure that your IDP can issue OAuth2 JWT access tokens as opposed to opaque tokens. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.

See [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) in the **Security** section for more details.
