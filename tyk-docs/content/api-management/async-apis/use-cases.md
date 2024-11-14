---
title: Async API Management Capabilities
tags: [ "API Management", "Async APIs" ]
---

Tyk Streams brings full lifecycle API management to asynchronous APIs and event-driven architectures. It provides a
comprehensive set of capabilities to secure, transform, monitor and monetize your async APIs.



## Security

[Tyk Streams]({{< ref "product-stack/tyk-streaming/overview" >}}) supports all the authentication and authorization options available for traditional synchronous APIs. This
ensures that your async APIs are protected with the same level of security as your REST, GraphQL, and other API types.

- **Authentication**: Tyk supports multiple authentication methods for async APIs, including:

    - Token-based authentication (e.g., JWT, OAuth 2.0)
    - Basic authentication
    - Custom authentication plugins

- **Authorization**: Tyk enables fine-grained access control for async APIs based on policies and user roles. You can define granular permissions for specific topics, events or message types. 

## Transformations and Enrichment

[Tyk Streams]({{< ref "product-stack/tyk-streaming/overview" >}}) allows you to transform and enrich the messages flowing through your async APIs. You can modify message payloads, filter events, combine data from multiple sources and more.

- **Transformation**: Use Tyk's powerful middleware and plugin system to transform message payloads on the fly. You can convert between different data formats (e.g., JSON to XML), filter fields, or apply custom logic.
- **Enrichment**: Enrich your async API messages with additional data from external sources. For example, you can lookup customer information from a database and append it to the message payload.

## Analytics and Monitoring

Tyk provides comprehensive analytics and monitoring capabilities for async APIs. You can track usage metrics, monitor performance, and gain visibility into the health of your event-driven systems.
Tyk captures detailed analytics data for async API usage, including message rates, latency, and error counts. This data can be exported to popular analytics platforms like Prometheus, OpenTelemetry, and StatsD.

## Monetization

[Tyk Streams]({{< ref "product-stack/tyk-streaming/overview" >}}) enables you to monetize your async APIs by exposing them through the Developer Portal. Developers can discover, subscribe to and consume your async APIs using webhooks or streaming subscriptions.

- **Developer Portal Integration**: Async APIs can be published to the Tyk Developer Portal, allowing developers to browse, subscribe, and access documentation. Developers can manage their async API subscriptions just like traditional APIs.
- **Webhooks**: Tyk supports exposing async APIs as webhooks, enabling developers to receive event notifications via HTTP callbacks. Developers can configure their webhook endpoints and subscribe to specific events or topics.

With [Tyk Streams]({{< ref "product-stack/tyk-streaming/overview" >}}), you can easily monetize your async APIs, provide a seamless developer experience, and manage the entire lifecycle of your event-driven architecture.

