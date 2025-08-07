---
title: API Repository
date: 2025-04-28T15:49:11Z
description: "Learn how Tyk Governance automatically discovers and catalogs APIs across multiple sources to create a comprehensive inventory of all APIs in your organization."
tags: ["Tyk Governance", "API Repository", "API Discovery", "API Inventory"]
---

## Availability

- Version: Available since v0.1

## Overview

API Repository automatically discovers and catalogs APIs across multiple sources (Tyk, AWS API Gateway, etc) to create a comprehensive inventory of all APIs in your organization. This feature addresses API sprawl, identifies shadow APIs, and provides complete visibility into your API landscape.

### Key Benefits

- Creates a single source of truth for all APIs across the organization
- Identifies security risks from undocumented or unmanaged APIs
- Enables better resource management and prevents duplication
- Provides visibility into API ownership and usage patterns

### Dependencies

- Requires the governance agent for API discovery from non-Tyk Cloud-managed control planes and non-Tyk platforms.

## Quick Start

In this tutorial, we'll explore how to use the API Repository to view and manage discovered APIs in your organization.

### Prerequisites

- Access to the Tyk Governance Hub
- Governance agent deployed and connected to your API providers (non Tyk Cloud sources only)

For detailed installation and configuration instructions, please refer to the [Installation and Setup]({{< ref "tyk-governance/installation" >}}) page.

### Step-by-Step

1. **Access the API Repository**

     Navigate to the API Repository section in your Tyk Governance Hub to view discovered APIs.

2. **Explore the API inventory**

     The dashboard provides a comprehensive view of all discovered APIs across your organization, with filtering and search capabilities.

     {{< img src="img/governance/api-list.png" >}}

3. **Examine API details**

     Click on any API to view detailed information, including specifications, ownership, authentication methods, and governance status.

     {{< img src="img/governance/api-details.png" >}}

## How It Works

The API Repository works by deploying agents that connect to various API sources, extract metadata, and synchronize this information with the central governance hub. Think of it as an automated API census that continuously updates your API inventory.

### Discovery Process

1. **Agent Deployment**: Agents are deployed to connect with various API sources.
2. **API Source Connection**: Agents authenticate and connect to configured API sources.
3. **Metadata Extraction**: Agents extract API metadata including routes, authentication methods, and specifications.
4. **Synchronization**: Extracted data is sent to the governance hub through secure gRPC streams.
5. **Inventory Creation**: APIs are cataloged in a centralized repository with relevant metadata.
6. **Classification**: APIs can be tagged and categorized based on extracted and custom metadata.
7. **Continuous Updates**: Regular scans maintain an up-to-date inventory and identify changes.

## Use Cases

### Centralizing API Inventory Across Multiple Gateways

When your organization uses multiple API gateways (Tyk, AWS, etc.), maintaining a single view of all APIs becomes challenging. API Discovery automatically aggregates APIs from all sources into a unified inventory, providing a complete picture of your API landscape without manual tracking.

### Identifying and Managing Shadow APIs

Shadow APIs—those created outside official processes—pose security and governance risks. The discovery feature continuously scans your infrastructure to identify undocumented APIs, allowing you to bring them under governance or decommission them as appropriate.

### Streamlining API Onboarding with Automated Discovery

For organizations with numerous APIs, manual registration is time-consuming and prone to errors. Automated discovery accelerates the onboarding process by automatically detecting new APIs and pre-populating their metadata, thereby reducing the time required to bring APIs under governance.

### Tracking API Changes for Compliance and Audit

When APIs change without proper documentation, it creates compliance risks. The continuous discovery process detects changes to existing APIs, maintaining an accurate, up-to-date inventory that serves as an audit trail for compliance purposes.

### Enabling API Reuse Through Comprehensive Cataloging

Developers often recreate APIs because they're unaware of existing ones. A complete API inventory with rich metadata enables developers to discover and reuse existing APIs, reducing duplication and development costs.

## Best Practices and Recommendations

- **Configure all relevant API sources** to ensure complete coverage of your API landscape
- **Implement a review process** for newly discovered APIs to ensure proper classification and ownership assignment
- **Integrate discovery with your CI/CD pipeline** to synchronize new APIs as they're deployed automatically
- **Establish clear ownership** for each API to ensure accountability for governance and maintenance

## FAQs

<details> <summary><b>How secure is the API discovery process?</b></summary>

The discovery process uses secure authentication methods for each provider and transmits data via encrypted channels. The agent requires minimal permissions—just enough to read API configurations.

</details> 

<details> <summary><b>Will discovery impact the performance of my API gateways?</b></summary>

The discovery process is designed to be lightweight and non-intrusive, primarily reading configuration data rather than analyzing traffic, thereby minimizing any performance impact.

</details>

## Troubleshooting

<details> <summary><b>APIs from a specific source aren't being discovered</b></summary>

- Check the agent logs for authentication errors  
- Verify the provider configuration in the governance agent config  
- Ensure the agent has network access to the API source  

</details> 

<details> <summary><b>Discovered APIs are missing metadata</b></summary>

- Some API sources may not expose all metadata  
- Check if the API definition in the source is complete  
- Consider enhancing the API definition at the source  

</details> 

<details> <summary><b>Agent fails to connect to the governance hub</b></summary>

- Verify the governance URL and token in the agent configuration  
- Check network connectivity between the agent and governance hub  
- Examine the agent logs for specific connection errors  

</details>

