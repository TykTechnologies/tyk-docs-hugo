---
title: "GraphQL Datasource"
date: 2020-06-03
menu:
  main:
    parent: "UDG DataSources"
weight: 2
aliases:
    - /universal-data-graph/data-sources/graphql
---

The GraphQL DataSource is able to make GraphQL queries to your upstream GraphQL service.
In terms of configuration there are no real differences between the GraphQL DataSource and the one for REST with one slight exception.

To illustrate this we'll have a look at an example.

Consider the following schema:

```graphql
type Query {
    employee(id: Int!): Employee
}
type Employee {
    id: Int!
    name: String!
}
```

Let's assume we would send the following query to a GraphQL server running this schema:

```graphql
query TykCEO {
    employee(id: 1) {
        id
        name
    }
}
```

The response of this query would look like this:

```json
{
  "data": {
    "employee": {
        "id": 1,
        "name": "Martin Buhr"
      }
  }
}
```

Compared to a REST API one difference is obvious. The response is wrapped in the root field "data".
There's also the possibility of having a root field "errors" but that's another story.
For simplicity reasons the GraphQL DataSource will not return the "data" object but rather extract the "employee" object directly.
So if you want to get the field mappings right you don't have to think about errors or data.
You can assume that your response object looks like this:

````json
{
  "employee": {
    "id": 1,
    "name": "Martin Buhr"
  }
}
````

Compared to a REST API you should be able to identify the key difference here.
The response is wrapped in the field "employee" whereas in a typical REST API you usually don't have this wrapping.

Because of this, field mappings are by default disabled for REST APIs.
For GraphQL APIs, the mapping is enabled by default and the path is set to the root field name.

![Create New API](img/dashboard/udg/datasources/graphql_1.png)

Other than this slight difference what's so special about the GraphQL DataSource to give it a dedicated name?

The GraphQL DataSource will make spec compliant GraphQL requests to your GraphQL upstream.
When you attach a GraphQL DataSource to a field the Query planner of the tyk GraphQL engine will collect all the sub fields of a root field in order to send the correct GraphQL query to the upstream.
This means you can have multiple GraphQL and REST APIs side by side in the same schema, even nested, and the query planner will always send the correct query/request to each individual upstream to fetch all the data required to fulfill a query.

How does the query planner know which DataSource is responsible for a field?

When the query planner enters a field it will check if there is a DataSource attached to it.
If that's the case this DataSource will be responsible for resolving this field.
If there are multiple nested fields underneath this root field they will all be collected and provided to the root field DataSource.

If however, one of the nested fields has another DataSource attached, ownership of the DataSource will shift to this new "root" field.
After leaving this second root field ownership of the DataSource for resolving fields will again shift back to the first DataSource.