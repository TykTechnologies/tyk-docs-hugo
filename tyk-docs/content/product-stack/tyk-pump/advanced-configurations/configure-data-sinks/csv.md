---
title: CSV Setup
description: Explains how to setup Tyk Pump to use a CSV file to track API analytics
tags: ["Tyk Pump", "Configuration", "CSV"]
---

Tyk Pump can be configured to create or modify a CSV file to track API Analytics.

## JSON / Conf file

Add the following configuration fields to the pumps section within your `pump.conf` file:

```json
{
  "csv": 
  {
    "type": "csv",
    "meta": {
      "csv_dir": "./your_directory_here"
    }
  }
}
```

## Environment variables 
```bash
TYK_PMP_PUMPS_CSV_TYPE=csv
TYK_PMP_PUMPS_CSV_META_CSVDIR=./your_directory_here
```
