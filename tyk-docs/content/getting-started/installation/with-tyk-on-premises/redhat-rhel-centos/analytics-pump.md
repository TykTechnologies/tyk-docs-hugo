---
date: 2017-03-22T16:39:29Z
Title: Tyk Pump on Red Hat (RHEL) / CentOS
menu:
  main:
    parent: "On Red Hat (RHEL) / CentOS"
weight: 2 
---

## <a name="install-tyk-redhat"></a>Install Tyk Pump on Red Hat (RHEL) / CentOS

Tyk has it's own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS][2] *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Pump with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

### Prerequisites

*   We are assuming that both Redis and MongoDB are installed (these are installed as part of the Tyk Gateway and Dashboard installation guides)

### Step 1: Set up YUM Repositories

First, we need to install some software that allows us to use signed packages:
```{.copyWrapper}
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

Create a file named `/etc/yum.repos.d/tyk_tyk-pump.repo` that contains the repository configuration below: 

Make sure to replace `el` and `7` in the config below with your Linux distribution and version:
```{.copyWrapper}
[tyk_tyk-pump]
name=tyk_tyk-pump
baseurl=https://packagecloud.io/tyk/tyk-pump/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-pump/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

Finally we'll need to update our local cache, so run:
```{.copyWrapper}
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'
```

### Step 2: Install Packages

We're ready to go, you can now install the relevant packages using yum:
```{.copyWrapper}
sudo yum install -y tyk-pump
```

*(You may be asked to accept the GPG key for our repos and when the package installs, hit yes to continue.)*

### Step 3: Configure Tyk Pump

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly.

> **NOTE**: You need to replace `<hostname>` for `--redishost=<hostname>`, and `<IP Address>` for `--mongo=mongodb://<IP Address>/` with your own values to run this script.


```{.copyWrapper}
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>/tyk_analytics
```
### Step 4: Start Tyk Pump
```{.copyWrapper}
sudo service tyk-pump start
```

That's it, the Pump should now be up and running.

You can verify if Tyk Pump is running and working by accessing the logs:
```{.copyWrapper}
sudo journalctl -u tyk-pump
```
 [1]: https://packagecloud.io
 [2]: http://aws.amazon.com
