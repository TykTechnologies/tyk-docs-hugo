---
date: 2017-03-27T16:13:15+01:00
title: How to run two Gateways with docker-compose
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---


Managing a second Tyk Gateway with our [tyk-pro-docker-demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) is a case of mounting the config file into a new volume and declaring a new gateway service but exposed it on a different port.
You will need to make some minor modifications to docker-compose.yml and docker-local.yml and start your services as usual with `docker-compose -f docker-compose.yml -f docker-local.yml up`.


> **Please note**: This will only work with an appropriate license. The free license is for development purposes and would allow running Tyk's licensed platform with only one Gateway. If you want to test Tyk with more please contact us by this email   <info@tyk.io> and we will be happy to discuss your case and PoC requirements as well as providing a short period license.



1. Add the following to docker-local.yml
    ```yml
     tyk-gateway2:
        volumes:
        - ./confs/tyk.conf:/opt/tyk-gateway/tyk.conf
    ```

2. Add the following to docker-compose.yml (after `tyk-gateway` definition):
```yml
  tyk-gateway2:
     image: tykio/tyk-gateway:latest
     ports:
     - "8081:8080"
     networks:
     - tyk
     depends_on:
     - tyk-redis
```
