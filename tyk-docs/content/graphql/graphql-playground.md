---
title: "GraphQL playground"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 2
aliases:
    - /graphql/graphql-playground/
---

While creating or editing a GraphQL API, all the changes made, can be tested using the the GraphiQL playground which sits under the `Playground` tab in `API Designer`.

The GraphiQL try-out playground comes with a series of features by default, which can be very useful while configuring the API:
  1.  Syntax highlighting.
  2.  Intelligent type ahead of fields, arguments, types, and more.
  3.  Real-time error highlighting and reporting for queries and variables.
  4.  Automatic query and variables completion.
  5.  Automatically adds required fields to queries.
  6.  Documentation explorer, search, with markdown support.
  7.  Query History using local storage
  8.  Run and inspect query results using any promise that resolves JSON results. 9.  HTTPS or WSS not required.
  10. Supports full GraphQL Language Specification:
  11. Queries, Mutations, Subscriptions, Fragments, Unions, directives, multiple operations per query, etc

![Playground](/img/dashboard/udg/getting-started/playground.png)

  **Headers**

  Debugging a GraphQL API might require additional headers to be passed to the requests while playing with the GraphiQL interface (i.e. `Authorization` header in case of Authentication Token protection over the API). This can be done using the dedicated headers tab in the Graphiql IDE.

![Headers](/img/dashboard/udg/getting-started/headers.png)

  You can also [forward headers]({{< ref "universal-data-graph/udg-getting-started/header-forwarding" >}}) from your client request to the upstream data sources.


  **Logs**

  Beside the results displayed in the GraphiQL playground, we are displaying as well a full list of logs of the triggered request, which helps a lot when debugging the API functionality.

![Logs](/img/dashboard/udg/getting-started/logs.png)

