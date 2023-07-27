---
title: "Concepts - DataSources"
date: 2020-06-03
menu:
  main:
    parent: "UDG Concepts"
weight: 2
aliases:
    - /universal-data-graph/data-sources/graphql
---

In most GraphQL implementations you have the concept of Resolvers.
Resolvers are functions that take optional parameters and return (resolve) some data.
Each resolver is attached to a specific type and field.

DataSources are similar in that they are responsible for loading the data for a certain field and type.
The difference is that with DataSources you simply configure how the engine should fetch the data whereas with traditional GraphQL frameworks you have to implement the function on your own.

DataSources can be internal as well as external.

Internal DataSources are those APIs that are already managed by tyk, e.g. REST or SOAP APIs which you already manage through the Dashboard.
You can make use of the rich ecosystem of middlewares for internal DataSources to validate and transform requests and responses.

External DataSources are those APIs that you're not (yet) managing through tyk.
For simplicity reasons you can also add these to your data graph without previously adding them as a dedicated API to tyk.
If you later decide you want to add additional middlewares to one of them you can always make the transition from external to internal API.

Head over to the [connect data source]({{<ref "universal-data-graph/concepts/datasources" >}}) section to learn about the supported data sources and how to connect them to Tyk.