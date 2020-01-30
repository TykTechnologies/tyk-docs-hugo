---
date: 2017-03-23T13:07:27Z
title: Tyk Components
menu:
  main:
    parent: "Getting Started"
weight: 1
url: "/getting-started/tyk-components"
---

A full Tyk stack consists of multiple components working together, the three most important ones are:

* **Tyk Gateway**: This does all the heavy lifting, and is the actual proxy doing all of the work.
* **Tyk Dashboard**: This is the GUI to control your Tyk Gateways and to view analytics with, as well as an extended
  Dashboard REST API that enables granular integration.
* **Tyk Pump**: A data processor that moves analytics data from your Gateways (Redis) into other data sinks, most
  importantly MongoDB for the dashboard to process.

The following sections will outline in detail all of the Tyk components and how they operate together.
