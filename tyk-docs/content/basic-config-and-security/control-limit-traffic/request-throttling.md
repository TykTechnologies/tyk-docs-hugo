---
date: 2019-04-01T12:47:30Z
title: Request Throttling
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 2 
---

## Request Throttling Overview

From v2.8, when hitting quota or rate limits, the Gateway now can now automatically queue and auto-retry client requests. Throttling can be configured at a key or policy level via two new fields: `throttle_interval` and `throttle_retry_limit`. 

1. `throttle_interval`: Interval(in seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.


### Can I disable Request Throttling?

Yes, you can. If you set `throttle_interval` and `throttle_retry_limit` values to smaller than `0`, the feature will not work. The default value is `-1` and means it is disabled by default.    

## Set Request Throttling with the Dashboard

1.  From **System Management** > **Keys** > **Add Key**.

2.  Ensure the new key has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Add Access Rule** and click **Add**.

3.  From the **Throttling** section, select the **Throttle interval** and the **Throttle retry limit** values.
    
![Tyk API Gateway Request Throttling](/docs/img/dashboard/system-management/throttling_update.png)

4.  Save the token, it will be created instantly.

## Set Request Throttling with the Session Object

You should set two values:

1. `throttle_interval`: Interval(seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.
