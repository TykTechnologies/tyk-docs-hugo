---
title: "How to Connect to DocumentDB with X.509 client cert"
date: 2020-03-26T10:32:49Z
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

As AWS DocumentDB runs with TLS enabled, we require a way to run it without disabling the TLS verification.
DocumentDB uses self-signed certs for verification, and provides a bundle with root certificates for this purpose, so we need a way to load this bundle.
Additionally DocumentDB can't be exposed to the local machine outside of the Amazon Virtual Private Cloud (VPC), which means that even if verification is turned on, it will always fail since if we use a SSH tunnel or a similar method, the domain will differ from the original. Also, it can have [Mutual TLS]({{< ref "/api-management/authentication-authorization#enable-mutual-tls" >}}) enabled.

So, in order to support it, we provide the following variables for both our [Tyk Analytics Dashboard]({{< ref "tyk-dashboard/configuration" >}}) and [Tyk Pump]({{< ref "tyk-pump/configuration" >}}):

* `mongo_ssl_ca_file` - path to the PEM file with trusted root certificates
* `mongo_ssl_pem_keyfile` - path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.
* `mongo_ssl_allow_invalid_hostnames` - ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed.


A working DocumentDB configuration looks like this (assuming that there is SSH tunnel, proxying to 27018 port).

```{.json}
  "mongo_url": "mongodb://testest:testtest@127.0.0.1:27018/tyk_analytics?connect=direct",
  "mongo_use_ssl": true,
  "mongo_ssl_insecure_skip_verify": false,
  "mongo_ssl_ca_file": "<path to>/rds-combined-ca-bundle.pem",
  "mongo_ssl_allow_invalid_hostnames": true,
```

### Capped Collections

If you are using DocumentDB, [capped collections]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}}) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details.
