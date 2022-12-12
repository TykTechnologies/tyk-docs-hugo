---
title: "Revoke OAuth Tokens"
tags: ["Revoke", "Oauth"]
description: "How to revoke OAuth tokens in Tyk"
date: 2020-03-17
menu:
  main:
    parent: "OAuth 2.0"
weight: 6
url: "/basic-config-and-security/security/your-apis/oauth20/revoke-oauth-tokens"
aliases:
  - "/docs/basic-config-and-security/security/your-apis/oauth2.0/revoke-oauth-tokens/"
---

This feature gives you (both developers and Dashboard users) the ability to revoke OAuth tokens. You can revoke specific tokens by providing the token and token hint (`access_token` or `refresh_token`) or you can revoke all OAuth Client tokens. 

You can revoke OAuth tokens via the following methods:

* From a Gateway API endpoint (in compliance with https://tools.ietf.org/html/rfc7009). See the OAuth section of our [Swagger doc](/docs/tyk-gateway-api/) for the Gateway REST API for details.
* Via a Dashboard API calls - [Revoke a token](/docs/tyk-apis/tyk-dashboard-api/oauth-key-management/#revoke-a-single-oauth-client-token) and [revoke all tokens](/docs/tyk-apis/tyk-dashboard-api/oauth-key-management/#revoke-all-oauth-client-tokens)
* Via a Portal Developer API calls - [Revoke a token](/docs/tyk-apis/tyk-portal-api/portal-developers/#revoke-a-single-oauth-client-token) and [revoke all tokens](/docs/tyk-apis/tyk-portal-api/portal-developers/#revoke-all-oauth-client-tokens)
* Via the Developer menu from the Tyk Dashboard

