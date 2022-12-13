---
title: "GraphQL WebSockets"
date: 2021-05-05
tags: ["GraphQL", "WebSockets"]
description: "How to enable the WebSocket protocol support for GraphQL APIs in Tyk v3.2"
menu:
  main:
    parent: "GraphQL"
weight: 2
aliases:
    - /graphql/websockets/
---

From version v3.2, Tyk also supports the GraphQL WebSockets protocol.

Before this feature can be used, WebSockets need to be enabled in the Tyk Gateway configuration. To enable it set [http_server_options.enable_websockets]({{< ref "tyk-oss-gateway/configuration/#http_server_optionsenable_websockets" >}}) to `true` in your `tyk.conf` file.

In order to upgrade the HTTP connection for a GraphQL API to WebSockets, the request should contain following headers:

```
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: <random key>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: graphql-ws
```