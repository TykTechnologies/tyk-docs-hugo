---
date: 2017-03-27T17:02:12+01:00
title: “504 GATEWAY_TIMEOUT“ error
menu:
  main:
    parent: "Tyk Cloud Classic"
weight: 5 
---

### Description

Users receive a 504 error in the Gateway

### Cause

This can occur when Tyk's internal ELB has timed out waiting for a response from a user's server

### Solution

We would advise that you look into any performance issues that might have affected your server.