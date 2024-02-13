---
---

[MongoDB](https://www.mongodb.com) is our default storage option. We support the following versions:

- MongoDB 4.4.x (with mgo driver)
- MongoDB 4.4.x, 5.0.x, 6.0.x, 7.0.x (with mongo-go driver). 

Note: mongo-go driver is available from Tyk 5.0.2.

{{< note success >}}
**MongoDB 3.x to 4.2.x**

mgo driver works with MongoDB 3.x to 4.2.x too, but we no longer test MongoDB versions prior to 4.4 since they are EOL
{{< /note >}}

You can also use the following as a drop-in replacement for MongoDB:

- [Amazon DocumentDB](https://aws.amazon.com/documentdb/) 3.6 and 4 engine
- [Azure CosmosDB for MongoDB](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/introduction) 3.6 and 4 engine
