---
date: 2017-03-23T14:49:02Z
title: Dashboard API Security
menu:
  main:
    parent: "Dashboard"
weight: 6 
---

## <a name="overview"></a>Dashboard API Overview

The Tyk Dashboard API is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports Access Control on a multi-tenant, and user basis.

With the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a client by client basis, and also segregate User / Token / API ownership by organisation.

It is encouraged to integrate with the Dashboard API in a Pro installation.

![API Overview][1]

## <a name="userapirole"></a>User API Roles

See the [User API Roles][2] section.

## <a name="dashboard-api-access"></a>Dashboard API Access

The Dashboard API is secured using an “Authorization” header that must be added to each request that is made. The Authorization key can be found in the User details view of a user.


[1]: /docs/img/diagrams/dashboardapi2.png
[2]: /docs/security/dashboard/user-roles/

