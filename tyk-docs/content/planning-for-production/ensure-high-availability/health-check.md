---
date: 2017-03-24T11:02:59Z
title: Health check
menu:
  main:
    parent: "Ensure High Availability"
weight: 6
---

## <a name="overview"></a>Overview

Health checks are extremely important in determining the status of an
application - in this instance, Tyk Gateway. Without them, it will be hard to
know the actual state of the gateway.

Depending on your confiuration, the gateway could be using a few components:

- Dashboard.
- RPC
- Redis (compulsory).

Any of these components could go down at any given point and it'd be great to
understand if the gateway is currently usable or not. A good usage of the Health
check is a load balancer to a bunch of gateways or as Kubernetes liveness
probes.

> Health check is implemented as per the [Health Check Response Format for HTTP APIs](https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html) RFC


## <a name="configuration"></a> Confiure health check
