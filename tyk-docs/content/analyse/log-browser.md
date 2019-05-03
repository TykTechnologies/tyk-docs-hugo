---
date: 2017-03-24T16:05:56Z
title: Log Browser
menu:
  main:
    parent: "Analyse"
weight: 5 
---

When you look through your Dashboard and your error breakdown statistics, you'll find that you will want to drill down to the root cause of the errors. This is what the Log Browser is for.

The Log Browser will isolate individual log lines in your analytics data set and allow you to filter them by:

* API Name
* Token ID (hashed)
* Errors Only
* By Status Code

You will be presented with a list of requests, and their meta-data:

![Log Viewer][1]

Click a request to view its details. 

![Log Viewer Details][2]

### On-Premises Installations Option

On an On-Premises installation, if you have request and response logging enabled, then you can also view the request payload and the response if it is available.
To enable request and response logging, set both `enable_analytics` and
`enable_detailed_recording` to `true` in your `tyk.conf` file. You then need to re-start your Tyk Pump.

**A warning on detailed logging:** This mode generates a very large amount of data, and that data exponentially increases the size of your log data set, and may cause problems with delivering analytics in bulk to your MongoDB instances. This mode should only be used to debug your APIs for short periods of time.

[1]: /docs/img/dashboard/usage-data/log_browser_new.png
[2]: /docs/img/dashboard/usage-data/log_details_2.5.png



