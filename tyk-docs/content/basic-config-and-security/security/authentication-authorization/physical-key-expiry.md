---
date: 2017-03-23T16:15:37Z
title: Physical Key Expiry and Deletion
tags: ["Keys", "Expiry"]
description: "How to expire keys in Tyk"
menu:
  main:
    parent: "Authentication & Authorization"
weight: 8
aliases:
    - /basic-config-and-security/security/authentication-authorization/physical-token-expiry/
---


Tyk makes a distinction between a key expiring for an end user and a key physically expiring and being deleted.

When setting a key expiry on the session object, this will not affect whether the key is deleted or not. In fact, by default Tyk will not delete or expire a key.

However, in some cases it is preferable to delete keys in Redis - for example, so as not to clutter up your database with obsolete keys.

You have 3 options for expiring and deleting keys in Tyk:

1.  At the API level
2.  At the Global level
3.  At a forced Global level

### Expiring and deleting keys at the API level


Set the `session_lifetime` field in your API Definition to make sure that keys are automatically deleted when the period you set in seconds has passed.

Example: To have keys live in Redis for only 24 hours (and be deleted 24 hours post their creation) set it as follow:
```{.json}
"session_lifetime": 86400
```
If this is not set, then the default is 0 seconds, which means the key will not be deleted from Redis.

This feature works nicely with JWT or OIDC auth methods since the keys get created in Redis the first time they are in use so you know when it will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a big `session_lifetime` otherwise the user might use the key AFTER it has already been removed from Redis.

### Expiring and deleting tokens at the Global level

If `session_lifetime` has not been set at the API level, it is possible to set a global expiration for all keys after expiry time has passed by setting `global_session_lifetime` in the `tyk.conf` file to an integer value in seconds. This value will only be active if the session lifetime has not been set. The session lifetime will always supersede the global lifetime.

### Force expiration and deletion at Global level

It is possible to override the session lifetime setting with the global lifetime setting by setting the `force_global_session_lifetime` to `true` in the `tyk.conf` file.
