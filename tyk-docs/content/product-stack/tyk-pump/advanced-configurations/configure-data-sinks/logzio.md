---
description: Explains how to configure Tyk pump to store analytics in Logz.io
title: Logz.io Setup
tags: ["Tyk Pump", "Configuration", "Logz.io"]
---

[Logz.io](https://logz.io/) is a cloud-based log management and analytics platform that provides log management built on [Elasticsearch](https://www.elastic.co/), [Logstash](https://www.elastic.co/guide/en/logstash/current/index.html) and [Kibana](https://www.elastic.co/kibana/).


## JSON / Conf file

Add the following configuration fields to the pumps section within your `pump.conf` file:

```json
{
  "pumps"
  {
    "logzio": {
        "type": "logzio",
        "meta": {
          "token": "<YOUR-LOGZ.IO-TOKEN>"
        }
    }
  }
}
```

## Environment variables 
```bash
TYK_PMP_PUMPS_LOGZIO_TYPE=logzio
TYK_PMP_PUMPS_LOGZIO_META_TOKEN="{YOUR-LOGZIO-TOKEN}"
```

## Advanced configuration fields
- `meta.url`: Use if you do not want to use the default Logz.io URL, for example when using a proxy. The default url is `https://listener.logz.io:8071`.
- `meta.queue_dir`: The directory for the queue.
- `meta.drain_duration`: This sets the drain duration (when to flush logs on the disk). The default value is `3s`.
- `meta.disk_threshold`: Set the disk queue threshold. Once the threshold is crossed the sender will not enqueue the received logs. The default value is `98` (percentage of disk).
- `meta.check_disk_space`: Set the sender to check if it crosses the maximum allowed disk usage. The default value is `true`.