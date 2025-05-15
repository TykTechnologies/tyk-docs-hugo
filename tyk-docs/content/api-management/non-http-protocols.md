---
title: "Non HTTP Protocol"
date: 2024-12-21
tags: ["gRPC", "SSE", "Websocket", "Non HTTP Protocol"]
description: "How to configure Non HTTP Protocols"
keywords: ["gRPC", "SSE", "Websocket", "Non HTTP Protocol"]
aliases:
  - /advanced-configuration/other-protocols
  - /key-concepts/grpc-proxy
  - /advanced-configuration/websockets
  - /advanced-configuration/sse-proxy
---

## Overview

Tyk API Gateway is primarily designed to handle HTTP/HTTPS traffic, but it also provides robust support for several non-HTTP protocols to accommodate modern API architectures and communication patterns. This flexibility allows developers to leverage Tyk's security, monitoring, and management capabilities across a wider range of API technologies.

### Use Cases

These non-HTTP protocol capabilities expand Tyk's usefulness beyond traditional REST APIs:

-   **Real-time Applications**: WebSockets enable bidirectional communication for chat applications, collaborative tools, and live dashboards.
-   **Microservices Communication**: gRPC support facilitates efficient inter-service communication with strong typing and performance benefits.
-   **Event-Driven Architectures**: SSE enables efficient server-push notifications without the overhead of maintaining WebSocket connections.

## Supported Non-HTTP Protocols

Tyk currently supports the following non-HTTP protocols:

1. **[TCP Proxy]({{< ref "key-concepts/tcp-proxy" >}})**

2. **[gRPC]({{< ref "api-management/non-http-protocols/grpc" >}})**

3. **[Server-Sent Events (SSE)]({{< ref "api-management/non-http-protocols/sse" >}})**

4. **[WebSockets]({{< ref "api-management/non-http-protocols/websockets" >}})**