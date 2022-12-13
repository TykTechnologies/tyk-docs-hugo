---
date: 2017-03-24T13:04:21Z
title: ID Extractor
menu:
  main:
    parent: "Authentication Plugins"
weight: 3
aliases:
  - /customise-tyk/plugins/rich-plugins/id-extractor/
  - /plugins/rich-plugins/id-extractor
---

## Introduction

The ID extractor is a caching mechanism that's used in combination with Tyk Plugins. It is used specifically with plugins that implement custom authentication mechanisms.

We use the term "ID" to describe any key that's used for authentication purposes.

When a custom authentication mechanism is used, every API call triggers a call to the associated middleware function, if you're using a gRPC-based plugin this translates into a gRPC call. If you're using a native plugin -like a Python plugin-, this involves a Python interpreter call.

The ID extractor works for all rich plugins: gRPC-based plugins, Python and Lua.

## When to use the ID Extractor?

The main idea of the ID extractor is to reduce the number of calls made to your plugin and cache the API keys that have been already authorised by your authentication mechanism. This means that after a successful authentication event, subsequent calls will be handled by the Tyk Gateway and its Redis cache, resulting in a performance similar to the built-in authentication mechanisms that Tyk provides.

## When does the ID Extractor Run?

When enabled, the ID extractor runs right before the authentication step, allowing it to take control of the flow and decide whether to call your authentication mechanism or not.

If my ID is cached by this mechanism and my plugin isn't longer called, how do I expire it?
When you implement your own authentication mechanism using plugins, you initialise the session object from your own code. The session object has a field that's used to configure the lifetime of a cached ID, this field is called `id_extractor_deadline`. See [Plugin Data Structures]({{< ref "plugins/rich-plugins/rich-plugins-data-structures/" >}}) for more details. 
The value of this field should be a UNIX timestamp on which the cached ID will expire, like `1507268142958`. It's an integer.

For example, this snippet is used in a NodeJS plugin, inside a custom authentication function:

```
// Initialize a session state object
  var session = new tyk.SessionState()
  // Get the current UNIX timestamp
  var timestamp = Math.floor( new Date() / 1000 )
  // Based on the current timestamp, add 60 seconds:
  session.id_extractor_deadline = timestamp + 60
  // Finally inject our session object into the request object:
  Obj.session = session
```

If you already have a plugin that implements a custom authentication mechanism, appending the `id_extractor_deadline` and setting its value is enough to activate this feature.
In the above sample, Tyk will cache the key for 60 seconds. During that time any requests that use the cached ID won't call your plugin.

## How to enable the ID Extractor

The ID extractor is configured on a per API basis.
The API should be a protected one and have the `enable_coprocess_auth` flag set to true, like the following definition:

```{json}
{
  "name": "Test API",
  "api_id": "my-api",
  "org_id": "my-org",
  "use_keyless": false,
  "auth": {
      "auth_header_name": "Authorization"
  },
  "proxy": {
      "listen_path": "/test-api/",
      "target_url": "http://httpbin.org/",
      "strip_listen_path": true
  },
  "enable_coprocess_auth": true,
  "custom_middleware_bundle": "bundle.zip" 
}
```

If you're not using the Community Edition, check the API settings in the dashboard and make sure that "Custom Auth" is selected.

The second requirement is to append an additional configuration block to your plugin manifest file, using the `id_extractor` key:

```{json}
{
  "custom_middleware": {
    "auth_check": { "name": "MyAuthCheck" },
    "id_extractor": {
      "extract_from": "header",
      "extract_with": "value",
      "extractor_config": {
        "header_name": "Authorization"
      }
    },
    "driver": "grpc"
  }
}
```

*   `extract_from` specifies the source of the ID to extract.
*   `extract_with` specifies how to extract and parse the extracted ID.
*   `extractor_config` specifies additional parameters like the header name or the regular expression to use, this is different for every choice, see below for more details.


## Available ID Extractor Sources

### Header Source

Use this source to extract the key from a HTTP header. Only the name of the header is required:

```{json}
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "value",
    "extractor_config": {
      "header_name": "Authorization"
    }
  }
}
```

### Form source

Use this source to extract the key from a submitted form, where `param_name` represents the key of the submitted parameter:


```{json}
{
  "id_extractor": {
    "extract_from": "form",
    "extract_with": "value",
    "extractor_config": {
      "param_name": "my_param"
    }
  }
}
```


## Available ID Extractor Modes

### Value Extractor

Use this to take the value as its present. This is commonly used in combination with the header source:

```{json}
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "value",
    "extractor_config": {
      "header_name": "Authorization"
    }
  }
}
```

### Regular Expression Extractor

Use this to match the ID with a regular expression. This requires additional parameters like `regex_expression`, which represents the regular expression itself and `regex_match_index` which is the item index:

```{json}
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "regex",
    "extractor_config": {
      "header_name": "Authorization",
      "regex_expression": "[^-]+$",
      "regex_match_index": 0
    }
  }
}
```

Using the example above, if we send a header like `prefix-d28e17f7`, given the regular expression we're using, the extracted ID value will be `d28e17f7`.

## Example Session
Here's an example of a Session being built in GoLang custom middleware:
```{.copyWrapper}
extractorDeadline := time.Now().Add(time.Second * 5).Unix()
object.Session = &coprocess.SessionState{

        LastUpdated: time.Now().String(),
        Rate: 5,
        Per:  10,
        QuotaMax:            int64(0),
        QuotaRenews:         time.Now().Unix(),
        Metadata: map[string]string{
            "token": "my-unique-token",
        },
        ApplyPolicies: ["5d8929d8f56e1a138f628269"],
    }
```
[source](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt/blob/master/main.go#L102)

Note: When using an ID Extractor, you must set a `LastUpdated` or else token updates will not be applied.  If you don't set an ID Extractor, Tyk will store session information in the cache based off the `token` field that is set in the metadata.
