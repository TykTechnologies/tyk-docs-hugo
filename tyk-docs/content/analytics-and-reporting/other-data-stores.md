---
date: 2017-03-24T16:28:03Z
title: Other Data Stores
menu:
  main:
    parent: "Analytics and Reporting"
weight: 10 
---

The Tyk Pump component takes all of the analytics in Tyk and moves the data from the Gateway into your Dashboard. It is possible to set it up to send the analytics data it finds to other data stores. Currently we support the following:

- Elasticsearch (2.0+)
- Graylog
- InfluxDB
- Moesif
- Splunk
- StatsD
- DogStatsD
- Hybrid (Tyk RPC)
- Prometheus
- Logz.io

See the [Tyk Pump Configuration](/docs/tyk-configuration-reference/outbound-email-configuration/) for more details.