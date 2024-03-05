---
title: "Upgrading Go Plugins On Self Managed - Hybrid"
date: 2024-02-6
tags: ["Upgrade Go Plugins", "Tyk plugins", "Hybrid", "Self Managed"]
description: "Explains how to upgrade Go Plugins on Self Managed (Hybrid)"
---

## Introduction
In a Self-Managed Hybrid deployment, the client hosts both the Control Plane and the Data Plane.  The Control Plane includes the following components: Tyk Dashboard, MongoDB, Redis (Master Instance), Management Gateway, and MDCB.  The Data Plane consists of at least one Hybrid Gateway, a Redis instance, and Tyk Pump (optional).

Upgrade the Control Plane components in the following order:
1. MDCB
2. Tyk Pump (if deployed)
3. Tyk Dashboard
4. Management Gateway.

Upgrade the Data Plane componens in the following order:
1. Go Plugins (if applicable)
2. Hybrid Gateway(s)

## Upgrade MDCB
Follow the instructions for your deployment type:
- Docker
    1. Backup your MDCB config file `tyk_sink.conf`
    2. Update the image version in the docker command or script to the target version
    3. Restart MDCB
- Helm
    1. Backup your MDCB config file `tyk_sink.conf`.  Note this step may not be relevant if you’re exclusively using the environment variables from the `values.yaml` to define your configuration.
    2. Update the image version in your `values.yaml` to the target version
    3. Run helm upgrade with the updated `values.yaml` file
- Other (Linux)
    1. Find the target version you want to upgrade in the Packagecloud repository: https://packagecloud.io/tyk/tyk-mdcb-stable 
    2. Follow the upgrade instructions for your distro
        - RHEL/Centos Upgrade
        ```
        sudo yum upgrade tyk-mdcb-stable-5.0.0
        ```
        - Debian/Ubuntu
        ```
        sudo apt-get install tyk-mdcb-stable-5.0.0
        ``` 

## Upgrade Tyk Pump
Follow the instructions for component deployment type:
- Docker
    1. Back up your Pump config file `pump.conf`
    2. Update the image version in the docker command or script to the target version
    3. Restart the Tyk Pump
- Helm
    1. Backup your Pump config file `pump.conf`. Note this step may not be relevant if you’re exclusively using the environment variables from the `values.yaml` to define your configuration.
    2. Update the image version in your `values.yaml` to the target version
    3. Run helm upgrade with the updated `values.yaml` file
- Other (Linux)
    1. Find the target version you want to upgrade in the Packagecloud repository: https://packagecloud.io/tyk/tyk-pump
    2. Follow the upgrade instructions for your distro
        - RHEL/Centos Upgrade
        ```
        sudo yum upgrade tyk-pump-1.8.1
        ```
        - Debian/Ubuntu
        ```
        sudo apt-get install tyk-pump-1.8.1
        ```
## Upgrade Tyk Dashboard
Follow the instructions for component deployment type: 
- Docker
    1. Backup your Dashboard config file `tyk_analytics.conf`
    2. Update the image version in the docker command or script to the target version
    3. Restart the Tyk Dashboard
- Helm
    1. Backup your Dashboard config file `tyk_analtyics.conf`. Note this step may not be relevant if you’re exclusively using the environment variables from the `values.yaml` to define your configuration.
    2. Update the image version in your `values.yaml` to the target version
    3. Run helm upgrade with the updated `values.yaml` file
- Other (Linux)
    1. Find the target version you want to upgrade in the Packagecloud repository: https://packagecloud.io/tyk/tyk-dashboard
    2. Follow the upgrade instructions for your distro
        - RHEL/Centos Upgrade
        ```
        sudo yum upgrade tyk-pump-5.2.5
        ```
        - Debian/Ubuntu
        ```
        sudo apt-get install tyk-pump-5.2.5 
        ```
## Upgrade Management Gateway
Follow the instructions for component deployment type:
- Docker
    1. Backup your Gateway config file `tyk.conf`
    2. Update the image version in the docker command or script to the target version
    3. Restart the Gateway
- Helm
    1. Backup your Gateway config file `tyk.conf`. Note this step may not be relevant if you’re exclusively using the environment variables from the `values.yaml` to define your configuration.
    2. Update the image version in your `values.yaml` to the target version
    3. Run helm upgrade with the updated `values.yaml` file
- Other (Linux)
    1. Find the target version you want to upgrade in the Packagecloud repository: https://packagecloud.io/tyk/tyk-gateway
    2. Follow the upgrade instructions for your distro
        - RHEL/Centos Upgrade
        ```
        sudo yum upgrade tyk-gateway-5.2.5
        ```
        - Debian/Ubuntu
        ```
        sudo apt-get install tyk-gateway-5.2.5 
        ```
---
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

7. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured bundle server.
> Before executing the next step, upgrade your Hybrid Gateways to the target version.  Otherwise, your Gateway(s) will pull down this bundle that was built with the target version and your plugin(s) will not load due to a version mismatch.
8. Update the `custom_middleware_bundle` field in the relevant API Definitions to use this bundle 

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
8. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured bundle server.  
9. Update the `custom_middleware_bundle` field in the relevant API Definitions to use this bundle 
10. Validate that your plugin is working per your expectations.  
11. Proceed with upgrading your Tyk Data Plane (Hybrid Gateway(s)).  Given that you loaded your target version plugin ahead of time, this version will be loaded automatically once you upgrade.

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

7. [Upload this bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/) to your configured bundle server.  
8. Proceed with upgrading your Tyk Data Plane (Gateway). 
9. Post Upgrade, update the `custom_middleware_bundle` field in the relevant API Definitions to use the new bundle id you received in step 5. 
10. Validate that your plugin is working per your expectations.  
11. Proceed with upgrading your Tyk Data Plane (Hybrid Gateway(s)).  Given that you loaded your target version plugin ahead of time, this version will be loaded automatically once you upgrade.

## Upgrade the Data Plane Hybrid Gateway(s)
Follow the instructions for component deployment type:
- Docker
    1. Backup your Gateway config file `tyk.conf`
    2. Update the image version in the docker command or script to the target version
    3. Restart the Gateway
- Helm
    1. Backup your Gateway config file `tyk.conf`. Note this step may not be relevant if you’re exclusively using the environment variables from the `values.yaml` to define your configuration.
    2. Update the image version in your `values.yaml` to the target version
    3. Run helm upgrade with the updated `values.yaml` file
- Other (Linux)
    1. Find the target version you want to upgrade in the Packagecloud repository: https://packagecloud.io/tyk/tyk-gateway
    2. Follow the upgrade instructions for your distro
        - RHEL/Centos Upgrade
        ```
        sudo yum upgrade tyk-gateway-5.2.5
        ```
        - Debian/Ubuntu
        ```
        sudo apt-get install tyk-gateway-5.2.5 
        ```
