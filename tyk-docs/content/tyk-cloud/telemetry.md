---
title: "Telemetry"
date: 2024-12-12
weight: 1
tags: ["Tyk Cloud", "Configuration", "Telemetry"]
description: "Telemetry"
---

## Introduction

Telemetry in Tyk Cloud enables distributed tracing of your APIs, allowing you to track and analyze how requests flow through your system. 
This trace data helps you understand request paths, identify bottlenecks, and troubleshoot issues by providing detailed insights into each request's journey through your API infrastructure.

We support distributed tracing for `Cloud Data Plane` deployments. You can enable it while creating or updating after setting up telemetry. 

Since this functionality is powered by Tyk Gateway's OpenTelemetry integration, we recommend reviewing our comprehensive [OpenTelemetry documentation]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview.md" >}})
to understand the underlying architecture, best practices for implementation, and how to maximize the value of distributed tracing in your API infrastructure. The documentation provides detailed insights into configuration options, sampling strategies.

## Available Telemetry Providers

Tyk Cloud integrates with these monitoring platforms:





- [Datadog]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#configuring-datadog-provider" >}})
- [Dynatrace]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#configuring-dynatrace-provider" >}})
- [New Relic]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#configuring-new-relic-provider" >}})
- [Elastic]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#configuring-elastic-provider" >}})
- [Custom]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#configuring-elastic-provider" >}})


{{< note success >}}
**Note**

Before diving into the configuration details, please note that Telemetry is an add-on feature in Tyk Cloud.
To enable this capability for your account, please contact our [support team](https://support.tyk.io/).
Our team will help you activate this feature and ensure you have access to all the Telemetry options.
{{< /note >}}