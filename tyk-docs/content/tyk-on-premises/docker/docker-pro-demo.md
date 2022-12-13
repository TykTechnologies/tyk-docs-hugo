---
date: 2017-03-22T16:54:02Z
title: Docker Pro Demo
tags: ["Tyk Stack", "Self-Managed", "Installation", "Docker", "Demo"]
description: "How to install the Tyk stack components using our Docker Pro-Demo proof of concept"
menu:
  main:
    parent: "Docker "
weight: 1
aliases:
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-demo/
---

## Proof of Concept with our Docker Pro Demo

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing.
{{< /warning >}}


The Tyk Pro Docker demo is our [Self-Managed]({{< ref "/content/tyk-on-premises.md" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< note success >}}
**Note**  

The Pro Docker demo does not provide access to the [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}).
{{< /note >}}

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

From your installation folder:

Create an `.env` file - `cp .env.example .env.` Then add your license string to `TYK_DB_LICENSEKEY`.

### Step Four - Initialise the Docker containers

#### With MongoDB

Run the following command from your installation folder:

```{copy.Wrapper}
docker-compose up
```

#### With PostgreSQL

Run the following command from your installation folder:

```{copy.Wrapper}
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml up
```

This will will download and setup the five Docker containers. This may take some time and will run in non-daemonised mode so you can see all the output.

### Step Five - Bootstrap the Tyk installation

Go to http://localhost:3000 in your browser. You will be presented with the Bootstrap UI to create your first organisation and admin user.

{{< img src="/img/dashboard/system-management/tyk-bootstrap.png" alt="Tyk Bootstrap sceen" >}}


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

## Removing the demo installation

To delete all containers as well as remove all volumes from your host:

### With MongoDB

```
docker-compose down -v
```
### With PostgreSQL:

```
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml down -v
```
