---
title: Redis and MongoDB
tags: ["Redis", "MongoDB", "Versions", "Settings"]
description: "The supported versions of Redis and MongoDB for Tyk and how to configure them."
menu:
  main:
    parent: "Database Settings"
weight: 1 
---

### Supported Versions

- MongoDB 3.x to 4.4.x
- Redis 2.8.x to 6.0.x

### Split out your DB

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions

If you are making use of the Tyk Caching feature, then it is possible to use a secondary Redis server or Redis cluster to store cache data. This can be very useful in high-traffic APIs where latency is at a premium.


### Make sure you have enough Redis connections

Tyk makes heavy use of Redis in order to provide a fast and reliable service, in order to do so effectively, it keeps a passive connection pool ready. For high-performance setups, this pool needs to be expanded to handle more simultaneous connections, otherwise you may run out of Redis connections.

Tyk also lets you set a maximum number of open connections, so that you don't over-commit connections to the server.

To set your maximums and minimums, edit your `tyk.conf` and `tyk_analytics.conf` files to include:

```{.copyWrapper}
"storage": {
  ...
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  ...
},
```
    

Set the `max_idle` value to something large, we usually leave it at around `2000` for HA deployments, and then set your `max_active` to your upper limit (as in, how many additional connections over the idle pool should be used).

### Protection of Redis data

Tyk uses Redis to store API tokens and OAuth clients, so it is advisable to *not* treat Redis instances as ephemeral. The exception to this is when you are using Tyk Multi Data Center Bridge, but you will still need to retain the master Redis instance.

You must ensure that Redis is persisted, or at least in a configuration where it is easy to restore or failover. So, for example, with Elasticache, making sure there are many read-replicas and regular snapshots can ensure that your data survives a failure.

### Capping Analytics
Tyk Gateways can generate a lot of analytics data. Be sure to read about [capping your Dashboard analytics](/docs/analytics-and-reporting/capping-analytics-data-storage/)
