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

From version v3.2, Tyk also supports the GraphQL WebSockets protocol (`graphql-ws`) between client and Tyk Gateway.

Before this feature can be used, WebSockets need to be enabled in the Tyk Gateway configuration. To enable it set [http_server_options.enable_websockets]({{ ref "tyk-oss-gateway/configuration#http_server_optionsenable_websockets" >}}) to `true` in your `tyk.conf` file.

In order to upgrade the HTTP connection for a GraphQL API to WebSockets, the request should contain following headers:

```
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: <random key>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: graphql-ws
```

**Messages**

Before sending Queries, Mutations, or Subscriptions via WebSockets the connection needs to be initialized:

```
{ "type": "connection_init" }
```

Always send unique IDs for different Queries, Mutations, or Subscriptions.

For Queries and Mutations, the Tyk Gateway will respond with a `complete` message including the GraphQL response inside of the payload.

For Subscriptions, the Tyk Gateway will respond with a stream of `data` messages containing the GraphQL response inside of the payload until the data stream ends with a `complete` message. It can happen infinitely if desired.

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

### Upstream connections

For setting up upstream connections (between Tyk Gateway and Upstream) please refer to the [GraphQL Subscriptions Key Concept]({{< ref "/getting-started/key-concepts/graphql-subscriptions/" >}}).
