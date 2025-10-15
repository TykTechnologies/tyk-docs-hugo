---
title: JWT Authorization
description: How to implement JWT authorization in Tyk API Gateway.
tags: ["Authentication", "Authorization", "JWT", "JSON Web Tokens", "Claims", "Validation"]
keywords: ["Authentication", "Authorization", "JWT", "JSON Web Tokens", "Claims", "Validation"]
date: 2025-01-10
---

## Introduction

JSON Web Token claims are used to configure the Authorization for the request.

Tyk creates an internal [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) for the request. The session is used to apply the appropriate security policies to ensure that rate limits, quotas, and access controls specific to the user are correctly applied. The session also enable tracking and analytics for the user's API usage.

## JWT Authorization Flow

When a request with a JWT token arrives at Tyk, the following process occurs:

1. **Token Extraction**: Token is extracted from the request.

2. **Token Validation**: The token's signature is verified using the configured signing method.

3. **Claims Validation**: Token claims are validated as per the configuration.

4. **Identity Extraction**: The user identity is extracted from the token, using one of:
   - The `kid` header (unless `skipKid` is enabled)
   - A custom claim specified in `identityBaseField`
   - The standard `sub` claim as fallback

5. **Policy Resolution**: Tyk determines which policy to apply to the request:
   - From a claim specified in `policyFieldName`
   - From a client ID in `clientBaseField`
   - From scope-to-policy mapping
   - From default policies

6. **Session Creation**: A session is created or updated with the resolved policies, which determines access rights, rate limits, and quotas.

## Identifying the Session Owner

In order that this session can be correctly associated with the authenticated user, Tyk must extract a unique identity from the token.

The JWT specification [defines](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2) the optional `sub` claim which identifies the principal that is the subject of the JWT. In OAuth/OIDC contexts this will usually be the end user (resource owner) on whose behalf the token was issued and so is typically used to identify the session owner.

Tyk provides a flexible approach to identifying the session owner, to account for other use cases where the `sub` field is not supplied or appropriate. The identity is extracted from the token by checking the following fields in order of precedence:

1. The standard Key ID header (`kid`) in the JWT (unless the `skipKid` option is enabled)
2. The subject identity claim identified by the value(s) stored in `subjectClaims` (which allows API administrators to designate any JWT claim as the identity source (e.g., user_id, email, etc.).
3. The `sub` registered claim

{{< note success >}}
**Note**

Prior to Tyk 5.10, the subject identity claim was retrieved from `identityBaseField`; see [using multiple identity providers]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
{{< /note >}}

When an identity has been determined, it is stored in the session object in three locations:
- in the `Alias` field
- it is used to generate a hashed session Id stored in the `keyID` field
- in the session metadata as `TykJWTSessionID`

Note that session objects can be cached to improve performance, so the identity extraction is only performed on the first request with a JWT, or when the cache is refreshed.

In this example, `skipKid` has been set to `true`, so Tyk checks the `subjectClaims` and determines that the value in the custom claim `user_id` within the JWT should be used as the identity for the session object.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          skipKid: true
          subjectClaims: [user_id]
```

## Identifying the Tyk Policies to be applied

[Security Policies]({{< ref "api-management/policies" >}}) are applied (or mapped) to the session object to configure authorization for the request. Policies must be [registered]({{< ref "api-management/policies#how-you-can-create-policies" >}}) with Tyk, such that they have been allocated a unique *Tyk Policy Id*.

Tyk supports three different types of policy mapping, which are applied in this priority order:

1. Direct policy mapping
2. Scope policy mapping
3. Default policy mapping

Note that, whilst a *default policy* must be configured for each API using JWT Auth, this will only be applied if there are no policies mapped in step 1 or 2. If *scope policies* are activated, these will be applied on top of the previously applied direct policies as explained in more detail in the section on [combining policies]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#combining-policies" >}}).

### Direct policies

You can optionally specify policies to be applied to the session via the *policy claim* in the JWT. This is a [Private Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.3) and can be anything you want, but typically we recommend the use of `pol`. You must instruct Tyk where to look for the policy claim by configuring the `basePolicyClaims` field in the API definition.

In this example, Tyk has been configured to check the `pol` claim in the JWT to find the *Policy Ids* for the policies to be applied to the session object:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          basePolicyClaims: [pol]
```

In the JWT, you should then provide the list of policy Ids as an array of values in that claim, for example you might declare:

```
  "pol": ["685a8af28c24bdac0dc21c28", "685bd90b8c24bd4b6d79443d"]
```

{{< note success >}}
**Note**

Prior to Tyk 5.10, the base policy claim was retrieved from `policyFieldName`; see [using multiple identity providers]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
{{< /note >}}

### Default policies

You **must** configure one or more *default policies* that will be applied if no specific policies are identified in the JWT claims. These are configured using the `defaultPolicies` field in the API definition, which accepts a list of policy Ids.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          defaultPolicies:
            - 685a8af28c24bdac0dc21c28
            - 685bd90b8c24bd4b6d79443d
```

### Scope policies

Directly mapping policies to APIs relies upon the sharing of Tyk Policy Ids with the IdP (so that they can be included in the JWT) and may not provide the flexibility required. Tyk supports a more advanced approach where policies are applied based upon *scopes* declared in the JWT. This keeps separation between the IdP and Tyk-specific concepts, and supports much more flexible configuration.

Within the JWT, you identify a Private Claim that will hold the authorization (or access) scopes for the API. You then provide, within that claim, a list of *scopes*. In your API definition, you configure the `scopes.claims` to instruct Tyk where to look for the scopes and then you declare a mapping of scopes to policies within the `scopes.scopeToPolicyMapping` object.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          scopes:
            scopeToPolicyMapping:
              - scope: read:users
                policyId: 685bd90b8c24bd4b6d79443d
              - scope: write:users
                policyId: 685a8af28c24bdac0dc21c28
            claims: [accessScopes]
```

In this example, Tyk will check the `accessScopes` claim within the incoming JWT and apply the appropriate policy if that claim contains the value `read:users` or `write:users`. If neither scope is declared in the claim, or the claim is missing, then the default policy will be applied.

{{< note success >}}
**Note**

Prior to Tyk 5.10, the authorization scopes claim was retrieved from `scopes.claimName`; see [using multiple identity providers]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
{{< /note >}}

Multiple scopes can be declared by setting the value of the authorization scopes claim in any of four configurations:

- a string with space delimited list of values (by standard)<br>
    `"permissions": "read:users write:users"`
- an array of strings<br>
    `"permissions": ["read:users", "write:users"]`
- a string with space delimited list of values inside a nested key<br>
    `"permissions": { "access": "read:users write:users" }`
- an array of strings inside a nested key<br>
    `"permissions": { "access": ["read:users", "write:users"] }`

If there is a nested key then you must use dot notation in the value configured for `scopes.claims` so, for the first two examples above, `scopes.claims` should be set to `permissions` whilst for the the two nested examples you would use `permissions.access`.

This example of a fragment of a JWT, if provided to an API with the configuration above, will cause Tyk to apply both policies to the session object:

```json
{
  "sub": "1234567890",
  "name": "Alice Smith",
  "accessScopes": ["read:users", "write:users"]
}
```

### Combining policies

Where multiple policies are mapped to a session (for example, if several scopes are declared in the JWT claim, or if you set multiple *default policies*) Tyk will apply all the matching policies to the request, combining their access rights and using the most permissive rate limits and quotas. It's important when creating those policies to ensure that they do not conflict with each other.

Policies are combined as follows:

1. Apply direct mapped policies declared via `basePolicyClaims`
2. Apply scope mapped policies declared in `scopeToPolicyMapping` based upon scopes in the JWT
3. If no policies have been applied in steps 1 or 2, apply the default policies from `defaultPolicies`

When multiple policies are combined the following logic is applied:

- **access rights** A user gets access to an endpoint if ANY of the applied policies grant access
- **rate limits** Tyk uses the most permissive values (highest quota, lowest rate limit)
- **other settings** The most permissive settings from any policy are applied

### Policy Best Practices

When creating multiple policies that might be applied to the same JWT, we recommend using [partitioned policies]({{< ref "api-management/policies#partitioned-policies" >}}) - policies that control specific aspects of API access rather than trying to configure everything in a single policy.

For example:

- Create one policy that grants read-only access to specific endpoints
- Create another policy that grants write access to different endpoints
- Create a third policy that sets specific rate limits

To ensure these policies work correctly when combined:

- Set `per_api` to `true` in each policy. This ensures that the policy's settings only apply to the specific APIs listed in that policy, not to all APIs globally.
- Avoid listing the same `API ID` in multiple policies with conflicting settings. Instead, create distinct policies with complementary settings that can be safely combined.


## Session Updates

When a JWT's claims change (for example, configuring different scopes or policies), Tyk will update the session with the new policies on the next request made with the token.

## Missing Policies

If a policy Id is mapped to a session, but there is no policy with that Id, Tyk will fail safe and reject the request returning the `HTTP 403 Forbidden` response with `Key not authorized: no matching policy`. Tyk Gateway will also log the error: `Policy ID found is invalid!`.

## Using Multiple Identity Providers

When using multiple Identity Providers, you may need to check different claim locations for the same information. Tyk supports multiple claim locations for the subject identity and policy Ids.

Prior to Tyk 5.10 and for Tyk Classic APIs, the Gateway could be configured to check single claims for the subject identity, base policy and scope-to-policy mapping. This did not support the scenario where different IdPs used different claims - for example, for the policy mapping, Keycloak uses `scope`, whereas Okta uses `scp`.

From Tyk 5.10+, Tyk OAS APIs can be configured to check multiple claim names to locate these data in the received token.

| API Configuration Type | Tyk Version | Subject Identity Locator | Base Policy Locator | Scope-to-Policy Mapping Locator |
|-------------|----------|---|---|---|
| Tyk OAS     | pre-5.10 | `identityBaseField` | `policyFieldName` | `scopes.claimName` |
| Tyk OAS     | 5.10+    | `subjectClaims` | `basePolicyClaims` | `scopes.claims`|  
| Tyk Classic | all      | `jwt_identity_base_field` | `jwt_policy_field_name` | `jwt_scope_claim_name` |

For example:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          # Legacy single field (still supported)
          identityBaseField: "sub"
          
          # New multi-location support (Tyk 5.10+)
          subjectClaims:
            - "sub"
            - "username" 
            - "user_id"
```

