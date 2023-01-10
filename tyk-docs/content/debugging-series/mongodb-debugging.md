---
title: "MongoDB Debugging"
date: 2023-01-05
tags: ["Mongo", "MongoDB", "Debugging", "Mongo Debugging"]
description: "Debugging MongoDB in a Tyk instance"
menu:
  main:
    parent: "Debugging Series"
aliases:
  - /debugging-series/mongodb-debugging/
---

Tyk uses Mongo as a database to store much of its analytical data. This means if you have a dashboard instance that is down, there’s a high chance that this is because of either Mongo being down or an issue with your dashboard connecting to Mongo.

Here, we'll outline the following:

 - How to isolate Mongo as the root of the error
 - The steps to take to help stop your system from going down.

## Isolating Mongo as the fault

Here are a few ways to identify Mongo as the source of the problem:

1. Analytics is not showing up on the dashboard
2. When hitting the `/hello` endpoint, the dashboard is down
3. The Mongo database size is hitting hardware resource limits.

## Mongo status

Similarly to Tyk, Mongo has a health check that we can run to get the status of our Mongo instance. This should be a starting point for debugging Mongo (depending on which system):

 - `Sudo systemctl status mongod` or `sudo service mongodb status`
 - Logs under `/var/log/mongo/mongo.log` should also outline any outage

## Mongo version

Does Tyk support the version of Mongo that you’re using? Read more about that [here]({{< ref "planning-for-production/database-settings/mongodb" >}}).

## Capped collections

Suppose a Mongo instance runs over a long period in addition to a lot of traffic in a Tyk system. In that case, the chances of the collections growing out of control are very real - especially the `tyk_analytics` collections.

In some cases, `enable_detailed_logging: true` adds fuel to the fire, as this parameter should only be set temporarily during debugging. This configuration exists on the gateway and the API levels, so ensure this is off after debugging.

We advise everyone to cap every collection in Mongo, as this prevents collections from growing out of control and bringing your dashboard down by hitting resource limits.

You can determine each collection's cap size by visiting our [MongoDB sizing calculator]({{< ref "planning-for-production/database-settings/mongodb-sizing" >}}).

Here’s more information on how and why you want to [cap your collections](https://www.mongodb.com/docs/manual/core/capped-collections/).

## Size caps versus TTL-capped collections

Are you trying to decide between capping your collections or by size? It depends on a couple of factors. Ultimately, both settings will get rid of older data, so it’s based on how far back you need to view it.

Assuming you only need data for a few days, then using a TTL will be the best route, as it will only allow your collections to grow that wild over a short period.

Alternatively, if you care about how big the collections grow and want to see longer-lived data, then capping by size is your best direction. This will limit the collection to developing within a controlled resource limit. And in the context of aggregate analytics, this collection will hold data for long periods.

One thing to note here is that if you head down the TTL route, and if your environment has A LOT of traffic, then your collections can grow wild and fast, while a size-capped collection will always stay within a known size limit.

## Handling overgrown, uncapped collections

There are three ways to do this:

1. The first method is to delete (drop) the collection and create a new collection with a cap (commands below).

```bash
  # This will drop a collection. When using this, cached data will not be deleted.
  db.<collection_name>.drop()
```

```bash
  #  Can use the below call. Drops the collection and removes any cache data
  db.<collection_name>.remove()
```

2. The second method is to rename the collection to a random name and then create a new collection with a cap. Then restart Mongo with a larger size (we do this because the overgrown collections still exist). This is to confirm that the collection size grew too large and dropped the Mongo connection. The renaming also helps conserve the existing data if you still need it (but it will be useless in the background unless you attempt the third method).

3. The third method is to delete (deleteMany() call below) the old data to trim down their collection size. Then, you can restart your instance to see if the connection goes up again.

```bash
  # Will delete data off a collection that does NOT have a cap. Otherwise, it will throw an error.
  db.<collection_name>.deleteMany()
```


## Secure Mongo connection

You will use a secured connection to your Mongo instance in most production cases. Here are a few things to consider:

- Verify there isn’t a network issue that stops your dashboard from connecting to Mongo. You can do this by hitting the dashboard server from your Mongo server (or vice versa)

- Validate certificate and `.pem` files

- Connect (command below) to Mongo with certificates

```bash
  # Replace the above files with the correct parameters (proper file paths and host).
  mongo --ssl --sslCAFile /opt/mongodb/ssl/ca.pem --sslPEMKeyFile /opt/mongodb/ssl/mongodb.pem --host 127.0.0.1
```
- Verify Pump has the correct parameters to include your certificates

- Verify your dashboard has the correct parameters relative to your environment:

```json
  "mongo_url": "mongodb://localhost/tyk_analytics",
  "mongo_use_ssl": true,
  "mongo_ssl_ca_file": "/opt/mongodb/ssl/ca.pem",
  "mongo_ssl_pem_keyfile": "/opt/mongodb/ssl/mongodb.pem",
  "mongo_ssl_insecure_skip_verify": true

```