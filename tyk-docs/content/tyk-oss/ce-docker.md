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

```.console
$ docker network create tyk
ab1084d034c7e95735e10de804fc54aa940c031d2c4bb91d984675e5de2755e7
```

**Step 2 - Deploy Redis into the network, with the `6379` port open**

```.console
$ docker run -itd --rm --name redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
ea54db4da4b228b7868449882062a962f75a7b2d43cdb0ac5205fb4ccdbcde23
```

**Step 3 - Next, let's download a JSON `tyk.conf` configuration file**

```.console
$ wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
...
2021-01-28 13:05:22 (6.81 MB/s) - ‘tyk.standalone.conf’ saved [1563/1563]
```

**Step 4 - Run the Gateway, mounting the conf file into the container**

```.console
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```

Congratulations, you're done!

We also offer a [Killercoda scenario](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose) that walks through installing our Open Source Gateway using Docker Compose.

<br>

{{< note success >}}
**Note**  

You will need a free [Killercoda](https://killercoda.com/) account to access the scenario.
{{< /note >}}


## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by making a network request to the 'hello' endpoint:

```.console
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