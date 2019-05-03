---
date: 2017-03-22T17:04:48Z
title: Install Tyk Pro On-Premises on Vagrant
menu:
  main:
    parent: "Installation"
weight: 5 
---

## Install Tyk on Vagrant

Tyk has a streamlined quickstart setup for Vagrant. This demo works with Ubuntu Precise and makes use of direct-pipes to Bash from a web script. We **do not recommend** doing any of this on a production machine.

### Prerequisites

You need to have [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed before using our Vagrant setup.

Full, detailed instructions on how to [install Tyk on Ubuntu Server (LTS)](https://tyk.io/docs/get-started/with-tyk-on-premise/installation/on-ubuntu/) or how to [install Tyk on Red Hat Enterprise Linux (RHEL)](https://tyk.io/docs/get-started/with-tyk-on-premise/installation/redhat-rhel-centos/) are also available and go through the entire process manually.

Given this caveat, lets get you up and running.

Since we are installing on Vagrant, we're assuming that you are demoing Tyk, and so we'll be going through a full **Tyk Pro** install. This demo will install Tyk Gateway, Tyk Pump and Tyk Dashboard on an Ubuntu box in a Vagrant instance. We are going to do a little bit of hosts hacking to make your portal URL work properly, but apart from that this is a standard installation.

### Step 1: Update hosts file

Edit your `/etc/hosts` file to give yourself a domain for your Portal:
```{.copyWrapper}
127.0.0.1       my-tyk-instance.com
127.0.0.1       portal-instance.com
```

Later, when you have logged into your Dashboard, you can use "Your Developer Portal" -> "Set your portal domain" to set it to this value.

### Step 2: Create folder for testing
```{.copyWrapper}
mkdir tyktest && cd tyktest
```

### Step 3: Create Vagrant image
```{.copyWrapper}
vagrant init
```

### Step 4: Configure the Vagrantfile

A new file called Vagrantfile has been created, we need to expose port 3000 and use the precise64 base box (we assume you've got this, otherwise download it). To do this open the default Vagrant file in a text editor and replace the following line:
```
config.vm.box = "base"
```

with this:
```{.copyWrapper}
config.vm.box = "hashicorp/precise64"
```

then replace this line:
```
config.vm.network "forwarded_port", guest: 80, host: 8080
```

with this:
```{.copyWrapper}
config.vm.network "forwarded_port", guest: 3000, host: 3000
config.vm.network "forwarded_port", guest: 8080, host: 8080
config.vm.network "forwarded_port", guest: 5000, host: 5000
```

### Step 5: Start Vagrant instance and ssh to it
```{.copyWrapper}
vagrant up && vagrant ssh
```

### Step 6: Install MongoDB and Redis

In order for everything to work, you'll need MongoDB and Redis installed, this can be done as follows (instructions accurate at time of writing):
```{.copyWrapper}
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

sudo apt-get update

sudo apt-get install mongodb-org redis-server vim curl
```

This could take a while as there's a lot to install, but it will set up a default MongoDB instance and Redis instance on your Vagrant box, we don't recommend doing this in production.

### Step 7: Update Vagrant box hosts file
```{.copyWrapper}
sudo vim /etc/hosts
```

Add:
```{.copyWrapper}
127.0.0.1       my-tyk-instance.com
127.0.0.1       portal-instance.com
```

### Step 8: Install Tyk

We're going to install Tyk the fast and dirty way, using a special script that detects your environment and handles the full installation from our APT repository:
```{.copyWrapper}
curl -s https://packagecloud.io/install/repositories/tyk/tyk-dashboard/script.deb.sh | sudo bash

curl -s https://packagecloud.io/install/repositories/tyk/tyk-pump/script.deb.sh | sudo bash

curl -s https://packagecloud.io/install/repositories/tyk/tyk-gateway/script.deb.sh | sudo bash

sudo apt-get install tyk-gateway tyk-dashboard tyk-pump
```

Your terminal will update as dependencies and packages are installed, at the end you will be able to bootstrap your new Tyk services.


### Step 9: Configure Tyk Dashboard

We can set the Dashboard up with a similar setup command, the below will get the Dashboard set up for the local instance, **make sure to use the actual DNS hostname or the public IP of your instance as the last parameter**:
```{.copyWrapper}
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=localhost --redisport=6379 --mongo=mongodb://127.0.0.1/tyk_analytics --tyk_api_hostname=my-tyk-instance.com:8080 --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="my-tyk-instance.com"
```

What we have done here is:

*   `--listenport=3000`: Told Tyk Dashboard (and Portal) to listen on port 3000.
*   `--redishost=localhost`: Tyk Dashboard should use the local Redis instance.
*   `--redisport=6379`: Tyk Dashboard should use the default port.
*   `--domain="XXX.XXX.XXX.XXX"`: Bind the Dashboard to the IP or DNS hostname of this instance (required).
*   `--mongo=mongodb://127.0.0.1/tyk_analytics`: Use the local MongoDB (should always be the same as the Gateway).
*   `--tyk_api_hostname=my-tyk-instance.com:8080`: Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it. This is the value that will be displayed in your Dashboard.
*   `--tyk_node_hostname=http://localhost`: Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
*   `--tyk_node_port=8080`: Tell the Dashboard that the Tyk node it should communicate with is on port 8080.
*   `--portal_root=/portal`: We want the portal to be shown on /portal of whichever domain we set for the portal.

### Step 10: Configure Tyk Pump

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly. To configure Tyk Pump is very simple:
```{.copyWrapper}
sudo /opt/tyk-pump/install/setup.sh --redishost=localhost --redisport=6379 --mongo=mongodb://127.0.0.1/tyk_analytics
```

### Step 11: Configure Tyk Gateway

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file, to get things running lets run:
```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --dashboard=http://my-tyk-instance.com:3000 --listenport=8080 --redishost=localhost --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--dashboard=http://YOUR-DASHBOARD_DOMAIN:3000`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the dashboard service, we need to tell it where the Dashboard is. **This MUST be the same domain that you use in step 5.**
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=localhost`: Use Redis on the hostname: localhost.
*   `--redisport=6379`: Use the default Redis port.
*   `--domain=""`: Do not set a domain for the Gateway, see the note on domains below for more about this.

### Step 12: Start Tyk Pump and Tyk Dashboard
```{.copyWrapper}
sudo service tyk-dashboard start

sudo service tyk-pump start
```


### Step 13: Enter Dashboard license

Add your license in `/var/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

If all is going well, you will be taken to a log in screen - we'll get to that soon.

### Step 14: Restart Dashboard and start Gateway

Because we've just entered a license via the UI, we need to make sure that these changes get picked up, so to make sure things run smoothly, we restart the Dashboard process (you only need to do this once) and then start the Gateway:
```{.copyWrapper}
sudo service tyk-dashboard restart

sudo service tyk-gateway start
```

### Step 15: Bootstrap the Dashboard with an initial user and organisation

When Tyk Dashboard is created for the first time, it has no initial user base or organisation to add data to, so we need to add this.

The best way to add this data is with the Admin API, to make it really easy we've supplied a bootstrap script that will set you up. If you want to customise it, take a look at the file in `/opt/tyk-dashboard/install/bootstrap.sh`

**To bootstrap your instance, run from INSIDE the Vagrant box**:
```{.copyWrapper}
sudo /opt/tyk-dashboard/install/bootstrap.sh my-tyk-instance.com
```

This command tells the bootstrap script to use the localhost as the base for the API calls, you can run the bootstrap remotely and change the first command line parameter to the DNS hostname of your instance.

You will now be able to log into and test your Tyk instance from `http://your-host-name:3000/` with the values given to you by the bootstrap script.

#### Next Steps

*   [Set up and test your first API](https://tyk.io/docs/get-started/with-tyk-on-premise/tutorials/tyk-on-premises-pro/create-api/)
*   [Set up your portal and publish your first API](https://tyk.io/docs/publish/tutorials/publish-api-developer-portal/)


