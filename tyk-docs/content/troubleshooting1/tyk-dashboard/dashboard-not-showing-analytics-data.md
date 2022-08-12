---
date: 2017-03-27T19:20:30+01:00
title: Dashboard not showing any analytics data
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

The user is unable to see analytics data from a particular time period in the Dashboard

### Cause

Missing analytics data could be caused by a number of different reasons:

* Gateway incorrectly configured
* Pump incorrectly configured
* Pump service not running
* Dashboard incorrectly configured
* MDCB incorrectly configured
* Browser caching stale data

### Solution

#### Gateway incorrectly configured

Ensure the Gateway `tyk.conf` has:

* `enable_analytics` set to `true`. This sets the Gateway to record analytics data.
* `analytics_config.storage_expiration_time` set to a value larger than the Pump's `purge_delay`. This allows the analytics data to exist long enough in Redis to be processed by the Pump.
* `analytics_config.ignored_ips` set to `[]`. This ensures the Gateway will create analytics for requests from any IP address. 
* `enforce_org_data_age` set to `false`. This prevents the data from being removed based on it reaching a certain age.

#### Pump incorrectly configured

Ensure the Pump `pump.conf` has:

* `analytics_storage_type` set to `redis`.
* `analytics_storage_config` settings are set to the same Redis instance that the Gateway is connected to.

#### Pump service not running

Ensure the Pump service is running.

#### Dashboard incorrectly configured

Ensure the Dashboard `tyk_analytics.conf` has:

* `mongo_url` set to the same MongoDB instance that the Pump is connected to.

#### MDCB incorrectly configured

For scenarios where MDCB is used, ensure the `sink.conf` has:

* `analytics.mongo_url` set to the same MongoDB instance that the Dashboard is connected to.
* `forward_analytics_to_pump` set to the correct value for your solution. `false` if MDCB is directly recording the analytics itself, `true` if it is forwarding analytics data for the Pump to process. For the forwarding scenario, set the `storage` settings to the same Redis instance that the Pump is connected to.

#### Browser caching stale data

Try restarting your browser, or using a private session.

You can also try restarting the Dashboard service.

### Troubleshooting tip

Check if MongoDB contains analytics data by running the following query (but update the date parameter first):

```{.copyWrapper}
db.getCollection('tyk_analytics_aggregates').find({timestamp: {$gte: new ISODate("2016-09-26T23:59:00Z")}})
```

The query gets all aggregated analytics data from the date provided, so if you set it to yesterday you will get all data since yesterday. The data must be in the ISO format.
