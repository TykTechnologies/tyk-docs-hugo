---
date: 2017-03-27T15:58:49+01:00
title: Configure your Gateway from the Dashboard
menu:
  main:
    parent: "Configure"
weight: 9 
---

As of v2.3 it is possible to configure your Gateways via the Dashboard. This particular feature can be disabled to avoid dangerous configuration settings being undertaken on a production environment, but can be useful in test environments where it is faster to just make changes via the Dashboard instead of via the shell.

### How it works

When a Tyk Gateway registers with the Dashboard, it also sends a scrubbed version of its configuration to the Dashboard (this excludes sensitive data such as secrets and passwords). This configuration can then be used from the Dashboard in a JSON editor and sent back to the Gateway via the Redis pub-sub mechanism.

When the Gateway receives its new configuration, it verifies the data against its public key to ensure that the configuration is valid, and then writes it to disk (backing up the existing configuration).

The Gateway will then call the `SIGUSR2` signal on itself and hot-restart.

All of these steps will be notified in the Dashboard as events.

### Enabling the feature

By default his feature is disabled at the Gateway level, to enable it, you must set the value of `allow_remote_config` set to `true`.