---
date: 2017-03-24T12:52:17Z
title: Websockets
menu:
  main:
    parent: "Other Protocols"
weight: 0 
---

As of Tyk gateway v2.2, Tyk supports transparent websocket connection upgrades, to enable this feature, ensure that the `enable_websockets` value is set to `true` in your `tyk.conf` file.

Websocket proxying is transparent, Tyk will not modify the frames that are sent between client and host, and rate limits are on a per-connection, not per-frame basis.

The websocket upgrade is the last middleware to fire in a Tyk request cycle, and so can make use of HA capabilities such as circuit breakers and enforced timeouts.

Tyk needs to decrypt the inbound and re-encrypt the outbound for the copy operations to work, Tyk does not just pass through the socket. When the target is on default SSL port you must explicitly specify the target url for the API:

```{.copyWrapper}
https://target:443/
```

