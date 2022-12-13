---
date: 2017-03-27T19:23:24+01:00
title: “Not Found” error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
aliases:
  - /troubleshooting/tyk-dashboard/not-found-error-deve...
---

### Description

When you attempt to access the Developer Portal (`https://xxxxxx:3000/portal`), you receive a `Not Found` error message

### Cause

The portal may not have been configured or may have been set up with the wrong domain name.

### Solution

You should make sure that your portal has been configured to use the correct domain name in your `tyk_analytics.conf`. Once this change has been made you may need to restart the Dashboard process so as to avoid having to reconfigure the Gateway as well.

You should also look at the [portal tutorial]({{< ref "getting-startedpublish-api" >}}) for creating an API and publishing it to your Portal.
