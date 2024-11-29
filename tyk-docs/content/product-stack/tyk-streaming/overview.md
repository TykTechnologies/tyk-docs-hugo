---
title: Tyk Streams
description: Explains the purpose of Tyk Streaming and use cases
tags: [ "streaming", "events", "event-driven architecture", "event-driven architectures", "kafka" ]
publishdate: 2024-07-15
---
We are excited to introduce our new product, *Tyk Streams*! 
*Tyk Streams* is a powerful new feature in the Tyk API management platform that enables organizations to securely expose,
manage and monetize real-time event streams and asynchronous APIs.

## Getting started

Our first release of Tyk Streams is now available, and we'd love for you to try it out. Click the button to sign up and take it for a spin:

{{< button_left href="https://survey.hsforms.com/1ItPCBg-_Tre8WFJZL4pp6Q3ifmg" color="green" content="Get started with Tyk Streams" >}}

---
## Overview
With *Tyk Streams*, you can easily connect to various event brokers and streaming platforms, such as
[Apache Kafka](https://github.com/TykTechnologies/tyk-pro-docker-demo/tree/kafka), MQTT, AMQP etc. and expose them as
managed API endpoints to internal and external consumers.

<div style="display: flex; justify-content: center;">
{{< img src="/img/streams/tyk-streams-overview.png" alt="Tyk Streams Overview" width="670px" height="500px" >}}
</div>

The purpose of Tyk Streams is to provide a unified platform for managing both synchronous APIs (such as REST and
GraphQL) and asynchronous APIs, in addition to event-driven architectures. This allows organizations to leverage the
full potential of their event-driven systems while maintaining the same level of security, control and visibility they
expect from their API management solution.

---

## How Tyk Streams Enables Async API Support?

Tyk Streams seamlessly integrates with the Tyk API Gateway, allowing you to manage asynchronous APIs and event streams
alongside your existing synchronous APIs. It provides a range of capabilities to support async API management, including:

- **Protocol Mediation**: Tyk Streams can mediate between different asynchronous protocols and API styles, such as WebSocket, Server-Sent Events (SSE) and Webhooks. This allows you to expose your event streams in a format that is compatible with your consumers' requirements.
- **Security**: Apply the same security policies and controls to your async APIs as you do to your synchronous APIs. This includes features like authentication and authorization.
- **Transformations**: Transform and enrich your event data on the fly using Tyk's powerful middleware and plugin system. This allows you to adapt your event streams to meet the needs of different consumers.
- **Analytics**: Monitor the usage and performance of your async APIs with detailed analytics and reporting. Gain insights into consumer behavior and system health.
- **Developer Portal**: Publish your async APIs to the Tyk Developer Portal, providing a centralised catalog for discovery, documentation and subscription management.


#### Configuration as Code

Tyk Streams configuration natively integrates with Tyk OAS (our OpenAPI format for APIs), enabling *configuration-as-code*
approach. This allows async API definitions to be version-controlled, collaborated on and deployed using GitOps workflows.

```yaml
{
  "openapi": "3.0.3",
  "info": {
    "title": "test-api",
    "version": "1.0.0"
  },
  …
  "x-tyk-streaming": {
    "streams": {
      "test": {
        "input": {
          "kafka": {
            "addresses": ["TODO"],
            "topics": ["foo", "bar"],
            "consumer_group": "foogroup"
          }
        },
        "output": {
          "http_server": {
            "consumer_group": "$tyk_context.request_ip",
            "ws_path": "/subscribe"
          }
        }
      }
    }
  }
  …
}
```

---

## Configuring Async APIs via Dashboard UI

The Tyk Dashboard provides a user-friendly interface for defining and managing async APIs. You can easily specify event
broker details, subscribe to specific topics or channels, configure security policies, transformations and other API
management capabilities.

{{< img src="/img/streams/configure-streams.png" alt="Screenshot of Tyk Dashboard configuring API Streams" width="1000px" >}}

---

## Comparison to Other Products

While some API management platforms offer basic support for async APIs and event-driven architectures, Tyk Streams
stands out by providing a comprehensive and flexible solution:

- **Extensive protocol support**: Tyk Streams supports a wide range of event brokers and protocols out of the box, including Kafka, MQTT, WebSocket, and more.
- **Powerful mediation capabilities**: Tyk Streams allows you to transform and enrich event data, enabling protocol mediation and compatibility with diverse client requirements.
- **Seamless integration**: Async APIs are managed alongside synchronous APIs within the Tyk platform, providing a unified developer portal, consistent security policies and centralised analytics.
- **Flexibility and scalability**: Tyk Streams can be deployed in various architectures, from simple single-node setups to large-scale distributed deployments and can handle high-throughput event processing scenarios.

By leveraging Tyk Streams, organizations can unlock the full potential of their event-driven architectures while
benefiting from the robust API management capabilities of the Tyk platform.

