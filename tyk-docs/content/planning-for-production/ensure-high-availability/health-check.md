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

Any of these components could go down at any given point and it is useful to
know if the Gateway is currently usable or not. A good usage of the health
check endpoint is for the configuration of a load balancer to multiple instances of the Gateway or
as a Kubernetes liveness probe.

The following component status will not be returned:

* MongDB or SQL
* Tyk Pump

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

### Status Levels

The following status levels can be returned in the JSON response.


- **pass**: Indicates that all components required for the Gateway to work 100% are available, and there is no impact on your traffic.

- **warn**: Indicates that one of the components is having an outage but your Gateway is able to keep processing traffic. The impact is medium (i.e. no quotas are applied, no analytics, no RPC connection to MDCB).

- **fail**: Indicates that Redis AND the Tyk Dashboard are unavailable, and can and indicate other failures. The impact is high (i.e. no configuration changes are available for API/policies/keys, no quotas are applied, and no analytics).

## Configure health check

By default, the liveness health check runs on the `/hello` path. But
it can be configured to run on any path you want to set. For example:


```{.copyWrapper}
health_check_endpoint_name: "status"
```

This configures the health check to run on `/status` instead of `/hello`.

### Refresh Interval

The Health check endpoint will refresh every 10 seconds.

### HTTP error code


The Health check endpoint will always return a `HTTP 200 OK` response if the polled health check endpoint is available on your Tyk Gateway. If `HTTP 200 OK` is not returned, your Tyk Gateway is in an error state.


For MDCB installations the `/hello` endpoint can be polled in either your Management or Worker Gateways. It is recommended to use the `/hello` endpoint behind a load balancer for HA purposes.

## Health check examples

The following examples show how the Health check endpoint returns


### Open Source installation

The following is returned for a `pass` status level for the Open Source Gateway:

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 156
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:36:09 GMT

{
  "description": "Tyk GW",
  "details": {
    "redis": {
      "componentType": "datastore",
      "status": "pass",
      "time": "2021-04-14T17:36:03Z"
    }
  },
  "status": "pass",
  "version": "v3.1.1"
}
```
### Self Managed

#### Redis outage

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 303
Content-Type: application/json
Date: Wed, 14 Apr 2021 14:58:06 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "status": "pass",
      "time": "2021-04-14T14:58:03Z"
    },
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T14:58:03Z"
    }
  },
  "status": "warn",
  "version": "v3.1.2"
}
```

#### Dashboard outage

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 292
Content-Type: application/json
Date: Wed, 14 Apr 2021 15:52:47 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "output": "dashboard is down? Heartbeat is failing",
      "status": "fail",
      "time": "2021-04-14T15:52:43Z"
    },
    "redis": {
      "componentType": "datastore",
      "status": "pass",
      "time": "2021-04-14T15:52:43Z"
    }
  },
  "status": "warn",
  "version": "v3.1.2"
}
```
#### Dashboard and Redis outage

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 354
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:53:33 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "output": "dashboard is down? Heartbeat is failing",
      "status": "fail",
      "time": "2021-04-14T17:53:33Z"
    },
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T17:53:33Z"
    }
  },
  "status": "fail",
  "version": "v3.1.2"
}
```
### MDCB installation

#### Management Gateway outage

The Status of the Management Gateway is the same as for a Tyk Self Management installation.

#### MDCB Worker Gateway RPC outage

```
$  http :8080/hello
HTTP/1.1 200 OK
Content-Length: 333
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:21:24 GMT

{
  "description": "Tyk GW",
  "details": {
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T17:21:16Z"
    },
    "rpc": {
      "componentType": "system",
      "output": "Could not connect to RPC",
      "status": "fail",
      "time": "2021-04-14T17:21:16Z"
    }
  },
  "status": "fail",
  "version": "v3.1.2"
}
```