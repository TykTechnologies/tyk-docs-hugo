---
date: 2017-03-27T16:13:15+01:00
title: How to run two Gateways with docker-compose
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---


Managing a second Tyk Gateway with our [Tyk Pro Docker Demo]({{< ref "tyk-on-premises/docker/docker-pro-demo" >}}) is a case of mounting the `tyk.conf` file into a new volume and declaring a new Gateway service but exposed on a different port.
You will need to make some minor modifications to `docker-compose.yml` and start your services as usual with `docker-compose up`.

{{< note success >}}
**Note**  

This will only work with an appropriate license. The free license is for development purposes and would allow running Tyk's licensed platform with only one Gateway. If you want to test Tyk with more please contact us by email [info@tyk.io](mailto:info@tyk.io) and we will be happy to discuss your case and PoC requirements as well as providing a short period license.

{{< /note >}}


### Add the following to `docker-compose.yml` (after the `tyk-gateway` definition)

```
tyk-gateway2:
  image: tykio/tyk-gateway:latest
  ports:
  - "8081:8080"
  networks:
  - tyk
  depends_on:
  - tyk-redis
  volumes:
  ./confs/tyk.conf:/opt/tyk-gateway/tyk.conf
```
