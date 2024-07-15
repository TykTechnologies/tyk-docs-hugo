---
date: 2017-03-23T13:05:14Z
title: Dashboard API
menu:
  main:
    parent: "Key Concepts"
weight: 100 
---

The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports [Role Based Access Control]({{< ref "tyk-dashboard/rbac" >}}) (RBAC) on both a multi-tenant, and user basis.

Using the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a user by user basis, and also segregate User / Key / API Ownership by organization.

The availability of RBAC varies depending on the license or subscription. For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

{{< note success >}}
**Note**  

For optimal results, it is advisable to exclusively employ the Tyk Dashboard API (avoiding direct calls to the Tyk Gateway API) within a Self-Managed setup, enabling the Dashboard to manage the Tyk API gateways cluster.
{{< /note >}}


{{< img src="/img/diagrams/diagram_docs_dashboard-API-security-and-concepts@2x.png" alt="Tyk Dashboard API security" >}}