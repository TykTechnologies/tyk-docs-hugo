---
date: 2017-03-24T12:33:05Z
title: Event types
tags: ["API events", "event handling", "event type"]
description: "The standard events that the Gateway can generate"
---

The built-in events that Tyk Gateway will generate are:

### Rate limit events

- `RatelimitExceeded`: the rate limit has been exceeded for a specific key
- `OrgRateLimitExceeded`: the rate limit has been exceeded for a specific organization
- `RateLimitSmoothingUp`: the [intermediate rate limit allowance]({{< ref "getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) has been increased for a specific key
- `RateLimitSmoothingDown`: the [intermediate rate limit allowance]({{< ref "getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) has been decreased for a specific key

### Standard quota events

- `QuotaExceeded`: the quota for a specific key has been exceeded
- `OrgQuotaExceeded`: the quota for a specific organization has been exceeded

### Authentication failure events

- `AuthFailure`: a key has failed authentication or has attempted access and was denied
- `KeyExpired`: an attempt has been made to access an API using an expired key

### API version events

- `VersionFailure`: a key has attempted access to a version of an API that it does not have permission to access

### Circuit breaker events

- `BreakerTripped`: a circuit breaker on a path has tripped and been taken offline
- `BreakerReset`: a circuit breaker has reset and the path is available again
- `BreakerTriggered`: a circuit breaker has changed state, this is generated when either a `BreakerTripped`, or a `BreakerReset` event occurs; a status code in the metadata passed to the webhook will indicate which of these events was triggered

### Uptime events

- `HostDown`: the uptime checker has found that a host is down/not available
- `HostUp`: the uptime checker has found that a host is available again after being offline

### Token lifecycle events

- `TokenCreated`: a token has been created
- `TokenUpdated`: a token has been changed/updated
- `TokenDeleted`: a token has been deleted
