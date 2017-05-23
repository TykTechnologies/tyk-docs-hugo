---
date: 2017-03-27T17:23:51+01:00
title: 502 error in Tyk Gateway
menu:
  main:
    parent: "Tyk Gateway"
weight: 5 
---

### Description

Users receive a 502 error in the Gateway.

### Cause

The Gateway received an invalid response from the upstream server. There are number of different configuration settings that could bring about this issue.

### Solution

Try using the following settings in your tyk.conf file:

    enable_detailed_recording: false, 
    enable_jsvm: false,
    

And the following key-value pairs should be set in the relevant API definition:

    proxy.service_discovery.use_nested_query = false
    proxy.service_discovery.use_target_list = true
    proxy.service_discovery.endpoint_returns_list = true
    proxy.service_discovery.data_path = ""Address”
    proxy.service_discovery.port_data_path = “ServicePort""
    

Further details on Gateway configuration settings can be found [at this link][1] and further information regarding API definition settings can be found [here][2].

 [1]: /configure/tyk-gateway-configuration-options/
 [2]: /tyk-rest-api/api-definition-object-details/