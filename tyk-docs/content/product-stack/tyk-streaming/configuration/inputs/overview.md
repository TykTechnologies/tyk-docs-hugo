---
title: Inputs
description: Explains an overview of inputs
tags: [ "Tyk Streams", "Stream Inputs", "Inputs" ]
---

An input is a source of data piped through an array of optional [processors]({{< ref "product-stack/tyk-streaming/configuration/processors/overview" >}}):

```yaml
input:
  label: my_kafka_input

  kafka:
    addresses: [ localhost:9092 ]
    topics: [ foo, bar ]
    consumer_group: foogroup

  # Optional list of processing steps
  processors:
    - avro:
        operator: to_json 
```

## Brokering

Only one input is configured at the root of a Tyk Streams config. However, the root input can be a [broker]({{< ref "product-stack/tyk-streaming/configuration/inputs/broker" >}}) which combines multiple inputs and merges the streams:

```yaml
input:
  broker:
    inputs:
      - kafka:
          addresses: [ localhost:9092 ]
          topics: [ foo, bar ]
          consumer_group: foogroup

      - http_client:
          url: https://localhost:8085
          verb: GET
          stream:
            enabled: true
```

## Labels

Inputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.

<!-- TODO

When know if Tyk Streams will support metrics then link to metrics

Inputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple inputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->
