---
title: "Zipkin"
date: 2019-07-29T10:28:52+03:00
description:
aliases: 
  - /advanced-configuration/distributed-tracing/zipkin

---

## How to send Tyk Gateway traces to Zipkin

Tyk uses [OpenTracing](https://opentracing.io/) with the [Zipkin Go tracer](https://zipkin.io/pages/tracers_instrumentation) to send Tyk Gateway traces to Zipkin. Support for [OpenTelemetry](https://opentelemetry.io/) is on the near-term roadmap for us. More information can be found on [this community post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

{{< note success >}}
**Note**  

The CNCF (Cloud Native Foundation) has archived the OpenTracing project. This means that no new pull requests or feature requests are accepted into OpenTracing repositories.

While support for OpenTelemetry is on our near-term roadmap, you can continue to leverage OpenTracing to get timing and data from Tyk in your traces.
{{< /note >}}


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
