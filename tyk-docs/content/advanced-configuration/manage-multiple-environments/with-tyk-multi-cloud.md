---
date: 2017-03-24T11:48:31Z
title: Gateway Sharding
menu:
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-multi-cloud
weight: 2 
---

## Gateway Sharding Introduction

With Tyk, it is easy to enable a sharded configuration, you can deploy Gateways which selectively load APIs.  This unlocks abilities to run Gateways in multiple zones, all connected to the same Control Plane.  This allows for GDPR deployments, development/test Gateways, or even DMZ/NON-DMZ Gateways.

Couple this functionality with the Tyk [Multi Data Center Bridge]({{< ref "tyk-multi-data-centre/" >}}) to achieve a global, multi-cloud deployment.

## Configure a Gateway as a shard

Setting up a Gateway to be a shard, or a zone, is very easy. All you do is tell the node in the tyk.conf file what tags to respect and that it is segmented:

```{.copyWrapper}
...
"db_app_conf_options": {
  "node_is_segmented": true,
  "tags": ["qa", "uat"]
},
	...
```

Tags are always treated as OR conditions, so this node will pick up all APIs that are marked as `qa` or `uat`.

## Tag an API for a shard using the Dashboard

From the API Designer, select the **Advanced Options** tab:

![Advanced options tab](img/2.10/advanced_options_designer.png)

Scroll down to the **Segment Tags** options:

![Segment tags section](img/2.10/segment_tags.png)

Set the tag name you want to apply, and click **Add**.

When you save the API, the tags will become immediately active. If any Gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant Gateway.