---
title: MDCB Configuration options
weight: 1
menu:
    main: 
        parent: "Tyk Multi Data Centre Bridge"
url: /tyk-multi-data-centre/mdcb-configuration-options/
---

## Tyk MDCB Configuration

The Tyk MDCB server is configured primarily via the `tyk_sink.conf` file, this file resides in `/opt/tyk-sink` on most systems, but can also live anywhere and be directly targeted with the `-c` flag.

### Environment Variables

Environment variables (env var) can be used to override the settings defined in the configuration file. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

### Default Ports

| Application             | Port           |
|-------------------------|----------------|
|MongoDB                  |      27017     |
|Redis                    |      6379      |
|**Tyk Dashboard**        |                |
|Developer Portal         |      3000      |
|Admin Dashboard          |      3000      |
|Admin Dashboard API      |      3000      |
|**Tyk Gateway**          |                |
|Management API           |      8080      |
|**MDCB**                 |                |
|RPC Listen               |      9091      |
|Healthcheck              |      8181      |


{{< include "mdcb-config.md" >}}