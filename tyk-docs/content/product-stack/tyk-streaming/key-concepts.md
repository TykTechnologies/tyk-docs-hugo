---
title: Tyk Streams Key Concepts
description: Explains key concepts of streaming
tags: [ "streaming", "events", "event driven architecture", "event driven architectures", "kafka" ]
publishdate: 2024-07-12
---

{{< note success>}}

Our first release of Tyk Streams is now available, and we'd love for you to try it out. Click the button to sign up and take it for a spin:
{{< button_left href="https://survey.hsforms.com/1ItPCBg-_Tre8WFJZL4pp6Q3ifmg" color="green" content="Get started with Tyk Streams" >}}

{{< /note >}}

<!-- Architectural overview
- Tyk is now an intermediate broker between broker and subscribers, This is sometimes known as broker proxy
- Integrate with multiple brokers
- API Management hooks between publisher, gateway, and subscriber (Events are available as APIs)

Explain example roles of publisher and subscriber

Structure of a Tyk Stream Event

Terms
- Asynchronous
- Publish/subscribe
- Event notification
- Stream

- Infrastructure
    - Message queues (RabbitMQ, Kafka)
    - MQTT

- Failure semantics, e.g. exactly-once, at-most-once, at-least-once

- Example application scenarios
    - IoT
    - Infrastructure for domain-driven design, e.g. event bus to notify state changes between micro-services -->

Tyk Streams seamlessly integrates with the Tyk API Gateway to provide a unified platform for managing both synchronous
and asynchronous APIs. This section will provide an overview of the architecture, integration points, and key
capabilities. Please consult the [glossary]({{< ref "product-stack/tyk-streaming/glossary" >}}) for explanations of key
terminology.

Tyk Streams is natively integrated as part of Tyk API Gateway and has no third-party dependencies.

<!-- <!TODO: Add architectural image> -->
<!-- The above diagram illustrates the high-level architecture of Tyk Streams and its integration with the Tyk API Gateway. -->
Key components in the architecture of Tyk Streams:
- **Tyk API Gateway**: The core API management platform that handles API requests, applies policies, and routes requests
to the appropriate backend services.
- **Tyk Streams**: An extension to the Tyk API Gateway that enables support for asynchronous APIs and event-driven
architectures.
- **Event Brokers**: External systems such as Apache Kafka, MQTT brokers, or WebSocket servers that produce and consume
events.
- **Backend Services**: The underlying services and systems that expose APIs or consume events.

## Tyk Streams as middleware in Tyk API Gateway

Tyk Streams operates as middleware within the Tyk API Gateway, providing the following functionalities:

- **Middleware**: Tyk Streams introduces new middleware components that handle async-specific functionality such as
protocol mediation, event transformations, and pub/sub messaging.
- **API Definitions**: Tyk Streams is configured using the standard Tyk OAS format, including additional fields tailored
for async protocols and event configurations.
- **Analytics**: Async API traffic is captured and reported via *Prometheus*, *OpenTelemetry* or *StatsD*, providing
visibility into usage, performance, and errors.

## Connectors and Protocol Mediation

Tyk Streams provides out-of-the-box connectors for popular event brokers and async protocols, including:

- [Apache Kafka](https://kafka.apache.org/documentation/)
- [MQTT](https://mqtt.org/)
- [RabbitMQ](https://www.rabbitmq.com/docs)
- [Solace](https://docs.solace.com/Get-Started/Solace-PubSub-Platform.htm)
- [RedPanda](https://docs.redpanda.com/current/home/)
- [AMQP](https://www.amqp.org/)
- [WebSocket](https://websocket.org/guides/websocket-protocol/)
- [Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) (SSE)
- [Webhooks](https://en.wikipedia.org/wiki/Webhook)

In addition to the native protocol support, Tyk Streams offers powerful protocol mediation capabilities. This allows you
to expose async APIs using different protocols than the backend event broker, making it easier to support a diverse client
requirements.

For example, you can:
- Expose a Kafka topic as a WebSocket API
- Convert MQTT messages to HTTP webhooks
- Bridge between different async protocols (e.g., Kafka to MQTT)
