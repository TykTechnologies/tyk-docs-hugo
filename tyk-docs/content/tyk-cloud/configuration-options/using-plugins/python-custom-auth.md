---
title: "Python Custom Authentication"
date: 2020-04-28
tags: ["Tyk Cloud", "Configuration", "Plugins", "Python"]
description: "Creating a custom Python authentication plugin"
menu:
  main:
    parent: "Using Plugins"
weight: 1
aliases:
    - /using-plugins/python-custom-auth-plugin/
---

## Introduction

This page introduces the process of configuring a custom authentication plugin, so that you can override the default Tyk authentication mechanism with your own authentication logic. 

## What are we going to do?

We are going to configure an Tyk Cloud Control Plane to use a custom authentication plugin built in Python.

## What do I need to configure the Tyk Cloud Control Plane?

Here are the requirements:

1. Firstly you will need a local Tyk Gateway installation that allows you to create your Python plugin bundle. We recommend [installing our On-Premises version on Ubuntu Bionic 18.04]({{< ref "getting-started/installation/with-tyk-on-premises/on-ubuntu/" >}}).
2. Ensure you have a currently stable [Python 3.x version](https://www.python.org/downloads/) installed 
3. You need install the build tools `apt-get install -y build-essential`
4. Install our required modules:

```{.copyWrapper}
apt install python3 python3-dev python3-pip
pip3 install protobuf grpcio
```

Next you'll [set up a Control Plane]({{< ref "tyk-cloud/configuration-options/using-plugins/setup-control-plane/" >}}) to support plugins
