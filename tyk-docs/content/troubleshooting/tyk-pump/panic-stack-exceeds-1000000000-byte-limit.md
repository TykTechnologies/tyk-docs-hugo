---
date: 2017-03-27T17:33:45+01:00
title: Tyk Pump Panic “stack exceeds 1000000000-byte limit“
menu:
  main:
    parent: "Tyk Pump Troubleshooting"
weight: 5 
---

### Description

Users receive a the aforementioned error message in a stack trace in the Pump.

### Cause

Users receive a the aforementioned error message in a stack trace in the Pump.

### Solution

Users are advised to upgrade to the latest version of Tyk. They must also ensure that their Pump is configured with a `purge_delay` and an `optimisation_max_active` value that's greater than 0. Packages are available to download from [Packagecloud.io][1] and further details on how to upgrade can be found [here][2].

 [1]: https://packagecloud.io/tyk
 [2]: /upgrading-v2-3-v2-2/