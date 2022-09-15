---
title: "Jaeger"
date: 2019-07-29T10:28:52+03:00
weight: 1
menu: 
  main:
    parent:  "Distributed Tracing"
---

## How to send Tyk Gateway traces to Jaeger

At the moment Tyk currently uses [OpenTracing](https://opentracing.io/) with the [Jaeger client libraries](https://www.jaegertracing.io/docs/1.11/client-libraries/). Support for [OpenTelemetry](https://opentelemetry.io/) is on the near-term roadmap for us. 

The CNCF (Cloud Native Foundation) has archived the OpenTracing project and Jaeger has also deprecated their client libraries. This means that no new pull requests or feature requests are accepted into OpenTracing or Jaeger repositories. Until it is available you can still leverage OpenTracing to get timing and data from Tyk in your traces. More information can be found on [this community post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).


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
