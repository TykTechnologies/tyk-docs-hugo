---
title: "New Relic"
date: 2022-04-04
tags: ["distributed tracing","NewRelic"]
description: "You can create your own tracing implementation using the Trace API. The Trace API is used to send distributed tracing data to New Relic: either in the generic format or the Zipkin data format."
weight: 3
menu: 
  main:
    parent:  "Distributed Tracing"
---

- You can create your own tracing implementation using the Trace API. The Trace API is used to send distributed tracing data to New Relic: either in the generic format or the Zipkin data format. 
- NewRelic supports [OpenTracing](https://docs.newrelic.com/docs/distributed-tracing/trace-api/report-zipkin-format-traces-trace-api/) for sending telemetry, and provide Zipkin compatible API endpoint.

## Why should you use the Trace API?

- You have your own custom distributed tracing tool and want to see that data in New Relic without changing your instrumentation.
- You have a tool that emits tracing data but that requires a backend for trace storage.
- You want to report distributed tracing data to New Relic without the use of other installed solutions.
- You use Zipkin and want to see that trace data in New Relic without changing your instrumentation.

## Configuring

In `tyk.conf` on `tracing` setting

```.json
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

```.json
{
  "tracing": {
    "enabled": true,
    "name": "zipkin",
    "options": {
      "reporter": {
        "url": "https://trace-api.newrelic.com/trace/v1?Api-Key=NEW_RELIC_LICENSE_KEY&Data-Format=zipkin&Data-Format-Version=2"
      }
    }
  }
}
```

{{< note success >}}
**Note**  

Based on [Trace API](https://docs.newrelic.com/docs/distributed-tracing/trace-api/introduction-trace-api/) compatibility with Zipkin, you can use send tracing data to New relic by enabling zipkin opentracing.
{{< /note >}}


`reporter.url` is the URL to the Zipkin server, where trace data will be sent.
