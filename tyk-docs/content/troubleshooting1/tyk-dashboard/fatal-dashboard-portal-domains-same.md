---
date: 2018-06-08T14:04:00+01:00
title: Fatal - Dashboard and portal domains cannot be the same
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

The Tyk Dashboard service will not start and displays a fatal error as follows:

```
FATAL Dashboard and portal domains cannot be the same. 
  Dashboard domain: tyk-dashboard.com, Portal domain: tyk-dashboard.com
```

### Cause

Tyk's developer portal UI needs to run on either a different subdomain or different domain name to the dashboard UI.

Tyk's Dashboard service may be run in a multi-tenant configuration, and each tenant may have their own developer portals.

The Dashboard service determines which portal to load based on the `Host` header in the request by the browser. If this
conflicts with the hostname of the dashboard UI the dashboard service will not know whether to serve the dashboard or
developer portal.

### Solution

Firstly, we will need to disable hostnames from within the Dashboard configuration file in order to get the dashboard
service started again.

Change `host_config.enable_host_names` from `true` to `false`
```
"host_config": {
  "enable_host_names": true,    <------ CHANGE TO false
  ...
  ...
},
```

You should now be able to start the Dashboard service.

Navigate to the Dashboard via it's public IP address and log-in.

Change your portal domain to something different - e.g. `portal.tyk-dashboard.com`

Edit the Dashboard configuration file to re-enable host names.

Restart the Dashboard service.
