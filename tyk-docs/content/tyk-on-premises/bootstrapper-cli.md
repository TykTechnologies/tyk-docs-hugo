---
date: 2019-07-30T11:30:02Z
title: Bootstrapper CLI
tags: ["Tyk Dasboard", "Self-Managed", "Bootstrapping", "CLI"]
description: "How to Bootstrap the Tyk Dashboard to create your organisation and users"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 9
url: "/tyk-on-premises/bootstrapper-cli/"
aliases:
  - /getting-started/installation/with-tyk-on-premises/bootstrapper-cli/
---

## bootstrap

To list the available flags, execute `tyk-analytics bootstrap -h`:

```
   usage: tyk-analytics bootstrap [<flags>]
   
   Bootstrap the Dashboard.
   
   Flags:
     -h, --help                 Show context-sensitive help (also try --help-long and --help-man).
         --version              Show application version.
         --conf="tyk_analytics.conf"  
                                Load a named configuration file.
         --create-org           Create a new organisation.
         --reuse-org=REUSE-ORG  Reuse the organisation with given ID.
         --drop-org=DROP-ORG    Drop the organisation with given ID.
```


### Description

The `bootstrap` command makes bootstrapping easier. It helps you to create organisations and users. The command needs a
 config file path. By default, it looks at `tyk_analytics.conf` in the directory where the `tyk-analytics` binary is located.
 For example:
 
 ```tyk-analytics bootstrap```
 
 You can also give the path of a custom config file with the `--conf` flag. For example:
 
 ```tyk-analytics bootstrap --conf some-directory/custom.conf```
 
 The tool can work in both auto and interactive modes. You can use the flags while running the command or you can just run
  it without flags and use interactive mode. 


### Environment Variables

You can override the config values by environment variables. See [how to configure an environment variable]({{< ref "tyk-environment-variables" >}}). 

For example, you can override hostname, port, mongo url, redis host and redis port values by exporting the following variables:

- **TYK_DB_HOSTCONFIG_HOSTNAME**
- **TYK_DB_LISTENPORT**
- **TYK_DB_MONGOURL**
- **TYK_DB_REDISHOST**
- **TYK_DB_REDISPORT**
