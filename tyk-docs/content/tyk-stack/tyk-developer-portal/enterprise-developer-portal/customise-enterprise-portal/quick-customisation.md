---
title: "Quick Customization"
date: 2022-02-08
tags: [""]
description: ""
menu:
  main:
    parent: "Customize the Enterprise Portal"
weight: 1
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section we will explain how to apply your branding (styling - CSS) on the portal elements with your own colors and logo within minutes.

## Prerequisites

- A Tyk Self-Managed [installation]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}})
- A login for the portal admin app
- Access to your Tyk portal file system

## Step by step instructions

### Part 1 - Changing the portal logo

1. Access the file directory for the Developer portal
2. The default logo is located in `/themes/default/assets/images/` and is called `dev-portal-logo.svg`.
3. Replace the default image with your own, keeping the same file name and in `.svg` format, ensuring that `xmlns="http://www.w3.org/2000/svg"` is included within your `<svg>` tag.

{{< note success >}}
**Note**

If you want to use different naming, path reference or extension, the code is `<img src="/assets/images/dev-portal-logo.svg">` and is found on line 6 from the `/themes/default/partials/footer.tmpl` template.
{{< /note >}}

### Part 2 - Changing brand colors

Let’s now explain how to manage borders and change the colors of buttons, texts and backgrounds. The file we’ll be looking at is `/themes/default/assets/stylesheets/main.css` which contains some CSS variables that are used throughout the app. Let’s take a closer look.
You can apply some changes in the portal based on your preferences. For example, you can change the navigation background color, the text color and the different button theme colors. Furthermore, you can change table border color and radius.

If you want to change the navigation background color you need to edit the variable called `--tdp-nav-bg-color` Similarly other variables as you can see where/how each one is used:

{{< note success >}}
**Note**

`tdp` stands for Tyk Developer Portal

{{< /note >}}

#### Background colors

{{< img src="/img/dashboard/portal-management/enterprise-portal/background-colors.png" alt="Background Colour settings Tyk Enterprise Portal" >}}

- `--tdp-nav-bg-color` navigation background color
- `--tdp-body-bg-color` App background color

#### Text colors

{{< img src="/img/dashboard/portal-management/enterprise-portal/text-colors.png" alt="Text Colour settings Tyk Enterprise Portal" >}}

- `--tdp-text-color` default text color
- `--tdp-link-color` links (anchor tags)
- `--tdp-nav-link-color` navigation links

#### Borders

{{< img src="/img/dashboard/portal-management/enterprise-portal/borders.png" alt="Border Colour settings Tyk Enterprise Portal" >}}

- `--tdp-card-border-radius` Card component
- `--tdp-border-color-on-error` input color if there’s an error
- `--tdp-table-border-color` table
- `--tdp-border-radius` radius
- `--tdp-primary-border form` elements (such as `<input>` and `<select>`) if active
- `--tdp-form-element-border` form elements (such as `<input>` and `<select>`)

#### Buttons

Buttons have four different concepts and each one of them has two or more variables:

{{< img src="/img/dashboard/portal-management/enterprise-portal/buttons.png" alt="Button Colour settings Tyk Enterprise Portal" >}}

**Primary**

- `--tdp-primary-btn-color` background color
- `--tdp-primary-btn-border` border color

**Secondary**

- `--tdp-secondary-btn-color` background color
- `--tdp-secondary-btn-border` border color

**Danger**

- `--tdp-danger-btn-color` background color
- `--tdp-danger-btn-border` border color
- `--tdp-danger-outline-btn-border` border color of the outline variation

**Warning**

- `--tdp-warning-btn-color` background color
- `--tdp-warning-btn-border` border color
- `--tdp-warning-outline-btn-border`  border color of the outline variation
