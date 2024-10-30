---
date: 2017-03-23T16:13:12Z
title: OpenID Connect
tags: ["OpenID", "OIDC", "Security"]
description: "Using OpenID Identity Tokens with Tyk"
menu:
  main:
    parent: "Authentication & Authorization"
weight: 5 
aliases:
  - /security/your-apis/openid-connect/
  - /advanced-configuration/integrate/api-auth-mode/oidc-auth0-example/
  - /advanced-configuration/integrate/api-auth-mode/open-id-connect
  - /advanced-configuration/integrate/api-auth-mode/json-web-tokens
---

{{< note success >}}
**Note**  

Tyk's dedicated OpenID Connect Authentication middleware will be deprecated from Tyk 5.7.0. Tyk's [JSON Web Token (JWT)]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#about-jwts" >}}) authentication method also allows you to integrate with an OIDC provider, so the dedicated OIDC middleware will be deprecated to reduce duplication and potential for misconfiguration.
{{< /note >}}


[OpenID Connect](https://openid.net/developers/how-connect-works) (OIDC) builds on top of OAuth 2.0, adding authentication. You can secure your APIs on Tyk by integrating with any standards compliant OIDC provider using [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) (JWTs).
JWTs offer a simple way to use the third-party Identity Provider (IdP) without needing any direct integration between the Tyk and 3rd-party systems.

To integrate a 3rd party OAuth2/OIDC IdP with Tyk, all you will need to do is ensure that your IdP can issue OAuth2 JWT access tokens as opposed to opaque tokens.

The client application authenticates with the IdP which then provides an access token that is accepted by Tyk. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.
