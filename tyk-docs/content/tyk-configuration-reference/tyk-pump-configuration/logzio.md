---
date: 2023-08-01
title: Logz.io Setup
tags: ["Tyk Pump", "Configuration", "Logz.io"]
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
---

Logz.io is a cloud-based log management and analytics platform that provides log management built on Elasticsearch, Logstash, and Kibana.

## JSON/Conf file
Edit your pump's `pump.conf` and add this bit to the "Pumps" section:

```json
"logzio": {
      "type": "logzio",
      "meta": {
        "token": "<YOUR-LOGZ.IO-TOKEN>"
      }
    }
```

## Environment variables 
```
TYK_PMP_PUMPS_LOGZIO_TYPE=logzio
TYK_PMP_PUMPS_LOGZIO_META_TOKEN="{YOUR-LOGZIO-TOKEN}"
```

## More advanced fields
- `meta.url`: If you do not want to use the default Logz.io url, for example when using a proxy. The default url is `https://listener.logz.io:8071`
- `meta.queue_dir`: The directory for the queue
- `meta.drain_duration`: This sets the drain duration (when to flush logs on the disk). The default value is `3s`.
- `meta.disk_threshold`: Set the disk queue threshold. Once the threshold is crossed the sender will not enqueue the received logs. The default value is `98` (percentage of disk).
- `meta.check_disk_space`: Set the sender to check if it crosses the maximum allowed disk usage. The default value is `true`.