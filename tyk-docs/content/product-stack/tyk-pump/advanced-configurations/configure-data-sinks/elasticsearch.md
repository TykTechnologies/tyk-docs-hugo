---
description: Explains how to configure Tyk Pump to store analyitics in Elasticsearch
title: Elasticsearch Setup
tags: ["Tyk Pump", "Configuration", "Elasticsearch"]
---

Elasticsearch is a highly scalable and distributed search engine that is designed to handle large amounts of data.

## JSON/Conf 
```json
"pumps": {
    "elasticsearch": {
      "type": "elasticsearch",
      "meta": {
        "index_name": "tyk_analytics",
        "elasticsearch_url": "http://localhost:9200",
        "enable_sniffing": false,
        "document_type": "tyk_analytics",
        "rolling_index": false,
        "extended_stats": false,
        "version": "6"
      }
    }
},
```

## Configuration fields
- `index_name`: The name of the index that all the analytics data will be placed in. Defaults to `tyk_analytics`
- `elasticsearch_url`: If sniffing is disabled, the URL that all data will be sent to. Defaults to `http://localhost:9200`
- `enable_sniffing`: If sniffing is enabled, the `elasticsearch_url` will be used to make a request to get a list of all the nodes in the cluster, the returned addresses will then be used. Defaults to `false`
- `document_type`: The type of the document that is created in Elasticsearch. Defaults to `tyk_analytics`
- `rolling_index`: Appends the date to the end of the index name, so each days data is split into a different index name. For example, `tyk_analytics-2016.02.28`. Defaults to `false`.
- `extended_stats`: If set to true will include the following additional fields: `Raw Request`, `Raw Response` and `User Agent`.
- `version`: Specifies the ES version. Use `3` for ES 3.X, `5` for ES 5.X, `6` for ES 6.X, `7` for ES 7.X . Defaults to `3`.
- `disable_bulk`: Disable batch writing. Defaults to `false`.
- `bulk_config`: Batch writing trigger configuration. Each option is an OR with each other:
  - `workers`: Number of workers. Defaults to `1`.
  - `flush_interval`: Specifies the time in seconds to flush the data and send it to ES. Default is disabled.
  - `bulk_actions`: Specifies the number of requests needed to flush the data and send it to ES. Defaults to 1000 requests. If it is needed, can be disabled with `-1`.
  - `bulk_size`: Specifies the size (in bytes) needed to flush the data and send it to ES. Defaults to 5MB. Can be disabled with `-1`.



## Environment variables 
```bash
TYK_PMP_PUMPS_ELASTICSEARCH_TYPE=elasticsearch
TYK_PMP_PUMPS_ELASTICSEARCH_META_INDEXNAME=tyk_analytics
TYK_PMP_PUMPS_ELASTICSEARCH_META_ELASTICSEARCHURL=http://localhost:9200
TYK_PMP_PUMPS_ELASTICSEARCH_META_ENABLESNIFFING=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_DOCUMENTTYPE=tyk_analytics
TYK_PMP_PUMPS_ELASTICSEARCH_META_ROLLINGINDEX=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_EXTENDEDSTATISTICS=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_VERSION=5
TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_WORKERS=2
TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_FLUSHINTERVAL=60
```
