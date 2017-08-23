---
date: 2017-03-22T16:14:35Z
Title: Tyk Pump on Ubuntu
menu:
  main:
    parent: "On Ubuntu"
weight: 2 
---

## Install Tyk Pump on Ubuntu

### What is Tyk Pump?

Tyk Pump is responsible for moving analytics between the your API Gateway and the Dashboard database, it can also send data to other sinks such as ElasticSearch, StatsD and InfluxDB.

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Pump application.

#### Tutorial

This tutorial will run on an [Amazon AWS][2] *Ubuntu Server 14.04 LTS* instance. We will install Tyk Pump with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

**Pre-requisites**:

*   You have installed MongoDB and Redis.
*   You have installed the Tyk Dashboard.

#### Step 1: Set up our APT repositories

First, add our GPGP key which signs our binaries:
```{.copyWrapper}
    curl https://packagecloud.io/gpg.key | sudo apt-key add -
```

Run update:
```{.copyWrapper}
    sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:
```{.copyWrapper}
    sudo apt-get install -y apt-transport-https 
``` 

Now lets add the required repos and update again (notice the `-a` flag in the second Tyk commands - this is important!):
```{.copyWrapper}
     echo "deb https://packagecloud.io/tyk/tyk-pump/ubuntu/ trusty main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-pump.list
    
    echo "deb-src https://packagecloud.io/tyk/tyk-pump/ubuntu/ trusty main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-pump.list
    
    sudo apt-get update
```

**What we've done here is:**

*   Added the Tyk Pump repository
*   Updated our package list

#### Step 2: Install the Tyk Pump

We're now ready to install the Tyk Pump. To install it, run:
```{.copyWrapper}
    sudo apt-get install -y tyk-pump
```

What we've done here is instructed apt-get to install Tyk Pump without prompting. Wait for the downloads to complete.

When Tyk Pump is finished installing, it will have installed some `init` scripts, but it will not be running yet. The next step will be to setup each application - thankfully this can be done with three very simple commands.

#### Step 3: Configure Tyk Pump

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly, to configure Tyk Pump is very simple:
```{.copyWrapper}
    sudo /opt/tyk-pump/install/setup.sh --redishost=localhost --redisport=6379 --mongo=mongodb://127.0.0.1/tyk_analytics
```

#### Step 4: Start Tyk Pump
```{.copyWrapper}
    sudo service tyk-pump start
```

You can verify if Tyk Pump is running and working by tailing the log file:
```{.copyWrapper}
    sudo tail -f /var/log/upstart/tyk-pump.log
```

[1]: https://packagecloud.io
[2]: http://aws.amazon.com



