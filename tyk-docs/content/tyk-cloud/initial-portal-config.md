---
title: "Initial Portal Configuration"
date: 2020-07-30
weight: 6
tags: ["Tyk Cloud", "Configuration", "Portal"]
description: "Initial configuration for your Tyk Cloud Portal"
menu:
  main:
    parent: "Configuration Options"
url: /tyk-cloud/initial-portal-config
---

## Introduction

After deploying your Control Plane, you need to perform some initial configuration for the Developer Portal to prevent seeing any `Page Not Found` errors when trying to access the portal. You need to set up a Home page from the Control Plane Dashboard.

Watch our video on configuring your Tyk Cloud Developer Portal.

{{< youtube 8_SPUake84w >}}

1. From the Control Plane Dashboard, select **Pages** from the **Portal Management** menu
2. Click **Add Page**

![Add Portal Page](img/2.10/portal-home-page-add.png)

3. In the Settings, give your page a name and slug. Below we've called it Home
4. Select **Check to make this page the Home page**
5. Select **Default Home page template** from the Page type drop-down list
6. You can leave the Registered Fields sections for now

![Portal Home page settings](img/2.10/portal-home-page-settings.png)

7. Click **Save**.

You should now be able to access your Portal from **Open Your Portal** from the **Your Developer Portal** menu.

![Portal Menu](img/2.10/portal_menu.png)

## Further Portal Configuration

Our Developer Portal is completely customisable. See [Portal Customisation]({{< ref "tyk-developer-portal/customise/" >}}) for more details.