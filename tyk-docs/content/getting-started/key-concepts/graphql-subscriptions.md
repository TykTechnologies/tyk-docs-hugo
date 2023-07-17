---
title: "GraphQL Subscriptions"
date: 2021-09-01
tags: [""]
description: ""
menu:
  main:
    parent: "GraphQL"
weight: 11
---

Tyk **natively** supports also GraphQL subscriptions, so you can expose your full range of GQL operations using Tyk Gateway. Subscriptions support was added in `v4.0.0` in which *graphql-ws* protocol support was introduced. 

With the release of Tyk `v4.3.0` the number of supported subscription protocols has been extended.

In Tyk subscriptions are using the [WebSocket transport](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for connections between the client and Gateway. For connections between Gateway and upstream WebSockets or [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) can be used.

### Supported transports and protocols

| Transport  | Protocol                                                                                                                 |
|------------|--------------------------------------------------------------------------------------------------------------------------|
| WebSockets | [graphql-ws](http://github.com/apollographql/subscriptions-transport-ws) (default, no longer maintained)                 |
| WebSockets | [graphql-transport-ws](http://github.com/enisdenjo/graphql-ws)                                                           |
| HTTP       | [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) |

#### Setting up subscription types via API definition
Subscription types or subscription transports/protocols are set inside the graphql section of the API definition.

Depending on whether you want to configure GraphQL proxy-only, UDG, or GraphQL Federation there are different places for the configuration option.

The values for subscription types are the same on all API types:
- `graphql-ws`
- `graphql-transport-ws`
- `sse` (Server-Sent Events)

##### GraphQL Proxy

```
{
  ...,
  "graphql": {
    ...,
    "proxy": {
      ...,
      "subscription_type": "graphql-ws"
    }
  }
}
```

##### Universal Data Graph

```
{
  ...,
  "graphql": {
    ...,
    "engine": {
      ...,
      "data_sources": [
        ...,
        {
          ...,
          "subscription_type": "sse"
        }
      ]
    }
  }
}
```

##### Federation

```
{
  ...,
  "graphql": {
    ...,
    "supergraph": {
      ...,
      "subgraphs": [
        ...,
        {
          ...,
          "subscription_type": "graphql-transport-ws"
        }
      ]
    }
  }
}
```

{{< note >}}
**Note**  

Connections between client and Gateway currently only supports WebSockets/graphql-ws.
See [GraphQL WebSockets]({{< ref "graphql/graphql-websockets" >}}) for more information.
{{< /note >}}

{{< note >}}
**Note**  

If the upstream subscription GraphQL API is protected please enable the authentication via query params to pass the header through.

{{< /note >}}

There is no need to enable subscriptions separately. They are supported alongside GraphQL as a standard. The only requirement for subscriptions to work is to [enable WebSockets]({{< ref "graphql/graphql-websockets.md" >}}) in your Tyk Gateway configuration file.

Here's a general sequence diagram showing how subscriptions in Tyk work exactly:

{{< img src="img/dashboard/graphql/tyk-subscriptions-workflow.png" alt="Tyk Subscriptions workflow" >}}