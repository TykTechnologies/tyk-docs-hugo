---
date: 2017-03-23T13:07:27Z
title: Tyk Components
menu:
  main:
    parent: "Concepts"
weight: 1
url: "/concepts/tyk-components"
---

A full Tyk stack consists of multiple components working together, the three most important ones are:

* **Tyk Gateway**: This does all the heavy lifting, and is the actual proxy doing all the work
* **Tyk Dashboard**: This is the GUI to control your gateways and view analytics, as well as an extended Dashboard REST API that enables granular integration
* **Tyk Pump**: A data processor that moves analytics data from your Gateways (Redis) into other data sinks, most importantly MongoDB for the dashboard to process.
The following sections will outline in detail show all of the Tyk component operate.
