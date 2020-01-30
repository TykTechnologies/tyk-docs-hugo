---
date: 2017-03-22T17:04:48Z
title: Install Tyk Pro On-Premises on Vagrant
menu:
  main:
    parent: "With Tyk On-Premises"
weight: 5 
---

## Install Tyk on Vagrant

Tyk has a streamlined quickstart setup for Vagrant. This demo works with Ubuntu Xenial (16.04) and makes use of direct-pipes to Bash from a web script. This is a quick way to demo Tyk - **this installation method is not suitable for production**.

Full, detailed instructions on how to [install Tyk on Ubuntu Server (LTS)](/docs/getting-started/with-tyk-on-premises/installation/on-ubuntu/) or how to [install Tyk on Red Hat Enterprise Linux (RHEL)](/docs/getting-started/with-tyk-on-premises/installation/redhat-rhel-centos/) are also available and go through the entire process manually.

Given this caveat, lets get you up and running.

Since we are installing on Vagrant, we're assuming that you are demoing Tyk, and so we'll be going through a full **Tyk Pro** install. This demo will install Tyk Gateway, Tyk Pump and Tyk Dashboard on an Ubuntu box in a Vagrant instance. We are going to do a little bit of hosts hacking to make your portal URL work properly, but apart from that this is a standard installation.

### Prerequisites

You need to have [VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed before using our Vagrant setup.

### Step 1: Update hosts file

Add a domain for your Tyke Portal by editing your host system `/etc/hosts` file.

```{.copyWrapper}
127.0.0.1       my-tyk-instance.com
127.0.0.1       portal-instance.com
```

Later, when you have logged into your Tyk Bootstrap Dashboard, you can use "Your Developer Portal" -> "Set your portal domain" to set it to *portal-instance.com*.

### Step 2: Create folder for testing
```{.copyWrapper}
mkdir tyktest && cd tyktest
```

### Step 3: Start Vagrant instance
```{.copyWrapper}
vagrant up
```

This could take a while as there's a bit to install, but it will set up a default MongoDB instance and Redis instance on your Vagrant box, **we don't recommend doing this in production**.

What we have done for you in the Vagrant file is:

*   `--listenport=3000`: Told Tyk Dashboard (and Portal) to listen on port 3000.
*   `--redishost=localhost`: Tyk Dashboard should use the local Redis instance.
*   `--redisport=6379`: Tyk Dashboard should use the default port.
*   `--domain="XXX.XXX.XXX.XXX"`: Bind the Dashboard to the IP or DNS hostname of this instance (required).
*   `--mongo=mongodb://127.0.0.1/tyk_analytics`: Use the local MongoDB (should always be the same as the Gateway).
*   `--tyk_api_hostname=my-tyk-instance.com:8080`: Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it. This is the value that will be displayed in your Dashboard.
*   `--tyk_node_hostname=http://localhost`: Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
*   `--tyk_node_port=8080`: Tell the Dashboard that the Tyk node it should communicate with is on port 8080.
*   `--portal_root=/portal`: We want the portal to be shown on /portal of whichever domain we set for the portal.

we also configured Tyk-Pump and Tyk-gateway and started it for you.

*   `--dashboard=http://YOUR-DASHBOARD_DOMAIN:3000`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the dashboard service, we need to tell it where the Dashboard is. **This MUST be the same domain that you use in step 1.**
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=localhost`: Use Redis on the hostname: localhost.
*   `--redisport=6379`: Use the default Redis port.
*   `--domain=""`: Do not set a domain for the Gateway, see the note on domains below for more about this.

### Step 4 - Test the Tyk Dashboard URL

Go to: <http://my-tyk-instance:3000> which will load the bootstrap welcome page. Here you can input your license file.

![Tyk Dashboard Bootstrap Screen][1]

### Step 5 - Create your Organisation and Default User

You need to enter the following:

* Your **Organisation Name**
* Your **Organisation Slug**
* Your User **Email Address**
* Your User **First and Last Name**
* A **Password** for your User
* **Re-enter** your user **Password**

> **NOTE**: For a password, we recommend a combination of alphanumeric characters, with both upper and lower case letters.

Click **Bootstrap** to save the details.

### Step 6 - Login to the Dashboard

You can now log in to the Tyk Dashboard from <http://my-tyk-instance.com:3000> using the username and password created in the Dashboard Setup screen.

#### Next Steps

* [Set up and test your first API](/docs/try-out-tyk/tutorials/create-api/)
* [Set up your portal and publish your first API](/docs/try-out-tyk/tutorials/create-portal-entry/)
