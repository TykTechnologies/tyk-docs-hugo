---
date: 2023-08-01
title: CSV Setup
tags: ["Tyk Pump", "Configuration", "CSV"]
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
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
