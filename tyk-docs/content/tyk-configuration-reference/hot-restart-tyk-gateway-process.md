---
date: 2017-03-27T16:00:30+01:00
title: Hot restart a Tyk Gateway Process
description: Explains how to restart a Tyk Gateway process without dropping any connections
tags: ["reload", "hot reload", "SIGUSR2"]
aliases:
  - /tyk-rest-api/hot-reload/

---

It is possible to hot-restart a Tyk Gateway process without dropping any connections. This can be useful if you need to load up a new configuration or change a configuration on a production server without losing any traffic.

To hot-restart a Tyk Gateway process, you simply need to send a `SIGUSR2` signal to the process, for example:

```bash
> sudo kill -SIGUSR2 {gateway-pid}
```

This will fork and load a new process, passing all open handles to the new server and wait to drain the old ones.