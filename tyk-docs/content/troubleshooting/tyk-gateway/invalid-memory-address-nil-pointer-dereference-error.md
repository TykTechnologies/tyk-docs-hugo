---
date: 2017-03-27T17:25:35+01:00
title: “Invalid memory address or nil pointer dereference“ error
menu:
  main:
    parent: "Tyk Gateway"
weight: 5 
---

### Description

"Invalid memory address or nil pointer dereference" error

### Cause

There are a number of reasons, most commonly, an API may have been configured incorrectly in some way (for instance, it may have been set up without an organisation). The error itself is a specific to Go language which Tyk was written in and could also suggest that alterations made to the code by the user could also be the culprit.

### Solution

Make sure that API definitions are set up correctly. See [Tyk Gateway API Management](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/) and [API Definition Object details](/docs/tyk-gateway-api/api-definition-objects/) for more details.
