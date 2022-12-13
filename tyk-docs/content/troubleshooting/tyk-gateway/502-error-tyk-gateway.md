---
date: 2017-03-27T17:23:51+01:00
title: 502 error in Tyk Gateway
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 5 
---

### Description

Users receive a 502 error in the Gateway.

### Cause

The Gateway received an invalid response from the upstream server. There are number of different configuration settings that could bring about this issue.

### Solution

Try using the following settings in your tyk.conf file:

```{.copyWrapper}
enable_detailed_recording: false, 
enable_jsvm: false,
```


And the following key-value pairs should be set in the relevant API definition:

```{.copyWrapper}
proxy.service_discovery.use_nested_query = false
proxy.service_discovery.use_target_list = true
proxy.service_discovery.endpoint_returns_list = true
proxy.service_discovery.data_path = ""Address”
proxy.service_discovery.port_data_path = “ServicePort""
```
    

See [Tyk Gateway configuration]({{< ref "tyk-oss-gateway-gateway/configuration" >}}) and [Tyk Gateway API]({{ ref "tyk-gateway-api/api-definition-objects" >}}) for further information regarding API definition settings.