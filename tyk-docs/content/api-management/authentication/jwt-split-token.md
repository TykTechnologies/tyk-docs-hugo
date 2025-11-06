---
title: JWT Split Token
description: Learn how to implement JWT Split Token flow in Tyk to enhance security by separating JWT components and storing sensitive data server-side.
tags: ["Authentication", "JWT", "JSON Web Tokens", "Split Token", "Security"]
keywords: ["Authentication", "JWT", "JSON Web Tokens", "Split Token", "Security"]
date: 2025-01-10
---

## Introduction

Split Token Flow addresses a fundamental security concern with JWT tokens: when a JWT is stored on a client device (browser, mobile app, etc.), all of its contents can be easily decoded since JWTs are only base64-encoded, not encrypted. This means sensitive information in the payload is potentially exposed.

The JWT consists of three parts:

{{< img src="/img/2.10/split_token2.png" alt="Split Token Example" >}}

In the above example you can see that they are:

- Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- Payload: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSJ9`
- Signature: `EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0`

The Split Token approach provides a solution by:

1. Separating the JWT into its three component parts: header, payload, and signature
2. Storing only the signature on the client side (which by itself is meaningless)
3. Keeping the header and payload securely on the server side (in Tyk)
4. Reconstructing the complete JWT when needed for authentication

This approach combines the benefits of JWTs (rich claims, stateless validation) with the security of opaque tokens (no information disclosure).

### When to Use Split Token Flow

Consider using Split Token Flow when:

- Your JWT payload contains sensitive information that shouldn't be exposed to clients
- You want to prevent token inspection by malicious actors
- You need the flexibility of JWT while maintaining higher security
- You're implementing systems that must meet strict security compliance requirements

## How Split Token Flow Works

Here's how the process works with Tyk Gateway:

```mermaid
sequenceDiagram
    participant Client
    participant Tyk as Tyk Gateway
    participant Redis as Tyk Redis
    participant Auth as Authorization Server

    %% Token Issuance Flow
    rect rgb(240, 240, 255)
        note over Client, Auth: Token Issuance
        Client->>Tyk: Request token from /token endpoint
        Tyk->>Auth: Forward request to Auth Server
        Auth->>Tyk: Return complete JWT (header.payload.signature)
        Tyk->>Tyk: Split JWT into components
        Tyk->>Redis: Store header & payload using signature as key
        Tyk->>Client: Return only signature as "opaque" token
    end

    %% Token Usage Flow
    rect rgb(245, 255, 245)
        note over Client, Auth: Token Usage
        Client->>Tyk: API request with signature as Bearer token
        Tyk->>Redis: Look up header & payload using signature
        Redis->>Tyk: Return stored header & payload
        Tyk->>Tyk: Reconstruct complete JWT
        Tyk->>Tyk: Validate JWT
        Tyk->>Auth: Forward request with complete JWT
        Auth->>Tyk: Response
        Tyk->>Client: Return response to client
    end
```

1. **Token Issuance**:

    - A `/token` endpoint is configured on Tyk from which the client should request the access token
    - Tyk requests an access token from an authorization server (e.g., Keycloak) on behalf of the client
    - The authorization server returns a complete JWT
    - Tyk intercepts this response through a [Virtual Endpoint]({{< ref "api-management/traffic-transformation/virtual-endpoints" >}})
    - Tyk splits the JWT into its components and stores the header and payload in its Redis database
    - Only the signature portion is returned to the client as an "opaque" token

2. **Token Usage**:

    - The client makes API requests using only the signature as their access token
    - Tyk receives the request and looks up the stored header and payload using the signature
    - Tyk reconstructs the complete JWT and validates it
    - If valid, Tyk forwards the request to the upstream API with the full JWT

3. **Security Benefits**:

    - The client never possesses the complete JWT, only a meaningless signature
    - Token contents cannot be inspected by client-side code or malicious actors
    - Token validation still occurs using standard JWT verification


## Implementing Split Token Flow

1. **Create a Virtual Endpoint for Token Issuance**

    First, create a virtual endpoint in Tyk that will:

    - Receive authentication requests from clients
    - Forward these requests to your authorization server
    - Split the returned JWT
    - Store the header and payload in Tyk's storage
    - Return only the signature to the client
    - Here's a simplified implementation:

    ```javascript
    function splitTokenHandler(request, session, config) {
        // 1. Forward the client's credentials to the authorization server
        var authServerResponse = forwardToAuthServer(request);
        
        if (authServerResponse.Code !== 200) {
            return TykJsResponse({
                Body: authServerResponse.Body,
                Code: authServerResponse.Code
            }, session.meta_data);
        }
        
        // 2. Extract the JWT from the response
        var responseBody = JSON.parse(authServerResponse.Body);
        var fullJWT = responseBody.access_token;
        
        // 3. Split the JWT into its components
        var jwtParts = fullJWT.split(".");
        var header = jwtParts[0];
        var payload = jwtParts[1];
        var signature = jwtParts[2];
        
        // 4. Store the complete JWT in Tyk's Redis database using the signature as the key
        // This function would use Tyk's storage API to save the data
        storeJWTComponents(signature, header, payload, fullJWT);
        
        // 5. Modify the response to return only the signature
        responseBody.access_token = signature;
        
        return TykJsResponse({
            Body: JSON.stringify(responseBody),
            Code: 200
        }, session.meta_data);
    }
    ```

    Note that this example includes some level of abstraction for clarity and so is not a full implementation.

2. **Configure Custom Pre-Auth Plugin**

    Next, create a custom pre-auth plugin that reconstructs the JWT before it reaches the standard Tyk JWT Auth middleware:

    ```javascript
    function reconstructJWT(request, session, config) {
        // 1. Extract the signature from the Authorization header
        var authHeader = request.Headers["Authorization"];
        var signature = authHeader.replace("Bearer ", "");
        
        // 2. Retrieve the stored JWT components using the signature
        var storedJWT = retrieveJWTComponents(signature);
        
        if (!storedJWT) {
            return TykJsResponse({
                Body: "Invalid token",
                Code: 401
            }, session.meta_data);
        }
        
        // 3. Replace the Authorization header with the full JWT
        request.SetHeaders["Authorization"] = "Bearer " + storedJWT.fullJWT;
        
        return request;
    }
    ```

3. **Test the Implementation**

    To test your Split Token Flow:

    Request a token from your Tyk virtual endpoint:

    ```bash
    curl -X POST https://your-tyk-gateway/token \
      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
    ```

    You'll receive a response with only the signature as the access token, for example:

    ```json
    {
      "access_token": "EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0",
      "token_type": "bearer",
      "expires_in": 3600
    }
    ```

    Use this token to access your JWT Auth protected API where you have configured the custom pre-auth plugin and JWT Auth:

    ```bash
    curl https://your-tyk-gateway/protected-api \
      -H "Authorization: Bearer EwIaRgq4go4R2M2z7AADywZ2ToxG4gDMoG4SQ1X3GJ0"
    ```


