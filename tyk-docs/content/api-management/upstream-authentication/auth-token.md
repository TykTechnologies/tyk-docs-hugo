---
title: Upstream Authentication using Auth Token
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - auth token
description: How to authenticate upstream service using auth token
date: "2025-04-15"
---

## Token-based authentication

Token-based authentication (also referred to as Auth Token) is a method whereby the client is identified and authenticated by the server based on a key/token they present as a credential with each request. Typically the token is issued by the server to a specific client.

The server determines how the key should be provided - typically in a request header, cookie or query parameter.

Tyk supports [Auth Token]({{< ref "api-management/authentication/bearer-token" >}}) as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to generate access *keys* for an Auth Token protected API as explained in the [documentation]({{< ref "api-management/policies" >}}). The client must then provide the *key* in the appropriate parameter for each request.

If your **upstream service** is protected using Auth Token then similarly, Tyk will need to provide a token, issued by the upstream, in the request.

### How to use Upstream Token-based Authentication
Typically Auth Token uses the `Authorization` header to pass the token in the request.

Tyk's [Request Header Transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware can be configured to add this header to the request prior to it being proxied to the upstream. To enhance security by restricting visibility of the access token, the key/token can be stored in a [key-value store]({{< ref "tyk-self-managed/install" >}}), with only the reference included in the middleware configuration.



