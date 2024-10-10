---
date: 2017-03-23T13:19:38Z
title: Tyk Sync
description: "An introduction to the purpose and benefits of using Tyk Sync for GitOps in API management. Learn about Tyk Sync's main features, including synchronization of API definitions and policies, support for version control system (VCS) and file system, and backup of objects from Tyk."
aliases:
    - /tyk-sync
    - /advanced-configuration/manage-multiple-environments/tyk-sync
tags: [ "Tyk Sync", "GitOps" ]
---

Tyk Sync is a command line (CLI) tool designed to streamline the implementation of GitOps for API management. It enables users to store API definitions, security policies, and API templates as files in version control system (VCS) or file system and synchronize changes to Tyk, promoting a consistent and automated approach to managing API configurations.

If you are Kubernetes users, [Tyk Operator]({{<ref "tyk-operator">}}) is another tool that offer GitOps for API management through Kubernetes-native custom resources.

## Features
Tyk Sync works with *Tyk Dashboard* installation. With Tyk Dashboard, Tyk Sync supports managing Classic and OAS API definitions, security policies, and API templates.

| Tyk Sync Feature                                                           | Tyk Dashboard (Licensed) |
| ---------------------------------------------------------------------------|--------------------------|
| <h4>Backup objects from Tyk to a directory</h4>If you want to backup your API definitions, policies and templates in Tyk, you can use the `dump` command. It allows you to save the objects in transportable files. You can use this command to backup important API configurations before upgrading Tyk, or to save API configurations from one Dashboard instance and then use `update`, `publish`, or `sync` commands to update the API configurations to another Dashboard instance. | ✅ |
| <h4>Synchronise objects from Git (or any VCS) to Tyk</h4>To implement GitOps for API management, store your API definitions, policies and templates in Git or any version control system. Use the `sync` command to synchronise those objects to Tyk. During this operation, Tyk Sync will delete any objects in the Dashboard that cannot be found in the VCS, and update those that can be found and create those that are missing. | ✅ |
| <h4>Update objects</h4>The `update` command will read from VCS or file system and will attempt to identify matching API definitions, policies and templates in the target Dashboard, and update them. Unmatched objects will not be created. | ✅ |
| <h4>Publish objects</h4>The `publish` command will read from VCS or file system and create API definitions, policies, and templates in target Dashboard. This will not update any existing objects. If it detects a collision, the command will stop. | ✅ |
| <h4>Show and import Tyk examples</h4>The `examples` command allow you to show and import [Tyk examples](https://github.com/TykTechnologies/tyk-examples). An easy way to load up your Tyk installation with some interesting examples!| ✅ |

{{< note success >}}
**Working with OAS APIs**

From Sync v1.5+ and Dashboard v5.3.2+, Tyk Sync supports both [Tyk OAS APIs]({{< ref "getting-started/key-concepts/high-level-concepts" >}}) and [Tyk Classic APIs]({{< ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types" >}}) when working with Tyk Dashboard without special flag and configuration.
<br>

If you're using Sync v1.4.1 to v1.4.3, you must set the [allow-unsafe-oas]({{< ref "tyk-dashboard/configuration#allow_unsafe_oas" >}}) configuration in Dashboard, and the flag `--allow-unsafe-oas` when invoking Tyk Sync if you want to use Tyk Sync to migrate Tyk OAS APIs. In Tyk Sync v1.4.1 to 1.4.3, API Category is not supported for Tyk OAS APIs.

{{< /note >}}

{{< note success >}}
**Working with Open Source gateway**

From Sync v2.0, support for the Open Source Tyk Gateway has been removed. Tyk Sync v2.0 is now compatible exclusively with licensed Tyk Dashboard. This change means that Tyk Sync can no longer be used with the Open Source (OSS) version of the Tyk Gateway.
{{< /note >}}
