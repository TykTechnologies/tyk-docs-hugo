---
date: 2017-03-24T16:12:54Z
title: Geographic Distribution
menu:
  main:
    parent: "Analytics and Reporting"
weight: 7 
---

Tyk will attempt to record GeoIP based information based on your inbound traffic. This requires a MaxMind IP database to be available to Tyk and is limited to the accuracy of that database.

You can view the overview of what the traffic breakdown looks like per country, and then drill down into the per-country traffic view by selecting a country code from the list:

![Geographic Distribution](/docs/img/dashboard/usage-data/geographic_dist_2.5.png)

### <a name="maxmind"></a>MaxMind Settings

To use a MaxMind database, see [MaxMind Database Settings](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/#a-name-enable-geo-ip-a-enable-geo-ip) in the Tyk Gateway Configuration Options.