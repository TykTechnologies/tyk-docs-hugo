---
title: "Universal Data Graph"
date: 2020-06-03
weight: 210
menu: "main"
aliases:
    - /universal-data-graph/universal-data-graph/
---

The Universal Data Graph (UDG) lets you combine multiple APIs into one universal interface.
With the help of GraphQL you're able to access multiple APIs with a single query.

It's important to note that you don't even have to build your own GraphQL server.
If you have existing REST APIs all you have to do is configure the UDG.

With the Universal Data Graph tyk becomes your central integration point for all your internal as well as external APIs.
In addition to this, the UDG benefits from all existing solutions that already come with your tyk installation.
That is, your Data Graph will be secure from the start and there's a large array of middlewares you can build on to power your Graph.

![Universal Datagraph Overview](/docs/img/diagrams/universal_datagraph_overview.png)

Currently supported DataSources:
- REST
- GraphQL
- SOAP (through the REST datasource)
