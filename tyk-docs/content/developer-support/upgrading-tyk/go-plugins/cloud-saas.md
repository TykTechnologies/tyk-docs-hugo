---
title: "Upgrading Go Plugins On Cloud - SaaS"
date: 2024-02-6
tags: ["Upgrade plugins", "Tyk plugins", "SaaS", "Cloud"]
description: "Explains how to upgrade Go Plugins on Cloud SaaS"
aliases:
  - /developer-support/cloud-saas/
---

## Upgrading your Cloud configuration
After reviewing your upgrade pre-requisites, follow the instructions below to upgrade your Tyk components and plugins. 

## 1. Upgrade your Control Plane
See Tyk Guide for [Upgrading Cloud Control Planes]({{< ref "/tyk-cloud/environments-&-deployments/managing-control-planes#upgrade-control-planes" >}})

## 2. Upgrade your Go Plugins

 | Path | Current Version | Target Version |
 | ---- | --------------- | -------------- |
 | 1    | < 4.1.0         | < 4.1.0        |
 | 2    | < 4.1.0         | \>= 4.1.0      |
 | 3    | \>= 4.1.0       | \>=5.1.0       |

### Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0
 1. Open a terminal/command prompt in the directory of your plugin source file(s)  
 2. Run the following commands to initialize your plugin:
 
 ```
 go get
 github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

 //Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
 go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

 go mod tidy
 go mod vendor
 ```
3. Download the plugin compiler for the target version you’re upgrading to (e.g. 4.0.9).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler) for available versions. 
4. [Build your plugin]({{< ref "plugins/supported-languages/golang#building-the-plugin">}}) with this version 
5. Create a plugin bundle that includes the newly compiled version
{{< img src="img/developer-support/bundle_files_example.png" 
    alt="Bundle ZIP example" width="800">}}
6. Your manifest.json will look something like this:

```
{
  "file_list": [
	"CustomGoPlugin.so"
  ],
  "custom_middleware": {
  "pre": [
  {
    "name": "AddHeader",
    "path": "CustomGoPlugin.so",
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

7. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured S3 bucket.
8. Proceed with [Upgrading your Tyk Data Plane (Gateway)]({{< ref "developer-support/upgrading-tyk/go-plugins/cloud-saas#3-upgrading-cloud-data-planes" >}})
9. [Update]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) the `custom_middleware_bundle` in the relevant API Definitions to use the new bundle id you received in the previous step. 
10. Validate that your plugin is working per your expectations.  

### Path 2 - Current Version < 4.1.0 and Target Version >= 4.1.0 
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialize your plugin:
    - Target Version <= v4.2.0  
    ```
    go get github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5
    # Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
    go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca
    go mod tidy
    go mod vendor
    ```
    - Target Version > v4.20 and < v5.1.
    ```
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
    - Target Version >= v5.1.0
    ```
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```
3. Download the plugin compiler for the target version you’re upgrading to (e.g. 5.1.0).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler) for available versions. 
4. Build your plugin]({{< ref "plugins/supported-languages/golang#building-the-plugin">}}) with this version  
5. Create a plugin bundle that includes both your current version’s plugin along with the newly compiled version
{{< img src="img/developer-support/bundle_files_example.png" 
    alt="Bundle ZIP example" width="800">}}
6. Your manifest.json will look something like this:
```
{
  "file_list": [
	"CustomGoPlugin.so",
	"CustomGoPlugin_v4.3.3_linux_amd64.so"
  ],
  "custom_middleware": {
  "pre": [
  {
    "name": "AddHeader",
    "path": "CustomGoPlugin.so",
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
In this example,  the CustomGoPlugin.so in the file list would be the filename of your current version’s plugin.  You will already have this on hand as this is what has been running in your environment.  The CustomGoPlugin_v4.3.3_linux_amd64.so is the plugin compiled for the target version.  The “_v4.3.3_linux_amd64” is generated automatically by the compiler.  If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler.

7. In the bundle zip file include both the current version and target versions of the plugin.
8. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured S3 bucket.  
9. [Update]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) the `custom_middleware_bundle` in the relevant API Definitions to use the new bundle id you received in the previous step.
10. Validate that your plugin is working per your expectations.  
11. Proceed with [Upgrading your Tyk Data Plane (Gateway)]({{< ref "developer-support/upgrading-tyk/go-plugins/cloud-saas#3-upgrading-cloud-data-planes" >}}).  Given that you loaded your target version plugin ahead of time, this version will be loaded automatically once you upgrade.

### Path 3 - Current Version >= 4.1.0 and Target Version >= 5.1.0
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialize your plugin:
    - Target Version > v4.20 and < v5.1.0
    ```
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
    - Target Version >= v5.1.0
    ```
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```
3. Download the plugin compiler for the target version you’re upgrading to (e.g. 4.3.3).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags) for available versions. 
4. [Build your plugin]({{< ref "plugins/supported-languages/golang#building-the-plugin">}}) with this version 
5. Create a plugin bundle with the newly compiled version
6. Your manifest.json will look something like this:
```
{
  "file_list": [
	"CustomGoPlugin_v4.3.3_linux_amd64.so"
  ],
  "custom_middleware": {
  "pre": [
  {
    "name": "AddHeader",
    "path": "CustomGoPlugin.so",
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
In this example, the CustomGoPlugin_v4.3.3_linux_amd64.so is the plugin compiled for the target version.  The “_v4.3.3_linux_amd64” is generated automatically by the compiler.  If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler. 

7. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured S3 bucket.  
8. Proceed with [Upgrading your Tyk Data Plane (Gateway)]({{< ref "developer-support/upgrading-tyk/go-plugins/cloud-saas#3-upgrading-cloud-data-planes" >}}) 
9. [Update]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) the `custom_middleware_bundle` in the relevant API Definitions to use the new bundle id you received in the previous step.
10. Validate that your plugin is working per your expectations.  

## 3. Upgrade your Cloud Data Plane
See Tyk Guide for [Upgrading Cloud Data Planes]({{< ref "/tyk-cloud/environments-&-deployments/managing-gateways#upgrade-cloud-data-planes" >}})
