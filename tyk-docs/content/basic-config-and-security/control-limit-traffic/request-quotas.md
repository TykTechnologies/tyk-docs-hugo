---
date: 2017-03-23T17:13:30Z
title: Request Quotas
tags: ["Quotas", "Rate Limiting"]
description: "How to set time period quotas for requests in Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 3 
aliases:
  - /control-limit-traffic/request-quotas/
---

## Quotas Overview

A quota is similar to a rate limit, as it allows a certain number of requests through in a time period. However traditionally these periods are much longer, For example, if you would like to have a user only have 10,000 requests to the API per month, you can create a key that has no rate limiting but will disallow access once the quota is empty. Tyk will automatically reset the quota if the time limit on reset has been exceeded.

### How do Quotas Work?

Quotas in Tyk use a decrementing counter in the token's session object to measure when to block inbound requests.

### How do Quotas Renew?

In Tyk, most things are event-driven, the same goes for quotas. Since all quotas have a reset time limit, they do not "reset" on a specific date (e.g. 1st of the month), instead they "reset" on or after a date has passed, and only when the key is actively being used. This means that the period can "move" if the token is only partially active.

### Why is the Quota System Like This?

In a system with 1,000,000 tokens, managing timers to watch and monitor each token is extremely expensive and inefficient. So in order to keep quotas sane and not clutter up the DB with unnecessary timers, quotas are event-driven.

It is possible to have monthly quotas that set on a specific date, using the Tyk Gateway API it is possible to reset known token quotas periodically using an external timer.

### Can I Disable Quotas?

Yes you can - to disable the quota middleware in an API definition, select the **Disable Quotas** option in the API designer, or set the value of `disable_quota` to `true` in your API Definition.

## Set a Quota with the Dashboard

1.  Add a Key from the **System Management > Keys** menu.

2.  Ensure the new key has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Choose API**. Turn the **Set per API Limits and Quota** options on.

3.  From the **Usage Quotas** section, set the **Max Requests per period** - this is the maximum number of requests that are allowed to pass through the proxy during the period.

4.  Set the **Quota resets every** drop down to the period you would like the quota to be active for. If the pre-sets do not meet your requirements, the quota period can be set using the session object method and the REST API.

5.  The **Remaining requests for period** field displays how many more times the API can be requested for the quota set.
    
{{< img src="/img/2.10/api_rate_limits_keys.png" alt="Tyk API Gateway Quotas" >}}

1.  Save the token, it will be created instantly.

## Set a Quota with the Session Object

In order to set a quota for a token:

1. Ensure that `quota_max` is set to the maximum amount of requests that a user is allowed to make in a time period.
2. Ensure `quota_remaining` is set to the same value as `quota_max`, this is the value that will decrement on each request (failed or successful).
3. Set the `quota_renewal_rate` to the value, in seconds, of when the quota should renew. For example, if you would like it to renew every 30 days, you would have `2592000` seconds `(((60*60) * 24) * 30 = 2592000)`.

{{< note success >}}
**Note**  

To set an unlimited quota, set `quota_max` to `-1`.
{{< /note >}}

[1]: /img/dashboard/system-management/usage_quotas_2.5.png
