---
title: Client Authentication and Authorization
description: Learn how to apply the most appropriate authentication method to secure access your APIs with Tyk. Here you will find everything there is to know about authenticating and authorizing API clients with Tyk.
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
aliases:
  - /advanced-configuration/integrate/api-auth-mode/oidc-auth0-example
  - /advanced-configuration/integrate/api-auth-mode/open-id-connect
  - /basic-config-and-security/security/authentication--authorization
  - /basic-config-and-security/security/authentication-authorization/
  - /basic-config-and-security/security/authentication-authorization/go-plugin-authentication
  - /basic-config-and-security/security/authentication-authorization/multiple-auth
  - /basic-config-and-security/security/authentication-authorization/open-keyless
  - /basic-config-and-security/security/authentication-authorization/openid-connect
  - /basic-config-and-security/security/authentication-authorization/physical-key-expiry
  - /basic-config-and-security/security/authentication-authorization/python-etc-plugin-authentication
  - /basic-config-and-security/security/authentication-&-authorization
  - /basic-config-and-security/security/mutual-tls
  - /basic-config-and-security/security/mutual-tls/client-mtls
  - /basic-config-and-security/security/mutual-tls/concepts
  - /basic-config-and-security/security/mutual-tls/upstream-mtls
  - /security/your-apis
  - /security/your-apis/openid-connect
  - /basic-config-and-security/security/authentication-authorization/physical-token-expiry
  - /basic-config-and-security/security/tls-and-ssl/mutual-tls
  - /security/tls-and-ssl/mutual-tls
  - /api-management/client-authentication.md
  - /api-management/authentication-authorization


---

## Introduction

Tyk Gateway sits between your clients and your services, securely routing requests and responses. For each API proxy that you expose on Tyk, you can configure a range of different methods that clients must use to identify (authenticate) themselves to Tyk Gateway when making a request to access the API.

*Authentication* and *Authorization* are the processes that you use to control access to your APIs and protect your upstream services. Each serves a distinct purpose:

* **Authentication** (or **AuthN**) is the process of confirming the identity of the user or system making the API request. This step validates "who" is attempting to access the API, commonly using credentials such as tokens, passwords, or certificates.

* **Authorization** (or **AuthZ**) is the process that determines if the user or system has the right permissions to perform the requested action. This step defines "what" they are allowed to do based on assigned roles, scopes, or policies.

Whilst AuthN and AuthZ are separate actions with different standards, they are often considered together under the topic of *Securing the API*. Together, these processes allow API providers to control access, safeguard data integrity, and meet security and compliance standards, making them vital for any API management strategy.

---

## How does Tyk Implement Authentication and Authorization?

The API request processing flow within Tyk Gateway consists of a [chain of middleware]({{< ref "api-management/traffic-transformation#request-middleware-chain" >}}) that perform different checks and transformations on the request (headers, parameters and payload). Several dedicated **authentication middleware** are provided and there is also support for user-provided **custom authentication plugins**. Multiple authentication middleware can be chained together if required by the API's access security needs. *Note that it is not possible to set the order of chained auth methods.*

The OpenAPI description can contain a list of [securitySchemes](https://spec.openapis.org/oas/v3.0.3.html#security-scheme-object) which define the authentication methods to be used for the API; the detailed configuration of the Tyk authentication middleware is set in the [server.authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) section of the Tyk Vendor Extension.

You must enable client authentication using the `server.authentication.enabled` flag and then configure the appropriate authentication method as indicated in the relevant section of this document. When creating a Tyk OAS API from an OpenAPI description, Tyk can automatically enable authentication based upon the content of the OpenAPI description as described [here]({{< ref "api-management/gateway-config-managing-oas#importing-an-openapi-description-to-create-an-api" >}}).

When using Tyk Classic APIs, each authentication middleware has its own fields within the API definition

### Managing authorization data

The data that the client provides with the API request used to authenticate with Tyk and confirm that it is authorized to access the API is often of no use to the upstream service and, depending on your security governance, may even be prohibited from being made available to the upstream.

Tyk offers a simple option, separately configurable for each API to remove, or "strip", the authentication/authorization date from the incoming request before proxying to the upstream.

This is controlled using the [server.authentication.stripAuthorizationData]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) field in the Tyk Vendor Extension (Tyk Classic: `strip_auth_data`).

## What does Tyk Support?

Tyk includes support for various industry-standard methods to secure your APIs. This page provides an overview of the options available, helping you to choose and implement what works best for you.

Use Ctrl+F or the sidebar to find specific topics, for example “JWT” for JSON Web Tokens or “mTLS” for mutual TLS.

You can also use the links below to jump directly to the appropriate sections to learn how to secure your APIs using Tyk.

{{< grid >}}
{{< badge title="OAuth 2.0" href="api-management/authentication/oauth-2" >}}
Delegate authentication using one of the most widely used open standard protocols
{{< /badge >}}

{{< badge title="JWT" href="basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}
Securely transmit information between parties.
{{< /badge >}}

{{< badge title="Basic Auth" href="api-management/authentication/basic-authentication" >}}
Secure APIs with username and password credentials.
{{< /badge >}}

{{< badge title="Auth Tokens" href="api-management/authentication/bearer-token" >}}
Implement token-based authentication for API access.
{{< /badge >}}

{{< badge title="mTLS" href="api-management/client-authentication/#use-mutual-tls" >}}
Establish secure channels with two-way certificate verification.
{{< /badge >}}

{{< badge title="HMAC" href="basic-config-and-security/security/authentication-authorization/hmac-signatures" >}}
Verify message integrity using shared secret keys.
{{< /badge >}}

<!-- To be added
{{< badge title="RSA" href="api-management/client-authentication/#sign-requests-with-rsa" >}}
Verify message integrity using shared secret certificates.
{{< /badge >}}
-->

{{< badge title="Custom Authentication" href="api-management/client-authentication/#custom-authentication" >}}
Create custom plugins to implement specific authentication requirements.
{{< /badge >}}

{{< badge title="Open Access" href="api-management/client-authentication/#open-no-authentication" >}}
Allow unrestricted access for public APIs.
{{< /badge >}}

{{< /grid >}}

---

## Other Authentication Methods


### Use Mutual TLS

Mutual TLS (mTLS) is a robust security feature that ensures both the client and server authenticate each other using TLS certificates. This two-way authentication process provides enhanced security for API communications by cryptographically verifying the identity of both parties involved in the connection.

In most cases when you try to access a secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and the data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates. See the video below that gives you an introduction to mutual TLS and how it can be used to secure your APIs.

{{< youtube-seo id="UzEzjon3IAo" title="Mutual TLS Intro" >}}

#### Why Use Mutual TLS?

Mutual TLS is particularly valuable in environments where security is paramount, such as microservices architectures, financial services, healthcare, and any scenario requiring zero-trust security. It not only encrypts the data in transit but also ensures that the communicating parties are who they claim to be, mitigating the risks of unauthorized access and data breaches.

* **Enhanced Security:** Provides two-way authentication, ensuring both the client and server are verified and trusted.
* **Data Integrity:** Protects the data exchanged between client and server by encrypting it, preventing tampering or interception.
* **Compliance:** Helps meet stringent security and compliance requirements, especially in regulated industries.

#### Client mTLS for Tyk Cloud

Tyk Cloud users cannot currently use mTLS to secure the client to Gateway communication for Tyk-hosted gateways.


Tyk Hybrid users can, however, use mTLS with their self-hosted gateways.


#### How Does Mutual TLS Work?

Mutual TLS operates by requiring both the client and server to present and verify TLS certificates during the handshake process. Here’s how it works:

**Client Authentication:**

1. When a client attempts to connect to the server, the server requests the client’s TLS certificate.
2. The client provides its certificate, which the server verifies against a trusted Certificate Authority (CA).

**Server Authentication:**

1. Simultaneously, the server provides its own certificate to the client, which the client verifies against a trusted CA.

This mutual verification ensures that both parties are legitimate, securing the connection from both ends.

##### Client authorization with mTLS
At the TLS level, authorization means only allowing access for clients who provide client certificates that are verified and trusted by the server. 

Tyk allows you to define a list of trusted certificates at the API level or Gateway (global) level. If you are updating API definition programmatically or via files, you need to set following the keys in your API 
definition: 
`use_mutual_tls_auth` to `true`, and `client_certificates` as an array of strings - certificate IDs. 

From the Tyk Dashboard, to do the same from the **API Designer Core settings** section you need to select **Mutual TLS** authentication mode from the **Authentication** section, and allow the certificates using the built-in widget, as below:

{{< img src="/img/2.10/mtls_auth_cert.png" alt="mutual_tls_auth" >}}

If all your APIs have a common set of certificates, you can define them in your Gateway configuration file via the `security.certificates.apis` key - string array of certificate IDs or paths.

Select **Strip Authorization Data** to strip any authorization data from your API requests.  

Be aware that mutual TLS authorization has special treatment because it is not "authentication" and does not provide any identifying functionality, like keys, so you need to mix it with another authentication modes options like **Auth Key** or **Keyless**. On the dashboard, you need to choose **Use multiple auth mechanism** in the **Authentication mode** drop-down, where you should select **Mutual TLS** and another option which suits your use-case. 

###### Fallback to HTTP Authorization 
The TLS protocol has no access to the HTTP payload and works on the lower level; thus the only information we have at the TLS handshake level is the domain. In fact, even a domain is not included into a TLS handshake by default, but there is TLS extension called SNI (Server Name Indication) 
which allows the client to send the domain name to the TLS handshake level. 

With this in mind, the only way to make API authorization work fully at the  TLS level, each API protected by Mutual TLS should be deployed on its own domain.

However, Tyk will gracefully fallback to a client certificate authorization at the HTTP level in cases when you want to have multiple mutual TLS protected APIs on the same domain, or you have clients that do not support the SNI extension. No additional configuration is needed. In case of such fallback, 
instead of getting TLS error, a client will receive 403 HTTP error.

##### Authentication 
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

###### Using with Authorization 
Mutual TLS authentication does not require mutual TLS authorization to be turned on, and can be used separately. For example, you may allow some of the users to be authenticated by using a token in the header or similar, and some of the users via client certificates. 

If you want to use them both, just configure them separately. No additional knowledge is required.

##### Dynamic vs Static mTLS

There are two ways to set up client mTLS in Tyk: static and dynamic. Each method is suited to different use cases, as outlined below:

| Use Case                                                           | Static | Dynamic |
| ------------------------------------------------------------------ | :----: | :-----: |
| Let developers upload their own public certificates through the Developer Portal |   ❌    |   ✅      |
| Combine client mTLS with another authentication method           |   ✅    |   ✅      |
| Allow certs at the API level (one or more APIs per cert)           |   ✅    |   ❌      |
| Allow certs at an individual level (one or more APIs per cert)     |   ❌    |   ✅      |

#### Dynamic mTLS

Dynamic Client mTLS in Tyk allows you to authenticate users based solely on the provided client certificate, without the need for an additional authentication key. Tyk can identify the user, apply policies, and monitor usage just as with regular API keys.

To set up Dynamic Client mTLS, we need to follow these steps:
* Protect the API: Configure the API in the API Designer by setting the authentication type to Auth Token and enabling Client Certificate.

* Generate a Self-Signed Certificate: Use OpenSSL to generate a self-signed certificate and key if you don't have one.

* Add a Key in the Dashboard: In the Tyk Dashboard, create a key for the API and upload only the public certificate.

* Make an API Request: Use curl with your certificate and key to make an API request to the protected API, ensuring the request returns a 200 response.

* Allow Developers to Upload Certificates: Create a policy and catalog entry for the API, allowing developers to request keys and upload their public certificates through the Developer Portal. Developers can then make API requests using their cert and private key.


##### Protect the API

In the API Designer, set the Authentication Type to Auth Token under Target Details > Authentication mode. Then select Enable Client Certificate.

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Enable Client Certificate" >}}

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

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="portal_cert_request" >}}

Add your public cert (cert.pem from above) into here and hit "Request Key".  

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


##### Setup Static mTLS in Tyk Operator using the Tyk Classic API Definition

This setup requires mutual TLS (mTLS) for client authentication using specified client certificates. The example provided shows how to create an API definition with mTLS authentication for `httpbin-client-mtls`.

1. **Generate Self-Signed Key Pair:**

You can generate a self-signed key pair using the following OpenSSL command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

2. **Create Kubernetes Secret:**

Create a secret in Kubernetes to store the client certificate:

```bash
kubectl create secret tls my-test-tls --cert cert.pem --key key.pem
```

3. **Create API Definition:**

Below is the YAML configuration for an API that uses mTLS authentication. Note that the `client_certificate_refs` field references the Kubernetes secret created in the previous step.

```yaml {hl_lines=["19-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-client-mtls
spec:
  name: Httpbin Client MTLS
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  use_mutual_tls_auth: true
  client_certificate_refs:
    - my-test-tls
```

##### Setup Static mTLS in Tyk Operator using Tyk OAS API Definition

Client certificates, In Tyk OAS API Definition, are managed using the `TykOasApiDefinition` CRD. You can reference Kubernetes secrets that store client certificates in your API definitions.

**Example of Referencing Client Certificates in Tyk OAS**

In this example, the `clientCertificate` section allows you to enable client certificate management and specify a list of Kubernetes secrets (`tls-cert`) that store allowed client certificates.

```yaml {hl_lines=["48-50"],linenos=false}
# Secret is not created in this manifest.
# Please store client certificate in k8s TLS secret `tls-cert`.

apiVersion: v1
data:
  test_oas.json: |-
    {
        "info": {
          "title": "Petstore",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "Petstore",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "https://petstore.swagger.io/v2"
          },
          "server": {
            "listenPath": {
              "value": "/petstore/",
              "strip": true
            }
          }
        }
      }
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
  clientCertificate: 
      enabled: true
      allowlist: [tls-cert]
```


#### FAQ

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


### Custom Authentication

#### Go Plugins

Go Plugin Authentication allows you to implement custom authentication logic using the Go programming language. This method is useful for scenarios where you need to implement specialized authentication mechanisms that are not natively supported by Tyk.
To learn more about using Tyk Golang Plugins, go [here]({{< ref "api-management/plugins/golang" >}})

#### Use Python CoProcess and JSVM Plugin Authentication

Tyk allows for custom authentication logic using Python and JavaScript Virtual Machine (JSVM) plugins. This method is useful for implementing unique authentication mechanisms that are tailored to your specific requirements.

* See [Custom Authentication with a Python plugin]({{< ref "api-management/plugins/rich-plugins#custom-authentication-plugin-tutorial" >}}) for a detailed example of a custom Python plugin.
* See [JavaScript Middleware]({{< ref "api-management/plugins/javascript#" >}}) for more details on using JavaScript Middleware. 

### Open (No Authentication)

Open or keyless authentication allows access to APIs without any authentication. This method is suitable for public APIs where access control is not required.

Tyk OAS APIs are inherently "open" unless authentication is configured, however the older Tyk Classic API applies [auth token]({{< ref "api-management/authentication/bearer-token" >}}) protection by default.

You can disable authentication for a Tyk Classic API by setting the `use_keyless` flag in the API definition.


### Integrate with External Authorization Server (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered two types of OAuth authentication flow; [Tyk as the authorization server]() and Tyk connecting to an external *auth server* via a dedicated *External OAuth* option. The dedicated external *auth server* option was deprecated in Tyk 5.7.0.
<br>

For third-party OAuth integration we recommend using the JSON Web Token (JWT) middleware which is described [above]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
<br>

The remainder of this section is left for reference and is not maintained.
{{< /note >}}

To call an API that is protected by OAuth, you need to have an access token from the third party IDP (it could be an opaque token or a JWT). 

For subsequent calls the access token is provided alongside the API call and needs to be validated. With JWT, Tyk can confirm the validity of the JWT with the secret provided in your config. The secret signs the JWT when created and confirms that none of its contents has changed. 

For this reason, information like the expiry date which are often set within the JWT cannot be changed after the JWT has been initially created and signed. This means you are not able to revoke a token before the expiry set in the JWT with the standard JWT flow. With OAuth you can use [OAuth introspection](https://www.rfc-editor.org/rfc/rfc7662) to overcome this. With introspection, you can validate the access token via an introspection endpoint that validates the token. 

Let’s see how external OAuth middleware is configured.

#### OAS contract

```yaml
externalOAuthServer:
  enabled: true,
  providers: # only one item in the array for now (we're going to support just one IDP config in the first iteration)
  - jwt: #validate JWTs generated by 3rd party Oauth servers (like Okta)
      enabled: true
      signingMethod: HMAC/RSA/ECDSA # to verify signing method used in jwt
      source: key # secret to verify signature
      issuedAtValidationSkew: 0
      notBeforeValidationSkew: 0
      expiresAtValidationSkew: 0
      identityBaseField: # identity claimName
    introspection: # array for introspection details
      enabled: true/false
      clientID: # for introspection request
      clientSecret: # for introspection request, if empty will use oAuth.secret
      url: # token introspection endpoint
      cache: # Tyk will cache the introspection response when `cache.enabled` is set to `true`
        enabled: true/false,
        timeout: 0 # The duration (in seconds) for which Tyk will retain the introspection outcome in its cache. If the value is "0", it indicates that the introspection outcome will be stored in the cache until the token's expiration.
      identityBaseField: # identity claimName
```

#### Tyk Classic API definition contract

```yaml
"external_oauth": {
  "enabled": true,
  "providers": [
    {
      "jwt": {
        "enabled": false,
        "signing_method": rsa/ecdsa/hmac,
        "source": # jwk url/ base64 encoded static secret / base64 encoded jwk url
        "identity_base_field": # identity claim name
        "expires_at_validation_skew": # validation skew config for exp
        "not_before_validation_skew": # validation skew config for nbf
        "issued_at_validation_skew" : # validation skew config for iat
      },
      "introspection": {
        "enabled": true,
        "url": # introspection endpoint url
        "client_id": # client Id used for introspection
        "client_secret": # client secret to be filled here (plain text for now, TODO: decide on a more secure mechanism)
        "identity_base_field": # identity claim name
        "cache": {
          "enabled": true,
          "timeout": # timeout in seconds
        }
      }
    }
  ]
}
```
- `externalOAuthServer` set `enabled` to `true` to enable the middleware.
- `providers` is an array of multiple IDP configurations, with each IDP config being an element in the `providers` array. 
- You can use this config to use JWT self validation using `jwt` or use introspection via `instropection` in the `providers` section .

{{< note success >}}
**Note**  

For now, you’ll be limiting `providers` to have only one element, ie one IDP configured.
{{< /note >}}

#### JWT

There could be cases when you don’t need to introspect a JWT access token from a third party IDP, and instead you can just validate the JWT. This is similar to existing JWT middleware, adding it in External OAuth middleware for semantic reasons.

- `enabled` - enables JWT validation.
- `signingMethod` - specifies the signing method used to sign the JWT.
- `source` - the secret source, it can be one of:
  - a base64 encoded static secret
  - a valid JWK url in plain text
  - a valid JWK url in base64 encoded format
- `issuedAtValidationSkew` , `notBeforeValidationSkew`, `expiresAtValidationSkew` can be used to [configure clock skew]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#adjust-jwt-clock-skew-configuration" >}}) for json web token validation.
- `identityBaseField` - the identity key name for claims. If empty it will default to `sub`.

##### Example: Tyk OAS API definition with JWT validation enabled

```json
"securitySchemes": {
  "external_jwt": {
    "enabled": true,
    "header": {
      "enabled": true,
      "name": "Authorization"
    },
    "providers": [
      {
        "jwt": {
          "enabled": true,
          "signingMethod": "hmac",
          "source": "dHlrLTEyMw==",
          "identityBaseField": "sub"
        }
      }
    ]
  }
}
```

##### Example: Tyk Classic API definition with JWT validation enabled

```json
"external_oauth": {
  "enabled": true,
  "providers": [
      {
          "jwt": {
              "enabled": true,
              "signing_method": "hmac",
              "source": "dHlrLTEyMw==",
              "issued_at_validation_skew": 0,
              "not_before_validation_skew": 0,
              "expires_at_validation_skew": 0,
              "identity_base_field": "sub"
          },
          "introspection": {
              "enabled": false,
              "url": "",
              "client_id": "",
              "client_secret": "",
              "identity_base_field": "",
              "cache": {
                  "enabled": false,
                  "timeout": 0
              }
          }
      }
  ]
}
```
#### Introspection

For cases where you need to introspect the OAuth access token, Tyk uses the information in the `provider.introspection` section of the contract. This makes a network call to the configured introspection endpoint with the provided `clientID` and `clientSecret` to introspect the access token.

- `enabled` - enables OAuth introspection
- `clientID` - clientID used for OAuth introspection, available from IDP
- `clientSecret` - secret used to authenticate introspection call, available from IDP
- `url` - endpoint URL to make the introspection call
- `identityBaseField` - the identity key name for claims. If empty it will default to `sub`.

##### Caching

Introspection via a third party IdP is a network call. Sometimes it may be inefficient to call the introspection endpoint every time an API is called. Caching is the solution for this situation. Tyk caches the introspection response when `enabled` is set to `true` inside the `cache` configuration of `introspection`. Then it retrieves the value from the cache until the `timeout` value finishes. However, there is a trade-off here. When the timeout is long, it may result in accessing the upstream with a revoked access token. When it is short, the cache is not used as much resulting in more network calls. 

The recommended way to handle this balance is to never set the `timeout` value beyond the expiration time of the token, which would have been returned in the `exp` parameter of the introspection response.

See the example introspection cache configuration:

```yaml
"introspection": {
  ...
  "cache": {
    "enabled": true,
    "timeout": 60 // in seconds
  }
}
```
##### Example: Tyk OAS API definition external OAuth introspection enabled

```json
"securitySchemes": {
  "keycloak_oauth": {
    "enabled": true,
    "header": {
      "enabled": true,
      "name": "Authorization"
    },
    "providers": [
      {
        "introspection": {
          "enabled": true,
          "url": "http://localhost:8080/realms/tyk/protocol/openid-connect/token/introspect",
          "clientId": "introspection-client",
          "clientSecret": "DKyFN0WXu7IXWzR05QZOnnSnK8uAAZ3U",
          "identityBaseField": "sub",
          "cache": {
            "enabled": true,
            "timeout": 3
          }
        }
      }
    ]
  }
}
```
##### Example: Tyk Classic API definition with external OAuth introspection enabled

```json
"external_oauth": {
  "enabled": true,
  "providers": [
      {
          "jwt": {
              "enabled": false,
              "signing_method": "",
              "source": "",
              "issued_at_validation_skew": 0,
              "not_before_validation_skew": 0,
              "expires_at_validation_skew": 0,
              "identity_base_field": ""
          },
          "introspection": {
              "enabled": true,
              "url": "http://localhost:8080/realms/tyk/protocol/openid-connect/token/introspect",
              "client_id": "introspection-client",
              "client_secret": "DKyFN0WXu7IXWzR05QZOnnSnK8uAAZ3U",
              "identity_base_field": "sub",
              "cache": {
                  "enabled": true,
                  "timeout": 3
              }
          }
      }
  ]
}
```

### Integrate with OpenID Connect (deprecated)

{{< note success >}}
**Note**  
Tyk has previously offered a dedicated OpenID Connect option for client authentication, but this was not straightforward to use and was deprecated in Tyk 5.7.0.
<br>

For integration with a third-party OIDC provider we recommend using the JSON Web Token (JWT) middleware which is described [above]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), which offers the same functionality with a more streamlined setup and reduced risk of misconfiguration.
<br>

The remainder of this section is left for reference and is not maintained.
{{< /note >}}


[OpenID Connect](https://openid.net/developers/how-connect-works) (OIDC) builds on top of OAuth 2.0, adding authentication. You can secure your APIs on Tyk by integrating with any standards compliant OIDC provider using [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) (JWTs).
JWTs offer a simple way to use the third-party Identity Provider (IdP) without needing any direct integration between the Tyk and 3rd-party systems.

To integrate a 3rd party OAuth2/OIDC IdP with Tyk, all you will need to do is ensure that your IdP can issue OAuth2 JWT access tokens as opposed to opaque tokens.

The client application authenticates with the IdP which then provides an access token that is accepted by Tyk. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.





## Combine Authentication Methods

Tyk allows you to chain multiple authentication methods together so that each authentication must be successful for access to be granted to the API. For example, you can use an Access Token in combination with Basic Auth or with a JSON Web Token.

### Base Identity Provider

When you configure Tyk to use multiple authentication methods, you must declare one to be the **base identity provider**. The [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key/token) provided in that authentication step will be used by Tyk as the common "request context" and hence the source of truth for authorization (access control, rate limits and quotas).

You declare the base identity provider using the [server.authentication.baseIdentityProvider]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) field in the Tyk Vendor Extension (Tyk Classic: `base_identity_provided_by`).


### Enable Multi (Chained) Authentication win the API Designer

You can configure chained authentication using the Dashboard UI by following these steps:

1.  Enable **Authentication** in the **Servers** section

2.  Select the **Multiple Authentication Mechanisms** option from the drop-down list.

    {{< img src="/img/api-management/security/multiple-auth-choose-auth.png" alt="Select Multiple Auth" >}}

3.  Select the **Authentication methods** you want to implement and identify the **Base identity provider**

    {{< img src="/img/api-management/security/multiple-auth-methods.png" alt="Select Auth Methods" >}}

4.  You can now configure each of the individual authentication methods in the usual manner using the options in the API designer.

<!-- 18/3/25 removing this video as it's very old (Dashboard 1.9) and perhaps not as helpful as it could be
{{< youtube-seo id="vYGYYXcJ6Wc" title="Protect an API with Multiple Authentication Types">}}
-->


### Configuring multiple auth methods in the API definition

The OpenAPI description can define multiple `securitySchemes` and then lists those to be used to protect the API in the `security` section. The OpenAPI Specification allows multiple entries in the `security` section of the API description, each of which can contain one or multiple schemes.

Tyk only takes into consideration the first object in the `security` list. If this contains multiple schemes, then Tyk will implement these sequentially.

In the following example, the OpenAPI description includes multiple security schemes and then defines three objects in the `security` list:

```yaml
{
  ...
  securitySchemes: {
    "auth-A": {...},
    "auth-B": {...},
    "auth-C": {...},
    "auth-D": {...},
  },
  security: [
    {
      "auth-A": [],
      "auth-C": []
    },
    {
      "auth-B": []
    },
    {
      "auth-D": []
    }
  ]
}
```

Tyk will consider only the first entry in the `security` list and so will implement the `auth-A` and `auth-B` schemes.

In the Tyk Vendor Extension this would result in the following configuration:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true,
      baseIdentityProvider: "auth-A"
      securitySchemes:
        auth-A:
          enabled: true
        auth-C:
          enabled: true
      ...
```
Note the presence of the `baseIdentityProvider` field which is required.

### Using Tyk Classic APIs

To enable this mode, set the `base_identity_provided_by` field in your API Definitions to one of the supported chained enums below:

*   `AuthToken`
*   `HMACKey`
*   `BasicAuthUser`
*   `JWTClaim`
*   `OIDCUser`
*   `OAuthKey`
*   `UnsetAuth`

The provider set here will then be the one that provides the session object that determines rate limits, ACL rules, and quotas.

You must also configure the authentication methods to be used in the usual manner, as described in the relevant documentation. To ensure that auth token is implemented as part of the chained authentication, you must set `use_standard_auth` to `true`.


## Set Physical Key Expiry and Deletion
Tyk makes a clear distinction between an API authorization key expiring and being deleted from the Redis storage.

- When a key expires, it remains in the Redis storage but is no longer valid. Consequently, it is no longer authorized to access any APIs. If a key in Redis has expired and is passed in an API request, Tyk will return `HTTP 401 Key has expired, please renew`.
 - When a key is deleted from Redis, Tyk no longer knows about it, so if it is passed in an API request, Tyk will return `HTTP 400 Access to this API has been disallowed`.

Tyk provides separate control for the expiration and deletion of keys.

Note that where we talk about keys here, we are referring to [Session Objects]({{< ref "api-management/policies#what-is-a-session-object" >}}), also sometimes referred to as Session Tokens

### Key expiry

Tyk's API keys ([token session objects]({{< ref "api-management/policies#session-object" >}})) have an `expires` field. This is a UNIX timestamp and, when this date/time is reached, the key will automatically expire; any subsequent API request made using the key will be rejected.

### Key lifetime

Tyk does not automatically delete keys when they expire. You may prefer to leave expired keys in Redis storage, so that they can be renewed (for example if a user has - inadvisedly - hard coded the key into their application). Alternatively, you may wish to delete keys to avoid cluttering up Redis storage with obsolete keys.

You have two options for configuring the lifetime of keys when using Tyk:

1.  At the API level
2.  At the Gateway level

#### API-level key lifetime control

You can configure Tyk to delete keys after a configurable period (lifetime) after they have been created. Simply set the `session_lifetime` field in your API Definition and keys created for that API will automatically be deleted when that period (in seconds) has passed.

The default value for `session_lifetime` is 0, this is interpreted as an infinite lifetime which means that keys will not be deleted from Redis.

For example, to have keys live in Redis for only 24 hours (and be deleted 24 hours after their creation) set:

```{.json}
"session_lifetime": 86400
```

{{< note success >}} 
**Note**

There is a risk, when configuring API-level lifetime, that a key will be deleted before it has expired, as `session_lifetime` is applied regardless of whether the key is active or expired. To protect against this, you can configure the [session_lifetime_respects_key_expiration]({{< ref "tyk-oss-gateway/configuration#session_lifetime_respects_key_expiration" >}}) parameter in your `tyk.conf`, so that keys that have exceeded their lifetime will not be deleted from Redis until they have expired.
{{< /note >}}

This feature works nicely with [JWT]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) or [OIDC](#integrate-with-openid-connect-deprecated) authentication methods, as the keys are created in Redis the first time they are in use so you know when they will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a long `session_lifetime`, otherwise the user might try to use the key **after** it has already been removed from Redis.

#### Gateway-level key lifetime control

You can set a global lifetime for all keys created in the Redis by setting [global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#global_session_lifetime" >}}) in the `tyk.conf` file; this parameter is an integer value in seconds.

To enable this global lifetime, you must also set the [force_global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#force_global_session_lifetime" >}}) parameter in the `tyk.conf` file.

#### Summary of key lifetime precedence

The table below shows the key lifetime assigned for the different permutations of `force_global_session_lifetime` and  `session_lifetime_respects_key_expiration` configuration parameters.
| `force_global_session_lifetime` | `session_lifetime_respects_key_expiration` | Assigned lifetime |
|---------------------------------|--------------------------------------------|-------------------------------------------|
| `true`                          | `true`                                     | `global_session_lifetime`                 |
| `true`                          | `false`                                    | `global_session_lifetime`                 |
| `false`                         | `true`                                     | larger of `session_lifetime` or `expires` |
| `false`                         | `false`                                    | `session_lifetime`                        |

{{< note success >}} 
**Note**

It is important to remember that a value of `0` in `session_lifetime` or `global_session_lifetime` is interpreted as infinity (i.e. key will not be deleted if that control is in use) - and if a field is not set, this is treated as `0`.
<br>
If you want the key to be deleted when it expires (i.e. to use the expiry configured in `expires` within the key to control deletion) then you must set a non-zero value in `session_lifetime` and configure both `session_lifetime_respects_key_expiration:true` and `force_global_session_lifetime:false`.
{{< /note >}}



## Conclusion

Securing your APIs is a foundational step toward managing data integrity and access control effectively. Now that you've configured authentication and authorization, the next steps in your API journey with Tyk should involve:

Defining Access Policies: Use Tyk’s policies to refine API access controls, rate limits, and quotas. This lets you align your security model with business needs and enhance user experience through granular permissions. You can learn more about policies [here](/api-management/policies/).

Exploring API Analytics: Leverage Tyk’s analytics to monitor access patterns, track usage, and gain insights into potential security risks or high-demand endpoints. Understanding usage data can help in optimizing API performance and enhancing security measures. You can learn more about analytics [here](/tyk-dashboard-analytics/).