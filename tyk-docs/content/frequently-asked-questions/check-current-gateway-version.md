---
date: 2017-03-27T16:30:52+01:00
title: How to Check Your Gateway Version
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Since gateway version `5.0.8` or `5.2.3` you can inspect detailed build
information including the release version by running `tyk version`.

```
Release version: v5.3.0-dev
Built by:        goreleaser
Build date:      <date>
Commit:          <commit-hash>
Go version:      go1.20
OS/Arch:         linux/amd64
```

If you need this in a machine readable format, a `--json` flag is available.

For older versions of Gateway, you can run `tyk --version` to print the
release version for your tyk binary.

The binary is installed in `/opt/tyk-gateway/tyk` by default. If your
binary is not available in your `PATH` environment, invoke it from there.

You can also see your installed version from the gateway logs. When the
Gateway starts, it prints the version information into the log output.

```
INFO main: Gateway started (v2.7.0)
``` 
