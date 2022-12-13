---
title: "Docker"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Docker"]
description: "How to install the open source Tyk Gateway using Docker Compose or as Docker Standalone"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 1
url: "/tyk-oss/ce-docker/"

---

## Introduction

We will show you two methods of installing our Community Edition Gateway on Docker.
The quickest way to get started is using docker-compose. Visit our [Dockerhub](https://hub.docker.com/u/tykio/) to view the official images.

## Prerequisites

The following are required for a Tyk OSS installation:
 - Redis   - required for all Tyk installations.
             Simple redis installation instructions are included below.
 - MongoDB - Required only if you chose to use the MongoDB Tyk pump with your Tyk OSS installation. Same goes with any [other pump]({{< ref "/content/tyk-stack/tyk-pump/other-data-stores.md" >}}) you choose to use.
             
{{< tabs_start >}}
{{< tab_start "Docker Compose" >}}


<br>
We have a Killercoda scenario that walks through installing our Open Source Gateway on Docker:

[Tyk OSS: Deploy on Docker using Docker Compose](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose)

{{< note success >}}
**Note**  

You will need a free Killercoda account to access the scenario.
{{< /note >}}

## Installation 

### Step 1 - Clone the docker-compose repository

```bash
git clone https://github.com/TykTechnologies/tyk-gateway-docker
```

Output:
`Cloning into 'tyk-gateway-docker'...`

### Step 2 - Change to the new directory

```bash
cd tyk-gateway-docker
```

### Step 3 - Deploy Tyk Gateway and Redis

```bash
docker-compose up -d
```
{{< tab_end >}}
{{< tab_start "Docker Standalone" >}}

<br>

### Step 1 - Let's create a network

```.bash
$ docker network create tyk
ab1084d034c7e95735e10de804fc54aa940c031d2c4bb91d984675e5de2755e7
```

### Step 2 - Deploy Redis into the network, with the `6379` port open

```.bash
$ docker run -itd --rm --name redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
ea54db4da4b228b7868449882062a962f75a7b2d43cdb0ac5205fb4ccdbcde23
```

### Step 3 - Next, let's download a JSON `tyk.conf` configuration file. 

```.bash
$ wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
...
2021-01-28 13:05:22 (6.81 MB/s) - ‘tyk.standalone.conf’ saved [1563/1563]
```

### Step 4 - Run the Gateway, mounting the conf file into the container:

```.bash
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```
{{< tab_end >}}
{{< tabs_end >}}

Congratulations, you're done! Your Tyk Gateway is now configured and ready to use.
Confirm this by checking against the 'hello' endpoint:

```bash
curl localhost:8080/hello
```

Output:
`{"status":"pass","version":"v3.2.1","description":"Tyk GW"}`

## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API]({{< ref "getting-started/tutorials/create-api/" >}})
2. [Create a Security Policy]({{< ref "getting-started/tutorials/create-security-policy/" >}})
3. [Create an API Key]({{< ref "getting-started/tutorials/create-api-key/" >}})