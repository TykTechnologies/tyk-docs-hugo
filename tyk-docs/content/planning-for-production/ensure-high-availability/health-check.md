---
date: 2017-03-24T11:02:59Z
title: Liveness health check
menu:
  main:
    parent: "Ensure High Availability"
weight: 6
---

## <a name="overview"></a>Overview

Health checks are extremely important in determining the status of an
application - in this instance, the Tyk Gateway. Without them, it can be hard to
know the actual state of the Gateway.

Depending on your configuration, the Gateway could be using a few components:

- The Tyk Dashboard.
- RPC
- Redis (compulsory).

Any of these components could go down at any given point and it'd be great to
understand if the Gateway is currently usable or not. A good usage of the health
check endpoint is for the configuration of a load balancer to multiple instances of the Gateway or
as a Kubernetes liveness probe.

> Health check is implemented as per the [Health Check Response Format for HTTP APIs](https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html) RFC

An example of the response from this API is as follows:


```{.copyWrapper}
{
  "status": "pass",
  "version": "v2.9.3",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2020-05-19T03:42:55+01:00"
    }
  }
}
```



## <a name="configuration"></a> Configure health check

By default, the liveness health check is going to run on the `/hello` path. But
it can be updated to any value by:


```{.copyWrapper}
health_check_endpoint_name: "status"
```


> This will make the health check available on `/status` instead

