---
title:  The Complete Docker Tyk Demo
tags: ["Tyk Tutorials", "Getting Started", "Tyk PoC", "Docker", "Demo Videos" ]
description: "Learn to deploy and run a Tyk deployment in minutes on Docker using our repository tyk-demo"
---

[Tyk-demo](https://github.com/TykTechnologies/tyk-demo) is a repository that enables you to start up an entire Tyk stack
with all its dependencies. Tyk demo can also spin up deployments with all the other Tyk integrations such as
[SLIs and SLOs with Prometheus and Grafana](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/slo-prometheus-grafana)
or [OpenTelemetry with Jaeger](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/otel-jaeger).

With *tyk-demo* repository, using docker-compose, you can set up quickly a **complete** Tyk stack, including
dependencies and integrations.
bash scripts.

## Key Features

- Full Tyk stack deployment
- Pre-configured demo APIs
- Analytics and monitoring tools
- Integration with common third-party services

Watch the video *What Is Tyk Demo* for an overview and learning about the key features from our experts -

{{< youtube-seo id="MqVPyWg1YZM" title="Overview of Tyk Demo and its features" >}}


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
