---
title: "GraphQL Schema Types"
date: 2025-08-08
aliases:
  - /graphql/schema-types/
description: "Understanding GraphQL schema types and how they work with Tyk"
tags: ["GraphQL", "Schema", "Types", "Custom Scalars"]
---

## Introduction

When working with GraphQL APIs in Tyk, understanding the different schema types is important for proper API design and implementation. This page covers the standard types supported by Tyk, custom scalar types, and best practices for type definitions.

## Standard GraphQL Types

Tyk supports all standard GraphQL types as defined in the [GraphQL specification](https://spec.graphql.org/October2021/):

### Scalar Types
- `Int`: 32-bit integer
- `Float`: Double-precision floating-point value
- `String`: UTF-8 character sequence
- `Boolean`: `true` or `false`
- `ID`: Unique identifier, serialized as a String

### Object Types
```graphql
type User {
  id: ID!
  name: String!
  age: Int
  isActive: Boolean
}
```

### Interface Types
Interfaces are abstract types that define a set of fields that implementing object types must include.

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
  email: String
}

type Product implements Node {
  id: ID!
  name: String!
  price: Float!
}
```

### Union Types
Unions represent an object that could be one of several object types, but don't share common fields like interfaces.

```graphql
union SearchResult = User | Product | Article

type Query {
  search(term: String!): [SearchResult!]!
}
```

When querying a union, you need to use inline fragments:

```graphql
{
  search(term: "example") {
    ... on User { id name }
    ... on Product { id price }
    ... on Article { title content }
  }
}
```

### Input Types
```graphql
input UserInput {
  name: String!
  age: Int
  email: String!
}
```

### Enum Types
```graphql
enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}
```

### List and Non-Null Types
GraphQL provides two type modifiers:

- Non-Null (`!`): Indicates that the value cannot be null
- List (`[]`): Indicates that the value is an array of the specified type

These modifiers can be combined:

```graphql
type Collection {
  requiredItemsRequired: [Item!]!  # Non-null list of non-null items
  optionalItemsRequired: [String!]  # Nullable list of non-null items
  requiredItemsOptional: [String]!  # Non-null list of nullable items
  optionalItemsOptional: [String]   # Nullable list of nullable items
}
```

## Custom Scalar Types

### Implementation in Tyk
Tyk supports custom scalar types through the underlying GraphQL engine. While Tyk passes custom scalar values through its system, the actual validation, parsing, and serialization of these values should be implemented in your upstream service.

### Using the @specifiedBy Directive
The `@specifiedBy` directive allows you to provide a URL to the specification for a custom scalar type:

```graphql
scalar DateTime @specifiedBy(url: "https://tools.ietf.org/html/rfc3339")
scalar UUID @specifiedBy(url: "https://tools.ietf.org/html/rfc4122")
```

### Common Custom Scalar Types

#### JSON Scalar
```graphql
scalar JSON

type Configuration {
  settings: JSON
}
```

#### Long/BigInt
```graphql
scalar Long

type Transaction {
  amount: Long
  timestamp: Long
}
```

#### DateTime
```graphql
scalar DateTime

type Event {
  startTime: DateTime
  endTime: DateTime
}
```

## GraphQL Federation Types

Tyk supports [GraphQL Federation]({{< ref "api-management/graphql#graphql-federation" >}}), which allows you to build a unified graph from multiple services.

### Entity Types with @key

```graphql
# In the Users service
type User @key(fields: "id") {
  id: ID!
  name: String!
  email: String!
}

# In the Orders service
type User @key(fields: "id") {
  id: ID!
  orders: [Order!]!
}
```

### Extended Types with @extends

```graphql
# In a service extending the User type
extend type User @key(fields: "id") {
  id: ID! @external
  reviews: [Review!]!
}
```

## Best Practices

### Type Definition Best Practices

1. **Use Non-Nullable Fields Wisely**
2. **Consistent Naming Conventions**: use `PascalCase` for types, `camelCase` for fields
3. **Input Type Naming**: CreateUserInput, UpdateUserInput
4. **Scalar Type Usage**: Use built-in scalars when possible, document custom scalars with `@specifiedBy`
5. **Interface and Union Usage**: Use interfaces for common fields, unions for different types

### Limitations and Considerations

1. **Custom Scalar Validation**: Implemented in upstream service
2. **Schema Evolution**: Start with nullable fields, use deprecation before removing
3. **Performance Considerations**: Limit nesting depth, use pagination
4. **Federation Considerations**: Ensure consistent entity keys across services

## Type System Example

This example demonstrates a complete type system using various GraphQL types and following best practices for schema design.

```graphql
# Custom scalars
scalar DateTime @specifiedBy(url: "https://tools.ietf.org/html/rfc3339")
scalar JSON

# Interfaces
interface Node {
  id: ID!
}

# Enums
enum Status {
  ACTIVE
  PENDING
  INACTIVE
}

# Input types
input ProductInput {
  name: String!
  description: String
  price: Float!
  metadata: JSON
}

# Object types
type Product implements Node {
  id: ID!
  name: String!
  description: String
  price: Float!
  status: Status!
  createdAt: DateTime!
  metadata: JSON
}

# Query and Mutation types
type Query {
  getProduct(id: ID!): Product
  listProducts(status: Status): [Product!]!
}

type Mutation {
  createProduct(input: ProductInput!): Product!
  updateProduct(id: ID!, input: ProductInput!): Product!
}
```