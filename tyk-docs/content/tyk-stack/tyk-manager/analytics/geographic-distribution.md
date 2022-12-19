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

### MaxMind Settings

To use a MaxMind database, see [MaxMind Database Settings]({{< ref "tyk-oss-gateway/configuration#a-name-enable-geo-ip-a-enable-geo-ip" >}}) in the Tyk Gateway Configuration Options.