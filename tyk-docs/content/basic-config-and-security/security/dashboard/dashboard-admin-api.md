---
date: 2017-03-23T14:58:20Z
title: Dashboard Administration
tags: ["Dashboard", "Admin API", "Tyk Dashboard Admin API", "administration", "admin"]
description: "What the Tyk Dashboard Admin API is used for" 
aliases:
  - /basic-config-and-security/security/dashboard/dashboard-api-security/
---

The Tyk Dashboard Admin API provides the following administrator level functions:
 - managing [organisations]({{< ref "basic-config-and-security/security/dashboard/organisations" >}})
 - creating initial [users]({{< ref "tyk-apis/tyk-dashboard-admin-api/users" >}}) during boot-strapping of the system
 - forcing a [URL reload]({{< ref "tyk-apis/tyk-dashboard-api/dashboard-url-reload" >}})
 - [exporting]({{< ref "tyk-apis/tyk-dashboard-admin-api/export" >}}) and [importing]({{< ref "tyk-apis/tyk-dashboard-admin-api/import" >}}) Tyk assets (orgs, APIs, policies) for backup or when migrating between environments
 - setting up [SSO integration]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}})

## Accessing the Dashboard Admin API
The [Tyk Dashboard Admin API]({{< ref "dashboard-admin-api" >}}) is secured using a shared secret that is set in the `tyk_analytics.conf` file. Calls to the Admin API require the `admin-auth` header to be provided, to differentiate the call from a regular Dashboard API call.

