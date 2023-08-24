---
date: 2017-03-22T16:54:02Z
title: Docker Pro Demo on Windows Linux Subsystem
tags: ["Tyk Stack", "Self-Managed", "Installation", "Docker", "Demo", "Windows", Linux Subsystem]
description: "How to install our Docker Pro-Demo proof of concept using Docker on Windows with the Linux Subsystem installed"
menu:
  main:
    parent: "Docker "
weight: 2
aliases:
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-wsl/
---

## Proof of Concept with our Docker Pro Demo

The Tyk Pro Docker demo is our full [Self-Managed]({{< ref "/content/tyk-on-premises.md" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing. 
{{< /warning >}}

{{< note success >}}
**Note**  

You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.
{{< /note >}}


## Prerequisites

- MS Windows 10 Pro with [Windows Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) enabled
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- Git for Windows
- PowerShell running as administrator
- Postman for [Windows](https://www.getpostman.com/downloads/)
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk Self-Managed [Developer licence](https://tyk.io/product/tyk-on-premises-free-edition/)
- Optional: Ubuntu on Windows

### Step One - Clone the Repo

Clone the repo above to a location on your machine.

### Step Two - Edit your hosts file

You need to add the following to your Windows hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

### Step Three - Configure file permissions
In order to mount the files, you need to allow Docker engine has access to your Drive. 
You can do that by going to the Docker settings, Shared Drives view, and manage the access. 
If after all you will get issue regarding path permissions, you will need to create a separate user specifically for the docker according to this instructions https://github.com/docker/for-win/issues/3385#issuecomment-571267988


### Step Four - Add your Developer Licence

You should have received your free developer licence via email. Copy the licence key in the following location from your `\confs\tyk_analytics.conf` file:

```
"license_key": ""
```

### Step Five - Run the Docker Compose File

From PowerShell, run the following command from your installation folder:

```console
docker-compose up
```

This will will download and setup the five Docker containers. This may take some time and will display all output.

**NOTE**
If you are getting issues related to errors when mounting files, you may need to modify 
`docker-compose.yml` file, and change configs paths from related to absolute, and from linux format to windows format, like this:
```
volumes:
  - C:\Tyk\confs\tyk_analytics.conf:/opt/tyk-dashboard/tyk_analytics.conf
```

### Step Six - Got to the Dashboard URL

Go to:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

### Step Seven - Create your Organisation and Default User

You need to enter the following:

- Your **Organisation Name**
- Your **Organisation Slug**
- Your User **Email Address**
- Your User **First and Last Name**
- A **Password** for your User
- **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}

Click **Bootstrap** to save the details.

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

## Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalogue]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).
