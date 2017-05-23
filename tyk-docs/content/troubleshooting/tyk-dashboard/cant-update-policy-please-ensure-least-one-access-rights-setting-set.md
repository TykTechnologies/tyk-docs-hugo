---
date: 2017-03-27T17:50:34+01:00
title: “Can't update policy. Please ensure at least one access rights setting is set“
menu:
  main:
    parent: "Tyk Dashboard"
weight: 5 
---

### Description

Users receive this error when attempting to create a new Policy on the Dashboard.

### Cause

The Access Rights field is a required setting for a policy.

### Solution

Users should first [create a new API][1] and then create a new policy with an existing API in the Access Rights . Instruction on how to create a new security policy can be found [here][2].

 [1]: /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-api/
 [2]: /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-security-policy/