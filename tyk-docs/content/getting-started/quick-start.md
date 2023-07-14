---
Title: Quick Start
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "Tyk PoC", "k8s", "docker", "Self Managed", "Open Source", "demo", "Tyk demo", "Tyk quick start"]
description: "Learn to deploy and run a Tyk deployment in minutes"
menu:
  main:
    parent: "Getting Started"
weight: 1
---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

Run these commands:

```bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo && cd tyk-pro-docker-demo
```

```bash
docker-compose up
```

Then navigate to [http://localhost:3000](http://localhost:3000) and input the licence key we've emailed you. If you do not have a key then please visit [https://tyk.io/sign-up/](https://tyk.io/sign-up/)

## Advanced

At Tyk we understand that getting started with any tool can be overwhelming and time-consuming. This is the reason we created two projects to give you a quick start in minutes - 
[tyk-demo](https://github.com/TykTechnologies/tyk-demo) and [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) 
projects. The idea is to provide an enriched environment with many integrations that can act as integration examples 
as well as demonstrate Tyk's capabilities.

These open-source projects are actively being updated and improved. They are also being used daily by Tyk engineers. If you have questions or would like to 
request us to build a certain integration or to add a new example, please submit a request to each of the repos respectively. 

Docker compose environment - [tyk-demo]({{< ref "/getting-started/quick-start/tyk-demo.md" >}})

Kubernetes environment - [tyk-k8s-demo]({{< ref "/getting-started/quick-start/tyk-k8s-demo.md" >}})
