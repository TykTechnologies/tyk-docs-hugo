---
date: 2017-03-23T15:47:26Z
title: HMAC Signatures
tags: ["HMAC", "Security"]
description: "Using HMAC signatures"
menu:
  main:
    parent: "Authentication & Authorization"
weight: 5 
---

HMAC Signing is an access token method that adds another level of security by forcing the requesting client to also send along a signature that identifies the request temporally to ensure that the request is from the requesting user, using a secret key that is never broadcast over the wire.

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

### Supported headers

Tyk API Gateway supports full header signing through the use of the `headers` HMAC signature field. This includes the request method and path using the`(request-target)` value. For body signature verification, HTTP Digest headers should be included in the request and in the header field value.

{{< note success >}}
**Note**  

All headers should be in lowercase.
{{< /note >}}


### A sample signature generation snippet

```{.copyWrapper}
...

refDate := "Mon, 02 Jan 2006 15:04:05 MST"

// Prepare the request headers:
tim := time.Now().Format(refDate)
req.Header.Add("Date", tim)
req.Header.Add("X-Test-1", "hello")
req.Header.Add("X-Test-2", "world")

// Prepare the signature to include those headers:
signatureString := "(request-target): " + "get /"
signatureString += "date:" + tim + " "
signatureString += "x-test-1:" + "hello" + " "
signatureString += "x-test-2:" + "world"

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

### Date header not allowed for legacy .Net

Older versions of some programming frameworks do not allow the Date header to be set, which can causes problems with implementing HMAC, therefore, if Tyk detects a `x-aux-date` header, it will use this to replace the Date header.

### Clock Skew

Tyk also implements the recommended clock-skew from the specification to prevent against replay attacks, a minimum lag of 300ms is allowed on either side of the date stamp, any more or less and the request will be rejected. This means that requesting machines need to be synchronised with NTP if possible.

You can edit the length of the clock skew in the API Definition by setting the `hmac_allowed_clock_skew` value in your API definition. This value will default to 0, which deactivates clock skew checks.

### Additional notes

HMAC Signing is a good way to secure an API if message reliability is paramount, it goes without saying that all requests should go via TLS/SSL to ensure that MITM attacks can be minimised. There are many ways of managing HMAC, and because of the additional encryption processing overhead requests will be marginally slower than more standard access methods.

## Setting up HMAC using the Dashboard

To enable the use of HMAC Signing in your API from the Dashboard:

1. Select your API from the **System Management > APIs** menu
2. Scroll to the **Authentication** options
3. Select **HMAC (Signed Authetication Key)** from the drop-down list
4. Configure your **HMAC Request Signing** settings.
5. Select **Strip Authorization Data** to strip any authorization data from your API requests.
6. Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the **Auth Key Header** name value
7. You can select whether to use a URL query string parameter as well as a header, and what parameter to use. If this is left blank, it will use the **Auth Key Header** name value.
8. You can select whether to use a **cookie value**. If this is left blank, it will use the Header name value.


![Target Details: HMAC](img/2.10/hmac_auth_settings.png)


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

### Setting up an HMAC Session Object

When creating a user session object, the settings should be modified to reflect that an HMAC secret needs to be generated alongside the key:

```{.copyWrapper}
{
  ...
  "hmac_enabled": true,
  "hmac_string": "",
  ...
}
```

Creating HMAC keys is the same as creating regular access tokens - by using the [Tyk Gateway API]({{ ref "tyk-gateway-api/api-definition-objectsauthentication" >}}). Setting the `hmac_enabled` flag to `true`, Tyk will generate a secret key for the key owner (which should not be modified), but will be returned by the API so you can store and report it to your end-user.
