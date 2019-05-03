---
date: 2017-03-24T16:15:28Z
title: Capping Analytics Data Storage
menu:
  main:
    parent: "Analyse"
weight: 9 
---

## <a name="time-based-cap"></a>Time Based Cap

If you wish to reduce or manage the amount of data in your MongoDB, you can  add an expire index to the collection and have Tyk enforce organisation quotas.

To add an expiry index to your analytics log data simply follow these three steps.

### Step 1: Add the Index to MongoDB

Run this command in your preferred MongoDB tool:

```{.copyWrapper}
db.tyk_analytics.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
```
This (command)[https://docs.mongodb.com/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time] sets the value of `expireAt` to correspond to the time the document should expire. MongoDB will automatically delete documents from the `tyk_analytics` collection 0 seconds after the `expireAt` time in the document. The `expireAt` will be calculated and creeated by Tyk in the following step.

### Step 2. Create an Organisation Quota

```{.copyWrapper}
curl --header "x-tyk-authorization: {tyk-gateway-secret}" --header "content-type: application/json" --data @expiry.txt http://{tyk-gateway-ip}:{port}/tyk/org/keys/{org-id}
```

@expiry.txt:

```{.copyWrapper}
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

`data_expires` - Sets the data expires to a time in seconds for it to expire. Tyk will calculate the expiry date for you.

### Step 3: Make Sure the Setting is Enabled in `tyk.conf`

```{.copyWrapper}
"enforce_org_data_age": true, 
"enforce_org_quotas": false
```

> **Note**: This will only work for v2.2.0.23 or above, if you are running an earlier patch, you will need to `enforce_org_quotas` set to `true`.

## <a name="size-based-cap"></a> Size Based Cap

### Add the Size Cap

>  **Note**: The size value should be in bytes, and we recommend using a value just under the amount of RAM on your machine.

Run this (command)[https://docs.mongodb.com/manual/reference/command/convertToCapped/] in your MongoDB shell:

```{.copyWrapper}
use tyk_analytics
db.runCommand({"convertToCapped": "tyk_analytics", size: 100000});
```

### Adding the Size Cap if using a mongo_selective Pump

The `mongo_selective` pump stores data on a per organisation basis. You will have to run the following command in your MongoDB shell for an individual organisation as follows.


```{.copyWrapper}
db.runCommand({"convertToCapped": "z_tyk_analyticz_<org-id>", size: 100000});
```
