---
date: 2017-03-24T16:05:56Z
title: Log Browser
menu:
  main:
    parent: "Analyse"
weight: 5 
---

When you look through your Dashboard and your error breakdown statistics, you’ll find that you will want to drill down to the root cause of the errors. This is what the log-browser is for.

The log browser will isolate individual log lines in your analytics data set and allow you to filter them by:

* API Name
* Token ID (hashed)
* Errors Only
* By Status Code

You will be presented with a list of requests, and their metadata:

![Log Viewer][1]

If you then select the *View Details* section of a request line, you can drill down into the meta-data of that request. If you have request and response logging enabled (this must be specially enabled and is not available in Tyk Cloud or Hybrid yet), then you can also view the request payload and response if it is available:

![Log Viewer Details][2]

**A warning on detailed logging:** This mode generates a very large amount of data, and that data exponentially increases the size of your log data set, and may cause problems with delivering analytics in bulk to your MongoDB instances. This mode should only be used to debug your APIs for short periods of time.

[1]: /docs/img/dashboard/usage-data/logViewer.png
[2]: /docs/img/dashboard/usage-data/logViewerDetails.png



