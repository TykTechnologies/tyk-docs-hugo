---
title: JWT Signature Validation
description: How to validate JWT signatures in Tyk API Gateway.
tags: ["Authentication", "JWT", "JSON Web Tokens", "Signature", "Validation"]
keywords: ["Authentication", "JWT", "JSON Web Tokens", "Signature", "Validation"]
date: 2025-01-10
---

## Availability

| Component   | Editions                 |
| ----------- | ------------------------ |
| Tyk Gateway | Community and Enterprise |

## Introduction

A JSON Web Token consists of three parts separated by dots: `header.payload.signature`. The signature verifies that the sender of the JWT is who it claims to be and that the message wasn't altered along the way.

Tyk can validate the signature of incoming JWTs to ensure that they meet your security requirements before granting access to your APIs.

## JWT Signature Fundamentals

The JWT signature serves three main purposes:

1. **Integrity:**
   If anyone modifies the header or payload, the signature will no longer match.

2. **Authenticity:**
   Confirms that the token was issued by a trusted source.

3. **Security:**
   Prevents malicious users from forging tokens or altering claims.

### How JWT Signatures are Created

The JWT signature is created by taking the encoded header, the encoded payload, a secret, and the algorithm specified in the header.

**Example**:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

Or, for asymmetric algorithms like RSA or ECDSA:

```
RSASHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  private_key
)
```

### Verification Process

When Tyk receives a JWT, it performs the following steps to validate the signature:

1. It extracts the header and payload.
2. Recomputes the signature using its own secret/private key.
3. Compares it with the token’s signature.
   * If they match, the token is valid.
   * If not, the token is rejected.

## Supported Algorithms for Signature Validation

| Method    | Cryptographic Style | Secret Type   | Supported Locations for Secret | Supported Algorithms                                 |
| --------- | ------------------- | ------------- | ------------------------------ | ---------------------------------------------------- |
| **HMAC**  | Symmetric           | Shared secret | API definition                 | `HS256`, `HS384`, `HS512`                            |
| **RSA**   | Asymmetric          | Public key    | API definition, JWKS endpoint  | `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` |
| **ECDSA** | Asymmetric          | Public key    | API definition, JWKS endpoint  | `ES256`, `ES384`, `ES512`                            |

## Configuration Options

You can configure JWT signature validation using the Dashboard UI or the Tyk API definition. To configure it, you must provide Tyk with the secret or key to validate incoming JWTs.

Tyk supports three methods for referencing keys and secrets:

1. **Locally Stored Keys**: The key or secret is stored directly in the API definition.
2. **External Key Value Store**: The key or secret is stored in an external key value store (e.g., Consul, Vault) and referenced in the API definition.
3. **Remotely Stored Keys**: Tyk retrieves the key from a public JSON Web Key Set (JWKS) endpoint.

Depending on the cryptographic style used, the options vary:

| Cryptographic Style | Locally Stored Keys | External Key Value Store | Remotely Stored Keys (JWKS) |
| ------------------- | ------------------- | ------------------------ | --------------------------- |
| **Symmetric** | Yes                 | Yes                      | No                          |
| **Asymmetric** | Yes                 | Yes                      | Yes                         |

<API Definition vs UI Note>

### Locally Stored Keys and Secrets

When storing the key or secret in the API definition, it is first base64 encoded and then configured in `server.authentication.securitySchemes.<jwtAuthScheme>.source` (in Tyk Classic, this is [jwt_source]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}})).

For example, the Tyk OAS fragment below configures the secret `mysecret` to validate the signatures of incoming JWTs. **Note** that the secret has been base64 encoded and then stored in `source`:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          source: bXlzZWNyZXQ=
```

Refer to the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#jwt" >}}) reference for details.

### External Key Value Store

For improved separation of concerns and flexibility, the key/secret can be placed in an [external key value store]({{< ref "tyk-configuration-reference/kv-store" >}}), with the appropriate reference configured in the API definition.

For example, this fragment configures the JWT authentication middleware to use the secret at `consul://secrets/jwt-secret` to validate the signatures of incoming JWTs. Note that the external KV store reference has been base64 encoded and then stored in `source`:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          source: Y29uc3VsOi8vc2VjcmV0cy9qd3Qtc2VjcmV0
```

### Remotely Stored Keys (JWKS endpoint)

Tyk can retrieve public keys from JSON Web Key Sets (JWKS) endpoints to validate the signature of incoming JWTs. Tyk supports configuring [single]({{< ref "#single-jwks-endpoint" >}}) or [multiple]({{< ref "#multiple-jwks-endpoints" >}}) JWKS endpoints with [caching]({{< ref "#jwks-caching" >}}) capabilities.

#### Feature Compatibility Summary

| Feature                        | Tyk Classic APIs | Tyk OAS APIs | Available From |
| ------------------------------ | ---------------- | ------------ | -------------- |
| Single JWKS Endpoint Support   | ✅               | ✅          | All versions   |
| Multiple JWKS Endpoint Support | ❌               | ✅          | 5.9.0          |

#### Single JWKS endpoint

Before Tyk 5.9.0 and when using Tyk Classic APIs, Tyk can only retrieve a single JSON Web Key Set from a JWKS endpoint configured in `server.authentication.securitySchemes.<jwtAuthScheme>.source` (in Tyk Classic, this is [jwt_source]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}))). This field accepts the base64-encoded full URI (including the protocol) of the JWKS endpoint.

For example, the following Tyk OAS fragment configures the JWT authentication middleware to retrieve the JWKS from `https://your-tenant.auth0.com/.well-known/jwks.json` when validating the signatures of incoming JWTs. Note that the JWKS endpoint has been base64 encoded and then stored in `source`:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          source: aHR0cHM6Ly95b3VyLXRlbmFudC5hdXRoMC5jb20vLndlbGwta25vd24vandrcy5qc29u
```

#### Multiple JWKS endpoints

From **Tyk 5.9.0** onwards, Tyk OAS APIs can validate against multiple JWKS endpoints, allowing you to use different IdPs to issue JWTs for the same API.

Multiple JWKS endpoints can be configured in the `<jwtAuthScheme>.jwksURIs` array. Tyk will retrieve the JSON Web Key Sets from each of these endpoints, which will be used to attempt to validate the received JWT.

<br>

{{< note success >}}
**Note**  

- The `<jwtAuthScheme>.jwksURIs` URIs are not base64 encoded in the API definition and so are human-readable.
- If both `<jwtAuthScheme>.source` and `<jwtAuthScheme>.jwksURIs` are configured, the latter will take precedence.
- Multiple JWKS endpoints and the `jwksURIs` array are not supported by Tyk Classic APIs.

{{< /note >}}

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

## JWKS caching

Tyk caches the [JSON Web Key Set](https://datatracker.ietf.org/doc/html/rfc7517) (JWKS) retrieved from JWKS endpoints to reduce the performance impact of contacting external services during request handling. A separate cache is maintained for each JWKS endpoint and API, with a default validity period of *240 seconds*, after which the cache is refreshed when a new request is received.

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

### Feature Compatibility Summary

From **Tyk 5.10.0** onwards, we have introduced enhanced JWKS caching for [Tyk OAS APIs]({{< ref "api-management/gateway-config-tyk-oas" >}}) with the following improvements:

- **Configurable cache timeout** - Set custom validity periods per JWKS endpoint
- **Pre-fetch functionality** - Automatically retrieve and cache all JWKS when the API loads to the Gateway, ensuring the first request doesn't experience the latency of fetching keys from external endpoints
- **Cache management API** - New endpoints to manually invalidate JWKS caches

The table below summarizes the availability of JWKS caching features between Tyk Classic and Tyk OAS APIs:


| Feature                    | Tyk Classic | Tyk OAS | Available From |
| -------------------------- | ----------- | ------- | -------------- |
| Single JWKS endpoint       | ✅           | ✅       | All versions   |
| Multiple JWKS endpoints    | ❌           | ✅       | Tyk 5.9.0+     |
| Configurable cache timeout | ❌           | ✅       | Tyk 5.10.0+    |
| Pre-fetch functionality    | ❌           | ✅       | Tyk 5.10.0+    |
| Cache management API       | ✅           | ✅       | Tyk 5.10.0+    |

### Configuration Options

| Field          | Type   | Description           | Default  | Supported Formats              |
| -------------- | ------ | --------------------- | -------- | ------------------------------ |
| `url`          | string | JWKS endpoint URL     | Required | Full URI including protocol    |
| `cacheTimeout` | string | Cache validity period | 240s     | `"300s"`, `"5m"`, `"1h"`, etc. |

For more details, refer to the [Tyk OAS API definition reference]({{< ref "api-management/gateway-config-tyk-oas#jwk" >}}).

{{< note success >}}
**Note**  

Tyk Classic APIs continue to use the existing JWKS caching behavior with the 240-second default timeout. The enhanced caching features are available only for Tyk OAS APIs.
{{< /note >}}

### JWKS Cache Management

New [Gateway API]({{< ref "tyk-gateway-api" >}}) endpoints are available from **Tyk 5.10.0** to manage JWKS caches programmatically. These endpoints work for both Tyk OAS and Tyk Classic APIs:

| Endpoint                  | Method   | Description                              |
| ------------------------- | -------- | ---------------------------------------- |
| `/tyk/cache/jwks`         | `DELETE` | Invalidate JWKS caches for all APIs      |
| `/tyk/cache/jwks/{apiID}` | `DELETE` | Invalidate JWKS cache for a specific API |

**Note:** These endpoints are currently available only through the Tyk [Gateway API]({{< ref "tyk-gateway-api" >}}) and are not yet extended to the Tyk [Dashboard API]({{< ref "tyk-dashboard-api" >}}).

**Example usage:**
```bash
# Flush all JWKS caches
curl -X DELETE http://your-gateway:8080/tyk/cache/jwks \
  -H "x-tyk-authorization: your-secret"

# Flush JWKS cache for specific API
curl -X DELETE http://your-gateway:8080/tyk/cache/jwks/your-api-id \
  -H "x-tyk-authorization: your-secret"
```

## FAQ

<ul>
<li>
<details>
<summary>Can I use different signing methods for different APIs?</summary>

Yes, each API definition can have its own JWT configuration with different signing methods and keys.

</details>
</li>

<li>
<details>
<summary>How do I handle JWTs signed with different keys (e.g., from different issuers)?</summary>

You can use JWKS (JSON Web Key Sets) by configuring `JWTJwksURIs` with the URLs of your JWKS endpoints. Tyk will automatically fetch and use the appropriate key based on the kid (Key ID) in the token header.

</details>
</li>

<li>
<details>
<summary>What happens if the JWKS endpoint is temporarily unavailable?</summary>

Tyk caches JWKS responses. You can configure the cache timeout using the CacheTimeout parameter in the `JWTJwksURIs` configuration. This ensures that temporary JWKS endpoint outages don't affect API availability.

</details>
</li>

<li>
<details>
<summary>Can I use JWKS endpoints with symmetric cryptography (HMAC)?</summary>

No, JWKS endpoints are designed for asymmetric cryptography (RSA and ECDSA), where public keys are used for signature verification. Symmetric cryptography (HMAC) requires a shared secret, which cannot be retrieved from a JWKS endpoint.

</details>
</li>

<li>
<details>
<summary>How often does Tyk refresh the JWKS cache?</summary>

By default, Tyk refreshes the JWKS cache every 240 seconds. However, you can customize the cache timeout for each JWKS endpoint in Tyk OAS APIs using the `cacheTimeout` field in the API definition.

</details>
</li>

<li>
<details>
<summary>Is JWKS Pre-fetching configurable?</summary>

The JWKS (JSON Web Key Set) pre-fetching functionality in Tyk Gateway is automatic and not configurable in terms of enabling/disabling it. When you configure JWKS URLs in your API definition, Tyk will automatically pre-fetch the keys when the API loads.

</details>
</li>

</ul>