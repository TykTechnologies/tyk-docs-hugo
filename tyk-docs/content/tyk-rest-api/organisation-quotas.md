---
date: 2017-03-27T11:54:47+01:00
title: Organisation Quotas
menu:
  main:
    parent: "Tyk Rest API"
weight: 8 
---

### Overview

It is possible to force API quota limiting across all keys that belong to a specific organisation ID, the rate limiting on an organisation level is useful for creating tiered access levels and trial accounts.

The Organisation rate limiting middleware only works with Quotas and not access throttling. In order to manage this functionality, a simple API has been put in place to manage these sessions.

Although the Organisation session-limiter uses the same session object, all other security keys are optional as they are not used.

### Managing active status

To disallow access to an entire group of keys without rate limiting the organisation, create a session object with the `"is_inactive"` key set to `true`, this will block access before any other middleware is executed. This is useful when managing subscriptions for an organisation group and access needs to be blocked because of non-payment.

### Create organisation keys

| **Property** | **Description**   |
| ------------ | ----------------- |
| Resource URL | `/tyk/orgs/keys/` |
| Method       | POST              |
| Type         | JSON              |
| Body         | Session Object    |

#### Options

Adding the `reset_quota` parameter and setting it to `1`, will cause Tyk reset the organisations quota in the live quota manager, it is recommended to use this mechanism to reset organisation-level access if a monthly subscription is in place.

By default the quota will reset when the `per` limit is reached and the key refreshes, this means that should an organisation use the service from day 1 month 1, and then use up their quota by day 20. On day 30, the key expires and the quota is open again, however if the organisation only accesses the API again on day 10, month 2, then the quota will be active from day 10, month 2 and therefore renew on day 10 Month 4, since the rate limiter is initialised when the org is next seen.

This reset quota mechanism is in place to allow a manual initialisation of the rate limiter to prevent this default reload off-cycle.

#### Sample request

```
    POST /tyk/orgs/keys/ HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
    Cache-Control: no-cache
    
    {
        "quota_max": 60,
        "quota_renews": 1406121006,
        "quota_remaining": 0,
        "quota_renewal_rate": 60,
        "org_id": "53ac07777cbb8c2d53000002"
    }
```

#### Sample response

```
    {
        "key": "53ac07777cbb8c2d53000002",
        "status": "ok",
        "action": "create",
        "is_inactive": false
    }
```

### Add/update organisation keys

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/tyk/orgs/keys/{{orgId}}` |
| Method       | POST or PUT                |
| Type         | JSON                       |
| Body         | Session Object             |

#### Options

Adding the `reset_quota` parameter and setting it to `1`, will cause Tyk reset the organisations quota in the live quota manager, it is recommended to use this mechanism to reset organisation-level access if a monthly subscription is in place, simply PUT the same session object into Tyk with the reset parameter and the organisation will continue to have access.

By default the quota will reset when the `per` limit is reached and the key refreshes, this means that should an organisation use the service from day 1 month 1, and then use up their quota by day 20. On day 30, the key expires and the quota is open again, however if the organisation only accesses the API again on day 10, month 2, then the quota will be active from day 10, month 2 and therefore renew on day 10 Month 4, since the rate limiter is initialised when the org is next seen.

This reset quota mechanism is in place to allow a manual initialisation of the rate limiter to prevent this default reload off-cycle.

#### Sample request

```
    PUT /tyk/org/keys/53ac07777cbb8c2d53000002 HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
    Cache-Control: no-cache
    
    {
        "quota_max": 60,
        "quota_renews": 1406121006,
        "quota_remaining": 0,
        "quota_renewal_rate": 60,
        "org_id": "53ac07777cbb8c2d53000002"
    }
```

#### Sample response

```
    {
        "key": "53ac07777cbb8c2d53000002",
        "status": "ok",
        "action": "modified"
    }
```

### Delete organisation key

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/tyk/org/keys/{{orgId}}` |
| Method       | DELETE                    |
| Type         | None                      |
| Body         | None                      |
| Params       | None                      |

#### Sample request

```
    DELETE /tyk/org/keys/53ac07777cbb8c2d53000002 HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
    Cache-Control: no-cache
```

#### Sample response

```
    {
        "key": "53ac07777cbb8c2d53000002",
        "status": "ok",
        "action": "deleted"
    }
```

### List Organisation Keys

You can retrieve all the keys in your Tyk instance.

| **Property** | **Description**  |
| ------------ | ---------------- |
| Resource URL | `/tyk/org/keys/` |
| Method       | GET              |
| Type         | None             |
| Body         | None             |
| Params       | None             |

#### Sample request

```
    GET /tyk/org/keys/ HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
    Cache-Control: no-cache
```

#### Sample response

```
    {
        "keys": [
            "53ac07777cbb8c2d53000002c29ebe0faf6540e0673d6af76b270088",
            "53ac07777cbb8c2d530000027776e9f910e94cd9552c22c908d2d081",
            "53ac07777cbb8c2d53000002d698728ce964432d7167596bc005c5fc",
            "53ac07777cbb8c2d530000028210d848c5854cb35917b2f013529d95"
        ]
    }
```
