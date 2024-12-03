---
date: 2017-03-13T15:08:55Z
Title: JSON Web Tokens (JWT)
menu:
  main:
    parent: "API Definition Objects"
weight: 7
---

* `enable_jwt`: Set JWT as the access method for this API.

* `jwt_signing_method`: Either HMAC or RSA - HMAC requires a shared secret while RSA requires a public key to use to verify against. Please see the section on JSON web tokens for more details on how to generate these.

* `jwt_source`: Must either be a base64 encoded valid RSA/HMAC key or a url to a resource serving JWK, this key will then be used to validate inbound JWT and throttle them according to the centralised JWT options and fields set in the configuration. See [Dynamic public key rotation using public JWKs URL]({{< ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}}) for more details on JWKs.

* `jwt_identity_base_field`: Identifies the user or identity to be used in the Claims of the JWT. This will fallback to `sub` if not found. This field forms the basis of a new "virtual" token that gets used after validation. It means policy attributes are carried forward through Tyk for attribution purposes.
    
Centralised JWTs add a `TykJWTSessionID` to the session metadata on create to enable upstream hosts to work with the internalised token should things need changing.

* `jwt_policy_field_name`: The policy ID to apply to the virtual token generated for a JWT.

### Clock Skew

Due to the nature of distrusted systems it is expected that despite best efforts you can end up in a situation with clock skew between the issuing party (An OpenID/OAuth provider) and the validating party (Tyk).  

This means that in certain circumstances Tyk would reject requests to an API endpoint secured with JWT with the "Token is not valid yet" error . This occurs due to the clock on the Tyk server being behind the clock on the Identity Provider server even with all servers ntp sync'd from the same ntp server.

You can disable the validation check on 3 claims `IssueAt`, `ExpireAt` and `NotBefore` by adding the following boolean fields to your API definition:

```{.copyWrapper}
  "enable_jwt": true,
  "jwt_disable_issued_at_validation": true,
  "jwt_disable_expires_at_validation": true,
  "jwt_disable_not_before_validation": true
```

See [JSON Web Tokens](/api-management/authentication-authorization#use-json-web-tokens-jwt) for more details.
