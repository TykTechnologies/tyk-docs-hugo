---
title: "Zipkin"
date: 2019-07-29T10:28:52+03:00
weight: 2
menu: 
  main:
    parent:  "Distributed Tracing"
---

## How to send Tyk Gateway traces to Zipkin

At the moment Tyk currently uses [OpenTracing](https://opentracing.io/) with the [Zipkin Go tracer](https://zipkin.io/pages/tracers_instrumentation). Support for [OpenTelemetry](https://opentelemetry.io/) is on the near-term roadmap for us. More information can be found on [this community post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682). 


## Configuring Zipkin

In `tyk.conf` on `tracing` setting

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "zipkin",
    "options": {}
  }
}
```

`options` are settings that are used to initialise the Zipkin client.

# Sample configuration

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "zipkin",
    "options": {
      "reporter": {
        "url": "http:localhost:9411/api/v2/spans"
      }
    }
  }
}
```

`reporter.url` is the URL to the Zipkin server, where trace data will be sent.
