---
title: CSV Setup
description: Explains how to setup Tyk Pump to use a CSV file to track API analytics
tags: ["Tyk Pump", "Configuration", "CSV"]
---

Enable the CSV pump to have Tyk Pump create or modify a CSV file to track API Analytics.

## JSON/Conf file
Edit your pump's `pump.conf` and add this bit to the "Pumps" section:

```json
"csv": {
      "type": "csv",
      "meta": {
        "csv_dir": "./your_directory_here"
      }
    },
```

## Environment variables 
```conf
TYK_PMP_PUMPS_CSV_TYPE=csv
TYK_PMP_PUMPS_CSV_META_CSVDIR=./your_directory_here
```
