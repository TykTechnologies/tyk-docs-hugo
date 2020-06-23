---
title: "Validation"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 1
aliases:
    - /graphql/validation/
---

Tyk's native GraphQL engine supports validating GraphQL queries based on the [GraphQL Specification](http://spec.graphql.org/June2018/).

Both the GraphQL engine in front of your existing GraphQL API as well as any Universal Data Graph you build gets protected with a validation middleware.

This means, no invalid request will be forwarded to your upstream.
The Gateway will already catch the error and return it to the client.