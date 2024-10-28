---
title: Custom Go plugin development flow
tags:
    - custom plugin
    - golang
    - go plugin
    - middleware
description: Development flow working with Go Plugins
date: "2024-10-11"
---

We recommend that you familiarize yourself with the following official Go documentation to help you work effectively with Go plugins:

- [The official plugin package documentation - Warnings](https://pkg.go.dev/plugin)
- [Tutorial: Getting started with multi-module workspaces](https://go.dev/doc/tutorial/workspaces)

> Plugins are currently supported only on Linux, FreeBSD, and macOS, making them unsuitable for applications intended to be portable.

Plugins need to be compiled to native shared object code, which can then be loaded by Tyk Gateway. For best results it's important to understand the need for plugins to be compiled using exactly the same environment and [build flags]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-development-flow#build-flags" >}}) as the Gateway. To simplify this and minimise the risk of compatibility problems, we strongly recommend the use of [Go workspaces]({{< ref "https://go.dev/blog/get-familiar-with-workspaces" >}}), to provide a consistent environment.

## Setting up your environment

To develop plugins, you'll need:

- Go (matching the version used in the Gateway, which you can determine using `go.mod`)
- Git to check out Tyk Gateway source code
- A folder with the code that you want to build into plugins

We recommend that you set up a *Go workspace*, which, at the end, is going to contain:

- `/tyk-release-x.y.z` - the Tyk Gateway source code
- `/plugins` - the plugins
- `/go.work` - the *Go workspace* file
- `/go.work.sum` - *Go workspace* package checksums

Using the *Go workspace* ensures build compatibility between the plugins and Gateway.

### 1. Checking out Tyk Gateway source code

```
git clone --branch release-5.3.6 https://github.com/TykTechnologies/tyk.git tyk-release-5.3.6 || true
```

This example uses a particular `release-5.3.6` branch, to match Tyk Gateway release 5.3.6. With newer `git` versions, you may pass `--branch v5.3.6` and it would use the tag. In case you want to use the tag it's also possible to navigate into the folder and issue `git checkout tags/v5.3.6`.

### 2. Preparing the Go workspace

Your Go workspace can be very simple.

Generally you would:

1. create a `.go` file containing the code for your plugin
2. create a `go.mod` file for the plugin
3. ensure the correct Go version is in use
4. add a Tyk Gateway dependency with `go get`, using the commit hash

As an example, we can use the [CustomGoPlugin.go](https://github.com/TykTechnologies/custom-go-plugin/blob/master/go/src/CustomGoPlugin.go) sample as the source for our plugin as shown:

```
mkdir -p plugins
cd plugins
go mod init testplugin
go mod edit -go $(go mod edit -json go.mod | jq -r .Go)
wget -q https://raw.githubusercontent.com/TykTechnologies/custom-go-plugin/refs/heads/master/go/src/CustomGoPlugin.go
cd -
```

The following snippets provide you with a way to:

- `go mod edit -json go.mod | jq -r .Go` - get the go version from the gateway [go.mod](https://github.com/TykTechnologies/tyk/blob/release-5.3.6/go.mod#L3) file
- `git rev-parse HEAD` - get the commit hash so the exact commit can be used with `go get`

This should be used to ensure the matching between gateway and the plugin. The commit is used to `go get` the dependency in later steps.

To summarize what was done:

1. create a plugin folder, create a go.mod for it,
2. set the Go version of `go.mod` to match the one set in the Gateway,
3. have some code to compile in the folder

At this point, we don't have a *Go workspace* but we will create one next so that we can effectively share the Gateway dependency across Go modules.

### 3. Creating the Go workspace

From the folder that contains the Gateway checkout and the plugins folder, you will update `go.mod` with the Gateway commit hash that corresponds to the checkout and then run `go mod tidy`, creating the `go.work` workspace file.

Follow these commands:

```
go work init ./tyk-release-5.3.6
go work use ./plugins
commit_hash=$(cd tyk-release-5.3.6 && git rev-parse HEAD)
cd plugins && go get github.com/TykTechnologies/tyk@${commit_hash} && go mod tidy && cd -
```

The Go workspace file (`go.work`) should look like this:

```
go 1.22.7

use (
	./plugins
	./tyk-release-5.3.6
)
```

### 4. Building and validating the plugin

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

### 5. Summary

In the preceding steps we have put together an end-to-end build environment for both the Gateway and the plugin. Bear in mind that runtime environments may have additional restrictions beyond Go version and build flags to which the plugin developer must pay attention.

Compatibility in general is a big concern when working with Go plugins: as the plugins are tightly coupled to the Gateway, consideration must always be made for the build restrictions enforced by environment and configuration options.

Continue with [Loading Go Plugins into Tyk](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins/).

## Common issues

### Plugin compiler

We provide a plugin build environment to manage compatibility restrictions for plugins.

- Ensures compatibility of the system architecture and an official Tyk release
- Provides a cross-compilation environment to build plugins for your target architecture

It's recommended to use the Plugin Compiler to build plugins for an official release.

Continue with [Go Plugin Compiler](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler/).

### Build flags

It's a requirement that build flags for plugins match the build flags for the Gateway. One such flag that must be included in builds is `-trimpath`:

> `-trimpath` - remove all file system paths from the resulting executable.
>
> Instead of absolute file system paths, the recorded file names will begin with either "go" (for the standard library), or a module path@version (when using modules), or a plain import path (when using GOPATH).

The Gateway uses `-trimpath` to clear local build environment details from the binary, and it must in turn be used for the plugin build as well. The use of the flag increases compatibility for plugins.

For more detailed restrictions, please see [Debugging Go Plugins]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/debugging-go-plugins" >}}).
