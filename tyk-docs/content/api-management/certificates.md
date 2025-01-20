---
date: 2025-01-05T14:36:28Z
title: Certificates - TLS and SSL
tags: ["TLS", "SSL", "Security", "Certificate", "Pinning"]
description: "How to enable SSL with the Tyk Gateway and Dashboard"
menu:
  main:
    parent: "Security"
weight: 2
aliases:
  - security/tls-and-ssl/lets-encrypt/
  - security/tls-and-ssl/
  - basic-config-and-security/security/tls-and-ssl
  - basic-config-and-security/security/certificate-pinning/
  - security/certificate-pinning
---

## Introduction

Secure communication is essential in today's digital landscape. TLS/SSL protocol and Public Key Infrastructure (PKI) play a crucial role in ensuring encrypted and authenticated connections. This document provides a comprehensive walkthrough on configuring TLS/SSL, managing certificates for the Tyk Gateway and Dashboard.

In this section, we delve into the following key topics: 

1. **[Enabling TLS in Tyk]({{< ref "#enable-tlsssl-in-tyk" >}})**: 
    Learn how to enable and configure TLS/SSL for Tyk Gateway and Dashboard to secure your communication.
2. **[TLS Support in Tyk]({{< ref "#tlsssl-support" >}})**: 
    Understand the supported TLS versions, cipher suites, their configurations, and best practices for secure communication.
3. **[Configuring Tyk Certificate Storage]({{< ref "#using-tyk-certificate-storage" >}})**: 
    Discover how to manage and store certificates for seamless TLS configuration in Tyk.
4. **[Advance TLS Configuration]({{< ref "#additional-tlsssl-configuration" >}})**: 
    Explore advanced TLS settings for enhanced security.
5. **[Self Signed Certificates]({{< ref "#self-signed-certificates" >}})**: 
    Learn how to configure and use self-signed certificates for secure communication in Tyk.
6. **[Configuring Internal Proxy Setup]({{< ref "#internal-proxy-setup" >}})**: 
    Set up internal proxies with TLS to ensure secure communication within your architecture.
7. **[Configuring Certificate Pinning]({{< ref "#certificate-pinning" >}})**: 
    Learn how to enable certificate pinning for added security against Man In The Middle (MITM) attacks.

## Enable TLS/SSL in Tyk

TLS/SSL protocol is supported by all Tyk components. You can enable SSL in Tyk Gateway and Dashboard by modifying the `tyk.conf` and `tyk_analytics.conf` files.

For self signed certificates additional consideration has to be taken place, [refer the below section]({{< ref "#self-signed-certificates" >}}).

<br>

{{< note success >}} 
**Note**

It is important to consider that TLS 1.3 doesn't support [cipher](https://en.wikipedia.org/wiki/Cipher_suite) selection. This isn't a Tyk decision, though.
{{< /note >}}

### Gateway

The below **tyk.conf** is the minimum to enable TLS/SSL.

```json
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
}
```

### Dashboard

**tyk_analytics.conf**

```json
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
}
```

If you are using self-signed certs or are in a test environment, [you can tell Tyk to ignore validation on certs Mutual TLS support]({{< ref "#self-signed-certificates" >}})

### Testing TLS/SSL Configuration

Restart the servers/containers and they should now be using SSL:
```{.copyWrapper}
$ docker-compose up tyk-gateway tyk-dashboard
...
tyk-gateway_1     | time="Apr 24 18:30:47" level=info msg="--> Using TLS (https)" prefix=main
tyk-gateway_1     | time="Apr 24 18:30:47" level=warning msg="Starting HTTP server on:[::]:443" prefix=main
...
```

And then we can curl both servers:
```{.copyWrapper}
$ curl -k https://localhost:8080/hello
{"status":"pass","version":"v3.0.0","description":"Tyk GW","details":{"dashboard":{"status":"pass","componentType":"system","time":"2020-08-28T17:19:49+02:00"},"redis":{"status":"pass","componentType":"datastore","time":"2020-08-28T17:19:49+02:00"}}}

$ curl -k https://localhost:3000
<html response>
```

## TLS/SSL Configuration Fields

```{.copyWrapper}
"http_server_options": {
  "use_ssl": true,
  "server_name": "yoursite.com",
  "min_version": 771,
  "max_version": 772,
  "ssl_ciphers": ["TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"],
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
},
```


You can enter multiple certificates, that link to multiple domain names, this enables you to have multiple SSL certs for your Gateways or Dashboard domains if they are providing access to different domains via the same IP.

The `min_version` setting is optional, you can set it to have Tyk only accept connections from TLS V1.0, 1.1, 1.2 or 1.3 respectively.

The `max_version` allows you to disable specific TLS versions, for example if set to 771, you can disable TLS 1.3. 

Finally, set the [host_config.generate_secure_paths]({{< ref "tyk-dashboard/configuration#host_configgenerate_secure_paths" >}}) flag to `true` in your `tyk_analytics.conf`

## TLS/SSL Support

### Supported TLS Versions

You need to use the following values for setting the TLS `min_version` and `max_version`. The numbers associated with the TLS versions (e.g., 769 for TLS 1.0, 770 for TLS 1.1, etc.) represent protocol version numbers used in the TLS protocol specification. These are standardized numerical values assigned by the Internet Engineering Task Force (IETF) to identify each TLS version during communication.

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

{{< note success >}}
**Note**  

If you do not configure minimum and maximum TLS versions, then Tyk Gateway will default to:
 - minimum TLS version: 1.0
 - maximum TLS version: 1.2
{{< /note >}}

### Supported TLS Cipher Suites

Each protocol (TLS 1.0, 1.1, 1.2, 1.3) provides cipher suites. With strength of encryption determined by the cipher negotiated between client & server.

You can optionally add the additional `http_server_options` config option `ssl_ciphers` in `tyk.conf` and `tyk-analytics.conf` which takes an array of strings as its value. 


{{< note info >}}
**Note**  

TLS 1.3 protocol does not allow the setting of custom ciphers, and is designed to automatically pick the most secure cipher.
{{< /note >}}

Each string must be one of the allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants

For example:

```json
{
  "http_server_options": {
    "ssl_ciphers": ["TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"],
  }
}
```

If no ciphers match, Tyk will default to golang crypto/tls standard ciphers.

```text
"ssl_ciphers": ["TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"]

SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES128-SHA256
    Session-ID: 8246BAFF7396BEDE71FD5AABAD493A1DD2CAF4BD70BA9A816AD2969CFD3EAA98
    Session-ID-ctx:
    Master-Key: 3BB6A2623FCCAD272AE0EADFA168F13FDAC83CEAFCA232BD8A8B68CEACA373552BE5340A78672A116A908E61EEF0AD29
```

```text
"ssl_ciphers": ["TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"]

2018/06/22 18:15:00 http: TLS handshake error from 127.0.0.1:51187: tls: no cipher suite supported by both client and server

SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : 0000
    Session-ID:
    Session-ID-ctx:
    Master-Key:
    Start Time: 1529687700
    Timeout   : 7200 (sec)
    Verify return code: 0 (ok)
```

```text
"ssl_ciphers": ["junk or empty"]

SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES256-GCM-SHA384
    Session-ID: A6CFF2DCCE2344A59D877872F89BDC9C9B2F15E1BBAE8C7926F32E15F957AA2B
    Session-ID-ctx:
    Master-Key: 88D36C895808BDF9A5481A8CFD68A0B821CF8E6A6B8C39B40DB22DA82F6E2E791C77A38FDF5DC6D21AAE3D09825E4A2A
```

## Additional TLS/SSL Configuration

### Validate Hostname against Common Name

From v2.9.3 you can force the validation of the hostname against the common name, both at the Gateway level via your `tyk.conf` and at the API level.

{{< tabs_start >}}

{{< tab_start "Gateway Level" >}}
Set `ssl_force_common_name_check` to `true` in your `tyk.conf` file.
{{< tab_end >}}

{{< tab_start "API Level" >}}
Use `proxy.transport.ssl_force_common_name_check` in your API definition.
{{< tab_end >}}

{{< tabs_end >}}

### Dynamically setting SSL certificates for custom domains

If you include certificateID or certificate path to an API definition `certificates` field, Gateway will dynamically load this ceritficate for your custom domain, so you will not need to restart the process. You can do it from the Dashboard UI too, in the custom domain section.

{{< tabs_start >}}

{{< tab_start "Tyk Operator - Classic API" >}}
Let say the domain certificate is stored in secret named `my-test-tls` in the same namespace as this ApiDefinition resource `httpbin`. You can provide the domain certificate in `certificate_secret_names` field. Tyk Operator will help you retrieve the certificate from secret and upload it to Tyk.

```yaml{linenos=true, linenostart=1, hl_lines=["10-11"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: https
  listen_port: 8443
  certificate_secret_names:
    - my-test-tls
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```
{{< tab_end >}}

{{< tab_start "Tyk Operator - OAS API" >}}
You can also manage custom domain certificates using Kubernetes secrets in Tyk OAS.

Example of Defining Custom Domain Certificates

```yaml{linenos=true, linenostart=1, hl_lines=["50-51"]}
# Secret is not created in this manifest.
# Please store custom domain certificate in a kubernetes TLS secret `custom-domain-secret`.
apiVersion: v1
data:
  test_oas.json: |-
    {
      "info": {
        "title": "Petstore with custom domain",
        "version": "1.0.0"
      },
      "openapi": "3.0.3",
      "components": {},
      "paths": {},
      "x-tyk-api-gateway": {
        "info": {
          "name": "Petstore with custom domain",
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
  name: petstore-with-customdomain
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
  customDomain:
    enabled: true
    name: "buraksekili.dev"
    certificatesRef:
      - custom-domain-secret
```

This example shows how to enable a custom domain (`buraksekili.dev`) with a TLS certificate stored in a Kubernetes secret (`custom-domain-secret`).
{{< tab_end >}}

{{< tabs_end >}}


## Using Tyk Certificate Storage

In Tyk Gateway 2.4 and Tyk Dashboard 1.4 we added [Mutual TLS support](https://tyk.io/docs/security/tls-and-ssl/mutual-tls/) including special Certificate storage, which is used to store all kinds of certificates from public to server certificates with private keys.

{{< note success >}}
**Note**  

This approach only works with the Tyk Gateway at present. Dashboard support has not been implemented yet.
{{< /note >}}

In order to add new server certificates:

1. Ensure that both private key and certificates are in PEM format
2. Concatenate Cert and Key files to single file
3. Go to "Certificates" section of the Tyk Dashboard, upload certificate, and you will get a unique ID response
4. Set it to the Tyk Gateway using one of the approaches below:

    * Using your `tyk.conf`:

    ```
        "http_server_options": {
            "ssl_certificates": ["<cert-id-1>", "<cert-id-2>"]
        }
    ```

    * Using environment variables (handy for Multi-Cloud installation and Docker in general): `TYK_GW_HTTPSERVEROPTIONS_SSLCERTIFICATES=<cert-id>` (if you want to set multiple certificates just separate them using a comma.)

    The Domain in this case will be extracted from standard certificate fields: `Subject.CommonName` or `DNSNames`.

    {{< note success >}}
**Note**  

`Subject.CommonName` is deprecated and its support will be removed in Tyk V5.
    {{< /note >}}

## Self Signed Certificates

Self signed certificates can be managed in multiple ways.  

Best practice dictates that you store certificates in the standard certificate store on  the local system, e.g.
`/etc/ssl/certs`

For example, if you are using a self-signed cert on the Dashboard, in order for the Gateway to trust it, add it to the Gateway's certificate store in `/etc/ssl/certs`

Alternatively, you can disable the verification of SSL certs in the component configurations below.  **You shouln't do this in production!**

### Gateway

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk.conf to allow the use of self-signed certificates when connecting to the Gateway.

###  Dashboard

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk_analytics.conf to allow the use of self-signed certificates when connecting to the Dashboard.

### API level

You can set `proxy.transport.ssl_insecure_skip_verify` in an API definition to allow Tyk to an insecure HTTPS/TLS API Upstream.

## Internal Proxy Setup

From v2.9.3 you can also specify a custom proxy and set the minimum TLS versions and any SSL ciphers within your API definitions. See [Internal Proxy Setup]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings.md#internal-proxy-setup" >}}) for more details.

## Certificate Pinning

Certificate pinning is a feature which allows you to allow only specific public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

Using Tyk you can allow one or multiple public keys per domain. Wildcard domains are also supported.

Public keys are stored inside the Tyk certificate storage, so you can use Certificate API to manage them.

{{< note success >}}
**Note**  

Only public keys in PEM format are supported.
{{< /note >}}

If public keys are not provided by your upstream, you can extract them
by yourself using the following command:
```{.copyWrapper}
openssl s_client -connect httpbin.org:443 -servername httpbin.org 2>/dev/null | openssl x509 -pubkey -noout
```
If you already have a certificate, and just need to get its public key, you can do it using the following command:
```{.copyWrapper}
openssl x509 -pubkey -noout -in cert.pem
```

{{< note success >}}
**Note**  

Upstream certificates now also have wildcard domain support.
{{< /note >}}

### Configuring Certificate Pinning

To configure **Certificate Pinning** with specific settings or advanced configurations, complete the following steps in the tabs below.:

{{< tabs_start >}}

{{< tab_start "Gateway Level" >}}
You can define them globally, from the Tyk Gateway configuration file - `tyk.conf` using the `security.pinned_public_keys` field, using the following format:
```
{
  "example.com": "<key-id>",
  "foo.com": "/path/to/pub.pem",
  "*.wild.com": "<key-id>,<key-id-2>"
}
```

For `key-id` you should set the ID returned after you upload the public key using the Certificate API. Additionally, you can just set path to the public key located on your server. You can specify multiple public keys by separating their IDs by a comma.
{{< tab_end >}}

{{< tab_start "API Level" >}}
You can define them via an API definition `pinned_public_keys` field, using the following format:
```
{
  "example.com": "<key-id>",
  "foo.com": "/path/to/pub.pem",
  "*.wild.com": "<key-id>,<key-id-2>"
}
```

For `key-id` you should set the ID returned after you upload the public key using the Certificate API. Additionally, you can just set path to the public key located on your server. You can specify multiple public keys by separating their IDs by a comma.
{{< tab_end >}}

{{< tab_start "Dashboard UI" >}}

You can define certificate public key pinning from the **Advanced** tab of the API Designer.

{{< img src="/img/2.10/cert_public_key_pinning.png" alt="Certificate Pinning" >}}

1. Click **Attach Certificate**
{{< img src="/img/2.10/add_public_keys.png" alt="Pinning Options" >}}
1. From the **Add upstream certificates** options add the domain details and then add a new certificate ID or the server path to a certificate, or select from any certificates you have added previously.
2. Click **Add**

{{< tab_end >}}

{{< tab_start "Tyk Operator - Classic" >}}
Tyk Operator supports configuring certificate pinning using one of the following fields within the ApiDefinition object:

- **pinned_public_keys**: Use public keys uploaded via the Certificate API.
- **pinned_public_keys_refs**: Uses public keys configured from Kubernetes secret objects.

###### pinned_public_keys

Use the `pinned_public_keys` mapping to pin public keys to specific domains, referencing public keys that have been uploaded to Tyk Certificate storage via the Certificate API.  

```yaml
pinned_public_keys:
  "foo.com": "<key_id>",
  "*": "<key_id-1>,<key_id-2>"
```

Each `key-id` value should be set to the ID returned from uploading the public key via the Certificate API. Multiple public keys can be specified by separating their IDs by a comma.

<br>

###### pinned_public_keys_refs

The `pinned_public_keys_refs` mapping should be used to configure pinning of public keys sourced from Kubernetes secret objects for different domains.

Each key should be set to the name of the domain and the value should refer to the name of a Kuberenetes secret object that holds the corresponding public key for that domain.

Wildcard domains are supported and "*" can be used to denote all domains.

{{< warning >}}
**Caveats**

- Only *kubernetes.io/tls* secret objects are allowed.
- Please use the *tls.crt* field for the public key.
- The secret that includes a public key must be in the same namespace as the ApiDefinition object.
{{< /warning >}}

The example below illustrates a scenario where the public key from the Kubernetes secret object, *httpbin-secret*, is used for all domains, denoted by the wildcard character '*'. In this example the *tls.crt* field of the secret is set to the actual public key of *httpbin.org*. Subsequently, if you any URL other than https://httpbin.org is targetted (e.g. https://github.com/) a *public key pinning error* will be raised for that particular domain. This is because the public key of *httpbin.org* has been configured for all domains.

```yaml
# ApiDefinition object 'pinned_public_keys_refs' field uses the following format:
#  spec:
#   pinned_public_keys_refs:
#    "domain.org": <secret_name> # the name of the Kubernetes Secret Object that holds the public key for the 'domain.org'.
#
# In this way, you can refer to Kubernetes Secret Objects through 'pinned_public_keys_refs' field.
#
# In this example, we have an HTTPS upstream target as `https://httpbin.org`. The public key of httpbin.org is obtained
# with the following command:
#   $ openssl s_client -connect httpbin.org:443 -servername httpbin.org 2>/dev/null | openssl x509 -pubkey -noout
#
# Note: Please set tls.crt field of your secret to actual public key of httpbin.org.
#
# We are creating a secret called 'httpbin-secret'. In the 'tls.crt' field of the secret, we are specifying the public key of the
#  httpbin.org obtained through above `openssl` command, in the decoded manner.
#
apiVersion: v1
kind: Secret
metadata:
  name: httpbin-secret
type: kubernetes.io/tls
data:
  tls.crt: <PUBLIC_KEY> # Use tls.crt field for the public key.
  tls.key: ""
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-certificate-pinning
spec:
  name: httpbin - Certificate Pinning
  use_keyless: true
  protocol: http
  active: true
  pinned_public_keys_refs:
    "*": httpbin-secret
  proxy:
    target_url: https://httpbin.org
    listen_path: /pinning
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
```

{{< tab_end >}}

{{< tab_start "Tyk Operator - OAS" >}}

Tyk Operator supports certificate pinning in Tyk OAS custom resource, allowing you to secure your API by pinning a public key stored in a secret to a specific domain.

Example of public keys pinning

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm
  namespace: default
data:
  test_oas.json: |-
    {
      "info": {
        "title": "httpbin with certificate pinning",
        "version": "1.0.0"
      },
      "openapi": "3.0.3",
      "components": {},
      "paths": {},
      "x-tyk-api-gateway": {
        "info": {
          "name": "httpbin with certificate pinning",
          "state": {
            "active": true
          }
        },
        "upstream": {
          "url": "https://httpbin.org/"
        },
        "server": {
          "listenPath": {
            "value": "/httpbin/",
            "strip": true
          }
        }
      }
    }
---
apiVersion: v1
kind: Secret
metadata:
  name: domain-secret
type: kubernetes.io/tls # The secret needs to be a type of kubernetes.io/tls
data:
  tls.crt: <PUBLIC_KEY>
  tls.key: ""
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: "oas-pinned-public-keys"
spec:
  tykOAS:
    configmapRef:
      keyName: test_oas.json
      name: cm
  certificatePinning:
    enabled: true
    domainToPublicKeysMapping:
      - domain: "httpbin.org"
        publicKeyRefs:
          - domain-secret
```

This example demonstrates how to enable certificate pinning for the domain `httpbin.org` using a public key stored in a Kubernetes secret (`domain-secret`).
{{< tab_end >}}

{{< tabs_end >}}