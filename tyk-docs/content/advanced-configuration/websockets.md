---
date: 2017-03-24T12:52:17Z
title: WebSockets
menu: 
  main:
    parent: "Advanced Configuration"
weight: 6 
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

We will be using the [Postman WebSocket Echo Service](https://blog.postman.com/introducing-postman-websocket-echo-service/) to test the connection.

### Step 1. Setup the API in Tyk

Create a new API in Tyk. For this demo we are going to select Open (Keyless) as the **Authentication mode**.

Set the **Target URL** to `wss://ws.postman-echo.com/raw`


### Step 2. Test the Connection

1. From Postman, select **File > New > WebSocket Request** (or from **Workspace > New > WebSocket Request** if using the web based version).

{{< img src="/img/dashboard/system-management/postman-websocket-request.png" alt="Postman WebSocket Request" >}}

2. Enter your Tyk API URL in the **Enter server URL** field (minus the protocol).
3. Enter some text in the **New Message** field and click **Send**.
4. You will see a successful connection.

{{< img src="/img/dashboard/system-management/postman-websocket-test.png" alt="Postman WebSocket Connection Result" >}}

{{< note success >}}
**Note**  

If your API uses an Authentication mode other than Open (Keyless), add the details in the Header tab. 
{{< /note >}}

An example Header configuration for using an Authentication Token with an API:

{{< img src="/img/dashboard/system-management/websocket-auth-token.png" alt="Postman WebSocket Connection Result with Authorization token" >}}

See the [Access an API]({{< ref "/content/getting-started/create-api-key.md" >}}) tutorial for details on adding an Authentication Token to your APIs.