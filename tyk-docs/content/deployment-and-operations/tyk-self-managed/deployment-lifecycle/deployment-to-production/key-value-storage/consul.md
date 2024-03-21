---
title: Using Consul as a KV store
date: 2024-03-15
description: Explains how to configure Hashicorp Consul as an external key-value store
tags: ["external key value storage", "KV", "Consul", "key-value", "secrets", "configuration", "secure"]
---

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centres.

### How to configure Tyk to access Consul
Configuring Tyk Gateway to read values from Consul is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

``` json
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
| scheme     |  The URI scheme for the Consul server, e.g. `http`                                                          |
| datacenter |  Consul datacenter (agent) identifier                                                                       |
| http_auth  | Username and password for Tyk to log into Consul using HTTP Basic Auth (if required by your Consul service) |
| wait_time  | Limits how long a [Watch will block](https://developer.hashicorp.com/consul/api-docs/features/blocking) (if enabled in your Consul service) |
| token      | Used to provide a per-request access token to Consul (if required by your Consul service)                   |
| tls_config | Configuration for TLS connection to Consul (if enabled in your Consul service)                              |

Alternatively, you can configure it using the [environment variables]({{< ref "tyk-oss-gateway/configuration#kvconsuladdress" >}}).

### How to access data stored in Consul
The notation used to refer to a key-value pair stored in Consul depends upon the location of the reference as follows.

#### Tyk Gateway configuration file
As described [here]({{< ref "tyk-configuration-reference/kv-store#tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Consul using the following notation:
 - `consul://path/to/key`

#### API definition
From Tyk Gateway v5.3.0 onwards, you can store **any `string` field** from the API definition in Consul; for earlier versions of Tyk Gateway only the **Target URL** and **Listen Path** fields were supported. 

As described [here]({{< ref "tyk-configuration-reference/kv-store#api-definitions" >}}), from an API definition you can retrieve values from Consul using the following notation:
 - `consul://path/to/key`

There is an exception to this rule for certain [transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) for which you can retrieve values using the following notation:
 - `$secret_consul.KEY`