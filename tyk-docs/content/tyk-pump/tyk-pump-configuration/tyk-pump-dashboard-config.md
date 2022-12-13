---
date: 2017-03-27T15:47:05+01:00
title: Setup Dashboard Analytics
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 2 
url: /tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config/
aliases:
  - /tyk-configuration-reference/tyk-pump-dashboard-config/
---


{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

Following these steps will give us analytics in the following Dashboard locations:

* Activity by API
* Activity by Key
* Errors
* Log Browser
* Developer Portal - API Usage

There are 3 steps you need to do.  


1.  Set `enable_analytics` to true in your `tyk.conf`.
2.  Set `use_sharded_analytics` to true in `tyk_analytics.conf`.
3.  Use the following in your `pump.conf`:


```{.json}
{
  "analytics_storage_type": "redis",
  "analytics_storage_config": {
    "type": "redis",
    "host": "tyk-redis",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 100,
    "enable_cluster": false
  },
  "purge_delay": 2,
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
        "use_mixed_collection": true
      }
    },
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
        "use_mixed_collection": true
      }
    }
  },
  "uptime_pump_config": {
    "collection_name": "tyk_uptime_analytics",
    "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
    "max_insert_batch_size_bytes": 500000,
    "max_document_size_bytes": 200000
  },
  "dont_purge_uptime_data": false
}
```

That's it, now you just have to restart the Tyk pump

```
$ docker restart tyk-pump
```

# What different pumps are available?

As you can see in the above `pump.conf`, Tyk offers 3 types of pumps:

1. mongo 
2. mongo-pump-aggregate
3. mongo-pump-selective

Let's discuss these pumps, their configs, matching collections and relevant dashboard setting,to view this data.


## 1. Mongo pump

**`mongo`** Pump simply saves all individual requests across every organisation to a collection called **`tyk_analytics`**. Each request will be stored as a single document.

### Pump config

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
This collection [should be capped](/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents. This is especially important if the `detailed_recording` in the Gateway is turned on which means that the Gateway records the full payload of the request and response. 

### Omitting indexes
From Pump 1.6+, the Mongo Pumps indexes default behaviour is changed and the new configuration option `omit_index_creation` is available. This option is applicable to the following Pumps: `Mongo Pump`,`Mongo Aggregate Pump` and `Mongo Selective Pump`.

The behaviour now depends upon the value of 'omit_index_creation' and the Pump in use, as follows:

- If `omit_index_creation` is set to `true`, tyk-pump will not create any indexes (for Mongo pumps).
- If `omit_index_creation` is set to `false` (default) and you are using `DocumentDB`, tyk-pump will create the Mongo indexes.
- If `omit_index_creation` is set to `false` (default) and you are using `MongoDB`, the behaviour of tyk-pump depends upon whether the collection already exists:
  - If the collection exists, tyk-pump will not create the indexes again.
  - If the collection does not already exist, tyk-pump will create the indexes.

### Dashboard setting

In **API Usage Data > Log Browser** screen you will see all the individual requests that the Gateway has recorded and saved in `tyk_analytics` collection using the `mongo` pump.  

Because you have the option to store and display analytics of every organisation or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way you set the pump to store the data in MongoDB.
The field [`use_sharded_analytics`](/tyk-dashboard/configuration/#use_sharded_analytics) controlls the collection that the dashboard will query.
- If `use_sharded_analytics: false` - the dashboard will query the collection that `tyk_analytics` mongo pump populated
- If `use_sharded_analytics: true` - the dashboard will query the collection that `mongo-pump-selective` pump populated



## 2. Mongo Aggregate pump

**`mongo-pump-aggregate`** pump stores data in a collection called **z_tyk_analyticz_aggregate_{ORG ID}**.

### Pump config

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

`tyk_analytics_aggregates` collection is used to query analytics across your whole Tyk setup. This can be used, for example, by a superuser role that is not attached to an organisation. When set to `true`, you also need to set [use_sharded_analytics](/tyk-dashboard/configuration/#use_sharded_analytics) to true in your Dashboard config.


### Dashboard setting

This pump supplies the data for the following sub categories **`API Usage Data`**:

* Activity by API screen
* Activity by Key screen
* Errors screen

As with the regular analytics, because Tyk gives you the option to store and display aggregated analytics across all organisations or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way to set the pump to store the data in MongoDB, otherwise, you won't see the data in the Dashboard. 

1. The [`enable_aggregate_lookups: true`](/tyk-configuration-reference/tyk-dashboard-configuration-options/#enable_aggregate_lookups) field must be set in the Dashboard configuration file, in order for the Dashboard to query and display the aggregated data that `mongo-pump-aggregate` saved to MongoDB.

2. If you set `use_mixed_collection: true` in the pump, you also need to set [`use_sharded_analytics: true`](/tyk-dashboard/configuration/#use_sharded_analytics) in your Dashboard config.


### Capping
As a minimal number of documents get stored, you don't need to worry about capping this. The documents contain aggregate info across an individual API, such as total requests, errors, tags and more.

#### High traffic environment settings

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

#### Unique aggregation points

In case you set your API definition in the Tyk Gateway to tag unique headers (like `request_id` or timestamp), this collection can grow a lot since agregation of unique value simply creates a record/document for every single value with counter of 1. To mitigate this, avoid tagging unique headers as first option. If you can't change the API definition quickly, you can add the tag to the ignore list `"ignore_aggregations": ["request_id"]`. This will make sure that pump does not aggregate per `request_id`.  
Also, if you are not sure what's causing the growth of the collection, you can also set time capping on these collections and monitor them.


## 3. Mongo selective pump

**`mongo-pump-selective`** pump stores individual requests per organisation in collections called **`z_tyk_analyticz_{ORG ID}`**.
Similar to the regular `mongo` pump, Each request will be stored as a single document.

### Pump config

This collection [should be capped](/analytics-and-reporting/capping-analytics-data-storage/) due to the number of individual documents.
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

## SQL

When using one of our [supported SQL platforms]({{< ref "/content/tyk-dashboard/database-options.md#introduction" >}}), you can configure your analytics in the following ways:

* Sharding **raw logs**
* Sharding **aggregated analytics**
* Sharding **uptime tests**

### Configuring a Tyk SQL Pump

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

### Configuring a Tyk SQL aggregate pump

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

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

### Configuring a Tyk SQL uptime pump

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


### Dashboard setting

As with the regular analytics, if you are using the Selective pump, you need to set `use_sharded_keys: true` in the dashboard config file so it will query `z_tyk_analyticz_{ORG ID}` collections to populate the `Log Browser`. 

{{< tab_end >}}
{{< tab_start "SQL" >}}
The pump needed for storing logs data in the database is very similar to other pumps as well as the storage setting in Tyk Dashboard config. It just requires the `sql` name and database specific configuration options.

### SQL example

```{.shell}
"sql": {
  "name": "sql",
  "meta": {
    "type": "postgres",
    "connection_string": "user=laurentiughiur password=test123 database=tyk-demo-db host=127.0.0.1 port=5432"
  }
},
```
## Agregated Analytics

This is the default option offered by Tyk, because it is configured to store the most important analytics details which will satisfy the needs of the most of our clients. This allows your system to save database space, and reporting is faster and consumes less resource.

### Tyk Pump configuration

For storing logs into the `tyk_aggregated` database table.

```{.shell}
"sql_aggregate": {
  "name": "sql_aggregate",
  "meta": {
    "type": "postgres",
    "connection_string": "user=root password=admin host=tyk-db database=tyk-demo-db port=5432"
```

## Raw logs analytics

While aggregated analytics offer a decent amount of details, there are use cases when you’d like to have access to all request details in your analytics. For that you can generate analytics based on raw logs. This is especially helpful when, once you have all the analytics generated based on raw logs stored in your SQL database, you can then build your own custom metrics, charts etc. outside of your Tyk Dashboard, that maybe bring more value to your product.

### Tyk Pump configuration

For storing logs into the `tyk_aggregated` database table.

```{.shell}
"sql": {
  "name": "sql",
  "meta": {
    "type": "postgres",
    "connection_string": "user=root password=admin host=tyk-db database=tyk-demo-db port=5432"
  }
}
```
### Tyk Dashboard configuration

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
## Uptime tests analytics

You need to set `uptime_tests` and `enable_uptime_analytics` to true in your [Tyk Gateway config file]({{< ref "/content/tyk-oss-gateway/configuration.md" >}}).

### Tyk Pump configuration

For storing logs into the `tyk_aggregated` database table.

```{.shell}
"uptime_pump_config": {
  "uptime_type": "sql",
  "type": "postgres",
  "connection_string": "host=sql_host port=sql_port user=sql_usr database=tyk-demo-db password=sql_pw",
},
```
### Tyk Dashboard configuration

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

## Sharding

In a production environment we recommend the following setup:

By default all logs/analytics are being stored in one single database table, which makes it hard and less performant to execute CRUD operations on the dataset when it grows significantly.

In order to improve the data maintenance processes, as querying or removing data from one single table is slow, we have added a new option (`table_sharding`), so that the data can be stored on a daily basis (one table of data per day), which will automatically make querying or removing sets of data easier, whether dropping tables for removing logs/analytics, or reading multiple tables based on the selected period.

### Tyk Pump configuration

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
