---
date: 2017-03-27T11:39:50+01:00
title: Health Checking
menu:
  main:
    parent: "Tyk Rest API"
weight: 5 
---

### Check the Health of a Tyk Node and Upstream API



> **Note**: As of v2.4, the health-check API has been deprecated. We no longer recommend its use.

Tyk retains health data in Redis which reflects the current state of the API, in particular, the health-check API will return:

*   upstream latency average
*   requests per second 
*   throttles per second
*   quota violations per second
*   key failure events per second

| **Property** | **Description**     |
| ------------ | ------------------- |
| Resource URL | `/tyk/health`       |
| Method       | GET                 |
| Type         | None                |
| Body         | none                |
| Param        | `api_id` (required) |

#### Sample request

```{.copyWrapper}
    GET /tyk/health/?api_id=768575647356 HTTP/1.1
    Host: localhost:8080
    X-Tyk-Authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample Response

```
    {
        "throttle_requests_per_second": 0,
        "quota_violations_per_second": 0,
        "key_failures_per_second": 0,
        "average_upstream_latency": 0,
        "average_requests_per_second": 0
    }
```