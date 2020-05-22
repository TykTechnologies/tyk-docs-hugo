---
title: Key Value storage for configuration in Tyk
menu:
  main:
    parent: "Tyk Configuration Reference"
weight: 13
---

Tyk Gateway as of 2.10 supports storing secrets in KV systems such as
[Vault](https://vaultproject.io), [Consul](https://consul.io). After which you
can reference these values from the KV store in your `tyk.conf`. This has many
benefits such as:

- Allows for ease of updating secrets across multiple machines rather than
  having to manually update each and everyone of them.
- Allows for proper separation of concerns. Developers don't have access to
  these secrets. Devops and/or only authorised people do and just pass along the
  name used to store the secret in the KV store.

The KV system can be used in the following places:

- Configuration file - `tyk.conf`
- API Definition. Currently, only the listen path and target URL can be configured to make use
  of this KV system.
- Body and URL rewrite.



## Supported

- Consul
- Vault
- Environment variables
- Configuration file defined values.


| Store                           | Example|
| --------------------------------| -----:|
| Consul                          | `consul://path/to/value`                           |
| Vault                           | `vault://engine/path/to/secret.actual_secret_name` |
| Environment variables           |    `env://SOME_SECRET_IN_ENV`                      |
| Configuration file              | `secrets://value`                                  |


> For body and URL rewrites, the prefixes are `$secret_vault.`
`$secret_consul.`, `$secret_env.`, `$secret_conf.`


> For Vault, you need to specify like
``vault://engine/path/to/secret.actual_secret_name``. Vault is
a little different as per how it keeps secrets, multiple secrets can be under
one key. So we use the dot notation for retrieving the exact one we need such as
below:

```json
{
  "request_id": "0c7e44e1-b71d-2102-5349-b5c60c13fb02",
  "lease_id": "",
  "lease_duration": 0,
  "renewable": false,
  "data": {
    "data": {
      "excited": "yes",
      "foo": "world",
      "man": "yes"
    },
    "metadata": {
      "created_time": "2019-08-28T14:18:44.477126Z",
      "deletion_time": "",
      "destroyed": false,
      "version": 1
    }
  },
  "warnings": null
  }
```





