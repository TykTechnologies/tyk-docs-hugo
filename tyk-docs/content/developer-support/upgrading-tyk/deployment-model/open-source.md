---
title: Upgrading Tyk Open Source
description: Explain how to upgrade Open-Source
tags: ["upgrade", "upgrading tyk", "upgrading oss", "upgrading pump"]
---

The following guide explains how to upgrade Tyk Gateway when using Docker. For guides of other installation types check
the "Self-manged" section, and look for the instruction regarding Tyk Gateway.

Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [pre-upgrade guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}). Once you
have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this specified
order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

---

## Upgrade order
In a production environment, where we recommend installing the Dashboard, Gateway, and Pump on separate machines, you
should upgrade components in the following sequence:

1. Tyk Gateway
2. Tyk Pump

## 1. Upgrade Tyk Gateway
### Development Environment Upgrade
In a development environment where you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the following command to `v5.1` and run it as follows:

```docker
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.3
```

For full installation details, check the usual [installation page]({{< ref "tyk-oss/ce-docker" >}}).

#### Docker compose upgrade in a simple environment
For non-production environments where brief downtime is acceptable, you can upgrade by simply restarting your gateways.
Follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the `docker-compose.yaml` file.
   <br>
   For example, Tyk Gateway version `4.3.3` is defined in this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4)
   `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want to use.
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
  "version": "5.3.0",
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

### Production Environment Upgrade
1. Backup your Gateway config file
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/)
3. Review and complete the steps outlined in the [pre-upgrade guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}).
4. Define the version in your setup script (for example in `.env` file). The new image will be pulled once it's executed.
If your script is doing `docker pull`, update the version of the gateway in that command to the target version.
5. Check the log to see that the new version is used and if the gateway is up and running
6. Check that the Gateway is healthy using the open */hello* API ( run `curl  localhost:8080/hello | jq .`)

## 2. Upgrade Tyk Pump
Docker Instructions for upgrading *Tyk Pump* is the same as the above for *Tyk Gateway* just with
the name of the docker image of Tyk Pump `tykio/tyk-pump-docker-pub`
