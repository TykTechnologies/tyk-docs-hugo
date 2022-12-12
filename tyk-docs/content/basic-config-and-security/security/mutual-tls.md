---
title: Mutual TLS
tags: ["mTLS"]
description: "How Tyk supports mutual TLS"
menu:
  main:
    parent: "Security"
weight: 2
aliases:
    - /basic-config-and-security/security/tls-and-ssl/mutual-tls/
    - /security/tls-and-ssl/mutual-tls/
url: "/basic-config-and-security/security/mutual-tls"
---

The main requirement to make it work is that SSL traffic should be terminated by Tyk itself. If you are using a load balancer, you should configure it to work in TCP mode.

## How Tyk Supports mutual TLS 

Tyk has support for mutual TLS in the following areas:

* [Client mTLS](./client-mtls)
* [Upstream mTLS](./upstream-mtls)

### mTLS for cloud users:
- Cloud users can secure their upstream services with mTLS but mTLS between the client (caller of the API) and Tyk's gateway cannot be done for the time being.
- Multi cloud users - since you own and manage the gateways, you can use mTLS for gateway <--> upstream  as well as client <--> gateway connections.

Before going into details about each of these areas, let's [describe the basic building blocks](./concepts) used to make it work.