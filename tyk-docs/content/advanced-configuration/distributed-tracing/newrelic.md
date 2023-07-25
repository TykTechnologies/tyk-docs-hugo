---
title: "New Relic"
date: 2022-04-04
tags: ["distributed tracing", "NewRelic", "zipkin"]
description: "The Trace API allows you to send tracing data to New Relic: either in the generic format or the Zipkin data format, enabling you to create your own tracing implementation."
weight: 3
menu: 
  main:
    parent:  "Distributed Tracing"
---

## How to send Tyk Gateway traces to New Relic

Tyk uses [OpenTracing](https://opentracing.io/) to send Tyk Gateway traces to [*New Relic*](https://newrelic.com/) using the *Zipkin* format. <br>
Support for [OpenTelemetry](https://opentelemetry.io/) is on the near-term roadmap for us. More information can be found on [this community post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

{{< note success >}}
**Note**  

The CNCF (Cloud Native Foundation) has archived the OpenTracing project. This means that no new pull requests or feature requests are accepted into OpenTracing repositories.

While support for OpenTelemetry is on our near-term roadmap, you can continue to leverage OpenTracing to get timing and data from Tyk in your traces.
{{< /note >}}

## Configuring New Relic

In `tyk.conf` under the `tracing` section

```.json
{
  "tracing": {
    "enabled": true,
    "name": "zipkin",
    "options": {}
  }
}
```

In the `options` setting you can set the initialisation of the *Zipkin* client.

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

`reporter.url` is the URL to the *New Relic* server, where trace data will be sent to.
