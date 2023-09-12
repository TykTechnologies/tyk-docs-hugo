---
title: "Open Telemetry"
date: 2023-08-29T10:28:52+03:00
tags: ["otel", "open telemetry"]
description: Overview page to introduce OpenTelemetry in Tyk
---

# What is OpenTelemetry?

OpenTelemetry is an open-source and end-to-end observability framework for cloud-native software. It provides a set of APIs, libraries, agents, and instrumentation to enable observability for applications. Essentially, OpenTelemetry offers a unified way to collect, process, and export telemetry data like traces, metrics, and logs from your applications.

## Benefits

- Enhanced Visibility: With OpenTelemetry, you can gain insights into how your APIs are performing, where bottlenecks exist, and how external services interact with your system.

- Unified Observability: Instead of using multiple tools or libraries to monitor different parts of an application, you can leverage OpenTelemetry's holistic approach to capture a complete picture of your system's performance.

- Improved Troubleshooting: When issues arise, having detailed trace data at hand can significantly speed up root cause analysis and remediation. This is crucial for maintaining high uptime and ensuring a seamless user experience.

Take a look at the [Tyk's OpenTelemetry documentation](TODO) to learn more.

## OpenTelemetry instrumentation

You can instrument OpenTelemetry by using different tools:

- [Jaeger]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_jaeger" >}})
- [New Relic]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_new_relic" >}})
- [Dynatrace]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_dynatrace" >}})
