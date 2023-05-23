---
---

[MongoDB]("https://www.mongodb.com") is our default storage option. We support the following versions:

- MongoDB 4.4.x (with mgo driver)
- MongoDB 4.4.x, 5.0.x, 6.0.x (with mongo-go driver)

** mgo driver **

{{< note success >}}

mgo driver works with MongoDB 3.x to 4.2.x too, but we no longer test MongoDB versions prior to 4.4 since they are EOL

You can also use the following as a drop-in replacement for MongoDB:

- [Amazon DocumentDB]("https://aws.amazon.com/documentdb/") 3.6 and 4 engine
- [Azure CosmosDB for MongoDB]("https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/introduction") 3.6 and 4 engine

{{< /note >}}

** Unsupported versions **
{{< note success >}}

Tyk works with MongoDB 3.x and above too, but we no longer test MongoDB versions prior to 4.4 since they are EOL
If you are using [DocumentDB](https://aws.amazon.com/documentdb/), [capped collections]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}}) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details.

{{< /note >}}
