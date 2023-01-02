---
title: "Managing Access"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 4
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction
Quite often, API Providers have to provide API Products to other companies. In fact, 90% of our customers say that their primary audience is other companies. In this case, they are dealing with not just individual developers but with teams of developers.
Unlike individual developers, companies require more sophisticated machinery to access API credentials:
* Usually, a company is represented by a team of developers, not just an individual. Communication between API Providers and API Consumers mustn’t rely on a single individual that may leave a company or be fired;
* API Consumers need to share access credentials securely within their team. Without that capability, they have to share credentials with internal communication tools, which is a horrible practice. Credentials may be stolen, exposed to an incorrect audience, or not appropriately updated;
* Those teams have an internal hierarchy: some users have admin responsibilities with broader permissions, while other teammates’ permissions are restricted to only accessing API Credentials;
* API Consumers should be able to maintain their teams by themselves: invite new members or remove ones that left the team.

So, simply put, there are two main challenges that the new API Consumer organization management capability solves:
* How to share securely share access credentials between team members;
* How to manage user permissions on the API consumer side.

## Prerequisites
Before starting, you need to set up an email server because it’s used to send invitations to API Consumer team members.
Please refer to the email notifications documentation to set up the email server.


## Admin settings and governance

You can control if API Consumers can register an organization and if such registration requires approval from the portal admins.
To enable API Consumer organization registration, navigate to the Settings/General menu and scroll to the API Consumer access section. In that section, there are two settings that control API Consumer registration:
* **Enable API consumers to register organisations**: when this setting is enabled, API Consumers can register organisations, and the respective button appears in the navigation menu;
* **Auto-approve API consumers registering organisation**: When this setting is enabled, no approval is required from the portal admins for an API Consumer to register an organisation. If this setting is disabled, API Consumer can register organisations, but they won’t be able to invite team members.

{{< img src="/img/dashboard/portal-management/enterprise-portal/api_consumer_org_registration_settings.png" alt="Organisation registration settings" >}}

To proceed with the following steps, enable the Enable API consumers setting to register organisations.

## Step 1: Request org registration

Register a developer account or use an existing one and log in to the developer portal as a developer.
To start the organisation registration flow, click on the **Create an organisation** button in the top right corner of the screen.
{{< img src="/img/dashboard/portal-management/enterprise-portal/become_an_organisation_navbar.png" alt="Become an organisation button" >}}

You will be navigated to the screen where you can specify the name of your future organisation.
{{< img src="/img/dashboard/portal-management/enterprise-portal/specify_name_of_an_organisation.png" alt="Specify name of the organisation" >}}

If the **Auto-approve API consumers registering organisation** setting is enabled, the new organisation will instantly be provisioned.
{{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_approved.png" alt="Organisation registration is approved" >}}

Otherwise, the developer will have to wait for approval from admin users.
{{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_pending.png" alt="Organisation registration is pending" >}}

## Step 2: Approve or reject organisation registration requests

If the **Auto-approve API consumers registering organisation** setting is disabled and the email settings are configured correctly, the admin users will be notified about the new organisation registration request via email.
{{< img src="/img/dashboard/portal-management/enterprise-portal/new_org_request_email.png" alt="New organisation registration request notification" >}}

If the **Auto-approve API consumers registering organisation** setting is disabled, the new API Consumer organisations won’t be immediately provisioned.
As an admin user, you can approve or reject organisation registration requests from the Organisation menu.
{{< img src="/img/dashboard/portal-management/enterprise-portal/pending_org_registration_admin.png" alt="New organisation registration request view" >}}

When admin users approve or reject organisation registration requests, the respective email notification is sent to API Consumers.

Notification when organisation request is approved:
{{< img src="/img/dashboard/portal-management/enterprise-portal/org_request_approved_email.png" alt="Organisation registration request is approved" >}}

Notification when organisation request is rejected:
{{< img src="/img/dashboard/portal-management/enterprise-portal/org_request_rejected_email.png" alt="Organisation registration request is rejected" >}}

Both emails are customizable. Refer to [the email customization documentation]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization.md" >}}) for further information on the email customization.


## Step 3: Invite or remove teammates

Once admin users approve the organisation registration request, API Consumers can invite teammates.
As an API Consumer, navigate to the Dashboard to invite new teammates.
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate_to_dashboard.png" alt="Navigate to the dashboard" >}}

Then select the Users tab in the side menu.
{{< img src="/img/dashboard/portal-management/enterprise-portal/open_users_tab.png" alt="Navigate to the Users tab" >}}

You can add a new team member to your API Consumer organisation in the Users tab. To invite a new team member, specify their first and last name, email address, and role.
{{< img src="/img/dashboard/portal-management/enterprise-portal/invite_team_member.png" alt="Invite new team member" >}}

There are two possible roles for API Consumers:
* Super admin;
* Team member.

The difference between these two roles is that the Super admins can invite or remove users from their organisation and manage applications, while the Team members can only manage applications.

Once the invitation is sent, the invited team member should receive the following email:
{{< img src="/img/dashboard/portal-management/enterprise-portal/team-member-invitation-email.png" alt="Invite new team member email" >}}

The invited team member can use the link from the email to register in the portal and join the organisation.
{{< img src="/img/dashboard/portal-management/enterprise-portal/register-new-user.png" alt="Invite new team member email" >}}

## Step 4: Manage API Consumers' role

API Consumer Super admins can manage users in their organizations. To do so, navigate to the Users menu in the Dashboard and select a user to edit.
{{< img src="/img/dashboard/portal-management/enterprise-portal/edit_api_consumer.png" alt="Edit API Consumer profile" >}}

As a Super admin, you can change users’ first and last names and roles. The changes will take effect immediately.
{{< img src="/img/dashboard/portal-management/enterprise-portal/manage_api_consumer_profile.png" alt="Manage API Consumer profile" >}}

## Step 5: Sharing assets between teammates

Now, when any team member creates an application, all other team members can access it and use the credentials.
{{< img src="/img/dashboard/portal-management/enterprise-portal/share_credentials_between_api_consumers.png" alt="Share credentials between API Consumers" >}}
