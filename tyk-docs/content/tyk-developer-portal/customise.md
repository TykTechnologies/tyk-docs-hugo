---
date: 2017-03-24T17:17:21Z
title: Portal Customization Overview
linktitle: Customize
menu:
  main:
    parent: "Tyk Portal Classic"
weight: 12
aliases:
  - /tyk-developer-portal/tyk-portal-classic/customise
robots: "noindex"
algolia:
  importance: 0
---

### Customize look and feel

There are two primary ways to customize the developer portal. The first is to use the built-in CSS editor to inject new CSS into the existing portal templates. This is primarily useful for Cloud and Multi-Cloud users.

The second method is to edit the Portal templates directly. The Tyk Dashboard ships with all the templates that make up the portal, these templates are based on Twitter Bootstrap and can be easily changed to suit your branding.

All templates in Tyk Portal use the Golang Templating engine and have the capability to display Markdown.

### Customize content

The Tyk Portal comes with a basic CMS which can push content into Tyk Templates as markdown. That means a certain amount of customization around content can be done from within a live installation without needing to modify CSS or templates.

The CMS and Menu Editor allows you to generate pages and menu structures that can be displayed in your Portal so that you can embellish the portal with additional content around your company, brand and bio.

