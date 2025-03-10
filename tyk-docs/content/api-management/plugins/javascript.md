---
title: "Javascript Plugins"
date: 2025-01-10
tags: []
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: []
aliases:
  - /plugins/supported-languages/javascript-middleware
  - /plugins/supported-languages/javascript-middleware/middleware-scripting-guide
  - /plugins/supported-languages/javascript-middleware/javascript-api
  - /plugins/supported-languages/javascript-middleware/install-middleware/tyk-pro
  - /plugins/supported-languages/javascript-middleware/install-middleware/tyk-hybrid
  - /plugins/supported-languages/javascript-middleware/install-middleware/tyk-ce
  - /plugins/supported-languages/javascript-middleware/waf-js-plugin
  - /customise-tyk/plugins/javascript-middleware/
  - /customise-tyk/plugins/javascript-middleware/middleware-execution-order/
  - /plugins/javascript-middleware
  - /plugins/supported-languages/javascript-middleware/
  - /plugins/supported-languages/javascript-middleware/
  - /plugins/supported-languages/javascript-middleware/install-middleware/install-middleware
  - /plugins/javascript-middleware/install-middleware
  - /tyk-api-gateway-v1-9/javascript-plugins/middleware-scripting/
  - /plugins/javascript-middleware/middleware-scripting-guide
  - /customise-tyk/plugins/javascript-middleware/javascript-api/
  - /plugins/javascript-middleware/javascript-api
  - /plugins/javascript-middleware/install-middleware/tyk-pro
  - /plugins/javascript-middleware/install-middleware/tyk-hybrid
  - /plugins/javascript-middleware/install-middleware/tyk-ce
---

## Introduction

There are three middleware components that can be scripted with Tyk:

1. **Custom JavaScript plugins**: These execute either *pre* or *post* validation. A *pre* middleware component will execute before any session validation or token validation has taken place, while a *post* middleware component will execute after the request has been passed through all checks and is ready to be proxied upstream.

2. **Dynamic event handlers**: These components fire on certain API events (see the event handlers section), these are fired Async and do not have a cooldown timer. These are documented [here]({{< ref "api-management/gateway-events#set-up-a-webhook-event-handler-in-the-tyk-oas-api-definition" >}}).

3. **Virtual endpoints**: These are powerful programmable middleware invoked towards the end of the request processing chain. Unlike the custom JavaScript plugins, the virtual endpoint terminates the request. These are documented [here]({{< ref "api-management/traffic-transformation#virtual-endpoints-overview" >}}).

The JavaScript (JS) [scripting guide]({{< ref "api-management/plugins/javascript#using-javascript-with-tyk" >}}) provides details of how to access dynamic data (such as the key session object) from your JS functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

### Declared plugin functions

JavaScript functions are available globally in the same namespace. So, if you include two or more JSVM plugins that call the same function, the last declared plugin implementation of the function will be returned.

### Enabling the JavaScript Virtual Machine (JSVM)

The JavaScript Virtual Machine (JSVM) provided in the Gateway is a traditional ECMAScript5 compatible environment.

Before you can use JavaScript customization in any component you will need to enable the JSVM.

You do this by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}).

### Installing JavaScript middleware

Installing middleware is different for different Tyk deployments, for example, in Tyk OSS it is possible to directly specify a path to a file in the API Definition, while in Tyk Self-Managed, we recommend using a directory-based loader.

We've provided the following guides:

- [Tyk OSS]({{< ref "api-management/plugins/javascript#installing-middleware-on-tyk-oss" >}})
- [Tyk Self-Managed]({{< ref "api-management/plugins/javascript#installing-middleware-on-tyk-self-managed" >}})
- [Tyk Hybrid]({{< ref "api-management/plugins/javascript#installing-middleware-on-tyk-hybrid" >}})

{{< note success >}}
**Note**

Tyk Cloud Classic does not support custom middleware.
{{< /note >}}
## Using JavaScript with Tyk

Tyk's JavaScript Virtual Machine (JSVM) provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself. This can be accessed from [multiple locations]({{< ref "api-management/plugins/javascript#" >}}) in the API processing chain and allows significant customization and optimization of your request handling.

In this guide we will cover the features and resources available to you when creating custom functions, highlighting where there are limitations for the different middleware stages.

### Scripting basics

Here we cover various facets that you need to be aware of when creating custom functions for Tyk.

#### Accessing external and dynamic data

JS functions can be given access to external data objects relating to the API request. These allow for the modification of both the request itself and the session:

- `request`: an [object]({{< ref "api-management/plugins/javascript#the-request-object" >}}) describing the API request that invoked the middleware
- `session`: the key session [object]({{< ref "api-management/plugins/javascript#the-session-object" >}}) provided by the client when making the API request
- `config`: an [object]({{< ref "api-management/plugins/javascript#the-config-object" >}}) containing fields from the API definition

{{< note success >}}
**Note**

There are other ways of accessing and editing a session object using the [Tyk JavaScript API functions]({{< ref "api-management/plugins/javascript#working-with-the-key-session-object" >}}).
{{< /note >}}

#### Creating a middleware component

Tyk injects a `TykJS` namespace into the JSVM, which can be used to initialise a new middleware component. The JS for each middleware component should be in its own `*.js` file.

You create a middleware object by calling the `TykJS.TykMiddleware.NewMiddleware({})` constructor with an empty object and then initialising it with your function using the `NewProcessRequest()` closure syntax. This is where you expose the [external data objects]({{< ref "api-management/plugins/javascript#accessing-external-and-dynamic-data" >}}) to your custom function.

{{< note success >}}
**Note**

- For Custom JS plugins and Dynamic Event Handlers, the source code filename must match the function name
- Virtual Endpoints do not have this limitation
{{< /note >}}

#### Returning from the middleware

When returning from the middleware, you provide specific return data depending upon the type of middleware.

##### Returning from Custom JS plugin

A custom JS plugin can modify fields in the API request and the session metadata, however this is not performed directly within the JSVM so the required updates must be passed out of the JSVM for Tyk to apply the changes. This is a requirement and omitting them can cause the middleware to fail.

The JS function must provide the `request` and `session.meta_data` objects in the `ReturnData` as follows:

```js
return sampleMiddleware.ReturnData(request, session.meta_data);
```

Custom JS plugins sit in the [middleware processing chain]({{< ref "api-management/traffic-transformation#request-middleware-chain" >}}) and pass the request onto the next middleware before it is proxied to the upstream. If required, however, a custom JS plugin can terminate the request and provide a custom response to the client if you configure the `ReturnOverrides` in the `request` object, as described [here]({{< ref "api-management/plugins/javascript#using-returnoverrides" >}}).

##### Returning from Virtual Endpoint

Unlike custom JS plugins, Virtual Endpoints always [terminate the request]({{< ref "api-management/traffic-transformation#working-14" >}}) so have a different method of returning from the JS function.

The function must return a `responseObject`. This is crucial as it determines the HTTP response that will be sent back to the client. The structure of this object is defined to ensure that the virtual endpoint can communicate the necessary response details back to the Tyk Gateway, which then forwards it to the client.

The `responseObject` has the following structure:

- `code`: an integer representing the HTTP status code of the response
- `headers`: an object containing key-value pairs representing the HTTP headers of the response
- `body`: a string that represents the body of the response which can be plain text, JSON, or XML, depending on what your API client expects to receive

You must provide the `responseObject` together with the `session.meta_data` as parameters in a call to `TykJsResponse` as follows:

```js
return TykJsResponse(responseObject, session.meta_data);
```

You can find some examples of how this works [here]({{< ref "api-management/traffic-transformation#examples" >}}).

### JavaScript resources

JavaScript (JS) functions have access to a [system API]({{< ref "api-management/plugins/javascript#javascript-api" >}}) and [library of functions]({{< ref "api-management/plugins/javascript#underscorejs-library" >}}). They can also be given access to certain Tyk data objects relating to the API request.

The system API provides access to resources outside of the JavaScript Virtual Machine sandbox, the ability to make outbound HTTP requests and access to the key management REST API functions.

#### The `request` object

The `request` object provides a set of arrays that describe the API request. These can be manipulated and, when changed, will affect the request as it passes through the middleware pipeline. For [virtual endpoints]({{< ref "api-management/traffic-transformation#virtual-endpoints-overview" >}}) the request object has a [different structure](#VirtualEndpoint-Request).

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


##### Using `ReturnOverrides`

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

##### The virtual endpoint `request` object {#VirtualEndpoint-Request}

For [virtual endpoint]({{< ref "api-management/traffic-transformation#virtual-endpoints-overview" >}}) functions the structure of a Javascript `request` object is:

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

#### The `session` object

Tyk uses an internal [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) to handle the quota, rate limits, access allowances and auth data of a specific key. JS middleware can be granted access to the session object but there is also the option to disable it as deserialising it into the JSVM is computationally expensive and can add latency. Other than the `meta_data` field, the session object itself cannot be directly edited as it is crucial to the correct functioning of Tyk.

##### Limitations

- Custom JS plugins at the [pre-]({{< ref "api-management/plugins/plugin-types#request-plugins" >}}) stage do not have access to the session object (as it has not been created yet)
- When scripting for Virtual Endpoints, the `session` data will only be available to the JS function if enabled in the middleware configuration.

##### Sharing data between middleware using the `session` object

For different middleware to be able to transfer data between each other, the session object makes available a `meta_data` key/value field that is written back to the session store (and can be retrieved by the middleware down the line) - this data is permanent, and can also be retrieved by the REST API from outside of Tyk using the `/tyk/keys/` method.

{{< note success >}}
**Note**

A new JSVM instance is created for *each* API that is managed. Consequently, inter-API communication is not possible via shared methods, since they have different bounds. However, it *is* possible using the session object if a key is shared across APIs.
{{< /note >}}

#### The `config` object

The third Tyk data object that is made available to the script running in the JSVM contains data from the API Definition. This is read-only and cannot be modified by the JS function. The structure of this object is:

- `APIID`: the unique identifier for the API
- `OrgID`: the organization identifier
- `config_data`: custom attributes defined in the API description

##### Adding custom attributes to the API Definition

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

#### Underscore.js Library

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

### Example

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

## JavaScript API

This system API provides access to resources outside of the JavaScript Virtual Machine sandbox, the ability to make outbound HTTP requests and access to the key management REST API functions.

Embedded JavaScript interpreters offer the bare bones of a scripting language, but not necessarily the functions that you would expect, especially with JavaScript, where objects such as `XMLHttpRequest()` are a given. However, those interfaces are actually provided by the browser / DOM that the script engine are executing in. In a similar vein, we have included a series of functions to the JSVM for convenience and give the interpreter more capability.

This list is regularly revised and any new suggestions should be made in our [Github issue tracker](https://github.com/TykTechnologies/tyk/issues).

Below is the list of functions currently provided by Tyk.

- `log(string)`: Calling `log("this message")` will cause Tyk to log the string to Tyk's default logger output in the form `JSVM Log: this message` as an INFO statement. This function is especially useful for debugging your scripts. It is recommended to put a `log()` call at the end of your middleware and event handler module definitions to indicate on load that they have been loaded successfully - see the [example scripts](https://github.com/TykTechnologies/tyk/tree/master/middleware) in your Tyk installation `middleware` directory for more details.
- `rawlog(string)`: Calling `rawlog("this message")` will cause Tyk to log the string to Tyk's default logger output without any additional formatting, like adding prefix or date. This function can be used if you want to have own log format, and parse it later with custom tooling.
- `b64enc` - Encode string to base64
- `b64dec` - Decode base64 string
- `TykBatchRequest` this function is similar to `TykMakeHttpRequest` but makes use of the Tyk Batch API. See the Batch Requests section of the [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) for more details.
- `TykMakeHttpRequest(JSON.stringify(requestObject))`: This method is used to make an HTTP request, requests are encoded as JSON for deserialisation in the min binary and translation to a system HTTP call. The request object has the following structure:

```js
newRequest = {
  "Method": "POST",
  "Body": JSON.stringify(event),
  "Headers": {},
  "Domain": "http://foo.com",
  "Resource": "/event/quotas",
  "FormData": {"field": "value"}
};
```

{{< note success >}}
**Note**

If you want to include querystring values, add them as part of the `Domain` property.
{{< /note >}}

Tyk passes a simplified response back which looks like this:

```go
type TykJSHttpResponse struct {
	Code    int
	Body    string
	Headers map[string][]string
}
```

The response is JSON string encoded, and so will need to be decoded again before it is usable:

```js
usableResponse = JSON.parse(response);
log("Response code: " + usableResponse.Code);
log("Response body: " + usableResponse.Body);
```

This method does not execute asynchronously, so execution will block until a response is received.

### Working with the key session object

To work with the key session object, two functions are provided: `TykGetKeyData` and `TykSetKeyData`:

- `TykGetKeyData(api_key, api_id)`: Use this method to retrieve a [session object]({{< ref "api-management/policies#what-is-a-session-object" >}}) for the key and the API provided:

  ```js
  // In an event handler, we can get the key idea from the event, and the API ID from the context variable.
  var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
  log("Expires: " + thisSession.expires)
  ```

- `TykSetKeyData(api_key, api_id)`: Use this method to write data back into the Tyk session store:

  ```js
  // You can modify the object just like with the REST API
  thisSession.expires = thisSession.expires + 1000;

  // Use TykSetKeyData to set the key data back in the session store
  TykSetKeyData(event.EventMetaData.Key, JSON.stringify(thisSession));
  ```

All of these methods are described in functional examples in the Tyk `middleware/` and `event_handlers/` folders.

## Installing Middleware on Tyk Self-Managed

In some cases middleware references can't be directly embedded in API Definitions (for example, when using the Tyk Dashboard in an Self-Managed installation). However, there is an easy way to distribute and enable custom middleware for an API in a Tyk node by adding them as a directory structure.

Tyk will load the middleware plugins dynamically on host-reload without needing a direct reference to them in the API Definition.

The directory structure should look like this:

```text
middleware
  / {API Id}
    / pre
    / {middlewareObject1Name}.js
    /  {middlewareObject2Name}.js
    / post
      / {middlewareObject1Name}_with_session.js
      / {middlewareObject2Name}.js
```

Tyk will check for a folder that matches the `API Id` being loaded, and then load the `pre` and `post` middleware from the respective directories.

{{< note success >}}
**Note**

The filename MUST match the object to be loaded exactly.
{{< /note >}}

If your middleware requires session injection, then append `_with_session` to the filename.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM.

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

## Installing Middleware on Tyk Hybrid

In some cases middleware references can't be directly embedded in API Definitions (for example, when using the dashboard in a Hybrid install). However, there is an easy way to distribute and enable custom middleware for an API on a Tyk node.

A second method of loading API Definitions in Tyk nodes is to add them as a directory structure in the Tyk node. Tyk will load the middleware plugins dynamically on host-reload without needing a direct reference to them in the API Definition.

The directory structure looks as follows:

```text
middleware
  / {API Id}
    / pre
    / {middlewareObject1Name}.js
    /  {middlewareObject2Name}.js
    / post
      / {middlewareObject1Name}_with_session.js
      / {middlewareObject2Name}.js
```

Tyk will check for a folder that matches the `{API Id}` being loaded, and then load the `pre` and `post` middleware from the respective folders.

{{< note success >}}
**Note**

The filename MUST match the object to be loaded exactly.
{{< /note >}}

If your middleware requires session injection, then append `_with_session` to the filename.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

## Installing Middleware on Tyk OSS

In order to activate middleware when using Tyk OSS or when using a file-based setup, the middleware needs to be registered as part of your API Definition. Registration of middleware components is relatively simple.

{{< note success >}}
**Note**

It is important that your object names are unique.
{{< /note >}}

{{< note success >}}
**Note**

This functionality may change in subsequent releases.
{{< /note >}}

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

Adding the middleware plugin is as simple as adding it to your definition file in the middleware sections:

```json
...
"event_handlers": {},
"custom_middleware": {
  "pre": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ],
  "post": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ]
},
"enable_batch_request_support": false,
...
```

As you can see, the parameters are all dynamic, so you will need to ensure that the path to your middleware is correct. The configuration sections are as follows:

- `pre`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *before* any authentication information is extracted from the header or parameter list of the request. Use middleware in this section to pre-process a request before feeding it through the Tyk middleware.

- `pre[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:

  `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

- `pre[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

- `pre[].require_session`: Irrelevant for pre-processor middleware, since no auth data has been extracted by the authentication middleware, it cannot be made available to the middleware.

- `post`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *after* the authentication, validation, throttling, and quota-limiting middleware has been executed, just before the request is proxied upstream. Use middleware in this section to post-process a request before sending it to your upstream API.

- `post[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:

  `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

- `post[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

- `post[].require_session`: Defaults to `false`, if you require access to the session object, it will be supplied as a `session` variable to your middleware processor function.

## WAF (OSS) ModSecurity Plugin example

Traditionally, a Web Application Firewall (WAF) would be the first layer requests would hit, before reaching the API  gateway.  This is not possible if the Gateway has to terminate SSL, for things such as mTLS.

So what do you do if you still want to run your requests through a WAF to automatically scan for malicious action?  We incorporate a WAF as part of the request lifecycle by using Tyk's plugin architecture.

### Prerequisites

* Already running Tyk -  Community Edition or Pro
* Docker, to run the WAF

### Disclaimer

This is NOT a production ready plugin because 

* The JavaScript plugin creates a new connection with the WAF for every request
* The request is not sent over SSL
* The WAF is only sent the query params for inspection.

For higher performance, the plugin could be written in Golang, and a connection pool would be opened and maintained over SSL

### Steps for Configuration

1. **Turn JSVM on your `tyk.conf` at the root level:**

    Turn on JSVM interpreter to allow Tyk to run JavaScript plugins.

    ```
    "enable_jsvm": true
    ```

2. **Place the JavaScript plugin on Tyk file system**

    Copy the JS Plugin as a local .js file to the Gateway's file system.  

    From the Gateway root, this will download the plugin called `waf.js` into the `middleware` directory:
    ```
    curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js
    ```

    (Instructions)
    If you are running Tyk in Docker, you can get into Tyk Gateway with `docker exec`
    ```
    $ docker ps | grep gateway
    670039a3e0b8        tykio/tyk-gateway:latest           "./entrypoint.sh"        14 minutes ago      Up 14 minutes       0.0.0.0:8080->8080/tcp             tyk-demo_tyk-gateway_1

    ## copy container name or ID 
    $ docker exec -it 670039a3e0b8 bash

    ## Now SSH'd into Tyk Gateway container and can perform curl
    root@670039a3e0b8:/opt/tyk-gateway# ls

    apps	   entrypoint.sh   install  middleware	templates  tyk-gateway.pid  tyk.conf.example
    coprocess  event_handlers  js	    policies	tyk	   tyk.conf	    utils

    ## Download the plugin
    root@670039a3e0b8:/opt/tyk-gateway# curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js

    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
    100  1125  100  1125    0     0   3906      0 --:--:-- --:--:-- --:--:--  3975

    ```

    [waf.js source](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js)

3. **Import API definition into Tyk**

    Copy the following Tyk API definition and import it into your environment.

    [API Definition JSON](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/apidef.json)

    Here's the important section which adds the plugin to the request lifecycle for this API:
    ```{.json}
    "custom_middleware": {
        "pre": [
            {
            "name": "Waf",
            "path": "./middleware/waf.js"
            }
        ],
    ```

    ##### How to Import?
    [Tyk Pro](https://tyk.io/docs/tyk-configuration-reference/import-apis/#import-apis-via-the-dashboard)

    [Tyk CE](https://tyk.io/docs/try-out-tyk/tutorials/create-api/)

4. **Run WAF ModSecurity Using Docker**

    First run ModSecurity with the popular [Core RuleSet](https://coreruleset.org/) in Docker
    ```
    $ docker run -ti -p 80:80 -e PARANOIA=1 --rm owasp/modsecurity-crs:v3.0
    ```

    Open a second terminal and curl it
    ```
    $ curl localhost

    hello world
    ```

    We should see the request show in the WAF server:

    ```
    172.17.0.1 - - [30/Jun/2020:00:56:42 +0000] "GET / HTTP/1.1" 200 12
    ```

    Now try a dirty payload:
    ```
    $ curl 'localhost/?param="><script>alert(1);</script>'

    <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <html><head>
    <title>403 Forbidden</title>
    </head><body>
    <h1>Forbidden</h1>
    <p>You don't have permission to access /
    on this server.<br />
    </p>
    </body></html>
    ```

    Our WAF catches the response and returns a `403`.


    Now we try through Tyk.

    ```
    ## Clean requests, should get response from upstream's IP endpoint
    $ curl localhost:8080/waf/ip

    {
    "origin": "172.30.0.1, 147.253.129.30"
    }

    ## WAF will detect malicious payload and instruct Tyk to deny
    $ curl 'localhost:8080/waf/ip?param="><script>alert(1);</script>
    {
        "error": "Bad request!"
    }
    ```
