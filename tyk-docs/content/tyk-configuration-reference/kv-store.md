---
title: Key Value Secrets Storage for Configuration in Tyk
description: Explain how to configure Tyk Gateway to retrieve values from an external key-value store such as Consol, Vault or local storage.
tags: ["Vault", "Consul", "key-value", "secret kv store"]
menu:
  main:
    parent: Tyk Gateway
weight: 13
aliases:
  - /tyk-stack/tyk-gateway/kv-store/
---

Tyk Gateway as of v3.0 supports storing secrets in KV systems such as [Vault](https://vaultproject.io), and [Consul](https://consul.io). You can reference these values from the KV store in your `tyk.conf` or API definition.
This has many benefits such as:
- Allows for ease of updating secrets across multiple machines rather than
  having to manually update each and everyone of them.
- Allows for proper separation of concerns. Developers don't have access to
  these secrets. DevOps and/or only authorised people do and just pass along the
  name used to store the secret in the KV store.
- Using the local "secrets" section inside `tyk.conf` allows you to have per Gateway variables, like machine ID, and inject it as part of headers or body.

## Supported KV store systems

- Consul
- Vault
- Local secrets section inside config.

###  Connect Tyk with the KV stores

You can use all three options as shown in the example of `tyk.conf` below:
```json
{
  "kv": {
    "consul": {
      "address": "localhost:8025",
      "scheme": "http",
      "datacenter": "dc-1",
      "timeout": 30,
      "http_auth": {
        "username": "username",
        "password": "password"
      },
      "wait_time": 10,
      "token": "Token if available",
      "tls_config": {
        "address": "",
        "ca_path": "",
        "ca_file": "",
        "cert_file": "",
        "key_file": "",
        "insecure_skip_verify": false
      }
    },
    "vault": {
      "address": "http://localhost:1023",
      "agent_adress": "input if available",
      "max_retries": 3,
      "timeout": 30,
      "token": "token if available",
      "kv_version": 2
    }
  },
  "secrets": {
    "gateway": "secret"
  }
}
```

Alternatively, you can configure it using the environment variables. For example, these are the environment variables you need to define for Vault:
```env
TYK_GW_KV_VAULT_ADDRESS=http://VAULT_CONNECTION_STRING:VAULT_CONNECTION_PORT
TYK_GW_KV_VAULT_MAXRETRIES=3
TYK_GW_KV_VAULT_TIMEOUT=30s
TYK_GW_KV_VAULT_TOKEN=VAULT_TOKEN
TYK_GW_KV_VAULT_KVVERSION=2
```

For more details, please refer to the [configuration reference]({{< ref "tyk-oss-gateway/configuration#a-namekva-key-value-store" >}}) page.

## Usage information

The KV system can be used in the following places:

1. Configuration file - `tyk.conf`
2. Environment variables - `.env` which supersedes the configuration file. 
3. API Definition - currently, only the listen path and target URL
4. Body transforms and URL rewrites


### 1. Using Tyk Configuration File
For use inside the Tyk configuration file, target URL and listen path, pls use the following notation:

| Store                           | Example|
| --------------------------------| -----:|
| Consul                          | `consul://path/to/value`                           |
| Vault                           | `vault://engine/path/to/secret.actual_secret_name` |
| Configuration file              | `secrets://value`                                  |

#### Note about Vault
In traditional systems, secrets are typically stored individually, each with its own unique key. However, in Vault, it allows for a more flexible approach where multiple secrets can be grouped together and stored under a single key. This grouping allows for better organization and management of related secrets, making it easier to retrieve and manage them collectively. This means that for Vault you use the dot notation to retrieve the exact one we need such as below :
Example for a secret `gw` under `tyk`:

1. Enable the `kv` secrets engine under the path `secret` within Vault using:  
   `vault secrets enable -version=2 -path=secret kv`  
2. Create an arbitrary secret `tyk` with the key `gw` and value `123` in Vault:  
   `vault kv put secret/tyk gw=123`  
3. To retrieve the secret from within Tyk Gateway, we reference the secret using: 
   `TYK_GW_SECRET=vault://secret/tyk.gw`

To retrieve the secret from within Vault:
```curl
curl \
  --header "X-Vault-Token: <your_vault_token>" \
  --request GET \
  https://vault-server.example.com/v1/secret/tyk?lease=true
```

```yaml
{
   "request_id": "0c7e44e1-b71d-2102-5349-b5c60c13fb02",
   "lease_id": "",
   "lease_duration": 0,
   "renewable": false,
   "data": {
      "gw": "123"
      "excited": "yes",
      "foo": "world",
   },
   "metadata":{
      "created_time": "2019-08-28T14:18:44.477126Z",
      "deletion_time": "",
      "destroyed": false,
      "version": 1
   },
   "auth": ...
}
```
There is no need to append `/data` to the secret path.


### 2. Tyk Environment Variable
For use inside environment variables, the following secrets are supported:

```env
TYK_GW_SECRET
TYK_GW_NODESECRET
TYK_GW_STORAGE_PASSWORD
TYK_GW_CACHESTORAGE_PASSWORD
TYK_GW_SECURITY_PRIVATECERTIFICATEENCODINGSECRET
TYK_GW_USEDBAPPCONFIGS
TYK_GW_POLICIES_POLICYSOURCE
```

If you want to set the local "secrets" section as an environment variable, you should use the following notation:
`TYK_GW_SECRETS=key:value,key2:value2`


### 3. API Definition - ListenPath and Target URL

If you wish to override either the listen path or target URL in an API definition you can store a number of secrets in this format:

```env
TYK_SECRET_FOO
TYK_SECRET_BAR
```
where foo is stored in your API Definition as `env://foo` or `env://bar` for `listen_path` or `target_url`.

Example:
You define names of your choice for the listen path and target URL as environment variables. In this example 
`mylistenpath` for the listen path and `myupstream` for the target URL.

```env
TYK_SECRET_MYLISTENPATH="/anything/"
TYK_SECRET_MYUPSTREAM="http://httpbin.org/"
```

Then, in the Tyk Classic API definition, you set these names in the listen path and target URL fields, with a `env://` prefix:

```yaml
...
"proxy": {
    "preserve_host_header": false,
    "listen_path": env://mylistenpath,
    "target_url": env://myupstream,
    ...
}
...
```
This way Tyk Gateway will know to lookup environment variables named `TYK_SECRET_MYLISTENPATH` and `TYK_SECRET_MYUPSTREAM`


### 4. Body Transforms and URL Rewrites

For body transforms and URL rewrites, the prefixes are `$secret_vault.`, `$secret_consul.` and `$secret_conf.`


