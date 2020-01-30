---
date: 2017-03-24T12:52:17Z
title: WebSockets
menu: 
  main:
    parent: "Advanced Configuration"
url: "/advanced-configuration/websockets"
weight: 5  
---

As from Tyk gateway v2.2, Tyk supports transparent WebSocket connection upgrades. To enable this feature, set the `enable_websockets` value to `true` in your `tyk.conf` file.

WebSocket proxying is transparent, Tyk will not modify the frames that are sent between client and host, and rate limits are on a per-connection, not per-frame basis.

The WebSocket upgrade is the last middleware to fire in a Tyk request cycle, and so can make use of HA capabilities such as circuit breakers and enforced timeouts.

Tyk needs to decrypt the inbound and re-encrypt the outbound for the copy operations to work, Tyk does not just pass through the WebSocket. When the target is on default SSL port you must explicitly specify the target url for the API:

```{.copyWrapper}
https://target:443/
```

## WebSocket Example

We are going to set up Tyk with a WebSocket proxy using our [Tyk Pro Docker Demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) installation.

We will be using http://websocket.org/echo.html to test the connection.

### Step 1. Setup the API in Tyk

Create a new API in Tyk. For this demo we are going to select Open (Keyless) as the **Authentication mode**.

Set the **Target URL** to `ws://echo.websocket.org`

This gives you a **Gateway URL** of: `http://tyk-test.com:8080/websocket/`

We will change `http` to `ws` in the websocket.org test site.

### Step 2. Test the Connection

From http://websocket.org/echo.html enter the following in the **Location** field.

`ws://www.tyk-test.com:8080/websocket/`

Enter some text in the **Message** field, and click **Send**. You should see your sent message in the **Log** field.

![WebSocket Test](/docs/img/dashboard/system-management/websocket_test.png)