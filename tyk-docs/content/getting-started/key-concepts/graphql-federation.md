---
title: "GraphQL Federation Overview"
date: 2021-09-01
tags: [""]
description: ""
menu:
  main:
    parent: "Key Concepts"
weight: 110
aliases:
  - /getting-started/key-concepts/creating-a-subgraph
  - /getting-started/key-concepts/graphql-overview
---

### Federation Version Support

Tyk supports Federation v1

### What is federation?

Ease-of-use is an important factor when adopting GraphQL either as a provider or a consumer. Modern enterprises have dozens of backend services and need a way to provide a unified interface for querying them. Building a single, monolithic GraphQL service is not the best option. It leads to a lot of dependencies, over-complication and is hard to maintain.

To remedy this, Tyk, with release 4.0 offers GraphQL federation that allows you to divide GQL implementation across multiple back-end services, while still exposing them all as a single graph for the consumers.

{{< img src="/img/dashboard/graphql/diagram_graphql-federation-B.png" alt="GraphQL federation flowchart" >}}

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

### Creating a subgraph via the Dasboard UI

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

### Creating a subgraph via the Dasboard UI

1. Log in to the Dashboard and go to APIs > Add New API > Federation > Subgraph.
{{< img src="/img/dashboard/graphql/add-subgraph-api.png" alt="Add federation subgraph" >}}

2. Choose a name for the subgraph and provide an upstream URL.

{{< note success >}}
Note

In case your upstream URL is protected, select **Upstream Protected** and provide authorisation details (either Header or Certificate information).

{{< /note >}}

{{< img src="/img/dashboard/graphql/subgraph-upstream-url.png" alt="Add upstream URL" >}}

3. Go to Configure API and configure your subgraph just as you would any other API in Tyk.

{{< note success >}}
Note

In v4.0 subgraphs will be set to **Internal** by default.

{{< /note >}}

4. Once you have configured all the options click Save. The subgraph is now visible in the list of APIs.
{{< img src="/img/dashboard/graphql/subgraph-api-listing.png" alt="Subgraph API listing" >}}

### Creating a supergraph via the Dasboard UI
1. Log in to the Dashboard and go to APIs > Add New API > Federation > Supergraph.
{{< img src="/img/dashboard/graphql/add-supergraph-api.png" alt="Add supergraph API" >}}

2. In the Details section select all the subgraphs that will be included in your supergraph.
{{< img src="/img/dashboard/graphql/select-subgraphs.png" alt="Select subgraphs" >}}

3. Go to Configure API and configure your supergraph just as you would any other API in Tyk.
4. Once you configure all the options click Save. The supergraph is now available in your list of APIs.
{{< img src="/img/dashboard/graphql/supergraph-api-listing.png" alt="Supergraph API listing" >}}

### Defining Headers
In v4.0 you can define global (Supergraph) headers. Global headers are forwarded to all subgraphs that apply to the specific upstream request.

#### Setting a Global Header

1. After creating your supergraph, open the API in your Dashboard.
2. From the Subgraphs tab click Global Headers.
{{< img src="/img/dashboard/graphql/global-header1.png" alt="Global Header setup for a supergraph" >}}

3. Enter your header name and value. You can add more headers by clicking Add Headers.
{{< img src="/img/dashboard/graphql/global-header2.png" alt="Add further Global headers in a supergraph" >}}

4. Click **Update** to save the header.
5. On the pop-up that is displayed, click Update API.
6. If you want to delete a global header, click the appropriate bin icon for it.
7. You can update your headers by repeating steps 2-5.