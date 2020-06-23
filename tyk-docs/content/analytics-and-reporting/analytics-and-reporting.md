---
date: 2017-03-24T15:49:11Z
title: Analytics and Reporting
weight: 50
menu: "main"
url: "/analytics-and-reporting"
---

Traffic analytics are captured by the Gateway nodes and then temporarily stored in Redis.  The Tyk Pump is responsible for moving those analytics into a persistent data store, such as MongoDB, where the traffic can be analyzed.

[More information on Tyk Pump here!]({{< ref "../tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration.md" >}})
