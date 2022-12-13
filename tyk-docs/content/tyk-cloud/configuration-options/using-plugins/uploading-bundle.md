---
title: "Uploading Your Bundle"
date: 2020-05-19
tags: ["Tyk Cloud", "Configuration", "Plugins", "Python", "Amazon S3"]
description: "Uploading your Python middleware bundle to an Amazon S3 bucket"
menu:
  main:
    parent: "Python Custom Authentication"
weight: 3
aliases:
    - /python-custom-auth-plugin/uploading-bundle/
---

## Introduction

This page walks you through uploading your bundle as part of the process of Python custom authentication on Tyk Cloud, so that you can ensure your API management solution is as effective as possible.

## How do I upload my bundle file to my Amazon S3 bucket?

We are going to use a Tyk CLI tool called **mservctl**. This acts as a file server for our plugins. You use it to push your plugin bundle to your S3 bucket. Your Tyk Cloud Tyk Gateway will use **MServ** to retrieve your bundle, instead of connecting directly into S3.

### Prerequisites

1. You need to install the mserv binary according to your local environment from the following repo - https://github.com/TykTechnologies/mserv/releases. Linux and MacOS are supported.

2. From your Control Plane you need the following settings.

![File Server Settings](img/plugins/fileserver_settings.png)

   * Your Tyk Cloud Control Plane Ingress File Server Endpoint (1)
   * Your File Server API Key (2)

## How does mservctl work?

You create a config file (in YAML) that contains your Control Plane settings that connects to your S3 bucket. You then use a `push` command to upload your `bundle.zip` file to your bucket.

#### mservctl settings - Mac

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.macos.amd64
```
#### mservctl settings - Linux

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.linux.amd64
```

The help for mservctl will be displayed. We will be using the config file options for this tutorial.

```.bash
$ mservctl help
mservctl is a CLI application that enables listing and operating middleware in an Mserv instance.
Use a config file (by default at $HOME/.mservctl.yaml) in order to configure the Mserv to use with the CLI.
Alternatively pass the values with command line arguments, e.g.:
$ mservctl list -e https://remote.mserv:8989
Set TYK_MSERV_LOGLEVEL="debug" environment variable to see raw API requests and responses.
Usage:
  mservctl [command]
Available Commands:
  delete      Deletes a middleware from mserv
  fetch       Fetches a middleware record from mserv
  help        Help about any command
  list        List middleware in mserv
  push        Pushes a middleware to mserv
Flags:
      --config string     config file (default is $HOME/.mservctl.yaml)
  -e, --endpoint string   mserv endpoint
  -h, --help              help for mservctl
  -t, --token string      mserv security token
Use "mservctl [command] --help" for more information about a command.
```

{{< note success >}}
**Note**
  
You may have to change the CHMOD settings on the binary to make it executable. (`chmod +x <filename>`). On MacOS you may also need to change your security settings to allow the binary to run.
{{< /note >}}

## Creating the mserv config file

1. Create a file (we'll call it `python-demo.mservctl.yaml`)
2. Copy your Control Plane File Server endpoint URL and use it for your `endpoint` flag. Remember to prepend it with `https://`.
3. Copy your File Server API Key and use it for your `token` flag

Your `python-demo.mservctl.yaml` config file should now look like this:

```.yaml
endpoint: https://agreeable-native-mgw.usw2.ara-staging.tyk.technology/mserv
token: eyJvcmciOiI1ZWIyOGUwY2M3ZDc4YzAwMDFlZGQ4ZmYiLCJpZCI6ImVmMTZiNGM3Y2QwMDQ3Y2JhMTAxNWIyOTUzZGRkOWRmIiwiaCI6Im11cm11cjEyOCJ9
```

### Uploading To Your S3 Bucket

1. We are going to use the MacOS binary here, just substitute the binary name for the Linx version if using that OS. Note we have our YAML config file in the same directory as our bundle.zip file. Run the following mserv `push` command:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml push ~/my-tyk-plugin/bundle.zip
```
2. You should get confirmation that your middleware has been uploaded to your S3 bucket.

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
Middleware uploaded successfully, ID: 9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b
```
3. You will notice that the middleware uploaded has been given an ID. We are going to use that ID with an API that allows you to specify specific middlware. You can also check the contents of the middleware you have just uploaded using the mservctl `list` command. Run:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list
```

4. You will see the list of middleware you have pushed to your S3 Bucket

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  ```
5. If you use the -f flag with the list command, you will see the functions within your middleware listed:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list -f
```
6. As you can see, the 2 middleware hooks specified within your `manifest.json` are returned:

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE               FUNCTION          TYPE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  MyPostMiddleware  Post
  MyAuthMiddleware  CustomKeyCheck
```

Next you will [create an API]({{ ref "tyk-cloud/configuration-options/using-plugins/api-test" >}}) from our Control Plane and see our middleware in action.