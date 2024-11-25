---
date: 2017-03-24T12:31:55Z
title: Gateway events
tags: ["event handling", "event handler", "API events", "webhooks", "quota monitor"]
description: "Event handling with Tyk Gateway"
aliases:
  - /report-monitor-trigger-events/
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

Tyk can generate (or *fire*) a variety of built-in API events due to activity triggered by an API request, such as exceeded rate limits, depleted quotas or attempts to access using expired keys. The full list of standard API events is available [here]({{< ref "basic-config-and-security/report-monitor-trigger-events#api-events" >}}).

### Token lifecycle events

Alongside the events that are fired in response to API requests, Tyk will also mark the creation, update or deletion of access tokens (keys) with dedicated events as indicated [here]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types#token-lifecycle-events" >}}).

### Advanced quota usage events

Tyk will generate [standard quota events]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types#standard-quota-events" >}}) when a client quota has been consumed, but what if you want to have more granular notification of quota usage as your clients are approaching their quota limit?

For this, Tyk provides [advanced quota monitoring]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) that can be configured to trigger a dedicated event handler when the API usage exceeds different thresholds approaching the quota limit.

### Custom events

The event subsystem has been designed to be easily extensible, so the community can define additional events within the Tyk codebase which can then be handled using the exsiting event handling system.

## Handling events with Tyk

Tyk has a simple event handling system where *event handlers* are assigned (or registered) to the different [events]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) that Tyk can generate. These handlers are assigned per-API so when an event is generated for an API and there is an *event handler* registered for that *event*, the handler will be triggered.

Three different categories of *event handler* can be registered for each event:
- a [webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will call out to an external endpoint
- an [event log]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/log-handlers" >}}) that will write to the configured [log output]({{< ref "log-data" >}})
- your own [custom event handler]({{< ref "basic-config-and-security/report-monitor-trigger-events/custom-handlers-javascript" >}}) that will run in a JavaScript virtual machine on the Tyk server

{{< note success >}}
**Note**  

Remember that <b>quota usage monitoring</b> has a [dedicated mechanism]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) for handling these special events.
{{< /note >}}

### Event metadata

When an API event is fired, if there is an *event handler* registered for that combination of API and event then the handler will be provided with a rich set of [metadata]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-data" >}}) that can be used by the external system (webhook) or custom (JavaScript) code to determine the action to be taken.