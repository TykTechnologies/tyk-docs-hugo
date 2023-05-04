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
#### What is an extension orphan?

An extension orphan is an unresolved extension of a type after federation has completed. This will cause federation to fail and produce an error.

#### How could an extension orphan occur?

You may extend a type within a subgraph where the base type (the original definition of that type) is in another subgraph. This means that it is only after the creation of the supergraph that it can be determined whether the extension was valid. If the extension was invalid or was otherwise unresolved, an “extension orphan” would remain in the supergraph.

For example, the type named Person does not need to be defined in **Subgraph 1**, but it must be defined in exactly one subgraph (see **Shared Types**: extension of shared types is not possible, so extending a type that is defined in multiple subgraphs will produce an error).

**Subgraph 1**

```graphql
extend type Person {
  name: String!
}
```

If the type named Person were not defined in exactly one subgraph, federation will fail and produce an error.