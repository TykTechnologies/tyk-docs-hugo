---
title: "Tyk Cloud"
date: 2023-07-24
tags: ["Tyk Stack", "Tyk Cloud", "SaaS"]
description: "The Tyk Cloud SaaS solution for API management"
weight: 10
menu:
  main:
    parent: "API Management"
aliases:
  - /get-started/with-tyk-hybrid/
---



Tyk cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}}).

- **No need to wrestle with infrastructure:** You can be up and running within a few clicks. No need for complex deployments or large infrastructure teams.
- **Flexible deployment options:** Whether you're a startup or a large enterprise, Tyk Cloud has deployment options to suit your needs. You can scale and manage your API ecosystem easily and efficiently. The control plane is hosted by Tyk in the cloud, in one of the 5 regions available. Meanwhile, the data planes, composed of Tyk Gateways and Redis for temporary storage, can be either hosted by Tyk or managed by you on your infrastructure.
- **Geographical freedom:** Tyk Cloud allows you to select your preferred AWS location as your home region, ensuring your data and Tyk Gateways are live and secured in the region that suits you best.
- **Designed for platform teams:** With Tyk Cloud, you can use [role-based access control (RBAC)](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/) to manage your team structure, as well as [multiple environments and multiple organisations](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/). 




Start using Tyk on our servers. Nothing to install:

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Free trial" >}}


## Quickstarts

{{< grid >}}

{{< badge read="5 mins" href="/deployment-and-operations/tyk-cloud-platform/quick-start/" image="/img/tyk-cloud.svg">}}
Quick Start
{{< /badge >}}

{{< /grid >}}

## Feature setups

{{< grid >}}

{{< badge title="Configuration" href="tyk-cloud/configuration-options/using-plugins/python-custom-auth/" >}}

#### Python custom plugins

Implement your own custom logic with Python based plugins
{{< /badge >}}

{{< badge title="Configuration" href="tyk-cloud/using-custom-domains/" >}}

#### Using custom domains

Configure custom domain for your Dashboard and Developer Portal
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/environments-deployments/managing-environments" >}}

#### Manage environments

Create and manage multiple environments within your Tyk Cloud organisation
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/environments-deployments/managing-control-planes" >}}

#### Manage deployments

Create and manage your Cloud Control Plane and Cloud Data Plane deployments
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/teams-users/" >}}

#### Manage teams & users

Create teams in your organisation, define roles and manage user access
{{< /badge >}}

{{< badge title="Account" href="tyk-cloud/account-billing/" >}}

#### Manage billing

Upgrade your subscription, billing details or card information
{{< /badge >}}

{{< /grid >}}
