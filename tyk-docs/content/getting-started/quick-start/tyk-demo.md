---
title:  The Complete Docker Tyk Demo
tags: ["Tyk Tutorials", "Getting Started", "Tyk PoC", "Docker", "Demo Videos" ]
description: "Learn to deploy and run a Tyk deployment in minutes on Docker using our repository tyk-demo"
---

[Tyk-demo](https://github.com/TykTechnologies/tyk-demo) is a repository that enables you to start up locally an entire Tyk stack with all its dependencies and integrations such as
[SLIs and SLOs with Prometheus and Grafana](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/slo-prometheus-grafana)
or [OpenTelemetry with Jaeger](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/otel-jaeger).


## Purpose

With *tyk-demo* repository, using docker-compose, you can set up quickly a **complete** Tyk stack, including
dependencies and integrations.

Minimize the amount of effort needed to start up the Tyk infrastructure and show end-to-end complete examples of how to set up various capabilities in Tyk as well as different integrations.

## Key Features

- Full Tyk stack deployment
- Pre-configured demo APIs
- Analytics and monitoring tools
- Integration with common third-party services

Watch the video *What Is Tyk Demo* for an overview and learn about the key features from our experts -

{{< youtube-seo id="MqVPyWg1YZM" title="Overview of Tyk Demo and its features" >}}

## Prerequisites

### 1. Docker compose
Make sure you have [docker compose](https://docs.docker.com/compose/install/) and that docker is running on your machine.

### 2. License key
This Demo deploys and runs the full Tyk platform which is a licensed product. Please sign up using the button below, to obtain a license key. In the link, choose "Get in touch" to get a guided evaluation of the Tyk Dashboard and receive your temporary license. 

{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Get started" >}}

## Quick Start

The following steps will enable you to quickly get started:

1. **Clone the repository**:
```bash
git clone https://github.com/TykTechnologies/tyk-demo.git
```

2. **Navigate to the directory**:
```bash
cd tyk-demo
```

3. **Add license key to .env file**:
```bash
DASHBOARD_LICENCE=<your license key>
```

4. **Run the setup script**:
```bash
./up.sh
```

5. **Access Tyk Dashboard**:  [http://localhost:3000](http://localhost:3000)

To complete the instruction above we have a tutorial video of tyk demo that covers:
- Downloading and starting tyk-demo
- Setting up your license
- Logging in to Tyk Dashboard

{{< youtube-seo id="bm0XZGYJa0w" title="Step-by-step guide to spin up Tyk Demo" >}}


## Getting Help

If you need assistance, please visit our [Community Forum](https://community.tyk.io/) or [contact our team](https://tyk.io/about/contact/).


## What's Next?

After exploring the demo, consider:
- [Deploying Tyk in Kubernetes]({{< ref "getting-started/quick-start/tyk-k8s-demo" >}})
- Exploring advanced features such as [Python gRPC plugin](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/plugin-python-grpc) and [Tyk multi datacenter](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/mdcb)
- Exploring integrations, such as [Dynamic Client registration]({{< ref "tyk-developer-portal/tyk-portal-classic/keycloak-dcr" >}}) in [Keycloak IdP](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/keycloak-dcr), [Open Telemetry](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/otel-new-relic) with [New Relic](https://newrelic.com/)
