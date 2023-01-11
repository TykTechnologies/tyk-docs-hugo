---
date: 2017-03-24T16:28:03Z
title: Separated Analytics Storage
menu:
  main:
    parent: Tyk Pump
weight: 10 
aliases:
  - /analytics-and-reporting/separated-analytics-storage/
---
For high-traffic systems that make heavy use of analytics, it makes sense to separate out the Redis analytics server from the Redis configuration server that supplies auth tokens and handles rate limiting configuration.

To enable a separate analytics server, update your `tyk.conf` with the following section:

```{.copyWrapper}
"enable_separate_analytics_store": true,
"analytics_storage": {
  "type": "redis",
  "host": "",
  "port": 0,
  "addrs": [
      "localhost:6379"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 3000,
  "optimisation_max_active": 5000,
  "enable_cluster": false
},
```

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated.
{{< /note >}}

If you set `enable_cluster` to `false`, you only need to set one entry in `addrs`:

The configuration is the same (and uses the same underlying driver) as the regular configuration, so Redis Cluster is fully supported.

