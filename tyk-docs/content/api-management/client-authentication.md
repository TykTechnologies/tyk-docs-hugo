---
title: Client Authentication and Authorization
description: Learn how to apply the most appropriate authentication method to secure access your APIs with Tyk. Here you will find everything there is to know about authenticating and authorizing API clients with Tyk.
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
aliases:
  - /advanced-configuration/integrate/api-auth-mode/json-web-tokens
  - /advanced-configuration/integrate/api-auth-mode/oidc-auth0-example
  - /advanced-configuration/integrate/api-auth-mode/open-id-connect
  - /basic-config-and-security/security/authentication--authorization
  - /basic-config-and-security/security/authentication--authorization/oauth2-0/auth-code-grant
  - /basic-config-and-security/security/authentication--authorization/oauth2-0/client-credentials-grant
  - /basic-config-and-security/security/authentication--authorization/oauth2-0/refresh-token-grant
  - /basic-config-and-security/security/authentication--authorization/oauth2-0/username-password-grant
  - /basic-config-and-security/security/authentication-authorization/
  - /basic-config-and-security/security/authentication-authorization/basic-auth
  - /basic-config-and-security/security/authentication-authorization/bearer-tokens
  - /basic-config-and-security/security/authentication-authorization/ext-oauth-middleware
  - /basic-config-and-security/security/authentication-authorization/go-plugin-authentication
  - /basic-config-and-security/security/authentication-authorization/hmac-signatures
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-auth0
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-keycloak
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/split-token
  - /basic-config-and-security/security/authentication-authorization/multiple-auth
  - /basic-config-and-security/security/authentication-authorization/oauth-2-0
  - /basic-config-and-security/security/authentication-authorization/open-keyless
  - /basic-config-and-security/security/authentication-authorization/openid-connect
  - /basic-config-and-security/security/authentication-authorization/physical-key-expiry
  - /basic-config-and-security/security/authentication-authorization/python-etc-plugin-authentication
  - /basic-config-and-security/security/authentication-&-authorization
  - /basic-config-and-security/security/authentication-&-authorization/oauth2-0/auth-code-grant
  - /basic-config-and-security/security/authentication-&-authorization/oauth2-0/client-credentials-grant
  - /basic-config-and-security/security/authentication-&-authorization/oauth2-0/refresh-token-grant
  - /basic-config-and-security/security/authentication-&-authorization/oauth2-0/username-password-grant
  - /basic-config-and-security/security/mutual-tls
  - /basic-config-and-security/security/mutual-tls/client-mtls
  - /basic-config-and-security/security/mutual-tls/concepts
  - /basic-config-and-security/security/mutual-tls/upstream-mtls
  - /basic-config-and-security/security/your-apis/oauth20/revoke-oauth-tokens
  - /security/your-apis
  - /security/your-apis/bearer-tokens
  - /security/your-apis/json-web-tokens
  - /security/your-apis/openid-connect
  - /tyk-apis/tyk-gateway-api/api-definition-objects/jwt/docs/basic-config-and-security/security/authentication-authorization/json-web-tokens
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/auth-code-grant
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/client-credentials-grant
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/refresh-token-grant
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/username-password-grant
  - /basic-config-and-security/security/authentication-authorization/oauth2.0/auth-code-grant
  - /basic-config-and-security/security/authentication-authorization/physical-token-expiry
  - /basic-config-and-security/security/tls-and-ssl/mutual-tls
  - /basic-config-and-security/security/your-apis/oauth2.0/revoke-oauth-tokens
  - /security/tls-and-ssl/mutual-tls
  - /security/your-apis/oauth-2-0
  - /api-management/client-authentication.md
  - /api-management/authentication-authorization



---

## Introduction

Tyk Gateway sits between your clients and your services, securely routing requests and responses. For each API proxy that you expose on Tyk, you can configure a range of different methods that clients must use to identify (authenticate) themselves to Tyk Gateway when making a request to access the API.

*Authentication* and *Authorization* are the processes that you use to control access to your APIs and protect your upstream services. Each serves a distinct purpose:

* **Authentication** (or **AuthN**) is the process of confirming the identity of the user or system making the API request. This step validates "who" is attempting to access the API, commonly using credentials such as tokens, passwords, or certificates.

* **Authorization** (or **AuthZ**) is the process that determines if the user or system has the right permissions to perform the requested action. This step defines "what" they are allowed to do based on assigned roles, scopes, or policies.

Whilst AuthN and AuthZ are separate actions with different standards, they are often considered together under the topic of *Securing the API*. Together, these processes allow API providers to control access, safeguard data integrity, and meet security and compliance standards, making them vital for any API management strategy.

---

## How does Tyk Implement Authentication and Authorization?

The API request processing flow within Tyk Gateway consists of a [chain of middleware]({{< ref "concepts/middleware-execution-order" >}}) that perform different checks and transformations on the request (headers, parameters and payload). Several dedicated **authentication middleware** are provided and there is also support for user-provided **custom authentication plugins**. Multiple authentication middleware can be chained together if required by the API's access security needs. *Note that it is not possible to set the order of chained auth methods.*

The middleware to be used is selected and configured using the API definition:
- when using Tyk OAS APIs, the OpenAPI description can contain a list of `securitySchemes` which define the authentication methods to be used for the API; the detailed configuration of the Tyk authentication middleware is set in the in the `server.authentication` section of the `x-tyk-api-gateway` extension
- when using Tyk Classic APIs, each authentication middleware has its own section within the API definition

For all authentication methods, Tyk provides an option to strip the authorization metadata (e.g. the `Authorization` header) from the request before proxying it to the upstream. This avoids the risk of accidentally exposing sensitive data to the upstream or conflicting with upstream authentication.

## What does Tyk Support?

Tyk includes support for various industry-standard methods to secure your APIs. This page provides an overview of the options available, helping you to choose and implement what works best for you.

Use Ctrl+F or the sidebar to find specific topics, for example “JWT” for JSON Web Tokens or “mTLS” for mutual TLS.

You can also use the links below to jump directly to the appropriate sections to learn how to secure your APIs using Tyk.

{{< grid >}}
{{< badge title="OAuth 2.0" href="api-management/client-authentication/#use-tyk-as-an-oauth-20-authorization-server" >}}
Delegate authentication using one of the most widely used open standard protocols
{{< /badge >}}

{{< badge title="JWT" href="api-management/client-authentication/#use-json-web-tokens-jwt" >}}
Securely transmit information between parties.
{{< /badge >}}

{{< badge title="Basic Auth" href="api-management/client-authentication/#use-basic-authentication" >}}
Secure APIs with username and password credentials.
{{< /badge >}}

{{< badge title="Auth Tokens" href="api-management/client-authentication/#use-auth-tokens" >}}
Implement token-based authentication for API access.
{{< /badge >}}

{{< badge title="mTLS" href="api-management/client-authentication/#use-mutual-tls" >}}
Establish secure channels with two-way certificate verification.
{{< /badge >}}

{{< badge title="HMAC" href="api-management/client-authentication/#sign-requests-with-hmac" >}}
Verify message integrity using shared secret keys.
{{< /badge >}}

<!-- To be added
{{< badge title="RSA" href="api-management/client-authentication/#sign-requests-with-rsa" >}}
Verify message integrity using shared secret certificates.
{{< /badge >}}
-->

{{< badge title="Custom Authentication" href="api-management/client-authentication/#custom-authentication" >}}
Create custom plugins to implement specific authentication requirements.
{{< /badge >}}

{{< badge title="Open Access" href="api-management/client-authentication/#open-no-authentication" >}}
Allow unrestricted access for public APIs.
{{< /badge >}}

{{< /grid >}}

---

## Use Tyk as an OAuth 2.0 Authorization Server

Tyk can act as a OAuth 2.0 *authorization server*, performing token generation and management for *clients* accessing APIs deployed on Tyk. There are many great resources on the Internet that will help you to understand the OAuth 2.0 Authorization Framework, which we won't attempt to duplicate here. We have provided a basic introduction to the [concepts and terminology](#oauth-20-core-concepts) before we dive into the details of using Tyk as your *auth server*.

Tyk offers some great features when used as the *authorization server* including:

- **Fine-Grained Access Control:** Manage access using Tyk's built-in access controls, including versioning and named API IDs
- **Usage Analytics:** Leverage Tyk's analytics capabilities to monitor OAuth 2.0 usage effectively, grouping data by Client Id
- **Multi-API Access**: Enable access to multiple APIs using a single OAuth token; configure one API for OAuth 2.0 token issuance and the other APIs with the [Auth Token](#use-auth-tokens) method, linking them through a common policy

*Tyk as OAuth authorization server* supports the following *grant types*:

- [Authorization Code Grant](#using-the-authorization-code-grant): the *client* is redirected to an *identity server* where the *user* must approve access before an *access token* will be issued
- [Client Credentials Grant](#using-the-client-credentials-grant): used for machine-to-machine access, authentication is performed using only the *client Id* and *client secret*
- [Resource Owner Password Grant](#using-the-resource-owner-password-grant) (a.k.a. Password Grant): only for use where the *client* is highly trusted, as the *client* must provide the *Resource Owner*'s own credentials during authentication

{{< note success >}}
**Note**  

**Tyk does not recommend the use of Resource Owner Password Grant**. This method is considered unsafe and is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported for use with legacy clients.
{{< /note >}}

To make use of this, you'll need to:

- understand how to integrate your *client* (and, for Authorization Code grant, your *identity server*) according to the OAuth grant type
- [register a client app](#client-app-registration) for each client that needs to access the API
- [configure your API proxy](#configuring-your-api-proxy) to use the *Tyk OAuth 2.0* authentication method


<!--
This video probably needs to be re-recorded with Tyk OAS, so not publishing for now:
{{< youtube-seo id="C4CUDTIHynk" title="Using OAuth2.0 To Authenticate Your APIs">}}
-->

### OAuth 2.0 Core Concepts

**OAuth 2.0** (Open Authorization 2.0) is a widely adopted authorization protocol that allows third-party applications to access user resources securely, without needing to expose sensitive credentials such as user passwords. It is an industry-standard framework that enables a delegated approach to securing access to APIs and services. The [IETF OAuth 2.0 specification](https://datatracker.ietf.org/doc/html/rfc6749) outlines the standard for OAuth 2.0.

> "The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf." — [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)

OAuth 2.0 provides a mechanism for **client applications** to request limited access to resources hosted by a **resource server**, on behalf of a **resource owner** (typically a user), without exposing the resource owner's credentials. This allows secure sharing of data between applications—for example, allowing a calendar app to access a user's contacts to automatically find available time slots for meetings.

OAuth 2.0 has many variations and flows suited for different use cases, this section will provide an overview of the core principles, terminology, and key concepts, specifically focusing on how you can implement OAuth 2.0 with Tyk.

#### Terminology

- **Protected Resource**: The service or data that is protected by OAuth (e.g. an API endpoint) and requires authorization to access.
- **Resource Owner**: The **user** or system that owns the *Protected Resource* and has the ability to grant or deny access to it.
- **Client**: The application or system that seeks access to the *Protected Resource*. It acts on behalf of the *Resource Owner*.
- **Access Token**: A short-lived piece of data that grants the *Client* access to the *Protected Resource*. The token proves that the *Client* has been authorized by the *Resource Owner*.
- **Authorization Server**: The server that issues *Access Tokens* to the *Client* after validating the *Client*'s identity and obtaining consent from the *Resource Owner*.
- **Client Application**: The application that requests authorization from the *Authorization Server*. This application must first be registered with the *Authorization Server* to obtain credentials (*Client Id* and *Client Secret*).
- **Resource Server**: The server that hosts the *Protected Resource*. It receives access requests from *Clients*, which must include a valid *Access Token*.
- **Identity Server**: A server that authenticates the *Resource Owner*, offering the facility to log in and authorize *Client* access to *Protected Resources*.
- **Scope**: Defines the specific permissions or access levels being requested by the *Client* (e.g. read, write, delete).
- **Grant Type**: The method by which the *Client* obtains an *Access Token*, based on the OAuth flow being used (e.g. Authorization Code, Client Credentials, Resource Owner Password Credentials).

#### Access Tokens

In OAuth 2.0, **access tokens** are used to represent the authorization granted to the *client* by the *resource owner*. These tokens are typically small, opaque data objects that are passed along with each API request to authenticate the *client*. While the OAuth 2.0 specification does not mandate a specific format, **JSON Web Tokens (JWTs)** are commonly used as they can encode metadata, such as the *user*'s identity, permissions, and token expiry time.

Tokens usually come with an expiration date to limit the time they are valid and minimize the risk of abuse. *Access tokens* can often be refreshed via a **refresh token** if they expire, allowing for long-lived access without requiring the *user* (*resource owner*) to reauthorize the *application* (*client*).

#### Client Application

For a *client* to request an *Access Token* from the *Authorization Server*, it must first authenticate itself. This ensures that the *Resource Owner* can confidently delegate access to the requested resources.

To do this, the *client* is registered with the *Authorization Server* as a **Client Application**, which requires the following elements:

- **Client Id**: A unique, public identifier for the *client application* (e.g., a username or application name).
- **Client Secret**: A confidential string (like a password) that is shared between the *client* and the *Authorization Server*. The *client secret* is never exposed to the *Resource Owner*.
- **Redirect URI**: The URL to which the *client* will be redirected after the authorization process is complete (either granted or denied).

The *client* sends the *client Id* and *client secret* during the authorization request to prove its identity and authenticate its request for an *access token*. Depending on the OAuth *grant type* being used (e.g. Authorization Code Flow, Client Credentials Flow), the *Authorization Server* will authenticate the *client* and, if successful, issue an *Access Token*.


### Manage Client Access Policies
 
The *access tokens* issued to clients by *Tyk Authorization Server* are the same as other [session objects]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}) and can be associated with [access security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) at the point of creation. These allow the application of quotas, rate limits and access rights in the normal manner.

Security policies can be assigned to *client apps* and will be applied to all access tokens issued for that *client app*.


### Client App Registration

For all grant types, the first common step is the registration of the *client* with Tyk Dashboard by creation of a *Client App*. This will allocate a *client Id* and *client secret* that must be provided in future authentication requests by the *client*.

#### Using the Tyk Dashboard UI

1. *Client apps* are registered per-API, so the first step is to [configure Tyk OAuth 2.0](#configuring-your-api-proxy) as the security method to be used for the API. With this done, you can navigate to the OAuth Client management screen for the API from the **Actions** menu on the **Created APIs** screen:

{{< img src="/img/api-management/security/create-oauth-from-api-list.png" alt="Accessing the list of OAuth Clients for an API" >}}

2. You will now be prompted to register a *client app* that will be granted access to the API configuring:

- redirect URI
- [optional] [security policies](#manage-client-access-policies) to be applied to access tokens generated for the client
- [optional] [metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}) to be added to the access tokens

{{< img src="/img/api-management/security/fill-out-client-details-oauth.png" alt="Add New OAuth Client" >}}

**Note**: when using *Authorization Code grant* the *redirect uri* configured for the *client app* must be the same as that configured in the API definition.

Select the **Create** button to register the *client app*.

3. In the OAuth Client management screen, you will see a list of *client apps* registered with the API (as identified by their *client Id*). By clicking on the list item, or from the **Actions** menu's **Edit** option you will be taken to the *Edit Client app* screen, where you can see the *client secret* and make any modifications you need. There is also the option to [revoke tokens](#revoking-access-tokens) that have been issued for this *client app*.

{{< img src="/img/api-management/security/client-secret-oauth.png" alt="View client Id and client secret" >}}

#### Using the Tyk Dashboard API

The Tyk Dashboard API contains several endpoints that are provided to manage *client apps*. *Client apps* are registered per-API, so each takes as an input the *API Id* for the API:

| Action | Endpoint | Reference |
| --- | --- | --- |
| Register a new client app | `POST /api/apis/oauth/{{api-id}}` | [link]({{< ref "api-management/dashboard-configuration#create-a-new-oauth20-client" >}}) |
| Get a list of registered client apps | `GET /api/apis/oauth/{{api-id}}` | [link]({{< ref "api-management/dashboard-configuration#list-oauth-clients" >}}) |
| Get the details of a client app | `GET /api/apis/oauth/{{api-id}}/{{client_id}}` | [link]({{< ref "api-management/dashboard-configuration#get-an-oauth20-client" >}}) |
| Delete a client app | `DELETE /api/apis/oauth/{{api-id}}/{{client_id}}` | [link]({{< ref "api-management/dashboard-configuration#delete-oauth-client" >}}) |


### Using the Authorization Code Grant

When using Tyk as the Authorization Server with the Authorization Code grant, the following steps are followed after [registering the Client App](#client-app-registration):

{{< img src="/img/diagrams/diagram_docs_authorization-code-grant-type@2x.png" alt="Authorization grant type flow" >}}

**Explanatory notes:**

(1) *client* makes a request to the [authorization endpoint](#authorization-request) on the *Auth Server*

(2) The *Auth Server* notes the request parameters and returns `HTTP 307 Temporary Redirect`, redirecting the user to an *Identity Server* 

(5) the *user* must log in on the *Identity Server* and authorize the *client*

(6) when the *user* successfully authenticates and authorizes the request, the *Identity Server* must request an [Authorization Code](#authorization-code-request) from the *Auth Server*

(8) The *Identity Server* provides the *Authorization Code* to the *client*

(9) The *client* exchanges the *Authorization Code* for an [Access Token](#exchange-the-authorization-code-for-an-access-token) from the *Auth Server*

(10) The *client* uses the *Access Token* to authenticate with the protected API using the [Auth Token](#use-auth-tokens) method

#### Integration with Identity Server

Whilst Tyk can provide the *authorization server* functionality, issuing and managing access and authorization tokens, the *identity server* functions (authenticating users (resource owners) and allowing them to authorize client access) must be performed by a separate Identity Provider (IdP).

The identity server will need access to the Tyk Dashboard API to [obtain an Authorization Code]({{< ref "api-management/dashboard-configuration#oauth20-authorization-code" >}}).

#### Authorization Request

The authorization endpoint for an API proxy on Tyk is a special endpoint automatically added to the proxy definition, accessible from `POST /<listen-path>/oauth/authorize`

The following parameters are required in a request to this endpoint:

| Parameter       | Value                      |
| --------------- | -------------------------- |
| `response_type` | `code`                     |
| `client_id`     | client Id                  |
| `redirect_uri`  | Redirect URI (URL encoded) |

For example:

```bash
curl -X POST https://tyk.cloud.tyk.io/my-api/oauth/authorize/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "response_type=code&client_id=my-client-id&redirect_uri=http%3A%2F%2Fidentityserver.com%2Fclient-redirect-uri"
```

This command, issued by the *client* is the first step of requesting access to the `/my-api` proxy deployed on a Tyk Gateway at `https://tyk.cloud.tyk.io`.

If the *client Id* (`my-client-id`) is valid, the response will be `HTTP 307 Temporary Redirect` with the redirect URI (`http://identityserver.com/client-redirect-uri`) in the `location` header.

#### Authorization Code Request

The *Identity Server* requests an *Authorization Code* from the *Authentication Server*. Tyk's *authorization code* endpoint is hosted in the [Tyk Dashboard API]({{< ref "api-management/dashboard-configuration#oauth20-authorization-code" >}}), accessible from `POST /api/apis/{api_id}/authorize-client`. The same `redirect_uri` as provided in the original request must be provided alongside the `client_id` as a security feature to verify the client identity.

This endpoint is protected using the Dashboard API secret assigned to the *Identity Server*, which must be provided in the `Authorization` header.

The following parameters are required in a `POST` request to this endpoint:

| Parameter       | Value                      |
| --------------- | -------------------------- |
| `response_type` | `code`                     |
| `client_id`     | client Id                  |
| `redirect_uri`  | Redirect URI (URL encoded) |

For example:

```bash
curl -X POST \
  https://admin.cloud.tyk.io/api/apis/oauth/{my-api-id}/authorize-client/ \
  -H "Authorization: <dashboard-secret>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "response_type=code&client_id=my-client-id&redirect_uri=http%3A%2F%2Fidentityserver.com%2Fclient-redirect-uri"
```

This command, issued by the *identity server* requests an *authorization code* from the Tyk Dashboard at `https://admin.cloud.tyk.io` to access the proxy with API Id `my-api-id`.

If the *client Id* (`my-client-id`) is valid and `redirect_uri` matches the one provided in the initial request, an *authorization code* will be provided in the response payload, for example:

```json
{
  "code": "EaG1MK7LS8GbbwCAUwDo6Q",
  "redirect_to": "http://example.com/client-redirect-uri?code=EaG1MK7LS8GbbwCAUwDo6Q"
}
```

#### Exchange the Authorization Code for an Access Token

Once the *client* has the *authorization code*, it can exchange this for an *access token*, which is used to access the protected API. The token exchange endpoint for an API proxy on Tyk is a special endpoint automatically added to the proxy definition, accessible from `POST /<listen-path>/oauth/token`.

This endpoint is protected using [Basic Authentication](#use-basic-authentication)) where the username is the *client Id* and the password is the *client secret*.

The following parameters are required in the request:

| Parameter       | Value                      |
| --------------- | -------------------------- |
| `grant_type`    | `authorization_code`       |
| `client_id`     | client Id                  |
| `code`          | Authorization Code         |
| `redirect_uri`  | Redirect URI (URL encoded) |

For example:

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/my-api/oauth/token/ \
  -H "Authorization: Basic bXktY2xpZW50LWlkOm15LWNsaWVudC1zZWNyZXQ=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&client_id=my-client-id&code=EaG1MK7LS8GbbwCAUwDo6Q&redirect_uri=http%3A%2F%2Fidentityserver.com%2Fclient-redirect-uri"
```

This command, issued by the *client* is the final step to obtain an access token for the `/my-api` proxy deployed on a Tyk Gateway at `https://tyk.cloud.tyk.io`. The basic auth key is the base64 encoded representation of `my-client-id:my-client-secret` The `client_id` and `redirect_uri` match those provided in the initial [authorization request](#authorization-request). The `code` is the *authorization code* provided to the *identity server* in the [authorization code request](#authorization-code-request).

The response payload contains:
- `access_token`: the token which can be used by the *client* to access the protected API
- `expires_in`: the expiration date/time of the access token
- `token_type`: set to `bearer` indicating that the access token should be provided in an [Auth Token](#use-auth-tokens) request to the protected API
- `refresh_token`: [optional] a special token that can be used in the [Refresh Token](#using-refresh-tokens) flow

For example:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```



### Using the Client Credentials Grant
When using Tyk as the *authorization server* with the Client Credentials grant, the *client* accesses resources on behalf of itself rather than on behalf of a *user*, so there is no user login/authorization step (as seen with [Authorization Code grant](#using-the-authorization-code-grant)). This flow is ideal for server-to-server interactions.

After [registering the Client App](#client-app-registration), the *client* simply requests an access token directly from the authorization server:

{{< img src="/img/diagrams/diagram_docs_client-credentials-grant-type@2x.png" alt="Client Credentials grant type flow" >}}

#### Access Token Request

The *client* obtains an access token for an API proxy on Tyk from a special endpoint automatically added to the proxy definition, accessible from `POST /<listen-path>/oauth/token`.

This endpoint is protected using Basic Authentication where the username is the client Id and the password is the client secret.

The following parameters are required in the request:

| Parameter       | Value                      |
| --------------- | -------------------------- |
| `grant_type`    | `client_credentials`       |
| `client_id`     | client Id                  |
| `secret`        | client secret              |

For example:

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/my-api/oauth/token/ \
  -H "Authorization: Basic bXktY2xpZW50LWlkOm15LWNsaWVudC1zZWNyZXQ=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=my-client-id&client_secret=my-client-secret"
```

This command, issued by the *client* will obtain an access token for the `/my-api` proxy deployed on a Tyk Gateway at `https://tyk.cloud.tyk.io`. The basic auth key is the base64 encoded representation of `my-client-id:my-client-secret` The `client_id` and `client_secret` match those allocated by Tyk (the auth server) for the *client app*.

The response payload contains:
- `access_token`: the token which can be used by the *client* to access the protected API
- `expires_in`: the expiration date/time of the access token
- `token_type`: set to `bearer` indicating that the access token should be provided in an [Auth Token](#use-auth-tokens) request to the protected API

For example:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "token_type": "bearer"
}
```

{{< note success >}}
**Note**  

Note that Client Credentials grant does not produce a *refresh token*.
{{< /note >}}



### Using the Resource Owner Password Grant
When using Tyk as the *authorization server* with the Resource Owner Password grant, the *client* provides the *user's* credentials when requesting an access token. There is no user login/authorization step (as seen with [Authorization Code grant](#using-the-authorization-code-grant)). **This flow is not recommended and is provided only for integration with legacy clients.**

After [registering the Client App](#client-app-registration), the *client* simply requests an access token directly from the authorization server:

{{< img src="/img/diagrams/diagram_docs_username-_-password-grant-type@2x.png" alt="Username and password grant sequence" >}}

#### Access Token Request

The *client* obtains an access token for an API proxy on Tyk from a special endpoint automatically added to the proxy definition, accessible from `POST /<listen-path>/oauth/token`.

This endpoint is protected using [Basic Authentication](#use-basic-authentication) where the username is the client Id and the password is the client secret.

The following parameters are required in the request:

| Parameter       | Value                                                  |
| --------------- | ------------------------------------------------------ |
| `grant_type`    | `password`                                             |
| `client_id`     | client Id                                              |
| `username`      | resource owner's username (`resource-owner-username`)  |
| `password`      | resource owner's password  (`resource-owner-password`) |

For example:

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/my-api/oauth/token/ \
  -H "Authorization: Basic bXktY2xpZW50LWlkOm15LWNsaWVudC1zZWNyZXQ=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&client_id=my-client-id&username=resource-owner-username&password=resource-owner-password"
```

This command, issued by the *client* will obtain an access token for the `/my-api` proxy deployed on a Tyk Gateway at `https://tyk.cloud.tyk.io`. The basic auth key is the base64 encoded representation of `my-client-id:my-client-secret` The `client_id` and `client_secret` match those allocated by Tyk (the auth server) for the *client app*.

The response payload contains:
- `access_token`: the token which can be used by the *client* to access the protected API
- `expires_in`: the expiration date/time of the access token
- `token_type`: set to `bearer` indicating that the access token should be provided in an [Auth Token](#use-auth-tokens) request to the protected API
- `refresh_token`: [optional] a special token that can be used in the [Refresh Token](#using-refresh-tokens) flow

For example:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "YjdhOWFmZTAtNmExZi00ZTVlLWIwZTUtOGFhNmIwMWI3MzJj",
  "token_type": "bearer"
}
```


### Configuring your API Proxy

As explained [previously](#how-does-tyk-implement-authentication-and-authorization), the AuthN/Z methods to be used to secure an API proxy are configured in the API definition. This permits granular application of the most appropriate method to each API deployed on Tyk Gateway.

When using Tyk as the Authorization Server, the API configuration can be applied using the Tyk Dashboard's API Designer UI, or by direct modification of the API definition. We will provide examples here when using Tyk OAS APIs. If you are using Tyk Classic APIs, the process is very similar, though there are differences in the location and specific labelling of options.

#### Using the Tyk API Designer

1. Client Authentication is configured on the **Settings** screen within the Tyk OAS API Designer, within the **Server** section. Ensure that you are in **Edit** mode, click on the button to **Enable** *Authentication* and then select **Tyk OAuth 2.0** from the drop down options:

{{< img src="/img/dashboard/system-management/oauth-auth-mode-new.png" alt="Set Authentication Mode" >}}

2. Select the OAuth Grant Type that you wish to use for the API, if appropriate you can also select the *Refresh Token* grant so that the Auth Server (Tyk) will generate both access and refresh tokens.

3. Provide the requested configuration options depending on the selected Grant Type. Note that for *Authorization Code Grant*, **Redirect URL** should be the login page for your Identity Server and must be matched by the `redirect_uri` provided in the *client app* (and in the client's authentication request). The [Notifications](#oauth-token-notifications) configuration can be provided for *Authorization Code* and *Password* grants.

4. Select **Save API** to apply the new settings.

#### Using the Tyk OAS API Definition

The OpenAPI description can contain a list of `securitySchemes` which define the authentication methods available to be used for the API. This is described in detail [here](https://swagger.io/docs/specification/v3_0/authentication/oauth2/). Note that Tyk implements Relative Endpoint URLs, as described in that link, for the `authorizationUrl`, `tokenUrl` and `refreshUrl`. Remember to declare which of the defined `securitySchemes` and scopes are to be used by configuring the `security` fields in the OpenAPI description, note that Tyk only supports API level configuration of `security` not at the operation level.

The Tyk specific configuration must be provided in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `server` section.

Set `server.authentication.enabled` to `true` to enable client authentication and add the `securitySchemes/oauth` section within `server.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable client OAuth authentication
- `allowedAuthorizeTypes` depending on the OAuth grant types to be supported: `code` or `token`
- `authLoginRedirect` is the redirect URL to the *Identity Server* login page
- `header`, `query` or `cookie` should be configured to indicate where the access token will be provided (once the client has successfully gained authorization to access the resource)
- `refreshToken` set to `true` if Tyk should generate *refresh tokens*

For example:

```json {hl_lines=["7-11", "14-24", "35-55"],linenos=true, linenostart=1}
{
  "info": {
    "title": "My OAuth API",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "security": [
    {
      "oauth": []
    }
  ],
  "paths": {},
  "components": {
    "securitySchemes": {
      "oauth": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "/oauth/authorize",
            "scopes": {},
            "tokenUrl": "/oauth/token"
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "My OAuth API",
      "state": {
        "active": true,
      }
    },
    "server": {
      "authentication": {
        "enabled": true,
        "securitySchemes": {
          "oauth": {
            "enabled": true,
            "allowedAuthorizeTypes": [
              "code"
            ],
            "authLoginRedirect": "http://<identity-server>/client-redirect-uri",
            "header": {
              "enabled": true,
              "name": "Authorization"
            },
            "notifications": {
              "onKeyChangeUrl": "http://notifyme.com",
              "sharedSecret": "oauth-shared-secret"
            },
            "refreshToken": true
          }
        }
      },
      "listenPath": {
        "strip": true,
        "value": "/my-oauth-api/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```

In this example:

- Client authentication has been enabled (line 44)
- The OpenAPI description declares the `oauth` security scheme that expects **Authorization Code** flow. Note that the `authorization URL` and `token URL` are declared relative to the API proxy listen path
- Authorization requests (made to `POST /my-oauth-api/oauth/authorize`) will be redirected to `http://<identity-server>/client-redirect-uri` where the *Resource Owner* should be prompted to authorize the request
- [Notifications](#oauth-token-notifications) of token issuance will be sent to `http://notifyme.com` with the `X-Tyk-Shared-Secret` header set to `oauth-shared-secret`

The *auth server* (Tyk) will issue an *access token* and *refresh token* in exchange for a valid *authorization code*. Once the client has a valid access token, it will be expected in the `Authorization` header of the request.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk and, with correctly configured and integrated *identity server* can be used to try out OAuth Client Authentication using Tyk as the Authorization Server.


### Managing OAuth Tokens

#### Using Refresh Tokens

The Refresh Token flow is used to obtain a new *access token* when the current token has expired or is about to expire. This allows clients to maintain a valid *access token* without requiring the user to go through the authentication and authorization process again.

*Refresh tokens* are single use and, when used, automatically invalidate the access token with which they were issued. This prevents accidental duplication of access tokens granting authorized access to a resource (API).

A *refresh token* can be issued by the *auth server* alongside the *access token* at the last stage of the OAuth flow for:
- Authentication Code grant
- Resource Owner Password grant

You configure whether Tyk should issue a refresh token within the [API proxy definition](#configuring-your-api-proxy).

##### Refreshing an Access Token

If you have correctly configured your API, then Tyk will provide a *refresh token* with the *access token*. The *client* can subsequently exchange the *refresh token* for a new *access token* without having to re-authenticate, with another call to the `POST /<listen-path>/oauth/token` endpoint as follows:

{{< img src="/img/diagrams/diagram_docs_refresh-token-grant-type@2x.png" alt="Refresh Token flow" >}}

This endpoint is protected using Basic Authentication where the username is the *client Id* and the password is the *client secret*.

The following data is required in the request payload:

| Parameter       | Value                                                     |
| --------------- | --------------------------------------------------------- |
| `grant_type`    | `refresh_token`                                           |
| `client_id`     | client Id                                                 |
| `client_secret` | client secret                                             |
| `refresh_token` | The refresh token provided with the original access token |

For example:

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/my-api/oauth/token/ \
  -H "Authorization: Basic bXktY2xpZW50LWlkOm15LWNsaWVudC1zZWNyZXQ=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token&client_id=my-client-id&client_secret=my-client-secret&refresh_token=YjdhOWFmZTAtNmExZi00ZTVlLWIwZTUtOGFhNmIwMWI3MzJj"
```

This command, issued by the *client* will obtain a new access token for the `/my-api` proxy deployed on a Tyk Gateway at `https://tyk.cloud.tyk.io`. The basic auth key is the base64 encoded representation of `my-client-id:my-client-secret` The `client_id` and `client_secret` match those allocated by Tyk (the auth server) for the *client app*. The `refresh_token` is a valid *refresh token* previously issued to the *client*.

The response payload contains:
- `access_token`: a new *access token* which can be used by the *client* to access the protected API
- `expires_in`: the expiration date/time of the access token
- `token_type`: set to `bearer` indicating that the access token should be provided in an [Auth Token](#use-auth-tokens) request to the protected API
- `refresh_token`: a new *refresh token* that can be used later to refresh the new *access token*

For example:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```

#### Revoking Access Tokens

OAuth access tokens have built in expiry, but if you need to [revoke](https://tools.ietf.org/html/rfc7009) a client's access to the API before this time, then you can use the option on the [OAuth Client management screen](#using-the-tyk-dashboard-ui) screen in Tyk Dashboard UI or the Tyk Dashboard API to do so. 

Using the **Tyk Dashboard API** you can revoke specific tokens (both access and refresh) or all tokens issued for a specific *client app* as follows:

- [retrieve a list of all tokens for a client app]({{< ref "api-management/dashboard-configuration#retrieve-all-current-tokens-for-specified-oauth20-client" >}})
- [revoke a single token]({{< ref "api-management/dashboard-configuration#revoke-a-single-oauth-client-token" >}})
- [revoke all tokens for a client app]({{< ref "api-management/dashboard-configuration#revoke-all-oauth-client-tokens" >}})

These endpoints are protected using the Dashboard API secret assigned to the user managing the tokens, which must be provided in the `Authorization` header.

In this example, we issue a request to the `/revoke` endpoint of the *auth server* via the Tyk Dashboard API to invalidate a specific *access token*:

```bash
curl -X POST \
  https://admin.cloud.tyk.io/api/apis/oauth/{CLIENT_ID}/revoke/ \
  -H "Authorization: <dashboard-secret>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573&token_type_hint=access_token&client_id=my-client-id&client_secret=my-client-secret"
```

Note that the `token_type_hint` must be set to `access_token` or `refresh_token` to match the type of `token` to be revoked.


#### OAuth Token Notifications

When operating as an OAuth authorization server, Tyk can generate an event whenever it issues an *access token*. You can configure a dedicated webhook that will be triggered to notify the Resource Owner service of the occurrence of the event.

OAuth token notifications can only be configured when using **Authorization Code** or **Resource Owner Password Credentials** grants, not when using *Client Credentials* grant because this flow is primarily used for server-to-server communication, where the client acts on its own behalf without user-specific authorization changes.

You can configure the URL that the webhook will issue a `POST` request and a "shared secret" value that will be provided in a header (`X-Tyk-Shared-Secret`) used to secure the communication to the target application. The OAuth token notification webhook does not support any other authentication method.

The body of the webhook request will have this content:

```json
{
  "auth_code": "",
  "new_oauth_token": "",
  "refresh_token": "",
  "old_refresh_token": "",
  "notification_type": ""
}
```

where
- `auth_code` is the Authorization Code that has been issued
- `new_oauth_token` is the Access Token that has been issued
- `refresh_token` is the Refresh Token that has been issued
- `old_refresh_token` is the Refresh Token that has been consumed when refreshing an access token
- `notification_type` will indicate the cause of the event:
  - `new`: a new access token has been issued
  - `refresh`: a token has been refreshed and a new refresh token has been issued

##### Configuring Notifications in the Tyk API Designer

Client Authentication is configured on the **Settings** screen within the Tyk OAS API Designer, within the **Server** section. Ensuring that you are in **Edit** mode, go to the *Authentication* section where you should have selected  **Tyk OAuth 2.0** from the drop down options.

Here you will see the *Notifications* section where you can configure:

- Notifications URL
- Notifications Shared Secret

Remember to select **Save API** to apply these settings to your API.

##### Configuring Notifications in the Tyk OAS API Definition

The example given [above](#using-the-tyk-oas-api-definition) includes the configuration necessary to issue notifications for token issuance (see lines 48-51 in the example).






## Use JSON Web Tokens (JWT)

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. They are commonly used in API authentication and authorization.

### Protecting an API with JWT

To protect an API with JWT, we need to execute the following steps:
* Set Authentication Mode
* Set the JWT Signing Method
* Set the Identity Source and Policy Field Name
* Set a Default Policy
* Generate a JWT


#### Set Authentication Mode

1. Select JSON Web Tokens as the Authentication mode
2. [Set the cryptographic signing method](#set-up-jwt-signing-method) to `HMAC (shared)` and the public secret as `tyk123`
3. Set the Identity Source and Policy Field Name

{{< img src="/img/api-management/security/jwt-hmac.png" alt="Target Details: JSON Web Token" >}}

#### Set a Default Policy

If Tyk cannot find a `pol` claim, it will apply this Default Policy. Select a policy that gives access to this API we are protecting, or [go create one first]({{< ref "getting-started/create-security-policy" >}}) if it doesn't exist.

Make sure to save the changes to the API Definition.

#### Generate a JWT

Let's generate a JWT so we can test our new protected API.

Head on over to [https://jwt.io/](https://jwt.io/).  Sign the default JWT with our HMAC Shared Secret `tyk123` in the VERIFY SIGNATURE section.  Your screen should look similar to this:

{{< img src="/img/dashboard/system-management/jwt_jwtio_example.png" alt="Auth Configuration" >}}

Copy the Encoded JWT and let's make a cURL against the Tyk API Definition:

```
$ curl http://localhost:8080/my-jwt-api/get \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.7u0ls1snw4tPEzd0JTFaf19oXoOvQYtowiHEAZnan74"
```

### Use the JWT

The client includes the JWT in the Authorization header when making requests to the API.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Request:**

| Parameter       | Value                                                  |
| --------------- | ----------------------------------------------------- |
| **Method**      | `GET`                                                   |
| **URL**         | The API endpoint for the protected resource.           |
| **Authorization** | Bearer token, e.g., `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`. |

### JWT and Auth0 with Tyk

This will walk you through securing your APIs with JWTs via Auth0. We also have the following video that will walk you through the process.

{{< youtube-seo id="jm4V7XzbrZw" title="Protect Your APIs with Auth0 JWT and Tyk">}}

#### Prerequisites

* A free account with Auth0
* A Tyk Self-Managed or Cloud installation

#### Create an Application in Auth0

1. Log in to your Auth0 account.
2. Select APIs from the Applications menu.

   {{< img src="/img/auth0/auth0-create-api.png" alt="Auth0 Create API" >}}

3. Click Create API and enter a name and identifier for your API.

   {{< img src="/img/auth0/api-details.png" alt="Auth0 API details" >}}

4. From the Test tab, follow the instructions on how to get an access token.

   {{< img src="img/auth0/auth0-test-curl.png" alt="Auth0 Test with cURL" >}}

5. From the cURL tab, copy the token request command.

   ```bash
   curl --request POST \
     --url https://dev-yjd8e8u5.us.auth0.com/oauth/token \
     --header 'content-type: application/json' \
     --data '{"client_id":{CLIENT_ID},"client_secret":{CLIENT_SECRET},"audience":{AUDIENCE},"grant_type":"client_credentials"}'
   ```

6. Paste the command in a terminal window to generate your token. Save this token locally.

   ```yaml
   {
     "access_token": "xxxxxxxxxxx",
     "token_type": "Bearer"
   }
   ```

7. After creating your API, a new Auth0 Application will be created. Go to the Applications section to view it.

   {{< img src="/img/auth0/new-application.png" alt="New Auth0 Application" >}}

8. Copy the Domain from the Basic Information. You will use this when adding an API to Tyk.

   {{< img src="/img/auth0/auth0-basic-info.png" alt="Auth0 Application Basic Information" >}}



#### Create your API in Tyk

1. Log in to your Tyk Dashboard
2. Create a new HTTP API (the default http://httpbin.org upstream URL is fine)

{{< img src="/img/auth0/tyk-create-api.png" alt="Tyk Create HTTP API" width="400px" height="400" >}}

1. From the Authentication section, select **JSON Web Token (JWT)** as your authentication mode.
2. Select RSA public Key as the JWT signing method.
3. Enter your Auth0 Application Domain from Step 8 above to complete the `jwks_uri` end point `https://<<your-auth0-domain>>/.well-known/jwks.json`
4. Copy your `jwks_uri` in to the **Public Key** field. 

{{< img src="/img/auth0/tyk-api-auth.png" alt="Tyk API Authentication" width="800px" height="400" >}}

1. Add an **Identity Source** and **Policy Field Name**. The defaults of `sub` and `pol` are fine.
2. Save your API.
3. From the System Management section, select Policies
4.  Click Add Policy
5.  Select your Auth0 API

{{< img src="/img/auth0/policy-access-rights.png" alt="Tyk Policy access rights" width="800px" height="400" >}}

1.   You can keep the rest of the access rights at the defaults.
2.   Click the **Configurations** tab and enter a **Policy Name** and a **Keys Expiry after** period.

{{< img src="/img/auth0/policy-configuration.png" alt="Tyk Policy Configuration" width="400px" height="400" >}}

1.  Click **Create Policy**.
2.  Edit your JWT Auth0 API and add the policy you created as the **Default Policy** from the Authentication section.

{{< img src="/img/auth0/api-default-policy.png" alt="Tyk API Default Policy Configuration" width="600px" height="300" >}}

1.  From the top of the API copy the API URL
2.  From a terminal window using the API URL and the Auth0 generated token.

```.curl
curl -X GET {API URL}  -H "Accept: application/json" -H "Authorization: Bearer {token}"
```
18. If using the [httpbin upstream URL](https://httpbin.org/) as in the example Tyk API, you should see the HTML returned for the httpbin service in your terminal.
19. If there is an error with the request, you will see the following error message.

```.bash
{
  "error": "Key not authorized:Unexpected signing method."
}
```


### JWT and Keycloak with Tyk

This guide will walk you through securing your APIs with JWTs via Keycloak.

#### Prerequisites

* A Keycloak installation
* A Tyk Self-Managed or Cloud installation

#### Create an Application in Keycloak

1. Access your Keycloak admin dashboard.
2. Navigate to the Administration console.

   {{< img src="/img/keycloak-jwt/navigate-to-admin-console.png" alt="Navigate to Keycloak Administration console" >}}

3. Create a Keycloak realm from the top left-hand side dropdown.

   {{< img src="/img/keycloak-jwt/create-jwt-realm.png" alt="Create Keycloak Realm" >}}

4. Create a Keycloak client.

   {{< img src="/img/keycloak-jwt/create-client.png" alt="Create Client" >}}

5. Enter the necessary client details.

   {{< img src="/img/keycloak-jwt/create-client-step-1.png" alt="Add client details" >}}

6. Enable client authentication and Service account roles under Authentication flow.

   {{< img src="/img/keycloak-jwt/create-client-step-2.png" alt="Update client permissions" >}}

7. Set the redirection URL rules.

   {{< img src="/img/keycloak-jwt/create-client-step-3.png" alt="Add redirection URL rules" >}}

8. Save.

   {{< img src="/img/keycloak-jwt/client.png" alt="Example client" >}}

9. Retrieve the client secret from the Credentials tab under the client you just created.

   {{< img src="/img/keycloak-jwt/client-secret.png" alt="Retrieve client secret" >}}

10. Generate your JWT using `curl`. This is the token you will use to access your services through the Tyk Gateway. You can generate your JWT using either of the following methods. Make sure to replace the `KEYCLOAK` prefixed parameters with the appropriate values.

    **Password Grant Type:**

    ```bash
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
       -H "Content-Type: application/x-www-form-urlencoded" \
       --data-urlencode "client_id=KEYCLOAK_CLIENT_ID" \
       --data-urlencode "grant_type=password" \
       --data-urlencode "client_secret=KEYCLOAK_SECRET" \
       --data-urlencode "scope=openid" \
       --data-urlencode "username=KEYCLOAK_USERNAME" \
       --data-urlencode "password=KEYCLOAK_PASSWORD"
    ```

    **Client Credentials Grant Type:**

    ```bash
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
       -H "Content-Type: application/x-www-form-urlencoded" \
       --data-urlencode "client_id=KEYCLOAK_CLIENT_ID" \
       --data-urlencode "grant_type=client_credentials" \
       --data-urlencode "client_secret=KEYCLOAK_SECRET"
    ```

    A typical response will look something like this:

    ```yaml
    {
       "access_token": "...", 
       "expires_in": 300,
       "refresh_expires_in": 1800,
       "refresh_token": "...",
       "token_type": "Bearer",
       "id_token": "...",
       "not-before-policy": 0,
       "session_state": "...",
       "scope": "openid profile email"
    }
    ```

#### Running in k8s

If you are looking to POC this functionality in Kubernetes, you can run a fully worked-out example using our tyk-k8s-demo library. You can read more [here]({{< ref "tyk-self-managed#kubernetes-demo" >}}).


### Create Your JWT API in Tyk

1. Log in to your Tyk Dashboard.
2. Create a new HTTP API (the default `http://httpbin.org` upstream URL is fine).

   {{< img src="/img/api-management/security/jwt-keycloak-api-create.png" alt="Create a new HTTP API" >}}

3. Scroll to the Authentication mode section and select JWT from the list.
4. Select RSA public Key as JWT Signing method.
5. Add your JSON Web Key Sets (JWKS) URL in the Public Key box. This can be found through the well-known config endpoint or is typically `https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/certs`.
6. Add an Identity Source and Policy Field Name. The defaults of `sub` and `pol` are fine.
7. Click on the update button to save the API.

   {{< img src="/img/api-management/security/jwt-keycloak-set-auth.png" alt="Create API" >}}

8. Create a policy to manage access to your API.
9. Navigate to the Policies section on the left-hand side menu.
10. Click on Add Policy on the top right-hand side of your screen.
11. Select your API from the Add API Access Rights list.

   {{< img src="/img/api-management/security/jwt-keycloak-add-policy.png" alt="Select API for Security Policy" >}}

12. Click on the Configurations tab and choose a policy name and TLL.

    {{< img src="/img/api-management/security/jwt-keycloak-add-policy-cont.png" alt="Create API Security Policy" >}}

13. Add the default policy to the API.

    {{< img src="/img/api-management/security/jwt-keycloak-api-set-policy.png" alt="Add default policy to API" >}}

14. Test access to the API using curl.
15. Retrieve the API URL.

    {{< img src="/img/api-management/security/jwt-keycloak-get-api-url.png" alt="Add default Policy to API" >}}

16. Test with curl. Make sure to replace `TOKEN` with the JWT you received from the curl earlier.

    ```bash
    curl 'friendly-slipper-gw.aws-use1.cloud-ara.tyk.io/keycloak.jwt/get' \
        -H "Authorization: Bearer TOKEN"
    ```




### Split Token

OAuth2, OIDC, and their foundation, JWT, have been industry standards for many years and continue to evolve, particularly with the iterative improvements in the OAuth RFC, aligning with FHIR and Open Banking principles. The OAuth flow remains a dominant approach for secure API access.

In the OAuth flow, two types of access tokens are commonly used: opaque and JWT (more precisely, JWS). However, the use of JWTs has sparked debates regarding security, as JWTs can leak information when base64 decoded. While some argue that JWTs should not contain sensitive information, others consider JWTs inherently insecure for authorization.

#### Introduction to Split Token Flow

JWT Access Tokens can carry sensitive information, making them vulnerable if compromised. The Split Token Flow offers a solution by storing only the JWT signature on the client side while keeping the header and payload on the server side. This approach combines the flexibility of JWTs with the security of opaque tokens, ensuring that sensitive data is not exposed.

#### How Tyk Implements Split Token Flow

Tyk API Gateway is well-positioned to broker the communication between the client and the authorization server. It can handle requests for new access tokens, split the JWT, and return only the signature to the client, storing the rest of the token internally.

Here’s how you can implement the Split Token Flow using the client credentials flow:

#### Request a JWT Access Token

```bash
$ curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
https://keycloak-host/auth/realms/tyk/protocol/openid-connect/token \
-d "grant_type=client_credentials" \
-d "client_id=efd952c8-df3a-4cf5-98e6-868133839433" \
-d "client_secret=0ede3532-f042-4120-bece-225e55a4a2d6" -s | jq
```

This request returns a JWT access token.

##### Split the JWT

The JWT consists of three parts:

* Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
* Payload: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSJ9`
* Signature: `EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0`

Using the Split Token Flow, only the signature is returned to the client, while the header and payload are stored server-side by Tyk.

{{< img src="/img/2.10/split_token2.png" alt="Split Token Example" >}}

##### Create a Virtual Endpoint in Tyk

Create a virtual endpoint or API in Tyk to handle the token request. This endpoint receives the auth request, exchanges credentials with the authorization server, and returns the split token.

**Example script for the Virtual Endpoint:**

```javascript
function login(request, session, config) {
    var credentials = request.Body.split("&")
        .map(function(item, index) {
            return item.split("=");
        }).reduce(function(p, c) {
            p[c[0]] = c[1];
            return p;
        }, {});

    var newRequest = {
        "Headers": {"Content-Type": "application/x-www-form-urlencoded"},
        "Method": "POST",
        "FormData": {
            grant_type: credentials.grant_type,
            client_id: credentials.client_id,
            client_secret: credentials.client_secret
        },
        "Domain": "https://keycloak-host",
        "resource": "/auth/realms/tyk/protocol/openid-connect/token",
    };

    var response = TykMakeHttpRequest(JSON.stringify(newRequest));
    var usableResponse = JSON.parse(response);

    if (usableResponse.Code !== 200) {
        return TykJsResponse({
            Body: usableResponse.Body,
            Code: usableResponse.Code
        }, session.meta_data)
    }

    var bodyObj = JSON.parse(usableResponse.Body);
    var accessTokenComplete = bodyObj.access_token;
    var signature = accessTokenComplete.split(".")[2];

    log("completeAccessToken: " + accessTokenComplete);

    // Create key inside Tyk
    createKeyInsideTyk(signature, bodyObj);

    // Override signature
    bodyObj.access_token = signature;
    delete bodyObj.refresh_expires_in;
    delete bodyObj.refresh_token;
    delete bodyObj.foo;

    var responseObject = {
        Body: JSON.stringify(bodyObj),
        Code: usableResponse.Code
    }
    return TykJsResponse(responseObject, session.meta_data);
}
```

This script handles the login process, splits the JWT, and stores the necessary information in Tyk.

Once the setup is complete, you can test the Split Token Flow by making API calls using the opaque token returned by the virtual endpoint. Tyk will validate the token and reconstruct the full JWT for upstream services.

```bash
$ curl localhost:8080/basic-protected-api/get -H "Authorization: MEw….GJ0"
```

This request uses the opaque token, which Tyk validates and then injects the full JWT into the Authorization header for the API request.

{{< img src="/img/2.10/split_token3.png" alt="Split Token Key Metadata" >}}

{{< img src="/img/2.10/split_token1.png" alt="Split Token API Injection" >}}



### Configure your JWT Setup
Learn how to configure and manage JWT authentication in your Tyk API Gateway.


#### Set Up JWT Signing Method
Select the cryptographic method to verify JWT signatures from the following options:

- RSA public key
- HMAC shared secret
- ECDSA
- [Public JWKS URL](#enable-dynamic-public-key-rotation-using-jwks)

{{< note success >}}
**Note**: Leave the field blank to configure at the key level.
{{< /note >}} 

To generate an RSA keypair, use the following commands:
```bash
openssl genrsa -out key.rsa 
openssl rsa -in key.rsa -pubout > key.rsa.pub
```

#### RSA Supported Algorithms

Both RSA & PSA classes of RSA algorithms are supported by Tyk, including:
- RS256
- RS384
- RS512 
- PS256
- PS384
- PS512

Read more about the differences between RSA & PSA classes of RSA algorithms [here](https://www.encryptionconsulting.com/overview-of-rsassa-pss/).

To use either - simply select the "RSA" signing method in the Dashboard, and Tyk will use the appropriate algorithm based on the key you provide.

#### Set Up Individual JWT Secrets
Enable Tyk to validate an inbound token using stored keys:

1. Set up your token with the following fields:
    ```{.json}
    "jwt_data": {
      "secret": "Secret"
    }
    ```
2. Ensure the `kid` header field is included in the JWT for validation.
   - If the `kid` header is missing, Tyk will check the `sub` field. This is not recommended but supported.

The advantage of using RSA is that only the hashed ID and public key of the end user are stored, ensuring high security.


#### Configure Identity Source and Policy Field Name
Define the identity and policy applied to the JWT:

- **Identity Source**: Select which identity claim to use (e.g., `sub`) for rate-limiting and quota counting.
- **Policy Field Name**: Add a policy ID claim to the JWT that applies a specific security policy to the session.


#### Enable Dynamic Public Key Rotation Using JWKs
Instead of a static public key, configure a public JSON Web Key Sets (JWKs) URL to dynamically verify JWT tokens:

1. Use the JWKs URL to dynamically maintain and rotate active public keys.
2. Ensure JWTs contain the `kid` header, matching the `kid` in the JWK payload for verification.


{{< img src="/img/2.10/jwt_rsa_public_key.png" alt="JWKS Public Key Rotation" >}}


For example, cURLing the JWKs URL returns:

```{.copyWrapper}
$ curl http://keycloak_host:8081/auth/realms/master/protocol/openid-connect/certs
{
  "keys": [
      {
          "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM",
          "kty": "RSA",
          "alg": "RS256",
          "use": "sig",
          "n": "k-gUvKl9-sS1u8odZ5rZdVCGTe...m2bMmw",
          "e": "AQAB",
          "x5c": [
              "MIICmzCCAYMCBgFvyVrRq....K9XQYuuWSV5Tqvc7mzPd/7mUIlZQ="
          ],
          "x5t": "6vqj9AeFBihIS6LjwZhwFLmgJXM",
          "x5t#S256": "0iEMk3Dp0XWDITtA1hd0qsQwgES-BTxrz60Vk5MjGeQ"
      }
  ]
}
```

This is a JWKS complaint payload as it contains the "x5c" entry which contains the public key. Also, the issuer generates the ID Token or Access Token with a header that includes a "kid" that matches the one in the JWKS payload.

Here's an example of a header belonging to an access token generated by the issuer above.
```{.json}
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM"
}
```

The auth (bearer) tokens will be signed by the private key of the issuer, which in this example is our keycloak host.  This token can be verified by Tyk using the public key available in the above payload under "x5C".

All of this happens automatically.  You just need to specify to Tyk what the JWKs url is, and then apply a "sub" and default policy in order for everything to work.  See Step #3, 4, and 5 under option #1 for explanations and examples.



#### Adjust JWT Clock Skew Configuration
Prevent token rejection due to clock skew between servers by configuring clock skew values:

- `jwt_issued_at_validation_skew`
- `jwt_expires_at_validation_skew`
- `jwt_not_before_validation_skew`

All values are in seconds. The default is `0`.


#### Map JWT Scopes to Policies
Assign JWT scopes to security policies to control access:

1. Specify scope-to-policy mapping:

```{.copyWrapper}
  "jwt_scope_to_policy_mapping": {
    {
    "admin": "59672779fa4387000129507d",
    "developer": "53222349fa4387004324324e"
  },
  "jwt_scope_claim_name": "our_scope"
}
```
  - `"jwt_scope_to_policy_mapping"` provides mapping of scopes (read from claim) to actual policy ID. I.e. in this example we specify that scope "admin" will apply policy `"59672779fa4387000129507d"` to a key
- `"jwt_scope_claim_name"` identifies the JWT claim name which contains scopes. This API Spec field is optional with default value `"scope"`. This claim value could be any of the following:
  - a string with space delimited list of values (by standard)
  - a slice of strings
  - a string with space delimited list of values inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having the list of values nested inside `"scope1"`
  - a slice of strings inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having a slice of strings nested inside `"scope1"`

2. Set the claim name that contains the scopes (default: `scope`):
    ```{.json}
    "jwt_scope_claim_name": "our_scope"
    ```

{{< note success >}}
**Note**  

Several scopes in JWT claim will lead to have several policies applied to a key. In this case all policies should have `"per_api"` set to `true` and shouldn't have the same `API ID` in access rights. I.e. if claim with scopes contains value `"admin developer"` then two policies `"59672779fa4387000129507d"` and `"53222349fa4387004324324e"` will be applied to a key (with using our example config above).
{{< /note >}}

#### Visualize JWT Flow in Tyk API Gateway
View the diagram below for an overview of JWT flow in Tyk:

{{< img src="/img/diagrams/diagram_docs_JSON-web-tokens@2x.png" alt="JSON Web Tokens Flow" >}}


## Other Authentication Methods


### Use Basic Authentication

Basic Authentication is a straightforward method where the user's credentials (username and password) are sent in an HTTP header encoded in Base64.

#### How does Basic Authentication Work?

An API request made using Basic Authentication will have an `Authorization` header that contains the API key.

The value of the `Authorization` header will be in the form:

```
Basic base64Encode(username:password)
```

A real request could look something like:

```
GET /api/widgets/12345 HTTP/1.1
Host: localhost:8080
Authorization: Basic am9obkBzbWl0aC5jb206MTIzNDU2Nw==
Cache-Control: no-cache
```

In this example the username is `john@smith.com` and the password is `1234567` (see [base64encode.org](https://www.base64encode.org))

##### The Problem with Basic Authentication

With Basic Authentication, the authentication credentials are transferred from client to server (in our case, the Tyk Gateway) as encoded plain text. This is not a particularly secure way to transfer the credentials as it is highly susceptible to intercept; as the security of user authentication is usually of critical importance to API owners, Tyk recommends that Basic Authentication should only ever be used in conjunction with a TLS such as SSL.

##### Protect your API with Basic Authentication

Authentication type is configured within your API Definition; this can be done via the [Tyk Dashboard](#enable-basic-authentication-using-the-tyk-dashboard) or directly within the [API Definition file](#enable-basic-authentication-in-your-file-based-api-definition).


#### Enable Basic Auth
##### Enable Basic Authentication using the Tyk Dashboard

1. Select your API from the **API Management > APIs** menu
2. Scroll to the **Authentication** options
3. Select **Basic Authentication** from the drop-down list
4. Select **Strip Authorization Data** to strip any authorization data from your API requests.
5. Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the **Auth Key Header** name value
6. You can select whether to use a URL query string parameter as well as a header, and what parameter to use. If this is left blank, it will use the **Auth Key Header** name value.
7. You can select whether to use a **cookie value**. If this is left blank, it will use the Header name value.

{{< img src="/img/api-management/security/basic-auth-api-setup.png" alt="Target Details: Basic Auth" >}}

##### Enable Basic Authentication in your file-based API Definition 

To enable Basic Authentication, the API Definition file needs to be set up to allow basic authentication rather than expecting a standard access token; this is achieved  by setting `use_basic_auth` to true:

```{.copyWrapper}
{
  "name": "Tyk Test API",
  ...
  "use_basic_auth": true,
  ...
}
```

As you can see in the above example, enabling Basic Authentication is as simple as setting a flag for the feature in your API Definition object. Since Basic Authentication is a standard, Tyk will always look for the credentials as part of the `Authorization` header.

##### Enable basic authentication using Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [enable basic authentication]product-stack/tyk-operator/advanced-configurations/client-authentication#basic-authentication - ?does this exist? with Tyk Operator.

#### Create a Basic Authentication User

When using Basic Authentication, the API key used to access the API is not generated by the Tyk system, instead you need to create at least one Basic Authentication user in the Tyk Gateway. Tyk will compare the Basic Authentication key provided in the request against the list of users you have created.

##### Using Tyk Dashboard

You can use the Tyk Dashboard to register a Basic Authentication key that can then be used to access your API. 

When you select the API, you can see that Basic Authentication settings are automatically displayed in the Authentication tab:

{{< img src="/img/api-management/security/basic-auth-api-setup.png" alt="Basic Auth tab" >}}

Then add a username & password and save!

Now you can curl the API in two different ways:

```
$ curl http://localhost:8080/basicauth/get \
  --header "Authorization: Basic $(echo -n 'myusername:mypassword' | base64)"
<200 response>

$ curl http://myusername:mypassword@localhost:8080/basicauth/get
<200 response from upstream>
```
We have full tutorials to guide you to [create an API Key]({{< ref "getting-started/create-api-key" >}}) via the Dashboard. 

##### Using the Tyk Gateway API

This command creates a new basic authentication user in the Tyk Gateway with the user name `testuser` and password `mickey-mouse` by sending a `POST` command to the `/tyk/keys/` endpoint of Tyk Gateway API:

```{.copyWrapper}
curl -X POST -H "x-tyk-authorization: 352d20fe67be67f6340b4c0605b044c3" \
 -s \
 -H "Content-Type: application/json" \
 -X POST \
 -d '{
    "allowance": 1000,
    "rate": 1000,
    "per": 1,
    "expires": -1,
    "quota_max": -1,
    "org_id": "53ac07777cbb8c2d53000002",
    "quota_renews": 1449051461,
    "quota_remaining": -1,
    "quota_renewal_rate": 60,
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "versions": ["Default"]
        }
    },
    "meta_data": {},
    "basic_auth_data": {
        "password": "mickey-mouse"
    }
 }' http://{your-tyk-gateway-host}:{port}/tyk/keys/testuser | python -mjson.tool
```

{{< note success >}}
**Note**  

You use `POST` to create a new user and `PUT` to update an existing entry.

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}

##### Using the Tyk Dashboard API

This command creates a new basic authentication user in the Tyk Gateway with the user name `testuser2` and password `minnie-mouse` by sending a `POST` command to the `/tyk/keys/` endpoint of Tyk Dashboard API:

```{.copyWrapper}
curl -X POST -H "Authorization: 907aed9f88514f175f1dccf8a921f741"
 -s
 -H "Content-Type: application/json"
 -X POST
 -d '{
    "allowance": 1000,
    "rate": 1000,
    "per": 1,
    "expires": -1,
    "quota_max": -1,
    "org_id": "53ac07777cbb8c2d53000002",
    "quota_renews": 1449051461,
    "quota_remaining": -1,
    "quota_renewal_rate": 60,
    "access_rights": {
      "{API-ID}": {
        "api_id": "{API-ID}", 
        "api_name": "{API-NAME}", 
        "versions": [
            "Default"
        ]
      }
    },
    "meta_data": {},
    "basic_auth_data": {
      "password": "minnie-mouse"
    }
 }' http://{your-tyk-dashboard-host}:{port}/api/apis/keys/basic/testuser2 | python -mjson.tool
```

[See Basic Authentication via the Dashboard API]({{< ref "api-management/dashboard-configuration#basic-authentication-api" >}})

{{< note success >}}
**Note**  

You use `POST` to create a new user and `PUT` to update an existing entry.

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}

#### Extract credentials from the request body

In some cases, for example when dealing with SOAP, user credentials can be passed within the request body. To handle this situation, you can configure basic auth plugin to extract username and password from the body, by providing regexps like this:

```{.copyWrapper}
"basic_auth": {
    "extract_from_body": true,
    "body_user_regexp": "<User>(.*)</User>",
    "body_password_regexp": "<Password>(.*)</Password>"
}
```

Note that the regexp should contain only one match group, which points to the actual value.

### Use Auth Tokens

> Any party in possession of an auth (or bearer) token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key). To prevent misuse, auth tokens need to be protected from disclosure in storage and in transport.

Tyk provides bearer token access as one of the most convenient building blocks for managing security to your API. In a Tyk setup, this is called "Access Tokens" and is the default mode of any API Definition created for Tyk.

Bearer tokens are added to a request as a header or as a query parameter. If added as a header, they may be preceded by the word "Bearer" to indicate their type, though this is optional.

Traditionally these tokens are used as part of the `Authorization` header.

##### Enable auth (bearer) tokens in your API Definition with the Dashboard

To enable the use of a bearer token in your API:

1. Select your API from the **System Management > APIs** menu
2. Scroll to the **Authentication** options
3. Select **Authentication Token** from the drop-down list
4. Select **Strip Authorization Data** to strip any authorization data from your API requests
5. Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the **Auth Key Header** name value
6. You can select whether to use a URL query string parameter as well as a header, and what parameter to use. If this is left blank, it will use the **Auth Key Header** name value.
7. You can select whether to use a **cookie value**. If this is left blank, it will use the Header name value.
8. You can select to use a **client certificate**. This allows you to create dynamic keys based on certificates.

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Target Details: Auth Token" >}}

##### Enable auth (bearer) tokens in your API Definition with file-based

Tyk will by default use the bearer token method to protect your API unless it is told otherwise.

These tokens can be set as a *header, url parameter, or cookie name of a request*. A request for a resource at the API endpoint of `/api/widgets/12345` that uses access tokens will require the addition of a header field, traditionally this is the `Authorization` header.

The name of the key can be defined as part of the API definition under the `auth` section of an API Definition file:

```{.copyWrapper}
"auth": {
  "auth_header_name": "authorization",
  "use_param": false,
  "param_name": "",
  "use_cookie": false,
  "cookie_name": ""
},
```

To use URL query parameters instead of a header, set the `auth.use_param` setting in your API definition to `true`. 

{{< note success >}}
**Note**  

Unlike headers, URL query parameters are *case sensitive*.
{{< /note >}}


To use a cookie name instead of a header or request parameter, set the `use_cookie` parameter to `true`. Cookie names are also case sensitive.

### Auth Token Signature Validation

If you are migrating from platforms like Mashery, which use request signing, you can enable signature validation like this:

```{.copyWrapper}
...
"auth": {
  "validate_signature": true,
  "signature": {
    "algorithm": "MasherySHA256",
    "header": "X-Signature",
    "secret": "secret",
    "allowed_clock_skew": 2
  }
}
...
```
`validate_signature`: boolean value to tell Tyk whether to enable signature validation or not

`signature.algorithm`: the algorithm you wish to validate the signature against. Currently supported
 - `MasherySHA256`
 - `MasheryMD5`
 
 `signature.header`: header key of attempted signature
 
 `signature.secret`: the shared secret which was used to sign the request
 - Can hold a dynamic value, by referencing `$tyk_meta` or `$tyk_context` variables.
 - Example: `"secret": "$tyk_meta.individual_secret"`. Which effectively means that you have created/imported the api key into Tyk, and have stored the shared secret in the field `individual_secret` of the session token's meta-data.

`signature.allowed_clock_skew`: allowed deviation in seconds between UNIX timestamp of Tyk & UNIX timestamp used to generate the signed request

**Custom tokens**

It is possible to provide Tyk with your own custom tokens, this can be achieved using the Tyk Gateway REST API. This is very useful if you have your own identity provider and don't want Tyk to create and manage tokens for you, and instead just mirror those tokens within Tyk to off-load access control, quotas and rate limiting from your own application.

##### Enabling auth/bearer tokens with Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [enable a bearer token]product-stack/tyk-operator/advanced-configurations/client-authentication#auth-token-bearer-token - Does this exist?? with Tyk Operator.



### Use Mutual TLS

Mutual TLS (mTLS) is a robust security feature that ensures both the client and server authenticate each other using TLS certificates. This two-way authentication process provides enhanced security for API communications by verifying the identity of both parties involved in the connection.

#### Why Use Mutual TLS?

Mutual TLS is particularly valuable in environments where security is paramount, such as microservices architectures, financial services, healthcare, and any scenario requiring zero-trust security. It not only encrypts the data in transit but also ensures that the communicating parties are who they claim to be, mitigating the risks of unauthorized access and data breaches.

#### Concepts


##### How Does Mutual TLS Work?

Mutual TLS operates by requiring both the client and server to present and verify TLS certificates during the handshake process. Here’s how it works:

**Client Authentication:**

1. When a client attempts to connect to the server, the server requests the client’s TLS certificate.
2. The client provides its certificate, which the server verifies against a trusted Certificate Authority (CA).

**Server Authentication:**

1. Simultaneously, the client also verifies the server’s certificate against a trusted CA.

This mutual verification ensures that both parties are legitimate, securing the connection from both ends.

##### Benefits of Mutual TLS

* **Enhanced Security:** Provides two-way authentication, ensuring both the client and server are verified and trusted.
* **Data Integrity:** Protects the data exchanged between client and server by encrypting it, preventing tampering or interception.
* **Compliance:** Helps meet stringent security and compliance requirements, especially in regulated industries.


##### What is Mutual TLS?

{{< note success >}}
**Note**  

Mutual TLS is supported from Tyk Gateway 2.4, Tyk Dashboard 1.4 and MDCB 1.4
{{< /note >}}


Mutual TLS is a common security practice that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information. 

In most cases when you try to access a secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and the data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates. See the video below that gives you an introduction to mutual TLS and how it can be used to secure your APIs.

{{< youtube-seo id="UzEzjon3IAo" title="Mutual TLS Intro">}}

##### Certificates 
If you have had to configure an SSL server or SSH access, the following information below should be familiar to you. 

Let's start with certificate definition. Here is what [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) says:

> In cryptography, a public key certificate, also known as a digital certificate or identity certificate, is an electronic document used to prove the ownership of a public key. The certificate includes information about the key, information about the identity of its owner (called the subject), and the digital signature of an entity that has verified the certificate's contents (called the issuer). If the signature is valid, and the software examining the certificate trusts the issuer, then it can use that key to communicate securely with the certificate's subject.

When it comes to authorization, it is enough for the server that has a public client certificate in its trusted certificate storage to trust it. However, if you need to send a request to the server protected by mutual TLS, or need to configure the TLS server itself, you also need to have a private key, used while generating the certificate, to sign the request.

Using Tyk, you have two main certificate use cases:

1. Certificates without public keys used for authorization and authentication
2. Certificates with private keys used for upstream access, and server certificates (in other words when we need to sign and encrypt the request or 
response).

Before a certificate can be used by Tyk, it needs to be encoded into PEM format. If you are using an `openssl` command to generate certificates, it should use PEM by default. A nice bonus of the PEM format is that it allows having multiple entries inside the same file. So in cases where a certificate also requires a private key, you can just concatenate the two files together.

##### Certificate Management 
Tyk provides two options to manage certificates: plain files or certificate storage with a separate API.

All configuration options, which require specifying certificates, support both plain file paths or certificate IDs. You are able to mix them up, and Tyk will automatically distinguish file names from certificate IDs.

The Tyk Gateway and Dashboard Admin APIs provide endpoints to create, remove, list, and see information about certificates. For the Gateway, the endpoints are:

* Create: `POST /tyk/certs` with PEM body. Returns `{"id": "<cert-id>", ... }`
* Delete: `DELETE /tyk/certs/<cert-id>`
* Get info: `GET /tyk/certs/<cert-id>`. Returns meta info about the certificate, something similar to: 
```json
{ 
  "id": "<cert-id>",
  "fingerprint": <fingerprint>,
  "has_private_key": false, 
  "issuer": <issuer>,
  "subject": "<cn>", ... 
}
```
* Get info about multiple certificates: `GET /tyk/certs/<cert-id1>,<cert-id2>,<cert-id3>`. 
Returns array of meta info objects, similar to above.
* List all certificate IDs: `GET /tyk/certs`. Returns something similar to:

```json
{ "certs": "<cert-id1>", "<cert-id2>", ...  }
```

The Dashboard Admin API is very similar, except for a few minor differences:

* Endpoints start with `/api` instead of `/tyk`, e.g. `/api/certs`, `/api/certs/<cert-id>`, etc.
* All certificates are managed in the context of the organization. In other words, certificates are not shared between organizations.

Certificate storage uses a hex encoded certificate SHA256 fingerprint as its ID. When used with the Dashboard API, Tyk additionally appends the organization id to the certificate fingerprint. It means that certificate IDs are predictable, and you can check certificates by their IDs by manually 
generating certificate SHA256 fingerprint using the following command:
 
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>.
```

You may notice that you can't get the raw certificate back, only its meta information. This is to ensure security. Certificates with private keys have special treatment and are encoded before storing. If a private key is found it will be encrypted with AES256 algorithm 3 using the `security.private_certificate_encoding_secret` secret, defined in `tyk.conf` file. Otherwise, the certificate will use the [secret](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-secret-a-secret) value in `tyk.conf`.

###### MDCB 
Mutual TLS configuration in an MDCB environment has specific requirements. An MDCB environment consists of a Control Plane and multiple Data Planes that, using MDCB, sync configuration. 
The Control Plane and Data Plane deployments usually do not share any secrets; thus a certificate with private keys encoded with secret in the Control Plane will not be accessible to Data Plane gateways. 

To solve this issue, you need to set `security.private_certificate_encoding_secret`  in the MDCB configuration file to the same value as specified in your management Gateway configuration file. By knowing the original secret, MDCB will be able to decode private keys, and 
send them to client without password. Using a secure connection between Data Plane Gateways and MDCB is required in this case. See MDCB setup page for use_ssl usage.

##### Authorization 
At the TLS level, authorization means allowing only clients who provide client certificates that are verified and trusted by the server. 

Tyk allows you to define a list of trusted certificates at the API level or Gateway (global) level. If you are updating API definition programmatically or via files, you need to set following the keys in your API 
definition: 
`use_mutual_tls_auth` to `true`, and `client_certificates` as an array of strings - certificate IDs. 

From the Tyk Dashboard, to do the same from the **API Designer Core settings** section you need to select **Mutual TLS** authentication mode from the **Authentication** section, and allow the certificates using the built-in widget, as below:

{{< img src="/img/2.10/mtls_auth_cert.png" alt="mutual_tls_auth" >}}

If all your APIs have a common set of certificates, you can define them in your Gateway configuration file via the `security.certificates.apis` key - string array of certificate IDs or paths.

Select **Strip Authorization Data** to strip any authorization data from your API requests.  

Be aware that mutual TLS authorization has special treatment because it is not "authentication" and does not provide any identifying functionality, like keys, so you need to mix it with another authentication modes options like **Auth Key** or **Keyless**. On the dashboard, you need to choose **Use multiple auth mechanism** in the **Authentication mode** drop-down, where you should select **Mutual TLS** and another option which suits your use-case. 

###### Fallback to HTTP Authorization 
The TLS protocol has no access to the HTTP payload and works on the lower level; thus the only information we have at the TLS handshake level is the domain. In fact, even a domain is not included into a TLS handshake by default, but there is TLS extension called SNI (Server Name Indication) 
which allows the client to send the domain name to the TLS handshake level. 

With this in mind, the only way to make API authorization work fully at the  TLS level, each API protected by Mutual TLS should be deployed on its own domain.

However, Tyk will gracefully fallback to a client certificate authorization at the HTTP level in cases when you want to have multiple mutual TLS protected APIs on the same domain, or you have clients that do not support the SNI extension. No additional configuration is needed. In case of such fallback, 
instead of getting TLS error, a client will receive 403 HTTP error.

##### Authentication 
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

###### Using with Authorization 
Mutual TLS authentication does not require mutual TLS authorization to be turned on, and can be used separately. For example, you may allow some of the users to be authenticated by using a token in the header or similar, and some of the users via client certificates. 

If you want to use them both, just configure them separately. No additional knowledge is required.

##### Upstream mTLS 
If your upstream API is protected with mutual TLS you can configure Tyk to send requests with the specified client certificate. You can specify one certificate per host and define a default certificate. 
Upstream certificates can be defined on API definition level or global level in your Gateway configuration file. Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware. 

Inside your API definition you should set the `upstream_certificates` field to the following format:
`{"example.com": "<cert-id>"}`. Defining on a global level looks the same, but should be specified via the `security.certificates.upstream` field in your Gateway configuration file.

##### HTTP/HTTPS Protocol

{{< warning success >}}
**Note**  

Do NOT include the protocol or Tyk will not match your certificates to the correct domain.
{{< /warning >}}

 For example: 
 
 - **BAD** `https://api.production.myupstream.com` 
 - **GOOD** `api.production.myupstream.com`. 
 
 However, you need to include the port if the request is made via a non-standard HTTP port.

##### Wild Cards
To set a default client certificate, use `*` instead of domain name: `{"*": "<cert-id>"}`

You may use wild cards in combination with text to match the domain, but it only works one level deep.

Meaning, if your domain is `api.production.myupstream.com`

the only wildcard value accepted would be `*.production.myupstream.com`.  The value `*.myupstream.com` will NOT work.

**Setting through the Dashboard**


To do the same via the Tyk Dashboard, go to the **API Designer** > **Advanced Options** panel > **Upstream certificates** section.

{{< img src="/img/2.10/attach_upstream_cert.png" alt="upstream_cert" >}}

{{< img src="/img/2.10/add_upstream_cert.png" alt="add_upstream_cert" >}}


#### Tips and Tricks 
You can create self-signed client and server certificates with this command:
```{.copyWrapper}
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

For the server in `common name` specify a domain, or just pass `-subj "/CN=localhost"` to OpenSSL command. Then follow our [TLS and SSL Guide]({{< ref "api-management/certificates" >}}).

To get certificate SHA256 fingerprint use the following command:
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>
```
If you are testing using cURL, your command will look like: 

```{.copyWrapper}
curl --cert client_cert.pem --key client_key.pem https://localhost:8181
```

#### mTLS for cloud users
- Cloud users can secure their upstream services with mTLS but mTLS between the client (caller of the API) and Tyk's gateway cannot be done for the time being.
- Multi cloud users - since you own and manage the gateways, you can use mTLS for gateway <--> upstream  as well as client <--> gateway connections.

#### Client mTLS

There are two ways to set up client mTLS in Tyk: static and dynamic. Each method is suited to different use cases, as outlined below:

| Use Case                                                           | Static | Dynamic |
| ------------------------------------------------------------------ | :----: | :-----: |
| Let developers upload their own public certificates through the Developer Portal |   ❌    |   ✅      |
| Combine client mTLS with another authentication method           |   ✅    |   ✅      |
| Allow certs at the API level (one or more APIs per cert)           |   ✅    |   ❌      |
| Allow certs at an individual level (one or more APIs per cert)     |   ❌    |   ✅      |

##### Dynamic Client mTLS

Dynamic Client mTLS in Tyk allows you to authenticate users based solely on the provided client certificate, without the need for an additional authentication key. Tyk can identify the user, apply policies, and monitor usage just as with regular API keys.

To set up Dynamic Client mTLS, we need to follow these steps:
* Protect the API: Configure the API in the API Designer by setting the authentication type to Auth Token and enabling Client Certificate.

* Generate a Self-Signed Certificate: Use OpenSSL to generate a self-signed certificate and key if you don't have one.

* Add a Key in the Dashboard: In the Tyk Dashboard, create a key for the API and upload only the public certificate.

* Make an API Request: Use curl with your certificate and key to make an API request to the protected API, ensuring the request returns a 200 response.

* Allow Developers to Upload Certificates: Create a policy and catalog entry for the API, allowing developers to request keys and upload their public certificates through the Developer Portal. Developers can then make API requests using their cert and private key.

##### Developer Portal - Self Serve Cert Trust

Instead of manually creating keys, we can expose the Above API via the Developer Portal, where developers can add their own certs to use to access APIs.

1. Create a policy for the API we set up above
2. Create a catalog entry for this policy
3. As a developer on the Portal, request a key for this API.  This will take us to this screen:

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="portal_cert_request" >}}

Add your public cert (cert.pem from above) into here and hit "Request Key".  

Now we can make an API request just using the pub + private key:

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```


##### Protect the API

In the API Designer, set the Authentication Type to Auth Token under Target Details > Authentication mode. Then select Enable Client Certificate.

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Enable Client Certificate" >}}

##### Generate a Self-Signed Key Pair

If you don’t already have a certificate, generate a self-signed key pair using the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

##### Add a Key through the Dashboard

In the Tyk Dashboard, add a key for the API you set up in step #1. When uploading the certificate, ensure you only upload the public certificate.


{{< note success >}}
**Note**  
The certificate you upload for this key must only be the public certificate.
{{< /note >}}


##### Make an API Request Using the Certificate

Now you can make a cURL request to the API using the certificate and private key:

```bash
curl -k --cert cert.pem --key key.pem https://localhost:8080/mtls-api/my-endpoint
```

A successful request should return a 200 response.

##### Allow Developers to Upload Certificates

Instead of manually creating keys, you can allow developers to upload their own certificates via the Developer Portal.

1. **Create a Policy:** Create a policy for the API you set up earlier.
2. **Create a Catalog Entry:** Create a catalog entry for this policy.
3. **Request a Key through the Portal:** As a developer, request a key for the API through the Portal. This will present a screen where the developer can upload their public certificate.

4. **Make an API Request Using the Uploaded Certificate:** After adding the public certificate, developers can make API requests using their cert + private key:

   ```bash
   curl -k --cert cert.pem --key key.pem https://localhost:8080/mtls-api/my-endpoint
   ```

   A successful request should return a 200 response.

#### Static mTLS

Static mTLS allows client certificates to be used at the API level. This method is straightforward and can be combined with another authentication method if needed.

##### Configure the API

In the API authentication settings, choose mTLS as the authentication type and optionally select an additional authentication method. If you want to use only client certificates without another authentication method, select "keyless" as the other option.

##### Set the Base Identity

The base identity can be anything, as the client certificate will be the primary authentication method.


##### Setup Static mTLS in Tyk Operator using the Tyk Classic API Definition

This setup requires mutual TLS (mTLS) for client authentication using specified client certificates. The example provided shows how to create an API definition with mTLS authentication for `httpbin-client-mtls`.

1. **Generate Self-Signed Key Pair:**

You can generate a self-signed key pair using the following OpenSSL command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

2. **Create Kubernetes Secret:**

Create a secret in Kubernetes to store the client certificate:

```bash
kubectl create secret tls my-test-tls --cert cert.pem --key key.pem
```

3. **Create API Definition:**

Below is the YAML configuration for an API that uses mTLS authentication. Note that the `client_certificate_refs` field references the Kubernetes secret created in the previous step.

```yaml {hl_lines=["19-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-client-mtls
spec:
  name: Httpbin Client MTLS
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  use_mutual_tls_auth: true
  client_certificate_refs:
    - my-test-tls
```

##### Setup Static mTLS in Tyk Operator using Tyk OAS API Definition

Client certificates, In Tyk OAS API Definition, are managed using the `TykOasApiDefinition` CRD. You can reference Kubernetes secrets that store client certificates in your API definitions.

**Example of Referencing Client Certificates in Tyk OAS**

In this example, the `clientCertificate` section allows you to enable client certificate management and specify a list of Kubernetes secrets (`tls-cert`) that store allowed client certificates.

```yaml {hl_lines=["48-50"],linenos=false}
# Secret is not created in this manifest.
# Please store client certificate in k8s TLS secret `tls-cert`.

apiVersion: v1
data:
  test_oas.json: |-
    {
        "info": {
          "title": "Petstore",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "Petstore",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "https://petstore.swagger.io/v2"
          },
          "server": {
            "listenPath": {
              "value": "/petstore/",
              "strip": true
            }
          }
        }
      }
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
  clientCertificate: 
      enabled: true
      allowlist: [tls-cert]
```


##### FAQ

*   **Why am I getting an error stating that certificates are not enabled for this API?**

    This issue can occur because client mTLS is an extension of Auth Token authentication mode. To enable this feature, ensure the API definition has `auth.use_certificate` set to `true`.

*   **Can I upload a full certificate chain when creating a key for dynamic client mTLS?**

    Yes, you can do this when manually creating a key as an Admin Dashboard user. However, through the Portal, you must upload only the public key (certificate).

*   **Can I use a root CA with client mTLS?**

    Yes, Tyk allows you to upload a root CA certificate for static mTLS authentication. This setup allows clients with certificates signed by the registered CA to be validated.

    **Key Points:**

    *   The root CA certificate can be uploaded as a client certificate.
    *   Clients presenting certificates signed by this CA will be validated.
    *   Tyk traverses the certificate chain for validation.
{{< note success >}}
  **Note** 
  Root CA certificates are compatible only with Static mTLS and not with Dynamic mTLS.
{{< /note >}}
    

#### Upstream mTLS

If your upstream API is protected with mutual TLS (mTLS), you can configure Tyk to send requests with the specified client certificate. This ensures secure communication between Tyk and your upstream services.

#### Key Features of Upstream mTLS

*   **Certificate Per Host:** You can specify one certificate per host and define a default certificate.
*   **API-Level or Global Configuration:** Upstream certificates can be defined at the API level or globally via the Gateway configuration file.
*   **JSVM Middleware Support:** Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware.

#### How To Set Up Upstream mTLS

To set up upstream mTLS in your API definition, you should configure the `upstream_certificates` field in the following format:

```yaml
{
  "upstream_certificates": {
    "example.com": "<cert-id>"
  }
}
```

If you want to configure this at a global level, specify it via the `security.certificates.upstream` field in your Gateway configuration file.

#### Via Dashboard

To configure upstream mTLS using the Tyk Dashboard:

1.  Navigate to the API Designer.
2.  Go to the Advanced Options panel.
3.  Find the Upstream Certificates section and attach the appropriate certificate.

    {{< img src="/img/2.10/attach_upstream_cert.png" alt="upstream_cert" >}}

#### Via Tyk Operator using the Tyk Classic API Definition

Tyk Operator supports configuring upstream mTLS using one of the following fields within the ApiDefinition object:

- **upstream_certificate_refs**: Configure using certificates stored within Kubernetes secret objects.
- **upstream_certificates**: Configure using certificates stored within Tyk Dashboard's certificate store.

##### upstream_certificate_refs

The `upstream_certificate_refs` field can be used to configure certificates for different domains. References can be held to multiple secrets which are used for the domain mentioned in the key. Currently "*" is used as a wildcard for all the domains

The example listed below shows that the certificate in the secret, *my-test-tls*, is used for all domains.

```yaml
# First apply this manifest using the command
# "kubectl apply -f config/samples/httpbin_upstream_cert.yaml"
#
# The operator will try to create the ApiDefinition and will succeed but will log an error that a certificate is missing
# in the cluster for an upstream
#
# Generate your public-private key pair , for test you can use the following command to obtain one fast:
# "openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out tls.crt -keyout tls.key"
#
# Run the following command to obtain the values that must be put inside the yaml that contians the secret resource:
# "kubectl create secret tls my-test-tls --key="tls.key" --cert="tls.crt" -n default -o yaml --dry-run=client"
#
# Apply your TLS certificate using the following command: (we already have an example one in our repo)
# "kubectl apply -f config/sample/simple_tls_secret.yaml"
#
# NOTE: the upstream_certificate_refs can hold references to multiple secrets which are used for the domain
# mentioned in the key (currently "*" is used as a wildcard for all the domains)
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  upstream_certificate_refs:
    "*": my-test-tls
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
```

A secret can be created and output in yaml format using the following command:

```bash
kubectl create secret tls my-test-tls --key="keyfile.key" --cert="certfile.crt" -n default -o yaml --dry-run=client
kubectl apply -f path/to/your/tls_secret.yaml
```

##### upstream_certificates

The `upstream_certificates` field allows certificates uploaded to the certificate store in Tyk Dashboard to be referenced in the Api Definition:

```yaml
# Skip the concatenation and .pem file creation if you already have a certificate in the correct format

# First generate your public-private key pair , for test use you can use the following command to obtain one fast:
# "openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out tls.crt -keyout tls.key"

# Concatenate the above files to obtain a .pem file which we will upload using the dashboard UI
# "cat tls.crt tls.key > cert.pem"

# Upload it to the tyk certificate store using the dashboard

# Fill in the manifest with the certificate id (the long hash) that you see is given to it in the dashboard
# (in place of "INSERT UPLOADED CERTIFICATE NAME FROM DASHBOARD HERE")
# Optional: Change the domain from "*" to something more specific if you need to use different
# upstream certificates for different domains

# Then apply this manifest using the command
# "kubectl apply -f config/samples/httpbin_upstream_cert_manual.yaml"

# The operator will try create the ApiDefinition and will succeed and it will have the requested domain upstream certificate
# in the cluster for an upstream

# NOTE: the upstream_certificate can hold multiple domain-certificateName pairs
# (currently "*" is used as a wildcard for all the domains)

apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  upstream_certificates:
    "*": #INSERT UPLOADED CERTIFICATE NAME FROM DASHBOARD HERE#
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
```

#### Via Tyk Operator using Tyk OAS API Definition{#tyk-operator-oas}
Tyk Operator supports configuring upstream mTLS using the `mutualTLS` field in `TykOasApiDefinition` object:

```yaml{hl_lines=["12-18"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
 kind: TykOasApiDefinition
 metadata:
   name: petstore
   namespace: default
 spec:
   tykOAS:
     configmapRef:
       name: petstore
       namespace: default
       keyName: petstore.json
   mutualTLS:
     enabled: true
     domainToCertificateMapping:
       - domain: "petstore.com"
         certificateRef: petstore-domain
       - domain: "petstore.co.uk"
         certificateRef: petstore-uk-domain
```



#### Domain Configuration

When specifying the domain for the upstream certificate, do **NOT** include the protocol (e.g., `https://`). Including the protocol will prevent Tyk from matching the certificates to the correct domain.

**Incorrect:** `https://api.production.myupstream.com`

**Correct:** `api.production.myupstream.com`

If the request is made via a non-standard HTTP port, you need to include the port in the domain:

**Correct:** `api.production.myupstream.com:8443`

#### Wildcards

You may use wildcards in combination with text to match the domain, but this only works one level deep.

For example, if your domain is `api.production.myupstream.com`:

**Correct:** `*.production.myupstream.com`

**Incorrect:** `*.myupstream.com`

#### Default Upstream Certificate

To set a default client certificate, use `*` instead of a domain name:

```yaml
{
  "upstream_certificates": {
    "*": "<cert-id>"
  }
}
```

This configuration will apply the specified certificate to all upstream requests that do not match a more specific domain.

### Sign Requests with HMAC

{{< note success >}} Note

Tyk can interact with HMAC Signing in two ways. Firstly, as a client, we can validate the signature of incoming requests and map this to API access. You can also use Tyk to generate a header containing the signature of the request for use in upstream message integrity checks. For the upstream HMAC case please see [here]({{< ref "#upstream-hmac-request-signing" >}}) {{< /note >}}

Hash-Based Message Authentication Code (HMAC) Signing is an access token method that adds another level of security by forcing the requesting client to also send along a signature that identifies the request temporally to ensure that the request is from the requesting user, using a secret key that is never broadcast over the wire.

Tyk currently implements the latest draft of the [HMAC Request Signing standard](http://tools.ietf.org/html/draft-cavage-http-signatures-05).

An HMAC signature is essentially some additional data sent along with a request to identify the end-user using a hashed value, in our case we encode the 'date' header of a request, the algorithm would look like:

```
Base64Encode(HMAC-SHA1("date: Mon, 02 Jan 2006 15:04:05 MST", secret_key))
```

The full request header for an HMAC request uses the standard `Authorization` header, and uses set, stripped comma-delimited fields to identify the user, from the draft proposal:

```
Authorization: Signature keyId="hmac-key-1",algorithm="hmac-sha1",signature="Base64Encode(HMAC-SHA1(signing string))"
```

Tyk supports the following HMAC algorithms: "hmac-sha1", "hmac-sha256", "hmac-sha384", "hmac-sha512”, and reads value from algorithm header. You can limit allowed algorithms by setting `hmac_allowed_algorithms` field in API definition, like this: `"hmac_allowed_algorithms": ["hmac-sha256", "hmac-sha512"]`.

The date format for an encoded string is:

```
Mon, 02 Jan 2006 15:04:05 MST
```

This is the standard for most browsers, but it is worth noting that requests will fail if they do not use the above format.

When an HMAC-signed request comes into Tyk, the key is extracted from the `Authorization` header, and retrieved from Redis. If the key exists then Tyk will generate its own signature based on the requests "date" header, if this generated signature matches the signature in the `Authorization` header the request is passed.

##### Supported headers

Tyk API Gateway supports full header signing through the use of the `headers` HMAC signature field. This includes the request method and path using the`(request-target)` value. For body signature verification, HTTP Digest headers should be included in the request and in the header field value.

{{< note success >}}
**Note**  

All headers should be in lowercase.
{{< /note >}}


##### A sample signature generation snippet

```{.copyWrapper}
...

refDate := "Mon, 02 Jan 2006 15:04:05 MST"

// Prepare the request headers:
tim := time.Now().Format(refDate)
req.Header.Add("Date", tim)
req.Header.Add("X-Test-1", "hello")
req.Header.Add("X-Test-2", "world")

// Prepare the signature to include those headers:
signatureString := "(request-target): " + "get /your/path/goes/here"
signatureString += "date: " + tim + "\n"
signatureString += "x-test-1: " + "hello" + "\n"
signatureString += "x-test-2: " + "world"

// SHA1 Encode the signature
HmacSecret := "secret-key"
key := []byte(HmacSecret)
h := hmac.New(sha1.New, key)
h.Write([]byte(signatureString))

// Base64 and URL Encode the string
sigString := base64.StdEncoding.EncodeToString(h.Sum(nil))
encodedString := url.QueryEscape(sigString)

// Add the header
req.Header.Add("Authorization", 
  fmt.Sprintf("Signature keyId="9876",algorithm="hmac-sha1",headers="(request-target) date x-test-1 x-test-2",signature="%s"", encodedString))

...
```

##### Date header not allowed for legacy .Net

Older versions of some programming frameworks do not allow the Date header to be set, which can causes problems with implementing HMAC, therefore, if Tyk detects a `x-aux-date` header, it will use this to replace the Date header.

##### Clock Skew

Tyk also implements the recommended clock-skew from the specification to prevent against replay attacks, a minimum lag of 300ms is allowed on either side of the date stamp, any more or less and the request will be rejected. This means that requesting machines need to be synchronised with NTP if possible.

You can edit the length of the clock skew in the API Definition by setting the `hmac_allowed_clock_skew` value in your API definition. This value will default to 0, which deactivates clock skew checks.

##### Additional notes

HMAC Signing is a good way to secure an API if message reliability is paramount, it goes without saying that all requests should go via TLS/SSL to ensure that MITM attacks can be minimized. There are many ways of managing HMAC, and because of the additional encryption processing overhead requests will be marginally slower than more standard access methods.

#### Setting up HMAC using the Dashboard

To enable the use of HMAC Signing in your API from the Dashboard:

1. Select your API from the **System Management > APIs** menu
2. Scroll to the **Authentication** options
3. Select **HMAC (Signed Authetication Key)** from the drop-down list
4. Configure your **HMAC Request Signing** settings.
5. Select **Strip Authorization Data** to strip any authorization data from your API requests.
6. Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the **Auth Key Header** name value
7. You can select whether to use a URL query string parameter as well as a header, and what parameter to use. If this is left blank, it will use the **Auth Key Header** name value.
8. You can select whether to use a **cookie value**. If this is left blank, it will use the Header name value.


{{< img src="/img/2.10/hmac_auth_settings.png" alt="Target Details: HMAC" >}}


#### Setting up HMAC using an API Definition

To enable HMAC on your API, first you will need to set the API definition up to use the method, this is done in the API Definition file/object:

```{.copyWrapper}
{
  "name": "Tyk Test API",
  ...
  "enable_signature_checking": true,
  "use_basic_auth": false,
  "use_keyless": false,
  "use_oauth2": false,
  "auth": {
    "auth_header_name": ""
  },
  ...
}
```

Ensure that the other methods are set to false.

#### Setting up an HMAC Session Object

When creating a user session object, the settings should be modified to reflect that an HMAC secret needs to be generated alongside the key:

```{.copyWrapper}
{
  ...
  "hmac_enabled": true,
  "hmac_string": "",
  ...
}
```

Creating HMAC keys is the same as creating regular access tokens - by using the [Tyk Gateway API]({{< ref "api-management/gateway-config-tyk-classic#authentication-type-flags" >}}). Setting the `hmac_enabled` flag to `true`, Tyk will generate a secret key for the key owner (which should not be modified), but will be returned by the API so you can store and report it to your end-user.


#### Upstream HMAC request signing

You can sign a request with HMAC, before sending to the upsteam target.

This feature is implemented using [Draft 10](https://tools.ietf.org/html/draft-cavage-http-signatures-10) RFC.

`(request-target)` and all the headers of the request will be used for generating signature string.
If the request doesn't contain a `Date` header, middleware will add one as it is required according to above draft.

A config option `request_signing` can be added in an API Definition to enable/disable the request signing. It has following format:

```{.json}
"request_signing": {
  "is_enabled": true,
  "secret": "xxxx",
  "key_id": "1",
  "algorithm": "hmac-sha256"
}
```

The following algorithms are supported:

1. `hmac-sha1`
2. `hmac-sha256`
3. `hmac-sha384`
4. `hmac-sha512`

<!-- To be added
### Sign Requests with RSA
-->

### Custom Authentication

#### Go Plugins

Go Plugin Authentication allows you to implement custom authentication logic using the Go programming language. This method is useful for scenarios where you need to implement specialized authentication mechanisms that are not natively supported by Tyk.
To learn more about using Tyk Golang Plugins, go [here]({{< ref "api-management/plugins/golang" >}})

#### Use Python CoProcess and JSVM Plugin Authentication

Tyk allows for custom authentication logic using Python and JavaScript Virtual Machine (JSVM) plugins. This method is useful for implementing unique authentication mechanisms that are tailored to your specific requirements.

* See [Custom Authentication with a Python plugin]({{< ref "api-management/plugins/rich-plugins#custom-authentication-plugin-tutorial" >}}) for a detailed example of a custom Python plugin.
* See [JavaScript Middleware]({{< ref "api-management/plugins/javascript#" >}}) for more details on using JavaScript Middleware. 

### Open (No Authentication)

Open or keyless authentication allows access to APIs without any authentication. This method is suitable for public APIs where access control is not required.

#### Configure the API as Open or Keyless in Tyk

In Tyk, configure the API to not require any authentication for access.
To implement keyless access, simply set the flag in your API Definition:

```{.copyWrapper}
{
  ...
  "use_keyless": true,
  "auth": {
      "auth_header_name": ""
  },
  ...
}
```
This will stop checking keys that are proxied by Tyk.

{{< note success >}}
**Note**  

Keyless APIs cannot be selected for [Access Rights]({{< ref "getting-started/create-security-policy" >}}) in a security policy.
{{< /note >}}

#### Request a Public Resource

Access the API directly without any authentication tokens or credentials.

```bash
curl -X GET \
  https://api.example.com/public-resource
```

**Request:**

| Parameter | Value                                  |
| ---------- | ------------------------------------- |
| **Method**  | `GET`                                   |
| **URL**     | The API endpoint for the public resource. |


**Request:**

| Parameter       | Value                              |
| --------------- | ---------------------------------- |
| **Method**      | `GET`                                |
| **URL**         | The API endpoint for the protected resource. |
| **Authorization** | Bearer token, e.g., `Bearer ID_TOKEN`. |


### Integrate with External Authorization Server (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered two types of OAuth authentication flow; [Tyk as the authorization server](#use-tyk-as-an-oauth-20-authorization-server) and Tyk connecting to an external *auth server* via a dedicated *External OAuth* option. The dedicated external *auth server* option was deprecated in Tyk 5.7.0.
<br>

For third-party OAuth integration we recommend using the JSON Web Token (JWT) middleware which is described [above](#use-json-web-tokens-jwt), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
<br>

The remainder of this section is left for reference and is not maintained.
{{< /note >}}

To call an API that is protected by OAuth, you need to have an access token from the third party IDP (it could be an opaque token or a JWT). 

For subsequent calls the access token is provided alongside the API call and needs to be validated. With JWT, Tyk can confirm the validity of the JWT with the secret provided in your config. The secret signs the JWT when created and confirms that none of its contents has changed. 

For this reason, information like the expiry date which are often set within the JWT cannot be changed after the JWT has been initially created and signed. This means you are not able to revoke a token before the expiry set in the JWT with the standard JWT flow. With OAuth you can use [OAuth introspection](https://www.rfc-editor.org/rfc/rfc7662) to overcome this. With introspection, you can validate the access token via an introspection endpoint that validates the token. 

Let’s see how external OAuth middleware is configured.

#### OAS contract

```yaml
externalOAuthServer:
  enabled: true,
  providers: # only one item in the array for now (we're going to support just one IDP config in the first iteration)
  - jwt: #validate JWTs generated by 3rd party Oauth servers (like Okta)
      enabled: true
      signingMethod: HMAC/RSA/ECDSA # to verify signing method used in jwt
      source: key # secret to verify signature
      issuedAtValidationSkew: 0
      notBeforeValidationSkew: 0
      expiresAtValidationSkew: 0
      identityBaseField: # identity claimName
    introspection: # array for introspection details
      enabled: true/false
      clientID: # for introspection request
      clientSecret: # for introspection request, if empty will use oAuth.secret
      url: # token introspection endpoint
      cache: # Tyk will cache the introspection response when `cache.enabled` is set to `true`
        enabled: true/false,
        timeout: 0 # The duration (in seconds) for which Tyk will retain the introspection outcome in its cache. If the value is "0", it indicates that the introspection outcome will be stored in the cache until the token's expiration.
      identityBaseField: # identity claimName
```

#### Tyk Classic API definition contract

```yaml
"external_oauth": {
  "enabled": true,
  "providers": [
    {
      "jwt": {
        "enabled": false,
        "signing_method": rsa/ecdsa/hmac,
        "source": # jwk url/ base64 encoded static secret / base64 encoded jwk url
        "identity_base_field": # identity claim name
        "expires_at_validation_skew": # validation skew config for exp
        "not_before_validation_skew": # validation skew config for nbf
        "issued_at_validation_skew" : # validation skew config for iat
      },
      "introspection": {
        "enabled": true,
        "url": # introspection endpoint url
        "client_id": # client Id used for introspection
        "client_secret": # client secret to be filled here (plain text for now, TODO: decide on a more secure mechanism)
        "identity_base_field": # identity claim name
        "cache": {
          "enabled": true,
          "timeout": # timeout in seconds
        }
      }
    }
  ]
}
```
- `externalOAuthServer` set `enabled` to `true` to enable the middleware.
- `providers` is an array of multiple IDP configurations, with each IDP config being an element in the `providers` array. 
- You can use this config to use JWT self validation using `jwt` or use introspection via `instropection` in the `providers` section .

{{< note success >}}
**Note**  

For now, you’ll be limiting `providers` to have only one element, ie one IDP configured.
{{< /note >}}

#### JWT

There could be cases when you don’t need to introspect a JWT access token from a third party IDP, and instead you can just validate the JWT. This is similar to existing JWT middleware, adding it in External OAuth middleware for semantic reasons.

- `enabled` - enables JWT validation.
- `signingMethod` - specifies the signing method used to sign the JWT.
- `source` - the secret source, it can be one of:
  - a base64 encoded static secret
  - a valid JWK url in plain text
  - a valid JWK url in base64 encoded format
- `issuedAtValidationSkew` , `notBeforeValidationSkew`, `expiresAtValidationSkew` can be used to [configure clock skew](#adjust-jwt-clock-skew-configuration) for json web token validation.
- `identityBaseField` - the identity key name for claims. If empty it will default to `sub`.

##### Example: Tyk OAS API definition with JWT validation enabled

```json
"securitySchemes": {
  "external_jwt": {
    "enabled": true,
    "header": {
      "enabled": true,
      "name": "Authorization"
    },
    "providers": [
      {
        "jwt": {
          "enabled": true,
          "signingMethod": "hmac",
          "source": "dHlrLTEyMw==",
          "identityBaseField": "sub"
        }
      }
    ]
  }
}
```

##### Example: Tyk Classic API definition with JWT validation enabled

```json
"external_oauth": {
  "enabled": true,
  "providers": [
      {
          "jwt": {
              "enabled": true,
              "signing_method": "hmac",
              "source": "dHlrLTEyMw==",
              "issued_at_validation_skew": 0,
              "not_before_validation_skew": 0,
              "expires_at_validation_skew": 0,
              "identity_base_field": "sub"
          },
          "introspection": {
              "enabled": false,
              "url": "",
              "client_id": "",
              "client_secret": "",
              "identity_base_field": "",
              "cache": {
                  "enabled": false,
                  "timeout": 0
              }
          }
      }
  ]
}
```
#### Introspection

For cases where you need to introspect the OAuth access token, Tyk uses the information in the `provider.introspection` section of the contract. This makes a network call to the configured introspection endpoint with the provided `clientID` and `clientSecret` to introspect the access token.

- `enabled` - enables OAuth introspection
- `clientID` - clientID used for OAuth introspection, available from IDP
- `clientSecret` - secret used to authenticate introspection call, available from IDP
- `url` - endpoint URL to make the introspection call
- `identityBaseField` - the identity key name for claims. If empty it will default to `sub`.

##### Caching

Introspection via a third party IdP is a network call. Sometimes it may be inefficient to call the introspection endpoint every time an API is called. Caching is the solution for this situation. Tyk caches the introspection response when `enabled` is set to `true` inside the `cache` configuration of `introspection`. Then it retrieves the value from the cache until the `timeout` value finishes. However, there is a trade-off here. When the timeout is long, it may result in accessing the upstream with a revoked access token. When it is short, the cache is not used as much resulting in more network calls. 

The recommended way to handle this balance is to never set the `timeout` value beyond the expiration time of the token, which would have been returned in the `exp` parameter of the introspection response.

See the example introspection cache configuration:

```yaml
"introspection": {
  ...
  "cache": {
    "enabled": true,
    "timeout": 60 // in seconds
  }
}
```
##### Example: Tyk OAS API definition external OAuth introspection enabled

```json
"securitySchemes": {
  "keycloak_oauth": {
    "enabled": true,
    "header": {
      "enabled": true,
      "name": "Authorization"
    },
    "providers": [
      {
        "introspection": {
          "enabled": true,
          "url": "http://localhost:8080/realms/tyk/protocol/openid-connect/token/introspect",
          "clientId": "introspection-client",
          "clientSecret": "DKyFN0WXu7IXWzR05QZOnnSnK8uAAZ3U",
          "identityBaseField": "sub",
          "cache": {
            "enabled": true,
            "timeout": 3
          }
        }
      }
    ]
  }
}
```
##### Example: Tyk Classic API definition with external OAuth introspection enabled

```json
"external_oauth": {
  "enabled": true,
  "providers": [
      {
          "jwt": {
              "enabled": false,
              "signing_method": "",
              "source": "",
              "issued_at_validation_skew": 0,
              "not_before_validation_skew": 0,
              "expires_at_validation_skew": 0,
              "identity_base_field": ""
          },
          "introspection": {
              "enabled": true,
              "url": "http://localhost:8080/realms/tyk/protocol/openid-connect/token/introspect",
              "client_id": "introspection-client",
              "client_secret": "DKyFN0WXu7IXWzR05QZOnnSnK8uAAZ3U",
              "identity_base_field": "sub",
              "cache": {
                  "enabled": true,
                  "timeout": 3
              }
          }
      }
  ]
}
```

### Integrate with OpenID Connect (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered a dedicated OpenID Connect option for client authentication, but this was not straightforward to use and was deprecated in Tyk 5.7.0.
<br>

For integration with a third-party OIDC provider we recommend using the JSON Web Token (JWT) middleware which is described [above](#use-json-web-tokens-jwt), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
<br>

The remainder of this section is left for reference and is not maintained.
{{< /note >}}


[OpenID Connect](https://openid.net/developers/how-connect-works) (OIDC) builds on top of OAuth 2.0, adding authentication. You can secure your APIs on Tyk by integrating with any standards compliant OIDC provider using [JSON Web Tokens](#use-json-web-tokens-jwt) (JWTs).
JWTs offer a simple way to use the third-party Identity Provider (IdP) without needing any direct integration between the Tyk and 3rd-party systems.

To integrate a 3rd party OAuth2/OIDC IdP with Tyk, all you will need to do is ensure that your IdP can issue OAuth2 JWT access tokens as opposed to opaque tokens.

The client application authenticates with the IdP which then provides an access token that is accepted by Tyk. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.





## Combine Authentication Methods

As of Tyk v2.3, it is possible to have multiple authentication middleware chained together. For example, you can use an Access Token in combination with Basic Auth or with a JSON Web Token. Below is a video demonstration of this functionality:

{{< youtube-seo id="vYGYYXcJ6Wc" title="Protect an API with Multiple Authentication Types">}}

### Enable Multi (Chained) Authentication with the Dashboard

To enable multi-chained authentication in your GUI, follow these steps:

1.  Browse to the "Authentication" Section

    First, navigate to the Endpoint Designer and view the "Core Settings" tab. In this section, you can choose various authentication methods. For this setup, you will configure multiple auth providers, which works slightly differently than setting up a single auth method.

2.  Select the Multiple Auth Mechanisms Option

    Select the Use Multiple Auth Mechanisms option from the drop-down list. This will open a window that provides checkboxes for each supported auth type to be chained. Note that it is not possible to set the order of chained auth methods.

    {{< img src="/img/api-management/security/multiple-auth-choose-auth.png" alt="Select Multiple Auth" >}}

3.  Select Your Preferred Auth Methods and Base Identity Provider

    Choose the authentication methods you want to chain together and select the base identity provider. The baseline provider will be the one that provides the current request context with the session object, defining the "true" access control list, rate limit, and quota to apply to the user.

    {{< img src="/img/api-management/security/multiple-auth-methods.png" alt="Select Auth Methods" >}}

    Once these are set up, you will see the traditional configuration screens for each of the auth methods selected in the checkboxes. Configure them as you would regular authentication modes.

### Enable Multi (Chained) Authentication in Your API Definition

To enable this mode, set the `base_identity_provided_by` field in your API Definitions to one of the supported chained enums below:

*   `AuthToken`
*   `HMACKey`
*   `BasicAuthUser`
*   `JWTClaim`
*   `OIDCUser`
*   `OAuthKey`
*   `UnsetAuth`

The provider set here will then be the one that provides the session object that determines rate limits, ACL rules, and quotas.

Tyk will chain the auth mechanisms as they appear in the code and will default to an auth token if none are specified. You can explicitly set auth token support by setting `use_standard_auth` to `true`.

### Enable Multi (Chained) Authentication with Tyk Operator

Please consult the [Tyk Operator]/product-stack/tyk-operator/advanced-configurations/client-authentication#multiple-chained-auth - ??does this exist?? supporting documentation for an example of how to enable multi chained authentication with Tyk Operator.


## Set Physical Key Expiry and Deletion
Tyk makes a clear distinction between an API authorization key expiring and being deleted from the Redis storage.

- When a key expires, it remains in the Redis storage but is no longer valid. Consequently, it is no longer authorized to access any APIs. If a key in Redis has expired and is passed in an API request, Tyk will return `HTTP 401 Key has expired, please renew`.
 - When a key is deleted from Redis, Tyk no longer knows about it, so if it is passed in an API request, Tyk will return `HTTP 400 Access to this API has been disallowed`.

Tyk provides separate control for the expiration and deletion of keys.

Note that where we talk about keys here, we are referring to [Session Objects]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}), also sometimes referred to as Session Tokens

### Key expiry

Tyk's API keys ([token session objects]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}})) have an `expires` field. This is a UNIX timestamp and, when this date/time is reached, the key will automatically expire; any subsequent API request made using the key will be rejected.

### Key lifetime

Tyk does not automatically delete keys when they expire. You may prefer to leave expired keys in Redis storage, so that they can be renewed (for example if a user has - inadvisedly - hard coded the key into their application). Alternatively, you may wish to delete keys to avoid cluttering up Redis storage with obsolete keys.

You have two options for configuring the lifetime of keys when using Tyk:

1.  At the API level
2.  At the Gateway level

#### API-level key lifetime control

You can configure Tyk to delete keys after a configurable period (lifetime) after they have been created. Simply set the `session_lifetime` field in your API Definition and keys created for that API will automatically be deleted when that period (in seconds) has passed.

The default value for `session_lifetime` is 0, this is interpreted as an infinite lifetime which means that keys will not be deleted from Redis.

For example, to have keys live in Redis for only 24 hours (and be deleted 24 hours after their creation) set:

```{.json}
"session_lifetime": 86400
```

{{< note success >}} 
**Note**

There is a risk, when configuring API-level lifetime, that a key will be deleted before it has expired, as `session_lifetime` is applied regardless of whether the key is active or expired. To protect against this, you can configure the [session_lifetime_respects_key_expiration]({{< ref "tyk-oss-gateway/configuration#session_lifetime_respects_key_expiration" >}}) parameter in your `tyk.conf`, so that keys that have exceeded their lifetime will not be deleted from Redis until they have expired.
{{< /note >}}

This feature works nicely with [JWT](#use-json-web-tokens-jwt) or [OIDC](#integrate-with-openid-connect-deprecated) authentication methods, as the keys are created in Redis the first time they are in use so you know when they will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a long `session_lifetime`, otherwise the user might try to use the key **after** it has already been removed from Redis.

#### Gateway-level key lifetime control

You can set a global lifetime for all keys created in the Redis by setting [global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#global_session_lifetime" >}}) in the `tyk.conf` file; this parameter is an integer value in seconds.

To enable this global lifetime, you must also set the [force_global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#force_global_session_lifetime" >}}) parameter in the `tyk.conf` file.

#### Summary of key lifetime precedence

The table below shows the key lifetime assigned for the different permutations of `force_global_session_lifetime` and  `session_lifetime_respects_key_expiration` configuration parameters.
| `force_global_session_lifetime` | `session_lifetime_respects_key_expiration` | Assigned lifetime |
|---------------------------------|--------------------------------------------|-------------------------------------------|
| `true`                          | `true`                                     | `global_session_lifetime`                 |
| `true`                          | `false`                                    | `global_session_lifetime`                 |
| `false`                         | `true`                                     | larger of `session_lifetime` or `expires` |
| `false`                         | `false`                                    | `session_lifetime`                        |

{{< note success >}} 
**Note**

It is important to remember that a value of `0` in `session_lifetime` or `global_session_lifetime` is interpreted as infinity (i.e. key will not be deleted if that control is in use) - and if a field is not set, this is treated as `0`.
<br>
If you want the key to be deleted when it expires (i.e. to use the expiry configured in `expires` within the key to control deletion) then you must set a non-zero value in `session_lifetime` and configure both `session_lifetime_respects_key_expiration:true` and `force_global_session_lifetime:false`.
{{< /note >}}



## Conclusion

Securing your APIs is a foundational step toward managing data integrity and access control effectively. Now that you've configured authentication and authorization, the next steps in your API journey with Tyk should involve:

Defining Access Policies: Use Tyk’s policies to refine API access controls, rate limits, and quotas. This lets you align your security model with business needs and enhance user experience through granular permissions. You can learn more about policies [here](/api-management/policies/).

Exploring API Analytics: Leverage Tyk’s analytics to monitor access patterns, track usage, and gain insights into potential security risks or high-demand endpoints. Understanding usage data can help in optimizing API performance and enhancing security measures. You can learn more about analytics [here](/tyk-dashboard-analytics/).