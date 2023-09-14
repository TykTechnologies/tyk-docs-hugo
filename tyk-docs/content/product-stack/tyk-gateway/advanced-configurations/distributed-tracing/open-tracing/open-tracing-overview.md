---
title: "Open Tracing"
date: 2019-07-29T10:28:52+03:00
tags: ["open tracing"]
description:
aliases: 
  - /advanced-configuration/opentracing
---

{{< warning success >}}
**Deprecation**

OpenTracing is now deprecated. We have introduced support of [OpenTelemetry]({{<ref "/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview.md">}}) in v5.2. We recommend users to migrate to OpenTelemetry for better supports of your tracing needs.
{{< /warning >}}

## Supported observability tools
- [Jaeger]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-tracing/jaeger" >}})
- [Zipkin]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-tracing/zipkin" >}})
- [New Relic]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-tracing/newrelic" >}})

## Enabling OpenTracing
To enable OpenTracing, add the following tracing configuration to your Gateway `tyk.conf` file.

```.json
{
  "tracing": {
    "enabled": true,
    "name": "${tracer_name}",
    "options": {}
  }
}
```

- `name` is the name of the supported tracer
- `enabled`: set this to true to enable tracing
- `options`: key/value pairs for configuring the enabled tracer. See the
 supported tracer documentation for more details.

Tyk will automatically propagate tracing headers to APIs  when tracing is enabled.
