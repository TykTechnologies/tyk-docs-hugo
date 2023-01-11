---
date: 2017-03-23T16:58:50Z
title: Key Level Security
tags: ["Keys", "Security"]
description: "How to configure access control at key level in Tyk"
menu:
  main:
    parent: "Security"
weight: 7 
---

Tyk supports the concept of access control at the key level. Access control is managed via three important settings in a session object. In order to be fully clear on how Tyk handles access control, it's worth looking at the key settings that go into a user session object. A full description of each of the options can be found in the [Tyk Gateway API documentation]({{< ref "tyk-gateway-api" >}}).

Tyk will store each access key as a record in your Redis database, and this key will have certain metadata attached to it. The record takes this form:

```{.copyWrapper}
{
  "allowance": 1000,
  "rate": 1000,
  "per": 60,
  "expires": -1,
  "quota_max": -1,
  "quota_renews": 1406121006,
  "quota_remaining": 0,
  "quota_renewal_rate": 60,
  "access_rights": {
    "APIID1": {
      "api_name": "HMAC API",
      "api_id": "APIID1",
      "versions": [
        "Default"
      ]
    }
  },
  "org_id": "1",
  "hmac_enabled": false,
  "hmac_string": ""
}
```

The important elements that manage access control are the following fields:

*   `allowance` & `rate`: these should be set to the same value, these are the users allowance during a period as set by `per`.
*   `per`: The time in seconds where a rate limit is applied.
*   `expires`: The date when the key expires. **Note:** `expires` can only be a positive number, or -1 (unlimited).
*   `quota_max`: The usage quota for the user. **Note:** `quota_max` can only be a positive number, or -1 (unlimited).
*   `quota_renews`: the Unix timestamp when the quota is renewed.
*   `quota_renewal_rate`: The time, in seconds, of when the quota gets renewed (e.g. 86400 would represent 1 day).

These settings can be used exclusively or in conjunction with one another to create usage patterns and tiers of access for your users. Each time a request is processed by Tyk, the session will be updated with an updated quota (if used), and updated throttling rate depending on the time-frame specified.

Creating new keys is done by POSTing an object such as the above to the Tyk create key API endpoint. See the keys section of the [Tyk Gateway API OpenAPI/Swagger]({{< ref "tyk-gateway-api" >}}) page.

### Ongoing access limits and control

The three types of access control are:

#### Rate limiting

Also known as throttling, the API will actively only allow a key to make x requests per y time period. this is very useful if you want to ensure your API does not get flooded with requests.

In order to apply a rate limit:

1.  Ensure that `allowance` and `rate` are set to the same value, this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.
2.  Ensure that `per` is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 per 5 seconds, set this value to 5 etc.

#### Quotas

A quota is similar to a rate limit, as it allows a certain number of requests through in a time period. However, traditionally these periods are much longer, so for example if you would like to limit a user to only 10,000 requests to the API per month, you can create a key that has no rate limiting but will disallow access once the quota is empty. Tyk will automatically reset the quota if the time limit on reset has been exceeded.

In order to set a quota for a user:

1.  Ensure that `quota_max` is set to the maximum amount of requests that a user is allowed to make in a time period.
2.  Ensure `quota_remaining` is set to the same value as `quota_max`, this is the value that will decrement on each request (failed or successful).
3.  Set the `quota_renewal_rate` to the value, in seconds, of when the quota should renew. For example, if you would like it to renew every 30 days, you would have `2592000` seconds (`((60*60) * 24) * 30 = 2592000`).

To set an unlimited quota, set `quota_max` to `-1`.

{{< note success >}}
**Note**  

`quota_max` can only be a positive number, or -1 (unlimited).
{{< /note >}}

#### Key Expiry

If you set a date in the key expiry field, when the key is created (or updated), the expiry time is also set as the keys deletion time from Redis. If a key has expired Tyk will no longer let requests through on this key.

Tyk manages timestamps in the Unix timestamp format - this means that when a date is set for expiry it should be converted to a Unix timestamp (usually a large integer) which shows seconds since the epoch (Jan 1 1970). This format is used because it allows for faster processing and takes into account timezone differences without needing localisation.

Key sessions are created and updated using the Tyk REST API, in order to set the expiry date for a key, update the `expires` value with the timestamp of when the key should expire.

Leave this field empty for it never to expire.
