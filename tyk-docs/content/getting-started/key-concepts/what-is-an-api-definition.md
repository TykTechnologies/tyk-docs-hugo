---
date: 2017-03-23T12:53:47Z
Title: API Definition Object
description: "Explain the concept of Tyk API definiton"
tags: ["Tyk API definiton", "API definiton", "API definiton Object"]
menu:
  main:
    parent: "Key Concepts"
weight: 55
---

Tyk handles your API services through files/objects called *Tyk API Definitions* which are written in as JSON objects. 
For *Tyk OSS*, which includes only *Tyk Gateway* they resied in `/var/tyk-gateway/apps` (LINUX) or `/opt/tyk-gateway/apps` (Docker). For the licensed product *Tyk Self Managed*, they'll be kept in a MongoDB or PostgreSQL.


An API Definition encapsulates the core settings for an API, as well as all of the actions to perform on an inbound request and an outbound response on a path-by-path basis, as well as on a global basis, where supported.

API Definition objects can be quite compact for a basic pass-through API, and can become very complex and large for APIs that require many operations to be completed before a request is proxied.

All elements of an API Configuration in Tyk are encapsulated in these objects.

API Definitions are identified by their API ID, and Gateway REST calls make reference to this ID where they are used. However, in Dashboard REST calls, an internal ID is used to prevent collisions, and in Dashboard API calls, this API ID must be used when operating on API Configurations.

See [API Definition Objects]({{< ref "tyk-gateway-api/api-definition-objects" >}}) for more details.

A definition for the Tyk Gateay when you want it to front your API and reverse proxy to it. It is not your actual API. This definition is used to tell the gateway which api service to front and which of Tyk MWs to execute on the request or respose. 

We have 2 main type of definitions - 
- *Tyk OAS API definiton* - Our new format, which comply with the OpenAPI Specification standard
- *Tyk Classic API definiton* - Tyk original format