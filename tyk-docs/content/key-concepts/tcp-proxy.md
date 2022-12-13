---
title: "TCP Proxy"
date: 2019-09-23T10:28:52+03:00
weight: 11
menu:
  main:
    parent: "Key Concepts"
url: "/key-concepts/tcp-proxy"
---

### Using Tyk as a TCP Proxy

Tyk can be used as a reverse proxy for your TCP services. It means that you can put Tyk not only on top of your APIs, but on top of **any** network application, like databases, services using custom protocols and etc.

#### Set via your API

In order to enable TCP proxying, set the `protocol` field either to `tcp` or `tls`. In the case of TLS, you can also specify a `certificate` field with a certificate ID or path to it.

Similar to above, the proxy target scheme should be set to `tcp://` or `tls://`, depending if you upstream secured by TLS or not.

The simplest TCP API definition looks like this:

{
  "listen_port": 30001,
  "protocol": "tls",
  "certificate": ["<cert-id>"],
  "proxy": {
    "target_url": "tls://upstream:9191"
  }
}

#### Set via your Dashboard

From the **API Designer > Core Settings** tab, select the appropriate protocol from the Protocol field drop-down list.

Enter the network port number in the **Port** field.

If using TLS you can also add a PEM formatted SSL certificate in the **Upstream Certificates** section from the **Advanced Options** tab.

![Protocol](img/2.10/protocol_and_port.png)

Tyk supports multiplexing based on certificate SNI information, which means that you can have multiple TCP services on the **same port**, served on different domains. Additionally all services on the same port, should share the same protocol: either `tcp`, `tls`, `http` or `https`.

If Tyk sits behind another proxy, which has  the PROXY protocol enabled, you can set `enable_proxy_protocol` to `true`. 

As for features such as load balancing, service discovery, Mutual TLS (both authorisation and communication with upstream), certificate pinning, etc. All work exactly the same way as for your HTTP APIs. 

### Allowing specific ports

By default, you will not be able to run a service on a custom port, until you allow the required ports. 
Since TCP services can be configured via the Dashboard, you should be careful who can create such services, and which ports they an use. Below is an example of allowing ports in `tyk.conf`:

```
{
  ...
  "ports_whitelist": {
    "https": {
      "ranges": [
        {
          "from": 8000,
          "to": 9000
        }
      ]
    },
    "tls": {
      "ports": [
        6000,
        6015
      ]
    }
  }
  ...
}
```

As you can see, you can use either `ranges` or `ports` directives (or combine them). 

You can also disable this behaviour and allow any TCP port by setting `disable_ports_whitelist` to `true`.


### Health checks

TCP health checks are configured the same way as HTTP ones.
The main difference that instead of specifying HTTP request, you should specify list of commands, which send data or expect some data in response. 

A simple health check which verifies only connectivity (e.g. if port is open), can be: 

```{.copyWrapper}
{
...
	"uptime_tests": {
	  "check_list": [
	    { "url": "127.0.0.1:6379" },
        "commands": []
	  ]
	}
...
}
```

#### Complex example

Here is quite complex example of using health checks, which shows a Redis Sentinel setup. In this configuration we put TCP proxy, e.g. Tyk, on top of two or more Redis nodes, and the role of the proxy will be always direct user to Redis master. To do that we will need to perform health checks against each Redis node, to detect if it is a master or not. In other words, Redis clients who communicate with Redis though the proxy, will be always directed to the master, even in case of failover. 

```{.copyWrapper}
{
   "name": "Redis Sentinel",
   "listen_port": 6379,
   "protocol": "tcp",
   "enable_load_balancing": true,
   "proxy": {
	   "target_list": ["192.168.10.1:6379", "192.168.10.2:6379"]
	},
   "check_host_against_uptime_tests": true,
   "uptime_tests": {
       "check_list": [
          {
			"url": "192.168.10.1:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          },
          {
			"url": "192.168.10.2:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          }
       ]
   }
}
```

At the moment Tyk supports only 2 commands:
 - `send`  send string to server
- `expect`  expect string from the server


[1]: /img/dashboard/system-management/api-protocol.png
