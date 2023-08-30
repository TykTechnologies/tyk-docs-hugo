---
title: "Open Tracing"
date: 2019-07-29T10:28:52+03:00
tags: ["open tracing"]
description:
aliases: 
  - /advanced-configuration/opentracing/
  - "advanced-configuration/opentracing/"
---

## Supported observability tools
- [Jaeger]({{< ref "advanced-configuration/distributed-tracing/jaeger" >}})
- [Zipkin]({{< ref "advanced-configuration/distributed-tracing/zipkin" >}})
- [New Relic]({{< ref "advanced-configuration/distributed-tracing/newrelic" >}})

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
