---
date: 2017-03-23T15:50:24Z
title: JSON Web Tokens
menu:
  main:
    parent: "Your APIs"
weight: 5 
---

A [JSON Web Token][1] (JWT) is a JSON-based open standard (RFC 7519) for passing claims between parties in a web application environment. The tokens are designed to be compact, URL-safe and usable especially in web browser single sign-on (SSO) context.

One of the best things about a JWT is that it is cryptographically signed, and can be signed in a number of ways such as using HMAC shared secret and RSA public/private key pairs.

What is useful is when a token is issued by a third-party (e.g. an OAuth provider, or an SSO interface), that third party can use a private key to sign the claims of the token, and then any third-party can verify that the claims were issued by a safe third-party by validating the signature using a public key.

## Option 1: JWTs with Tyk

![Tyk JWT Flow Diagram][2]

Tyk supports storing a shared secret in your API definition (either an RSA public key or a HMAC shared secret) that will be used to validate any inbound JSON Web Token for the given API.

For example, if you are using a third-party identity provider (IdP) that can issue JWTs, you can embed their public key in your API Definition, and then use this public key to validate the claims on the inbound token.

With Tyk, you can set up some specific claims that will then enforce a token policy on this identity, and the token policy quotas and rate limits will be maintained for the given JWT holder identity even if a new JWT is issued, so long as the Tyk-specific claims remain unchanged.

Currently HMAC Signing and RSA Public/Private key signing is supported. To enable centralised JWT on an API, add the following to the root of your API Definition:

```{.copyWrapper}
"enable_jwt": true,
"jwt_source": "BASE64-Encoded secret",
"jwt_identity_base_field": "sub",
"jwt_policy_field_name": "pol",
"jwt_signing_method": "rsa"
```

`jwt_identity_base_field` - The `sub` claim will be the base for this token's identity. It could represent a user id and as such, needs to be unique as it will form the basis of the token tyk will use internally to enforce rate limits & quotas.

`jwt_policy_field_name` - The `pol` claim (e.g `72ab02b3be743101c6132342`) is the policy id to apply to this token, the policy will be applied the first time the token is seen and then modified if the policy changes in the claim.

---

### Configure JWT Support in the Dashboard

Getting JWT support set up in the Dashboard only requires a few fields to be set up in the Core settings tab:

#### Step 1: Set Authentication Mode

Select JSON Web Tokens as the Authentication mode:

![Target Details: JSON Web Token][3]

#### Step 2: Set the JWT Signing Method

Set the cryptographic method to use and enter the key in the secrets text field (PEM Encoded), this can either be an RSA public key or an HMAC shared secret:

![JWT signing method dropdown][4]

#### Step 3: Set the Identity Source and Policy Field Name

![Policy and identity claim form][5]

* **The Identity Source**: This is the identity that will be affected by the underlying policy (e.g. if you set this to use the `sub` claim, and this is traditionally a user ID of some sort, then Tyk will begin a rate limiter and quota counter for this specific identity). If you wanted to instead limit a client, e.g. all the users of a specific application, then you can use a different identity claim that identifies the group (i.e. one that is shared by all JWTs issued).

* **The Policy Field Name**: This is a custom requirement for Tyk. You need to tell Tyk which claim will signal to it the correct policy to use. A policy encapsulates rate limits, quota and security information and Tyk will use this policy to apply the correct access rules to the identity that has been specified in the Identity claim above.

#### Step 4: Generate an API policy

Now that you have created the API and set its parameters for the JWTs, you will also need to generate a policy that has access to your API(s). You can do this in the policies editor.

Once the API is saved and you have a policy created for this API, generate a JWT using your identity provider, a library or one of the many test JWT generators available on the web, and make sure that they have the identity and policy claims added to their claim set. Once the token is generated, use it as an `Authorization: Bearer {token}` header in your requests to Tyk.

Tyk will now handle inbound traffic transparently so long as the policy ID being used is valid.

---

## Option 2: Individual JWT secrets

Tyk supports validating an inbound token against a stored key. Tyk will not issue JWTs, but can issue a token ID that is bound to a JWT key so that inbound tokens that bear this id (key) can be validated.

Currently HMAC Signing and RSA Public/Private key signing is supported. To enable JWT on an API, add this to your API Definition:

```{.copyWrapper}
"enable_jwt": true,
"jwt_signing_method": "rsa"
```

Then set your tokens up with these new fields when you create them:

```{.copyWrapper}
"jwt_data": {
  "secret": "Secret"
}
```

HMAC JWT secrets can be any string, but the secret is shared and therefore less secure since the same key is used for signing and validation.

RSA secrets must be a PEM encoded PKCS1 or PKCS8 RSA private key, these can be generated on a Linux box using:

```{.copyWrapper}
openssl genrsa -out key.rsa 
openssl rsa -in key.rsa -pubout > key.rsa.pub
```

When a JWT is passed to Tyk for validation, it *must* use the `kid` header field, as this is the internal access token (when creating a key) that is used to track the rate limits, policies and quotas for the token owner.

If Tyk cannot find a `kid` header, it will try to find an ID in the `sub` field of the claims section. This is not recommended, but is supported as many JWT libraries do not necessarily set the `kid` header claim (especially publicly available test generators).

The benefit here is that if RSA is used, then all that is stored in a Tyk installation that uses hashed keys is the hashed ID of the end user and their public key, so it is very secure.

---

## Option 3: Dynamic public key rotation using JWKs

Instead of specifying static public key in API definition, it is possible to specify URL pointing to JSON Web Key Set (JWKs). At the most basic level, the JWKs is a set of keys containing the public keys that should be used to verify any JWT issued by the authorization server. You can read more about JWKs here: https://auth0.com/docs/jwks

Using JWKs you can maintan dynamic list of currently active public keys, and safely rotate them, since both old and new JWT tokens will work, until you remove expired JWK. Generated JWT keys should have `kid` a claim, which should match with the `kid` field of JWK, used for validating the token. 


## Avoiding clock skew

> **NOTE**: Available from v2.6.2 onwards

Due to the nature of distributed systems it is expected that despite best efforts you can end up in a situation with clock skew between the issuing party (An OpenID/OAuth provider) and the validating party (Tyk).

This means that in certain circumstances Tyk would reject requests to an API endpoint secured with JWT with the `Token is not valid yet` error . This occurs due to the clock on the Tyk server being behind the clock on the Identity Provider server even with all servers ntp sync'd from the same ntp server.

You can disable the validation check on 3 claims `iat`, `exp` & `nbf` by adding the following boolean fields to your API definition:

```{.json}
"enable_jwt": true,
"jwt_disable_issued_at_validation": true,
"jwt_disable_expires_at_validation": true,
"jwt_disable_not_before_validation": true
```

### JWT Clock Skew Configuration

> **NOTE**: Available from v2.7.2 onwards

You can now configure JWT clock skew using the following variables. All values are in seconds. The default is `0`.

```{.json}
"jwt_issued_at_validation_skew": 0,
"jwt_expires_at_validation_skew": 0,
"jwt_not_before_validation_skew": 0
```


[1]: http://jwt.io/introduction/
[2]: /docs/img/diagrams/jwt2.png
[3]: /docs/img/dashboard/system-management/jwt_auth_2.5.png
[4]: /docs/img/dashboard/system-management/jwt_sign_2.5.png
[5]: /docs/img/dashboard/system-management/jwt_claim_2.7.png
