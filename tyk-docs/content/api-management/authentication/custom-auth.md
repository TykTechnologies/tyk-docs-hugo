---
title: Custom Authentication
description: "How to implement custom authentication in Tyk using Go plugins, Python CoProcess, and JSVM plugins."
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Go Plugins", "Python CoProcess", "JSVM Plugin"]
keywords: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Go Plugins", "Python CoProcess", "JSVM Plugin"]
aliases:
  - /basic-config-and-security/security/authentication-authorization/go-plugin-authentication
  - /basic-config-and-security/security/authentication-authorization/python-etc-plugin-authentication
---

## Go Plugins

Go Plugin Authentication allows you to implement custom authentication logic using the Go programming language. This method is useful for scenarios where you need to implement specialized authentication mechanisms that are not natively supported by Tyk.
To learn more about using Tyk Golang Plugins, go [here]({{< ref "api-management/plugins/golang" >}})

## Use Python CoProcess and JSVM Plugin Authentication

Tyk allows for custom authentication logic using Python and JavaScript Virtual Machine (JSVM) plugins. This method is useful for implementing unique authentication mechanisms that are tailored to your specific requirements.

* See [Custom Authentication with a Python plugin]({{< ref "api-management/plugins/rich-plugins#custom-authentication-plugin-tutorial" >}}) for a detailed example of a custom Python plugin.
* See [JavaScript Middleware]({{< ref "api-management/plugins/javascript#" >}}) for more details on using JavaScript Middleware. 

