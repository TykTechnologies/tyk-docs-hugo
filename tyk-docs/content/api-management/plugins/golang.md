---
title: "Golang Plugins"
date: 2025-01-10
tags: []
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: []
aliases:
  - /plugins/supported-languages/golang
  - /product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins
  - /product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-development-flow
  - /product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler
  - /product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins
  - /product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples
  - /plugins/golang-plugins/golang-plugins
  - /customise-tyk/plugins/golang-plugins/golang-plugins
  - /plugins/supported-languages/golang
---

## Introduction

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk by attaching custom logic written in Go to [hooks]({{< ref "api-management/plugins/plugin-types#plugin-types" >}}) in the Tyk [middleware chain]({{< ref "concepts/middleware-execution-order" >}}).
The chain of middleware is specific to an API and gets created at API load time. When Tyk Gateway performs an API re-load it also loads any custom middleware and "injects" them into a chain to be called at different stages of the HTTP request life cycle.

For a quick-start guide to working with Go plugins, start [here]({{< ref "api-management/plugins/overview#getting-started" >}}).

The [Go plugin writing guide]({{< ref "api-management/plugins/golang#writing-custom-go-plugins" >}}) provides details of how to access dynamic data (such as the key session object) from your Go functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

## Supported plugin types

All of Tyk's [custom middleware hooks]({{< ref "api-management/plugins/plugin-types#plugin-types" >}}) support Go plugins. They represent different stages in the request and response [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) where custom functionality can be added.

- **Pre** - supports an array of middlewares to be run before any others (i.e. before authentication)
- **Auth** - this middleware performs custom authentication and adds API key session info into the request context and can be used only if the API definition has both:
  - `"use_keyless": false`
  - `"use_go_plugin_auth": true`
- **Post-Auth** - supports an array of middleware to be run after authentication; at this point, we have authenticated the session API key for the given key (in the request context) so we can perform any extra checks. This can be used only if the API definition has both:
  - `"use_keyless": false`
  - an authentication method specified
- **Post** - supports an array of middlewares to be run at the very end of the middleware chain; at this point Tyk is about to request a round-trip to the upstream target
- **Response** - run only at the point the response has returned from a service upstream of the API Gateway; note that the [method signature for Response Go plugins]({{< ref "api-management/plugins/golang#creating-a-custom-response-plugin" >}}) is slightly different from the other hook types

{{< note info >}}
**Note**

The `use_keyless` and `use_go_plugin_auth` fields are populated automatically with the correct values if you add a plugin to the **Auth** or **Post-Auth** hooks when using the Tyk Dashboard.
{{< /note >}}
## Custom Go plugin development flow

Go Plugins need to be compiled to native shared object code, which can then be loaded by Tyk Gateway.

We recommend that you familiarize yourself with the following official Go documentation to help you work effectively with Go plugins:

- [The official plugin package documentation - Warnings](https://pkg.go.dev/plugin)
- [Tutorial: Getting started with multi-module workspaces](https://go.dev/doc/tutorial/workspaces)

{{< note success >}}
**Note**

Plugins are currently supported only on Linux, FreeBSD, and macOS, making them unsuitable for applications intended to be portable.
{{< /note >}}

### Tyk Plugin Compiler

We provide the [Tyk Plugin Compiler](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler/) docker image, which we **strongly recommend** is used to build plugins compatible with the official Gateway releases. That tool provides the cross compilation toolchain, Go version used to build the release, ensures that compatible flags are used when compiling plugins (such as `-trimpath`, `CC`, `CGO_ENABLED`, `GOOS`, `GOARCH`) and also works around known Go issues such as:

- https://github.com/golang/go/issues/19004
- https://www.reddit.com/r/golang/comments/qxghjv/plugin_already_loaded_when_a_plugin_is_loaded/


### Setting up your environment

It's important to understand the need for plugins to be compiled using exactly the same environment and build flags as the Gateway. To simplify this and minimise the risk of compatibility problems, we recommend the use of [Go workspaces](https://go.dev/blog/get-familiar-with-workspaces), to provide a consistent environment.

To develop plugins without using the Tyk Plugin Compiler, you'll need:

- Go (matching the version used in the Gateway, which you can determine using `go.mod`).
- Git to check out Tyk Gateway source code.
- A folder with the code that you want to build into plugins.

We recommend that you set up a *Go workspace*, which, at the end, is going to contain:

- `/tyk-release-x.y.z` - the Tyk Gateway source code
- `/plugins` - the plugins
- `/go.work` - the *Go workspace* file
- `/go.work.sum` - *Go workspace* package checksums

Using the *Go workspace* ensures build compatibility between the plugins and Gateway.

### Steps for Configuration:

1. **Checking out Tyk Gateway source code**

    ```
    git clone --branch release-5.3.6 https://github.com/TykTechnologies/tyk.git tyk-release-5.3.6 || true
    ```

    This example uses a particular `release-5.3.6` branch, to match Tyk Gateway release 5.3.6. With newer `git` versions, you may pass `--branch v5.3.6` and it would use the tag. In case you want to use the tag it's also possible to navigate into the folder and issue `git checkout tags/v5.3.6`.

2. **Preparing the Go workspace**

    Your Go workspace can be very simple:

    1. Create a `.go` file containing the code for your plugin.
    2. Create a `go.mod` file for the plugin.
    3. Ensure the correct Go version is in use.

    As an example, we can use the [CustomGoPlugin.go](https://github.com/TykTechnologies/custom-go-plugin/blob/master/go/src/CustomGoPlugin.go) sample as the source for our plugin as shown:

    ```
    mkdir -p plugins
    cd plugins
    go mod init testplugin
    go mod edit -go $(go mod edit -json go.mod | jq -r .Go)
    wget -q https://raw.githubusercontent.com/TykTechnologies/custom-go-plugin/refs/heads/master/go/src/CustomGoPlugin.go
    cd -
    ```

    The following snippet provides you with a way to get the exact Go version used by Gateway from it's [go.mod](https://github.com/TykTechnologies/tyk/blob/release-5.3.6/go.mod#L3) file:

    - `go mod edit -json go.mod | jq -r .Go` (e.g. `1.22.7`)

    This should be used to ensure the version matches between gateway and the plugin.

    To summarize what was done:

    1. We created a plugins folder and initialzed a `go` project using `go mod` command.
    2. Set the Go version of `go.mod` to match the one set in the Gateway.
    3. Initialzied the project with sample plugin `go` code.

    At this point, we don't have a *Go workspace* but we will create one next so that we can effectively share the Gateway dependency across Go modules.

3. **Creating the Go workspace**

    To set up the Go workspace, start in the directory that contains the Gateway and the Plugins folder. You'll first, create the `go.work` file to set up your Go workspace, and include the `tyk-release-5.3.6` and `plugins` folders. Then, navigate to the plugins folder to fetch the Gateway dependency at the exact commit hash and run `go mod tidy` to ensure dependencies are up to date.

    Follow these commands:

    ```
    go work init ./tyk-release-5.3.6
    go work use ./plugins
    commit_hash=$(cd tyk-release-5.3.6 && git rev-parse HEAD)
    cd plugins && go get github.com/TykTechnologies/tyk@${commit_hash} && go mod tidy && cd -
    ```

    The following snippet provides you to get the commit hash exactly, so it can be used with `go get`.

    - `git rev-parse HEAD`

    The Go workspace file (`go.work`) should look like this:

    ```
    go 1.22.7

    use (
        ./plugins
        ./tyk-release-5.3.6
    )
    ```

4. **Building and validating the plugin**

    Now that your *Go workspace* is ready, you can build your plugin as follows:

    ```
    cd tyk-release-5.3.6 && go build -tags=goplugin -trimpath . && cd -
    cd plugins           && go build -trimpath -buildmode=plugin . && cd -
    ```

    These steps build both the Gateway and the plugin.

    You can use the Gateway binary that you just built to test that your new plugin loads into the Gateway without having to configure and then make a request to an API using this command:

    ```
    ./tyk-release-5.3.6/tyk plugin load -f plugins/testplugin.so -s AuthCheck
    ```

    You should see an output similar to:

    ```
    time="Oct 14 13:39:55" level=info msg="--- Go custom plugin init success! ---- "
    [file=plugins/testplugin.so, symbol=AuthCheck] loaded ok, got 0x76e1aeb52140
    ```

    The log shows that the plugin has correctly loaded into the Gateway and that its `init` function has been successfully invoked.

5. **Summary**

    In the preceding steps we have put together an end-to-end build environment for both the Gateway and the plugin. Bear in mind that runtime environments may have additional restrictions beyond Go version and build flags to which the plugin developer must pay attention.

    Compatibility in general is a big concern when working with Go plugins: as the plugins are tightly coupled to the Gateway, consideration must always be made for the build restrictions enforced by environment and configuration options.

    Continue with [Loading Go Plugins into Tyk](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins/).

### Debugging Golang Plugins

Plugins are native Go code compiled to a binary shared object file. The code may depend on `cgo` and require libraries like `libc` provided by the runtime environment. The following are some debugging steps for diagnosing issues arising from using plugins.

#### Warnings

The [Plugin package - Warnings](https://pkg.go.dev/plugin#hdr-Warnings) section in the Go documentation outlines several requirements which can't be ignored when working with plugins. The most important restriction is the following:

> Runtime crashes are likely to occur unless all parts of the program (the application and all its plugins) are compiled using exactly the same version of the toolchain, the same build tags, and the same values of certain flags and environment variables.

#### Using Incorrect Build Flags

When working with Go plugins, it's easy to miss the restriction that the plugin at the very least must be built with the same Go version, and the same flags (notably `-trimpath`) as the Tyk Gateway on which it is to be used.

If you miss an argument (for example `-trimpath`) when building the plugin, the Gateway will report an error when your API attempts to load the plugin, for example:

```
task: [test] cd tyk-release-5.3.6 && go build -tags=goplugin -trimpath .
task: [test] cd plugins && go build -buildmode=plugin .
task: [test] ./tyk-release-5.3.6/tyk plugin load -f plugins/testplugin.so -s AuthCheck
tyk: error: unexpected error: plugin.Open("plugins/testplugin"): plugin was built with a different version of package internal/goarch, try --help
```

Usually when the error hints at a standard library package, the build flags between the Gateway and plugin binaries don't match.

Other error messages may be reported, depending on what triggered the issue. For example, if you omitted `-race` in the plugin but the gateway was built with `-race`, the following error will be reported:

```
plugin was built with a different version of package runtime/internal/sys, try --help
```

Strictly speaking:

- Build flags like `-trimpath`, `-race` need to match.
- Go toolchain / build env needs to be exactly the same.
- For cross compilation you must use the same `CC` value for the build (CGO).
- `CGO_ENABLED=1`, `GOOS`, `GOARCH` must match with runtime.

When something is off, you can check what is different by using the `go version -m` command for the Gateway (`go version -m tyk`) and plugin (`go version -m plugin.so`). Inspecting and comparing the output of `build` tokens usually yields the difference that caused the compatibility issue.

#### Plugin Compatibility Issues

Below are some common situations where dependencies might cause issues:

- The `Gateway` has a dependency without a `go.mod` file, but the plugin needs to use it.
- Both the `Gateway` and the plugin share a dependency. In this case, the plugin must use the exact same version as the `Gateway`.
- The plugin requires a different version of a shared dependency.

Here’s how to handle each case:

**Case 1: Gateway dependency lacks `go.mod`**

- The plugin depends on the `Gateway`, which uses dependency *A*.
- *A* doesn’t have a `go.mod` file, so a pseudo version is generated during the build.
- Result: The build completes, but the plugin fails to load due to a version mismatch.

**Solution:** Update the code to remove dependency *A*, or use a version of *A* that includes a `go.mod` file.

**Case 2: Shared dependency with version matching**

- The plugin and `Gateway` share a dependency, and this dependency includes a `go.mod` file.
- The version matches, and the dependency is promoted to *direct* in `go.mod`.
- Outcome: You’ll need to keep this dependency version in sync with the `Gateway`.

**Case 3: Plugin requires a different version of a shared dependency**

- The plugin and `Gateway` share a dependency, but the plugin needs a different version.
- If the other version is a major release (e.g., `/v4`), it’s treated as a separate package, allowing both versions to coexist.
- If it’s just a minor/patch difference, the plugin will likely fail to load due to a version conflict.

**Recommendation:** For best results, use Go package versions that follow the Go module versioning (metaversion). However, keep in mind that many `Gateway` dependencies use basic `v1` semantic versioning, which doesn’t always enforce strict versioned import paths. 

#### List plugin symbols

Sometimes it's useful to list symbols from a plugin. For example, we can list the symbols as they are compiled into our testplugin:

```
# nm -gD testplugin.so | grep testplugin
00000000014db4b0 R go:link.pkghashbytes.testplugin
000000000170f7d0 D go:link.pkghash.testplugin
000000000130f5e0 T testplugin.AddFooBarHeader
000000000130f900 T testplugin.AddFooBarHeader.deferwrap1
000000000130f980 T testplugin.AuthCheck
0000000001310100 T testplugin.AuthCheck.deferwrap1
000000000130f540 T testplugin.init
0000000001310ce0 T testplugin.init.0
0000000001ce9580 D testplugin..inittask
0000000001310480 T testplugin.InjectConfigData
0000000001310180 T testplugin.InjectMetadata
0000000001d2a3e0 B testplugin.logger
0000000001310cc0 T testplugin.main
0000000001310820 T testplugin.MakeOutboundCall
0000000001310c40 T testplugin.MakeOutboundCall.deferwrap1
```

This command prints other symbols that are part of the binary. In the worst case, a build compatibility issue may cause a crash in the Gateway due to an unrecoverable error and this can be used to further debug the binaries produced.

A very basic check to ensure Gateway/plugin compatibility is using the built in `go version -m <file>`:

```
[output truncated]
	build	-buildmode=exe
	build	-compiler=gc
	build	-race=true
	build	-tags=goplugin
	build	-trimpath=true
	build	CGO_ENABLED=1
	build	GOARCH=amd64
	build	GOOS=linux
	build	GOAMD64=v1
	build	vcs=git
	build	vcs.revision=1db1935d899296c91a55ba528e7b653aec02883b
	build	vcs.time=2024-09-24T12:54:26Z
	build	vcs.modified=false
```

These options should match between the Gateway binary and the plugin. You can use the command for both binaries and then compare the outputs.


## Writing Custom Go Plugins

Tyk's custom Go plugin middleware is very powerful as it provides you with access to different data types and functionality as explained in this section.

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk and uses the native Golang plugins API (see [go pkg/plugin docs](https://golang.org/pkg/plugin) for more details).

Custom Go plugins can access various data objects relating to the API request:

- [session]({{< ref "api-management/plugins/golang#accessing-the-session-object" >}}): the key session object provided by the client when making the API request
- [API definition]({{< ref "api-management/plugins/golang#accessing-the-api-definition" >}}): the Tyk OAS or Tyk Classic API definition for the requested API

Custom Go plugins can also [terminate the request]({{< ref "api-management/plugins/golang#terminating-the-request" >}}) and stop further processing of the API request such that it is not sent to the upstream service.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "api-management/plugins/overview#plugins-hub">}}).
To see an example of a Go plugin, please visit our [Go plugin examples]({{< ref "api-management/plugins/golang#example-custom-go-plugins" >}}) page.

### Accessing the internal state of a custom plugin

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

### Accessing the API definition

When Tyk passes a request to your plugin, the API definition is made available as part of the request context.

{{< note success >}}
**Note**  

The API definition is accessed differently for Tyk OAS APIs and Tyk Classic APIs, as indicated in the following sections. If you use the wrong call for your API type, it will return `nil`.
{{< /note >}}

#### Working with Tyk OAS APIs

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

#### Working with Tyk Classic APIs

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

### Accessing the session object

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

### Terminating the request

You can terminate the request within your custom Go plugin and provide an HTTP response to the originating client, such that the plugin behaves similarly to a [virtual endpoint]({{< ref "api-management/traffic-transformation#virtual-endpoints-overview" >}}).

- the HTTP request processing is stopped and other middleware in the chain won't be used
- the HTTP request round-trip to the upstream target won't happen
- analytics records will still be created and sent to the analytics processing flow

This [example]({{< ref "api-management/plugins/golang#using-a-custom-go-plugin-as-a-virtual-endpoint" >}}) demonstrates a custom Go plugin configured as a virtual endpoint.

### Logging from a custom plugin

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

#### Monitoring instrumentation for custom plugins

All custom middleware implemented as Golang plugins support Tyk's current built in instrumentation.

The format for an event name with metadata is: `"GoPluginMiddleware:" + Path + ":" + SymbolName`,  e.g., for our example, the event name will be:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader"
```

The format for a metric with execution time (in nanoseconds) will have the same format but with the `.exec_time` suffix:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader.exec_time"
```

### Creating a custom response plugin

As explained [here]({{< ref "api-management/plugins/plugin-types#response-plugins" >}}), you can register a custom Go plugin to be triggered in the response middleware chain. You must configure the `driver` field to `goplugin` in the API definition when registering the plugin.

#### Response plugin method signature

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

## Plugin compiler

Tyk provides a Plugin Compiler tool that will create a file that can be [loaded into Tyk]({{< ref "api-management/plugins/golang#loading-custom-go-plugins-into-tyk" >}}) to implement your desired custom logic.

{{< note success >}}
**Note**  

The plugin compiler is not supported on Ubuntu 16.04 (Xenial Xerus) as it uses glibc 2.23 which is incompatible with our standard build environment. If you absolutely must have Go plugin support on Xenial, please contact Tyk support.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}}

### Compiler options

Most of the following arguments are applied only to developer flows. These aid development and testing purposes, and support of these varies across releases, due to changes in the Go ecosystem.

The latest plugin compiler implements the following options:

- `plugin_name`: output root file name (for example `plugin.so`)
- `build_id`: [optional] provides build uniqueness
- `GOOS`: [optional] override of GOOS (add `-e GOOS=linux`)
- `GOARCH`: [optional] override of GOARCH (add `-e GOARCH=amd64`)

By default, if `build_id` is not provided, the gateway will not allow the plugin to be loaded twice. This is a restriction of the Go plugins standard library implementation. As long as the builds are made with a unique `build_id`, the same plugin can be loaded multiple times.

When you provide a unique `build_id` argument, that also enables hot-reload compatibility of your `.so` plugin build, so that you would not need to restart the gateway, only reload it.

- before 5.1: the plugin would be built in a filesystem path based on `build_id`
- since 5.2.4: the plugin compiler adjusts the Go module in use for the plugin.

As the plugins are built with `-trimpath`, to omit local filesystem path details and improve plugin compatibility, the plugin compiler relies on the Go module itself to ensure each plugin build is unique. It modifies the plugin build `go.mod` file and imports to ensure a unique build.

- [plugin package: Warnings](https://pkg.go.dev/plugin#hdr-Warnings)
- [golang#29525 - plugin: cannot open the same plugin with different names](https://github.com/golang/go/issues/29525)

### Output filename

Since v4.1.0 the plugin compiler has automatically added the following suffixes to the root filename provided in the `plugin_name` argument:

- `{Gw-version}`: the Tyk Gateway version, for example, `v5.3.0`
- `{OS}`: the target operating system, for example `linux`
- `{arch}`: the target CPU architecture, for example, `arm64`

Thus, if `plugin_name` is set to `plugin.so` then given these example values the output file will be: `plugin_v5.3.0_linux_arm64.so`.

This enables you to have one directory with multiple versions of the same plugin targeting different Gateway versions.

#### Cross-compiling for different architectures and operating systems

The Tyk Go Plugin Compiler can generate output for different architectures and operating systems from the one in which the compiler is run (cross-compiling). When you do this, the output filename will be suffixed with the target OS and architecture.

You simply provide the target `GOOS` and `GOARCH` arguments to the plugin compiler, for example:

```yaml
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.1 plugin.so $build_id linux arm64
```

This command will cross-compile your plugin for a `linux/arm64` architecture. It will produce an output file named `plugin_v5.2.1_linux_arm64.so`.

{{< note success >}}
**Note**  

If you are using the plugin compiler on MacOS, the docker run argument `--platform=linux/amd64` is necessary. The plugin compiler is a cross-build environment implemented with `linux/amd64`.
{{< /note >}}

### Experimental options

The plugin compiler also supports a set of environment variables being passed:

- `DEBUG=1`: enables debug output from the plugin compiler process.
- `GO_TIDY=1`: runs go mod tidy to resolve possible dependency issues.
- `GO_GET=1`: invokes go get to retrieve the exact Tyk gateway dependency.

These environment options are only available in the latest gateway and plugin compiler versions.
They are unsupported and are provided to aid development and testing workflows.

## Loading Custom Go Plugins into Tyk

For development purposes, we are going to load the plugin from local file storage. For production, you can use [bundles](#loading-a-tyk-golang-plugin-from-a-bundle) to deploy plugins to multiple gateways.

In this example we are using a Tyk Classic API. In the API definition find the `custom_middleware` section and make it look similar to the snippet below. Tyk Dashboard users should use RAW API Editor to access this section.

```json
"custom_middleware": {
  "pre": [],
  "post_key_auth": [],
  "auth_check": {},
  "post": [
    {
      "name": "AddFooBarHeader",
      "path": "<path>/plugin.so"
    }
  ],
  "driver": "goplugin"
}
```

Here we have:

- `driver` - Set this to `goplugin` (no value created for this plugin) which says to Tyk that this custom middleware is a Golang native plugin.
- `post` - This is the hook name. We use middleware with hook type `post` because we want this custom middleware to process the request right before it is passed to the upstream target (we will look at other types later).
- `post.name` - is your function name from the Go plugin project.
- `post.path` - is the full or relative (to the Tyk binary) path to the built plugin file (`.so`). Make sure Tyk has read access to this file.

Also, let's set fields `"use_keyless": true` and `"target_url": "http://httpbin.org/"` - for testing purposes. We will test what request arrives to our upstream target and `httpbin.org` is a perfect fit for that.

The API needs to be reloaded after that change (this happens automatically when you save the updated API in the Dashboard).

Now your API with its Golang plugin is ready to process traffic:

```bash
# curl http://localhost:8181/my_api_name/get   
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

### Updating the plugin

Loading an updated version of your plugin requires one of the following actions:

- An API reload with a NEW path or file name of your `.so` file with the plugin. You will need to update the API spec section `"custom_middleware"`, specifying a new value for the `"path"` field of the plugin you need to reload.
- Tyk main process reload. This will force a reload of all Golang plugins for all APIs.

If a plugin is loaded as a bundle and you need to update it you will need to update your API spec with a new `.zip` file name in the `"custom_middleware_bundle"` field. Make sure the new `.zip` file is uploaded and available via the bundle HTTP endpoint before you update your API spec.

### Loading a Tyk Golang plugin from a bundle

Currently we have loaded Golang plugins only directly from the file system. However, when you have multiple gateway instances, you need a more dynamic way to load plugins. Tyk offer bundle instrumentation [Plugin Bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}). Using the bundle command creates an archive with your plugin, which you can deploy to the HTTP server (or AWS S3) and then your plugins will be fetched and loaded from that HTTP endpoint.

You will need to set in `tyk.conf` these two fields:

- `"enable_bundle_downloader": true` - enables the plugin bundles downloader
- `"bundle_base_url": "http://mybundles:8000/abc"` - specifies the base URL with the HTTP server where you place your bundles with Golang plugins (this endpoint must be reachable by the gateway)

Also, you will need to specify the following field in your API spec:

`"custom_middleware_bundle"` - here you place your filename with the bundle (`.zip` archive) to be fetched from the HTTP endpoint you specified in your `tyk.conf` parameter `"bundle_base_url"`

To load a plugin, your API spec should set this field like so:

```json
"custom_middleware_bundle": "FooBarBundle.zip"
```

Let's look at `FooBarBundle.zip` contents. It is just a ZIP archive with two files archived inside:

- `AddFooBarHeader.so` - this is our Golang plugin
- `manifest.json` - this is a special file with meta information used by Tyk's bundle loader

The contents of `manifest.json`:

```yaml
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
    ],
    "driver": "goplugin"
  },

  ...
}
```

Here we see:

- field `"custom_middleware"` with exactly the same structure we used to specify `"custom_middleware"` in API spec without bundle
- field `"path"` in section `"post"` now contains just a file name without any path. This field specifies `.so` filename placed in a ZIP archive with the bundle (remember how we specified `"custom_middleware_bundle": "FooBarBundle.zip"`).

## Using custom Go plugins with Tyk Cloud

The following supporting resources are provided for developing plugins on Tyk Cloud:

- [Enabling Plugins On The Control Plane](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/setup-control-plane/#what-do-i-need-to-do-to-use-plugins)
- [Uploading Your Plugin Bundle To S3 Bucket](https://tyk.io/docs/tyk-cloud#uploading-your-bundle)

## Example custom Go plugins

This document provides a working example for providing specific functionality with a custom Go plugin.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "api-management/plugins/overview#plugins-hub">}}).

### Using a custom Go plugin as a virtual endpoint

It is possible to send a response from the Golang plugin custom middleware. In the case that the HTTP response was sent:

- The HTTP request processing is stopped and other middleware in the chain won't be used.
- The HTTP request round-trip to the upstream target won't happen
- Analytics records will still be created and sent to the analytics processing flow.

Let's look at an example of how to send an HTTP response from the Tyk Golang plugin. Imagine that we need middleware which would send JSON with the current time if the request contains the parameter `get_time=1` in the request query string:

```go
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

  //Prepare data to send
  replyData := map[string]interface{}{
    "current_time": time.Now(),
  }

  jsonData, err := json.Marshal(replyData)
  if err != nil {
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  //Send HTTP response from the Golang plugin
  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

func main() {}
```

Let's build the plugin by running this command in the plugin project folder:

```bash
go build -trimpath -buildmode=plugin -o /tmp/SendCurrentTime.so
```

Then let's edit the API spec to use this custom middleware:

```json
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

```bash
# curl http://localhost:8181/my_api_name/get
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

Now let's check if our Golang plugin sends an HTTP 200 response (with JSON containing current time) when we set `get_time=1` query string parameter:

```bash
# curl http://localhost:8181/my_api_name/get?get_time=1
{"current_time":"2019-09-11T23:44:10.040878-04:00"}
```

Here we see that:

- We've got an HTTP 200 response code.
- The response body has a JSON payload with the current time.
- The upstream target was not reached. Our Tyk Golang plugin served this request and stopped processing after the response was sent.

### Performing custom authentication with a Golang plugin

You can implement your own authentication method, using a Golang plugin and custom `"auth_check"` middleware. Ensure you set the two fields in Post Authentication Hook.

Let's have a look at the code example. Imagine we need to implement a very trivial authentication method when only one key is supported (in the real world you would want to store your keys in some storage or have some more complex logic).

```go
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/headers"
  "github.com/TykTechnologies/tyk/user"
)

func getSessionByKey(key string) *user.SessionState {
  //Here goes our logic to check if the provided API key is valid and appropriate key session can be retrieved

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
  //Try to get a session by API key
  key := r.Header.Get(headers.Authorization)
  session := getSessionByKey(key)
  if session == nil {
    // auth failed, reply with 403
    rw.WriteHeader(http.StatusForbidden)
    return
  }
  
  // auth was successful, add the session to the request's context so other middleware can use it
  ctx.SetSession(r, session, true)
  
  // if compiling on a version older than 4.0.1, use this instead
  // ctx.SetSession(r, session, key, true) 
}

func main() {}
```

A couple of notes about this code:

- the package `"github.com/TykTechnologies/tyk/ctx"` is used to set a session in the request context - this is something `"auth_check"`-type custom middleware is responsible for.
- the package `"github.com/TykTechnologies/tyk/user"` is used to operate with Tyk's key session structure.
- our Golang plugin sends a 403 HTTP response if authentication fails.
- our Golang plugin just adds a session to the request context and returns if authentication was successful.

Let's build the plugin by running the following command in the folder containing your plugin project:

```bash
go build -trimpath -buildmode=plugin -o /tmp/MyPluginAuthCheck.so
```

Now let's check if our custom authentication works as expected (only one key `"abc"` should work).

Authentication will fail with the wrong API key:

```bash
# curl -v -H "Authorization: xyz" http://localhost:8181/my_api_name/get
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

```bash
# curl -v -H "Authorization: abc" http://localhost:8181/my_api_name/get
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
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 04:31:39 GMT
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

## Upgrading your Tyk Gateway

When upgrading your Tyk Gateway deployment, you need to re-compile your plugin with the new version. At the moment of loading a plugin, the Gateway will try to find a plugin with the name provided in the API definition. If none is found then it will fall back to search the plugin file with the name: `{plugin-name}_{Gw-version}_{OS}_{arch}.so`.

Since Tyk v4.1.0, the compiler [automatically]({{< ref "api-management/plugins/golang#output-filename" >}}) creates plugin files following this convention so when you upgrade, say from Tyk v5.2.5 to v5.3.0 you only need to have the plugins compiled for v5.3.0 before performing the upgrade.

This diagram shows how every Tyk Gateway will search and load the plugin binary that it is compatible with.
{{< img src="/img/plugins/go-plugin-different-tyk-versions.png" alt="APIs Menu" >}}
