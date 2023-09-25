---
date: 2017-03-27T16:37:14+01:00
title: How to backup Tyk
description: Explain about backing up Tyk's config files, important especially before changes or upgrades
tags: ["config file", "backup tyk", "tyk.conf", "upgrade"]
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Please make sure to update the following, depending on your deployment (Tyk open source, Tyk Self-Managed, MDCB, Tyk Cloud Hybrid gateways):
1. [Redis](https://redis.io/docs/management/persistence/). Backup Redis is important as all of the keys used by *Tyk Gateway* are stored there and Redis, as an in-memory data store, is ephemeral and doesn't have a built-in default backup policy.
2. [MongoDB](https://www.mongodb.com/docs/manual/core/backups/)
3. Backup the config files of all your Tyk components, which means
  Tyk Gateway - `tyk.conf`
  Tyk Dashboard - `tyk_analytics.conf`
  Tyk Pump - `pump.conf`
  MDCB - `tyk_sink.conf`
  *Note:* You might have different names for your config files

If you have all of these you should be able to easily boot a new version in the same state that it was in before the backup and have all tokens still working.
