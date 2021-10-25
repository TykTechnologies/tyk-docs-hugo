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
### General configuration

#### Purge configuration
To set the `purge_delay`, `purge_chunk` and `storage_expiration_time` you have to set the following environment variables:
```
TYK_PMP_PURGEDELAY
TYK_PMP_PURGECHUNK
TYK_PMP_STORAGEEXPIRATIONTIME
```

#### Analytics storage configuration
First of all, you need to set the storage type to `redis` using `TYK_PMP_ANALYTICSSTORAGETYPE`.
After that, you can configure Redis using:
```
TYK_PMP_ANALYTICSSTORAGECONFIG_HOST
TYK_PMP_ANALYTICSSTORAGECONFIG_PORT
TYK_PMP_ANALYTICSSTORAGECONFIG_HOSTS
TYK_PMP_ANALYTICSSTORAGECONFIG_ADDRS
TYK_PMP_ANALYTICSSTORAGECONFIG_MASTERNAME
TYK_PMP_ANALYTICSSTORAGECONFIG_SENTINELPASSWORD
TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME
TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD
TYK_PMP_ANALYTICSSTORAGECONFIG_DATABASE
TYK_PMP_ANALYTICSSTORAGECONFIG_TIMEOUT
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXIDLE
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXACTIVE
TYK_PMP_ANALYTICSSTORAGECONFIG_ENABLECLUSTER
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISKEYPREFIX
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISUSESSL
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISSSLINSECURESKIPVERIFY
```

#### Uptime configuration
If you want to disable the purging of the uptime data, you can set `TYK_PMP_DONTPURGEUPTIMEDATA` to true.
If you want to enable it, you can set the uptime storage with the following variables:
```
TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME
TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL
```

#### Health check configuration
To set the `health_check_endpoint_name` and `health_check_endpoint_port` you use:
```
TYK_PMP_HEALTHCHECKENDPOINTNAME
TYK_PMP_HEALTHCHECKENDPOINTPORT
``` 

### Pumps configuration
The default environment variable prefix for each pump follows this format: `TYK_PMP_PUMPS_{PUMP-NAME}_`, for example `TYK_PMP_PUMPS_KAFKA_`.

You can also set custom names for each pump specifying the pump type. For example, if you want a Kafka pump which is called `PROD` you need to create `TYK_PMP_PUMPS_PROD_TYPE=kafka` and configure it using the `TYK_PMP_PUMPS_PROD_` prefix.

This way, you can configure any pump using the environment variables naming convention and each pump configuration from the [tyk-pump README](https://github.com/TykTechnologies/tyk-pump#configuration). 

#### General Pumps configuration
Following the pump notation, we can configure any of the common pumps fields.

If you want to set a timeout for a particular pump, the variable would be:
```
TYK_PMP_PUMPS_{PMP_NAME}_TIMEOUT
```

If you want to omit detailed recording for that pump, the variable would be:
```
TYK_PMP_PUMPS_{PMP_NAME}_OMITDETAILEDRECORDING
```

If you want to set a filter, the environment variables could be:
```
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_APIIDS
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_ORGIDS
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_RESPONSECODES
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_SKIPAPIIDS
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_SKIPORGIDS
TYK_PMP_PUMPS_{PMP_NAME}_FILTERS_SKIPRESPONSECODES
```
Take into account that the filters values are slice, so you should assign comma separated values. For example,  `TYK_PMP_PUMPS_MONGO_FILTERS_APIIDS="api_1,api_2,api_3"`

#### Specific Pumps configuration
The `meta` configuration of each pump follows the same notation. So for example if you want to set `meta.mongo_url` for our Mongo pump, you need to set `TYK_PMP_PUMPS_MONGO_META_MONGOURL` environment variable. 
 
 
#### Examples

Imagine you want to configure the following pumps:
```{.json}
{
    ...
    "pumps": {
        "CSV": {
            "type": "csv",
            "meta": {
                "csv_dir": "default/"
            }
        },
        "CSVCUSTOM": {
            "type": "csv",
            "meta": {
                "csv_dir": "custom/"
            }
        },
        "PROM": {
            "type": "prometheus",
            "timeout":2,
            "meta": {
                "listen_address": "localhost:9090",
                "path": "/metrics"
            }
        }
    }
}
```

Since the first pump has the default pump name, you just need to set the `meta.csv_dir` variable using `TYK_PMP_PUMPS_CSV_META_CSVDIR="default/"`.

To configure a `csvcustom` pump you need to set the pump type first and then add the `csv_dir` variable. For example `TYK_PMP_PUMPS_CSVCUSTOM_TYPE=csv` and `TYK_PMP_PUMPS_CSVCUSTOM_META_CSVDIR="custom/"`.

#### Prometheus Example

To configure a custom prometheus pump, use the following environment variables:
```
TYK_PMP_PUMPS_PROM_TYPE=prometheus
TYK_PMP_PUMPS_PROM_TIMEOUT=10
TYK_PMP_PUMPS_PROM_META_ADDR="localhost:9090"
TYK_PMP_PUMPS_PROM_META_PATH= "/metrics"
```

You have now configured all 3 pumps specified in your config file with environment variables.

