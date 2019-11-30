---
date: 2017-03-23T16:15:37Z
title: Physical Token Expiry
menu:
  main:
    parent: "Your APIs"
weight: 5 
---


Tyk makes a distinction between a token expiring for an end user and a token physically expiring and being deleted.

When setting a token expiry on the session object, this will not affect whether the token is deleted or not. In fact, by default Tyk will not delete or expire a token.

However, in some cases it is preferable to have tokens deleted - for example, so as not to clutter up your Redis DB with obsolete tokens.

The way Tyk handles physical token deletion is in three stages:

1.  At the API level
2.  At the Global level
3.  A forced Global level

### Expiring tokens at the API level


Set `session_lifetime` field in the API Definition to make sure that keys are automatically deleted when the period you set in seconds has passed.

Example: To have keys live in Redis for only 24 hours (and be deleted 24 hours post their creation) set it as follow:
```{.json}
"session_lifetime": 86400
```
If this is not set, then the default is 0 seconds, which means the token will not be deleted from Redis.

This feature works nicely with JWT or OIDC auth methods since the keys get created in Redis the first time they are in use so you know when it will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a big `session_lifetime` otherwise the user might use the key AFTER it has already been removed from Redis.

### Expiring tokens at the Global level

If `session_lifetime` has not been set at the API level, it is possible to set a global expiration for all tokens after the token's expiry time by setting `global_session_lifetime` in the `tyk.conf` file to an integer value in seconds. This value will only be active if the session lifetime has not been set. The session lifetime will always supersede the global lifetime.

### Forcing expiry at Global level

It is possible to override the session lifetime setting with the global lifetime setting by setting the `force_global_session_lifetime` to `true` in the `tyk.conf` file.

