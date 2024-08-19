---
date: 2017-03-24T12:34:19Z
title: Event metadata
tags: ["API events", "metadata", "event handling", "event metadata"]
description: "Understanding the metadata associated with API events" 
---

When Tyk generates an [event]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) it will compile the following metadata that is passed to the event handler:

- `Message` (string): a human readable message from Tyk Gateway that adds detail about the event
- `Path` (string): the path of the API endpoint request that led to the event being fired
- `Origin` (string): origin data for the source of the request (if this exists)
- `Key` (string): the key that was used in the request
- `OriginatingRequest` (string): Based64-encoded [raw inbound request](#raw-request-data)

{{< note success >}}
**Note**  

Circuit breaker events provide different metadata, see [Circuit Breakers]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) to see what is provided when the `BreakerTripped`, `BreakerReset` or `BreakerTriggered` events are generated.
{{< /note >}}

### Using the metadata

The metadata are exposed so that they can be used by the event handler (webhook or custom) using Go templating. For details of how each type of event handler can access these data, please see the appropriate section for [webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks#webhook-payload" >}}) or [custom]({{< ref "basic-config-and-security/report-monitor-trigger-events/custom-handlers-javascript#the-event-object" >}}) event handlers.

### Raw Request Data

The `OriginatingRequest` metadata is a Base64-encoded wire-protocol representation of the original request to the event handler. If you are running a service bus or queue that stores failed, throttled or other types of requests, you can decode this object and parse it in order to re-create the original intent of the request (e.g. for post-processing).