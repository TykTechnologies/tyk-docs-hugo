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

Tyk supports all standard GraphQL types as defined in the GraphQL specification:

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

## Custom Scalar Types

### Important Note
All custom scalar types in Tyk are serialized as Strings in the underlying implementation. This means that while you can define custom scalars for better schema documentation and client-side validation, Tyk will handle them as string values internally.

### Common Custom Scalar Types

#### JSON Scalar
```graphql
scalar JSON

type Configuration {
  settings: JSON
}
```

The `JSON` scalar is useful for flexible data structures that don't need a strict schema.

#### Long/BigInt
```graphql
scalar Long

type Transaction {
  amount: Long
  timestamp: Long
}
```

Use `Long` for 64-bit integers that exceed the standard `Int` range.

#### BigDecimal
```graphql
scalar BigDecimal

type Product {
  price: BigDecimal
  weight: BigDecimal
}
```

`BigDecimal` is suitable for precise decimal calculations, especially in financial applications.

#### DateTime
```graphql
scalar DateTime

type Event {
  startTime: DateTime
  endTime: DateTime
}
```

### Implementing Custom Scalars

When implementing custom scalars in Tyk:

1. Define the scalar in your schema
2. Remember that all custom scalar values are handled as strings
3. Implement proper validation in your upstream service

Example implementation:
```graphql
scalar Date

type Query {
  getEventsByDate(date: Date!): [Event!]!
}
```

## Best Practices

### Type Definition Best Practices

1. **Use Non-Nullable Fields Wisely**
   - Mark required fields with `!`
   - Consider the impact on API evolution
   ```graphql
   type User {
     id: ID!           # Always required
     email: String!    # Always required
     nickname: String  # Optional
   }
   ```

2. **Consistent Naming Conventions**
   - Use PascalCase for type names
   - Use camelCase for field names
   - Use ALL_CAPS for enum values

3. **Input Type Naming**
   ```graphql
   input CreateUserInput {
     name: String!
     email: String!
   }
   
   input UpdateUserInput {
     name: String
     email: String
   }
   ```

4. **Scalar Type Usage**
   - Use built-in scalars when possible
   - Document custom scalars thoroughly
   - Consider validation requirements

### Limitations and Considerations

1. **Custom Scalar Serialization**
   - All custom scalars are serialized as strings
   - The upstream service must handle validation
   - Consider performance implications for large custom scalar values

2. **Schema Evolution**
   - Start with nullable fields when unsure about requirements
   - Consider backwards compatibility when making changes
   - Use deprecation before removing fields

3. **Performance Considerations**
   - Limit nesting depth in types
   - Consider pagination for list fields
   - Be cautious with recursive types

## Type System Example

```graphql
# Custom scalars
scalar DateTime
scalar JSON

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
type Product {
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

This example demonstrates a complete type system using various GraphQL types and following best practices for schema design.
