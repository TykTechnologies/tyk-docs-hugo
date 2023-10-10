---
title: "Distributed tracing"
date: 2023-08-29T16:58:52+03:00
tags: ["distributed tracing", "OpenTelemetry", "OpenTracing", "traces"]
description: Overview page to introduce Distirbuted tracing in Tyk
---

Distributed tracing is a monitoring and diagnostic technique used in software systems to track and visualize the path of requests as they traverse multiple microservices or components. In the context of an API gateway, distributed tracing helps capture and analyse the journey of API requests across various services, providing valuable insights into performance bottlenecks, latency issues and the overall health of the system.

Tyk currently supports [OpenTelemetry]({{<ref "open-telemetry-overview.md">}}) and [OpenTracing]({{<ref "open-tracing-overview.md">}}) for distributed tracing. Support for [OpenTelemetry]({{<ref "open-telemetry-overview.md">}}) is available since Tyk 5.2. If you have any comments and suggestions for this feature, please leave a comment on this [community forum post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

Support for [OpenTracing]({{<ref "open-tracing-overview.md">}}) is now deprecated and we recommend to migrate to OpenTelemetry.