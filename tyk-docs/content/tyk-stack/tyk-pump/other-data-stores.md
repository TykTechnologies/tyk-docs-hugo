---
date: 2017-03-24T16:28:03Z
title: Supported Backends
menu:
  main:
    parent: Tyk Pump
weight: 10 
aliases:
  - /analyse/other-data-stores/
  - /analytics-and-reporting/other-data-stores/
---

The Tyk Pump component takes all of the analytics in Tyk and moves the data from the Gateway into your Dashboard. It is possible to set it up to send the analytics data it finds to other data stores. Currently we support the following:

- MongoDB or SQL (Used by the Tyk Dashboard)
- [CSV]({{< ref "product-stack/tyk-pump/advanced-configurations/configure-data-sinks/csv" >}})
- [Elasticsearch (2.0 - 7.x)]({{< ref "product-stack/tyk-pump/advanced-configurations/configure-data-sinks/elasticsearch" >}})
- Graylog
- Resurface.io
- InfluxDB
- [Moesif]({{< ref "tyk-configuration-reference/tyk-pump-configuration/moesif" >}})
- [Splunk]({{< ref "tyk-configuration-reference/tyk-pump-configuration/splunk" >}})
- StatsD
- DogStatsD
- Hybrid (Tyk RPC)
- [Prometheus]({{< ref "tyk-stack/tyk-pump/other-data-stores/monitor-apis-prometheus" >}})
- [Logz.io]({{< ref "product-stack/tyk-pump/advanced-configurations/configure-data-sinks/logzio" >}})
- Kafka
- Syslog (FluentD)

See the [Tyk Pump Configuration]({{< ref "tyk-pump" >}}) for more details.
