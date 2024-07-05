---
title: Using Consul as a KV store
date: 2024-03-15
description: Explains how to configure Hashicorp Consul as an external key-value store
tags: ["external key value storage", "KV", "Consul", "key-value", "secrets", "configuration", "secure"]
---

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

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your KV pairs wherever you like within the Consul KV store. You can provide the Consul path to the key in the reference using the notation appropriate to the calling [location]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul#how-to-access-data-stored-in-consul" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Consul KV store and store all keys in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in `tyk-apis` in Consul, you would reference this from the API definition using `consul://foo`.

### How to access data stored in Consul

The notation used to refer to a KV pair stored in Consul depends upon the location of the reference as follows.

#### Tyk Gateway configuration file

As described [here]({{< ref "tyk-configuration-reference/kv-store#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Consul using the following notation:
- `consul://path/to/KEY`

#### API definition

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Consul KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Consul by providing the directory path within Consul KV using the following notation:
- `consul://path/to/KEY`

For [certain transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Consul:
- `$secret_consul.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Consul KV store. You can retrieve these values from Consul, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `consul://KEY`





