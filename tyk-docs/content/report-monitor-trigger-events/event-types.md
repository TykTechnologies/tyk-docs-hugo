---
date: 2017-03-24T12:33:05Z
title: Event Types
menu:
  main:
    parent: "Report , Monitor and Trigger Events"
weight: 2 
---

### Tyk System Events

The events currently raised by Tyk are:

*   `QuotaExceeded`: Quota for a specific key has been exceeded
*   `RatelimitExceeded`: Rate limit has been exceeded for a specific key
*   `AuthFailure`: A key has failed authentication or has attempted access and was denied
*   `KeyExpired`: A key has attempted access but is expired
*   `VersionFailure`: A key has attempted access to a version it does not have permission to access
*   `BreakerTripped`: When a circuit breaker on a path trips and a service is taken offline
*   `BreakerReset`: When the circuit breaker comes back on-stream
*   `TokenCreated`: Executed when a token is created
*   `TokenUpdated`: Executed when a token is changed
*   `TokenDeleted`: Executed when a token is deleted

