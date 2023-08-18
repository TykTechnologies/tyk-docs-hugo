---
date: 2017-03-27T15:47:05+01:00
title: Setup Dashboard Analytics
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 2 
aliases:
  - /tyk-configuration-reference/tyk-pump-dashboard-config/
---

To enable [Dashboard Analytics]({{<ref "tyk-dashboard-analytics">}}), you would need to configure Tyk Pump to send analytic data to the Dashboard storage MongoDB / SQL.

These are the different pumps that handle different kinds of analytic data.

| Analytics                    | Activities Graph     | Log Browser          | Uptime Analytics |
| ---------------------------- | -------------------- | -------------------- | ---------------- |
| Mongo (Multi organisation)   | Mongo Aggregate Pump | Mongo Selective Pump | Uptime Pump      |
| Mongo (Single organisation)  | Mongo Aggregate Pump | Mongo Pump           | Uptime Pump      |
| SQL                          | SQL Aggregate Pump   | SQL Pump             | Uptime Pump      |

See below details about these pumps, their configs, matching collections and relevant dashboard setting, to view this data.

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

## 1. Mongo Pump

**`mongo`** Pump simply saves all individual requests across every organisation to a collection called **`tyk_analytics`**. Each request will be stored as a single document.

### Pump Config

```{.json}
{
  ...
  "pumps": { 
    "mongo": {
      "type": "mongo",
      "meta": {
        "collection_name": "tyk_analytics",
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
      }
    }
}
```

### Capping
This collection [should be capped]({{< ref "tyk-pump/configuration#capping-analytics-data" >}}) due to the number of individual documents. This is especially important if the `detailed_recording` in the Gateway is turned on which means that the Gateway records the full payload of the request and response. 

### Omitting Indexes
From Pump 1.6+, the Mongo Pumps indexes default behaviour is changed and the new configuration option `omit_index_creation` is available. This option is applicable to the following Pumps: `Mongo Pump`,`Mongo Aggregate Pump` and `Mongo Selective Pump`.

The behaviour now depends upon the value of 'omit_index_creation' and the Pump in use, as follows:

- If `omit_index_creation` is set to `true`, tyk-pump will not create any indexes (for Mongo pumps).
- If `omit_index_creation` is set to `false` (default) and you are using `DocumentDB`, tyk-pump will create the Mongo indexes.
- If `omit_index_creation` is set to `false` (default) and you are using `MongoDB`, the behaviour of tyk-pump depends upon whether the collection already exists:
  - If the collection exists, tyk-pump will not create the indexes again.
  - If the collection does not already exist, tyk-pump will create the indexes.

### Dashboard Setting

In **API Usage Data > Log Browser** screen you will see all the individual requests that the Gateway has recorded and saved in `tyk_analytics` collection using the `mongo` pump.  

Because you have the option to store and display analytics of every organisation or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way you set the pump to store the data in MongoDB.
The field [use_sharded_analytics]({{< ref "tyk-dashboard/configuration#use_sharded_analytics" >}}) controlls the collection that the dashboard will query.
- If `use_sharded_analytics: false` - the dashboard will query the collection that `tyk_analytics` mongo pump populated
- If `use_sharded_analytics: true` - the dashboard will query the collection that `mongo-pump-selective` pump populated



## 2. Mongo Aggregate Pump

**`mongo-pump-aggregate`** pump stores data in a collection called **z_tyk_analyticz_aggregate_{ORG ID}**.

### Pump Config

```{.json}
{
  ...
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```

- `use_mixed_collection: true` - will store analytics to **both** your organisation defined collections `z_tyk_analyticz_aggregate_{ORG ID}` and your org-less `tyk_analytics_aggregates` collection. 
- `use_mixed_collection: false`- your pump will only store analytics to your org defined collection.

`tyk_analytics_aggregates` collection is used to query analytics across your whole Tyk setup. This can be used, for example, by a superuser role that is not attached to an organisation. When set to `true`, you also need to set [use_sharded_analytics]({{< ref "tyk-dashboard/configuration#use_sharded_analytics" >}}) to true in your Dashboard config.


### Dashboard Setting

This pump supplies the data for the following sub categories **`API Usage Data`**:

* Activity by API screen
* Activity by Key screen
* Errors screen

As with the regular analytics, because Tyk gives you the option to store and display aggregated analytics across all organisations or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way to set the pump to store the data in MongoDB, otherwise, you won't see the data in the Dashboard. 

1. The [enable_aggregate_lookups: true]({{< ref "tyk-dashboard/configuration#enable_aggregate_lookups" >}}) field must be set in the Dashboard configuration file, in order for the Dashboard to query and display the aggregated data that `mongo-pump-aggregate` saved to MongoDB.

2. If you set `use_mixed_collection: true` in the pump, you also need to set [use_sharded_analytics: true]({{< ref "tyk-dashboard/configuration#use_sharded_analytics" >}}) in your Dashboard config.


### Capping
As a minimal number of documents get stored, you don't need to worry about capping this. The documents contain aggregate info across an individual API, such as total requests, errors, tags and more.

#### High Traffic Environment Settings

If you have a high traffic environment, and you want to ignore aggregations to avoid Mongo overloading and/or reduce aggregation documents size, you can do it using the `ignore_aggregations` configuration option. The possible values are:
* APIID
* Errors
* Versions
* APIKeys
* OauthIDs
* Geo
* Tags
* Endpoints
* KeyEndpoint
* OauthEndpoint
* ApiEndpoint

For example, if you want to ignore the API Keys aggregations:
```{.json}
pump.conf:

{
  ...
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true,
        "ignore_aggregations": ["APIKeys"]
      }
    }
  }
}
```

#### Unique Aggregation Points

In case you set your API definition in the Tyk Gateway to tag unique headers (like `request_id` or timestamp), this collection can grow a lot since agregation of unique value simply creates a record/document for every single value with counter of 1. To mitigate this, avoid tagging unique headers as first option. If you can't change the API definition quickly, you can add the tag to the ignore list `"ignore_aggregations": ["request_id"]`. This will make sure that pump does not aggregate per `request_id`.  
Also, if you are not sure what's causing the growth of the collection, you can also set time capping on these collections and monitor them.


## 3. Mongo Selective Pump

**`mongo-pump-selective`** pump stores individual requests per organisation in collections called **`z_tyk_analyticz_{ORG ID}`**.
Similar to the regular `mongo` pump, Each request will be stored as a single document.

### Pump Config

This collection [should be capped]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}}) due to the number of individual documents.
```{.json}
{
  ...
  "pumps": {
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```

### Capping

This collection [should be capped]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}}) due to the number of individual documents.

### Dashboard Setting

As with the regular analytics, if you are using the Selective pump, you need to set `use_sharded_keys: true` in the dashboard config file so it will query `z_tyk_analyticz_{ORG ID}` collections to populate the `Log Browser`. 

## 4. Uptime Pump

### Pump Configuration

```{.json}
"uptime_pump_config": {
    "collection_name": "tyk_uptime_analytics",
    "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
  },
```

### Tyk Dashboard Configuration

```{.shell}
  “storage” : {
    ...
    “uptime”: {
      "type": "postgres",
      "connection_string": "user=root password=admin database=tyk-demo-db host=tyk-db port=5432",
    }
  }
}
```

### Tyk Gateway Setting

To enable Uptime Pump, modify gateway configuration [enable_uptime_analytics]({{< ref "tyk-oss-gateway/configuration#uptime_testsconfigenable_uptime_analytics" >}}) to true.

{{< tab_end >}}
{{< tab_start "SQL" >}}

When using one of our [supported SQL platforms]({{< ref "tyk-dashboard/database-options#introduction" >}}), Tyk offers 3 types of SQL pumps:

1. Aggregated Analytics: `sql_aggregate`
2. Raw Logs Analytics: `sql`
3. Uptime Tests Analytics

In a production environment we recommend sharding. You can configure your analytics in the following ways:

* Sharding **raw logs**
* Sharding **aggregated analytics**
* Sharding **uptime tests**

## 1. SQL Pump

While aggregated analytics offer a decent amount of details, there are use cases when you’d like to have access to all request details in your analytics. For that you can generate analytics based on raw logs. This is especially helpful when, once you have all the analytics generated based on raw logs stored in your SQL database, you can then build your own custom metrics, charts etc. outside of your Tyk Dashboard, that maybe bring more value to your product.

The pump needed for storing logs data in the database is very similar to other pumps as well as the storage setting in Tyk Dashboard config. It just requires the sql name and database specific configuration options.

### SQL Pump Configuration

For storing logs into the `tyk_analytics` database table.

```
"sql": {
  "name": "sql",
  "meta": {
    "type": "postgres",
    "connection_string": "host=localhost port=5432 user=admin dbname=postgres_test password=test",
    "table_sharding": false
  }
}
```
`type` - The supported types are `sqlite` and `postgres`. 

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`log_level` - Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By default, the value is `silent`, which means that it won't log any SQL query.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

### Dashboard Setting

You need to set `enable_aggregate_lookups` to `false`

Then add your SQL database connection settings:

```{.shell}
{
  ...
  “storage” : {
    ...
    “analytics”: {
      "type": "postgres",
      "connection_string": "user=root password=admin host=tyk-db database=tyk-demo-db port=5432",
    }
  }
}
```

## 2. SQL Aggregate Pump

This is the default option offered by Tyk, because it is configured to store the most important analytics details which will satisfy the needs of the most of our clients. This allows your system to save database space, and reporting is faster and consumes less resource.

### SQL Aggregate Pump Configuration

For storing logs into the `tyk_aggregated` database table.

```
"sql_aggregate": {
  "name": "sql_aggregate",
  "meta": {
    "type": "postgres",
    "connection_string": "host=localhost port=5432 user=admin dbname=postgres_test password=test",
    "table_sharding": true
  }
}
```

`type` - The supported types are `sqlite` and `postgres`. 

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`log_level` - Specifies the SQL log verbosity. The possible values are: `info`, `error`, and `warning`. By default, the value is `silent`, which means that it won't log any SQL query.

`track_all_paths` - Specifies if it should store aggregated data for all the endpoints. By default, it is set to `false`, which means that it only stores aggregated data for `tracked endpoints`. 

`ignore_tag_prefix_list` - Specifies prefixes of tags that should be ignored.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_aggregated` table. If set to `true`, daily records are stored in a `tyk_aggregated_YYYYMMDD` date formatted table.

## 3. Configuring A Tyk SQL Uptime Pump

In an `uptime_pump_config` section, you can configure a SQL uptime pump. To do that, you need to add the field `uptime_type` with `sql` value.

```
"uptime_pump_config": {
  "uptime_type": "sql",
  "type": "postgres",
  "connection_string": "host=sql_host port=sql_port user=sql_usr dbname=dbname password=sql_pw",
  "table_sharding": false
},
```
`type` - The supported types are `sqlite` and `postgres`.

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

### Tyk Dashboard Configuration

You need to set `enable_aggregate_lookups` to `false`

Then add your SQL database connection settings:

```{.shell}
{
  ...
  “storage” : {
    ...
    “analytics”: {
      "type": "postgres",
      "connection_string": "user=root password=admin host=tyk-db database=tyk-demo-db port=5432",
    }
  }
}
```

## Uptime Tests Analytics

### Tyk Pump Configuration

For storing logs into the `tyk_aggregated` database table.

```{.shell}
"uptime_pump_config": {
  "uptime_type": "sql",
  "type": "postgres",
  "connection_string": "host=sql_host port=sql_port user=sql_usr database=tyk-demo-db password=sql_pw",
},
```

### Tyk Dashboard Configuration

```{.shell}
  “storage” : {
    ...
    “uptime”: {
      "type": "postgres",
      "connection_string": "user=root password=admin database=tyk-demo-db host=tyk-db port=5432",
    }
  }
}
```

### Tyk Gateway Setting

To enable Uptime Pump, modify gateway configuration [enable_uptime_analytics]({{< ref "tyk-oss-gateway/configuration#uptime_testsconfigenable_uptime_analytics" >}}) to true.

## Sharding

In a production environment we recommend the following setup:

By default all logs/analytics are being stored in one single database table, which makes it hard and less performant to execute CRUD operations on the dataset when it grows significantly.

In order to improve the data maintenance processes, as querying or removing data from one single table is slow, we have added a new option (`table_sharding`), so that the data can be stored on a daily basis (one table of data per day), which will automatically make querying or removing sets of data easier, whether dropping tables for removing logs/analytics, or reading multiple tables based on the selected period.

### Tyk Pump Configuration

```{.shell}
"sql": {
  ...
  "meta": {
    ...
    "table_sharding": true
  }
},
"sql_aggregate" : {
  ...
  "meta": {
    ...
    "table_sharding": true
  }
},
"uptime_pump_config": {
  ...
  "table_sharding": true
},
```

### Tyk Dashboard Configuration

```{.shell}
"sql": {
  ...
  "meta": {
    ...
    "table_sharding": true
  }
},
"sql_aggregate" : {
  ...
  "meta": {
    ...
    "table_sharding": true
  }
},
"uptime_pump_config": {
  ...
  "table_sharding": true
},
```

{{< tab_end >}}
{{< tabs_end >}}
