---
date: 2017-03-23T12:59:51Z
title: Security Policy
menu:
  main:
    parent: "Key Concepts"
weight: 75
---

A Tyk security policy incorporates several security options that can be applied to an API key. It acts as a template that can override individual sections of an API key (or identity) in Tyk. For example, if you had 10,000 API keys issued, how would you ensure that all 10,000 users received an upgraded quota or access a new API that you have published?

You could manually modify all 10,000 keys, or you could apply a policy to each of those keys when you create them, and then just modify the policy once.

Policies can set:

* Access lists for API and versions
* Access lists for method and path (granular control)
* Rate limit for a user
* Quota for a user

Each of these can also be overridden in isolation using the partitioning options. When partitioning a policy, only one segment of the policy will be applied to the key. So, for example, if you need to set quotas and rate limits on the user level, but want to manage access control across all of your users, a partitioned policy with only the ACL enabled would achieve this.

