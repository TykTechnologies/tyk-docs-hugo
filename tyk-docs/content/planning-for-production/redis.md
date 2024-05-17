---
title: Redis
tags: ["Redis", "Versions", "Settings"]
description: "The supported versions of Redis and MongoDB for Tyk and how to configure them."
menu:
  main:
    parent: "Database Settings"
weight: 1 
---

{{< redis-versions >}}

### Split out your Database

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB/PostgreSQL live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB or PostgreSQL cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions

If you are making use of the Tyk Caching feature, then it is possible to use a secondary Redis server or Redis cluster to store cache data. This can be very useful in high-traffic APIs where latency is at a premium.


### Make sure you have enough Redis connections

Tyk makes heavy use of Redis in order to provide a fast and reliable service, in order to do so effectively, it keeps a passive connection pool ready. For high-performance setups, this pool needs to be expanded to handle more simultaneous connections, otherwise you may run out of Redis connections.

Tyk also lets you set a maximum number of open connections, so that you don't over-commit connections to the server.

To set your maximums and minimums, edit your `tyk.conf` and `tyk_analytics.conf` files to include:

```{.copyWrapper}
"storage": {
  ...
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  ...
},
```
    

Set the `max_idle` value to something large, we usually leave it at around `2000` for HA deployments, and then set your `max_active` to your upper limit (as in, how many additional connections over the idle pool should be used).

### Protection of Redis data

Tyk uses Redis to store API tokens and OAuth clients, so it is advisable to *not* treat Redis instances as ephemeral. The exception to this is when you are using Tyk Multi Data Center Bridge, but you will still need to retain the master Redis instance.

You must ensure that Redis is persisted, or at least in a configuration where it is easy to restore or failover. So, for example, with Elasticache, making sure there are many read-replicas and regular snapshots can ensure that your data survives a failure.

### Redis Encryption

Redis supports [SSL/TLS encryption](https://redis.io/topics/encryption) from version 6 as an optional feature, enhancing the security of data in transit. To configure TLS or mTLS connections between an application and Redis, consider the following settings in Tyk's configuration files:

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
  "host": "server1",
  "port": 6379,
  "use_ssl": true,
  "ssl_secure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2"
}
```

### Capping Analytics
Tyk Gateways can generate a lot of analytics data. Be sure to read about [capping your Dashboard analytics]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}})
