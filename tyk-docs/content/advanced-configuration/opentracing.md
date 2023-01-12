---
title: "Distributed Tracing"
date: 2019-07-29T10:28:52+03:00
weight: 5
menu: 
  main:
    parent: "Advanced Configuration"
---
Distributed tracing is a method of tracking application requests as they flow from frontend devices to backend services and databases. It is used to monitor and troubleshoot requests end-to-end. 

Tyk currently supports OpenTracing for distributed tracing. Support for OpenTelemetry is on the near-term roadmap for the Tyk API Gateway. If this is a valuable feature for you, please leave a comment on this [community forum post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

## Supported observability tools
- [Jaeger]({{< ref "/content/advanced-configuration/distributed-tracing/jaeger.md" >}})
- [Zipkin]({{< ref "/content/advanced-configuration/distributed-tracing/zipkin.md" >}})
- [New Relic]({{< ref "/content/advanced-configuration/distributed-tracing/newrelic.md" >}})

## Enabling distributed tracing
To enable distributed tracing, add the following tracing configuration to your Gateway `tyk.conf` file.

```{.json}
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
