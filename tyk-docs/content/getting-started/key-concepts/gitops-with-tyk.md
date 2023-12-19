---
date: 2017-03-23T13:05:14Z
title: Using Tyk Operator to enable GitOps with Tyk
menu:
  main:
    parent: "Key Concepts"
weight: 100 
---

{{< toc >}}

With Tyk Operator, you can configure your APIs using Kubernetes native manifest files. You can use the manifest files in a GitOps workflow as the single source of truth for API deployment.

{{< note success >}}
**Note**  

If you use Tyk Operator to manage your APIs, you should set up RBAC such that human users cannot have the "write" permission on the API definition endpoints using Tyk Dashboard. 
{{< /note >}}

### What is GitOps?
“GitOps” refers to the operating model of using Git as the “single source of truth” to drive continuous delivery for infrastructure and software through automated CI/CD workflow.

### Tyk Operator in your GitOps workflow
You can install Argo CD, Flux CD or the GitOps tool of your choice in a cluster, and connect it to the Git repository where you version control your API manifests. The tool can alert on any divergence between Git and what’s running on a cluster. If there’s a difference, Tyk Operator has a Kubernetes controller to automatically reconcile the API configurations on your Tyk Gateway or Tyk Dashboard. 

With Tyk Operator and GitOps, you can manage your APIs as code with these benefits:
- Security 
- Compliance

All changes must go through peer review through pull requests. The configurations are versioned in your version control system and approved by your API Product Owner and Platform team.

#### Kubernetes-Native Developer Experience 
API Developers enjoy a smoother Continuous Integration process as they can develop, test, and deploy the microservices. API configurations together use familiar development toolings and pipeline.

#### Reliability 
With declarative API configurations, you have a single source of truth to recover after any system failures, reducing the meantime to recovery from hours to minutes.

### Single source of Truth for API configurations
Tyk Operator will reconcile any divergence between Git and the actual state in Tyk Gateway or Tyk Dashboard. Therefore, you should maintain the API definition manifests as the single source of truth for your system. If you update your API configurations using Tyk Dashboard, those changes would be reverted by Tyk Operator eventually.
