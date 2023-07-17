---
date: 2017-03-23T16:15:37Z
title: Key Expiry and Deletion
tags: ["Keys", "Expiry", "Deletion", "Lifetime", "Session"]
description: "How to expire keys in Tyk"
menu:
  main:
    parent: "Authentication & Authorization"
weight: 8
aliases:
  - /basic-config-and-security/security/authentication-authorization/physical-token-expiry/
---

Tyk makes a clear distinction between an API authorisation key expiring and being deleted from the Redis storage.

- When a key expires, it remains in the Redis storage but is no longer valid. Consequently, it is no longer authorised to access any APIs. If a key in Redis has expired and is passed in an API request, Tyk will return `HTTP 401 Key has expired, please renew`.
 - When a key is deleted from Redis, Tyk no longer knows about it, so if it is passed in an API request, Tyk will return `HTTP 400 Access to this API has been disallowed`.

Tyk provides separate control for the expiration and deletion of keys.

Note that where we talk about keys here, we are referring to [Session Objects]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}), also sometimes referred to as Session Tokens

## Key Expiry

Tyk's API keys ([token session objects]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}})) have an `expires` field. This is a UNIX timestamp and, when this date/time is reached, the key will automatically expire; any subsequent API request made using the key will be rejected.

## Key Lifetime

Tyk does not automatically delete keys when they expire. You may prefer to leave expired keys in the Redis, so that they can be renewed (for example if a user has - inadvisedly - hard coded the key into their application), or you may wish to delete keys to avoid cluttering up your Redis database with obsolete keys.

You have two options for configuring the lifetime of keys when using Tyk:

1.  At the API level
2.  At the Gateway level

### API-level key lifetime control

You can configure Tyk to delete keys after a configurable period (lifetime) after they have been created. Simply set the `session_lifetime` field in your API Definition and keys created for that API will automatically be deleted when that period (in seconds) has passed.

For example, to have keys live in Redis for only 24 hours (and be deleted 24 hours after their creation) set:

```{.json}
"session_lifetime": 86400
```

The default value for `session_lifetime` is 0 seconds, which means that keys will not be deleted from Redis.

{{< note success >}} 
**Note**

There is a risk, when configuring API-level lifetime, that a key will be deleted before it has expired, as `session_lifetime` is applied regardless of whether the key is active or expired. To protect against this, you can configure the [session_lifetime_respects_key_expiration]({{< ref "tyk-oss-gateway/configuration#session_lifetime_respects_key_expiration" >}}) parameter in your `tyk.conf`, so that keys that have exceeded their lifetime will not be deleted from Redis until they have expired.
{{< /note >}}

This feature works nicely with [JWT]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) or [OIDC]({{< ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) authentication methods, as the keys are created in Redis the first time they are in use so you know when they will be removed. Be extra careful in the case of keys created by Tyk (Auth token or JWT with individual secrets) and set a long `session_lifetime`, otherwise the user might try to use the key **after** it has already been removed from Redis.

### Gateway-level key lifetime control

You can set a global lifetime for all keys created in the Redis by setting [global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#global_session_lifetime" >}}) in the `tyk.conf` file; this parameter is an integer value in seconds.

It is important to note that `session_lifetime` usually takes precedence over `global_session_lifetime`, so the gateway-level control will only apply if no per-API lifetime has been configured.

You can override the per-API lifetime with the global lifetime setting using the [force_global_session_lifetime]({{< ref "tyk-oss-gateway/configuration#force_global_session_lifetime" >}}) parameter in the `tyk.conf` file.
