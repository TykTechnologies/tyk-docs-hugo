---
date: 2017-03-23T14:40:22Z
title: Organisations
tags: ["Organisations", "Dashboard", "Admin API"]
description: "How organisations are created and used with the Tyk Dashboard"
menu:
  main:
    parent: "Dashboard"
weight: 1 
---

## Concept: Dashboard Organisations

The Tyk Dashboard is multi-tenant capable. When bootstrapping your Dashboard, the first thing the bootstrap script does is to create a new Organisation.

Organisations can only be created using the [Dashboard Admin API](/tyk-apis/tyk-dashboard-admin-api/organisations/).

An Organisation is a completely isolated unit, and has its own:

* API Definitions
* API Keys
* Users
* Portal
* Developers
* Domain

The concept of an organisation does not exist with the Gateway itself, and Gateways only proxy and validate the rules imposed on them by the definitions and keys that are being processed, however at their core there are some security checks within the Gateway that ensure organisational ownership of objects.

This means that all actions in a Pro (Dashboard-based) installation of Tyk must use a base Organisation, and all actions should stem from a User owned by that organisation.

{{< note success >}}
**Note**  

A user that does not belong to an Organisation is sometimes referred to as an unbounded user, these users have visibility across all organisations, but should not be used for anything except READ access.
{{< /note >}}

