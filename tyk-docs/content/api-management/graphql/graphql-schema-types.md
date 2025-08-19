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

Scalar types are the fundamental building blocks of your schema, representing actual data values.

- `Int`: 32-bit integer
- `Float`: Double-precision floating-point value
- `String`: UTF-8 character sequence
- `Boolean`: `true` or `false`
- `ID`: Unique identifier, serialized as a String

### Object Types

Object types define collections of fields and are the most common type in GraphQL schemas. They model complex entities and can include fields of any type, enabling rich, nested data structures.

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

Input types are special object types used specifically for arguments. They make complex operations more manageable by grouping related arguments, particularly useful for mutations.

```graphql
input UserInput {
  name: String!
  age: Int
  email: String!
}
```

### Enum Types

Enums restrict fields to specific allowed values, improving type safety and self-documentation in your API.

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
  nestedRequiredItemsRequired: [[String!]!]!   # nested non-nullable list in non-nullable list with non-null items
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

The JSON scalar handles arbitrary JSON data, useful for dynamic structures without defining every possible field.

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

{{< note success >}}

**Note:**

According to the [GraphQL spec](https://spec.graphql.org/), `Long/BigInt` values must be serialized as **strings** (IEEE standard). Some libraries incorrectly serialize them as numbers, which can lead to compatibility issues.

Tyk’s GraphQL engine expects `Long` values to be serialized as strings to ensure interoperability.

{{< /note >}}

**Example:**

```json
{
  "amount": "9223372036854775807",
  "timestamp": "1690991344000"
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

Tyk supports [GraphQL Federation v1]({{< ref "api-management/graphql#graphql-federation" >}}) for building unified APIs across multiple services.

### Entity Types with @key

The @key directive is fundamental to federation. It identifies fields that can be used to uniquely identify entities across services:

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

In this example:
- The `User` type is defined in both services
- The `@key` directive specifies that `id` is the field that uniquely identifies a User
- The Users service owns the core User fields (id, name, email)
- The Orders service extends User to add the orders field

When a client queries for a User with their orders, Tyk's federation engine knows how to fetch the core User data from the Users service and the orders data from the Orders service, then combine them into a single response.

### Extended Types with @external

The `@external` directive explicitly indicates that a type extends an entity defined in another service:

```graphql
# In a service extending the User type
extend type User @key(fields: "id") {
  id: ID! @external
  reviews: [Review!]!
}
```

In this example:
- The `extend` keyword and `@external` directive indicate this is extending the User type
- The `@external` directive on the `id` field indicates this field is defined in another service
- This service adds the `reviews` field to the User type

## Best Practices

### Type Definition Best Practices

1. **Use Non-Nullable Fields Wisely**
   Consider future API evolution when deciding which fields should be non-nullable.

2. **Consistent Naming Conventions**
   Use PascalCase for type names, camelCase for field names, and ALL_CAPS for enum values.

3. **Input Type Naming**
   Name input types clearly to indicate their purpose (e.g., CreateUserInput, UpdateUserInput).

4. **Scalar Type Usage**
   Choose appropriate scalar types based on semantic meaning, not just data format.

5. **Interface and Union Usage**
   Use interfaces for shared fields and unions for different types that might be returned from the same field.

### Limitations and Considerations

1. **Custom Scalar Validation**
   Ensure your upstream service properly validates custom scalar values.

2. **Schema Evolution**
   Start with nullable fields when unsure about requirements and use deprecation before removing fields.

3. **Performance Considerations**
   Limit nesting depth in types and consider pagination for list fields.

## Type System Example

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