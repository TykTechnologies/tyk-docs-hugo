---
date: 2017-03-22T15:55:18Z
Title: Gateway on Ubuntu
menu:
  main:
    parent: "On Ubuntu"
weight: 3 
---

## <a name="install-tyk-ubuntu-gateway"></a>Install Tyk Gateway on Ubuntu

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an Amazon AWS **Ubuntu Server 14.04 LTS** instance. We will install the Tyk Gateway with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

### Prerequisites

*   Ensure port `8080` is available. This is used in this guide for Gateway traffic (API traffic to be proxied).
*   You have MongoDB and Redis installed.
*   You have installed firstly the Tyk Dashboard, then the Tyk Pump.

### Step 1: Set up our APT Repositories

First, add our GPG key which signs our binaries:
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
echo "deb https://packagecloud.io/tyk/tyk-gateway/ubuntu/ trusty main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-gateway.list

echo "deb-src https://packagecloud.io/tyk/tyk-gateway/ubuntu/ trusty main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-gateway.list

sudo apt-get update
```

**What we've done here is:**

*   Added the Tyk Gateway repository
*   Updated our package list

### Step 2: Install the Tyk Gateway

We're now ready to install the Tyk Gateway. To install it, run:
```{.copyWrapper}
sudo apt-get install -y tyk-gateway
```

What we've done here is instructed apt-get to install the Tyk Gateway without prompting, wait for the downloads to complete.

When Tyk is finished installing, it will have installed some init scripts, but it will not be running yet. The next step will be to setup the Gateway - thankfully this can be done with three very simple commands, however it does depend on whether you are configuring Tyk Gateway for use with the Dashboard or without (Community Edition).

## <a name="configure-tyk-gateway-with-dashboard"></a> Configure Tyk Gateway with Dashboard

### Prerequisites

This configuration assumes that you have already installed the Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

### Set up Tyk

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file. 

> **NOTE**: You need to replace `<hostname>` for `--redishost=<hostname>`with your own value to run this script.

```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --dashboard=1 --listenport=8080 --redishost=<hostname> --redisport=6379
```

What we've done here is told the setup script that:

*   `--dashboard=1`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the Dashboard service, as of v2.3 Tyk will auto-detect the location of the dashboard, we only need to specify that we should use this mode.
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=<hostname>`: Use Redis on your hostname.
*   `--redisport=6379`: Use the default Redis port.

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
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.

[1]: https://packagecloud.io/tyk