---
title: "Exporting OpenTracing Distributed Traces to Jaeger"
date: 2019-07-29T10:28:52+03:00
description:
aliases: 
  - advanced-configuration/distributed-tracing/jaeger
---

{{< note success >}}
**Note**  
[Tyk Gateway 5.2]({{< ref "developer-support/release-notes/gateway.md" >}}) now includes OpenTelemetry Tracing. We recommend migrating to OpenTelemetry for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

Subsequently, we recommend following this guide [Exporting OpenTelemetry Distributed Traces to Jaeger]({{< ref "otel_jaeger" >}}). 
{{< /note >}}

## How to send Tyk Gateway traces to Jaeger using OpenTracing

Tyk uses [OpenTracing](https://opentracing.io/) with the [Jaeger client libraries](https://www.jaegertracing.io/docs/1.11/client-libraries/) to send Tyk Gateway traces to Jaeger.




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

## Sample configuration

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
