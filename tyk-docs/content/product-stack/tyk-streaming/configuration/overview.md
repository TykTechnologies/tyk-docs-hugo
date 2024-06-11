---
title: Overview
description: Explains an overview for configuring Tyk Streams
tags: [ "Tyk Streams", "Stream Configuration", "Tyk Streams Configuration" ]
aliases:
  - /product-stack/tyk-streaming/configuration/common-configuration/secrets
---

Tyk streams configuration is specified using YAML. The configuration consists of several main sections: *input*, *pipeline*, *output* and optionally *resources*, *logger*, and *metrics*.

## Input

The input section defines the publisher source of the data stream. Tyk Streams supports various input types such as Kafka, HTTP, MQTT etc. Each input type has specific configuration parameters.

```yaml
input:
  kafka:
    addresses:
      - localhost:9092
    topics:
      - example_topic
    consumer_group: example_group
    client_id: example_client
```

## Pipeline

The pipeline section defines the processing steps applied to the data. It includes processors for filtering, mapping, enriching and transforming the data. Processors can be chained together.

```yaml
pipeline:
  processors:
    - bloblang: |
        root = this
        root.foo = this.bar.uppercase()
    - json_schema:
        schema_path: "./schemas/example_schema.json"
```

## Output

The output section specifies the destination of the processed data. Similar to inputs, Tyk Streams supports various output types like Kafka, HTTP etc.

```yaml
output:
  kafka:
    addresses:
      - localhost:9092
    topic: output_topic
    client_id: example_output_client
```

## Resources (Optional)

The resources section allows you to define shared resources such as caches, rate limits and conditions that can be used across inputs, outputs and processors.

```yaml
resources:
  caches:
    my_cache:
      memcached:
        addresses:
          - localhost:11211
  rate_limits:
    my_rate_limit:
      local:
        count: 1000
        interval: 1s
```

## Logger (Optional)

The logger section is used to configure logging options, such as log level and output format.

```yaml
logger:
  level: INFO
  format: json
```

## Metrics (Optional)

The metrics section allows you to configure how metrics are collected and reported, supporting various backends like Prometheus, StatsD and Graphite.

```yaml
metrics:
  prometheus:
    prefix: tyk
    listen_address: ":8080"
```


A complete example combining all the sections is given below:

```yaml
input:
  kafka:
    addresses:
      - localhost:9092
    topics:
      - example_topic
    consumer_group: example_group
    client_id: example_client

pipeline:
  processors:
    - bloblang: |
        root = this
        root.foo = this.bar.uppercase()
    - text:
        operator: trim
    - bloblang: |
        root.processed = this.foo.contains("example")

output:
  kafka:
    addresses:
      - localhost:9092
    topic: output_topic
    client_id: example_output_client

resources:
  caches:
    my_cache:
      memcached:
        addresses:
          - localhost:11211
  rate_limits:
    my_rate_limit:
      local:
        count: 1000
        interval: 1s

logger:
  level: INFO
  format: json

metrics:
  prometheus:
    prefix: tyk
    listen_address: ":8080"
```

This overview provides a foundational understanding of how to configure Tyk Streams for various streaming and processing tasks. Each section can be customized to fit specific use cases and deployment environments.
