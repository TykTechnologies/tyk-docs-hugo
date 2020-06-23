---
title: "Concepts - Field Mappings"
date: 2020-06-03
menu:
  main:
    parent: "UDG Concepts"
weight: 2
aliases:
    - /universal-data-graph/data-sources/graphql
---

For field on your GraphQL schema you can define or disable field mappings.

The default behaviour of field mappings is that a field named "foo" expects a JSON value in the response with the same field name of "foo".
Field mappings are enabled by default for every field except for fields where a HTTP JSON DataSource is attached.

> **Note**: GraphQL does not support field names with hyphens (e.g. `"user-name"`). This can be resolved by using field mappings as described below. 

Consider the following GraphQL schema:

```graphql
type Query {
    user(id: Int!): User
}

type User {
    id: Int!
    name: String
}
```

Now let's assume you have a REST API with a user resource like this: example.com/users/:id
Next we attach the REST API to the field "user" on the type "Query".

Following might be an example response:

```json
{
  "id": 1,
  "name": "Martin Buhr"
}
```

In order to ask for this data we need to formulate a GraphQL query:

```graphql
query TykCEO {
    user(id: 1) {
        id
        name
    }
}
```

If the GraphQL engine tries to resolve the field "user" on the type "Query" it will do the following steps:
1. fetch the data from the REST API: example.com/user/1
2. create the response object "user"
3. try to set the field "id" & "name" on the response object "user" by accessing the JSON fields "user.id" and "user.name" on the response from the REST API

If you read carefully you can identify the problem already:
The JSON path "user.id" & "user.name" will not return any data.
The correct path would be "id" and "name" respectively.

To fix this problem we have to disable the field mapping on the field "user" so that it get's omitted from the JSON path.
The mapping for the fields "id" and "name" can stay default as the fields "id" and "name" exist on the JSON response.

Let's consider the JSON response looked a bit different:

````json
{
  "id": 1,
  "user_name": "Martin Buhr"
}
````

If this was the JSON response you get from the REST API you have to modify the path for the field "name".
You'd have to un-check the "Disable field name" checkbox and set the Path to "user_name".

Nested path's are also OK using dots to seperate each segment of the JSON path, e.g.: "name.full_name" 

See below how to configure the field mapping for each individual field.  

![Create New API](/docs/img/dashboard/udg/concepts/field_mappings.png)