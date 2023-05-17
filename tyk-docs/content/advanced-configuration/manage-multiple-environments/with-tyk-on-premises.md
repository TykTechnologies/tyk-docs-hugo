---
date: 2020-08-04T11:56:24Z
title: Tyk Self-Managed
menu: 
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-self-managed
weight: 3
---

## Gateway & API Sharding
Tyk Gateway has a very powerful functionality that allows you to selectively choose which APIs are to be loaded on which Gateways.

Imagine the case where you have two sets of APIs, Internal & External.  You want to prevent your Internal APIs from being accessed or visible outside your protected network.  Well, [sharding]({{< ref "advanced-configuration/manage-multiple-environments#api-sharding" >}}) makes it extremely easy to configure your Tyk Gateways from the Dashboard.

# Instructions

## 1. Configure a Gateway as a shard

Setting up a gateway to be a shard, or a zone, is very easy. All you do is tell the node in the tyk.conf file what tags to respect and that it is segmented:

```{.copyWrapper}
...
"db_app_conf_options": {
  "node_is_segmented": true,
  "tags": ["private-gw", "edge"]
},
...
```

Tags are always treated as OR conditions, so this node will pick up all APIs that are marked as `private-gw` or `edge`.


{{< note success >}}
**Note**

In order to expose more details about the Gateway to the Dashboard, you can now configure the [edge_endpoints]({{< ref "tyk-dashboard/configuration#edge_endpoints" >}}) section in the tyk-analytics.conf, and the Dashboard UI will pick that up and present you a list of Gateways you can chose from when creating an API.
{{< /note >}}

## 2. Tag an API for a shard using the Dashboard

To add an API Tag to a an API configuration in the Dashboard, Select Edit from your API options, and select the *Advanced Options* tab:

{{< img src="/img/2.10/advanced_options_designer.png" alt="Advanced options tab location" >}}

Then scroll down to the *Segment Tags* section:

{{< img src="/img/2.10/segment_tags.png" alt="Segement tags section" >}}

In this section, set the tag name you want to apply, and click *Add*.

When you save the API, the tags will become immediately active, and if any Gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant Gateway.

### Exposed Gateway tags to Dashboard UI

From version 3.2.2 of the Tyk Dashboard, if [edge_endpoints]({{< ref "tyk-dashboard/configuration#edge_endpoints" >}}) are being configured in tyk-analytics.conf, your Dashboard will automatically pick that list up for you, and display it in the UI when you create your API.

{{< img src="/img/dashboard/system-management/list-gateways.png" alt="List of available Gateways" >}}

Once you select one or more Gateways, the *Segment Tags* section will be automatically prefilled with the tag values from the `edge_endpoints` configuration.

{{< img src="/img/dashboard/system-management/list-segment-tags.png" alt="List of segment tags" >}}

Also, for every Gateway selected, there will be an API URL presented at the top of the page, within the *Core Settings* tab.

{{< img src="/img/dashboard/system-management/list-api-urls.png" alt="List of API URLs" >}}

## Target an API Definition via JSON

In your API definition, add a tags section to the root of the API Definition:

```{.copyWrapper}
"tags": ["private-gw"]
```

This will also set the tags for the API and when API requests are made through this Gateway, these tags will be transferred in to the analytics data set.

# API Tagging with On-Premises

API Sharding with Self-Managed is very flexible, but it behaves a little differently to sharding with Tyk Cloud Hybrid & Tyk Global Self-Managed deployments. The key difference is that with the latter, you can have federated Gateway deployments with **their own redis databases**.  However with Tyk Self-Managed the zoning is limited to tags only, and must share a single Redis database.

To isolate Self-Managed Gateway installations across data centers you will need to use Tyk Multi Data Center Bridge component. This system powers the functionality of Tyk Cloud & Tyk Cloud Hybrid in our cloud and is available to our Enterprise customers as an add-on.
