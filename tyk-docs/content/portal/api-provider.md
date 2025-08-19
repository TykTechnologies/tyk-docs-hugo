---
title: "API Providers"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Provider", "Integration", "Tyk Dashboard"]
keywords: ["Developer Portal", "Tyk", "Reference", "Provider", "Integration", "Tyk Dashboard"]
description: "All about API Providers with Tyk Developer Portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/api-access
---

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

When a synchronization event occurs, for each Provider in turn, the Portal will retrieve all access and limit policies that have matching tags with those configured in the [Provider settings]({{< ref "api-provider#policy-tags" >}}).

- Portal will create placeholder Products and Plans for any new policies.
- It will hide from the Admin Portal view (and unpublish) any Products or Plans whose access/limit policies were not retrieved from the Dashboard (for example if the tags no longer match, or the Dashboard policy has been deleted).
- If the policy is successfully retrieved in a future sync event, the Product or Plan will again be displayed with all of its previous configuration.

{{< note success >}}
**Note**  

When an API Product or Plan is created on the Developer Portal, the corresponding access or limit policy is automatically created in the Provider (Dashboard). There is no need to trigger a synchronization event for this to occur.
{{< /note >}}

### Automatic Synchronization

The Portal automatically synchronizes with each Provider based on the [PORTAL_REFRESHINTERVAL]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_refreshinterval" >}}) synchronization interval that can be declared in the Portal configuration. The default synchronization interval is 10 minutes starting from an initial sync that occurs when the Portal starts up.

### Manual Synchronization

You can trigger an immediate synchronization when needed as follows:

1. Navigate to the **Providers** section in the Admin Portal
2. Select the **Synchronize** button
3. The Portal will now synchronize with each Provider in turn, reporting success or failure on completion

If you want to synchronize a specific Provider, you should select **Synchronize** from the three dots menu for that Provider.

## Reference Guide

### Essential Information

#### Provider Name

An identifier for this Provider connection within the Developer Portal deployment.

- **Location**: *Providers > Add/Edit Provider > Name*
- **Purpose**: Identifies the Provider within the Developer Portal
- **Best Practice**: Use a descriptive name that indicates the environment or purpose (e.g., "Production APIs" or "Partner Gateway")

### Connection Details

#### Connection URL

The endpoint URL for the Tyk Dashboard. This is where the Developer Portal will interact with the [Tyk Dashboard API]({{< ref "api-management/dashboard-configuration#exploring-the-dashboard-api" >}}) using its allocated [access credentials]({{< ref "portal/api-provider#tyk-dashboard-api-access-credentials" >}}).

- **Location**: *Providers > Add/Edit Provider > URL*
- **Format**: Full URL including protocol, host, and port (e.g. `https://dashboard.example.com:3000`)
- **Note**: Must be accessible from the Developer Portal server

#### Secret

Access credentials that the Developer Portal will use to authenticate with the Tyk Dashboard API.

- **Location**: *Providers > Add/Edit Provider > Secret*
- **Format**: *Tyk Dashboard API Access Credentials* for a Dashboard user account
- **Best Practice**: Use a dedicated Dashboard user account with [minimal required permissions]({{< ref "portal/api-provider#tyk-dashboard-api-access-credentials" >}})

#### Organisation ID

The organization identifier in [multi-tenant Tyk deployments]({{< ref "tyk-cloud/environments-deployments/managing-organisations" >}}).

- **Location**:  *Providers > Add/Edit Provider > Organisation ID*
- **Purpose**: Identifies which organization's resources to access
- **Where to Find It**: Tyk Dashboard user profile
- **Default**: Can be left empty if your deployment has a single Tyk Organization
- **Note**: This is not the same as a Tyk Developer Portal [Organisation]({{< ref "portal/overview/concepts#api-consumers" >}})

#### Insecure Skip Verify

Controls whether TLS certificate validation is performed for the Provider connection.

- **Location**: *Providers > Add/Edit Provider > Insecure skip verify*
- **Purpose**: Allows connections to Providers with self-signed or invalid TLS certificates
- **Options**:
  - Enabled: Bypasses TLS certificate validation (not recommended for production)
  - Disabled: Enforces strict TLS certificate validation (default)
- **Security Implications**:
  - When enabled, connections are vulnerable to man-in-the-middle attacks
  - Disables verification of the Provider's identity through its certificate
- **Use Cases**:
  - Development environments with self-signed certificates
  - Testing environments where proper certificates haven't been configured
  - Troubleshooting connection issues related to certificate problems
- **Best Practice**:
  - Always disable (set to false) in production environments
  - Use only temporarily for testing if absolutely necessary
  - Replace with proper certificate configuration as soon as possible

### Developer Portal Resources

#### Policy tags

Controls which policies are synchronized from the Provider and how they're categorized in the Developer Portal.

- **Location**:  *Providers > Add/Edit Provider > Policy tags*
- **Purpose**: Filters which policies are imported from the Tyk Dashboard
- **Behavior**:
  - The *policy tags* are added to all Tyk Dashboard policies created by the Developer Portal (for API Products and Plans)
  - When policies are synchronized from the Provider, only those policies with the *policy tags* will be retrieved
  - Adding *policy tags* to a partitioned policy in the Tyk Dashboard will cause it to be synchronized to the Developer Portal, creating a "bare-bones" API Product or Plan
- **Format**: Comma separated list of text tags without spaces after the comma (e.g. to synchonrize Dashboard policies with the tags `tag1` and `tag2` you must configure *Policy tags* as `tag1,tag2`)

#### Baseline URL

The base address of the Tyk Gateway where API Products from this Provider can be accessed.

- **Location**: Connection tab of the Edit Provider and Add Provider pages
- **Purpose**: Provides the root URL that developers will use to consume APIs, helping API consumers understand where to direct their API requests
- **Format**: Full URL including protocol and host (e.g. `https://gateway.example.com`)
- **Display**: Shown on Product pages in the Live Portal


## Best Practices for Providers

- Use dedicated credentials: Create specific Dashboard users or API keys for Portal connections with appropriate permissions
- Implement secure connections: Always use HTTPS for Provider connections
- Maintain environment separation: Use different Providers for development, staging, and production
- Monitor synchronization status: Regularly verify that Providers are successfully synchronizing
- Document Provider purpose: Maintain clear documentation about what each Provider represents and which APIs it supplies


## Troubleshooting Provider Connections

### Common Issues and Solutions

**Connection Failures**

- Verify network connectivity between Portal and Dashboard
- Confirm URL is correct and includes protocol and port
- Check that Dashboard API is accessible from Portal server

**Authentication Errors**

- Verify API key or credentials are valid and active
- Ensure the user account has appropriate [permissions]({{< ref "portal/api-provider#tyk-dashboard-api-access-credentials" >}})
- Check for organization ID mismatches

**Missing Products or Plans**

- Verify the corresponding policies exist in the Dashboard
- Verify policies have the correct [policy tags]({{< ref "portal/api-provider#policy-tags" >}})
- Check synchronization status and last sync time
- Trigger manual synchronization if needed

**Synchronization Problems**

- Check Dashboard API logs for errors
- Verify Portal has sufficient permissions to access all resources
- Review network stability between Portal and Dashboard
