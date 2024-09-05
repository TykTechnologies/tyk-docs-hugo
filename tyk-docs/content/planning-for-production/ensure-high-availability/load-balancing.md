---
date: 2017-03-24T10:59:12Z
title: Load Balancing
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Load Balancing"]
description: "How to configure load balancing for your Tyk installation"
menu:
  main:
    parent: "Ensure High Availability"
weight: 2 
aliases:
  - /ensure-high-availability/load-balancing/
---

Tyk supports native round-robin load-balancing in its proxy. This means that Tyk will rotate requests through a list of target hosts as requests come in. This can be very useful in microservice architectures where clusters of specialized services are launched for high availability.

Setting up load balancing is done on a per API basis, and is defined in the API Definition file/object:

*   `proxy.enable_load_balancing`: Set this value to `true` to have a Tyk node distribute traffic across a list of servers.

*   `proxy.target_list`: A list of upstream targets (can be one or many hosts):

```{.copyWrapper}
"target_list": [
  "http://10.0.0.1",
  "http://10.0.0.2",
  "http://10.0.0.3",
  "http://10.0.0.4"
]
```
{{< note success >}}
**Note**  

You must fill in the `target_list` section.
{{< /note >}}


See [Service Discovery]({{< ref "planning-for-production/ensure-high-availability/service-discovery" >}}) to see how you can integrate a service discovery system such as Consul or etcd with Tyk and enable dynamic load balancing support.

### Configure load balancing and weighting via the Dashboard

To set up load balancing via the Dashboard, from the **Core Settings** tab in the **API Designer** select **Enable round-robin load balancing** from the **API Settings** options:

{{< img src="/img/2.10/round_robin.png" alt="Dashboard load balancing configuration" >}}

You can now add your Load Balancing **Upstream targets** and apply weighting to it. For example, for testing purposes, you can send 10% (set weighting to `1`) of traffic to a beta environment, and 90% (set weighting to `9`)to the production environment.

{{< note success >}}
**Note**  

Weighting is new from v1.10 of the Dashboard
{{< /note >}}

## Configure load balancing via Tyk Operator

Load balancing is configured within Tyk Operator, using the following configuration parameters within the proxy configuration block:

- `enable_load_balancing`: Set to `true` to activate load balancing
- `target_list`: Specifies a list of upstream targets

An example is shown below:

```yaml {linenos=table,hl_lines=["14-17"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: enable-load-balancing-rr
spec:
  name: enable-load-balancing-rr
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
    enable_load_balancing: true
    target_list: 
        - "httpbin.org"
        - "httpbingo.org"
```

## gRPC load balancing

You can also perform [gRPC Load balancing]({{< ref "key-concepts/grpc-proxy#grpc-load-balancing" >}}).
