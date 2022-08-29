---
title: Redis and MongoDB Sizing
tags: ["Redis", "MongoDB", "Sizing"]
description: "Sizing requirements for Redis and MongoDB with a Tyk installation"
menu:
  main:
    parent: "Database Settings"
weight: 1
aliases:
  - /analyse/redis-mongodb-sizing
  - /analytics-and-reporting/redis-mongodb-sizing/
---

## Redis
The average single request analytics record (without detailed logging turned on) is around 1KB.

In terms of Redis, in addition to key storage itself, it should be able to hold the last 10 seconds of analytics data, preferably more, in the case of a Tyk Pump failure. So if you have 100 requests per second, you will need approximately 6MB for storing 60 seconds of data. Be aware that if detailed logging is turned on, this can grow by a magnitude of 10. 

{{< note success >}}
**Note**  

MDCB and Multi-Cloud clients - the Gateways write the data to a temporary Redis list and periodically send the analytics directly to the MDCB server, which, similar to Pump, processes them for purging to MongoDB.
{{< /note >}}

## Redis RAM Calculator
{{< redis-calculator >}}


## MongoDB
The aggregate record size depends on the number of APIs and Keys you have. Each counter size ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

## MongoDB Working Data

Working data in terms of MongoDB is the data you query most often. The graphs displayed on the Tyk Dashboard, except for the Log browser, use aggregated data. 

So if you rely only on this kind of analytic data, you will not experience issues with working data and memory issues. It is literally hundreds of MBs. 

Even if you use the Log browser, its usage access is usually quite random, and it is unlikely that you check requests for every request. So it can't be called working data. And it is ok to store it on disk, and allow MongoDB to do the disk lookups to fetch the data. 

Note, that in order to do fast queries, even from the disk, MongoDB uses indexes. MongoDB recommends that indexes should fit into memory, and be considered working data, but only the part of the index which is commonly used. For example the last month of data. 

For an aggregate collection, the average index size is 6% from the overall collection. For requests stats it is around 30%. 


## Example
If you serve 1 million requests per day, and require fast access to the last seven days of request logs (usually way less, and the performance of the log viewer is not a concern), with 3 months of aggregated logs, the memory requirements for MongoDB can be as follows:

Request_logs_index ( 30% * (1GB * 7) ) + aggregated(3month * 30MB) ~= 2.1GB + 90MB = ~ 2.2GB

In addition to storing working data in memory, MongoDB also requires space for some internal data structures. In general multiplying the resulting number by 2x should be enough. In the above example, your MongoDB server should have around 4.4GB of available memory.

## Database Storage Calculator
{{< databse-calculator >}}
