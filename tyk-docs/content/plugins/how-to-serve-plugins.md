---
date: 2020-06-24T12:59:42Z
title: How To Serve Plugins
menu:
  main:
    parent: "Custom Plugins"
url: "plugins/how-to-serve-plugins/"
aliases: 
  -  "/plugins/how-to-serve"
---

If you are using gRPC, [please visit the gRPC section](/plugins/supported-languages/rich-plugins/grpc/), as you don't add plugin files to the Tyk Gateway for it to read, it will simply make a connection to your gRPC server.

**For everything else, there are two ways to add custom plugins:**

1.  Publish the plugin on an HTTP Server so the Gateway can download it. [This is called Bundling.](/plugins/how-to-serve-plugins/plugin-bundles)

2.  Mount your custom plugin on the Gateway's file system.  Find examples under your favorite  programming language under [Supported Languages](../supported-languages)

#### Approach #2 Examples

##### JavaScript pre plugin -  modify header
https://gist.github.com/asoorm/4dd9f4361ad92d2f7201141fc09cbcb1

##### GoLang auth plugin - check User credentials against AWS DynamoDB
https://github.com/TykTechnologies/native-go-auth-middleware