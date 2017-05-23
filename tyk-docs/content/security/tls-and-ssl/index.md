---
date: 2017-03-23T14:36:28Z
title: TLS and SSL
menu:
  main:
    parent: "Security"
weight: 2
url: "/security/tls-and-ssl"
---

Tyk supports TLS connections, and as of version 2.0 all TLS connections will also support HTTP/2. To enable SSL in your Tyk gateway and dashboard, you will need to modify the `tyk.conf` and `tyk_analytics` files to include a server options section like so:

```
    "http_server_options": {
        "use_ssl": true,
        "server_name": "yoursite.com",
        "min_version": "1.2",
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

The `min_version` setting is optional, you can set it to `1.0`, `1.1` or `1.2` to to have Tyk only accept connections from TLS V1.0, 1.1 and 1.2 respectively.

