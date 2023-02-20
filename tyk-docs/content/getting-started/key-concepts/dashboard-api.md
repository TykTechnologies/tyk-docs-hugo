---
date: 2017-03-23T13:05:14Z
title: Dashboard API
menu:
  main:
    parent: "Key Concepts"
weight: 100 
---

The [Tyk Dashboard API]({{< ref "/content/tyk-dashboard-api.md" >}}) is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports Role Based Access Control (RBAC) on both a multi-tenant, and user basis.

With the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a client by client basis, and also segregate User / Key / API Ownership by organisation.

{{< note success >}}
**Note about *API Ownership***  

The availability of this feature varies depending on the license or subscription. 
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

{{< /note >}}

For optimal results, it is advisable to exclusively employ the Tyk Dashboard API within a Self-Managed setup, thereby enabling it to handle the Tyk API gateways cluster.

{{< img src="/img/diagrams/diagram_docs_dashboard-API-security-and-concepts@2x.png" alt="Tyk Dashboard API security" >}}