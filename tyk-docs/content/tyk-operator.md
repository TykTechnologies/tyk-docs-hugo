---
date: 2017-03-24T16:39:31Z
title: Tyk Operator
weight: 16
menu:
    main:
        parent: "Tyk Stack"
---

{{< toc >}}

### What is Tyk Operator?
With Tyk Operator, you can manage your APIs on Tyk Gateway declaratively using [Kubernetes CRD](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)  manifests.


{{< img src="/img/2.10/tyk_operator2.svg" alt="Tyk Operator" >}}

Tyk Operator is an open-source agent deployed to your Kubernetes cluster. It actively detects configuration drift between the API configurations on Gateway (the actual state) and the manifest (the desired state) to reconcile it. Therefore, the manifests become the source of truth for your API configurations.

Tyk Operator also offers an Ingress Controller, which dynamically manages Tyk ApiDefinition resources as per the ingress specification. This way your Tyk Gateway is configured as a drop-in replacement for a standard Kubernetes Ingress, providing Security, Traffic Control and Limiting for external access to the services in your Kubernetes cluster.

Tyk Operator works with the v3+ Open Source Tyk Gateway, our full self-managed Gateway, and Tyk Dashboard installation.

### What can you do with Tyk Operator?
Tyk Operator can configure Tyk Gateway as a drop-in replacement for standard Kubernetes Ingress. You can manage your API definitions and security policies with it. It also works with the classic portal so you can manage your Classic Portal declaratively.


- [Kubernetes Ingress Controller](https://github.com/TykTechnologies/tyk-operator/blob/master/docs/ingress.md)
- [Manage API Definitions](https://github.com/TykTechnologies/tyk-operator/blob/master/docs/api_definitions.md)
- [Manage Developer Portal]({{< ref "/content/tyk-stack/tyk-operator/publish-an-api.md" >}})

{{< note success >}}

**Note**  

 

[Manage Security Policies](https://github.com/TykTechnologies/tyk-operator/blob/master/docs/policies.md)

Currently Operator only works with Tyk self-managed Dashboard for this feature. Support for OSS on Security Policies will be added in future Tyk Operator releases.

{{< /note >}}


### What are the Tyk Operator benefits?

You can get the benefits of GitOps with declarative API configurations:

- **Security and Compliance:** All changes must go through peer review through pull requests. The configurations are versioned in your version control system and approved by your API Product Owner and Platform team.
- **Kubernetes-Native Developer Experience:** API Developers enjoy a smoother Continuous Integration process as they can develop, test, and deploy the microservices and API configurations together using familiar development toolings and pipeline.

- **Reliability:** With declarative API configurations, you have a single source of truth to recover after any system failures, reducing the meantime to recovery from hours to minutes.
