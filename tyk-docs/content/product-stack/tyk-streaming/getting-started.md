---
title: Tyk Streams Quick Start
description: Guide for how to quickly get started using Tyk Streaming
tags: [ "streaming", "getting started" ]
---

In this guide, you'll learn how to set up Tyk Streams and configure your first asynchronous API. By the end of this
guide, you will have a fully functional API that allows you to subscribe to a WebSocket and see the messages you post to
Tyk (REST) in real-time.

## Your feedback
Before you start we have a small request -
</br>
Tyk Streams is currently in the
[Lab Release]({{< ref "developer-support/special-releases-and-features/lab-releases">}}) phase. Your feedback is crucial
in helping us improve and shape this capability while it’s still in the making. We'd love your input on your experience
using Tyk Streams, the documentation, learning about your use case, areas for improvement and any other relevant
information you can share with us.
{{< button_left href="https://survey.hsforms.com/1lb_eMrtRR5W3WoEEuACQ2Q3ifmg" color="green" content="Feedback" >}}

---

Let's get started and unlock the power of Tyk for your asynchronous API needs!

## Prerequisites

To get started with Tyk Streams, you will need:
- Docker installed on your machine
- A WebSocket testing tool like [wscat](https://github.com/websockets/wscat) for testing your async APIs

---

## Install Tyk Streams Demo

The [tyk-pro-docker-demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) repository provides a docker compose environment that can be run locally to try out Tyk streams.

### Download

Clone the [tyk-pro-docker-demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) repository using *git* or the *GitHub CLI* command:

##### git

Issue the following *git* command to download the Tyk streams demo:

```bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo
```
##### GitHub CLI

Issue the following *Github CLI* command to download the Tyk streams demo:

```bash
gh repo clone TykTechnologies/tyk-pro-docker-demo
```

### Configure the installation

Once downloaded, create and save a *.env* file with your Tyk Dashboard license key and configure the demo to use the Tyk Streams docker images:

```env
DASH_LICENSE=<paste_your_license_here>
GATEWAY_VERSION="v5.5.0-alpha2"
DASHBOARD_VERSION="s5.5.0-alpha1"
PORTAL_VERSION="v1.10.0-alpha2"
```

Additionally add the following line to `confs/tyk.env`:
```env
 TYK_GW_LABS='{"streaming":{"enabled": true}}'
```
And similar to `confs/tyk_analytics.env`:
```env
 TYK_DB_LABS='{"streaming":{"enabled": true}}'
```


### Start Demo

Start the Tyk Streams demo by issuing the following command:

```bash
./up.sh
```

- Open Tyk Dashboard in your browser by visiting [http://localhost:3000](http://localhost:3000) and login with the provided credentials.

---

## Configuring a Basic Async API

In the Tyk Dashboard, create a new API. Click the *+CONFIGURE API* button to continue.

{{< img src="/img/streams/create-new-api.png" alt="Create New API" width="1000px" >}}

Select *Active* from the *Gateway Status* drop-down list and then select *External* from the *Access* drop-down list.

**Note**: For this example, the *Upstream URL* will not be used, as the streaming server will handle the requests and responses directly. However, a value is still needed to comply with the API definition schema.

Navigate to the *Streaming* section and click on *Add Stream*.

{{< img src="/img/streams/streams.png" alt="Click the Add Stream button" width="1000px" >}}

Provide a name for your stream in the *Stream name* textbox

{{< img src="/img/streams/name-streams.png" alt="Add stream name" width="1000px" >}}

In the *Stream configuration*, define your stream input and output:

```yaml
input:
  http_server:
    path: /post
  label: example_generator_input
output:
  http_server:
    ws_path: /subscribe
  label: example_websocket_output
```

In the above configuration it can be seen that:

- Messages can be posted to the `/<listen-path>/post` endpoint
- Clients can subscribe to messages via WebSocket at the `/<listen-path>/subscribe` endpoint

Save your API definition.

---

## Testing Your Async API

Lets test the async API we just created.

1. Subscribe to the WebSocket using wscat:

```bash
wscat -c ws://localhost:8080/<listen-path>/subscribe
```

2. Post a message to the `/post` endpoint using curl:

```curl
curl -X POST -d '{"message":"Hello, Tyk Streams!"}' http://localhost:8080/<listen-path>/post
```

3. Verify that the message posted in step 1 is received in the *wscat* terminal.

{{< img src="/img/streams/streams-ws-example.png" alt="streams websocket example" width="1000px" >}}

---

## Debugging

If you encounter issues, here are a few things to check:
- Ensure all Docker containers are running correctly
- In case you used this repo before, ensure all Docker images are as defined in the [example env]({{< ref "#configure-the-installation" >}}) above.
- Verify the API definition is properly configured in the Tyk Dashboard
- Check the Tyk Gateway logs for any error messages. Most of the time it'll be syntax errors in the stream configuration. In such case, you might see 404 since the API definition has not been created in Tyk

Since *Tyk Streams* is currently released as a [Lab Release]({{< ref "developer-support/special-releases-and-features/lab-releases" >}}),
if a crash or an issue is encountered then Tyk Gateway can be restarted and the logs can be inspected as follows:

```bash
docker compose restart tyk-gateway
docker compose logs tyk-gateway -f
```

</br>
{{< note success>}}
**You did it!!!**

**You have successfully set up Tyk Streams and created your first async API!**
{{< /note >}}

## Next Steps

- Thanks for getting started with Tyk Streams! Please take a moment to share your thoughts and experiences with us
{{< button_left href="https://survey.hsforms.com/1lb_eMrtRR5W3WoEEuACQ2Q3ifmg" color="green" content="Feedback" >}}

- You can now start exploring [Tyk Stream capabilities]({{< ref "api-management/async-apis/use-cases" >}}) and
[use cases]({{< ref "api-management/async-apis/advanced-use-cases" >}})
