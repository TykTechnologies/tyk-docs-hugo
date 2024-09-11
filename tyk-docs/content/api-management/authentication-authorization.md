---
title: Authentication and Authorization
date: 2017-03-23T15:23:32Z
description: Learn how to apply security options to lock down your APIs with Tyk. Here you will find everything there is to know about Authentication and Authorization in Tyk.
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs"]
aliases:
  - /security/your-apis/
  - /basic-config-and-security/security/authentication-authorization/
  - /basic-config-and-security/security/authentication-&-authorization/
  - /basic-config-and-security/security/authentication--authorization/
---


Tyk offers various authentication and authorization methods to secure your APIs. This page provides an overview of the industry-standard options available, helping you choose what works best for you.

Use Ctrl+F or the sidebar to find specific topics, like “JWT” for JSON Web Tokens or “mTLS” for mutual TLS.

You can also use the links below to jump directly to sections on Tyk-supported methods for securing your APIs.

{{< grid >}}

{{< badge title="OAuth 2.0" href="api-management/authentication-authorization/#set-up-oauth-20-authorization" >}}
Delegate authentication using a widely adopted framework.
{{< /badge >}}

{{< badge title="Bearer Tokens" href="api-management/authentication-authorization/#use-bearer-tokens" >}}
Implement token-based authentication for API access.
{{< /badge >}}

{{< badge title="External OAuth" href="api-management/authentication-authorization/#integrate-external-oauth-middleware" >}}
Integrate with external providers for centralized authentication.
{{< /badge >}}

{{< badge title="HMAC" href="api-management/authentication-authorization/#sign-requests-with-hmac" >}}
Verify message integrity using shared secret keys.
{{< /badge >}}

{{< badge title="JWT" href="api-management/authentication-authorization/#use-json-web-tokens-jwt" >}}
Securely transmit information between parties.
{{< /badge >}}

{{< badge title="mTLS" href="api-management/authentication-authorization/#enable-mutual-tls" >}}
Establish secure channels with two-way certificate verification.
{{< /badge >}}

{{< badge title="Open Access" href="api-management/authentication-authorization/#use-open-keyless-authentication" >}}
Allow unrestricted access for public APIs.
{{< /badge >}}


{{< badge title="Basic Auth" href="api-management/authentication-authorization/#use-basic-authentication" >}}
Secure APIs with username and password credentials.
{{< /badge >}}



{{< /grid >}}

## Set Up OAuth 2.0 Authorization

Tyk offers comprehensive support for OAuth 2.0, providing two main approaches to integrate this authorization framework:

### Option 1: Integrate Your Existing OAuth 2.0 Flow

1. **Manage Tokens Within Your Application:** Utilize your existing OAuth 2.0 implementation or a preferred library to generate and manage tokens.
2. **Create Sessions in Tyk:** Once your API issues a token, create corresponding key sessions within Tyk using the Gateway REST API.
3. **Configure API Access in Tyk:**
    * Set "Auth Token" as your API's authentication mode within Tyk.
    * Configure the "Authorization" header.
    * Consider adding OAuth-specific endpoints (`/access`, `/authorize`) to your API's `ignored_paths` list for direct access if required.

### Option 2: Leverage Tyk as Your OAuth 2.0 Provider

1. **Simplify Authorization with Tyk:** Designate Tyk as your OAuth 2.0 provider, streamlining token generation and management.
2. **Seamless Application Integration:** Integrate your application with Tyk's API and notification endpoints for streamlined OAuth 2.0 functionality.


{{< youtube C4CUDTIHynk >}}


### Supported Grant Types

Tyk offers extensive support for various OAuth 2.0 grant types, catering to diverse use cases:

* Authorization Code
* Refresh Token
* Username and Password
* Client Credentials
* Authorization Token Flow (Ideal for server-side web applications)

### Understanding the OAuth 2.0 Flow within Tyk

* **Client ID Registration:** Begin by registering a unique Client ID within Tyk for each resource owner.
* **Request Validation and User Authentication:** Tyk rigorously validates all incoming OAuth 2.0 requests to ensure they adhere to the standard. Valid requests are then directed to your application’s authorization page for user login and permission granting.
* **Authorization Code Generation and Redirection:** Upon successful authentication, Tyk generates an authorization code, providing your application with a redirect URL for seamless user redirection.
* **Access Token Exchange and Notification:** Clients can then use the generated authorization code to request an access token from Tyk. Upon successful token generation, Tyk notifies your application via webhooks.
* **Simplified Flow for Specific Applications:** Tyk offers a streamlined access token flow, well-suited for mobile and single-page applications, though it does not accommodate refresh tokens.

#### Enabling OAuth 2.0 via the Dashboard

1. **Select OAuth 2.0 for Your API:** In the API Designer, go to the Core Settings tab for your API and choose "OAuth 2.0" as the authentication mode.

   {{< img src="/img/dashboard/system-management/oauth-auth-mode.png" alt="Set Authentication Mode" >}}

2. **Configure Grant Type Settings**: Define allowed access and authorize types aligned with your chosen OAuth 2.0 grant type (e.g., Authorization Code).
3. **Set Redirection URLs:** For grant types involving redirects, provide the OAuth login redirect URL and the OAuth notification URL.
4. **Create an Access Policy:** Establish a policy that explicitly grants access to this API.
5. **Register a New OAuth Client:** Go to the "OAuth Clients" section for your API and add a new client.
     * Specify a valid redirect URI.
     * Associate the client with the access policy you created.

     {{< img src="/img/dashboard/system-management/oauth-api-oauth-clients.png" alt="OAuth Clients" >}}
     {{< img src="/img/dashboard/system-management/oauth-add-new-client.png" alt="Add New OAuth Client" >}}

6. **Access Client Credentials**: After client creation, view the generated Client ID and Secret.

    {{< img src="/img/dashboard/system-management/oauth-client-secret-details.png" alt="View Client ID and Secret" >}}

#### Enabling OAuth 2.0 via an API Definition

For programmatic control, configure OAuth 2.0 directly within your API's JSON definition:

```json
{
  "name": "OAuth Test API",
  // ... other API settings
  "use_oauth2": true,
  "oauth_meta": {
    "allowed_access_types": ["authorization_code", "refresh_token"],
    "allowed_authorize_types": ["code", "token"],
    "auth_login_redirect": "http://yourapp.com/login"
  },
  "notifications": {
    "shared_secret": "your-shared-secret",
    "oauth_on_keychange_url": "http://yourapp.com/oauth_notifications"
  }
  // ... other API settings
}
```

### Manage Quotas and Limits

Utilize Tyk's `/tyk/oauth/authorize-client/` endpoint with the `key_rules` parameter to define key rules for tokens generated during the OAuth flow. These rules encompass rate limits, quotas, expiry times, and access rights:

```json
{
  "allowance": 1000,
  "rate": 1000,
  "per": 60,
  "expires": -1,
  "quota_max": -1,
  "quota_renews": 1406121006,
  "quota_remaining": 0,
  "quota_renewal_rate": 60,
  "access_rights": {
    "APIID1": {
      "api_name": "HMAC API",
      "api_id": "APIID1",
      "versions": [
        "Default"
      ]
    }
  },
  "org_id": "1",
  "oauth_client_id": "client-id-here",
  "hmac_enabled": false,
  "hmac_string": ""
}
```
{{< note success >}}
**Note**  
Instead of passing a `key_rules` parameter when authorizing a client, Tyk can now have an API policy that manages access rules bound to the Client ID doing the accessing, if a bound policy ID is used when generating the OAuth client, when a token is generated for the client then Tyk will generate a token based on the policy data. This is especially useful in generative contexts such as the `client_credentials` grant.
{{< /note >}}

### Configure Notifications

To receive notifications about token changes (e.g., new tokens, refresh tokens) configure the `notifications` section in your API definition:

* `oauth_on_keychange_url`: Set the URL where Tyk will send notifications.
* `shared_secret`:  Use this secret for secure communication between Tyk and your application; the secret is sent as a header (`X-Tyk-Shared-Secret`) with every notification.

Example notification:

```json
{
  "auth_code": "",
  "new_oauth_token": "",
  "refresh_token": "",
  "old_refresh_token": "",
  "notification_type": ""
}
```

{{< note success >}}
**Note**

* **Fine-Grained Access Control:** Manage access using Tyk's built-in access controls, including versioning and named API IDs, going beyond Client ID-based control.
* **Usage Analytics:** Leverage Tyk's analytics capabilities to monitor OAuth 2.0 usage effectively, grouping data by Client ID.
* **Multi-API Access**: Enable access to multiple APIs using a single OAuth token. Configure one API for OAuth 2.0 token issuance and the other APIs with the "Auth Token" method, linking them through a common policy.
{{< /note >}}

### Use Authorization Code Grant

The Authorization Code Grant Type is a widely used OAuth 2.0 flow for web applications. It allows client applications to access user resources securely.

This process requires three steps:

* Redirect to a login page
* Request an authorization code
* Exchange the code for a token

{{< img src="/img/diagrams/diagram_docs_authorization-code-grant-type@2x.png" alt="Authorization grant type flow" >}}

#### Redirect the User to a Login Page

First, the client application must redirect the user to the authorization server's login page. This is where the user will authenticate and authorize the client.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/authorize/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'response_type=code&client_id=ed59158fa2344e94b3e6278e8ab85142&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

**Request:**

| Parameter       | Value                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Method**      | `POST`                                                                                                                                     |
| **URL**         | Uses the special OAuth endpoint `/oauth/authorize` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/authorize`. |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                    |

**Data:**

| Parameter       | Value                                                                                 |
| --------------- | ----------------------------------------------------------------------------------- |
| `response_type` | `code`                                                                                 |
| `client_id`     | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                         |
| `redirect_uri`  | The OAuth client redirect URI, e.g., `http://example.com/client-redirect-uri`, URL encoded as `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`. |

**Response:**

This request generates a `307 Temporary Redirect` to the OAuth client redirect URI. The user is redirected to authenticate and authorize the client, and the data forwarded will be used to request an authorization code.

#### Request an Authorization Code

After the user authorizes the request, the authorization server provides an authorization code. The client application needs to request this code from the authorization server.

```bash
curl -X POST \
  https://admin.cloud.tyk.io/api/apis/oauth/25b854d3fdc84703679f49ea33981aa9/authorize-client/ \
  -H 'Authorization: 70c3d834d46a4d6076e1585b0ef2e93e' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'response_type=code&client_id=ed59158fa2344e94b3e6278e8ab85142&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

**Request:**

| Parameter       | Value                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| **Method**      | `POST`                                                                                                 |
| **URL**         | Uses the Dashboard API client authorization endpoint `/authorize-client/`.                               |
| **Authorization** | The Dashboard user credentials, e.g., `70c3d834d46a4d6076e1585b0ef2e93e`.                         |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                     |

**Data:**

| Parameter       | Value                                                                                 |
| --------------- | ----------------------------------------------------------------------------------- |
| `response_type` | `code`                                                                                 |
| `client_id`     | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                         |
| `redirect_uri`  | The OAuth client redirect URI, e.g., `http://example.com/client-redirect-uri`, URL encoded as `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`. |

**Response:**

The response provides the authorization code as `code` and the redirect URL as `redirect_to`. The client application will use this information to obtain an access token.

```json
{
  "code": "EaG1MK7LS8GbbwCAUwDo6Q",
  "redirect_to": "http://example.com/client-redirect-uri?code=EaG1MK7LS8GbbwCAUwDo6Q"
}
```

#### Exchange the Authorization Code for an Access Token

Once the client application has the authorization code, it can exchange this code for an access token, which is used to access the API.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&client_id=ed59158fa2344e94b3e6278e8ab85142&code=EaG1MK7LS8GbbwCAUwDo6Q&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

**Request:**

| Parameter       | Value                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Method**      | `POST`                                                                                                                                                 |
| **URL**         | Uses the special OAuth endpoint `/oauth/token` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`.            |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with a colon separator.                                      |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                     |

**Data:**

| Parameter       | Value                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `grant_type`     | `authorization_code`                                                                               |
| `client_id`     | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                                    |
| `code`          | The authorization code (`code`) provided in the response to the previous request, e.g., `EaG1MK7LS8GbbwCAUwDo6Q`. |
| `redirect_uri`  | The OAuth client redirect URI, e.g., `http://example.com/client-redirect-uri`, URL encoded as `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`.            |

**Response:**

The response provides the token as `access_token` in the returned JSON, which can then be used to access the API:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```

**Notification:**

This grant will generate a notification sent from the Gateway to the OAuth Notifications URL, containing the OAuth Notifications Shared Secret as a header for verification purposes.

```json
{
  "auth_code": "EaG1MK7LS8GbbwCAUwDo6Q",
  "new_oauth_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "old_refresh_token": "",
  "notification_type": "new"
}
```

### Use Refresh Token Grant

The Refresh Token Grant Type is used to obtain a new access token when the current access token has expired or is about to expire. This allows clients to maintain a valid access token without requiring the user to re-authenticate.

This process involves two main steps:

* Obtain a Refresh Token during the initial authorization.
* Use the Refresh Token to request a new Access Token.

{{< img src="/img/diagrams/diagram_docs_refresh-token-grant-type@2x.png" alt="Refresh Token grant type flow" >}}

#### Obtain a Refresh Token

When you initially request an access token using the Authorization Code Grant Type, you can also receive a refresh token. This refresh token can be used later to obtain a new access token without requiring the user to re-authenticate.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&client_id=ed59158fa2344e94b3e6278e8ab85142&code=EaG1MK7LS8GbbwCAUwDo6Q&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

**Request:**

| Parameter       | Value                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Method**      | `POST`                                                                                                                                                 |
| **URL**         | Uses the special OAuth endpoint `/oauth/token` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`.            |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with a colon separator.                                      |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                     |

**Data:**

| Parameter       | Value                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `grant_type`     | `authorization_code`                                                                               |
| `client_id`     | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                                    |
| `code`          | The authorization code provided in the response to the previous request, e.g., `EaG1MK7LS8GbbwCAUwDo6Q`. |
| `redirect_uri`  | The OAuth client redirect URI, e.g., `http://example.com/client-redirect-uri`, URL encoded as `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`.            |

**Response:**

The response includes an access token, a refresh token, and additional information about the token's lifespan.

```json
{
  "access_token": "abcd1234token",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```

#### Use the Refresh Token to Request a New Access Token

When the access token expires, the client can use the refresh token to obtain a new access token without requiring user interaction.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=refresh_token&refresh_token=NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2&client_id=ed59158fa2344e94b3e6278e8ab85142'
```

**Request:**

| Parameter       | Value                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Method**      | `POST`                                                                                                                                                 |
| **URL**         | Uses the special OAuth endpoint `/oauth/token` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`.            |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with a colon separator.                                      |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                     |

**Data:**

| Parameter       | Value                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `grant_type`     | `refresh_token`                                                                                                  |
| `refresh_token` | The refresh token obtained in the initial authorization, e.g., `NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2`. |
| `client_id`     | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                                                |

**Response:**

The response provides a new access token that can be used to access the API.

```json
{
  "access_token": "new_abcd1234token",
  "expires_in": 3600,
  "token_type": "bearer"
}
```


### Use Client Credentials Grant

The Client Credentials Grant Type is used when the client application needs to access resources on behalf of itself rather than on behalf of a user. This flow is ideal for server-to-server interactions.

The process is only a single step:

* Request an Access Token

{{< img src="/img/diagrams/diagram_docs_client-credentials-grant-type@2x.png" alt="Client Credentials grant type flow" >}}

#### Request an Access Token

The client application authenticates directly with the authorization server using its client credentials (client ID and secret) to request an access token.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=ed59158fa2344e94b3e6278e8ab85142'
```

**Request:**

| Parameter       | Value                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Method**      | `POST`                                                                                                                                                  |
| **URL**         | Uses the special OAuth endpoint `/oauth/token` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`.             |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with colon separator.                                       |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                      |

**Data:**

| Parameter      | Value                                                                                |
| -------------- | -------------------------------------------------------------------------------------- |
| `grant_type`    | `client_credentials`                                                                  |
| `client_id`    | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`.                        |

**Response:**

The response provides an access token that can be used by the client to access resources.

```json
{
  "access_token": "abcd1234token",
  "expires_in": 3600,
  "token_type": "bearer"
}
```

#### Use the Access Token

The client can now use the access token to access the API on behalf of itself.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer abcd1234token'
```

**Request:**

| Parameter       | Value                                                |
| --------------- | ----------------------------------------------------- |
| **Method**      | `GET`                                                 |
| **URL**         | The API endpoint for the protected resource.          |
| **Authorization** | Bearer token, e.g., `Bearer abcd1234token`.         |


### Use Username and Password Grant

The Username and Password Grant Type is used in scenarios where the client application collects the user's credentials directly. This flow is suitable for first-party applications.

The process is only a single step:

* Request an Access Token

{{< img src="/img/diagrams/diagram_docs_username-_-password-grant-type@2x.png" alt="Username and Password grant type flow" >}}

#### Request an Access Token

The client application sends the user's credentials (username and password) to the authorization server in exchange for an access token.

```bash
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&username=user@example.com&password=yourpassword&client_id=ed59158fa2344e94b3e6278e8ab85142'
```

**Request:**

| Parameter       | Value                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Method**      | `POST`                                                                                                                                                 |
| **URL**         | Uses the special OAuth endpoint `/oauth/token` appended to the API URI, e.g., `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`.            |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with colon separator.                                      |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                     |

**Data:**

| Parameter      | Value                                                        |
| -------------- | ----------------------------------------------------------- |
| `grant_type`    | `password`                                                    |
| `username`    | The user's username, e.g., `user@example.com`.               |
| `password`    | The user's password.                                           |
| `client_id`    | The OAuth client ID, e.g., `ed59158fa2344e94b3e6278e8ab85142`. |

**Response:**

The response provides an access token that can be used by the client to access resources.

```json
{
  "access_token": "abcd1234token",
  "expires_in": 3600,
  "token_type": "bearer"
}
```

#### Use the Access Token

The client can now use the access token to access the API on behalf of the user.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer abcd1234token'
```

**Request:**

| Parameter       | Value                                                |
| --------------- | ----------------------------------------------------- |
| **Method**      | `GET`                                                 |
| **URL**         | The API endpoint for the protected resource.          |
| **Authorization** | Bearer token, e.g., `Bearer abcd1234token`.         |

## Use Basic Authentication

Basic Authentication is a straightforward method where the user's credentials (username and password) are sent in an HTTP header encoded in Base64.

### Access a Protected Resource

The client application sends an HTTP request with an `Authorization` header containing the word "Basic" followed by a base64-encoded string of the username and password.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ='
```

**Request:**

| Parameter       | Value                                                           |
| --------------- | -------------------------------------------------------------- |
| **Method**      | `GET`                                                            |
| **URL**         | The API endpoint for the protected resource.                     |
| **Authorization** | Basic authorization using base64 encoded credentials, e.g., `dXNlcm5hbWU6cGFzc3dvcmQ=`. |

## Use Bearer Tokens

Bearer tokens are a type of access token that allows the bearer to access a protected resource. In OAuth 2.0, the token is typically passed in the Authorization header.

### Access a Protected Resource

The client application sends an HTTP request with an `Authorization` header containing the word "Bearer" followed by the access token.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer ACCESS_TOKEN'
```

**Request:**

| Parameter       | Value                                       |
| --------------- | ------------------------------------------ |
| **Method**      | `GET`                                        |
| **URL**         | The API endpoint for the protected resource. |
| **Authorization** | Bearer token, e.g., `Bearer ACCESS_TOKEN`.    |

## Integrate External OAuth Middleware

Tyk can integrate with external OAuth providers to delegate authentication and authorization. This allows you to leverage existing OAuth infrastructures while using Tyk as the API gateway.

### Configure Tyk to Communicate with the External OAuth Provider

Set up Tyk to interact with the external OAuth provider's token introspection endpoint. This allows Tyk to validate tokens issued by providers such as Auth0 or Okta.

**Example:**

* Configure the external OAuth provider's token introspection endpoint in Tyk.
* Set up the necessary client credentials in Tyk's dashboard or configuration file.

### Use the Validated Token to Access Protected Resources

After Tyk validates the token with the external provider, the client can access the protected resources as usual.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer VALIDATED_ACCESS_TOKEN'
```

**Request:**

| Parameter       | Value                                       |
| --------------- | ------------------------------------------ |
| **Method**      | `GET`                                        |
| **URL**         | The API endpoint for the protected resource. |
| **Authorization** | Bearer token, e.g., `Bearer VALIDATED_ACCESS_TOKEN`. |

## Authenticate Using Go Plugins

Go Plugin Authentication allows you to implement custom authentication logic using the Go programming language. This method is useful for scenarios where you need to implement specialized authentication mechanisms that are not natively supported by Tyk.
To learn more about using Tyk Golang Plugins, go [here](plugins/supported-languages/golang/#authentication-with-a-golang-plugin)


## Sign Requests with HMAC

HMAC (Hash-based Message Authentication Code) is a mechanism that allows for verifying the integrity and authenticity of a message. It uses a shared secret key between the client and server to generate a unique hash for each request.

### Generate and Include HMAC Signature in the Request

The client generates an HMAC signature using a shared secret and includes it in the request's `Authorization` header.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: HMAC <calculated-signature>'
```

**Request:**

| Parameter       | Value                                              |
| --------------- | ------------------------------------------------- |
| **Method**      | `GET`                                               |
| **URL**         | The API endpoint for the protected resource.        |
| **Authorization** | HMAC signature, e.g., `HMAC <calculated-signature>`. |

### Server Validates the HMAC Signature

The server regenerates the signature using the same secret and compares it with the one sent by the client. If they match, the request is considered authentic.


## Use JSON Web Tokens (JWT)

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. They are commonly used in API authentication and authorization.

### Protecting an API with JWT

This assumes you’ve already setup an API and are ready to protect it with JWT.

Getting JWT support set up in the Dashboard only requires a few fields to be set up in the Core settings tab:

### Obtain a JWT

The client application receives a JWT after successfully authenticating with the authorization server.

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "bearer"
}
```

### Use the JWT

The client includes the JWT in the Authorization header when making requests to the API.

```bash
curl -X GET \
  https://api.example.com/protected-resource \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Request:**

| Parameter       | Value                                                  |
| --------------- | ----------------------------------------------------- |
| **Method**      | `GET`                                                   |
| **URL**         | The API endpoint for the protected resource.           |
| **Authorization** | Bearer token, e.g., `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`. |

### JWT and Auth0 with Tyk

This will walk you through securing your APIs with JWTs via Auth0. We also have the following video that will walk you through the process.

[![Auth0 JWT Integration](https://img.youtube.com/vi/jm4V7XzbrZw/0.jpg)](https://www.youtube.com/watch?v=jm4V7XzbrZw)

#### Prerequisites

* A free account with Auth0
* A Tyk Self-Managed or Cloud installation

#### Create an Application in Auth0

1. Log in to your Auth0 account.
2. Select APIs from the Applications menu.

   {{< img src="/img/auth0/auth0-create-api.png" alt="Auth0 Create API" >}}

3. Click Create API and enter a name and identifier for your API.

   {{< img src="/img/auth0/api-details.png" alt="Auth0 API details" >}}

4. From the Test tab, follow the instructions on how to get an access token.

   {{< img src="img/auth0/auth0-test-curl.png" alt="Auth0 Test with cURL" >}}

5. From the cURL tab, copy the token request command.

   ```bash
   curl --request POST \
     --url https://dev-yjd8e8u5.us.auth0.com/oauth/token \
     --header 'content-type: application/json' \
     --data '{"client_id":{CLIENT_ID},"client_secret":{CLIENT_SECRET},"audience":{AUDIENCE},"grant_type":"client_credentials"}'
   ```

6. Paste the command in a terminal window to generate your token. Save this token locally.

   ```json
   {
     "access_token": "xxxxxxxxxxx",
     "token_type": "Bearer"
   }
   ```

7. After creating your API, a new Auth0 Application will be created. Go to the Applications section to view it.

   {{< img src="/img/auth0/new-application.png" alt="New Auth0 Application" >}}

8. Copy the Domain from the Basic Information. You will use this when adding an API to Tyk.

   {{< img src="/img/auth0/auth0-basic-info.png" alt="Auth0 Application Basic Information" >}}

#### Create Your API in Tyk

1. Log in to your Tyk Dashboard.
2. Create a new HTTP API (the default `http://httpbin.org` upstream URL is fine).

   {{< img src="/img/auth0/tyk-create-api.png" alt="Tyk Create HTTP API" >}}

3. From the Authentication section, select JSON Web Token (JWT) as your authentication mode.
4. Select RSA public Key as the JWT signing method.
5. Enter your Auth0 Application Domain from Step 8 above to complete the `jwks_uri` endpoint `https://<<your-auth0-domain>>/.well-known/jwks.json`
6. Copy your `jwks_uri` into the Public Key field.

   {{< img src="/img/auth0/tyk-api-auth.png" alt="Tyk API Authentication" >}}

7. Add an Identity Source and Policy Field Name. The defaults of `sub` and `pol` are fine.
8. Save your API.
9. From the System Management section, select Policies.
10. Click Add Policy.
11. Select your Auth0 API.

    {{< img src="/img/auth0/tyk-api-auth.png" alt="Tyk Policy access rights" >}}

12. You can keep the rest of the access rights at the defaults.
13. Click the Configurations tab and enter a Policy Name and a Keys Expiry after the period.

    {{< img src="/img/auth0/policy-access-rights.png" alt="Tyk Policy Configuration" >}}

14. Click Create Policy.
15. Edit your JWT Auth0 API and add the policy you created as the Default Policy from the Authentication section.

    {{< img src="/img/auth0/api-default-policy.png" alt="Tyk API Default Policy Configuration" >}}

16. From the top of the API, copy the API URL.
17. From a terminal window, use the API URL and the Auth0 generated token.

    ```bash
    curl -X GET {API URL}  -H "Accept: application/json" -H "Authorization: Bearer {token}"
    ```

    If using the `httpbin` upstream URL as in the example Tyk API, you should see the HTML returned for the httpbin service in your terminal.

    If there is an error with the request, you will see the following error message.

    ```json
    {
      "error": "Key not authorized: Unexpected signing method."
    }
    ```

### JWT and Keycloak with Tyk

This guide will walk you through securing your APIs with JWTs via Keycloak.

#### Prerequisites

* A Keycloak installation
* A Tyk Self-Managed or Cloud installation

#### Create an Application in Keycloak

1. Access your Keycloak admin dashboard.
2. Navigate to the Administration console.

   {{< img src="/img/keycloak-jwt/navigate-to-admin-console.png" alt="Navigate to Keycloak Administration console" >}}

3. Create a Keycloak realm from the top left-hand side dropdown.

   {{< img src="/img/keycloak-jwt/create-jwt-realm.png" alt="Create Keycloak Realm" >}}

4. Create a Keycloak client.

   {{< img src="/img/keycloak-jwt/create-client.png" alt="Create Client" >}}

5. Enter the necessary client details.

   {{< img src="/img/keycloak-jwt/create-client-step-1.png" alt="Add client details" >}}

6. Enable client authentication and Service account roles under Authentication flow.

   {{< img src="/img/keycloak-jwt/create-client-step-2.png" alt="Update client permissions" >}}

7. Set the redirection URL rules.

   {{< img src="/img/keycloak-jwt/create-client-step-3.png" alt="Add redirection URL rules" >}}

8. Save.

   {{< img src="/img/keycloak-jwt/client.png" alt="Example client" >}}

9. Retrieve the client secret from the Credentials tab under the client you just created.

   {{< img src="/img/keycloak-jwt/client-secret.png" alt="Retrieve client secret" >}}

10. Generate your JWT using `curl`. This is the token you will use to access your services through the Tyk Gateway. You can generate your JWT using either of the following methods. Make sure to replace the `KEYCLOAK` prefixed parameters with the appropriate values.

    **Password Grant Type:**

    ```bash
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
       -H 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'client_id=KEYCLOAK_CLIENT_ID' \
       --data-urlencode 'grant_type=password' \
       --data-urlencode 'client_secret=KEYCLOAK_SECRET' \
       --data-urlencode 'scope=openid' \
       --data-urlencode 'username=KEYCLOAK_USERNAME' \
       --data-urlencode 'password=KEYCLOAK_PASSWORD'
    ```

    **Client Credentials Grant Type:**

    ```bash
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
       -H 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'client_id=KEYCLOAK_CLIENT_ID' \
       --data-urlencode 'grant_type=client_credentials' \
       --data-urlencode 'client_secret=KEYCLOAK_SECRET'
    ```

    A typical response will look something like this:

    ```json
    {
       "access_token": "...", 
       "expires_in": 300,
       "refresh_expires_in": 1800,
       "refresh_token": "...",
       "token_type": "Bearer",
       "id_token": "...",
       "not-before-policy": 0,
       "session_state": "...",
       "scope": "openid profile email"
    }
    ```

#### Create Your API in Tyk

1. Log in to your Tyk Dashboard.
2. Create a new HTTP API (the default `http://httpbin.org` upstream URL is fine).

   {{< img src="/img/keycloak-jwt/create-api-step-1.png" alt="Create a new HTTP API" >}}

3. Scroll to the Authentication mode section and select JWT from the list.
4. Select RSA public Key as JWT Signing method.
5. Add your JSON Web Key Sets (JWKS) URL in the Public Key box. This can be found through the well-known config endpoint or is typically `https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/certs`.
6. Add an Identity Source and Policy Field Name. The defaults of `sub` and `pol` are fine.
7. Click on the update button to save the API.

   {{< img src="/img/keycloak-jwt/create-api-step-2.png" alt="Create API" >}}

8. Create a policy to manage access to your API.
9. Navigate to the Policies section on the left-hand side menu.
10. Click on Add Policy on the top right-hand side of your screen.
11. Select your API from the Add API Access Rights list.

   {{< img src="/img/keycloak-jwt/create-policy-step-1.png" alt="Select API for Security Policy" >}}

12. Click on the Configurations tab and choose a policy name and TLL.

    {{< img src="/img/keycloak-jwt/create-policy-step-2.png" alt="Create API Security Policy" >}}
    {{< img src="/img/keycloak-jwt/create-policy-step-3.png" alt="API Security Policy Result" >}}

13. Add the default policy to the API.

    {{< img src="/img/keycloak-jwt/create-api-step-3.png" alt="Add default policy to API" >}}

14. Test access to the API using curl.
15. Retrieve the API URL.

    {{< img src="/img/keycloak-jwt/create-api-step-4.png" alt="Add default Policy to API" >}}

16. Test with curl. Make sure to replace `TOKEN` with the JWT you received from the curl earlier.

    ```bash
    curl 'http://tyk.gateway.local/keycloak-jwt/get' \
        -H "Authorization: Bearer TOKEN"
    ```

#### Running in k8s

If you are looking to POC this functionality in Kubernetes, you can run a fully worked-out example using our tyk-k8s-demo library. You can read more [here]({{< ref "getting-started/quick-start/tyk-k8s-demo" >}}).

### Split Token

OAuth2, OIDC, and their foundation, JWT, have been industry standards for many years and continue to evolve, particularly with the iterative improvements in the OAuth RFC, aligning with FHIR and Open Banking principles. The OAuth flow remains a dominant approach for secure API access.

In the OAuth flow, two types of access tokens are commonly used: opaque and JWT (more precisely, JWS). However, the use of JWTs has sparked debates regarding security, as JWTs can leak information when base64 decoded. While some argue that JWTs should not contain sensitive information, others consider JWTs inherently insecure for authorization.

#### Introduction to Split Token Flow

JWT Access Tokens can carry sensitive information, making them vulnerable if compromised. The Split Token Flow offers a solution by storing only the JWT signature on the client side while keeping the header and payload on the server side. This approach combines the flexibility of JWTs with the security of opaque tokens, ensuring that sensitive data is not exposed.

#### How Tyk Implements Split Token Flow

Tyk API Gateway is well-positioned to broker the communication between the client and the authorization server. It can handle requests for new access tokens, split the JWT, and return only the signature to the client, storing the rest of the token internally.

Here’s how you can implement the Split Token Flow using the client credentials flow:

**Request a JWT Access Token:**

```bash
$ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' \
https://keycloak-host/auth/realms/tyk/protocol/openid-connect/token \
-d grant_type=client_credentials \
-d client_id=efd952c8-df3a-4cf5-98e6-868133839433 \
-d client_secret=0ede3532-f042-4120-bece-225e55a4a2d6 -s | jq
```

This request returns a JWT access token.

**Split the JWT:**

The JWT consists of three parts:

* Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
* Payload: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSJ9`
* Signature: `EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0`

Using the Split Token Flow, only the signature is returned to the client, while the header and payload are stored server-side by Tyk.

{{< img src="/img/2.10/split_token2.png" alt="Split Token Example" >}}

**Creating a Virtual Endpoint in Tyk:**

Create a virtual endpoint or API in Tyk to handle the token request. This endpoint receives the auth request, exchanges credentials with the authorization server, and returns the split token.

**Example script for the Virtual Endpoint:**

```javascript
function login(request, session, config) {
    var credentials = request.Body.split("&")
        .map(function(item, index) {
            return item.split("=");
        }).reduce(function(p, c) {
            p[c[0]] = c[1];
            return p;
        }, {});

    var newRequest = {
        "Headers": {"Content-Type": "application/x-www-form-urlencoded"},
        "Method": "POST",
        "FormData": {
            grant_type: credentials.grant_type,
            client_id: credentials.client_id,
            client_secret: credentials.client_secret
        },
        "Domain": "https://keycloak-host",
        "resource": "/auth/realms/tyk/protocol/openid-connect/token",
    };

    var response = TykMakeHttpRequest(JSON.stringify(newRequest));
    var usableResponse = JSON.parse(response);

    if (usableResponse.Code !== 200) {
        return TykJsResponse({
            Body: usableResponse.Body,
            Code: usableResponse.Code
        }, session.meta_data)
    }

    var bodyObj = JSON.parse(usableResponse.Body);
    var accessTokenComplete = bodyObj.access_token;
    var signature = accessTokenComplete.split(".")[2];

    log("completeAccessToken: " + accessTokenComplete);

    // Create key inside Tyk
    createKeyInsideTyk(signature, bodyObj);

    // Override signature
    bodyObj.access_token = signature;
    delete bodyObj.refresh_expires_in;
    delete bodyObj.refresh_token;
    delete bodyObj.foo;

    var responseObject = {
        Body: JSON.stringify(bodyObj),
        Code: usableResponse.Code
    }
    return TykJsResponse(responseObject, session.meta_data);
}
```

This script handles the login process, splits the JWT, and stores the necessary information in Tyk.

Once the setup is complete, you can test the Split Token Flow by making API calls using the opaque token returned by the virtual endpoint. Tyk will validate the token and reconstruct the full JWT for upstream services.

```bash
$ curl localhost:8080/basic-protected-api/get -H "Authorization: MEw….GJ0"
```

This request uses the opaque token, which Tyk validates and then injects the full JWT into the Authorization header for the API request.

{{< img src="/img/2.10/split_token3.png" alt="Split Token Key Metadata" >}}

{{< img src="/img/2.10/split_token1.png" alt="Split Token API Injection" >}}

## Combine Authentication Methods

### Multiple (Chained) Authentication

As of Tyk v2.3, it is possible to have multiple authentication middleware chained together. For example, you can use an Access Token in combination with Basic Auth or with a JSON Web Token. Below is a video demonstration of this functionality:

[![alt text](https://img.youtube.com/vi/vYGYYXcJ6Wc/0.jpg)](https://www.youtube.com/watch?v=vYGYYXcJ6Wc)

#### Enable Multi (Chained) Authentication with the Dashboard

To enable multi-chained authentication in your GUI, follow these steps:

1.  Browse to the "Authentication" Section

    First, navigate to the Endpoint Designer and view the "Core Settings" tab. In this section, you can choose various authentication methods. For this setup, you will configure multiple auth providers, which works slightly differently than setting up a single auth method.

2.  Select the Multiple Auth Mechanisms Option

    Select the Use Multiple Auth Mechanisms option from the drop-down list. This will open a window that provides checkboxes for each supported auth type to be chained. Note that it is not possible to set the order of chained auth methods.

    {{< img src="/img/2.10/multiple_auth_methods.png" alt="Select Multiple Auth" >}}

3.  Select Your Preferred Auth Methods and Base Identity Provider

    Choose the authentication methods you want to chain together and select the base identity provider. The baseline provider will be the one that provides the current request context with the session object, defining the "true" access control list, rate limit, and quota to apply to the user.

    {{< img src="/img/2.10/select_multiple_auth_methods.png" alt="Select Auth Methods" >}}

    Once these are set up, you will see the traditional configuration screens for each of the auth methods selected in the checkboxes. Configure them as you would regular authentication modes.

#### Enable Multi (Chained) Authentication in Your API Definition

To enable this mode, set the `base_identity_provided_by` field in your API Definitions to one of the supported chained enums below:

*   `AuthToken`
*   `HMACKey`
*   `BasicAuthUser`
*   `JWTClaim`
*   `OIDCUser`
*   `OAuthKey`
*   `UnsetAuth`

The provider set here will then be the one that provides the session object that determines rate limits, ACL rules, and quotas.

Tyk will chain the auth mechanisms as they appear in the code and will default to an auth token if none are specified. You can explicitly set auth token support by setting `use_standard_auth` to `true`.


## Revoke OAuth Tokens

OAuth tokens can be revoked by the client or server when they are no longer needed, preventing further access to the protected resources.

### Submit a Request to Revoke the Token

The client or server sends a request to the authorization server’s revocation endpoint to invalidate the token.

```bash
curl -X POST \
  https://auth-server.com/oauth2/revoke \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'token=ACCESS_TOKEN&token_type_hint=access_token&client_id=CLIENT_ID&client_secret=CLIENT_SECRET'
```

**Request:**

| Parameter       | Value                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Method**      | `POST`                                                                                                                                                 |
| **URL**         | The revocation endpoint of the authorization server.                                                                                                    |
| **Authorization** | Basic authorization, using the client ID and client secret of the OAuth client base64 encoded with colon separator.                                      |
| **Content-Type** | `application/x-www-form-urlencoded`                                                                                                                     |

**Data:**

| Parameter         | Value                                       |
| ----------------- | ------------------------------------------ |
| `token`           | The access token to revoke, e.g., `ACCESS_TOKEN`. |
| `token_type_hint` | The type of token being revoked, typically `access_token`. |
| `client_id`       | The OAuth client ID, e.g., `CLIENT_ID`.    |
| `client_secret`    | The client secret, e.g., `CLIENT_SECRET`.    |

## Use Open (Keyless) Authentication

Open or keyless authentication allows access to APIs without any authentication. This method is suitable for public APIs where access control is not required.

### Configure the API as Open or Keyless in Tyk

In Tyk, configure the API to not require any authentication for access.
To implement keyless access, simply set the flag in your API Definition:

```{.copyWrapper}
{
  ...
  "use_keyless": true,
  "auth": {
      "auth_header_name": ""
  },
  ...
}
```
This will stop checking keys that are proxied by Tyk.

{{< note success >}}
**Note**  

Keyless APIs cannot be selected for [Access Rights]({{< ref "getting-started/create-security-policy" >}}) in a security policy.
{{< /note >}}

### Request a Public Resource

Access the API directly without any authentication tokens or credentials.

```bash
curl -X GET \
  https://api.example.com/public-resource
```

**Request:**

| Parameter | Value                                  |
| ---------- | ------------------------------------- |
| **Method**  | `GET`                                   |
| **URL**     | The API endpoint for the public resource. |


**Request:**

| Parameter       | Value                              |
| --------------- | ---------------------------------- |
| **Method**      | `GET`                                |
| **URL**         | The API endpoint for the protected resource. |
| **Authorization** | Bearer token, e.g., `Bearer ID_TOKEN`. |

## Set Physical Key Expiry and Deletion

Tyk supports managing API keys with specific expiry dates and allows for the deletion of keys when they are no longer needed. This ensures that access to your APIs is properly controlled and limited to authorized users.

### Configure Key Expiry in Tyk

Set an expiry date for API keys during their creation or update.

**Example Configuration:**

```json
{
  "key": "USER_API_KEY",
  "expires": 1625151600,
  "delete": true
}
```

### Automatically or Manually Delete Expired Keys

Tyk can be configured to automatically delete expired keys, or you can manually delete them through the Tyk dashboard or API.

## Use Python CoProcess and JSVM Plugin Authentication

Tyk allows for custom authentication logic using Python and JavaScript Virtual Machine (JSVM) plugins. This method is useful for implementing unique authentication mechanisms that are tailored to your specific requirements.

* See [Custom Authentication with a Python plugin]({{< ref "plugins/supported-languages/rich-plugins/python/custom-auth-python-tutorial" >}}) for a detailed example of a custom Python plugin.
* See [JavaScript Middleware]({{< ref "plugins/supported-languages/javascript-middleware" >}}) for more details on using JavaScript Middleware. 

## Enable Mutual TLS

Mutual TLS (mTLS) is a robust security feature that ensures both the client and server authenticate each other using TLS certificates. This two-way authentication process provides enhanced security for API communications by verifying the identity of both parties involved in the connection.

### Why Use Mutual TLS?

Mutual TLS is particularly valuable in environments where security is paramount, such as microservices architectures, financial services, healthcare, and any scenario requiring zero-trust security. It not only encrypts the data in transit but also ensures that the communicating parties are who they claim to be, mitigating the risks of unauthorized access and data breaches.

### Concepts

#### How Does Mutual TLS Work?

Mutual TLS operates by requiring both the client and server to present and verify TLS certificates during the handshake process. Here’s how it works:

**Client Authentication:**

1. When a client attempts to connect to the server, the server requests the client’s TLS certificate.
2. The client provides its certificate, which the server verifies against a trusted Certificate Authority (CA).

**Server Authentication:**

1. Simultaneously, the client also verifies the server’s certificate against a trusted CA.

This mutual verification ensures that both parties are legitimate, securing the connection from both ends.

#### Benefits of Mutual TLS

* **Enhanced Security:** Provides two-way authentication, ensuring both the client and server are verified and trusted.
* **Data Integrity:** Protects the data exchanged between client and server by encrypting it, preventing tampering or interception.
* **Compliance:** Helps meet stringent security and compliance requirements, especially in regulated industries.

### Client mTLS

There are two ways to set up client mTLS in Tyk: static and dynamic. Each method is suited to different use cases, as outlined below:

| Use Case                                                           | Static | Dynamic |
| ------------------------------------------------------------------ | :----: | :-----: |
| Let developers upload their own public certificates through the Developer Portal |   ❌    |   ✅      |
| Combine client mTLS with another authentication method           |   ✅    |   ✅      |
| Allow certs at the API level (one or more APIs per cert)           |   ✅    |   ❌      |
| Allow certs at an individual level (one or more APIs per cert)     |   ❌    |   ✅      |

#### Dynamic Client mTLS

Dynamic Client mTLS in Tyk allows you to authenticate users based solely on the provided client certificate, without the need for an additional authentication key. Tyk can identify the user, apply policies, and monitor usage just as with regular API keys.

##### Protect the API

In the API Designer, set the Authentication Type to Auth Token under Target Details > Authentication mode. Then select Enable Client Certificate.

{{< img src="/img/2.10/client_cert.png" alt="Enable Client Certificate" >}}

##### Generate a Self-Signed Key Pair

If you don’t already have a certificate, generate a self-signed key pair using the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

##### Add a Key through the Dashboard

In the Tyk Dashboard, add a key for the API you set up in step #1. When uploading the certificate, ensure you only upload the public certificate.


{{< note success >}}
**Note**  
The certificate you upload for this key must only be the public certificate.
{{< /note >}}


##### Make an API Request Using the Certificate

Now you can make a cURL request to the API using the certificate and private key:

```bash
curl -k --cert cert.pem --key key.pem https://localhost:8080/mtls-api/my-endpoint
```

A successful request should return a 200 response.

##### Allow Developers to Upload Certificates

Instead of manually creating keys, you can allow developers to upload their own certificates via the Developer Portal.

1. **Create a Policy:** Create a policy for the API you set up earlier.
2. **Create a Catalog Entry:** Create a catalog entry for this policy.
3. **Request a Key through the Portal:** As a developer, request a key for the API through the Portal. This will present a screen where the developer can upload their public certificate.

   {{< img src="/img/2.10/client_mtls_add_cert.png" alt="Add Key Certificate" >}}

4. **Make an API Request Using the Uploaded Certificate:** After adding the public certificate, developers can make API requests using their cert + private key:

   ```bash
   curl -k --cert cert.pem --key key.pem https://localhost:8080/mtls-api/my-endpoint
   ```

   A successful request should return a 200 response.

#### Static mTLS

Static mTLS allows client certificates to be used at the API level. This method is straightforward and can be combined with another authentication method if needed.

##### Configure the API

In the API authentication settings, choose mTLS as the authentication type and optionally select an additional authentication method. If you want to use only client certificates without another authentication method, select "keyless" as the other option.

##### Set the Base Identity

The base identity can be anything, as the client certificate will be the primary authentication method.

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="Portal Certificate Request" >}}

##### FAQ

*   **Why am I getting an error stating that certificates are not enabled for this API?**

    This issue can occur because client mTLS is an extension of Auth Token authentication mode. To enable this feature, ensure the API definition has `auth.use_certificate` set to `true`.

*   **Can I upload a full certificate chain when creating a key for dynamic client mTLS?**

    Yes, you can do this when manually creating a key as an Admin Dashboard user. However, through the Portal, you must upload only the public key (certificate).

*   **Can I use a root CA with client mTLS?**

    Yes, Tyk allows you to upload a root CA certificate for static mTLS authentication. This setup allows clients with certificates signed by the registered CA to be validated.

    **Key Points:**

    *   The root CA certificate can be uploaded as a client certificate.
    *   Clients presenting certificates signed by this CA will be validated.
    *   Tyk traverses the certificate chain for validation.
    {{< note success >}}
      **Note** 
      Root CA certificates are compatible only with Static mTLS and not with Dynamic mTLS.
    {{< /note >}}
    

### Upstream mTLS

If your upstream API is protected with mutual TLS (mTLS), you can configure Tyk to send requests with the specified client certificate. This ensures secure communication between Tyk and your upstream services.

#### Key Features of Upstream mTLS

*   **Certificate Per Host:** You can specify one certificate per host and define a default certificate.
*   **API-Level or Global Configuration:** Upstream certificates can be defined at the API level or globally via the Gateway configuration file.
*   **JSVM Middleware Support:** Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware.

#### How To Set Up Upstream mTLS

To set up upstream mTLS in your API definition, you should configure the `upstream_certificates` field in the following format:

```json
{
  "upstream_certificates": {
    "example.com": "<cert-id>"
  }
}
```

If you want to configure this at a global level, specify it via the `security.certificates.upstream` field in your Gateway configuration file.

#### Via Dashboard

To configure upstream mTLS using the Tyk Dashboard:

1.  Navigate to the API Designer.
2.  Go to the Advanced Options panel.
3.  Find the Upstream Certificates section and attach the appropriate certificate.

    {{< img src="/img/2.10/client_mtls_multiple_auth.png" alt="Static mTLS Configuration" >}}

#### Domain Configuration

When specifying the domain for the upstream certificate, do **NOT** include the protocol (e.g., `https://`). Including the protocol will prevent Tyk from matching the certificates to the correct domain.

**Incorrect:** `https://api.production.myupstream.com`

**Correct:** `api.production.myupstream.com`

If the request is made via a non-standard HTTP port, you need to include the port in the domain:

**Correct:** `api.production.myupstream.com:8443`

#### Wildcards

You may use wildcards in combination with text to match the domain, but this only works one level deep.

For example, if your domain is `api.production.myupstream.com`:

**Correct:** `*.production.myupstream.com`

**Incorrect:** `*.myupstream.com`

#### Default Upstream Certificate

To set a default client certificate, use `*` instead of a domain name:

```json
{
  "upstream_certificates": {
    "*": "<cert-id>"
  }
}
```

This configuration will apply the specified certificate to all upstream requests that do not match a more specific domain.

## Conclusion

Tyk empowers you to safeguard your APIs effectively with its wide array of industry-standard authentication and authorization methods, offering the flexibility to choose the best fit for your security needs.

This revised structure aims to:

* **Provide a Clear Overview:** Introduce all authentication methods upfront.
* **Maintain Technical Depth:** Retain all original details, including code snippets, configuration steps, and explanations.
* **Emphasize User Actions:** Frame subheadings around what users can *do* with each method.
