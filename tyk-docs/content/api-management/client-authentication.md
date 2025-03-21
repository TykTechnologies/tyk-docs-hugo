---
title: Client Authentication and Authorization
description: Learn how to apply the most appropriate authentication method to secure access your APIs with Tyk. Here you will find everything there is to know about authenticating and authorizing API clients with Tyk.
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
aliases:
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
  - /security/your-apis/openid-connect
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

The API request processing flow within Tyk Gateway consists of a [chain of middleware]({{< ref "api-management/traffic-transformation#request-middleware-chain" >}}) that perform different checks and transformations on the request (headers, parameters and payload). Several dedicated **authentication middleware** are provided and there is also support for user-provided **custom authentication plugins**. Multiple authentication middleware can be chained together if required by the API's access security needs. *Note that it is not possible to set the order of chained auth methods.*

The OpenAPI description can contain a list of [securitySchemes](https://spec.openapis.org/oas/v3.0.3.html#security-scheme-object) which define the authentication methods to be used for the API; the detailed configuration of the Tyk authentication middleware is set in the [server.authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) section of the Tyk Vendor Extension.

You must enable client authentication using the `server.authentication.enabled` flag and then configure the appropriate authentication method as indicated in the relevant section of this document. When creating a Tyk OAS API from an OpenAPI description, Tyk can automatically enable authentication based upon the content of the OpenAPI description as described [here]({{< ref "api-management/gateway-config-managing-oas#create-a-secured-api-when-importing-an-openapi-document" >}}).

When using Tyk Classic APIs, each authentication middleware has its own fields within the API definition

### Managing authorization data

The data that the client provides with the API request used to authenticate with Tyk and confirm that it is authorized to access the API is often of no use to the upstream service and, depending on your security governance, may even be prohibited from being made available to the upstream.

Tyk offers a simple option, separately configurable for each API to remove, or "strip", the authentication/authorization date from the incoming request before proxying to the upstream.

This is controlled using the [server.authentication.stripAuthorizationData]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) field in the Tyk Vendor Extension (Tyk Classic: `strip_auth_data`).

## What does Tyk Support?

Tyk includes support for various industry-standard methods to secure your APIs. This page provides an overview of the options available, helping you to choose and implement what works best for you.

Use Ctrl+F or the sidebar to find specific topics, for example “JWT” for JSON Web Tokens or “mTLS” for mutual TLS.

You can also use the links below to jump directly to the appropriate sections to learn how to secure your APIs using Tyk.

{{< grid >}}
{{< badge title="OAuth 2.0" href="api-management/client-authentication/#use-tyk-as-an-oauth-20-authorization-server" >}}
Delegate authentication using one of the most widely used open standard protocols
{{< /badge >}}

{{< badge title="JWT" href="basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}
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

Tyk can act as an OAuth 2.0 *authorization server*, performing token generation and management for *clients* accessing APIs deployed on Tyk. There are many great resources on the Internet that will help you to understand the OAuth 2.0 Authorization Framework, which we won't attempt to duplicate here. We will provide a basic introduction to the [concepts and terminology](#oauth-20-core-concepts) before we dive into the details of using Tyk as your *auth server*.

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
 
The *access tokens* issued to clients by *Tyk Authorization Server* are the same as other [session objects]({{< ref "api-management/policies#what-is-a-session-object" >}}) and can be associated with [access security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) at the point of creation. These allow the application of quotas, rate limits and access rights in the normal manner.

Security policies can be assigned to *client apps* and will be applied to all access tokens issued for that *client app*.


### Client App Registration

For all grant types, the first common step is the registration of the *client* with Tyk Dashboard by creation of a *Client App*. This will allocate a *client Id* and *client secret* that must be provided in future authentication requests by the *client*.

#### Using the Tyk Dashboard UI

1. *Client apps* are registered per-API, so the first step is to [configure Tyk OAuth 2.0](#configuring-your-api-proxy) as the security method to be used for the API. With this done, you can navigate to the OAuth Client management screen for the API from the **Actions** menu on the **Created APIs** screen:

{{< img src="/img/api-management/security/create-oauth-from-api-list.png" alt="Accessing the list of OAuth Clients for an API" >}}

2. You will now be prompted to register a *client app* that will be granted access to the API configuring:

- redirect URI
- [optional] [security policies](#manage-client-access-policies) to be applied to access tokens generated for the client
- [optional] [metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}}) to be added to the access tokens

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

1. Client Authentication is configured on the **Settings** screen within the API Designer, within the **Server** section. Ensure that you are in **Edit** mode, click on the button to **Enable** *Authentication* and then select **Tyk OAuth 2.0** from the drop down options:

{{< img src="/img/dashboard/system-management/oauth-auth-mode-new.png" alt="Set Authentication Mode" >}}

2. Select the OAuth Grant Type that you wish to use for the API, if appropriate you can also select the *Refresh Token* grant so that the Auth Server (Tyk) will generate both access and refresh tokens.

3. Provide the requested configuration options depending on the selected Grant Type. Note that for *Authorization Code Grant*, **Redirect URL** should be the login page for your Identity Server and must be matched by the `redirect_uri` provided in the *client app* (and in the client's authentication request). The [Notifications](#oauth-token-notifications) configuration can be provided for *Authorization Code* and *Password* grants.

4. Select **Save API** to apply the new settings.

#### Using the API Definition

The OpenAPI Specification indicates the use of [OAuth 2.0 authentication](https://swagger.io/docs/specification/v3_0/authentication/oauth2/) in the `components.securitySchemes` object using the `type: oauth2`. Tyk supports the [authorizationCode]({{< ref "api-management/client-authentication#using-the-authorization-code-grant" >}}), [clientCredentials]({{< ref "api-management/client-authentication#using-the-client-credentials-grant" >}}) and [password]({{< ref "api-management/client-authentication#using-the-resource-owner-password-grant" >}}) flows and implements Relative Endpoint URLs for the `authorizationUrl`, `tokenUrl` and `refreshUrl`.

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: ...
          tokenUrl: ...
          scopes: ...

security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, in the Tyk Vendor Extension we need to enable authentication, to select this security scheme and to indicate where Tyk should look for the OAuth token. Usually the token will be provided in the `Authorization` header, but Tyk is configurable, via the Tyk Vendor Extension, to support custom header keys and credential passing via query parameter or cooke.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the user credentials]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field (Tyk Classic: `strip_auth_data`).

With the OAuth method selected, you'll need to configure Tyk to handle the specific configuration of OAuth grants that you will support. All of the OAuth specific configuration is performed within the [authentication.securitySchemes.oauth]({{< ref "api-management/gateway-config-tyk-oas#oauth" >}}) object in the Tyk Vendor Extension.

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

#### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select the Tyk as OAuth Server method using the `use_oauth2` option.

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

The example given [above]({{< ref "api-management/client-authentication#using-the-api-definition" >}}) includes the configuration necessary to issue notifications for token issuance (see lines 48-51 in the example).


## Other Authentication Methods


### Use Basic Authentication

Basic Authentication is a straightforward authentication method where the user's credentials (username and password) are  sent to the server, usually in a standard HTTP header.

#### How does Basic Authentication Work?

The user credentials are combined and encoded in this form:

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

With Basic Authentication, the authentication credentials are transferred from client to server as encoded plain text. This is not a particularly secure way to transfer the credentials as it is highly susceptible to intercept; as the security of user authentication is usually of critical importance to API owners, Tyk recommends that Basic Authentication should only ever be used in conjunction with additional measures, such as [mTLS]({{< ref "api-management/client-authentication#use-mutual-tls" >}}).

#### Configuring your API to use Basic Authentication

The OpenAPI Specification indicates the use of [Basic Authentication](https://swagger.io/docs/specification/v3_0/authentication/basic-authentication/) in the `components.securitySchemes` object using the `type: http` and `scheme: basic`:

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: http
      scheme: basic

security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, all that is left to be configured in the Tyk Vendor Extension is to enable authentication, to select this security scheme and to indicate where Tyk should look for the credentials. Usually the credentials will be provided in the `Authorization` header, but Tyk is configurable, via the Tyk Vendor Extension, to support custom header keys and credential passing via query parameter or cookie.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the user credentials]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field (Tyk Classic: `strip_auth_data`).

##### Multiple User Credential Locations

The OpenAPI Specification's `securitySchemes` mechanism allows only one location for the user credentials, but in some scenarios an API might need to support multiple potential locations to support different clients.

The Tyk Vendor Extension supports this by allowing configuration of alternative locations in the basic auth entry in `server.authentication.securitySchemes`. Building on the previous example, we can add optional query and cookie locations as follows:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
          query:
            enabled: true
            name: query-auth
          cookie:
            enabled: true
            name: cookie-auth
```

##### Extract Credentials from the Request Payload

In some cases, for example when dealing with SOAP, user credentials can be passed within the request body rather in the standard Basic Authentication format. You can configure Tyk to handle this situation by extracting the username and password from the body using regular expression matching (regexps).

You must instruct Tyk to check the request body by adding the `extractCredentialsFromBody` field to the basic auth entry in `server.authentication.securitySchemes`, for example:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
        extractCredentialsFromBody:
          enabled: true
          userRegexp: '<User>(.*)</User>'
          passwordRegexp: '<Password>(.*)</Password>'          
```

Note that each regexp should contain only one match group, which must point to the actual values of the user credentials.

##### Caching User Credentials

The default behaviour of Tyk's Basic Authentication middleware is to cache user credentials, improving the performance of the authentication step when a client makes frequent requests on behalf of the same user.

When a request is received, it presents credentials which are checked against the users registered in Tyk. When a match occurs and the request is authorized, the matching credentials are stored in a cache with a configurable refresh period. When future requests are received, Tyk will check the presented credentials against those in the cache first, before checking the full list of registered users.

The cache will refresh after `cacheTTL` seconds (Tyk Classic: `basic_auth.cache_ttl`).

If you do not want to cache user credentials, you can turn this off using `disableCaching` in the basic auth entry in `server.authentication.securitySchemes` (Tyk Classic: `basic_auth.disable_caching`).

##### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select Basic Authentication using the `use_basic_auth` option. This will default to expect the user credentials in the `Authorization` header.


#### Using Tyk Dashboard to Configure Basic Authentication

Using the Tyk Dashboard, you can configure the Basic Authentication method from the Server section in the API Designer by enabling **Authentication** and selecting **Basic Authentication** from the drop-down:

{{< img src="/img/api-management/security/basic-auth-api-setup.png" alt="Target Details: Basic Auth" >}}

- select the location(s) where Tyk should look for the token
- provide the key name for each location (we prefill the default `Authorization` for the *header* location, but you can replace this if required)
- optionally select [strip authorization data]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) to remove the auth token locations from the request prior to proxying to the upstream
- optionally configure the [basic authentication cache]({{< ref "api-management/client-authentication#caching-user-credentials" >}})
- optionally configure [extraction of credentials from the request body]({{< ref "api-management/client-authentication#extract-credentials-from-the-request-payload" >}})

#### Registering Basic Authentication User Credentials with Tyk

When using Basic Authentication, the API key used to access the API is not generated by the Tyk system, instead you need to create and register the credentials of your users with Tyk. Tyk will compare the credentials provided in the request against the list of users you have created.

The way that this is implemented is through the creation of a key that grants access to the API (as you would for an API protected by [auth token]({{< ref "api-management/client-authentication#use-auth-tokens" >}})), however for this key you will provide a username and password.

When calling the API, users would never use the key itself as a token, instead their client must provide the Basic Auth credentials formed from the registered username and password, as [described previously]({{< ref "api-management/client-authentication#how-does-basic-authentication-work" >}}).


##### Using Tyk Dashboard UI

You can use the Tyk Dashboard to register a user's Basic Authentication credentials that can then be used to access your API.

Navigate to the **Keys** screen and select **Add Key**.

Follow the instructions in the [access key guide]({{< ref "api-management/gateway-config-managing-classic#access-an-api" >}}) and you'll notice that, when you select the Basic Auth protected API, a new **Authentication** tab appears:

Note that the **Authentication** tab will also be displayed if you create a key from a policy that grants access to a Basic Auth protected API.

Complete the user's credentials on this tab and create the key as normal. The key that is created in Tyk Dashboard is not in itself an access token (that is, it cannot be used directly to gain access to the API) but is used by Tyk to validate the credentials provided in the request and to determine the appropriate authorization, including expiry of authorization.

##### Using the Tyk Dashboard API

You can register user credentials using the `POST /api/apis/keys/basic/{username}` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}). The request payload is a [Tyk Session Object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key).

- the user's *username* is provided as a path parameter
- the user's *password* is provided as `basic_auth_data.password` within the request payload

You use the `POST` method to create a new user and `PUT` to update an existing entry.

{{< note success >}}
**Note**  

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}

##### Using the Tyk Gateway API

You can register user credentials using the `POST /tyk/keys/{username}` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}). The request payload is a [Tyk Session Object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key).

- the user's *username* is provided as a path parameter
- the user's *password* is provided as `basic_auth_data.password` within the request payload

You use the `POST` method to create a new user and `PUT` to update an existing entry.

{{< note success >}}
**Note**  

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}


### Use Auth Tokens

> Any party in possession of an auth (or bearer) token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key). To prevent misuse, auth tokens need to be protected from disclosure in storage and in transport.

Tyk provides auth (bearer) token access as one of the most convenient building blocks for managing security to your API. Tokens are added to a request as a header or as a query parameter. If added as a header, they may be preceded by the word "Bearer" to indicate their type, though this is optional. Usually these tokens are provided in the `Authorization` header, however Tyk can be configured to accept the token in a different header, as a query parameter or in a cookie.

#### Configuring your API to use Auth Token

The OpenAPI Specification indicates the use of [Auth Token](https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/) in the `components.securitySchemes` object using `type: apiKey`. It also includes specification of the location (`in`) and key (`name`) that are to be used when providing the token to the API, for example:

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: apiKey
      in: header
      name: Authorization
      
security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, all that is left to be configured in the Tyk Vendor Extension is to enable authentication and to select this security scheme.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the auth token]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field  (Tyk Classic: `strip_auth_data`).

#### Multiple Auth Token Locations

The OpenAPI Specification's `securitySchemes` mechanism allows only one location for the auth token, but in some scenarios an API might need to support multiple potential locations to support different clients.

The Tyk Vendor Extension supports this by allowing configuration of alternative locations in the auth token entry in `server.authentication.securitySchemes`. Building on the previous example, we can add optional query and cookie locations as follows:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          query:
            enabled: true
            name: query-auth
          cookie:
            enabled: true
            name: cookie-auth
```

#### Dynamic mTLS with Auth Token
The Auth Token method can support [Dynamic mTLS]({{< ref "api-management/client-authentication#dynamic-mtls" >}}) where the client can provide a TLS certificate in lieu of a standard Auth Token. This can be configured for an API using the [enableClientCertificate]({{< ref "api-management/gateway-config-tyk-oas#token" >}})  option (Tyk Classic: `auth.use_certificate`).

#### Auth Token with Signature

If you are migrating from platforms like Mashery, which use request signing, you can enable signature validation alongside auth token by configuring the additional [signatureValidation]({{< ref "api-management/gateway-config-tyk-oas#token" >}}) field (Tyk Classic: `auth.signature`).

You can configure:

- the location of the signature
- the algorithm used to create the signature (`MasherySHA256` or `MasheryMD5`)
- secret used during signature
- an allowable clock skew

#### Using Custom Auth Tokens

If you have your own identity provider you may want to use that to generate and manage the access tokens, rather than having Tyk generate the tokens. You can use the `POST /tyk/keys/{keyID}` endpoint in the [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) to import those tokens to Tyk, off-loading access control, quotas and rate limiting from your own application.

#### Using Tyk Dashboard to Configure Auth Token

Using the Tyk Dashboard, you can configure the Auth Token authentication method from the Server section in the API Designer by enabling **Authentication** and selecting **Auth Token** from the drop-down:

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Configuring the Auth Token method" >}}

- select the location(s) where Tyk should look for the token
- provide the key name for each location (we prefill the default `Authorization` for the *header* location, but you can replace this if required)
- select **Strip authorization data** to remove the auth token locations from the request prior to proxying to the upstream, as described [here]({{< ref "api-management/client-authentication#managing-authorization-data" >}})
- optionally select **Enable client certificate** to enable [Dynamic mTLS]({{< ref "api-management/client-authentication#dynamic-mtls" >}}) for the API, so the client can provide a certificate in place of the token

Note that the [auth token + signature]({{< ref "api-management/client-authentication#auth-token-with-signature" >}}) option is not available in the Tyk Dashboard API Designer.


#### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), a new Tyk Classic API will use the auth (bearer) token method by default with the token expected in the `Authorization` header, so configuration is slightly different as there is no need to `enable` this method. You should configure the `auth` object for any non-default settings, such as a different token location or Dynamic mTLS.



### Use Mutual TLS

Mutual TLS (mTLS) is a robust security feature that ensures both the client and server authenticate each other using TLS certificates. This two-way authentication process provides enhanced security for API communications by cryptographically verifying the identity of both parties involved in the connection.

In most cases when you try to access a secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and the data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates. See the video below that gives you an introduction to mutual TLS and how it can be used to secure your APIs.

{{< youtube-seo id="UzEzjon3IAo" title="Mutual TLS Intro">}}

#### Why Use Mutual TLS?

Mutual TLS is particularly valuable in environments where security is paramount, such as microservices architectures, financial services, healthcare, and any scenario requiring zero-trust security. It not only encrypts the data in transit but also ensures that the communicating parties are who they claim to be, mitigating the risks of unauthorized access and data breaches.

* **Enhanced Security:** Provides two-way authentication, ensuring both the client and server are verified and trusted.
* **Data Integrity:** Protects the data exchanged between client and server by encrypting it, preventing tampering or interception.
* **Compliance:** Helps meet stringent security and compliance requirements, especially in regulated industries.

#### Client mTLS for Tyk Cloud

Tyk Cloud users cannot currently use mTLS to secure the client to Gateway communication for Tyk-hosted gateways.


Tyk Hybrid users can, however, use mTLS with their self-hosted gateways.


#### How Does Mutual TLS Work?

Mutual TLS operates by requiring both the client and server to present and verify TLS certificates during the handshake process. Here’s how it works:

**Client Authentication:**

1. When a client attempts to connect to the server, the server requests the client’s TLS certificate.
2. The client provides its certificate, which the server verifies against a trusted Certificate Authority (CA).

**Server Authentication:**

1. Simultaneously, the server provides its own certificate to the client, which the client verifies against a trusted CA.

This mutual verification ensures that both parties are legitimate, securing the connection from both ends.

##### Client authorization with mTLS
At the TLS level, authorization means only allowing access for clients who provide client certificates that are verified and trusted by the server. 

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

##### Dynamic vs Static mTLS

There are two ways to set up client mTLS in Tyk: static and dynamic. Each method is suited to different use cases, as outlined below:

| Use Case                                                           | Static | Dynamic |
| ------------------------------------------------------------------ | :----: | :-----: |
| Let developers upload their own public certificates through the Developer Portal |   ❌    |   ✅      |
| Combine client mTLS with another authentication method           |   ✅    |   ✅      |
| Allow certs at the API level (one or more APIs per cert)           |   ✅    |   ❌      |
| Allow certs at an individual level (one or more APIs per cert)     |   ❌    |   ✅      |

#### Dynamic mTLS

Dynamic Client mTLS in Tyk allows you to authenticate users based solely on the provided client certificate, without the need for an additional authentication key. Tyk can identify the user, apply policies, and monitor usage just as with regular API keys.

To set up Dynamic Client mTLS, we need to follow these steps:
* Protect the API: Configure the API in the API Designer by setting the authentication type to Auth Token and enabling Client Certificate.

* Generate a Self-Signed Certificate: Use OpenSSL to generate a self-signed certificate and key if you don't have one.

* Add a Key in the Dashboard: In the Tyk Dashboard, create a key for the API and upload only the public certificate.

* Make an API Request: Use curl with your certificate and key to make an API request to the protected API, ensuring the request returns a 200 response.

* Allow Developers to Upload Certificates: Create a policy and catalog entry for the API, allowing developers to request keys and upload their public certificates through the Developer Portal. Developers can then make API requests using their cert and private key.


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

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="portal_cert_request" >}}

Add your public cert (cert.pem from above) into here and hit "Request Key".  

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


#### FAQ

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

Tyk OAS APIs are inherently "open" unless authentication is configured, however the older Tyk Classic API applies [auth token](#use-auth-tokens) protection by default.

You can disable authentication for a Tyk Classic API by setting the `use_keyless` flag in the API definition.


### Integrate with External Authorization Server (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered two types of OAuth authentication flow; [Tyk as the authorization server](#use-tyk-as-an-oauth-20-authorization-server) and Tyk connecting to an external *auth server* via a dedicated *External OAuth* option. The dedicated external *auth server* option was deprecated in Tyk 5.7.0.
<br>

For third-party OAuth integration we recommend using the JSON Web Token (JWT) middleware which is described [above]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
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
- `issuedAtValidationSkew` , `notBeforeValidationSkew`, `expiresAtValidationSkew` can be used to [configure clock skew]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#adjust-jwt-clock-skew-configuration" >}}) for json web token validation.
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

For integration with a third-party OIDC provider we recommend using the JSON Web Token (JWT) middleware which is described [above]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
<br>

The remainder of this section is left for reference and is not maintained.
{{< /note >}}


[OpenID Connect](https://openid.net/developers/how-connect-works) (OIDC) builds on top of OAuth 2.0, adding authentication. You can secure your APIs on Tyk by integrating with any standards compliant OIDC provider using [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) (JWTs).
JWTs offer a simple way to use the third-party Identity Provider (IdP) without needing any direct integration between the Tyk and 3rd-party systems.

To integrate a 3rd party OAuth2/OIDC IdP with Tyk, all you will need to do is ensure that your IdP can issue OAuth2 JWT access tokens as opposed to opaque tokens.

The client application authenticates with the IdP which then provides an access token that is accepted by Tyk. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.





## Combine Authentication Methods

Tyk allows you to chain multiple authentication methods together so that each authentication must be successful for access to be granted to the API. For example, you can use an Access Token in combination with Basic Auth or with a JSON Web Token.

### Base Identity Provider

When you configure Tyk to use multiple authentication methods, you must declare one to be the **base identity provider**. The [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key/token) provided in that authentication step will be used by Tyk as the common "request context" and hence the source of truth for authorization (access control, rate limits and quotas).

You declare the base identity provider using the [server.authentication.baseIdentityProvider]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) field in the Tyk Vendor Extension (Tyk Classic: `base_identity_provided_by`).


### Enable Multi (Chained) Authentication win the API Designer

You can configure chained authentication using the Dashboard UI by following these steps:

1.  Enable **Authentication** in the **Servers** section

2.  Select the **Multiple Authentication Mechanisms** option from the drop-down list.

    {{< img src="/img/api-management/security/multiple-auth-choose-auth.png" alt="Select Multiple Auth" >}}

3.  Select the **Authentication methods** you want to implement and identify the **Base identity provider**

    {{< img src="/img/api-management/security/multiple-auth-methods.png" alt="Select Auth Methods" >}}

4.  You can now configure each of the individual authentication methods in the usual manner using the options in the API designer.

<!-- 18/3/25 removing this video as it's very old (Dashboard 1.9) and perhaps not as helpful as it could be
{{< youtube-seo id="vYGYYXcJ6Wc" title="Protect an API with Multiple Authentication Types">}}
-->


### Configuring multiple auth methods in the API definition

The OpenAPI description can define multiple `securitySchemes` and then lists those to be used to protect the API in the `security` section. The OpenAPI Specification allows multiple entries in the `security` section of the API description, each of which can contain one or multiple schemes.

Tyk only takes into consideration the first object in the `security` list. If this contains multiple schemes, then Tyk will implement these sequentially.

In the following example, the OpenAPI description includes multiple security schemes and then defines three objects in the `security` list:

```yaml
{
  ...
  securitySchemes: {
    "auth-A": {...},
    "auth-B": {...},
    "auth-C": {...},
    "auth-D": {...},
  },
  security: [
    {
      "auth-A": [],
      "auth-C": []
    },
    {
      "auth-B": []
    },
    {
      "auth-D": []
    }
  ]
}
```

Tyk will consider only the first entry in the `security` list and so will implement the `auth-A` and `auth-B` schemes.

In the Tyk Vendor Extension this would result in the following configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true,
      baseIdentityProvider: "auth-A"
      securitySchemes:
        auth-A:
          enabled: true
        auth-C:
          enabled: true
      ...
```
Note the presence of the `baseIdentityProvider` field which is required.

### Using Tyk Classic APIs

To enable this mode, set the `base_identity_provided_by` field in your API Definitions to one of the supported chained enums below:

*   `AuthToken`
*   `HMACKey`
*   `BasicAuthUser`
*   `JWTClaim`
*   `OIDCUser`
*   `OAuthKey`
*   `UnsetAuth`

The provider set here will then be the one that provides the session object that determines rate limits, ACL rules, and quotas.

You must also configure the authentication methods to be used in the usual manner, as described in the relevant documentation. To ensure that auth token is implemented as part of the chained authentication, you must set `use_standard_auth` to `true`.


## Set Physical Key Expiry and Deletion
Tyk makes a clear distinction between an API authorization key expiring and being deleted from the Redis storage.

- When a key expires, it remains in the Redis storage but is no longer valid. Consequently, it is no longer authorized to access any APIs. If a key in Redis has expired and is passed in an API request, Tyk will return `HTTP 401 Key has expired, please renew`.
 - When a key is deleted from Redis, Tyk no longer knows about it, so if it is passed in an API request, Tyk will return `HTTP 400 Access to this API has been disallowed`.

Tyk provides separate control for the expiration and deletion of keys.

Note that where we talk about keys here, we are referring to [Session Objects]({{< ref "api-management/policies#what-is-a-session-object" >}}), also sometimes referred to as Session Tokens

### Key expiry

Tyk's API keys ([token session objects]({{< ref "api-management/policies#session-object" >}})) have an `expires` field. This is a UNIX timestamp and, when this date/time is reached, the key will automatically expire; any subsequent API request made using the key will be rejected.

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

This feature works nicely with [JWT]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) or [OIDC](#integrate-with-openid-connect-deprecated) authentication methods, as the keys are created in Redis the first time they are in use so you know when they will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a long `session_lifetime`, otherwise the user might try to use the key **after** it has already been removed from Redis.

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