---
title: Using external Key Value storage with Tyk
description: Explains how to configure Tyk Gateway to retrieve values from an external key-value store such as Consol, Vault or local storage.
tags: ["external key value storage", "KV", "Vault", "Consul", "key-value", "secrets", "configuration", "secure"]
aliases:
  - /tyk-stack/tyk-gateway/kv-store/
---

With Tyk Gateway you can store configuration data (typically authentication secrets or upstream server locations) in KV systems such as [Vault]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault">}}), and [Consul]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul">}}) and then reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway.

## When to use external Key-Value storage
#### Simplify migration of APIs between environments
Easily manage and update secrets and other configuration across multiple environments (e.g., development, staging, production) without modifying the configuration files.

#### Ensure separation of concerns
Securely store sensitive information like API keys, passwords, and certificates in a centralised location. Not everybody needs access to these secrets: authorised people can maintain them and just pass along the reference used to access them from the KV store.

#### Support per-machine variables
Storing local settings within the Tyk Gateway's configuration file allows you to have per instance variables, such as a machine ID, and inject these into API requests and responses using [transformation middleware]({{< ref "advanced-configuration/transform-traffic" >}}).

## How external Key-Value storage works
There are two parts to external Key-Value storage - the KV store and the Tyk configuration object (API definition or Tyk Gateway config file).

1. The key-value data that you wish to reference should be added to the storage
2. References should be included within the Tyk configuration object that identify the location (KV store) and Key
3. When Tyk Gateway initialises it will resolve any external KV references in its configuration, retrieving and applying the values from those references
4. When Tyk Gateway loads (or reloads) APIs it will resolve any external KV references in the API definitions, retrieving and applying the values from those references

Most Key-Value references are only retrieved when the configuration object (Gateway or API) is loaded, as explained above: changes to the externally stored value will not be detected until a subsequent reload.

The exception to this is for specific [transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) where the value will be retrieved for each call to the API, during the processing of the API request or response.

{{< note success >}}
**Note**  

If Tyk Gateway cannot communicate with the KV store, it will log an error and will treat the referenced key value as empty, continuing to load the Gateway or API, or to process the transformation middleware as appropriate.
{{< /note >}}

## Supported storage options
Tyk Gateway supports the following locations for storage of key-value data, providing flexibility to choose the most suitable approach for your deployment and the data you are storing:

#### Consul
HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centres.
 - to retrieve the value assigned to a key in Consul you will use `consul://path/to/KEY` or `$secret_consul.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#accessing-externally-stored-data" >}}) of the reference

#### Vault
[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.
 - to retrieve the value assigned to a key in Vault you will use `vault://path/to/SECRET.KEY` or `$secret_vault.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#accessing-externally-stored-data" >}}) of the reference

#### Environment variables
Tyk Gateway can access data declared in environment variables. This is a simple and straightforward way to manage secrets, especially in containerised environments like Docker or Kubernetes.
 - to retrieve the value assigned to an environment variable you will use `env://KEY` or `$secret_env.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#accessing-externally-stored-data" >}}) of the reference
 - if you want to set the local "secrets" section as an environment variable, you should use the following notation: `TYK_GW_SECRETS=key:value,key2:value2`

#### Tyk Gateway config file
The `secrets` section in the [Tyk Gateway configuration file]({{< ref "tyk-oss-gateway/configuration#secrets" >}}) allows you to store settings that are specific to a single Tyk Gateway instance. This is useful for storing instance-specific configuration to be injected into API middleware or if you prefer using configuration files.
 - to retrieve the value assigned to a key in the `secrets` config you will use `secrets://KEY` or `$secret_conf.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#accessing-externally-stored-data" >}}) of the reference

## Accessing externally stored data
You can configure Tyk Gateway to retrieve values from KV stores in the following places:
 - Tyk Gateway configuration file (`tyk.conf`)
 - API definitions

{{< note success >}}
**Note**  

You can use keys from different KV stores (e.g. Consul and environment variables) in the same configuration file (Gateway or API definition).
{{< /note >}}

### Tyk Gateway configuration file
In Tyk Gateway's configuration file (`tyk.conf`), you can retrieve values from KV stores for the following [fields]({{< ref "tyk-oss-gateway/configuration" >}}):
 - `secret`
 - `node_secret`
 - `storage.password`
 - `cache_storage.password`
 - `security.private_certificate_encoding_secret`
 - `db_app_conf_options.connection_string`
 - `policies.policy_connection_string`

To reference the *Value* assigned to a *Key* in one of the KV stores from the Gateway configuration file use the following notation:
 - Consul: `consul://path/to/key`
 - Vault: `vault://path/to/secret.key`
 - `tyk.conf` secrets: `secrets://key`
 - Environment variables: `env://key`

For example, if you create a Key-Value pair in Vault with the *Key* `shared-secret` in *secret* `gateway-dashboard` within directory `tyk-secrets/` then you could use the *Value* as the `node_secret` in your Gateway config by including the following in your `tyk.conf` file:
``` .json
{
  "node_secret":"vault://tyk-secrets/gateway-dashboard.shared-secret"
}
```
When the Gateway starts, Tyk will read the *Value* from Vault and use this as the `node_secret`, which is used to [secure connection to the Tyk Dashboard]({{< ref "tyk-oss-gateway/configuration#node_secret" >}}).

Note that all of these references are read (and replaced with the values read from the KV location) on Gateway start when loading the tyk.conf file.

### API Definitions
From Tyk Gateway v5.3 onwards, you can store **any `string` field** from the API definition in any of the supported KV store; for earlier versions of Tyk Gateway only the **Target URL** and **Listen Path** fields were supported, together with certain [transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}). 

To reference the *Value* assigned to a *Key* in one of the KV stores from the API Definition use the following notation:
 - Consul: `consul://path/to/key`
 - Vault: `vault://path/to/secret.key`
 - Tyk config secrets: `secrets://key`
 - Environment variables: `env://key`

These references are read (and replaced with the values read from the KV location) when the API is loaded to the Gateway (either when Gateway restarts or when there is a hot-reload).

For example, if you create a Key-Value pair in the `secrets` section of the `tyk.conf` file with the *Key* `upstream_path`:
``` .json
{
  "secrets": {
    "upstream_path":"http://httpbin.org/"
  }
}
```
Then within your API definition you could use the *Value* for the Target URL for your Tyk OAS API as follows:
``` .json
{
  "x-tyk-api-gateway": {
    "upstream": {
      "url": "secrets://upstream_path"
    }
  }
}
```
When the Gateway starts, Tyk will read the *Value* from the `secrets` section in the API definition and use this as the [Target URL]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#upstream" >}}).


{{< note success >}}
**Note**  

For specific request and response transformation [middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) the KV references are retrieved during the processing of the API request or response; the notation used for these references is slightly different to reflect this.
{{< /note >}}

#### Transformation middleware
Key-value references can be included in the following middleware, with the values retrieved dynamically when the middleware is called during processing of an API request or response:
 - [request body transform]({{< ref "transform-traffic/request-body" >}})
 - [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}})
 - [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}})
 - [request header transform]({{< ref "transform-traffic/request-headers" >}})
 - [response header transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}})

To reference the *Value* assigned to a *Key* in one of the KV stores from these middleware use the following notation:
 - Consul: `$secret_consul.key`
 - Vault: `$secret_vault.key`
 - Tyk config secrets: `$secret_conf.key`
 - Environment variables: `$secret_env.key`

For example, if you create a Key-Value pair in Consul with the *Key* `user_id` then you could use the *Value* in the `rewriteTo` upstream address in the URL rewrite middleware for your Tyk OAS API by including the following in your API definition:
``` json
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
