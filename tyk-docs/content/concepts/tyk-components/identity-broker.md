---
date: 2017-03-23T13:19:38Z
title: Identity Broker
menu:
  main:
    parent: "Tyk Components"
weight: 4 
---

## What is Tyk Identity Broker ?

The Identity Broker is a microservice portal that provides a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, Github), legacy Basic Authentication providers, to your tyk installation.

TIB can bridge to the Tyk API Gateway, Tyk Portal or even Tyk Dashboard, and makes it easy to integrate custom IDMs to your system in a pluggable way.

The [project is open source][1], and we encourage forking to ensure that your custom requirements can be met.

#### Tyk Identity Broker Flow

The Tyk Identity Broker flow is quite complex, the initial authentication request must go via the broker, before being handled by the gateway:

![Tyk Identity Broker OAuth Flow][2]

[1]: https://github.com/TykTechnologies/tyk-identity-broker
[2]: /docs/img/diagrams/TIB.png

