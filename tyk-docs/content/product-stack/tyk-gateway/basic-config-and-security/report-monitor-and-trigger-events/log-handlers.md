---
date: 2024-07-09
title: Logging API events
tags: ["event handling", "API events", "logging"]
description: "Logging event handler"
---

Tyk’s built-in logging event handler is designed primarily for debugging purposes and will store details of an API event to the configured logger output.

The Tyk platform can be configured to log at various verbosity levels (info, debug, warn, error) and can be integrated with third-party log aggregation tools like Sentry, Logstash, Graylog, and Syslog. For full details on configuring the Tyk logger, see [this section]({{< ref "log-data" >}}).

<br>
{{< note success >}}
**Note**  

Logging event handlers are currently only supported by Tyk Classic APIs.
{{< /note >}}

## Configuring the event handler

Registering a logging event handler to your Tyk Classic API is the same as adding any other event handler, within the `event_handlers` section of the API definition.

The `handler_name` for the logging event handler should be set to: `eh_log_handler`.

The `handler_meta` for the logging event handler contains a single field:
- `prefix` is a label that will be prepended to each log entry

For example, to register event handlers to log the `AuthFailure` and `KeyExpired` events you might add the following to your API definition:

```json
{
  "event_handlers": {
    "events": {
      "AuthFailure": [
        {
          "handler_name": "eh_log_handler",
          "handler_meta": {
            "prefix": "AuthFailureEvent"
          }
        }
      ],
      "KeyExpired": [
        {
          "handler_name": "eh_log_handler",
          "handler_meta": {
            "prefix": "KeyExpiredEvent"
          }
        }
      ]
    }
  }
}
```

In this example
- the `AuthFailure` event will trigger the event handler to generate a log with the prefix `AuthFailureEvent`
- the `KeyExpired` event will trigger the event handler to generate a log with the prefix `KeyExpiredEvent`

When the event handler is triggered an entry will be made in the log containing the corresponding prefix, which can be useful for monitoring and debugging purposes.