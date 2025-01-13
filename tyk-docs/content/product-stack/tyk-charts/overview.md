---
title: Helm Chart Overview
description: Explains an overview of Tyk charts
tags: ["Tyk charts", "helm charts", "helm", "charts", "kubernetes", "k8s"]
---

Tyk is working to provide a new set of helm charts, and will progressively roll them out at [tyk-charts](https://github.com/TykTechnologies/tyk-charts). It will provide component charts for all Tyk Components, as well as umbrella charts as reference configurations for open source and Tyk Self Managed users. Please check out the latest status from our [Github repository](https://github.com/TykTechnologies/tyk-charts).

## Quick start guides
- [Quick Start with Tyk OSS Chart]({{<ref "/tyk-oss/ce-helm-chart-new">}})
- [Quick Start with Tyk Data Plane Chart for Cloud Hybrid Gateways]({{<ref "/tyk-cloud/environments-deployments/hybrid-gateways#deploy-in-kubernetes-with-helm-chart">}})
- [Quick Start with Tyk Stack Chart and PostgreSQL]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql">}})
- [Quick Start with Tyk Stack Chart and MongoDB]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-mongodb">}})

## Which chart is right for you?

| Umbrella Charts | Descriptions |
|-----------------|-------------|
| [tyk-stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}})                 | Deploys Tyk stack including Tyk Dashboard, Gateway, Enterprise Portal, and Pump |
| [tyk-control-plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}) | Deploys Tyk control plane including Tyk Dashboard, MDCB, Management Gateway, Enterprise Portal and Pump. Tyk control plane manages and configures distributed data planes in separate clusters / regions. |
| [tyk-data-plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}})        | Deploys Tyk data plane including Tyk Gateway and Pump. Data planes are managed by Tyk Dashboard and MDCB in control plane. |
| [tyk-oss]({{<ref "product-stack/tyk-charts/tyk-oss-chart">}})                      | Deploys Open source Tyk Gateway and Pump |

Learn more about [Tyk Licensing and Deployment models]({{<ref "tyk-on-premises/licensing">}}).
