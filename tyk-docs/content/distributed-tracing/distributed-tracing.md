---
title: "Distributed Tracing"
date: 2019-07-29T10:28:52+03:00
weight: 121
menu: "main"
url: "/opentracing"
---

Tyk supports  [OpenTracing](https://opentracing.io/). You can enable this feature to trace requests across
api boundaries.

Storage and visualisation of tracing data are not provided by Tyk, users are
required to configure where the tracing data is being sent.

## Supported tracers
- [Jaeger](https://www.jaegertracing.io/)
- [Zipkin](https://zipkin.io/)

## Enabling distributed tracing
To enable distributed tracing, add the following tracing configuration on your `tyk.conf`

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
