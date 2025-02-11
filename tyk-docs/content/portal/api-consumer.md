---
title: "Developers / API Consumers"
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

## Manage API Consumer Individual Users

### Register a New API User

Developers need to register with the portal to access API Products and manage their applications. This section outlines how developers can register with the portal, access API Products, and reset their passwords if needed.

There are two ways for registering a new account
1. Self signup via the form.
2. Receive an invitation from the portal admin.

Here you’ll learn about how to add and invite a new external user to the developer portal.

**Prerequisites**

- A Tyk portal installation
- Log in to the portal admin app

#### Self Registration/Signup

To use the self sign up flow, you’ll need to:
1. Access the Portal and click **REGISTER**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/portal-login.png" alt="Portal login and Register menu" >}}

2. Complete the **Create an Account** form.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/create-account.png" alt="Form to create a developer portal account" >}}

3. Click **Register to developer portal**.
4. If the portal allows signup without approval, you'll get a message that allows you to log in straight away.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/account-registered.png" alt="Account registered to allow immediate access to the portal" >}}

5. If the portal requires an admin to approve a registration request, after submitting the **Create an Account** form, you will get the following message.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/account-email-popup.png" alt="Registration account submitted for admin approval" >}}

#### Invite a New User

1. From the **API Consumers > Users** menu Click **Add new user**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/users-menu.png" alt="Portal API Users menu" >}}

2. In the **Add user** dialog, enter **First** and **Last** names, and **Email**.
3. Select an organization to which to register your user.
4. You can also set a password for a user by typing it in the **Set password** field. Check the **User must change password at the next login** if you wish your developer to change their password at next login.

    Please note, that you can either send the invite email or set the password yourself, but you cannot use both methods. 

    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-users.png" alt="Add API Users dialog" width="600">}}

5. Click **Save** to add your user.
6. To generate the invite email, click **More Options** in the Overview section and then **Send invite**.

    The user will receive an email with a link to the registration form. This option is only available if you didn't set the password before.
    To customize the invite email, please refer to the [Email customization section]({{< ref "portal/customization#configure-email-notifications" >}}) for guidance.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/users-send-invite.png" alt="Users Send invite dialog" >}}

#### Invite Codes

Here you’ll learn about how to create invite codes to add a new external user to the developer portal. Invite codes can be used to simplify user onboarding. Using invite codes, users will be directly assigned to a team and organization, giving them the same access rights as this team. For example you can use invite codes to:
- Run a promotional campaign like a Hackathon and give access to specific plans to the users.
- Onboard a partner company into the portal by giving them this code for anyone registering.

**Prerequisites**

- A Tyk Enterprise portal installation
- A portal admin app login

**Step by step instructions**

1. From the **API Consumers > Invite Codes** menu, click **Add**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/invite-codes.png" alt="Invite Codes menu" >}}
    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-invite-code.png" alt="Invite Codes dialog" >}}

2. Add the form details:

   - Set your desired **Quota**. Quota is the max number of slots available for your invite code. E.g. if set 100, this code can be used by the top 100 users.
   - Set an expiry date, this is the date on which the code will expire and no more users can sign up to it.
   - Set state to **Active** - this means the code is activated and developers can start using it.
   - Specify the team that any new users that register with this invite code will be added to.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/invite-code-dialog.png" alt="Invite Codes dialog" >}}

3. **Save** the invite code.
4. Share the invite codes. When the saving changes a new Invite code was created and can be viewed in the overview table. To share the invite code, copy it and send to your developer teams/users.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/share-invite-codes.png" alt="Share Invite Codes dialog" >}}

### Approve Self Registering Requests

#### Manual Approval

This section explains how to approve/reject external users self-registering requests to the developer portal. Follow the step-by-step guide.

**Prerequisites**

A Tyk Enterprise portal installation

**Step by step instructions**

1. Click *Users* from the **API Consumers** menu

{{< img src="/img/dashboard/portal-management/enterprise-portal/users-menu.png" alt="Portal API Users menu" >}}

2. When a new user has self-registered to access the developer portal,  their user profile will be added to the overview in the **Users** section.

{{< img src="/img/dashboard/portal-management/enterprise-portal/approve-users1.png" alt="List of Users for your portal app" >}}

3. To approve a user, click on an **inactive** user. Select **Activate developer** from the dialog.

{{< img src="/img/dashboard/portal-management/enterprise-portal/activate-user.png" alt="Select Activate developer" >}}

#### Automatically Approve User Registrations

If you want all Users to be automatically approved this setting can be changed under **Settings > General**. Select **Auto approve developer regestering requests**.

{{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-users.png" alt="Setting to automatically approve user registrations" >}}


## Manage API Consumer Organizations

Quite often, API Providers have to provide API Products to other companies. In fact, 90% of our customers say that their primary audience is other companies. In this case, they are dealing with not just individual developers but with teams of developers.
Unlike individual developers, companies require more sophisticated machinery to access API credentials:
* Usually, a company is represented by a team of developers, not just an individual. Communication between API Providers and API Consumers mustn’t rely on a single individual that may leave a company or be fired;
* API Consumers need to share access credentials securely within their team. Without that capability, they have to share credentials with internal communication tools, which is a horrible practice. Credentials may be stolen, exposed to an incorrect audience, or not appropriately updated;
* Those teams have an internal hierarchy: some users have admin responsibilities with broader permissions, while other teammates’ permissions are restricted to only accessing API Credentials;
* API Consumers should be able to maintain their teams by themselves: invite new members or remove ones that left the team.

So, simply put, there are two main challenges that the new API Consumer organization management capability solves:
* How to share securely share access credentials between team members;
* How to manage user permissions on the API consumer side.

**Prerequisites**

Before starting, you need to set up an email server because it’s used to send invitations to API Consumer team members.
Please refer to the email notifications documentation to set up the email server.

Please refer to the [email notification section]({{< ref "portal/settings#email-configuration" >}}) for further instructions for setting up the email server.

### Admin Settings and Governance

You can control if API Consumers can register an organization and if such registration requires approval from the portal admins.
To enable API Consumer organization registration, navigate to the Settings/General menu and scroll to the API Consumer access section. In that section, there are two settings that control API Consumer registration:
* **Enable API consumers to register organizations**: when this setting is enabled, API Consumers can register organizations, and the respective button appears in the navigation menu;
* **Auto-approve API consumers registering organization**: When this setting is enabled, no approval is required from the portal admins for an API Consumer to register an organization. If this setting is disabled, API Consumer can register organizations, but they won’t be able to invite team members.

<br/>This is how it looks in the portal's UI:
{{< img src="/img/dashboard/portal-management/enterprise-portal/api_consumer_org_registration_settings.png" alt="Organization registration settings" >}}

<br/>To proceed with the following steps, enable the Enable API consumers setting to register organizations.

### Self Registration

**Steps for Configuration**

1. **Request org registration**

    Register a developer account or use an existing one and log in to the developer portal as a developer.
    To start the organization registration flow, click on the **Create an organization** button in the top right corner of the screen.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/become_an_organisation_navbar.png" alt="Become an organization button" >}}

    <br/><br/>You will be navigated to the screen where you can specify the name of your future organization.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/specify_name_of_an_organisation.png" alt="Specify name of the organization" >}}

    <br/><br/>If the **Auto-approve API consumers registering organization** setting is enabled, the new organization will instantly be provisioned.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_approved.png" alt="Organization registration is approved" >}}

    <br/><br/>Otherwise, the developer will have to wait for approval from admin users.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_registration_is_pending.png" alt="Organization registration is pending" >}}

2. **Approve or reject organization registration requests**

    If the **Auto-approve API consumers registering organization** setting is disabled and the email settings are configured correctly, the admin users will be notified about the new organization registration request via email.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/new_org_request_email.png" alt="New organization registration request notification" >}}

    <br/><br/>If the **Auto-approve API consumers registering organization** setting is disabled, the new API Consumer organizations won’t be immediately provisioned.
    As an admin user, you can approve or reject organization registration requests from the Organization menu.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/pending_org_registration_admin.png" alt="New organization registration request view" >}}

    When admin users approve or reject organization registration requests, the respective email notification is sent to API Consumers.

    Notification when organization request is approved:
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_request_approved_email.png" alt="Organization registration request is approved" >}}

    <br/><br/>Notification when organization request is rejected:
    {{< img src="/img/dashboard/portal-management/enterprise-portal/org_request_rejected_email.png" alt="Organization registration request is rejected" >}}

    <br/><br/>Both emails are customizable. Refer to [the email customization documentation]({{< ref "portal/customization#configure-email-notifications" >}}) for further information on the email customization.

3. **Invite or remove teammates**

    Once admin users approve the organization registration request, API Consumers can invite teammates.
    As an API Consumer, navigate to the Dashboard to invite new teammates.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/navigate_to_dashboard.png" alt="Navigate to the dashboard" >}}

    <br/><br/>Then select the Users tab in the side menu.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/open_users_tab.png" alt="Navigate to the Users tab" >}}

    <br/><br/>You can add a new team member to your API Consumer organization in the Users tab. To invite a new team member, specify their first and last name, email address, and role.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/invite_team_member.png" alt="Invite new team member" >}}

    <br/><br/>There are two possible roles for API Consumers:
    * Super admin;
    * Team member.

    The difference between these two roles is that the Super admins can invite or remove users from their organization and manage applications, while the Team members can only manage applications.

    <br/><br/>Once the invitation is sent, the invited team member should receive the following email:
    {{< img src="/img/dashboard/portal-management/enterprise-portal/team-member-invitation-email.png" alt="Invite new team member email" >}}

    <br/><br/>The invited team member can use the link from the email to register in the portal and join the organization.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/register-new-user.png" alt="Invite new team member email" >}}

4. **Manage API Consumers' role**

    API Consumer Super admins can manage users in their organizations. To do so, navigate to the Users menu in the Dashboard and select a user to edit.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/edit_api_consumer.png" alt="Edit API Consumer profile" >}}

    <br/><br/>As a Super admin, you can change users’ first and last names and roles. The changes will take effect immediately.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/manage_api_consumer_profile.png" alt="Manage API Consumer profile" >}}

5. **Sharing assets between teammates**

    Now, when any team member creates an application, all other team members can access it and use the credentials.
    {{< img src="/img/dashboard/portal-management/enterprise-portal/share_credentials_between_api_consumers.png" alt="Share credentials between API Consumers" >}}

### Manually Create Organizations

In this section, you’ll learn how to create a new organization for your external API Consumers.

**Prerequisites**

- A Tyk Enterprise portal installation
- A portal admin app login

**Step by step instructions**

1. From the **API Consumers > Organizations** menu, click **Add**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/organisations-menu.png" alt="Portal Organizations menu" >}}
    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-org2.png" alt="Add a new Organization" >}}

2. Enter the name of your new organization

    {{< img src="/img/dashboard/portal-management/enterprise-portal/add-orgs.png" alt="Add a new Organization" >}}

3. Click **Save** to create your new organization. A new default-team will also automatically created that is tied to your new organization.

{{< note success >}}
**Note**

If you want to edit the default team name you can do so by navigating to **Teams**, open up the team associated with the organization you created and edit the name as required.

{{< /note >}}


## Access an API Product

This section explains how to access API products as a registered portal developer

**Prerequisites**

You need to have successfully registered for a portal.

**Step by step instructions**

1. Login to the external developer portal
2. Go to **Catalogs** to view the available API products

{{< note success >}}
**Note**

Using the filter at the top, you can filter on the different created catalogs including different API Products, e.g. a custom catalog that only you and a specific team can access.

{{< /note >}}

3. When selecting on a product, you can click **More info** to access the product overview page.
4. On the product overview page, you can view documentation for each API included in the API product. You can also view information about which catalog the API product is part of. Each catalog may have different plans available so you need to select a catalog based on which plan you want to access.
5. Click **Add to cart**.

{{< note success >}}
**Note**

You can add multiple products to the cart. You can receive one set of access credentials for multiple products as long as they are part of the same cart. If you are adding two products to the cart, and they are part of different catalogs, e.g. Private and Public, you will need to go through two request flows, and you will get two different sets of credentials for each API Product.

{{< /note >}}

6. Add the details needed and select a subscription plan for your  API Product(s) chosen.
7. Create a new app or add to an existing one. If you already have an existing app created you can access it via the drop down or select **Create a new app** to add the credentials to an existing app.
8. Click **Request access**.
9. Navigate to My apps and view the app you created. Depending if the plan requires manual approval by an admin or not, you will either see that the request is pending or you can see the approved access credentials immediately you can start using them.

{{< note success >}}
**Note**

When sending a query, make sure to use the Base URL outlined in the overview of the API Product.

{{< /note >}}

## Reset Password

This page goes through the reset password routine. If you have forgotten your password you can easily reset it via the portal.

1. Navigate to the live portal and click **Login** and you’ll get to the login screen.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/login-portal-forgot.png" alt="Portal login screen" >}}

2. At the login screen click **Forgot Password?** link and you’ll be redirected to the reset password form.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password.png" alt="Forgot Password email address" >}}

3. Enter your email address, and click **Reset** and you’ll see this message.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password-email.png" alt="Forgot Password email sent" >}}

4. Check your email and you should have received an email that contains a link the following format:
`https://the-portal-domain.com/auth/reset/code?token=<token-id>`

5. Click on the link and you will be taken to the reset password screen.
6. Enter your new password and click **Reset**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/reset-password-request.png" alt="Enter and confirm new password" >}}

7. Click **Login again** to go to the Login screen.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/reset-done.png" alt="Enter and confirm new password" >}}

