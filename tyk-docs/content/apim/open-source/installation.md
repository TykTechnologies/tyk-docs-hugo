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
---

## Installation

The backbone of all our products is our open source Gateway. You can install our Open Source / Community Edition on the following platforms:

{{< grid >}}

{{< badge read="10 mins" href="tyk-oss/ce-docker/" image="/img/docker.png">}}
Install with Docker. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-kubernetes/" image="/img/k8s.png">}}
Install with K8s. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-ansible/" image="/img/ansible.png">}}
Install with Ansible. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-redhat-rhel-centos/" image="/img/redhat-logo2.png">}}
Install on RHEL / CentOS. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-debian-ubuntu/" image="/img/debian-nd-753.png">}}
Install on Debian / Ubuntu. 
{{< /badge >}}

{{< badge read="10 mins" href="https://github.com/TykTechnologies/tyk" image="/img/GitHub-Mark-64px.png">}}
Visit our Gateway GitHub Repo. 
{{< /badge >}}

{{< /grid >}}


## Architecture

The Tyk Gateway can run completely independently, requiring only a Redis database, and can scale horizontally:

{{< img src="/img/diagrams/oss-architecture.png" alt="Open Source Architecture" >}}




## Other Tyk Open Source components

Combine with the other [Tyk OSS products]({{< ref "tyk-stack" >}}) For even more power, such as analytics exporting, version control integration, and more.

{{< img src="/img/diagrams/oss-flow.png" alt="Open Source Components" >}}


## Next Steps

Once installed, let's go create [your first API]({{ ref "getting-started/create-api" >}}).

