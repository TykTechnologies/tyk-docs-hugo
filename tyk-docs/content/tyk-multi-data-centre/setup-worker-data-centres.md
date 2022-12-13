---
title: Setup Worker Data Centres
weight: 2
menu:
    main: 
        parent: "Tyk Multi Data Centre Bridge"
url: /tyk-multi-data-centre/setup-worker-data-centres/
aliases:
  - /tyk-multi-data-centre/setup-slave-data-centres/
---

## Overview

You may configure an unlimited number of Worker Data Centres (DC) for ultimate High Availablity (HA). We recommend that you deploy your worker data centres as close to your upstream services as possible in order to reduce latency.

It is a requirement that all your Tyk Gateway nodes in the Worker DC share the same Redis DB in order to take advantage of Tyk's DRL and quota features.
Your Worker DC can be in the same physical DC as the Controller DC with just a logical network separation. If you have many Worker DCs, they can be deployed in a private-cloud, public-cloud, or even on bare-metal.

## Prerequisites

* Redis
* A working headless/open source Tyk Gateway deployed

## Worker DC Configuration

Modify the Tyk Gateway configuration (`tyk.conf`) as follows:
`"use_db_app_configs": false,`

Next, we need to ensure that the policy loader and analytics pump use the RPC driver:

```{.json}
"policies": {
  "policy_source": "rpc",
  "policy_record_name": "tyk_policies"
},
"analytics_config": {
  "type": "rpc",
  ... // remains the same
},
```

Lastly, we add the sections that enforce the Worker mechanism:

```{.json}
"slave_options": {
  "use_rpc": true,
  "rpc_key": "{ORGID}",
  "api_key": "{APIKEY}",
  "connection_string": "{MDCB_HOSTNAME:9091}",
  "enable_rpc_cache": true,
  "bind_to_slugs": false,
  "group_id": "{ny}",
  "use_ssl": false,
  "ssl_insecure_skip_verify": true
},
"auth_override": {
  "force_auth_provider": true,
  "auth_provider": {
    "name": "",
    "storage_engine": "rpc",
    "meta": {}
  }
}
```
{{< note success >}}
**Note**  

if you set `analytics_config.type` to `rpc` - make sure you don't have your Tyk Pump configured to send analytics via the `hybrid` Pump type.
{{< /note >}}


As an optional configuration you can use `key_space_sync_interval` to set the period's length in which the gateway will check for changes in the key space, if this value is not set then by default it will be 10 seconds.


The most important elements here are:

| Field         | Description    |
|---------------|----------------|
|`api_key`      |This the API key of a user used to authenticate and authorise the Gateway's access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce risk if compromised. The suggested security settings are `read` for `Real-time notifications` and the remaining options set to `deny`.|
|`group_id`    |This is the "zone" that this instance inhabits, e.g. the cluster/data-centre the gateway lives in. The group ID must be the same across all the gateways of a data-centre/cluster which are also sharing the same Redis instance. This id should also be unique per cluster (otherwise another gateways cluster can pick up your keyspace events and your cluster will get zero updates).
|`connection_string`     |The MDCB instance or load balancer.|
|`bind_to_slugs` | For all Tyk installations except for Tyk Classic Cloud this should be set to false.|

Once this is complete, you can restart the Tyk Gateway in the Worker DC, and it will connect to the MDCB instance, load its API definitions, and is ready to proxy traffic.
