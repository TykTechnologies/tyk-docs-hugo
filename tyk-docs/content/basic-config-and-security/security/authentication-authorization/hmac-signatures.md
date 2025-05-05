---
title: Sign Requests with HMAC
date: 2025-01-10
description: How to configure HMAC Signatures in Tyk
tags: ["Authentication", "HMAC"]
keywords: ["Authentication", "HMAC"]
---

## Introduction

Hash-Based Message Authentication Code (HMAC) Signing is an access token method that adds another level of security by forcing the requesting client to also send along a signature that identifies the request temporally to ensure that the request is from the requesting user, using a secret key that is never broadcast over the wire.

Tyk currently implements the latest draft of the [HMAC Request Signing standard](http://tools.ietf.org/html/draft-cavage-http-signatures-05).

HMAC Signing is a good way to secure an API if message reliability is paramount, it goes without saying that all requests should go via TLS/SSL to ensure that MITM attacks can be minimized. There are many ways of managing HMAC, and because of the additional encryption processing overhead requests will be marginally slower than more standard access methods.

An HMAC signature is essentially some additional data sent along with a request to identify the end-user using a hashed value, in our case we encode the 'date' header of a request, the algorithm would look like:

```
Base64Encode(HMAC-SHA1("date: Mon, 02 Jan 2006 15:04:05 MST", secret_key))
```

The full request header for an HMAC request uses the standard `Authorization` header, and uses set, stripped comma-delimited fields to identify the user, from the draft proposal:

```
Authorization: Signature keyId="hmac-key-1",algorithm="hmac-sha1",signature="Base64Encode(HMAC-SHA1(signing string))"
```

Tyk supports the following HMAC algorithms: "hmac-sha1", "hmac-sha256", "hmac-sha384", "hmac-sha512”, and reads value from algorithm header. You can limit the allowed algorithms by setting the `hmac.allowedAlgorithms` (Tyk Classic: `hmac_allowed_algorithms`) field in your API definition, like this: `"hmac_allowed_algorithms": ["hmac-sha256", "hmac-sha512"]`.

The date format for an encoded string is:

```
Mon, 02 Jan 2006 15:04:05 MST
```

This is the standard for most browsers, but it is worth noting that requests will fail if they do not use the above format.

## How Tyk validates the signature of incoming requests

When an HMAC-signed request comes into Tyk, the key is extracted from the `Authorization` header, and retrieved from Redis. If a key exists then Tyk will generate its own signature based on the request's "date" header, if this generated signature matches the signature in the `Authorization` header the request is passed.

### Supported headers

Tyk API Gateway supports full header signing through the use of the `headers` HMAC signature field. This includes the request method and path using the`(request-target)` value. For body signature verification, HTTP Digest headers should be included in the request and in the header field value.

{{< note success >}}
**Note**  

All headers should be in lowercase.
{{< /note >}}

#### Date header not allowed for legacy .Net

Older versions of some programming frameworks do not allow the Date header to be set, which can causes problems with implementing HMAC, therefore, if Tyk detects a `x-aux-date` header, it will use this to replace the Date header.

### Clock Skew

Tyk also implements the recommended clock-skew from the specification to prevent against replay attacks, a minimum lag of 300ms is allowed on either side of the date stamp, any more or less and the request will be rejected. This means that requesting machines need to be synchronised with NTP if possible.

You can edit the length of the clock skew in the API Definition by setting the `hmac.allowedClockSkew` (Tyk Classic: `hmac_allowed_clock_skew`) value. This value will default to 0, which deactivates clock skew checks.

## Setting up HMAC using the Dashboard

To enable the use of HMAC Signing in your API from the Dashboard:

1. Scroll to the **Authentication** options
2. Select **HMAC (Signed Authentication Key)** from the drop-down list
3. Configure your **HMAC Request Signing** settings.
4. Select **Strip Authorization Data** to strip any authorization data from your API requests.
5. Select the location of the signature in the request.

{{< img src="/img/dashboard/api-designer/tyk-oas-hmac-auth-settings.png" alt="Configuring HMAC request signing" >}}

## Configuring your API to use HMAC Request Signing

HMAC request signing is configured within the Tyk Vendor Extension by adding the `hmac` object within the `server.authentication` section and enabling authentication.

You must indicate where Tyk should look for the request signature (`header`, `query` or `cookie`) and which `algorithm` will be used to encrypt the secret to create the signature. You can also optionally configure a limit for the `allowedClockSkew` between the timestamp in the signature and the current time as measured by Tyk. 

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      hmac:
        enabled: true
        header:
          enabled: true
          name: Authorization
        allowedAlgorithms:
          - hmac-sha256
        allowedClockSkew: -1
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the auth token]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field  (Tyk Classic: `strip_auth_data`).

### Using Tyk Classic

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select HMAC Request Signing using the `enable_signature_checking` option. 

## Registering an HMAC user with Tyk

When using HMAC request signing, you need to provide Tyk with sufficient information to verify the client's identity from the signature in the request. You do this by creating and registering HMAC user [session objects]({{< ref "api-management/policies#what-is-a-session-object" >}}) with Tyk. When these are created, a matching HMAC secret is also generated, which must be used by the client when signing their requests.

The way that this is implemented is through the creation of a key that grants access to the API (as you would for an API protected by [auth token]({{< ref "api-management/authentication/bearer-token" >}})) and indicating that the key is to be used for HMAC signed requests by setting `hmac_enabled` to `true`. Tyk will return the HMAC secret in the response confirming creation of the key.

When calling the API, the client would never use the key itself as a token, instead they must sign requests using the provided secret.

## Generating a signature

This code snippet gives an example of how a client could construct and generate a Request Signature.

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
