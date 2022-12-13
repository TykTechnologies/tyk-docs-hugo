---
date: 2017-03-24T12:34:19Z
title: Event Data
tags: ["Events", "Metadata"]
description: "Understanding the metadata associated with Tyk events"
menu:
  main:
    parent: "Report, Monitor and Trigger Events"
weight: 1 
---

### Event metadata

Tyk events carry some additional metadata (especially important for the webhook handler). this data can be used by the webhook and exposed if it implements it. The metadata that comes with an event is:

*   `Message` (string): a custom human readable message from the thing generating the event
*   `Path` (string): The path that was accessed that led to the event being fired
*   `Origin` (string): Origin data (if it exists)
*   `Key` (string): The key that raised the event
*   `OriginatingRequest` (string): Base64-encoded wire-protocol representation of the inbound request

These metadata elements are exposed so that they can be used in templates - again, this only applies to the webhook handler in this version, however it is a generic feature available to all handlers, for an example of how they are used, see the `templates/default_webhook.json` file, this is a golang template that directly accesses these values and exposes them as a webhook JSON payload.

{{< note success >}}
**Note**  

Circuit breaker events carry different data, see [Circuit Breakers](/planning-for-production/ensure-high-availability/circuit-breakers/) to see what is exposed.
{{< /note >}}


### Raw Request Data

Tyk will supply a Base64 encoded representation of the original request to the event handler, if you are running a service bus or queue that stores failed, throttled or other types of requests, you can decode this object and parse it in order to re-create the original intent of the request (e.g. for post-processing).