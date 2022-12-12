---
date: 2017-03-24T14:51:42Z
title: Middleware Scripting Guide
menu:
  main:
    parent: "JavaScript Middleware"
weight: 3
aliases:
  - /docs/tyk-api-gateway-v1-9/javascript-plugins/middleware-scripting/
  - /plugins/javascript-middleware/middleware-scripting-guide
---

## Middleware Scripting

Middleware scripting is done in either a _pre_ or _post_ middleware chain context, dynamic middleware can be applied to both session-based APIs and Open (Keyless) APIs.

The difference between the middleware types are:

1.  **Pre**: These middleware instances do not have access to the session object (as it has not been created yet) and therefore cannot perform modification actions on them.

2.  **Post**: These middleware components have access to the session object (the user quota, allowances and auth data), but have the option to disable it, as deserialising it into the JSVM is computationally expensive and can add latency.

{{< note success >}}
**Note**  

A new JSVM instance is created for _each_ API that is managed, this means that inter-API communication is not possible via shared methods (they have different bounds), however it _is_ possible using the session object if a key is shared across APIs.
{{< /note >}}



### Declared Plugin Functions

Plugin functions are available globally in the same namespace. So, if you include two or more JSVM plugins that call the same function, the last declared plugin implementation of the function will be returned.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

#### Creating a middleware component

Tyk injects a `TykJS` namespace into the JSVM, this namespace can be used to initialise a new middleware component. Each middleware component should be in its own `*.js` file.

{{< note success >}}
**Note**  

The middleware variable name should match the name of the file it's in.
{{< /note >}}



Creating a middleware object is done my calling the `TykJS.TykMiddleware.NewMiddleware({})` constructor with an empty object and then initialising it with your function using the `NewProcessRequest()` closure syntax.

Here is an example implementation:

```{.copyWrapper}
/* --- sampleMiddleware.js --- */

// Create your middleware object
var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise it with your functionality by passing a closure that accepts two objects
// into the NewProcessRequest() function:
sampleMiddleware.NewProcessRequest(function(request, session, spec) {

  console.log("This middleware does nothing, but will print this to your terminal.")

  // You MUST return both the request and session metadata
  return sampleMiddleware.ReturnData(request, session.meta_data);
});
```

#### Middleware component variables

As well as the API functions that all JSVM components share, the middleware components have access to some data structures that are performant and allow for the modification of both the request itself and the session. These objects are exposed to the middleware in the form of the `request`, `session` and `spec` objects in the `NewProcessRequest(function(request, session) {};` call.

In the example above, we can see that we return 2 of these variables (`request` and `session` meta data) - this is a requirement, and omitting it can cause the middleware to fail, this line should be called at the end of each process:

```
return sampleMiddleware.ReturnData(request, session.meta_data);
```

This allows the middleware machinery to perform the necessary writes and changes to the two main context objects.

#### The `request` object

The `request` object provides a set of arrays that can be manipulated, that when changed, will affect the request as it passes through the middleware pipeline, the `request` object looks like this:

```{.copyWrapper}
{
  Headers       map[string][]string
  SetHeaders    map[string]string
  DeleteHeaders []string
  Body          string
  URL           string
  AddParams     map[string]string
  DeleteParams  []string
  ReturnOverrides {
    ResponseCode: int
    ResponseError: string
    ResponseBody: string
    ResponseHeaders []string
  }
  IgnoreBody    bool
  Method        string
  RequestURI    string
  Scheme        string
}
```
{{< note success >}}
**Note**  

From v2.9.3, `ResponseError` has been deprecated. You should use `ResponseBody` instead.
{{< /note >}}

- `Headers`: This is an object of string arrays, and represents the current state of the request header. This object cannot be modified directly, but can be used to read header data.
- `SetHeaders`: This is a key-value map that will be set in the header when the middleware returns the object, existing headers will be overwritten and new headers will be added.
- `DeleteHeaders`: Any header name that is in this list will be deleted from the outgoing request. `DeleteHeaders` happens before `SetHeaders`.
- `Body`: This represents the body of the request, if you modify this field it will overwrite the request.
- `URL`: This represents the path portion of the outbound URL, use this to redirect a URL to a different endpoint upstream.
- `AddParams`: You can add parameters to your request here, for example internal data headers that are only relevant to your network setup.
- `DeleteParams`: These parameters will be removed from the request as they pass through the middleware. `DeleteParams` happens before `AddParams`.
- `ReturnOverrides`: Values stored here are used to stop or halt middleware execution and return an error code if the middleware operation has failed. You can also set the `ResponseHeader` for the response.
- `IgnoreBody`: If this parameter is set to true, the original request body will be used. If set to false the `Body` field will be used, this is the default behavior.
- `Method`: Contains the HTTP method (`GET`, `POST`, etc.).
- `RequestURI`: Contains the request URI, including the query string, e.g. `/path?key=value`.
- `Scheme`: Contains the URL scheme, e.g. `http`, `https`.

#### JSVM Example

```
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});

testJSVMData.NewProcessRequest(function(request, session, config) {
	request.ReturnOverrides.ResponseError = "Foobarbaz"
  request.ReturnOverrides.ResponseBody = "Foobar"
	request.ReturnOverrides.ResponseCode = 200
	request.ReturnOverrides.ResponseHeaders = {
		"X-Foo": "Bar",
		"X-Baz": "Qux"
	}
	return testJSVMData.ReturnData(request, {});
});
```

{{< note success >}}
**Note**  

Fom v2.9.3 you should use `ResponseBody`. `ResponseError` has been deprecated.
{{< /note >}}


Using the methods outlined above, alongside the API functions that are made available to the VM, allows for a powerful set of tools for shaping and structuring inbound traffic to your API, as well as processing, validating or re-structuring the data as it is inbound.

#### The `session` object

Tyk uses an internal session representation to handle the quota, rate limits, and access allowances of a specific key. This data can be made available to POST-processing middleware for processing. the session object itself cannot be edited, as it is crucial to the correct functioning of Tyk.

In order for middleware to be able to transfer data between each other, the session object makes available a `meta_data` key/value field that is written back to the session store (and can be retrieved by the middleware down the line) - this data is permanent, and can also be retrieved by the REST API from outside of Tyk using the `/tyk/keys/` method.

The session object has the same representation as the one used by the API:

```{.copyWrapper}
{
  "allowance": 999,
  "rate": 1000,
  "per": 60,
  "expires": 0,
  "quota_max": -1,
  "quota_renews": 1406121006,
  "quota_remaining": 0,
  "quota_renewal_rate": 60,
  "access_rights": {
    "234a71b4c2274e5a57610fe48cdedf40": {
      "api_name": "Versioned API",
      "api_id": "234a71b4c2274e5a57610fe48cdedf40",
      "versions": [
        "v1"
      ]
    }
  },
  "org_id": "53ac07777cbb8c2d53000002",
  "meta_data": {
    "your-key": "your-value"
  }
}
```

There are other ways of accessing and editing a session object by using the Tyk JSVM API functions.

#### Passing Custom Attributes to Middleware

You can use the `config_data` special field in your API definition to pass custom attributes to middleware via the JSVM.

#### Adding `config_data` to an API Definition

Add the following to the root of your API definition:

```{.copyWrapper}
"config_data": {
  "foo": "bar"
},
```

#### Sample use of `config_data`

```
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});
testJSVMData.NewProcessRequest(function(request, session, spec) {
  request.SetHeaders["data-foo"] = spec.config_data.foo;
  return testJSVMData.ReturnData(request, {});
});
```
