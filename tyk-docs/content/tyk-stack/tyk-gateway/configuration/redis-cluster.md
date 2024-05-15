---
date: 2017-03-27T15:52:45+01:00
title: Configure Redis Cluster
tags: ["Redis", "Cluster", "Gateway Configuration", "Pump Configuration", "Dashboard Configuration"]
description: "Configuring your Tyk installation with Redis Cluster"
menu:
  main:
    parent: "Tyk Gateway Configuration Options"
weight: 7 
aliases:
  - /tyk-configuration-reference/redis-cluster-sentinel/
---

## Introduction

Our Gateway, Dashboard and Pump all support integration with Redis Cluster. Redis Cluster allows data to be automatically sharded across multiple Redis Nodes. To setup Redis Cluster correctly, we recommend you read the [Redis Cluster Tutorial](https://redis.io/topics/cluster-tutorial). You must use the same settings across the Gateway, Dashboard and Pump.

{{< note success >}}
**Note**  

Redis Cluster operates differently from a Redis setup where one instance serves as the primary and others as replicas.
{{< /note >}}

{{< redis-versions >}}


## Redis Cluster & Tyk Gateway 

To configure the Tyk Gateway to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `addrs` in your `tyk.conf` file.

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated. 
{{< /note >}}

If you are using TLS for Redis connections, set `use_ssl` to `true`.

```json
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


```json
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


```json
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
TYK_GW_STORAGE_ADDRS="redis_primary1:port,redis_replica1:port,redis_primary2:port,redis_replica2:port,redis_primary3:port,redis_replica3:port"
```

It is important that Tyk can connect to all primary and replica instances.

It is recommended to ensure that the connection pool is big enough. To do so, set the following environment variables:

```{.copyWrapper}
TYK_GW_STORAGE_MAXIDLE=6000
TYK_GW_STORAGE_MAXACTIVE=10000
```
{{< note success >}}
**Note**  

These are suggested settings, please verify them by load testing.
{{< /note >}}

### Redis Cluster with TLS
If you are using TLS for Redis connections, set `use_ssl` to `true` for Gateway and Pump, and `redis_use_ssl` to `true` for the dashboard.
Redis supports [SSL/TLS encryption](https://redis.io/topics/encryption) from version 6 as an optional feature, enhancing the security of data in transit. Similarly, Amazon ElastiCache offers encryption in transit and at rest. To configure TLS or mTLS connections between an application and Redis, consider the following settings in Tyk's configuration files:

- `storage.use_ssl`: Set this to true to enable TLS encryption for the connection.

- `storage.ssl_secure_skip_verify`: A flag that, when set to true, instructs the application not to verify the Redis server's TLS certificate. This is not recommended for production due to the risk of `man-in-the-middle` attacks.

From **Tyk 5.3**, additional options are available for more granular control:

- `storage.ca_file`: Path to the Certificate Authority (CA) file for verifying the Redis server's certificate.

- `storage.cert_file` and `storage.key_file`: Paths to your application's certificate and private key files, necessary for mTLS where both parties verify each other's identity.

- `storage.max_version` and `storage.min_version`: Define the acceptable range of TLS versions, enhancing security by restricting connections to secure TLS protocols (1.2 or 1.3).

#### Setting up an Insecure TLS Connection
- **Enable TLS**: By setting `"use_ssl": true`, you encrypt the connection.
- **Skip Certificate Verification**: Setting `"ssl_secure_skip_verify": true` bypasses the server's certificate verification, suitable only for non-production environments.

#### Setting up a Secure TLS Connection
- Ensure `use_ssl` is set to `true`.
- Set `ssl_secure_skip_verify` to `false` to enforce certificate verification against the CA specified in `ca_file`.
- Specify the path to the CA file in `ca_file` for server certificate verification.
- Adjust `min_version` and `max_version` to secure TLS versions, ideally 1.2 and 1.3.

#### Setting up a Mutual TLS (mTLS) Connection
- Follow the steps for a secure TLS connection.
- Provide paths for `cert_file` and `key_file` for your application's TLS certificate and private key, enabling Redis server to verify your application's identity.

#### Example Gateway Configuration
```json
"storage": {
  "type": "redis",
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "use_ssl": true,
  "ssl_secure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2",
  "enable_cluster": true,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000
}
```

## Troubleshooting Redis Cluster

If you find that Tyk components fail to initialise when using Redis clustering, for example the application does not start and the last log file entry shows a message such as `Using clustered mode`, try setting the environment variable `REDIGOCLUSTER_SHARDCOUNT` to `128` on all hosts which connect to the Redis Cluster i.e. Gateway, Dashboard, Pump, MDCB. E.g.

`REDIGOCLUSTER_SHARDCOUNT=128`

If setting to `128` does not resolve the issue, try `256` instead.
