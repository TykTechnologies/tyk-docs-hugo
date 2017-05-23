---
date: 2017-03-27T19:20:30+01:00
title: Dashboard not showing any analytics data
menu:
  main:
    parent: "Tyk Dashboard"
weight: 5 
---

### Description

The user is unable to see analytics data from a particular time period in the Dashboard

### Cause

There are a number of reasons, most commonly this a result of the browser storing cached data relating to the Dashboard statistics.

### Solution

The user could try the following:

1.  Cache issue: Restart the dashboard process
2.  Check if you received any data by running the following query, e.g. get data from yesterday to today where “2016-09-26T23:59:00Z” should be yesterdays date:

```
    db.getCollection('tyk_analytics_aggregates').find({timestamp: {$gte: new ISODate(“2016-09-26T23:59:00Z"")}})
```

If, at this point, it is possible to see any data, then user should try setting `enforce_org_data_age` to false in their `tyk.conf` file which will stop the system from enforcing a data age on their analytics. Once the config change has been put in place, the user should see the value of that ExpireAt field change.