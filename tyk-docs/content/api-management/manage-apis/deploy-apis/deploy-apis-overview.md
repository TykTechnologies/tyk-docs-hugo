---
title: API Creation Methods
date: 2023-09-04
description: "Different ways to create and manage APIs in Tyk"
tags: [ "API Management", "API Configuration", "Dashboard", "Tyk Sync", "Tyk Operator" ]
---

This page explains the different methods available for creating and managing APIs in Tyk, each suited to different use cases and workflow requirements.

## File-based configuration {#file-based-configuration}

Load API configurations directly to the `/apps` folder using JSON API specifications. This method is available for open source users and is ideal for testing gateway and API configurations.

**Use case:** Testing and experimentation in development environments.

**Learn more:**
* [Create an API in file-based mode]({{< ref "api-management/gateway-config-managing-classic#create-an-api-in-file-based-mode" >}})

## Dashboard UI

Create and configure APIs through the web-based Dashboard interface. Changes take effect immediately, making this method suitable for learning, testing, and proof-of-concept work.

**Use case:** Manual API management, learning, and proof-of-concept projects.

**Learn more:**
* [Create an API with the Dashboard]({{< ref "api-management/gateway-config-managing-classic#create-an-api-with-the-dashboard" >}})

## Dashboard and Gateway API

Programmatically create and manage APIs, policies, keys, and developer portals using REST APIs. This method provides flexibility for automation but requires imperative scripting.

**Use case:** Programmatic API management and basic automation needs.

**Learn more:**
- [Dashboard API]({{< ref "api-management/dashboard-configuration#exploring-the-dashboard-api" >}})
- [Gateway API]({{< ref "tyk-gateway-api" >}})

## Tyk Sync

Manage API configurations declaratively using version-controlled files. Tyk Sync enables GitOps workflows by maintaining API configurations as code that can be versioned and deployed through CI/CD pipelines.

**Use case:** GitOps workflows and teams requiring version-controlled API configurations.

**Learn more:**
- [Tyk Sync]({{< ref "api-management/automations/sync" >}})

## Tyk Operator

Kubernetes-native API management using Custom Resource Definitions (CRDs). Tyk Operator provides declarative configuration with automatic drift detection and reconciliation in Kubernetes environments.

**Use case:** Kubernetes-native environments requiring automated API lifecycle management.

**Learn more:**
- [Tyk Operator]({{< ref "api-management/automations/operator#what-is-tyk-operator" >}})
- [Using Tyk Operator to enable GitOps]({{< ref "api-management/automations" >}})
