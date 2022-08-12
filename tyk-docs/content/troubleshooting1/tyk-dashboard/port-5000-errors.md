---
date: 2017-03-27T19:26:54+01:00
title: Port 5000 Errors in the Browser Console
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 6 
---

 > **NOTE**: Port 5000 is no longer required from v2.9.3.

### Description

You see a lot of `net::ERR_CONNECTION_REFUSED` errors in the browser console.

### Cause

The Dashboard is trying to connect to `https://<Your Dashboard URL>:5000/socket.io/?chan=ui_notifications` and you don't have port 5000 open.

### Solution

Port 5000 is used for WebSocket connections for real-time Dashboard notifications. You can change the port by changing the default `notifications_listen_port` in your `tyk_analytics.conf`. Otherwise you can ignore the errors in the browser console.

{{< note success >}}
**Note**  

Port 5000 is only required if you need to enable the Tyk Gateway log viewer.
{{< /note >}}