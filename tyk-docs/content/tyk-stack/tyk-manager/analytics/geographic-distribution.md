---
date: 2017-03-24T16:12:54Z
title: Geographic Distribution
menu:
  main:
    parent: Analytics
weight: 7
aliases:
  - /analytics-and-reporting/geographic-distribution/
---

Tyk will attempt to record GeoIP based information based on your inbound traffic. This requires a MaxMind IP database to be available to Tyk and is limited to the accuracy of that database.

You can view the overview of what the traffic breakdown looks like per country, and then drill down into the per-country traffic view by selecting a country code from the list:

{{< img src="/img/2.10/geographic_dist.png" alt="Geographic Distribution" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Geographic Distribution</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

### MaxMind Settings

To use a MaxMind database, see [MaxMind Database Settings]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_geo_ip" >}}) in the Tyk Gateway Configuration Options.

