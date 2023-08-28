---
title: "GraphQL WebSockets"
date: 2021-05-05
tags: ["GraphQL", "WebSockets"]
description: "How to enable the WebSocket protocol support for GraphQL APIs in Tyk v3.2"
menu:
  main:
    parent: "GraphQL"
weight: 10
aliases:
    - /graphql/websockets/
---

Tyk supports GraphQL via WebSockets using the protocols _graphql-transport-ws_ or _graphql-ws_ between client and Tyk Gateway.

Before this feature can be used, WebSockets need to be enabled in the Tyk Gateway configuration. To enable it set [http_server_options.enable_websockets]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_websockets" >}}) to `true` in your `tyk.conf` file.

{{< tabs_start >}}
{{< tab_start "graphql-transport-ws" >}}
In order to upgrade the HTTP connection for a GraphQL API to WebSockets by using the _graphql-transport-ws_ protocol, the request should contain following headers:

```
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: <random key>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: graphql-transport-ws
```

**Messages**

The connection needs to be initialised before sending Queries, Mutations, or Subscriptions via WebSockets:

```
{ "type": "connection_init" }
```

Always send unique IDs for different Queries, Mutations, or Subscriptions.

For Queries and Mutations, the Tyk Gateway will respond with a `complete` message, including the GraphQL response inside the payload.

For Subscriptions, the Tyk Gateway will respond with a stream of `next` messages containing the GraphQL response inside the payload until the data stream ends with a `complete` message. It can happen infinitely if desired.

{{< note >}}
**Note**

Be aware of those behaviors:
  - If no `connection_init` message is sent after 15 seconds after opening, then the connection will be closed.
  - If a duplicated ID is used, the connection will be closed.
  - If an invalid message type is sent, the connection will be closed.
{{< /note >}}

### Examples

**Sending queries**

```
{"id":"1","type":"subscribe","payload":{"query":"{ hello }"}}
```

**Sending mutations**

```
{"id":"2","type":"subscribe","payload":{"query":"mutation SavePing { savePing }"}}
```

**Starting and stopping Subscriptions**

```
{"id":"3","type":"subscribe","payload":{"query":"subscription { countdown(from:10) }" }}
```
```
{"id":"3","type":"complete"}
```
{{< tab_end >}}
{{< tab_start "graphql-ws" >}}
In order to upgrade the HTTP connection for a GraphQL API to WebSockets by using the _graphql-ws_ protocol, the request should contain following headers:

```
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: <random key>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: graphql-ws
```

**Messages**

The connection needs to be initialised before sending Queries, Mutations, or Subscriptions via WebSockets:

```
{ "type": "connection_init" }
```

Always send unique IDs for different Queries, Mutations, or Subscriptions.

For Queries and Mutations, the Tyk Gateway will respond with a `complete` message, including the GraphQL response inside the payload.

For Subscriptions, the Tyk Gateway will respond with a stream of `data` messages containing the GraphQL response inside the payload until the data stream ends with a `complete` message. It can happen infinitely if desired.

### Examples

**Sending queries**

```
{"id":"1","type":"start","payload":{"query":"{ hello }"}}
```

**Sending mutations**

```
{"id":"2","type":"start","payload":{"query":"mutation SavePing { savePing }"}}
```

**Starting and stopping Subscriptions**

```
{"id":"3","type":"start","payload":{"query":"subscription { countdown(from:10) }" }}
```
```
{"id":"3","type":"stop"}
```
{{< tab_end >}}
{{< tabs_end >}}

### Upstream connections

For setting up upstream connections (between Tyk Gateway and Upstream) please refer to the [GraphQL Subscriptions Key Concept]({{< ref "/getting-started/key-concepts/graphql-subscriptions" >}}).
