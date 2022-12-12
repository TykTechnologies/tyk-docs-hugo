---
title: "Datadog Setup"
date: 2021-10-20
tags: ["Pump", "GraphQL", "Graph Pump"]
description: "How configure the Tyk Graph Pump with MongoDB"
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 5 
url: /tyk-configuration-reference/tyk-pump-configuration/graphpump/
---

Starting with version `1.7.0` of Tyk Pump and version `4.3.0` of Tyk Gateway it is possible to configure Graph MongoDB Pump. Once configured, the pump enables support for Graphql-specific metrics. The Graphql-specific metrics currently supported include (more to be added in future versions ):

* Types Requested.
* Fields requested for each type.
* Error Information (not limited to HTTP status codes).

## Setting up Graph MongoDB Pump

1. Set `enable_analytics` to `true` in your `tyk.conf`.
2. Enable Detailed recording by setting `enable_detailed_recording` in your `tyk.conf` to `true`. This is needed so that the GraphQL information can be parsed from the request body and response.
3. Set up your Mongo `collection_name`.
4. Add your Graph MongoDB Pump configuration to the list of pumps in your `pump.conf` (pump configuration file). 

Sample setup:

```
{
  ...
  "pumps": {
    ...
    "mongo-graph": {
      "meta": {
        "collection_name": "tyk_graph_analytics",
        "mongo_url": "mongodb://mongo/tyk_graph_analytics"
      }
    },
  }
}
```

## Current limitations

The Graph MongoDB Pump is being improved upon regularly and as such there are a few things to note about the Graph MongoDB Pump current behavior:

* Size of your records - due to the detailed recording being needed for this Pump’s to function correctly, it is important to note that your records and consequently, your MongoDB storage could increase in size rather quickly.
* Subgraph requests are not recorded - Requests to tyk-controlled subgraphs from supergraphs in federation setting are currently not recorded by the Graph MongoDB Pump, just the supergraph requests are handled by the Graph MongoDB Pump.
* UDG requests are recorded but subsequent requests to data sources  are currently ignored.
* Currently, Graph MongoDB Pump data can not be used in Tyk Dashboard yet, the data is only stored for recording purposes at the moment and can be exported to external tools for further analysis.