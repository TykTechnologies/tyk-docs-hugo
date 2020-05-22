---
date: 2017-03-22T16:19:08Z
Title: On Red Hat (RHEL) / CentOS
menu:
  main:
    parent: "With Tyk On-Premises"
weight: 4
url: "/getting-started/installation/with-tyk-on-premises/redhat-rhel-centos"
---

## Install Tyk API Gateway on Red Hat (RHEL) / CentOS

Installing Tyk on RHEL is very straightforward using our YUM repositories, follow the guides and tutorials in this section to have Tyk up and running in no time.

The suggested order would be to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard](/docs/getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/dashboard/)
- [Pump](/docs/getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/analytics-pump/)
- [Gateway](/docs/getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/gateway/)

> **NOTE**: For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. For more information on deploying to a production environment, see [here](/docs/planning-for-production/).

## Database Support

By default Tyk uses MongoDB. You can also use the following:

* [DocumentDB](https://aws.amazon.com/documentdb/)
* [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)

### Supported Verions of MongoDB and Redis

- MongoDB 3.x and 4.0.x
- Redis 2.8.x to 5.0.x

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

