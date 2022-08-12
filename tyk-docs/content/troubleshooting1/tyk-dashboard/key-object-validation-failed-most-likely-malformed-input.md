---
date: 2020-04-16T19:20:30+01:00
title: Key object validation failed, most likely malformed input error
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

The user is getting error as `Key object validation failed, most likely malformed input` when calling the Dashboard API.

### Cause

Issue caused by invalid character passed in the JSON body of the request.

### Solution

Validate the JSON using JSON validator.

Further, please see [this community forum post](https://community.tyk.io/t/error-creating-new-api-through-dashboard-rest-api/1555/2) for additional guidance.
