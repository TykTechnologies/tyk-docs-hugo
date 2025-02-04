---
date: 2024-07-09
title: Webhook event handlers with Tyk OAS APIs
tags: ["event handling", "API events", "webhook", "Tyk OAS"]
description: "Webhook event handlers with Tyk OAS APIs"
aliases:
    - /tyk-api-gateway-v-3-0/api-management/events/ 
---

[Webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) are event handlers that can be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a customizable fixed payload to any open endpoint.

Webhooks are configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-classic" >}}) page.

## Set up a webhook event handler in the Tyk OAS API Definition

Event handling is configured by adding the `eventHandlers` object to the `server` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

The `eventHandlers` object is an array containing configurations for all event handlers registered with the API.

### Local webhook configuration

When using a local webhook, the event handler element in the `eventHandlers` object has the following configuration which fully declares the webhook behaviour:
- `enabled`: enable the event handler
- `trigger`: the API event that will trigger the webhook
- `type`: the type of event handler, in this case should be set to `webhook`
- `cooldownPeriod`: the [webhook cooldown]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-cooldown" >}}) for duplicate events (in duration format, e.g. 10s, 1m30s); use this to prevent flooding of the target endpoint when multiple events are fired in quick succession
- `name`: a human readable name for the webhook, which will be displayed in Tyk Dashboard
- `url`: this is an **absolute URL** to which the request will be sent
- `method`: this can be any of `GET`, `PUT`, `POST`, `PATCH` or `DELETE` and will be the HTTP method used to send the request; methods that do not support an encoded request body will not have the event metadata provided with the request; we advise using `POST` where possible
- `bodyTemplate`: this is the path to the [webhook template]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-payload" >}}) that will be used to construct the request body
- `headers`: a map of custom headers to be provided with the request

For example:
```json {hl_lines=["18-33"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-local-webhook",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {},
    "components": {},
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-local-webhook",
            "state": {
                "active": true
            }
        },
        "server": {
            "eventHandlers": [
                {
                    "enabled": true,
                    "trigger": "RatelimitExceeded",
                    "cooldownPeriod": "1s",
                    "type": "webhook",
                    "name": "My local webhook",
                    "url": "https://webhook.site/<unique-target>",
                    "method": "POST",
                    "headers": [
                        {
                        "name": "X-Tyk",
                            "value": "example-local-webhook"
                        }
                    ],
                    "bodyTemplate": "templates/default_webhook.json"
                }
            ],
            "listenPath": {
                "strip": true,
                "value": "/example-local-webhook/"
            }
        },
        "upstream": {
            "rateLimit": {
                "enabled": true,
                "per": "10s",
                "rate": 2
            },
            "url": "http://httpbin.org/"
        }
    }
}
```

In this example a local webhook has been registered to trigger when the `RatelimitExceeded` event is fired. The request rate limit has been set at 2 requests per 10 seconds, so simply make three requests in quick succession to trigger the webhook.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the local webhook feature.

Note that to test this you will need to provide a valid target URL for your webhook to send the request; we've used `http://webhook.site`.


### Global webhook configuration

When using a *global webhook*, the event handler element in the `eventHandlers` object has the following configuration, which references the externally declared webhook using its `id`:
- `enabled`: enable the event handler
- `trigger`: the API event that will trigger the webhook
- `type`: the type of event handler, in this case should be set to `webhook`
- `cooldownPeriod`: the [webhook cooldown]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-cooldown" >}}) for duplicate events (in duration format, e.g. 10s, 1m30s); use this to prevent flooding of the target endpoint when multiple events are fired in quick succession
- `id`: the *webhook id* assigned by Tyk to the global webhook when it was created (this can be determined using the [list webhooks]({{< ref "api-management/dashboard-configuration#list-web-hooks" >}}) endpoint in the Tyk Dashboard API)

For example:

```json {hl_lines=["18-24"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-global-webhook",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {},
    "components": {},
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-global-webhook",
            "state": {
                "active": true
            }
        },
        "server": {
            "eventHandlers": [
                {
                    "enabled": true,
                    "trigger": "RatelimitExceeded",
                    "cooldownPeriod": "1s",
                    "type": "webhook",
                    "id": "<your-global-webhook-id>"
                }
            ],
            "listenPath": {
                "strip": true,
                "value": "/example-global-webhook/"
            }
        },
        "upstream": {
            "rateLimit": {
                "enabled": true,
                "per": "10s",
                "rate": 2
            },
            "url": "http://httpbin.org/"
        }
    }
}
```

In this example a local webhook has been registered to trigger when the `RatelimitExceeded` event is fired. The request rate limit has been set at 2 requests per 10 seconds, so simply make three requests in quick succession to trigger the webhook.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the global webhook feature.

Note, however, that to test this you will need to create a *global webhook* in your Tyk Dashboard and replace the value in `id` with the *webhook id* that Tyk Dashboard has allocated to your webhook. You can find this by querying the [list webhooks]({{< ref "api-management/dashboard-configuration#list-web-hooks" >}}) endpoint in the Tyk Dashboard API.
<br>
<br>
{{< note success >}}
**Note**  

When a *global webhook* is registered to a Tyk OAS API, Tyk will create a read-only copy of the webhook [configuration](#local-webhook-configuration) (`url`, `method`, `bodyTemplate`, `headers`) within the API definition. This is so that Tyk Gateway knows how to handle the event, as it does not have access to the store of *global webhooks* registered with Tyk Dashboard.
<br>
<br>
If the global webhook is subsequently deleted from the Tyk Dashboard, the webhook will automatically be converted to a local webhook in any API definition that was using it.
{{< /note >}}


## Set up a webhook event handler in the Tyk Dashboard

It is very simple to register webhooks to be triggered in response to specific API events when using Tyk OAS APIs with the Tyk Dashboard. The API Designer in the Dashboard allows you to define *local webhooks* and to register *global webhooks* to handle events. 

If you want to use a *global webhook* then you'll need to declare it first, following [these instructions]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#creating-a-global-webhook-definition-using-tyk-dashboard" >}}).

#### Step 1: Add event handler

From the **Settings** tab in the API Designer, scroll down to the **Server** section to find the **Event Handlers** pane. Select **Add Event**.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-server.png" alt="Add an event handler from the Server section" >}}

#### Step 2: Choose the event to be handled

This will add an event handler to the API. You'll need to select which event you want to handle from the drop-down list. Note that currently Tyk OAS only supports webhook event handlers, so this will default to *webhook* type.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-event-trigger.png" alt="Choose the event that will trigger the webhook" >}}

#### Step 3a: Choose and configure global webhook

If you want to use a webhook that you've already registered with Tyk Dashboard, ensure that the **Webhook source** is set to **Global webhook** then select from the drop-down list.

The only other thing you'll need to configure is the cooldown period.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-global.png" alt="Select from the list of available global webhooks" >}}

Note that Tyk automatically retrieves the details of the *global webhook* and displays them (read-only) in the API designer.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-global-complete.png" alt="A fully configured global webhook" >}}

Don't forget to select **Save API** to apply the changes.

#### Step 3b: Configure local webhook

If you don't want to use a shared *global webhook* but instead want to configure a *local webhook* only available to this API/event then you should ensure that the **Webhook source** is set to **Local webhook**.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-local.png" alt="Ready to configure a local webhook">}}

Now you can complete the various fields to set up your *local webhook*. If you want to add custom headers to send with the HTTP request, select **New Header** then enter the header key and value.

{{< img src="/img/dashboard/api-designer/tyk-oas-webhook-local-complete.png" alt="A fully configured global webhook" >}}

Don't forget to select **Save API** to apply the changes.
