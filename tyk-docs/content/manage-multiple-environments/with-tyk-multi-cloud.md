---
date: 2017-03-24T11:48:31Z
title: With Tyk Multi-Cloud
menu:
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-multi-cloud
weight: 2 
---

## <a name="tagging-introduction"></a>Multi-Cloud Tagging Introduction

With Tyk Multi-Cloud it is easy to enable a sharded configuration, you will need to modify the `tyk.conf` file of you gateway (this may require deeper customisation, we can help you with that), and then enable the tags in your cloud dashboard.

You can then launch your tagged gateways throughout your infrastructure, Tyk Multi-Cloud will take care of synchronising API tokens, API Configurations and policies across your environments.

Notes on Multi-Cloud distributions:

* Tokens are cached from our infrastructure down into the Redis instance that your Multi-Cloud Gateway has access to, this means that if you have tokens that share environments, their quotas and rate limits will be applied on a per-environment basis, between environments, not across environments.
* Updating a token in the dashboard will cause the cached version to be removed from your Multi-Cloud and then re-synched, this means their quotas will be reset.
* To ensure that Tyk Multi-Cloud gateways synchronise in isolated environments, ensure that the `group_id` is set to a data center ID under your `tyk.conf` `slave_options`, otherwise only one Multi-Cloud gateway will pick up keyspace changes.

## <a name="configure-gateway-as-shard"></a> Configure a Gateway as a shard

Setting up a gateway to be a shard, or a zone, is very easy. All you do is tell the node in the tyk.conf file what tags to respect and that it is segmented:

```{.copyWrapper}
...
"db_app_conf_options": {
  "node_is_segmented": true,
  "tags": ["qa", "uat"]
},
	...
```

Tags are always treated as OR conditions, so this node will pick up all APIs that are marked as `qa` or `uat`.

## <a name="tag-api-with-dashboard"></a> Tag an API for a shard using the Dashboard

From the API Designer, select the **Advanced Options** tab:

![Advanced options tab location][1]

Scroll down to the **Segment Tags** options:

![Segement tags section][2]

Set the tag name you want to apply, and click **Add**.

When you save the API, the tags will become immediately active. If any gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant gateway.

[1]: /docs/img/dashboard/system-management/api_designer_advanced_2.5.png
[2]: /docs/img/dashboard/system-management/segments_tags_2.5.png



