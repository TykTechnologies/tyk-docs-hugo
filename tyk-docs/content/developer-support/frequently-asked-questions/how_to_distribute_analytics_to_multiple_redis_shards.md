---
title: "How To Configure The Gateway Or MDCB To Distribute Analytics To Multiple Redis Shards"
date: 2024-01-22
tags: ["Analytics", "Distributed Analytics", "Redis", "analytics_config.enable_multiple_analytics_keys" ]
description: "Explains how to configure the Gateway and MDCB for distributing analytics to multiple Redis shards."
---

Tyk distributes analytics to Redis storage. A high volume of analytics can decrease performance, since all keys are contained within one Redis cluster.

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_single.png" >}}

To improve performance under high loads analytics keys can be distributed across multiple redis clusters.

{{< img src="/img/faq/enable-multiple-analytics-keys/redis_distributed.png" >}}

This FAQ explains how to configure the Tyk Gateway and MDCB to distribute analytics across multiple redis shards.

## How To Configure Gateway To Distribute Analytics To Multiple Redis Shards

[analytics_config.enable_multiple_analytics_keys]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_multiple_analytics_keys" >}})

## How To Configure MDCB To Distribute Analytics To Multiple Redis Shards

[enable_multiple_analytics_keys]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_multiple_analytics_keys" >}})