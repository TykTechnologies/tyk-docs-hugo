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

There are four different categories of events that can be fired by Tyk and for which event handlers can be triggered:
- [API events](#api-events)
- [Token lifecycle events](#token-lifecycle-events)
- [Quota usage monitoring events](#quota-usage-monitoring)
- [Custom events](#custom-events)

### API events

Tyk can generate (or *fire*) a variety of built-in API events due to activity triggered by an API request, such as exceeded rate limits, depleted quotas or attempts to access using expired keys. The full list of standard API events is available [here]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types#api-events" >}}).

### Token lifecycle events

Alongside the events that are fired in response to API requests, Tyk will also mark the creation, update or deletion of access tokens (keys) with dedicated events as indicated [here]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types#token-lifecycle-events" >}}).

### Quota usage monitoring

Tyk will generate standard API events when an API client (`QuotaExceeded`) or organisation (`OrgQuotaExceeded`) quota is used up, but what if you want to have some advanced notice that your clients are approaching their quota limit?

For this, Tyk provides a dedicated [quota monitoring]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) capability that can be configured to trigger a dedicated monitor event handler when the API usage exceeds different thresholds approaching the quota limit.

### Custom events

The event subsystem has been designed to be easily extensible, so the community can provide additional event handlers (and add events) to the Tyk codebase or they can be compiled into the version branch very easily for custom builds.

## Handling events with Tyk

In response to an API, token lifecycle or custom event occuring, at the API-level you can:
- register a [webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will call out to an external endpoint
- send an [event log]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/log-handlers" >}}) to the configured [log output]({{< ref "log-data" >}})
- create your own [custom event handler]({{< ref "basic-config-and-security/report-monitor-trigger-events/custom-handlers-javascript" >}}) that will run in a JavaScript virtual machine on the Tyk server
- note that **quota usage monitoring** has a [dedicated monitor]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) to handle these events

### Event metadata

When an API event is fired, if there is an event handler registered for an event from that API then the handler will be provided with a rich set of [metadata]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-data" >}}) that can be used by the external system (webhook) or custom (JavaScript) code to determine the action to be taken.