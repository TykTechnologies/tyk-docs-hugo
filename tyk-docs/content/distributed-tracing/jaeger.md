---
title: "Jaeger"
date: 2019-07-29T10:28:52+03:00
weight: 1
menu: 
  main:
    parent:  "Distributed Tracing"
---

Jaeger is a distributed tracing system.It is used for monitoring and troubleshooting microservices-based distributed systems. To lean more about jaeger [visit their website](https://www.jaegertracing.io/)


To enable this tracer, you need to have a working jaeger server.

## Configuring

In `tyk.conf` on `tracing` setting

```
    "tracing": {
        "name": "jaeger",
        "enabled": true,
        "options": {}
    }
```

`options` are settings that are used to initialize the jaeger client. For more details about the options [see client libraries](https://www.jaegertracing.io/docs/1.11/client-libraries/)

# Sample configuration

```json
    "tracing": {
        "name": "jaeger",
        "enabled": true,
        "options": {
            "serviceName": "tyk-gateway",
            "disabled": false,
            "rpc_metrics": false,
            "tags": null,
            "sampler": {
                "type": "const",
                "param": 1,
                "samplingServerURL": "",
                "maxOperations": 0,
                "samplingRefreshInterval": 0
            },
            "reporter": {
                "queueSize": 0,
                "BufferFlushInterval": 0,
                "logSpans": true,
                "localAgentHostPort": "jaeger:6831",
                "collectorEndpoint": "",
                "user": "",
                "password": ""
            },
            "headers": null,
            "baggage_restrictions": null,
            "throttler": null
        }
    }
```
