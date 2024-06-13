---
title: Plugin compiler
date: 2024-03-04
description: "The Tyk Go Plugin compiler"
tags: ["custom plugin", "golang", "go plugin", "middleware", "plugin compiler", "compiler"]
---

Tyk provides a Plugin Compiler tool that will create a file that can be [loaded into Tyk]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins" >}}) to implement your desired custom logic.

{{< note success >}}
**Note**  

The plugin compiler is not supported on Ubuntu 16.04 (Xenial Xerus) as it uses glibc 2.23 which is incompatible with our standard build environment. If you absolutely must have Go plugin support on Xenial, please contact Tyk support.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}}

## Compiler options

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

## Output filename

Since v4.1.0 the plugin compiler has automatically added the following suffixes to the root filename provided in the `plugin_name` argument:

- `{Gw-version}`: the Tyk Gateway version, for example, `v5.3.0`
- `{OS}`: the target operating system, for example `linux`
- `{arch}`: the target CPU architecture, for example, `arm64`

Thus, if `plugin_name` is set to `plugin.so` then given these example values the output file will be: `plugin_v5.3.0_linux_arm64.so`.

This enables you to have one directory with multiple versions of the same plugin targeting different Gateway versions.

### Cross-compiling for different architectures and operating systems

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

## Experimental options

The plugin compiler also supports a set of environment variables being passed:

- `DEBUG=1`: enables debug output from the plugin compiler process.
- `GO_TIDY=1`: runs go mod tidy to resolve possible dependency issues.
- `GO_GET=1`: invokes go get to retrieve the exact Tyk gateway dependency.

These environment options are only available in the latest gateway and plugin compiler versions.
They are unsupported and are provided to aid development and testing workflows.
