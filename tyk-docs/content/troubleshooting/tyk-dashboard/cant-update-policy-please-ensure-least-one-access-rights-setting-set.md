---
date: 2017-03-27T17:50:34+01:00
title: “Can't update policy. Please ensure at least one access rights setting is set“
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

Users receive this error when attempting to create a new Policy on the Dashboard.

### Cause

The Access Rights field is a required setting for a policy.

### Solution

Users should first [create a new API](/try-out-tyk/tutorials/create-api/) and then [create a new policy](/try-out-tyk/tutorials/create-security-policy/) with an existing API in the Access Rights.
