---
date: 2017-03-27T17:32:44+01:00
title: “Connection dropped, connecting...“
menu:
  main:
    parent: "Tyk Pump Troubleshooting"
weight: 5 
---

### Description

Users may notice the following message in their logs for the Tyk Pump:

```
[Jun 3 22:48:02] INFO elasticsearch-pump: Elasticsearch Index: tyk_analytics
[Jun 3 22:48:02] INFO main: Init Pump: Elasticsearch Pump
[Jun 3 22:48:02] INFO main: Starting purge loop @10(s)
[Jun 3 22:48:12] WARN redis: Connection dropped, connecting..
[Jun 3 22:48:23] INFO elasticsearch-pump: Writing 1386 records
[Jun 3 22:50:11] INFO elasticsearch-pump: Writing 13956 records
```

### Cause

This is normal behaviour for the Tyk Pump.

### Solution

N/A