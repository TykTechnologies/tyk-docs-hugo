---
date: 2017-03-27T19:23:24+01:00
title: “Not Found” error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard"
weight: 5 
---

### Description

When the user attempts to access the Developer Portal (`https://xxxxxx:3000/portal`), they receive a `Not Found` error message

### Cause

The portal may not have been configured or may have been set up with the wrong domain name.

### Solution

Users should make sure that their portal has been configured to use the correct domain name in `tyk_analytics.conf`. Once this change has been made they may need to restart the process so as to avoid having to reconfigure the Gateway as well.