---
date: 2019-04-01T12:47:30Z
title: Request Throttling
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 2 
---

## Request Throttling Overview

Request Throttling enhances rate limiting. When a request is not allowed because of rate limiting, it retries the same request at a specified number of intervals for a specified number of times.


### Can I disable Request Throttling?

Yes, you can. If you set `throttle_interval` and `throttle_retry_limit` values to smaller than `0`, the feature will not work. The default value is `-1` and means it is disabled by default.    

## Set Request Throttling with the Dashboard

1.  From **System Management** > **Keys** > **Add Key**.

2.  Ensure the new key has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Add Access Rule** and click **Add**.

3.  From the **Throttling** section, select the **Throttle interval** and the **Throttle retry limit** values.
    
![Tyk API Gateway Request Throttling][1]

4.  Save the token, it will be created instantly.

## Set Request Throttling with the Session Object

You should set two values:

1. `throttle_interval`: Interval(seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.



[1]: /docs/img/dashboard/system-management/request_throttling_2.8.png
