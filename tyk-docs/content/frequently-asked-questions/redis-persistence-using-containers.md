---
date: 2017-03-27T16:30:52+01:00
title: Redis persistence using containers
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Use case: Keep my data persistent at Docker container restart

The Multi-Cloud Redis container is ephemeral, it isn't configured for persistence because it would very quickly get very large (Docker containers in general should really be considered as ephemeral).

If using Redis with Multi-Cloud we strongly recommend using an external Redis database.

There are no settings for Redis available via environment variable, you would need to mount a new `redis.conf` into the container to customize the configuration, but again, we don't recommend it.