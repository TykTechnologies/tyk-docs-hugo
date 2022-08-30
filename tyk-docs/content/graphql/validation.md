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

In order to prevent errors happening during request processing or sending invalid queries to the upstream Tyk supports the validation of GraphQL queries and schemas.

## Query Validation
Tyk's native GraphQL engine supports validating GraphQL queries based on the [GraphQL Specification](http://spec.graphql.org/June2018/).

Both the GraphQL engine in front of your existing GraphQL API as well as any Universal Data Graph you build gets protected with a validation middleware.

This means, no invalid request will be forwarded to your upstream.
The Gateway will already catch the error and return it to the client.

## Schema Validation
A broken schema can lead to undesired behaviors of the API including queries not being processed by the GraphQL middleware. As the search for the root cause for 
such a malfunction can be tedious, Tyk provides schema validation.

{{< note success >}}
**Note**  

Schema validation is only available when using the Dashboard or Dashboard API.
{{< /note >}}

The schema validation will prevent you from saving or updating an API with a broken schema. This includes schemas breaking the following rules:
 - No duplicated operation types (Query, Mutation, Subscription)
 - No duplicated type names
 - No duplicated field names
 - No duplicated enum values
 - No usage of unknown types

When using the Dashboard API the response for a broken schema will be a *400 Bad Request* with a body containing the validation errors. For example:
```
{
  "Status": "Error",
  "Message": "Invalid GraphQL schema",
  "Meta":null,
  "Errors": [
    "field 'Query.foo' can only be defined once"
  ]
}
```
