---
title: "Edit Manage Page Content"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Content Manager Workflow"
weight: 2
---
{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Content managers or similar roles that are responsible for the content displayed on the developer portal can edit and manage pages within the **Page section** of the Developer Portal.

## Prerequisites

- Install the Developer portal
- Log in to the portal dashboard
- Default pages available or a page created by a developer which has the custom theme linked to it

## How to manage and edit page content

1. From the Pages section, open an existing page. This could be a page based on the default template or a new page that one of your developers set up when creating a new custom template.
2. Edit the page meta data. Change the name of the page if needed. Set or change the path URL if needed.

{{< img src="/img/dashboard/portal-management/enterprise-portal/page-content-edit.png" alt="Edit Portal page content" >}}

3. Edit the page content within the existing content blocks.

{{< note success >}}
**Note**

The content block name is linked to the content block name in the template html file. If this name is changed, and not reflected in the template html, the page will get an error and won’t show.

{{< /note >}}

4. Publish the page and view it from the external portal URL. If you want the page to be published and visible on the external portal, you need to change the state to Published.
