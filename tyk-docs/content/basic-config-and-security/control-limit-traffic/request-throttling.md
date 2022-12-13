---
date: 2019-04-01T12:47:30Z
title: Request Throttling
tags: ["Request Throttling"]
description: "How to queue and retry requests in Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 2 
---

## Request Throttling Overview

From v2.8, when hitting quota or rate limits, the Gateway can automatically queue and auto-retry client requests. Throttling can be configured at a *key* or *policy* level via the following two fields: 

1. `throttle_interval`: Interval (in seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.


### Can I disable Request Throttling?

Yes, you can. If you set `throttle_interval` and `throttle_retry_limit` values to smaller than `0`, the feature will not work. The default value is `-1` and means it is disabled by default.    

## Set Request Throttling with the Dashboard

1.  At the key level: From **System Management** > **Keys** > **Add Key** or open an existing key.
    Or
    At the policy level: From **System Management** > **Policies** > **Add Policy** or open an existing policy.
    
2.  Ensure the new key or policy has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Add Access Rule** and click **Add**.

3.  From the **Throttling** section, select the **Throttle interval** and the **Throttle retry limit** values.
    
![Tyk API Gateway Throttling](img/dashboard/system-management/throttling_update.png)

4.  Save the token/policy.

## Set Request Throttling in the object

Get the policy object with `GET /api/portal/policies/` or the key's session object via `GET /api/apis/{aPI-ID}/keys/` and then  set two fields, `throttle_interval` and `throttle_retry_limit` in the object and create a new object or update the exsiting one.
   