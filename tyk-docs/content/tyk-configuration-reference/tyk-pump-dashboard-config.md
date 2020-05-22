---
date: 2017-03-27T15:47:05+01:00
title: How To Setup Dashboard Analytics
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
---

Following these steps will give us analytics in the following Dashboard locations:

* Activity by API
* Activity by Key
* Errors
* Log Browser
* Developer Portal - API Usage

There are 3 steps we need to do.  

1.  Set "enable_analytics" to true in "tyk.conf"
2.  Set "use_sharded_analytics" to true in "tyk_analytics.conf"
3.  Use the following pump.conf:

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

That's it, now we just have to restart the tyk-pump

```
$ docker restart tyk-pump
```

### More

There are 3 different pumps we want to look at:

1. mongo 
2. mongo-pump-selective
3. mongo-pump-aggregate

### mongo

This Pump simply saves all individual requests across every organisation to a collection called `tyk_analytics`. Each request will be stored as a single document.

The Dashboard will use this collection to show requests from the **API Usage Data > Log Browser** menu, unless [use_sharded_analytics](/docs/tyk-configuration-reference/tyk-dashboard-configuration-options/) are set to true, in which case, `Log Browser` will be populated using the `mongo-pump-selective` pump below.

This collection [should be capped](/docs/tyk-configuration-reference/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents.

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

### mongo-pump-aggregate
This pump stores data in a collection called `z_tyk_analyticz_aggregate_{ORG ID}`.  

As a minimal number of documents get stored, you don't need to worry about capping this. The documents contain aggregate info across an individual API, such as total requests, errors, and more.

This pump supplies the data for the following sub categories `API Usage Data`:

* Activity by API
* Activity by Key
* Errors

You will need to set the `enable_aggregate_lookups` field to `true` to in the [dashboard configuration file](https://tyk.io/docs/tyk-configuration-reference/tyk-dashboard-configuration-options/) in addition to adding the below pump to your pump conf file:

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

The `use_mixed_collection` flag will store aggregate analytics into an analytics, org-less collection called `tyk_analytics_aggregates`. This will be used to query aggregate analytics across the entire Tyk setup, such as the case for a superuser without an organisation.

### mongo-pump-selective

This pump stores data in collections called `z_tyk_analyticz_{ORG ID}`.

If the Dashboard configuration key `use_sharded_keys` equals `true`, then the Dashboard will use these collections to populate the `Log Browser`.

This collection [should be capped](/docs/tyk-configuration-reference/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents.
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
