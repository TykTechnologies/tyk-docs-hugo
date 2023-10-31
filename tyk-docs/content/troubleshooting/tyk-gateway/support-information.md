---
title: Support Information
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 8
---

When contacting support, you may be asked to supply extra information and supply log files, etc, so we can quickly handle your request. Questions may include:

* "Can you send us your log files"
* "Can you change the logging detail level"
* "What version of Tyk are you on"
* "What profiling information can I get"


This page will let you know how to get the above info to us.

## Log Files

### Where do I find my log files?

The Gateway will log its output to `stderr` and `stdout`. In a typical installation, these will be handled or redirected by the service manager running the process, and depending on the Linux distribution, will either be output to `/var/log/` or `/var/log/upstart`.

Tyk will try to output structured logs, and so will include context data around request errors where possible.

### How do I increase Logging Verbosity?

You can set the logging verbosity in two ways:

 1. Via an Environment Variable to affect all Tyk components
 2. Just for the Gateway via your `tyk.conf` config file  

### Setting via Environment Variable

The environment variable is `TYK_LOGLEVEL`.

By default, the setting is `info`. You also have the following options:

* `debug`
* `warn`
* `error`

You will be advised by support which setting to change the logging level to.

#### For the Gateway

You can set the logging level in your `tyk.conf` by adding the following:

```{.copyWrapper}
  "log_level": "info",
```

By default, the setting is `info`. You also have the following options:

* `debug`
* `warn`
* `error`

You will be advised by support which setting to change the logging level to.

## Tyk Version

For support requests it is beneficial to provide more information about
your Gateway build. These pinpoint the exact Gateway build that is in
use.

- If you're running a recent version >= 5.2.3, running `tyk version` prints out detailed information about the Gateway binary, including the Go version it was built with, the operating system and architecture.
detailed information about the gateway binary, including the go version
it was built with, the operating system and architecture.

- If you're running an an older version < 5.2.3, `tyk --version` prints out the release version for your gateway binary.
release version for your gateway binary.

The binary is installed in `/opt/tyk-gateway/tyk` by default. If your
binary is not available in your `PATH` environment, invoke it from there.

## Profile Information

You can provide various profile information for us in [pprof format](https://github.com/google/pprof/). See [Gateway Profiling]({{< ref "troubleshooting/tyk-gateway/profiling" >}}) for more details.




