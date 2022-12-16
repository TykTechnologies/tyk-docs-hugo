---
date: 2017-03-27T17:27:08+01:00
title: “Index out of range“ error in logs
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 5 
---

### Description

Redis cluster users receive the aforementioned error message in their logs. The log stack may resemble the following:

```
    2016/06/22 09:58:41 http: panic serving 10.0.0.1:37196: runtime error: index out of range
    2016/06/22 09:58:41 http: panic serving 10.0.0.1:37898: runtime error: index out of range
    2016/06/22 09:58:41 http: panic serving 10.0.0.1:38013: runtime error: index out of range
    2016/06/22 09:58:42 http: panic serving 10.0.0.1:39753: runtime error: index out of range
    2016/06/22 10:01:07 http: panic serving 10.0.0.1:34657: runtime error: invalid memory address or nil pointer dereference
    2016/06/22 10:01:07 http: panic serving 10.0.0.1:36801: runtime error: invalid memory address or nil pointer dereference
```

### Cause

This is due to a bug that prevents the driver from picking up a random redis handle in single-instance connections such as pub/sub. The issue affects later patch releases of Tyk 2.2 and the first release of Tyk 2.3.

### Solution

Users are advised to upgrade to the latest versions of any Tyk packages as a patch was released to resolve this issue. Packages are available to download from [Packagecloud.io](https://packagecloud.io/tyk) and further details on how to upgrade can be found [here]({{< ref "upgrading-tyk" >}}).