---
title: "Developers and API Consumers in the Developer Portal"
date: 2022-02-10
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "API Consumer", "Developer", "Organization", "Invite Codes", "Consumer Registration"]
keywords: ["Developer Portal", "Tyk", "API Consumer", "Developer", "Organization", "Invite Codes", "Consumer Registration"]
description: "How to configure API Consumers in Tyk developer portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumers
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations
  - /tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/reset-password
  - /tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/access-api-product
  - /tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/register-portal
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/add-organisations
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/approve-self-registering-requests
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/invite-codes
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-users
  - /tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/managing-access
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Manage API Consumers

External developers are referred to as API Consumers. In the Tyk Developer portal, you can manage external API Consumers via the admin dashboard.

### Glossary

**API Consumers** - Refers to the whole section within the admin dashboard that manages individual external users, teams, and organizations.

**Organizations** - An organization can represent larger business units of a company. It works as a container for various teams and users. An organization can be used which can include multiple teams.

**Teams** - Teams are used to bundle multiple users, a team always needs to be part of an organization.

**Users** - External developers / portal users. A user can belong to multiple teams but can only belong to one organization.

{{< img src="/img/dashboard/portal-management/enterprise-portal/api-consumers-menu.png" alt="Portal API Consumers menu" >}}

### How does the API Consumer section work?

When installing the Tyk Portal, by default the API Consumers section will already have a default organization with a default team added. This means, if your specific use case doesn't require multiple organizations and teams, you can get started straight away and invite a new external user to the developer portal, adding them to the default organization and default team.

If your use case requires adding a new organization, see [step by step guide]({{< ref "portal/api-consumer#manage-api-consumer-organizations" >}}). When an organization is created, a default team tied to that organization is automatically generated too. Teams and organizations can have different visibility when it comes to API Products and plans. This can be managed within the [catalog section]({{< ref "portal/api-provider#create-a-new-catalog" >}}).
