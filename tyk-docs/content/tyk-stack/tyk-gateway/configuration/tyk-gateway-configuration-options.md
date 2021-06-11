---
date: 2017-03-27T12:51:44+01:00
title: Tyk Gateway Configuration Options
menu:
  main:
    parent: Tyk Gateway
weight: 1
url: /tyk-oss-gateway/configuration
aliases:
  - /tyk-configuration-reference/tyk-gateway-configuration-options/
  - /configure/tyk-gateway-configuration-options/
  - /tyk-configuration-reference/ ## Redirects from legacy docs, this landing page no longer exists
---

## Tyk Gateway Configuration

The Tyk Gateway server is configured primarily via the `tyk.conf` file, this file resides in `/opt/tyk-gateway` on most systems, but can also live anywhere and be directly targeted with the `--conf` flag.

### Environment Variables

Environment variables (env var) can be used to override the settings defined in the configuration file. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

### tyk lint

In **v2.4** we have added a new `tyk lint` command which will validate your `tyk.conf` file and validate it for syntax correctness, misspelled attribute names or format of values. The Syntax can be:

`tyk lint` or `tyk --conf=path lint`

If `--conf` is not used, the first of the following paths to exist is used:

`./tyk.conf`
`/etc/tyk/tyk.conf`

{{< include "gateway-config.md" >}}
