---
title: "How To Configure Tyk To Distribute Analytics Keys To Multiple Redis Shards"
date: 2024-01-22
tags: ["Analytics", "Distributed Analytics", "Redis", "analytics_config.enable_multiple_analytics_keys" ]
description: "Explains how to configure the Gateway and MDCB for distributing analytics to multiple Redis shards."
---

Tyk distributes analytics to Redis storage. A high volume of analytics traffic can decrease performance, since all analytics keys are stored within one Redis server.

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_single.png" >}}

In Redis, *key sharding* is a term used to describe the practice of distributing data across multiple Redis instances or *shards* based on the keys. This feature is provided by [Redis Cluster](https://redis.io/docs/management/scaling/) and provides horizontal scalability and improved performance. 

Tyk supports configuring this behaviour so that analytics keys are distributed across multiple servers within a Redis cluster.

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_distributed.png" >}}

This FAQ explains how to configure Tyk to distribute analytic keys across multiple Redis instances.

## How To Distribute Analytics To Multiple Redis Shards

To distribute analytics traffic across multiple Redis shards effectively you need to configure the Tyk components to leverage the Redis cluster's sharding capabilities.

1. **Enable Redis Cluster Support**: Confirm that the *enable_cluster* configuration option is set to true in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageenable_cluster" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#enable_cluster" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configenable_cluster" >}}) configuration files. This setting activates the Redis cluster support within Tyk components.
2. **Configure Redis Addresses**: Populate the `addrs` array in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageaddrs" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configaddrs" >}}) configuration files (*tyk.conf* and *pump.conf*) with the addresses of all Redis Cluster nodes. If you are using Tyk Self Managed (the licensed product), also update [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#redis_addrs" >}}) configuration file (*tyk_analytics.conf*). This ensures that the Tyk components can interact with the entire Redis Cluster. Please refer to the [configure Redis Cluster]({{< ref "tyk-stack/tyk-gateway/configuration/redis-cluster#redis-cluster--tyk-gateway" >}}) guide for further details.
3. **Adjust Analytics Configuration**: In the Tyk Gateway configuration (tyk.conf), set [analytics_config.enable_multiple_analytics_keys]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_multiple_analytics_keys" >}}) to true. This option allows Tyk to distribute analytics data across multiple keys, which can be sharded by the Redis cluster. There's a corresponding option for MDCB, named [enable_multiple_analytics_keys]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_multiple_analytics_keys" >}}) if using a data plane and sending analytics to MDCB.
4. **Optimise Connection Pool Settings**: Adjust the [optimisation_max_idle]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_idle" >}}) and [optimisation_max_active]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_active" >}}) settings in the configuration files to ensure that the connection pool can handle the analytics workload without overloading any Redis shard.
5. **Monitor and Scale**: Continuously monitor the load on each Redis shard. If load imbalances are detected, you may need to reshard your Redis cluster or scale it to better distribute the keys and handle the traffic.
6. **Use a Separate Analytics Store**: For high analytics traffic, you can opt to use a dedicated Redis cluster for analytics by setting [enable_separate_analytics_store]({{< ref "tyk-oss-gateway/configuration#enable_separate_analytics_store" >}}) to true in the Tyk Gateway configuration file (tyk.conf) and specifying the separate Redis cluster configuration in the *analytics_storage* section. Please consult the [separated analytics storage]({{< ref "tyk-stack/tyk-pump/separated-analytics-storage" >}}) guide for an example with Tyk Pump that can equally be applied to Tyk Gateway.
7. **Review and Test**: After implementing these changes, thoroughly review your configurations and conduct load testing to verify that the analytics traffic is now evenly distributed across all Redis shards.

By following these updated steps you can enhance the distribution of analytics traffic across the Redis shards. This should lead to improved scalability and performance of your Tyk deployment.
