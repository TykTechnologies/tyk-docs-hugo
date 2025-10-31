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
  - security/tls-and-ssl/lets-encrypt
  - security/tls-and-ssl
  - basic-config-and-security/security/tls-and-ssl
  - basic-config-and-security/security/certificate-pinning
---

## Introduction

Secure communication is essential in today's digital landscape. TLS/SSL protocol and Public Key Infrastructure (PKI) play a crucial role in ensuring encrypted and authenticated connections. This document provides a comprehensive walkthrough on configuring TLS/SSL, managing certificates for the Tyk Gateway and Dashboard.

In this section, we delve into the following key topics: 

1. **[Enabling TLS in Tyk components]({{< ref "api-management/certificates#enable-tlsssl-in-tyk-components" >}})**: 
    Learn how to enable and configure TLS/SSL for Tyk Gateway and Dashboard to secure your communication.
2. **[TLS Support in Tyk]({{< ref "api-management/certificates#tlsssl-configuration" >}})**: 
    Understand the supported TLS versions, cipher suites, their configurations, and best practices for secure communication.
3. **[Configuring Tyk Certificate Storage]({{< ref "api-management/certificates#using-tyk-certificate-storage" >}})**: 
    Discover how to manage and store certificates for seamless TLS configuration in Tyk.
    Explore advanced TLS settings for enhanced security.
4. **[Self Signed Certificates]({{< ref "api-management/certificates#self-signed-certificates" >}})**: 
    Learn how to configure and use self-signed certificates for secure communication in Tyk.
5. **[Configuring Internal Proxy Setup]({{< ref "api-management/certificates#internal-proxy-setup" >}})**: 
    Set up internal proxies with TLS to ensure secure communication within your architecture.

### Certificates 

If you have had to configure an SSL server or SSH access, the following information below should be familiar to you. 

Let's start with certificate definition. Here is what [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) says:

> In cryptography, a public key certificate, also known as a digital certificate or identity certificate, is an electronic document used to prove the ownership of a public key. The certificate includes information about the key, information about the identity of its owner (called the subject), and the digital signature of an entity that has verified the certificate's contents (called the issuer). If the signature is valid, and the software examining the certificate trusts the issuer, then it can use that key to communicate securely with the certificate's subject.

When it comes to authorization, it is enough for the server that has a public client certificate in its trusted certificate storage to trust it. However, if you need to send a request to the server protected by mutual TLS, or need to configure the TLS server itself, you also need to have a private key, used while generating the certificate, to sign the request.

Using Tyk, you have two main certificate use cases:

1. Certificates without public keys used for [client authorization and authentication]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#why-use-mutual-tls" >}})
2. Certificates with private keys used for [upstream access]({{< ref "api-management/upstream-authentication/mtls" >}}), and server certificates (in other words when we need to sign and encrypt the request or response).

### PEM format

Before a certificate can be used by Tyk, it must be encoded into **PEM format**. If you are using an `openssl` command to generate certificates, it should use PEM by default. A nice bonus of the PEM format is that it allows having multiple entries inside the same file. So in cases where a certificate also requires a private key, you can just concatenate the two files together.

## Enable TLS/SSL in Tyk components

TLS protocol is supported by all Tyk components. You can enable TLS in Tyk Gateway and Dashboard by modifying the `tyk.conf` and `tyk_analytics.conf` files.

For self signed certificates additional consideration has to be taken place, [refer to the section below]({{< ref "#self-signed-certificates" >}}).

<br>

### Gateway

You'll need to add the following to your **tyk.conf** as the minimum to enable TLS for the Gateway:

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

You'll need to add the following to your **tyk_analytics.conf** as the minimum to enable TLS for the Dashboard:

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

Set the [host_config.generate_secure_paths]({{< ref "tyk-dashboard/configuration#host_configgenerate_secure_paths" >}}) flag to `true` so that your Dashboard URL starts with HTTPS.

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

### MDCB 

Mutual TLS configuration in an MDCB environment has specific requirements. An MDCB environment consists of a Control Plane and multiple Data Planes that, using MDCB, sync configuration. 
The Control Plane and Data Plane deployments usually do not share any secrets; thus a certificate with private keys encoded with secret in the Control Plane will not be accessible to Data Plane gateways. 

To solve this issue, you need to set `security.private_certificate_encoding_secret`  in the MDCB configuration file to the same value as specified in your management Gateway configuration file. By knowing the original secret, MDCB will be able to decode private keys, and 
send them to client without password. Using a secure connection between Data Plane Gateways and MDCB is required in this case. See MDCB setup page for use_ssl usage.


## TLS/SSL Configuration

TLS is configured in the `http_server_options` section of your Gateway and Dashboard configuration files. This has the following structure, common to both components:

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

- `min_version` and `max_version` are optional and allow you to configure the [versions of TLS]({{< ref "#supported-tls-versions" >}}) from which Tyk will accept connections
- `ssl_ciphers` allows you to select the [cipher suite]({{< ref "#supported-tls-cipher-suites" >}}) that will be used to negotiate connections
- you can enter multiple certificates to be used in the encryption that will be applied for different domain names, this enables you to have multiple TLS certs for your Gateways or Dashboard domains if they are providing access to different domains via the same IP

### Supported TLS Versions

You need to use the following values for setting the TLS `min_version` and `max_version`. The numbers associated with the TLS versions represent protocol version numbers used in the TLS protocol specification. These are standardized numerical values assigned by the Internet Engineering Task Force (IETF) to identify each TLS version during communication.

| TLS Version           | Value to Use   |
|-----------------------|----------------|
|      1.0 (see note)   |      769       |
|      1.1 (see note)   |      770       |
|      1.2              |      771       |
|      1.3              |      772       |

If you do not configure minimum and maximum TLS versions, then Tyk Gateway will default to:
 - minimum TLS version: 1.2
 - maximum TLS version: 1.3

{{< note success >}}
**Note**  

Tyk uses Golang libraries to provide TLS functionality, so the range of TLS versions supported by the Gateway is dependent upon the underlying library. Support for TLS 1.0 and 1.1 was removed in Go 1.22 (which was adopted in Tyk 5.3.6/5.6.0), so these are no longer supported by Tyk.
{{< /note >}}

### Supported TLS Cipher Suites

The strength of encryption is determined by the cipher that is negotiated between client & server; each version of the TLS protocol provides a suite of available ciphers. 

TLS 1.3 protocol does not allow the setting of custom ciphers, and is designed to automatically pick the most secure cipher.

When using earlier TLS protocols, you can deliberately choose the ciphers to be used using the `http_server_options` config option `ssl_ciphers` in `tyk.conf` and `tyk-analytics.conf`. This takes an array of strings as its value. Each string must be one of the allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants

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


## Certificate Management 

Tyk provides two options to manage certificates: plain files or certificate storage with a separate API.

All configuration options, which require specifying certificates, support both plain file paths or certificate IDs. You are able to mix them up, and Tyk will automatically distinguish file names from certificate IDs.

The Tyk Gateway and Dashboard Admin APIs provide endpoints to create, remove, list, and see information about certificates. For the Gateway, the endpoints are:

* Create: `POST /tyk/certs` with PEM body. Returns `{"id": "<cert-id>", ... }`
* Delete: `DELETE /tyk/certs/<cert-id>`
* Get info: `GET /tyk/certs/<cert-id>`. Returns meta info about the certificate, something similar to: 
```json
{ 
  "id": "<cert-id>",
  "fingerprint": <fingerprint>,
  "has_private_key": false, 
  "issuer": <issuer>,
  "subject": "<cn>", ... 
}
```
* Get info about multiple certificates: `GET /tyk/certs/<cert-id1>,<cert-id2>,<cert-id3>`. 
Returns array of meta info objects, similar to above.
* List all certificate IDs: `GET /tyk/certs`. Returns something similar to:

```json
{ "certs": "<cert-id1>", "<cert-id2>", ...  }
```

The Dashboard Admin API is very similar, except for a few minor differences:

* Endpoints start with `/api` instead of `/tyk`, e.g. `/api/certs`, `/api/certs/<cert-id>`, etc.
* All certificates are managed in the context of the organization. In other words, certificates are not shared between organizations.

Certificate storage uses a hex encoded certificate SHA256 fingerprint as its ID. When used with the Dashboard API, Tyk additionally appends the organization id to the certificate fingerprint. It means that certificate IDs are predictable, and you can check certificates by their IDs by manually 
generating certificate SHA256 fingerprint using the following command:
 
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>.
```

You may notice that you can't get the raw certificate back, only its meta information. This is to ensure security. Certificates with private keys have special treatment and are encoded before storing. If a private key is found it will be encrypted with AES256 algorithm 3 using the `security.private_certificate_encoding_secret` secret, defined in `tyk.conf` file. Otherwise, the certificate will use the [secret]({{< ref "tyk-oss-gateway/configuration#secret" >}}) value in `tyk.conf`.

### Using Tyk Certificate Storage

In Tyk Gateway 2.4 and Tyk Dashboard 1.4 we added [Mutual TLS support]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#why-use-mutual-tls" >}}) including special Certificate storage, which is used to store all kinds of certificates from public to server certificates with private keys.

In order to add new server certificates to the Gateway:

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

    The Domain in this case will be extracted from standard certificate fields: `DNSNames`.

    {{< note success >}}
**Note**  

Prior to Tyk v5, the Domain could also be extracted from the now deprecated `Subject.CommonName` field.
    {{< /note >}}

## Self Signed Certificates

Self signed certificates can be managed in multiple ways.  

Best practice dictates that you store certificates in the standard certificate store on  the local system, e.g.
`/etc/ssl/certs`

For example, if you are using a self-signed cert on the Dashboard, in order for the Gateway to trust it, add it to the Gateway's certificate store in `/etc/ssl/certs`

Alternatively, you can disable the verification of SSL certs in the component configurations below.  **You shouln't do this in production!**

### Creating a self-signed certificate pair
You can create self-signed client and server certificates with this command:
```{.copyWrapper}
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

For the server in `common name` specify a domain, or just pass `-subj "/CN=localhost"` to OpenSSL command. Then follow our [TLS and SSL Guide]({{< ref "api-management/certificates" >}}).

To get certificate SHA256 fingerprint use the following command:

```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>
```

If you are testing using cURL, your command will look like: 

```{.copyWrapper}
curl --cert client_cert.pem --key client_key.pem https://localhost:8181
```

### Using self-signed certificates with Tyk Gateway

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk.conf to allow the use of self-signed certificates when connecting to the Gateway.

###  Using self-signed certificates with Tyk Dashboard

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk_analytics.conf to allow the use of self-signed certificates when connecting to the Dashboard.



## Internal Proxy Setup

From v2.9.3 you can also specify a custom proxy and set the minimum TLS versions and any SSL ciphers within your API definitions. See [Internal Proxy Setup]({{< ref "api-management/gateway-config-tyk-classic#proxy-transport-settings" >}}) for more details.


