---
date: 2017-03-24T11:46:00Z
title: Manage Multiple Environments
weight: 4
menu: 
  main:
    parent: "Advanced Configuration"
url: "/advanced-configuration/manage-multiple-environments"
aliases:
  - /docs/manage-multiple-environments/
---

It is possible with the Multi-Cloud and the On-Premises version of Tyk to manage multiple environments across data centers. This can be very useful if you have QA, UAT and Production environments that are physically or geographically separate and you want to move API configurations between environments seamlessly.

## What is API Sharding ?

It is possible to use tags in various Tyk objects to change the behaviour of a Tyk cluster or to modify the data that is sent to the analytics engine. Tags are free-form strings that can be embedded in Gateway configurations, API definitions, Policies and Individual Keys.

Tags are used in two ways: To segment a cluster into various "zones" of API management, and secondly, to push more data into the analytics records to make reporting and tracking easier.

### API Sharding

API Sharding is what we are calling our approach to segmenting a Tyk cluster (or data centers) into different zones. An example of this in action would be to imagine you have separate VPCs that deal with different classes of services, lets say: Health, Banking and Pharma.

You don't need the nodes that handle all the traffic for your Pharma APIs to load up the definitions for the other zones' services, this could allow someone to send unexpected traffic through (it may not go anywhere).

Alternatively, you could use segmentation to have separate API definitions for multiple data centers. In this way you could shard your API definitions across those DC's and not worry about having to reconfigure them if there is a failover event.

### Using Sharding to handle API life-cycle with multiple data centers

You can use sharding to very quickly publish an API from a `development` system to `staging` or `live`, simply by changing the tags that are applied to an API definition.

With Tyk Community Edition and Tyk Pro, these clusters must all share the same Redis DB.

If you are an Enterprise user, then you can go a step further and use the [Tyk Multi Data Center Bridge](/docs/tyk-multi-data-centre/) to have full multi-DC, multi-zone cluster segmentation, and manage APIs in different segments across different database back-ends.

### Analytics and Reporting

In order to use tags in analytics, there are two places where you can add a `"tags":[]` section: a Policy Definition, and a Session object for a token.

Policy tags completely replace key tags, these tags are then fed into the analytics system and can be filtered in the dashboard.

### Node Tags

If your API is segmented, node tags will be appended to the analytics data, this will allow you to filter out all traffic going through a specific node or node cluster.

{{< note success >}}
**Note**  

If you set `use_db_app_options.node_is_segmented` to `true` for multiple gateway nodes, you should ensure that `management_node` is set to `false`. This is to ensure visibility for the management node across all APIs. 
{{< /note >}}


`management_node` is available from v2.3.4 and onwards.

See [Tyk Gateway Configuration Options](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/) for more details on node tags.
