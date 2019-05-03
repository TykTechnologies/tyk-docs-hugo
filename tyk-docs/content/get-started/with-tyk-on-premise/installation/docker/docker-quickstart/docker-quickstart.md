---
date: 2017-03-22T16:54:02Z
title: Docker Demo
notoc: true

---

## Get Started with Docker & Tyk API Gateway

> **Warning!** This demo is **NOT** designed for production use or performance testing. Tyk API Gateway is a full, On-Premise solution, which includes our  Gateway, Dashboard and analytics processing pipeline.
This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and Mongodb.
This demo is great for proof of concept and demo purposes, but if you want to test performance, you need to move each component to a separate machine.

Getting started with Tyk and Docker is very quick. We have set up a Docker Compose configuration that will get you up and running with a few commands. 
This tutorial and scripts assume you have already installed the following: 

*   Docker
*   Docker compose
*   Python
    *   The json module for Python which should be install by default.
    *   Please remember to add Python to your PATH.

What we will do in this setup guide is build the entire stack (the Gateway and the Dashboard) in one go.

The way the Tyk Docker images are set up is:

*   Tyk Gateway container: This is a stand-alone container for the Tyk Gateway that manages your traffic
*   Tyk Dashboard container: This is your Dashboard and your Portal
*   Tyk Pump container: This is the data and analytics pump that moves analytics from Tyk to the Dashboard

Domain handling is built into the main stack and no additional components are required to route to your portal except setting the domain name when you initialise your organisation.

### Working with Docker

In order for everything to work in a single Docker instance, assuming everything is on a single server, we will want all traffic to go through port 80, even though the Dashboard runs on port 3000 and the Gateway on port 8080.

**How we do this is:**

1.  We set up a DNS instance in the Docker Compose container group, this will ensure we have two-way routing between the Gateway and the Dashboard images (if you don't link your containers you won't need this).
2.  Run the Tyk Gateway so it can accept traffic on port 8080, but expose port 80 and map that so 80->8080.
3.  We override the `tyk.conf` file in the Tyk Gateway container with one that is specifically set up for this tutorial.
4.  Run the Tyk Dashboard on port 3000 and expose port 3000 (so you can see the Dashboard).
5.  Override the `tyk_analytics.conf` file with one that is specifically for a Docker setup.
6.  Run a setup script that will:
    
    *   Create an organisation for you
    *   Create a new user so you can log into the Dashboard
    *   Add three APIs to the Gateway that proxy to your new organisation Portal, Portal assets and public API
    *   Create a Portal home page with some dummy content

#### Step 1: Set up the Hosts Entries

We are assuming that you are running this on a local Docker installation. The Tyk Portal requires a domain name to bind to in order to work properly, so let's make sure we set that up in `/etc/hosts`:
```{.copyWrapper}
127.0.0.1    www.tyk-portal-test.com
```

This entry will be used to access our Portal.

> **Note**: OS X (v10.11 or earlier) or Kitematic users (v0.11.0 or earlier) should change this to their Docker Host IP Address. You can find this out by running `docker-machine ip default`.

#### Step 2: Get the Docker Demo Compose Files

Our Docker Demo is a GitHub repository that contains everything you need to start Tyk, let's clone it locally:
```{.copyWrapper}
git clone https://github.com/TykTechnologies/tyk_quickstart.git
cd tyk_quickstart
```

**A quick note for those using an older Docker client (previous to Docker client v1.9.0):** There is another YML file for older clients in the repository, use this by specifying `-f docker-compose-pre-1.9.yml` directly after docker-compose (like `docker-compose -f docker-compose-pre-1.9.yml up -d`).

#### Step 3: Add Your Tyk Dashboard License

Go grab a Tyk Starter License (completely free), and edit the `tyk_analytics.conf` file in the the `tyk_quickstart` directory.

Add your license to the field marked `license`:
```{.copyWrapper}
{
  ...
  "mongo_url": "mongodb://mongo:27017/tyk_analytics",
  "license_key": "LICENSEKEY",
  "page_size": 10,
  ...
}
```

Save the file and start your containers in the step below.

#### Step 4: Bootstrap the Dashboard and Portal

We've included a setup script that will create an organisation, a user and create the proxy configurations for your Portal:
```{.copyWrapper}
docker-compose up -d --force-recreate
./setup.sh
```

#### Step 5: Log In

The setup script will provide login details for your Dashboard - go ahead and log in.

> **Note for Your Portal setup**: In order to create your portal definition and get the whole system bootstrapped , you need to visit the *Settings* section under *Portal Management* on the left hand side menu and you shall get a notification confirming that the configuration has been created.
> 
> If you wish to change your Portal domain, **do not use** the drop-down option in the navigation, instead, change the domain names in the three site entries in the API section. However, if you want clean URLs constructed for your APIs in the Dashboard, setting this value will show the URLs for your APIs as relative to the domain you've set.
