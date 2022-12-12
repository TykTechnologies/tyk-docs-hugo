---
date: 2017-03-27T15:57:11+01:00
title: Securing System Payloads
menu:
  main:
    parent: "Tyk Gateway Configuration Options"
weight: 8 
url: /tyk-configuration-reference/securing-system-payloads/
aliases:
  - /tyk-configuration-reference/tyk-gateway-configuration-options/securing-system-payloads/
---

Tyk, when first installed, does not insist on signing any cluster messages or middleware bundles. However, if you are moving to production, or thinking of enabling the Dashboard configuration feature, it is strongly recommended to enable payload signatures.

Payload signatures can be enabled in your `tyk.conf` by setting `allow_insecure_configs` to `false` and then setting up a public / private keypair with:

```{.copyWrapper}
# private key
openssl genrsa -out privkey.pem 2048

# public key
openssl rsa -in privkey.pem -pubout -out pubkey.pem
```

Then add the path to the **public key** to your `tyk.conf` under `public_key_path`, this same key is also used for middleware bundle signature validation.

Make sure to keep your private key safe, and transfer it to your Dashboard instance. In your `tyk_analytics.conf` file, you must add the full path to the `private_key_path` field. This will allow your Dashboard to sign all of its payloads using the private key.