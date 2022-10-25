---
date: 2017-03-27T15:52:45+01:00
title: Configure Redis Cluster or Sentinel
menu:
  main:
    parent: "Tyk Gateway Configuration Options"
weight: 7 
aliases:
  - /tyk-configuration-reference/redis-cluster-sentinel/
---

## Introduction

Our Gateway, Dashboard and Pump all support integration with both Redis Cluster and Redis Sentinel. Redis Cluster allows data to be automatically sharded across multiple Redis Nodes. To setup Redis Cluster correctly, we recommend you read the [Redis Cluster Tutorial](https://redis.io/topics/cluster-tutorial). You must use the same settings across the Gateway, Dashboard and Pump.

{{< note success >}}
**Note**  

Redis Cluster is different to a Redis Master/Slave setup.
{{< /note >}}


## Redis Cluster & Tyk Gateway 

To configure the Tyk Gateway to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `addrs` in your `tyk.conf` file.

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated. 
{{< /note >}}

If you are using TLS for Redis connections, set `use_ssl` to `true`.

```{json}
"storage": {
  "type": "redis",
  "enable_cluster": true,
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  "use_ssl": false
},
```

## Redis Cluster & Tyk Dashboard

{{< note success >}}
**Note**  

`redis_addrs` is new in v1.9.3 for the Dashboard, and replaces `hosts` which is now deprecated. 
{{< /note >}}


```{json}
"redis_addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
"redis_use_ssl": true,
"enable_cluster": true
```
To configure the Tyk Dashboard to work with your Redis Cluster, add the Redis address information to your `tyk_analytics.conf` file:


## Redis Cluster & Tyk Pump

To configure the Tyk Pump to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `addrs` in your `pump.conf` file.

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated. 
{{< /note >}}


```{json}
"analytics_storage_config": {
  "type": "redis",
  "enable_cluster": true,
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 100,
  "use_ssl": false
},
```

## Redis Cluster with TLS 
If you are using TLS for Redis connections, set `use_ssl` to `true` for Gateway and Pump, and `redis_use_ssl` to `true` for the dashboard.


## Redis Cluster with Docker

For Redis clustered mode to work with Tyk using Docker and Amazon ElastiCache, follow these two steps:

### Step 1: Make sure cluster mode is enabled

Set the environment variable `TYK_GW_STORAGE_ENABLECLUSTER` to `true`.

### Step 2: Add all cluster endpoints to the config

Add all the Redis Cluster endpoints into Tyk, not just the primary. If Tyk can't see the whole cluster, then it will not work.

For ElastiCache Redis, you can bypass having to list all your nodes, and instead just use the *configuration endpoint*,
this allows read and write operations and the endpoint will determine the correct node to target.

If this does not work, you can still list out the hosts using an environment variable. To do so, set the environment variable:

```{.copyWrapper}
TYK_GW_STORAGE_HOSTS="redis_master1:port,redis_slave1:port,redis_master2:port,redis_slave2:port,redis_master3:port,redis_slave3:port"
```

It is important that Tyk can connect to all masters and slaves.

It is recommended to ensure that the connection pool is big enough. To do so, set the following environment variables:

```{.copyWrapper}
TYK_GW_STORAGE_MAXIDLE=6000
TYK_GW_STORAGE_MAXACTIVE=10000
```
{{< note success >}}
**Note**  

These are suggested settings, please verify them by load testing.
{{< /note >}}


## Tyk and Redis Sentinel

{{< note success >}}
**Note**  

From v2.9.3 Redis Sentinel is now supported.
{{< /note >}}

Similar to Redis Cluster, our Gateway, Dashboard and Pump all support integration with Redis Sentinel.

To configure Tyk to work with Redis Sentinel, list your servers under `addrs` and set the master name in your Gateway, Dashboard, Pump and MDCB config. Unlike Redis Cluster, `enable_cluster` should **not** be set.  Indicative config snippets as follows:

### Gateway

```{json}
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

```{json}
"redis_addrs": [
  "server1:26379",
  "server2:26379",
  "server3:26379"
],
"redis_master_name": "mymaster"
```

### Pump

```{json}
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

Redis does not support SSL / TLS natively [https://redis.io/topics/encryption](https://redis.io/topics/encryption) and recommend that if you require a
secure connection, that you use a tool such as Spiped. [http://www.tarsnap.com/spiped.html](http://www.tarsnap.com/spiped.html)

Various cloud providers such as Azure & AWS provide a Redis implementation which supports TLS encryption.

Should you wish to turn on encryption between any of Tyk's components & Redis - this can simply be achieved by setting
`"use_ssl": true` alongside any Redis configuration settings within Tyk's config files.

## Troubleshooting

If you find that Tyk components fail to initialise when using Redis clustering, for example the application does not start and the last log file entry shows a message such as `Using clustered mode`, try setting the environment variable `REDIGOCLUSTER_SHARDCOUNT` to `128` on all hosts which connect to the Redis Cluster i.e. Gateway, Dashboard, Pump, MDCB. E.g.

`REDIGOCLUSTER_SHARDCOUNT=128`

If setting to `128` does not resolve the issue, try `256` instead.
