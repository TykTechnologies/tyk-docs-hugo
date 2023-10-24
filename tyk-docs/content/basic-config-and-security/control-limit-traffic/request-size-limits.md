---
date: 2017-03-23T17:18:54Z
title: Request Size Limits
tags: ["Request size limits"]
description: "The key concepts for implementing request size limits with Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 4 
---

## Overview

With Tyk, you can apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from avoid excessive memory usage or brute force attacks.

Tyk offers a flexible tiered system of limiting request sizes ranging from globally applied limits across all APIs deployed on the gateway down to specific size limits for individual API endpoints.

All size limits are stated in bytes and are applied only to the request _body_, excluding the headers.

Tyk compares each incoming API request with the configured maximum size(s) and will reject any request that exceeds the size you have set, returning an HTTP 4xx error as detailed below.

{{< note success >}}
**Note**  

Tyk Cloud Classic enforces a strict request size limit of 1MB on all inbound requests via our cloud architecture. This does not affect Multi-Cloud users.
{{< /note >}}

### Applying a size limit for all APIs on your Gateway
You can optionally configure a request size limit (in bytes) that will be applied to all APIs on your Tyk Gateway by adding `max_request_body_size` to the `http_server_options` [element]({{< ref "/tyk-oss-gateway/configuration#http_server_options" >}}) of your `tyk.conf` Gateway configuration. For example:
```
"max_request_body_size": 5000
```

This Gateway-wide size limit will be evaluated before per-API or per-endpoint settings. If this test fails, the Tyk Gateway will report `413 Request Entity Too Large`.

### Applying a size limit for a specific API
You can optionally configure a request size limit (in bytes) to an API by adding `global_size_limit` to the `version` element of the API Definition, for example:
```
"global_size_limit": 2500 
```

This limit is applied for all endpoints _within an API_. It is evaluated after the Gateway-wide size limit and before any endpoint-specific size limit. If this test fails, the Tyk Gateway will report `400 Request is too large`.

### Applying a size limit for a specific API endpoint
Tyk provides a _Request Size Limit_ middleware that can be configured per API endpoint. This gives you the most granular control over request sizes.

You can configure this easily from the API Designer in the Tyk Dashboard, or by manually adding the configuration to your API definition.

This limit will be applied after any Gateway-level or API-level size limits; in keeping with the other size limit options provided by Tyk, this value is given in bytes. If this test fails, the Tyk Gateway will report `400 Request is too large`.

#### Using the Tyk Dashboard
You can enforce a request size limit for a specific API endpoint using the API Endpoint Designer:

1.  Click **ADD ENDPOINT**.

2.  Fill in the endpoint pattern with the details of the request (e.g. `GET widgets/{wildcard}`).

3.  Select **Request Size Limit** from the "Plugins" drop down.
    
    {{< img src="/img/2.10/request_size_limit.png" alt="Plugins drop down" >}}

4.  Set the size limit in bytes.
    
    {{< img src="/img/2.10/request_size_settings.png" alt="Size limit form" >}}

5.  Save the API.

#### Manually configuring the API Definition
To add the _Request Size Limit_ middleware to your API Definition, create a new section in the `extended_paths` block of your API Definition configuration called `size_limits`:

```{.copyWrapper}
"size_limits": [
  {
    "path": "widget/{id}",
    "method": "PUT",
    "size_limit": 1000
  }
  ]
```




