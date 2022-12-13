---
title: "Using Plugins"
date: 2020-04-28
weight: 3
tags: ["Tyk Cloud", "Configuration", "Plugins", "Python", "JSVM", "Golang"]
description: "How to use custom plugins with Tyk Cloud"
menu:
  main:
    parent: "Configuration Options"
url: /tyk-cloud/using-plugins
---

## Introduction

This page explains that you can use plugins with Tyk Cloud and links to details of Python, JSVM and Golang based plugins.

Tyk Cloud allows you to take advantage of Tyk's plugin architecture that allows you to write powerful middleware. For this version of Tyk Cloud, we support the use of Python, JavaScript Middleware and Golang based plugins.

For more details, see: 
* [Python Plugins]({{ ref "plugins/supported-languages/rich-plugins/python/python" >}})
* [JSVM]({{ ref "plugins/supported-languages/javascript-middleware" >}})
* [Golang]({{ ref "plugins/supported-languages/golang" >}})

Next you'll set up an Tyk Cloud Control Plane to use a Python Authentication Plugin.