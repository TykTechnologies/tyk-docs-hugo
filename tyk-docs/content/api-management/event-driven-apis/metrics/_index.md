---
title: "Metrics"
date: 2023-01-16
tags: ["Tyk Streams", "Event-Driven APIs", "Metrics", "Prometheus"]
description: "Metrics for Tyk Streams"
menu:
  main:
    parent: "Event-Driven APIs"
weight: 7
---

Tyk Streams provides metrics that can be used to monitor the performance and health of your event-driven APIs. These metrics can be collected and visualized using Prometheus.

## Available Metrics

Tyk Streams exposes the following metrics:

- **Messages Processed**: The number of messages processed by Tyk Streams.
- **Messages Failed**: The number of messages that failed to be processed.
- **Message Processing Time**: The time taken to process a message.
- **Active Connections**: The number of active connections to Tyk Streams.
- **Connection Errors**: The number of connection errors.

## Prometheus Integration

Tyk Streams can be configured to expose metrics in Prometheus format. This allows you to collect and visualize metrics using Prometheus and Grafana.

### Configuration

To enable Prometheus metrics, add the following configuration to your Tyk Streams configuration file:

```yaml
analytics:
  type: prometheus
  prometheus:
    listen_address: ":9090"
    path: "/metrics"
    pushgateway:
      enabled: true
      url: "http://pushgateway:9091"
      job_name: "tyk-streams"
      push_interval: "10s"
```

This configuration will:

1. Enable Prometheus metrics collection
2. Expose metrics on port 9090 at the path `/metrics`
3. Push metrics to a Prometheus Pushgateway at the specified URL
4. Use the job name "tyk-streams" for the metrics
5. Push metrics every 10 seconds

### Using Pushgateway

For environments where Prometheus cannot directly scrape metrics (such as serverless or ephemeral environments), we recommend using Prometheus Pushgateway. This allows Tyk Streams to push metrics to a central location where Prometheus can scrape them.

To set up Pushgateway:

1. Deploy Prometheus Pushgateway
2. Configure Tyk Streams to push metrics to Pushgateway as shown above
3. Configure Prometheus to scrape metrics from Pushgateway

For more detailed information about Prometheus metrics in Tyk Streams, see the [Prometheus Metrics](/docs/api-management/event-driven-apis/metrics/prometheus/) documentation.
