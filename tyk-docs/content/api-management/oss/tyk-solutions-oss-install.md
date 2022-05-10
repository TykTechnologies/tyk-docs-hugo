---
title: "Get Started with OSS"
identifier: "oss-get-started"
date: 2020-06-24
weight: 1
linkTitle: "Open Source Installation"
tags: ["Tyk API Management", "Open Source", "API Gateway", "Installation"]
description: "Installation options and how the Tyk Gateway integrates with the rest of the Tyk stack"
menu:
    main:
        parent: "Tyk Open Source"
url: "/apim/open-source/installation"
---

## Installation

The backbone of all our products is our open source Gateway. You can install our Open Source / Community Edition on the following platforms:

{{< grid >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-docker/" image="/docs/img/docker.png">}}
Install with Docker. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-kubernetes/" image="/docs/img/k8s.png">}}
Install with K8s. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-ansible/" image="/docs/img/ansible.png">}}
Install with Ansible. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-redhat-rhel-centos/" image="/docs/img/redhat-logo2.png">}}
Install on RHEL / CentOS. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-debian-ubuntu/" image="/docs/img/debian-nd-753.png">}}
Install on Debian / Ubuntu. 
{{< /badge >}}

{{< badge read="10 mins" href="https://github.com/TykTechnologies/tyk" image="/docs/img/GitHub-Mark-64px.png">}}
Visit our Gateway GitHub Repo. 
{{< /badge >}}

{{< /grid >}}


## Architecture

The Tyk Gateway can run completely independently, requiring only a Redis database, and can scale horizontally:

![Tyk Open Source Deployment](/docs/img/diagrams/gateway3.png)


## Other Tyk Open Source components

Combine with the other [Tyk OSS products](/docs/tyk-stack) For even more power, such as analytics exporting, version control integration, and more.

![OSS-Guide](/docs/img/diagrams/oss-flow.png)


## Next Steps

Once installed, let's go create [your first API](/docs/getting-started/create-api/).

