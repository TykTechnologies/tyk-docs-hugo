---
date: 2022-07-25
title: Analytics Plugins
menu:
  main:
    parent: "Plugin Types"
weight: 90
aliases: 
  - /plugins/analytics-plugins
---

Since Tyk 4.1.0 we have incorporated analytic plugins which enables editing or removal of all parts of analytics records and raw request and responses recorded by Tyk at the gateway level. This feature leverages existing Go plugin infrastructure.

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The response is received and analytics plugin function is triggered before recording the hit to redis.
- Your plugin modifies the analytics record and sends it back to Tyk.
- Tyk takes the modified analytics record and record the hit in redis.

Example analytics Go plugins can be found [here](https://github.com/TykTechnologies/tyk/blob/master/test/goplugins/test_goplugin.go#L149)

---

An analytics plugin is configured using the `analytics_plugin` configuration block within an API Definition. This contains the following configuration parameters:

- `enable`: Set to `true` to enable the plugin
- `func_name`: The name of the function representing the plugin
- `plugin_path`: The path to the source code file containing the function that implements the plugin

{{< tabs_start >}}

{{< tab_start "Tyk Gateway" >}}

To enable the analytics rewriting functionality, adjust the following in API definition:

```json
{
    "analytics_plugin": {
        "enable": true,
        "func_name": "<function name>",
        "plugin_path": "<path>/analytics_plugin.so"
    }
}
```

{{< tab_end >}}

{{< tab_start "Tyk Operator" >}}

The example API Definition resource listed below listens on path */httpbin* and forwards requests upstream to *http://httpbin.org*. A Go Analytics Plugin is enabled for function *MaskAnalyticsData*, located within the */opt/tyk-gateway/plugins/example-plugin.so* shared object file.

```yaml {linenos=table,hl_lines=["15-18"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: analytics-plugin
spec:
  name: httpbin-analytics-plugin
  active: true
  protocol: http
  proxy:
    listen_path: /httpbin
    strip_listen_path: true
    target_url: http://httpbin.org
  use_keyless: true
  enable_detailed_recording: true
  analytics_plugin:
    enable: true
    func_name: MaskAnalyticsData # Replace it with function name of your plugin
    plugin_path: /opt/tyk-gateway/plugins/example-plugin.so  # Replace it with path of your plugin file
```

{{< tab_end >}}

{{< tabs_end >}}

---

</br>
