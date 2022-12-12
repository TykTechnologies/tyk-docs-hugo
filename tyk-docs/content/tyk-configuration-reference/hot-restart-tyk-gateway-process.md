---
date: 2017-03-27T16:00:30+01:00
title: Hot restart a Tyk Gateway Process
menu:
  main:
    parent: "Tyk Gateway Configuration Options"
weight: 10 
url: /tyk-configuration-reference/hot-restart-tyk-gateway-process/
---

It is possible to hot-restart a Tyk Gateway process without dropping any connections. This can be useful if you need to load up a new configuration or change a configuration on a production server without losing any traffic.

To hot-restart a Tyk Gateway process, you simply need to send a `SIGUSR2` signal to the process, for example:

```{.copyWrapper}
> sudo kill -SIGUSR2 {gateway-pid}
```

This will fork and load a new process, passing all open handles to the new server and wait to drain the old ones.