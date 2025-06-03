---
title: Setting Up JWT Authentication
date: 2025-05-29
description: A comprehensive guide to setting up JWT authentication with Tyk
tags: ["Authentication", "JWT", "JSON Web Tokens", "Setup Guide"]
keywords: ["Authentication", "JWT", "JSON Web Tokens", "Setup", "Configuration", "Guide"]
---

## Introduction

This guide provides step-by-step instructions for setting up JSON Web Token (JWT) authentication with Tyk API Gateway. JWT is a popular standard for securing APIs with token-based authentication that allows you to securely transmit information between parties as a JSON object.

## Prerequisites

Before you begin, ensure you have:

- A running Tyk Gateway installation (Self-Managed or Cloud)
- Access to the Tyk Dashboard
- Basic understanding of JWT concepts

## Step 1: Create an API in Tyk Dashboard

1. Log in to your Tyk Dashboard
2. Navigate to the **APIs** section and click **Add New API**
3. Enter a name for your API and configure the upstream URL (e.g., `http://httpbin.org`)
4. Click **Save**

## Step 2: Configure JWT Authentication

1. In your API configuration, navigate to the **Authentication** section
2. Select **JSON Web Token (JWT)** as the authentication mode

   ![JWT Authentication Selection](/img/api-management/security/jwt-auth-settings.png)

3. Configure the JWT settings:

### JWT Signing Method Options

Choose one of the following signing methods:

#### Option 1: HMAC Shared Secret (Simplest Method)

1. Select **HMAC (shared)** as the signing method
2. Enter your shared secret (e.g., `tyk123`)
3. Set the **Identity Source** (default: `sub`) - This claim will be used to identify the token
4. Set the **Policy Field Name** (default: `pol`) - This claim will contain the policy ID

#### Option 2: RSA Public Key

1. Select **RSA public key** as the signing method
2. Paste your RSA public key in PEM format
3. Set the **Identity Source** and **Policy Field Name**

   To generate an RSA key pair:
   ```bash
   openssl genrsa -out private_key.pem 2048
   openssl rsa -in private_key.pem -pubout -out public_key.pem
   ```

#### Option 3: JWKS URL (Recommended for Production)

1. Select **JWKS URL** as the signing method
2. Enter the JWKS endpoint URL (e.g., `https://your-auth-server/.well-known/jwks.json`)
3. Set the **Identity Source** and **Policy Field Name**

## Step 3: Configure a Default Policy

Setting a default policy ensures that all authenticated JWT requests have a baseline access level:

1. Navigate to **System Management > Policies**
2. Click **Add Policy**
3. Select the API you created in Step 1
4. Configure access rights as needed
5. Save the policy
6. Return to your API configuration
7. In the JWT authentication settings, select your newly created policy as the **Default Policy**

## Step 4: Save Your API Configuration

Click **Update** to save your API configuration with JWT authentication enabled.

## Step 5: Generate a JWT for Testing

You can generate a test JWT using various methods:

### Option 1: Using jwt.io

1. Visit [https://jwt.io/](https://jwt.io/)
2. In the Payload section, ensure you have the appropriate claims:
   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "pol": "YOUR_POLICY_ID",
     "iat": 1516239022
   }
   ```
3. In the Verify Signature section, enter your secret (for HMAC) or key pair (for RSA)
4. Copy the generated token

### Option 2: Using Command Line

For HMAC-signed tokens:

```bash
# Install the jwt-cli tool if needed
npm install -g jwt-cli

# Generate a token
jwt sign --secret tyk123 --sub "1234567890" --data '{"pol":"YOUR_POLICY_ID"}'
```

## Step 6: Test Your JWT-Protected API

Use the generated JWT to make a request to your protected API:

```bash
curl http://your-tyk-gateway/your-api-endpoint \
  --header "Authorization: Bearer YOUR_JWT_TOKEN"
```

If successful, you should receive a response from your API. If not, check the Tyk logs for error messages.

## Advanced JWT Configuration

### JWT Scope to Policy Mapping

You can map JWT scopes to different policies for fine-grained access control:

1. In your API definition, add the following configurations:

   ```json
   {
     "jwt_scope_to_policy_mapping": {
       "admin": "ADMIN_POLICY_ID",
       "developer": "DEVELOPER_POLICY_ID"
     },
     "jwt_scope_claim_name": "scope"
   }
   ```

2. Your JWT payload should include a scope claim:

   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "scope": "admin developer"
   }
   ```

### Setting Clock Skew

To handle time differences between servers:

1. Add the following to your API definition:

   ```json
   {
     "jwt_issued_at_validation_skew": 60,
     "jwt_expires_at_validation_skew": 60,
     "jwt_not_before_validation_skew": 60
   }
   ```

   This allows for a 60-second skew in each direction.

## Integration with Identity Providers

### Auth0 Integration

1. Create an API in Auth0
2. Configure your Tyk API with JWT authentication using the JWKS URL:
   - JWT Signing Method: JWKS URL
   - Public Key: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`

### Keycloak Integration

1. Create a realm and client in Keycloak
2. Configure your Tyk API with JWT authentication using the JWKS URL:
   - JWT Signing Method: JWKS URL
   - Public Key: `https://YOUR_KEYCLOAK_URL/realms/YOUR_REALM/protocol/openid-connect/certs`

## Troubleshooting

### Common JWT Errors

1. **"Key not authorized"**: The JWT signature verification failed. Check your signing method and keys.

2. **"Token is not valid yet"**: The JWT's `nbf` (Not Before) claim indicates a future time. Check for clock skew.

3. **"Token has expired"**: The JWT's `exp` (Expiration) claim indicates the token has expired.

4. **"Policy not found"**: The policy ID in the JWT doesn't match any policy in Tyk.

### Debugging Tips

1. Check Tyk Gateway logs for detailed error messages
2. Verify your JWT structure using [jwt.io](https://jwt.io/)
3. Ensure your policy IDs match between the JWT and Tyk Dashboard
4. Test with a simpler JWT configuration (like HMAC) before using more complex setups

## Conclusion

You have now successfully set up JWT authentication for your API with Tyk Gateway. This provides a secure, token-based authentication system that can integrate with various identity providers and support complex authorization scenarios.

For more information about JWT with Tyk, see the [JSON Web Tokens documentation]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}).
