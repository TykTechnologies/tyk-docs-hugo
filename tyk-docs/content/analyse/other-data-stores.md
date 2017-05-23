---
date: 2017-03-24T16:28:03Z
title: Other data stores
menu:
  main:
    parent: "Analyse"
weight: 10 
---

The Tyk component that enables all of the analytics in Tyk and moves the data from the Gateway level into your Dashboard is called Tyk Pump.

Tyk Pump is just that, it is a pump, and it is possible to set up the Pump to also send the analytics data it finds to other data stores, such as ElasticSearch and StatsD.

## <a name="pump-configuration"></a> Pump Configuration

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

## <a name="elasticsearch"></a> ElasticSearch

The Elasticsearch pump configuration looks like this:

```
    "elasticsearch": {
            "name": "elasticsearch",
            "meta": {
                "index_name": "tyk_analytics",
                "elasticsearch_url": "localhost:9200",
                "enable_sniffing": false,
                "document_type": "tyk_analytics",
                "rolling_index": false
            }
        },
```

*   `index_name`: The name of the index that all the analytics data will be placed in. Defaults to `tyk_analytics`.
*   `elasticsearch_url`: If sniffing is disabled, the URL that all data will be sent to. Defaults to `http://localhost:9200`.
*   `enable_sniffing`: If sniffing is enabled, the `elasticsearch_url` will be used to make a request to get a list of all the nodes in the cluster, the returned addresses will then be used. Defaults to `false`.
*   `document_type`: The type of the document that is created in Elasticsearch. Defaults to `tyk_analytics`.

## <a name="influxdb"></a> InfluxDB

The InfluxDB Pump configuration requires the following fields to be added to your `pump.conf` file:

```
    "influx": {
            "name": "influx",
            "meta": {
                "database_name": "tyk_analytics",
                "address": "http://localhost:8086",
                "username": "root",
                "password": "root",
                "fields": ["request_time"],
                "tags":  ["path",
                          "response_code",
                          "api_key",
                          "api_version",
                          "api_name",
                          "api_id",
                          "raw_request",
                          "ip_address",
                          "org_id",
                          "oauth_id"]
            }
        }
```

## <a name="statsd"></a> StatsD

The StatsD pump requires the following configuration to be added to your `pump.conf` file:

```
    "statsd": {
            "name": "statsd",
            "meta": {
                "address": "localhost:8125",
                "fields": ["request_time"],
                "tags":  ["path",
                        "response_code",
                        "api_key",
                        "api_version",
                        "api_name",
                        "api_id",
                        "raw_request",
                        "ip_address",
                        "org_id",
                        "oauth_id"]
            }
        },
```

## <a name="graylog"></a> Graylog

The Graylog Pump requires the following configuration to be added to your `pump.conf` file:

```
    "graylog": {
          "name": "graylog",
          "meta": {
            "host": "10.60.6.15",
            "port": 12216,
            "tags": [
              "method",
              "path",
              "response_code",
              "api_key",
              "api_version",
              "api_name",
              "api_id",
              "org_id",
              "oauth_id",
              "raw_request",
              "request_time",
              "raw_response"
            ]
          }
        }
```

[1]: /docs/others/Gateway-Environment-Vars.xlsx


