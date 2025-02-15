---
title: "Gateway Events"
date: 2025-02-10
tags: ["Gateway", "Events", "Async APIs", "Asynchronus APIs", "Error Templates", "Event Types", "Event Webhooks", "Event Metadata"]
description: "Introduction to Gateway Events"
keywords: ["Gateway", "Events", "Async APIs", "Asynchronus APIs", "Error Templates", "Event Types", "Event Webhooks", "Event Metadata"]
aliases:
  - /basic-config-and-security/report-monitor-trigger-events
  - /basic-config-and-security/report-monitor-trigger-events/event-types
  - /basic-config-and-security/report-monitor-trigger-events/event-data
  - /basic-config-and-security/report-monitor-trigger-events/webhooks
  - /product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-oas
  - /product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-classic
  - /product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/log-handlers
  - /basic-config-and-security/report-monitor-trigger-events/custom-handlers-javascript
  - /basic-config-and-security/report-monitor-trigger-events/monitors
  - /advanced-configuration/error-templates
  - /report-monitor-trigger-events
  - /report-monitor-trigger-events/webhooks
  - /tyk-api-gateway-v-3-0/api-management/events
---

Tyk Gateway will generate asynchronous events when certain conditions are met, for example a rate limit being exceeded, an expired key attempting to access an API, or a circuit breaker triggering due to a slow or unresponsive upstream.

Tyk has a flexible model for handling these API events.

## Event categories

There are four different categories of events that can be fired by Tyk:
- [API events](#api-events)
- [Token lifecycle events](#token-lifecycle-events)
- [Advanced quota usage events](#advanced-quota-usage-events)
- [Custom events](#custom-events)

### API events

Tyk can generate (or *fire*) a variety of built-in API events due to activity triggered by an API request, such as exceeded rate limits, depleted quotas or attempts to access using expired keys. The full list of standard API events is available [here]({{< ref "api-management/gateway-events#api-events" >}}).

### Token lifecycle events

Alongside the events that are fired in response to API requests, Tyk will also mark the creation, update or deletion of access tokens (keys) with dedicated events as indicated [here]({{< ref "api-management/gateway-events#token-lifecycle-events" >}}).

### Advanced quota usage events

Tyk will generate [standard quota events]({{< ref "api-management/gateway-events#standard-quota-events" >}}) when a client quota has been consumed, but what if you want to have more granular notification of quota usage as your clients are approaching their quota limit?

For this, Tyk provides [advanced quota monitoring]({{< ref "api-management/gateway-events#monitoring-quota-consumption" >}}) that can be configured to trigger a dedicated event handler when the API usage exceeds different thresholds approaching the quota limit.

### Custom events

The event subsystem has been designed to be easily extensible, so the community can define additional events within the Tyk codebase which can then be handled using the exsiting event handling system.

## Handling events with Tyk

Tyk has a simple event handling system where *event handlers* are assigned (or registered) to the different [events]({{< ref "api-management/gateway-events#event-types" >}}) that Tyk can generate. These handlers are assigned per-API so when an event is generated for an API and there is an *event handler* registered for that *event*, the handler will be triggered.

Three different categories of *event handler* can be registered for each event:
- a [webhook]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) that will call out to an external endpoint
- an [event log]({{< ref "api-management/gateway-events#logging-api-events-1" >}}) that will write to the configured [log output]({{< ref "log-data" >}})
- your own [custom event handler]({{< ref "api-management/gateway-events#custom-api-event-handlers" >}}) that will run in a JavaScript virtual machine on the Tyk server

{{< note success >}}
**Note**  

Remember that <b>quota usage monitoring</b> has a [dedicated mechanism]({{< ref "api-management/gateway-events#monitoring-quota-consumption" >}}) for handling these special events.
{{< /note >}}

### Event metadata

When an API event is fired, if there is an *event handler* registered for that combination of API and event then the handler will be provided with a rich set of [metadata]({{< ref "api-management/gateway-events#event-metadata-1" >}}) that can be used by the external system (webhook) or custom (JavaScript) code to determine the action to be taken.

## Event Types

The built-in events that Tyk Gateway will generate are:

### Rate limit events

- `RatelimitExceeded`: the rate limit has been exceeded for a specific key
- `OrgRateLimitExceeded`: the rate limit has been exceeded for a specific organization
- `RateLimitSmoothingUp`: the [intermediate rate limit allowance]({{< ref "api-management/rate-limit#rate-limit-smoothing" >}}) has been increased for a specific key
- `RateLimitSmoothingDown`: the [intermediate rate limit allowance]({{< ref "api-management/rate-limit#rate-limit-smoothing" >}}) has been decreased for a specific key

### Standard quota events

- `QuotaExceeded`: the quota for a specific key has been exceeded
- `OrgQuotaExceeded`: the quota for a specific organization has been exceeded

### Authentication failure events

- `AuthFailure`: a key has failed authentication or has attempted access and was denied
- `KeyExpired`: an attempt has been made to access an API using an expired key

### API version events

- `VersionFailure`: a key has attempted access to a version of an API that it does not have permission to access

### Circuit breaker events

- `BreakerTripped`: a circuit breaker on a path has tripped and been taken offline
- `BreakerReset`: a circuit breaker has reset and the path is available again
- `BreakerTriggered`: a circuit breaker has changed state, this is generated when either a `BreakerTripped`, or a `BreakerReset` event occurs; a status code in the metadata passed to the webhook will indicate which of these events was triggered

### Uptime events

- `HostDown`: the uptime checker has found that a host is down/not available
- `HostUp`: the uptime checker has found that a host is available again after being offline

### Token lifecycle events

- `TokenCreated`: a token has been created
- `TokenUpdated`: a token has been changed/updated
- `TokenDeleted`: a token has been deleted

## Event Metadata

When Tyk generates an [event]({{< ref "api-management/gateway-events#event-types" >}}) it will compile the following metadata that is passed to the event handler:

- `Message` (string): a human readable message from Tyk Gateway that adds detail about the event
- `Path` (string): the path of the API endpoint request that led to the event being fired
- `Origin` (string): origin data for the source of the request (if this exists)
- `Key` (string): the key that was used in the request
- `OriginatingRequest` (string): Based64-encoded [raw inbound request](#raw-request-data)

{{< note success >}}
**Note**  

Circuit breaker events provide different metadata, see [Circuit Breakers]({{< ref "tyk-self-managed#circuit-breakers" >}}) to see what is provided when the `BreakerTripped`, `BreakerReset` or `BreakerTriggered` events are generated.
{{< /note >}}

### Using the metadata

The metadata are exposed so that they can be used by the event handler (webhook or custom) using Go templating. For details of how each type of event handler can access these data, please see the appropriate section for [webhook]({{< ref "api-management/gateway-events#webhook-payload" >}}) or [custom]({{< ref "api-management/gateway-events#the-event-object" >}}) event handlers.

### Raw Request Data

The `OriginatingRequest` metadata is a Base64-encoded wire-protocol representation of the original request to the event handler. If you are running a service bus or queue that stores failed, throttled or other types of requests, you can decode this object and parse it in order to re-create the original intent of the request (e.g. for post-processing).

### Logging API Events

Tyk’s built-in logging event handler is designed primarily for debugging purposes and will store details of an API event to the configured logger output.

The Tyk platform can be configured to log at various verbosity levels (info, debug, warn, error) and can be integrated with third-party log aggregation tools like Sentry, Logstash, Graylog, and Syslog. For full details on configuring the Tyk logger, see [this section]({{< ref "log-data" >}}).

<br>
{{< note success >}}
**Note**  

Logging event handlers are currently only supported by Tyk Classic APIs.
{{< /note >}}

### Configuring the event handler

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

## Event handling with webhooks

### Overview

A webhook is a mechanism for real-time, event-driven communication between different systems or applications over the internet. It is an HTTP callback, typically an HTTP POST request that occurs when something happens. Webhooks are real-time, automated and lightweight. Notifications are sent immediately when events occur without the need for the receiving service to poll.

In the context of Tyk Gateway, webhooks are event handlers that can be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a customizable fixed payload to any open endpoint.

#### When to use webhook event handlers

There are many occasions when you might use webhooks for event handling, here are just a few examples.

##### Rate limit violations

When an API consumer exceeds their allocated rate limit, the `RatelimitExceeded` event will be fired. A webhook event handler can be employed to notify an upstream system to take actions such as updating a dashboard, notifying the account manager, or adjusting the client's service tier.

##### API key lifecycle events

When an expired API key is used to access an API, the client will receive an error and the `KeyExpired` event will be fired. A webhook event handler can be employed to notify an upstream system to take actions such as renewing the key, logging the failure in a CRM or notifying the account manager to initiate customer communication.

##### Upstream service problems

When an API circuit breaker triggers due to an unresponsive upstream service, the `BreakerTripped` event will be fired. A webhook event handler can be employed to update monitoring dashboards or to trigger automated recovery scripts or processes.

#### How webhook event handlers work

With Tyk Gateway, the webhook event handler is a process that runs asynchronously in response to an API event being fired. It will issue an HTTP request to any open endpoint and is fully configurable within the API definition.

The HTTP method, body, header values, and target URL can all be configured in the API definition. The [request body](#webhook-payload) is generated using a Tyk template file that has access to the [event metadata]({{< ref "api-management/gateway-events#event-metadata-1" >}}).

The webhook event handler runs in its own process and so does not block the operation of the Gateway.

##### Webhook cooldown

It is very likely that an `AuthFailure` event will fire on the same endpoint more than once if the requesting client is automated. If this event triggered a webhook that caused an email to be sent, then if this event occurred 10 times a second, the email recipient would be flooded with emails. In an attempt to mitigate against events such as this, you can set a cooldown timer, in the webhook handler. This prevents the webhook from being triggered again if the event is fired again within the time period specified.

##### Webhook payload

When your webhook event handler is triggered, it will send an HTTP request to the configured target. For HTTP methods that support a request body, for example `POST`, the event handler will process a [Go template]({{< ref "product-stack/tyk-gateway/references/go-templates" >}}) to produce the payload.

If no template is provided in the webhook event handler configuration in the API definition, Tyk Gateway will look for the default file `templates/default_webhook.json`. Any text file accessible to the Gateway can be used to store the Go template to be used by the event handler when constructing the payload.

The event handler has access to the [event metadata]({{< ref "api-management/gateway-events#event-metadata-1" >}}) and this can be accessed by the template using the `{{.Meta.XXX}}` namespace.

The [event type]({{< ref "api-management/gateway-events#event-types" >}}) that triggered the event handler can be accessed as `{{.Type}}`.

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

#### Using webhooks with Tyk Dashboard

Webhook event handlers are configured within the API definition, which is used by Tyk Gateway to determine the appropriate action to be performed in response to a Gateway event.

When using Tyk Dashboard, you are able to create *global webhooks* that can be re-used across multiple events and APIs, allowing you to modify the webhook configuration for a batch of APIs and/or events from one location.

##### Local and global webhooks

Tyk Dashboard supports the declaration of webhooks *globally* and *locally*:
- **Global webhooks** are declared outside the API definition and linked via a *webhook id*; changes to the global webhook definition will be reflected in all APIs that reference that *webhook id*
- **Local webhooks** are fully defined within the API definition; changes to the local webhook configuration will affect only the API within which it is defined

*Global webhook definitions* are registered with the Dashboard using the [UI](#creating-a-global-webhook-definition-using-tyk-dashboard) or [Dashboard API]({{< ref "api-management/dashboard-configuration#web-hooks-api" >}}) and assigned a unique *webhook id* that can be obtained via the [Dashboard API]({{< ref "api-management/dashboard-configuration#list-web-hooks" >}}) or via drop-down selection within the UI.

If you assign a global webhook definition to an API to handle an event, then Tyk Dashboard will retrieve the definition and update it in the API definition when the API is loaded (or re-loaded) to the Gateway.

##### Creating a global webhook definition using Tyk Dashboard

To create a global webhook definition from the Dashboard UI you should follow these steps:

**Steps for Configuration**

1. **Create the webhook definition**

    Select **Webhooks** from the **API Management** Menu:

    {{< img src="/img/2.10/webhooks_menu.png" alt="Webhooks menu item" >}}

    Click **Add Webhook**.

    {{< img src="/img/2.10/add_webhook.png" alt="Add webhook button" >}}

2. **Configure the webhook**

    Now you need to tell Tyk how and where to send the request. You can include custom headers, for example to inform the target service that the request has come from Tyk - remember to click **ADD** to add the custom header to the configuration.

    {{< img src="/img/2.10/webhook_details.png" alt="Add webhook detail" >}}

    Click **Save** to save it.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure webhook event handlers [here]({{< ref "api-management/gateway-events#webhook-event-handlers-with-tyk-oas-apis" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure webhook event handlers [here]({{< ref "api-management/gateway-events#webhook-event-handlers-with-tyk-classic-apis" >}}).

### Webhook event handlers with Tyk OAS APIs

[Webhooks]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) are event handlers that can be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a customizable fixed payload to any open endpoint.

Webhooks are configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/gateway-events#webhook-event-handlers-with-tyk-classic-apis" >}}) page.

#### Set up a webhook event handler in the Tyk OAS API Definition

Event handling is configured by adding the `eventHandlers` object to the `server` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

The `eventHandlers` object is an array containing configurations for all event handlers registered with the API.

##### Local webhook configuration

When using a local webhook, the event handler element in the `eventHandlers` object has the following configuration which fully declares the webhook behaviour:
- `enabled`: enable the event handler
- `trigger`: the API event that will trigger the webhook
- `type`: the type of event handler, in this case should be set to `webhook`
- `cooldownPeriod`: the [webhook cooldown]({{< ref "api-management/gateway-events#webhook-cooldown" >}}) for duplicate events (in duration format, e.g. 10s, 1m30s); use this to prevent flooding of the target endpoint when multiple events are fired in quick succession
- `name`: a human readable name for the webhook, which will be displayed in Tyk Dashboard
- `url`: this is an **absolute URL** to which the request will be sent
- `method`: this can be any of `GET`, `PUT`, `POST`, `PATCH` or `DELETE` and will be the HTTP method used to send the request; methods that do not support an encoded request body will not have the event metadata provided with the request; we advise using `POST` where possible
- `bodyTemplate`: this is the path to the [webhook template]({{< ref "api-management/gateway-events#webhook-payload" >}}) that will be used to construct the request body
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


##### Global webhook configuration

When using a *global webhook*, the event handler element in the `eventHandlers` object has the following configuration, which references the externally declared webhook using its `id`:
- `enabled`: enable the event handler
- `trigger`: the API event that will trigger the webhook
- `type`: the type of event handler, in this case should be set to `webhook`
- `cooldownPeriod`: the [webhook cooldown]({{< ref "api-management/gateway-events#webhook-cooldown" >}}) for duplicate events (in duration format, e.g. 10s, 1m30s); use this to prevent flooding of the target endpoint when multiple events are fired in quick succession
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


#### Set up a webhook event handler in the Tyk Dashboard

It is very simple to register webhooks to be triggered in response to specific API events when using Tyk OAS APIs with the Tyk Dashboard. The API Designer in the Dashboard allows you to define *local webhooks* and to register *global webhooks* to handle events. 

If you want to use a *global webhook* then you'll need to declare it first, following [these instructions]({{< ref "api-management/gateway-events#creating-a-global-webhook-definition-using-tyk-dashboard" >}}).

1. **Add event handler**

    From the **Settings** tab in the API Designer, scroll down to the **Server** section to find the **Event Handlers** pane. Select **Add Event**.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-server.png" alt="Add an event handler from the Server section" >}}

2. **Choose the event to be handled**

    This will add an event handler to the API. You'll need to select which event you want to handle from the drop-down list. Note that currently Tyk OAS only supports webhook event handlers, so this will default to *webhook* type.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-event-trigger.png" alt="Choose the event that will trigger the webhook" >}}

3. **Choose and configure global webhook**

    If you want to use a webhook that you've already registered with Tyk Dashboard, ensure that the **Webhook source** is set to **Global webhook** then select from the drop-down list.

    The only other thing you'll need to configure is the cooldown period.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-global.png" alt="Select from the list of available global webhooks" >}}

    Note that Tyk automatically retrieves the details of the *global webhook* and displays them (read-only) in the API designer.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-global-complete.png" alt="A fully configured global webhook" >}}

    Don't forget to select **Save API** to apply the changes.

4. **Configure local webhook**

    If you don't want to use a shared *global webhook* but instead want to configure a *local webhook* only available to this API/event then you should ensure that the **Webhook source** is set to **Local webhook**.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-local.png" alt="Ready to configure a local webhook">}}

    Now you can complete the various fields to set up your *local webhook*. If you want to add custom headers to send with the HTTP request, select **New Header** then enter the header key and value.

    {{< img src="/img/dashboard/api-designer/tyk-oas-webhook-local-complete.png" alt="A fully configured global webhook" >}}

    Don't forget to select **Save API** to apply the changes.

### Webhook event handlers with Tyk Classic APIs

[Webhooks]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) are event handlers that can
be registered against API Events. The webhook will be triggered when the corresponding event is fired and will send a
customisable fixed payload to any open endpoint.

Webhooks are configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API
Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk
OAS]({{< ref "api-management/gateway-events#webhook-event-handlers-with-tyk-oas-apis" >}})
page.

#### Set up a webhook event handler in the Tyk Classic API Definition

To add a webhook event handler you must add a new event handler object within the `event_handlers.events` section of the
API definition for the appropriate [API event]({{< ref "api-management/gateway-events#event-types" >}}).

The event handler object has the following configuration:

- `handler_name`: this identifies the type of event handler and must be set to `eh_web_hook_handler`
- `handler_meta`: this structure configures the HTTP request that will be sent when the webhook is triggered

The `handler_meta` object has the following configuration:

- `method`: this can be any of `GET`, `PUT`, `POST`, `PATCH` or `DELETE` and will be the HTTP method used to send the
  request; methods that do not support an encoded request body will not have the event metadata provided with the
  request; we advise using `POST` where possible
- `target_path`: this is an **absolute URL** to which the request will be sent
- `template_path`: this is the path to the [webhook
  template]({{< ref "api-management/gateway-events#webhook-payload" >}}) that will be
  used to construct the request body
- `header_map`: a map of custom headers to be provided with the request
- `event_timeout`: the [webhook
  cooldown]({{< ref "api-management/gateway-events#webhook-cooldown" >}}) for duplicate
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
webhook]({{< ref "api-management/gateway-events#using-webhooks-with-tyk-dashboard" >}}).
{{< /note >}}

#### Set up a webhook event handler in the Tyk Dashboard

It is very simple to register webhooks to be triggered in response to specific API events when using Tyk Classic APIs
with the Tyk Dashboard. The API Designer in the Dashboard allows you to register _global webhooks_ to handle events.

Note that Tyk Gateway does not have access to the _global webhook_ definitions registered with Tyk Dashboard and can
only operate on the configuration within the API definition. Dashboard will manage the conversion of _global webhooks_
to [locally defined webhook handlers](#set-up-a-webhook-event-handler-in-the-tyk-classic-api-definition) within the Tyk
Classic API definition, automatically updating the configuration in each API definition when the APIs are reloaded to
the Gateway.

1. **Define the webhook**

    Before you can configure a webhook event handler for your API, you must first create a global webhook from the
    **Webhooks** screen in the **API Management** menu, as described
    [here]({{< ref "api-management/gateway-events#creating-a-global-webhook-definition-using-tyk-dashboard" >}}).

2. **Register the webhook with the event**

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

#### Set up a webhook event handler in Tyk Operator

Tyk Operator supports event handler integration for Tyk Classic API Definition. Configuring the `event_handlers` field
in ApiDefinition Custom Resource Definition (CRD) enables webhooks to be triggered by [specific
API events]({{< ref "api-management/gateway-events#event-types" >}}).

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


## Logging API events

Tyk’s built-in logging event handler is designed primarily for debugging purposes and will store details of an API event to the configured logger output.

The Tyk platform can be configured to log at various verbosity levels (info, debug, warn, error) and can be integrated with third-party log aggregation tools like Sentry, Logstash, Graylog, and Syslog. For full details on configuring the Tyk logger, see [this section]({{< ref "log-data" >}}).

<br>
{{< note success >}}
**Note**  

Logging event handlers are currently only supported by Tyk Classic APIs.
{{< /note >}}

### Configuring the event handler

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

## Custom API event handlers

Tyk supports you to script your own custom code in JavaScript (JS) that will be invoked in response to API events. This is executed asynchronously so you don't need to worry about it blocking the Gateway handling requests. Event handlers like this can be very powerful for automating session, user and API-level functions.

It is important to note that unlike custom JavaScript [plugins]({{< ref "api-management/plugins/javascript#" >}}), custom event handlers execute in a *global* JavaScript environment. This means that you need to be careful when naming the event handlers: if you use the same event handler name for different event handling code across two APIs, only one of them will execute, as the other will be overridden when loaded.

Custom event handlers have access to the [JavaScript API]({{< ref "api-management/plugins/javascript#javascript-api" >}}) which gives access to the session object and enables your code to make HTTP calls. This is particularly useful if you want to interface with another API with a complex request/response cycle.

<br>
{{< note success >}}
**Note**  

Custom event handlers are currently only supported by Tyk Classic APIs.
{{< /note >}}

### Creating a custom event handler

A custom event handler consists of a function that accepts two variables (`event` and `context`) and has no return value.

Creating an event handler is very similar to [creating custom JS plugins]({{< ref "api-management/plugins/javascript#using-javascript-with-tyk" >}}), simply invoke the correct constructors with a closure in the TykJS namespace:

```js
// ---- Sample custom event handler -----
var sampleHandler = new TykJS.TykEventHandlers.NewEventHandler({});

sampleHandler.NewHandler(function(event, context) {
  // You can log to Tyk console output by calling the built-in log() function:
  log("This handler does nothing, but this will appear in your terminal")

  return
});
```

#### The `event` object

This contains the [event metadata]({{< ref "api-management/gateway-events#event-metadata-1" >}}) in the following structure:

```json
{
  "EventType": "Event Type Code",
  "EventMetaData": {
    "Message": "My Event Description",
    "Path": "/{{api_id}}/{{path}}",
    "Origin": "1.1.1.1:PORT",
    "Key": "{{Auth Key}}"
  },
  "TimeStamp": "2024-01-01 23:59:59.111157073 +0000 UTC"
}
```

#### The `context` Variable

Tyk injects a `context` object into your event handler giving access to more information about the request. This object has the following structure:

```js
type JSVMContextGlobal struct {
  APIID string
  OrgID string
}
```

It is populated with the API ID and Org ID of the request that your custom function can use together with the `event` metadata to interact with the Tyk REST API functions, for example:

```js
// Use the TykGetKeyData function to retrieve a session from the session store, use the context variable to give the APIID for the key.
var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
log("Expires: " + thisSession.expires)
```

### Registering a custom event handler

Registering a custom event handler to your Tyk Classic API is the same as adding any other event handler, within the `event_handlers` section of the API definition.

The `handler_name` for a custom event handler should be set to: `eh_dynamic_handler`.

The `handler_meta` for a custom event handler consists of two fields:
- `name` is the unique name of your middleware object
- `path` is the relative path to the file (it can be absolute)

For example, to register a custom event handler with the name `sessionHandler` to be invoked in response to the `KeyExpired` event you would add the following to your API definition:

```json
{
  "event_handlers": {
    "events": {
      "KeyExpired": [
        {
          "handler_name":"eh_dynamic_handler",
          "handler_meta": {
            "name": "sessionHandler",
            "path": "event_handlers/session_editor.js"
          }
        }
      ]
    }
  }
}
```

### Loading custom event handlers

The JavaScript files are loaded on API reload into the global JSVM. If a hot-reload event occurs, the global JSVM is re-set and files are re-loaded. This could cause event handlers that are currently executing to get abandoned. This is a measured risk and should not cause instability, however it should be noted that because of this, in an environment where reloads occur frequently, there is risk that event handler may not fire correctly.

## Monitoring quota consumption

Tyk provides the ability to actively monitor both user and organization quotas, using a dedicated webhook to notify your stakeholders, your system stack or the requesting API client when certain thresholds have been reached for a token.

Unlike API event [webhooks]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) the quota monitor is configured at the Gateway level.

<br>
{{< note success >}}
**Note**  

Advanced quota threshold monitoring is currently only supported by Tyk Classic APIs.
{{< /note >}}

### Configuring the quota consumption monitor

To enable advanced quota monitoring you will need to add a new `monitor` section to your Tyk Gateway configuration file (`tyk.conf`).

This has the following fields:
- `enable_trigger_monitors`: set to `true` to have the monitors start to measure quota thresholds
- `configuration`: a [webhook configuration]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) object
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

#### Setting advanced thresholds

The default quota consumption monitor will be triggered at the same level of quota usage for all users. Sometimes you might want to have a more granular approach with different triggering thresholds per user or organization. Sometimes you might want to fire the event at multiple thresholds, for example when the user hits 50%, 75% and 90% of their allowed quota.

You can set user specific trigger levels for a user by additionally adding a `monitor` section to the access key ([Session Object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}})). This has one field, which is an array of `trigger_limits` (thresholds) that must be in *descending* order and represent the percentage of the quota that must be reached in order for the trigger to be fired, for example:

```yaml
"monitor": {
  "trigger_limits": [90.0, 75.0, 50.0]
}
```

If this is included in the session object, then the quota threshold event will be fired and the monitor webhook triggered when the user hits 50%, then 75%, and then again at 90% consumption.

You can configure advanced thresholds for all users in an organization by adding the `monitor` section to the organization session object.

### Webhook payload

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

## Error Templates

In v2.2 the error handler allowed the use a single JSON template to communicate errors to users (a default one is shipped with Tyk, it's located in `templates/error.json`).

As of v2.3 it is possible to use different templates for specific `HTTP error codes`. The `content-type` header of the request is also checked, enabling the usage of different template formats, e.g. an XML template.

Please note that it is not possible to override the default message for HTTP 404 errors. These errors indicate that the requested resource could not be found (e.g. the requested URL does not exist).

### Use Cases

#### JSON Request

When a HTTP 500 error occurs, and the request is a JSON request, Tyk will follow this logic:

*   If `templates/error_500.json` exists, this template will be used.
*   Otherwise, Tyk will use `templates/error.json`.

#### XML Request

When a HTTP 500 error occurs, and the request is a XML request, Tyk will follow this logic:

*   If `templates/error_500.xml` exists, this template will be used.
*   If no specific template exists for this HTTP code, `templates/error.xml` will be used.
*   If `error.xml` doesn't exist, `templates/error.json` will be used.

#### Removing the X-Generator Header

In case of an error, the Tyk Gateway adds the following fixed header and value: `X-Generator: tyk.io`
Please note that for `404 Not found` errors, Tyk will not return this header from a security perspective. To mitigate this issue, in case you want to better understand your clients and provide you, the manager of the platform, with error information, you can set `track_404_logs` to `true` in your `tyk.conf` which will then produce error logs showing the resources that were requested and not found.

If you don't want to return our default X-Generator header (set to tyk.io) in your templates, set `hide_generator_header` to `true` in your `tyk.conf` file
