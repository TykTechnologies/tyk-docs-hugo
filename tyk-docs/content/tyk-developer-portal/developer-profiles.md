---
date: 2017-03-24T17:33:13Z
title: Developer Profiles
menu:
  main:
    parent: "Tyk Developer Portal"
weight: 2 
---

Users that are signed up to your portal are called "Developers", these users have access to a Dashboard page which show them their API usage over the past 7 days as well as the policy and quota limits on their relevant keys.

Developers can sign up to multiple APIs using the API catalogue.

Developer accounts belong to an organisation ID, so accounts cannot be shared across organisations in a Tyk Dashboard setup.

### Navigate to the Portal Developers Section

![Developer Navigate][1]

#### Select Add Developer

![Developer Profile Create][2]

### Add Basic Details

![Developer Profile Create Details][3]

### Developer Profile Overview

The first panel in a developer profile will show you an avatar (if they have a Gravatar-enabled email address), as well as the basic fields of their signup:

![Developer profile detail][4]

### Developer Usage

The next panel will show you their apI usage as an aggregate for all the tokens that they have generated with their developer access:

![Developer usage graph][5]

### Developer Subscriptions

In this panel, you will be able to see the various policies that the developer has signed up to, and enable you to revoke or update their access to a different policy (e.g. upgrade them to a higher policy tier).

To drill down into the specific usage patterns for each token, click **ANALYTICS** for the subscription.

![Developer subscriptions][6]

### Changing Developer Policy Subscriptions

#### Step 1: View the Developer Profile

Browse to the developers list view and select the developer that you wish to manage.

![Developer profile detail][13]

#### Step 2: View Subscriptions List

This sections shows you the current policy that the developer has access to, this view will always try to match the access level to a catalogue entry, if the policy assigned to a developer is not in the catalogue, the entry will read "(No Catalogue Entry)". We recommend that all policy levels are in your catalogue, even if they are not all live.

#### Step 3: Click CHANGE POLICY

This will open a pop-up window that shows you all available policies that can be assigned to the token for the end user.

![Change policy button][14]

#### Step 4: Select the New Policy

![Change policy drop down list][15]

#### Step 5: Save the Change

Click **CHANGE KEY POLICY** to save the changes.


### Edit the Developer Profile

All fields in the profile are editable. In this section you can select a field and modify that data for the developer. This will not affect any tokens they may have, but it will affect how it appears in their Developer Dashboard in your Portal.

![Developer edit form][7]

Developers can edit this data themselves in their accounts section.

### Search for a Developer

You can search for a developer (by email address) by entering their address in the Search field.

This option is only available from Dashboard v1.3.1.2 and onwards.

![Developer Profile Search][8]

### Developer Edit Profile

Once logged in, a developer can edit their profile. Select **Edit profile** from the **Account** menu drop-down list.

![Manage Profile][9]

A developer can change the following:
* Email
* Change Password
* Name
* Telephone
* Country Location

### Reset Developer Password

If a developer has forgotten their password, they can request a password reset email from the Login screen.

![Login Screen][10]

1. Click **Request password reset**
2. Enter your email address and click **Send Password reset email**

![Email Reset][11]

You will be sent an email with a link to reset your Developer password. Enter your new password and click **Update**. You can then login with your new details.

> **NOTE**: Your password must be a minimum of 6 characters.

![Confirm password][12]





 [1]: /docs/img/dashboard/portal-management/developer_menu_2.5.png
 [2]: /docs/img/dashboard/portal-management/add_developer_2.5.png
 [3]: /docs/img/dashboard/portal-management/developer_details_2.5.png
 [4]: /docs/img/dashboard/portal-management/developer_overview_2.5.png
 [5]: /docs/img/dashboard/portal-management/developer_usage_2.5.png
 [6]: /docs/img/dashboard/portal-management/developer_subs_2.5.png
 [7]: /docs/img/dashboard/portal-management/developer_edit_2.5.png
 [8]: /docs/img/dashboard/portal-management/developer_search_2.5.png
 [9]: /docs/img/dashboard/portal-management/developer_manage_profile.png
 [10]: /docs/img/dashboard/portal-management/login_screen.png
 [11]: /docs/img/dashboard/portal-management/email_password_request.png
 [12]: /docs/img/dashboard/portal-management/password_confirmation.png
 [13]: /docs/img/dashboard/portal-management/developer_edit_2.5.png
 [14]: /docs/img/dashboard/portal-management/developer_subs_2.5.png
 [15]: /docs/img/dashboard/portal-management/select_policy_2.5.png 


