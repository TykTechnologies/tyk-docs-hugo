---
date: 2017-03-23T13:05:14Z
title: Dashboard API
menu:
  main:
    parent: "Concepts"
weight: 8 
---

## Dashboard API Overview

The Tyk Dashboard API is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports Access Control on a multi-tenant, and user basis.

With the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a client by client basis, and also segregate User / Token / API ownership by organisation.

It is encouraged to integrate with the Dashboard API in a Pro installation.

![API Overview][1]

[1]: /docs/img/diagrams/gatewayDashboardDiff.png