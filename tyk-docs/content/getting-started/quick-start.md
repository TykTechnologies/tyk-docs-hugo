---
Title: Free Trial
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "Tyk PoC", "k8s", "docker", "Self Managed", "Open Source", "demo", "Tyk demo", "Tyk quick start"]
description: "Learn to deploy and run a Tyk deployment in minutes"
menu:
  main:
    parent: "Getting Started"
weight: 1
---

We offer a 2 week trial for the Tyk Dashboard & Developer Portal. Please signup below to receive your temporary license.

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Free trial" >}}

If you wish a longer duration trial or want to request a POC please contact the Tyk Team and tell us about your plans:

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}


## What's Included?

This includes the ability to create, publish and secure an API.

{{< note success >}}
Read more below to find out how to get the most from your trial experience.
{{< /note >}}

## Trial Prerequisites

- [Docker](https://docs.docker.com/get-docker/)


## Install Trial (Added)

Run these commands:

```bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo && cd tyk-pro-docker-demo
```

```bash
docker-compose up
```

Then navigate to [http://localhost:3000](http://localhost:3000) and input the licence key we've emailed you. If you do not have a key then please visit [https://tyk.io/sign-up/](https://tyk.io/sign-up/)

## Free Trial (Added)


Trial commands go here when available

## Advanced

At Tyk we understand that getting started with any tool can be overwhelming and time-consuming. This is the reason we created two projects to give you a quick start in minutes - 
[tyk-demo](https://github.com/TykTechnologies/tyk-demo) and [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) 
projects. The idea is to provide an enriched environment with many integrations that can act as integration examples 
as well as demonstrate Tyk's capabilities.

These open-source projects are actively being updated and improved. They are also being used daily by Tyk engineers. If you have questions or would like to 
request us to build a certain integration or to add a new example, please submit a request to each of the repos respectively. 

Docker compose environment - [tyk-demo]({{< ref "/getting-started/quick-start/tyk-demo.md" >}})

Kubernetes environment - [tyk-k8s-demo]({{< ref "/getting-started/quick-start/tyk-k8s-demo.md" >}})
