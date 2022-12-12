---
date: 2017-03-27T15:47:05+01:00
title: Tyk Pump Environment Variables
tags: ["Tyk Pump", "Envoronment Variables", "Configuration"]
description: "Using Environment Variables to configure your Tyk Pump"
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 6 
url: /tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables/
aliases:
  - /tyk-configuration-reference/tyk-pump-environment-variables/
---

You can use environment variables to override the config file for the Tyk Pump. Environment variables are created from the dot notation versions of the JSON objects contained with the config files.
To understand how the environment variables notation works, see [Environment Variables](/docs/tyk-configuration-reference/environment-variables/). 

All the Pump environment variables have the prefix `TYK_PMP_`. The environment variables will take precedence over the values in the configuration file.

{{< include "pump-config.md" >}}
