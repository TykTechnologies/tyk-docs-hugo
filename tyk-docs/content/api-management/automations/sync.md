---
title: "Tyk Sync - Synchronize Tyk Environment With GitHub"
date: 2025-01-10
tags: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
description: How to synchronize Tyk configuration with Github using Tyk Sync
keywords: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
aliases:
  - /advanced-configuration/manage-multiple-environments/tyk-sync
  - /product-stack/tyk-sync/overview
  - /tyk-sync
---

## Introduction

Tyk Sync enables you to export and import Tyk configurations directly from Git, keeping environments aligned without manual configuration updates. This section covers the setup and use of Tyk Sync, providing steps to ensure consistent configurations across different environments.


## Tyk Sync Features
Tyk Sync works with *Tyk Dashboard* installation. With Tyk Dashboard, Tyk Sync supports managing API definitions, security policies, and API templates.

| Tyk Sync Feature                                                           | Tyk Dashboard (Licensed) |
| ---------------------------------------------------------------------------|--------------------------|
| <h4>Backup objects from Tyk to a directory</h4>If you want to backup your API definitions, policies and templates in Tyk, you can use the `dump` command. It allows you to save the objects in transportable files. You can use this command to backup important API configurations before upgrading Tyk, or to save API configurations from one Dashboard instance and then use `update`, `publish`, or `sync` commands to update the API configurations to another Dashboard instance. | ✅ |
| <h4>Synchronise objects from Git (or any VCS) to Tyk</h4>To implement GitOps for API management, store your API definitions, policies and templates in Git or any version control system. Use the `sync` command to synchronise those objects to Tyk. During this operation, Tyk Sync will delete any objects in the Dashboard that cannot be found in the VCS, and update those that can be found and create those that are missing. | ✅ |
| <h4>Update objects</h4>The `update` command will read from VCS or file system and will attempt to identify matching API definitions, policies and templates in the target Dashboard, and update them. Unmatched objects will not be created. | ✅ |
| <h4>Publish objects</h4>The `publish` command will read from VCS or file system and create API definitions, policies, and templates in target Dashboard. This will not update any existing objects. If it detects a collision, the command will stop. | ✅ |
| <h4>Show and import Tyk examples</h4>The `examples` command allow you to show and import [Tyk examples](https://github.com/TykTechnologies/tyk-examples). An easy way to load up your Tyk installation with some interesting examples!| ✅ |

### Working with OAS APIs

Starting with Sync v1.5+ and Dashboard v5.3.2+, Tyk Sync supports both [Tyk OAS APIs]({{< ref "api-management/gateway-config-tyk-oas" >}}) and [Tyk Classic APIs]({{< ref "api-management/gateway-config-tyk-classic" >}}) when working with the Tyk Dashboard, without requiring special flags or configurations.

For Sync versions v1.4.1 to v1.4.3, enabling Tyk Sync for Tyk OAS APIs requires the [allow-unsafe-oas]({{< ref "tyk-dashboard/configuration#allow_unsafe_oas" >}}) configuration in the Dashboard, along with the `--allow-unsafe-oas` flag when invoking Tyk Sync. Note that Tyk Sync versions v1.4.1 to 1.4.3 do not support API Category for Tyk OAS APIs.

### Working with Tyk Streams APIs

Tyk Streams API support was introduced in Tyk Dashboard v5.7.0. Tyk Sync v2.0 and later is compatible with Tyk Streams APIs and manages them similarly to Tyk OAS APIs. With Tyk Sync, you can seamlessly sync, publish, update, and dump Tyk Streams APIs just like OAS APIs.

Note: The Streams API validator is not applied during these operations.

### Working with Open Source Gateway

From Sync v2.0, compatibility with the Open Source Tyk Gateway has been removed, making Tyk Sync v2.0 compatible exclusively with licensed Tyk Dashboard. As a result, Tyk Sync is no longer usable with the Open Source (OSS) version of the Tyk Gateway.

## Installation

To install Tyk Sync, follow the instructions in the [Tyk Sync installation guide]({{< ref "product-stack/tyk-sync/installing-tyk-sync" >}}). You can install Tyk Sync using Docker or download the binary directly.

## Quick Start Guide

For a quick start guide to using Tyk Sync, refer to the [Tyk Sync Quick Start Guide]({{< ref "api-management/sync/quick-start" >}}). This guide will help you set up Tyk Sync, dump API configurations, and synchronize them with your Tyk Dashboard.

## Glossary

### Tyk Sync
A command line tool and library designed to manage and synchronize Tyk API Gateway configurations with version control systems. Originally called "tyk-git," it was renamed to "tyk-sync" as its capabilities expanded beyond Git to support synchronization with any file system.

### Synchronization
The process of ensuring that API and policy configurations in your Tyk Gateway match those stored in your version control system. Tyk Sync performs one-way synchronization, where definitions are written from the VCS to the Tyk Dashboard.

### Spec File (.tyk.json)
A metadata file created by Tyk Sync that contains information about the APIs and policies in a directory. This file is used during synchronization to determine what needs to be created, updated, or deleted.

## FAQ

<details> <summary><b>Tyk Sync and Gateway Configurations?</b></summary>

Tyk Sync is designed to dump API configurations from a Tyk Dashboard, not directly from a Tyk Gateway.

Tyk Sync's `dump` command is specifically designed to work with the Tyk Dashboard. The command requires a dashboard URL and API secret:

```bash
tyk-sync dump -d="http://dashboard-url" -s="dashboard-secret" -t="./output-directory"
```

There is no equivalent flag or functionality to dump configurations directly from a standalone Gateway. This is because:

1. The Dashboard serves as the central configuration repository in the Tyk architecture
2. The Gateway is primarily focused on runtime execution of those configurations
3. While Gateways can operate standalone, they don't expose the same management APIs as the Dashboard

</details> 

<details> <summary><b>Differences between sync, publish, and update commands?</b></summary>

The three commands in Tyk Sync have distinct purposes and behaviors when managing API configurations:

**sync**
- **Purpose**: Comprehensive synchronization from a source (Git repo or file system) to Tyk Dashboard
- **Behavior**:
  - Creates new APIs, policies, and assets that exist in the source but not in the Dashboard
  - Updates existing APIs, policies, and assets that exist in both places
  - Deletes APIs, policies, and assets that exist in the Dashboard but not in the source (unless `--no-delete` flag is used)
- **Use case**: When you want to make the Dashboard exactly match your source repository

**publish**
- **Purpose**: Only adds new API configurations to Tyk Dashboard
- **Behavior**:
  - Creates new APIs, policies, and assets that don't already exist in the Dashboard
  - Will not update existing items
  - Stops if it detects a collision (an API that already exists)
  - Will not delete anything
- **Use case**: When you want to add new APIs without affecting existing ones

**update**
- **Purpose**: Only updates existing API configurations in Tyk Dashboard
- **Behavior**:
  - Updates APIs, policies, and assets that already exist in the Dashboard
  - Will not create new items
  - Will not delete anything
- **Use case**: When you want to update existing APIs without adding new ones or removing any

In summary, "sync" is the most comprehensive operation (create + update + delete), "publish" only creates new items, and "update" only modifies existing items.

</details> 

<details> <summary><b>How are Tyk configurations synchronized to Git?</b></summary>

Tyk Sync allows you to dump configurations to a local directory, which can then be committed to a Git repository. This enables version control and easy synchronization across environments.

For example:
1. Dump configurations: `tyk-sync dump -d http://dashboard:3000 -s secret -t ./configs`
2. Commit to Git: 
   ```
   cd configs
   git add .
   git commit -m "Update Tyk configurations"
   git push
   ```

</details> 

<details> <summary><b>Can I sync multiple APIs to a single Git repository?</b></summary>

Yes, you can store multiple API definitions, policies, and other Tyk resources in a single Git repository. Tyk Sync and Tyk Operator can work with multiple resources in the same directory.

Your repository structure might look like this:
```
tyk-configs/
├── apis/
│   ├── api1.yaml
│   └── api2.yaml
├── policies/
│   ├── policy1.yaml
│   └── policy2.yaml
└── tyk-operator/
    └── operator-context.yaml
```

</details> 

<details> <summary><b>How do I roll back changes made with Tyk Sync?</b></summary>

To roll back changes made with Tyk Sync:

1. If you're using Git, check out the previous version of your configurations:
   ```bash
   git checkout <previous-commit-hash>
   ```

2. Use Tyk Sync to publish the previous version:
   ```bash
   tyk-sync sync -d http://dashboard:3000 -s <secret> -p ./
   ```

It's a good practice to maintain separate branches or tags for different environments to make rollbacks easier.

</details> 
