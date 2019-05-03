---
date: 2017-03-24T11:56:24Z
title: With On-Premises
menu: 
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-on-premises
weight: 3
---

## <a name="api-tagging"></a>API Tagging with On-Premises

API Sharding with On-Premises is very flexible, but it behaves a little differently to sharding with Tyk Multi-Cloud. The key difference is that with Tyk Multi-Cloud you can have multiple isolated environments with their own databases all sharing the same configurations and keys by setting the `group_id` option in the Gateway slave options, but with Tyk On-Premises the zoning is limited to tags only, and must share a single Redis database.

To isolate On-Premises installations across data centers you will need to use our Multi Data Center Bridge component. This system powers the functionality of Tyk Multi-Cloud in our cloud and is available to our Enterprise customers as an add-on.

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

To add an API Tag to a an API configuration in the dashboard, first ensure you are in the API Editor, and have selected the *Advanced Options* tab:

![Advanced options tab location][1]

Once you have reached this section, scroll down to the *Segment Tags* section:

![Segement tags section][2]

In this section, set the tag name you want to apply, and click the *Add* button.

When you save the API, the tags will become immediately active, and if any gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant gateway.

## <a name="target-api-definition-for-shard"></a> Target an API Definition for a shard

In your API definition, add a tags section to the root of the API Definition:

```{.copyWrapper}
"tags": ["health"]
```

This will set the tags for the API and when the API is loaded by a gateway, these tags will be transferred in to the analytics data set.


[1]: /docs/img/dashboard/system-management/api_designer_advanced_2.5.png
[2]: /docs/img/dashboard/system-management/segments_tags_2.5.png

