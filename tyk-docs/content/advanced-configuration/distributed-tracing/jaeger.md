---
title: "Jaeger"
date: 2019-07-29T10:28:52+03:00
weight: 1
menu: 
  main:
    parent:  "Distributed Tracing"
---

## How to send Tyk Gateway traces to Jaeger

Tyk uses [OpenTracing](https://opentracing.io/) with the [Jaeger client libraries](https://www.jaegertracing.io/docs/1.11/client-libraries/) to send Tyk Gateway traces to Jaeger.

{{< note success >}}
**Note**  

The CNCF (Cloud Native Foundation) has archived the OpenTracing project and Jaeger has deprecated their client libraries. This means that no new pull requests or feature requests are accepted into OpenTracing or Jaeger repositories.

While support for OpenTelemetry is on our near-term roadmap, you can continue to leverage OpenTracing to get timing and data from Tyk in your traces. More information can be found in our [community forum](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).
{{< /note >}}


## Configuring Jaeger

In `tyk.conf` on `tracing` setting

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "jaeger",
    "options": {}
  }
}
```

`options` are settings that are used to initialise the Jaeger client. For more details about the options [see client libraries](https://www.jaegertracing.io/docs/1.11/client-libraries/)

# Sample configuration

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "jaeger",
    "options": {
      "baggage_restrictions": null,
      "disabled": false,
      "headers": null,
      "reporter": {
        "BufferFlushInterval": "0s",
        "collectorEndpoint": "",
        "localAgentHostPort": "jaeger:6831",
        "logSpans": true,
        "password": "",
        "queueSize": 0,
        "user": ""
      },
      "rpc_metrics": false,
      "sampler": {
        "maxOperations": 0,
        "param": 1,
        "samplingRefreshInterval": "0s",
        "samplingServerURL": "",
        "type": "const"
      },
      "serviceName": "tyk-gateway",
      "tags": null,
      "throttler": null
    }
  }
}
```
