---
title: Using Vault as a KV store
date: 2024-03-15
description: Explains how to configure Hashicorp Vault as an external key-value store
tags: ["external key value storage", "KV", "Vault", "key-value", "secrets", "configuration", "secure"]
---

[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.

### How to configure Tyk to access Vault
Configuring Tyk Gateway to read values from Vault is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

``` json
{
    "kv": {
        "vault": {
            "address": "http://localhost:1023",
            "agent_adress": "",
            "max_retries": 3,
            "timeout": 30,
            "token": "",
            "kv_version": 2
        }
    }
}
```

| Key | Description |
|-----|-------------|
| address | The port and location of the Vault server |
| agent_adress |  |
| max_retries | |
| timeout | |
| token | Vault root token |
| kv_version | The version number of Vault, usually defaults to 2 |

Alternatively, you can configure it using the [environment variables]({{< ref "tyk-oss-gateway/configuration#kvvaulttoken" >}}).

### How key-value data is stored in Vault
In traditional systems, secrets are typically stored individually, each with its own unique key. Vault, however, allows for a more flexible approach where multiple *keys* can be grouped together and stored under a single *secret*. This grouping allows for better organization and management of related secrets, making it easier to retrieve and manage them collectively.

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
``` yaml
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

### How to access data stored in Vault
The notation used to refer to a key-value pair stored in Vault depends upon the location of the reference as follows.

#### Tyk Gateway configuration file
As described [here]({{< ref "tyk-configuration-reference/kv-store#tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Vault using the following notation:
 - `vault://path/to/secret.key`

#### API definition
From Tyk Gateway v5.3 onwards, you can store **any `string` field** from the API definition in Vault; for earlier versions of Tyk Gateway only the **Target URL** and **Listen Path** fields were supported. 

As described [here]({{< ref "tyk-configuration-reference/kv-store#api-definitions" >}}), from an API definition you can retrieve values from Vault using the following notation:
 - `vault://path/to/secret.key`

There is an exception to this rule for certain [transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) for which you can retrieve values using the following notation:
 - `$secret_vault.KEY`
