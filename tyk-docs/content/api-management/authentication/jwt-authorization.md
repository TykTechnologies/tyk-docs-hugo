---
title: JWT Authorization
description: Tyk Gateway's JWT Authorization process extracts user identity and applies security policies based on JWT claims for API access control.
tags: ["Authentication", "Authorization", "JWT", "JSON Web Tokens", "Claims", "Validation"]
keywords: ["Authentication", "Authorization", "JWT", "JSON Web Tokens", "Claims", "Validation"]
date: 2025-01-10
---

## Availability 

| Component   | Editions |
|-------------| ------------------------- |
| Tyk Gateway | Community and Enterprise |

## Introduction

[JSON Web Tokens (JWT)](https://www.jwt.io/introduction) are a popular method for client authentication and authorization that can be used to secure access to your APIs via Tyk's [JWT Auth]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) method.

After the JWT signature has been [validated]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#signature-validation" >}}), Tyk uses the **claims** within the token to determine which security policies (access rights, rate limits and quotas) should be applied to the request.

From Tyk 5.10, Tyk can perform optional [validation]({{< ref "api-management/authentication/jwt-claim-validation" >}}) of these claims.

In this page, we explain how Tyk performs JWT authorization, including how it identifies the user and the policies to be applied.

## JWT Authorization Flow

When a request with a JWT arrives at Tyk Gateway, after the authentication (signature and claim validation) step, Tyk performs the following steps to authorize the request:

1. **Identity Extraction**: The user identity is extracted from the token according to this order of precedence:
   - The `kid` header (unless `skipKid` is enabled)
   - A custom claim (specified in `subjectClaims`)
   - The standard `sub` claim (fallback)

2. **Policy Resolution**: Tyk determines which [policy]({{< ref "api-management/policies#what-is-a-security-policy" >}}) to apply to the request:
   - From scope-to-policy mapping
   - From default policies

3. **Update Session**: The [session]({{< ref "api-management/policies#what-is-a-session-object" >}}) is updated with the identity and policies.

In the following sections, we provide a detailed explanation of each of these steps.

## Identifying the Session Owner

A unique identity is stored in the session object to associate it with the authenticated user. This identifier is extracted from the JWT by checking the following fields in order of precedence:

1. The standard Key ID header (`kid`) in the JWT (unless the `skipKid` option is enabled)
2. The subject identity claim identified by the value(s) stored in `subjectClaims` (which allows API administrators to designate any JWT claim as the identity source (e.g., user_id, email, etc.).

    When multiple values are provided in the `subjectClaims` array, Tyk processes them as follows:

    1. Tyk tries each claim **in the exact order they appear** in the array
    2. For each claim, Tyk checks if:
        - The claim exists in the token
        - The claim value is a string and is not empty
    3. Tyk uses the **first valid, non-empty value** it finds and stops processing further claims
    4. If none of the claims yield a valid identity, Tyk proceeds to the next stage (the `sub` claim)

    {{< note success >}}
**Note**

Prior to Tyk 5.10, the subject identity claim was retrieved from `identityBaseField`; see [using multiple identity providers]({{< ref "#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
    {{< /note >}}

3. The `sub` [registered claim]({{< ref "api-management/authentication/jwt-claim-validation#registered-vs-custom-claims" >}}).

**Example**

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

{{< note success >}}
**Note**

Session objects can be cached to improve performance, so the identity extraction is only performed on the first request with a JWT, or when the cache is refreshed.

{{< /note >}}

## Identifying the Tyk Policies to be applied

[Security Policies]({{< ref "api-management/policies" >}}) are applied (or mapped) to the session object to configure authorization for the request. Policies must be [registered]({{< ref "api-management/policies#how-you-can-create-policies" >}}) with Tyk, such that they have been allocated a unique *Tyk Policy Id*.

Tyk supports three different types of policy mapping, which are applied in this priority order:

1. Direct policy mapping
2. Scope policy mapping
3. Default policy mapping

### Direct policies

You can optionally specify policies to be applied to the session via the *policy claim* in the JWT. This is a [Private](https://datatracker.ietf.org/doc/html/rfc7519#section-4.3) Claim (not a registered claim) and can be anything you want, but typically we recommend the use of `pol`. You must instruct Tyk where to look for the policy claim by configuring the `basePolicyClaims` field in the API definition.

Note that we typically refer to Private Claims as Custom Claims.

In this example, Tyk has been configured to check the `pol` claim in the JWT to find the *Policy Ids* for the policies to be applied to the session object:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          basePolicyClaims: [pol]
```

In the JWT, you should then provide the list of Tyk policy IDs as an array of values in that claim, for example you might declare:

```
  "pol": ["685a8af28c24bdac0dc21c28", "685bd90b8c24bd4b6d79443d"]
```

{{< note success >}}
**Note**

Prior to Tyk 5.10, the base policy claim was retrieved from `policyFieldName`; see [using multiple identity providers]({{< ref "#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
{{< /note >}}

### Default policies

You **must** configure one or more *default policies* that will be applied if no specific policies are identified from the JWT claims. These are configured using the `defaultPolicies` field in the API definition, which accepts a list of policy IDs. This prevents a session from being created with no authorization to interact with APIs on the Gateway.

{{< note success >}}
**Note**

The Gateway will return `HTTP 403 Forbidden` if no default policies are configured, if the referenced policies don’t exist, or if policies are invalid or incorrectly formatted.

{{< /note >}}

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

Directly mapping policies to APIs relies on the sharing of Tyk Policy IDs with the IdP (so that they can be included in the JWT) and may not provide the required flexibility.

Tyk supports a more advanced approach where policies are applied based on scopes declared in the JWT. This keeps separation between the IdP and Tyk-specific concepts, and supports much more flexible configuration.

Within the JWT, you identify a Private Claim that will hold the authorization (or access) scopes for the API. You then provide, within that claim, a list of *scopes*. In your API definition, you configure the `scopes.claims` to instruct Tyk where to look for the scopes and then you declare a mapping of scopes to policies within the `scopes.scopeToPolicyMapping` object.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          scopes:
            scopeToPolicyMapping:
              - scope: read: users
                policyId: 685bd90b8c24bd4b6d79443d
              - scope: write: users
                policyId: 685a8af28c24bdac0dc21c28
            claims: [accessScopes]
```

In this example, Tyk will check the `accessScopes` claim within the incoming JWT and apply the appropriate policy if that claim contains the value `read: users` or `write: users`. If neither scope is declared in the claim, or the claim is missing, the default policy will be applied.

{{< note success >}}
**Note**

Prior to Tyk 5.10, the authorization scopes claim was retrieved from `scopes.claimName`; see [using multiple identity providers]({{< ref "#using-multiple-identity-providers" >}}) for details and for the Tyk Classic API alternative.
{{< /note >}}

#### Declaring Multiple Scopes

You can declare multiple scopes by setting the value of the **authorization scopes claim** in one of the following ways:

* **String with space-delimited list of values (standard format)**

  ```json
  "accessScopes": "read: users write: users"
  ```

* **Array of strings**

  ```json
  "accessScopes": ["read: users", "write: users"]
  ```

* **String with space-delimited list inside a nested key**

  ```json
  "accessScopes": { "access": "read: users write: users" }
  ```

* **Array of strings inside a nested key**

  ```json
  "accessScopes": { "access": ["read: users", "write: users"] }
  ```

**Important:**

* If your scopes are defined inside a nested key, use **dot notation** for the `scopes.claims` value.

  * For **examples 1 and 2**, set `scopes.claims` to:

    ```
    accessScopes
    ```
  * For **examples 3 and 4**, set `scopes.claims` to:

    ```
    accessScopes.access
    ```

**Example JWT fragment:**
If this JWT is provided to an API configured as described above, Tyk will apply both policies to the session object.

```json
{
  "sub": "1234567890",
  "name": "Alice Smith",
  "accessScopes": ["read: users", "write: users"]
}
```

### Combining policies

Where multiple policies are mapped to a session (for example, if several scopes are declared in the JWT claim, or if you set multiple *default policies*), Tyk will apply all the matching policies to the request, combining their access rights and using the most permissive rate limits and quotas. It's important when creating those policies to ensure that they do not conflict with each other.

Policies are combined as follows:

1. Apply direct-mapped policies declared via `basePolicyClaims`
2. Apply scope-mapped policies declared in `scopeToPolicyMapping` based upon scopes in the JWT
3. If no policies have been applied in steps 1 or 2, apply the default policies from `defaultPolicies`

When multiple policies are combined, the following logic is applied:

- **access rights** A user gets access to an endpoint if ANY of the applied policies grant access
- **consumption limits** Tyk uses the most permissive values (highest quota, highest throughput )
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

After authenticating the token and extracting the necessary identity and policy information, Tyk creates or updates a session object that controls access to the API.

The following [session attributes]({{< ref "api-management/policies#session-object" >}}) are modified based on the policies:

1. **Access Rights**: Determines which API endpoints the token can access
2. **Rate Limits**: Controls how many requests per second/minute the token can make
3. **Quotas**: Sets the maximum number of requests allowed in a time period
4. **Metadata**: Custom metadata from the policies is added to the session
5. **Tags**: Policy tags are added to the session

In addition to updating the session, Tyk extracts claims from the JWT and makes them available as context variables for use in other [middleware]({{< ref "api-management/traffic-transformation" >}}).

{{< note success >}}

When a JWT's claims change (for example, by configuring different scopes or policies), Tyk updates the session with the new policies on the subsequent request made with the token.

{{< /note >}}

## Advanced Configuration

### Using Multiple Identity Providers

When using multiple Identity Providers (IdPs), you may need to check different claim locations for the same information. Tyk supports definition of **multiple claim locations** for subject identity and policy IDs.

* **Before Tyk 5.10 (and for Tyk Classic APIs):**

  * The Gateway could only check **single claims** for:

    * Subject identity
    * Base policy
    * Scope-to-policy mapping
  * This setup didn’t support multiple IdPs using different claim names (e.g **Keycloak** uses `scope` and **Okta** uses `scp`)

* **From Tyk 5.10 onwards (Tyk OAS APIs):**

  * You can configure **multiple claim names** for:

    * Subject identity
    * Base policy
    * Scope-to-policy mapping
  * This allows Tyk to locate data across various tokens and IdPs more flexibly.

**Configuration summary:**

| API Configuration Type | Tyk Version | Subject Identity Locator  | Base Policy Locator     | Scope-to-Policy Mapping Locator |
| ---------------------- | ----------- | ------------------------- | ----------------------- | ------------------------------- |
| Tyk OAS                | pre-5.10    | `identityBaseField`       | `policyFieldName`       | `scopes.claimName`              |
| Tyk OAS                | 5.10+       | `subjectClaims`           | `basePolicyClaims`      | `scopes.claims`                 |
| Tyk Classic            | all         | `jwt_identity_base_field` | `jwt_policy_field_name` | `jwt_scope_claim_name`          |

**Example configuration:**

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

#### Backward Compatibility

The new configuration is fully backward compatible:

- Existing `identityBaseField`, `policyFieldName`, and `scopes.claimName` settings continue to work
- If both old and new fields are specified, the new fields take precedence
- When using only new fields, the first element in each array is used to set the corresponding legacy field for backward compatibility

