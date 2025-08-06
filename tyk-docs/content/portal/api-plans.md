---
title: "API Plans"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "API Plan", "Subscription Plan"]
keywords: ["Developer Portal", "Tyk", "Reference", "API Plan", "Plan", "Access", "Consumption", "Catalog", "Subscription"]
description: "Working with API Plans"
---

## Introduction

API Plans, sometimes referred to as Subscription Plans, define the terms and conditions under which developers can access your [API Products]({{< ref "portal/api-products" >}}). They establish the usage limits, approval requirements, and commercial tiers that govern API consumption. While API Products define what functionality is available, API Plans determine how much of that functionality can be used and under what conditions.

API Plans transform access policies into business offerings by:
- Establishing clear usage boundaries through rate limits and quotas
- Creating tiered access levels that align with different customer segments
- Supporting various business models from free to premium offerings
- Enabling controlled API adoption through appropriate usage constraints

In the Tyk Developer Portal, API Plans work alongside API Products to create a complete consumption model. Products define the "what" (functionality, documentation, value proposition), while Plans define the "how much" and "under what terms" aspects of your API strategy.

When developers request access to an API Product, they must select a Plan that defines their usage rights. This separation of concerns allows you to create flexible combinations - offering the same API Product under different Plans for different use cases, or applying consistent Plan tiers across your entire API portfolio.

## Understanding the Relationship Between Portal and Provider

API Plans represent a powerful abstraction layer that sits on top of your underlying API infrastructure. Understanding how the Developer Portal interacts with the Provider (Tyk Dashboard) is essential for effective product management:

### Data Distribution and Management

All metadata relating to the API Product is stored within the Developer Portal, including:
- Plan name and description
- Catalog assignments and visibility settings
- Custom fields

The actual consumption limit policy that configures the API Gateway's rate limit, quota and authorization controls is managed by the Provider. This separation creates a clean division between presentation/discovery (Portal) and access control (Provider).

<br>
{{< note success >}}
**Note**  

Once a consumption limit policy has been linked to an API Plan you are strongly recommended not to make changes to it from the Provider, but to manage the Plan in the Developer Portal.
{{< /note >}}

### Creation Workflows

You can create API Plans through two primary workflows:

#### Portal-First Approach (Recommended)

When you create a Plan in the Developer Portal:

- The Portal creates a corresponding consumption limit policy in the Tyk Dashboard
- This policy defines what rate limits and quota allowances to permit for access keys using the Plan
- The policy is automatically linked to the Plan in the Portal
- You can then enhance the Plan with documentation and other metadata

This approach gives you full control over the Plan's presentation and allows you to create a rich developer experience from the start.

#### Dashboard-First Approach

Alternatively, you can:

- Create a partitioned consumption limit policy directly in the Tyk Dashboard
- When you [synchronize]({{< ref "portal/api-provider#synchronizing-developer-portal-with-providers" >}}) the Developer Portal with the Provider, a new API Plan will be created automatically
- This Plan will be "bare bones" with a name derived from the Dashboard policy but no description or other metadata
- You can then enhance this auto-created Plan through the Admin Portal interface
- This approach is useful when you already have policies defined in your Dashboard

{{< youtube XYlaqy3UuNg >}}

## Creating a New API Plan

You can create a new API Plan in the Developer Portal by following these simple steps:

1. Log in to the Developer Portal as an [API Owner]({{< ref "portal/api-owner" >}})
2. Select the *Provider* that hosts the APIs you want to use
3. Enter a descriptive **Name** for your Product
4. Set the *Plan limits* that you wish this Plan to grant
5. Select **Save Changes**

Your new API Plan will now be available on the **Plans** page. You will need to publish the Plan to a Catalog for it to appear in the Live Portal.

These are the minimal steps to create an Plan. You might want to select the Plan's tile and add some more configuration, such as a consumer friendly name and description, access key lifetime or JWT scopes. Remember to select **Save Changes** when you are done.


## API Plan Reference Guide

This comprehensive reference guide details all the configurable options and features of API Plans in the Tyk Developer Portal.

### Core Features

#### Plan Name

The primary identifier for your API Plan.

- **Location**: *Plans > Add/Edit Plan > Plan name*
- **Purpose**: Identifies the Plan within both the Developer Portal and the Provider
- **Behavior**: Used as the name for the partitioned rate limit/quota policy in the Provider
- **Synchronization**:
    - Modifying the name in the Portal immediately updates the policy name in the Provider
    - Modifying the policy name in the Provider updates the Plan name during the next Portal synchronization
**Best Practice**: Choose a clear, descriptive name that reflects the Plan's tier or purpose

#### Provider

The Tyk Dashboard instance that will enforce this Plan's rate limits and quotas.

- **Location**: **Plans > Add/Edit Plan > Provider*
- **Purpose**: Links the Plan to the correct Provider instance (where the policy will reside)
- **Selection**: Choose from a dropdown list of all registered Providers

### Plan Details

#### Usage Quota

Restricts the total number of requests a consumer can make over a time period, to enforce usage limits for consumption tiers.

- **Location**: *Plans > Add/Edit Plan > Usage quota*
- **Configuration**: Enter the maximum number of requests and select time frame from dropdown
- **Unlimited Requests**: Select the checkbox to set an unlimited quota for this Plan

#### Rate Limit

Restricts the maximum rate of requests a consumer can make over a short period, to distribute API capacity fairly across all consumers.

- **Location**: *Plans > Add/Edit Plan > Rate limit*
- **Configuration**: Enter the maximum number of requests and the time window (in seconds)
- **Unlimited Requests**: Select the checkbox to set no rate limit for this Plan; note that an [API-level rate limit]({{< ref "api-management/rate-limit#rate-limiting-scopes-api-level-vs-key-level" >}}) would still be applied if configured.

#### Key Lifetime

Configures the lifetime for access credentials (keys) issued when a Developer App subscribes to the Plan.

- **Location**: *Plans > Add/Edit Plan > Key expires after*
- **Purpose**: Enforces security best practices by requiring periodic credential rotation
- **Selection**: Choose from a dropdown list of available key lifetimes
- **Behavior**: When credentials expire, developers must request new ones to maintain access

#### JWT Scopes

JWT scopes that will be used in the OAuth 2.0 flow to apply the Plan

- **Location**: *Plans > Add/Edit Plan > Advanced settings > Scopes*
- **Purpose**: Defines the JWT scopes that the access token must present to the Gateway to apply this Plan
- **Configuration**: Space or comma-separated permission strings (e.g., "read:users", "write:data")
- **Behavior**: This configuration is required when the Plan is used with an API Product for which the [Dynamic Client Registration]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration" >}}) flow has been activated
    - values added in the 'scopes' field will be registered with the Identity Provider during client registration, making these scopes available for the client to request when obtaining tokens
    - they will be added to the API's scope-to-policy mapping when a Developer App's provisioning request is approved
    - the scopes do not appear in the consumption limit policy created on the Dashboard
    - when a JWT is presented containing the Plan's scope, the Gateway will [apply the Plan to the session]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}})

#### Additional Metadata

Custom key-value pairs that are attached to all access credentials issued under this Plan.

- **Location**: *Plans > Add/Edit Plan > Advanced settings > Credential metadata*
- **Purpose**: Provides additional context to the Tyk Gateway for request processing and transformation
- **Components**:
    - Metadata Key: The identifier for this metadata (e.g., "plan_tier", "rate_group")
    - Metadata Value: The corresponding value (e.g., "premium", "high_volume")
- **Behavior**: This metadata is:
    - Added to the headers of all requests made using credentials issued under this Plan
    - Available to middleware in the Tyk Gateway for custom processing
- **Use Cases**:
    - Request Transformation: Modify requests based on Plan tier
    - Routing Logic: Direct traffic to different backend services
    - Analytics Segmentation: Track API usage by Plan type
    - Custom Middleware: Enable Plan-specific behaviors in custom plugins
- **Example**: A metadata pair of `plan_tier:premium` could trigger special handling for premium subscribers
- **Best Practice**:
    - Use consistent naming conventions for metadata keys across all Plans
    - Keys and values should be kept reasonably short to minimize header size
    - Avoid sensitive information as metadata may be logged

### Live Portal Presence

#### Catalog Assignment

Determines which API Catalogs include this Plan.

- **Location**: *Plans > Add/Edit Plan > Accessible in the following catalogues*
- **Purpose**: Controls Plan availability for different developer audiences
- **Options**: Select one or more Catalogs where this Plan should appear
- **Behavior**: Plan will only be visible to developers with access to the selected Catalogs

#### Catalog Display Name

The Plan name as shown in the Live Portal.

- **Location**: *Plans > Add/Edit Plan > Catalogue display name*
- **Purpose**: May differ from internal Plan name for marketing purposes
- **Example**: Internal name "Basic Rate Limit Policy" could have a display name "Bronze Access"

#### Plan Description

A brief summary of the Plan that will be visible to developers.

- **Location**: *Plans > Add/Edit Plan > Plan description*
- **Purpose**: Helps developers understand what the Plan offers
- **Format**: Rich text editor supporting basic formatting
- **Content**: Typically includes key limits, features, and target use cases

### Approval and Access Control

#### Auto-approve Provisioning Requests

Controls whether access requests require manual approval.

- **Location**: *Plans > Add/Edit Plan > Auto approve access request*
- **Purpose**: Reduce developer friction for safe deployments and free access APIs
- **Options**:
    - Enabled: Requests are automatically approved and credentials issued immediately
    - Disabled: Requests require manual approval by a Portal administrator
- **Best Practice**: Enable for free or low-tier plans, and for internal developer portal use cases; disable for premium or partner plans

#### Access Request Limits

Control how often API consumers can request access to the plan.

- **Location**: *Plans > Add/Edit Plan > Advanced settings > Access request frequency*
- **Configuration**:
    - Access request allowance: The maximum number of access requests allowed
    - Renewal interval: The period over which the request allowance should be measured
- **Behavior**: When a user attempts to request access to an API using a Plan that has these limits configured, the system checks if they've already reached their allowance within the current renewal period. If they have, the request is rejected with a "Plan access quota exceeded" error.


## API Plan Best Practices

- **Create a clear tier structure**: Design a logical progression of Plans (e.g., Free, Basic, Premium, Enterprise) with meaningful differences in limits and capabilities between tiers.
- **Align with user journey**: Offer Plans that match different stages of the developer journey - from exploration (free, low limits) to production (higher limits, SLAs) to scale (enterprise-grade).
- **Balance simplicity and flexibility**: Provide enough Plan options to meet diverse needs without overwhelming developers with too many choices.
- **Consider usage patterns**: Set rate limits and quotas based on actual API usage patterns rather than arbitrary numbers - analyze typical consumption to establish meaningful thresholds.
- **Document value clearly**: For each Plan, clearly articulate what the developer gets, not just in terms of technical limits but also business value and use cases supported.
