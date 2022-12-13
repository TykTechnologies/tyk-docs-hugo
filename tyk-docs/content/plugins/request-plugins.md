---
date: 2017-03-24T15:45:13Z
title: Request Plugins
menu:
  main:
    parent: "Custom Plugins"
weight: 10
---

There are 4 different phases in the [request lifecycle](/concepts/middleware-execution-order/) you can inject custom plugins, including [Authentication plugins](/plugins/auth-plugins/).  There are performance advantages to picking the correct phase, and of course that depends on your use case and what functionality you need.

### Hook Capabilities
| Functionality           |   Pre    |  Auth       | Post-Auth |    Post   |
|-------------------------|----------|-------------|-----------|-----------|
| Can modify the Header   | ✅       | ✅          | ✅       | ✅  
| Can modify the Body     | ✅       | ✅          | ✅       |✅
| Can modify Query Params | ✅       | ✅          | ✅       |✅
| Can view Session<sup>1</sup> Details (metadata, quota, context-vars, tags, etc)  |   ❌       | ✅          |✅          |✅
| Can modify Session<sup>1</sup> <sup>2</sup> |    ❌      | ✅          |    ❌      |❌
| Can Add More Than One<sup>3</sup> |    ✅      |        ❌   |✅          | ✅

[1] A [Session object](/getting-started/key-concepts/what-is-a-session-object/) contains allowances and identity information that is unique to each requestor

[2] You can modify the session by using your programming language's SDK for Redis. [Here's an example of doing that in Golang](https://github.com/TykTechnologies/custom-plugins/blob/master/plugins/go-auth-multiple_hook_example/main.go#L135).

[3] For select hook locations, you can add more than one plugin.  For example, in the same API request, you can have 3 Pre, 1 auth, 5 post-auth, and 2 post plugins.

### Return Overrides / ReturnOverrides  
You can have your plugin finish the request lifecycle and return a response with custom  payload & headers to the requestor.

[Read more here](/plugins/supported-languages/rich-plugins/rich-plugins-data-structures/#returnoverrides-coprocess_return_overridesproto)

##### Python Example

```{.copyWrapper}
from tyk.decorators import *

@Hook
def MyCustomMiddleware(request, session, spec):
    print("my_middleware: MyCustomMiddleware")
    request.object.return_overrides.headers['content-type'] = 'application/json'
    request.object.return_overrides.response_code = 200
    request.object.return_overrides.response_error = "{\"key\": \"value\"}\n"
    return request, session
```

##### JavaScript Example
```{.copyWrapper}
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
