---
date: 2017-03-23T15:41:34Z
title: Bearer Tokens
menu:
  main:
    parent: "Your APIs"
weight: 5 
---

## <a name="what-is-a-bearer-token"></a>What is a bearer token ?

> Any party in possession of a bearer token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key). To prevent misuse, bearer tokens need to be protected from disclosure in storage and in transport.

Tyk provides bearer token access as one of the most convenient building blocks for managing security to your API. In a Tyk setup, this is called "Access Tokens" and is the default mode of any API Definition created for Tyk.

Bearer tokens are added to a request as a header or as a query parameter. If added as a header, they may be preceded by the word "Bearer" to indicate their type, though this is optional.

Traditionally these tokens are used as part of the `Authorization` header.

## <a name="enable-bearer-tokens-with-dashboard"></a> Enable bearer tokens in your API Definition with the Dashboard

To enable the use of a bearer token in your API:

1.  Select your API from the **System Management > APIs** menu
2.  Scroll to the **Authentication** options
3.  Select **Auth Token** from the drop-down list
4.  Select **Strip Authorization Data** to strip any authorization data from your API requests

![Target Details: Auth Token][1]

Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the header value here.

You can also select whether to use the header and a URL query string parameter, and what parameter to use.

## <a name="enable-bearer-tokens-with-file-based"></a> Enable bearer tokens in your API Definition with file-based

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

> **Note**: unlike headers, URL query parameters are *case sensitive*.

To use a cookie name instead of a header or request parameter, set the `use_cookie` parameter to `true`. Cookie names are also case sensitive.

### Signature validation

If you are migrating from platfroms like Mashery, which use request signing, you can enable signature verifications like this:

```{.copyWrapper}
"auth": {
  "validate_signature": true,
  "signature": {
    "algorithm": "MasherySHA256",
    "header": "X-Signature",
    "secret": "secret",
    "allowed_clock_skew": 2
  }
}
```

Supported algroritms `MasherySHA256` and `MasheryMD5`.
`signature.secret` field can hold dynamic value, by referrencing `$tyk_meta` or `$tyk_context` variables. Example: `"secret": "$tyk_meta.individual_secret"`.

### Custom tokens

It is possible to provide Tyk with your own custom tokens, this can be achieved using the Tyk Gateway REST API. This is very useful if you have your own identity provider and don't want Tyk to create and manage tokens for you, and instead just mirror those tokens within Tyk to off-load access control, quotas and rate limiting from your own application.

 [1]: /docs/img/dashboard/system-management/auth_token_2.5.png


