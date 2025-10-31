---
title: Upstream Authentication
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - OAuth
    - mTLS
    - Basic Auth
description: Authenticating Tyk Gateway with upstream services
date: "2024-11-18"
aliases:
  - security/certificate-pinning
---

## Introduction

Tyk Gateway sits between your clients and your services, securely routing requests and responses. For each API proxy that you expose on Tyk, you can configure a range of different methods that clients must use to identify (authenticate) themselves to Tyk Gateway. These are described in detail in the [Client Authentication]({{< ref "api-management/client-authentication" >}}) section.

In the same way as you use Client Authentication to securely confirm the identity of the API clients, your upstream services probably need to securely confirm the identity of their client - namely Tyk. This is where Tyk's flexible **Upstream Authentication** capability comes in.

When using Tyk, you can choose from a range of authentication methods for each upstream API:
- [Mutual TLS]({{< ref "api-management/upstream-authentication/mtls" >}})
- [Token-based authentication]({{< ref "api-management/upstream-authentication/auth-token" >}})
- [Request signing]({{< ref "api-management/upstream-authentication/request-signing" >}})
- [Basic Authentication]({{< ref "api-management/upstream-authentication/basic-auth" >}})
- [OAuth 2.0]({{< ref "api-management/upstream-authentication/oauth" >}})
    - [OAuth 2.0 Client Credentials]({{< ref "api-management/upstream-authentication/oauth#oauth-client-credentials" >}})
    - [OAuth 2.0 Password Grant]({{< ref "api-management/upstream-authentication/oauth#oauth-resource-owner-password-credentials" >}})

{{< note success >}}
**Note**  

Upstream Basic Authentication and Oauth 2.0 support are only available to licensed users, via the Tyk Dashboard. These features are not available to open source users.
{{< /note >}}

{{< warning success >}}
**Warning**  

Note that OAuth 2.0 Password Grant is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported by Tyk for use with legacy upstream services.
{{< /warning >}}
