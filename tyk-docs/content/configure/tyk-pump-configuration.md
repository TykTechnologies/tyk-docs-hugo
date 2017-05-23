---
date: 2017-03-27T15:47:05+01:00
title: Tyk Pump Configuration
menu:
  main:
    parent: "Configure"
weight: 4 
---

Configuring Tyk Pump is very simple.

Create a `pump.conf` file:

```
    {
        "analytics_storage_type": "redis",
        "analytics_storage_config": {
            "type": "redis",
            "host": "localhost",
            "port": 6379,
            "hosts": null,
            "username": "",
            "password": "",
            "database": 0,
            "optimisation_max_idle": 100,
            "optimisation_max_active": 0,
            "enable_cluster": false
        },
        "purge_delay": 10,
        "pumps": {
            "mongo": {
                "name": "mongo",
                "meta": {
                    "collection_name": "tyk_analytics",
                    "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
                }
            },
            "csv": {
                "name": "csv",
                "meta": {
                    "csv_dir": "./"
                }
            },
            "elasticsearch": {
                "name": "elasticsearch",
                "meta": {
                    "index_name": "tyk_analytics",
                    "elasticsearch_url": "localhost:9200",
                    "enable_sniffing": "false",
                    "document_type": "tyk_analytics"
                }
            }
        },
        "uptime_pump_config": {
            "collection_name": "tyk_uptime_analytics",
            "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
        },
        "dont_purge_uptime_data": false
    }
```

Pumps are then added to the `pumps` section of this document, each should represent a sink to purge the data into.

Settings must be the same as for the original `tyk.conf` for Redis and for MongoDB.

### Environment variables

Environment variables can be used to override settings defined in the configuration file. The [Tyk Pump environment variable mappings][1] spreadsheet shows how the JSON member keys map to the environment variables. Where an environment variable is specified, its value will take precendence over the value in the configuration file.

 [1]: /docs/others/Gateway-Environment-Vars.xlsx
