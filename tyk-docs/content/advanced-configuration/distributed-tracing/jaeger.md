---
title: "Jaeger"
date: 2019-07-29T10:28:52+03:00
weight: 1
menu: 
  main:
    parent:  "Distributed Tracing"
---

Jaeger is a distributed tracing system. It is used for monitoring and troubleshooting microservices-based distributed systems. To learn more about Jaeger [visit their website](https://www.jaegertracing.io/)


To enable this tracer, you need to have a working Jaeger server.

## Configuring

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
