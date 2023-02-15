---
date: 2017-03-27T17:00:24+01:00
title: Key information doesn't appear in Dashboard for Tyk Multi-Cloud users
menu:
  main:
    parent: "Tyk Multi-Cloud"
weight: 5 
---

### Description

Information relating to a given key doesn't automatically appear in the Dashboard for users who have switched from an Self-Managed installation to a Multi-Cloud setup

### Cause

The stats for a key will never update in the cloud for a Multi-Cloud installation. The dashboard in this mode only sets the initial "master" values for a key and those keys are then propagated across the Multi-Cloud instances that are using them (for example, you may have multiple zones with independent Redis DBs) at which point they diverge from each other.

### Solution

To see the up to date stats for a token, the key must be queried via the Gateway API.