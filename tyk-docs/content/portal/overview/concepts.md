---
title: "Core Concepts of Tyk Developer Portal"
date: 2025-07-26
tags: ["Developer Portal", "Tyk"]
keywords: ["Developer Portal", "Tyk"]
description: "Understand the fundamental concepts behind the Tyk Developer Portal, including APIs, access control, and customisation."
aliases:
 - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/enterprise-portal-concepts
 - /concepts/tyk-components/developer-portal
---

This page provides an overview of the fundamental concepts that form the foundation of the Tyk Developer Portal. Understanding these concepts is crucial for setting up and effectively managing your portal.

{{< youtube 0xlJDXKrbSw >}}

## Portal Structure and Roles

User management in the Tyk Developer Portal provides a flexible framework for organizing both the administrators who manage the portal and the developers who consume your APIs. The portal’s hierarchical structure of organizations and teams enables fine-grained access control, collaboration, and visibility management.

The Developer Portal’s user management system allows you to:

- Separate API management from API consumption through distinct user types
- Create organizational hierarchies that mirror your business relationships
- Enable collaboration among developer teams while maintaining appropriate boundaries
- Control access to API Products, documentation, and credentials
- Delegate administrative responsibilities to trusted partners

This comprehensive approach to user management ensures that each participant in your API ecosystem has exactly the access and capabilities they need—no more, no less.

### API Consumers

API Consumers are the external users who access your APIs through the Live Portal. 

There are two categories of API Consumer:

- **Team Members** are the individual developers who can register, browse catalogs, request access to APIs, and view details of their API consumption. They are restricted to operate within their assigned *Team*.
- **Administrators** operate within an *Organisation* and in addition to the capabilies of *Team Members* are also user managers. They can invite new users (both team members and admins), assign users to teams within the Organisation, and delete users from the Organisation.

API Consumers exist within a hierarchical structure, allowing for flexible access management:

- **Teams** are groups of users who share access to specific catalogs and can collaborate on API projects. Teams provide a way to organize users within an Organisation. Users can be members of multiple Teams. **All users are members of at least one team**.

- **Organisation** can contain multiple teams and can represent external companies or business units that consume your APIs. **Teams are always  members of only one Organisation**.

### API Owners

API Owners are the internal users who manage the publication of API Catalogs onto the Live Portal. They can configure the visual appearance of the portal, create [Catalogs, Products and Plans]({{< ref "portal/overview/concepts#api-packaging-and-access-control" >}}), and manage the Organisation, Teams, and Users granted access to the Live Portal. They operate within the Admin Portal and have read-only access to the Live Portal.

### Developer Portal Views

When the Tyk Developer Portal is deployed, two separate views are offered depending on the type of user logging in.

The **Live Portal** is the public-facing website where [API Consumers]({{< ref "portal/overview/concepts#api-consumers" >}}) can:

- Discover available API Products
- Read API documentation
- Request access to APIs
- Manage their access credentials
- Create and manage apps

The Live Portal displays the content for a single Organisation (restricting the API Consumer's view according to their access rights).

The **Admin Portal** is the private administrative view where [API Owners]({{< ref "portal/overview/concepts#api-owners" >}}) can manage the content displayed in the Live Portal, approve access requests, and configure API Products.. It is also where users, Teams, and Organisation are administered.

<br>
{{< note success >}}
**Note**  

The Live Portal will only display content visible to the Team or Teams of which the logged in API Consumer is a member.
{{< /note >}}

## API Packaging and Access Control

### API Products

An API Product is a strategic packaging of one or more APIs that delivers specific value to API Consumers. Rather than exposing individual API endpoints, API Products allow you to bundle related functionality together with appropriate documentation and access controls.

For example, a "Weather API" product might combine current weather data, historical weather records, and forecast APIs into a cohesive offering that solves a specific business need.

When creating an API Product, you should focus on:

- Which APIs to include in the product
- How to document the product's capabilities
- Which business problems does the product solve
- Who is the target audience for the product

### API Plans

API or Subscription Plans (usually referred to simply as Plans) define the terms under which API Consumers can access your API Products and control aspects like:

- Rate limits (requests per second/minute/hour)
- Quotas (total requests allowed in a period)

Different Plans can be attached to the same API Product, allowing you to offer various service tiers (for example, free, basic, and premium)

### API Catalogs

Catalogs organize how API Products and Plans are presented to different audiences. They enable you to create customized views of your API offerings based on:

- Visibility requirements (public or private)
- Target audience (partners, customers, internal teams)
- Business domains (finance, marketing, operations)

With catalogs, you can:

- Make some API Products visible only to specific teams
- Offer different plans to different consumer segments
- Create specialized marketplaces for different business units

For example, you might create:

- A public catalog with basic API Products for general consumers
- A partner catalog with enhanced API Products and preferential plans
- An internal catalog with development and testing APIs

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-catalogue-sample-set-up.png" alt="A sample catalogue set-up" >}}

## Consumer Access Management

### Consumer Apps

An app serves as a container for access credentials issued to an API Consumer. Apps help organize and manage API access by:

- Grouping related API access credentials together
- Providing a context for API usage (e.g., "Mobile App", "Website Integration")
- Enabling credential management (rotation, revocation)

API Consumers can create multiple apps to organize their API usage by project or purpose, and each app can contain credentials for multiple API Products.

### Access Credentials

This is the unified naming for any API Keys, Tokens, or Secrets provisioned for a specific app.

Access credentials are the security tokens that allow API Consumers to authenticate with your APIs. These depend upon the configuration of those APIs in the API definition managed by Tyk Dashboard and may include:

- API keys
- OAuth tokens
- JWT tokens
- Mutual TLS certificates

The Developer Portal manages the lifecycle of these credentials, including:

- Generation upon provisioning request approval
- Secure delivery to the API Consumer
- Rotation and revocation as needed

### Provisioning Requests

When an API Consumer requests access to an API Product through a specific Plan, a provisioning request is generated. This request:

- Captures the consumer's intended use case
- Records the API Product and Plan they've selected
- Initiates an approval workflow (if required)
- Triggers credential generation upon approval

Provisioning requests can be configured to require manual approval by an API Owner or to be automatically approved based on the Plan settings.

## Integration

### API Provider

A Provider is a connection to a Tyk Dashboard instance that supplies APIs, policies, and authentication mechanisms to the Developer Portal. The Provider serves as the bridge between your API management infrastructure and the Developer Portal experience.

- API Source: Providers make APIs defined in the Tyk Dashboard available for inclusion in API Products
- Policy Management: Providers supply the access and rate limit policies used by Products and Plans
- Credential Issuance: When developers request access to APIs, the Provider generates and manages the necessary credentials
- Multi-Provider Support: The Developer Portal can connect to multiple Providers simultaneously, allowing you to expose APIs from different Tyk environments

While the Developer Portal can connect to multiple Providers, each API Product or Plan can only be associated with a single Provider. This is because the access policies that define Products and Plans exist within a specific Provider instance.

### Using Tyk Policies

The Developer Portal leverages Tyk's [partitioned policies]({{< ref "api-management/policies#partitioned-policy-functionality" >}}) in two distinct ways:

- **for API Products** When creating an API Product, Tyk will associate a policy that defines only access rights to APIs, without rate limiting or quota restrictions.
- **for Plans**: When creating a plan, Tyk will associate a policy that defines only quota and rate limiting settings, which will be applied to the APIs included in the associated API Product.

This separation allows for flexible combinations of API access and usage constraints.
