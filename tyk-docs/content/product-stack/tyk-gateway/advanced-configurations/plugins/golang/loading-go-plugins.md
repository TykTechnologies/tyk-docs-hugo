---
title: Loading Custom Go Plugins into Tyk
date: 2024-03-01
description: "How to load your custom Go plugins into Tyk"
tags: ["custom plugin", "golang", "go plugin", "middleware"]
---

For development purposes, we are going to load the plugin from local file storage. For production, you can use [bundles](#loading-a-tyk-golang-plugin-from-a-bundle) to deploy plugins to multiple gateways.

In this example we are using a Tyk Classic API. In the API definition find the `custom_middleware` section and make it look similar to the snippet below. Tyk Dashboard users should use RAW API Editor to access this section.

```json
"custom_middleware": {
  "pre": [],
  "post_key_auth": [],
  "auth_check": {},
  "post": [
    {
      "name": "AddFooBarHeader",
      "path": "<path>/plugin.so"
    }
  ],
  "driver": "goplugin"
}
```

Here we have:

- `driver` - Set this to `goplugin` (no value created for this plugin) which says to Tyk that this custom middleware is a Golang native plugin.
- `post` - This is the hook name. We use middleware with hook type `post` because we want this custom middleware to process the request right before it is passed to the upstream target (we will look at other types later).
- `post.name` - is your function name from the Go plugin project.
- `post.path` - is the full or relative (to the Tyk binary) path to the built plugin file (`.so`). Make sure Tyk has read access to this file.

Also, let's set fields `"use_keyless": true` and `"target_url": "http://httpbin.org/"` - for testing purposes. We will test what request arrives to our upstream target and `httpbin.org` is a perfect fit for that.

The API needs to be reloaded after that change (this happens automatically when you save the updated API in the Dashboard).

Now your API with its Golang plugin is ready to process traffic:

```bash
# curl http://localhost:8181/my_api_name/get   
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Foo": "Bar",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
```

We see that the upstream target has received the header `"Foo": "Bar"` which was added by our custom middleware implemented as a native Golang plugin in Tyk.

### Updating the plugin

Loading an updated version of your plugin requires one of the following actions:

- An API reload with a NEW path or file name of your `.so` file with the plugin. You will need to update the API spec section `"custom_middleware"`, specifying a new value for the `"path"` field of the plugin you need to reload.
- Tyk main process reload. This will force a reload of all Golang plugins for all APIs.

If a plugin is loaded as a bundle and you need to update it you will need to update your API spec with a new `.zip` file name in the `"custom_middleware_bundle"` field. Make sure the new `.zip` file is uploaded and available via the bundle HTTP endpoint before you update your API spec.

### Loading a Tyk Golang plugin from a bundle

Currently we have loaded Golang plugins only directly from the file system. However, when you have multiple gateway instances, you need a more dynamic way to load plugins. Tyk offer bundle instrumentation [Plugin Bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}). Using the bundle command creates an archive with your plugin, which you can deploy to the HTTP server (or AWS S3) and then your plugins will be fetched and loaded from that HTTP endpoint.

You will need to set in `tyk.conf` these two fields:

- `"enable_bundle_downloader": true` - enables the plugin bundles downloader
- `"bundle_base_url": "http://mybundles:8000/abc"` - specifies the base URL with the HTTP server where you place your bundles with Golang plugins (this endpoint must be reachable by the gateway)

Also, you will need to specify the following field in your API spec:

`"custom_middleware_bundle"` - here you place your filename with the bundle (`.zip` archive) to be fetched from the HTTP endpoint you specified in your `tyk.conf` parameter `"bundle_base_url"`

To load a plugin, your API spec should set this field like so:

```json
"custom_middleware_bundle": "FooBarBundle.zip"
```

Let's look at `FooBarBundle.zip` contents. It is just a ZIP archive with two files archived inside:

- `AddFooBarHeader.so` - this is our Golang plugin
- `manifest.json` - this is a special file with meta information used by Tyk's bundle loader

The contents of `manifest.json`:

```yaml
{
  "file_list": [
    "AddFooBarHeader.so"
  ],
  "custom_middleware": {
    "post": [
      {
        "name": "AddFooBarHeader",
        "path": "AddFooBarHeader.so"
      }
    ],
    "driver": "goplugin"
  },

  ...
}
```

Here we see:

- field `"custom_middleware"` with exactly the same structure we used to specify `"custom_middleware"` in API spec without bundle
- field `"path"` in section `"post"` now contains just a file name without any path. This field specifies `.so` filename placed in a ZIP archive with the bundle (remember how we specified `"custom_middleware_bundle": "FooBarBundle.zip"`).
