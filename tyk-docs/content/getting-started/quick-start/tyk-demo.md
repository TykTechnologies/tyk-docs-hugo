---
title:  The Complete Docker Tyk Demo
tags: ["Tyk Tutorials", "Getting Started", "PoC", "Proof of Concept", "Tyk PoC", "docker", "Tyk demo", "Tyk quick start", "Tyk Demo Videos" ]
description: "Learn to deploy and run a Tyk deployment in minutes on Docker using our repository tyk-demo"
---

Tyk-demo is a repository that enables you to start up an entire Tyk Stack with all its dependencies. Tyk demo can also spin up deployments with all the other Tyk integrations such as Kafka and Prometheus. 

The [tyk-demo](https://github.com/TykTechnologies/tyk-demo) repository lets you quickly set up a complete Tyk Stack and 
its dependencies using docker-compose and bash scripts.

Watch our *What Is Tyk Demo* video for an overview of *tyk-demo* and the various demo deployments it offers.

{{< youtube MqVPyWg1YZM >}}

---

## Key Features

- Full Tyk Stack deployment
- Pre-configured demo APIs
- Analytics and monitoring tools
- Integration with common third-party services

---

## Quick Start

The following steps will enable you to quickly get started:

1. **Clone the repository**: `git clone https://github.com/TykTechnologies/tyk-demo.git`
2. **Navigate to the directory**: `cd tyk-demo`
3. **Add license key to .env file**: `DASHBOARD_LICENCE=<your license key>`  
3. **Run the setup script**: `./up.sh`
4. **Access Tyk Dashboard**:  [http://localhost:3000](http://localhost:3000)

Please also visit our Deploy Tyk Demo video that covers:
- Downloading and starting tyk-demo
- Setting up your license
- Logging in to Tyk demo deployments

The video also provides an overview of the available features, including demo APIs, keys, and analytics.

{{< youtube bm0XZGYJa0w >}}

---

## Getting Help

If you need assistance, please visit our [Community Forum](https://community.tyk.io/) or [contact our team](https://tyk.io/about/contact/).

---

## What's Next?

After exploring the demo, consider:
- [Deploying Tyk in Kubernetes]({{< ref "getting-started/quick-start/tyk-k8s-demo" >}})
- Exploring advanced features such as [Python gRPC plugin](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/plugin-python-grpc) and [Tyk multi datacenter](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/mdcb)
- Exploring integrations, such as [Dynamic Client registration]({{< ref "tyk-developer-portal/tyk-portal-classic/keycloak-dcr" >}}) in [Keycloak IdP](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/keycloak-dcr), [Open Telemetry](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/otel-new-relic) with [New Relic](https://newrelic.com/)
- Joining our [community](https://community.tyk.io/) to share your experience and learn from others
