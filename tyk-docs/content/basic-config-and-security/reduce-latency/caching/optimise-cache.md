---
title: "Optimising the Cache Storage"
date: 2023-06-08
tags: ["Optimise Cache Storage", "Cache", "Caching", "Redis", "Advanced"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 6
---

Tyk creates the API cache in Redis, as it gives high performance and low latency. By default, the cache will use the same database that is used to store the API keys, minimising the deployment footprint.

For [multi-data centre]({{< ref "tyk-multi-data-centre/mdcb-components#redis">}}) deployments, the Data Planes have a locally deployed Redis. This enables them to have a localised cache close to the traffic-serving Gateways.

The [cache key]({{< ref "basic-config-and-security/reduce-latency/caching#cache-key">}}) is used as the Redis key, for quick lookups.

For high-traffic systems that make heavy use of caching as well as rate limiting, it can make sense to use a separate Redis database for cache storage, at the expense of increased deployment footprint.

### Configuring a separate cache
To enable a separate cache server, you must deploy additional Redis instance(s) and apply additional configuration within your Tyk Gateway's `tyk.conf` configuration file.

You must
 - set `enable_separate_cache_store` to `true`
 - provide additional Redis connection information in the `cache_storage` section

For example:
```{json}
{
"enable_separate_cache_store": true,
"cache_storage": {
  "type": "redis",
  "host": "",
  "port": 0,
  "addrs": [
      "localhost:6379"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 3000,
  "optimisation_max_active": 5000,
  "enable_cluster": false
},
```

The configuration of the separate Redis Cache is the same (and uses the same underlying driver) as the regular configuration, so [Redis Cluster]({{< ref "tyk-stack/tyk-gateway/configuration/redis-cluster">}}) is fully supported. If you set `enable_cluster` to `false`, you only need to set one entry in `addrs`.

{{< note success >}}
**Note**  

Prior to Tyk Gateway v2.9.3, `hosts` was used instead of `addrs`; since v2.9.3 `hosts` has been deprecated.
{{< /note >}}

