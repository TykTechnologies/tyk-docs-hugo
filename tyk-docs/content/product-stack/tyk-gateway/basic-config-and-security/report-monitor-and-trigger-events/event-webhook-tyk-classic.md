---
date: 2024-07-09
title: Webhook event handlers with Tyk Classic APIs
tags: ["event handling", "API events", "webhook", "Tyk Classic"]
description: "Webhook event handlers with Tyk Classic APIs"
---

[Webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) are event handlers that can
be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a
customisable fixed payload to any open endpoint.

Webhooks are configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API
Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk
OAS]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-oas" >}})
page.

## Set up a webhook event handler in the Tyk Classic API Definition

To add a webhook event handler you must add a new event handler object within the `event_handlers.events` section of the
API definition for the appropriate [API event]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}).

The event handler object has the following configuration:

- `handler_name`: this identifies the type of event handler and must be set to `eh_web_hook_handler`
- `handler_meta`: this structure configures the HTTP request that will be sent when the webhook is triggered

The `handler_meta` object has the following configuration:

- `method`: this can be any of `GET`, `PUT`, `POST`, `PATCH` or `DELETE` and will be the HTTP method used to send the
  request; methods that do not support an encoded request body will not have the event metadata provided with the
  request; we advise using `POST` where possible
- `target_path`: this is an **absolute URL** to which the request will be sent
- `template_path`: this is the path to the [webhook
  template]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-payload" >}}) that will be
  used to construct the request body
- `header_map`: a map of custom headers to be provided with the request
- `event_timeout`: the [webhook
  cooldown]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-cooldown" >}}) for duplicate
  events (in seconds); use this to prevent flooding of the target endpoint when multiple events are fired in quick succession

For example:

```json {linenos=true, linenostart=1}
{
  "event_handlers": {
    "events": {
      "AuthFailure": [
        {
          "handler_name": "eh_web_hook_handler",
          "handler_meta": {
            "method": "POST",
            "target_path": "http://posttestserver.com/post.php?dir=tyk-event-test",
            "template_path": "templates/default_webhook.json",
            "header_map": { "X-Tyk-Test-Header": "Tyk v1.BANANA" },
            "event_timeout": 10
          }
        }
      ]
    }
  }
}
```

In this example, when the `AuthFailure` event is fired, the webhook event handler will send a request to
`POST http://posttestserver.com/post.php?dir=tyk-event-test` and then start a 10 second cooldown before another webhook
request can be sent.

The request will have one custom header `X-Tyk-Test-Header: Tyk v1.BANANA` and the body will be constructed from the
webhook template located at `templates/default_webhook.json`.

{{< note success >}} **Note**

This manually configured webhook event handler is private to the API within which it has been defined, it is not a
[global
webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#using-webhooks-with-tyk-dashboard" >}}).
{{< /note >}}

## Set up a webhook event handler in the Tyk Dashboard

It is very simple to register webhooks to be triggered in response to specific API events when using Tyk Classic APIs
with the Tyk Dashboard. The API Designer in the Dashboard allows you to register _global webhooks_ to handle events.

Note that Tyk Gateway does not have access to the _global webhook_ definitions registered with Tyk Dashboard and can
only operate on the configuration within the API definition. Dashboard will manage the conversion of _global webhooks_
to [locally defined webhook handlers](#set-up-a-webhook-event-handler-in-the-tyk-classic-api-definition) within the Tyk
Classic API definition, automatically updating the configuration in each API definition when the APIs are reloaded to
the Gateway.

#### Step 1: Define the webhook

Before you can configure a webhook event handler for your API, you must first create a global webhook from the
**Webhooks** screen in the **API Management** menu, as described
[here]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#creating-a-global-webhook-definition-using-tyk-dashboard" >}}).

#### Step 2: Register the webhook with the event

From the API Designer select the **Advanced Options** tab and locate the **Webhooks** panel:

{{< img src="/img/2.10/webhooks_designer_settings.png" alt="Webhook API Details" >}}

Now:

- select the _API Event_ for which you want to trigger the webhook from the dropdown list
- select the _Webhook to use_ when the event fires, again from the dropdown list
- finally, configure the required _Cooldown period_
- click **Add**

Note that you can register multiple webhooks to be triggered in response to a single event and you can register the same
webhook with multiple API events.

Remember to click **Save** to save your changes.

## Set up a webhook event handler in Tyk Operator

Tyk Operator supports event handler integration for Tyk Classic API Definition. Configuring the `event_handlers` field
in ApiDefinition Custom Resource Definition (CRD) enables webhooks to be triggered by [specific
API events]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}).

The process for configuring webhook event handlers using Tyk Operator is similar to that explained in
[Set up a webhook event handler in the Tyk Classic API Definition](#set-up-a-webhook-event-handler-in-the-tyk-classic-api-definition).
The example API Definition below enables the event handler by setting `spec.event_handlers`.

```yaml {hl_lines=["14-25"],linenos=true, linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: webhook-handler
spec:
  name: webhook-handler
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /webhook-handler
    strip_listen_path: true
  event_handlers:
    events:
      AuthFailure:
        - handler_name: "eh_web_hook_handler"
          handler_meta:
            method: "POST"
            name: "webhook name"
            target_path: "http://posttestserver.com/post.php?dir=tyk-event-test"
            template_path: "templates/default_webhook.json"
            header_map:
              X-Tyk-Test-Header: "Tyk v1.BANANA"
            event_timeout: 10
```
