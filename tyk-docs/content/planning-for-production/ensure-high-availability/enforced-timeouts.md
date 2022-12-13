---
date: 2017-03-24T11:07:33Z
title: Enforced Timeouts
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Enforced Timeouts"]
description: "How to enforce timeouts to keep your Tyk installation responding"
menu:
  main:
    parent: "Ensure High Availability"
weight: 4 
---

Enforced timeouts are a good way to ensure that your service always responds within a given amount of time, even if a long-running process hangs. This is important in high-availability systems where response performance is crucial so errors can be dealt with cleanly.

{{< note success >}}
**Note**  

If you are using the service discovery option, hard timeouts will force the service discovery module to refresh the host / host list.
{{< /note >}}


### Enabling enforced timeouts in API Definitons

To enable an enforced timeout on a path, you must add to your versions' `extended_paths` section:

```{.copyWrapper}
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

### Enabling enforced timeouts in the Tyk Dashboard API Designer

To enable an enforced timeout on an endpoint, select **Enforced timeout** plugin from the **Plugins** drop-down list:

![Plugin dropdown]({{< ref "img/2.10/enforced_breakout.png" >}})

Then enter the enforced timeout in seconds for the endpoint:

![Enforced timeout configuration]({{< ref "img/2.10/enforced_timeouts_settings.png" >}})
