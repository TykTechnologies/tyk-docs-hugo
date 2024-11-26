---
title: API Deployment Methods
date: 2023-09-04
description: "Explains deployment methods for Tyk APIs"
tags: [ "API Deployment", "API", "Deployment", "Deployment Methods", "Deploy APIs", "Tyk Sync", "Tyk Operator" ]
---

At Tyk, we provide various deployment methods to suit different stages of your API development lifecycle. Each option offers unique features and capabilities tailored to your specific needs.

## File-based Configurations

For Open Source users, the File-based Configurations option offers a quick way to test your gateway and API configurations using a JSON API specification. Simply load the configuration to the `/apps` folder, making it easy to experiment with different setups.

Usage: Recommended for testing gateway and API configurations in an Open Source environment.

Learn more:
* [Tutorial: Create an API in File-based Mode]({{<ref "getting-started/create-api#tutorial-create-an-api-in-file-based-mode">}})

## Dashboard UI

The Dashboard UI is ideal for Trial / POC users and anyone looking to experiment with Tyk features. It offers a user-friendly web GUI that allows you to import, create, and configure APIs easily. Changes made through the Dashboard UI take effect instantly, making it suitable for learning, testing, and Proof of Concept (PoC) purposes.

Usage: Recommended for PoC, learning, or manual testing; not intended for automation.

Learn more:
* [Tutorial: Create an API with the Dashboard]({{<ref "getting-started/create-api#tutorial-create-an-api-with-the-dashboard">}})

## Dashboard or Gateway API

For programmatic control, both Tyk Pro users and Open Source users can leverage either the Dashboard API or the Gateway API. These APIs enable the creation and management of APIs, Policies, Keys, Developer Portals, and more. They provide the flexibility to automate some API operations, but it involves an imperative approach and may not be as straightforward for repetitive tasks across different environments.

Usage: Suitable for those who require programmatic control over API management, APIs, Policies, and other aspects of Tyk.

Learn more:
- [Dashboard API]({{<ref "getting-started/key-concepts/dashboard-api">}})
- [Gateway API]({{<ref "api-management/oss/gateway-api">}})

## Tyk Sync

Tyk Sync enables declarative API management and GitOps. With Tyk Sync, you can manage API configurations in a transportable format, which can be version controlled using Git. This approach allows you to achieve automation in the API deployment process and maintain a source of truth for API configurations. By setting up a CI/CD pipeline, changes made in Git trigger the reload of configurations in Tyk Dashboard.

Usage: Recommended for organizations looking to implement GitOps in API management and have portable API and Policy configurations.

Learn more:
- [Tyk Sync]({{<ref "/api-management/automations#synchronize-tyk-environment-with-github-repository">}})

## Tyk Operator

Building on the capabilities of Tyk Sync and GitOps, Tyk Operator provides a powerful solution for declarative API management and constant reconciliation in dynamic environments. Leveraging Kubernetes features, Tyk Operator treats APIs and Policies as Custom Resources, allowing drift detection and automatic reconciliation. It ensures that the desired state stored in Git matches the actual state in the Tyk instance, enabling seamless management of Tyk APIs and Policies alongside other Kubernetes resources.

Usage: Recommended for organizations already running Kubernetes and seeking a Kubernetes-native, automated approach to API deployment and management.

Learn more:
- [Tyk Operator]({{<ref "/api-management/automations#what-is-tyk-operator">}})
- [Using Tyk Operator to enable GitOps with Tyk]({{<ref "getting-started/key-concepts/gitops-with-tyk">}})

With these flexible deployment options, you can easily design, develop, and deploy APIs in Tyk according to your specific requirements and workflow. Choose the option that best aligns with your needs and integrates smoothly into your API development lifecycle.
