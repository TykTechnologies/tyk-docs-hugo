---
date: 2017-03-22T16:54:02Z
title: Docker Pro Demo
menu:
  main:
    parent: "With Docker"
weight: 1
---

## Get Started with Docker & Tyk API Gateway

> **Warning!** This demo is **NOT** designed for production use or performance testing. The Tyk Pro Docker demo is our
> full [On-Premises](https://tyk.io/api-gateway/on-premise/) solution, which includes our Gateway, Dashboard, and
> analytics processing pipeline. This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk
> Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but
> if you want to test performance, you will need to move each component to a separate machine.

## Prerequisites

* Our [Tyk Pro Docker demo on GitHub](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A free Tyk On-Premises [Developer licence](https://tyk.io/get-started/)

### Step One - Clone the GitHub repo

Clone the Docker demo repo from GitHub to a location on your machine.

### Step Two - Edit your hosts file

You need to add the following to your hosts file:

```{copy.Wrapper}
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

### Step Three - Add your developer licence

You should have received an e-mail with your free developer licence after going through
[the signup process](https://signup.tyk.io/product/tyk-on-premises-free-edition/).

Copy the license key to the following location in your `/confs/tyk_analytics.conf` file:

``` conf
"license_key": ""
```

### Step Four - Run the Docker Compose file

Run the following command from your installation folder:

```{copy.Wrapper}
docker-compose -f docker-compose.yml -f docker-local.yml up
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

> **NOTE**: For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.

Click **Bootstrap** to save the details.

### Step Seven - log in to the Tyk Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard
Setup screen.

[1]: /docs/img/dashboard/system-management/bootstrap_screen.png
