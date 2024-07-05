---
title: Using the Virtual Endpoint middleware with Tyk Classic APIs
tags:
    - virtual endpoint
    - middleware
    - per-endpoint
    - Tyk Classic
    - Tyk Classic API
description: Using the Virtual Endpoint middleware with Tyk Classic APIs
date: "2024-02-29"
---

The [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

If you want to use Virtual Endpoints, you must [enable Tyk's JavaScript Virtual Machine]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}) by setting `enable_jsvm` to `true` in your `tyk.conf` file.

To enable the middleware you must add a new `virtual` object to the `extended_paths` section of your API definition.

The `virtual` object has the following configuration:

- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `response_function_name`: this is the name of the JavaScript function that will be executed when the virtual endpoint is triggered
- `function_source_type`: instructs the middleware to look for the JavaScript code either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded code) is provided in `function_source_uri`
- `function_source_uri`: if `function_source_type` is set to `file`, this will be the relative path to the source file containing the JavaScript code; if `function_source_type` if set to `blob`, this will be a `base64` encoded string containing the JavaScript code
- `use_session`: a boolean that indicates whether the virtual endpoint should have access to the session object; if `true` then the key session data will be provided to the function as the `session` variable
- `proxy_on_error`: a boolean that determines the behavior of the gateway if an error occurs during the execution of the virtual endpoint's function; if set to `true` the request will be proxied to upstream if the function errors, if set to `false` the request will not be proxied and Tyk will return an error response

For example:

```json {linenos=true, linenostart=1}
{
    "extended_paths": {
        "virtual": [
            {
                "response_function_name": "myUniqueFunctionName",
                "function_source_type": "blob",
                "function_source_uri": "ZnVuY3Rpb24gbXlVbmlxdWVGdW5jdGlvbk5hbWUocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7CiB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IAogIEJvZHk6ICJUSElTIElTIEEgVklSVFVBTCBSRVNQT05TRSIsIAogIENvZGU6IDIwMCAKIH0KIHJldHVybiBUeWtKc1Jlc3BvbnNlKHJlc3BvbnNlT2JqZWN0LCBzZXNzaW9uLm1ldGFfZGF0YSkKfQ==",
                "path": "/anything",
                "method": "GET",
                "use_session": false,
                "proxy_on_error": false
            }
        ]
    }
}
```

In this example the Virtual Endpoint middleware has been configured for requests to the `GET /anything` endpoint. For any call made to this endpoint, Tyk will invoke the function `myUniqueFunctionName` that is `base64` encoded in the `function_source_uri` field. This virtual endpoint does not require access to the session data and will not proxy the request on to the upstream if there is an error when processing the `myUniqueFunctionName` function.

Decoding the value in `function_source_uri` we can see that the JavaScript code is:

```js {linenos=true, linenostart=1}
function myUniqueFunctionName(request, session, config) {
 var responseObject = { 
  Body: "THIS IS A VIRTUAL RESPONSE", 
  Code: 200 
 }
 return TykJsResponse(responseObject, session.meta_data)
}
```

This function will terminate the request without proxying it to the upstream returning `HTTP 200` as follows:

```bash
HTTP/1.1 200 OK
Date: Wed, 28 Feb 2024 20:52:30 GMT
Server: tyk
Content-Type: text/plain; charset=utf-8
Content-Length: 26
 
THIS IS A VIRTUAL RESPONSE
```

If, however, we introduce an error to the JavaScript, such that Tyk fails to process the function, we will receive an `HTTP 500 Internal Server Error` as follows:

```bash
HTTP/1.1 500 Internal Server Error
Date: Wed, 28 Feb 2024 20:55:27 GMT
Server: tyk
Content-Type: application/json
Content-Length: 99
 
{
"error": "Error during virtual endpoint execution. Contact Administrator for more details."
}
```

If we set `proxy_on_error` to `true` and keep the error in the Javascript, the request will be forwarded to the upstream and Tyk will return the response received from that service.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure a virtual endpoint for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to trigger the virtual endpoint. Select the **Virtual Endpoint** plugin.

{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-middleware.png" alt="Selecting the middleware" >}}

#### Step 2: Configure the middleware

Once you have selected the virtual endpoint middleware for the endpoint, you need to supply:

- JS function to call
- Source type (`file` or `inline`)

If you select source type `file` you must provide the path to the file:
{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-file.png" alt="Configuring file based JS code" >}}

If you select `inline` you can enter the JavaScript code in the Code Editor window.
{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-inline.png" alt="Configuring inline JS code" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the Virtual Endpoint middleware.

{{< note success >}}
**Note**

The Tyk Classic API Designer does not provide options to configure `use_session` or `proxy_on_error`, but you can do this from the Raw Definition editor.
{{< /note >}}
