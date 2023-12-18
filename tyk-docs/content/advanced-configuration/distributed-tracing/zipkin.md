---
title: "Zipkin"
date: 2019-07-29T10:28:52+03:00
weight: 2
menu: 
  main:
    parent:  "Distributed Tracing"
---

Zipkin is a distributed tracing system. It helps gather timing data needed to troubleshoot latency problems in service architectures.

To enable this tracer, you need to have a working Zipkin server.

## Configuring

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

## Sample configuration

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
