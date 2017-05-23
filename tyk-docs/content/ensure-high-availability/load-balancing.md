---
date: 2017-03-24T10:59:12Z
title: Load Balancing
menu:
  main:
    parent: "Ensure High Availability"
weight: 2 
---

Tyk supports native round-robin load-balancing in its proxy. This means that Tyk will rotate requests through a list of target hosts as requests come in. This can be very useful in microservice architectures where clusters of specialised services are launched for high availability.

Setting up load balancing is done on a per API basis, and is defined in the API Definition file/object:

*   `proxy.enable_load_balancing`: Set this value to `true` to have a Tyk node distribute traffic across a list of servers.

*   `proxy.target_list`: A list of upstream targets (can be one or many hosts):

```
	"target_list": [
	    "http://10.0.0.1",
	    "http://10.0.0.2",
	    "http://10.0.0.3",
	    "http://10.0.0.4"
	]
```

> **Important**: You must fill in the `target_list` section.

See the section on Service Discovery to see how you can integrate a service discovery system such as Consul or etcd with Tyk and enable dynamic load balancing support.

### Configure load balancing via the Dashboard

To set up load balancing via the Dashboard, simply set the above settings in the *Core Settings* tab:

![Dashboard load balancing configuration][1]

 [1]: /docs/img/dashboard/system-management/loadBalancing.png

