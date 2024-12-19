---
---

[MongoDB](https://www.mongodb.com) is our default storage option. We support the following versions:

- MongoDB 5.0.x, 6.0.x, 7.0.x (with `mongo-go` driver). 

Note: `mongo-go` driver has been available since Tyk 5.0.2 and is the default from Tyk 5.3.0.
<br>
<br>
{{< note success >}}
**MongoDB 3.x to 4.4.x**

Prior to Tyk 5.0.2, Tyk used the `mgo` driver which supported MongoDB 3.x to 4.4.x, but we no longer test MongoDB versions prior to 5.0 since they are EOL.
<br>
We can not guarantee full compatibility with these versions of MongoDB for Tyk and recommend upgrading to a supported MongoDB version. In particular, when using Tyk OAS APIs with [Tyk 5.3.0]({{< ref "developer-support/release-notes/dashboard#TykOAS-v5.3.0" >}}) onwards, the minimum supported version of MongoDB is 5.0.
{{< /note >}}

You can also use the following as a drop-in replacement for MongoDB:

- [Amazon DocumentDB](https://aws.amazon.com/documentdb/) 3.6 and 4 engine
- [Azure Cosmos DB for MongoDB](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/introduction) 3.6 and 4 engine
