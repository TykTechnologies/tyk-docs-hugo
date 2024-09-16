---
title: "Overview"
date: 2024-08-28
tags: [ "Tyk Developer Portal","Enterprise Portal","Templates","Customization","Template Data" ]
description: "Explains an overview of templates in the portal"
---

Templates are a fundamental component of the Tyk Enterprise Developer Portal, enabling dynamic content generation and customization. The portal uses Golang templates to render the live portal views, allowing you to generate dynamic HTML by embedding directives inside HTML that are replaced with values when the template is executed.

Golang templates use the following syntax:
- `{{.}}` to output a value
- `{{.FieldName}}` to access a field of an object
- `{{.MethodName}}` to call a method on an object 
- `{{if }} {{else}} {{end}}` for conditionals
- `{{range .}} {{.}} {{end}}` to iterate over a slice
- Functions can be called like `{{FuncName .}}`

These templates are part of the default theme that ships with the portal, which can be fully customized by modifying the template files. The templates have access to [template data]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/data" >}}) which contains dynamic values that can be rendered into the HTML. There are also a number of [global helper functions]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/functions" >}}) available to transform data before output.

The Tyk Enterprise Developer Portal uses several types of templates to render different parts of the portal. Public Pages Templates render the portal's publicly accessible pages (such as Home, About Us, and Blog pages), forming the foundation of your portal's public-facing content. These can be [customized]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation" >}}) through the Pages section of the admin dashboard. Private Pages Templates are responsible for rendering the portal's authenticated user pages, like Profile settings and My Apps. Both Public and Private Pages Templates have access to global helper functions (funcmaps) and template-specific data. Additionally, [Email templates]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/email" >}}) define the structure and content of emails sent by the portal, such as signup confirmations or access request approvals. While Email templates can include template data, they do not have access to the global helper functions.

Understanding and utilizing these templates effectively is key to customizing and optimizing your Tyk Enterprise Developer Portal experience.