---
date: 2017-03-27T17:02:56+01:00
title: “Organisation quota has been exceeded“ error in the Dashboard API
menu:
  main:
    parent: "Tyk Cloud Classic"
weight: 5 
---

### Description

Users receive the following error when sending API requests to the Dashboard. This often occurs during performance testing.

### Cause

Free cloud users are capped at 50 000 API requests a day. Pro users are capped at 1 million requests a day.

### Solution

Quotas are reset every 24 hours so users can attempt to send further API requests the next day. High-traffic users may want to consider upgrading to either our Pro or Enterprise plans (further details on how to buy a new licence can be found at this [link][1]).

 [1]: https://tyk.io/pricing/compare-api-management-platforms/