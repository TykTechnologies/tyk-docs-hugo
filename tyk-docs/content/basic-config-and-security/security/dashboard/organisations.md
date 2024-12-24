---
date: 2017-03-23T14:40:22Z
title: Organizations
tags: ["Organizations", "Dashboard", "API governance", "Admin API"]
description: "How organizations are created and used with the Tyk Dashboard"
menu:
  main:
    parent: "Dashboard"
weight: 1 
---

Many businesses have a complex structure, for example a lot of distinct departments where each department has its own teams. You might also need to deploy and manage multiple environments such as Production, Staging and QA for different stages in your product workflow. The Tyk Dashboard is multi-tenant capable which allows you to use a single Tyk Dashboard to host separate *organizations* for each team or environment.

An Organization is a completely isolated unit, and has its own:
 - API Definitions
 - API Keys
 - Users
 - Developers
 - Domain
 - Tyk Classic Portal 

When bootstrapping your Dashboard, the first thing the bootstrap script does is to create a new default Organization.

Additional organizations can be created and managed using the [Dashboard Admin API]({{< ref "dashboard-admin-api/organisations" >}}).

### Tyk Gateway and organizations
The concept of an organization does not exist within the Tyk Gateway. Gateways only proxy and validate the rules imposed on them by the definitions and keys that are being processed, however at their core there are some security checks within the Gateway that ensure organizational ownership of objects.

Tyk allows each organization to own its own set of Gateways, for example when you want to use different hosting providers you can segregate them in terms of resources, or just for security reasons.

Self-Managed users should use [API tagging]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-on-premises#api-tagging-with-on-premises" >}}) and enforce a tagging standard across all organizations.

All actions in a Self-Managed installation of Tyk must use a base Organization, and all actions should stem from a User owned by that organization.

{{< note success >}}
**Note**

A user that does not belong to an Organization is sometimes referred to as an *unbounded user*. These users have visibility across all Organizations, but should be granted read-only access.
{{< /note >}}
