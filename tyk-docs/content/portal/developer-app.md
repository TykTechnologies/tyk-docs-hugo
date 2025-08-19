---
title: "Developer Apps"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "API Consumer", "Developer App", "Developer", "Access"]
keywords: ["Developer Portal", "Tyk", "Reference", "API Consumer", "Developer App", "Developer", "Access"]
description: "All about Developer Apps with Tyk Developer Portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/manage-apps-credentials
---

## Introduction

Developer Apps are containers for API access credentials in the Tyk Developer Portal. They represent the applications that API Consumers (developers) build using your APIs and provide a structured way to organize, manage, and monitor API usage.

When developers want to access your APIs, they create Apps to hold the credentials for specific use cases or projects. Each App can contain credentials for multiple API Products, allowing developers to manage related API access in one place.

Developer Apps transform how API consumers interact with your APIs by:

- Organizing API credentials by project or use case
- Enabling credential management (rotation, revocation)
- Providing usage analytics for specific applications
- Supporting different authentication types for various integration scenarios

In the Tyk Developer Portal, Developer Apps serve as the bridge between API Consumers and your API Products, making credential management intuitive and secure.

## Key Concepts

### App Structure

A Developer App consists of:

- Basic Information: Name, description, and other metadata
- Access Credentials: API keys, OAuth tokens, or other authentication credentials
- Product Subscriptions: The API Products the App has access to
- Usage Statistics: Analytics on how the App is consuming APIs

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-apps-structure.png" >}}

### App Lifecycle

Developer Apps follow a typical lifecycle:

- Creation: Developer creates a new App in the Live Portal
- Subscription: Developer requests access to API Products for the App
- Credential Issuance: Upon approval, credentials are issued to the App
- Active Usage: Developer uses the credentials to access APIs
- Management: Developer can rotate credentials, request additional access
- Retirement: Developer can delete the App when no longer needed

{{< note success >}}
**Note**  

API Owners can create and manage Apps within the Admin Portal from the *API Consumers > Apps* section. From here they can create and delete apps, assign them to different users and issue credentials. In the [Reference Guide]({{< ref "/portal/developer-app#developer-app-reference-guide" >}}) below we indicate where fields differ between Admin Portal and Live Portal views.
{{< /note >}}

### App Ownership

Apps are owned by specific developers, but can be configured with different levels of accessibility:

- Personal Apps: Created and managed by a single API Consumer user
- Team Apps: Accessible to all members of a Team
- Organisation Apps: Accessible to all members of an Organisation

## Developer App Reference Guide

### Essential Information

#### App Name

The identifier for the Developer App.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > App name*
  - Live portal: *My Dashboard > My apps > Create/Edit App > App name*
- **Purpose**: Helps users identify the App in the Developer Portal
- **Best Practice**: Use descriptive names that indicate the App's function (e.g., "Mobile Weather App" or "Inventory Integration")

#### Description

A brief explanation of the App's purpose.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > Description*
  - Live portal: *My Dashboard > My apps > Create/Edit App > Description*
- **Purpose**: Provides context about how the App uses the APIs
- **Best Practice**: Include information about the application's purpose and which APIs it needs

#### App Owner

Only available in the Admin Portal, this gives the facility to reassign an App to a different user.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > App owner*
  - Live portal: *Not available*
- **Purpose**: Associates App ownership with a specific API Consumer
- **Note**: Reassigning an App may alter which other users of the Live Portal can [view]({{< ref "portal/developer-app#visibility">}}) it and have access to its credentials

#### Visibility

Controls visibility of the App within the Live Portal. When an App is visible to a user, they can retrieve the Access Credentials and so are able to consume the APIs bundled in the Products that the App has been approved to access.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > Visibility*
  - Live portal: *My Dashboard > My apps > Create/Edit App > Visibility*
- **Options**:
  - Personal: Only the owner (usually the creator of the App) can view the App
  - Team: All members of Teams of which the owner is a member can view the App
  - Organisation: All members of the Organisation of which the owner is a member can view the App
- **Best Practice**: Share Apps when multiple developers need access to the same APIs

#### Redirect URL

The login redirect URL used in OAuth 2.0 authentication flows. These are specific to the OAuth client 

- **Location**: Details tab
  - Admin portal: *Not applicable*
  - Live portal: *My Dashboard > My apps > Create/Edit App > Redirect URLs*
- **Purpose**: Required for OAuth 2.0 authorization code and implicit flows
- **Format**: Valid URL where users will be redirected after authentication, multiple URLs can be provided in a comma separated list
- **Requirement**: Only required for Apps using OAuth 2.0 authentication


### Product Subscriptions

#### Approved Access

API Products to which the App currently has access.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > Access and credentials*
  - Live portal: *My Dashboard > My apps > Create/Edit App > Approved access*
- **Details**:
 - Admin portal: this section provides the opportunity to *view* or *revoke* the access that has been issued to the App.
 - Live portal: this section provides access to the Access Credentials that have been issued to the App. It also lists the API Products and gives details of the Plan that governs the credentials. Click **Rotate Credentials** for the Provider to issue new credentials, invalidating the previous token.

#### Pending Approval

API Products for which an access request has been made, but not yet approved.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > Pending requests*
  - Live portal: *My Dashboard > My apps > Create/Edit App > Pending access*
- **Details**:
 - Admin portal: this section lists any requests pending for the Developer App, with the option to *approve* or *deny* the request.
 - Live portal: this section lists the API Product and Plan requests pending approval by an API Owner in the Admin Portal.

#### Grant Access

API Owner can grant a Developer App access to a combination of API Product and Plan with a request from the API Consumer.

- **Location**:
  - Admin portal: *Apps > Add/Edit App > Add credential*
  - Live portal: *Not available* 
- **Options**:
  - *Credential alias*: A name for the credential set, identifying this as credentials assigned by the API Owner
  - *Type of credential*: Tyk allocated or Custom (manually assigned key:secret pair)
  - *Authentication method*: The type of credential to be assigned (Auth Token or OAuth 2.0 token)
  - *Access rights*: Select the API Product and Plan


## Best Practices for Developer Apps

- Create purpose-specific Apps: Separate Apps by project or use case rather than combining unrelated API usage
- Use descriptive names: Make App names clear and specific to aid in organization
- Rotate credentials regularly: Implement a schedule for credential rotation to enhance security
- Monitor usage patterns: Regularly review analytics to identify abnormal patterns
- Document App purpose: Maintain clear descriptions of each App's function and required APIs
