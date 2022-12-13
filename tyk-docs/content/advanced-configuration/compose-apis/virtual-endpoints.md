---
date: 2017-03-23T18:08:16Z
title: Virtual Endpoints
menu:
  main:
    parent: "Compose APIs"
weight: 1 
aliases:
  - /compose-apis/virtual-endpoints/
---

Virtual endpoints are unique to Tyk. With a virtual endpoint, you can plug short JavaScript functions at the end of a Tyk route and have them run when the endpoint is called. Virtual endpoints are not available in Tyk Cloud Classic.

{{< note success >}}
**Note**  

Virtual endpoints and the JSVM middleware share the same API. See [JavaScript API]({{ ref "plugins/supported-languages/javascript-middleware/javascript-api" >}}) for more details.
{{< /note >}}

A sample use case for this might be aggregate functions that bring together related data from multiple services in your stack into a single object.

Alternatively, you could produce a dynamic response object that transforms or computes data in some way from upstream services.

{{< note success >}}
**Note**  

The JavaScript engine in which these methods run in is a traditional ECMAScript 5 compatible environment and does not offer the more expressive power of something like Node.js. These methods are meant to provide a functional interpreter before complex interactions with your underlying service that cannot be handled by one of the other middleware components.
{{< /note >}}

As with Javascript Middleware you will need to enable the JSVM. You do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

#### Virtual Endpoint Functions

To create one of these methods, create a file and place it in a subdirectory of the Tyk configuration environment (ideally under the `middleware` folder in your Tyk installation). Here is a sample method:

```javascript
function myVirtualHandler (request, session, config) {
  log("Virtual Test running")
  
  log("Request Body: " + request.Body)
  log("Session: " + session)
  log("Config: " + config)
  log("param-1: " + request.Params["param1"]) // case matters
  log("auth Header: " + request.Headers["Authorization"]) // case matters
  
  var responseObject = {
    Body: "THIS IS A  VIRTUAL RESPONSE",
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



### Adding Virtual Endpoints to your API Definition

Virtual endpoints follow the same layout and setup as other elements in the `extended_path` section of the API definition:

```{.json}
...
virtual: [
  {
    response_function_name: "myVirtualHandler",
    function_source_type: "file",
    function_source_uri: "middleware/testVirtual.js",
    path: "call-serverless",
    method: "GET",
    use_session: true
  }
]
```

The parameters are as follows:

*   `response_function_name`: This is the function to run when this virtual endpoint is requested. The function name must match exactly (including casing) the function name in your virtual middleware. We need to know this as it will be the entry point into your code, this will be called first. Make sure it is unique, all plugins run in the same VM, so if there are naming collisions you may end up with unpredictable behaviour.
*   `function_source_type`: This can be `file` or `blob` If set to `file`, then Tyk will pre-load the JS from disk, if set to blob, then Tyk will base64-decode a string from the `function_source_uri` section.
*   `function_source_uri`: This will be the relative path to the source of the functionality (e.g. `myfile.js`), or a blob of base64-encoded data that represents the same information. Blob mode is mainly used by the dashboard to make code injection easier on multiple node deployments.
*   `path`: This is the relative URI path to which the virtual middleware will respond. For example, `http://{YOUR-DOMAIN}/call-serverless`.
*   `method`: This is the HTTP verb (`GET`, `POST` etc.) to which this virtual middleware will respond.
*   `use_session`: If true then the key session data will be provided to the function as the `session` variable. See the plugins documentation for more detail about this object.

### Passing Custom Attributes to Middleware

You can use the `config_data` special field in your API definition to pass custom attributes to middleware via a virtual endpoint.

#### Adding `config_data` to an API Definition

Add the following to the root of your API definition:

```{.json}
"config_data": {
  "string": "string",
  "map": {
    " key": 3
  },
  "num": 4
}
```

#### Example use of `config_data`

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
## Custom Virtual Endpoints Table

We have put together a [GitHub repo with a table of custom virtual endpoints](https://github.com/TykTechnologies/custom-plugins#virtual-endpoints) that you can experiment with. If you would like to submit one that you have developed, feel free to open an issue in the repo.