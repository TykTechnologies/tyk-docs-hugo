---
date: 2017-03-23T13:12:42Z
title: Gateway Component
menu:
  main:
    parent: "Tyk Components"
    identifier: gateway-component
weight: 1 
---

## What is the Tyk Gateway?

The primary application for Community Edition users and Pro users alike, the Tyk Open Source API Gateway does all the heavy lifting of actually managing your requests: traffic proxying, access control, data transformation, logging and more.

The Tyk Gateway can run completely independently, requiring only a Redis database to be effective, and can scale horizontally:

![Tyk Open Source PI Gateway Standard CE Deployment][1]

The Tyk Gateway will take inbound requests, run them through a set of middleware components which apply transforms and any other service-specific operations, and then proxy the request out again to the origin, intercepting the response, running a set of response middleware and then returning.

Tyk can also run dynamic middleware components written in JavaScript, and from v2.3 other languages, at either end of the built-in middleware.

 [1]: /docs/img/diagrams/gateway3.png