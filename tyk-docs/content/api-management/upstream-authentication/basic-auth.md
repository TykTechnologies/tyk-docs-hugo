---
title: Upstream Authentication using Basic Auth
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - basic auth
description: How to authenticate upstream service basic authentication
date: "2025-04-15"
---

## Availability 

| Component   | Editions   |
| ----------- | ---------- |
| Tyk Gateway & Dashboard | Enterprise |

## Basic Authentication

Basic Authentication is a standard authentication mechanism implemented by HTTP servers, clients and web browsers. This makes it an excellent access control method for smaller APIs.

An API request made using Basic Authentication will have an `Authorization` header that contains the client's credentials in the form: `Basic <credentials>`.

The `<credentials>` are a base64 encoded concatenation of a client username and password, joined by a single colon `:`.

Tyk supports Basic Authentication as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to create Basic Auth users, as explained in the [documentation]({{< ref "api-management/authentication/basic-authentication#registering-basic-authentication-user-credentials-with-tyk" >}}).

If your **upstream service** is protected using Basic Authentication then similarly, Tyk will need to provide user credentials, registered with the upstream, in the request.

### How to use Upstream Basic Authentication

If your upstream service requires that Tyk authenticates using Basic Authentication, you will first need to obtain a valid username and password from the server. To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed/install" >}}), with only references included in the API definition.

If the incoming request from the client already has credentials in the `Authorization` header, then Tyk will replace those with the basic auth credentials before proxying onwards to the upstream.

Sometimes a non-standard upstream server might require the authentication credentials to be provided in a different header (i.e. not `Authorization`). With Tyk, you can easily configure a custom header to be used for the credentials if required.

Upstream Basic Authentication is only supported by Tyk OAS APIs. If you are using Tyk Classic APIs, you could create the client credential offline and add the `Authorization` header using the [Request Header Transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware.

#### Configuring Upstream Basic Auth in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For Basic Authentication, you will need to add the `basicAuth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream basic authentication
- `username` is the username to be used in the request *credentials*
- `password` is the password to be used in the request *credentials*
- `header.enabled` must be set to `true` if your upstream expects the *credentials* to be in a custom header, otherwise it can be omitted to use `Authorization` header 
- `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-54"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-basic-auth",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-basic-auth/"
        }
    ],
    "security": [],
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "components": {
    "securitySchemes": {}
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-upstream-basic-auth",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-basic-auth/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/basic-auth/myUsername/mySecret",
            "authentication": {
                "enabled": true,
                "basicAuth": {
                    "password": "mySecret",
                    "username": "myUsername",
                    "enabled": true,
                    "header": {
                        "enabled": true,
                        "name": "Authorization"
                    }
                }
            }
        }
    }
}
```

In this example upstream authentication has been enabled (line 44). Requests will be proxied to the `GET /basic-auth` endpoint at httpbin.org using the credentials in lines 46 and 47 (username: myUsername, password: mySecret). These credentials will be combined, base64 encoded and then provided in the `Authorization` header, as required by the httpbin.org [documentation](https://httpbin.org/#/Auth/get_basic_auth__user___passwd_").

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream Basic Authentication feature.

#### Configuring Upstream Basic Auth using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **Basic Auth** from the choice in the **Authentication Method** drop-down, then you can provide the client credentials and header name.

{{< img src="/img/dashboard/api-designer/upstream-basic-auth.png" alt="Tyk OAS API Designer showing Upstream Basic Auth configuration options" >}}

<hr>
