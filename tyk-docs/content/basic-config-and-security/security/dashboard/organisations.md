---
date: 2017-03-23T14:40:22Z
title: Organisations
tags: ["Organisations", "Dashboard", "API governance", "Admin API"]
description: "How organisations are created and used with the Tyk Dashboard"
menu:
  main:
    parent: "Dashboard"
weight: 1 
---

Many businesses have a complex structure, for example a lot of distinct departments where each department has its own teams. You might also need to deploy and manage multiple environments such as Production, Staging and QA for different stages in your product workflow. The Tyk Dashboard is multi-tenant capable which allows you to use a single Tyk Dashboard to host separate *organisations* for each team or environment.

An Organisation is a completely isolated unit, and has its own:
 - API Definitions
 - API Keys
 - Users
 - Developers
 - Domain
 - Tyk Classic Portal 

When bootstrapping your Dashboard, the first thing the bootstrap script does is to create a new default Organisation.

Additional organisations can be created and managed using the [Dashboard Admin API]({{< ref "dashboard-admin-api/organisations" >}}).

### Tyk Gateway and organisations
The concept of an organisation does not exist within the Tyk Gateway. Gateways only proxy and validate the rules imposed on them by the definitions and keys that are being processed, however at their core there are some security checks within the Gateway that ensure organisational ownership of objects.

Tyk allows each organisation to own its own set of Gateways, for example when you want to use different hosting providers you can segregate them in terms of resources, or just for security reasons.

Self-Managed users should use [API tagging]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-on-premises" >}}) and enforce a tagging standard across all organisations.

All actions in a Self-Managed installation of Tyk must use a base Organisation, and all actions should stem from a User owned by that organisation.

{{< note success >}}
**Note**

A user that does not belong to an Organisation is sometimes referred to as an *unbounded user*. These users have visibility across all Organisations, but should be granted read-only access.
{{< /note >}}
