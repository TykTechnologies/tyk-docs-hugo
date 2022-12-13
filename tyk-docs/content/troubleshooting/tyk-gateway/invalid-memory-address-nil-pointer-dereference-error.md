---
date: 2017-03-27T17:25:35+01:00
title: “Invalid memory address or nil pointer dereference“ error
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 5 
---

### Description

"Invalid memory address or nil pointer dereference" error

### Cause

There are a number of reasons, most commonly, an API may have been configured incorrectly in some way (for instance, it may have been set up without an organisation). The error itself is a specific to Go language which Tyk was written in and could also suggest that alterations made to the code by the user could also be the culprit.

### Solution

Make sure that API definitions are set up correctly. Information on how to do this with the Tyk Gateway API can be found in the following links:

*   [API Definition Object Details](/tyk-gateway-api/api-definition-objects/)
*   [API Management](/tyk-gateway-api/)