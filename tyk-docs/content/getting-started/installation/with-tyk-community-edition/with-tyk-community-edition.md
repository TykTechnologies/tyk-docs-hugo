---
date: 2017-03-15T15:01:42Z
title: With Tyk Community Edition
menu: 
  main:
    parent: "Installation"
weight: 6
url: "/getting-started/installation/with-tyk-community-edition"
---

## <a name="what-is-tyk-community-edition"></a>What is the Tyk Community Edition?

The Tyk Community Edition is the open-source API Gateway that is developed by our community and supported by our community members and advocates (with some help from the Tyk Technologies team). The Tyk Community Edition is a [Tyk Gateway](/docs/getting-started/tyk-components/gateway/) only edition:


## <a name="prerequisites"></a>Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
*   You have Redis installed and running

```{.copyWrapper}
sudo apt-get install -y redis-server
```

## <a name="install-on-ubuntu"></a>Installing on Ubuntu

First import the public key as required by Ubuntu APT

```{.copyWrapper}
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

### Run Installation Scripts

#### Install the Gateway

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your Ubuntu version. We have packages for the following:
 * Xenial
 * Trusty
 * Precise

* Via Quick Installation Instructions. You can use: 
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-deb)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

### <a name="configure-tyk-community-edition"></a>Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

> **NOTE**: You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.

```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, we don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this commannd to start the Tyk Gateway:
```{.copyWrapper}
sudo service tyk-gateway start
```

## <a name="installing-on-redhat-centos"></a>Installing on RedHat (RHEL) / Centos

### Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
*   EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn't a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis DB. Install EPEL using the instructions [here](http://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F).
*   Install Redis using EPEL

```{.copyWrapper}
sudo yum install -y redis
```

> **NOTE**: You may be asked to accept the GPG key for our repos and when the package installs, click yes to continue.

*   Tyk requires Python 3.4. Install via the following command:

```{.copyWrapper}
sudo yum install python34
```

### Start Redis

In many cases Redis might not be running, so let's start that:
```{.copyWrapper}
sudo service redis start
```

### Run Installation Scripts

#### Install the Gateway

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your RHEL version. We have packages for the following:
 * RHEL 7
 * RHEL 6
 
* Via Quick Installation Instructions. You can use:
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-rpm)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

### <a name="configure-tyk-community-edition"></a>Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

> **NOTE**: You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.

```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, we don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```{.copyWrapper}
sudo service tyk-gateway start
```

#### Pro Tip: Domains with Tyk Gateway

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.