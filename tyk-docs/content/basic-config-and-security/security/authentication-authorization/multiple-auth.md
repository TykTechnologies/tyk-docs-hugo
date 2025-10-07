---
title: Combine Authentication Methods
description: "How to combine multiple authentication methods in Tyk to enhance security and flexibility."
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Multi Authentication", "Chained Authentication"]
keywords: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Multi Authentication", "Chained Authentication"]
aliases:
---

## Introduction

Tyk allows you to chain multiple authentication methods together so that each authentication must be successful for access to be granted to the API (for example, you can use an Access Token in combination with Basic Auth).

From Tyk 5.10.0, Tyk OAS support includes enhanced flexibility allowing you to create APIs that support various authentication schemes simultaneously (for example, Auth Token or JSON Web Token).

## Common Use Cases

- **Multi-tenant APIs**: Different tenants using different identity providers
- **Migration scenarios**: Supporting both legacy and modern auth during transitions  
- **Partner integrations**: External partners using mTLS while internal users use JWT
- **Mobile + Web**: Different auth methods for different client types

## Basic Concepts

### What is Multi-Auth?

Multi-auth allows an API to accept requests authenticated through different methods. For example, your API could require both API token and an HMAC signature, giving additional security and message reliability.

### Authentication Processing Modes

Tyk OAS offers two processing modes for handling authentication:

- **Legacy Mode** (Default): Maintains backward compatibility with existing Tyk implementations
- **Compliant Mode**: Provides enhanced flexibility with true OR logic between authentication methods

{{< note success >}}
**Note**  

Tyk Classic APIs, and pre-5.10 Tyk OAS APIs only support the legacy mode.
{{< /note >}}

## Getting Started

### Configuring Authentication Processing Mode

The `securityProcessingMode` option in the Tyk Vendor Extension allows you to specify which authentication processing mode to use. This controls how Tyk will interpret the authentication settings in the OpenAPI description and the Vendor Extension.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      securityProcessingMode: compliant // or legacy
```

### Basic Example: API with Multiple Auth Methods

Here's a simple example of an OpenAPI description that declares JWT and API Key security schemes:

```yaml
# Example: API supporting either JWT OR API Key authentication
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: X-API-Key
      in: header
      description: "API key for service-to-service authentication"
    jwt_auth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: "JWT token for user authentication"
security:
  - api_key: []      # Option 1: API key only
  - jwt_auth: []     # Option 2: JWT only
```

- If the `securityProcessingMode` in the Tyk Vendor Extension is set to `compliant`, Tyk will check incoming requests against each `security` option in turn, authenticating requests using Option 1 or Option 2.
- If the `securityProcessingMode` is set to `legacy` (or is omitted), Tyk will check requests only against the first `security` option (Option 1).


### Configuring Multiple Auth Methods in the API Designer

You can configure chained authentication by following these steps:

1. Enable **Authentication** in the **Servers** section

2. Select the **Multiple Authentication Mechanisms** option from the drop-down list.

3. Select the **Authentication Mode** that you wish to use: [Compliant]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth#compliant-mode" >}}) or [Legacy]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth#legacy-mode" >}})

    {{< tabs_start >}}
    {{< tab_start "Compliant mode" >}}

    Select **Compliant mode** for full interpretation of the security requirements declared in the OpenAPI description, allowing for fully flexible authentication of your API clients:
    
    {{< img src="/img/api-management/security/multiple-auth-compliant.png" alt="Select Compliant mode" >}}    
    
    Use the API Editor view to configure the different security schemes and requirements to satisfy the client authentication needs of your API:
    
    {{< img src="/img/api-management/security/multiple-auth-configure_compliant.png" alt="Configure Compliant mode" >}} 

    {{< tab_end >}}
    {{< tab_start "Legacy mode" >}}

    Use Legacy mode for simple scenarios where you can select the **Authentication methods** that the client must satisfy in the request.
    
    You must identify the **Base identity provider** that will provide the session metadata:

    {{< img src="/img/api-management/security/multiple-auth-legacy.png" alt="Select Legacy mode" >}}  

    You can now configure each of the individual authentication methods in the usual manner using the options in the API designer.

    {{< img src="/img/api-management/security/multiple-auth-configure_legacy.png" alt="Configure the Auth Methods for Legacy mode" >}}

    {{< tab_end >}}

    {{< tabs_end >}}  


## Understanding Authentication Modes

### Legacy Mode

The Legacy mode is the traditional implementation of multi-auth supported by Tyk Classic APIs (and Tyk OAS APIs prior to Tyk 5.10).

In the Tyk Classic API, all configured authentication methods must be satisfied in the request - i.e. they are combined using AND logic.

In the Tyk OAS API, only the **first** security requirement object in the OAS `security` array is processed together with any proprietary authentication methods enabled in the Tyk Vendor Extension. All of these methods must be satisfied in the API request - i.e. they are combined using AND logic.

The authentication method that should be used to provide metadata for the session object is determined by the `baseIdentityProvider` setting as explained [here]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth#session-object-handling" >}}).

### Compliant Mode

The Compliant mode is so-named because Tyk complies with the security requirements declared in the OpenAPI description, combining the different authentication methods using AND and OR logic as required.

- All security requirement objects in the OAS `security` array are processed with OR logic
- A request is authorized if any of the defined security requirements are satisfied
- The session object is determined dynamically based on the validated security requirement
- Allows true multi-auth functionality with alternative auth methods working simultaneously

### Choosing the Right Mode

**Use Legacy Mode when:**

- Migrating from or using Tyk Classic APIs
- You need all auth methods to be required (AND logic)

**Use Compliant Mode when:**

- You need alternative auth methods (OR logic)
- Supporting multiple client types or identity providers
- For APIs that need to serve diverse client bases with different security requirements
- Building new APIs with flexible authentication requirements


## Advanced Configuration

### Using Proprietary Auth Methods

Compliant mode allows you to combine standard OpenAPI security schemes with Tyk's proprietary authentication methods by extending the OpenAPI `security` section into the Tyk Vendor Extension:

```yaml
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: Authorization
      in: header
    jwt_auth:
      type: http
      scheme: bearer
      bearerFormat: JWT
security:
  - jwt_auth: []
x-tyk-api-gateway:
  server:
    authentication:
      securityProcessingMode: compliant
      security:
      - - hmac
        - api_key
      - - custom_auth
      securitySchemes:
        hmac:
          enabled: true
        custom_auth:
          enabled: true
          config:
            authType: coprocess
```

The extended security requirements in the vendor extension (`x-tyk-api-gateway.server.authentication.security`) are concatenated onto the requirements declared in the OpenAPI description. This configuration allows three authentication methods: JWT, API Key with HMAC, and Custom Auth.

### Authentication Priority and Session Management

In Compliant mode, authentication methods are tried in the order they appear in the `security` requirements. The first successful authentication method determines the [session properties]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth#session-object-handling" >}}).

## Implementation Details

### How OR Logic Works

When using Compliant mode with multiple security requirements:

- Tyk attempts each authentication method in sequence
- If any method succeeds, the request is authorized
- If all methods fail, the request is rejected with the error from the last attempted method
- Each authentication attempt uses a clean request object to prevent side effects

### Session Object Handling

The [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (determining rate limits, quotas, and access rights) comes from the successful authentication method. This allows different auth methods to have different associated policies and permissions.

When using **Compliant** mode, the first successful authentication method will be used to generate the session object.

When using **Legacy** mode, you must declare which of the authentication methods used in the validation should be used to generate the session object. You declare this *base identity provider* using the [server.authentication.baseIdentityProvider]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) field in the Tyk Vendor Extension (Tyk Classic: `base_identity_provided_by`).

{{< note success >}}
**Note**  

It is important not to set the `baseIdentityProvider` when using the Compliant mode; it should only be configured for Legacy mode.
{{< /note >}}

## Migration Considerations

### Moving from Legacy to Compliant Mode

When migrating from Legacy to Compliant mode:

- Review your API's authentication configuration
- Ensure all required security schemes are properly defined
- Test thoroughly as authentication behavior will change
- Be aware that the session object may come from different sources depending on which auth method succeeds

### Backward Compatibility

*Legacy* mode ensures backward compatibility with existing Tyk implementations. If you're unsure which mode to use, start with *Legacy* mode and migrate to *Compliant* mode when ready.

## Troubleshooting

### Common Issues

#### Authentication Fails Unexpectedly

**Problem**: API returns 401 errors even with valid credentials.

**Possible Causes & Solutions**:

1. Security schemes not properly defined

    ```yaml
    # ❌ Incorrect - missing security scheme definition
    security:
      - api_key: []
    # No corresponding securitySchemes definition

    # ✅ Correct - complete definition
    components:
      securitySchemes:
        api_key:
          type: apiKey
          name: Authorization
          in: header
    security:
      - api_key: []
    ```

2. Security schemes not enabled in Tyk extension

    ```yaml
    x-tyk-api-gateway:
      server:
        authentication:
          securityProcessingMode: compliant
          securitySchemes:
            api_key:
              enabled: true  # ← Must be explicitly enabled
    ```
      
3. Mixed Legacy/Compliant configuration

    - Ensure you're not mixing `baseIdentityProvider` (Legacy) with complex security arrays (Compliant)
    - Check that `securityProcessingMode` matches your intended configuration


#### Wrong Policies or Rate Limits Applied

**Problem**: Requests are authenticated but get unexpected rate limits or access denials.

**Root Cause**: In Compliant mode, the session object comes from whichever authentication method succeeds first.

**Solutions**:

1. Review security requirement order - Place most restrictive auth methods first:

    ```yaml
    security:
      - premium_jwt: []     # Premium users (higher limits)
      - basic_api_key: []   # Basic users (lower limits)
      ```

2. Ensure consistent policies across auth methods:

    - Verify that API keys and JWT tokens for the same user have similar access rights
    - Check that rate limits align with your business logic

3. Debug session source:

    ```bash
    # Enable debug logging to see which auth method succeeded
    "log_level": "debug"
    ```

#### Performance Issues

**Problem**: Slower response times with multiple authentication methods.

**Expected Behavior**: Some performance impact is normal due to additional processing.

**Optimization**:

1. Order security requirements by likelihood:

    ```yaml
    security:
      - most_common_auth: []    # Try most common first
      - fallback_auth: []       # Fallback for edge cases
    ```

2. Monitor authentication attempts:

    ```bash
    # Look for "OR wrapper" log entries showing auth attempts
    grep "OR wrapper" /var/log/tyk/tyk.log
    ```

### Debugging Tips
Enable detailed logging in your Tyk Gateway to see which authentication methods are being attempted and which one succeeds:

```json
{
  "global": {
    "log_level": "debug"
  }
}
```

Look for these log entries:
- `Processing multiple security requirements (OR conditions)`
    - Confirms Compliant mode is active
- `OR wrapper` entries
    - In Compliant mode, this shows which auth methods are being tried
- `BaseIdentityProvider set to`
    - In Legacy mode, this shows which auth method succeeded
