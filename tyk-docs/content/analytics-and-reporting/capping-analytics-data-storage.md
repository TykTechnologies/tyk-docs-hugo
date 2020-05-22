---
date: 2017-03-24T16:15:28Z
title: Capping Analytics Data Storage
menu:
  main:
    parent: "Analytics and Reporting"
weight: 9 
---

Tyk Gateways can generate a lot of analytics data. A guideline is that for every 3 million requests that your Gateway processes it will generate roughly 1GB of data.

If you have Tyk Pump set up with the aggregate pump as well as the regular MongoDB pump, then you can make the `tyk_analytics` collection a [capped collection](https://docs.mongodb.com/manual/core/capped-collections/). Capping a collection guarantees that analytics data is rolling within a size limit, acting like a FIFO buffer which means that when it reaches a specific size, instead of continuing to grow, it will replace old records with new ones.

The `tyk_analytics` collection contains granular log data, which is why it can grow rapidly. The aggregate pump will convert this data into a aggregate format and store it in a separate collection. The aggregate collection is used for processing reporting requests as it is much more efficient.

If you've got an existing collection which you want to convert to be capped you can use the `convertToCapped` [MongoDB command](https://docs.mongodb.com/manual/reference/command/convertToCapped/).

If you wish to configure the pump to cap the collections for you upon creating the collection, you may add the following
configurations to your `uptime_pump_config` and / or `mongo.meta` objects in `pump.conf`.

```
"collection_cap_max_size_bytes": 1048577,
"collection_cap_enable": true
```

`collection_cap_max_size_bytes` sets the maximum size of the capped collection.
`collection_cap_enable` enables capped collections.

If capped collections are enabled and a max size is not set, a default cap size of `5Gib` is applied. 
Existing collections will never be modified.

> **NOTE**: An alternative to capped collections is MongoDB's **Time To Live** indexing (TTL). TTL indexes are incompatible with capped collections. If you have set a capped collection, a TTL index will not get created, and you will see error messages in the MongoDB logs. See [MongoDB TTL Docs](https://docs.mongodb.com/manual/tutorial/expire-data/) for more details on TTL indexes.


## <a name="time-based-cap"></a>Time Based Cap

If you wish to reduce or manage the amount of data in your MongoDB, you can  add an expire index to the collection and have Tyk enforce organisation quotas.

To add an expiry index to your analytics log data simply follow these three steps.

> **NOTE**: Time based caps (TTL indexes) are incompatible with already configured size based caps.

### Step 1: Add the Index to MongoDB

Run the following command in your preferred MongoDB tool:

```{.copyWrapper}
db.tyk_analytics.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
```
This [command](https://docs.mongodb.com/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time) sets the value of `expireAt` to correspond to the time the document should expire. MongoDB will automatically delete documents from the `tyk_analytics` collection 0 seconds after the `expireAt` time in the document. The `expireAt` will be calculated and created by Tyk in the following step.

### Step 2. Create an Organisation Quota

```{.copyWrapper}
curl --header "x-tyk-authorization: {tyk-gateway-secret}" --header "content-type: application/json" --data @expiry.txt http://{tyk-gateway-ip}:{port}/tyk/org/keys/{org-id}
```

@expiry.txt:

```{.json}
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

```{.json}
"enforce_org_data_age": true, 
"enforce_org_quotas": false
```

> **Note**: This will only work for v2.2.0.23 or above, if you are running an earlier patch, you will need to `enforce_org_quotas` set to `true`.

## <a name="size-based-cap"></a> Size Based Cap

### Add the Size Cap

>  **Note**: The size value should be in bytes, and we recommend using a value just under the amount of RAM on your machine.


Run this [command](https://docs.mongodb.com/manual/reference/command/convertToCapped/) in your MongoDB shell:


```{.copyWrapper}
use tyk_analytics
db.runCommand({"convertToCapped": "tyk_analytics", size: 100000});
```

### Adding the Size Cap if using a mongo_selective Pump

The `mongo_selective` pump stores data on a per organisation basis. You will have to run the following command in your MongoDB shell for an individual organisation as follows.


```{.copyWrapper}
db.runCommand({"convertToCapped": "z_tyk_analyticz_<org-id>", size: 100000});
```
