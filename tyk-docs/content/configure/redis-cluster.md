---
date: 2017-03-27T15:52:45+01:00
title: Configure Redis Cluster
menu:
  main:
    parent: "Configure"
weight: 7 
---

## <a name="redis-cluster-gateway"></a> Redis Cluster & Tyk Gateway 

Tyk supports Redis cluster integration (please note this is different from a Redis master/slave setup). To work with a Redis cluster, simply specify it in your `tyk.conf` file:

```
	"storage": {
	    "type": "redis",
	    "enable_cluster": true,
	    "hosts" : {
	        "server1": "6379",
	        "server2": "6380",
	        "server3: "6381",
	    },
	    "username": "",
	    "password": "",
	    "database": 0,
	    "optimisation_max_idle": 100
	},
```

Tyk Dashboard and Tyk Pump also support Redis cluster, and must have this setting enabled as well in their respective settings files in order to operate effectively.

## <a name="redis-cluster-dashboard"></a> Redis Cluster & Tyk Dashboard

Tyk Dashboard also supports Redis cluster, simply update the `tyk_analytics.conf` to use the cluster like so:

```
	"redis_hosts": {
	    "server1": "6379",
	    "server2": "6380",
	    "server3: "6381",
	},
	"enable_cluster": true
```

Cluster settings must be the same across all Tyk components. 

## <a name="redis-cluster-pump"></a> Redis Cluster & Tyk Pump

Tyk Pump also supports Redis cluster, simply update the pump.conf to use the cluster like so:

```
	"analytics_storage_config": {
	    "type": "redis",
	    "enable_cluster": true,
	    "hosts" : {
	        "server1": "6379",
	        "server2": "6380",
	        "server3: "6381",
	    },
	    "username": "",
	    "password": "",
	    "database": 0,
	    "optimisation_max_idle": 100
	},
```
Then the cluster driver should be invoked instead of the standard Redis driver.

## <a name="redis-cluster-docker"></a> Redis Cluster with Docker

For Redis clustered mode to work with Tyk using Docker and Elasticache, follow these two steps:

### Step 1: Make sure cluster mode is enabled

Set the environment variable `TYK_GW_STORAGE_ENABLECLUSTER` to `true`.

### Step 2: Add all cluster endpoints to the config

Add all the cluster endpoints into Tyk, not just the primary. If Tyk can't see the whole cluster, then it will not work.

For Elasticache Redis, you can bypass having to list all your nodes, and instead just use the *configuration endpoint*, this allows read and write operations and the endpoint will determine the correct node to target.

If this does not work, you can still list out the hosts using an environment variable, to do so, set the environment variable

```
    TYK_GW_STORAGE_HOSTS="redis_master1:port,redis_slave1:port,redis_master2:port,redis_slave2:port,redis_master3:port,redis_slave3:port"
```

It is important that Tyk can connect to all masters and slaves.

It is recommended to ensure that the connection pool is big enough. To do this, set the following environment variables:

```
    TYK_GW_STORAGE_MAXIDLE=6000
    TYK_GW_STORAGE_MAXACTIVE=10000
```

> **Note**: These are suggested settings, please verify them by load testing.


