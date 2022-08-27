---
date: 2017-03-22T16:54:02Z
title: Docker Pro Demo
tags: ["Tyk Stack", "Self-Managed", "Installation", "Docker", "Demo"]
description: "How to install the Tyk stack components using our Docker Pro-Demo proof of concept"
menu:
  main:
    parent: "Docker "
weight: 1
url: "/tyk-on-premises/docker/docker-pro-demo/"
aliases:
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-demo/
---

## Proof of Concept with our Docker Pro Demo

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing.
{{< /warning >}}

We have a video which goes through installing our Docker Pro demo on your local machine, setting up a basic API and considerations for moving from POC to Production.

{{< youtube tMrjEa5VRLg >}}


The Tyk Pro Docker demo is our full [Self-Managed]({{< ref "/content/tyk-on-prem/with-tyk-on-premises.md" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

## Prerequisites

* Our [Tyk Pro Docker demo on GitHub](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A Tyk Pro [trial license](https://pages.tyk.io/get-started-with-tyk)

### Step One - Clone the GitHub repo

Clone the Docker demo repo from GitHub to a location on your machine.

### Step Two - Edit your hosts file

You need to add the following to your hosts file:

```{copy.Wrapper}
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

### Step Three - Add your developer licence

Copy the license key to the following location in your `/confs/tyk_analytics.conf` file:

``` conf
"license_key": ""
```

### Step Four - Run the Docker Compose file

Run the following command from your installation folder:

```{copy.Wrapper}
docker-compose up
```

This will will download and setup the five Docker containers. This may take some time and will display all output.

### Step Five - Test the Tyk Dashboard URL

Go to:

```{copy.Wrapper}
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

![Tyk Dashboard Bootstrap screen][1]

### Step Six - Create your organisation and default user

You need to enter the following:

* Your **Organisation Name**
* Your **Organisation Slug**
* Your User **Email Address**
* Your User **First and Last Name**
* A **Password** for your User
* **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}


Click **Bootstrap** to save the details.

### Step Seven - log in to the Tyk Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard
Setup screen.

## Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-stack/tyk-developer-portal/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalogue]({{< ref "/content/getting-started/tutorials/create-portal-entry.md" >}}).

[1]: /docs/img/dashboard/system-management/bootstrap_screen.png
