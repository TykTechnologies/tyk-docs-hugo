---
date: 2017-03-27T12:33:44+01:00
title: Dashboard URL Reload
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 10 
---

Since the Dashboard can have multiple URLs associated with it. It is possible to force a URL reload by calling an API endpoint of the Dashboard API.

### Reload the Dashboard URLs

| **Property** | **Description**        |
| ------------ | ---------------------- |
| Resource URL | `/admin/system/reload` |
| Method       | GET                    |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

#### Sample Request

```{.copyWrapper}
GET /admin/system/reload HTTP/1.1
Host: localhost:3000
admin-auth:12345
```

#### Sample Response
```
{
  "status": "ok"
}
```