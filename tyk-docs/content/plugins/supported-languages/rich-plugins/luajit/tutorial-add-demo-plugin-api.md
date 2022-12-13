---
date: 2017-03-24T13:46:17Z
title: Tutorial Add a demo plugin to your API with Lua
menu:
  main:
    parent: "LuaJIT"
weight: 0 
aliases: 
  -  "plugins/supported-languages/rich-plugins/luajittutorial-add-demo-plugin-api"
---

## API settings

To add a Lua plugin to your API, you must specify the bundle name using the `custom_middleware_bundle` field:

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
  "custom_middleware_bundle": "test-bundle",
}
```

## Global settings

To enable Lua plugins you need to add the following block to `tyk.conf`:

```{.copyWrapper}
"coprocess_options": {
  "enable_coprocess": true,
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

`enable_coprocess` enables the rich plugins feature.

`enable_bundle_downloader` enables the bundle downloader.

`bundle_base_url` is a base URL that will be used to download the bundle, in this example we have "test-bundle" specified in the API settings, Tyk will fetch the following URL: `http://my-bundle-server.com/bundles/test-bundle`.

`public_key_path` sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used.

## Running the Tyk Lua build

To use Tyk with Lua support you will need to use an alternative binary, it is provided in the standard Tyk package but it has a different service name.

Firstly stop the standard Tyk version:

```{.copyWrapper}
service tyk-gateway stop
```

and then start the Lua build:

```{.copyWrapper}
service tyk-gateway-lua start
```
