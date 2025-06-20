---
title: "Using external Key Value storage with Tyk"
date: 2025-02-10
keywords: ["key value storage", "kv store", "tyk kv store", "tyk gateway kv store", "tyk vault", "tyk consul", "tyk secrets"]
description: "Learn how to use external Key-Value storage with Tyk Gateway, including Consul and Vault, to manage configuration data and secrets."
aliases:
  - /tyk-stack/tyk-gateway/kv-store
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault
---

## Introduction

With Tyk Gateway you can store configuration data (typically authentication secrets or upstream server locations) in Key-Value (KV) systems such as [Vault]({{< ref "#vault" >}}), and [Consul]({{< ref "#consul" >}}) and then reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway.

## When to use external Key-Value storage

### Simplify migration of APIs between environments

Easily manage and update secrets and other configuration across multiple environments (e.g., development, staging, production) without modifying the configuration files.

### Ensure separation of concerns

Securely store sensitive information like API keys, passwords, and certificates in a centralised location. Not everybody needs access to these secrets: authorized people can maintain them and just pass along the reference used to access them from the KV store.

### Support per-machine variables

Storing local settings within the Tyk Gateway's configuration file allows you to have per instance variables, such as a machine ID, and inject these into API requests and responses using [transformation middleware]({{< ref "api-management/traffic-transformation" >}}).

## How external Key-Value storage works

There are two parts to external Key-Value storage - the KV store and the Tyk configuration object (API definition or Tyk Gateway config file).

1. The key-value data that you wish to reference should be added to the storage
2. References should be included within the Tyk configuration object that identify the location (KV store) and Key
3. When Tyk Gateway initialises it will resolve any external KV references in its configuration, retrieving and applying the values from those references
4. When Tyk Gateway loads (or reloads) APIs it will resolve any external KV references in the API definitions, retrieving and applying the values from those references

Most Key-Value references are only retrieved when the configuration object (Gateway or API) is loaded, as explained above: changes to the externally stored value will not be detected until a subsequent gateway hot-reload.

The exception to this is for specific [transformation middleware]({{< ref "#transformation-middleware" >}}) where the value will be retrieved for each call to the API, during the processing of the API request or response.

{{< note success >}}
**Note**  

If Tyk Gateway cannot communicate with the KV store, it will log an error and will treat the referenced key value as empty, continuing to load the Gateway or API, or to process the transformation middleware as appropriate.
{{< /note >}}

## Supported storage options

Tyk Gateway supports the following locations for storage of key-value data, providing flexibility to choose the most suitable approach for your deployment and the data you are storing:

### Consul

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centers.
- to retrieve the value assigned to a `KEY` in Consul you will use `consul://KEY` or `$secret_consul.KEY` notation depending on the [location]({{< ref "#how-to-access-the-externally-stored-data" >}}) of the reference

### Vault

[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.
- to retrieve the value assigned to a `KEY` in Vault you will use `vault://KEY` or `$secret_vault.KEY` notation depending on the [location]({{< ref "#how-to-access-the-externally-stored-data" >}}) of the reference

**Tyk Gateway config file**

The `secrets` section in the [Tyk Gateway configuration file]({{< ref "tyk-oss-gateway/configuration#secrets" >}}) allows you to store settings that are specific to a single Tyk Gateway instance. This is useful for storing instance-specific configuration to be injected into API middleware or if you prefer using configuration files.
- to retrieve the value assigned to a `KEY` in the `secrets` config you will use `secrets://KEY` or `$secret_conf.KEY` notation depending on the [location]({{< ref "tyk-oss-gateway/configuration#secrets" >}}) of the reference

**Environment variables**

Tyk Gateway can access data declared in environment variables. This is a simple and straightforward way to manage secrets, especially in containerised environments like Docker or Kubernetes.
- if you want to set the local "secrets" section (equivalent to the `secrets` section in the [Gateway config file]({{< ref "#how-to-access-the-externally-stored-data" >}})) using environment variables, you should use the following notation: `TYK_GW_SECRETS=key:value,key2:value2`
- if you’re using a different key value secret store not explicitly supported by Tyk but can map it to `TYK_GW_SECRETS`
then this will allow you to access those KV data
- to retrieve the value assigned to an environment variable `VAR_NAME` you will use `env://VAR_NAME` or `$secret_env.VAR_NAME` notation depending on the [location]({{< ref "#how-to-access-the-externally-stored-data" >}}) of the reference

## How to access the externally stored data

You can configure Tyk Gateway to retrieve values from KV stores in the following places:
- Tyk Gateway configuration file (`tyk.conf`)
- API definitions

{{< note success >}}
**Note**  

You can use keys from different KV stores (e.g. Consul and environment variables) in the same configuration object (Gateway config or API definition).
{{< /note >}}

### From the Tyk Gateway configuration file

In Tyk Gateway's configuration file (`tyk.conf`), you can retrieve values from KV stores for the following [fields]({{< ref "tyk-oss-gateway/configuration" >}}):
- `secret`
- `node_secret`
- `storage.password`
- `cache_storage.password`
- `security.private_certificate_encoding_secret`
- `db_app_conf_options.connection_string`
- `policies.policy_connection_string`
- `slave_options.api_key`

To reference the *Value* assigned to a *Key* in one of the KV stores from the Gateway configuration file use the following notation:
- Consul: `consul://path/to/key`
- Vault: `vault://path/to/secret.key`
- `tyk.conf` secrets: `secrets://key`
- Environment variables: `env://key`

For example, if you create a Key-Value pair in [Vault]({{< ref "#vault" >}}) with the *key* `shared-secret` in *secret* `gateway-dashboard` within directory `tyk-secrets/` then you could use the *Value* as the `node_secret` in your Gateway config by including the following in your `tyk.conf` file:
``` .json
{
  "node_secret":"vault://tyk-secrets/gateway-dashboard.shared-secret"
}
```
When the Gateway starts, Tyk will read the *Value* from Vault and use this as the `node_secret`, which is used to [secure connection to the Tyk Dashboard]({{< ref "tyk-oss-gateway/configuration#node_secret" >}}).

Note that all of these references are read (and replaced with the values read from the KV location) on Gateway start when loading the `tyk.conf` file.

### From API Definitions

From Tyk Gateway v5.3.0 onwards, you can store [any string field]({{< ref "#other-string-fields" >}}) from the API definition in any of the supported KV storage options; for earlier versions of Tyk Gateway only the [Target URL and Listen Path]({{< ref "#target-url-and-listen-path" >}}) fields and [certain transformation middleware]({{< ref "#transformation-middleware" >}}) configurations were supported. 

#### Target URL and Listen Path

To reference the *Value* assigned to a *Key* in one of the KV stores for **Target URL** or **Listen Path** use the following notation:
- Consul: `consul://path/to/key`
- Vault: `vault://path/to/secret.key`
- Tyk config secrets: `secrets://key`
- Environment variables: `env://key`

These references are read (and replaced with the values read from the KV location) when the API is loaded to the Gateway (either when Gateway restarts or when there is a hot-reload).

For example, if you define an environment variable (*Key*) `UPSTREAM_SERVER_URL` with the *Value* `http://httpbin.org/` then within your API definition you could use the *Value* for the Target URL for your Tyk OAS API as follows:
```json
{
  "x-tyk-api-gateway": {
    "upstream": {
      "url": "env://UPSTREAM_SERVER_URL"
    }
  }
}
```

When the Gateway starts, Tyk will read the *Value* from the environment variable and use this as the [Target URL]({{< ref "api-management/gateway-config-tyk-oas#upstream" >}}).

{{< note success >}}
**Note** 

Prior to Tyk Gateway v5.3.0, **environment variables** used for the Target URL or Listen Path had to be named `TYK_SECRET_{KEY_NAME}`. They were referred to in the API definition using `env://{KEY_NAME}` excluding the `TYK_SECRET_` prefix.
<br><br>
From v5.3.0 onward, environment variables can have any `KEY_NAME`, and the full name should be provided in the API definition reference. The pre-v5.3.0 naming convention is still supported for backward compatibility, but only for these two fields.

{{< /note >}}

#### Transformation middleware

Key-value references can be included in the following middleware, with the values retrieved dynamically when the middleware is called (during processing of an API request or response):
- [request body transform]({{< ref "api-management/traffic-transformation/request-body" >}})
- [request header transform]({{< ref "api-management/traffic-transformation/request-headers" >}})
- [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}})
- [response body transform]({{< ref "api-management/traffic-transformation/response-body" >}})
- [response header transform]({{< ref "api-management/traffic-transformation/response-headers" >}})

To reference the *Value* assigned to a *Key* in one of the KV stores from these middleware use the following notation:
- Consul: `$secret_consul.key`
- Vault: `$secret_vault.key`
- Tyk config secrets: `$secret_conf.key`
- Environment variables: `$secret_env.key` or `env://key` (see [here]({{< ref "#using-environment-variables-with-transformation-middleware" >}}))

This notation is used to avoid ambiguity in the middleware parsing (for example where a KV secret is used in a URL rewrite path).

For example, if you create a Key-Value pair in Consul with the *Key* `user_id` then you could use the *Value* in the `rewriteTo` upstream address in the URL rewrite middleware for your Tyk OAS API by including the following in your API definition:
```json
{
  "x-tyk-api-gateway": {
      "middleware": {
          "operations": {
              "anythingget": {
                  "urlRewrite": {
                      "enabled": true,
                      "pattern": ".*",
                      "rewriteTo": "/api/v1/users/$secret_consul.user_id",
                  }
              }
          }
      }
  }
}
```

When a call is made to `GET /anything`, Tyk will retrieve the *Value* assigned to the `user_id` *Key* in Consul and rewrite the Target URL for the request to `/api/v1/users/{user_id}`.

These references are read (and replaced with the values read from the KV location) during the processing of the API request or response.

##### Using environment variables with transformation middleware

There are some subtleties with the use of environment variables as KV storage for the transformation middleware.

- **Request and Response Body Transforms** support only the `$secret_env.{KEY_NAME}` format.
- **Request and Response Header Transforms** support both `env://{KEY_NAME}` and `$secret_env.{KEY_NAME}` formats.
- **URL Rewrite** supports the `env://{KEY_NAME}` format for both the `pattern` and `rewriteTo` fields. The `rewriteTo` field also supports `$secret_env.{KEY_NAME}` format.

{{< note success >}}
**Notes**  

Due to the way that Tyk Gateway processes the API definition, when you use transformation middleware with the `$secret_env` format, it expects the environment variable to be named `TYK_SECRET_{KEY_NAME}` and to be referenced from the API definition using `$secret_env.{KEY_NAME}`.
<br><br>
For example, if you create a Gateway environment variable `TYK_SECRET_NEW_UPSTREAM=http://new.upstream.com`, then in a request body transform middleware, you would reference it as follows:

```json
{
  "custom_url": "$secret_env.NEW_UPSTREAM"
}
```

To configure the URL rewrite `rewriteTo` field using this variable you could use either:

````json
{
  "rewriteTo": "env://TYK_SECRET_NEW_UPSTREAM"
}
````
or
````json
{
  "rewriteTo": "$secret_env.NEW_UPSTREAM"
}
````
{{< /note >}}

#### Other `string` fields

To reference the *Value* assigned to a *Key* in one of the KV stores from the API Definition use the following notation:
- Consul: `consul://key`
- Vault: `vault://secret.key`
- Tyk config secrets: `secrets://key`
- Environment variables: `env://key`

These references are read (and replaced with the values read from the KV location) when the API is loaded to the Gateway (either when Gateway restarts or when there is a hot-reload).

{{< note success >}}
**Notes**  

When accessing KV references from the `/tyk-apis` directory on Consul or Vault, you should not provide the `path/to/` the key except for Target URL and Listen Path (as described [above]({{< ref "#target-url-and-listen-path" >}})).
{{< /note >}}

For example, if you create a Key-Value pair in the `secrets` section of the `tyk.conf` file with the *Key* `auth_header_name`:
```json
{
  "secrets": {
    "auth_header_name": "Authorization"
  }
}
```

Then within your API definition you could use the *Value* for the authentication header name as follows:
```json
{
  "x-tyk-api-gateway": {
    "components": {
      "securitySchemes": {
        "authToken": {
          "type": "apiKey",
          "in": "header",
          "name": "secrets://auth_header_name"
        }
      }
    }
  }
}
```

When the Gateway starts, Tyk will read the *Value* from the `secrets` section in the Gateway config file and use this to identify the header where Tyk Gateway should look for the [Authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) token in requests to your Tyk OAS API.

## Using Consul as a KV store

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value (KV) store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centers.

### How to configure Tyk to access Consul

Configuring Tyk Gateway to read values from Consul is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

```json
{
    "kv": {
        "consul": {
            "address": "localhost:8025",
            "scheme": "http",
            "datacenter": "dc-1",
            "http_auth": {
                "username": "",
                "password": ""
            },
            "wait_time": 10,
            "token": "",
            "tls_config": {
                "address": "",
                "ca_path": "",
                "ca_file": "",
                "cert_file": "",
                "key_file": "",
                "insecure_skip_verify": false
            }
        }
    }
}
```

| Key        | Description                                                                                                 |
|------------|-------------------------------------------------------------------------------------------------------------|
| address    | The location of the Consul server                                                                           |
| scheme     | The URI scheme for the Consul server, e.g. `http`                                                          |
| datacenter | Consul datacenter (agent) identifier                                                                       |
| http_auth  | Username and password for Tyk to log into Consul using HTTP Basic Auth (if required by your Consul service) |
| wait_time  | Limits how long a [watch will block](https://developer.hashicorp.com/consul/api-docs/features/blocking) in milliseconds (if enabled in your Consul service) |
| token      | Used to provide a per-request access token to Consul (if required by your Consul service)                   |
| tls_config | Configuration for TLS connection to Consul (if enabled in your Consul service)                              |

Alternatively, you can configure it using the equivalent [environment variables]({{< ref "tyk-oss-gateway/configuration#kvconsuladdress" >}}).

### Where to store data in Consul

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your KV pairs wherever you like within the Consul KV store. You can provide the Consul path to the key in the reference using the notation appropriate to the calling [location]({{< ref "#consul" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Consul KV store and store all keys in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in `tyk-apis` in Consul, you would reference this from the API definition using `consul://foo`.

### How to access data stored in Consul

The notation used to refer to a KV pair stored in Consul depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Consul using the following notation:
- `consul://path/to/KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Consul KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Consul by providing the directory path within Consul KV using the following notation:
- `consul://path/to/KEY`

For [certain transformation middleware]({{< ref "#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Consul:
- `$secret_consul.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Consul KV store. You can retrieve these values from Consul, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `consul://KEY`


## Using Vault as a KV store


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

**Example of storing key value data in Vault**

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

As explained [below]({{< ref "#vault" >}}), you could retrieve this value from within your Tyk Gateway config file using: 
   `TYK_GW_SECRET=vault://my-secret/tyk.gw`

### Where to store data in Vault

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your Vault *secrets* wherever you like within the KV store. You can provide the Vault path to the key in the reference using the notation appropriate to the calling [location]({{< ref "#vault" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Vault KV store and store all *secrets* in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in a secret named `my-secret` in `/tyk-apis` in Vault, you would reference this from the API definition using `vault://my-secret.foo`.

### How to access data stored in Vault

The notation used to refer to a key-value pair stored in Vault depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Vault using the following notation:
- `vault://path/to/secret.KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Vault KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Vault by providing the directory path within Consul KV using the following notation:
- `vault://path/to/secret.KEY`

For [certain transformation middleware]({{< ref "#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Vault:
- `$secret_vault.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Vault KV store. You can retrieve these values from Vault, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `vault://KEY`
