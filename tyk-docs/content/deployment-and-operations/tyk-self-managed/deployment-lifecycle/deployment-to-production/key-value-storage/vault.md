---
title: Using Vault as a KV store
date: 2024-03-15
description: Explains how to configure Hashicorp Vault as an external key-value store
tags: ["external key value storage", "KV", "Vault", "key-value", "secrets", "configuration", "secure"]
---

[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.

### How to configure Tyk to access Vault

Configuring Tyk Gateway to read values from Vault is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

```json
{
    "kv": {
        "vault": {
            "address": "http://localhost:1023",
            "agent_address": "",
            "max_retries": 3,
            "timeout": 30,
            "token": "",
            "kv_version": 2
        }
    }
}
```

| Key          | Description                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------|
| address      | The address of the Vault server, which must be a complete URL such as `http://www.vault.example.com`   |
| agent_address | The address of the local Vault agent, if different from the Vault server, must be a complete URL       |
| max_retries  | The maximum number of attempts Tyk will make to retrieve the value if Vault returns an error           |
| timeout      | The maximum time that Tyk will wait for a response from Vault (in nanoseconds, if set to 0 (default) will be interpreted as 60 seconds)                                         |
| token        | The Vault root access token                                                                            |
| kv_version   | The version number of Vault, usually defaults to 2                                                     |

Alternatively, you can configure it using the equivalent [environment variables]({{< ref "tyk-oss-gateway/configuration#kvvaulttoken" >}}).

### How key-value data is stored in Vault

In traditional systems secrets are typically stored individually, each with their own unique key. Vault, however, allows for a more flexible approach where multiple *keys* can be grouped together and stored under a single *secret*. This grouping allows for better organization and management of related secrets, making it easier to retrieve and manage them collectively.

When retrieving data from Vault, you use the dot notation (`secret.key`) to access the *value* from a specific *key* within a *secret*.

#### Example of storing key value data in Vault

If you want to store a *secret* named `tyk` with a *key* `gw` and *value* `123` in Vault then, from the command line, you would:
1. Enable the `kv` secrets engine in Vault under the path `my-secret` using:  
   `vault secrets enable -version=2 -path=my-secret kv`  
2. Create a secret `tyk` with the key `gw` and value `123` in Vault:  
   `vault kv put my-secret/tyk gw=123` 

To retrieve the secret from Vault using the command line you would use the following command (there is no need to append `/data` to the secret path):
```curl
curl \
  --header "X-Vault-Token: <your_vault_token>" \
  --request GET \
  https://vault-server.example.com/v1/my-secret/tyk?lease=true
```

This would return a response along these lines, note that the response contains all the keys stored in the secret (here there are also keys called `excited` and `foo`):
```yaml
{
   "request_id": "0c7e44e1-b71d-2102-5349-b5c60c13fb02",
   "lease_id": "",
   "lease_duration": 0,
   "renewable": false,
   "data": {
      "gw": "123",
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

As explained [below]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault#tyk-gateway-configuration-file" >}}), you could retrieve this value from within your Tyk Gateway config file using: 
   `TYK_GW_SECRET=vault://my-secret/tyk.gw`

### Where to store data in Vault

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your Vault *secrets* wherever you like within the KV store. You can provide the Vault path to the key in the reference using the notation appropriate to the calling [location]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault#how-to-access-data-stored-in-vault" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Vault KV store and store all *secrets* in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in a secret named `my-secret` in `/tyk-apis` in Vault, you would reference this from the API definition using `vault://my-secret.foo`.

### How to access data stored in Vault

The notation used to refer to a key-value pair stored in Vault depends upon the location of the reference as follows.

#### Tyk Gateway configuration file

As described [here]({{< ref "tyk-configuration-reference/kv-store#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Vault using the following notation:
- `vault://path/to/secret.KEY`

#### API definition

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Vault KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Vault by providing the directory path within Consul KV using the following notation:
- `vault://path/to/secret.KEY`

For [certain transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Vault:
- `$secret_vault.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Vault KV store. You can retrieve these values from Vault, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `vault://KEY`
