---
date: 2017-03-27T17:00:24+01:00
title: Token information doesn't appear in Dashboard for Tyk Hybrid users
menu:
  main:
    parent: "Tyk Hybrid"
weight: 5 
---

### Description

Information relating to a given key doesn't automatically appear in the Dashboard for users who have switched from an On-Prem installation to a Hybrid setup

### Cause

The stats for a key will never update in the cloud for a hybrid installation. The dashboard in this mode only sets the initial "master" values for a key and those keys are then propagated across the hybrid instances that are using them (for example, you may have multiple zones with independent Redis DBs) at which point they diverge from each other.

### Solution

To see the up to date stats for a token, the key must be queried via the Gateway API.