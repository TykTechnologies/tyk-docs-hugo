---
title: "Docker"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Docker"]
description: "How to install the open source Tyk Gateway using Docker Compose or as Docker Standalone"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 1

---

We will show you two methods of installing our Community Edition Gateway on Docker.
The quickest way to get started is using docker-compose. Visit our [Dockerhub](https://hub.docker.com/u/tykio/) to view the official images.

## Prerequisites

The following are required for a Tyk OSS installation:
 - Redis   - Required for all Tyk installations.
             Simple Redis installation instructions are included below.
 - MongoDB - Required only if you chose to use the MongoDB Tyk Pump with your Tyk OSS installation. Same goes with any [other pump data stores]({{< ref "tyk-stack/tyk-pump/other-data-stores.md" >}}) you choose to use.

## How To Install?

**Step 1 - Create a network**

```bash
docker network create tyk
```

**Step 2 - Deploy Redis into the network, with the `6379` port open**

```bash
docker run -itd --rm --name tyk-redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
```

**Step 3 - Next, let's download a JSON `tyk.conf` configuration file**

```bash
wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
```

**Step 4 - Run the Gateway, mounting the conf file into the container**

```bash
docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```

Congratulations, you're done!




## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by making a network request to the 'hello' endpoint:

```console
curl localhost:8080/hello
```

Output should be similar to that shown below:
```json
{"status":"pass","version":"v3.2.1","description":"Tyk GW"}
```


## Next Steps

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API]({{< ref "getting-started/create-api" >}})
2. [Create a Security Policy]({{< ref "getting-started/create-security-policy" >}})
3. [Create an API Key]({{< ref "getting-started/create-api-key" >}})
