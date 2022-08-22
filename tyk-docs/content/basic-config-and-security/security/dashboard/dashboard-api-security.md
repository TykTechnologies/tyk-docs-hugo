---
date: 2017-03-23T14:49:02Z
title: Dashboard API Security
tags: ["Dashboard", "API", "Security"]
description: "What the Tyk Dashboard API is used for"
menu:
  main:
    parent: "Dashboard"
weight: 6 
---

## Dashboard API Overview

The Tyk Dashboard API is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports Access Control on a multi-tenant, and user basis.

With the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a client by client basis, and also segregate User / Token / API ownership by organisation.

It is encouraged to integrate with the Dashboard API in a Pro installation.

![API Overview](/docs/img/diagrams/dashboardapi2.png)

## User API Roles

See the [User API Roles](/docs/basic-config-and-security/security/dashboard/user-roles/) section.

## Dashboard API Access

The Dashboard API is secured using an `Authorization` header that must be added to each request that is made. The **Tyk Dashboard API Access Credentials** `Authorization` key can be found at the bottom of the **Edit User** section for a user.