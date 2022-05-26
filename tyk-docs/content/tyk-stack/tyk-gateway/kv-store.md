---
title: Key Value secrets storage for configuration in Tyk
menu:
  main:
    parent: Tyk Gateway
weight: 13
url: /tyk-configuration-reference/kv-store/
---

Tyk Gateway as of v3.0 supports storing secrets in KV systems such as [Vault](https://vaultproject.io), [Consul](https://consul.io). You can reference these values from the KV store in your `tyk.conf` or API definition.
This has many benefits such as:
- Allows for ease of updating secrets across multiple machines rather than
  having to manually update each and everyone of them.
- Allows for proper separation of concerns. Developers don't have access to
  these secrets. Devops and/or only authorised people do and just pass along the
  name used to store the secret in the KV store.
- Using the local "secrets" section inside `tyk.conf` allows you to have per Gateway variables, like machine ID, and inject it as part of headers or body.

## Supported engines

- Consul
- Vault
- Local secrets section inside config.

Example configuration inside `tyk.conf`

```
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

See [detailed configuration reference](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/#a-namekva-key-value-store)


## Usage information

The KV system can be used in the following places:

- Configuration file - `tyk.conf`
- Environment variables - `.env` which supersedes the configuration file. 
- API Definition: currently, only the listen path and target URL
- Body transforms and URL rewrites


### Tyk conf file usage
For using inside the Tyk configuration file, target URL and listen path, pls use the following notation:

| Store                           | Example|
| --------------------------------| -----:|
| Consul                          | `consul://path/to/value`                           |
| Vault                           | `vault://engine/path/to/secret.actual_secret_name` |
| Configuration file              | `secrets://value`                                  |

For body transforms and URL rewrites, the prefixes are `$secret_vault.`, `$secret_consul.` and `$secret_conf.`

### Tyk environment variable usage
For use inside environment variables, the following secrets are supported:
```
TYK_GW_SECRET
TYK_GW_NODESECRET
TYK_GW_STORAGE_PASSWORD
TYK_GW_CACHESTORAGE_PASSWORD
TYK_GW_SECURITY_PRIVATECERTIFICATEENCODINGSECRET
TYK_GW_USEDBAPPCONFIGS
TYK_GW_POLICIES_POLICYSOURCE
```

Example:  
IF one enables the `kv` secrets engine under the path `secret` within Vault using:  
`vault secrets enable -version=2 -path=secret kv`  
AND an arbitrary secret `tyk` with the key `gw` and value `123` is created in Vault:  
`vault kv put secret/tyk gw=123`  
Then to retrieve the secret from within Tyk-Gateway, we reference the secret using:  
`TYK_GW_SECRET=vault://secret/tyk.gw`  

There is no need to append `/data` to the secret path.

Please note that the additional environment variables must be set within the gateway to configure Vault:
```shell
TYK_GW_KV_VAULT_ADDRESS=http://VAULT_CONNECTION_STRING:VAULT_CONNECTION_PORT
TYK_GW_KV_VAULT_MAXRETRIES=3
TYK_GW_KV_VAULT_TIMEOUT=30s
TYK_GW_KV_VAULT_TOKEN=VAULT_TOKEN
TYK_GW_KV_VAULT_KVVERSION=2
```

<hr>
{{< note success >}}
**Note**  

For Vault, you need to specify like
``vault://engine/path/to/secret.actual_secret_name``.

Vault is a little different as per how it keeps secrets, multiple secrets can be under
one key.

So we use the dot notation for retrieving the exact one we need such as
below:
{{< /note >}}


If you want to set local "secrets" section as environment variable, you should use the following notation:
`TYK_GW_SECRETS=key:value,key2:value2`
