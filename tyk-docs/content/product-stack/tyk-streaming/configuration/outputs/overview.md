---
title: Outputs
description: Explains an overview of outputs
tags: [ "Tyk Streams", "Stream Outputs", "Outputs" ]
---

An output is a sink where we wish to send our consumed data after applying an optional array of [processors]({{< ref "/product-stack/tyk-streaming/configuration/processors/overview" >}}). Only one output is configured at the root of a Tyk Streams config. However, the output can be a [broker]({{< ref "/product-stack/tyk-streaming/configuration/outputs/broker" >}}) which combines multiple outputs under a chosen brokering pattern, or a [switch]({{< ref "/product-stack/tyk-streaming/configuration/outputs/switch" >}}) which is used to multiplex against different outputs.

An output config section looks like this:

```yaml
output:
  label: my_s3_output

  aws_s3:
    bucket: TODO
    path: '${! meta("kafka_topic") }/${! json("message.id") }.json'

  # Optional list of processing steps
  processors:
    - mapping: '{"message":this,"meta":{"link_count":this.links.length()}}'
```

## Back Pressure

Tyk Streams outputs apply back pressure to components upstream. This means if your output target starts blocking traffic Tyk Streams will gracefully stop consuming until the issue is resolved.

## Retries

When a Tyk Streams output fails to send a message the error is propagated back up to the input, where depending on the protocol it will either be pushed back to the source as a Noack (e.g. AMQP) or will be reattempted indefinitely with the commit withheld until success (e.g. Kafka).

It's possible to instead have Tyk Streams indefinitely retry an output until success with a [retry]({{< ref "/product-stack/tyk-streaming/configuration/outputs/retry" >}}) output. Some other outputs, such as the [broker]({{< ref "/product-stack/tyk-streaming/configuration/outputs/broker" >}}), might also retry indefinitely depending on their configuration.

## Dead Letter Queues

It's possible to create fallback outputs for when an output target fails using a [fallback]({{< ref "/product-stack/tyk-streaming/configuration/outputs/fallback" >}}) output:

```yaml
output:
  fallback:
    - aws_sqs:
        url: https://sqs.us-west-2.amazonaws.com/TODO/TODO
        max_in_flight: 20

    - http_client:
        url: http://backup:1234/dlq
        verb: POST
```

## Multiplexing Outputs

There are a few different ways of multiplexing in Tyk Streams, here's a quick run through:

### Interpolation Multiplexing

Some output fields support [field interpolation]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation" >}}), which is a super easy way to multiplex messages based on their contents in situations where you are multiplexing to the same service.

For example, multiplexing against Kafka topics is a common pattern:

```yaml
output:
  kafka:
    addresses: [ TODO:6379 ]
    topic: ${! meta("target_topic") }
```

Refer to the field documentation for a given output to see if it support interpolation.

### Switch Multiplexing

A more advanced form of multiplexing is to route messages to different output configurations based on a query. This is easy with the [switch]({{< ref "/product-stack/tyk-streaming/configuration/outputs/switch" >}}) output:

```yaml
output:
  switch:
    cases:
      - check: this.type == "foo"
        output:
          amqp_1:
            urls: [ amqps://guest:guest@localhost:5672/ ]
            target_address: queue:/the_foos

      - check: this.type == "bar"
        output:
          gcp_pubsub:
            project: dealing_with_mike
            topic: mikes_bars

      - output:
          redis_streams:
            url: tcp://localhost:6379
            stream: everything_else
          processors:
            - mapping: |
                root = this
                root.type = this.type.not_null() | "unknown"
```

## Labels

Outputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.

<!--

TODO replace with this paragraph when determine if product supports metrics 

Outputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple outputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->
