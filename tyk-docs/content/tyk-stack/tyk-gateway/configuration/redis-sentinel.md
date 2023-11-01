---
title: "Configure Redis Sentinel"
date: 2022-10-25
tags: ["Redis", "Sentinel", "Gateway Configuration", "Pump Configuration", "Dashboard Configuration"]
description: "Configuring your Tyk installation with Redis Sentinel"
menu:
  main:
    parent: "Tyk Gateway Configuration Options"
weight: 8 
---

## Introduction

From v2.9.3 Redis Sentinel is supported.

Similar to Redis Cluster, our Gateway, Dashboard and Pump all support integration with Redis Sentinel.

To configure Tyk to work with Redis Sentinel, list your servers under `addrs` and set the master name in your Gateway, Dashboard, Pump and MDCB config. Unlike Redis Cluster, `enable_cluster` should **not** be set.  Indicative config snippets as follows:

### Gateway

```json
"storage": {
  "type": "redis",
  "addrs": [
    "server1:26379",
    "server2:26379",
    "server3:26379"
  ],
  "master_name": "mymaster",
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  "use_ssl": false
},
```

### Dashboard

```json
"redis_addrs": [
  "server1:26379",
  "server2:26379",
  "server3:26379"
],
"redis_master_name": "mymaster"
```

### Pump

```json
"analytics_storage_config": {
  "type": "redis",
  "addrs": [
    "server1:26379",
    "server2:26379",
    "server3:26379"
  ],
  "master_name": "mymaster",
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 100,
  "use_ssl": false
},
```

{{< warning success >}}
**Warning**

When using Bitnami charts to install Redis Sentinel in k8s, a Redis service is exposed, which means that standard Redis config is required instead of the above setup, i.e. a single server in `addrs` and `master_name` is not required.

{{< /warning >}}

### Support for Redis Sentinel AUTH

To support the use of Redis Sentinel AUTH (introduced in Redis 5.0.1) we have added the following global config settings in Tyk v3.0.2:

* In the Tyk Gateway config file - `sentinel_password`
* In the Tyk Dashboard config file - `redis_sentinel_password`
* In the Tyk Pump config file - `sentinel_password`
* In the Tyk Identity Broker config file - `SentinelPassword`
* In the Tyk Synk config file - `sentinel_password`

These settings allow you to support Sentinel password-only authentication in Redis version 5.0.1 and above.

See the Redis and Sentinel authentication section of the [Redis Sentinel docs](https://redis.io/topics/sentinel) for more details.
### Redis Sentinel Support prior to v2.9.3

Previously to v2.9.3, we do not support direct integration with Redis Sentinel. For versions prior to v2.9.3, you will need to implement it in association with a HAProxy. As we do support Amazon ElastiCache, we recommend using this with Redis Sentinel. For more details on Amazon ElastiCache, see [here](https://aws.amazon.com/elasticache/). The following article also details how to setup Redis Sentinel and HAProxy: [Setup Redis Sentinel and HAProxy](https://discuss.pivotal.io/hc/en-us/articles/205309388-How-to-setup-HAProxy-and-Redis-Sentinel-for-automatic-failover-between-Redis-Master-and-Slave-servers).

### Redis Encryption

Redis does not support SSL / TLS natively [https://redis.io/topics/encryption](https://redis.io/topics/encryption) and we recommend that if you require a
secure connection, you use a tool such as Spiped. [http://www.tarsnap.com/spiped.html](http://www.tarsnap.com/spiped.html)

Various cloud providers such as Azure & AWS provide a Redis implementation which supports TLS encryption.

Should you wish to turn on encryption between any of Tyk's components & Redis - this can simply be achieved by setting
`"use_ssl": true` alongside any Redis configuration settings within Tyk's config files.