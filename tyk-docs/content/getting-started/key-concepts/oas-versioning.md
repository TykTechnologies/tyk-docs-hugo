---
title: "OAS API Versioning"
date: 2022-07-07
tags: ["API", "OAS", "OpenAPI Specification", "Servers"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 5
---

{{< toc >}}

### Introduction

Tyk considers API versioning a highly important topic when it comes to adopting an API Gateway solution for your APIs. Whether it's about transparently changing/improving your API (while offering backwards compatibility or graceful degradation), or maybe using versioning as environments for your APIs, Tyk has buit the new versioning system with your developer experience in mind, taking into consideration the way different teams are setup and how they collaborate over designing APIs.

### Key concepts

A Tyk OAS API Definition can describe one API version at a time, so every version is a separate API.

Tyk introduces the concept of a Base API, which is in fact an API version, but one that stores information for the rest of the versions, and acts a request router. 

An example configuration of the versioning settings within the Base API:

```.json
{
  ...
  "x-tyk-api-gateway": {
    "info": {
      "expiration": "{expiration-date}"
      ...
      "versioning": {
        "enabled": true,
        "name": "Default",
        "default": "self",
        "location": "header",
        "key": "version",
        "versions": [
          {
            "name": "v1",
            "apiId": "<version-api-id>"
          },
          {
            "name": "v1",
            "apiId": "<version-api-id>"
          }
        ],
        "stripVersioningData": false
      }
    }
  }
}
```


- Within the `versioning` section, you can set which of the APIs (versions) can be the default one if a versioning identifier (i.e. header) is provided with the request. By default, this is set to `self`, which tells your Tyk Gateway that the Base API is the default version. Otherwise, you can provide the API ID of the API you want to be the default version.
- The `location` field describes where the versioning identifier can be picked up from by the Gateway: The available values are `header`, `path` or `query`.
- The `key` field represents the name of the version identifier.
- The `versions` array lists all the API versions beside the Base one.

As a best practice, we are suggesting that all your API Versions (except the Base API) should have the `internal` state enabled, so that their API listen path won’t be reachable by any request through the Tyk Gateway.

```.json
{
  ...
  "x-tyk-api-gateway": {
    "info": {
      "state": {
        ...
        internal: true
      }
    }
  }
}
```
