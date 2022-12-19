---
date: 2017-03-24T13:21:13Z
title: gRPC Performance
menu:
  main:
    parent: "gRPC"
weight: 0 
aliases: 
  - "/plugins/rich-plugins/grpc/performance"
---

These are some benchmarks performed on gRPC plugins.

gRPC plugins may use different transports, we've tested TCP and Unix Sockets.

## TCP

{{< img src="/img/diagrams/tcpResponseTime.png" alt="TCP Response Times" >}}

{{< img src="/img/diagrams/tcpHitRate.png" alt="TCP Hit Rate" >}}

## Unix Socket

{{< img src="/img/diagrams/unixResponseTime.png" alt="Unix Socket Response Times" >}}


{{< img src="/img/diagrams/unixHitRate.png" alt="Unix Socket Hit Rate" >}}
