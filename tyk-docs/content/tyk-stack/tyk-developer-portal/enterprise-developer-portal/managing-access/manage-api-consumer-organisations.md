---
title: "Organisations and Teams"
date: 2025-07-26
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "API Consumer", "Organisation", "Organization", "Team"]
keywords: ["Developer Portal", "Tyk", "API Consumer", "Organisation", "Organization", "Team"]
description: "How to manage Organisations in Tyk Developer Portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/add-organisations
---

## Introduction

The Tyk Developer Portal uses Organisations and Teams to provide flexible, hierarchical access control for your API ecosystem. This structure allows you to manage API Consumers at both the organizational level and in smaller functional groups, reflecting real-world business relationships and access requirements.

Unlike individual developer accounts, Organisations represent entire companies or business entities with sophisticated requirements:

- **Team-based access:** Companies typically have multiple developers who need access to your APIs. Tyk Developer Portal's Organisation and Team structure ensures communication and access don't depend on a single individual who might leave the company.
- **Secure credential sharing**: Organizations need secure ways to share API credentials within their teams. Without proper tooling, developers resort to sharing credentials through insecure channels, creating security risks.
- **Hierarchical permissions**: Within organizations, some users need administrative capabilities while others require more limited access. The Tyk Developer Portal supports this through API Consumer Admin and Team Member roles.
- **Self-service team management**: Organizations can maintain their own teams by inviting new members or removing departed ones, reducing administrative overhead for API providers.

This organizational approach allows you to manage API Consumers at both the company level and in smaller functional groups, supporting complex business relationships while maintaining security and governance.

<br>
{{< note success >}}
**A note on spelling**  

Throughout this documentation, we use specific spelling conventions to help distinguish between product features and general concepts:
- Organisation (with an 's') refers specifically to the entity within the Tyk Developer Portal (sometimes abbreviated to Org)
- organization (with a 'z') refers to real-world businesses or the general concept of organizing

This British/American English distinction helps clarify when we're discussing the Tyk Developer Portal feature versus general organizational concepts.
{{< /note >}}

### Understanding the Organizational Hierarchy

Organisations and Teams create a two-level hierarchy that provides granular control over API access. This allows API Owners to manage access at multiple levels, supporting complex business relationships while maintaining security and governance. Note that users can belong to multiple Teams within an Organisation, allowing for flexible resource allocation based on project needs or job responsibilities.

For example, consider a Partner (Acme Bank) that wishes to consume your APIs. They have an *Accounts* team that requires access to a specific set of APIs and a *Development* team that requires access to those plus additional APIs.

- You create an Organisation for the client (Acme Bank)
- You create separate Teams for their *Accounts* and *Development* users
- You construct two [Catalogs]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues" >}}) of [API Products]({{< ref "portal/api-products" >}}) and [Plans]({{< ref "portal/api-plans" >}})
    - Catalog 1 contains the Accounts APIs and subscription Plans
    - Catalog 2 contains the Developer APIs and subscription Plans
- You configure Catalog visibility as follows:
    - Catalog 1 is made visible to both Teams
    - Catalog 2 is made visible only to the Developer Team
- You create an [API Consumer Admin]({{< ref "portal/api-consumer#api-consumer-admin" >}}) user for each Team
    - these users can invite colleagues into their Team as [API Consumer Team Member]({{< ref "portal/api-consumer#team-member" >}}) users

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-catalogue-sample-set-up.png" alt="Diagram showing an Organisation with two Teams of API Consumers" >}}

With this configuration, the Admin and Team Members in each team are unaware of the other Team or its members. The members of the Accounts team have access to discover and consume the API Products in Catalog 1, whilst the members of the Development team have access to both Catalogs.

### Default Organisation

The system automatically creates a pre-configured "Default Organisation" during the [bootstrap]({{< ref "portal/install#bootstrapping-enterprise-developer-portal" >}}) process that serves as the initial home for:

- Self-registered users without an [invite code]({{< ref "portal/api-consumer#invite-codes" >}})
- API Consumer users created by API Owners without a specific Organisation assignment
- API Consumer users whose Organisation has been [deleted]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#deleting-organisations" >}})

While the Default Organisation cannot be deleted, you can:

- [Rename]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#editing-organisation-details" >}}) it to better reflect your business needs
- Move users from it to other Organisations as needed
- Use it as a holding area for users awaiting proper Organisation assignment

#### Developer App visibility

[Team and Organisation level app visibility]({{< ref "portal/developer-app#visibility" >}}) is not applied within the Default Organisation. This behavior has been implemented to prevent accidental exposure of Developer Apps if a user is removed from a custom Organisation and automatically reverts to the Default Org.

<br>
{{< note success >}}
**Note**  

We do not recommend using the Default Org for publication of API Products and Plans.
{{< /note >}}

## Managing Organisations

Organisations represent companies or business units that consume your APIs.

- **Purpose**: Group related teams and developers under a single entity
- **Hierarchy**: Each API Consumer belongs to exactly one Organisation
- **Default Organisation**: A system-provided Organisation where users are placed if not assigned elsewhere
- **Creation**: Organisations can only be created by API Owners (or by self-registered developers if [Organisation requests]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#requesting-a-new-organisation" >}}) are enabled)
- **Management**:
  - API Owners can create, modify, and delete any Organisation
  - API Consumer Admins can manage users within their Organisation

### Creating Organisations

As an API Owner, you can create new Organisations to represent partner companies or business units:

1. Navigate to **API Consumers > Organisations** in the Admin Portal
2. Select **Add new Organisation**
    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-org2.png" alt="Click on Add to create a new Organisation" >}}
3. Provide a **Name** for the new Organisation
    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-orgs.png" alt="Giving the new Organisation a name" >}}
4. Select **Save changes** to create the Organisation

Once created, you can begin adding Teams and users to the Organisation. Note that a [default Team]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#default-team" >}}) is automatically created with the Organisation.

### Editing Organisation Details

As an API Owner, you can change the name of an Organisations to represent changes in partner companies or business units:

1. Navigate to **API Consumers > Organisations** in the Admin Portal
2. Select the Organisation you want to rename
3. Update the **Name**
4. Select **Save changes**

### Deleting Organisations

As an API Owner, you can delete an Organisation to represent changes in partner companies or business units:

1. Navigate to **API Consumers > Organisations** in the Admin Portal
2. Select the three dot menu next to the Organisation you want to delete
3. Select **Delete**
4. Confirm the deletion

The Organisation and any Teams created within it will be deleted immediately.

All users (both API Consumer Admins and Team Members) will be moved to the [default Team]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#default-team" >}}) in the [default Organisation]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#default-organisation" >}}) where any Developer Apps they own will have their visibility set to [Personal]({{< ref "portal/developer-app#visibility" >}})

### Best Practices for Organisation Management

- **Naming conventions**: Establish a consistent naming pattern for Organisations
- **Regular audits**: Periodically review Organisation membership and activity
- **Documentation**: Maintain records of which real-world entities each Organisation represents
- **Onboarding process**: Create a standardized workflow for adding new Organisations

## Working With Teams

Teams are groups of developers who collaborate on related projects.

- **Purpose**: Enable collaboration and shared access to API resources
- **Hierarchy**:
  - Teams exist within a specific Organisation
  - API Consumers can belong to multiple Teams within their Organisation
- **Default Team**: Each Organisation has a default Team where users are placed if not assigned to any other team
- **Creation**: Teams can only be created by API Owners
- **Management**:
  - **API Owners** can create, modify, and delete any Team
  - **API Consumer Admins** can manage team membership within their Organisation

### Creating Teams

Teams allow you to organize API Consumers into functional groups with specific API access:

1. As an API Owner, navigate to **API Consumers > Teams** in the Admin Portal
2. Select **Add new Team**
3. Complete the team details:
    - **Name**: A descriptive name for the team (required)
    - **Organisation**: Select the Organisation this team belongs to
4. Select **Save changes**

Teams can represent departments, project groups, or any logical grouping that helps organize API access within an Organisation.

### Managing Team Membership

Once a team is created, an API Owner can add members from the Organisation containing the Team:

1. Navigate to **API Consumers > Users** in the Admin Portal
2. Find and select the user you wish to add or remove
3. If they are not in the Organisation containing the Team, change their **Organisation**
3. Modify their Team membership in the **Teams** section
4. Select **Save changes**

An API Consumer Admin can configure the Team membership of other API Consumer users that share any Teams with the Admin as described [here]({{< ref "portal/api-consumer#managing-api-consumer-users-in-the-live-portal" >}}). This self-service capability allows Organisations to manage their own structure while API Owners maintain control over API access.

Remember that users can belong to multiple teams, gaining access to all API Catalogs assigned to any of their teams.

### Default Team

Each Organisation has a system-generated Default Team that serves several important purposes:

- Provides an initial home for new users in the Organisation
- Provides a home for API Consumer users who have been [removed]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#deleting-organisations" >}}) from all other Teams in the Org
- Can be used for Organisation-wide API access

The Default Team cannot be deleted, however you can:

- Rename it to better reflect your business needs
- Move users from it to other Teams as needed
- Use it as a holding area for users awaiting proper Team assignment

#### Developer App visibility

[Team level visibility]({{< ref "portal/developer-app#visibility" >}}) is not applied within the Default Team. This behavior has been implemented to ensure no accidental exposure of Developer Apps if a user is removed from a team and reverts automatically to the Default Team.

<br>
{{< note success >}}
**Note**  

We do not recommend using the Default Team for consumption of API Products and Plans except for Organisation-wide API access.
{{< /note >}}

### Best Practices for Team Management

- **Logical grouping**: Create teams based on project needs or functional areas
- **Minimal access**: Assign only the APIs each team needs to function
- **Regular audits**: Periodically review team membership and API access
- **Descriptive naming**: Use clear, consistent naming conventions for teams
- **Documentation**: Maintain records of each team's purpose and required access


## Requesting a New Organisation

The Developer Portal allows potential API Consumers to request the creation of a new Organisation during self-registration. This powerful feature balances self-service convenience with administrative control, addressing several key business needs:

- When running an open API program that welcomes new business partners
- When scaling your API ecosystem to reach more companies without proportionally increasing administrative work
- When you want to capture interest from potential partners outside normal business hours
- When you need clear differentiation between individual developers and those representing companies

The Organisation request feature adds value with:

- Accelerated Onboarding: Reduces the time from initial interest to active API usage by eliminating manual Organisation creation steps
- Business Intelligence: Provides visibility into which companies are interested in your APIs, creating potential partnership opportunities
- Improved User Experience: Allows users to properly identify themselves as representing a company from the start
- Proper Governance: Maintains security through approval workflows while enabling self-service

This self-service approach reduces administrative overhead while ensuring proper governance of your API ecosystem. It's particularly valuable for open API programs or when expanding your API consumer base.

### Requesting a new Organisation

1. Visit the Developer Portal and [register] without an Invite Code
2. Log in to the Developer Portal (this can be done without the account having been approved)
3. Select **Create an Organisation**
    {{< img src="/img/dashboard/portal-management/enterprise-portal/become_an_organisation_navbar.png" alt="Request a new Organisation" >}}
4. Provide the requested Org with a **Name**
    {{< img src="/img/dashboard/portal-management/enterprise-portal/specify_name_of_an_organisation.png" alt="Specify name of the Organisation" >}}
5. Select **Create Organisation**
6. The user receives confirmation that their request is pending review
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_pending.png" alt="Organisation registration is pending" >}}
7. Note that if the Developer Portal settings are configured for [automatic approval]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#configuring-organisation-request-settings" >}}) of Organisation Requests without API Owner [review]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#reviewing-organisation-requests" >}}) then the Organisation will be created immediately and the requestor approved and converted to an API Consumer Admin within the new Org.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_approved.png" alt="Organisation registration is approved" >}}

### Reviewing Organisation Requests

1. If [automatic approval]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations#configuring-organisation-request-settings" >}}) of Organisation Requests is not set, the API Owner users will be notified of Organisation request via email.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/new_org_request_email.png" alt="New Organisation registration request notification" >}}
2. Navigate to **API Consumers > Organisations** in the Admin Portal
2. The requested Organisation appears as *pending* in the list
3. Select the pending Organisation to see which user made the request
4. After reviewing the request, an API Owner can use the options in the three dot menu to:
    - Approve the request, activating the new Organisation with the requestor automatically becoming an API Consumer Admin
    - Reject the request, with the requestor remaining a Team Member
    {{< img src="/img/dashboard/portal-management/enterprise-portal/pending_org_registration_admin.png" alt="New Organisation registration request view" >}}
5. The requestor will receive an email notifying them of the approval or rejection of the request.

**Note**: The API Owner can modify the name of the new Org during the review, if required.

The content of the emails sent to API Owners and API Consumers can be [customized]({{< ref "portal/customization/email-notifications">}}) to meet your business needs.

### Configuring Organisation Request Settings

Control whether and how users can request new Organisations by configuring the Developer Portal settings:

1. Navigate to **Settings > General > API Consumer access** in the Admin Portal
    {{< img src="/img/dashboard/portal-management/enterprise-portal/api_consumer_org_registration_settings.png" alt="Organisation registration settings" >}}
2. Check or clear the options:
    - **Enable API consumers to register Organisations**
    - **Auto-approve API consumers registering organisation**
4. Select **Save changes**

Note that enabling auto-approval will mean there is no opportunity to review Org requests, so should only be used in carefully controlled business environments.


## Use Cases and Implementation Strategies

The Organisation and Team structure in Tyk Developer Portal can be adapted to support various business models and API programs. Here are strategic approaches for common scenarios:

### Enterprise Partner Ecosystem

**Scenario**: Managing APIs for a network of business partners with different access needs

**Implementation**:
    - Create an Organisation for each partner company
    - Structure teams based on partner's functional departments (e.g., Development, QA, Analytics)
    - Assign graduated API access tiers based on partnership level
    - Designate partner technical leads as API Consumer Admins

**Benefits**:
    - Clear separation between different partner companies
    - Partners can self-manage their internal team structure
    - Access revocation is simplified when partnerships change
    - Usage analytics can be tracked at the partner company level

### Internal Developer Program

**Scenario**: Providing API access across departments within your own company

**Implementation**:
- Create Organisations representing major business units or subsidiaries
- Form teams based on projects, product lines, or functional groups
- Use the Default Organisation for central IT or platform teams
- Implement consistent naming conventions that align with internal structure

**Benefits**:
- Mirrors existing company hierarchy for easier governance
- Supports chargeback models for internal API consumption
- Enables department-specific policies and quotas
- Provides visibility into cross-departmental API usage

### Public API Marketplace

**Scenario**: Offering APIs to external developers with tiered access models

**Implementation**:
- Enable Organisation self-registration requests
- Create template teams for common access patterns (Basic, Professional, Enterprise)
- Implement automated workflows for upgrading access tiers
- Use Default Teams for individual developers without complex needs

**Benefits**:
- Scales efficiently as your developer community grows
- Supports freemium to premium conversion paths
- Allows companies to start small and expand access as needed
- Provides clear separation between individual developers and companies

### Implementation Checklist

Regardless of your use case, consider these factors when designing your Organisation and Team structure:
- **Scalability**: Will the structure accommodate growth in users and APIs?
- **Governance**: Does it support your compliance and security requirements?
- **Administration**: Is the overhead manageable for your API team?
- **User Experience**: Does it make sense from the API Consumer perspective?
- **Analytics**: Will you get the usage insights needed for your business?
- **Flexibility**: Can it adapt as your API program evolves?

By thoughtfully designing your Organisation and Team structure to match your specific business needs, you can create an API program that balances security, usability, and administrative efficiency.
