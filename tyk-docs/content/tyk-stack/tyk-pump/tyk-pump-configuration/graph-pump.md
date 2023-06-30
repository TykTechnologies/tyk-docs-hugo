---
title: "Graph Pump setup"
date: 2021-10-20
tags: ["Pump", "GraphQL", "Graph Pump"]
description: "How configure the Tyk Graph Pump with MongoDB and SQL"
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 5 
aliases: 
  - /tyk-configuration-reference/tyk-pump-configuration/graphpump/
  - /tyk-stack/tyk-pump/tyk-pump-configuration/graph_mongo_pump
---

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

Starting with version `1.7.0` of Tyk Pump and version `4.3.0` of Tyk Gateway it is possible to configure Graph MongoDB Pump. Once configured, the pump enables support for Graphql-specific metrics. The Graphql-specific metrics currently supported include (more to be added in future versions ):

* Types Requested.
* Fields requested for each type.
* Error Information (not limited to HTTP status codes).

## Setting up Graph MongoDB Pump

1. Set `enable_analytics` to `true` in your `tyk.conf`.
2. Enable Detailed recording by setting `enable_detailed_recording` in your `tyk.conf` to `true`. This is needed so that the GraphQL information can be parsed from the request body and response.
   
{{< note success >}}
**Note**  

This will enable detailed recording for all APIs, overriding the one at API configuration level, it requires the Gateway to be restarted.
{{< /note >}}

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

{{< tab_end >}}
{{< tab_start "SQL" >}}

Starting with Version `1.8.0` of Tyk Pump and version `5.0.0` of the Tyk Gateway; It is possible to export GraphQL analytics to an SQL database.

## Setting up Graph SQL Pump

With the Graph SQL pump currently includes information (per request) like:
- Types Requested
- Fields requested for each type
- Error Information
- Root Operations Requested.

 Setup steps include:
1. Set `enable_anaytics` to `true` in your `tyk.conf`.
2. Enable Detailed recording by setting `enable_detailed_recording` in your `tyk.conf` to `true`. This is needed so that the GraphQL information can be parsed from the request body and response.
   
{{< note success >}}
**Note**  

This will enable detailed recording for all APIs, overriding the one at API configuration level, it requires the Gateway to be restarted.
{{< /note >}}   

3. Configure your `pump.conf` using this sample configuration:
```
"sql-graph": {
      "meta": {
        "type": "postgres",
        "table_name": "tyk_analytics_graph",
        "connection_string": "host=localhost user=postgres password=password dbname=postgres",
        "table_sharding": false
      }
},
```
The Graph SQL pump currently supports `postgres`, `sqlite` and `mysql` databases. The `table_name` refers to the table that will be created in the case of unsharded setups, and the prefix that will be used for sharded setups
e.g `tyk_analytics_graph_20230327`.

>The Graph SQL pump currently has the same limitations as the Graph Mongo Pump.

## Setting up Graph SQL Aggregate Pump
The `sql-graph-aggregate` can be configured similar to the Graph SQL pump:
```
 "sql-graph-aggregate": {
    "meta": {
    "type": "postgres",
    "connection_string": "host=localhost port=5432 user=postgres dbname=postgres password=password",
    "table_sharding": false
  }
}
```


{{< tab_end >}}
{{< tabs_end >}}
