---
title: "Observability"
date: 2023-08-29T16:58:52+03:00
tags: ["OpenTelemetry", "OpenTracing", "traces", "metrics", "logs", "observability"]
description: Introduction to Observability in Tyk
aliases:
  - /product-stack/tyk-gateway/advanced-configurations/distributed-tracing/distributed-tracing-overview
---

Observability is a key concept in modern software systems that enables teams to understand the internal state of their applications and infrastructure through external outputs. It encompasses three main pillars:

- **Metrics**: quantitative measurements of system performance and behavior over time
- **Logs**: detailed records of events and state changes within the system
- **Traces**: end-to-end tracking of requests as they flow through distributed systems

This section will explore how Tyk supports and enhances observability capabilities, enabling you to gain valuable insights into your systems and applications.

## Metrics
Tyk components have been instrumented to send metrics to StatsD and NewRelic servers. Instructions on their use are provided [here]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}}).

## Logs
Tyk components generate system logs that record significant activity, including warnings and errors. Tyk can send these logs to 3rd party tools including Graylog and Logstash. For details on how to configure system logs see [here]({{< ref "log-data" >}}).

## Distributed Tracing
Distributed tracing is a monitoring and diagnostic technique used in software systems to track and visualize the path of requests as they traverse multiple microservices or components. In the context of an API gateway, distributed tracing helps capture and analyze the journey of API requests across various services, providing valuable insights into performance bottlenecks, latency issues and the overall health of the system.

Historically Tyk has supported [OpenTracing]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-tracing/open-tracing-overview" >}}) but now recommends the use of [OpenTelemetry]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}) for distributed tracing.

Support for OpenTelemetry has been available since Tyk 5.2. If you have any comments and suggestions for this feature, please leave a comment on this [community forum post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

<br>
{{< note success >}}
**Note**  

Support for OpenTracing is now deprecated and we recommend that users migrate to OpenTelemetry.
{{< /note >}}