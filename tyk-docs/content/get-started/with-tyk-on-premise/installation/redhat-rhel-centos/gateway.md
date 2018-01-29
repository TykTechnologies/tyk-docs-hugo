---
date: 2017-03-22T16:24:18Z
Title: Gateway on Redhat (RHEL) / CentOS
menu:
  main:
    parent: "On Redhat (RHEL) / CentOS"
weight: 3 
---

## <a name="install-tyk-redhat-gateway"></a>Install Tyk API Gateway on Redhat

Tyk has it's own signed RPMs in a yum repository hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS][2] *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Gateway with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

**Pre-requisites**:

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (API traffic to be proxied)

### Step 1: Set up yum repositories

First, we need to install some software that allows us to use signed packages:
```{.copyWrapper}
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

### Step 2: Create Tyk Gateway repository configuration

Create a file named `/etc/yum.repos.d/tyk_tyk-gateway.repo` that contains the repository configuration below https://packagecloud.io/tyk/tyk-gateway/install#manual-rpm:
```{.copyWrapper}
[tyk_tyk-gateway]
name=tyk_tyk-gateway
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=http://keyserver.tyk.io/tyk.io.rpm.signing.key
       https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

### Step 3: Install EPEL

EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn't a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis, run this command to get it. Full instructions available here http://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F:
```{.copyWrapper}
sudo yum install -y epel-release
sudo yum update
```

Finally we'll need to update our local cache, so run:
```{.copyWrapper}
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway' --enablerepo=epel
```

### Step 4: Install packages

We're ready to go, you can now install the relevant packages using yum:
```{.copyWrapper}
sudo yum install -y redis tyk-gateway
```

*(you may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue)*

### Step 5: Start Redis

In many cases Redis will not be running, so let's start those:
```{.copyWrapper}
sudo service redis start
```

When Tyk is finished installing, it will have installed some init scripts, but it will not be running yet. The next step will be to setup the Gateway – thankfully this can be done with three very simple commands, however it does depend on whether you are configuring Tyk Gateway for use with the Dashboard or without (Community Edition).

## <a name="configure-tyk-community-edition"></a>Configure Tyk Gateway Community Edition

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file. To get things started, run:
```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=localhost --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=localhost`: Use the hostname `localhost` for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, we don't want Tyk to listen on a single domain, and we can always set up custom domains at the API level in the Dashboard. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this commannd to start the Tyk Gateway:
```{.copyWrapper}
sudo service tyk-gateway start
```

## <a name="configure-with-dashboard"></a>Configure Tyk Gateway with the Dashboard

### Prerequisites

This configuration assumes that you have already installed Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

### Set up Tyk

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file. To get things running let's run:
```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --dashboard=1 --listenport=8080 --redishost=localhost --redisport=6379
```

What we've done here is told the setup script that:

*   `--dashboard=1`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the Dashboard service, as of v2.3 Tyk will auto-detect the location of the dashboard, we only need to specify that we should use this mode.
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=localhost`: Use Redis on the hostname: localhost.
*   `--redisport=6379`: Use the default Redis port.

#### Pro Tip: Domains with Tyk Gateway

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.


[1]: https://packagecloud.io
[2]: http://aws.amazon.com
