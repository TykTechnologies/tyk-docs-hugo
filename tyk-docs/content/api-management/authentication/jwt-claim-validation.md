---
title: JWT Claim Validation
description: How to validate JWT claims in Tyk API Gateway.
tags: ["Authentication", "JWT", "JSON Web Tokens", "Claims", "Validation"]
keywords: ["Authentication", "JWT", "JSON Web Tokens", "Claims", "Validation"]
date: 2025-01-10
---

## Introduction

JSON Web Tokens contain claims - key-value pairs that provide information about the token and its subject. Tyk can validate these claims to ensure that incoming JWTs meet your security requirements before granting access to your APIs.

Tyk supports validation of both:

- **Registered claims**: standardized claims defined in the JWT specification (such as `iss`, `aud`, `exp`)
- **Custom claims**: application-specific claims that contain business logic or additional metadata

By validating JWT claims, you can enforce fine-grained access control policies, ensure tokens originate from trusted sources, and verify that users have the appropriate permissions for your APIs.

{{< note success >}}
**Note**

JWT claim validation has different support levels across API types:
- **Temporal claims** (`exp`, `iat`, `nbf`): Supported in both Tyk Classic APIs and Tyk OAS APIs
- **All other claims** (identity claims and custom claims): Available exclusively in Tyk OAS APIs from Tyk 5.10.0 onwards
{{< /note >}}

## JWT Claims Fundamentals

### What are JWT Claims?
A JSON Web Token consists of three parts separated by dots: `header.payload.signature`. The payload contains the claims - a set of key-value pairs that carry information about the token and its subject.

<br>

{{< note success >}}
**Viewing JWT Claims**

To inspect the claims in a JWT, use online tools like [jwt.io](https://jwt.io) for quick debugging
{{< /note >}}

```json
{
  "iss": "https://auth.company.com",
  "aud": "api.company.com", 
  "sub": "user123",
  "exp": 1735689600,
  "iat": 1735603200,
  "department": "engineering",
  "role": "admin"
}
```

Claims serve different purposes:

- **Identity information**: who the token represents (`sub`, `iss`)
- **Access control**: what the token can access (`aud`, custom permissions)
- **Validity period**: when the token is valid (`exp`, `iat`, `nbf`)
- **Business logic**: application-specific data (`department`, `role`)

### Registered vs Custom Claims

Registered Claims are standardized by the JWT specification ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)) and have predefined meanings:

| Claim | Name       | Purpose |
|-------|------------|---------|
| `iss` | Issuer     | Identifies who issued the token |
| `aud` | Audience   | Identifies who the token is intended for |
| `sub` | Subject    | Identifies the subject of the token |
| `exp` | Expiration Time | When the token expires |
| `iat` | Issued At  | When the token was issued |
| `nbf` | Not Before | When the token becomes valid |	
| `jti` | JWT ID     | Unique identifier for the token |

Custom Claims are application-specific and can contain any information relevant to your use case, such as user roles, permissions, department, or metadata.

### How Tyk Processes JWT Claims

After [verifying]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#signature-validation" >}}) that the token hasn't been tampered with, Tyk processes claims in this order:

1. **Claims Extraction**: All claims from the JWT payload are extracted and stored in context variables with the format `jwt_claims_CLAIMNAME`. For example, a claim named `role` becomes accessible as `jwt_claims_role`.

2. **Claims Validation**:
   - [Registered Claims Validation]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#registered-claims-validation" >}}): Checks standard claims against your configuration
   - [Custom Claims Validation]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#custom-claims-validation" >}}): Applies your business rules to custom claims
   - [Authorization]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#managing-authorization" >}}): Uses validated claims to determine API access and apply policies

If any validation step fails, Tyk rejects the request with a specific error message indicating which claim validation failed and why.

## Registered Claims Validation

Tyk can validate the seven registered JWT claims defined in [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1). These claims are grouped into:
- **Temporal claims** (time-based validation): Supported in both Tyk Classic APIs and OAS APIs
- **Identity claims** (content-based validation): Available only in Tyk OAS APIs

### Temporal Claims (exp, iat, nbf)

Temporal claims define when a JWT is valid. Tyk automatically validates these claims when present in the token.

- **Expiration Time (exp)**: the `exp` claim specifies when the token expires (as a Unix timestamp). Tyk rejects tokens where the current time is after the expiration time.
- **Issued At (iat)**: the `iat` claim specifies when the token was issued. Tyk rejects tokens that claim to be issued in the future.
- **Not Before (nbf)**: the `nbf` claim specifies the earliest time the token can be used. Tyk rejects tokens before this time.

#### Clock Skew Configuration

Due to the nature of distributed systems, you may encounter clock skew between your Identity Provider and Tyk servers. You can configure tolerance for timing differences:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          issuedAtValidationSkew: 5      # Allow tokens issued up to 5 seconds in the future
          notBeforeValidationSkew: 2     # Allow tokens to be valid 2 seconds early
          expiresAtValidationSkew: 2     # Allow tokens to be valid 2 seconds past expiration
```

- `expiresAtValidationSkew` allows recently expired tokens to be considered valid
- `issuedAtValidationSkew` allows tokens claiming future issuance to be valid
- `notBeforeValidationSkew` allows tokens to be valid before their `nbf` time

{{< note success >}}
**Note**  

Temporal claim validation and the associated clock skew controls were supported by Tyk prior to 5.10.0 and also for [Tyk Classic APIs]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}})
{{< /note >}}

### Identity Claims (iss, aud, sub, jti)

Identity claims provide information about the token's origin and intended use. Unlike temporal claims, these require explicit configuration to enable validation.

#### Issuer Validation (iss)

Validates that the token was issued by a trusted Identity Provider:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          allowedIssuers:
            - "https://auth.company.com"
            - "https://auth.partner.com"
```

Tyk accepts tokens if the `iss` claim matches any configured issuer. If `allowedIssuers` is empty, no issuer validation is performed.

#### Audience Validation (aud)

Validates that the token is intended for your API:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          allowedAudiences:
            - "api.company.com"
            - "mobile-app"
```

The `aud` claim can be a string or array. Tyk accepts tokens if any audience value matches any configured audience. If `allowedAudiences` is empty, no audience validation is performed.

#### Subject Validation (sub)

Validates the token subject against allowed values:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          allowedSubjects:
            - "user"
            - "service-account"
            - "admin"
```

Useful for restricting API access to specific types of subjects or known entities. If `allowedSubjects` is empty, no subject validation is performed.

#### JWT ID Validation (jti)

Validates that the token contains a unique identifier:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          jtiValidation:
            enabled: true
```

When enabled, Tyk requires the `jti` claim to be present. This is useful for token tracking and revocation scenarios. Note that Tyk does not perform any validation on the content of the claim, only that it is present.

### Configuration Examples

Basic registered claims validation:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          allowedIssuers: ["https://auth.company.com"]
          allowedAudiences: ["api.company.com"]
          jtiValidation:
            enabled: true
          expiresAtValidationSkew: 5
```

Multi-IdP configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          allowedIssuers:
            - "https://auth0.company.com"
            - "https://keycloak.company.com"
          allowedAudiences:
            - "api.company.com"
            - "mobile.company.com"
          subjectClaims: ["sub", "username"]
```

In this example we expect one Identity Provider to present the subject in the `sub` claim, and the other to present it in the `username` claim.

## Custom Claims Validation

Custom claims validation allows you to enforce business-specific rules on JWT tokens beyond the standard registered claims.

**Use Cases**:

- **Role-based access control**: Validate that users have required roles (for example `admin`, `editor` ,`viewer`)
- **Department restrictions**: Ensure users belong to authorized departments
- **Feature flags**: Check if users have access to specific features or API endpoints
- **Geographic restrictions**: Validate user location or region-based access
- **Subscription tiers**: Enforce access based on user subscription levels

### Validation Types

Three distinct validation types are supported by the custom claims validation. These validation types can be applied to any custom claim in your JWT tokens, providing flexible control over your authorization logic.

#### Required

Required type validation ensures that a specific claim exists in the JWT token, regardless of its value.

**Use Cases:**

- Ensuring user metadata is present (even if empty)
- Validating that required organizational fields exist
- Confirming compliance with token structure requirements

**Behavior:**

- ✅ **Passes** if the claim exists with any non-null value (including empty strings, arrays, or objects)
- ❌ **Fails** if the claim is missing or explicitly set to `null`

**Example Configuration:**

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            department:
              type: required
            user_metadata:
              type: required
```

#### Exact Match

Exact match type validation verifies that a claim's value exactly matches one of the specified allowed values.

**Use Cases:**

- Role validation (e.g. `admin`, `editor`, `viewer`)
- Environment-specific access (e.g. `production`, `staging`, `development`)
- Subscription tier validation (e.g. `premium`, `standard`, `basic`)
- Boolean flag validation (`true`, `false`)

**Behavior:**

- ✅ Passes if the claim value exactly matches any value in the allowedValues array
- ❌ Fails if the claim value doesn't match any allowed value, if the claim is missing, or if allowedValues is empty
- Case-sensitive for string comparisons
- Type-sensitive (string "true" ≠ boolean true)

**Example Configuration:**

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            role:
              type: exact_match
              allowedValues:
              - admin
              - editor
              - viewer
            subscription_tier:
              type: exact_match
              allowedValues:
              - premium
              - standard
```

#### Contains

The Contains type validation checks whether a claim's value contains or includes one of the specified values. This validation type works differently depending on the data type of the claim and is particularly useful for array-based permissions and substring matching.

**Use Cases:**

- Permission arrays (`["read:users", "write:posts", "admin:system"]`)
- Tag-based access control
- Partial string matching for departments or locations
- Multi-value scope validation

**Behavior by Data Type:**

Arrays:
- ✅ Passes if the array contains any of the specified values
- ❌ Fails if none of the specified values are found in the array

Strings:
- ✅ Passes if the string contains any of the specified substrings
- ❌ Fails if none of the specified substrings are found

Other Types:
- Converts to string and performs substring matching

Example Configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            permissions:
              type: contains
              allowedValues:
              - admin:system
              - write:api
            department_code:
              type: contains
              allowedValues:
              - ENG
              - SALES
```

With this configuration, a token might contain these claims:

```json
{
  "permissions": ["read:users", "write:posts", "admin:system"],
  "department_code": "ENG-BACKEND",
}
```

In this example:
- `permissions` validation passes because the array contains `"admin:system"`
- `department_code` validation passes because the string contains `"ENG"`

### Data Type Support

The framework is designed to handle the diverse data types commonly found in JWT tokens. The validation behavior adapts intelligently based on the actual data type of each claim, ensuring robust and predictable validation across different token structures.

#### Supported Data Types

##### String Values

String claims are the most common type in JWT tokens and support all three validation types with intuitive behavior.

**Validation behavior**

- **Required**: Passes if the string exists (including empty strings `""`)
- **Exact Match**: Performs case-sensitive string comparison
- **Contains**: Checks if the string contains any of the specified substrings

**Example**

Claims:

```json
{
  "department": "Engineering",
  "user_id": "user123",
  "email": "john.doe@company.com"
}
```

Validation configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            department:
              type: exact_match
              allowedValues:
              - Engineering
              - Sales
              - Marketing
            email:
              type: contains
              allowedValues:
              - "@company.com"
              - "@partner.com"
```

##### Numeric Values

Numeric claims (integers and floating-point numbers) are validated with type-aware comparison logic.

**Validation behavior**

- **Required**: Passes if the number exists (including `0`)
- **Exact Match**: Performs numeric equality comparison (`42` matches `42.0`)
- **Contains**: Converts to string and performs substring matching

**Example**

Claims:

```json
{
  "user_level": 5,
  "account_balance": 1250.75,
  "login_count": 0
}
```

Validation configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            user_level:
              type: exact_match
              allowedValues:
              - 1
              - 2
              - 3
              - 4
              - 5
            account_balance:
              type: required
```

##### Boolean Values

Boolean claims are commonly used for feature flags and permission toggles.

**Validation Behavior**

- **Required**: Passes if the boolean exists (`true` or `false`)
- **Exact Match**: Performs strict boolean comparison
- **Contains**: Converts to string (`"true"` or `"false"`) and performs substring matching

**Example**

Claims:

```json
{
  "is_admin": true,
  "email_verified": false,
  "beta_features": true
}
```

Validation configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            is_admin:
              type: exact_match
              allowedValues:
              - true
            email_verified:
              type: required
```

##### Array Values

Arrays are particularly powerful for permission systems and multi-value attributes.

**Validation behavior**

- **Required**: Passes if the array exists (including empty arrays `[]`)
- **Exact Match**: Checks if the entire array exactly matches one of the allowed arrays
- **Contains**: Checks if the array contains any of the specified values (most common use case)

**Example**

Claims:

```json
{
  "roles": ["user", "editor"],
  "permissions": ["read:posts", "write:posts", "delete:own"],
  "departments": ["engineering", "product"],
  "tags": []
}
```

Validation configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            permissions:
              type: contains
              allowedValues:
              - write:posts
              - admin:system
            roles:
              type: contains
              allowedValues:
              - admin
              - editor
              - moderator
            tags:
              type: required
```

##### Object Values

Complex object claims can be validated, though typically you'll want to validate specific nested properties using [dot notation]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#nested-claims-dot-notation" >}}).

**Validation Behavior**

- **Required**: Passes if the object exists (including empty objects `{}`)
- **Exact Match**: Performs deep object comparison (rarely used)
- **Contains**: Converts to JSON string and performs substring matching

**Example**

Claims:

```json
{
  "user_metadata": {
    "department": "Engineering",
    "level": 5,
    "location": "US"
  },
  "preferences": {}
}
```

Configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            user_metadata:
              type: required
            preferences:
              type: required
```

##### Type Coercion and Edge Cases

**Null and Undefined Values**

- null values: Always fail validation (treated as missing)
- undefined/missing claims: Fail all validation types except when validation is not configured

**Mixed-Type Arrays**

Arrays containing different data types are supported. The `contains` validation will attempt to match values using appropriate type comparison,

```json
{
  "mixed_permissions": ["read", 42, true, "admin"]
}
```

**Type Mismatches**

When the expected value type doesn't match the claim type, Tyk performs intelligent conversion:

- Numbers to strings: `42` become `"42"`
- Booleans to strings: `true` becomes "`true"`
- Objects/arrays to strings: Converted to JSON representation

##### Best Practices

- Be Explicit About Types: When configuring `allowedValues`, use the same data type as expected in the token
- Use Arrays for Multi-Value Validation: Prefer array-based claims for permissions and roles
- Consider Empty Values: Remember that empty strings, arrays, and objects pass `required` validation
- Test Type Coercion: Verify behavior when token types don't match expected types

### Nested Claims (Dot Notation)

JSON Web Tokens often contain complex, hierarchical data structures with nested objects and arrays. Tyk's custom claims validation framework supports dot notation syntax, allowing you to validate specific values deep within nested claim structures without having to validate entire objects.

**Basic Syntax:**

- `user.name` - Access the `name` property within the `user` object
- `metadata.department.code` - Access the `code` property within `department` within `metadata`
- `permissions.api.read` - Access the `read` property within `api` within `permissions`
- `permissions.0.resource` - Access the `resource` property of the first element in the `permissions` array

{{< note success >}}
**Note**  

Array elements can be accessed using numeric indices in dot notation (e.g., `permissions.0.read` for the first element). The index follows the dot notation format rather than bracket notation (`permissions[0]`).

When a nested path doesn't exist (e.g., `user.profile.level` but `profile` doesn't exist) or when an array index is out of bounds (e.g., `permissions.999.resource`), the claim is treated as missing. This will cause validation to fail for blocking rules or generate a warning for non-blocking rules.
{{< /note >}}

#### Nested Array Validation

**Example Token**

```json
{
  "permissions": [
    {
      "resource": "users",
      "actions": ["read", "write"]
    },
    {
      "resource": "reports",
      "actions": ["read"]
    }
  ]
}
```

You can validate specific array elements:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            "permissions.0.resource":
              type: exact_match
              allowedValues: ["users"]
            "permissions.1.actions.0":
              type: exact_match
              allowedValues: ["read"]
```

This allows for precise validation of specific elements within arrays, while the `contains` validation type remains useful for checking array contents without caring about position.

#### Nested Object Validation

The most common use case for dot notation is validating properties within nested objects, such as user metadata, organizational information, or configuration settings.

[OAuth 2.0 Token Exchange](https://datatracker.ietf.org/doc/html/rfc8693#name-act-actor-claim) relies upon nesting for the `act` (actor) claim.

**Example Token**

```json
{
  "user": {
    "name": "John Doe",
    "email": "john.doe@company.com",
    "profile": {
      "department": "Engineering",
      "level": "senior",
      "location": {
        "country": "US",
        "region": "West"
      }
    }
  }
}
```

You could set the following configuration to validate the requester's department and level:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            user.profile.department:
              type: exact_match
              allowedValues:
                - Engineering
                - Sales
                - Marketing
            user.profile.level:
              type: contains
              allowedValues:
                - senior
                - lead
                - principal
```

### Non-blocking Validation

The non-blocking validation feature specifically enables a gradual rollout approach to validation rules by allowing you to monitor validation failures without rejecting requests.

#### How Non-blocking Validation Works

When configured, a validation rule can be set to "non-blocking" mode, which means:

1. If validation passes, the request proceeds normally
2. If validation fails, instead of rejecting the request:
   - A warning is logged to the Tyk Gateway log file at the `WARN` log level
   - The validation process continues to evaluate other custom claims
   - The request is allowed to proceed to the upstream API

This behavior allows you to:

- Monitor how new validation rules would affect traffic without disrupting users
- Gradually roll out stricter validation requirements
- Debug validation issues in production environments

#### Configuring Non-Blocking Mode

Non-blocking mode can be configured for any custom claim validation rule with the addition of the boolean `nonBlocking` flag, for example:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securitySchemes:
        jwtAuth:
          customClaimValidation:
            user.profile.department:
              type: exact_match
              allowedValues:
                - Engineering
                - Sales
                - Marketing
            user.profile.level:
              type: contains
              allowedValues:
                - senior
                - lead
                - principal
            user.preferences.notifications:
              type: required
              nonBlocking: true
```

The `nonBlocking` flag in the validation rule for `user.preferences.notifications` means that if this claim is missing from the received token, the token will not fail validation, but a warning will be logged.
