---
date: 2017-03-24T12:33:05Z
title: Event Types
tags: ["Events", "Types", "JavaScript"]
description: "The events that can be raised in Tyk"
menu:
  main:
    parent: "Report, Monitor and Trigger Events"
weight: 2 
---

### Tyk System Events

The events currently raised by Tyk are:

*   `QuotaExceeded`: Quota for a specific key has been exceeded
*   `RatelimitExceeded`: Rate limit has been exceeded for a specific key
*   `OrgQuotaExceeded`: Quota for a specific organization has been exceeded
*   `OrgRateLimitExceeded`: Rate limit has been exceeded for a specific organization
*   `AuthFailure`: A key has failed authentication or has attempted access and was denied
*   `KeyExpired`: A key has attempted access but is expired
*   `VersionFailure`: A key has attempted access to a version it does not have permission to access
*   `BreakerTriggered`: This event will be created when either a `BreakerTripped`, or a `BreakerReset` event occurs; a status code in the metadata passed to the webhook will indicate which of these events was triggered. This event is not supported in the Tyk Dashboard, but is provided as an alternative to allow configuration of a single webhook for the two circuit breaker events.
*   `BreakerTripped`: When a circuit breaker on a path trips and a service is taken offline.
*   `BreakerReset`: When the circuit breaker comes back on-stream.
*   `TokenCreated`: Executed when a token is created
*   `TokenUpdated`: Executed when a token is changed
*   `TokenDeleted`: Executed when a token is deleted

