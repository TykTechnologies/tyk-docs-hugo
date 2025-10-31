---
date: 2025-01-05T14:36:28Z
title: Manage Multiple Environments
tags: ["TLS", "SSL", "Security", "Certificate", "Pinning"]
description: "How to Manage Multiple Environments"
aliases:
  - /advanced-configuration/manage-multiple-environments/with-tyk-cloud-classic
  - /manage-multiple-environments/
  - /advanced-configuration/manage-multiple-environments
  - /advanced-configuration/manage-multiple-environments/move-apis-between-environments
  - /advanced-configuration/manage-multiple-environments/move-keys-between-environments
  - /advanced-configuration/manage-multiple-environments/move-policies-between-environments
  - /advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud
  - /advanced-configuration/manage-multiple-environments/with-tyk-on-premises
---

## Introduction

It is possible with the Multi-Cloud and the Self-Managed version of Tyk to manage multiple environments across data centers. This can be very useful if you have QA, UAT and Production environments that are physically or geographically separate and you want to move API configurations between environments seamlessly.

## What is API Sharding ?

It is possible to use tags in various Tyk objects to change the behavior of a Tyk cluster or to modify the data that is sent to the analytics engine. Tags are free-form strings that can be embedded in Gateway configurations, API definitions, Policies and Individual Keys.

Tags are used in two ways: To segment a cluster into various "zones" of API management, and secondly, to push more data into the analytics records to make reporting and tracking easier.

### API Sharding

API Sharding is what we are calling our approach to segmenting a Tyk cluster (or data centers) into different zones. An example of this in action would be to imagine you have separate VPCs that deal with different classes of services, lets say: Health, Banking and Pharma.

You don't need the nodes that handle all the traffic for your Pharma APIs to load up the definitions for the other zones' services, this could allow someone to send unexpected traffic through (it may not go anywhere).

Alternatively, you could use segmentation to have separate API definitions for multiple data centers. In this way you could shard your API definitions across those DC's and not worry about having to reconfigure them if there is a failover event.

### Using Sharding to handle API life-cycle with multiple data centers

You can use sharding to very quickly publish an API from a `development` system to `staging` or `live`, simply by changing the tags that are applied to an API definition.

With Tyk Community Edition and Tyk Pro, these clusters must all share the same Redis DB.

If you are an Enterprise user, then you can go a step further and use the [Tyk Multi Data Center Bridge]({{< ref "api-management/mdcb#managing-geographically-distributed-gateways-to-minimize-latency-and-protect-data-sovereignty" >}}) to have full multi-DC, multi-zone cluster segmentation, and manage APIs in different segments across different database back-ends.

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

See [Tyk Gateway Configuration Options]({{< ref "tyk-oss-gateway/configuration" >}}) for more details on node tags.

## Move APIs Between Environments 

It is possible to move APIs between Tyk environments in the following ways:

### In Shared Dashboard Environments

If the environments are both Self-Managed installations and are sharing a Tyk Dashboard (and optionally an MDCB instance) then you can use API and Gateway tagging to transparently and effortlessly move an API from one environment to another.

See [API Tagging]({{< ref "api-management/multiple-environments#api-tagging-with-on-premises" >}}) for more details.

#### API Sharding

You can also use [API Sharding]({{< ref "api-management/multiple-environments#what-is-api-sharding-" >}}) to move APIs in a Shards (and or MDCB) Tyk Self-Managed installation.

### In Separate Dashboard Environments

If the API dashboards are separate and you wish to migrate API Definitions between two completely segregated environments (e.g. migrating to new hardware or a new DC), then you can use the Export functionality of the Dashboard to download the API definition as JSON and import it into your new installation.

#### Steps for Configuration:

1. **Select Your API**

    From the **API Designer**, select your API:

    {{< img src="/img/2.10/apis_list.png" alt="API designer" >}}

2. **Export the API**

    Click **EXPORT**:

    {{< img src="/img/2.10/export_api_button.png" alt="Export button location" >}}

3. **Save the API**

    Save and rename the JSON file:

4. **Import into your New Environment**

    In your new environment, click **IMPORT API**:

    {{< img src="/img/2.10/import_api_button.png" alt="Select import" >}}

5. **Generate the new API**

    Select the **From Tyk Definition** tab and paste the contents of the JSON file into the code editor and click **GENERATE API**:

    {{< img src="/img/2.10/import_tyk_definition.png" alt="Generate API" >}}

    This will now import the API Definition into your new environment, if you have kept the API ID in the JSON document as is, the ID will remain the same.

{{< note success >}}
**Note**  

The ID you use in with any Dashboard API integrations will change as the documents physical ID will have changed with the import.
{{< /note >}}

### Use Tyk-Sync

You can also use our new Tyk-Sync tool which allows you to sync your APIs (and Policies) with a Version Control System (VCS). You can then move your APIs between environments. See [Tyk-Sync]({{< ref "api-management/automations/sync" >}}) for more details.

## Move Keys Between Environments 

Tyk currently does not have a facility to export a group of keys from one environment and reissue them in another and still be able to manage those keys from within the Dashboard.

However, it is possible to temporarily allow access to existing keys in a new environment, but it should be noted that these keys should eventually be expired and re-generated within the new environment.

### Moving Keys Between Environments / Creating Custom Keys

In order to use a legacy key in a new environment, simply extract the key from the old environment using the Tyk REST APIs and then create them in the new environment using the custom key creation API.

To create a key with a custom identifier, ie Token, simply use the [Gateway (OSS)]({{< ref "tyk-gateway-api" >}}) or [Dashboard (Pro)]({{< ref "api-management/dashboard-configuration#create-a-custom-key" >}}) REST APIs to import a custom key.

## Move Policies Between Environments 

Moving policies between two (Dashboard) environments is not as easy as moving API definitions and requires working with the Dashboard API to first retrieve the policies, and then modifying the document to reinsert them in your new environment:

### Preparation

First you must set up your new environment to respect explicit policy IDs. To do so, edit the `tyk.conf` and `tyk_analytics.conf` files in your new environment and set the `policies. allow_explicit_policy_id` setting to `true` (the setting is just `allow_explicit_policy_id` at the root level of the Dashboard configuration). In order to retain your `api_id` when moving between environments then set `enable_duplicate_slugs` to `true` in your target `tyk_analytics.conf`.

### Steps for Configuration

1. **Get your Policy**

    ```{.copyWrapper}
    curl -X GET -H "authorization: {YOUR TOKEN}" \
    -s \
    -H "Content-Type: application/json" \
    https://admin.cloud.tyk.io/api/portal/policies/{POLICY-ID} | python -mjson.tool > policy.json
    ```

2. **Edit the file we just created**

    The original file will look something like this, notice the two ID fields:

    ```{.json}
    {
    "_id": "5777ecdb0a91ff0001000003",
    "access_rights": {
        "xxxxx": {
        "allowed_urls": [],
        "api_id": "xxxxx",
        "api_name": "Test",
        "versions": [
            "Default"
        ]
        }
    },
    "active": true,
    "date_created": "0001-01-01T00:00:00Z",
    "hmac_enabled": false,
    "id": "",
    "is_inactive": false,
    "key_expires_in": 0,
    "name": "Test Policy",
    "org_id": "xxxxx",
    "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
    },
    "per": 60,
    "quota_max": -1,
    "quota_renewal_rate": 60,
    "rate": 1000,
    "tags": []
    }
    ```

3. **Move the id field value**

    Remove the `_id` field and put the value of the `_id` field into the `id` field, so `policy.json` should look like this:

    ```{.json}
    {
    "access_rights": {
        "xxxxx": {
        "allowed_urls": [],
        "api_id": "xxxxx",
        "api_name": "Test",
        "versions": [
            "Default"
        ]
        }
    },
    "active": true,
    "date_created": "0001-01-01T00:00:00Z",
    "hmac_enabled": false,
    "id": "5777ecdb0a91ff0001000003", <------ NEW ID FIELD
    "is_inactive": false,
    "key_expires_in": 0,
    "name": "Test Policy",
    "org_id": "xxxxx",
    "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
    },
    "per": 60,
    "quota_max": -1,
    "quota_renewal_rate": 60,
    "rate": 1000,
    "tags": []
    }
    ```

4. **Update the policy via the API**

    Save the new `policies.json` file and then let's POST it back to the new environment:

    ```{.copyWrapper}
    curl -X POST -H "authorization: {API-TOKEN}" \
    -s \
    -H "Content-Type: application/json" \
    -d @policies.json \
    https://{YOUR-NEW-ENV}/api/portal/policies | python -mjson.tool
    ```

That's it, Tyk will now load this policy, and you will be able to manage and edit it the same way in your new environment, if you are re-creating tokens in your new environment, then those tokens' ACL does not need to be changed to a new policy ID since the legacy one will always be used as the reference for the policy.

#### Policy IDs in the Dashboard

After migrating a Policy from one environment to another, it is important to note that the **displayed** Policy ID is not going to match.  **That is okay**.  It happens because Tyk Dashboard displays the [`Mongo ObjectId`](https://docs.mongodb.com/manual/reference/glossary/#term-id), which is the `_id` field, but the `id` is the important part.

**For example:**

Policies in source environment
{{< img src="/img/2.10/policy_id_before.png" alt="Policy ID Before" >}}

Policies in target environment after migration
{{< img src="/img/2.10/policy_id_after.png" alt="Policy ID After" >}}

Notice that the IDs appear to be different.  These are the BSON IDs and are expected to be different.  But if we look for the underlying GUID `id`, you can see it's been mapped properly in the target environment.

```
$ curl dash-host-source/api/portal/policies/

    ....
    "_id": "5eb1b133e7644400013e54ec",
    "id": "",
    "name": "credit score",

$ curl dash-host-target/api/portal/policies/

    ....
    "_id": "5f03be2ce043fe000177b047",
    "id": "5eb1b133e7644400013e54ec",
    "name": "credit score",
```

As you can see, under the hood, the policy has been migrated correctly with target Tyk Dashboard saving the proper ID inside `id`.   That is the value that will be referred to inside Key Creation, etc.

### Use Tyk-Sync

You can also use our new Tyk-Sync tool which allows you to sync your Policies (and APIs) with a Version Control System (VCS). You can then move your Policies between environments. See [Tyk-Sync]({{< ref "api-management/automations/sync" >}}) for more details.

## Gateway Sharding

With Tyk, it is easy to enable a sharded configuration, you can deploy Gateways which selectively load APIs.  This unlocks abilities to run Gateways in multiple zones, all connected to the same Control Plane.  This allows for GDPR deployments, development/test Gateways, or even DMZ/NON-DMZ Gateways.

Couple this functionality with the Tyk [Multi Data Center Bridge]({{< ref "api-management/mdcb#managing-geographically-distributed-gateways-to-minimize-latency-and-protect-data-sovereignty" >}}) to achieve a global, multi-cloud deployment.

### Configure a Gateway as a shard

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

### Tag an API for a shard using the Dashboard

From the API Designer, select the **Advanced Options** tab:

{{< img src="/img/2.10/advanced_options_designer.png" alt="Advanced options tab" >}}

Scroll down to the **Segment Tags** options:

{{< img src="/img/2.10/segment_tags.png" alt="Segment tags section" >}}

Set the tag name you want to apply, and click **Add**.

When you save the API, the tags will become immediately active. If any Gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant Gateway.

### Tag an API for a shard using Tyk Operator

Add the tag names to the tags mapping field within an API Definition as shown in the example below:

```yaml {linenos=table,hl_lines=["8-9"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  tags:
    - edge
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

## Tyk Self Managed

### Gateway & API Sharding
Tyk Gateway has a very powerful functionality that allows you to selectively choose which APIs are to be loaded on which Gateways.

Imagine the case where you have two sets of APIs, Internal & External.  You want to prevent your Internal APIs from being accessed or visible outside your protected network.  Well, [sharding]({{< ref "api-management/multiple-environments#what-is-api-sharding-" >}}) makes it extremely easy to configure your Tyk Gateways from the Dashboard.

**Steps for Configuration:**

1. **Configure a Gateway as a shard**

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

2. **Tag an API for a shard using the Dashboard**

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

### Target an API Definition via JSON

In your API definition, add a tags section to the root of the API Definition:

```{.copyWrapper}
"tags": ["private-gw"]
```

This will also set the tags for the API and when API requests are made through this Gateway, these tags will be transferred in to the analytics data set.

### API Tagging with On-Premises

API Sharding with Self-Managed is very flexible, but it behaves a little differently to sharding with Tyk Cloud Hybrid & Tyk Global Self-Managed deployments. The key difference is that with the latter, you can have federated Gateway deployments with **their own redis databases**.  However with Tyk Self-Managed the zoning is limited to tags only, and must share a single Redis database.

To isolate Self-Managed Gateway installations across data centers you will need to use Tyk Multi Data Center Bridge component. This system powers the functionality of Tyk Cloud & Tyk Cloud Hybrid in our cloud and is available to our enterprise customers as an add-on.
