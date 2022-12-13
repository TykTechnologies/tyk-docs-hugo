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

You can use environment variables to override the config file for the Tyk Gateway. The Gateway configuration file can be found in the `tyk-gateway` folder and by default is called `tyk.conf`, though it can be renamed and specified using the `--conf` flag. Environment variables are created from the dot notation versions of the JSON objects contained with the config files.
To understand how the environment variables notation works, see [Environment Variables]({{< ref "tyk-environment-variables" >}}).

All the Gateway environment variables have the prefix `TYK_GW_`. The environment variables will take precedence over the values in the configuration file.

### tyk lint

In **v2.4** we have added a new `tyk lint` command which will validate your `tyk.conf` file and validate it for syntax correctness, misspelled attribute names or format of values. The Syntax can be:

`tyk lint` or `tyk --conf=path lint`

If `--conf` is not used, the first of the following paths to exist is used:

`./tyk.conf`
`/etc/tyk/tyk.conf`

{{< include "gateway-config.md" >}}
