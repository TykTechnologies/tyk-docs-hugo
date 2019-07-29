---
title: "Distributed Tracing"
date: 2019-07-29T10:28:52+03:00
weight: 121
menu: "main"
url: "/opentracing"
---

Tyk supports  [opentracing](https://opentracing.io/) , you can enable this feature to trace request across
api boundaries.

Storage and visualization of tracing data are not provided by tyk, users are
required to configure where the tracing data is being sent.

## Supported tracers
- [jaeger](https://www.jaegertracing.io/)
- [zipkin](https://zipkin.io/)

## Enabling distributed tracing
To enable distributed tracing , add tracing configuration on your `tyk.conf`

```json
    "tracing": {
        "name": "${tracer_name}",
        "enabled": true,
        "options": {}
    }
```

- `name` is the name of supported tracer
- `enabled`: set this to true to enable tracing
- `options`: key/value pairs for configuring the enabled tracer. See respective
 supported tracer documentation for more details.

Tyk will automatically propagate tracing headers to api's  when tracing is enabled.