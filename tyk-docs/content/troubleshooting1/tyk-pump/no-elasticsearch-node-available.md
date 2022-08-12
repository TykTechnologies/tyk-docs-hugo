---
date: 2017-03-27T17:32:44+01:00
title: “No Elasticsearch node available“
menu:
  main:
    parent: "Tyk Pump Troubleshooting"
weight: 5 
---

### Description

Tyk Pump is configured to use Elasticsearch, but it does not work and shows `no Elasticsearch node available` message in log.

```
tyk-pump[68354]: time="Aug 30 15:19:36" level=error msg="Elasticsearch connection failed: no Elasticsearch node available"
```

### Cause

The `elasticsearch_url` configuration property in the `pump.conf` is missing the HTTP prefix e.g.

```
"elasticsearch_url": "127.0.0.1:9200"
```

### Solution

Ensure the HTTP prefix is present in the `elasticsearch_url` configuration property e.g.

```
"elasticsearch_url": "http://127.0.0.1:9200"
```
