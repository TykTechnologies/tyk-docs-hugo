---
title: "Upgrade Docker"
date: 2024-05-13
tags: ["Upgrade Docker", "Docker"]
description: "Explains how to upgrade Docker"
---


## Development Environment Upgrade
In a development environment where you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the following command to `v5.1` and run it as follows:

```console
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.1
```

For full details, check the usual [installation page]({{< ref "tyk-oss/ce-docker" >}}) under *Docker standalone* tab.

#### Docker compose upgrade in a simple environment
When upgrading a non-production environment where it's okay to have a brief downtime and you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the `docker-compose.yaml` file. 
   <br>
   For example, this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4) has this line `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want to use.
3. Restart the gateway (or stop and start it)
```console
$ docker compose restart 
```
4. Check the log to see that the new version is used and if the gateway is up and running
5. Check that the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.1.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

## Production Environment Upgrade
1. Backup your Gateway config file
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/)
3. Check the log to see that the new version is used and if the gateway is up and running
4. Check that the Gateway is healthy
