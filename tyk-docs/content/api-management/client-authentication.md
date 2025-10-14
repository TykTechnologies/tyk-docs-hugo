---
title: Client Authentication and Authorization
description: Learn how to apply the most appropriate authentication method to secure access your APIs with Tyk. Here you will find everything there is to know about authenticating and authorizing API clients with Tyk.
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
aliases:
  - /advanced-configuration/integrate/api-auth-mode/oidc-auth0-example
  - /advanced-configuration/integrate/api-auth-mode/open-id-connect
  - /basic-config-and-security/security/authentication--authorization
  - /basic-config-and-security/security/authentication-authorization/
  - /basic-config-and-security/security/authentication-authorization/openid-connect
  - /basic-config-and-security/security/authentication-&-authorization
  - /security/your-apis
  - /security/your-apis/openid-connect
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

You must enable client authentication using the `server.authentication.enabled` flag and then configure the appropriate authentication method as indicated in the relevant section of this document. When creating a Tyk OAS API from an OpenAPI description, Tyk can automatically enable authentication based upon the content of the OpenAPI description as described [here]({{< ref "api-management/gateway-config-managing-oas#importing-an-openapi-description-to-create-an-api" >}}).

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
{{< badge title="OAuth 2.0" href="api-management/authentication/oauth-2" >}}
Delegate authentication using one of the most widely used open standard protocols
{{< /badge >}}

{{< badge title="JWT" href="basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}
Securely transmit information between parties.
{{< /badge >}}

{{< badge title="Basic Auth" href="api-management/authentication/basic-authentication" >}}
Secure APIs with username and password credentials.
{{< /badge >}}

{{< badge title="Auth Tokens" href="api-management/authentication/bearer-token" >}}
Implement token-based authentication for API access.
{{< /badge >}}

{{< badge title="mTLS" href="basic-config-and-security/security/mutual-tls/client-mtls#why-use-mutual-tls" >}}
Establish secure channels with two-way certificate verification.
{{< /badge >}}

{{< badge title="HMAC" href="basic-config-and-security/security/authentication-authorization/hmac-signatures" >}}
Verify message integrity using shared secret keys.
{{< /badge >}}

<!-- To be added
{{< badge title="RSA" href="api-management/client-authentication/#sign-requests-with-rsa" >}}
Verify message integrity using shared secret certificates.
{{< /badge >}}
-->

{{< badge title="Custom Authentication" href="api-management/authentication/custom-auth" >}}
Create custom plugins to implement specific authentication requirements.
{{< /badge >}}

{{< badge title="Open Access" href="basic-config-and-security/security/authentication-authorization/open-keyless" >}}
Allow unrestricted access for public APIs.
{{< /badge >}}

{{< /grid >}}

---

## Other Authentication Methods

### Integrate with External Authorization Server (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered two types of OAuth authentication flow; [Tyk as the authorization server]() and Tyk connecting to an external *auth server* via a dedicated *External OAuth* option. The dedicated external *auth server* option was deprecated in Tyk 5.7.0.
<br>

For third-party OAuth integration we recommend using the JSON Web Token (JWT) middleware which is described [here]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
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
- `issuedAtValidationSkew` , `notBeforeValidationSkew`, `expiresAtValidationSkew` can be used to [configure clock skew]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#jwt-validity-and-clock-skew" >}}) for json web token validation.
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



## Conclusion

Securing your APIs is a foundational step toward managing data integrity and access control effectively. Now that you've configured authentication and authorization, the next steps in your API journey with Tyk should involve:

Defining Access Policies: Use Tyk’s policies to refine API access controls, rate limits, and quotas. This lets you align your security model with business needs and enhance user experience through granular permissions. You can learn more about policies [here](/api-management/policies/).

Exploring API Analytics: Leverage Tyk’s analytics to monitor access patterns, track usage, and gain insights into potential security risks or high-demand endpoints. Understanding usage data can help in optimizing API performance and enhancing security measures. You can learn more about analytics [here](/tyk-dashboard-analytics/).