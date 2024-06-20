---
date: 2017-03-22T16:54:02Z
title: Tyk Docker Compose Quick Start
tags: ["Tyk Stack", "Self-Managed", "Installation", "Docker", "Demo"]
description: "How to install the Tyk stack components using our Docker Pro-Demo proof of concept"
menu:
  main:
    parent: "Docker "
weight: 1
aliases:
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-demo/
---

This page outlines how to run Tyk Stack using Docker Compose.

## Who is this page for?
This is the guide we recommend for a easy quick start. The instructions are the ones shared with you when you register to a [free trial]({{< ref "getting-started/quick-start" >}}).

You can also use this guide for your PoC since it spins up a full Tyk Self Managed stack for you using our project *Docker Pro Demo*, however, if you are interested in learning Tyk, there's an option for [Tyk Demo]({{< ref "deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview" >}}) which is a project that spins up full Tyk stack that includes a prepopulate API definitions of all kinds, with various middleware options and can also spin up supporting tools such as Prometheus, Keycloak (IDP) etc.

## What's included?
The *Tyk Pro Docker Demo* is our [Self-Managed]({{< ref "tyk-on-premises" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**

This demo is NOT intended for production use or performance testing, since it uses docker compose and the configuration files are not specifically tuned for performance testing or high loads. Please visit the [Planning for Production]({{<ref "planning-for-production/">}}) page to learn how to configure settings for optimal performance.

{{< /warning >}}
{{< note success >}}
**Note**  

The Tyk Pro Docker demo does not provide access to the [Developer Portal]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal" >}}).
{{< /note >}}

## Prerequisites

* Our [Tyk Pro Docker demo on GitHub](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A Tyk Pro [trial license](https://pages.tyk.io/get-started-with-tyk)

### Step #1 - Clone the GitHub repo

Clone the Docker demo repo from GitHub to a location on your machine.

### Step #2 - Edit your hosts file

You need to add the following to your hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

### Step #3 - Add your developer license

From your installation folder:

Create an `.env` file - `cp .env.example .env.` Then add your license string to `TYK_DB_LICENSEKEY`.

### Step #4 - Initialise the Docker containers

#### With MongoDB

Run the following command from your installation folder:

```docker
docker-compose up
```

#### With PostgreSQL

Run the following command from your installation folder:

```docker
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml up
```

This will will download and setup the five Docker containers. This may take some time and will run in non-daemonised mode so you can see all the output.

### Step #5 - Bootstrap the Tyk installation

Go to [http://localhost:3000](http://localhost:3000) in your browser. You will be presented with the Bootstrap UI to create your first organisation and admin user.

{{< img src="/img/dashboard/system-management/tyk-bootstrap.png" alt="Tyk Bootstrap sceen" width="768">}}


### Step #6 - Create your organisation and default user

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

### Step #7 - log in to the Tyk Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard
Setup screen.

## Removing the demo installation

To delete all containers as well as remove all volumes from your host:

### With MongoDB

```bash
docker-compose down -v
```
### With PostgreSQL:

```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml down -v
```
