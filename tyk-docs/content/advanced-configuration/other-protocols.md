---
title: "Advanced Communication Protocols"
date: 2024-12-21
tags: ["gRPC", "SSE", "Websocket", "Other Protocol"]
description: "How to configure advanced communication protocols"
keywords: ["gRPC", "SSE", "Websocket", "Other Protocol"]
aliases:
  - /api-management/non-http-protocols
---

## Overview

Tyk API Gateway is primarily designed to handle HTTP/HTTPS traffic, but it also provides robust support for several other protocols to accommodate modern API architectures and communication patterns. This flexibility allows developers to leverage Tyk's security, monitoring, and management capabilities across a wider range of API technologies.

### Use Cases

These advanced protocol capabilities enhance Tyk's usefulness beyond traditional REST APIs:

-   **Real-time Applications**: WebSockets enable bidirectional communication for chat applications, collaborative tools, and live dashboards.
-   **Microservices Communication**: gRPC support facilitates efficient inter-service communication with strong typing and performance benefits.
-   **Event-Driven Architectures**: SSE enables efficient server-push notifications without the overhead of maintaining WebSocket connections.

## Supported Protocols

Tyk currently supports the following protocols other than HTTP/HTTPS:

1. **[TCP Proxy]({{< ref "key-concepts/tcp-proxy" >}})**

2. **[gRPC]({{< ref "key-concepts/grpc-proxy" >}})**

3. **[Server-Sent Events (SSE)]({{< ref "advanced-configuration/sse-proxy" >}})**

4. **[WebSockets]({{< ref "advanced-configuration/websockets" >}})**