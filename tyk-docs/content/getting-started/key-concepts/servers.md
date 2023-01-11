---
title: "Servers"
date: 2022-07-06
tags: ["API", "OAS", "OpenAPI Specification", "Servers"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 1
---

{{< toc >}}

### Introduction

These are the URLs you would use to access an API. Once an API is added to Tyk, you will be using a URL that points at the Tyk Gateway itself, plus optionally, an additional listen path on the end of the URL. As part of an import, where possible, Tyk will aim to take the current server in the OAS API Specification provided and make that the Upstream in the Tyk OAS API Specification that is created. That way, Tyk will forward requests to the same place a user would have sent requests to before a gateway was in place. At the same time, the Tyk Gateway will be made the Server. This has the effect of automatically inserting Tyk into your API flow.

### Import OAS Definition

When you import an OAS API definition, Tyk analyses the `servers` section of the definition so that it can automatically configure the upstream URL and the listen path for the Tyk API, as follows:

The servers section is analysed only if there is no `upstreamUrl` query parameter used together with the import API. If an upstreamUrl was specified, that will be used as the upstream for the API and the servers section will be ignored.

The servers section may contain multiple upstream URLs. Currently, Tyk only analyses the first entry in the list, and uses it as the upstream URL if it is valid. For example:

For the following imported OAS server section
```.json
{
  "servers": [
    {
      "url": "https://upstream-A.com"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
Tyk will read `https://upstream-A.com` and set it as the upstream URL for the newly created API.

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "upstream": {
      "url": "https://upstream-A.com"
    }
  }
}
```
Tyk will insert the API URL as the first entry in the servers section since all traffic will now travel through the Tyk Gateway.

```.json
{
  "servers": [
    {
      "url": {API-URL}
    },
    {
      "url": "https://upstream-A.com"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
If the first entry in the `servers` configuration contains a relative URL, or a format that Tyk can’t properly work with, the import will fail with an error. For example:
When importing the following `servers` configuration:

```.json
{
  "servers": [
    {
      "url": "/relative-url"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
Tyk will import API will error with the following message, asking for a valid URL format or upstreamUrl query parameter to be provided:
```.json
{
    "status": "error",
    "message": "error validating servers entry in OAS: Please update \"/relative-url\" to be a valid url or pass a valid url with upstreamURL query param"
}
```
### Create API

When creating an API, either using the Tyk Gateway or Dashboard API, Tyk analyses the first entry URL value from the Tyk OAS API Definition `servers` configuration:
- it won't provide any change, if it already matches the API URL, OR
- it will insert a new first servers object containing the correct API URL value

This means that when you export this OAS API Definition to provide documentation for your developer portal, it will automatically tell your users the correct way to call the API now that Tyk is handling it.

### Update API

Whenever a Tyk API gets updated using either the Tyk Gateway or Dashboard API, Tyk analyses the first entry URL value from the Tyk OAS API Definition `servers` configuration:

- it won't provide any change, if it already matches the API URL, OR
- it will insert a new first servers object containing the correct API URL value, if the servers section doesn’t exist at all in the Tyk OAS API Definition.
- it updates the `url` value of the first entry in the servers section, if this is an outdated value of the API URL.

This means that when you export an OAS API Definition to provide documentation for your developer portal, it will automatically tell users the correct way to call the API now that Tyk is handling it.
