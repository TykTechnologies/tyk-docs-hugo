---
date: 2017-03-23T13:05:14Z
title: Dashboard API
menu:
  main:
    parent: "Key Concepts"
weight: 100 
---

The Tyk Dashboard API is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports Role Based Access Control (RBAC) on both a multi-tenant, and user basis.

With the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a client by client basis, and also segregate User / Key / API Ownership by organisation.

{{< note success >}}
**Note**  

For Self-Managed installations, API Ownership is available for customers with at least a 5-node or Cloud Native Unlimited-node license.
{{< /note >}}

It is recommended to integrate with the Dashboard API in a Self-Managed installation.


{{< img src="/img/diagrams/diagram_docs_dashboard-API-security-and-concepts@2x.png" alt="Tyk Dashboard API security" >}}