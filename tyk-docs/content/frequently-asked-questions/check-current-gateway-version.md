---
date: 2017-03-27T16:30:52+01:00
title: How to Check Your Gateway Version
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Since Gateway version `5.0.8` or `5.2.3` you can inspect detailed build information including the release version by running `tyk version`.

```console
Release version: v5.3.0-dev
Built by:        goreleaser
Build date:      <date>
Commit:          <commit-hash>
Go version:      go1.20
OS/Arch:         linux/amd64
```

If you need this in a machine readable format, a `--json` flag is available.

```json
{
    "Version": "v5.3.0-dev",
    "BuiltBy": "goreleaser",
    "BuildDate": "<date>",
    "Commit": "<commit-hash>",
    "Go": {
        "Os": "linux",
        "Arch": "amd64",
        "Version": "go1.20"
    }
}
```

For older versions of Gateway, you can run `tyk --version` to print the release version for your tyk binary.

The binary is installed in `/opt/tyk-gateway/tyk` by default. If your binary is not available in your `PATH` environment, invoke it from there.

```
time="Oct 31 17:06:06" level=info msg="Tyk API Gateway v5.3.0-dev" prefix=main
``` 
