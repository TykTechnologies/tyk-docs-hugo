---
date: 2017-03-23T16:11:54Z
title: Open (Keyless)
menu:
  main:
    parent: "Authentication & Authorization"
weight: 5 
---

Tyk keyless access represents completely open access for your API and causes Tyk to bypass any session-based middleware (middleware that requires access to token-related metadata). Most middleware will work with keyless access (header transformation, mocks, virtual endpoints, etc.).

Open access is very useful for situations where analytics is the key reason for tracking usage, using the Tyk node as a reverse logging proxy, since it adds extremely low latency to proxied requests. It can offer a great way to monitor how an API is being used by existing users without having to use a key store.

Keyless access will allow all requests through. All access control, versioning, quotas and rate limiting will not be possible as individual sessions are not identified.

To implement keyless access, simply set the flag in your API Definition:

```{.copyWrapper}
{
  ...
  "use_keyless": true,
  "auth": {
      "auth_header_name": ""
  },
  ...
}
```
This will stop checking keys that are proxied by Tyk.

> **NOTE**: Keyless APIs cannot be selected for [Access Rights](/docs/get-started/with-tyk-cloud/tutorials/create-security-policy/#step-6-add-a-security-entry) in a security policy.

