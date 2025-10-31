---
title: Upstream Authentication using OAuth
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - oauth
description: How to authenticate upstream service using oauth
date: "2025-04-15"
---

## Upstream OAuth 2.0

OAuth 2.0 is an open standard authorization protocol that allows services to provide delegated and regulated access to their APIs; critically the user credentials are not shared with the upstream service, instead the client authenticates with a separate Authentication Server which issues a time-limited token that the client can then present to the upstream (Resource Server). The upstream service validates the token against the Authentication Server before granting access to the client.

The Authentication Server (auth server) has the concept of an OAuth Client - this is equivalent to the client's account on the auth server. There are different ways that a client can authenticate with the auth server, each with their own advantages and disadvantages for different use cases.

The auth server is often managed by a trusted third party Identity Provider (IdP) such as Okta or Auth0.

Tyk supports OAuth 2.0 as a method for authenticating **clients** with the **Gateway** - you can use Tyk's own auth server functionality via the [Tyk OAuth 2.0]({{< ref "api-management/authentication/oauth-2" >}}) auth method or obtain the access token via a third party auth server and use the [JWT Auth]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) method.

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

To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed/install" >}}), with only references included in the API definition.

Some auth servers will return *additional metadata* with the access token (for example, the URL of the upstream server that should be addressed using the token if this can vary per client). Tyk can accommodate this using the optional `extraMetadata` field in the API definition. The response from the auth server will be parsed for any fields defined in `extraMetadata`; any matches will be saved to the request context where they can be accessed from other middleware (for our example, the [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) middleware could be used to modify the upstream target URL).

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

Note that if you use the [Tyk API Designer]({{< ref "api-management/upstream-authentication/basic-auth#configuring-upstream-basic-auth-using-the-api-designer" >}}) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

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

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation/request-context-variables" >}})).

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

Note that if you use the [Tyk API Designer]({{< ref "api-management/upstream-authentication/basic-auth#configuring-upstream-basic-auth-using-the-api-designer" >}}) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

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

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation/request-context-variables" >}})).

On receipt of an access token from the *authorization server*, Tyk will proxy the original request to the upstream server (`https://httpbin.org/`) passing the access token in the `Authorization` header.

If you replace the `upstream.url` and *authorization server* details with valid details, then the configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream OAuth 2.0 Password Grant feature.

#### Configuring Upstream OAuth 2.0 Password Grant using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **OAuth** from the choice in the **Authentication Method** drop-down, then you can provide the header name, authorization server token URL and select **Resource Owner Password Credentials** to reveal the configuration for the credentials to be passed to the auth server.

{{< img src="/img/dashboard/api-designer/upstream-oauth-password-grant.png" alt="Tyk OAS API Designer showing Upstream OAuth password grant configuration options" >}}

{{< note success >}}
**Note**  

Any error encountered in the communication with the OAuth server will generate an `UpstreamOAuthError` event. This event can be used to trigger an event handler, for example you could use a [webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) to alert the system administrator of the issue.

{{< /note >}}