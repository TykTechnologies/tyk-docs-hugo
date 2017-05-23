---
date: 2017-03-23T16:54:24Z
title: Partitioned Policies
menu:
  main:
    parent: "Security Policies"
weight: 2 
---

In some cases, the all-or-nothing approach of policies, where all components of access control, quota and rate limit are set together isn't ideal, and instead you may wish to have only one or two segments of a token managed at a policy level. A good example is a scenario where you are providing access tokens across a sliding scale of quota's that vary from user to user, here having many policies is inefficient, you might as well set those values on the token level. However you do not want to manage access control lists on a per-token level.

In this case, a partitioned policy can come in useful.

A partitioned policy can enforce any of these elements individually or together on a token:

*   The ACL
*   The Rate limit
*   The Quota limit

### Set up a partition

Set up a policy to be partitioned by adding a new field to your policy object:

```
    "partitions": {
        "quota": false,
        "rate_limit": false,
        "acl": false
    }
```

*   `quota`: If set to `true`, enforce the quota element of this policy
*   `rate_limit`: If set to `true`, enforce the rate limit of this policy
*   `acl`: If set to `true`, enforce the access control rules of this policy

Partitions can be applied together, if you select all of them then essentially the whole policy will be enforced.

> **Warning**: Partitioned policies are *not* suitable for developer portal deployment or generative tokens such as JWT or OAuth clients linked to Policies and *should not be used for this case*.
