---
date: 2017-03-24T16:15:28Z
title: Capping Analytics Data Storage
menu:
  main:
    parent: "Analyse"
weight: 9 
---

If you wish to reduce or manage the amount of data in your MongoDB, you can also add an expire index to the collection and have Tyk enforce organisation quotas.

To add an expiry index to your analytics log data simply follow these three steps.

### Step 1: Add the index to MongoDB

Run this command in your preferred MongoDB tool:

```
    db.tyk_analytics.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
```

### Step 2. Create an organisation quota

```
    curl --header "x-tyk-authorization: {tyk-gateway-secret}" --header "content-type: application/json" --data @expiry.txt http://{tyk-gateway-ip}:{port}/tyk/org/keys/{org-id}
```

@expiry.txt:

```
    {
    "allowance": 10000,
    "rate": 10000,
    "per": 0,
    "expires": 0,
    "quota_max": -1,
    "quota_renews": 1406121006,
    "quota_remaining": 100000,
    "quota_renewal_rate": 100000,
    "org_id": "{your-org-id}",
    "data_expires": 86400
    }
```

Set the data expires to a time in seconds for it to expire. Tyk will calculate the expiry date for you.

### Step 3: Make sure the setting is enabled in `tyk.conf`

```
    "enforce_org_data_age": true, 
    "enforce_org_quota": false
```

> **Note**: This will only work for v2.2.0.23, if you are running an earlier patch, you will need to `enforce_org_quota` set to `true`.