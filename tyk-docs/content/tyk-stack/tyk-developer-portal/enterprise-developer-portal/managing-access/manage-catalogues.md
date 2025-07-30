---
title: "API Catalogs"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Managing Access", "Catalogs"]
keywords: ["Developer Portal", "Tyk", "Managing Access", "Catalog", "API Product", "Plan"]
description: "Working with API Catalogs"
---

## Introduction

API Catalogs are curated collections of API Products and Plans that enable you to organize and present your API offerings to different developer audiences. Catalogs serve as the primary navigation and discovery mechanism in the Tyk Developer Portal, allowing you to create tailored API marketplaces for different consumer segments.

Unlike traditional API documentation sites that present all APIs to everyone, Catalogs give you fine-grained control over who sees what. This enables you to create personalized experiences for different developer audiences - from public APIs available to anyone, to specialized offerings for specific partners or internal teams.

Catalogs transform your API portfolio management by:

- Segmenting API Products for different developer audiences
- Creating customized discovery experiences for different use cases
- Controlling visibility of API offerings based on business relationships
- Enabling consistent organization of related API Products

In the Tyk Developer Portal, Catalogs act as the bridge between your API Products and your developer community, ensuring that each developer sees exactly the APIs they need.

## Key Concepts

### Catalog Types

The Tyk Developer Portal supports two visibility modes for Catalogs:

- Public Catalogs: Visible to anyone visiting your Developer Portal, even without logging in. Ideal for openly available APIs and developer recruitment.
- Private Catalogs: Visible only to authenticated users who have logged into your Developer Portal. They can be further restricted only to members of specific [teams]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumers" >}}). Perfect for partner-specific APIs, internal teams, or premium offerings.

### Catalog Structure

Each Catalog contains:

- [API Products]({{< ref "portal/api-products" >}}): The functional API offerings available in this Catalog
- [Plans]({{< ref "portal/api-plans" >}}): The subscription options available for Products in this Catalog
- Visibility Settings: Controls which developers can see this Catalog
- Presentation Elements: Name, description, and other display properties

### Catalog Relationships

Understanding how Catalogs relate to other elements in the Developer Portal:

- Products and Plans: A Product or Plan can appear in multiple Catalogs
- Teams and Organisations: Can be granted access to specific Custom Catalogs
- Developer Experience: Developers only see Catalogs they have access to

## API Catalog Reference Guide

This comprehensive reference guide details all the configurable options and features of API Catalogs in the Tyk Developer Portal.

### Core Features

#### Catalog Name

The primary identifier for your Catalog within the Admin Portal, this is not exposed in the Live Portal

- **Location**: *Catalogues > Add/Edit Catalogues > Name*
- **Purpose**: Identifies the Catalog within the Developer Portal
- **Best Practice**: Choose a clear, descriptive name that reflects the Catalog's purpose or audience

#### Path URL

This configuration is not currently in use and can be ignored.

#### Sync URL with Name

- **Location**: *Catalogues > Add/Edit Catalogues > Sync URL with Name*
- **Note**: This configuration must be checked (selected).

### Catalog Visibility

#### Visibility Options

Controls which API Consumers can see and access this Catalog.

- **Location**: *Catalogues > Add/Edit Catalogues > Visibility options*
- **Options**:
    - Public: Visible to all visitors, even without logging in
    - Private: Visible only to authenticated users in the teams select in the [Audience]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues#audience" >}})
- **Default**: Private
- **Best Practice**: Use the most restrictive visibility that meets your business needs

#### Audience

Specifies which teams can access a Private Catalog.

- **Location**: *Catalogues > Add/Edit Catalogues > Team*
- **Selection**: Select **Add Team** then choose from any Teams created on the Developer Portal; you can add multiple teams by repeating this action
- **Behavior**: Only members of the selected teams will see this Catalog
- **Note**: Teams must be created before they can be added to the audience; any combination of Teams can be added to a Catalog's audience across any number of Organisations

### Catalog Content

#### Products

Determines which API Products appear in this Catalog.

- **Location**: *Catalogues > Add/Edit Catalogues > Products*
- **Selection**: Select one or more Products from the dropdown
- **Removal**: Click on the `x` next to the name of the Product you want to delete from the Catalog
- **Relationship**: A Product can be assigned to multiple Catalogs
- **Best Practice**: Ensure that Products and their relevant Plans are assigned to the same Catalogs

#### Plans

Determines which API Plans appear in this Catalog.

- **Location**: *Catalogues > Add/Edit Catalogues > Plans*
- **Selection**: Select one or more Plans from the dropdown
- **Removal**: Click on the `x` next to the name of the Plan you want to delete from the Catalog
- **Relationship**: A Plan can be assigned to multiple Catalogs
- **Best Practice**: Ensure that Products and their relevant Plans are assigned to the same Catalogs

## Best Practices for API Catalogs

- Create purpose-driven Catalogs: Design each Catalog with a specific audience and purpose in mind
- Use clear naming conventions: Make Catalog names intuitive and descriptive
- Maintain consistent organization: Apply similar structures across Catalogs for a predictable developer experience
- Limit the number of Catalogs: Too many Catalogs can create confusion; aim for a manageable number
- Review access regularly: Periodically audit Custom Catalog access to ensure it remains appropriate
