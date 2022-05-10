---
date: 2017-03-27T15:47:05+01:00
title: Tyk Pump Graceful Shutdown
tags: ["Tyk Pump", "Shutdown", "Configuration"]
description: "Using Environment Variables to configure your Tyk Pump"
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 7
---

From version 1.5.0, Tyk Pump has a new mechanism which is called Pump’s Graceful Shutdown.

**What does Pump’s Graceful Shutdown mean exactly?**

That means that now, when Tyk Pump gets stopped or restarts, it is going to wait until the current purge cycle finishes, determined by `purge_delay` configuration. It is also going to flush all the data of the pumps that have an inner buffer.

**Why are we doing that?**

We are adding this mechanism since we were losing data on Kubernetes environments or ephemeral containers, whenever a pump instance finishes. Now, with this change, we aren't going to lose analytics records anymore.

**When is it triggered?**

This is triggered when Tyk Pump catches one of the following signals from the OS:

- `os.Interrupt, syscall.SIGINT`
- `syscall.SIGTERM`

When the signal is `SIGKILL`, it will not gracefully stop its execution.

**What pumps are affected?**

The main affected pumps are:
- `ElasticSearch`
- `dogstatd`
- `Influx2`

As they all have some kind of in-memory buffering before sending the data to the storage. With this new mechanism, all those pumps are going to flush their data before finishing the Tyk Pump process.
Furthermore, in a certain way, this new feature affects all the rest of the pumps since Tyk Pump is now going to wait to finish the purge cycle per se, like the writing of the records in all the configured storages.
