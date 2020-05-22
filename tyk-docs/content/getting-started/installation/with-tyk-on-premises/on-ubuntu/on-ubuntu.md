---
date: 2017-03-22T15:46:41Z
Title: On Ubuntu
menu:
  main:
    parent: "With Tyk On-Premises"
weight: 3
url: "/getting-started/installation/with-tyk-on-premises/on-ubuntu"

---

## <a name="ubuntu"></a> Install Tyk API Gateway on Ubuntu

Installing Tyk on Ubuntu is very straightforward, follow the guides and tutorials in this section to have Tyk up and running in no time.

> **NOTE**: For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Deploy to Production](https://tyk.io/docs/deploy-tyk-premise-production/) For more details.

## <a name="prerequisites"></a> Prerequisites

Before installing the Tyk components in the order below, you need to install firstly MongoDB, then Redis.

### Default Ports

| Application             | Port           |
|-------------------------|----------------|
|MongoDB                  |      27017     |
|Redis                    |      6379      |
|**Tyk Dashboard**        |                |
|Developer Portal         |      3000      |
|Admin Dashboard          |      3000      |
|Admin Dashboard API      |      3000      |
|**Tyk Gateway**          |                |
|Management API           |      8080      |

## Database Support

By default Tyk uses MongoDB. You can also use the following:

* [DocumentDB](https://aws.amazon.com/documentdb/)
* [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)

### Supported Verions of MongoDB and Redis

- MongoDB 3.x and 4.0.x
- Redis 2.8.x to 5.0.x

### Install MongoDB 4.0

You should follow the [online tutorial for installing MongoDb](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-ubuntu/). We will be using version 4.0. As part of the Mongo installation you need to perform the following:

1. Import the public key
2. Create a list file
3. Reload the package database
4. Install the MongoDB packages
5. Start MongoDB
6. Check the `mongod` service is running

### Install Redis

```{.copyWrapper}
sudo apt-get install -y redis-server
```

We then recommend installing Tyk in the following order:

- [Dashboard][2]
- [Pump][1]
- [Gateway][3]

[1]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/analytics-pump
[2]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/dashboard
[3]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/gateway/
