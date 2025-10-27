---
title: "API Owners"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Reference", "API Owner", "User Management", "User", "Admin"]
keywords: ["Developer Portal", "Tyk", "Reference", "API Owner", "User Management", "User", "Admin"]
description: "Tyk Developer Portal administrators"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/approve-self-registering-requests
---

## Introduction

API Owners are the administrators who configure and manage your Tyk Developer Portal. They control the entire API lifecycle - from defining Products and Plans to managing user access and monitoring usage. With their privileged access to the Admin Portal, API Owners play a crucial role in shaping your API program's success.

Unlike [API Consumers]({{< ref "portal/api-consumer" >}}) who use your APIs, API Owners are responsible for curating the API experience. They make strategic decisions about which APIs to expose, how to package them, who can access them, and under what conditions. Effectively managing your API Owner users is essential for maintaining the security and integrity of your API program.

Whether you're setting up your Developer Portal for the first time or refining your administrative structure, understanding how to properly manage API Owners will help you create a secure, well-governed API program.

### API Owner Roles And Responsibilities

An API Owner's responsibilities typically include:

- API Product Management
  - [Create and configure API Products]({{< ref "portal/api-products" >}})
  - [Define Plans with appropriate rate limits and quotas]({{< ref "portal/api-plans" >}})
  - [Organize Products into Catalogs]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues" >}})
  - [Maintain API documentation and guides]({{< ref "portal/api-products#documentation" >}})
- User Administration
  - [Create and manage API Consumer accounts]({{< ref "portal/api-consumer" >}})
  - [Establish Organisations and Teams]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations" >}})
  - [Control access to Catalogs and API Products]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues#catalog-visibility" >}})
  - [Approve API access requests]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/approve-requests" >}})
- Portal Configuration
  - [Customize the Live Portal experience]({{< ref "portal/customization" >}})
  - [Set up email notifications]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications" >}})
  - [Integrate with OAuth 2.0 Identity Providers]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration" >}})
  - [Integrate with Single Sign On providers]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso" >}})


## Creating An API Owner User

When the Developer Portal is first started, you will go through a [bootstrapping]({{< ref "portal/install#bootstrapping-enterprise-developer-portal" >}}) process during which an initial API Owner user will be created. When the bootstrapped user logs into the Portal, they will reach the Admin Portal. They can create additional API Owners from the **Settings > Admin Users** screen:

1. Select **Add new admin user**
2. Provide a first and last name for the new API Owner
3. Provide a unique email address, which will be used when logging in
4. Select **Active** to activate the user immediately
5. Select **User must change password at the next login** to force the user to provide a new password when they access the Portal (recommended)
6. Set an initial password for their first log in
7. Select **Save changes**

You will observe that the new user is automatically assigned a numeric *Id* and added to the list of **Admin Users**.

<br>
{{< note success >}}
**Note**  

For legacy reasons, the original bootstrapped user is labelled as having the *super-admin* role, whereas subsequent users have the *provider-admin* role. There is no difference in capability between these roles.
{{< /note >}}

## Logging In

If you are not using Single Sign On then to access the Developer Portal, simply navigate to the Portal UI in your browser and select the **Log in** button.

{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-the-login-page.png" width=800 alt="Open the login page" >}}
<br>

- Note that any Public Catalogs and Blogs will be available to you prior to logging in.
- You will be taken to the log in page (`/auth/password/login`) where you enter the email address and password registered for your account.

{{< note success >}}
If you are using Single Sign-On (SSO) then Tyk does not provide a log in page and you should [create one]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso#testing-sso" >}}).
{{< /note >}}

After completing authentication, as an API Owner, you will be taken to the [Admin Portal]({{< ref "portal/overview/concepts#developer-portal-views" >}}).

## Managing Users in the Admin Portal

In the Admin Portal, API Owners have visibility of and permission to manage all other user accounts created on the Developer Portal. There are two separate lists:

- **API Consumers > Users**: API Consumer Admins and Team Members across all Organisations and Teams
- **Settings > Admin users**: API Owners

In each section, an API Owner can:

- create new user accounts
- edit existing user details
- reassign API Consumers to different Organisations and Teams
- approve/activate or deactivate users
- delete users

## User Account Status

Users in the Developer Portal can have their accounts set to either active or inactive status. This status controls their ability to access the portal:

 - Active users can log in and access the Developer Portal
 - Inactive users cannot log in, even with correct credentials

This status mechanism is also used when approving [self-registered users]({{< ref "portal/api-consumer#self-registration" >}}), who remain inactive until approved by an administrator.

### Activating or Deactivating User Accounts

API Owners can change a user's active status at any time:

1. Navigate to the user's profile in the Admin Portal:
    - for API Consumers: **API Consumers > Users**
    - for API Owners: **Settings > Admin users**
2. Toggle the **active** checkbox to the required state
3. Click **Save Changes**
4. Changes take effect immediately - activated users can log in right away, while deactivated users will lose access

**Note**: When users self-register, they appear as inactive until approved. Approving a user registration is the same as activating their account.

### Automatically Approve User Registrations

For trusted environments such as internal developer programs, you can eliminate the manual approval process for self-registered users. When enabled, new API Consumer accounts will be automatically activated upon registration.

To enable this feature:

1. Navigate to **Settings > General** in the Admin Portal
2. Enable the **Auto-approve API consumers registering to the portal** option
3. Select **Save changes**

{{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-users.png" >}}

This setting is particularly useful for closed ecosystems where all potential users are pre-vetted or when you want to streamline the onboarding experience.

**Note**: When automatic approval is enabled, all new registrations will immediately gain access to the Developer Portal without administrator review.


### Deleting Users

The API Owner can permanently remove a user from the Developer Portal as follows:

1. Navigate to the appropriate user list in the Admin Portal:
    - for API Consumers: **API Consumers > Users**
    - for API Owners: **Settings > Admin users**
2. Use search to find the user you wish to view or manage (if required)
3. Select **Delete** from the three dot menu
4. Confirm the deletion
5. All user data will be permanently removed

## Security Implications

Given that all API Owners have full administrative access, it's especially important to:

- Limit API Owner Accounts: Only create API Owner accounts for users who genuinely need full administrative access
- Carefully Vet Administrators: Thoroughly verify the identity and trustworthiness of anyone granted API Owner status
- Regular Audits: Periodically review the list of API Owners to ensure it remains current and appropriate
- Prompt Removal: Immediately remove API Owner access when it's no longer needed

## Best Practices for API Owner Management

Since all API Owners have full access, consider these operational approaches:
- Use External Identity Management: Implement SSO or other external identity solutions to control access
- Implement Procedural Controls: Create operational procedures and policies for administrative actions
- Maintain Documentation: Keep detailed records of who has API Owner access and why
- Regular Training: Ensure all API Owners understand the responsibility that comes with full access
