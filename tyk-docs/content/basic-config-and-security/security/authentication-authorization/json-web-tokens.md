---
title: JSON Web Tokens (JWT)
date: 2025-01-10
description: How to configure JSON Web Tokens in Tyk
tags: ["Authentication", "JWT", "JSON Web Tokens"]
keywords: ["Authentication", "JWT", "JSON Web Tokens"]
aliases:
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-auth0
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/jwt-keycloak
  - /basic-config-and-security/security/authentication-authorization/json-web-tokens/split-token
  - /advanced-configuration/integrate/api-auth-mode/json-web-tokens
  - /security/your-apis/json-web-tokens
  - /tyk-apis/tyk-gateway-api/api-definition-objects/jwt/docs/basic-config-and-security/security/authentication-authorization/json-web-tokens
---

## Introduction

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. They are commonly used in API authentication and authorization.

## Configuring your API to use JWT authentication

The OpenAPI Specification treats JWT authentication as a variant of [bearer authentication](https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/) in the `components.securitySchemes` object using the `type: http`, `scheme: bearer` and `bearerFormat: jwt`:

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: http
      scheme: bearer
      bearerFormat: jwt

security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, in the Tyk Vendor Extension we need to enable authentication, to select this security scheme and to indicate where Tyk should look for the credentials. Usually the credentials will be provided in the `Authorization` header, but Tyk is configurable, via the Tyk Vendor Extension, to support custom header keys and credential passing via query parameter or cooke.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the user credentials]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field (Tyk Classic: `strip_auth_data`).

With the JWT method selected, you'll need to configure Tyk to handle the specific configuration of JSON Web Tokens that clients will be providing. All of the JWT specific configuration is performed within the [authentication.jwt]({{< ref "api-management/gateway-config-tyk-oas#jwt" >}}) object in the Tyk Vendor Extension.

### Multiple User Credential Locations

The OpenAPI Specification's `securitySchemes` mechanism allows only one location for the user credentials, but in some scenarios an API might need to support multiple potential locations to support different clients.

The Tyk Vendor Extension supports this by allowing configuration of alternative locations in the JWT entry in `server.authentication.securitySchemes`. Building on the previous example, we can add optional query and cookie locations as follows:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
          query:
            enabled: true
            name: query-auth
          cookie:
            enabled: true
            name: cookie-auth
```

### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select JSON Web Token authentication using the `use_jwt` option.

## Protecting an API with JWT

To protect an API with JWT, we need to execute the following steps:
* Set Authentication Mode
* Set the JWT Signing Method
* Set the Identity Source and Policy Field Name
* Set a Default Policy
* Generate a JWT

### Set Authentication Mode

1. [Select JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#configuring-your-api-to-use-jwt-authentication" >}}) as the Authentication mode
2. [Set the cryptographic signing method]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#set-up-jwt-signing-method" >}}) to `HMAC (shared)` and the public secret as `tyk123`
3. Set the Identity Source and Policy Field Name

    {{< img src="/img/api-management/security/jwt-auth-settings.png" alt="Target Details: JSON Web Token" >}}

### Set a Default Policy

If Tyk cannot find a `pol` claim, it will apply this Default Policy. Select a policy that gives access to this API we are protecting, or [create one]({{< ref "api-management/gateway-config-managing-classic#secure-an-api" >}}) if none exists.

Make sure to save the changes to the API Definition.

### Generate a JWT

Let's generate a JWT so we can test our new protected API.

Head on over to [https://jwt.io/](https://jwt.io/).  Sign the default JWT with our HMAC Shared Secret `tyk123` in the VERIFY SIGNATURE section.  Your screen should look similar to this:

{{< img src="/img/dashboard/system-management/jwt_jwtio_example.png" alt="Auth Configuration" >}}

Copy the Encoded JWT and let's make a cURL against the Tyk API Definition:

```
$ curl http://localhost:8080/my-jwt-api/get \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.7u0ls1snw4tPEzd0JTFaf19oXoOvQYtowiHEAZnan74"
```

## Use the JWT

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

## JWT and Auth0 with Tyk

This will walk you through securing your APIs with JWTs via Auth0. We also have the following video that will walk you through the process.

{{< youtube-seo id="jm4V7XzbrZw" title="Protect Your APIs with Auth0 JWT and Tyk">}}

#### Prerequisites

* A free account with Auth0
* A Tyk Self-Managed or Cloud installation

### Create an Application in Auth0

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

   ```yaml
   {
     "access_token": "xxxxxxxxxxx",
     "token_type": "Bearer"
   }
   ```

7. After creating your API, a new Auth0 Application will be created. Go to the Applications section to view it.

   {{< img src="/img/auth0/new-application.png" alt="New Auth0 Application" >}}

8. Copy the Domain from the Basic Information. You will use this when adding an API to Tyk.

   {{< img src="/img/auth0/auth0-basic-info.png" alt="Auth0 Application Basic Information" >}}



### Create your API in Tyk

1. Log in to your Tyk Dashboard
2. Create a new HTTP API (the default http://httpbin.org upstream URL is fine)

{{< img src="/img/auth0/tyk-create-api.png" alt="Tyk Create HTTP API" width="400px" height="400" >}}

1. From the Authentication section, select **JSON Web Token (JWT)** as your authentication mode.
2. Select RSA public Key as the JWT signing method.
3. Enter your Auth0 Application Domain from Step 8 above to complete the `jwks_uri` end point `https://<<your-auth0-domain>>/.well-known/jwks.json`
4. Copy your `jwks_uri` in to the **Public Key** field. 

{{< img src="/img/auth0/tyk-api-auth.png" alt="Tyk API Authentication" width="800px" height="400" >}}

1. Add an **Identity Source** and **Policy Field Name**. The defaults of `sub` and `pol` are fine.
2. Save your API.
3. From the System Management section, select Policies
4.  Click Add Policy
5.  Select your Auth0 API

{{< img src="/img/auth0/policy-access-rights.png" alt="Tyk Policy access rights" width="800px" height="400" >}}

1.   You can keep the rest of the access rights at the defaults.
2.   Click the **Configurations** tab and enter a **Policy Name** and a **Keys Expiry after** period.

{{< img src="/img/auth0/policy-configuration.png" alt="Tyk Policy Configuration" width="400px" height="400" >}}

1.  Click **Create Policy**.
2.  Edit your JWT Auth0 API and add the policy you created as the **Default Policy** from the Authentication section.

{{< img src="/img/auth0/api-default-policy.png" alt="Tyk API Default Policy Configuration" width="600px" height="300" >}}

1.  From the top of the API copy the API URL
2.  From a terminal window using the API URL and the Auth0 generated token.

```.curl
curl -X GET {API URL}  -H "Accept: application/json" -H "Authorization: Bearer {token}"
```
18. If using the [httpbin upstream URL](https://httpbin.org/) as in the example Tyk API, you should see the HTML returned for the httpbin service in your terminal.
19. If there is an error with the request, you will see the following error message.

```.bash
{
  "error": "Key not authorized:Unexpected signing method."
}
```


## JWT and Keycloak with Tyk

This guide will walk you through securing your APIs with JWTs via Keycloak.

#### Prerequisites

* A Keycloak installation
* A Tyk Self-Managed or Cloud installation

### Create an Application in Keycloak

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
       -H "Content-Type: application/x-www-form-urlencoded" \
       --data-urlencode "client_id=KEYCLOAK_CLIENT_ID" \
       --data-urlencode "grant_type=password" \
       --data-urlencode "client_secret=KEYCLOAK_SECRET" \
       --data-urlencode "scope=openid" \
       --data-urlencode "username=KEYCLOAK_USERNAME" \
       --data-urlencode "password=KEYCLOAK_PASSWORD"
    ```

    **Client Credentials Grant Type:**

    ```bash
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
       -H "Content-Type: application/x-www-form-urlencoded" \
       --data-urlencode "client_id=KEYCLOAK_CLIENT_ID" \
       --data-urlencode "grant_type=client_credentials" \
       --data-urlencode "client_secret=KEYCLOAK_SECRET"
    ```

    A typical response will look something like this:

    ```yaml
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

### Running in k8s

If you are looking to POC this functionality in Kubernetes, you can run a fully worked-out example using our tyk-k8s-demo library. You can read more [here]({{< ref "deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview#kubernetes-demo" >}}).


### Create Your JWT API in Tyk

1. Log in to your Tyk Dashboard.
2. Create a new HTTP API (the default `http://httpbin.org` upstream URL is fine).

   {{< img src="/img/api-management/security/jwt-keycloak-api-create.png" alt="Create a new HTTP API" >}}

3. Scroll to the Authentication mode section and select JWT from the list.
4. Select RSA public Key as JWT Signing method.
5. Add your JSON Web Key Sets (JWKS) URL in the Public Key box. This can be found through the well-known config endpoint or is typically `https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/certs`.
6. Add an Identity Source and Policy Field Name. The defaults of `sub` and `pol` are fine.
7. Click on the update button to save the API.

   {{< img src="/img/api-management/security/jwt-keycloak-set-auth.png" alt="Create API" >}}

8. Create a policy to manage access to your API.
9. Navigate to the Policies section on the left-hand side menu.
10. Click on Add Policy on the top right-hand side of your screen.
11. Select your API from the Add API Access Rights list.

   {{< img src="/img/api-management/security/jwt-keycloak-add-policy.png" alt="Select API for Security Policy" >}}

12. Click on the Configurations tab and choose a policy name and TLL.

    {{< img src="/img/api-management/security/jwt-keycloak-add-policy-cont.png" alt="Create API Security Policy" >}}

13. Add the default policy to the API.

    {{< img src="/img/api-management/security/jwt-keycloak-api-set-policy.png" alt="Add default policy to API" >}}

14. Test access to the API using curl.
15. Retrieve the API URL.

    {{< img src="/img/api-management/security/jwt-keycloak-get-api-url.png" alt="Add default Policy to API" >}}

16. Test with curl. Make sure to replace `TOKEN` with the JWT you received from the curl earlier.

    ```bash
    curl 'friendly-slipper-gw.aws-use1.cloud-ara.tyk.io/keycloak.jwt/get' \
        -H "Authorization: Bearer TOKEN"
    ```




## Split Token

OAuth2, OIDC, and their foundation, JWT, have been industry standards for many years and continue to evolve, particularly with the iterative improvements in the OAuth RFC, aligning with FHIR and Open Banking principles. The OAuth flow remains a dominant approach for secure API access.

In the OAuth flow, two types of access tokens are commonly used: opaque and JWT (more precisely, JWS). However, the use of JWTs has sparked debates regarding security, as JWTs can leak information when base64 decoded. While some argue that JWTs should not contain sensitive information, others consider JWTs inherently insecure for authorization.

### Introduction to Split Token Flow

JWT Access Tokens can carry sensitive information, making them vulnerable if compromised. The Split Token Flow offers a solution by storing only the JWT signature on the client side while keeping the header and payload on the server side. This approach combines the flexibility of JWTs with the security of opaque tokens, ensuring that sensitive data is not exposed.

### How Tyk Implements Split Token Flow

Tyk API Gateway is well-positioned to broker the communication between the client and the authorization server. It can handle requests for new access tokens, split the JWT, and return only the signature to the client, storing the rest of the token internally.

Here’s how you can implement the Split Token Flow using the client credentials flow:

#### Request a JWT Access Token

```bash
$ curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
https://keycloak-host/auth/realms/tyk/protocol/openid-connect/token \
-d "grant_type=client_credentials" \
-d "client_id=efd952c8-df3a-4cf5-98e6-868133839433" \
-d "client_secret=0ede3532-f042-4120-bece-225e55a4a2d6" -s | jq
```

This request returns a JWT access token.

#### Split the JWT

The JWT consists of three parts:

* Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
* Payload: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSJ9`
* Signature: `EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0`

Using the Split Token Flow, only the signature is returned to the client, while the header and payload are stored server-side by Tyk.

{{< img src="/img/2.10/split_token2.png" alt="Split Token Example" >}}

#### Create a Virtual Endpoint in Tyk

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



## Configure your JWT Setup
Learn how to configure and manage JWT authentication in your Tyk API Gateway.


### Set Up JWT Signing Method
Select the cryptographic method to verify JWT signatures from the following options:

- RSA public key
- HMAC shared secret
- ECDSA
- [Public JWKS URL]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#enable-dynamic-public-key-rotation-using-jwks" >}})

{{< note success >}}
**Note**: Leave the field blank to configure at the key level.
{{< /note >}} 

To generate an RSA keypair, use the following commands:
```bash
openssl genrsa -out key.rsa 
openssl rsa -in key.rsa -pubout > key.rsa.pub
```

### RSA Supported Algorithms

Both RSA & PSA classes of RSA algorithms are supported by Tyk, including:
- RS256
- RS384
- RS512 
- PS256
- PS384
- PS512

Read more about the differences between RSA & PSA classes of RSA algorithms [here](https://www.encryptionconsulting.com/overview-of-rsassa-pss/).

To use either - simply select the "RSA" signing method in the Dashboard, and Tyk will use the appropriate algorithm based on the key you provide.

### Set Up Individual JWT Secrets
Enable Tyk to validate an inbound token using stored keys:

1. Set up your token with the following fields:
    ```{.json}
    "jwt_data": {
      "secret": "Secret"
    }
    ```
2. Ensure the `kid` header field is included in the JWT for validation.
   - If the `kid` header is missing, Tyk will check the `sub` field. This is not recommended but supported.

The advantage of using RSA is that only the hashed ID and public key of the end user are stored, ensuring high security.


### Configure Identity Source and Policy Field Name
Define the identity and policy applied to the JWT:

- **Identity Source**: Select which identity claim to use (e.g., `sub`) for rate-limiting and quota counting.
- **Policy Field Name**: Add a policy ID claim to the JWT that applies a specific security policy to the session.


### Enable Dynamic Public Key Rotation Using JWKs
Instead of a static public key, configure a public JSON Web Key Sets (JWKs) URL to dynamically verify JWT tokens:

1. Use the JWKs URL to dynamically maintain and rotate active public keys.
2. Ensure JWTs contain the `kid` header, matching the `kid` in the JWK payload for verification.


{{< img src="/img/2.10/jwt_rsa_public_key.png" alt="JWKS Public Key Rotation" >}}


For example, cURLing the JWKs URL returns:

```{.copyWrapper}
$ curl http://keycloak_host:8081/auth/realms/master/protocol/openid-connect/certs
{
  "keys": [
      {
          "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM",
          "kty": "RSA",
          "alg": "RS256",
          "use": "sig",
          "n": "k-gUvKl9-sS1u8odZ5rZdVCGTe...m2bMmw",
          "e": "AQAB",
          "x5c": [
              "MIICmzCCAYMCBgFvyVrRq....K9XQYuuWSV5Tqvc7mzPd/7mUIlZQ="
          ],
          "x5t": "6vqj9AeFBihIS6LjwZhwFLmgJXM",
          "x5t#S256": "0iEMk3Dp0XWDITtA1hd0qsQwgES-BTxrz60Vk5MjGeQ"
      }
  ]
}
```

This is a JWKS complaint payload as it contains the "x5c" entry which contains the public key. Also, the issuer generates the ID Token or Access Token with a header that includes a "kid" that matches the one in the JWKS payload.

Here's an example of a header belonging to an access token generated by the issuer above.
```{.json}
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM"
}
```

The auth (bearer) tokens will be signed by the private key of the issuer, which in this example is our keycloak host.  This token can be verified by Tyk using the public key available in the above payload under "x5C".

All of this happens automatically.  You just need to specify to Tyk what the JWKs url is, and then apply a "sub" and default policy in order for everything to work.  See Step #3, 4, and 5 under option #1 for explanations and examples.


### Adjust JWT Clock Skew Configuration
Due to the nature of distributed systems it is expected that despite best efforts you can end up in a situation with clock skew between the issuing party (An OpenID/OAuth provider) and the validating party (Tyk).  

This means that in certain circumstances Tyk would reject requests to an API endpoint secured with JWT with the "Token is not valid yet" error . This occurs due to the clock on the Tyk server being behind the clock on the Identity Provider server even with all servers ntp sync'd from the same ntp server.

You can configure maximum permissable skew on three claims (`IssueAt`, `ExpireAt` and `NotBefore`) in the API definition.

### Map JWT Scopes to Policies
Assign JWT scopes to security policies to control access:

1. Specify scope-to-policy mapping:

```{.copyWrapper}
  "jwt_scope_to_policy_mapping": {
    {
    "admin": "59672779fa4387000129507d",
    "developer": "53222349fa4387004324324e"
  },
  "jwt_scope_claim_name": "our_scope"
}
```
  - `"jwt_scope_to_policy_mapping"` provides mapping of scopes (read from claim) to actual policy ID. I.e. in this example we specify that scope "admin" will apply policy `"59672779fa4387000129507d"` to a key
- `"jwt_scope_claim_name"` identifies the JWT claim name which contains scopes. This API Spec field is optional with default value `"scope"`. This claim value could be any of the following:
  - a string with space delimited list of values (by standard)
  - a slice of strings
  - a string with space delimited list of values inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having the list of values nested inside `"scope1"`
  - a slice of strings inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having a slice of strings nested inside `"scope1"`

2. Set the claim name that contains the scopes (default: `scope`):
    ```{.json}
    "jwt_scope_claim_name": "our_scope"
    ```

{{< note success >}}
**Note**  

Several scopes in JWT claim will lead to have several policies applied to a key. In this case all policies should have `"per_api"` set to `true` and shouldn't have the same `API ID` in access rights. I.e. if claim with scopes contains value `"admin developer"` then two policies `"59672779fa4387000129507d"` and `"53222349fa4387004324324e"` will be applied to a key (with using our example config above).
{{< /note >}}

## Visualize JWT Flow in Tyk API Gateway
View the diagram below for an overview of JWT flow in Tyk:

{{< img src="/img/diagrams/diagram_docs_JSON-web-tokens@2x.png" alt="JSON Web Tokens Flow" >}}
