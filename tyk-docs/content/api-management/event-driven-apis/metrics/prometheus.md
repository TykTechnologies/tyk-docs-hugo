---
title: "Prometheus Metrics"
date: 2023-01-16
tags: ["Tyk Streams", "Event-Driven APIs", "Metrics", "Prometheus"]
description: "Detailed documentation for Prometheus metrics in Tyk Streams"
menu:
  main:
    parent: "Metrics"
weight: 1
---

## Prometheus Metrics for Tyk Streams

Tyk Streams provides comprehensive metrics in Prometheus format to help you monitor the performance and health of your event-driven APIs.

### Metric Types

Tyk Streams exposes the following types of metrics:

#### Counters

- `tyk_streams_messages_processed_total`: Total number of messages processed
- `tyk_streams_messages_failed_total`: Total number of messages that failed processing
- `tyk_streams_connection_errors_total`: Total number of connection errors

#### Gauges

- `tyk_streams_active_connections`: Current number of active connections
- `tyk_streams_memory_usage_bytes`: Memory usage in bytes

#### Histograms

- `tyk_streams_message_processing_duration_seconds`: Time taken to process messages
- `tyk_streams_message_size_bytes`: Size of messages in bytes

### Labels

Metrics are labeled with the following dimensions:

- `source`: The source of the message (e.g., Kafka, MQTT)
- `destination`: The destination of the message
- `topic`: The topic or channel name
- `status`: The status of the message processing (success, error)

### Configuration

To enable Prometheus metrics in Tyk Streams, add the following to your configuration:

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

#### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `listen_address` | The address to expose metrics on | ":9090" |
| `path` | The HTTP path where metrics are exposed | "/metrics" |
| `pushgateway.enabled` | Whether to push metrics to Pushgateway | false |
| `pushgateway.url` | The URL of the Pushgateway | "" |
| `pushgateway.job_name` | The job name for Pushgateway | "tyk-streams" |
| `pushgateway.push_interval` | How often to push metrics | "10s" |

### Prometheus Pushgateway

For environments where Prometheus cannot directly scrape metrics (such as serverless or ephemeral environments), we recommend using Prometheus Pushgateway.

#### Benefits of Using Pushgateway

1. **Ephemeral Services**: Ideal for services that may not be running when Prometheus scrapes
2. **Network Restrictions**: Useful when Prometheus cannot directly access the service
3. **Batch Jobs**: Perfect for capturing metrics from short-lived processes

#### Setting Up Pushgateway

1. Deploy Prometheus Pushgateway:

```bash
docker run -d -p 9091:9091 prom/pushgateway
```

2. Configure Tyk Streams to push metrics to Pushgateway as shown in the configuration section

3. Add the following to your Prometheus configuration to scrape from Pushgateway:

```yaml
scrape_configs:
  - job_name: 'pushgateway'
    honor_labels: true
    static_configs:
      - targets: ['pushgateway:9091']
```

### Grafana Dashboard

You can visualize Tyk Streams metrics using Grafana. We provide a sample dashboard that includes:

- Message throughput
- Error rates
- Processing latency
- Connection status

To import the dashboard:

1. Open Grafana
2. Go to Dashboards > Import
3. Enter dashboard ID `12345` or upload the JSON file from our GitHub repository
4. Select your Prometheus data source
5. Click Import

### Best Practices

1. **Set Appropriate Retention**: Configure Prometheus retention based on your monitoring needs
2. **Use Recording Rules**: For complex queries that are used frequently
3. **Set Up Alerts**: Configure alerts for critical metrics like high error rates or latency
4. **Monitor Pushgateway**: If using Pushgateway, monitor it as well to ensure metrics are being collected

### Troubleshooting

If you're not seeing metrics in Prometheus:

1. Check that Tyk Streams is configured correctly for Prometheus
2. Verify that Prometheus can reach the metrics endpoint
3. If using Pushgateway, check that Tyk Streams can reach it
4. Check Prometheus logs for scraping errors
