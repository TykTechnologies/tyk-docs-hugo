---
date: 2020-04-16T17:02:56+01:00
title: “301 Moved permanently“ error in the Dashboard API
menu:
  main:
    parent: "Tyk Cloud Classic"
weight: 5 
---

### Description

Users receive the following error when sending API requests to the Tyk Cloud Dashboard API. 

### Cause

This issue might be faced when trying to access Tyk Cloud Dashboard API using `http` instead of `https`.

### Solution

Update the request URL to use `https`.
