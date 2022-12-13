---
date: 2017-03-24T13:07:00Z
title: Plugin Bundles
menu:
  main:
    parent: "How To Serve Plugins"
weight: 3 
url: "plugins/how-to-serve-pluginsplugin-bundles"
aliases:
  - /plugins/rich-plugins/plugin-bundles
  - /plugins/how-to-serve/plugin-bundles
---

A plugin bundle is a ZIP file that contains your custom middleware files and its associated configuration block (the `custom_middleware` block). The idea behind plugin bundles is to enhance the process of attaching and loading custom middleware. It allows to avoid duplicating the content of the `custom_middleware` section onto each of your APIs definitions, which is still possible if you do not want to support a bundle server within your global Tyk setup.

### Requirements

A plugin bundle must include a manifest file (called `manifest.json`). The manifest file contains important information like the configuration block and the list of files that will be included as part of the bundle file. If a file isn't specified in the list, it won't be included in the resulting file, even if it's present in the current directory.

### The manifest file

A sample manifest file looks like this:

```{.json}
{
  "file_list": [
    "middleware.py",
    "mylib.py"
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "PreMiddleware"
      }
    ],
    "post": [
      {
        "name": "PostMiddleware"
      }
    ],
    "driver": "python"
  },
  "checksum": "",
  "signature": ""
}
```

You may leave the `checksum` and `signature` fields empty, the bundler tool will fill these during the build process.

The `custom_middleware` block follows the standard syntax we use for Tyk plugins. In Tyk Community Edition, where file-based API configuration is used by default, a `custom_middleware` block is located/added to the API configuration file.

### Bundler tool

The bundler tool is a CLI program that lets you generate these plugin bundles. Please note that the generated bundles must be served using your own web server. See [Downloading and Updating Bundles](#downloading-and-updating-bundles) for more details.

### Bundle security

The bundler tool enables you to sign a bundle using a private key. Tyk configuration may enforce or skip the validation of this signature, depending on the global configuration parameters.

### Getting the bundler tool

After installing any of the Tyk Gateway packages, the program will be located in the following path:

```
/opt/tyk-gateway/utils/tyk-cli
```

You may use the full path to call this program, feel free to create a symbolic link or attach its directory to your `PATH`.

If you're using Tyk 2.8, you will find the Tyk CLI functionality integrated as part of the Tyk binary, run this command to get more details:

```
/opt/tyk-gateway/bin/tyk help bundle
```
{{< note success >}}
**Note**  

For Go developers, If you happen to have a working Go environment setup, you can also fetch the bundler tool using `go get`:

`$ go get github.com/TykTechnologies/tyk-cli`
{{< /note >}}


### Using the bundler tool

This step will assume that you're located in your plugin directory and a valid manifest file is present. The bundle tool provides a `build` command, the most basic usage/syntax looks like this:

```{.copyWrapper}
$ tyk-cli bundle build
```

For Tyk 2.8 (where `tyk` is the gateway binary located in `/opt/tyk-gateway/bin/tyk`):

```{.copyWrapper}
$ tyk bundle build
```

The resulting file will contain all your specified files and a modified `manifest.json` with the right checksum and signature (if required), in ZIP format.

{{< note success >}}
**Note**  

By default, the bundles are signed, if no private key is specified, the program will prompt for a confirmation. Use `-y` to override this (see options below).
{{< /note >}}



The following options are supported:

*   `-output`: Specifies the name of the bundle file e.g. `-output bundle-latest.zip`. If this flag is not specified, `bundle.zip` will be used. 
*   `-y`: Force tool to create unsigned bundle without prompting e.g. `$ tyk-cli bundle build -output bundle-latest.zip -y`.
*   `-key`: Specifies the path to your private key which is used to generate signed bundle e.g. `$ tyk-cli bundle build -output bundle-latest.zip -key mykey.pem`.

### Using a rich plugin bundle

#### Global parameters

To load a bundle plugin the following parameters must be specified in your `tyk.conf`:

```{.copyWrapper}
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

*   `enable_bundle_downloader`: Enables the bundle downloader.
*   `bundle_base_url`: Is a base URL that will be used to download the bundle, in this example we have `bundle-latest.zip` specified in the API settings, Tyk will fetch the following URL: `http://my-bundle-server.com/bundles/bundle-latest.zip` (see the next section for details).
*   `public_key_path`: Sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used.

#### Per API / Local parameters

To use a bundle plugin on one of your specified APIs, you must add the following parameter to its configuration block:

```{.copyWrapper}
"custom_middleware_bundle": "bundle-latest.zip"
```

A complete API Definition would look like:

```{.json}
{
  "name": "Tyk Test API",
  "api_id": "1",
  "org_id": "default",
  "definition": {
    "location": "header",
    "key": "version"
  },
  "auth": {
    "auth_header_name": "authorization"
  },
  "use_keyless": true,
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "expires": "3000-01-02 15:04",
        "use_extended_paths": true,
        "extended_paths": {
          "ignored": [],
          "white_list": [],
          "black_list": []
        }
      }
    }
  },
  "proxy": {
    "listen_path": "/quickstart/",
    "target_url": "http://httpbin.org",
    "strip_listen_path": true
  },
  "custom_middleware_bundle": "bundle-latest.zip"
}
```

## Downloading and Updating Bundles
Tyk will fetch `http://my-bundle-server.com/bundles/bundle-latest.zip` on start. A plugin bundle will be cached after its initial download, if a Tyk reload event occurs, the same contents will be used. If you want to replace it, you must update your API configuration to use a different name and then trigger a reload.

As a suggestion, you may organise this using a Git commit reference or version number, e.g. `bundle-e5e6044.zip`, `bundle-48714c8.zip`, `bundle-1.0.0.zip`, `bundle-1.0.1.zip`, etc.

Alternatively, you may delete the cached bundle from Tyk manually and then trigger a hot reload to tell Tyk to fetch a new one.  By default, Tyk will store downloaded bundles in this path:
` { TYK ROOT } / { CONFIG_MIDDLEWARE_PATH } / bundles `

{{< note success >}}
**Note**  

Remember to set `"enable_coprocess": true` in your `tyk.conf` when using rich plugins!
{{< /note >}}

The bundler tool is an open-source project which you can find on [GitHub](https://github.com/TykTechnologies/tyk-cli).
