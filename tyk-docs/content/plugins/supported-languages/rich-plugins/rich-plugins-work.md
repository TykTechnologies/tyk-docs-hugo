---
date: 2017-03-24T13:04:21Z
title: How do rich plugins work ?
menu:
  main:
    parent: "Rich Plugins"
weight: 2
aliases:
  - /plugins/rich-plugins/rich-plugins-work
---

### ID Extractor & Auth Plugins

The ID Extractor is a caching mechanism that's used in combination with Tyk Plugins. It can be used specifically with plugins that implement custom authentication mechanisms. The ID Extractor works for all rich plugins: gRPC-based plugins, Python and Lua.

See [ID Extractor]({{< ref "plugins/auth-plugins/id-extractor" >}}) for more details.

### Interoperability

This feature implements an in-process message passing mechanism, based on [Protocol Buffers](https://developers.google.com/protocol-buffers/), any supported languages should provide a function to receive, unmarshal and process this kind of messages.

The main interoperability task is achieved by using [cgo](https://golang.org/cmd/cgo/) as a bridge between a supported language -like Python- and the Go codebase.

Your C bridge function must accept and return a `CoProcessMessage` data structure like the one described in [`api.h`](https://github.com/TykTechnologies/tyk/blob/master/coprocess/api.h), where `p_data` is a pointer to the serialised data and `length` indicates the length of it.

```{.copyWrapper}
struct CoProcessMessage {
  void* p_data;
  int length;
};
```

The unpacked data will hold the actual `CoProcessObject` data structure.

- `HookType` - the hook type (see below)
- `Request`  - the HTTP request
- `Session`  - the [Tyk session object]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}).
- `Metadata`  - the metadata from the session data above (key/value string map).
- `Spec`     - the API specification data. Currently organization ID, API ID and config_data.

```{.copyWrapper}
type CoProcessObject struct {
  HookType string
  Request  CoProcessMiniRequestObject
  Session  SessionState
  Metadata map[string]string
  Spec     map[string]string
}
```

### Coprocess Dispatcher

`Coprocess.Dispatcher` describes a very simple interface for implementing the dispatcher logic, the required methods are: `Dispatch`, `DispatchEvent` and `Reload`.

`Dispatch` accepts a pointer to a `struct CoProcessObject` (as described above) and must return an object of the same type. This method will be called for every configured hook on every request. Traditionally this method will perform a single function call on the target language side (like `Python_DispatchHook` in `coprocess_python`), and the corresponding logic will be handled from there (mostly because different languages have different ways of loading, referencing or calling middlewares).

`DispatchEvent` provides a way of dispatching Tyk events to a target language. This method doesn't return any variables but does receive a JSON-encoded object containing the event data. For extensibility purposes, this method doesn't use Protocol Buffers, the input is a `[]byte`, the target language will take this (as a `char`) and perform the JSON decoding operation.

`Reload` is called when triggering a hot reload, this method could be useful for reloading scripts or modules in the target language.

### Coprocess Dispatcher - Hooks

This component is in charge of dispatching your HTTP requests to the custom middlewares. The list, from top to bottom, shows the order of execution. The dispatcher follows the standard middleware chain logic and provides a simple mechanism for "hooking" your custom middleware behavior, the supported hooks are:

*   **Pre**: gets executed before the request is sent to your upstream target and before any authentication information is extracted from the header or parameter list of the request. When enabled, this applies to both keyless and protected APIs.
*   **AuthCheck**: gets executed as a custom authentication middleware, instead of the standard ones provided by Tyk. Use this to provide your own authentication mechanism.
*   **PostKeyAuth**: gets executed right after the authentication process.
*   **Post**: gets executed after the authentication, validation, throttling, and quota-limiting middleware has been executed, just before the request is proxied upstream. Use this to post-process a request before sending it to your upstream API. This is only called when using protected APIs. If you want to call a hook after the authentication but before the validation, throttling and other middleware, see **PostKeyAuth**.
*   **Response**: gets executed after the upstream API replies. The arguments passed to this hook include both the request and response data. Use this to modify the HTTP response before it's sent to the client. This hook also receives the request object, the session object, the metadata and API definition associated with the request.

{{< note success >}}
**Note**  

Response hooks are not available for native Go plugins. Python and gRPC plugins are supported. 
{{< /note >}}


### Coprocess Gateway API

[`coprocess_api.go`](https://github.com/TykTechnologies/tyk/tree/master/coprocess) provides a bridge between the Gateway API and C. Any function that needs to be exported should have the `export` keyword:

```{.copyWrapper}
//export TykTriggerEvent
func TykTriggerEvent( CEventName *C.char, CPayload *C.char ) {
  eventName := C.GoString(CEventName)
  payload := C.GoString(CPayload)

  FireSystemEvent(tykcommon.TykEvent(eventName), EventMetaDefault{
    Message: payload,
  })
}
```

You should also expect a header file declaration of this function in [`api.h`](https://github.com/TykTechnologies/tyk/blob/master/coprocess/api.h), like this:

```{.copyWrapper}
#ifndef TYK_COPROCESS_API
#define TYK_COPROCESS_API
extern void TykTriggerEvent(char* event_name, char* payload);
#endif
```

The language binding will include this header file (or declare the function inline) and perform the necessary steps to call it with the appropriate arguments (like an FFI mechanism could do). As a reference, this is how this could be achieved if you're building a [Cython](http://cython.org/) module:

```{.copyWrapper}
cdef extern:
  void TykTriggerEvent(char* event_name, char* payload);

def call():
  event_name = 'my event'.encode('utf-8')
  payload = 'my payload'.encode('utf-8')
  TykTriggerEvent( event_name, payload )
```

### Basic usage

The intended way of using a Coprocess middleware is to specify it as part of an API Definition:

```{.json}
"custom_middleware": {
  "pre": [
    {
      "name": "MyPreMiddleware",
      "require_session": false
    },
    {
      "name": "AnotherPreMiddleware",
      "require_session": false
    }
  ],
  "post": [
    {
      "name": "MyPostMiddleware",
      "require_session": false
    }
  ],
  "post_key_auth": [
    {
      "name": "MyPostKeyAuthMiddleware",
      "require_session": true
    }
  ],
  "auth_check": {
    "name": "MyAuthCheck"
  },
  "driver": "python"
}
```
{{< note success >}}
**Note**  

All hook types support chaining except the custom auth check (`auth_check`).
{{< /note >}}
