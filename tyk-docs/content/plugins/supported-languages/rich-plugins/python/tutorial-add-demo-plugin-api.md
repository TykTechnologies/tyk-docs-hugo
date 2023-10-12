---
date: 2017-03-24T13:17:31Z
title: Tutorial - Add Python Plugin To Your Gateway
menu:
  main:
    parent: "Python"
weight: 3 
aliases: 
  -  "plugins/supported-languages/rich-plugins/python/tutorial-add-demo-plugin-api"
  -  plugins/rich-plugins/python/tutorial-add-demo-plugin-api
---

## API settings

To add a Python plugin to your API, you must specify the bundle name using the `custom_middleware_bundle` field:

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
  "custom_middleware_bundle": "test-bundle"
}
```

## Global settings

To enable Python plugins you need to add the following block to `tyk.conf`:

```{.copyWrapper}
"coprocess_options": {
  "enable_coprocess": true,
  "python_path_prefix": "/opt/tyk-gateway"
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://dummy-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

`enable_coprocess`: enables the rich plugins feature.

`python_path_prefix`: Sets the path to built-in Tyk modules, this will be part of the Python module lookup path. The value used here is the default one for most installations.

`enable_bundle_downloader`: enables the bundle downloader.

`bundle_base_url`: is a base URL that will be used to download the bundle, in this example we have `test-bundle` specified in the API settings, Tyk will fetch the URL for your specified bundle server (in the above example): `dummy-bundle-server.com/bundles/test-bundle`. You need to create and then specify your own bundle server URL.

`public_key_path`: sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used. 
