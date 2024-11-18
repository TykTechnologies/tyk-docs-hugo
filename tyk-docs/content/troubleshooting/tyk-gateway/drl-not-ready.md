---
title: DRL not ready, skipping this notification
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 7
---

### Description

You see the following `Log Warning:`

`DRL not ready, skipping this notification`


### Cause

There can be a couple of reasons for seeing this error about the [Distributed Rate Limiter]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting" >}}):

 1. When you have more than one installation of the Gateway with one configured to use DRL, and others not.
 2. When the Gateway is started and the DRL receives an event before it has finished initialising.

### Solution

For cause **1**, ensure that all instances of the Tyk Gateway are configured to use DRL.

For cause **2**, the error will disappear when the DRL has initialised. 