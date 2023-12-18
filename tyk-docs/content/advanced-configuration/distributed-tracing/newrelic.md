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
**Deprecation**

OpenTracing is now deprecated. We have introduced support of [OpenTelemetry]({{ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview"}}) in v5.2. We recommend users to migrate to OpenTelemetry for better supports of your tracing needs.
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

## Sample configuration

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
