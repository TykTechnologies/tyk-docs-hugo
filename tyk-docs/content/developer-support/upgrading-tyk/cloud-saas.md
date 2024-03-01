---
title: "Upgrading Go Plugins On Cloud - SaaS"
date: 2024-02-6
tags: ["Upgrade plugins", "Tyk plugins", "SaaS", "Cloud"]
description: "Explains how to upgrade Go Plugins on Cloud SaaS"
---

## Upgrading your Cloud configuration

After reviewing your upgrade pre-requesites, follow the instructions below to upgrade your Tyk components and plugins. 

## Upgrading the Control Planes
 1. Log in to Cloud Provisioning Portal.
 2. Go to Control Plane (Dashboard) settings using the Edit Control Planes  instructions and scroll down to the Version section.
 3. Select a Bundle Channel.
 4. Next, select a Bundle Version.
 5. To apply your changes, click the “Save and Re-Deploy” button. After a few seconds, you will be redirected to the overview page of the Control Plane and a “Deploying” indicator button will appear.
 6. A “Deployed” button indicates a successful upgrade. 

## Upgrading Cloud Data Planes

 1.  Go to the Cloud Data Plane settings using the Edit Cloud Data Planes instructions and scroll down to the Version setting.
 2. Select a Bundle Channel.
 3. Next, select a Bundle Version. 
 4. To apply your changes, click the “Save and Re-Deploy” button. After a few seconds, you will be redirected to the overview page of the Control Plane and a “Deploying” indicator button will appear.
 5. A “Deployed” button indicates a successful upgrade. 



## Upgrading Custom Go Plugins

 | Path | Current Version | Target Version |
 | ---- | --------------- | -------------- |
 | 1    | < 4.1.0         | < 4.1.0        |
 | 2    | < 4.1.0         | \>= 4.1.0      |
 | 3    | \>= 4.1.0       | \>=5.1.0       |

### Path 1 - Upgrading Go Plugins (Before Upgrading Tyk Gateway)
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
4. Compile your plugin using this compiler
5. Create a plugin bundle that includes the newly compiled version
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
8. Proceed with upgrading your Tyk Data Plane (Gateway)
9. Post Upgrade, update the “custom_middleware_bundle” field in the relevant API Definitions to use the new bundle id you received in step 5. 
10. Validate that your plugin is working per your expectations.  

### Path 2 - Upgrading Go Plugins (Before Upgrading Tyk Gateway) 
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
4. Compile your plugin with this version 
5. Create a plugin bundle that includes both your current version’s plugin along with the newly compiled version
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
9. Update the “custom_middleware_bundle” field in the relevant API Definitions to use this bundle 
10. Validate that your plugin is working per your expectations.  
11. Proceed with upgrading your Tyk Data Plane (Gateway).  Given that we loaded your target version plugin ahead of time, this version will be loaded automatically once you upgrade.

### Path 3 - Upgrading Go Plugins (Before Upgrading Tyk Gateway)
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
4. Compile your plugin with this version 
5. Create a plugin bundle that includes the newly compiled version
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
8. Proceed with upgrading your Tyk Data Plane (Gateway). 
9. Post Upgrade, update the “custom_middleware_bundle” field in the relevant API Definitions to use the new bundle id you received in step 5. 
10. Validate that your plugin is working per your expectations.  
