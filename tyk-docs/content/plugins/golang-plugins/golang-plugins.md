---
date: 2019-07-06T12:16:10Z
title: Golang Plugins
menu:
  main:
    parent: "Plugins"
weight: 0 
---


## Quick start
This quick start guide will help you to understand the idea behind Golang plugins in less than 5-10 minutes.

We will look at:

* Some simple examples to see how to customise and extend Tyk with Golang plugins
* Look at some code to get some ideas as to where to go next
* Follow the process of how to build a Golang plugin and get it loaded by Tyk

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk. It is based on utilising the native Golang plugins API (see https://golang.org/pkg/plugin for more details).

Every HTTP request (to your API, protected and managed by Tyk) gets passed through a chain of built-in middleware inside Tyk. This middleware performs tasks like authentication, rate limiting, white or black listing and many others - it depends on the particular API specification. In other words the chain of middleware is specific to an API and gets created at API re-load time. Golang plugins allow developers to create custom middleware in Golang and then add them to the chain of middleware. So when Tyk performs an API re-load it also loads the custom middleware and "injects" them into a chain to be called at different stages of the HTTP request life cycle.

It's also possible to access the API definition data structure from within a plugin, this functionality is described in [Accessing API definition from a plugin](#accessing-api-definition-from-a-golang-plugin).

### Golang Plugin example

Let's create a plugin with very basic functionality:

* We will add a custom header `"Foo: Bar"` to a request. 
* This needs to happen right before the request is passed to an upstream target behind the Tyk API Gateway

The plugin code will look like this:
```{.copyWrapper}
package main

import (
  "net/http"
)

// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
  r.Header.Add("Foo", "Bar")
}

func main() {}
```
We see that the Golang plugin:

* Is a Golang project with a `main` package
* Has an empty `func main()`
* Has one exported `func AddFooBarHeader` which must have the same method signature as `type HandlerFunc func(ResponseWriter, *Request)` from the standard `"net/http"` Golang package

### Building a Golang plugin

A specific of Golang plugins is that they need to be built using exactly the same Tyk binary as the one to be installed. In order to make it work, we provide a special Docker image, which we internally use for building our official binaries too.

```{.copyWrapper}
docker run --rm -v `pwd`:/plugin-source tykio/tyk-plugin-compiler:v2.9.4.2 my-post-plugin.so
```
Explanation to the command above: 
1. Mount your plugin directory to the `/plugin-source` image location
2. Make sure to specify your Tyk version via a Docker tag. For example `v2.9.4.2` . 
3. The final argument is the plugin name. For the example `my-post-plugin.so`

#### For versions before v2.9.4.2
```{.copyWrapper}
docker run --rm -v `pwd`:/go/src/plugin-build tykio/tyk-plugin-compiler:v2.9.3 my-post-plugin.so
```
Explanation to the command above: 
1. Mount your plugin directory to the `/go/src/plugin-build` image location
2. Make sure to specify your Tyk version via a Docker tag. For example `v2.9.3` . 
3. The final argument is the plugin name. For the example `my-post-plugin.so`

### When Upgrading your Tyk Installation

We release a new version of the compiler for each Tyk version. After upgrading to a new version you will need to rebuild your plugin using the new Tyk version Docker tag of the compiler.

### Building from Source

If you are building a plugin for a Gateway version compiled from the source, you can use the following command:

```{.copyWrapper}
go build -buildmode=plugin -o my-post-plugin.so
```

As a result of this build command we get a shared library with the plugin implementation placed at `my-post-plugin.so`.

If your plugin depends on third party libraries, ensure to vendor them, before building. If you are using [Go modules](https://blog.golang.org/using-go-modules), it should be as simple as running `go mod vendor` command.

### Loading a Golang plugin

Now we need to instruct Tyk to load this shared library for an API so it will start processing traffic as part of the middleware chain. To do so we will need to edit our API spec using the raw JSON editor in the Tyk Dashboard or directly in the JSON file (in the case of the Community Edition). This change needs to be done for the `"custom_middleware"` field and it should look like this:

```{.json}
"custom_middleware": {
  "pre": [],
  "post_key_auth": [],
  "auth_check": {},
  "post": [
    {
      "name": "AddFooBarHeader",
      "path": "<path>/post.so"
    }
  ],
  "driver": "goplugin"
}
```

Here we have:

* The `"driver"` field has a new value of `goplugin` which says to Tyk that this custom middleware is a Golang native plugin.
* We use middleware with the type of `post` because we want this custom middleware to process the request right before it gets passed to the upstream target (we will look at other types later).
* In the `post` section - the field `mame` contains your function name from the plugin project.
* In the `post` section - the field `path` is the full or relative (to the Tyk binary) path to `.so` file with plugin implementation (make sure Tyk has read access to this file)

Also, let's set fields `"use_keyless": true` and `"target_url": "http://httpbin.org/"` - for testing purposes (we need to see what request arrives to our upstream target and `httpbin.org` is a perfect fit for that.

The API needs to be reloaded after that change (this happens automatically when you save the updated API in the Dashboard).

Now your API with its Golang plugin is ready to process traffic:

```{.copyWrapper}
curl http://localhost:8181/my_api_name/get   

{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Foo": "Bar", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
} 
```

We see that the upstream target has received the header `"Foo": "Bar"` which was added by our custom middleware implemented as a native Golang plugin in Tyk.

### Types of custom middleware supported by Tyk Golang plugins
All four types of custom middleware are supported by Tyk Golang plugins. They represent different request stages where Golang plugins can be added as part of the middleware chain. Let's recap the meaning of all four types:

* `"pre"` - contains array of middle-wares to be run before any others (i.e. before authentication).
* `"auth_check"` - contains only one middleware info, his middleware performs custom authentication and adds API key session info into request context.
* `"post_auth_check"` - contains array of middle-wares to be run after authentication, at this point we have authenticated session API key for the given key (in request context) so we can perform any extra checks.
* `"post"` - contains array of middle-wares to be run at the very end of middle-ware chain, at this point Tyk is about to request a round-trip to the upstream target.

The Golang plugin custom middleware `"auth_check"` can be used only if:

* The API is protected, with the API spec has the `"use_keyless"` field set to `false`
* The API spec has the `"use_go_plugin_auth"` field set to `true`.

Then `"post_auth_check"` can be used when:

* When the API is protected, the API spec has field set as `"use_keyless": false`
* With any auth method specified in API spec

> **NOTE**: These fields are populated automatically with the correct values when you change the authentication method for the API in the Tyk Dashboard

### Sending HTTP-response from Tyk Golang plugin

It is possible to send a response from the Golang plugin custom middleware. So in the case that the HTTP response was sent:

* The HTTP request processing is stopped and other middleware in the chain won't be used.
* The HTTP request round-trip to the upstream target won't happen
* Analytics records will still be created and sent to the analytics processing flow.

Let's look at an example of how to send a HTTP response from the Tyk Golang plugin. Imagine that we need middleware which would send JSON with the current time if the request contains the parameter `get_time=1` in the request query string:

```{.copyWrapper}
package main

import (
  "encoding/json"
  "net/http"
  "time"
)

func SendCurrentTime(rw http.ResponseWriter, r *http.Request) {
  // check if we don't need to send reply
  if r.URL.Query().Get("get_time") != "1" {
    // allow request to be processed and sent to upstream
        return
  }

  // prepare data to send
  replyData := map[string]interface{}{
    "current_time": time.Now(),
  }

  jsonData, err := json.Marshal(replyData)
  if err != nil {
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  // send HTTP response from Golang plugin
  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

func main() {}
```

Let's build the plugin by running this command in the plugin project folder:

```{.copyWrapper}
go build -buildmode=plugin -o /tmp/SendCurrentTime.so
```

Then let's edit the API spec to use this custom middleware:

```{.copyWrapper}
"custom_middleware": {
  "pre": [
    {
       "name": "SendCurrentTime",
       "path": "/tmp/SendCurrentTime.so"
    }
  ],
  "post_key_auth": [],
  "auth_check": {},
  "post": [],
  "driver": "goplugin"
}
```

Let's check that we still perform a round trip to the upstream target if the request query string parameter `get_time` is not set:

```{.copyWrapper}
curl http://localhost:8181/my_api_name/get
                 
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
}
```

Now let's check if our Golang plugin sends a HTTP 200 response (with JSON containing current time) when we set `get_time=1` query string parameter:

```{.copyWrapper}
curl -v http://localhost:8181/my_api_name/get?get_time=1
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get?get_time=1 HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 03:44:10 GMT
< Content-Length: 51
< 
* Connection #0 to host localhost left intact
{"current_time":"2019-09-11T23:44:10.040878-04:00"}
```

Here we see that:

* We've got a HTTP 200 response code.
* The response body has JSON payload with current time.
* The upstream target was not reached. Our Tyk Golang plugin served this request and stopped processing after the response was sent.

### Authentication with a Golang plugin

You can implement your own authentication method, using a Golang plugin and custom `"auth_check"` middleware. Please make sure that:

* The API is protected with `"use_keyless` set to `false`
* The API spec has  `"use_go_plugin_auth"` set to `true`

Let's have a look at the code example. Imagine we need to implement a very trivial authentication method when only one key is supported (in the real world you would want to store your keys in some storage or have some more complex logic).

```{.copyWrapper}
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/headers"
  "github.com/TykTechnologies/tyk/user"
)

func getSessionByKey(key string) *user.SessionState {
  // here goes our logic to check if passed API key is valid and appropriate key session can be retrieved

  // perform auth (only one token "abc" is allowed)
  if key != "abc" {
    return nil
  }

  // return session
  return &user.SessionState{
    OrgID: "default",
    Alias: "abc-session",
  }
}

func MyPluginAuthCheck(rw http.ResponseWriter, r *http.Request) {
  // try to get session by API key
  key := r.Header.Get(headers.Authorization)
  session := getSessionByKey(key)
  if session == nil {
    // auth failed, reply with 403
    rw.WriteHeader(http.StatusForbidden)
    return
  }

  // auth was successful, add session and key to request's context so other middle-wares can use it
  ctx.SetSession(r, session, key, true)
}

func main() {}
```

A couple of notes about this code:

* The package `"github.com/TykTechnologies/tyk/ctx"` is used to set a session in the request context - this is something `"auth_check"`-type custom middleware is responsible for.
* The package `"github.com/TykTechnologies/tyk/user"` is used to operate with Tyk's key session structure.
* Our Golang plugin sends a 403 HTTP response if authentication fails.
* Our Golang plugin just adds a session to the request context and returns if authentication was successful.

Let's build the plugin by running the following command in the folder containing your plugin project:

```{.copyWrapper}
go build -buildmode=plugin -o /tmp/MyPluginAuthCheck.so
```

Now let's check if our custom authentication works as expected (only one key `"abc"` should work).

Authentication will fail with the wrong API key:

```{.copyWrapper}
 curl -v -H "Authorization: xyz" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: xyz
> 
< HTTP/1.1 403 Forbidden
< Date: Wed, 11 Sep 2019 04:31:34 GMT
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware replied with a 403 response and request processing was stopped at this point.

Authentication successful with the right API key:

```{.copyWrapper}
curl -v -H "Authorization: abc" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: abc
> 
< HTTP/1.1 200 OK
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Origin: *
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 04:31:39 GMT
< Referrer-Policy: no-referrer-when-downgrade
< Server: nginx
< X-Content-Type-Options: nosniff
< X-Frame-Options: DENY
< X-Ratelimit-Limit: 0
< X-Ratelimit-Remaining: 0
< X-Ratelimit-Reset: 0
< X-Xss-Protection: 1; mode=block
< Content-Length: 257
< 
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Authorization": "abc", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
}
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware successfully authenticated the request and we received a reply from the upstream target.

### Logging from a Golang plugin

Your Golang plugin can write log entries as part of Tyk's logging system.

To do so you just need to import  the package `"github.com/TykTechnologies/tyk/log"` and use the exported public method `Get()`:

```{.copyWrapper}
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

### Monitoring instrumentation for Tyk Golang plugins

All custom middleware implemented as Golang plugins support Tyk's current  built in instrumentation.

The format for an event name with metadata is: `"GoPluginMiddleware:" + Path + ":" + SymbolName`,  e.g., for our example the event name will be:

```{.copyWrapper}
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader"
```

The format for metric with execution time (in nanoseconds) will have the same format but with the `.exec_time` suffix:

```{.copyWrapper}
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader.exec_time"
```

### Internal state of a Tyk Golang plugin

A Golang plugin can be treated as normal Golang package but:

* The package name is always `"main"` and this package cannot be imported.
* This package loads at run-time by Tyk and loads after all other Golang packages.
* This package has to have an empty `func main() {}`.

A Golang plugin as a package can have `func init()` and it gets called only once (when Tyk loads this plugin for the first time for an API).

It is possible to create structures or open connections to 3d party services/storage and then share them within every call and the export the function in your Golang plugin.

For example, here is an example of a Tyk Golang plugin with a simple hit-counter:

```{.copyWrapper}
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

// called once plugin is loaded, this is where we put all initialization work for plugin
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

Here we see how the internal state of the Golang plugin is used by the exported function `MyProcessRequest` (the one we set in the API spec in the `"custom_middleware"` section). The map `hitCounter` is used to send internal state and count hits to different endpoints. Then our exported Golang plugin function sends a HTTP reply with endpoint hit statistics.

### Loading a Tyk Golang plugin from a bundle
So far we have loaded Golang plugins only directly from file system. You can also use Tyk's bundle instrumentation (see [Plugin Bundles](/docs/plugins/rich-plugins/plugin-bundles/) for more details). You can deploy your Tyk Golang plugins to special HTTP-server and then your plugins will be fetched and loaded from that HTTP endpoint.

You will need to set in `tyk.conf` these two fields:

* `"enable_bundle_downloader": true` - this enables plugin bundles downloader
* `"bundle_base_url": "http://mybundles:8000/abc"` - this specifies the base URL with HTTP server where you place your bundles with Golang plugins (this endpoint has to be reachable from node with Tyk running)

Also, you will need to specify the following field in your API spec:

`"custom_middleware_bundle"` - here you place your filename with bundle (`.zip` archive) to be fetched from the HTTP endpoint you specified in your `tyk.conf` parameter `"bundle_base_url"`

So, your API spec will have this field:
```{.copyWrapper}
"custom_middleware_bundle": "FooBarBundle.zip"
```

Let's look at `FooBarBundle.zip` contents. It is just a ZIP-archive with two files archived inside:

* `AddFooBarHeader.so` - this is our Golang plugin
* `manifest.json` - this is special file with meta information used by Tyk's bundle loader

The contents of `manifest.json`:

```{.copyWrapper}
{
  "file_list": [
    "AddFooBarHeader.so"
  ],
  "custom_middleware": {
    "post": [
      {
        "name": "AddFooBarHeader",
        "path": "AddFooBarHeader.so"
      }
    ]
  },
  "driver": "goplugin",
  ...
}
```

Here we see:

* field `"custom_middleware"` with exactly the same structure we used to specify `"custom_middleware"` in API spec without bundle
* field `"path"` in section `"post"` now contains just a file name without any path. This field specifies `.so` filename placed in ZIP archive with bundle (remember how we specified `"custom_middleware_bundle": "FooBarBundle.zip"`).

#### How to build a bundle with a Golang plugin
You will need to use a special [Bundler tool](/docs/plugins/rich-plugins/plugin-bundles/#bundler-tool) to create bundles with Golang plugins. 

### Reloading Tyk Golang plugin
Sometimes you will need to update your Golang plugin with a new version. There are two ways to do this:

* An API reload with a NEW path or file name of your `.so` file with the plugin. You will need to update the API spec section `"custom_middleware"`, specifying a new value for the `"path"` field of the plugin you need to reload.
* Tyk main process reload. This will force a reload of all Golang plugins for all APIs.

If a plugin is loaded as a bundle and you need to update it you will need to update your API spec with new `.zip` file name in the `"custom_middleware_bundle"` field. Make sure the new `.zip` file is uploaded and available via the bundle HTTP endpoint before you update your API spec.

### Accessing API definition from a Golang plugin

When Tyk passes a request to your plugin, the API definition is made available as part of the request context. This can be accessed as follows:

```{.copyWrapper}
package main
import (
	"fmt"
	"net/http"
	"github.com/TykTechnologies/tyk/ctx"
)
func main() {}
func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
	apidef := ctx.GetDefinition(r)
  fmt.Println("API name is", apidef.Name)
}
```
`ctx.GetDefinition` returns an APIDefinition object, the Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L351)
