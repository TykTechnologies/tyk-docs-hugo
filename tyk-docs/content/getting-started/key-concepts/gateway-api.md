---
date: 2017-03-23T13:04:00Z
title: Gateway API
menu:
  main:
    parent: "Key Concepts"
    identifier: /key-concepts/gateway-api
weight: 95
aliases:
  - /concepts/gateway-api/
---

The [Tyk Gateway REST API]({{ ref "tyk-gateway-api" >}}) is the primary means for integrating your application with the Tyk API Gateway system. This
API is very small, and has no granular permissions system. It is intended to be used **purely** for internal automation
and integration.

{{< warning success >}}
**Warning**  

Under no circumstances should outside parties be granted access to this API.
{{< /warning >}} 

The Tyk Gateway API is capable of:

* Managing session objects (token generation)
* Managing and listing policies
* Managing and listing API Definitions (*only* when not using the Dashboard)
* Hot reloads / reloading a cluster configuration
* OAuth client creation (*only* when not using the Dashboard)

In order to use the Gateway API, you'll need to set the `secret` parameter in your `tyk.conf` file.

The shared secret you set should then be sent along as a header with each REST API Request in order for it to be
successful:

```{.copyWrapper}
x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
```

{{< note success >}}
**Note**  

The Tyk Gateway API is subsumed by the [Tyk Dashboard API]({{< ref "dashboard-api" >}}) in all
non-Community Edition installations.
{{< /note >}}
