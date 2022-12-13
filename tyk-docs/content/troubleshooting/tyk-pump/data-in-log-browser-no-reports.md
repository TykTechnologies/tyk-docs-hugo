---
date: 2017-03-27T17:32:44+01:00
title: "Data Seen in Log Browser but No Reports"
menu:
  main:
    parent: "Tyk Pump Troubleshooting"
weight: 6 
---

### Description

You can see data in the log browser but the rest of the reports display nothing.

### Solution

If your Pump is configured to use `mongo_selective_pump` (e.g. store data in a collection per organisation), ensure that the [Dashboard configuration setting](/configure/tyk-dashboard-configuration-options/) `use_sharded_analytics` is set to `true`. 

The same applies in the reverse direction. If you are using `mongo-pump-aggregate` in your [pump configuration](/configure/tyk-pump-configuration/), set `use_sharded_analytics` to false.

This is because you've enabled `use_sharded_analytics` as per above and you're using the `mongo-pump-aggregate`, but you now also have to add a `mongo-pump-selective` in order to save individual requests to Mongo, which the Dashboard can read into the Log Browser.