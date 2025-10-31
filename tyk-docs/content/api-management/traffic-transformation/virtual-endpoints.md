---
title: "Virtual Endpoints"
date: 2025-01-10
description: "How to configure Virtual Endpoints traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "Virtual Endpoints"]
keywords: ["Traffic Transformation", "Virtual Endpoints"]
aliases:
  - /advanced-configuration/compose-apis/virtual-endpoints
  - /product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas
  - /product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic
  - /advanced-configuration/compose-apis/demo-virtual-endpoint
  - /compose-apis/virtual-endpoints
---

## Overview

Tyk's Virtual Endpoint is a programmable middleware component that is invoked towards the end of the request processing chain. It can be enabled at the per-endpoint level and can perform complex interactions with your upstream service(s) that cannot be handled by one of the other middleware components.

Virtual endpoint middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The Virtual Endpoint is an extremely powerful feature that is unique to Tyk and provides exceptional flexibility to your APIs.

### Use Cases

#### Aggregating data from multiple services

From a virtual endpoint, you can make calls out to other internal and upstream APIs. You can then aggregate and process the responses, returning a single response object to the originating client. This allows you to configure a single externally facing API to simplify interaction with multiple internal services, leaving the heavy lifting to Tyk rather than starting up an aggregation service within your stack.

#### Enforcing custom policies

Tyk provides a very flexible [middleware chain]({{< ref "api-management/traffic-transformation#request-middleware-chain" >}}) where you can combine functions to implement the access controls you require to protect your upstream services. Of course, not all scenarios can be covered by Tyk's standard middleware functions, but you can use a virtual endpoint to apply whatever custom logic you require to optimize your API experience.

#### Dynamic Routing

With a virtual endpoint you can implement complex dynamic routing of requests made to a single external endpoint on to different upstream services. The flexibility of the virtual endpoint gives access to data within the request (including the key session) and also the ability to make calls to other APIs to make decisions on the routing of the request. It can operate as a super-powered [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) middleware.

### Working

The virtual endpoint middleware provides a JavaScript engine that runs the custom code that you provide either inline within the API definition or in a source code file accessible to the Gateway. The JavaScript Virtual Machine (JSVM) provided in the middleware is a traditional ECMAScript5 compatible environment which does not offer the more expressive power of something like Node.js.

The virtual endpoint terminates the request, so the JavaScript function must provide the response to be passed to the client. When a request hits a virtual endpoint, the JSVM executes the JavaScript code which can modify the request, make calls to other APIs or upstream services, process data, and ultimately determines the response returned to the client.

{{< note success >}}
**Note**

You will need to enable Tyk's JavaScript Virtual Machine by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}) for your virtual endpoints to work.
{{< /note >}}

### Scripting virtual endpoint functions

The [middleware scripting guide]({{< ref "api-management/plugins/javascript#using-javascript-with-tyk" >}}) provides guidance on writing JS functions for your virtual endpoints, including how to access key session data and custom attributes from the API definition.

#### Function naming

The virtual endpoint middleware will invoke a named function within the JS code that you provide (either inline or in a file). Both the filename and function name are configurable per endpoint, but note that function names must be unique across your API portfolio because all plugins run in the same virtual machine. This means that you can share a single function definition across multiple endpoints and APIs but you cannot have two different functions with the same name (this applies across all [JavaScript middleware components]({{< ref "api-management/plugins/javascript#" >}})).

Inline mode is mainly used by the dashboard to make code injection easier on multiple node deployments.

### Virtual endpoint library

We have put together a [library](https://github.com/TykTechnologies/custom-plugins#virtual-endpoints) of JS functions that you could use in your virtual endpoints. We welcome submissions from the Tyk community so if you've created a function that you think would be useful to other users, please open an issue in the Github repository and we can discuss bringing it into the library.

{{< note success >}}
**Note**

Virtual endpoints are not available in Tyk Cloud Classic.
{{< /note >}}

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 # Virtual Endpoint middleware summary
  - The Virtual Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Virtual Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


## Using Tyk OAS {#virtual-endpoints-using-tyk-oas}

The [virtual endpoint]({{< ref "api-management/traffic-transformation/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#virtual-endpoints-using-classic" >}}) page.

### API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The virtual endpoint middleware (`virtualEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `virtualEndpoint` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `functionName`: the name of the JavaScript function that will be executed when the virtual endpoint is triggered
- `body`: [optional] a `base64` encoded string containing the JavaScript code
- `path`: [optional] the relative path to the source file containing the JavaScript code
- `proxyOnError`: [optional, defaults to `false`] a boolean that determines the behavior of the gateway if an error occurs during the execution of the virtual endpoint's function; if set to `true` the request will be proxied to upstream if the function errors, if set to `false` the request will not be proxied and Tyk will return an error response 
- `requireSession`: [optional defaults to `false`] a boolean that indicates whether the virtual endpoint should have access to the session object; if `true` then the key session data will be provided to the function as the `session` variable

{{< note success >}}
**Note**

One of either `path` or `body` must be provided, depending on whether you are providing the JavaScript code in a file or inline within the API definition. If both are provided then `body` will take precedence.
{{< /note >}}

For example:

```json {hl_lines=["39-50", "54-58"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-virtual-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-virtual-endpoint",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-virtual-endpoint/",                
                "strip": true
            }
        },      
        "middleware": {
            "global": {
                "pluginConfig": {
                    "data": {
                        "enabled": true,
                        "value": {
                            "map": {
                                "key": 3
                            },
                        "num": 4,
                        "string": "example"
                        }
                    }
                }
            },
            "operations": {
                "anythingget": {
                    "virtualEndpoint": {
                        "enabled": true,
                        "functionName": "myVirtualHandler",
                        "body": "ZnVuY3Rpb24gbXlWaXJ0dWFsSGFuZGxlciAocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7ICAgICAgCiAgdmFyIHJlc3BvbnNlT2JqZWN0ID0gewogICAgQm9keTogIlZpcnR1YWwgRW5kcG9pbnQgIitjb25maWcuY29uZmlnX2RhdGEuc3RyaW5nLAogICAgSGVhZGVyczogewogICAgICAiZm9vLWhlYWRlciI6ICJiYXIiLAogICAgICAibWFwLWhlYWRlciI6IEpTT04uc3RyaW5naWZ5KGNvbmZpZy5jb25maWdfZGF0YS5tYXApLAogICAgICAic3RyaW5nLWhlYWRlciI6IGNvbmZpZy5jb25maWdfZGF0YS5zdHJpbmcsCiAgICAgICJudW0taGVhZGVyIjogSlNPTi5zdHJpbmdpZnkoY29uZmlnLmNvbmZpZ19kYXRhLm51bSkKICAgIH0sCiAgICBDb2RlOiAyMDAKICB9CiAgcmV0dXJuIFR5a0pzUmVzcG9uc2UocmVzcG9uc2VPYmplY3QsIHNlc3Npb24ubWV0YV9kYXRhKQp9"
                    }
                }
            }
        }
    }
}
```

In this example the virtual endpoint middleware has been configured for requests to the `GET /anything` endpoint. We have also configured the following custom attributes in the `pluginConfig` section of the API definition:

```json
{
    "map": {
        "key": 3
    },
    "num": 4,
    "string": "example"
}
```

The `body` field value is a `base64` encoded string containing this JavaScript code, which will be invoked by the virtual endpoint middleware:

```js
function myVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "Virtual Endpoint "+config.config_data.string,
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
    Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

A call to the `GET /anything` endpoint returns:

```bash
HTTP/1.1 200 OK
Date: Fri, 01 Mar 2024 12:14:36 GMT
Foo-Header: bar
Map-Header: {"key":3}
Num-Header: 4
Server: tyk
String-Header: example
Content-Length: 24
Content-Type: text/plain; charset=utf-8
 
Virtual Endpoint example
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the virtual endpoint middleware.

### API Designer

Adding a Virtual Endpoint to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Virtual Endpoint middleware**

    Select **ADD MIDDLEWARE** and choose **Virtual Endpoint** from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-virtual-endpoint.png" alt="Adding the Virtual Endpoint middleware" >}}

3. **Configure the middleware**

    Now you can provide either the path to a file containing the JavaScript function to be run by the middleare, or you can directly enter the JavaScript in the code editor.

    For both sources, you must provide the **function name** that should be called when the middleware executes.

    You can also optionally configure the behavior required if the function should return an error and also indicate to Tyk whether the virtual middleware requires access to the key session metadata.

    {{< img src="/img/dashboard/api-designer/tyk-oas-virtual-endpoint-config.png" alt="Configuring the Virtual Endpoint middleware" >}}

4. **Save the API**

    Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

## Using Classic {#virtual-endpoints-using-classic}

The [virtual endpoint]({{< ref "api-management/traffic-transformation/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#virtual-endpoints-using-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

### API Definition

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

### API Designer

You can use the API Designer in the Tyk Dashboard to configure a virtual endpoint for your Tyk Classic API by following these steps.

1. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to trigger the virtual endpoint. Select the **Virtual Endpoint** plugin.

    {{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-middleware.png" alt="Selecting the middleware" >}}

2. **Configure the middleware**

    Once you have selected the virtual endpoint middleware for the endpoint, you need to supply:

    - JS function to call
    - Source type (`file` or `inline`)

    If you select source type `file` you must provide the path to the file:
    {{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-file.png" alt="Configuring file based JS code" >}}

    If you select `inline` you can enter the JavaScript code in the Code Editor window.
    {{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-inline.png" alt="Configuring inline JS code" >}}

3. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the Virtual Endpoint middleware.

{{< note success >}}
**Note**

The Tyk Classic API Designer does not provide options to configure `use_session` or `proxy_on_error`, but you can do this from the Raw Definition editor.
{{< /note >}}

### Tyk Operator

The process for configuring a virtual endpoint using Tyk Operator is similar to that explained in configuring the middleware in the Tyk Classic API Definition

The example API Definition below configures an API to listen on path `/httpbin` and forwards requests upstream to `http://httpbin.org`. The Virtual Endpoint middleware has been configured for requests to the `GET /virtual` endpoint. For any call made to this endpoint, Tyk will invoke the function `myVirtualHandler` that is base64 encoded in the `function_source_uri` field. This virtual endpoint does not require access to the session data and will not proxy the request on to the upstream if there is an error when processing the `myVirtualHandler` function.

```yaml {linenos=true, linenostart=1, hl_lines=["23-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: test-config-data-test
spec:
  name: test-config-data-test
  protocol: http
  proxy:
    listen_path: /httpbin/
    target_url: http://httpbin.org
    strip_listen_path: true
  active: true
  use_keyless: true
  enable_context_vars: true
  version_data:
    default_version: Default
    not_versioned: false
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          virtual:
            - function_source_type: blob
              response_function_name: myVirtualHandler
              function_source_uri: "ZnVuY3Rpb24gbXlWaXJ0dWFsSGFuZGxlciAocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7ICAgICAgCiAgdmFyIHJlc3BvbnNlT2JqZWN0ID0gewogICAgQm9keTogIlRISVMgSVMgQSAgVklSVFVBTCBSRVNQT05TRSIsCiAgICBIZWFkZXJzOiB7CiAgICAgICJmb28taGVhZGVyIjogImJhciIsCiAgICAgICJtYXAtaGVhZGVyIjogSlNPTi5zdHJpbmdpZnkoY29uZmlnLmNvbmZpZ19kYXRhLm1hcCksCiAgICAgICJzdHJpbmctaGVhZGVyIjogY29uZmlnLmNvbmZpZ19kYXRhLnN0cmluZywKICAgICAgIm51bS1oZWFkZXIiOiBKU09OLnN0cmluZ2lmeShjb25maWcuY29uZmlnX2RhdGEubnVtKQogICAgfSwKICAgICAgQ29kZTogMjAwCiAgfQogIHJldHVybiBUeWtKc1Jlc3BvbnNlKHJlc3BvbnNlT2JqZWN0LCBzZXNzaW9uLm1ldGFfZGF0YSkKfQ=="
              path: /virtual
              method: GET
              use_session: false
              proxy_on_error: false
  config_data:
    string: "string"
    map:
      key: 3
    num: 4
```

Decoding the value in `function_source_uri` we can see that the JavaScript code is:

```javascript
function myVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "THIS IS A  VIRTUAL RESPONSE",
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
    Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

This function will terminate the request without proxying it to the upstream, returning HTTP 200 as follows:

```bash
HTTP/1.1 200 OK
Date: Wed, 14 Aug 2024 15:37:46 GMT
Foo-Header: bar
Map-Header: {"key":3}
Num-Header: 4
Server: tyk
String-Header: string
Content-Length: 27
Content-Type: text/plain; charset=utf-8
 
THIS IS A VIRTUAL RESPONSE
```

If, however, we introduce an error to the JavaScript, such that Tyk fails to process the function, we will receive an HTTP 500 Internal Server Error as follows:

```bash
HTTP/1.1 500 Internal Server Error
Date: Wed, 14 Aug 2024 15:37:46 GMT
Server: tyk
Content-Type: application/json
Content-Length: 99
 
{
"error": "Error during virtual endpoint execution. Contact Administrator for more details."
}
```

If we set `proxy_on_error` to `true` and keep the error in the Javascript, the request will be forwarded to the upstream and Tyk will return the response received from that service.

## Examples

### Accessing Tyk data objects

In this example, we demonstrate how you can access different [external Tyk objects]({{< ref "api-management/plugins/javascript#accessing-external-and-dynamic-data" >}}) (API request, session key, API definition).

1. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```javascript
function myFirstVirtualHandler (request, session, config) {
  log("Virtual Test running")
  
  log("Request Body: " + request.Body)
  log("Session: " + JSON.stringify(session.allowance))
  log("Config: " + JSON.stringify(config.APIID))
  log("param-1: " + request.Params["param1"]) // case sensitive
  log("auth Header: " + request.Headers["Authorization"]) // case sensitive
  
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #1",
    Headers: {
      "x-test": "virtual-header",
      "x-test-2": "virtual-header-2"
    },
    Code: 200
  }
  
  return TykJsResponse(responseObject, session.meta_data)   
}
log("Virtual Test initialised")
```

2. Make a call to your API endpoint passing a request body, a value in the `Authorization` header and a query parameter `param1`.

3. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:39:00 GMT
Server: tyk
X-Test: virtual-header
X-Test-2: virtual-header-2
Content-Length: 27
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #1
```

4. The gateway logs will include:

```text
time="" level=info msg="Virtual Test running" prefix=jsvm type=log-msg
time="" level=info msg="Request Body: <your-request-body>" prefix=jsvm type=log-msg
time="" level=info msg="Session: <allowance-from-your-session-key>" prefix=jsvm type=log-msg
time="" level=info msg="Config: <your-APIID>" prefix=jsvm type=log-msg
time="" level=info msg="param-1: <your_query_parameter>" prefix=jsvm type=log-msg
time="" level=info msg="auth Header: <your-auth-header>" prefix=jsvm type=log-msg
```

### Accessing custom attributes in the API Definition

You can add [custom attributes]({{< ref "api-management/plugins/javascript#adding-custom-attributes-to-the-api-definition" >}}) to the API definition and access these from within your Virtual Endpoint.

1. Add the following custom attributes to your API definition:

```json
{
  "string": "string",
  "map": {
    " key": 3
  },
  "num": 4
}
```

2. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```js
function mySecondVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #2",
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
      Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

3. Make a call to your API endpoint.

4. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:29:12 GMT
Foo-Header: bar
Map-Header: {" key":3}
Num-Header: 4
Server: tyk
String-Header: string
Content-Length: 26
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #2
```

### Advanced example

In this example, every line in the script gives an example of a functionality usage, including:

- how to get form param
- how to get to a specific key inside a JSON variable
- the structure of the request object
- using `TykMakeHttpRequest` to make an HTTP request from within the virtual endpoint, and the json it returns - `.Code` and `.Body`.

```js
function myVirtualHandlerGetHeaders (request, session, config) {
  rawlog("Virtual Test running")
    
  //Usage examples:
  log("Request Session: " + JSON.stringify(session))
  log("API Config:" + JSON.stringify(config))
 
  log("Request object: " + JSON.stringify(request))   
  log("Request Body: " + JSON.stringify(request.Body))
  log("Request Headers:" + JSON.stringify(request.Headers))
  log("param-1:" + request.Params["param1"])
    
  log("Request header type:" + typeof JSON.stringify(request.Headers))
  log("Request header:" + JSON.stringify(request.Headers.Location))
    

  //Make api call to upstream target
  newRequest = {
    "Method": "GET",
    "Body": "",
    "Headers": {"location":JSON.stringify(request.Headers.Location)},
    "Domain": "http://httpbin.org",
    "Resource": "/headers",
    "FormData": {}
  };
  rawlog("--- before get to upstream ---")
  response = TykMakeHttpRequest(JSON.stringify(newRequest));
  rawlog("--- After get to upstream ---")
  log("response type: " + typeof response);
  log("response: " + response);
  usableResponse = JSON.parse(response);
  var bodyObject = JSON.parse(usableResponse.Body);
    
  var responseObject = {
    //Body: "THIS IS A VIRTUAL RESPONSE",
    Body: "yo yo",
    Headers: {
      "test": "virtual",
      "test-2": "virtual",
      "location" : bodyObject.headers.Location
    },
    Code: usableResponse.Code
  }
    
  rawlog("Virtual Test ended")
  return TykJsResponse(responseObject, session.meta_data)   
}
```

### Running the Advanced example

You can find a Tyk Classic API definition [here](https://gist.github.com/letzya/5b5edb3f9f59ab8e0c3c614219c40747) that includes the advanced example, with the JS encoded `inline` within the middleware config for the `GET /headers` endpoint.

Create a new Tyk Classic API using that API definition and then run the following command to send a request to the API endpoint:

```bash
curl http://tyk-gateway:8080/testvirtualendpoint2/headers -H "location: /get" -v
```

This should return the following:

```bash
Trying 127.0.0.1...
TCP_NODELAY set
Connected to tyk-gateway (127.0.0.1) port 8080 (#0)
GET /testvirtualendpoint2/headers HTTP/1.1
Host: tyk-gateway:8080
User-Agent: curl/7.54.0
Accept: */*
location: /get

HTTP/1.1 200 OK
Date: Fri, 08 Jun 2018 21:53:57 GMT
**Location: /get**
Server: tyk
Test: virtual
Test-2: virtual
Content-Length: 5
Content-Type: text/plain; charset=utf-8

Connection #0 to host tyk-gateway left intact
yo yo
```

### Checking the Tyk Gateway Logs

The `log` and `rawlog` commands in the JS function write to the Tyk Gateway logs. If you check the logs you should see the following:

```text
[Jun 13 14:45:21] DEBUG jsvm: Running: myVirtualHandlerGetHeaders
Virtual Test running
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Session: {"access_rights":null,"alias":"","allowance":0,"apply_policies":null,"apply_policy_id":"","basic_auth_data":{"hash_type":"","password":""},"certificate":"","data_expires":0,"enable_detail_recording":false,"expires":0,"hmac_enabled":false,"hmac_string":"","id_extractor_deadline":0,"is_inactive":false,"jwt_data":{"secret":""},"last_check":0,"last_updated":"","meta_data":null,"monitor":{"trigger_limits":null},"oauth_client_id":"","oauth_keys":null,"org_id":"","per":0,"quota_max":0,"quota_remaining":0,"quota_renewal_rate":0,"quota_renews":0,"rate":0,"session_lifetime":0,"tags":null} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: API Config:{"APIID":"57d72796c5de45e649f22da390d7df43","OrgID":"5afad3a0de0dc60001ffdd07","config_data":{"bar":{"y":3},"foo":4}} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request object: {"Body":"","Headers":{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]},"Params":{"param1":["I-am-param-1"]},"URL":"/testvirtualendpoint2/headers"} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Body: "" type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Headers:{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: param-1:I-am-param-1 type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header type:[object Object] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header: ["/get"] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: object type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: string type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location: /get type=log-msg
--- before get to upstream ---
--- After get to upstream ---
[Jun 13 14:45:22]  INFO jsvm-logmsg: response type: string type=log-msg
[Jun 13 14:45:22]  INFO jsvm-logmsg: response: {"Code":200,"Body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","Headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]},"code":200,"body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]}} type=log-msg
Virtual Test ended
[Jun 13 14:45:22] DEBUG JSVM Virtual Endpoint execution took: (ns) 191031553
```

### Aggregating upstream calls using batch processing

One of the most common use cases for virtual endpoints is to provide some form of aggregate data to your users, combining the responses from multiple upstream service calls. This virtual endpoint function will do just that using the batch processing function from the [JavaScript API]({{< ref "api-management/plugins/javascript#javascript-api" >}})

```js
function batchTest(request, session, config) {
  // Set up a response object
  var response = {
    Body: "",
    Headers: {
      "test": "virtual-header-1",
      "test-2": "virtual-header-2",
      "content-type": "application/json"
    },
    Code: 200
  }
    
  // Batch request
  var batch = {
    "requests": [
      {
        "method": "GET",
        "headers": {
          "x-tyk-test": "1",
          "x-tyk-version": "1.2",
          "authorization": "1dbc83b9c431649d7698faa9797e2900f"
        },
        "body": "",
        "relative_url": "http://httpbin.org/get"
      },
      {
        "method": "GET",
        "headers": {},
        "body": "",
        "relative_url": "http://httpbin.org/user-agent"
      }
    ],
    "suppress_parallel_execution": false
  }
    
  log("[Virtual Test] Making Upstream Batch Request")
  var newBody = TykBatchRequest(JSON.stringify(batch))
    
  // We know that the requests return JSON in their body, lets flatten it
  var asJS = JSON.parse(newBody)
  for (var i in asJS) {
    asJS[i].body = JSON.parse(asJS[i].body)
  }
    
  // We need to send a string object back to Tyk to embed in the response
  response.Body = JSON.stringify(asJS)
    
  return TykJsResponse(response, session.meta_data)
    
}
log("Batch Test initialised")                
```

