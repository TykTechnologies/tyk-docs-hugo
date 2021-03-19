---
date: 2017-03-24T11:02:59Z
title: Liveness health check
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Health Checks"]
description: "How to configure health checks for your Tyk installation"
menu:
  main:
    parent: "Ensure High Availability"
weight: 6
---

## Overview

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

{{< note success >}}
**Note**  

Health check is implemented as per the [Health Check Response Format for HTTP APIs](https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html) RFC
{{< /note >}}

An example of the response from this API is as follows:


```{.copyWrapper}
{
  "status": "pass",
  "version": "v3.1.1",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "dashboard": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "rpc": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    }
  }
}
```

If one of the components is having issues, status will change to "warn", if all of them having issues status will be "fail".



## Configure health check

By default, the liveness health check is going to run on the `/hello` path. But
it can be updated to any value by:


```{.copyWrapper}
health_check_endpoint_name: "status"
```
{{< note success >}}
**Note**  

This will make the health check available on `/status` instead
{{< /note >}}


