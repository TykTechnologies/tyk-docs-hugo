---
date: 2024-08-20T13:32:12Z
title: Bundler CLI Tool
description: "Explains usage of the bundler CLI tool"
tags: [ "Tag TODO" ]
---

The bundler tool is a CLI service, provided by *Tyk Gateway* as part of its binary since v2.8. This lets you generate [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}). Please note that the generated plugin bundles must be served using your own web server.

Issue the following command to see more details on the `bundle` command:

```bash
/opt/tyk-gateway/bin/tyk bundle -h
```

### Creating a plugin bundle

Run the following command to create the bundle:

```bash
$ tyk bundle build
```

The resulting file will contain all your specified files and a modified `manifest.json` with the checksum and signature (if required) applied, in ZIP format.

{{< note success >}}
**Note**  

By default, Tyk will attempt to sign plugin bundles for improved security. If no private key is specified, the program will prompt for a confirmation. 
Use `-y` to override this (see options below).
{{< /note >}}

Instructions on how to create plugin bundles is displayed by issuing the following command:

```bash
/opt/tyk-gateway/bin/tyk bundle build -h
```

The following options are supported:

-   `--output`: Specifies the name of the bundle file e.g. `--output bundle-latest.zip`. If this flag is not specified, `bundle.zip` will be used. 
-   `-y`: Force tool to create unsigned bundle without prompting e.g. `$ tyk bundle build --output bundle-latest.zip -y`.
-   `--key`: Specifies the path to your private key which is used to generate signed bundle e.g. `$ tyk bundle build --output bundle-latest.zip --key=mykey.pem`.
