---
date: 2017-03-24T11:48:31Z
title: With Tyk Multi-Cloud
menu:
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-multi-cloud
weight: 2 
---

## Multi-Cloud Tagging Introduction

With Tyk Multi-Cloud it is easy to enable a sharded configuration, you will need to modify the `tyk.conf` file of your Gateway (this may require deeper customisation, we can help you with that), and then enable the tags in your cloud Dashboard.

You can then launch your tagged Gateways throughout your infrastructure, Tyk Multi-Cloud will take care of synchronising API Keys, API Configurations and Policies across your environments.

Notes on Multi-Cloud distributions:

* Keys are cached from our infrastructure down into the Redis instance that your Multi-Cloud Gateway has access to, this means that if you have Keys that share environments, their quotas and rate limits will be applied on a per-environment basis, between environments, not across environments.
* Updating a Key in the Dashboard will cause the cached version to be removed from your Multi-Cloud and then re-synched, this means their quotas will be reset.
* To ensure that Tyk Multi-Cloud Gateways synchronise in isolated environments, ensure that the `group_id` is set to a data center ID under your `tyk.conf` `slave_options`, otherwise only one Multi-Cloud gateway will pick up keyspace changes.

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

![Advanced options tab](/docs/img/2.10/advanced_options_designer.png)

Scroll down to the **Segment Tags** options:

![Segment tags section](/docs/img/2.10/segment_tags.png)

Set the tag name you want to apply, and click **Add**.

When you save the API, the tags will become immediately active. If any Gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant Gateway.