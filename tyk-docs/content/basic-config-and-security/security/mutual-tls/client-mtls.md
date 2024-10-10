---
title: Client mTLS
tags: ["mTLS", "Static", "Dynamic"]
description: "How to set up client mTLS"
menu:
  main:
    parent: "Mutual TLS"
weight: 1
---

There are two ways to set up client mTLS in Tyk, **static** and **dynamic**.  They vary on your use case.

|         Use Case                                                           | Static |   Dynamic     | 
|----------------------------------------------------------------------------|--------|---------------|
| Let developers upload their own public certificates through the Developer Portal                 | ❌ | ✅ |
| Combine client mTLS with another authentication method                                           | ✅ | ✅ |
| Allow certs at the API level       *(one or more APIs per cert)*                             | ✅ | ❌ |
| Allow certs at an individual level *(one or more APIs per cert)*                             | ❌ | ✅ |


## Dynamic Client mTLS
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

The basic idea here is that you can create a key based on a provided certificate. You can then use this key **or** the cert for one or more users.

#### Quickstart 

1. To setup, first protect the API by setting the Authentication Type in the **API Designer**, select Auth Token from the Target Details > Authentication mode. Then select **Enable Client Certificate** as below:

{{< img src="/img/2.10/client_cert.png" alt="enable_cert" >}}

2. Let's generate a self-signed key pair to use in the following.  Skip this step if you already have your own certs.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

3. Add a key through the Dashboard, and select the API from step #1 in the Access Rights

{{< note success >}} 
**Note**

The certificate you upload for this key **must only be the public certificate**.
{{< /note >}}

{{< img src="/img/2.10/client_mtls_add_cert.png" alt="keys_cert" >}}


4. And now we can make a cURL to this API using the cert + private key.

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

#### Developer Portal - Self Serve Cert Trust

Instead of manually creating keys, we can expose the Above API via the Developer Portal, where developers can add their own certs to use to access APIs.

1. Create a policy for the API we set up above
2. Create a catalog entry for this policy
3. As a developer on the Portal, request a key for this API.  This will take us to this screen:

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="portal_cert_request" >}}

Add your public cert (cert.pem from above) into here and hit "Request Key".  

Now we can make an API request just using the pub + private key:

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

## Static mTLS

Static mTLS simply means to allow client certs at the API level.

To set it up, in the API authentication settings, choose mTLS and one other authentication type.  If you don't want to use additional authentication type, i.e. only client cert alone, then select "keyless" as the other.

The base Identity can be anything as the client cert is the only thing configured.

Here's what it should look like:
{{< img src="/img/2.10/client_mtls_multiple_auth.png" alt="enable_cert" >}}

### Setup Static mTLS in Tyk Operator using the Tyk Classic API Definition{#tyk-operator-classic}

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

### Setup Static mTLS in Tyk Operator using Tyk OAS API Definition{#tyk-operator-oas}

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

#### Why am I getting "Unauthorized! Header Not Found" Error?

From a technical point of view, this is an extension of Auth token authentication mode. To enable this feature, set the API definition `auth.use_certificate.` boolean variable to `true`. 

#### Can I use both public and private key concatenated when uploading into the Dashboard?

You can do this ONLY through the manual "Create A Key" flow as an Admin Dashboard user.  Through the Portal, you must ONLY paste the contents of the public key, or cert as it is typically called.

#### Can I register a root Certificate Authority (CA) certificate with Tyk so that Tyk will validate requests with certificates signed by this CA?

Yes, you can upload a root CA certificate as a client certificate for static mTLS authentication. This configuration will allow clients presenting certificates signed by that CA to be validated.

Key points:
1. The root CA certificate can be used as a client certificate, simply upload it to Tyk as you would a client certificate.
2. Clients with certificates signed by this CA will be accepted.
3. During verification, Tyk gateway traverses the certificate chain for validation.

{{< note success >}}
**Note**

Root CA certificates work only with [static mTLS]({{<ref "#static-mtls" >}}) and are not compatible with dynamic  [dynamic mTLS]({{<ref "#dynamic-client-mtls" >}}).
{{< /note >}}
