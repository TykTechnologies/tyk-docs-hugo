---
title: Custom Go plugin development flow
date: 2024-03-04
description: "Development flow working with Go Plugins"
tags: ["custom plugin", "golang", "go plugin", "middleware"]
---

Go plugins must be compiled before they can be run. This applies to custom code that you want Tyk to run during the processing of API requests and responses in [custom plugins]({{< ref "plugins" >}}). In this section we describe the process and highlight important information that you must be aware of when working with custom Go plugins.

## Creating a custom Go plugin for Tyk

In this section, you will find step-by-step instructions to create a working Go Plugin to implement custom logic in your API processing.

### Step 1: Initialise Go module for the plugin

First we must perform some initialisation to configure the environment to build your Go Plugin.

The general steps for initialising plugins can be summarised as follows:

1. Create a new folder where you will create the plugin
2. Initialise a Go module for your plugin from within the new folder
3. Determine the commit hash for the Tyk Gateway version that will be used to build the plugin. Commit hashes can be found for tagged [Gateway releases](https://github.com/TykTechnologies/tyk/tags)

{{< note success >}}
**Note**  

The process for initialising plugins changed with Tyk Gateway v5.1, please ensure that you follow the correct steps based on your Gateway version.
{{< /note >}}

The commands in the following sections will create a `go.mod` file inside your folder and will ensure that the plugin in compatible with your Tyk Gateway version.

#### Initialise plugin for Tyk Gateway v5.1 and above (v5.1+)

In Gateway version 5.1, the Gateway and plugins transitioned to using [Go modules builds](https://go.dev/ref/mod#introduction).

The example below shows the set of commands for initialising a plugin for compatibility with Tyk Gateway 5.2.1.

```bash
mkdir tyk-plugin
cd tyk-plugin
go mod init tyk-plugin
go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
go mod tidy
```

In the example above notice that the commit hash was used for [Tyk Gateway 5.2.1](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.1)

#### Initialise plugin for Tyk Gateway versions between v4.2 and v5.0

For Tyk Gateway versions earlier than v5.1 you also need to use [go mod vendor](https://go.dev/ref/mod#go-mod-vendor).

The example below shows how to initialise a Golang plugin module for compiling with Tyk Gateway 5.0.3.

```bash
mkdir tyk-plugin
cd tyk-plugin
go mod init tyk-plugin
go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
go mod tidy
go mod vendor
```

#### Initialise plugin for Tyk Gateway versions prior to v4.2

Up to Tyk Gateway v4.2, plugin compilation relies on *graphql-go-tools*. An alias needs to be configured to associate imports of *github.com/TykTechnologies/graphql-go-tools* with *github.com/jensneuse/graphql-go-tools*. To determine the dependency version open the *go.mod* file in the associated release branch of the [Gateway repository](https://github.com/TykTechnologies/tyk).

For example, for Tyk Gateway v4.0.3, the dependency version for *graphql-go-tools* is *v1.6.2-0.20220426094453-0cc35471c1ca*. This can be found by inspecting the contents of *go.mod* in the *release-4.0.3* branch, particularly the `replace` statements within.  

```bash
mkdir tyk-plugin
cd tyk-plugin
go mod init tyk-plugin
go get github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca
go mod tidy
go mod vendor
```

### Step 2: Write your plugin

We provide details of the many features available to you when writing your custom logic in the [Writing Go Plugins]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins" >}}) section, but for this example we will create a plugin with very basic functionality:

- we will add a custom header `"Foo: Bar"` to a request
- we want this to happen right before the request is passed to the upstream service

Create a file `plugin.go` with the following content:

```go
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

- is a Golang project with a `main` package
- has an empty `func main()`
- has one exported `func AddFooBarHeader` which must have the same method signature as `type HandlerFunc func(ResponseWriter, *Request)` from the standard `"net/http"` Golang package

{{< note success >}}
**Note**  

If a dependency that your plugin uses is also used by the gateway, the version _used by the gateway_ will be used in your plugin. This may mask conflicts between transitive dependencies.
{{< /note >}}

### Step 3: Synchronise dependencies

If you are working with Tyk Gateway v5.1 or later, you can skip this step.

If you are working with a Tyk Gateway prior to v5.1 you must download any required dependencies to ensure that all plugin dependencies are correctly resolved. All dependencies are saved to the `vendor` folder.

Issue these commands to perform this sync:

```bash
go mod tidy
go mod vendor    # only for Tyk Gateway <5.1
```

{{< note info >}}
**Note**

If you are working with a Tyk Gateway prior to v5.1 you must run these commands on initial plugin initialisation and every time you add a new third-party library in your code.
{{< /note >}}


### Step 4: Build the plugin

A Golang plugin is built as a shared library (`.so`), and must use exactly the same Tyk Gateway binary as the one to be installed. We provide a [Docker image](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags), that we also use internally for building our official binaries.

The steps for building a plugin are as follows:

1. Mount your plugin source code directory to the `/plugin-source` container location
2. Specify the docker tag for the target Tyk Gateway version, e.g. `v5.2.1`
3. Specify the name for your plugin's shared library file, e.g. `plugin.so`

An example is shown below that builds a plugin named *plugin.so*, compatible with Gateway version v5.2.1. This mounts the source code from the current directory into the docker container at `/plugin-source`.

```bash
docker pull tykio/tyk-plugin-compiler:v5.2.1 
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.1 plugin.so
```

#### Building from source

If you are building a plugin for a Gateway version compiled from the source, you can use the following command:

```bash
go build -trimpath -buildmode=plugin -o plugin.so
```

As a result of this build command, we get a shared library with the plugin implementation placed at `plugin.so`.

For older gateway versions (<5.1), using `go mod vendor` is used to vendor third party dependencies.
If you are using [Go modules](https://blog.golang.org/using-go-modules), it should be as simple as running `go mod vendor` command.
For newer Gateway verions than 5.1, the vendoring step is not required.
