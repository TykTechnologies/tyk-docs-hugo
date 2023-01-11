---
title: "GraphQL Subscriptions"
date: 2021-09-01
tags: [""]
description: ""
menu:
  main:
    parent: "Key Concepts"
weight: 120
---

{{< toc >}}

### Introduction

Subscriptions is new functionality added in version `4.0.0` In simple terms subscriptions are a way to push data from the server to the clients that choose to listen to real-time messages from the server.

In Tyk subscriptions are using the [WebSocket transport](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for connections between the client and Gateway. For connections between Gateway and upstream WebSockets or [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) can be used.

### Supported transports and protocols

| Transport | Protocol |
| ----------- | ----------- |
| WebSockets | [graphql-ws](http://github.com/apollographql/subscriptions-transport-ws) (default, no longer maintained) |
| WebSockets | [graphql-transport-ws](http://github.com/enisdenjo/graphql-ws) |
| HTTP | [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) |

{{< note success >}}
**Note**  

Connections between client and Gateway currently only supports WebSockets/graphql-ws.
See [GraphQL WebSockets]({{< ref "/graphql/graphql-websockets" >}}) for more information.
{{< /note >}}
{{< note >}}
**Note**  

If the upstream subscription api is protected please enable the authentication via query params to pass header through.

{{< /note >}}
### Subscriptions schema

The `Subscription` type always defines the top-level fields that consumers can subscribe to. For example:

```graphql
type Subscription {
  reviewCreated: Post
}
```

The `reviewCreated` field will be updated each time a new review is published. Publishing a new review means a `Post` is created on the backend and then pushed to the subscribing consumers.

Consumers can subscribe to the `reviewCreated` field by sending the following query to the server:

```graphql
subscription Reviews {
  reviewCreated {
    author
    date
    review
  }
}
```

### Enabling subscriptions

There is no need to enable subscriptions separately. They are supported alongside with GraphQL as a standard. The only requirement for subscriptions to work is to [enable WebSockets]({{< ref "/content/graphql/graphql-websockets.md" >}}) in your Tyk Gateway configuration file.

### How do subscriptions work in Tyk?

{{< img src="/img/dashboard/graphql/tyk-subscriptions-workflow.png" alt="Tyk Subscriptions workflow" >}}

### How we are ahead of everyone else

With Tyk, subscriptions are supported in [federation]({{< ref "/content/getting-started/key-concepts/graphql-federation.md" >}}) as well. With version `4.0` you can federate GraphQL APIs that support subscriptions. Federating subscriptions means that events pushed to consumers can be enriched with information from other federated graphs without any additional work to get it working.

### Example of federation with subscriptions

We have 3 graphs that provide information about:

1. Users
2. Products
3. Reviews

#### Users

The `Users` service lists users who can add their reviews for different products:

```graphql
extend type Query {
  me: User
}

type User @key(fields: "id") {
  id: ID!
  username: String!
}
```

#### Products

The `Products` service contains a list of products offered where Product price and stock is implemented as a subscription:

```graphql
extend type Query {
  topProducts(first: Int = 5): [Product]
}

extend type Subscription {
  updatedPrice: Product!
  updateProductPrice(upc: String!): Product!
  stock: [Product!]
}

type Product @key(fields: "upc") {
  upc: String!
  name: String!
  price: Int!
  inStock: Int!
}
```

#### Reviews

The `Reviews` service holds all the opinions of users about certain products:

```graphql
type Review {
  body: String!
  author: User! @provides(fields: "username")
  product: Product!
}

extend type User @key(fields: "id") {
  id: ID! @external
  username: String! @external
  reviews: [Review]
}

extend type Product @key(fields: "upc") {
  upc: String! @external
  reviews: [Review]
}
```

With Tyk’s implementation of subscriptions and federation it is possible to create a subscription that’s enriched with data from other federated graphs:

```graphql
subscription {
updatedPrice{
  upc
  price
  name
  reviews {
    body
    author {
      username
      }
    }
  }
}
  ```

The `price` value will be pushed to consumers each time an item is sold, but the message will be enriched with data from the other subgraphs.

### Setting up subscription types via API definition

Subscription types or subscription transports/protocols are being set inside the `graphql` section of the API definition.

Depending on whether you want to configure GraphQL proxy-only, UDG, or GraphQL Federation there are different places for the configuration option.

The values for subscription types are the same on all API types:

| Subscription Type | Value inside API definition |
| ----------- | ----------- |
| WebSocket `graphql-ws` | `"graphql-ws"`
||`""`|
||*omitted key and value*|
| WebSocket `graphql-transport-ws` | `"graphql-transport-ws"` |
| Server-Sent Events (SSE) | `"SSE"` |

#### GraphQL proxy-only

*e.g. SSE*

* `execution_mode` should be `proxyOnly`
* set `subscription_type` inside of `proxy` to a supported value

```
{
  ...
  "graphql": {
      "schema": "type Query {\n  hello: String!\n}\n\ntype Subscription {\n  countdown(from: Int!): Int!\n}",
      "enabled": true,
      "engine": {
        "field_configs": [],
        "data_sources": []
      },
      "type_field_configurations": [],
      "execution_mode": "proxyOnly",
      "proxy": {
        "auth_headers": {},
        "subscription_type": "sse"
      },
      "subgraph": {
        "sdl": ""
      },
      "supergraph": {
        "subgraphs": [,
        "merged_sdl": "",
        "global_headers": {},
        "disable_query_batching": false
      },
      "version": "2",
      "playground": {
        "enabled": false,
        "path": ""
      },
      "last_schema_update": "2022-10-20T11:45:56.252+02:00"
    },
}
```

#### Federation Subgraph

*e.g. WebSocket `graphql-transport-ws`*

* `execution_mode` should be `subgraph`
* set `subscription_type` inside of `proxy` to a supported value

```
{
  ...
  "graphql": {
      "schema": "directive @external on FIELD_DEFINITION\n\ndirective @requires(fields: _FieldSet!) on FIELD_DEFINITION\n\ndirective @provides(fields: _FieldSet!) on FIELD_DEFINITION\n\ndirective @key(fields: _FieldSet!) on OBJECT | INTERFACE\n\ndirective @extends on OBJECT\n\nscalar _Any\n\nunion _Entity = Product\n\nscalar _FieldSet\n\ntype _Service {\n  sdl: String\n}\n\ntype Entity {\n  findProductByUpc(upc: String!): Product!\n}\n\ntype Product {\n  upc: String!\n  name: String!\n  price: Int!\n  inStock: Int!\n}\n\ntype Query {\n  topProducts(first: Int = 5): [Product]\n  _entities(representations: [_Any!]!): [_Entity]!\n  _service: _Service!\n}\n\ntype Subscription {\n  updatedPrice: Product!\n  updateProductPrice(upc: String!): Product!\n  stock: [Product!]\n}\n",
      "enabled": true,
      "engine": {
        "field_configs": [],
        "data_sources": []
      },
      "type_field_configurations": [],
      "execution_mode": "subgraph",
      "proxy": {
        "auth_headers": {},
        "subscription_type": "graphql-transport-ws"
      },
      "subgraph": {
        "sdl": "extend type Query {\n    topProducts(first: Int = 5): [Product]\n}\n\nextend type Subscription {\n    updatedPrice: Product!\n    updateProductPrice(upc: String!): Product!\n    stock: [Product!]\n}\n\ntype Product @key(fields: \"upc\") {\n    upc: String!\n    name: String!\n    price: Int!\n    inStock: Int!\n}"
      },
      "supergraph": {
        "subgraphs": [],
        "merged_sdl": "",
        "global_headers": {},
        "disable_query_batching": false
      },
      "version": "2",
      "playground": {
        "enabled": false,
        "path": ""
      },
      "last_schema_update": "2021-10-25T13:28:10.688+02:00"
    },
}
```

#### Federation Supergraph

*e.g. `SSE` for external upstream*

* `execution_mode` should be `supergraph`
* set `subscirption_type` of external subgraph entity to a supported value

```
{
  ...
  "graphql": {
      "schema": "type Query {\n  me: User\n  topProducts(first: Int = 5): [Product]\n}\n\ntype Subscription {\n  updatedPrice: Product!\n  updateProductPrice(upc: String!): Product!\n  stock: [Product!]\n}\n\ntype User {\n  id: ID!\n  username: String!\n  reviews: [Review]\n}\n\ntype Product {\n  upc: String!\n  name: String!\n  price: Int!\n  inStock: Int!\n  reviews: [Review]\n}\n\ntype Review {\n  body: String!\n  author: User!\n  product: Product!\n}",
      "enabled": true,
      "engine": {
        "field_configs": [],
        "data_sources": []
      },
      "type_field_configurations": [],
      "execution_mode": "supergraph",
      "proxy": {
        "auth_headers": {},
        "subscription_type": ""
      },
      "subgraph": {
        "sdl": ""
      },
      "supergraph": {
        "updated_at": "2021-10-25T13:31:16.481+02:00",
        "subgraphs": [
          {
            "api_id": "",
            "name": "sub-users",
            "url": "https://users.external-upstream.fake/query",
            "sdl": "extend type Query {\n    me: User\n}\n\ntype User @key(fields: \"id\") {\n    id: ID!\n    username: String!\n}\n",
            "headers": null,
            "subscription_type": "sse"
          },
          {
            "api_id": "834af5ae65114eef78fd55851ae3c17e",
            "name": "sub-products",
            "url": "tyk://sub-products",
            "sdl": "extend type Query {\n    topProducts(first: Int = 5): [Product]\n}\n\nextend type Subscription {\n    updatedPrice: Product!\n    updateProductPrice(upc: String!): Product!\n    stock: [Product!]\n}\n\ntype Product @key(fields: \"upc\") {\n    upc: String!\n    name: String!\n    price: Int!\n    inStock: Int!\n}",
            "headers": null,
          },
          {
            "api_id": "5924fd3b332e43a87c235e43b52eda52",
            "name": "sub-reviews",
            "url": "tyk://sub-reviews",
            "sdl": "type Review {\n    body: String!\n    author: User! @provides(fields: \"username\")\n    product: Product!\n}\n\nextend type User @key(fields: \"id\") {\n    id: ID! @external\n    username: String! @external\n    reviews: [Review]\n}\n\nextend type Product @key(fields: \"upc\") {\n    upc: String! @external\n    reviews: [Review]\n}\n",
            "headers": null,
          }
        ],
        "merged_sdl": "type Query {\n  me: User\n  topProducts(first: Int = 5): [Product]\n}\n\ntype Subscription {\n  updatedPrice: Product!\n  updateProductPrice(upc: String!): Product!\n  stock: [Product!]\n}\n\ntype User {\n  id: ID!\n  username: String!\n  reviews: [Review]\n}\n\ntype Product {\n  upc: String!\n  name: String!\n  price: Int!\n  inStock: Int!\n  reviews: [Review]\n}\n\ntype Review {\n  body: String!\n  author: User!\n  product: Product!\n}",
        "global_headers": {},
        "disable_query_batching": false
      },
      "version": "2",
      "playground": {
        "enabled": false,
        "path": ""
      },
      "last_schema_update": "2021-10-25T13:31:16.481+02:00"
    },
}
```

#### Universal Data Graph

*e.g. WebSocket `graphql-ws`*

* `execution_mode` should be `executionEngine`
* set `subscription_type` of the `data_soruces.config` entry to a supported value

```
"graphql": {
      "schema": "type Query {\n  hello: String!\n  sse: Boolean!\n  tws: Boolean!\n}\n\ntype Subscription {\n  countdown(from: Int!): Int!\n}",
      "enabled": true,
      "engine": {
        "field_configs": [
          {
            "type_name": "Subscription",
            "field_name": "countdown",
            "disable_default_mapping": false,
            "path": [
              "countdown"
            ]
          }
        ],
        "data_sources": [
          {
            "kind": "GraphQL",
            "name": "graphql-ws-data-source",
            "internal": false,
            "root_fields": [
              {
                "type": "Query",
                "fields": [
                  "hello",
                  "tws"
                ]
              },
              {
                "type": "Subscription",
                "fields": [
                  "countdown"
                ]
              }
            ],
            "config": {
              "url": "http://localhost:4001/graphql",
              "method": "POST",
              "headers": {},
              "default_type_name": "String",
              "subscription_type": "graphql-ws"
            }
          }
        ]
      },
      "type_field_configurations": [],
      "execution_mode": "executionEngine",
      "proxy": {
        "auth_headers": {},
        "subscription_type": ""
      },
      "subgraph": {
        "sdl": ""
      },
      "supergraph": {
        "subgraphs": [],
        "merged_sdl": "",
        "global_headers": {},
        "disable_query_batching": false
      },
      "version": "2",
      "playground": {
        "enabled": false,
        "path": ""
      },
      "last_schema_update": "2022-10-13T10:27:40.972+02:00"
    },
```
