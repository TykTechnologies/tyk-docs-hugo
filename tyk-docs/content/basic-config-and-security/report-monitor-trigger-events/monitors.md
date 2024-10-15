---
date: 2017-03-24T12:35:05Z
title: Monitoring quota consumption
tags: ["monitors", "quotas", "event handling", "threshold monitoring"]
description: "Advanced quota threshold monitoring"
---

Tyk provides the ability to actively monitor both user and organization quotas, using a dedicated webhook to notify your stakeholders, your system stack or the requesting API client when certain thresholds have been reached for a token.

Unlike API event [webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) the quota monitor is configured at the Gateway level.

<br>
{{< note success >}}
**Note**  

Advanced quota threshold monitoring is currently only supported by Tyk Classic APIs.
{{< /note >}}

## Configuring the quota consumption monitor

To enable advanced quota monitoring you will need to add a new `monitor` section to your Tyk Gateway configuration file (`tyk.conf`).

This has the following fields:
- `enable_trigger_monitors`: set to `true` to have the monitors start to measure quota thresholds
- `configuration`: a [webhook configuration]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) object
- `global_trigger_limit`: this is a percentage of the quota that the key must consume for the webhook to be fired
- `monitor_user_keys`: set to `true` to monitor individual tokens (this may result in a large number of triggers as it scales with the number of user tokens that are issued)
- `monitor_org_keys`: set to `true` to monitor organization quotas

For example:

```json
{
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
}
```

With this configuration, a monitor is configured to issue a request to `POST http://posttestserver.com/post.php?dir=tyk-monitor-drop` when 80% of the API-level quota has been consumed. This request will have the `x-tyk-monitor-secret` header (set to a value of `12345`) and will provide the content of the template file found at `templates/monitor_template.json` in the request body. A minimum of 10 seconds will elapse between successive monitor webhooks being fired.

<br>
{{< note success >}}
**Note**  

If you are using our [Classic Developer Portal]({{< ref "tyk-developer-portal/tyk-portal-classic/portal-events-notifications" >}}), developers registered in the portal will also receive emails about quota threshold limits being reached.
{{< /note >}}

### Setting advanced thresholds

The default quota consumption monitor will be triggered at the same level of quota usage for all users. Sometimes you might want to have a more granular approach with different triggering thresholds per user or organization. Sometimes you might want to fire the event at multiple thresholds, for example when the user hits 50%, 75% and 90% of their allowed quota.

You can set user specific trigger levels for a user by additionally adding a `monitor` section to the access key ([Session Object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}})). This has one field, which is an array of `trigger_limits` (thresholds) that must be in *descending* order and represent the percentage of the quota that must be reached in order for the trigger to be fired, for example:

```yaml
"monitor": {
  "trigger_limits": [90.0, 75.0, 50.0]
}
```

If this is included in the session object, then the quota threshold event will be fired and the monitor webhook triggered when the user hits 50%, then 75%, and then again at 90% consumption.

You can configure advanced thresholds for all users in an organization by adding the `monitor` section to the organization session object.

## Webhook payload

When the quota consumption monitor is fired, the webhook request that is issued will have the following payload:

```json
{
  "event": "TriggerExceeded",
  "message": "Quota trigger reached",
  "org": "53ac07777cbb8c2d53000002",
  "key": "",
  "trigger_limit": "80",
}
```

- `trigger_limit` will indicate which threshold has been reached (as defined in the session object's `monitor` section).
- `org` will contain the OrgID for the user or organization that triggered the event
- `key` will contain the *raw API key* used in the request only if the event was triggered by a user quota

*Note: if the webhook was triggered by an organization threshold, `key` will be blank.*

<br>
{{< warning success >}}
**Warning**  

When the monitor is triggered by a user hitting their quota threshold, the <b>raw API key</b> is provided in the webhook payload. It is important to secure the webhook endpoint and to handle the payload securely on the receiving end.
{{< /warning >}}
