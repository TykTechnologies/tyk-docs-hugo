---
date: 2017-03-27T15:52:45+01:00
title: Configure Redis Cluster
menu:
  main:
    parent: "Tyk Configuration Reference"
weight: 7 
---

## <a name="introduction"></a>Introduction

Our Gateway, Dashboard and Pump all support integration with Redis Cluster. Redis Cluster allows data to be automatically sharded across multiple Redis Nodes. To setup Redis Cluster correctly, we recommend you read the [Redis Cluster Tutorial](https://redis.io/topics/cluster-tutorial). You must use the same settings across the Gateway, Dashboard and Pump.

> **NOTE**: Redis Cluster is different to a Redis Master/Slave setup.

## <a name="redis-cluster-gateway"></a> Redis Cluster & Tyk Gateway 

To configure the Tyk Gateway to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `hosts` in your `tyk.conf` file:

If you are using TLS for Redis connections, set `use_ssl` to `true`.

```{json}
"storage": {
  "type": "redis",
  "enable_cluster": true,
  "hosts" : {
    "server1": "6379",
    "server2": "6380",
    "server3": "6381"
  },
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  "use_ssl": false
},
```

## <a name="redis-cluster-dashboard"></a> Redis Cluster & Tyk Dashboard

```{json}
"redis_hosts": {
  "server1": "6379",
  "server2": "6380",
  "server3": "6381"
},
"enable_cluster": true
```
To configure the Tyk Dashboard to work with your Redis Cluster, add the Redis hosts information to your `tyk_analytics.conf` file:


## <a name="redis-cluster-pump"></a> Redis Cluster & Tyk Pump

To configure the Tyk Pump to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `hosts` in your `pump.conf` file:

```{json}
"analytics_storage_config": {
  "type": "redis",
  "enable_cluster": true,
  "hosts" : {
    "server1": "6379",
    "server2": "6380",
    "server3": "6381"
  },
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 100,
  "use_ssl": false
},
```
Then the Cluster driver should be invoked instead of the standard Redis driver. If you are using TLS for Redis connections, set `use_ssl` to `true`.


## <a name="redis-cluster-docker"></a> Redis Cluster with Docker

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

> **Note**: These are suggested settings, please verify them by load testing.

## <a name="sentinel"></a>Tyk and Redis Sentinel
We do not support direct integration with Redis Sentinel. You will need to implement it in association with a HAProxy. As we do support Amazon ElastiCache, we recommend using this with Redis Sentinel. For more details on Amazon ElastiCache, see [here](https://aws.amazon.com/elasticache/). The following article also details how to setup Redis Sentinel and HAProxy: [Setup Redis Sentinel and HAProxy](https://discuss.pivotal.io/hc/en-us/articles/205309388-How-to-setup-HAProxy-and-Redis-Sentinel-for-automatic-failover-between-Redis-Master-and-Slave-servers).

### Redis Encryption

Redis does not support SSL / TLS natively https://redis.io/topics/encryption, and recommend that if you require a
secure connection, that you use a tool such as Spiped. http://www.tarsnap.com/spiped.html

Various cloud providers such as Azure & AWS provide a Redis implementation which supports TLS encryption.

Should you wish to turn on encryption between any of Tyk's components & Redis - this can simply be achieved by setting
`"use_ssl": true` alongside any Redis configuration settings within Tyk's config files.

## Troubleshooting

If you find that Tyk components fail to initialise when using Redis clustering, for example the application does not start and the last log file entry shows a message such as `Using clustered mode`, try setting the environment variable `REDIGOCLUSTER_SHARDCOUNT` to `128` on all hosts which connect to the Redis Cluster i.e. Gateway, Dashboard, Pump, MDCB. E.g.

`REDIGOCLUSTER_SHARDCOUNT=128`

If setting to `128` does not resolve the issue, try `256` instead.
