---
date: 2017-03-22T15:46:41Z
Title: On Ubuntu
menu:
  main:
    parent: "With Tyk On-Premises"
weight: 2
url: "/getting-started/installation/with-tyk-on-premises/on-ubuntu"

---

## <a name="ubuntu"></a> Install Tyk API Gateway on Ubuntu

Installing Tyk on Ubuntu is very straightforward, follow the guides and tutorials in this section to have Tyk up and running in no time.

> **NOTE**: For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Deploy to Production](https://tyk.io/docs/deploy-tyk-premise-production/) For more details.

## <a name="prerequisites"></a> Prerequisites

Before installing the Tyk components in the order below, you need to install firstly MongoDB, then Redis.

### Supported Verions of MongoDB and Redis

- MongoDB 3.x and 4.0.x
- Redis 2.8.x to 5.0.x

### Install MongoDB 3.2

First import the public key as required by Ubuntu APT

```{.copyWrapper}
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

Then create a MongoDB source list file

**On Ubuntu Xenial 16.04**

```{.copyWrapper}
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

Reload the package database

```{.copyWrapper}
sudo apt-get update
```

Then run the install script.

```{.copyWrapper}
sudo apt-get install -y mongodb-org
```

Finally, start the mongod service - then ensure all is running.

**On Ubuntu Xenial 16.04**

```
# sudo service mongod start
# sudo service mongod status
● mongod.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-27 17:47:45 UTC; 5s ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 1751 (mongod)
    Tasks: 23
   Memory: 168.7M
      CPU: 1.416s
   CGroup: /system.slice/mongod.service
           └─1751 /usr/bin/mongod --config /etc/mongod.conf

Apr 27 17:47:45 ubuntu-s-1vcpu-2gb-lon1-01 systemd[1]: Started High-performance, schema-free document-o
```

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
