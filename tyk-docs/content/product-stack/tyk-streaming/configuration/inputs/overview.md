---
title: Inputs
description: Explains an overview of inputs
tags: [ "Tyk Streams", "Stream Inputs", "Inputs" ]
---

An input is a source of data piped through an array of optional [processors]({{< ref "/product-stack/tyk-streaming/configuration/processors/overview" >}}):

```yaml
input:
  label: my_redis_input

  redis_streams:
    url: tcp://localhost:6379
    streams:
      - tyk_stream
    body_key: body
    consumer_group: tyk_group

  # Optional list of processing steps
  processors:
   - mapping: |
       root.document = this.without("links")
       root.link_count = this.links.length()
```

Some inputs have a logical end ends once the last row is consumed, when this happens the input gracefully terminates and Tyk Streams will shut itself down once all messages have been processed fully.

## Brokering

Only one input is configured at the root of a Tyk Streams config. However, the root input can be a [broker]({{< ref "/product-stack/tyk-streaming/configuration/inputs/broker" >}}) which combines multiple inputs and merges the streams:

```yaml
input:
  broker:
    inputs:
      - kafka:
          addresses: [ TODO ]
          topics: [ foo, bar ]
          consumer_group: foogroup

      - redis_streams:
          url: tcp://localhost:6379
          streams:
            - tyk_stream
          body_key: body
          consumer_group: tyk_group
```

## Labels

Inputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.

<!-- TODO

When know if Tyk Streams will support metrics then link to metrics

Inputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple inputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->

## Generating Messages

It's possible to generate data with Tyk Streams using the [generate]({{< ref "/product-stack/tyk-streaming/configuration/inputs/generate" >}}) input, which is also a convenient way to trigger scheduled pipelines.
