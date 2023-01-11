---
date: 2017-03-23T17:25:43Z
title: Key Expiry
tags: ["Key Expiry"]
description: "How key expiry is managed in Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 5 
---

Key Expiry allows you to set the lifetime of tokens, ensuring a regular re-cycling of API tokens. If a key has expired Tyk will no longer let requests through on a token, however this **does not mean** that Tyk will remove the key.

### Token Expiry Behaviour and Time-To-Live

If a key is expired, Tyk will return a warning that the token has expired to the end user. If a token has been deleted, then Tyk will return an access denied response to the client. This is an important difference. In some cases, API tokens are hard-coded (this is terrible practice, but it does happen far more often than you might think). In this case it is extremely expensive to replace the token if it has expired.

In the above case, if a token had been deleted because the **Time To Live** of the token matched it's expiry time, then the end user would need to replace the token with a new one. However, because we do not expire the key it is possible for an administrator to reset the expiry of the token to allow access and manage renewal in a more granular way.

### Timestamp format on a session object

Tyk manages timestamps in the Unix timestamp format - this means that when a date is set for expiry it should be converted to a Unix timestamp (usually a large integer) which shows seconds since the epoch (Jan 1 1970). This format is used because it allows for faster processing and takes into account timezone differences without needing localisation.

Key sessions are created and updated using the Tyk Gateway API, in order to set the expiry date for a key, update the `expires` value with a Unix timestamp of when the key should expire.

{{< note success >}}
**Note**  

`expires` can only be a positive number, or `0` if you don't want the key to expire.
{{< /note >}}


### How to delete expired tokens

In order to not clutter the database with expired tokens, Tyk provides a way to force a TTL on all keys, this is a maximum time to live and should always be significantly larger than your maximum expiry setting. This setting must be set on a per-API basis.

To enforce a TTL, set the `session_lifetime` value (in seconds) in your API Definition Object, this will need to be managed via the Dashboard REST API.

