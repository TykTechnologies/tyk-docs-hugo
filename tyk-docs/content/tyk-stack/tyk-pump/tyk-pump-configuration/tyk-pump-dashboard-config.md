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

# Introduction

Following these steps will give you analytics in the following Dashboard locations:

* Activity by API
* Activity by Key
* Errors
* Log Browser
* Developer Portal - API Usage

There are 3 steps you need to do.  

1.  Set `enable_analytics: true` in `tyk.conf`
2.  Set `use_sharded_analytics: true` in `tyk_analytics.conf`
3.  Use the following `pump.conf`:

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
This collection [should be capped](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents. This is especially important if the `detailed_recording` in the Gateway is turned on which means that the Gateway records the full payload of the request and response. 


### Dashboard setting

In **API Usage Data > Log Browser** screen you will see all the individual requests that the Gateway has recorded and saved in `tyk_analytics` collection using the `mongo` pump.  

Because you have the option to store and display analytics of every organisation or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way you set the pump to store the data in MongoDB.
The field [`use_sharded_analytics`](/docs/tyk-dashboard/configuration/#use_sharded_analytics) controlls the collection that the dashboard will query.
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

`tyk_analytics_aggregates` collection is used to query analytics across your whole Tyk setup. This can be used, for example, by a superuser role that is not attached to an organisation. When set to `true`, you also need to set [use_sharded_analytics](/docs/tyk-dashboard/configuration/#use_sharded_analytics) to true in your Dashboard config.


### Dashboard setting

This pump supplies the data for the following sub categories **`API Usage Data`**:

* Activity by API screen
* Activity by Key screen
* Errors screen

As with the regular analytics, because Tyk gives you the option to store and display aggregated analytics across all organisations or separately per organisation, you need to configure the Tyk Dashboard with the matching setting according to the way to set the pump to store the data in MongoDB, otherwise, you won't see the data in the Dashboard. 

1. The [`enable_aggregate_lookups: true`](/docs/tyk-configuration-reference/tyk-dashboard-configuration-options/#enable_aggregate_lookups) field must be set in the Dashboard configuration file, in order for the Dashboard to query and display the aggregated data that `mongo-pump-aggregate` saved to MongoDB.

2. If you set `use_mixed_collection: true` in the pump, you also need to set [`use_sharded_analytics: true`](/docs/tyk-dashboard/configuration/#use_sharded_analytics) in your Dashboard config.


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

This collection [should be capped](/docs/analytics-and-reporting/capping-analytics-data-storage/) due to the number of individual documents.
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

### Dashboard setting

As with the regular analytics, if you are using the Selective pump, you need to set `use_sharded_keys: true` in the dashboard config file so it will query `z_tyk_analyticz_{ORG ID}` collections to populate the `Log Browser`. 
