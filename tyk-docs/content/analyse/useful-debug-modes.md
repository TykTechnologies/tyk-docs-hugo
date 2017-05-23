---
date: 2017-03-24T16:14:31Z
title: Useful Debug Modes
menu:
  main:
    parent: "Analyse"
weight: 8 
---

If you've seen the documentation for the log viewer, then you'll also be wondering how to set up your Tyk configuration to enable detail request logging.

### What is detailed request logging?

When this mode is enabled, Tyk will record the request in wire-format and the response in wire-format in the analytics DB. This can be very useful when trying to debug API requests to see what went wrong for a user or client.

### Enabling Detail Logging

To enable detail logging is very simple, just enable the setting in your `tyk.conf` file:

```
    "analytics_config": {
        "enable_detailed_recording": true
    }
```

You will need to restart the Gateway in order for this to work.

You will also need Tyk Pump configured to move your data into your preferred data store.

