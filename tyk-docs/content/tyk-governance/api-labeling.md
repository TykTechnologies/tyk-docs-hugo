---
title: API Labeling and Categorization
date: 2025-04-28T15:49:11Z
description: ""
tags: ["Tyk Governance", "API Labeling", "API Categorization"]
---

[Overview](#overview) | [Quick Start](#quick-start) | [How It Works](#how-it-works) | [Use Cases](#use-cases) | [Best Practices](#best-practices-and-recommendations) | [FAQs](#faqs) | [Troubleshooting](#troubleshooting)

## Overview

API Labeling and Categorization enables you to organize, classify, and filter your APIs using customizable metadata tags. This feature allows you to create a structured taxonomy for your API landscape, making it easier to search, filter, and apply governance policies based on business context, technical characteristics, or organizational ownership.

### Key Benefits

- Enables structured organization of APIs by business domain, criticality, and other dimensions
- Facilitates efficient search and filtering of APIs in large inventories
- Provides consistent metadata across APIs from different sources
- Supports governance policy application based on API characteristics (Governance Policy feature is coming soon)
- Enables reporting and analytics based on business context (Reporting feature is coming soon)

### Dependencies

- API Repository populated from API sources
- Governance Admin privileges for creating and managing label definitions (Note: only admin access is available at the moment)

## Quick Start

In this tutorial, we'll explore how to use API labeling to categorize and filter APIs in your organization's API Repository.

### Prerequisites

- Access to the Tyk Governance Hub
- Governance Admin access for creating new label definitions

### Step-by-Step

1. **Access the API Repository**

	Navigate to the API Repository section in your Tyk Governance dashboard.

2. **Explore default labels**

	The platform comes with pre-configured default labels such as "Business Domain" and "API Criticality".

3. **Apply labels to APIs**

	Select an API and click "Edit" to apply or modify labels:

	- Set "Business Domain" to an appropriate value (e.g., "Finance", "Customer", "Product")
	- Assign "API Criticality" based on the API's importance (Tier 1 for mission-critical, Tier 2 for important, Tier 3 for non-critical)
	- Add any custom labels that have been defined by your Governance Admin

4. **Filter APIs using labels**

	Use the search and filter functionality to find APIs based on their labels:

	- Filter to show only Tier 1 APIs
	- Search for APIs in a specific business domain
	- Combine multiple label filters for precise results

5. **Create a custom label (Admin only)**

	As a Governance Admin:

	- Navigate to the Label Management section
	- Click "Add New Label"
	- Define the label key (e.g., "Compliance")
	- Specify whether it accepts free text or select from predefined values
	- If using predefined values, enter the allowed values (e.g., "PCI-DSS", "GDPR", "HIPAA")
	- Save the new label definition

### Validation

- Labeled APIs will display their labels in the API details view
- Filtering by labels will show only matching APIs
- New custom labels will be available for application to APIs

## How It Works

API Labeling and Categorization works through a flexible key-value metadata system that allows both structured and free-form classification of APIs.

### Labeling System Architecture

1. **Bootstrap Default Labels**: During initial setup, the platform creates default label definitions such as "Business Domain" and "API Criticality".
2. **Label Definition**: Each label has:
	- A unique key (e.g., "business_domain")
	- A display name (e.g., "Business Domain")
	- A value type (free text or predefined values)
	- Optional predefined values (e.g., "Finance", "HR", "Operations")

3. **Label Application**: Labels are applied to APIs as key-value pairs:
	- Key: The label identifier (e.g., "business_domain")
	- Value: The specific value for this API (e.g., "Finance")

4. **Label Storage**: Labels are stored as metadata with each API in the repository database.
5. **Search and Filter**: The platform indexes labels to enable efficient filtering and searching.

## Use Cases

### Governance Policy Application

Apply different governance rules based on API criticality tiers. For example, Tier 1 (mission-critical) APIs might require stricter security controls, more thorough documentation, and formal change management processes.

### Compliance Management

Tag APIs with relevant compliance requirements (PCI-DSS, GDPR, HIPAA) to ensure appropriate controls are applied and to facilitate compliance reporting and audits.

### Team Ownership and Responsibility

Label APIs by owning team or department to clarify responsibility for maintenance, support, and governance compliance.

### API Lifecycle Management

Use labels to indicate lifecycle stage (Development, Testing, Production, Deprecated) to manage API transitions and communicate status to consumers.

## Best Practices and Recommendations

- **Establish a clear labeling taxonomy** before implementing across your organization
- **Keep predefined value lists manageable** – too many options create confusion and inconsistency
- **Use hierarchical naming for related labels** (e.g., security.authentication.method, security.data.classification)
- **Document the meaning and intended use** of each label for consistent application
- **Assign label management responsibility** to a specific role or team to maintain consistency
- **Review and update labels periodically** to ensure they remain relevant as your API landscape evolves
- **Include label application in API onboarding workflows** to ensure consistent metadata from the start
- **Create label templates for common API types** to speed up consistent labeling
- **Combine multiple labels in filters** for more precise API discovery
- **Use criticality and domain labels** as the foundation of your governance strategy

## FAQs

<details> <summary><b>Can I create custom labels with my own predefined values?</b></summary>

Yes, Governance Administrators can create custom labels with either free text values or a predefined list of acceptable values.

</details> 

<details> <summary><b>How do labels differ from tags?</b></summary>

Labels are structured key-value pairs that can be validated and used for governance, while tags are typically simpler, unstructured text values used primarily for search.

</details> 

<details> <summary><b>Can I bulk apply labels to multiple APIs?</b></summary>

Yes, the platform supports bulk label operations through API to efficiently categorize groups of APIs. The bulk edit feature on UI will be added in subsequent releases.

</details> 

<details> <summary><b>Are labels from source systems preserved during discovery?</b></summary>

Yes, the discovery process attempts to map source system metadata to corresponding labels in the governance platform where possible.

</details> 

<details> <summary><b>Can I use labels to control access to APIs?</b></summary>

Yes, labels can be used in conjunction with the access control system to determine which users can view or manage specific categories of APIs.

</details> 

## Troubleshooting

<details> <summary><b>Labels not appearing in filter options</b></summary>

- Ensure the label has been properly defined by a Governance Admin  
- Check that at least one API has been tagged with this label  
- Refresh the browser cache if the label was recently added  

</details> 

<details> <summary><b>Cannot add a specific label value</b></summary>

- For predefined value labels, check that the value you're trying to add is in the allowed list  
- Verify you have sufficient permissions to modify the API's labels  
- Ensure the label hasn't been deprecated or replaced  

</details> 

<details> <summary><b>Bulk labeling operation failed</b></summary>

- Check that all APIs in the selection exist and are accessible  
- Verify the label format matches the expected structure  
- Look for validation errors if any APIs already have conflicting labels  

</details>