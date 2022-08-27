---
date: 2017-03-24T16:28:03Z
title: Supported Backends
menu:
  main:
    parent: Tyk Pump
weight: 10 
aliases:
  - /analytics-and-reporting/other-data-stores/
---

The Tyk Pump component takes all of the analytics in Tyk and moves the data from the Gateway into your Dashboard. It is possible to set it up to send the analytics data it finds to other data stores. Currently we support the following:

- MongoDB or SQL (Used by the Tyk Dashboard)
- CSV
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
- Kafka
- Syslog (FluentD)

See the [Tyk Pump Configuration](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/) for more details.