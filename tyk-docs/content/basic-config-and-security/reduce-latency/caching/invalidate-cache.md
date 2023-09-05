---
title: "Invalidating the Cache"
date: 2023-06-08
tags: ["Caching", "Invalidate", "Cache", "Flush"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 5
---

The cache for an API can be invalidated (or flushed) to force the creation of a new cache entry before the cache’s normal expiry.

This is achieved by calling one of the dedicated cache invalidation API endpoints. There is a cache invalidation endpoint in both the Tyk Dashboard API and Tyk Gateway API; the URLs differ slightly, but they have the same effect.

For Dashboard-managed deployments, it’s recommended to call the Dashboard API version, as this will handle the delivery of the message to all Gateways in the cluster.

Caches are cleared on per-API basis, so the request to the invalidation endpoint must include the ID of the API in the path.

For example, with the Tyk Gateway API:

```
DELETE /tyk/cache/{api-id}
```

and with the Tyk Dashboard API:

```
DELETE /api/cache/{api-id}
```

Note that prior to Tyk version 3.0.9 and 4.0, this was not supported on MDCB Data Plane gateways.

{{< note success >}}
**Note**  

Cache invalidation is performed at the API level, so all cache entries for the API will be flushed.
{{< /note >}}