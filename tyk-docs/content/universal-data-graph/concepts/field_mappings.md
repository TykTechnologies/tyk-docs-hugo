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

Universal Data Graph can automatically resolve where data source information should go in the GraphQL response as long as the GraphQL schema mirrors the data source response structure.

Let's assume you have a REST API with a user resource like this: `http://example.com/users/:id`

The following is an example response:

```json
{
  "id": 1,
  "name": "Martin Buhr"
}
```

If GraphQL schema in UDG is set as the following:
```graphql
type Query {
    user(id: Int!): User
}

type User {
    id: Int!
    name: String
}
```
and REST data source at attached behind `user(id: Int!)` query, UDG will be able to automatically resolve where `id` and `name` values should be in UDG response. In this case no field mapping is necessary.

{{< note success >}}
**Note**  

GraphQL does not support field names with hyphens (e.g. `"user-name"`). This can be resolved by using field mappings as described below. 
{{< /note >}}

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

In cases where the JSON response from the data source is wrapped with `[]` like this:

```json
[
  {
  "id": 1,
  "user": "Martin Buhr"
  }
]
```
UDG will not be able to automatically parse `id` and `name` and fields mapping needs to be used as well. To get the response from inside the brackets the following syntax has to be used in field mapping: `[0]`.

It is also possible to use this syntax for nested paths. For example: `[0].user.phone-number`

### Field mapping in Tyk Dashboard

See below how to configure the field mapping for each individual field.

{{< img src="/img/dashboard/udg/concepts/field_mappings.png" alt="Field mapping UI" >}}


### Field mapping in Tyk API definition

If you're working with raw Tyk API definition the field mapping settings look like this:

```json
{"graphql": {
      "engine": {
        "field_configs": [
          {
            "type_name": "User",
            "field_name": "phoneNumber",
            "disable_default_mapping": false,
            "path": [
              "[0]",
              "user",
              "phone-number"
            ]
          }
        ]
      }
    }
  }
```

Notice that even though in Tyk Dashboard the nested path has a syntax with ( . ), in Tyk API definition it becomes an array of strings.