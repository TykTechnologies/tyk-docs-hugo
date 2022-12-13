---
title: "REST Datasource"
date: 2020-06-03
menu:
  main:
    parent: "UDG DataSources"
weight: 1
url: /universal-data-graph/datasources/rest/
aliases:
    - /universal-data-graph/data-sources/rest
---

The REST DataSource is a base component of UDG to help you add existing REST APIs to your data graph.
By attaching a REST datasource to a field the engine will use the REST resource for resolving.

We have a video which demos this functionality for you.

{{< youtube PEwG8F8PxUs >}}

To configure a REST datasource select the "DATA SOURCES" tab in the Schema editor.
Select a field, e.g. the "httpBinGet" field in this example on the "Query" type.
Finally on the right hand side select "DATA SOURCE" to configure the DataSource for this field.

![Create New API]({{< ref "img/dashboard/udg/datasources/rest_1.png" >}})

For REST DataSources you're able to configure the URL, Method and the Headers.
Based on the input, a REST resolver will be generated to resolve the field at runtime.

![Create New API]({{< ref "img/dashboard/udg/datasources/rest_2.png" >}})