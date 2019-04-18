---
title: Tyk Pump Environment Variables
menu:
  main:
    parent: "Configure"
weight: 14 
---

The table shows how the JSON member keys maps to an environment variable. Where an environment variable is specified, its value will override the value in the [Tyk Pump configuration file](/docs/configure/tyk-pump-configuration/).

| JSON Value             | Environment Variable Name                     |
|------------------------|-----------------------------------------------|
| Database               | TYK_PMP_ANALYTICSSTORAGECONFIG_DATABASE       |
| EnableCluster          | TYK_PMP_ANALYTICSSTORAGECONFIG_ENABLECLUSTER  |
| Host                   | TYK_PMP_ANALYTICSSTORAGECONFIG_HOST           |
| Hosts                  | TYK_PMP_ANALYTICSSTORAGECONFIG_HOSTS          |
| MaxActive              | TYK_PMP_ANALYTICSSTORAGECONFIG_MAXACTIVE      |
| MaxIdle                | TYK_PMP_ANALYTICSSTORAGECONFIG_MAXIDLE        |
| Password               | TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD       |
| Port                   | TYK_PMP_ANALYTICSSTORAGECONFIG_PORT           |
| RedisKeyPrefix         | TYK_PMP_ANALYTICSSTORAGECONFIG_REDISKEYPREFIX |
| Type                   | TYK_PMP_ANALYTICSSTORAGECONFIG_TYPE           |
| Username               | TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME       |
| analytics_storage_type | TYK_PMP_ANALYTICSSTORAGETYPE                  |
| dont_purge_uptime_data | TYK_PMP_DONTPURGEUPTIMEDATA                   |
| pumps                  | TYK_PMP_PUMPS                                 |
| purge_delay            | TYK_PMP_PURGEDELAY                            |
| uptime_pump_config     | TYK_PMP_UPTIMEPUMPCONFIG                      |