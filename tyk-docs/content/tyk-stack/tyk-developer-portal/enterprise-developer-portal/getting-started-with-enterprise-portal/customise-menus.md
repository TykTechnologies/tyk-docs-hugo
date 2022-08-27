---
title: "Customise the menu of live portal"
date: 2022-02-08
tags: [""]
description: ""
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

The Enterprise Developer portal enables admin users to customise the navigation menu that appears on the top navigational bar of the live portal. An admin user can create and manage menu items without any code from the admin dashboard of the Developer portal.
{{< img src="img/dashboard/portal-management/enterprise-portal/top-nav-menu.png" alt="The navigation menu" >}}

Each menu item may:
- lead to a specific page or URL:
  {{< img src="img/dashboard/portal-management/enterprise-portal/regular-menu-item.png" alt="Regular menu item" >}}
- show a dropdown list with possible navigational options:
  {{< img src="img/dashboard/portal-management/enterprise-portal/dropdown-menu-item.png" alt="Dropdown menu item" >}}

Admin users can create additional navigational menus and render them on any page of the live portal. This customisation requires changes to a theme and is covered in the [Full customisation section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/menus-customisation.md" >}}).

## Manage menu items

The management of the menu items is done from the **Menus** section of the Developer portal.

1. Open the admin dashboard. Navigate to the **Menus** section.
   {{< img src="img/dashboard/portal-management/enterprise-portal/navigation-to-menus-section.png" alt="Navigate to the Menus section" >}}

2. Select a menu that you want to modify. By default, the Developer portal has only one **Primary** menu. If you want to add more menus and render them on the live portal, please refer to [Full customization section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/menus-customisation.md" >}}).
   {{< img src="img/dashboard/portal-management/enterprise-portal/select-a-menu.png" alt="Select a menu" >}}

3. Click on a **menu item** to modify it. You can change the following items:
    1. **Title** that will be exposed to developers.
    2. **Path** where developers will be redirected by clicking on that menu item.
    3. **Children** items that will be exposed in the dropdown list that will appear when hovering mouse over the menu item.
    4. To make the changes effectively, you need to save the changes by clicking on the **Save changes** button.
       {{< img src="img/dashboard/portal-management/enterprise-portal/menu-item.png" alt="Modify a menu item" >}}

4. To remove a menu item from the menu click on the **bin** icon and click on the **Save changes** button.
   {{< img src="img/dashboard/portal-management/enterprise-portal/delete-a-menu-item.png" alt="Delete a menu item" >}}

## Create new menu items
To create a new menu item, you need to:

1. Click on the **Add Menu Item** button.
2. Fill **Title**, **Path**, and **Children** fields. Save the changes by clicking on the **Save changes** button.
   {{< img src="img/dashboard/portal-management/enterprise-portal/save-new-menu-item.png" alt="Save a menu item" >}}

The new menu item will appear on the live portal immediately.
{{< img src="img/dashboard/portal-management/enterprise-portal/new-menu-item-on-the-live-portal.png" alt="New menu item on the live portal" >}}s