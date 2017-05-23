---
date: 2017-03-24T11:07:33Z
title: Enforced Timeouts
menu:
  main:
    parent: "Ensure High Availability"
weight: 4 
---

Enforced timeouts are a good way to ensure that your service always responds within a given amount of time, even if a long-running process hangs. This is important in high-availability systems where response performance is crucial so errors can be dealt with cleanly.

> **Note**: If you are using the service discovery option, hard timeouts will force the service discovery module to refresh the host / host list.

### Enabling enforced timeouts in API Definitons

To enable an enforced timeout on a path, you must add to your versions' `extended_paths` section:

```
    extended_paths: {
            ...
            transform_response_headers: [],
            hard_timeouts: [{
            path: "delay/5",
            method: "GET",
            timeout: 3
        }]
    }
```

### Enabling enforced timeouts in Dashboard API Designer

To enable an enforced timeout on an endpoint, simply select it from the drop down:

![Plugin dropdown][1]

Then enter the timeout in seconds for the endpoint:

![Enforced timeout configuration][2]

[1]: /docs/img/dashboard/system-management/enforcedTimeoutDesigner.png
[2]: /docs/img/dashboard/system-management/enforcedTimeoutConfig.png
