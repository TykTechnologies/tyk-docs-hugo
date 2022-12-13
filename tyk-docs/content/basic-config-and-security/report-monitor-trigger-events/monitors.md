---
date: 2017-03-24T12:35:05Z
title: Monitors
tags: ["Monitors", "Quotas"]
description: "How to enable monitors in Tyk"
menu:
  main:
    parent: "Report, Monitor and Trigger Events"
weight: 5 
---

Tyk enables you to actively monitor both users and organisation quotas. The machinery that manages these active notifications is the same as webhooks and provides an easy way to notify your stakeholders, your own organisation or the API end user when certain thresholds have been reached for their token.

Enabling monitors in your Tyk node means adding a new configuration section to your `tyk.conf`:

```{.copyWrapper}
"monitor": {
  "enable_trigger_monitors": true,
  "configuration": {
    "method": "POST",
    "target_path": "http://posttestserver.com/post.php?dir=tyk-monitor-drop",
    "template_path": "templates/monitor_template.json",
    "header_map": {"x-tyk-monitor-secret": "12345"},
    "event_timeout": 10
  },
  "global_trigger_limit": 80.0,
  "monitor_user_keys": false,
  "monitor_org_keys": true
}
```

*   `enable_trigger_monitors`: Set to true to have the monitors start to measure quota thresholds.
*   `configuration`: A webhook configuration object, please see the webhooks documentation for details.
*   `global_trigger_limit`: This is the global trigger threshold and will be applied to all tokens being measured. This number is a percentage of the quota that the user must reach before the notification is triggered.

{{< note success >}}
**Note**  

From Dashboard v1.8.2, if you are using our [Developer Portal]({{ ref "tyk-developer-portal" >}}), developers registered in the portal will also receive emails about quota threshold limits being reached.
{{< /note >}}


*   `monitor_user_keys`: Set to `true` to monitor individual tokens, this may result in a large amount of webhooks.
*   `monitor_org_keys`: Set to `true` to have global organisation quotas monitored.

### Setting custom triggers on a per-key or a per-organisation basis

Sometimes you will not want to have every user have a trigger event at the same levels, you can set manual trigger levels by adding a `monitor` section to the Session Object that defines a key's access details, this can also be added to the session object of an organisation ID:

```{.copyWrapper}
"monitor": {
  "trigger_limits": [80.0, 60.0, 50.0]
}
```

The `trigger_limits` must be in *descending* order and represent the percentage of the quota that must be reached in order for the trigger to be fired.

### Webhook data

The webhook payload will take the following format:

```{.copyWrapper}
{
  "event": "TriggerExceeded",
  "message": "Quota trigger reached",
  "org": "53ac07777cbb8c2d53000002",
  "key": "",
  "trigger_limit": "80",
}
```

If the event is triggered by an organisation, then the `key` field will be empty, if it is an auth token, then the `key` field will have raw representation of the token that caused the quota trigger to fire.
