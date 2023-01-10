---
title: "GraphQL Extension Orphans"
date: 2022-09-29
tags: [""]
description: ""
menu:
  main:
    parent: "GraphQL Federation Overview"
weight: 2
---

**Insert Lead paragraph here.**

### Subgraphs and supergraphs

**Subgraph** is a representation of a back-end service and defines a distinct GraphQL schema. It can be queried directly as a separate service or it can be federated into a larger schema of a supergraph.

**Supergraph** is a composition of several subgraphs that allows the execution of a query across multiple services in the backend.

### Subgraphs examples

**Users**

```graphql
extend type Query {
  me: User
}

type User @key(fields: "id") {
  id: ID!
  username: String!
}
```
**Products**

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

**Reviews**

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
### Subgraph conventions

- A subgraph can reference a type that is defined by a different subgraph. For example, the Review type defined in the last subgraph includes an `author` field with type `User`, which is defined in a different subgraph.

- A subgraph can extend a type defined in another subgraph. For example, the Reviews subgraph extends the Product type by adding a `reviews` field to it.

- A subgraph has to add a `@key` directive to an object’s type definition so that other subgraphs can reference or extend that type. The `@key` directive makes an object type an entity.

### Supergraph schema
After creating all the above subgraphs in Tyk, they can be federated in your Tyk Gateway into a single supergraph. The schema of that supergraph will look like this:

```graphql
type Query {
  topProducts(first: Int = 5): [Product]
  me: User
}

type Subscription {
  updatedPrice: Product!
  updateProductPrice(upc: String!): Product!
  stock: [Product!]
}

type Review {
  body: String!
  author: User!
  product: Product!
}

type Product {
  upc: String!
  name: String!
  price: Int!
  inStock: Int!
  reviews: [Review]
}

type User {
  id: ID!
  username: String!
  reviews: [Review]
}
```