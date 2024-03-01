---
title: "Upgrading Custom Go Plugins"
date: 2024-03-1
tags: ["Upgrade Custom Go Plugins", "Tyk plugins", "Custom Plugins", "Self Managed"]
description: "Explains how to upgrade Go Plugins"
---

To upgrade your custom Go plugins:
- Navigate into the plugins directory that contains your Go module.
- Use the table below to follow the upgrade process for the version of Tyk you are upgrading to:

| Upgrade process | Current Version | Target Version |
|-----------------|-----------------|----------------|
| [1](#path-1)    | < 4.1.0         | < 4.1.0        |
| [2](#path-2)    | < 4.1.0         | >= 5.1.0       |
| [3](#path-3)    | >= 4.1.0        | >= 5.2.5       |

## Initialise plugin for Gateway versions earlier then 4.2.0 {#path-1}
**Path 1** all versions before 4.2.0

```
go get 
github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

# Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

go mod tidy
go mod vendor
```

## Initialise plugin for Gateway versions earlier than 5.1.0 {#path-2}
**Path 2** between Tyk 4.2.0 to 5.1.0

```
go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a

# For Gateway versions earlier than 5.1 using the go mod vendor tool is required
go mod tidy
go mod vendor
```

## Initialise plugin for Gateway v5.1 and above {#path-3}
**Path 3** Tyk version 5.1 and above

```
go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d

# In Gateway version 5.1, the Gateway and plugins transitioned to using Go modules builds and don’t use Go mod vendor anymore
go mod tidy
```

Download the plugin compiler for the target version you’re upgrading to (e.g. 5.2.5).  See the Tyk Docker Hub repo https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags for available versions. 

```
docker pull tykio/tyk-plugin-compiler:v5.2.5

# Once done with all upgrades you can remove the images
docker rmi image_name_or_id
```

Recompile your plugin with this version
```
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.5 plugin.so
```
Example:
{{< img src="/img/upgrade-guides/recompile_plugin.png" 
    alt="Recompile plugin example" width="600" height="auto">}}

### Using Bundles to ship your plugins

Create or update your plugin bundle in your manifest.json file that includes both your current version’s plugin along with the newly compiled version, your manifest.json will look something like this:
```
{
 "file_list": [
    "plugin.so",
    "plugin_v5.2.5_linux_amd64.so"
  ],
  "custom_middleware": {
  "post": [
  {
    "name": "AddFooBarHeader",
  "path": "plugin.so",
    "require_session": false,
    "raw_body_only": false
  }],
  "driver": "goplugin",
  "id_extractor": {
    "extract_from": "",
    "extract_with": "", 
    "extractor_config": {}}
  },
  "checksum": "",
  "signature": ""
}
```
In this example, the **plugin.so** in the file list would be the filename of your current version’s plugin. You will already have this on hand as this is what has been running in your environment.

**plugin_v5.2.5_linux_amd64.so** is the plugin compiled for the target version.  The “_v5.2.5_linux_amd64” is generated automatically by the compiler. 

If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler instead.

### Build the bundle

Using Tyk’s inbuilt bundle cli command to create a .zip file
```
/opt/tyk-gateway/tyk bundle build -m manifest.json -o plugin.zip -y
```
Example:
{{< img src="/img/upgrade-guides/bundle_zip.png" 
    alt="Bundle ZIP example" width="800">}}

Upload the bundle ID in you Dashboard GUI under API settings - Advanced Options

Example:
{{< img src="/img/upgrade-guides/plugin_example.png" 
    alt="Plugin example" width="800">}}

At this stage, even if you are still running on Tyk version 4.0.8, Tyk is smart enough to know which plugin to use within your manifest.json.

Follow the steps below to upgrade your deployment to Tyk 5.2.5 and test your plugin when making the call, it should automatically use the newer version of plugin which is **plugin_v5.2.5_linux_amd64.so**
