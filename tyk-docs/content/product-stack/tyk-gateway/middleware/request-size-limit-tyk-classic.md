---
title: Using the Request Size Limit middleware with Tyk Classic APIs
date: 2024-03-04
description: "Using the Request Size Limit middleware with Tyk Classic APIs"
tags: ["request size limit", "size limit", "security", "middleware", "per-endpoint", "per-API", "Tyk Classic", "Tyk Classic API"]
---

The [request size limit]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) middleware enables you to apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from excessive memory usage or brute force attacks.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

There are three different levels of granularity that can be used when configuring a request size limit.
- [system-wide]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits#applying-a-system-wide-size-limit" >}}): affecting all APIs deployed on the gateway
- [API-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic#applying-a-size-limit-for-a-specific-api" >}}): affecting all endpoints for an API
- [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic#applying-a-size-limit-for-a-specific-endpoint" >}}): affecting a single API endpoint

### Applying a size limit for a specific API

You can configure a request size limit (in bytes) to an API by configuring the `global_size_limit` within the `version` element of the API Definition, for example:
```
"global_size_limit": 2500 
```

A value of zero (default) means that no maximum is set and the API-level size limit check will not be performed.

This limit is applied for all endpoints within an API. It is evaluated after the Gateway-wide size limit and before any endpoint-specific size limit. If this test fails, the Tyk Gateway will report `HTTP 400 Request is too large`.

### Applying a size limit for a specific endpoint

The most granular control over request sizes is provided by the endpoint-level configuration. This limit will be applied after any Gateway-level or API-level size limits and is given in bytes. If this test fails, the Tyk Gateway will report `HTTP 400 Request is too large`.

To enable the middleware you must add a new `size_limits` object to the `extended_paths` section of your API definition.

The `size_limits` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `size_limit`: the maximum size permitted for a request to the endpoint (in bytes)

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "size_limits": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "POST",
                "size_limit": 100
            }
        ]
    }
}
```

In this example the endpoint-level Request Size Limit middleware has been configured for HTTP `POST` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will check the size of the payload (Request body) and, if it is larger than 100 bytes, will reject the request, returning `HTTP 400 Request is too large`.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure a request size limit for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to limit the size of requests. Select the **Request size limit** plugin.

{{< img src="/img/2.10/request_size_limit.png" alt="Select middleware" >}}

#### Step 2: Configure the middleware

Set the request size limit, in bytes.
    
{{< img src="/img/2.10/request_size_settings.png" alt="Configure limit" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

{{< note success >}}
**Note**  

The Tyk Classic API Designer does not provide an option to configure `global_size_limit`, but you can do this from the Raw Definition editor.
{{< /note >}}