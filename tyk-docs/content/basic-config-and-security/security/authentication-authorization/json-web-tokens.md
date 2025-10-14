---
title: JSON Web Token (JWT) Authentication
date: 2025-01-10
description: How to use JWT Authentication with Tyk
tags: ["Authentication", "JWT", "JSON Web Tokens"]
keywords: ["Authentication", "JWT", "JSON Web Tokens"]
aliases:
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-auth0
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-keycloak
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/split-token
  - /advanced-configuration/integrate/api-auth-mode/json-web-tokens
  - /security/your-apis/json-web-tokens
  - /tyk-apis/tyk-gateway-api/api-definition-objects/jwt/docs/basic-config-and-security/security/authentication-authorization/json-web-tokens
---

## Introduction

JSON Web Token (JWT) is an open standard ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) that defines a compact and self-contained way for securely transmitting claims between parties as a JSON object. The information in the JSON object is digitally signed using either a secret (with the HMAC algorithm) or a public/private key pair (using RSA or ECDSA encryption) allowing the JWT to be used for client authentication.

### JWT Workflow

JWTs are commonly used in OAuth 2.0 and OpenID Connect flows to authenticate users and authorize access to APIs. The following diagram illustrates the typical flow of JWT authentication with Tyk Gateway:

```mermaid
sequenceDiagram
    participant User
    participant IdP as Identity Provider (IdP)
    participant Client as Client Application
    participant Tyk as Tyk Gateway

    User->>IdP: Authorizes Client
    IdP-->>Client: Issues JWT (with claims)
    Client->>Tyk: Sends API request with JWT
    Tyk->>IdP: (Optional) Fetch JWKS for validation
    Tyk-->>Tyk: Validates JWT Signature
    Tyk-->>Tyk: Extracts Claims
    Tyk-->>Tyk: Applies Security Policies based on Claims
    Tyk-->>Client: Forwards request or responds
```

1. **Token Issuance by Identity Provider (IdP):**
   The Identity Provider (IdP) issues a JWT with the appropriate claims. These claims represent the permissions granted by the user to the client application.

2. **Client as Token Bearer:**
   The Client Application acts as the *bearer* of the JWT (access token). Although the client may have access to multiple APIs, the user's delegated scopes restrict actual access. For example, a client with access to 5 APIs might only get a token allowing access to 2, depending on the user's delegation.

3. **JWT Presented to Tyk Gateway:**
   The client includes the JWT in its API requests to the Tyk Gateway as an access token.

4. **JWT Validation via JWK/JWKS:**
   Tyk validates the JWT's signature using a JSON Web Key (JWK). This key can be statically configured or dynamically fetched from the IdP via a JSON Web Key Set (JWKS) endpoint, supporting key rotation and multiple keys.

5. **Authorization via Claims and Policies:**
   Claims within the JWT can be used by Tyk Gateway's authorization process to configure rate and quota limits via Tyk's [Security Policy]({{< ref "api-management/policies" >}}) system. Within the API definition, JWT claims can be "mapped" onto security policies which will then be applied to the request.

6. **Stateless Authentication:**
   A key advantage of JWT authentication is that Tyk does not store any user credentials or session data. It never sees the user directly - it trusts the authorization server to have authenticated the user and issued a valid token.

### Key Benefits

This documentation is focused on how to use Tyk's JWT Auth and there are many excellent sources online where you can learn more about JWTs so we won't deep-dive into that topic, but to whet your appetite, here are some of the benefits from using JWT with Tyk:

- **Stateless Authentication**: Eliminates the need for server-side session storage, improving scalability.
- **Flexible Integration**: Works with multiple identity providers including Auth0, Okta, and custom JWT issuers.
- **Enhanced Security**: Supports multiple signature validation methods (RSA, ECDSA, HMAC) and claim verification.
- **Granular Access Control**: Leverage JWT claims for policy enforcement and scope-based permissions.
- **Performance Optimized**: Efficient token validation with minimal overhead and support for JWKS caching.

## Quick Start: Securing APIs with Auth0 or Keycloak

In this tutorial, we'll secure a Tyk OAS API using JWT authentication with either Auth0 or Keycloak as the identity provider.

{{< note success >}}
**Note** 

If you want to try out JWT Auth without linking up to a third-party IdP then you can skip step 1 and provide the base64 encoded public key for your JWT (in the `source` field rather than configuring `jwksURIs`) in step 3. You'll need to generate a JWT for the request, but otherwise everything stays the same. 

Now back to the tutorial...
{{< /note >}}

We'll start by configuring the identity provider, then set up JWT validation in Tyk, create a security policy, configure the API to use the policy, and finally test the secured API with a valid token.

### Prerequisites

- A Tyk installation (Cloud or Self-Managed) with Tyk Dashboard license
- An Auth0 account or Keycloak installation
- An existing Tyk OAS API (see [this tutorial]({{< ref "api-management/gateway-config-managing-oas#using-tyk-dashboard-api-designer-to-create-an-api" >}}))
- Postman, cURL, or another API testing tool

### Step-by-Step Guide

1. **Configure Your Identity Provider to obtain your JWKS URI**

    The first step is to configure your Identity Provider (IdP) to issue JWTs and provide a JWKS URI that Tyk can use to validate the tokens. Below are instructions for both Auth0 and Keycloak.

    {{< tabs_start >}}
    {{< tab_start "Auth0 Setup" >}}

    1. Log in to your Auth0 dashboard
    2. Navigate to Applications > APIs and click Create API
    3. Enter a name and identifier (audience) for your API
    4. Note your Auth0 domain (e.g. `your-tenant.auth0.com`)
    5. Your JWKS URI will be: `https://your-tenant.auth0.com/.well-known/jwks.json`

    {{< tab_end >}}

    {{< tab_start "Keycloak Setup" >}}

    1. Log in to your Keycloak admin console
    2. Create or select a realm (e.g. `tyk-demo`)
    3. Navigate to Clients and create a new client with:
          - Client ID: `tyk-api-client`
          - Client Protocol: `openid-connect`
          - Access Type: `confidential`
    4. After saving, go to the Installation tab and select "OIDC JSON" format
    5. Your JWKS URI will be: `http://your-keycloak-host/realms/tyk-demo/protocol/openid-connect/certs`

    {{< tab_end >}}

    {{< tabs_end >}}

2. **Create a Security Policy**

    1. In the Tyk Dashboard, navigate to **Policies**
    2. Click **Add Policy**
    3. Configure the policy:
          - Name: `JWT Auth Policy`
          - APIs: Select your Tyk OAS API
          - Access Rights: Configure appropriate paths and methods
          - Authentication: Select JWT
          - JWT Scope Claim Name: Enter the JWT claim that contains scopes (e.g. `scope` or `permissions`)
          - Required Scopes: Add any required scopes for access (optional)
    4. Click Create to save your policy

3. **Configure JWT Authentication in Tyk OAS API**

    1. Navigate to APIs and select your API
    2. Click **Edit**
    3. Enable **Authentication** in the **Server** section, select **JSON Web Token (JWT)** as the authentication method
    4. Configure the JWT settings:
          - Token Signing Method: Select `RSA Public Key`
          - Subject identity claim: Set to `sub`
          - JWKS Endpoint: Enter your JWKS URI for your IdP obtained in step 1
          - Policy claim: Set to `pol`
          - Default policy: Select `JWT Auth Policy` (the policy you created previously)
          - Clock Skew (optional): Set to accommodate time differences (e.g. `10`)
          - Authentication Token Location: `header`
          - Header Name: `Authorization`
          - Strip Authorization Data: `Enabled`
    5. Click **Save API**

4. **Test your API**

    1. Obtain a JWT from your IdP
    2. Make a request to your API providing the JWT as a Bearer token in the `Authorization` header; Tyk will validate the JWT using the JWKS that it retrieves from your JWKS URI
    3. Observe that the request is successful

    ```bash
        curl -X GET {API URL}  -H "Accept: application/json" -H "Authorization: Bearer {token}"
    ```

## How JWT Authentication works with Tyk

This diagram outlines the flow when using JWT Auth to secure access to your API.

{{< img src="/img/diagrams/diagram_docs_JSON-web-tokens@2x.png" alt="JSON Web Tokens Flow" >}}

1. Alice (the *user* or *resource owner*) authenticates with the Identity Provider (IdP) and consents to delegate specific permissions to a client application (steps 1 and 2).

2. The client application receives an authorization code, which it then exchanges for an access token (step 3). This is a bearer token, meaning that the client can present it to access protected resources on behalf of the user (resource owner / Alice).

3. When the client sends a request to the API gateway , it includes the access token (JWT) in the request - usually in the Authorization header as a Bearer token (step 4).

4. Tyk validates the token's signature, using the public key(s) of the trusted issuer (IdP):
    - locate the JWT in the request (header, cookie or query parameter)
    - decode the JWT
    - extract the `kid` (Key ID) from the token header
    - fetch the public keys from all configured JWKS URIs (or use locally declared static public key)
    - merge all the retrieved public keys into a single list
    - search this list for a public key matching the extracted `kid`
        - if no match is found, the validation fails, and the request is rejected
    - if a matching key is found, the JWT signature is validated using the parameters in the JWK
        - if signature validation fails, the request is rejected
    - if the token is valid and not expired, the request is authenticated as coming from the client, and is accepted

5. Next, Tyk will create an internal session for the request which will be used to control access rights, rate limits, usage quotas and in tracking logs (step 5). The session is linked to Alice using an identity that is [extracted from the JWT claims]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#identifying-the-originator" >}}).

6. In step 6 Tyk will proceed to enforce authorization by checking other claims to determine which Security Policies should be applied to the session:
    - check for the value in the policy claim within the JWT (identified by the value stored in `policyFieldName`)
    - use this to identify the Tyk Security Policy (or policies) to be applied to the request
        - if there is no direct policy mapping, then the `defaultPolicy` will be used
    - apply the identified policies to the session, configuring access rights, rate limits and usage quota 

### Session Updates

When a JWT's claims change (for example, configuring different scopes or policies), Tyk will update the session with the new policies on the next request made with the token.

### Missing Policies

If a policy Id is mapped to a session, but there is no policy with that Id, Tyk will fail safe and reject the request returning the `HTTP 403 Forbidden` response with `Key not authorized: no matching policy`. Tyk Gateway will also log the error: `Policy ID found is invalid!`.

## Configuring your API to use JWT authentication

The OpenAPI Specification treats JWT authentication as a variant of [bearer authentication](https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/) in the `components.securitySchemes` object using the `type: http`, `scheme: bearer` and `bearerFormat: jwt`:

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: http
      scheme: bearer
      bearerFormat: jwt

security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, in the Tyk Vendor Extension we need to enable authentication, to select this security scheme and to indicate where Tyk should look for the credentials. Usually the credentials will be provided in the `Authorization` header, but Tyk is configurable, via the Tyk Vendor Extension, to support custom header keys and credential passing via query parameter or cooke.

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

**Note:** that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the user credentials]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field (Tyk Classic: `strip_auth_data`).

With the JWT method selected, you'll need to configure Tyk to handle the specific configuration of JSON Web Tokens that clients will be providing. All of the JWT specific configuration is performed within the [authentication.jwt]({{< ref "api-management/gateway-config-tyk-oas#jwt" >}}) object in the Tyk Vendor Extension.

### Locating the JWT in the Request

The OpenAPI Specification provides a `securitySchemes` mechanism that lets you define where the JWT should be located, for example in the request header. However, in practice, different clients may supply the token in different locations, such as a query parameter.

While OAS does not support this natively, the Tyk Vendor Extension does this by allowing configuration of alternative locations in the JWT entry in `server.authentication.securitySchemes`. Building on the previous example, we can add optional query and cookie locations as follows:

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

### JWT Signatures

| Method    | Cryptographic Style | Secret Type   | Supported Locations for Secret | Supported Algorithms                                 |
| --------- | ------------------- | ------------- | ------------------------------ | ---------------------------------------------------- |
| **HMAC**  | Symmetric           | Shared secret | API definition                 | `HS256`, `HS384`, `HS512`                            |
| **RSA**   | Asymmetric          | Public key    | API definition, JWKS endpoint  | `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` |
| **ECDSA** | Asymmetric          | Public key    | API definition, JWKS endpoint  | `ES256`, `ES384`, `ES512`                            |

#### Secret Management

You must provide Tyk with the secret or key to be used to validate the incoming JWTs.

- For the asymmetric methods (RSA and ECDSA) the public key can be stored in the API definition or Tyk can retrieve from a public JSON Web Key Sets (JWKS) endpoint (supporting dynamic rotation of keys in the JWKS)
- For symmetric encryption (HMAC), the secret is shared between the client and Tyk and so is stored within the API definition not on the public JWKS server

##### Locally Stored Keys and Secrets

When storing the key or secret in the API definition, it is first base64 encoded and then configured in `server.authentication.securitySchemes.<jwtAuthScheme>.source` (in Tyk Classic, this is `jwt_source`). For improved separation of concerns and flexibility, the key/secret can be placed in an [external key value store]({{< ref "tyk-configuration-reference/kv-store" >}}), with the appropriate reference configured in the API definition.

For example, this fragment will configure the JWT authentication middleware to use the secret located at `consul://secrets/jwt-secret` to validate the signature of incoming JWTs. Note that the external KV store reference has been base64 encoded and then stored in `source`:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          source: Y29uc3VsOi8vc2VjcmV0cy9qd3Qtc2VjcmV0
```

##### Remotely Stored Keys (JWKS endpoint)

###### Single JWKS endpoint

Prior to Tyk 5.9.0 and when using Tyk Classic APIs, Tyk can only retrieve a single JSON Web Key Set, from a JWKS endpoint configured in `server.authentication.securitySchemes.<jwtAuthScheme>.source` (in Tyk Classic, this is `jwt_source`). This field accepts the base64 encoded full URI (including protocol) of the JWKS endpoint.

For example, the following Tyk OAS fragment will configure the JWT authentication middleware to retrieve the JWKS from `https://your-tenant.auth0.com/.well-known/jwks.json` when validating the signature of incoming JWTs. Note that the JWKS endpoint has been base64 encoded and then stored in `source`:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          source: aHR0cHM6Ly95b3VyLXRlbmFudC5hdXRoMC5jb20vLndlbGwta25vd24vandrcy5qc29u
```

###### Multiple JWKS endpoints

From **Tyk 5.9.0** onwards, Tyk OAS APIs can validate against multiple JWKS endpoints, allowing you to use different IdPs to issue JWTs for the same API. Multiple JWKS endpoints can be configured in the `<jwtAuthScheme>.jwksURIs` array. Note that these URIs are not base64 encoded in the API definition and so are human-readable. Tyk will retrieve the JSON Web Key Sets from each of these endpoints and these will be used to attempt validation of the received JWT.

For example, the following fragment will configure the JWT authentication middleware to retrieve the JWKS from both Auth0 and Keycloak when validating the signature of incoming JWTs:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          jwksURIs:
            - url: https://your-tenant.auth0.com/.well-known/jwks.json
            - url: http://your-keycloak-host/realms/tyk-demo/protocol/openid-connect/certs
```

*Multiple JWKS endpoints and the `jwksURIs` array are not supported by Tyk Classic APIs.*<br><br>

{{< note success >}}
**Note**  

If both `<jwtAuthScheme>.source` and `<jwtAuthScheme>.jwksURIs` are configured, the latter will take precedence.
{{< /note >}}

##### JWKS caching

Tyk caches the JSON Web Key Set (JWKS) retrieved from JWKS endpoints to reduce the performance impact of contacting external services during request handling. A separate cache is maintained for each JWKS endpoint for each API, with a default validity period of *240 seconds*, after which the cache will be refreshed when a new request is received.

From **Tyk 5.10.0** onwards, we have introduced enhanced JWKS caching for Tyk OAS APIs with the following improvements:

- **Configurable cache timeout** - Set custom validity periods per JWKS endpoint
- **Pre-fetch functionality** - Automatically retrieve and cache all JWKS when the API loads to the Gateway, ensuring the first request doesn't experience the latency of fetching keys from external endpoints
- **Cache management API** - New endpoints to manually invalidate JWKS caches

For example, the following fragment will configure the JWT authentication middleware to retrieve the JWKS from both Auth0 and Keycloak when validating the signature of incoming JWTs, assigning a 300 second validity period to the Auth0 JWKS and 180 second validity period for Keycloak:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          jwksURIs:
            - url: https://your-tenant.auth0.com/.well-known/jwks.json
              cacheTimeout: "300s"  # 5 minutes
            - url: http://your-keycloak-host/realms/tyk-demo/protocol/openid-connect/certs
              cacheTimeout: "3m"    # 3 minutes (alternative format)  
```
###### Configuration Options

| Field | Type | Description | Default | Supported Formats |
|-------|------|-------------|---------|-------------------|
| `url` | string | JWKS endpoint URL | Required | Full URI including protocol |
| `cacheTimeout` | string | Cache validity period | 240s | `"300s"`, `"5m"`, `"1h"`, etc. |


{{< note success >}}
**Note**  

Tyk Classic APIs continue to use the existing JWKS caching behavior with the 240-second default timeout. The enhanced caching features are available only for Tyk OAS APIs.
{{< /note >}}

###### JWKS Cache Management

New Gateway API endpoints are available from **Tyk 5.10.0** to manage JWKS caches programmatically. These endpoints work for both Tyk OAS and Tyk Classic APIs:

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/tyk/cache/jwks` | `DELETE` | Invalidate JWKS caches for all APIs |
| `/tyk/cache/jwks/{apiID}` | `DELETE` | Invalidate JWKS cache for a specific API |

**Note:** These endpoints are currently available only through the Tyk Gateway API and are not yet extended to the Tyk Dashboard API.

**Example usage:**
```bash
# Flush all JWKS caches
curl -X DELETE http://your-gateway:8080/tyk/cache/jwks \
  -H "x-tyk-authorization: your-secret"

# Flush JWKS cache for specific API
curl -X DELETE http://your-gateway:8080/tyk/cache/jwks/your-api-id \
  -H "x-tyk-authorization: your-secret"
```

###### Feature Compatibility Summary

| Feature | Tyk Classic | Tyk OAS | Available From |
|---------|-------------|---------|----------------|
| Single JWKS endpoint | ✅ | ✅ | All versions |
| Multiple JWKS endpoints | ❌ | ✅ | Tyk 5.9.0+ |
| Configurable cache timeout | ❌ | ✅ | Tyk 5.10.0+ |
| Pre-fetch functionality | ❌ | ✅ | Tyk 5.10.0+ |
| Cache management API | ✅ | ✅ | Tyk 5.10.0+ |

### JWT Validity and Clock Skew

JSON Web Tokens have a validity period described using three [Registered Claims](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1): `IssueAt`, `ExpireAt` and `NotBefore`.

If, on receipt of the JWT, Tyk determines that the token is not valid then it will reject the request with the "Token is not valid yet" error.

Due to the nature of distributed systems it is expected that, despite best efforts, you can end up in a situation with clock skew between the party issuing the JWT (your IdP) and the validating party (Tyk). This might occur due to the clock on the Tyk server being behind or ahead of the clock on the Identity Provider server even with all servers synchronised from the same NTP server.

You can optionally configure a maximum permissable difference between the timestamp in the token's validity claims and Tyk's clock, to allow for these scenarios. Each can be independently configured or omitted from the API configuration as required. The permissable skews are configured in seconds.

- **expiresAtValidationSkew** allows recently expired tokens to still be considered valid. This is useful when the token issuer's clock is slightly behind Tyk's clock.
- **issuedAtValidationSkew** allows tokens that claim to be issued slightly in the future to be valid. This helps when the token issuer's clock is slightly ahead of Tyk's clock.
- **notBeforeValidationSkew** allows tokens that claim to become valid slightly in the future to be valid now. This also helps when the token issuer's clock is ahead of Tyk's clock.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          issuedAtValidationSkew: 5
          notBeforeValidationSkew: 2
          expiresAtValidationSkew: 2
```

### Managing Authorization with JWT

The claims within the JSON Web Token are used to configure the Authorization for the request - i.e. which resources it can access and what limits should be applied to that access.

#### Identifying the Originator

Tyk creates an internal [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) for the request. The session is used to apply the appropriate security policies to ensure that rate limits, quotas, and access controls specific to the user are correctly applied. The session also enable tracking and analytics for the user's API usage.

In order that this session can be correctly associated with the authenticated user, Tyk must extract a unique identity from the token.

Tyk follows a specific priority order when extracting identity from a JWT. If an empty identity is found, Tyk will move to the next step:

1. The standard Key ID header (`kid`) in the JWT (unless `skipKid` is enabled)
2. The subject identity claim identified by the value stored in `identityBaseField` (which allows API administrators to designate any JWT claim as the identity source (e.g., user_id, email, etc.).
3. The [Registered claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2") `sub` (which is the JWT specification's recommended claim for subject identity)

When an identity has been determined, it is stored in the session object in three locations:
- in the `Alias` field
- it is used to generate a hashed session Id stored in the `keyID` field
- in the session metadata as `TykJWTSessionID`

Note that session objects can be cached to improve performance, so the identity extraction is only performed on the first request with a JWT, or when the cache is refreshed.

In this example, `skipKid` has been set to `true`, so Tyk checks the `identityBaseField` and determines that the value in the custom claim `user_id` within the JWT should be used as the identity for the session object.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          skipKid: true
          identityBaseField: user_id
```

#### Identifying the Tyk Policies to be applied

[Security Policies]({{< ref "api-management/policies" >}}) are applied (or mapped) to the session object to configure authorization for the request. Policies must be [registered]({{< ref "api-management/policies#how-you-can-create-policies" >}}) with Tyk, such that they have been allocated a unique *Tyk Policy Id*.

Tyk supports three different types of policy mapping, which are applied in this priority order:

1. Direct policy mapping
2. Scope policy mapping
3. Default policy mapping

Note that, whilst a *default policy* must be configured for each API using JWT Auth, this will only be applied if there are no policies mapped in step 1 or 2. If *scope policies* are activated, these will be applied on top of the previously applied direct policies as explained in more detail in the section on [combining policies]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#combining-policies" >}}).

##### Direct policies

You can optionally specify policies to be applied to the session via the *policy claim* in the JWT. This is a [Private Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.3) and can be anything you want, but typically we recommend the use of `pol`. You must instruct Tyk where to look for the policy claim by configuring the `policyFieldName` field in the API definition.

In this example, Tyk has been configured to check the `pol` claim in the JWT to find the *Policy Ids* for the policies to be applied to the session object:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          policyFieldName: pol
```

In the JWT, you should then provide the list of policy Ids as an array of values in that claim, for example you might declare:

```
  "pol": ["685a8af28c24bdac0dc21c28", "685bd90b8c24bd4b6d79443d"]
```

##### Default policies

You **must** configure one or more *default policies* that will be applied if no specific policies are identified in the JWT claims. These are configured using the `defaultPolicies` field in the API definition, which accepts a list of policy Ids.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          defaultPolicies:
            - 685a8af28c24bdac0dc21c28
            - 685bd90b8c24bd4b6d79443d
```

##### Scope policies

Directly mapping policies to APIs relies upon the sharing of Tyk Policy Ids with the IdP (so that they can be included in the JWT) and may not provide the flexibility required. Tyk supports a more advanced approach where policies are applied based upon *scopes* declared in the JWT. This keeps separation between the IdP and Tyk-specific concepts, and supports much more flexible configuration.

Within the JWT, you identify a Private Claim that will hold the authorization (or access) scopes for the API. You then provide, within that claim, a list of *scopes*. In your API definition, you configure the `scopes.claimName` to instruct Tyk where to look for the scopes and then you declare a mapping of scopes to policies within the `scopes.scopeToPolicyMapping` object.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          scopes:
            scopeToPolicyMapping:
              - scope: read:users
                policyId: 685bd90b8c24bd4b6d79443d
              - scope: write:users
                policyId: 685a8af28c24bdac0dc21c28
            claimName: accessScopes
```

In this example, Tyk will check the `accessScopes` claim within the incoming JWT and apply the appropriate policy if that claim contains the value `read:users` or `write:users`. If neither scope is declared in the claim, or the claim is missing, then the default policy will be applied.

Multiple scopes can be declared within a JWT by setting the value of the claim in any of four configurations:

- a string with space delimited list of values (by standard)<br>
    `"permissions": "read:users write:users"`
- an array of strings<br>
    `"permissions": ["read:users", "write:users"]`
- a string with space delimited list of values inside a nested key<br>
    `"permissions": { "access": "read:users write:users" }`
- an array of strings inside a nested key<br>
    `"permissions": { "access": ["read:users", "write:users"] }`

If there is a nested key then you must use dot notation in the value configured for `claimName` so, for the first two examples above, the `claimName` should be set to `permissions` whilst for the the two nested examples you would use `permissions.access`.

This example of a fragment of a JWT, if provided to an API with the configuration above, will cause Tyk to apply both policies to the session object:

```json
{
  "sub": "1234567890",
  "name": "Alice Smith",
  "accessScopes": ["read:users", "write:users"]
}
```

##### Combining policies

Where multiple policies are mapped to a session (for example, if several scopes are declared in the JWT claim, or if you set multiple *default policies*) Tyk will apply all the matching policies to the request, combining their access rights and using the most permissive rate limits and quotas. It's important when creating those policies to ensure that they do not conflict with each other.

Policies are combined as follows:

1. Apply direct mapped policies declared via `policyFieldName`
2. Apply scope mapped policies declared in `scopeToPolicyMapping` based upon scopes in the JWT
3. If no policies have been applied in steps 1 or 2, apply the default policies from `defaultPolicies`

When multiple policies are combined the following logic is applied:

- **access rights** A user gets access to an endpoint if ANY of the applied policies grant access
- **rate limits** Tyk uses the most permissive values (highest quota, lowest rate limit)
- **other settings** The most permissive settings from any policy are applied

##### Policy Best Practices

When creating multiple policies that might be applied to the same JWT, we recommend using [partitioned policies]({{< ref "api-management/policies#partitioned-policies" >}}) - policies that control specific aspects of API access rather than trying to configure everything in a single policy.

For example:

- Create one policy that grants read-only access to specific endpoints
- Create another policy that grants write access to different endpoints
- Create a third policy that sets specific rate limits

To ensure these policies work correctly when combined:

- Set `per_api` to `true` in each policy. This ensures that the policy's settings only apply to the specific APIs listed in that policy, not to all APIs globally.
- Avoid listing the same `API ID` in multiple policies with conflicting settings. Instead, create distinct policies with complementary settings that can be safely combined.


### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select JSON Web Token authentication using the `use_jwt` option. Tyk Classic APIs do not natively support multiple JWKS endpoints, though a [custom authentication plugin]({{< ref "api-management/plugins/plugin-types#authentication-plugins" >}}) could be used to implement this functionality.

## Split Token Flow

Split Token Flow addresses a fundamental security concern with JWT tokens: when a JWT is stored on a client device (browser, mobile app, etc.), all of its contents can be easily decoded since JWTs are only base64-encoded, not encrypted. This means sensitive information in the payload is potentially exposed.

The JWT consists of three parts:

{{< img src="/img/2.10/split_token2.png" alt="Split Token Example" >}}

In the above example you can see that they are:

- Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- Payload: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSJ9`
- Signature: `EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0`

The Split Token approach provides a solution by:

1. Separating the JWT into its three component parts: header, payload, and signature
2. Storing only the signature on the client side (which by itself is meaningless)
3. Keeping the header and payload securely on the server side (in Tyk)
4. Reconstructing the complete JWT when needed for authentication

This approach combines the benefits of JWTs (rich claims, stateless validation) with the security of opaque tokens (no information disclosure).

### When to Use Split Token Flow

Consider using Split Token Flow when:

- Your JWT payload contains sensitive information that shouldn't be exposed to clients
- You want to prevent token inspection by malicious actors
- You need the flexibility of JWT while maintaining higher security
- You're implementing systems that must meet strict security compliance requirements

### How Split Token Flow Works

Here's how the process works with Tyk Gateway:

1. Token Issuance:

    - A `/token` endpoint is configured on Tyk from which the client should request the access token
    - Tyk requests an access token from an authorization server (e.g., Keycloak) on behalf of the client
    - The authorization server returns a complete JWT
    - Tyk intercepts this response through a Virtual Endpoint
    - Tyk splits the JWT into its components and stores the header and payload in its Redis database
    - Only the signature portion is returned to the client as an "opaque" token

2. Token Usage:

    - The client makes API requests using only the signature as their access token
    - Tyk receives the request and looks up the stored header and payload using the signature
    - Tyk reconstructs the complete JWT and validates it
    - If valid, Tyk forwards the request to the upstream API with the full JWT

3. Security Benefits:

    - The client never possesses the complete JWT, only a meaningless signature
    - Token contents cannot be inspected by client-side code or malicious actors
    - Token validation still occurs using standard JWT verification


### Implementing Split Token Flow

1. **Create a Virtual Endpoint for Token Issuance**

    First, create a virtual endpoint in Tyk that will:

    - Receive authentication requests from clients
    - Forward these requests to your authorization server
    - Split the returned JWT
    - Store the header and payload in Tyk's storage
    - Return only the signature to the client
    - Here's a simplified implementation:

    ```javascript
    function splitTokenHandler(request, session, config) {
        // 1. Forward the client's credentials to the authorization server
        var authServerResponse = forwardToAuthServer(request);
        
        if (authServerResponse.Code !== 200) {
            return TykJsResponse({
                Body: authServerResponse.Body,
                Code: authServerResponse.Code
            }, session.meta_data);
        }
        
        // 2. Extract the JWT from the response
        var responseBody = JSON.parse(authServerResponse.Body);
        var fullJWT = responseBody.access_token;
        
        // 3. Split the JWT into its components
        var jwtParts = fullJWT.split(".");
        var header = jwtParts[0];
        var payload = jwtParts[1];
        var signature = jwtParts[2];
        
        // 4. Store the complete JWT in Tyk's Redis database using the signature as the key
        // This function would use Tyk's storage API to save the data
        storeJWTComponents(signature, header, payload, fullJWT);
        
        // 5. Modify the response to return only the signature
        responseBody.access_token = signature;
        
        return TykJsResponse({
            Body: JSON.stringify(responseBody),
            Code: 200
        }, session.meta_data);
    }
    ```

    Note that this example includes some level of abstraction for clarity and so is not a full implementation.

2. **Configure Custom Pre-Auth Plugin**

    Next, create a custom pre-auth plugin that reconstructs the JWT before it reaches the standard Tyk JWT Auth middleware:

    ```javascript
    function reconstructJWT(request, session, config) {
        // 1. Extract the signature from the Authorization header
        var authHeader = request.Headers["Authorization"];
        var signature = authHeader.replace("Bearer ", "");
        
        // 2. Retrieve the stored JWT components using the signature
        var storedJWT = retrieveJWTComponents(signature);
        
        if (!storedJWT) {
            return TykJsResponse({
                Body: "Invalid token",
                Code: 401
            }, session.meta_data);
        }
        
        // 3. Replace the Authorization header with the full JWT
        request.SetHeaders["Authorization"] = "Bearer " + storedJWT.fullJWT;
        
        return request;
    }
    ```

3. **Test the Implementation**

    To test your Split Token Flow:

    Request a token from your Tyk virtual endpoint:

    ```bash
    curl -X POST https://your-tyk-gateway/token \
      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
    ```

    You'll receive a response with only the signature as the access token, for example:

    ```json
    {
      "access_token": "EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0",
      "token_type": "bearer",
      "expires_in": 3600
    }
    ```

    Use this token to access your JWT Auth protected API where you have configured the custom pre-auth plugin and JWT Auth:

    ```bash
    curl https://your-tyk-gateway/protected-api \
      -H "Authorization: Bearer EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0"
    ```


