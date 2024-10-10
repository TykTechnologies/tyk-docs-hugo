---
date: 2017-03-23T14:36:28Z
title: TLS and SSL
tags: ["TLS", "SSL", "Security"]
description: "How to enable SSL with the Tyk Gateway and Dashboard"
menu:
  main:
    parent: "Security"
weight: 2
aliases:
  - /security/tls-and-ssl/lets-encrypt/
  - /security/tls-and-ssl/
---

TLS connections are supported for all Tyk components.

We enable SSL in Tyk Gateway and Dashboard by modifying the `tyk.conf` and `tyk_analytics.conf` files.

If you need to, [generate self-signed certs](#self-signed-certs) first and come back.

{{< note success >}} 
**Note**

It is important to consider that TLS 1.3 doesn't support cipher selection. This isn't a Tyk decision, though.
{{< /note >}}

#### Add/Replace these sections in the conf files

**Note:** Don't copy and paste these entire objects as there are sibling values we don't want to override.

##### tyk.conf

```{.json}
Replace these individually
"listen_port: 8080",
"policies.policy_connection_string": "https://tyk-dashboard:3000"
"db_app_conf_options.connection_string": "https://tyk-dashboard:3000"

Use this whole object
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

Take note of the ports you setup are listening on and what your containers are expecting if you are using Containers.

##### tyk_analytics.conf

```{.json}
Replace these individually
"listen_port": 3000,
"tyk_api_config.Host": "https://tyk-gateway"

Use this whole object
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

If you are using self-signed certs or are in a test environment, [you can tell Tyk to ignore validation on certs Mutual TLS support](#self-signed-certs)


That's it!  Restart the servers/containers and they should now be using SSL:
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


## More Configuration

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


#### Values for TLS Versions

You need to use the following values for setting the TLS `min_version` and `max_version`:

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

#### Specify TLS Cipher Suites for Tyk Gateway & Tyk Dashboard

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

It is also possible to control whether the server selects the client's most preferred ciphersuite, or the server's most preferred ciphersuite.
If true, the server's preference as expressed in the order of elements in `ssl_ciphers` is used.

```json
{
  "http_server_options": {
    "prefer_server_ciphers": true
  }
}
```

### Using Tyk Certificate Storage
In Tyk Gateway 2.4 and Tyk Dashboard 1.4 we added [Mutual TLS support](https://tyk.io/docs/security/tls-and-ssl/mutual-tls/) including special Certificate storage, which is used to store all kinds of certificates from public to server certificates with private keys.

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

{{< note success >}}
**Note**  

This approach only works with the Tyk Gateway at present. Dashboard support has not been implemented yet.
{{< /note >}}


## Self Signed Certs

Self signed certificates can be managed in multiple ways.  

Best practice dictates that you store certificates in the standard certificate store on  the local system, e.g.
`/etc/ssl/certs`

For example, if you are using a self-signed cert on the Dashboard, in order for the Gateway to trust it, add it to the Gateway's certificate store in `/etc/ssl/certs`

Alternatively, you can disable the verification of SSL certs in the component configurations below.  **You shouln't do this in production!**

#### Gateway

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk.conf to allow the use of self-signed certificates when connecting to the Gateway.

####  Dashboard

You can set `http_server_options.ssl_insecure_skip_verify` to `true` in your tyk_analytics.conf to allow the use of self-signed certificates when connecting to the Dashboard.

#### API level

You can set `proxy.transport.ssl_insecure_skip_verify` in an API definition to allow Tyk to an insecure HTTPS/TLS API Upstream.

### Dynamically setting SSL certificates for custom domains

If you include certificateID or certificate path to an API definition `certificates` field, Gateway will dynamically load this ceritficate for your custom domain, so you will not need to restart the process. You can do it from the Dashboard UI too, in the custom domain section.

#### Setup in Tyk Operator using Tyk Classic API Definition {#tyk-operator-classic}

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

#### Define via Tyk Operator using Tyk OAS API Definition{#tyk-operator-oas}

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

### Validate Hostname against Common Name

From v2.9.3 you can force the validation of the hostname against the common name, both at the Gateway level via your `tyk.conf` and at the API level.

#### At the Gateway level

Set `ssl_force_common_name_check` to `true` in your `tyk.conf` file.

#### At the API level

Use `proxy.transport.ssl_force_common_name_check` in your API definition.

## Internal Proxy Setup

From v2.9.3 you can also specify a custom proxy and set the minimum TLS versions and any SSL ciphers within your API definitions. See [Internal Proxy Setup]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings.md#internal-proxy-setup" >}}) for more details.
