---
date: 2017-03-24T15:49:11Z
title: Analytics
weight: 3
menu: 
    main:
        parent: "Tyk Dashboard"
aliases:
  - /analyse/
---

The Tyk Dashboard has a full set of analytics functions and graphs that you can use to segment and view your API traffic and activity. The Dashboard offers a great way for you to debug your APIs and quickly pin down where errors might be cropping up and for what clients.

Tyk has two types of analytics:

1. Per request. Per request statistics contains information about each request, like path or status. It is also possible to enable "detailed request logging" where it will log base64 encoded data.
2. Aggregate. Aggregate statistics, aggregated by hour are available for the following keys: `APIID`, `ResponseCode`, `APIVersion`, `APIKey`, `OauthID`, `Geo`, `Tags` and `TrackPath`.


## How ?

When you make a request to the Tyk Gateway, it creates analytics records and stores them in a temporary Redis list, which is synced (and then flushed) every 10 seconds by the [Tyk Pump]({{< ref "tyk-pump" >}}). The Pump processes all synced analytic records, and forwards them to configured pumps. By default, to make the Tyk Dashboard work, there are 2 pumps depending on your database platform:

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

 `mongo` (per request) and `mongo_aggregate` (for aggregate).
 {{< tab_end >}}
{{< tab_start "SQL" >}}

`sql` (per request) and `sql_aggregate` (for aggregate)
{{< tab_end >}}
{{< tabs_end >}}
