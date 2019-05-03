---
date: 2017-03-23T14:36:28Z
title: TLS and SSL
menu:
  main:
    parent: "Security"
weight: 2
url: "/security/tls-and-ssl"
---

Tyk supports TLS connections, and as of version 2.0 all TLS connections will also support HTTP/2. To enable SSL in your Tyk Gateway and Dashboard, you will need to modify the `tyk.conf` and `tyk_analytics.conf` files to include a server options section like so:

```{.copyWrapper}
"http_server_options": {
  "use_ssl": true,
  "server_name": "yoursite.com",
  "min_version": 771,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
},
```
    

You can enter multiple certificates, that link to multiple domain names, this enables you to have multiple SSL certs for your gateways or dashboard domains if they are providing access to different domains via the same IP.

The `min_version` setting is optional, you can set it to have Tyk only accept connections from TLS V1.0, 1.1 and 1.2 respectively.

#### Values for TLS Versions

You need to use the following values for setting the TLS `min_version`:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |


#### Specify TLS Cipher Suites for Tyk Gateway & Tyk Dashboard

Each protocol (TLS 1.0, 1.1, 1.2) provides cipher suites. With strength of encryption determined by the cipher negotiated between client & server.

You can optionally add the additional `http_server_options` config option `ssl_ciphers` in `tyk.conf` and `tyk-analytics.conf` which takes an array of strings as its value.

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

* Using tyk.conf:
  
```
     "http_server_options": {
        "ssl_certificates": ["<cert-id-1>", "<cert-id-2>"]
     }
```
  
  * Using environmental variables (handy for Multi-Cloud installation and Docker in general): `TYK_GW_HTTPSERVEROPTIONS_SSLCERTIFICATES=<cert-id>` (if you want set multiple certificates just separate them using comma)
  
The Domain in this case will be extracted from standard certificate fields: `Subject.CommonName` or `DNSNames`.

> **Note**: this approach only works with the Tyk Gateway at present. Dashboard support has not been implemented yet.

### Dynamically setting SSL certificates for custom domains

If you include certificateID or certificate path to API definition `certificates` field, Gateway will dynamically load this ceritficate for your custom domain, so you will not need to restart the process. You can do it from Dashboard UI too, in custom domain section.
