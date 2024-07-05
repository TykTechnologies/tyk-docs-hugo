---
title: "How To Reduce CPU Usage In A Redis Cluster"
date: 2024-01-22
tags: ["Analytics", "Distributed Analytics", "Redis", "Redis Shards", "analytics_config.enable_multiple_analytics_keys" ]
description: "Explains how to reduce CPU usage by configuring Tyk to use a Redis Cluster to distribute analytics keys to multiple Redis Shards"
---

This FAQ explains a potential reason for high CPU usage in a Redis node within a Redis Cluster and explains the steps that can be taken to resolve the issue.

## What does high CPU usage in a Redis node within a Redis Cluster mean?

When a single Redis node within a Redis Cluster exhibits high CPU usage, it indicates that the CPU resources of that particular node are being heavily utilised compared to others in the cluster.

The illustration below highlights the scenario where a single Redis node is exhibiting high CPU usage of 1.20% within a Redis Cluster. 

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_single.png" width="768" alt="analytics keys stored in one Redis server" >}}

## What could be causing this high CPU usage?

One possible reason for high CPU usage in a single Redis node within a Redis Cluster is that analytics features are enabled and keys are being stored within that specific Redis node.

## How does storing keys within a single Redis server contribute to high CPU usage?

A high volume of analytics traffic can decrease performance, since all analytics keys are stored within one Redis server. Storing keys within a single Redis server can lead to increased CPU usage because all operations related to those keys, such as retrieval, updates and analytics processing, are concentrated on that server. This can result in heavier computational loads on that particular node. This leads to high CPU usage.

## What can be done to address high CPU usage in this scenario?

Consider distributing the analytics keys across multiple Redis nodes within the cluster. This can help distribute the computational load more evenly, reducing the strain on any single node and potentially alleviating the high CPU usage.

In Redis, *key sharding* is a term used to describe the practice of distributing data across multiple Redis instances or *shards* based on the keys. This feature is provided by [Redis Cluster](https://redis.io/docs/management/scaling/) and provides horizontal scalability and improved performance. 

Tyk supports configuring this behavior so that analytics keys are distributed across multiple servers within a Redis cluster. The image below illustrates that CPU usage is reduced across two Redis servers after making this configuration change.

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_distributed.png" width="600" alt="analytics keys distributed across Redis servers" >}}

## How do I configure Tyk to distribute analytics keys to multiple Redis shards?

Follow these steps:

### 1. Check that your Redis Cluster is correctly configured

Confirm that the `enable_cluster` configuration option is set to true in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageenable_cluster" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#enable_cluster" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configenable_cluster" >}}) configuration files. This setting 
informs Tyk that a Redis Cluster is in use for key storage.

Ensure that the `addrs` array is populated in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageaddrs" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configaddrs" >}}) configuration files (*tyk.conf* and *pump.conf*) with the addresses of all Redis Cluster nodes. If you are using Tyk Self Managed (the licensed product), also update [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#redis_addrs" >}}) configuration file (*tyk_analytics.conf*). This ensures that the Tyk components can interact with the entire Redis Cluster. Please refer to the [configure Redis Cluster]({{< ref "tyk-stack/tyk-gateway/configuration/redis-cluster#redis-cluster--tyk-gateway" >}}) guide for further details.

### 2. Configure Tyk to distribute analytics keys to multiple Redis shards

To distribute analytics keys across multiple Redis shards effectively you need to configure the Tyk components to leverage the Redis cluster's sharding capabilities:

1. **Optimise Analytics Configuration**: In the Tyk Gateway configuration (tyk.conf), set [analytics_config.enable_multiple_analytics_keys]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_multiple_analytics_keys" >}}) to true. This option allows Tyk to distribute analytics data across Redis nodes, using multiple keys for the analytics. There's a corresponding option for Self Managed MDCB, also named [enable_multiple_analytics_keys]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_multiple_analytics_keys" >}}). Useful only if the gateways in the data plane are configured to send analytics to MDCB.
2. **Optimise Connection Pool Settings**: Adjust the [optimisation_max_idle]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_idle" >}}) and [optimisation_max_active]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_active" >}}) settings in the configuration files to ensure that the connection pool can handle the analytics workload without overloading any Redis shard.
3. **Use a Separate Analytics Store**: For high analytics traffic, you can opt to use a dedicated *Redis Cluster* for analytics by setting [enable_separate_analytics_store]({{< ref "tyk-oss-gateway/configuration#enable_separate_analytics_store" >}}) to true in the Tyk Gateway configuration file (*tyk.conf*) and specifying the separate Redis cluster configuration in the `analytics_storage` section. Please consult the [separated analytics storage]({{< ref "tyk-stack/tyk-pump/separated-analytics-storage" >}}) guide for an example with *Tyk Pump* that can equally be applied to *Tyk Gateway*.
4. **Review and Test**: After implementing these changes, thoroughly review your configurations and conduct load testing to verify that the analytics traffic is now evenly distributed across all Redis shards.

By following these steps you can enhance the distribution of analytics traffic across the Redis shards. This should lead to improved scalability and performance of your Tyk deployment.
