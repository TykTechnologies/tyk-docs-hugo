---
date: 2017-03-24T16:14:31Z
title: Useful Debug Modes
menu:
  main:
    parent: "Analytics and Reporting"
weight: 8
---

If you've seen the documentation for the log viewer, then you'll also be wondering how to set up your Tyk configuration to enable detail request logging.

### What is detailed request logging?

When this mode is enabled, Tyk will record the request and response in wire-format in the analytics DB. This can be very useful when trying to debug API requests to see what went wrong for a user or client.

### Enabling Detailed Logging
> **NOTE**: Detailed logging is not available for Tyk SaaS customers.

Enabling detailed logging is very simple and it can be done with either of the following methods:

- Enable detailed analytics at the global configuration level. You will need to update your `tyk.conf` file as follows:

```{.copyWrapper}
"enable_analytics" : true,
"analytics_config": {
  "enable_detailed_recording": true
}
```

> Note that this will enable detailed recording for all APIs and it also requires the gateway to be restarted.

- Enable detailed analytics at the API level. This involves updating your [API definition](/docs/tyk-gateway-api/api-definition-objects) to include this at the root level:

```{.copyWrapper}
"enable_detailed_recording": true
```

> This will enable detailed recording for this API only.

- Enable detailed analytics at the key level. You will need to update your key
  with the following setting. This should also come in at the root level:


```{.copyWrapper}
"enable_detailed_recording": true
```

> This will enable detailed recording only for APIs the key is used to access.


Please note that each of these methods have different level of priorities. The
order below describes how the Gateway determines if detailed recording needs to
be enabled:

- API level is checked. If enabled, record detailed logs else go to the next
  step.
- Key level. If enabled, record detailed logs else go to the next
  step.
- Global configuration.

You will also need your Tyk Pump configured to move data into your preferred data store.
