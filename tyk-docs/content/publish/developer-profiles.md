---
date: 2017-03-24T17:33:13Z
title: Developer Profiles
menu:
  main:
    parent: "Portal Management"
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

### Edit the Developer Profile

All fields in the profile are editable. In this section you can select a field and modify that data for the developer. This will not affect any tokens they may have, but it will affect how it appears in their Developer Dashboard in your Portal.

![Developer edit form][7]

Developers can edit this data themselves in their accounts section.

### Search for a Developer

You can search for a developer (by email address) by entering their address in the Search field.

This option is only available from Dashboard v1.3.1.2 and onwards.

![Developer Profile Search][8]

 [1]: /docs/img/dashboard/portal-management/developer_menu_2.5.png
 [2]: /docs/img/dashboard/portal-management/add_developer_2.5.png
 [3]: /docs/img/dashboard/portal-management/developer_details_2.5.png
 [4]: /docs/img/dashboard/portal-management/developer_overview_2.5.png
 [5]: /docs/img/dashboard/portal-management/developer_usage_2.5.png
 [6]: /docs/img/dashboard/portal-management/developer_subs_2.5.png
 [7]: /docs/img/dashboard/portal-management/developer_edit_2.5.png
 [8]: /docs/img/dashboard/portal-management/developer_search_2.5.png

