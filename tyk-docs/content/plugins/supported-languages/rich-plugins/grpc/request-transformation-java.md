---
date: 2017-03-24T13:28:45Z
title: Create a Request Transformation Plugin with Java
menu:
  main:
    parent: "gRPC"
weight: 3 
aliases: 
  -  "/plugins/rich-plugins/grpc/request-transformation-java"
---

This tutorial will guide you through the creation of a gRPC-based Java plugin for Tyk.
Our plugin will inject a header into the request before it gets proxied upstream. For additional information about gRPC, check the official documentation [here](https://grpc.io/docs/guides/index.html).

The sample code that we'll use implements a request transformation plugin using Java and uses the proper gRPC bindings generated from our Protocol Buffers definition files.

## Requirements

- Tyk Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here][1] for more installation options.
- The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli][2].
- In Tyk 2.8 the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
- Gradle Build Tool: https://gradle.org/install/.
- gRPC tools: https://grpc.io/docs/quickstart/csharp.html#generate-grpc-code
- Java JDK 7 or higher.

## Create the Plugin

### Setting up the Java Project

We will use the Gradle build tool to generate the initial files for our project:

```bash
cd ~
mkdir tyk-plugin
cd tyk-plugin
gradle init
```

We now have a `tyk-plugin` directory containing the basic skeleton of our application.

Add the following to `build.gradle`

```{.copyWrapper}
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath 'com.google.protobuf:protobuf-gradle-plugin:0.8.1'
  }
}

plugins {
  id "com.google.protobuf" version "0.8.1"
  id "java"
  id "application"
  id "idea"
}

protobuf {
  protoc {
    artifact = "com.google.protobuf:protoc:3.3.0"
  }
  plugins {
    grpc {
      artifact = 'io.grpc:protoc-gen-grpc-java:1.5.0'
    }
  }
  generateProtoTasks {
    all()*.plugins {
      grpc {}
    }
  }
  generatedFilesBaseDir = "$projectDir/src/generated"
}

sourceCompatibility = 1.8
targetCompatibility = 1.8

mainClassName = "com.testorg.testplugin.PluginServer"

repositories {
  mavenCentral()
}

dependencies {
  compile 'io.grpc:grpc-all:1.5.0'
}

idea {
  module {
    sourceDirs += file("${projectDir}/src/generated/main/java");
    sourceDirs += file("${projectDir}/src/generated/main/grpc");
  }
}
```

### Create the Directory for the Server Class

```bash
cd ~/tyk-plugin
mkdir -p src/main/java/com/testorg/testplugin
```

### Install the gRPC Tools

We need to download the Tyk Protocol Buffers definition files, these files contains the data structures used by Tyk. See [Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) for more information:

```bash
cd ~/tyk-plugin
git clone https://github.com/TykTechnologies/tyk
mv tyk/coprocess/proto src/main/proto
```

### Generate the Bindings

To generate the Protocol Buffers bindings we use the Gradle build task:

```bash
gradle build
```

If you need to customise any setting related to the bindings generation step, check the `build.gradle` file.

### Implement Server

We need to implement two classes: one class will contain the request dispatcher logic and the actual middleware implementation. The other one will implement the gRPC server using our own dispatcher.

From the `~/tyk-plugin/src/main/java/com/testorg/testplugin` directory, create a file named `PluginDispatcher.java` with the following code:

```java
package com.testorg.testplugin;

import coprocess.DispatcherGrpc;
import coprocess.CoprocessObject;

public class PluginDispatcher extends DispatcherGrpc.DispatcherImplBase {

  @Override
  public void dispatch(CoprocessObject.Object request,
        io.grpc.stub.StreamObserver<CoprocessObject.Object> responseObserver) {
    CoprocessObject.Object modifiedRequest = null;

    switch (request.getHookName()) {
      case "MyPreMiddleware":
        modifiedRequest = MyPreHook(request);
      default:
      // Do nothing, the hook name isn't implemented!
    }

    // Return the modified request (if the transformation was done):
    if (modifiedRequest != null) {
      responseObserver.onNext(modifiedRequest);
    };

    responseObserver.onCompleted();
  }

  CoprocessObject.Object MyPreHook(CoprocessObject.Object request) {
    CoprocessObject.Object.Builder builder = request.toBuilder();
    builder.getRequestBuilder().putSetHeaders("customheader", "customvalue");
    return builder.build();
  }
}
```

In the same directory, create a file named `PluginServer.java` with the following code. This is the server implementation:

```java
package com.testorg.testplugin;

import coprocess.DispatcherGrpc;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PluginServer {

  private static final Logger logger = Logger.getLogger(PluginServer.class.getName());
  static Server server;
  static int port = 5555;

  public static void main(String[] args) throws IOException, InterruptedException {
    System.out.println("Initializing gRPC server.");

    // Our dispatcher is instantiated and attached to the server:
    server = ServerBuilder.forPort(port)
            .addService(new PluginDispatcher())
            .build()
            .start();

    blockUntilShutdown();

  }

  static void blockUntilShutdown() throws InterruptedException {
      if (server != null) {
          server.awaitTermination();
      }
  }
}
```

To run the gRPC server we can use the following command:

```bash
cd ~/tyk-plugin
gradle runServer
```

The gRPC server will listen on port 5555 (as defined in `Server.java`). In the next steps we'll setup the plugin bundle and modify Tyk to connect to our gRPC server.


## Bundle the Plugin

We need to create a manifest file within the `tyk-plugin` directory. This file contains information about our plugin and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to contain the following:

```json
{
  "custom_middleware": {
    "driver": "grpc",
    "pre": [{
        "name": "MyPreMiddleware"
    }]
  }
}
```

- The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `pre` hook for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher-hooks" >}}).
- The `name` field references the name of the function that we implemented in our plugin code - `MyPreMiddleware`. This will be handled by our dispatcher gRPC method in `PluginServer.java`.

To bundle our plugin run the following command in the `tyk-plugin` directory. Check your tyk-cli install path first:

```bash
/opt/tyk-gateway/utils/tyk-cli bundle build -y
```

For Tyk 2.8 use:
```bash
/opt/tyk-gateway/bin/tyk bundle build -y
```

A plugin bundle is a packaged version of the plugin. It may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. 

For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#using-the-bundler-tool" >}}).

You should now have a `bundle.zip` file in the `tyk-plugin` directory.

## Publish the Plugin

To publish the plugin, copy or upload `bundle.zip` to a local web server like Nginx, or Apache or storage like Amazon S3. For this tutorial we'll assume you have a web server listening on `localhost` and accessible through `http://localhost`.

{{< include "grpc-include" >}}


## <a name="next"></a>What's Next?

In this tutorial we learned how Tyk gRPC plugins work. For a production-level setup we suggest the following:

- Configure an appropriate web server and path to serve your plugin bundles.

[1]: https://tyk.io/docs/get-started/with-tyk-on-premise/installation/
[2]: https://github.com/TykTechnologies/tyk-cli
[3]: /img/dashboard/system-management/api_settings.png
[4]: /img/dashboard/system-management/plugin_options.png
