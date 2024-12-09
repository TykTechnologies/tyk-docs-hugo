---
date: 2017-03-27T16:13:15+01:00
title: Capping analytics data storage
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---



What methods are available to enable me to manage my MongoDB analytics storage?

[Time Based Caps]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage.md#time-based-cap-in-single-tenant-environments" >}})

[Size Based Caps]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage.md#size-based-cap" >}})

{{< note success >}}
**Note**  

Time based caps (TTL indexes) are incompatible with already configured size based caps.
{{< /note >}}

{{< note success >}}
**Note**  

If you are using DocumentDB, capped collections are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details.
{{< /note >}}
