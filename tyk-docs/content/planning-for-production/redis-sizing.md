---
title: Redis Sizing
tags: ["Redis", "Sizing"]
description: "Sizing requirements for Redis with a Tyk installation"
menu:
  main:
    parent: "Redis"
weight: 1
aliases:
  - /analyse/redis-mongodb-sizing
  - /analytics-and-reporting/redis-mongodb-sizing/
---

## Redis Sizing
The average single request analytics record (without detailed logging turned on) is around 1KB.

In terms of Redis, in addition to key storage itself, it should be able to hold the last 10 seconds of analytics data, preferably more, in the case of a Tyk Pump failure. So if you have 100 requests per second, you will need approximately 6MB for storing 60 seconds of data. Be aware that if detailed logging is turned on, this can grow by a magnitude of 10. 

{{< note success >}}
**Note**  

MDCB and Multi-Cloud clients - the Gateways write the data to a temporary Redis list and periodically send the analytics directly to the MDCB server, which, similar to Pump, processes them for purging to MongoDB or PostgreSQL.
{{< /note >}}
