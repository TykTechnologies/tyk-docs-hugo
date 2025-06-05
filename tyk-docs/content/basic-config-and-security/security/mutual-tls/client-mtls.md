---
title: Authentication using Mutual TLS
description: "How to configure Mutual TLS (mTLS) for client authentication in Tyk."
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Mutual TLS", "mTLS", "Client mTLS"]
keywords: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Mutual TLS", "mTLS", "Client mTLS"]
aliases:
  - /basic-config-and-security/security/tls-and-ssl/mutual-tls
  - /security/tls-and-ssl/mutual-tls
  - /basic-config-and-security/security/mutual-tls
  - /basic-config-and-security/security/mutual-tls/concepts
---

## Introduction

Mutual TLS (mTLS) is a robust security feature that ensures both the client and server authenticate each other using TLS certificates. This two-way authentication process provides enhanced security for API communications by cryptographically verifying the identity of both parties involved in the connection.

In most cases when you try to access a secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and the data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates. See the video below that gives you an introduction to mutual TLS and how it can be used to secure your APIs.

{{< youtube-seo id="UzEzjon3IAo" title="Mutual TLS Intro" >}}

## Why Use Mutual TLS?

Mutual TLS is particularly valuable in environments where security is paramount, such as microservices architectures, financial services, healthcare, and any scenario requiring zero-trust security. It not only encrypts the data in transit but also ensures that the communicating parties are who they claim to be, mitigating the risks of unauthorized access and data breaches.

* **Enhanced Security:** Provides two-way authentication, ensuring both the client and server are verified and trusted.
* **Data Integrity:** Protects the data exchanged between client and server by encrypting it, preventing tampering or interception.
* **Compliance:** Helps meet stringent security and compliance requirements, especially in regulated industries.

## Client mTLS for Tyk Cloud

Tyk Cloud users cannot currently use mTLS to secure the client to Gateway communication for Tyk-hosted gateways.


Tyk Hybrid users can, however, use mTLS with their self-hosted gateways.


## How Does Mutual TLS Work?

Mutual TLS operates by requiring both the client and server to present and verify TLS certificates during the handshake process. Here’s how it works:

**Client Authentication:**

1. When a client attempts to connect to the server, the server requests the client’s TLS certificate.
2. The client provides its certificate, which the server verifies against a trusted Certificate Authority (CA).

**Server Authentication:**

1. Simultaneously, the server provides its own certificate to the client, which the client verifies against a trusted CA.

This mutual verification ensures that both parties are legitimate, securing the connection from both ends.

### Client authorization with mTLS
At the TLS level, authorization means only allowing access for clients who provide client certificates that are verified and trusted by the server. 

Tyk allows you to define a list of trusted certificates at the API level or Gateway (global) level. If you are updating API definition programmatically or via files, you need to set following the keys in your API 
definition: 
`use_mutual_tls_auth` to `true`, and `client_certificates` as an array of strings - certificate IDs. 

From the Tyk Dashboard, to do the same from the **API Designer Core settings** section you need to select **Mutual TLS** authentication mode from the **Authentication** section, and allow the certificates using the built-in widget, as below:

{{< img src="/img/2.10/mtls_auth_cert.png" alt="mutual_tls_auth" >}}

If all your APIs have a common set of certificates, you can define them in your Gateway configuration file via the `security.certificates.apis` key - string array of certificate IDs or paths.

Select **Strip Authorization Data** to strip any authorization data from your API requests.  

Be aware that mutual TLS authorization has special treatment because it is not "authentication" and does not provide any identifying functionality, like keys, so you need to mix it with another authentication modes options like **Auth Key** or **Keyless**. On the dashboard, you need to choose **Use multiple auth mechanism** in the **Authentication mode** drop-down, where you should select **Mutual TLS** and another option which suits your use-case. 

### Fallback to HTTP Authorization 
The TLS protocol has no access to the HTTP payload and works on the lower level; thus the only information we have at the TLS handshake level is the domain. In fact, even a domain is not included into a TLS handshake by default, but there is TLS extension called SNI (Server Name Indication) 
which allows the client to send the domain name to the TLS handshake level. 

With this in mind, the only way to make API authorization work fully at the  TLS level, each API protected by Mutual TLS should be deployed on its own domain.

However, Tyk will gracefully fallback to a client certificate authorization at the HTTP level in cases when you want to have multiple mutual TLS protected APIs on the same domain, or you have clients that do not support the SNI extension. No additional configuration is needed. In case of such fallback, 
instead of getting TLS error, a client will receive 403 HTTP error.

### Authentication 
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

### Using with Authorization 
Mutual TLS authentication does not require mutual TLS authorization to be turned on, and can be used separately. For example, you may allow some of the users to be authenticated by using a token in the header or similar, and some of the users via client certificates. 

If you want to use them both, just configure them separately. No additional knowledge is required.

### Dynamic vs Static mTLS

There are two ways to set up client mTLS in Tyk: static and dynamic. Each method is suited to different use cases, as outlined below:

| Use Case                                                           | Static | Dynamic |
| ------------------------------------------------------------------ | :----: | :-----: |
| Let developers upload their own public certificates through the Developer Portal |   ❌    |   ✅      |
| Combine client mTLS with another authentication method           |   ✅    |   ✅      |
| Allow certs at the API level (one or more APIs per cert)           |   ✅    |   ❌      |
| Allow certs at an individual level (one or more APIs per cert)     |   ❌    |   ✅      |

## Dynamic mTLS

Dynamic Client mTLS in Tyk allows you to authenticate users based solely on the provided client certificate, without the need for an additional authentication key. Tyk can identify the user, apply policies, and monitor usage just as with regular API keys.

To set up Dynamic Client mTLS, we need to follow these steps:
* Protect the API: Configure the API in the API Designer by setting the authentication type to Auth Token and enabling Client Certificate.

* Generate a Self-Signed Certificate: Use OpenSSL to generate a self-signed certificate and key if you don't have one.

* Add a Key in the Dashboard: In the Tyk Dashboard, create a key for the API and upload only the public certificate.

* Make an API Request: Use curl with your certificate and key to make an API request to the protected API, ensuring the request returns a 200 response.

* Allow Developers to Upload Certificates: Create a policy and catalog entry for the API, allowing developers to request keys and upload their public certificates through the Developer Portal. Developers can then make API requests using their cert and private key.


### Protect the API

In the API Designer, set the Authentication Type to Auth Token under Target Details > Authentication mode. Then select Enable Client Certificate.

{{< img src="/img/api-management/security/client-mtls-api-setup.png" alt="Enable Client Certificate" >}}

### Generate a Self-Signed Key Pair

If you don’t already have a certificate, generate a self-signed key pair using the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

### Add a Key through the Dashboard

In the Tyk Dashboard, add a key for the API you set up in step #1. When uploading the certificate, ensure you only upload the public certificate.


{{< note success >}}
**Note**  
The certificate you upload for this key must only be the public certificate.
{{< /note >}}


### Make an API Request Using the Certificate

Now you can make a cURL request to the API using the certificate and private key:

```bash
curl -k --cert cert.pem --key key.pem https://localhost:8080/mtls-api/my-endpoint
```

A successful request should return a 200 response.

### Allow Developers to Upload Certificates

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

## Static mTLS

Static mTLS allows client certificates to be used at the API level. This method is straightforward and can be combined with another authentication method if needed.

### Configure the API

In the API authentication settings, choose mTLS as the authentication type and optionally select an additional authentication method. If you want to use only client certificates without another authentication method, select "keyless" as the other option.

### Set the Base Identity

The base identity can be anything, as the client certificate will be the primary authentication method.


### Setup Static mTLS in Tyk Operator using the Tyk Classic API Definition

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

### Setup Static mTLS in Tyk Operator using Tyk OAS API Definition

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


## FAQ

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


