---
date: 2017-03-24T16:39:31Z
title: Tyk Operator
weight: 16
menu:
    main:
        parent: "Tyk Stack"
aliases:
    - /tyk-stack/tyk-operator/getting-started-tyk-operator
    - /product-stack/tyk-operator/key-concepts/key-concepts
---

### What is Tyk Operator?
Tyk Operator is a Kubernetes Operator designed to simplify the management of Tyk API configurations both inside and outside of Kubernetes environments. With our [custom resources]({{<ref "product-stack/tyk-operator/key-concepts/custom-resources">}}), Tyk Operator simplifies the processes of deploying and configuring API resources, allowing you to focus more on application development and less on infrastructure management. It is ideal for those who like to manage configurations declaratively or with GitOps workflows via tools such as Argo CD and Flux CD.

{{< img src="/img/operator/tyk-operator.svg" alt="Tyk Operator" width="600" >}}
<br>

{{< note success >}}
**Obtain a license key**

Starting from Tyk Operator v1.0, a license key is required to use the Tyk Operator. Prospects can obtain a license by using our [contact form](https://tyk.io/contact/). For existing customers, please reach out to your account manager directly. If you're unsure who to contact, you can also use the contact form and our team will guide you accordingly.
{{< /note >}}

{{< button_left href="https://tyk.io/sign-up" color="green" content="Free Trial" >}}

### Why use Tyk Operator?
Managing, checking, and synchronizing APIs from multiple teams across environments can be complex. Tyk Operator provides an efficient way to handle API configurations. Here’s why it matters:
- **Simple custom resource**: Tyk's Classic API Definition is a large and complex JSON document, making maintenance difficult. Operator's CRD (Custom Resource Definition) is designed to be simple and does not require you to specify default values, resulting in a document that is easy to understand and maintain.
- **Declarative configurations**: By using declarative configurations, users can store configurations in Git. Changes can then be managed via Git pull requests, making it easy to compare different API configuration versions. Automatic linting and checking can be implemented, ensuring that changes are properly reviewed and approved before merging.
- **Kubernetes integration**: Operator works natively with Kubernetes, allowing both development and operations teams to follow their usual workflows for making changes and automating deployments. You can also benefit from Kubernetes tooling support for manifest management (e.g., using Helm or Kustomize) and GitOps deployment (e.g., using ArgoCD or Flux CD).
- **Automated reconciliation**: Once you apply custom resources to your Kubernetes cluster, Operator will regularly check that the actual state at Tyk matches the target state in Kubernetes. This ensures any changes at Tyk, such as unauthorized manual updates or database corruption, can be corrected and the target state reinstated.

### Key Features

1. [Manage API definitions]({{< ref "product-stack/tyk-operator/getting-started/create-an-api-overview" >}})
2. [Manage Security policies]({{< ref "tyk-stack/tyk-operator/secure-an-api" >}})
3. [Manage Tyk Classic Dev Portal]({{< ref "tyk-stack/tyk-operator/publish-an-api" >}})
4. [Kubernetes Ingress Controller]({{< ref "product-stack/tyk-operator/tyk-ingress-controller">}})

### Do You Need Tyk Operator?

Consider using Tyk Operator if:

- You are running applications in a Kubernetes environment.
- You want to leverage Kubernetes-native automation for API management.
- You aim to streamline the operations of your APIs with minimal manual intervention.

### Getting Started
To get started with Tyk Operator, learn about Operator key concepts:

- [Custom Resources]({{< ref "/product-stack/tyk-operator/key-concepts/custom-resources" >}})
- [Operator Context]({{< ref "/product-stack/tyk-operator/key-concepts/operator-context" >}})
- [Operator User]({{< ref "/product-stack/tyk-operator/key-concepts/operator-user" >}})
- [Operator Reconciliation]({{< ref "/tyk-stack/tyk-operator/tyk-operator-reconciliation" >}})

Follow our [Installation Guide]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) to set up Tyk Operator in your Kubernetes cluster.
