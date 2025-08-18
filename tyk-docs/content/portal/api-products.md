---
title: "API Products"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "API Products"]
keywords: ["Developer Portal", "Tyk", "Reference", "API Product", "Product", "Catalog"]
description: "Working with API Products"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products
  - /tyk-developer-portal/tyk-portal-classic/streams
  - /tyk-developer-portal/streams
---

## Introduction

API Products are strategic packages of API resources that deliver specific value to API consumers. Rather than exposing raw API endpoints, API Products allow you to bundle related functionality together with appropriate documentation, access controls, and business context.

API Products transform technical APIs into business assets by:

- Grouping related API functionality into coherent offerings
- Providing context and documentation that explains the business value
- Establishing clear terms of use through associated plans
- Creating a consistent developer experience across multiple underlying APIs

In the Tyk Developer Portal, API Products serve as the primary unit of discovery, access control, and [monetization]({{< ref "overview/intro#api-monetization-with-tyk-developer-portal" >}}) of your API portfolio.

Since Tyk 5.7.0, you have been able to create API Products to publish your [Tyk Streams APIs]({{< ref "api-management/event-driven-apis" >}}) on the Developer Portal.

## Understanding the Relationship Between Portal and Provider

API Products in the Tyk Developer Portal represent a powerful abstraction layer that sits on top of your underlying API infrastructure. Understanding how the Developer Portal interacts with the Provider (Tyk Dashboard) is essential for effective product management:

### Data Distribution and Management

All metadata relating to the API Product is stored within the Developer Portal, including:
- Product name, description, and images
- Documentation and guides
- Catalog assignments and visibility settings
- Custom fields

The actual access policy that defines which APIs are included in the Product is managed by the Provider. This separation creates a clean division between presentation/discovery (Portal) and access control (Provider).

<br>
{{< note success >}}
**Note**  

Once an access policy has been linked to an API Product you are strongly recommended not to make changes to it from the Provider, but to manage the Product in the Developer Portal.
{{< /note >}}

### Creation Workflows

You can create API Products through two primary workflows:

#### Portal-First Approach (Recommended)

When you create a Product in the Developer Portal:

- The Portal creates a corresponding access policy in the Tyk Dashboard
- This policy defines which APIs are included in the product
- The policy is automatically linked to the Product in the Portal
- You can then enhance the Product with documentation, images, and other metadata

This approach gives you full control over the Product's presentation and allows you to create a rich developer experience from the start.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-customize.png" alt="Customize an API Product" >}}

#### Dashboard-First Approach

Alternatively, you can:

- Create a partitioned access policy directly in the Tyk Dashboard
- When you [synchronize]({{< ref "portal/api-provider#synchronizing-developer-portal-with-providers" >}}) the Developer Portal with the Provider, a new API Product will be created automatically
- This Product will be "bare bones" with a name derived from the Dashboard policy but no description or other metadata
- You can then enhance this auto-created Product through the Admin Portal interface
- This approach is useful when you already have policies defined in your Dashboard or when you're migrating existing APIs to the Developer Portal

{{< youtube rIGnIQ235As >}}

### Best Practice

For the best developer experience, we recommend:

- Planning your API Products from a consumer perspective
- Creating Products using the Portal-first approach
- Enriching them with comprehensive documentation and context
- Regularly reviewing and updating both the Portal metadata and the underlying policies

This ensures that your API Products remain aligned with both your business objectives and the technical implementation of your APIs.

## Creating a New API Product

You can create a new API Product in the Developer Portal by following these simple steps:

1. Log in to the Developer Portal as an [API Owner]({{< ref "portal/api-owner" >}})
2. Navigate to **API Products** in the main navigation
3. Select **Add new API Product**
4. Navigate to the **APIs** tab
5. Select the *Provider* that hosts the APIs you want to include
6. Select the *Authentication method* that covers the APIs you want to include
7. Select the *APIs* you want to include in the Product
8. Navigate to the **Details** tab
9. Enter a descriptive **Name** for your Product
10. Select **Save Changes**

Your new API Product will now be available on the **API Products** page. You will need to publish the Product to a Catalog for it to appear in the Live Portal.

These are the minimal steps to create an API Product and of course it won't be very appealling to API Consumers if you did publish it. You might want to select the Product's tile and add some description, documentation and user guides. Remember to select **Save Changes** when you are done.

## API Product Reference Guide

This comprehensive reference guide details all the configurable options and features of API Products in the Tyk Developer Portal.

### Core Features

#### Product Name

The primary identifier for your API Product.

- **Location**: *API Products > Add/Edit API Product > Details tab > Product name*
- **Purpose**: Identifies the Product within both the Developer Portal and the Provider
- **Behavior**: Used as the name for the partitioned access policy in the Provider
- **Synchronization**:
    - Modifying the name in the Portal immediately updates the policy name in the Provider
    - Modifying the policy name in the Provider updates the Product name during the next Portal synchronization
**Best Practice**: Choose a clear, descriptive name that reflects the Product's purpose

#### Provider

The Tyk Dashboard instance that hosts the APIs included in this Product.

- **Location**: *API Products > Add/Edit API Product > APIs tab > Choose a provider*
- **Purpose**: Links the Product to the correct Provider instance (where the policy will reside)
- **Selection**: Choose from a dropdown list of all registered Providers
- **Note**: The Developer Portal can publish Products from multiple Providers, but each individual Product is limited to one Provider

#### Authentication Method

Defines how API consumers will authenticate when accessing the APIs within this Product.

- **Location**: *API Products > Add/Edit API Product > APIs tab > Choose authentication method*
- **Purpose**: Ensures you can only select from relevant APIs
- **Limitation**: Each Product can only include APIs with a compatible authentication method
- **Behavior**: When a Developer App is approved to consume a Product, credentials (such as an API key or OAuth token) are issued
    - These credentials must work with all APIs in the Product
    - For example, an API key would not work with an API expecting a JWT
- **Selection**: Choose from available authentication methods supported by your Provider
- **Filter Effect**: The list of available APIs will automatically be filtered to show only those compatible with the selected authentication method
- **Best Practice**: Consider authentication method compatibility when planning which APIs to group into Products

#### API List

Displays all APIs included in the Product based on the selected Authentication Method.

- **Location**: *API Products > Add/Edit API Product > APIs tab > Select APIs*
- **Content**: Shows API name, API Id, and category for each available API
- **Selection**: Select all the APIs to include in the Product
- **Note**: [Documentation-only Products]({{< ref "portal/api-products#documentation-only-products" >}}) do not require any APIs to be selected

#### Webhooks

For Tyk Streams APIs, configure which events developers can subscribe to.

- **Location**: *API Products > Add/Edit API Product > Webhooks tab > Event types*
- **Purpose**: Controls which event types are exposed to developers
- **Options**: Select specific event types or allow access to all events
- **Prerequisites**: Requires Tyk Streams APIs to be configured in the Provider

### Documentation

#### API Reference Documentation

Detailed technical documentation generated from OpenAPI specifications.

- **Location**: *API Products > Add/Edit API Product > Documentation tab > Add API specification*
- **Purpose**: Provides detailed technical reference documentation
- **Format**: Upload OpenAPI Description files in JSON or YAML format from file or URL
- **Display**: Rendered as interactive documentation in the Live Portal
- **Size Limit**: Configured using the `PORTAL_MAX_UPLOAD_SIZE` configuration (to a maximum of 32MB)
- **Note**: For a [Documentation-only Product]({{< ref "portal/api-products#documentation-only-products" >}}) the *Specification Alias* will be used as the reference for each OpenAPI document, rather than the API name

#### Getting Started Guide

A series of pages that will be presented in the Get Started tab within the Product on the Live Portal, typically used to provide additional detail or step-by-step instructions for developers.

- **Location**: *API Products > Add/Edit API Product > "Getting started" guides tab > Create new page*
- **Purpose**: Create additional documentation that helps developers integrate with and use the API Product
- **Format**: Markdown or HTML content with multiple pages
- **Ordering**: Pages can be edited and reordered as required

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-guides.png" alt="Add Product Guides" >}}

#### Related Blog Articles

Links to relevant content from the Portal's blog.

- **Location**: *API Products > Add/Edit API Product > Details tab > Blog tags*
- **Purpose**: Connects developers with related tutorials, announcements, and use cases
- **Mechanism**: Blog posts with matching tags are automatically displayed with the Product
- **Best Practice**: Use consistent tagging strategy across Products and blog content

{{< img src="img/dashboard/portal-management/enterprise-portal/tags-diagram.png" alt="Tags diagram" width="600" height="314" >}}

### Live Portal Presence

#### Catalog Assignment

Determines which API Catalogs include this Product.

- **Location**: *API Products > Add/Edit API Product > Details tab > Publish API product to catalogue*
- **Purpose**: Controls Product visibility to different developer audiences
- **Options**: Select one or more Catalogs where this Product should appear
- **Behavior**: Product will only be visible to developers with access to the selected Catalogs

#### Catalog Display Name

The Product name as shown in the Live Portal.

- **Location**: *API Products > Add/Edit API Product > Details tab > Catalogue display name*
- **Purpose**: May differ from internal Product name for marketing purposes
- **Example**: Internal name "Payment Processing API v2" could have a display name "Payment Processing API"

#### Featured Product

Highlights the Product in Catalog listings on the Live Portal.

- **Location**: *API Products > Add/Edit API Product > Details tab > Featured API Product*
- **Purpose**: Gives the Product prominent placement on Catalog pages
- **Behavior**: Featured Products typically appear at the top of listings with special styling
- **Best Practice**: Limit the number of featured Products to maintain impact

#### Product Summary

A short description of the Product visible in the Product's tile in the Catalog, also displayed on the Product's dedicated page in the Live Portal.

- **Location**: *API Products > Add/Edit API Product > Details tab > Description in the catalogue page*
- **Purpose**: Helps developers quickly understand the Product's value
- **Format**: Rich text editor supporting basic formatting
- **Content**: Typically 1-3 sentences (recommended maximum 200 characters)
- **Format**: Plain text only

#### Product Description

Detailed information about the Product, visible on the **Overview** tab of the Product's dedicated page in the Live Portal.

- **Location**: *API Products > Add/Edit API Product > Details tab > Description in the product details page*
- **Purpose**: Provides comprehensive information about the Product's features, benefits, and use cases
- **Format**: Rich text editor supporting basic formatting
- **Content**: Typically includes overview, features, use cases, and requirements
- **Best Practice**: Structure content with clear headings and concise paragraphs

#### Product Image

Images to be displayed to enhance the appeal of the Product in the Catalog. Note that currently only the *Product* image is used, not the *Catalogue* image.

- **Location**: *API Products > Add/Edit API Product > Details tab > Product page image*
- **Purpose**: Enhances visual appeal and recognition in catalog listings
- **Format**: JPG or PNG
- **Recommended Size**: 700x400 pixels
- **Note**: While the maximum file size is 32MB, the image will be resized to fit within 700x400 pixels


## Documentation-only Products

Documentation-only Products are a special type of API Product that serve purely informational purposes without providing actual API access. These Products appear in the Developer Portal but don't create any access policies in the Provider.

### Use Cases

- Pre-release Documentation: Publish specifications and guides for upcoming APIs before they're available for consumption
- Conceptual Information: Provide architectural overviews, best practices, or integration patterns
- Deprecated API Archives: Maintain documentation for historical reference after an API has been retired
- Educational Resources: Create learning materials about your API ecosystem

### Configuration

To create a Documentation-only Product:

1. Create a new API Product following the standard process
2. On the **APIs** tab, do not select any APIs from the [list]({{< ref "portal/api-products#api-list" >}})
3. On the **Documentation** tab, add [OpenAPI documentation]({{< ref "portal/api-products#api-reference-documentation" >}}) as needed
4. Configure the usual Product descriptions, imagery and and [usage guides]({{< ref "portal/api-products#getting-started-guide" >}}) you wish to display in the Live Portal
5. Publish the Product to your desired Catalog(s)

### Behavior in Live Portal

The Product will appear in Catalogs like any other Product
- Documentation, guides, and API specifications will be fully accessible
- No "Request Access" option will be available since there are no APIs to access
- No access policy will be created in the Provider

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-doc-only-product.png" alt="A Documentation-only Product in the Live Portal" >}}

### Best Practices

- Clearly indicate in the Product description that this is documentation-only
- Consider using a consistent naming convention (e.g., "[DOCS] Payment Integration Guide")
- If documenting a future API, include expected release timeframes
- For educational resources, structure content in a logical learning sequence

Documentation-only Products provide flexibility in how you communicate with your developer community, allowing you to share valuable information even when API access isn't available or necessary.

## API Product Best Practices

### Naming and Organization

- Use Clear, Descriptive Names: "Payment Processing API" is better than "API v3"
- Group Related Functionality: Bundle APIs that solve a common business problem
- Maintain Consistent Naming: Use a consistent naming convention across Products

### Documentation

- Start with Why: Explain the business value before technical details
- Include Complete Examples: Provide working code samples in multiple languages
- Document Error Scenarios: Help developers understand and handle errors
- Keep Documentation Updated: Ensure documentation reflects the current API behavior

### Product Design

- Focus on Consumer Needs: Design Products around specific use cases
- Limit Scope: Each Product should have a clear, focused purpose
- Consider Granularity: Balance between too many small products and too few large ones
- Plan for Evolution: Design Products with future changes in mind

### Limitations and Considerations

#### Technical Considerations

- Policy Constraints: An API product can only include APIs defined in a single Tyk access policy using the same auth method
- Cross-Gateway Limitations: APIs must be deployed on the same Tyk Gateway to be included in one Product
- Documentation Size: Very large OpenAPI specifications may impact portal performance

#### Organizational Considerations

- Ownership: Establish clear ownership for each API Product
- Lifecycle Management: Define processes for deprecating and retiring Products
- Feedback Loops: Create mechanisms to gather consumer feedback on Products
- Metrics and Analytics: Determine how to measure Product success

## Troubleshooting Common Issues

#### APIs Not Appearing in Product

 - Verify the Provider access policy includes the expected APIs
 - Check that the APIs are active in the Provider

#### Documentation Not Displaying Correctly

- Validate OpenAPI specifications for syntax errors
- Check for CORS issues if using interactive documentation
- Verify markdown/HTML formatting in custom documentation

#### Product Not Visible in Catalog

- Confirm the Product is assigned to the Catalog
- Verify Catalog visibility settings