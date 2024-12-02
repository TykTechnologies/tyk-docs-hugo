---
date: 2017-03-24T15:55:00Z
title: Traffic per API
menu:
  main:
    parent: Analytics
weight: 2
aliases:
  - /analytics-and-reporting/traffic-per-api/
---

To get a tabular view of how your API traffic is performing, you can select the **Activity by API** option in the navigation and see a tabular view of your APIs. This table will list out your APIs by their traffic volume and you'll be able to see when they were last accessed:

{{< img src="/img/2.10/traffic_api.png" alt="Activity per API" >}}

You can use the same range selectors as with the Dashboard view to modify how you see the data. However, granularity and tag views will not work since they do not apply to a tabulated view.

If you select an API name, you will be taken to the drill-down view for that specific API, here you will have a similar Dashboard as you do with the aggregate API Dashboard that you first visit on log in, but the whole view will be constrained to just the single API in question:

{{< img src="/img/2.10/average_use_api.png" alt="Traffic per API: CLosed graph" >}}

You will also see an error breakdown and the endpoint popularity stats for the API:

{{< img src="/img/2.10/error_breakdown_api.png" alt="API error breakdown pie chart" >}}

Tyk will try to normalize endpoint metrics by identifying IDs and UUIDs in a URL string and replacing them with normalized tags, this can help make your analytics more useful. It is possible to configure custom tags in the configuration file of your Tyk Self-Managed or Multi-Cloud installation.

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Error Breakdown and Endpoint Popularity charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

