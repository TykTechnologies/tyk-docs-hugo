---
title: "MongoDB"
date: 2022-09-08
tags: ["MongoDB", "Production", "Database"]
description: ""
menu:
  main:
    parent: "Database Settings"
weight: 2
---

### Supported Versions

Please check [here]({{< ref "tyk-dashboard/database-options.md" >}}) for the supported MongoDB versions.

### Split out your DB

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB/PostgreSQL live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB or PostgreSQL cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions
