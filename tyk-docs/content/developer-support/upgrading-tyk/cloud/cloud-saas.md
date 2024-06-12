---
title: "Upgrading Tyk On Cloud SaaS"
date: 2024-02-6
tags: ["Upgrade plugins", "Tyk plugins", "SaaS", "Cloud"]
description: "Explains how to upgrade Go Plugins on Cloud SaaS"
aliases:
  - /developer-support/cloud-saas/
---

After reviewing your [upgrade pre-requisites]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}), follow the instructions below to upgrade your Tyk components and plugins. 

## 1. Upgrade your Control Plane
See Tyk Guide for [Upgrading Cloud Control Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-control-planes#upgrade-control-planes" >}})

## 2. Upgrade your Go Plugins

This section explains the process for upgrading your custom Go plugins on Tyk Cloud Saas:

- Navigate into the plugins directory that contains your Go module.
- Use the table below to follow the upgrade path for the version of Tyk you are upgrading to:

 | Upgrade Path | Current Version | Target Version |
 | ---- | --------------- | -------------- |
 | [Path 1](#path-1)    | < 4.1.0         | < 4.1.0        |
 | [Path 2](#path-2)    | < 4.1.0         | \>= 4.1.0      |
 | [Path 3](#path-3)    | \>= 4.1.0       | \>=5.1.0       |

### Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0 {#path-1}
 1. Open a terminal/command prompt in the directory of your plugin source file(s)  
 2. Run the following commands to initialise your plugin:
 
 ```bash
 go get
 github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

 # Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
 go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

 go mod tidy
 go mod vendor
 ```

3. Download the plugin compiler for the target version you’re upgrading to (e.g. for v5.3 `docker pull tykio/tyk-plugin-compiler:v5.3`).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler) for available versions. 
4. [Compile]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler#cross-compiling-for-different-architectures-and-operating-systems" >}}) your plugin using this compiler 
5. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes the newly compiled version

    {{< img src="img/developer-support/path1-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}

    Your manifest.json will look something like this:

    ```json
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

6. [Upload this bundle]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your configured S3 bucket.
7. Proceed with [Upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes)
8. Update the [custom_middleware_bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file you created in step 5.
9. Validate that your plugin is working per your expectations.


### Path 2 - Current Version < 4.1.0 and Target Version >= 4.1.0 {#path-2}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialize your plugin:
    - **Target Version <= v4.2.0**  
    ```bash
    go get github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5
    # Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
    go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca
    go mod tidy
    go mod vendor
    ```
    - **Target Version > v4.20 and < v5.1**
    ```bash
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
    - **Target Version >= v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using
    # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```
3. Download the plugin compiler for the target version you’re upgrading to (e.g. 5.1.0).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler) for available versions. 
4. [Compile]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler#cross-compiling-for-different-architectures-and-operating-systems">}}) your plugin using this compiler
5. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes both your current version’s plugin along with the newly compiled version

    {{< img src="img/developer-support/path2-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}
    
    Your manifest.json will look something like this:

    ```json
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
          "extractor_config": {}
        }
      },
      "checksum": "",
      "signature": ""
    }
    ```

    In this example, the CustomGoPlugin.so in the file list would be the filename of the plugin you're using with your current version.  You will already have this file available as this is what has been running in your environment.  The *CustomGoPlugin_v4.3.3_linux_amd64.so* file represents the plugin compiled for the target version.  The “_v4.3.3_linux_amd64” is generated automatically by the compiler. If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler.

    Your bundle zip file should include both the current version and target versions of the plugin.

6. [Upload this bundle]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your configured S3 bucket.  
7. Update the [custom_middleware_bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file you created in step 5.
8. Ensure that your plugin is functioning as expected, as at this stage, your Gateway will still be running the plugin for the current version.
> This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect. 
9. Proceed with [Upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes). Given that you loaded your target version plugin in step 7, this version will be loaded automatically once you upgrade.
10. Validate that your plugin is working per your expectations, as the Gateway now should have loaded the plugin for the target version automatically.

### Path 3 - Current Version >= 4.1.0 and Target Version >= 5.1.0 {#path-3}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Run the following commands to initialise your plugin:
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using
    # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```
3. Download the plugin compiler for the target version you’re upgrading to (e.g. 5.1.0).  See the Tyk Docker Hub [repo](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags) for available versions. 
4. [Compile]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler#cross-compiling-for-different-architectures-and-operating-systems">}}) your plugin using this compiler
5. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes both your current version’s plugin along with the newly compiled version.

    {{< img src="img/developer-support/path3-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}

    Your manifest.json will look something like this:

    ```json
    {
      "file_list": [
        "CustomGoPlugin_v4.3.3_linux_amd64.so",
        "CustomGoPlugin_v5.1.0_linux_amd64.so"
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
          "extractor_config": {}
        }
      },
      "checksum": "",
      "signature": ""
    }
    ```

    In this example, the *CustomGoPlugin_v5.1.0_linux_amd64.so* file is the plugin compiled for the target version.  The “_v5.1.0_linux_amd64” is generated automatically by the compiler.  If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler. 

6. [Upload this bundle]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your configured S3 bucket.  
7. Update the [custom_middleware_bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file you created in step 5.
8. Validate that your plugin is working per your expectations as at this stage, your Gateway will be running the plugin for your current version still.  
> This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect. 
9. Proceed with [Upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes). Given that you loaded your target version plugin in step 7, this version will be loaded automatically once you upgrade.
10. Validate that your plugin is working per your expectations, as the Gateway now should have loaded the plugin for the target version automatically.

## 3. Upgrade your Cloud Data Plane {#upgrading-cloud-data-planes}
See Tyk Guide for [Upgrading Cloud Data Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways#upgrade-cloud-data-planes" >}})

## Upgrade Guide Video

Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/t0oamm63ae) below for visual guidance:

<div>
<iframe src="https://fast.wistia.net/embed/iframe/t0oamm63ae" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>