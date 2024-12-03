---
title: Using JavaScript with Tyk
tags:
    - JavaScript
    - JS
    - middleware
    - scripting
    - JSVM
    - plugins
    - virtual endpoint
description: Writing custom JS functions for Tyk middleware
date: "2017-03-24T14:51:42Z"
aliases:
    - /tyk-api-gateway-v1-9/javascript-plugins/middleware-scripting/
    - /plugins/javascript-middleware/middleware-scripting-guide
---

Tyk's JavaScript Virtual Machine (JSVM) provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself. This can be accessed from [multiple locations]({{< ref "plugins/supported-languages/javascript-middleware" >}}) in the API processing chain and allows significant customization and optimization of your request handling.

In this guide we will cover the features and resources available to you when creating custom functions, highlighting where there are limitations for the different middleware stages.

## Scripting basics

Here we cover various facets that you need to be aware of when creating custom functions for Tyk.

### Accessing external and dynamic data

JS functions can be given access to external data objects relating to the API request. These allow for the modification of both the request itself and the session:

- `request`: an [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-request-object" >}}) describing the API request that invoked the middleware
- `session`: the key session [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-session-object" >}}) provided by the client when making the API request
- `config`: an [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-config-object" >}}) containing fields from the API definition

{{< note success >}}
**Note**

There are other ways of accessing and editing a session object using the [Tyk JavaScript API functions]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api#working-with-the-key-session-object" >}}).
{{< /note >}}

### Creating a middleware component

Tyk injects a `TykJS` namespace into the JSVM, which can be used to initialise a new middleware component. The JS for each middleware component should be in its own `*.js` file.

You create a middleware object by calling the `TykJS.TykMiddleware.NewMiddleware({})` constructor with an empty object and then initialising it with your function using the `NewProcessRequest()` closure syntax. This is where you expose the [external data objects]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#accessing-external-and-dynamic-data" >}}) to your custom function.

{{< note success >}}
**Note**

- For Custom JS plugins and Dynamic Event Handlers, the source code filename must match the function name
- Virtual Endpoints do not have this limitation
{{< /note >}}

### Returning from the middleware

When returning from the middleware, you provide specific return data depending upon the type of middleware.

#### Returning from Custom JS plugin

A custom JS plugin can modify fields in the API request and the session metadata, however this is not performed directly within the JSVM so the required updates must be passed out of the JSVM for Tyk to apply the changes. This is a requirement and omitting them can cause the middleware to fail.

The JS function must provide the `request` and `session.meta_data` objects in the `ReturnData` as follows:

```js
return sampleMiddleware.ReturnData(request, session.meta_data);
```

Custom JS plugins sit in the [middleware processing chain]({{< ref "concepts/middleware-execution-order" >}}) and pass the request onto the next middleware before it is proxied to the upstream. If required, however, a custom JS plugin can terminate the request and provide a custom response to the client if you configure the `ReturnOverrides` in the `request` object, as described [here]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#using-returnoverrides" >}}).

#### Returning from Virtual Endpoint

Unlike custom JS plugins, Virtual Endpoints always [terminate the request]({{< ref "advanced-configuration/compose-apis/virtual-endpoints#how-virtual-endpoints-work" >}}) so have a different method of returning from the JS function.

The function must return a `responseObject`. This is crucial as it determines the HTTP response that will be sent back to the client. The structure of this object is defined to ensure that the virtual endpoint can communicate the necessary response details back to the Tyk Gateway, which then forwards it to the client.

The `responseObject` has the following structure:

- `code`: an integer representing the HTTP status code of the response
- `headers`: an object containing key-value pairs representing the HTTP headers of the response
- `body`: a string that represents the body of the response which can be plain text, JSON, or XML, depending on what your API client expects to receive

You must provide the `responseObject` together with the `session.meta_data` as parameters in a call to `TykJsResponse` as follows:

```js
return TykJsResponse(responseObject, session.meta_data);
```

You can find some examples of how this works [here]({{< ref "advanced-configuration/compose-apis/demo-virtual-endpoint" >}}).

## JavaScript resources

JavaScript (JS) functions have access to a [system API]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api" >}}) and [library of functions]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#underscorejs-library" >}}). They can also be given access to certain Tyk data objects relating to the API request.

The system API provides access to resources outside of the JavaScript Virtual Machine sandbox, the ability to make outbound HTTP requests and access to the key management REST API functions.

### The `request` object

The `request` object provides a set of arrays that describe the API request. These can be manipulated and, when changed, will affect the request as it passes through the middleware pipeline. For [virtual endpoints]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) the request object has a [different structure](#VirtualEndpoint-Request).

The structure of the `request` object is:

```typesecript
class ReturnOverrides {
  ResponseCode: number = 200;
  ResponseBody: string = "";
  ResponseHeaders: string[] = [];
}

class Request {
  Headers: { [key: string]: string[] } = {};
  SetHeaders: { [key: string]: string } = {};
  DeleteHeaders: string[] = [];
  Body: string = "";
  URL: string = "";
  AddParams: { [key: string]: string } = {};
  DeleteParams: string[] = [];
  ReturnOverrides: ReturnOverrides = new ReturnOverrides();
  IgnoreBody: boolean = false;
  Method: string = "";
  RequestURI: string = "";
  Scheme: string = "";
}
```

<!--
```go
struct {
  Headers       map[string][]string
  SetHeaders    map[string]string
  DeleteHeaders []string
  Body          string
  URL           string
  AddParams     map[string]string
  DeleteParams  []string
  ReturnOverrides {
    ResponseCode: int
    ResponseBody: string
    ResponseHeaders []string
  }
  IgnoreBody    bool
  Method        string
  RequestURI    string
  Scheme        string
}
``` -->

- `Headers`: this is an object of string arrays, and represents the current state of the request header; this object cannot be modified directly, but can be used to read header data
- `SetHeaders`: this is a key-value map that will be set in the header when the middleware returns the object; existing headers will be overwritten and new headers will be added
- `DeleteHeaders`: any header name that is in this list will be deleted from the outgoing request; note that `DeleteHeaders` happens before `SetHeaders`
- `Body`: this represents the body of the request, if you modify this field it will overwrite the request
- `URL`: this represents the path portion of the outbound URL, you can modify this to redirect a URL to a different upstream path
- `AddParams`: you can add parameters to your request here, for example internal data headers that are only relevant to your network setup
- `DeleteParams`: these parameters will be removed from the request as they pass through the middleware; note `DeleteParams` happens before `AddParams`
- `ReturnOverrides`: values stored here are used to stop or halt middleware execution and return an error code
- `IgnoreBody`: if this parameter is set to `true`, the original request body will be used; if set to `false` the `Body` field will be used (`false` is the default behavior)
- `Method`: contains the HTTP method (`GET`, `POST`, etc.)
- `RequestURI`: contains the request URI, including the query string, e.g. `/path?key=value`
- `Scheme`: contains the URL scheme, e.g. `http`, `https`


#### Using `ReturnOverrides`

If you configure values in `request.ReturnOverrides` then Tyk will terminate the request and provide a response to the client when the function completes. The request will not be proxied to the upstream.

The response will use the parameters configured in `ReturnOverrides`:

- `ResponseCode`
- `ResponseBody`
- `ResponseHeaders`

In this example, if the condition is met, Tyk will return `HTTP 403 Access Denied` with the custom header `"X-Error":"the-condition"`:

```js
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});

testJSVMData.NewProcessRequest(function(request, session, config) {
  // Logic to determine if the request should be overridden
  if (someCondition) {
      request.ReturnOverrides.response_code = 403;
      request.ReturnOverrides.response_body = "Access Denied";
      request.ReturnOverrides.headers = {"X-Error": "the-condition"};
      // This stops the request from proceeding to the upstream
  }
	return testJSVMData.ReturnData(request, session.meta_data);
});
```

#### The virtual endpoint `request` object {#VirtualEndpoint-Request}

For [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) functions the structure of a Javascript `request` object is:

```typescript
class VirtualEndpointRequest {
  Body: string = "";
  Headers: { [key: string]: string[] } = {};
  Params: { [key: string]: string[] } = {};
  Scheme: string = "";
  URL: string = "";
}
```

- `Body`: HTTP request body, e.g. `""`
- `Headers`: HTTP request headers, e.g. `"Accept": ["*/*"]`
- `Params`: Decoded query and form parameters, e.g. `{ "confirm": ["true"], "userId": ["123"] }`
- `Scheme`: The scheme of the URL ( e.g. `http` or `https`)
- `URL`: The full URL of the request, e.g `/vendpoint/anything?user_id=123\u0026confirm=true`

</br>

{{< note success >}}
**Note**

Each query and form parameter within the request is stored as an array field in the `Params` field of the request object.

Repeated parameter assignments are appended to the corresponding array. For example, a request against `/vendpoint/anything?user_id[]=123&user_id[]=234` would result in a Javascript request object similar to that shown below:

```javascript
const httpRequest = {
  Headers: {
    "Accept": ["*/*"],
    "User-Agent": ["curl/8.1.2"]
  },
  Body: "",
  URL: "/vendpoint/anything?user_id[]=123\u0026user_id[]=234",
  Params: {
    "user_id[]": ["123", "234"]
  },
  Scheme: "http"
};
```
{{< /note >}}

### The `session` object

Tyk uses an internal [session object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}) to handle the quota, rate limits, access allowances and auth data of a specific key. JS middleware can be granted access to the session object but there is also the option to disable it as deserialising it into the JSVM is computationally expensive and can add latency. Other than the `meta_data` field, the session object itself cannot be directly edited as it is crucial to the correct functioning of Tyk.

#### Limitations

- Custom JS plugins at the [pre-]({{< ref "plugins/plugin-types/request-plugins" >}}) stage do not have access to the session object (as it has not been created yet)
- When scripting for Virtual Endpoints, the `session` data will only be available to the JS function if enabled in the middleware configuration.

#### Sharing data between middleware using the `session` object

For different middleware to be able to transfer data between each other, the session object makes available a `meta_data` key/value field that is written back to the session store (and can be retrieved by the middleware down the line) - this data is permanent, and can also be retrieved by the REST API from outside of Tyk using the `/tyk/keys/` method.

{{< note success >}}
**Note**

A new JSVM instance is created for *each* API that is managed. Consequently, inter-API communication is not possible via shared methods, since they have different bounds. However, it *is* possible using the session object if a key is shared across APIs.
{{< /note >}}

### The `config` object

The third Tyk data object that is made available to the script running in the JSVM contains data from the API Definition. This is read-only and cannot be modified by the JS function. The structure of this object is:

- `APIID`: the unique identifier for the API
- `OrgID`: the organization identifier
- `config_data`: custom attributes defined in the API description

#### Adding custom attributes to the API Definition

When working with Tyk OAS APIs, you can add custom attributes in the `data` object in the `x-tyk-api-gateway.middleware.global.pluginConfig` section of the API definition, for example:

```json {linenos=true, linenostart=1}
{
  "x-tyk-api-gateway": {  
    "middleware": {
      "global": {
        "pluginConfig": {
          "data": {
            "enabled": true,
            "value": {
              "foo": "bar"
            }
          }
        }
      }
    }
  }
}
```

When working with Tyk Classic APIs, you simply add the attributes in the `config_data` object in the root of the API definition:

```json {linenos=true, linenostart=1}
{
  "config_data": {
    "foo": "bar"
  }
}
```

### Underscore.js Library

In addition to our Tyk JavaScript API functions, you also have access to all the functions from the [underscore](http://underscorejs.org) library.

Underscore.js is a JavaScript library that provides a lot of useful functional programming helpers without extending any built-in objects. Underscore provides over 100 functions that support your favorite functional helpers:

- map
- filter
- invoke

There are also more specialized goodies, including:

- function binding
- JavaScript templating
- creating quick indexes
- deep equality testing

## Example

In this basic example, we show the creation and initialisation of a middleware object. Note how the three Tyk data objects (`request`, `session`, `config`) are made available to the function and the two objects that are returned from the function (in case the external objects need to be updated).

```js {linenos=true, linenostart=1}
/* --- sampleMiddleware.js --- */

// Create new middleware object
var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise the object with your functionality by passing a closure that accepts
// two objects into the NewProcessRequest() function:
sampleMiddleware.NewProcessRequest(function(request, session, config) {
    log("This middleware does nothing, but will print this to your terminal.")

    // You MUST return both the request and session metadata
    return sampleMiddleware.ReturnData(request, session.meta_data);
});
```
