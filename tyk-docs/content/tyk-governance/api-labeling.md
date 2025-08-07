---
title: API Labeling and Categorization
date: 2025-04-28T15:49:11Z
description: "Organize, classify, and filter your APIs using customizable metadata tags to create a structured taxonomy for your API landscape."
tags: ["Tyk Governance", "API Labeling", "API Categorization", "API Metadata", "API Organization"]
---

## Availability

- Version: Available since v0.1

## Overview

API Labeling and Categorization enables you to organize, classify, and filter your APIs using customizable metadata tags. This feature allows you to create a structured taxonomy for your API landscape, making it easier to search, filter, and apply governance policies based on business context, technical characteristics, or organizational ownership.

### Key Benefits

- Enables structured organization of APIs by business domain, criticality, and other dimensions
- Facilitates efficient search and filtering of APIs in large inventories
- Provides consistent metadata across APIs from different sources
- Supports governance policy application based on API characteristics (Governance Policy feature is coming soon)
- Enables reporting and analytics based on business context (Reporting feature is coming soon)

## Quick Start

In this tutorial, we'll explore how to use API labeling to categorize and filter APIs in your organization's API Repository.

### Prerequisites

- Access to the Tyk Governance Hub
- Governance Admin access for creating new label definitions (Note: only admin access is available at the moment)

### Step-by-Step

1. **Access the API Repository**

    Navigate to the API Repository section in your Tyk Governance dashboard.

2. **Explore Default Labels**

    Tyk Governance comes with pre-configured default labels such as "Business Domain" and "API Criticality".

3. **Apply Labels to APIs**

    Select an API and click "Edit" to apply or modify labels:

    - Set "Business Domain" to an appropriate value (e.g., "Finance", "Customer", "Product")
    - Assign "API Criticality" based on the API's importance (Tier 1 for mission-critical, Tier 2 for important, Tier 3 for non-critical)
    - Add any custom labels that your Governance Admin has defined

4. **Filter APIs Using Labels**

    Use the search and filter functionality to find APIs based on their labels:

    - Filter to show only Tier 1 APIs
    - Search for APIs in a specific business domain
    - Combine multiple label filters for precise results

5. **Create a Custom Label (Admin only)**

    Governance Admin users can create custom labels programmatically using the API:

    Example using cURL:

    ```bash
    curl -X POST https://your-governance-instance.tyk.io/api/labels/ \
    -H "Content-Type: application/json" \
    -H "X-API-Key: YOUR_ADMIN_TOKEN" \
    -d '{
        "name": "compliance",
        "values": ["PCI-DSS", "GDPR", "HIPAA"]
    }'
    ```

    A successful request will return a 200 OK status code and the newly created label object:

    ```json
    {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "compliance",
    "values": ["PCI-DSS", "GDPR", "HIPAA"]
    }
    ```

    **Notes**:
    - The name field is required and must be unique
    - The values field is optional. If provided, it defines the allowed values for this label
    - If values is empty, the label will accept any value (free text)
    - Only users with admin privileges can create labels
    - Once created, labels can be applied to APIs using the `/api/{api-id}/labels` endpoint
    - After creating a custom label, it will be available for selection when labeling APIs, either through the UI or via the API labeling endpoints

### Validation

- Labeled APIs will display their labels in the API details view
- Filtering by labels will show only matching APIs
- New custom labels will be available for application to APIs

## How It Works

API Labeling and Categorization works through a flexible key-value metadata system that allows both structured and free-form classification of APIs.

### Labeling System Architecture

1. **Bootstrap Default Labels**: During initial setup, Tyk Governance creates default label definitions such as "Business Domain" and "API Criticality"
2. **Label Definition**: Each label has:
    - A unique key (e.g., "business_domain")
    - A display name (e.g., "Business Domain")
    - A value type (free text or predefined values)
    - Optional predefined values (e.g., "Finance", "HR", "Operations")

3. **Label Application**: Labels are applied to APIs as key-value pairs:
    - Key: The label identifier (e.g., "business_domain")
    - Value: The specific value for this API (e.g., "Finance")

4. **Label Storage**: Labels are stored as metadata with each API in the repository database
5. **Search and Filter**: Tyk Governance indexes labels to enable efficient filtering and searching

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
- **Use consistent labeling conventions** across all APIs to facilitate effective filtering and governance
- **Combine multiple labels in filters** for more precise API discovery
- **Use criticality and domain labels** as the foundation of your governance strategy

## FAQs

<details> <summary><b>Can I create custom labels with my predefined values?</b></summary>

Yes, Governance Administrators can create custom labels with either free text values or a predefined list of acceptable values.

</details> 

<details> <summary><b>How do labels differ from tags?</b></summary>

Labels are structured key-value pairs that can be validated and used for governance, while tags are typically simpler, unstructured text values mainly used for search.

</details> 

<details> <summary><b>Are labels from source systems preserved during discovery?</b></summary>

Yes, the discovery process attempts to map source system metadata to corresponding labels in the governance hub where possible.

</details> 

## Troubleshooting

<details> <summary><b>Labels not appearing in filter options</b></summary>

- Ensure a Governance Admin has properly defined the label  
- Check that at least one API has been tagged with this label  
- Refresh the browser cache if the label was recently added  

</details> 

<details> <summary><b>Cannot add a specific label value</b></summary>

- For predefined value labels, check that the value you're trying to add is in the allowed list  
- Verify you have sufficient permissions to modify the API's labels  
- Ensure the label hasn't been deprecated or replaced  

</details> 
