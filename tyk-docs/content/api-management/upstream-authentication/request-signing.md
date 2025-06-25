---
title: Upstream Authentication using Request Signing
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - request signing
description: How to authenticate upstream service using request signing
date: "2025-04-15"
---

## Request signing

Request Signing is an access token method that adds another level of security where the client generates a unique signature that identifies the request temporally to ensure that the request is from the requesting user, using a secret key that is never broadcast over the wire.

Tyk can apply either the symmetric Hash-Based Message Authentication Code (HMAC) or asymmetric Rivest-Shamir-Adleman (RSA) algorithms when generating the signature for a request to be sent upstream. For HMAC, Tyk supports different options for the hash length. 

The following algorithms are supported:

| Hashing algorithm | Tyk identifier used in API definition |
|-------------------|---------------------------------------|
| HMAC SHA1         | `hmac-sha1`                           |
| HMAC SHA256       | `hmac-sha256`                         |
| HMAC SHA384       | `hmac-sha384`                         |
| HMAC SHA512       | `hmac-sha512`                         |
| RSA SHA256        | `rsa-sha256`                          |

This feature is implemented using [Draft 10](https://tools.ietf.org/html/draft-cavage-http-signatures-10) RFC. The signatures generated according to this standard are temporal - that is, they include a time stamp. If there is no `Date` header in the request that is to be proxied to the upstream, Tyk will add one.

### Configuring Request Signing in the API definition
Upstream Authentication is configured per-API in the Tyk Vendor Extension by adding the authentication section within the `upstream` section.

For Request Signing, you must configure [upstream.authentication.upstreamRequestSigning]({{< ref "api-management/gateway-config-tyk-oas#upstreamrequestsigning" >}}), providing the following settings:

- the `signatureHeader` in which the signature should be sent (typically `Authorization`)
- the `algorithm` to be used to generate the signature (from the table above)
- the `secret` to be used in the encryption operation
- optional `headers` that Tyk should include in the string that is encrypted to generate the signature
- the `keyId` that the upstream will use to identify Tyk as the client (used for HMAC encryption)
- the `certificateId` that the upstream will use to identify Tyk as the client (used for RSA encryption) 

The Tyk Classic equivalent is [request_signing]({{< ref "api-management/gateway-config-tyk-classic#upstream-authentication" >}}).

### Configuring Request Signing with Tyk Operator

When using Tyk Operator, the `certificateId` and `secret` are encapsulated in Kubernetes references:
- `certificateRef`: references a Secret containing the private and secret key.
- `secretRef`: references a Kubernetes Secret that holds the secret used in the encryption operation.

For example:

```yaml{linenos=true, linenostart=1, hl_lines=["66-73"]}
 apiVersion: v1
 data:
   secretKey: cGFzc3dvcmQxMjM=
 kind: Secret
 metadata:
   name: upstream-secret
   namespace: default
 type: Opaque
 ---
 apiVersion: v1
 kind: ConfigMap
 metadata:
   name: booking
   namespace: default
 data:
   test_oas.json: |-
     {
       "info": {
         "title": "bin",
         "version": "1.0.0"
       },
       "openapi": "3.0.3",
       "components": {},
       "paths": {},
       "x-tyk-api-gateway": {
         "info": {
           "name": "bin",
           "state": {
             "active": true,
             "internal": false
           }
         },
         "server": {
           "listenPath": {
             "strip": true,
             "value": "/bin/"
           }
         },
         "upstream": {
           "url": "http://httpbin.org/",
           "authentication": {
             "requestSigning": {
               "enabled": true,
               "signatureHeader": "Signature",
               "algorithm": "hmac-sha256",
               "keyId": "random-key-id", 
               "headers": [],
               "secret": ""
             }
           }
         }
       }
     }
 ---
 apiVersion: tyk.tyk.io/v1alpha1
 kind: TykOasApiDefinition
 metadata:
   name: booking
   namespace: default
 spec:
   tykOAS:
     configmapRef:
       namespace: default
       name: booking
       keyName: test_oas.json
   upstreamRequestSigning:
     certificateRef: ""
     secretRef:
       namespace: default
       name: upstream-secret
       secretKey: secretKey   
     algorithm: "hmac-sha256"
     keyId: ""
 ```
In this example, a Tyk OAS API was created using the `upstreamRequestSigning` field. It can be broken down as follows:
- `upstreamRequestSigning`: This defines the settings for Upstream Request Signing. in the example manifest, it configures Upstream Request Signing using the `booking` API.
  - `certificateRef`: References a Secret containing the private and secret key for signing client API requests. This should be used if `secretRef` is not specified.
  - `secretRef`: References a Kubernetes Secret that holds the secret key for signing client requests.
  - `algorithm`: Specifies the algorithm used for signing.
    - For `secretRef`, supported algorithms include: `hmac-sha1`, `hmac-sha256`, `hmac-sha384`, and `hmac-sha512`.
    - For `certificateRef`, the required algorithm is `rsa-sha256`.
  - `keyId`: A user-defined key assumed to be available on the upstream service. This is used in the `SignatureHeader` and should be included when using `certificateRef`. It is required when using the RSA algorithm.

<hr>

