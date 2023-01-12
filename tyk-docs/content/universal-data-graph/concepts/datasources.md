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

Datasources are the fuel to power any Unified Data Graph and the designed schema.

Datasources can be attached to any field available in the composed UDG schema. They can also be nested within each other.

You can add Datasources to your Universal Data Graph without adding them to Tyk as a dedicated API. This is useful for getting started but also limited in capabilities. Datasources that are managed within Tyk offer much more flexibility and allow for a much fuller API Management control.

If you want to add quotas, rate limiting, body transformations etc. to a REST Datasource it is recommended to first import the API to Tyk.

Supported DataSources:
- REST
- GraphQL
- SOAP (through the REST DataSource)
- Kafka