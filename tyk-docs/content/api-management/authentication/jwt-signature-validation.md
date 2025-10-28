---
title: JWT Signature Validation
description: How to validate JWT signatures in Tyk API Gateway.
tags: ["Authentication", "JWT", "JSON Web Tokens", "Signature", "Validation"]
keywords: ["Authentication", "JWT", "JSON Web Tokens", "Signature", "Validation"]
date: 2025-01-10
---

## Availability

| Component   | Editions |
|-------------| ------------------------- |
| Tyk Gateway | Community and Enterprise |

## Introduction

A JSON Web Token consists of three parts separated by dots: `header.payload.signature`. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

Tyk can validate the signature of incoming JWTs to ensure that they meet your security requirements before granting access to your APIs.

## JWT Signature Fundamentals

A JWT signature is created by taking the encoded header, the encoded payload, a secret, and the algorithm specified in the header. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.



## Signature Validation

| Method    | Cryptographic Style | Secret Type   | Supported Locations for Secret | Supported Algorithms                                 |
| --------- | ------------------- | ------------- | ------------------------------ | ---------------------------------------------------- |
| **HMAC**  | Symmetric           | Shared secret | API definition                 | `HS256`, `HS384`, `HS512`                            |
| **RSA**   | Asymmetric          | Public key    | API definition, JWKS endpoint  | `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512` |
| **ECDSA** | Asymmetric          | Public key    | API definition, JWKS endpoint  | `ES256`, `ES384`, `ES512`                            |

## Secret Management

You must provide Tyk with the secret or key to be used to validate the incoming JWTs.

- For the asymmetric methods (RSA and ECDSA) the public key can be stored in the API definition or Tyk can retrieve from a public JSON Web Key Sets (JWKS) endpoint (supporting dynamic rotation of keys in the JWKS)
- For symmetric encryption (HMAC), the secret is shared between the client and Tyk and so is stored within the API definition not on the public JWKS server

### Locally Stored Keys and Secrets

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

### Remotely Stored Keys (JWKS endpoint)

#### Single JWKS endpoint

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

#### Multiple JWKS endpoints

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

### JWKS caching

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
#### Configuration Options

| Field | Type | Description | Default | Supported Formats |
|-------|------|-------------|---------|-------------------|
| `url` | string | JWKS endpoint URL | Required | Full URI including protocol |
| `cacheTimeout` | string | Cache validity period | 240s | `"300s"`, `"5m"`, `"1h"`, etc. |


{{< note success >}}
**Note**  

Tyk Classic APIs continue to use the existing JWKS caching behavior with the 240-second default timeout. The enhanced caching features are available only for Tyk OAS APIs.
{{< /note >}}

#### JWKS Cache Management

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

#### Feature Compatibility Summary

| Feature | Tyk Classic | Tyk OAS | Available From |
|---------|-------------|---------|----------------|
| Single JWKS endpoint | ✅ | ✅ | All versions |
| Multiple JWKS endpoints | ❌ | ✅ | Tyk 5.9.0+ |
| Configurable cache timeout | ❌ | ✅ | Tyk 5.10.0+ |
| Pre-fetch functionality | ❌ | ✅ | Tyk 5.10.0+ |
| Cache management API | ✅ | ✅ | Tyk 5.10.0+ |

