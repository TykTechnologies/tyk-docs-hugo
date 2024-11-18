---
title: "Upgrade Go Plugins On Tyk Cloud"
date: 2024-13-6
tags: [ "Upgrade plugins", "Tyk plugins", "SaaS", "Cloud", "Deploy Go Plugins" ]
description: "Explains how to upgrade Go Plugins on Cloud SaaS"
---

This guide explains how to deploy your custom Go plugins on Tyk Cloud:
1. Navigate into the plugins directory that contains your Go module
2. [Compile your custom Go plugins]({{< ref "/developer-support/upgrading-tyk/go-plugins" >}}).
3. Use the table below to follow the deployment process for the version of Tyk you are upgrading to:

| Path | Current Version | Target Version |
| ---  | --- | --- |
| [Path 1](#path-1)    | < 4.1.0 | < 4.1.0 |
| [Path 2](#path-2)    | >= 4.1.0 | >= 4.2.0 |

## Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0 {#path-1}

1. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes the newly compiled version

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

2. [Upload this bundle]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your configured S3 bucket if using Cloud SaaS. If you're using Hybrid SaaS, upload this bundle to your bundle server.


## Path 2 - Current Version >= 4.1.0 and Target Version >= 4.2.0 {#path-2}

1. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes both your current version’s plugin along with the newly compiled version

    {{< img src="img/developer-support/path2-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}
    
    Your `manifest.json` will look something like this:

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
    In this example -
    - the *CustomGoPlugin.so* in the file list would be the filename of the plugin you're using with your
    current version.  You will already have this file available as this is what has been running in your environment.
    - The *CustomGoPlugin_v4.3.3_linux_amd64.so* file represents the plugin compiled for the target version.
    - *“_v4.3.3_linux_amd64”* postfix is generated automatically by the compiler. If your target version was 5.2.0,
    then *“_v5.2.0_linux_amd64”* would be appended to the shared object filename that the compiler creates
    - Your bundle zip file should include both the current version and target versions of the plugin.

2. [Upload this bundle]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your configured S3 bucket if using Cloud SaaS. If you're using Hybrid SaaS, upload this bundle to your bundle server.