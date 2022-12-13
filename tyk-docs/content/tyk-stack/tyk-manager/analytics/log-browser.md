---
date: 2017-03-24T16:05:56Z
title: Log Browser
menu:
  main:
    parent: Analytics
weight: 5
aliases:
  - /analytics-and-reporting/log-browser/
---

When you look through your Dashboard and your error breakdown statistics, you'll find that you will want to drill down to the root cause of the errors. This is what the Log Browser is for.

The Log Browser will isolate individual log lines in your analytics data set and allow you to filter them by:

* API Name
* Token ID (hashed)
* Errors Only
* By Status Code

You will be presented with a list of requests, and their metadata:

![Log Viewer]({{< ref "img/2.10/log_browser.png" >}})

Click a request to view its details.

![Log Viewer Details]({{< ref "img/2.10/log_browser_selected.png" >}})

### On-Premises Installations Option

In an On-Premises installation, if you have request and response logging enabled, then you can also view the request payload and the response if it is available.
To enable request and response logging, please take a look at [useful debug modes]({{< ref "tyk-stack/tyk-pump/useful-debug-modes" >}}) .

**A warning on detailed logging:** This mode generates a very large amount of data, and that data exponentially increases the size of your log data set, and may cause problems with delivering analytics in bulk to your MongoDB instances. This mode should only be used to debug your APIs for short periods of time.

{{< note success >}}
**Note**  

Detailed logging is not available for Tyk Cloud Classic customers.
{{< /note >}}

