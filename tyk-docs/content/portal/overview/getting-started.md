---
title: "Set up the Developer Portal"
date: 2025-07-26
tags: ["Developer Portal", "Tyk"]
keywords: ["Developer Portal", "Tyk"]
description: "Get started quickly with setting up and using the Tyk Developer Portal."
aliases:
  - /product-stack/tyk-enterprise-developer-portal/getting-started/getting-started-with-enterprise-portal
  - /product-stack/tyk-enterprise-developer-portal/getting-started/enterprise-portal-concepts
  - /product-stack/tyk-enterprise-developer-portal/getting-started/getting-started-with-enterprise-portal
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/with-tyk-self-managed-as-provider
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/customise-menus
  - /product-stack/tyk-enterprise-developer-portal/getting-started/with-tyk-self-managed-as-provider
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/getting-started-with-enterprise-portal
  - /getting-started/tyk-components/developer-portal
---

## Introduction

Once you have [installed]({{< ref "portal/install#installation-options-for-enterprise-developer-portal" >}}) your Developer Portal, you'll need to connect it to a Provider (Tyk Dashboard) so that it can synchronise API Products and Subscription Plans to appear in your Catalog. You can use a single Developer Portal to publish Catalogs from multiple Providers. In this section we'll take you through the steps to connect to a single Tyk Dashboard installation.

{{< youtube 8KJSVACD-j4 >}}

## Registering the Developer Portal with Tyk Dashboard

Tyk Dashboard exposes a management API with a user management system that performs fine-grained Role Based Access Control (RBAC). The Developer Portal uses this API to configure and control security policies on the Dashboard. These policies implement the Developer Portal's API Products and Plans, and are used in the creation and maintenance of access credentials for API Consumers.

The Developer Portal thus needs access to the Tyk Dashboard API, so you will need to create a dedicated user on your Tyk Dashboard, following the steps indicated [here]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}).

Ensure that this user has the following permissions:

| Permission   | Access level |
|--------------|--------------|
| APIs         | Write        |
| Certificates | Write        |
| Keys         | Write        |
| Policies     | Write        |
| Analytics    | Read         |
| Users        | Read         |

### Locating the Access Credentials in Tyk Dashboard

1.  Select **Users** from the **User Management** section.
2.  In the users list, click **Edit** for the user you have created for the Developer Portal
3.  The Secret is the **Tyk Dashboard API Access Credentials**
4.  If required, the **Organization ID** is underneath **Reset key**

 {{< img src="/img/2.10/user_api_id.png" alt="API key location" >}}


## Configuring the Provider

1. Go to the **Provider** section in the **Admin Portal**
2. Click **Add new Provider**
3. Add your provider details

| Field           | Description                                     |
|-----------------|-------------------------------------------------|
| Name            | A local name for this Provider; Tyk Developer Portal can publish catalogs for multiple providers  |
| URL             | The host URL for your Tyk Dashboard installation |
| Secret          | The access credential that the Developer Portal must present when consuming the provider's management API, for example the [Tyk Dashboard API Access Credential]({{< ref "portal/overview/getting-started#locating-the-access-credentials-in-tyk-dashboard" >}}) |
| Organization ID | (optional) In some configurations, the Dashboard's [Organization Id]({{< ref "portal/overview/getting-started#locating-the-access-credentials-in-tyk-dashboard" >}}) is required |
| Policy tags     | (optional) This field can be used to synchronise only a subset of the Products and Plans present on the Provider |
| Baseline URL    | (optional) The URL of the API Gateway that API Consumers will use to make requests to the published APIs |
| Insecure skip verify | Check this box to ignore mTLS between the Provider and Developer Portal, often used in test environments |

4. Click **Save Changes**

If a tag is defined here, it needs to also be defined in the [Policy]({{< ref "api-management/policies" >}}) for it to be retrieved during the [synchronization]({{< ref "portal/api-provider#synchronizing-developer-portal-with-providers" >}}). If this field is left empty in the Provider configuration, then all partitioned ([access]({{< ref "portal/api-products#data-distribution-and-management" >}}) and [consumption limit]({{< ref "portal/api-plans#data-distribution-and-management" >}})) policies will be imported from the Tyk instance. For API Products and Plans created on the Developer Portal, the policy tag will automatically be created for the corresponding policies created on the Tyk Dashboard.

### Testing the Connection

After creating the Provider in your Developer Portal you can test the connection by clicking on **Synchronize** on the **Providers** screen in the Admin Portal. This will display a confirmation message if the connection is made successfully, pulling any policies relating to Products and Plans (with the appropriate Policy tags) over to the Portal.

## Create an Organizational Structure

After connecting your Developer Portal to a Provider, the next step is to set up the organizational structure for your API consumers. This structure determines how external developers will access and interact with your APIs. In this guide, you'll learn how to create Organisation (Orgs), Teams, and API Consumer Admin users, which form the foundation of your Developer Portal's access control system.

When the Portal was [bootstrapped]({{< ref "portal/install#bootstrapping-enterprise-developer-portal" >}}) a default *org* is created; this is intended to act as a backstop for any API Consumer users that have not been assigned to another *Organisation*; **we do not recommend publishing API Products and Plans in the default Organisation**.

Every Org is automatically provisioned with a default *team* which, again, is intended as a backstop for any user not assigned to another team. **Note** that if you remove a User from all teams in an org, they will automatically be assigned to the default Team.

### Step 1: Create an Organisation

Organisation represent companies or business units that will consume your APIs. Start by creating your first Organisation:

1. Log in to the Developer Portal using your API Owner credentials
    - this will take you to the Admin Portal view
2. Navigate to **API Consumers > Organisation**
3. Click **Add Organisation**
   {{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-organisations.png" alt="Add a new Organisation" >}}
4. Enter a *Name* for the Organisation
    - this will only be used within the Admin Portal view to identify the org
   {{< img src="/img/dashboard/portal-management/enterprise-portal/create-b2b-customer-org.png" alt="Name the new Organisation" >}}
5. Click **Save Changes**
    - note that a *default team* is automatically created within the new org

### Step 2: Create a Team Within the Organisation

Teams allow you to group users within an Organisation who need similar API access:

1. Navigate to **API Consumers > Teams**
2. Click **Add new team**
3. Enter the following details:
    - Name: A descriptive name (e.g., "Mobile Developers")
    - Organisation: Select the org that you created in [step 1]({{< ref "portal/overview/getting-started#step-1-create-an-organisation" >}})
4. Click **Save changes**
5. Repeat this process to create all the teams you need within the Organisation.

### Step 3: Create an API Consumer Admin User

API Consumer Admin users have special privileges to manage other users within their Organisation:

1. Navigate to **API Consumers > Users**
2. Click **Add new user**
3. Enter the user's details:
    - First Name and Last Name
    - Email: The user's email address (this will be their login)
    - Select the **activate developer** checkbox
    - Select the org that you created in [step 1]({{< ref "portal/overview/getting-started#step-1-create-an-organisation" >}})
    - Select the Team that you created in [step 2]({{< ref "portal/overview/getting-started#step-2-create-a-team-within-the-organisation" >}})
    - For this tutorial provide an initial password for the user
4. Click **Save changes**

## What's Next?

**Congratulations**

You have successfully connected your Developer Portal to your Tyk Dashboard provider and created a basic organizational structure for your Developer Portal with an API Consumer Admin user account for your client's use. Next, you probably want to add some content to the Portal for them to consume.

It's time to [create your first API Catalog]({{< ref "portal/publish-api-catalog" >}}).

### Best Practices

- **Plan your hierarchy**: Design your organizational structure before creating Orgs and Teams
- **Use descriptive names**: Make Organisation and Team names clear and meaningful
- **Start simple**: Begin with a basic structure and expand as needed
- **Document your structure**: Keep a record of your Organisation, Teams, and their purposes
- **Regular review**: Periodically review and clean up unused Organisation and Teams
