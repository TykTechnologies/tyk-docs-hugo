---
date: 2017-03-24T11:48:31Z
title: With Tyk Hybrid
menu:
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-hybrid
weight: 2 
---

## <a name="tagging-introduction"></a>Hybrid Tagging Introduction

With Tyk Hybrid it is easy to enable a sharded configuration, you will need to modify the `tyk.conf` file of you gateway (this may require deeper customisation, we can help you with that), and then enable the tags in your cloud dashboard.

You can then launch your tagged gateways throughout your infrastructure, Tyk Hybrid will take care of synchronising API tokens, API Configurations and policies across your environments.

Notes on Hybrid distributions:

* Tokens are cached from our infrastructure down into the Redis instance that your hybrid gateway has access to, this means that if you have tokens that share environments, their quotas and rate limits will be applied on a per-environment basis, between environments, not across environments.
* Updating a token in the dashboard will cause the cached version to be removed from your hybrid and then re-synched, this means their quotas will be reset.
* To ensure that Tyk Hybrid gateways synchronise in isolated environments, ensure that the `group_id` is set to a data center ID under your `tyk.conf` `slave_options`, otherwise only one hybrid gateway will pick up keyspace changes.

## <a name="configure-gateway-as-shard"></a> Configure a Gateway as a shard

Setting up a gateway to be a shard, or a zone, is very easy. All you do is tell the node in the tyk.conf file what tags to respect and that it is segmented:

```
	...
	"db_app_conf_options": {
	    "node_is_segmented": true,
	    "tags": ["qa", "uat"]
	},
	...
```

Tags are always treated as OR conditions, so this node will pick up all APIs that are marked as `qa` or `uat`.

## <a name="tag-api-with-dashboard"></a> Tag an API for a shard using the Dashboard

To add an API Tag to a an API configuration in the dashboard, first ensure you are in the API Editor, and have selected the *Advanced Options* tab:

![Advanced options tab location][1]

Once you have reached this section, scroll down to the *Segment Tags* section:

![Segement tags section][2]

In this section, set the tag name you want to apply, and click the *Add* button.

When you save the API, the tags will become immediately active, and if any gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant gateway.

[1]: /docs/img/dashboard/system-management/advancedOptionsDesigner.png
[2]: /docs/img/dashboard/system-management/segmentTags.png



