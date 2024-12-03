---
title: Outputs
description: Explains an overview of outputs
tags: [ "Tyk Streams", "Stream Outputs", "Outputs" ]
---

An output is a sink where we wish to send our consumed data after applying an optional array of [processors]({{< ref "/product-stack/tyk-streaming/configuration/processors/overview" >}}). Only one output is configured at the root of a Tyk Streams config. However, the output can be a [broker]({{< ref "/product-stack/tyk-streaming/configuration/outputs/broker" >}}) which combines multiple outputs under a chosen brokering pattern.

An output config section looks like this:

```yaml
outout:
  label: my_kafka_output

  kafka:
    addresses: [ localhost:9092 ]
    topic: "foobar"

  # Optional list of processing steps
  processors:
    - avro:
        operator: from_json
```

## Labels

Outputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.

<!--

TODO replace with this paragraph when determine if product supports metrics 

Outputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple outputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->
