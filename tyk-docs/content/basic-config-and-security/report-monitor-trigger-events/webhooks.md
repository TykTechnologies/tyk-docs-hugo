---
date: 20224-07-10
title: Event handling with webhooks
tags: ["Webhooks", "Events", "global webhook", "event handling", "API events"]
description: "Webhook event handler"
aliases:
  - /report-monitor-trigger-events/webhooks/
---

A webhook is a mechanism for real-time, event-driven communication between different systems or applications over the internet. It is an HTTP callback, typically an HTTP POST request that occurs when something happens. Webhooks are real-time, automated and lightweight. Notifications are sent immediately when events occur without the need for the receiving service to poll.

In the context of Tyk Gateway, webhooks are event handlers that can be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a customizable fixed payload to any open endpoint.

## When to use webhook event handlers

There are many occasions when you might use webhooks for event handling, here are just a few examples.

#### Rate limit violations

When an API consumer exceeds their allocated rate limit, the `RatelimitExceeded` event will be fired. A webhook event handler can be employed to notify an upstream system to take actions such as updating a dashboard, notifying the account manager, or adjusting the client's service tier.

#### API key lifecycle events

When an expired API key is used to access an API, the client will receive an error and the `KeyExpired` event will be fired. A webhook event handler can be employed to notify an upstream system to take actions such as renewing the key, logging the failure in a CRM or notifying the account manager to initiate customer communication.

#### Upstream service problems

When an API circuit breaker triggers due to an unresponsive upstream service, the `BreakerTripped` event will be fired. A webhook event handler can be employed to update monitoring dashboards or to trigger automated recovery scripts or processes.

## How webhook event handlers work

With Tyk Gateway, the webhook event handler is a process that runs asynchronously in response to an API event being fired. It will issue an HTTP request to any open endpoint and is fully configurable within the API definition.

The HTTP method, body, header values, and target URL can all be configured in the API definition. The [request body](#webhook-payload) is generated using a Tyk template file that has access to the [event metadata]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-data" >}}).

The webhook event handler runs in its own process and so does not block the operation of the Gateway.

### Webhook cooldown

It is very likely that an `AuthFailure` event will fire on the same endpoint more than once if the requesting client is automated. If this event triggered a webhook that caused an email to be sent, then if this event occurred 10 times a second, the email recipient would be flooded with emails. In an attempt to mitigate against events such as this, you can set a cooldown timer, in the webhook handler. This prevents the webhook from being triggered again if the event is fired again within the time period specified.

### Webhook payload

When your webhook event handler is triggered, it will send an HTTP request to the configured target. For HTTP methods that support a request body, for example `POST`, the event handler will process a [Go template]({{< ref "product-stack/tyk-gateway/references/go-templates" >}}) to produce the payload.

If no template is provided in the webhook event handler configuration in the API definition, Tyk Gateway will look for the default file `templates/default_webhook.json`. Any text file accessible to the Gateway can be used to store the Go template to be used by the event handler when constructing the payload.

The event handler has access to the [event metadata]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-data" >}}) and this can be accessed by the template using the `{{.Meta.XXX}}` namespace.

The [event type]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) that triggered the event handler can be accessed as `{{.Type}}`.

For most event types, the default webhook template has this form:

```json
{
  "event": "{{.Type}}",
  "message": "{{.Meta.Message}}",
  "path": "{{.Meta.Path}}",
  "origin": "{{.Meta.Origin}}",
  "key": "{{.Meta.Key}}"
}
```

This would generate a request body (payload) such as:
```json
{
  "event": "RatelimitExceeded",
  "message": "API Rate Limit Exceeded",
  "path": "/example-global-webhook/",
  "origin": "99.242.139.220",
  "key": "apilimiter-66336c67cb7191f791f167134b20d1f4c14b4bb5672b57f4b2813c86"
}
```

## Using webhooks with Tyk Dashboard

Webhook event handlers are configured within the API definition, which is used by Tyk Gateway to determine the appropriate action to be performed in response to a Gateway event.

When using Tyk Dashboard, you are able to create *global webhooks* that can be re-used across multiple events and APIs, allowing you to modify the webhook configuration for a batch of APIs and/or events from one location.

### Local and global webhooks

Tyk Dashboard supports the declaration of webhooks *globally* and *locally*:
- **Global webhooks** are declared outside the API definition and linked via a *webhook id*; changes to the global webhook definition will be reflected in all APIs that reference that *webhook id*
- **Local webhooks** are fully defined within the API definition; changes to the local webhook configuration will affect only the API within which it is defined

*Global webhook definitions* are registered with the Dashboard using the [UI](#creating-a-global-webhook-definition-using-tyk-dashboard) or [Dashboard API]({{< ref "tyk-apis/tyk-dashboard-api/web-hooks" >}}) and assigned a unique *webhook id* that can be obtained via the [Dashboard API]({{< ref "tyk-apis/tyk-dashboard-api/web-hooks#list-web-hooks" >}}) or via drop-down selection within the UI.

If you assign a global webhook definition to an API to handle an event, then Tyk Dashboard will retrieve the definition and update it in the API definition when the API is loaded (or re-loaded) to the Gateway.

### Creating a global webhook definition using Tyk Dashboard

To create a global webhook definition from the Dashboard UI you should follow these steps:

##### Step 1: Create the webhook definition

Select **Webhooks** from the **API Management** Menu:

{{< img src="/img/2.10/webhooks_menu.png" alt="Webhooks menu item" >}}

Click **ADD WEBHOOK**.

{{< img src="/img/2.10/add_webhook.png" alt="Add webhook button" >}}

##### Step 2: Configure the webhook

Now you need to tell Tyk how and where to send the request. You can include custom headers, for example to inform the target service that the request has come from Tyk - remember to click **ADD** to add the custom header to the configuration.

{{< img src="/img/2.10/webhook_details.png" alt="Add webhook detail" >}}

Click **SAVE** to save it.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure webhook event handlers [here]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure webhook event handlers [here]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-classic" >}}).
