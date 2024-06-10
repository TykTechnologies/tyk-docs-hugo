---
title: Advanced Use Cases
tags: [ "API Management", "Async APIs" ]
---

Tyk Streams enables powerful advanced use cases beyond basic pub/sub and event streaming. Here are a few examples of how you can leverage Tyk Streams for complex async API scenarios.

## Complex Event Processing

Tyk Streams allows you to perform complex event processing on streams of events in real-time. You can define custom processing logic to:

- Filter events based on specific criteria
- Aggregate and correlate events from multiple streams
- Enrich events with additional data from other sources
- Detect patterns and sequences of events
- Trigger actions or notifications based on event conditions

Here's an example of a Tyk Streams configuration that performs complex event processing, specifically it creates a new event stream, which filters high-value orders and enriches them with customer email addresses, by making an additional HTTP request.
 
```yaml
input:
  kafka:
    addresses:
      - "localhost:9092" # Replace with actual Kafka broker addresses
    consumer_group: my-group
    topics:
      - orders
output:
  http_server:
    allowed_verbs:
      - GET
    path: /high-value-orders
pipeline:
  processors:
    - bloblang: |
        root = if this.order_value > 1000 {
          this
        } else {
          deleted()
        }
    - branch:
        processors:
          - http:
              headers:
                Content-Type: application/json
              url: http://customer-api.local/emails
              verb: POST
        request_map: |-
          root = {
            "customer_id": this.customer_id
          }
        result_map: root.customer_email = this.customer_email
    - bloblang: |
        root = this.merge({ "high_value_order": true })
```

In this example:

- **Tyk Streams Setup**: Consumes events from a Kafka topic called *orders*.
- **Processor Block Configuration**: Utilises a custom Bloblang script that performs the following operations:
    - **Filters** orders, only processing those with a value greater than 1000.
    - **Enriches** the high-value orders by retrieving the customer ID and email from a separate data source.
    - **Adds** a new high_value_order flag to each qualifying event.
- **Output Handling**: Processed high-value order events are exposed via a WebSocket stream at the endpoint */high-value-orders*.

{{< note success >}}

**Kafka Demo**

For a practical demonstration of Kafka and Tyk Streams integration, please visit our comprehensive [Kafka Integration Demo](https://github.com/TykTechnologies/tyk-pro-docker-demo/tree/kafka).

{{< /note >}}

## Legacy Modernization

Tyk Streams can help you modernise legacy applications and systems by exposing their functionality as async APIs. This allows you to:
- Decouple legacy systems from modern consumers
- Enable real-time, event-driven communication with legacy apps
- Gradually migrate away from legacy infrastructure

Here's an example of exposing a legacy application as an async API using Tyk Streams:

```yaml
input:
  http_client:
    url: "http://legacy-app/orders"
    verb: GET
    rate_limit: "60s"
pipeline:
  processors:
    - bloblang: |
        root.order_id = this.id
        root.total = this.total
        root.timestamp = this.timestamp
output:
  kafka:
    addresses: ["localhost:9092"]
    topic: "orders"
```

In this configuration:
- Tyk Streams periodically polls the legacy */orders* REST endpoint every 60 seconds
- The *processor* transforms the legacy response format into a simplified event structure
- The transformed events are published to a Kafka topic called *orders*, which can be consumed by modern applications

## Async API Orchestration

Tyk Streams enables you to orchestrate multiple async APIs and services into composite event-driven flows. You can:
- Combine events from various streams and sources
- Implement complex routing and mediation logic between async APIs
- Create reactive flows triggered by event conditions
- Fanout events to multiple downstream consumers

Here's an example async API orchestration with Tyk Streams:

```yaml
input:
  broker:
    inputs:
      - kafka:
          addresses: ["localhost:9092"]
          topics: ["stream1"]
          consumer_group: "group1"
      - kafka:
          addresses: ["localhost:9092"]
          topics: ["stream2"]
          consumer_group: "group2"
pipeline:
  processors:
    - switch:
        cases:
          - check: 'meta("kafka_topic") == "stream1"'
            processors:
              - bloblang: |
                  root.type = "event_from_stream1"
                  root.details = this
              - branch:
                  processors:
                    - http:
                        url: "http://api1.example.com/process"
                        verb: POST
                        body: '${! json() }'
                  result_map: 'root.api1_response = this'
          - check: 'meta("kafka_topic") == "stream2"'
            processors:
              - bloblang: |
                  root.type = "event_from_stream2"
                  root.details = this
              - branch:
                  processors:
                    - http:
                        url: "http://api2.example.com/analyze"
                        verb: POST
                        body: '${! json() }'
                  result_map: 'root.api2_response = this'
    - bloblang: 'root = if this.type == "event_from_stream1" && this.api1_response.status == "ok" { this } else if this.type == "event_from_stream2" && this.api2_response.status == "ok" { this } else { deleted() }'
output:
  broker:
    pattern: "fan_out"
    outputs:
      - kafka:
          addresses: ["localhost:9092"]
          topic: "processed_stream1"
          client_id: "tyk_fanout1"
      - kafka:
          addresses: ["localhost:9092"]
          topic: "processed_stream2"
          client_id: "tyk_fanout2"
      - http_client:
          url: "https://webhook.site/unique-id"
          verb: POST
          body: '${! json() }'
```

1. **Input Configuration**
    - Uses a broker to combine events from two different Kafka topics, stream1 and stream2, allowing for the integration of events from various streams.
2. **Complex Routing and Processing**
    - A switch processor directs messages based on their origin (differentiated by Kafka topic metadata).
    - Each stream’s messages are processed and conditionally sent to different APIs.
    - Responses from these APIs are captured and used to further decide on message processing.
3. **Reactive Flows**
    - Conditions based on API responses determine if messages are forwarded or discarded, creating a flow reactive to the content and success of API interactions.
    - Fanout to Multiple Consumers:
    - The broker output with a fan_out pattern sends processed messages to multiple destinations: two different Kafka topics and an HTTP endpoint, demonstrating the capability to distribute events to various downstream consumers.

These are just a few examples of the advanced async API scenarios made possible with Tyk Streams. The platform provides a flexible and extensible framework to design, deploy and manage sophisticated event-driven architectures.
