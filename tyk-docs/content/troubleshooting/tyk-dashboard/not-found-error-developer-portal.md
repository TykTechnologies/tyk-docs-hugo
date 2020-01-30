---
date: 2017-03-27T19:23:24+01:00
title: “Not Found” error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard"
weight: 5 
---

### Description

When you attempt to access the Developer Portal (`https://xxxxxx:3000/portal`), you receive a `Not Found` error message

### Cause

The portal may not have been configured or may have been set up with the wrong domain name.

### Solution

You should make sure that your portal has been configured to use the correct domain name in `tyk_analytics.conf`. Once this change has been made you may need to restart the process so as to avoid having to reconfigure the Gateway as well.

You should also look at the [portal tutorial](/docs/try-out-tyk/tutorials/create-portal-entry/) for creating an API and publishing to your Portal.



