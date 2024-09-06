---
date: 2017-03-24T13:07:00Z
title: Plugin Bundles
description: "Describes How To Serve Plugins to Tyk Gateway using a plugin server"
tags: ["plugins", "tyk plugins", "tyk bundle"]
aliases:
  - /plugins/rich-plugins/plugin-bundles
  - /plugins/how-to-serve/plugin-bundles
---

For Tyk Gateway to execute local custom plugins during the processing of API requests and responses, the plugin source code must be loaded into the Gateway. The source is usually stored in files and the API definition is used to point the Gateway at the correct file for each [plugin type]({{< ref "plugins/plugin-types/plugintypes" >}}). To simplify the management of plugins, you can group (or *bundle*) multiple plugin files together in a ZIP file that is referred to as a *plugin bundle*.

## When To Use Plugin Bundles

Plugin bundles are intended to simplify the process of attaching and loading custom middleware. Multiple API definitions can refer to the same plugin bundle (containing the source code and configuration) if required. Having this common, shared resource avoids you from having to duplicate plugin configuration for each of your APIs definitions. 

## How Plugin Bundles Work

The source code and a [manifest file](#manifest) are bundled into a zip file and uploaded to an external remote web server. The manifest file references the source code file path and the function name within the code that should be invoked for each [plugin type]({{< ref "plugins/plugin-types/plugintypes" >}}). Within the API definition, custom plugins are configured simply using the name of the bundle (zip file). Tyk Gateway downloads, caches, extracts and executes plugins from the downloaded bundle according to the configuration in the manifest file. 

{{< img src= "/img/plugins/plugin-bundles-overview.png" alt="plugin bundles architectural overview" >}}

### Caching plugin bundles

Tyk downloads a plugin bundle on startup based on the configuration in the API definition, e.g. `http://my-bundle-server.com/bundles/bundle-latest.zip`. The bundle contents will be cached so that, when a Tyk reload event occurs, the Gateway does not have to retrieve the bundle from the server again each time. If you want to use a different bundle then you must update your API to retrieve a different bundle filename and then trigger a reload. It is not sufficient simply to replace the bundle file on your server with an updated version with the same name - the caching ensures this will not be retrieved during a reload event.

As a suggestion, you may organize your plugin bundle files using a Git commit reference or version number, e.g. `bundle-e5e6044.zip`, `bundle-48714c8.zip`, `bundle-1.0.0.zip`, `bundle-1.0.1.zip`, etc.

Alternatively, you may delete the cached bundle from Tyk manually and then trigger a hot reload to tell Tyk to fetch a new one.  By default, Tyk will store downloaded bundles in this path:
`{ TYK_ROOT } / { CONFIG_MIDDLEWARE_PATH } / bundles`

### Gateway configuration

To configure Tyk Gateway to load plugin bundles the following parameters must be specified in your `tyk.conf`:

```yaml
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

- `enable_bundle_downloader`: Enables the bundle downloader.
- `bundle_base_url`: A base URL that will be used to download the bundle. For example if we have `bundle-latest.zip` specified in the API definition, Tyk will fetch the following file: `http://my-bundle-server.com/bundles/bundle-latest.zip` (see the next section for details).
-  `public_key_path`: Sets a public key, used for verifying signed bundles. If unsigned bundles are used you may omit this.

{{< note success >}}
**Note**  

Remember to set `"enable_coprocess": true` in your `tyk.conf` when using [rich plugins]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})!
{{< /note >}}

### The manifest file {#manifest}

A plugin bundle must include a manifest file (called `manifest.json`). The manifest file contains important information like the configuration block and the list of source code files that will be included as part of the bundle file. If a file isn't specified in the list, it won't be included in the resulting file, even if it's present in the current directory.

A sample manifest file looks like this:

```json
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

---

### Creating plugin bundles

Tyk provides the Bundle CLI tool as part of the `tyk` binary. For further details please visit the [Bundle CLI tool]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/bundle-cli" >}}) page.

---

## Next Steps

If you’re using Tyk OAS APIs, then you can find details of how to configure your API to use plugin bundles [here]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/oas" >}}).

If you're using Tyk Classic APIs, then you can find details of how to configure your API to use plugin bundles [here]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/classic" >}}).