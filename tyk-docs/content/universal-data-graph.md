---
title: "Universal Data Graph"
date: 2020-06-03
weight: 10
menu: 
    main:
        parent: "Tyk Stack"
aliases:
  - /universal-data-graph
---

The Universal Data Graph (UDG) lets you combine multiple APIs into one universal interface.
With the help of GraphQL you're able to access multiple APIs with a single query.

It's important to note that you don't even have to build your own GraphQL server.
If you have existing REST APIs all you have to do is configure the UDG.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs.
In addition to this, the UDG benefits from all existing solutions that already come with your Tyk installation.
That is, your Data Graph will be secure from the start and there's a large array of middleware you can build on to power your Graph.

{{< img src="/img/diagrams/universal_datagraph_overview.png" alt="Universal Datagraph Overview" >}}

Currently supported DataSources:
- REST
- GraphQL
- SOAP (through the REST datasource)
- Kafka

{{< note >}}
**Note**  
To start creating your first Universal Data Graph in Tyk Dashboard, go to "Data Graphs" section of the menu.
{{< /note >}}

Make sure to check some of the resources to help you start:
- [How to create UDG schema]({{< ref "universal-data-graph/udg-getting-started/creating-schema.md" >}})
- [How to connect data sources]({{< ref "universal-data-graph/udg-getting-started/connect-datasource.md" >}})
- [How to secure the data graph]({{< ref "universal-data-graph/udg-getting-started/security.md" >}})