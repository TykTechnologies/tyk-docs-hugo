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

The GraphQL Datasource is able to make GraphQL queries to your upstream GraphQL service. In terms of configuration there are no real differences between the GraphQL Datasource and the one for REST with one slight exception.

### GraphQL data source at operation root level

To illustrate this we'll have a look at an example graph.

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
For simplicity reasons the GraphQL Datasource will not return the "data" object but rather extract the "employee" object directly.
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

{{< img src="/img/dashboard/udg/datasources/graph-fieldmapping.png" alt="Create New API" >}}

Other than this slight difference what's so special about the GraphQL Datasource to give it a dedicated name?

The GraphQL Datasource will make specification-compliant GraphQL requests to your GraphQL upstream. When you attach a GraphQL Datasource to a field the Query planner of the Tyk GraphQL engine will collect all the sub fields of a root field in order to send the correct GraphQL query to the upstream. This means you can have multiple GraphQL and REST APIs side by side in the same schema, even nested, and the query planner will always send the correct query/request to each individual upstream to fetch all the data required to return a query response.

**How does the query planner know which Datasource is responsible for a field?**

When the query planner enters a field it will check if there is a Datasource attached to it.
If that's the case this Datasource will be responsible for resolving this field.
If there are multiple nested fields underneath this root field they will all be collected and provided to the root field Datasource.

If however, one of the nested fields has another Datasource attached, ownership of the Datasource will shift to this new "root" field.
After leaving this second root field ownership of the Datasource for resolving fields will again shift back to the first Datasource.

### GraphQL data source at type/field level

In case you want to add GraphQL data source at a lower level of your schema - type/field - the configuration steps are as follow:

1. Navigate to the field you want the GraphQL data source to be connected to and click on it.
2. From the right-hand side menu choose **GraphQL | Tyk** or **External GraphQL** depending on wheather your data source was previously created in Tyk or if it's an external service.
3. Provide data source name and URL is needed.
4. Tick the box next to `Add GraphQL operation` to see additional configuration fields. This will allow you to provide a query that will execute against the data source.
5. Write the query in the `Operation` box and if you're using any variables provide those in `Variables` box.

{{< note >}}
**Note**  
You can use objects from your Data Graph schema as variables by referring to them using this syntax: `{{.object.code}}`
{{< /note >}}


{{< img src="/img/dashboard/udg/datasources/add gql operation.png" alt="Add GQL Operation" >}}

