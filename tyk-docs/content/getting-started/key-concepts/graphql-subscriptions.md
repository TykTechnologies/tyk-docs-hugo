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

Subscriptions is new functionality added in version 4.0 In simple terms subscriptions are a way to push data from the server to the clients that choose to listen to real-time messages from the server.

In Tyk subscriptions are using the [WebSocket protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
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

With Tyk, subscriptions are supported in [federation]({{< ref "/content/getting-started/key-concepts/graphql-federation.md" >}}) as well. With version 4.0 you can federate GraphQL APIs that support subscriptions. Federating subscriptions means that events pushed to consumers can be enriched with information from other federated graphs.

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