---
date: 2017-03-27T17:32:44+01:00
title: "Data Seen in Log Browser but No Reports"
menu:
  main:
    parent: "Tyk Pump"
weight: 6 
---

### Description

You can see data in the log browser but the rest of the reports display nothing.

### Solution

If your Pump is configured to use `mongo_selective_pump` (e.g. store data in a collection per organisation), ensure that the [Dashboard configuration setting](/docs/configure/tyk-dashboard-configuration-options/) `use_sharded_analytics` is set to `true`. The same applies in the reverse direction. If you are using `mongo-aggregate-pump` in your [pump configuration](/docs/configure/tyk-pump-configuration/), set `use_sharded_analytics` to false.
