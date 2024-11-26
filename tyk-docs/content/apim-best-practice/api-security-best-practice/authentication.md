---
title: "Authentication"
date: 2023-09-01
tags: ["API Security", "Authentication"]
description: "Authentication best practices"
---

Authentication is the process of identifying API clients. It’s a broad topic, with many approaches to choose from. Choosing the right approach is important, as it forms a fundamental part of the overall security strategy. The decision depends on many risk factors; users, functionality, data, accessibility and compliance, to name just a few. While there isn’t necessarily a single, correct choice, it’s usually safe to assume that some form of authentication is needed, as it’s a crucial prerequisite in performing subsequent identity-based authorization checks.

### Implement Appropriate Authentication

Choose a suitable authentication approach based on the risk profile of the API. Is it publicly accessible or internal? Does it require user interaction or is it machine to machine? How sensitive is the data and functionality provided by the API? Simplistic approaches, such as [Bearer Tokens]({{< ref "/api-management/authentication-authorization#use-bearer-tokens" >}}), can work for low risk, basic APIs, but for higher risk or more sophisticated APIs, it may be more appropriate to use a standards-based approach such as [OAuth 2.0]({{< ref "/api-management/authentication-authorization#set-up-oauth-20-authorization" >}}) or [OpenID Connect]({{< ref "/api-management/authentication-authorization#use-openid-connect" >}}). Furthermore, using an [external identity provider]({{< ref "/api-management/authentication-authorization#integrate-external-oauth-middleware" >}}) can deliver additional benefits, such as [single sign-on]({{< ref "advanced-configuration/integrate/sso" >}}), as well as multi-factor authentication approaches such as [biometric verification](https://www.okta.com/identity-101/biometrics-secure-authentication).

### Handle Data Securely

Don’t undermine the authentication process by leaking sensitive authentication data. Use [transport layer security]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}) and hashing to prevent credentials from being intercepted and stolen through insecure transmission and storage. These principles also apply to upstream requests made by the gateway and upstream API to other APIs and services.

### Enforce Good Practices

Establish rules that reduce risk and enhance overall system security. Use [password policies]({{< ref "basic-config-and-security/security/password-policy" >}}) to prevent the use of weak passwords, and [TLS policies]({{< ref "basic-config-and-security/security/tls-and-ssl#values-for-tls-versions" >}}) to prevent the use of older TLS versions that are now deprecated and considered vulnerable.

### Protect Sensitive Endpoints

Reduce susceptibility of sensitive endpoints to brute force dictionary or password stuffing attacks. The typical target for this type of attack are endpoints that use credentials, such as login and password recovery. Unfortunately, anonymous access is required for these endpoints, so authentication cannot be used to protect them, so the best approach is to hinder access by using techniques such as [rate limiting]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting" >}}), [captcha](https://en.wikipedia.org/wiki/CAPTCHA) and one-time URLs.