---
title: Bearer Tokens
description: How to configure bearer tokens in Tyk?
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "Bearer Tokens"]
aliases:
  - /basic-config-and-security/security/authentication-authorization/bearer-tokens
  - /security/your-apis/bearer-tokens
---

## What is a bearer token ?

> Any party in possession of an auth (or bearer) token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key). To prevent misuse, auth tokens need to be protected from disclosure in storage and in transport.

Tyk provides auth (bearer) token access as one of the most convenient building blocks for managing security to your API. Tokens are added to a request as a header or as a query parameter. If added as a header, they may be preceded by the word "Bearer" to indicate their type, though this is optional. Usually these tokens are provided in the `Authorization` header, however Tyk can be configured to accept the token in a different header, as a query parameter or in a cookie.

## Configuring your API to use Auth Token

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

## Multiple Auth Token Locations

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

## Dynamic mTLS with Auth Token
The Auth Token method can support [Dynamic mTLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#dynamic-mtls" >}}) where the client can provide a TLS certificate in lieu of a standard Auth Token. This can be configured for an API using the [enableClientCertificate]({{< ref "api-management/gateway-config-tyk-oas#token" >}})  option (Tyk Classic: `auth.use_certificate`).

## Auth Token with Signature

If you are migrating from platforms like Mashery, which use request signing, you can enable signature validation alongside auth token by configuring the additional [signatureValidation]({{< ref "api-management/gateway-config-tyk-oas#token" >}}) field (Tyk Classic: `auth.signature`).

You can configure:

- the location of the signature
- the algorithm used to create the signature (`MasherySHA256` or `MasheryMD5`)
- secret used during signature
- an allowable clock skew

## Using Custom Auth Tokens

If you have your own identity provider you may want to use that to generate and manage the access tokens, rather than having Tyk generate the tokens. You can use the `POST /tyk/keys/{keyID}` endpoint in the [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) to import those tokens to Tyk, off-loading access control, quotas and rate limiting from your own application.

## Using Tyk Dashboard to Configure Auth Token

Using the Tyk Dashboard, you can configure the Auth Token authentication method from the Server section in the API Designer by enabling **Authentication** and selecting **Auth Token** from the drop-down:

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Configuring the Auth Token method" >}}

- select the location(s) where Tyk should look for the token
- provide the key name for each location (we prefill the default `Authorization` for the *header* location, but you can replace this if required)
- select **Strip authorization data** to remove the auth token locations from the request prior to proxying to the upstream, as described [here]({{< ref "api-management/client-authentication#managing-authorization-data" >}})
- optionally select **Enable client certificate** to enable [Dynamic mTLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#dynamic-mtls" >}}) for the API, so the client can provide a certificate in place of the token

Note that the [auth token + signature]({{< ref "api-management/authentication/bearer-token#auth-token-with-signature" >}}) option is not available in the Tyk Dashboard API Designer.


## Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), a new Tyk Classic API will use the auth (bearer) token method by default with the token expected in the `Authorization` header, so configuration is slightly different as there is no need to `enable` this method. You should configure the `auth` object for any non-default settings, such as a different token location or Dynamic mTLS.



