---
date: 2017-03-23T17:01:35Z
title: Certificate Pinning
menu:
  main:
    parent: "Security"
weight: 7 
---

Certificate pinning is a feature which allows you to whitelist public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

Using Tyk you can whitelist one or multiple public keys per domain. Wildcard domains are also supported.

Public keys are stored inside the Tyk certificate storage, so you can use Certificate API to manage them.

## <a name="define-with-api"></a>Define via Gateway Config file or API Definition

You can define them globally, from the Tyk Gateway configuration file - `tyk.conf` using the `security.pinned_public_keys` option, or via an API definition `pinned_public_keys` field, using the following format:
```
{
    "example.com": "<key-id>",
    "foo.com": "/path/to/pub.pem",
    "*.wild.com": "<key-id>,<key-id-2>"
}
```

For `key-id` you should set the ID returned after you upload the public key using the Certificate API. Additionally, you can just set path to the public key located on your server. You can specify multiple public keys by separating their IDs by a comma.

> **NOTE**: Only public keys in PEM format are supported.

If public keys are not provided by your upstream, you can extract them
by yourself using the following command:
```{.copyWrapper}
openssl s_client -connect the.host.name:443 | openssl x509 -pubkey -noout
```
If you already have a certificate, and just need to get its public key, you can do it using the following command:
```{.copyWrapper}
openssl x509 -pubkey -noout -in cert.pem
```

> **NOTE**: Upstream certificates now also have wildcard domain support.


## <a name="define-via-dashboard"></a>Define with the Dashboard


