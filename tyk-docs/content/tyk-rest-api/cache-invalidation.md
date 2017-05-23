---
date: 2017-03-27T11:58:18+01:00
title: Cache Invalidation
menu:
  main:
    parent: "Tyk Rest API"
weight: 9 
---

### Invalidate a Tyk API Cache

Sometimes a cache might contain stale data, or it may just need to be cleared because of an invalid configuration. This call will purge all keys associated with a cache on an API-by-API basis.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/tyk/cache/{api-id}` |
| Method       | DELETE                |
| Type         | None                  |
| Body         | none                  |

#### Sample request

```
    DELETE /tyk/cache/0f6d0b9d41cc45715b62e34fae3cc4a2 HTTP/1.1
    Host: localhost:5000
    X-Tyk-Authorization: 352d20ee67be67f6340b4c0605b044b7
```

#### Sample Response

```
    {
      "status": "ok",
      "message": "cache invalidated"
    }
```
