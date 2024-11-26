---
title: Writing Custom Go Plugins
date: 2024-03-04
description: "Features available when writing custom Go plugins"
tags: ["custom plugin", "golang", "go plugin", "middleware"]
---

Tyk's custom Go plugin middleware is very powerful as it provides you with access to different data types and functionality as explained in this section.

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk and uses the native Golang plugins API (see [go pkg/plugin docs](https://golang.org/pkg/plugin) for more details).

Custom Go plugins can access various data objects relating to the API request:

- [session]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#accessing-the-session-object" >}}): the key session object provided by the client when making the API request
- [API definition]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#accessing-the-api-definition" >}}): the Tyk OAS or Tyk Classic API definition for the requested API

Custom Go plugins can also [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) and stop further processing of the API request such that it is not sent to the upstream service.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "plugins/plugin-hub">}}).
To see an example of a Go plugin, please visit our [Go plugin examples]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples" >}}) page.

## Accessing the internal state of a custom plugin

A Golang plugin can be treated as a normal Golang package but:

- the package name is always `"main"` and this package cannot be imported
- this package loads at run-time by Tyk and loads after all other Golang packages
- this package has to have an empty `func main() {}`.

A Go plugin can have a declared `func init()` and it gets called only once (when Tyk loads this plugin for the first time for an API).

It is possible to create structures or open connections to 3d party services/storage and then share them within every call and export the function in your Golang plugin.

For example, here is an example of a Tyk Golang plugin with a simple hit counter:

```go  {linenos=true, linenostart=1}
package main

import (
  "encoding/json"
  "net/http"
  "sync"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/log"
  "github.com/TykTechnologies/tyk/user"
)

var logger = log.Get()

// plugin exported functionality
func MyProcessRequest(rw http.ResponseWriter, r *http.Request) {
  endPoint := r.Method + " " + r.URL.Path
  logger.Info("Custom middleware, new hit:", endPoint)

  hitCounter := recordHit(endPoint)
  logger.Debug("New hit counter value:", hitCounter)

  if hitCounter > 100 {
    logger.Warning("Hit counter to high")
  }

  reply := myReply{
    Session:    ctx.GetSession(r),
    Endpoint:   endPoint,
    HitCounter: hitCounter,
  }

  jsonData, err := json.Marshal(reply)
  if err != nil {
    logger.Error(err.Error())
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

// called once plugin is loaded, this is where we put all initialisation work for plugin
// i.e. setting exported functions, setting up connection pool to storage and etc.
func init() {
  hitCounter = make(map[string]uint64)
}

// plugin internal state and implementation
var (
  hitCounter   map[string]uint64
  hitCounterMu sync.Mutex
)

func recordHit(endpoint string) uint64 {
  hitCounterMu.Lock()
  defer hitCounterMu.Unlock()
  hitCounter[endpoint]++
  return hitCounter[endpoint]
}

type myReply struct {
  Session    *user.SessionState `json:"session"`
  Endpoint   string             `json:"endpoint"`
  HitCounter uint64             `json:"hit_counter"`
}

func main() {}
```

Here we see how the internal state of the Golang plugin is used by the exported function `MyProcessRequest` (the one we set in the API spec in the `"custom_middleware"` section). The map `hitCounter` is used to send internal state and count hits to different endpoints. Then our exported Golang plugin function sends an HTTP reply with endpoint hit statistics.

## Accessing the API definition

When Tyk passes a request to your plugin, the API definition is made available as part of the request context.

{{< note success >}}
**Note**  

The API definition is accessed differently for Tyk OAS APIs and Tyk Classic APIs, as indicated in the following sections. If you use the wrong call for your API type, it will return `nil`.
{{< /note >}}

### Working with Tyk OAS APIs

The API definition can be accessed as follows:

```go
package main

import (
  "fmt"
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
)

func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  oas := ctx.GetOASDefinition(r)
  fmt.Println("OAS doc title is", oas.Info.Title)
}

func main() {}
```

The invocation of `ctx.GetOASDefinition(r)` returns an `OAS` object containing the Tyk OAS API definition.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/apidef/oas/oas.go#L28).

### Working with Tyk Classic APIs

The API definition can be accessed as follows:

```go
package main

import (
  "fmt"
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
)

func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  apidef := ctx.GetDefinition(r)
  fmt.Println("API name is", apidef.Name)
}

func main() {}
```

The invocation of `ctx.GetDefinition(r)` returns an APIDefinition object containing the Tyk Classic API Definition.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L583).

## Accessing the session object

When Tyk passes a request to your plugin, the key session object is made available as part of the request context. This can be accessed as follows:

```go
package main
import (
  "fmt"
  "net/http"
  "github.com/TykTechnologies/tyk/ctx"
)
func main() {}
func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  session := ctx.GetSession(r)
  fmt.Println("Developer ID:", session.MetaData["tyk_developer_id"]
  fmt.Println("Developer Email:", session.MetaData["tyk_developer_email"]
}
```

The invocation of `ctx.GetSession(r)` returns an SessionState object.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/user/session.go#L106).

Here is an [example](https://github.com/TykTechnologies/custom-plugin-examples/blob/master/plugins/go-auth-multiple_hook_example/main.go#L135) custom Go plugin that makes use of the session object.

## Terminating the request

You can terminate the request within your custom Go plugin and provide an HTTP response to the originating client, such that the plugin behaves similarly to a [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}).

- the HTTP request processing is stopped and other middleware in the chain won't be used
- the HTTP request round-trip to the upstream target won't happen
- analytics records will still be created and sent to the analytics processing flow

This [example]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples#using-a-custom-go-plugin-as-a-virtual-endpoint" >}}) demonstrates a custom Go plugin configured as a virtual endpoint.

## Logging from a custom plugin

Your plugin can write log entries to Tyk's logging system.

To do so you just need to import the package `"github.com/TykTechnologies/tyk/log"` and use the exported public method `Get()`:

```go  {linenos=true, linenostart=1}
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/log"
)

var logger = log.Get()

// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
  logger.Info("Processing HTTP request in Golang plugin!!")
  r.Header.Add("Foo", "Bar")
}

func main() {}
```

### Monitoring instrumentation for custom plugins

All custom middleware implemented as Golang plugins support Tyk's current built in instrumentation.

The format for an event name with metadata is: `"GoPluginMiddleware:" + Path + ":" + SymbolName`,  e.g., for our example, the event name will be:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader"
```

The format for a metric with execution time (in nanoseconds) will have the same format but with the `.exec_time` suffix:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader.exec_time"
```

## Creating a custom response plugin

As explained [here]({{< ref "plugins/plugin-types/response-plugins" >}}), you can register a custom Go plugin to be triggered in the response middleware chain. You must configure the `driver` field to `goplugin` in the API definition when registering the plugin.

### Response plugin method signature

To write a response plugin in Go you need it to have a method signature as in the example below i.e. `func(http.ResponseWriter, *http.Response, *http.Request)`.
You can then access and modify any part of the request or response. User session and API definition data can be accessed as with other Go plugin hook types.

```go
package main

import (
  "bytes"
  "encoding/json"
  "io/ioutil"
  "net/http"

)

// MyPluginResponse intercepts response from upstream
func MyPluginResponse(rw http.ResponseWriter, res *http.Response, req *http.Request) {
        // add a header to our response object
  res.Header.Add("X-Response-Added", "resp-added")

        // overwrite our response body
  var buf bytes.Buffer
  buf.Write([]byte(`{"message":"Hi! I'm a response plugin"}`))
  res.Body = ioutil.NopCloser(&buf)

}

func main() {}
```
