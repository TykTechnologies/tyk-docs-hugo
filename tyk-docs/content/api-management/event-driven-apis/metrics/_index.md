---
title: "Metrics"
date: 2023-01-16
tags: ["Tyk Streams", "Event-Driven APIs", "Metrics"]
description: "Metrics collection in Tyk Streams"
menu:
  main:
    parent: "Event-Driven APIs"
weight: 7
---

## Overview

Tyk Streams provides comprehensive metrics collection capabilities to help you monitor the performance and health of your event-driven APIs. Metrics collection is essential for understanding system behavior, troubleshooting issues, and optimizing performance.

## Available Metrics Backends

Tyk Streams currently supports the following metrics backends:

- [Prometheus]({{< ref "prometheus.md" >}})

## Basic Configuration

To enable metrics collection in Tyk Streams, add the following to your configuration:

```yaml
analytics:
  type: prometheus  # Currently the only supported type
  prometheus:
    # Prometheus-specific configuration
    listen_address: ":9090"
    path: "/metrics"
```

## Metrics Collection

Tyk Streams collects various metrics including:

- Message throughput and processing rates
- Error counts and types
- Processing latencies
- Resource utilization

These metrics help you understand the performance characteristics of your event-driven APIs and identify potential bottlenecks or issues.

For detailed configuration options and usage instructions, refer to the documentation for your chosen metrics backend.
