---
date: 2017-03-27T16:28:20+01:00
title: No Key information on the Dashboard
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Information relating to a given key doesn't automatically appear in the Dashboard for users who have switched from an Self-Managed installation to a Multi-Cloud setup.

The stats for a key will never update in the Cloud for a Multi-Cloud installation. The Dashboard in this mode only sets the initial “master” values for a key and those keys are then propagated across the Multi-Cloud instances that are using them (for example, you may have multiple zones with independent Redis DBs) at which point they diverge from each other.

To see the up to date stats for a token, the key must be queried via the Gateway API.

