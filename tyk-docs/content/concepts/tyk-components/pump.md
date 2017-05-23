---
date: 2017-03-23T13:17:43Z
title: Pump Component
menu:
  main:
    parent: "Tyk Components"
weight: 3 
---

## What is Tyk Pump ?

Tyk Pump is a micro-service supplied with the Tyk Platform to move analytics data from your front-end gateways to a data sink of your choice.

Its primary use is to ensure that analytics data reaches the Dashboard, however it also has plugins for CSV export and ElasticSearch.

When deployed as part of a standard installation, Tyk Pump moves data between Redis and MongoDB.

Tyk Pump can be horizontally scaled without causing duplicate data.

Tyk Pump is an open-source project from the team here at Tyk and you can find it’s GitHub repository [here][1].

![Tyk Pump Data Transport Service][2]

 [1]: https://github.com/TykTechnologies/tyk-pump
 [2]: /docs/img/diagrams/pump.png

