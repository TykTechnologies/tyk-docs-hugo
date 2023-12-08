---
title: "Upgrading themes for Tyk Enterprise Portal"
date: 2022-02-07
tags: ["Tyk Developer Portal","Enterprise Portal",]
description: ""
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 1

---

## Overview
The Tyk Enterprise Developer Portal doesn't automatically update the default theme with every new release of the product because in that case the automatic update may lead to a loss of the customers-made customizations.
Therefore, customers need to upgrade their themes manually to get the recent updates and fixes. Follow these steps to upgrade a theme for the portal:
1. Download a new default theme.
2. Change its name.
3. Upload it to the portal.
4. *(Optionally)* Apply existing customization to the new theme.

## Download a new default theme
- Download the new **default** theme for your portal version from the portal-themes repo in [GitHub](https://github.com/TykTechnologies/portal-themes). For example, v1.8.1 theme can be downloaded directly from [here](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip "https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip").
- Change the name of the theme to preview the new default theme without overwriting any existing one. You can use any that is other than `default` or any name of your existing theme. An already customized v1.8.1 theme `default-customized.zip` that has a name `default_v1_8_1` can be downloaded directly from [here](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default-customized.zip "https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default-customized.zip").
- To change the theme's name by yourself, follow the [instructions]({{< ref "/product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades#change-the-name-of-the-theme" >}}) below on this page. You can skip it if you are going to use the `default-customized.zip` file from the previous step.

## Change the name of the theme 
- Unzip the theme file with a graphical file manager or by running a command like this:
 ```shell
unzip -d default default.zip
```
- The above command will create a directory named `default` that contains the theme files including the `theme.json` file.
- Navigate to the `default` directory and edit the `theme.json` file which defines the name and author of the theme as well as which templates are available in the theme. More information about the theme structure can be found in the [theme customization documentation]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts" >}}),
- The `theme.json` file looks the following json file:
    ```json
    {
    "name": "default",
    "version": "1.8.1",
    "author": "Tyk Technologies Ltd. <hello@tyk.io>",
    "templates": [
        {
            "name": "Flip Flop",
            "template": "flip_flop",
            "layout": "portal_layout"
        },
        {
            "name": "Home",
            "template": "home",
            "layout": "portal_layout"
        },
        {
            "name": "Catalogue",
            "template": "catalogue",
            "layout": "portal_layout"
        }
     ]  
    }
    ```
- To change the name of the theme, edit the `name` field to anything other than `default` and save your changes.
- Run the following commands to create a new theme archive that will contain your changes inside the **default** directory:
```shell
rm default.zip $ zip -r9 default.zip *
```
- The above command will create a **default.zip** file inside the **default** directory with your changes incorporated.

## Upload the theme to the portal
To upload the new theme to the portal, use the `default.zip` theme that is created in the [previous step]({{< ref "/product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades#change-the-name-of-the-theme" >}}) to the portal via the portal's [Admin dashboard]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-1-create-a-new-theme" >}}) or the [admin API]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}), and [activate]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-3-activate-a-theme" >}}) it.

![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/f0e547b2-b521-4c3e-97ce-fd3a2a3b170b)

{{<note sucess>}}
**Applying existing customizations**

If you have made customizations to your existing theme and want to bring those changes to the new theme, please follow the instructions in the [copy customizations from existing theme to the new theme]({{< ref "/product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades#copy-customizations-from-existing-theme-to-the-new-theme" >}}) section below.
{{</note>}}

## Copy customizations from existing theme to the new theme
If you want to transfer customization of your existing theme to the new theme, follow these steps: 
- Compare the changes between your old theme and the new theme (latest is v1.8.1) and copy your customizations to the new theme directory accordingly.
- Then follow the previous steps to:
  - [Change the name]({{< ref "/product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades#change-the-name-of-the-theme" >}}) of the theme.
  - [Upload it to the portal]({{< ref "/product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades#upload-the-theme-to-the-portal" >}}) and then activate it.
