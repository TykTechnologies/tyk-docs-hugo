---
title: "GraphQL Entities"
date: 2022-09-29
tags: [""]
description: ""
menu:
  main:
    parent: "GraphQL Federation Overview"
weight: 1
---

### Defining the base entity

- Must be defined with the @key directive.
- The "fields" argument of the @key directive must reference a valid field that can uniquely identify the entity.
- Multiple primary keys are possible.

An example is provided below:

**Subgraph 1 (base entity)**

```graphql
type MyEntity @key(fields: "id") @key(fields: "name") {
  id: ID!
  name: String!
}
```

### Extending entities

Entities cannot be shared types (be defined in more than one single subgraph; see **Entity stubs** below).

The base entity remains unaware of fields added through extension; only the extension itself is aware of them.

Attempting to extend a non-entity with an extension that includes the @key directive or attempting to extend a base entity with an extension that does not include the @key directive will both result in errors.

The primary key reference should be listed as a field with the @external directive.

Below is an example extension for **MyEntity** (which was defined above in **Subgraph 1**):

**Subgraph 2 (extension):**

```graphql
extend type MyEntity @key(fields: "id") {
  id: ID! @external
  newField: String!
}
```

### Entity stubs
If one subgraph references a base entity (an entity defined in another subgraph) without adding new fields, that reference must be declared as a stub. In **federation v1**, stubs appear similar to extensions but do not add any new fields.

An entity stub contains the minimal amount of information necessary to identify the entity (referencing exactly one of the primary keys from the base entity regardless of whether there are multiple primary keys on the base entity).

The identifying primary key should feature the @external directive.

For example, a stub of **MyEntity** (which was defined above in **Subgraph 1**):

**Subgraph 3 (stub):**

```graphql
extend type MyEntity @key(fields: "id") {
  id: ID! @external
}
```

#### What is a shared type?
Types that are identical by name and structure and feature in more than one subgraph are shared types.

#### Can I extend a shared type?
Subgraphs are normalised before federation. This means you can extend a type if the resolution of the extension after normalisation is exactly identical to the resolution of the type after normalisation in other subgraphs.

Unless the resolution of the extension in a single subgraph is exactly identical to all other subgraphs, extension is not possible.

Here is a valid example where both subgraphs resolve to identical enums after normalisation:

**Subgraph 1:**

```graphql
enum Example {
  A,
  B
}

extend enum Example {
  C  
}
```

**Subgraph 2:**

```graphql
enum Example {
  A,
  B,
  C
}
```

Here, the enum named Example in **Subgraph 1** resolves to be identical to the enum named Example in **Subgraph 2**.

However, if we were to include **Subgraph 3**, which does not feature the “C” value, the enum is no longer identical in all 3 subgraphs. Consequently, federation would fail.

**Subgraph 3:**

```graphql
enum Example {
  A,
  B
}
```

