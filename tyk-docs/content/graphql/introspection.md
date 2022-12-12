---
title: "Introspection"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 1
aliases:
    - /graphql/introspection/
---

A GraphQL server can provide information about its schema. This functionality is called *introspection* and is achievable by sending
an *introspection query* to the GraphQL server.

You may have seen *GraphiQL* or *GraphQL Playgrounds* providing a schema documentation and autocompletion. This is possible because those tools
send a introspection query to the GraphQL server and use the response for providing those features.

When **creating a GraphQL proxy** in the Tyk Dashboard an introspection query is used to fetch the schema from the GraphQL upstream and display it in the 
schema tab.

{{< note success >}}
**Note**  

When using a GraphQL proxy the introspection query is always sent to the GraphQL upstream. This means that changes in the Tyk schema won't be reflected
 in the introspection response. You should keep the schemas synchronised to avoid confusion.
{{< /note >}}


Introspection also works for the **[Universal Data Graph]({{< ref "/content/universal-data-graph.md" >}})**.