---
date: 2022-07-25
title: Analytics Plugins
menu:
  main:
    parent: "Plugin Types"
weight: 90
---

Since Tyk 4.1.0 we have incorporated analytic plugins which enables editing or removal of all parts of analytics records and raw request and responses recorded by Tyk at the gateway level. This feature leverages existing Go plugin infrastructure.

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The response is received and analytics plugin function is triggered before recording the hit to redis.
- Your plugin modifies the analytics record and sends it back to Tyk.
- Tyk takes the modified analytics record and record the hit in redis.

Example analytics Go plugins can be found [here](https://github.com/TykTechnologies/tyk/blob/master/test/goplugins/test_goplugin.go#L149)

To enable the analytics rewriting functionality, adjust the following in API definition:

```
{
    "analytics_plugin": {
        "enable": true,
        "func_name": "<function name>",
        "plugin_path": "<path>/analytics_plugin.so"
    }
}
```