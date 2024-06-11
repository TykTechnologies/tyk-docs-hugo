---
title: Key Concepts
description: Explains key concepts of streaming
tags: [ "streaming", "events", "event driven architecture", "event driven architectures", "kafka" ]
---

<!-- Architectural overview
- Tyk is now a intermediate broker between broker and subscribers, This is sometimes known as broker proxy
- Integrate with multiple brokers
- API Management hooks between publisher, gateway and subscriber (Events are availble as APIs)

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
    - Infrastructure for domain driven design, e.g. event bus to notify state changes between micro-services -->

Tyk Streams seamlessly integrates with the Tyk API Gateway to provide a unified platform for managing both synchronous and asynchronous APIs. This section will provide an overview of the architecture, integration points, and key capabilities. Please consult the [glossary]({{< ref "product-stack/tyk-streaming/glossary" >}}) for explanations of key terminology.

Tyk Streams natively integrated as part of Tyk API Gateway and does not have any third party dependencies.

<!-- <!TODO: Add architectural image> -->

The above diagram illustrates the high-level architecture of Tyk Streams and its integration with the Tyk API Gateway. Key components include:
- **Tyk API Gateway**: The core API management platform that handles API requests, applies policies and routes requests to the appropriate backend services.
- **Tyk Streams**: An extension to the Tyk API Gateway that enables support for asynchronous APIs and event-driven architectures.
- **Event Brokers**: External systems such as Apache Kafka, MQTT brokers, or WebSocket servers that produce and consume events.
- **Backend Services**: The underlying services and systems that expose APIs or consume events.

## Integration with Tyk API Gateway

Tyk Streams integrates with the Tyk API Gateway through the following mechanisms:

- **API Definitions**: Tyk Streams are defined using the standard Tyk OpenAPI API definition format, with additional fields specific to async protocols and event configurations.
- **Middleware**: Tyk Streams introduces new middleware components that handle async-specific functionality such as protocol mediation, event transformations and pub/sub messaging.
- **Analytics**: Async API traffic is captured and reported via Prometheus, OpenTelementry or StatsD, providing visibility into usage, performance, and errors.

## Connectors and Protocol Mediation

Tyk Streams provides out-of-the-box connectors for popular event brokers and async protocols, including:

- Apache Kafka
- MQTT
- RabbitMQ
- Solate
- RedPanda
- AMQP
- WebSocket
- Server-Sent Events (SSE)
- Webhooks

In addition to the native protocol support, Tyk Streams offers powerful protocol mediation capabilities. This allows you to expose async APIs using different protocols than the backend event broker, making it easier to support diverse client requirements.

For example, you can:
- Expose a Kafka topic as a WebSocket API
- Convert MQTT messages to HTTP webhooks
- Bridge between different async protocols (e.g., Kafka to MQTT)
