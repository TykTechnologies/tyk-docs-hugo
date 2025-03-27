---
title: "Tyk Streams – Manage Event-Driven APIs"
date: 2025-02-10
tags: ["Tyk Streams", "Glossary", "Use Cases", "Asynchronus APIs", "Async", "Configuration"]
description: "Introduction to Tyk Streams"
keywords: ["Tyk Streams", "Glossary", "Use Cases", "Asynchronus APIs", "Async", "Configuration"]
aliases:
  - /product-stack/tyk-streaming/overview
  - /product-stack/tyk-streaming/glossary
  - /product-stack/tyk-streaming/key-concepts
  - /product-stack/tyk-streaming/streams-configuration-using-ui
  - /product-stack/tyk-streaming/deployment-considerations
  - /product-stack/tyk-streaming/developer-portal-integration
  - /api-management/async-apis/use-cases
  - /api-management/async-apis/advanced-use-cases

  - /product-stack/tyk-streaming/getting-started
  - /product-stack/tyk-streaming/configuration/inputs/amqp-0-9/
  - /product-stack/tyk-streaming/configuration/inputs/amqp-1/
  - /product-stack/tyk-streaming/configuration/inputs/generate/
  - /product-stack/tyk-streaming/configuration/inputs/kafka-franz/
  - /product-stack/tyk-streaming/configuration/inputs/mqtt/
  - /product-stack/tyk-streaming/configuration/inputs/nats/
  - /product-stack/tyk-streaming/configuration/inputs/nsq/
  - /product-stack/tyk-streaming/configuration/inputs/redis-pubsub/
  - /product-stack/tyk-streaming/configuration/outputs/amqp-0-9/
  - /product-stack/tyk-streaming/configuration/outputs/amqp-1/
  - /product-stack/tyk-streaming/configuration/outputs/drop_on/
  - /product-stack/tyk-streaming/configuration/outputs/fallback/
  - /product-stack/tyk-streaming/configuration/outputs/kafka-franz/
  - /product-stack/tyk-streaming/configuration/outputs/mqtt/
  - /product-stack/tyk-streaming/configuration/outputs/nats/
  - /product-stack/tyk-streaming/configuration/outputs/nsq/
  - /product-stack/tyk-streaming/configuration/outputs/reject/
  - /product-stack/tyk-streaming/configuration/outputs/redis-pubsub/
  - /product-stack/tyk-streaming/configuration/outputs/retry/
  - /product-stack/tyk-streaming/configuration/outputs/stdout/
  - /product-stack/tyk-streaming/configuration/outputs/switch/
  - /product-stack/tyk-streaming/configuration/outputs/sync-response/
  - /product-stack/tyk-streaming/configuration/processors/aws-lambda/
  - /product-stack/tyk-streaming/configuration/processors/bloblang/
  - /product-stack/tyk-streaming/configuration/processors/bounds-check/
  - /product-stack/tyk-streaming/configuration/processors/branch/
  - /product-stack/tyk-streaming/configuration/processors/cache/
  - /product-stack/tyk-streaming/configuration/processors/cached/
  - /product-stack/tyk-streaming/configuration/processors/catch/
  - /product-stack/tyk-streaming/configuration/processors/dedupe/
  - /product-stack/tyk-streaming/configuration/processors/for-each/
  - /product-stack/tyk-streaming/configuration/processors/group-by-value/
  - /product-stack/tyk-streaming/configuration/processors/group-by/
  - /product-stack/tyk-streaming/configuration/processors/http/
  - /product-stack/tyk-streaming/configuration/processors/insert-part/
  - /product-stack/tyk-streaming/configuration/processors/jmes-path/
  - /product-stack/tyk-streaming/configuration/processors/json-schema/
  - /product-stack/tyk-streaming/configuration/processors/jq/
  - /product-stack/tyk-streaming/configuration/processors/log/
  - /product-stack/tyk-streaming/configuration/processors/mapping/
  - /product-stack/tyk-streaming/configuration/processors/msgpack/
  - /product-stack/tyk-streaming/configuration/processors/mutation/
  - /product-stack/tyk-streaming/configuration/processors/noop/
  - /product-stack/tyk-streaming/configuration/processors/parallel/
  - /product-stack/tyk-streaming/configuration/processors/parse-log/
  - /product-stack/tyk-streaming/configuration/processors/processors/
  - /product-stack/tyk-streaming/configuration/processors/protobuf/
  - /product-stack/tyk-streaming/configuration/processors/rate-limit/
  - /product-stack/tyk-streaming/configuration/processors/redis/
  - /product-stack/tyk-streaming/configuration/processors/retry/
  - /product-stack/tyk-streaming/configuration/processors/schema-registry-decode/
  - /product-stack/tyk-streaming/configuration/processors/schema-registry-encode/
  - /product-stack/tyk-streaming/configuration/processors/select-parts/
  - /product-stack/tyk-streaming/configuration/processors/sleep/
  - /product-stack/tyk-streaming/configuration/processors/split/
  - /product-stack/tyk-streaming/configuration/processors/switch/
  - /product-stack/tyk-streaming/configuration/processors/sync-response/
  - /product-stack/tyk-streaming/configuration/processors/try/
  - /product-stack/tyk-streaming/configuration/processors/while/
  - /product-stack/tyk-streaming/configuration/processors/workflow/
  - /product-stack/tyk-streaming/configuration/common-configuration/error-handling/
  - /product-stack/tyk-streaming/configuration/common-configuration/interpolation/
  - /product-stack/tyk-streaming/configuration/common-configuration/resources/
  - /product-stack/tyk-streaming/configuration/common-configuration/windowed_processing/
  - /product-stack/tyk-streaming/guides/sync-responses/
  - /product-stack/tyk-streaming/guides/bloblang/overview/
  - /product-stack/tyk-streaming/guides/bloblang/advanced/
  - /product-stack/tyk-streaming/guides/bloblang/arithmetic/
  - /product-stack/tyk-streaming/guides/bloblang/functions/
  - /product-stack/tyk-streaming/guides/bloblang/methods
  - /product-stack/tyk-streaming/guides/bloblang/methods/overview/
  - /product-stack/tyk-streaming/guides/bloblang/methods/general/
  - /product-stack/tyk-streaming/guides/bloblang/methods/encoding-and-encryption/
  - /product-stack/tyk-streaming/guides/bloblang/methods/geoip/
  - /product-stack/tyk-streaming/guides/bloblang/methods/json-web-tokens/
  - /product-stack/tyk-streaming/guides/bloblang/methods/numbers/
  - /product-stack/tyk-streaming/guides/bloblang/methods/strings/
  - /product-stack/tyk-streaming/guides/bloblang/methods/object-and-arrays/
  - /product-stack/tyk-streaming/guides/bloblang/methods/regular-expressions/
  - /product-stack/tyk-streaming/guides/bloblang/methods/parsing/
  - /product-stack/tyk-streaming/guides/bloblang/methods/timestamps/
  - /product-stack/tyk-streaming/guides/bloblang/methods/type-coercion/
---

<!-- ## TODO: Add availability -->

## Overview

*Tyk Streams* is a feature of Tyk API management platform that enables organizations to securely expose,
manage and monetize real-time event streams and asynchronous APIs.

With *Tyk Streams*, you can easily connect to event brokers and streaming platforms, such as
[Apache Kafka](https://github.com/TykTechnologies/tyk-pro-docker-demo/tree/kafka), and expose them as
managed API endpoints to internal and external consumers.

<!-- TODO: Need to chanage Image -->
<div style="display: flex; justify-content: center;">
{{< img src="/img/streams/tyk-streams-overview.png" alt="Tyk Streams Overview" width="670px" height="500px" >}}
</div>

The purpose of Tyk Streams is to provide a unified platform for managing both synchronous APIs (such as REST and
GraphQL) and asynchronous APIs, in addition to event-driven architectures. This allows organizations to leverage the
full potential of their event-driven systems while maintaining the same level of security, control and visibility they
expect from their API management solution.

### Key Benefits

Tyk Streams seamlessly integrates with the Tyk API Gateway, allowing you to manage asynchronous APIs and event streams
alongside your existing synchronous APIs. It provides a range of capabilities to support async API management, including:

- **Protocol Mediation**: Tyk Streams can mediate between different asynchronous protocols and API styles, such as WebSocket, Server-Sent Events (SSE) and Webhooks. This allows you to expose your event streams in a format that is compatible with your consumers' requirements.
- **Security**: Apply the same security policies and controls to your async APIs as you do to your synchronous APIs. This includes features like authentication and authorization.
- **Transformations**: Transform and enrich your event data on the fly using Tyk's powerful middleware and plugin system. This allows you to adapt your event streams to meet the needs of different consumers.
- **Analytics**: Monitor the usage and performance of your async APIs with detailed analytics and reporting. Gain insights into consumer behavior and system health.
- **Developer Portal**: Publish your async APIs to the Tyk Developer Portal, providing a centralised catalog for discovery, documentation and subscription management.

### Supported Connectors and Protocols

Tyk Streams provides out-of-the-box connectors for popular event brokers and async protocols, including:

- [Apache Kafka](https://kafka.apache.org/documentation/)
- [MQTT](https://mqtt.org/) (Coming Soon)
- [Solace](https://docs.solace.com/Get-Started/Solace-PubSub-Platform.htm) (Coming Soon)
- [AMQP](https://www.amqp.org/) (Coming Soon)
- [WebSocket](https://websocket.org/guides/websocket-protocol/)
- [Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) (SSE)
- [Webhooks](https://en.wikipedia.org/wiki/Webhook)

## Quick Start

This guide will walk you through setting up a basic streaming pipeline, demonstrating how to ingest data from one endpoint and stream it to another in real time.

#### Use Case: Live Task Updates

Imagine a project management tool where a server sends task updates (e.g., "Task completed") via POST requests, and a user’s dashboard receives them in real time via a streaming endpoint. Tyk Streams makes this possible with a lightweight, HTTP-based approach akin to Server-Sent Events (SSE)—simpler than Kafka but perfect for low-latency updates. 

As depicted in the below diagram, one endpoint accepts updates, and another delivers the results to connected clients.

<br>

<div style="display: flex; justify-content: center;">
{{< img src="/img/streams/tyk-streams-getting-started-use-case.png" alt="Tyk Streams Request Processing Flow" height="700px" >}}
</div>

<br>
<br>

{{< note >}}
**Note**

Our first release of Tyk Streams is now available, and we'd love for you to try it out. To follow along, you will require a license. Click the button to sign up and take it for a spin:

{{< button_left href="https://survey.hsforms.com/1ItPCBg-_Tre8WFJZL4pp6Q3ifmg" color="green" content="Get started with Tyk Streams" >}}

{{< /note >}}

### Prerequisites

- **Docker**: We will run the entire Tyk Stack on Docker. For installation, refer to this [guide](https://docs.docker.com/desktop/setup/install/mac-install/).
- **Git**: A CLI tool to work with git repositories. For installation, refer to this [guide](https://git-scm.com/downloads)
- **Dashboard License**: We will configure Streams API using Dashboard. [Contact support](https://tyk.io/contact/) to obtain a license.

### Instructions

1. **Clone Git Repository:**

    The [tyk-demo](https://github.com/TykTechnologies/tyk-demo) repository offers a docker-compose environment you can run locally to explore Tyk streams. Open your terminal and clone the git repository using the below command.

    ```bash
    git clone https://github.com/TykTechnologies/tyk-demo
    cd tyk-demo
    ```

2. **Enable Tyk Streams:**

   By default, Tyk Streams is disabled. To enable Tyk Streams in the Gateway and Dashboard, you need to configure the following settings:

   Create an `.env` file and populate it with the values below:

   ```bash
   DASHBOARD_LICENCE=<your-dashboard-license>
   GATEWAY_IMAGE_REPO=tyk-gateway-ee
   TYK_DB_STREAMING_ENABLED=true
   TYK_GW_STREAMING_ENABLED=true
   ```

   - `DASHBOARD_LICENCE`: Add your license key. Contact [support](https://tyk.io/contact/) to obtain a license.
   - `GATEWAY_IMAGE_REPO`: Tyk Streams is available in the Enterprise Edition of the Gateway.
   - `TYK_DB_STREAMING_ENABLED` and `TYK_GW_STREAMING_ENABLED`: These must be set to `true` to enable Tyk Streams in the Dashboard and Gateway, respectively. Refer to the [configuration options]({{< ref "" >}}) for more details.

3. **Start Tyk Streams**

    Execute the following command:
    ```bash
    ./up.sh
    ```

    This process will take a couple of minutes to complete and will display some credentials upon completion. Copy the Dashboard **username, password, and API key**, and save them for later use.
    ```
            ▾ Tyk Demo Organisation
                  Username : admin-user@example.org
                  Password : 3LEsHO1jv1dt9Xgf
          Dashboard API Key : 5ff97f66188e48646557ba7c25d8c601
    ```

4. **Verify Setup:**

    Open Tyk Dashboard in your browser by visiting [http://localhost:3000](http://localhost:3000) or [http://tyk-dashboard.localhost:3000](http://tyk-dashboard.localhost:3000) and login with the provided **admin** credentials.

5. **Configure Streams API:**

    Create a file `streams-api.json` with the below content:

    ```json
    {
        "components": {},
        "info": {
            "title": "Test Streams API",
            "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "paths": {},
        "servers": [
            {
                "url": "http://tyk-gateway.localhost:8080/test-streams-api/"
            }
        ],
        "x-tyk-api-gateway": {
            "info": {
                "name": "Test Streams API",
                "state": {
                    "active": true
                }
            },
            "server": {
                "listenPath": {
                    "value": "/test-streams-api/",
                    "strip": true
                }
            },
            "upstream": {
              "url": ""
            }
        },
        "x-tyk-streaming": {
            "streams": {
                "default_stream": {
                    "input": {
                        "http_server": {
                            "address": "",
                            "allowed_verbs": [
                                "POST"
                            ],
                            "path": "/post",
                            "rate_limit": "",
                            "timeout": "5s"
                        },
                        "label": ""
                    },
                    "output": {
                        "http_server": {
                            "address": "",
                            "allowed_verbs": [
                                "GET"
                            ],
                            "stream_path": "/get/stream"
                        },
                        "label": ""
                    }
                }
            }
        }
    }
    ```

6. **Create the API:**
    
    Create the API by executing the following command. Be sure to replace `<your-api-key>` with the API key you saved earlier:

    ```bash
    curl -H "Authorization: <your-api-key>" -H "Content-Type: application/vnd.tyk.streams.oas" http://localhost:3000/api/apis/streams -d @streams-api.json
    ```

    You should expect a response as shown below
    ```bash
    {"Status":"OK","Message":"API created","Meta":"67e54cadbfa2f900013b501c","ID":"3ddcc8e1b1534d1d4336dc6b64a0d22f"}
    ```

7. **Test the API:**

   Open a terminal and execute the following command to start listening for messages from the Streams API you created:

   ```bash
   curl -N http://tyk-gateway.localhost:8080/test-streams-api/get/stream
   ```

   In a second terminal, execute the command below to send a message to the Streams API. You can run this command multiple times and modify the message to send different messages:

   ```bash
   curl -X POST http://tyk-gateway.localhost:8080/test-streams-api/post -H "Content-Type: text/plain" -d "Sending Stream Data..."
   ```

   Now, you will see the message appear in the terminal window where you are listening for messages.

**Wrapping Up:** And that’s it—you’ve just set up a real-time streaming pipeline with Tyk Streams! From here, you can tweak the configuration to suit your needs, [explore key concepts]({{< ref "" >}}), or explore more [advanced use cases]({{< ref "" >}}).

## How It Works

Imagine you’re at a busy coffee shop where orders are shouted out by customers and instantly relayed to baristas who whip up the drinks. **Tyk Streams is like the efficient barista crew in this scenario—it takes in requests (orders) from one side, processes them in real time, and delivers the results (drinks) to the other side without anyone waiting around or shouting twice.** Built right into the Tyk Gateway, Tyk Streams ensures that messages—like task updates or live notifications—move from sender to receiver effortlessly, even as the crowd (traffic) grows.

Tyk Streams is implemented as a middleware component in the Tyk Gateway. The architecture consists of the following logical components:

1. **Stream Middleware:** Think of this as the barista taking your order. It grabs incoming API requests and decides if they need streaming, slotting them into the right workflow after checking credentials and limits—just like making sure you’ve paid before handing over your latte.
2. **Stream Manager**: This is the shift supervisor. It oversees the creation and management of streaming tasks, starting or stopping them as needed, so everything runs like clockwork.
3. **Stream Instance**: These are the baristas at work. Each one handles a specific stream of data, processing it based on the instructions (configuration) it’s given.
4. **Stream Analytics**: Picture a chalkboard tracking how many coffees were made and how fast. This captures usage stats and performance metrics, feeding them into Tyk’s analytics system for a clear picture of what’s happening.

<div style="display: flex; justify-content: center;">
{{< img src="/img/streams/tyk-streams-how-it-works.png" alt="How Tyk Streams work" width="500px" height="500px" >}}
</div>

### Request Processing Flow

<div style="display: flex; justify-content: center;">
{{< img src="/img/streams/tyk-streams-request-processing-flow.png" alt="Tyk Streams Request Processing Flow" height="500px" >}}
</div>

1. **Initial Request Handling:** 

    When a request arrives at the Tyk Gateway, it goes through the standard middleware chain. If the API has streaming enabled, the request eventually reaches the streaming middleware.

    In the overall Tyk middleware chain, the Streaming middleware runs after authentication and rate limiting but before the request is proxied to the upstream service. This allows it to:

    1. Authenticate and authorize requests before streaming.
    2. Apply rate limits to streaming connections.
    3. Intercept requests that should be handled by streams before they reach the upstream.

2. **Stream Configuration Loading:**

    The middleware first loads the stream configuration from the API definition.

3. **Stream Manager and Stream Creation**

    - For each unique configuration, a Stream Manager is either created or retrieved from cache.

    - The Stream Manager initializes individual streams based on the configuration.

6. **Request Path Matching and Stream Execution:**

    When a request comes in, the middleware checks if the path matches any registered stream routes When a route is matched, the corresponding handler is executed. The handler is wrapped with analytics tracking.

7. **Stream Response**

    The result of Stream handler execution is then streamed back to the client.

### Scaling and Availability

The beauty of Tyk Streams is that it’s baked into the Tyk Gateway, so it scales naturally as your API traffic ramps up—no extra setup or separate systems required. It’s efficient too, reusing the same resources as the Gateway to keep things lean. 

Tyk Streams ensures reliable message delivery across a cluster of Tyk Gateway instances. Whether clients connect through a load balancer or directly to individual gateway nodes, Tyk Streams guarantees that messages are delivered to each connected consumer.

Under the hood, Tyk Streams utilizes [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/) for efficient and reliable message distribution within the Tyk Gateway cluster. This enables:

- **Fault tolerance**: If a gateway node fails, clients connected to other nodes continue to receive messages uninterrupted.
- **Load balancing**: Messages are evenly distributed across the gateway cluster, ensuring optimal performance and resource utilization.
- **Message persistence**: Redis Streams provides durability, allowing messages to be persisted and replayed if necessary.

## Configuration Options

Tyk Streams is configured at both the system level (Tyk Gateway and Dashboard) and the API definition level. System-level settings control global streaming behavior, while API-level configurations define specific stream inputs and outputs for an API.

### System Level

#### Gateway Configuration

In the `tyk.conf` file, Streams is configured in the streaming section:

{{< tabs_start >}}

{{< tab_start "Config File" >}}

```json
...
"streaming": {
  "enabled": true,
}
...
```

{{< tab_end >}}

{{< tab_start "Environment Variable" >}}

```bash
TYK_GW_STREAMING_ENABLED=true
```

{{< tab_end >}}

{{< tabs_end >}}

This enables Tyk Streams on Gateway. Refer to the [Tyk Gateway Configuration Reference]() for details.

#### Dashboard Configuration

In the `tyk_analytics.conf` file, Streams is configured in the streaming section:

{{< tabs_start >}}

{{< tab_start "Config File" >}}

```json
...
"streaming": {
  "enabled": true,
}
...
```

{{< tab_end >}}

{{< tab_start "Environment Variable" >}}

```bash
TYK_DB_STREAMING_ENABLED=true
```

{{< tab_end >}}

{{< tabs_end >}}

This enables Tyk Streams on Dashboard. Refer to the [Tyk Dashboard Configuration Reference]() for details.

### API Definition

At the API definition level, Tyk Streams is configured through an OpenAPI extension `x-tyk-streaming`:

```json
"x-tyk-streaming": {
  "streams": {
    "stream1": {
      "input": { ... },
      "output": { ... }
    }
  }
}
```

{{< tabs_start >}}

{{< tab_start "Tyk OAS API (default)" >}}

```json
...
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
...
```

To know more about the configuration option, refer to this [documentation]().

{{< tab_end >}}

{{< tab_start "Tyk Classic API" >}}

TODO: Add sample JSON

To know more about the configuration option, refer to this [documentation]().

{{< tab_end >}}

{{< tab_start "Dashboard UI" >}}

TODO: Update the Image

{{< img src="/img/streams/configure-streams.png" alt="Screenshot of Tyk Dashboard configuring API Streams" width="1000px" >}}

{{< tab_end >}}

{{< tab_start "Tyk Operator" >}}

TODO: Add sample JSON

To know more about the configuration option, refer to this [documentation]().

{{< tab_end >}}

{{< tabs_end >}}

## /////The Content below still is not ready //////

## Use Cases

Tyk Streams brings full lifecycle API management to asynchronous APIs and event-driven architectures. It provides a
comprehensive set of capabilities to secure, transform, monitor and monetize your async APIs.

### Security

[Tyk Streams]({{< ref "api-management/event-driven-apis#" >}}) supports all the authentication and authorization options available for traditional synchronous APIs. This
ensures that your async APIs are protected with the same level of security as your REST, GraphQL, and other API types. 

Refer this docs, to know more about [Authentication]({{< ref "api-management/client-authentication">}}) and [Authorization]({{< ref "api-management/policies" >}}) in Tyk.

### Transformations and Enrichment

[Tyk Streams]({{< ref "api-management/event-driven-apis#" >}}) allows you to transform and enrich the messages flowing through your async APIs. You can modify message payloads, filter events, combine data from multiple sources and more.

- **[Transformation]({{< ref "api-management/traffic-transformation" >}})**: Use Tyk's powerful middleware and plugin system to transform message payloads on the fly. You can convert between different data formats (e.g., JSON to XML), filter fields, or apply custom logic.
- **[Enrichment]({{< ref "api-management/plugins/overview" >}})**: Enrich your async API messages with additional data from external sources. For example, you can lookup customer information from a database and append it to the message payload.

### Analytics and Monitoring

Tyk provides comprehensive analytics and monitoring capabilities for async APIs. You can track usage metrics, monitor performance, and gain visibility into the health of your event-driven systems.
Tyk captures detailed analytics data for async API usage, including message rates, latency, and error counts. This data can be exported to popular analytics platforms like Prometheus, OpenTelemetry, and StatsD.

### Monetization

[Tyk Streams]({{< ref "api-management/event-driven-apis#" >}}) enables you to monetize your async APIs by exposing them through the Developer Portal. Developers can discover, subscribe to and consume your async APIs using webhooks or streaming subscriptions.

- **Developer Portal Integration**: Async APIs can be published to the Tyk Developer Portal, allowing developers to browse, subscribe, and access documentation. Developers can manage their async API subscriptions just like traditional APIs.
- **Webhooks**: Tyk supports exposing async APIs as webhooks, enabling developers to receive event notifications via HTTP callbacks. Developers can configure their webhook endpoints and subscribe to specific events or topics.

### Complex Event Processing

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
- **Processor Block Configuration**: Utilizes a custom Bloblang script that performs the following operations:
    - **Filters** orders, only processing those with a value greater than 1000.
    - **Enriches** the high-value orders by retrieving the customer ID and email from a separate data source.
    - **Adds** a new high_value_order flag to each qualifying event.
- **Output Handling**: Processed high-value order events are exposed via a WebSocket stream at the endpoint */high-value-orders*.

{{< note success >}}

**Kafka Demo**

For a practical demonstration of Kafka and Tyk Streams integration, please visit our comprehensive [Kafka Integration Demo](https://github.com/TykTechnologies/tyk-pro-docker-demo/tree/kafka).

{{< /note >}}

### Legacy Modernization

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

### Async API Orchestration

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

### Monetize APIs using Developer Portal

Tyk Streams seamlessly integrates with the Tyk Developer Portal, enabling developers to easily discover, subscribe to, and consume async APIs and event streams. This section covers how to publish async APIs to the developer portal, provide documentation and enable developers to subscribe to events and streams.



#### Publishing Async APIs to the Developer Portal

Publishing async APIs to the Tyk Developer Portal follows a similar process to publishing traditional synchronous APIs. API publishers can create API products that include async APIs and make them available to developers through the portal.

To publish an async API:
- In the Tyk Dashboard, create a new API and define the async API endpoints and configuration.
- Associate the async API with an API product.
- Publish the API product to the Developer Portal.
- Copy code

<!-- [Placeholder for screenshot or GIF demonstrating the process of publishing an async API to the Developer Portal] -->



#### Async API Documentation

Providing clear and comprehensive documentation is crucial for developers to understand and effectively use async APIs. While Tyk Streams does not currently support the AsyncAPI specification format, it allows API publishers to include detailed documentation for each async API.

When publishing an async API to the Developer Portal, consider including the following information in the documentation:
- Overview and purpose of the async API
- Supported protocols and endpoints (e.g., WebSocket, Webhook)
- Event types and payloads
- Subscription and connection details
- Example code snippets for consuming the async API
- Error handling and troubleshooting guidelines

<!-- [Placeholder for screenshot showcasing async API documentation in the Developer Portal] -->



#### Enabling Developers to Subscribe to Events and Streams

Tyk Streams provides a seamless way for developers to subscribe to events and streams directly from the Developer Portal. API publishers can enable webhook subscriptions for specific API products, allowing developers to receive real-time updates and notifications.
To enable webhook subscriptions for an API product:
1. In the Tyk Developer Portal, navigate to the API product settings.
2. Enable the "Webhooks" option and specify the available events for subscription.
3. Save the API product settings.

{{< img src="/img/streams/enable-portal-webhooks.png" alt="Enable Portal Webhooks" width="1000" >}}

<!-- [Placeholder for screenshot showing the API product settings with webhook configuration] -->

Once webhook subscriptions are enabled, developers can subscribe to events and streams by following these steps:
- In the Developer Portal, navigate to the My Apps page.
- Select the desired app.
- In the "Webhooks" section, click on "Subscribe".
- Provide the necessary details:
    - *Webhook URL*: The URL where the event notifications will be sent.
    - *HMAC Secret*: Provide a secret key used to sign the webhook messages for authentication.
    - *Events*: Select the specific events to subscribe to.
- Save the subscription settings.
- Copy code
<!-- [Placeholder for screenshot illustrating the developer's view of subscribing to webhooks] -->

{{< img src="/img/streams/subscribe-webhooks.png" alt="subscribe to webhooks from portal" width="1000" >}}

To configure the async API stream for webhook subscriptions, use the following output configuration in your API definition:

```yaml
outputs:
  - portal_webhook:
      event_type: bar
      portal_url: http://localhost:3001
      secret: <portal-api-secret>
```

Replace *<portal-api-secret>* with the actual secret key used for signing the webhook messages.

By enabling webhook subscriptions, developers can easily integrate real-time updates and notifications from async APIs into their applications, enhancing the overall developer experience and facilitating seamless communication between systems.
<!-- [Placeholder for a diagram illustrating the flow of webhook subscriptions and event notifications] -->

With Tyk Streams and the Developer Portal integration, API publishers can effectively manage and expose async APIs, while developers can discover, subscribe to, and consume event streams effortlessly, enabling powerful real-time functionality in their applications.


## Glossary

### Event

An event represents a significant change or occurrence within a system, such as a user action, a sensor reading, or a data update. Events are typically lightweight and contain minimal data, often just a unique identifier and a timestamp.

### Stream

A stream is a continuous flow of events ordered by time. Streams allow for efficient, real-time processing and distribution of events to multiple consumers.

### Publisher (or Producer)

A publisher is an application or system that generates events and sends them to a broker or event store for distribution to interested parties.

### Subscriber (or Consumer)

A subscriber is an application or system that expresses interest in receiving events from one or more streams. Subscribers can process events in real-time or store them for later consumption.

### Broker

A broker is an intermediary system that receives events from publishers, stores them, and forwards them to subscribers. Brokers decouple publishers from subscribers, allowing for scalable and flexible event-driven architectures.

### Topic (or Channel)

A topic is a named destination within a broker where events are published. Subscribers can subscribe to specific topics to receive relevant events.



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
capabilities. Please consult the [glossary]({{< ref "api-management/event-driven-apis#glossary" >}}) for explanations of key
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

## Key Concepts

<!-- In addition to the native protocol support, Tyk Streams offers powerful protocol mediation capabilities. This allows you
to expose async APIs using different protocols than the backend event broker, making it easier to support a diverse client
requirements.

For example, you can:
- Expose a Kafka topic as a WebSocket API
- Convert MQTT messages to HTTP webhooks
- Bridge between different async protocols (e.g., Kafka to MQTT) -->