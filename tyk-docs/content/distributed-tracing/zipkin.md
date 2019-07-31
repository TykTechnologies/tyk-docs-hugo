---
title: "Zipkin"
date: 2019-07-29T10:28:52+03:00
weight: 2
menu: 
  main:
    parent:  "Distributed Tracing"
---

Zipkin is a distributed tracing system. It helps gather timing data needed to troubleshoot latency problems in service architectures.

To enable this tracer, you need to have a working zipkin server.

## Configuring

In `tyk.conf` on `tracing` setting

```
    "tracing": {
        "name": "zipkin",
        "enabled": true,
        "options": {}
    }
```

`options` are settings that are used to initialize the zipkin client.

# Sample configuration

```json
    "tracing": {
        "name": "zipkin",
        "enabled": true,
        "options": {
            "reporter": {
                "url": "http:localhost:9411/api/v2/spans"
            }
        }
    }
```

`reporter.url` is the url to the zipkin server, where trace data will be sent.
