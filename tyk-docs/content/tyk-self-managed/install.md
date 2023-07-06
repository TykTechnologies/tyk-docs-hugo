---
date: 2017-03-15T15:01:42Z
title: "Self-Managed Installation"
tags: ["Tyk Stack", "Self-Managed", "Installation"]
description: "How to install the Self-Managed Tyk Stack"
identifier: "tyk-self-managed-installation"
weight: 1
menu: 
    main:
        parent: Tyk Self-Managed
aliases:
  - /tyk-self-managed/istio/
  - "tyk-self-managed/install"
  - /getting-started/installation/with-tyk-on-premises/
  - /get-started/with-tyk-on-premise/installation/
---

## Docker Quick Start

**Prerequisites**

- [Docker](https://docs.docker.com/get-docker/)

Run these commands:

```bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo && cd tyk-pro-docker-demo
```

```bash
docker-compose up
```

Then navigate to [http://localhost:3000](http://localhost:3000) and input the licence key we've emailed you. If you do not have a key then please visit [https://tyk.io/sign-up/](https://tyk.io/sign-up/)

## Other Deployment Methods

{{< grid >}}

{{< badge read="10 mins" href="/tyk-on-premises/docker/" image="/img/docker.png">}}
Install with Docker 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-on-premises/kubernetes" image="/img/k8s.png">}}
Install on K8s 
{{< /badge >}}

{{< badge read="10 mins" href="/tyk-on-premises/ansible/" image="/img/ansible.png">}}
Install with Ansible 
{{< /badge >}}

{{< badge read="10 mins" href="/tyk-on-premises/redhat-rhel-centos/" image="/img/redhat-logo2.png">}}
Install on Red Hat 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-on-premises/debian-ubuntu" image="/img/debian-nd-753.png">}}
Install on Ubuntu 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-on-premises/installation/on-aws" image="/img/aws.png">}}
Install on Amazon AWS 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-on-premises/installation/on-heroku" image="/img/heroku-logo.png">}}
Install Tyk on Heroku 
{{< /badge >}}

{{< badge read="10 mins" href="/tyk-on-premises/microsoft-azure/" image="/img/azure-2.png">}}
Install on Microsoft Azure 
{{< /badge >}}

{{< /grid >}}

We distribute Tyk via Packagecloud.io APT and Yum repositories, as well as via our [Github repository for the Tarballs](http://upstart.ubuntu.com/cookbook/).

{{< button_left href="https://tyk.io/sign-up/#self" color="green" content="Self-managed Free trial" >}}

### Licencing

Read more about licensing [here]({{< ref "tyk-on-premises/licensing" >}}).
