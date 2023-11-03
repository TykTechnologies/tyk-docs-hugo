---
title: Tyk Plugins Marketplace
description: "Contains links to repositories with example plugins"
tags: ["custom", "plugin", "plugins marketplace", "marketplace", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin", "Python", "Javascript", "JVMS"]
---

<!-- Want to try and get a design layout setup for this that uses stylesheets from home page to offer similar layout -->

## Introduction

Welcome to the Tyk Plugins Marketplace, dedicated to providing you with a curated list of resources that showcase how to develop Tyk Plugins. 

[Tyk Plugins]({{< ref "" >}}) are a powerful tool that allows you to develop custom middleware that can intercept requests at different stages of the request lifecycle and modify/transform headers and body content.

Tyk has extensive support for writing custom plugins using a wide range of languages, most notably: Go, Python, Javascript etc. In fact, plugins can be developed using most languages via *gRPC*.

## Blog resources

Here some selected blogs for plugin development.

### 1. [Decoupling micro-services using Message-based RPC](https://medium.com/@asoorm/decoupling-micro-services-using-message-based-rpc-fa1c12409d8f)
- **Summary**: Explains how to write a plugin that intercepts an API request and forwards it to a gRPC server. The gRPC server processes the request and dispatches work to an RabbitMQ message queue. The source code is available in the accompanying [GitHub repository](https://github.com/asoorm/tyk-rmq-middleware)


## GitHub Repositories

Here are some carefully selected GitHub repositories that will help you learn how to integrate and utilise Tyk Plugins in your development projects:
https://github.com/TykTechnologies/custom-go-plugin

### 1. [Tyk Awesome Plugins](https://github.com/TykTechnologies/tyk-awesome-plugins)
- **Description**: Index of plugins developed using a variety of languages.
- **Key Features Demonstrated**: A comprehensive index for a collection of plugins that can be used with the Tyk API Gateway in areas such as: rate limiting, authentication and request transformation. The examples are developed using a diverse array of languages, including but not limited to: Python, JavaScript and Go. This broad language support ensures that developers from different backgrounds and with various language preferences can seamlessly integrate these plugins with their Tyk API Gateway implementations.

### 2. [Custom Plugin Examples](https://github.com/TykTechnologies/custom-plugin-examples/tree/master)
- **Description**: Index of examples for a range of plugin hooks (Pre, Post, Post-Auth and Response) developed using a variety of languages.
- **Key Features Demonstrated**: Specific examples include invoking an AWS lambda, Inserting a new claim into a JWT, inject a signed JWT into authorization header, request header modification. A range of examples are available including Python, Java, Ruby, Javascript, NodeJS and Go.

### 3. [Environment For Plugin Development](https://github.com/TykTechnologies/custom-go-plugin)
- **Description**: Provides a docker-compose environment for developing your own custom plugins.
- **Key Features Demonstrated**: Showcases support for bundling plugins, uploading plugins to AWS S3 storage, test coverage etc.

## Conclusion

[Tyk Plugins]({{< ref "" >}}) is a valuable asset in the Tyk API Platform. Plugins enable you to develop custom middleware for intercepted upstream API requests and responses. The resources included in this Tyk Marketplace serve to help you harness the capabilities and use cases for Tyk Plugins. By exploring these resources and experimenting with the code, you can gain a deeper understanding of how to leverage [Tyk Plugins]({{< ref "" >}}) to build innovative and efficient solutions for your projects.

Happy coding!


