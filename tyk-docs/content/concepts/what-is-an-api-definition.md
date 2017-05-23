---
date: 2017-03-23T12:53:47Z
Title: What is an API Definition?
menu:
  main:
    parent: "Concepts"
weight: 1 
---

## Concept: API Definition

Tyk handles APIs through files / objects called API Definitions – these are JSON objects – and either live in the /var/tyk-gateway/apps directory or in a MongoDB collection as part of a Pro installation.

An API Definition encapsulates the core settings for an API, as well as all of the actions to perform on an inbound request and an outbound response on a path-by-path basis, as well as on a global basis, where supported.

API Definition objects can be quite compact for a basic pass-through API, and can become very complex and large for APIs that require many operations to be completed before a request is proxied.

All elements of an API Configuration in Tyk are encapsulated in these objects.

API Definitions are identified by their API ID, and Gateway REST calls make reference to this ID where used. However, in Dashboard REST calls, an internal ID is used to prevent collisions, and in Dashboard API calls, this API ID must be used when operating on API Configurations.

The API Definition object is discussed in detail in the [REST API section][1] of this documentation.

[1]: /tyk-rest-api/api-definition-object-details/