---
title: "Tyk Streams End-to-End Example"
date: 2025-05-28
description: "A comprehensive end-to-end example of Tyk Streams implementation"
tags: ["Tyk Streams", "Event-Driven APIs", "Kafka", "MQTT", "WebSockets", "SSE", "Correlation IDs", "Filtering"]
---

# Tyk Streams End-to-End Example

This guide provides a comprehensive end-to-end example of implementing Tyk Streams for event-driven API architectures. We'll walk through setting up a complete streaming pipeline with multiple sources, transformations, and destinations.

## Prerequisites

Before starting this tutorial, ensure you have:

- A running Tyk Gateway (v4.0 or later)
- Access to Tyk Dashboard
- Basic understanding of event-driven architectures
- Access to at least one message broker (Kafka, MQTT, etc.)

## Overview of Our Example

In this example, we'll create a real-time data processing pipeline that:

1. Ingests data from multiple sources (Kafka and HTTP webhooks)
2. Filters and transforms the data
3. Enriches the data with additional information
4. Distributes the processed data to multiple destinations (WebSockets, SSE, and another Kafka topic)

## Step 1: Setting Up the Stream Sources

First, let's configure our stream sources in the Tyk API definition:

```json
{
  "name": "Streams Example API",
  "api_id": "streams_example_api",
  "streams": {
    "enabled": true,
    "sources": [
      {
        "name": "kafka_source",
        "type": "kafka",
        "kafka_config": {
          "brokers": ["kafka-broker:9092"],
          "topics": ["incoming-events"],
          "consumer_group": "tyk-streams-example",
          "client_id": "tyk-streams-client",
          "start_from_oldest": true
        }
      },
      {
        "name": "webhook_source",
        "type": "http",
        "http_config": {
          "endpoint_url": "/webhook-events"
        }
      }
    ]
  }
}
```

## Step 2: Implementing Data Transformations

Next, let's add transformations to process our incoming data:

```json
{
  "streams": {
    "transformations": [
      {
        "name": "normalize_data",
        "source": "kafka_source",
        "js_function": "function transform(event) { \n  // Convert timestamps to ISO format\n  if (event.data.timestamp) {\n    event.data.timestamp = new Date(event.data.timestamp).toISOString();\n  }\n\n  // Standardize event type naming\n  if (event.data.event_type) {\n    event.data.eventType = event.data.event_type.toLowerCase();\n    delete event.data.event_type;\n  }\n\n  return event;\n}"
      },
      {
        "name": "enrich_webhook_data",
        "source": "webhook_source",
        "js_function": "function transform(event) { \n  // Add metadata\n  event.data.source = 'webhook';\n  event.data.processed_at = new Date().toISOString();\n  \n  // Add correlation ID if not present\n  if (!event.data.correlation_id) {\n    event.data.correlation_id = 'wh-' + Math.random().toString(36).substring(2, 15);\n  }\n  \n  return event;\n}"
      }
    ]
  }
}
```

## Step 3: Setting Up Filtering

Now, let's add filters to route specific events to different destinations:

```json
{
  "streams": {
    "filters": [
      {
        "name": "high_priority_filter",
        "source": "normalize_data",
        "js_function": "function filter(event) { \n  // Filter for high priority events\n  return event.data.priority === 'high' || event.data.eventType === 'alert';\n}"
      },
      {
        "name": "user_events_filter",
        "source": "enrich_webhook_data",
        "js_function": "function filter(event) { \n  // Filter for user-related events\n  return event.data.entity_type === 'user';\n}"
      }
    ]
  }
}
```

## Step 4: Configuring Destinations

Finally, let's set up our destinations to distribute the processed data:

```json
{
  "streams": {
    "destinations": [
      {
        "name": "websocket_destination",
        "type": "websocket",
        "source": "high_priority_filter",
        "websocket_config": {
          "endpoint_url": "/ws-events",
          "client_message_timeout_seconds": 60
        }
      },
      {
        "name": "sse_destination",
        "type": "sse",
        "source": "user_events_filter",
        "sse_config": {
          "endpoint_url": "/sse-events",
          "client_message_timeout_seconds": 30
        }
      },
      {
        "name": "kafka_destination",
        "type": "kafka",
        "source": ["normalize_data", "enrich_webhook_data"],
        "kafka_config": {
          "brokers": ["kafka-broker:9092"],
          "topic": "processed-events",
          "client_id": "tyk-streams-producer"
        }
      }
    ]
  }
}
```

## Complete API Definition

Here's the complete API definition combining all the components:

```json
{
  "name": "Streams Example API",
  "api_id": "streams_example_api",
  "proxy": {
    "listen_path": "/streams-example/",
    "target_url": "http://dummy-service:8080/",
    "strip_listen_path": true
  },
  "streams": {
    "enabled": true,
    "sources": [
      {
        "name": "kafka_source",
        "type": "kafka",
        "kafka_config": {
          "brokers": ["kafka-broker:9092"],
          "topics": ["incoming-events"],
          "consumer_group": "tyk-streams-example",
          "client_id": "tyk-streams-client",
          "start_from_oldest": true
        }
      },
      {
        "name": "webhook_source",
        "type": "http",
        "http_config": {
          "endpoint_url": "/webhook-events"
        }
      }
    ],
    "transformations": [
      {
        "name": "normalize_data",
        "source": "kafka_source",
        "js_function": "function transform(event) { \n  // Convert timestamps to ISO format\n  if (event.data.timestamp) {\n    event.data.timestamp = new Date(event.data.timestamp).toISOString();\n  }\n\n  // Standardize event type naming\n  if (event.data.event_type) {\n    event.data.eventType = event.data.event_type.toLowerCase();\n    delete event.data.event_type;\n  }\n\n  return event;\n}"
      },
      {
        "name": "enrich_webhook_data",
        "source": "webhook_source",
        "js_function": "function transform(event) { \n  // Add metadata\n  event.data.source = 'webhook';\n  event.data.processed_at = new Date().toISOString();\n  \n  // Add correlation ID if not present\n  if (!event.data.correlation_id) {\n    event.data.correlation_id = 'wh-' + Math.random().toString(36).substring(2, 15);\n  }\n  \n  return event;\n}"
      }
    ],
    "filters": [
      {
        "name": "high_priority_filter",
        "source": "normalize_data",
        "js_function": "function filter(event) { \n  // Filter for high priority events\n  return event.data.priority === 'high' || event.data.eventType === 'alert';\n}"
      },
      {
        "name": "user_events_filter",
        "source": "enrich_webhook_data",
        "js_function": "function filter(event) { \n  // Filter for user-related events\n  return event.data.entity_type === 'user';\n}"
      }
    ],
    "destinations": [
      {
        "name": "websocket_destination",
        "type": "websocket",
        "source": "high_priority_filter",
        "websocket_config": {
          "endpoint_url": "/ws-events",
          "client_message_timeout_seconds": 60
        }
      },
      {
        "name": "sse_destination",
        "type": "sse",
        "source": "user_events_filter",
        "sse_config": {
          "endpoint_url": "/sse-events",
          "client_message_timeout_seconds": 30
        }
      },
      {
        "name": "kafka_destination",
        "type": "kafka",
        "source": ["normalize_data", "enrich_webhook_data"],
        "kafka_config": {
          "brokers": ["kafka-broker:9092"],
          "topic": "processed-events",
          "client_id": "tyk-streams-producer"
        }
      }
    ]
  },
  "active": true,
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "use_extended_paths": true
      }
    }
  }
}
```

## Working with Correlation IDs

Correlation IDs are crucial for tracking events across distributed systems. In our example, we're handling them in several ways:

1. **Automatic generation**: For webhook events that don't include a correlation ID, we generate one in the transformation function.
2. **Propagation**: The correlation ID is preserved throughout the entire stream pipeline.
3. **Tracing**: You can use these IDs to trace events across different systems and in logs.

Example of tracing an event with a correlation ID:

```javascript
// Client-side code receiving events from WebSocket
const ws = new WebSocket('wss://your-api-gateway/streams-example/ws-events');
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(`Received event with correlation ID: ${data.correlation_id}`);
};
```

## Dynamic Variable Replacement

Tyk Streams supports dynamic variable replacement in your stream configurations. This is particularly useful for environment-specific settings or for injecting context-specific values.

For example, you can use environment variables in your Kafka configuration:

```json
{
  "kafka_config": {
    "brokers": ["${ENV.KAFKA_BROKER_HOST}:${ENV.KAFKA_BROKER_PORT}"],
    "topics": ["${ENV.KAFKA_TOPIC}"],
    "consumer_group": "${ENV.CONSUMER_GROUP}"
  }
}
```

You can also use request context variables in HTTP-based streams:

```json
{
  "http_config": {
    "endpoint_url": "/events/${request.params.user_id}"
  }
}
```

## Testing the Stream Pipeline

To test our stream pipeline:

1. **Send a test event to Kafka**:
   ```bash
   # Using kafkacat to produce a test message
   echo '{"event_type":"ALERT","priority":"high","message":"System CPU usage above 90%","timestamp":1621234567890}' | \
   kafkacat -b kafka-broker:9092 -t incoming-events -P
   ```

2. **Send a test webhook event**:
   ```bash
   curl -X POST https://your-api-gateway/streams-example/webhook-events \
     -H "Content-Type: application/json" \
     -d '{"entity_type":"user","action":"login","user_id":"12345"}'
   ```

3. **Connect to the WebSocket endpoint** to receive high-priority events:
   ```javascript
   // Browser or Node.js code
   const ws = new WebSocket('wss://your-api-gateway/streams-example/ws-events');
   ws.onmessage = function(event) {
     console.log('Received high priority event:', JSON.parse(event.data));
   };
   ```

4. **Connect to the SSE endpoint** to receive user events:
   ```javascript
   // Browser code
   const eventSource = new EventSource('https://your-api-gateway/streams-example/sse-events');
   eventSource.onmessage = function(event) {
     console.log('Received user event:', JSON.parse(event.data));
   };
   ```

## Performance Considerations

When implementing complex stream pipelines like this example, consider these performance tips:

1. **Message size**: Keep your event payloads as small as possible
2. **Transformation complexity**: Complex JavaScript transformations can impact performance
3. **Connection limits**: Be aware of WebSocket and SSE connection limits
4. **Error handling**: Implement proper error handling in your transformations and filters
5. **Monitoring**: Use Tyk's monitoring capabilities to track stream performance

## Conclusion

This end-to-end example demonstrates the power and flexibility of Tyk Streams for building event-driven API architectures. By combining different sources, transformations, filters, and destinations, you can create sophisticated real-time data processing pipelines that integrate with various messaging systems and protocols.

For more information on specific stream components, refer to the [Tyk Streams Reference](/api-management/stream-config) documentation.
