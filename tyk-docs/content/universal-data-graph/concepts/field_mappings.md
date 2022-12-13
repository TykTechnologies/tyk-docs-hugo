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

{{< note success >}}
**Note**  

GraphQL does not support field names with hyphens (e.g. `"user-name"`). This can be resolved by using field mappings as described below. 
{{< /note >}}

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
Next you attach the REST API to the field "user" on the type "Query".

The following is an example response:

```json
{
  "id": 1,
  "name": "Martin Buhr"
}
```

You need to formulate a GraphQL query to request this data:

```graphql
query TykCEO {
    user(id: 1) {
        id
        name
    }
}
```

If the GraphQL engine tries to resolve the field "user" on the type "Query" it will do the following steps:
1. Fetch the data from the REST API: example.com/user/1
2. Create the response object "user"
3. Try to set the field "id" & "name" on the response object "user" by accessing the JSON fields "user.id" and "user.name" on the response from the REST API

If read carefully, the problem can be identified:
The JSON path "user.id" & "user.name" will not return any data.
The correct path would be "id" and "name", respectively.

To fix this problem, you have to disable the field mapping on the field "user" to omit it from the JSON path.
The mapping for the fields "id" and "name" can stay default as the fields "id" and "name" exist on the JSON response.

Let's assume that the JSON response looked a little different:

````json
{
  "id": 1,
  "user_name": "Martin Buhr"
}
````

If this were the JSON response you received from the REST API, you must modify the path for the field "name".
This is achieved by unchecking the "Disable field mapping" checkbox and setting the Path to "user_name".

Nested paths can be defined using a period ( . ) to separate each segment of the JSON path, *e.g.*, "name.full_name" 

See below how to configure the field mapping for each individual field.  

![Create New API](img/dashboard/udg/concepts/field_mappings.png)
