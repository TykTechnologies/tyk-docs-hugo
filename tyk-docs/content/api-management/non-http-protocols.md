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

Tyk primarily focuses on the HTTP/HTTPS protocol for handling and modeling traffic. However, with the growing popularity of WebSocket- and gRPC-based APIs, Tyk also supports transparent proxying for both TLS and non-TLS connections.