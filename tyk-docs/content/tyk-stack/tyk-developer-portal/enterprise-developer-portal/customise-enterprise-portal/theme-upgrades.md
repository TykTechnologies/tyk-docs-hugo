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

## Set the new default theme
-   Download the new **default** theme for your portal version from the portal-themes repo in [GitHub](https://github.com/TykTechnologies/portal-themes)\ 
    For example, v1.8.1 theme can be downloaded directly from [here](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip "https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip").
-   You'd need to customize the theme with a custom name (anything other than `default`)
-   An already customized v1.8.1 theme `default-customized.zip` that has a custom name `default_v1_8_1` can be downloaded directly from [here](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default-customized.zip "https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default-customized.zip").
-   To customize theme by yourself, follow the instructions in section bellow on this page. You can skip this step if you are going to use the `default-customized.zip` file from the previous step.
-   If you have made customizations to your existing default theme and want to bring those changes to the new theme, you'd want to follow the instructions in the "Copy customizations from existing theme to the new theme" section bellow.
-   Upload this `default.zip` theme to Portal via Portal Admin Dashboard or API, and activate it.

![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/c9b3715a-62ec-457f-abd3-836ede206f7d)


## Customize Theme Name for Portal
-   Download the **default** theme for your current version from the [portal-themes repo](https://github.com/TykTechnologies/portal-themes)\
    The v1.8.1 theme can be downloaded directly [here](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip "https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip")
-   Unzip the theme file with a graphical file manager or by running a command like this:
    `$ unzip -d default default.zip`
-   Unzipping will create a directory named `default` that contains the theme files including the `theme.json` file
-   Navigate to the `default` directory and edit the `theme.json` file
-   The `theme.json` file should look like this:
    `{ "name": "default", "version": "1.8.1", "author": "Tyk Technologies Ltd. <hello@tyk.io>", "templates": [ { "name": "Flip Flop", "template": "flip_flop", "layout": "portal_layout" }, { "name": "Home", "template": "home", "layout": "portal_layout" }, { "name": "Catalogue", "template": "catalogue", "layout": "portal_layout" } ] }`
-   Edit the `name` field to anything other than `default` and save your changes
-   Archive the **default** directory back as **default.zip** file by running these commands in the default directory:
    `$ rm default.zip $ zip -r9 default.zip *`
-   This will create a **default.zip** file inside the **default** directory.
-   This `default.zip` now contains your changes.
-   Upload this `default.zip` theme to Portal via Portal Admin Dashboard or API, and activate it.

![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/f0e547b2-b521-4c3e-97ce-fd3a2a3b170b)

## Copy customizations from existing theme to the new theme
-   Download the new **default** theme for the current version of Portal from the [portal-themes repo](https://github.com/TykTechnologies/portal-themes)
-   Unzip the theme file with a graphical file manager or by running a command like this:
    `$ unzip -d default default.zip`
-   Unzipping will create a directory named `default` that contains the theme files
-   Compare the changes between your old theme and the new theme (latest is v1.8.1) and copy your customizations to the new theme directory accordingly
-   Customize name of the theme if needed. If your customized theme has the same name and version as an existing theme, then uploading your customized theme won't replace the existing theme.
-   After making changes, archive the **default** directory back as `default.zip` file by running these commands in the default directory:
    `$ rm default.zip $ zip -r9 default.zip *`
-   This will create a `default.zip` file inside the **default** directory.
-   This `default.zip` now contains your changes.
-   Upload this `default.zip` theme to Portal via Portal Admin Dashboard or API, and activate it.

![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/9076d92d-1b83-4164-bfd8-2642df6c5610)
