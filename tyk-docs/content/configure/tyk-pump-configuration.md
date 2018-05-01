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

```{.copyWrapper}
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
    "dummy": {
      "name": "dummy",
      "meta": {
        
      }
    },
    "mongo": {
      "name": "mongo",
      "meta": {
        "collection_name": "tyk_analytics",
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "mongo_ssl_insecure_skip_verify": true,
        "mongo_use_ssl": true
      }
    },
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
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
        "enable_sniffing": false,
        "document_type": "tyk_analytics",
        "rolling_index": false,
        "extended_stats": false,
        "version": "5"
      }
    },
    "influx": {
      "name": "influx",
      "meta": {
        "database_name": "tyk_analytics",
        "address": "http//localhost:8086",
        "username": "root",
        "password": "root",
        "fields": [
          "request_time"
        ],
        "tags": [
          "path",
          "response_code",
          "api_key",
          "api_version",
          "api_name",
          "api_id",
          "raw_request",
          "ip_address",
          "org_id",
          "oauth_id"
        ]
      }
    },
    "moesif": {
      "name": "moesif",
      "meta": {
        "application_id": ""
      }
    },
    "statsd": {
      "name": "statsd",
      "meta": {
        "address": "localhost:8125",
        "fields": [
          "request_time"
        ],
        "tags": [
          "path",
          "response_code",
          "api_key",
          "api_version",
          "api_name",
          "api_id",
          "raw_request",
          "ip_address",
          "org_id",
          "oauth_id"
        ]
      }
    },
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
  },
  "uptime_pump_config": {
    "collection_name": "tyk_uptime_analytics",
    "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
  },
  "dont_purge_uptime_data": false
}
```

> **Note**: `mongo_ssl_insecure_skip_verify` and `mongo_use_ssl` are available from v1.3.6 onwards.

Pumps are then added to the `pumps` section of this document, each should represent a sink to purge the data into.

Settings must be the same as for the original `tyk.conf` for Redis and for MongoDB.

Elasticsearch Config
"index_name" - The name of the index that all the analytics data will be placed in. Defaults to "tyk_analytics"

"elasticsearch_url" - If sniffing is disabled, the URL that all data will be sent to. Defaults to "http://localhost:9200"

"enable_sniffing" - If sniffing is enabled, the "elasticsearch_url" will be used to make a request to get a list of all the nodes in the cluster, the returned addresses will then be used. Defaults to false

"document_type" - The type of the document that is created in ES. Defaults to "tyk_analytics"

"rolling_index" - Appends the date to the end of the index name, so each days data is split into a different index name. E.g. tyk_analytics-2016.02.28 Defaults to false

"extended_stats" - If set to true will include the following additional fields: Raw Request, Raw Response and User Agent.

"version" - Specifies the ES version. Use "3" for ES 2.x, and "5" for ES 5.0. Defaults to "3".

Moesif Config
Moesif is a logging and analytics service for APIs. The Moesif pump will move analytics data from Tyk to Moesif.

"application_id" - Moesif App Id JWT. Multiple api_id's will go under the same app id.

### Environment variables

Environment variables can be used to override settings defined in the configuration file. The [Tyk Pump environment variables page](/docs/configure/pump-env-variables/) shows how the JSON member keys map to the environment variables. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

 [1]: /docs/others/Gateway-Environment-Vars.xlsx
