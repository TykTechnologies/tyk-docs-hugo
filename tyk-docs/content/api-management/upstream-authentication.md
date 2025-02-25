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

---

## Introduction

Tyk Gateway sits between your clients and your services, securely routing requests and responses. For each API proxy that you expose on Tyk, you can configure a range of different methods that clients must use to identify (authenticate) themselves to Tyk Gateway. These are described in detail in the [Client Authentication]({{< ref "api-management/client-authentication" >}}) section.

In the same way as you use Client Authentication to securely confirm the identity of the API clients, your upstream services probably need to securely confirm the identity of their client - namely Tyk. This is where Tyk's flexible **Upstream Authentication** capability comes in.

When using Tyk, you can choose from a range of authentication methods for each upstream API:
- [Mutual TLS]({{< ref "api-management/client-authentication#upstream-mtls" >}})
- [Token-based authentication]({{< ref "#token-based-authentication" >}})
- [Request signing using HMAC]({{< ref "api-management/client-authentication#upstream-hmac-request-signing" >}})
- [Basic Authentication](#basic-authentication)
- [OAuth 2.0](#upstream-oauth-20)
    - [OAuth 2.0 Client Credentials](#oauth-client-credentials)
    - [OAuth 2.0 Password Grant](#oauth-resource-owner-password-credentials)

{{< note success >}}
**Note**  

Note that OAuth 2.0 Password Grant is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported by Tyk for use with legacy upstream services.
{{< /note >}}

<!-- 
## Mutual TLS (mTLS)

what it is
how to use it
- API definition
- Dashboard UI
*** move and improve existing content from the client>gateway auth page ***
-->

<hr>

## Token-based authentication

Token-based authentication (also referred to as Auth Token) is a method whereby the client is identified and authenticated by the server based on a key/token they present as a credential with each request. Typically the token is issued by the server to a specific client.

The server determines how the key should be provided - typically in a request header, cookie or query parameter.

Tyk supports [Auth Token]({{< ref "api-management/client-authentication#use-auth-tokens" >}}) as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to generate access *keys* for an Auth Token protected API as explained in the [documentation]({{< ref "api-management/client-authentication#enable-auth-bearer-tokens-in-your-api-definition-with-the-dashboard" >}}). The client must then provide the *key* in the appropriate parameter for each request.

If your **upstream service** is protected using Auth Token then similarly, Tyk will need to provide a token, issued by the upstream, in the request.

### How to use Upstream Token-based Authentication
Typically Auth Token uses the `Authorization` header to pass the token in the request.

Tyk's [Request Header Transform]({{< ref "api-management/traffic-transformation#request-headers-overview" >}}) middleware can be configured to add this header to the request prior to it being proxied to the upstream. To enhance security by restricting visibility of the access token, the key/token can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only the reference included in the middleware configuration.

<!-- 
## Upstream request signing using HMAC

what it is
how to use it
- API definition
- Dashboard UI
*** move and improve existing content from the HMAC signatures page ***
-->

<hr>

## Basic Authentication

Basic Authentication is a standard authentication mechanism implemented by HTTP servers, clients and web browsers. This makes it an excellent access control method for smaller APIs.

An API request made using Basic Authentication will have an `Authorization` header that contains the client's credentials in the form: `Basic <credentials>`.

The `<credentials>` are a base64 encoded concatenation of a client username and password, joined by a single colon `:`.

Tyk supports Basic Authentication as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to create Basic Auth users, as explained in the [documentation]({{< ref "api-management/client-authentication#protect-your-api-with-basic-authentication" >}}).

If your **upstream service** is protected using Basic Authentication then similarly, Tyk will need to provide user credentials, registered with the upstream, in the request.

### How to use Upstream Basic Authentication

If your upstream service requires that Tyk authenticates using Basic Authentication, you will first need to obtain a valid username and password from the server. To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only references included in the API definition.

If the incoming request from the client already has credentials in the `Authorization` header, then Tyk will replace those with the basic auth credentials before proxying onwards to the upstream.

Sometimes a non-standard upstream server might require the authentication credentials to be provided in a different header (i.e. not `Authorization`). With Tyk, you can easily configure a custom header to be used for the credentials if required.

Upstream Basic Authentication is only supported by Tyk OAS APIs. If you are using Tyk Classic APIs, you could create the client credential offline and add the `Authorization` header using the [Request Header Transform]({{< ref "api-management/traffic-transformation#request-headers-overview" >}}) middleware.

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

## Upstream OAuth 2.0

OAuth 2.0 is an open standard authorization protocol that allows services to provide delegated and regulated access to their APIs; critically the user credentials are not shared with the upstream service, instead the client authenticates with a separate Authentication Server which issues a time-limited token that the client can then present to the upstream (Resource Server). The upstream service validates the token against the Authentication Server before granting access to the client.

The Authentication Server (auth server) has the concept of an OAuth Client - this is equivalent to the client's account on the auth server. There are different ways that a client can authenticate with the auth server, each with their own advantages and disadvantages for different use cases.

The auth server is often managed by a trusted third party Identity Provider (IdP) such as Okta or Auth0.

Tyk supports OAuth 2.0 as a method for authenticating **clients** with the **Gateway** - you can use Tyk's own auth server functionality via the [Tyk OAuth 2.0]({{< ref "api-management/client-authentication#use-tyk-as-an-oauth-20-authorization-server" >}}) auth method or obtain the access token via a third party auth server and use the [JWT Auth]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}) method.

If your **upstream service** is protected using OAuth 2.0 then similarly, Tyk will need to obtain a valid access token to provide in the request to the upstream.

Tyk supports two different OAuth grant types for connecting to upstream services:
- [Client credentials](#oauth-client-credentials)
- [Resource owner password credentials](#oauth-resource-owner-password-credentials)

#### OAuth client credentials

The client credentials grant relies upon the client providing an id and secret (the *client credentials*) to the auth server. These are checked against the list of OAuth Clients that it holds and, if there is a match, it will issue an access token that instructs the Resource Server which resources that client is authorized to access. For details on configuring Tyk to use Upstream Client Credentials see [below](#configuring-upstream-oauth-20-client-credentials-in-the-tyk-oas-api-definition).

#### OAuth resource owner password credentials

The resource owner password credentials grant (also known simply as **Password Grant**) is a flow where the client must provide both their own credentials (client Id and secret) and a username and password identifying the resource owner to the auth server to obtain an access token. Thus the (upstream) resource owner must share credentials directly with the client. This method is considered unsafe and is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported by Tyk for use with legacy upstream services. For details on configuring Tyk to use Upstream Password Grant see [below](#configuring-upstream-oauth-20-password-grant-in-the-tyk-oas-api-definition).

### How to use Upstream OAuth 2.0 for Authentication

If your upstream service requires that Tyk authenticates via an OAuth auth server, you will first need to obtain credentials for the OAuth Client created in the auth server. You select which grant type to use and provide the required credentials in the API definition.

To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only references included in the API definition.

Some auth servers will return *additional metadata* with the access token (for example, the URL of the upstream server that should be addressed using the token if this can vary per client). Tyk can accommodate this using the optional `extraMetadata` field in the API definition. The response from the auth server will be parsed for any fields defined in `extraMetadata`; any matches will be saved to the request context where they can be accessed from other middleware (for our example, the [URL rewrite]({{< ref "api-management/traffic-transformation#url-rewrite-middleware" >}}) middleware could be used to modify the upstream target URL).

#### Configuring Upstream OAuth 2.0 Client Credentials in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For OAuth 2.0 Client Credentials, you will need to add the `oauth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream OAuth authentication
- `allowedAuthorizeTypes` should include the value `clientCredentials`
- `clientCredentials` should be configured with:
    - `tokenUrl` is the URL of the `/token` endpoint on the *auth server*
    - `clientId` is the client ID to be provided to the *auth server*
    - `clientSecret` is the client secret to be provided to the *auth server*
    - `scopes` is an optional array of authorization scopes to be requested
    - `extraMetadata` is an optional array of additional fields to be extracted from the *auth server* response
    - `header.enabled` must be set to `true` if your upstream expects the credentials to be in a custom header, otherwise it can be omitted to use `Authorization` header 
    - `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-62"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-client-credentials",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-client-credentials/"
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
            "name": "example-upstream-client-credentials",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-client-credentials/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/",
            "authentication": {
                "enabled": true,
                "oauth": {
                    "enabled": true,
                    "allowedAuthorizeTypes": [
                        "clientCredentials"
                    ],
                    "clientCredentials": {
                        "header": {
                            "enabled": true,
                            "name": "Authorization"
                        },
                        "tokenUrl": "http://<my-auth-server>/token",
                        "clientId": "client123",
                        "clientSecret": "secret123",
                        "scopes": ["scope1"],
                        "extraMetadata": ["instance_url"]
                    }
                }
            }
        }
    }
}
```

In this example upstream authentication has been enabled (line 44). The authentication method to be used is indicated in lines 46 (OAuth) and 48 (client credentials). When a request is made to the API, Tyk will request an access token from the *authorization server* at `http://<my-auth-server>` providing client credentials and the scope `scope1`.

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation#request-context-variables" >}})).

On receipt of an access token from the *authorization server*, Tyk will proxy the original request to the upstream server (`https://httpbin.org/`) passing the access token in the `Authorization` header.

If you replace the `upstream.url` and *authorization server* details with valid details, then the configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream OAuth 2.0 Client Credentials feature.

#### Configuring Upstream OAuth 2.0 Client Credentials using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **OAuth** from the choice in the **Authentication Method** drop-down, then you can provide the header name, authorization server token URL and select **Client Credentials** to reveal the configuration for the credentials to be passed to the auth server.

{{< img src="/img/dashboard/api-designer/upstream-oauth-client-credentials.png" alt="Tyk OAS API Designer showing Upstream OAuth client credentials configuration options" >}}

#### Configuring Upstream OAuth 2.0 Password Grant in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For OAuth 2.0 Resource Owner Password Credentials (*Password Grant*), you will need to add the `oauth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream OAuth authentication
- `allowedAuthorizeTypes` should include the value `password`
- `password` should be configured with:
    - `tokenUrl` is the URL of the `/token` endpoint on the *auth server*
    - `clientId` is the client ID to be provided to the *auth server*
    - `clientSecret` is the client secret to be provided to the *auth server*
    - `username` is the Resource Owner username to be provided to the *auth server*
    - `password` is the Resource Owner password to be provided to the *auth server*
    - `scopes` is an optional array of authorization scopes to be requested
    - `extraMetadata` is an optional array of additional fields to be extracted from the *auth server* response
    - `header.enabled` must be set to `true` if your upstream expects the credentials to be in a custom header, otherwise it can be omitted to use `Authorization` header 
    - `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-64"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-password-grant",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-password-grant/"
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
            "name": "example-upstream-password-grant",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-password-grant/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/",
            "authentication": {
                "enabled": true,
                "oauth": {
                    "enabled": true,
                    "allowedAuthorizeTypes": [
                        "password"
                    ],
                    "password": {
                        "header": {
                            "enabled": true,
                            "name": "Authorization"
                        },
                        "tokenUrl": "http://<my-auth-server>/token",
                        "clientId": "client123",
                        "clientSecret": "secret123",
                        "username": "user123",
                        "password": "pass123",
                        "scopes": ["scope1"],
                        "extraMetadata": ["instance_url"]
                    }
                }
            }
        }
    }
}
```

In this example upstream authentication has been enabled (line 44). The authentication method to be used is indicated in lines 46 (OAuth) and 48 (password grant). When a request is made to the API, Tyk will request an access token from the *authorization server* at `http://<my-auth-server>` providing client credentials, resource owner credentials and the scope `scope1`.

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation#request-context-variables" >}})).

On receipt of an access token from the *authorization server*, Tyk will proxy the original request to the upstream server (`https://httpbin.org/`) passing the access token in the `Authorization` header.

If you replace the `upstream.url` and *authorization server* details with valid details, then the configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream OAuth 2.0 Password Grant feature.

#### Configuring Upstream OAuth 2.0 Password Grant using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **OAuth** from the choice in the **Authentication Method** drop-down, then you can provide the header name, authorization server token URL and select **Resource Owner Password Credentials** to reveal the configuration for the credentials to be passed to the auth server.

{{< img src="/img/dashboard/api-designer/upstream-oauth-password-grant.png" alt="Tyk OAS API Designer showing Upstream OAuth password grant configuration options" >}}
