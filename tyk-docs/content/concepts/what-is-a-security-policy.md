---
date: 2017-03-23T12:59:51Z
title: What is a Security Policy?
menu:
  main:
    parent: "Concepts"
weight: 4 
---

A policy encapsulates several security options that can be applied to a token. It acts as a template that can override individual sections of an API token (or identity) in Tyk. A good example is if you had 10,000 API tokens issued, how would you ensure that all 10,000 users received an upgraded quota, or access to a new API that you have published?

You could manually modify all 10,000 tokens, or you could apply a policy to each of those tokens when you create them, and then just modify the policy once.

Policies can set:

* Access lists for API and versions
* Access lists for method and path (granular control)
* Rate limit for a user
* Quota for a user

Each of these can also be overridden in isolation using the partitioning options. When partitioning a policy, only one segment of the policy will be applied to the token. So, for example, if you need to set quotas and rate limits on a per client basis, but want to manage access control across all of your clients, a partitioned policy with only the ACL enabled would achieve this.

