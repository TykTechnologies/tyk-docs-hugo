---
title: "API Providers in the Developer Portal"
date: 2025-02-10
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "Managing Access", "Catalogs", "Rate Limit", "Dynamic Client Registration", "Documenting APIs"]
keywords: ["Developer Portal", "Tyk", "Managing Access", "Catalogs", "Rate Limit", "Dynamic Client Registration", "Documenting APIs"]
description: "How to configure API Providers in Tyk developer portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/api-access
---

<<<<<<< HEAD
=======
## Introduction

Providers are the connections between your Tyk Developer Portal and your API management infrastructure. They serve as the bridge that makes your APIs, policies, and authentication mechanisms available for exposure through the Developer Portal.

Each Provider represents a connection to a Tyk Dashboard instance, allowing the Developer Portal to discover available APIs, apply access policies, and issue credentials to developers. While the Developer Portal handles the presentation, documentation, and developer experience, the Provider handles the underlying API management functions.

Providers transform your API management infrastructure into developer-ready resources by:

- Making APIs defined in Tyk Dashboard available for inclusion in API Products
- Supplying the access and rate limit policies used by Products and Plans
- Generating and managing credentials when developers request API access
- Enforcing security, rate limits, and quotas on API requests

In the Tyk Developer Portal, Providers are the foundation that enables all other functionality, connecting your API infrastructure to your developer community.

## Key Concepts

### Provider Architecture

The Provider connection works through a secure API integration between the Developer Portal and the Tyk Dashboard. This connection allows the Portal to:

- Discover Resources: Query available APIs and policies from the Dashboard
- Create Policies: Generate new access and rate limit policies for Products and Plans
- Issue Credentials: Request creation of API keys, OAuth tokens, or other credentials
- Synchronize Changes: Maintain consistency between Portal and Dashboard configurations

### Multi-Provider Support

The Tyk Developer Portal supports connections to multiple Providers simultaneously, enabling several powerful scenarios:

- Environment Segregation: Connect to separate development, staging, and production environments
- Organizational Boundaries: Connect to Dashboards managed by different teams or departments
- Geographic Distribution: Connect to Dashboards in different regions or data centers
- Migration Paths: Facilitate transitions between different Tyk deployments

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-diagram-api-providers.png" alt="Relationship between Tyk Developer Portal and two API Providers" >}}

### Provider Limitations

It is important to understand the boundaries of Provider functionality:

- Each API Product or Plan can only be associated with a single Provider
- Credentials issued by one Provider cannot be used with APIs from another Provider
- The same Authentication method must be used to access all APIs within an API Product, so that a single set of credentials can be created and accepted by the Provider.

### Tyk Dashboard API Access Credentials

Tyk Dashboard exposes a management API with a user management system that performs fine-grained Role Based Access Control (RBAC). The Developer Portal uses this API to configure and control security policies on the Dashboard. These policies implement the Developer Portal's API Products and Plans, and are used in the creation and maintenance of access credentials for API Consumers.

The Developer Portal thus needs access to the Tyk Dashboard API, so you will need to create a dedicated user on your Tyk Dashboard, following the steps indicated [here]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}).

The Developer Portal user requires the following permissions:

| Permission   | Access level |
|--------------|--------------|
| APIs         | Write        |
| Certificates | Write        |
| Keys         | Write        |
| Policies     | Write        |
| Analytics    | Read         |
| Users        | Read         |


## Synchronizing Developer Portal with Providers

The Developer Portal regularly synchronizes with the Provider to ensure it has up-to-date information about available APIs, policies, and other resources. This synchronization process is crucial for maintaining consistency between your API management infrastructure and the developer experience.

### What Happens During Synchronization?

When a synchronization event occurs, for each Provider in turn, the Portal will retrieve all access and limit policies that have matching tags with those configured in the [Provider settings]({{< ref "portal/api-provider#policy-tags" >}}).

- Portal will create placeholder Products and Plans for any new policies.
- It will hide from the Admin Portal view (and unpublish) any Products or Plans whose access/limit policies were not retrieved from the Dashboard (for example if the tags no longer match, or the Dashboard policy has been deleted).
- If the policy is successfully retrieved in a future sync event, the Product or Plan will again be displayed with all of its previous configuration.

>>>>>>> eaf6dc777... URL Fixes (#6879)
{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## How to Manage API Access?

The Tyk Enterprise Developer portal provides a special container for access credentials - an application. Applications hold developer credentials that can be used to access APIs published on the portal with a specific plan. A sample relationship between applications, credentials, API Products, and plans is demonstrated in the diagram below.

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-apps-structure.png" alt="Sample application setup" >}}

Credentials are generated by the Tyk Dashboard when an admin user approves a provisioning request or when provisioning requests are configured to be approved automatically. The provisioning flow is demonstrated in the diagram below.

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-provisioning-flow.png" alt="Portal provisioning flow" >}}

This section describes how admin users can manage applications and configure the settings of provisioning requests. 

