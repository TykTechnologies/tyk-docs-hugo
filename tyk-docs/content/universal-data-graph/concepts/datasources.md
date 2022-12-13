---
title: "UDG DataSources"
date: 2020-06-03
menu:
  main:
    parent: "Universal Data Graph"
weight: 10
aliases:
    - /universal-data-graph/datasources/
---

DataSources are the fuel to power your Unified Data Graph.

In your composed Schema you can attach DataSources to each field on the Graph.
DataSources can also be nested within each other.

You can add DataSources to your Graph without adding them to tyk as a dedicated API.
This is useful for getting started but also limited in capabilities.

If you want to add quotas, rate limiting, body transformations etc. to a REST DataSource it is recommended to first import the API to tyk.

Supported DataSources:
- REST
- GraphQL
- SOAP (through the REST DataSource)