---
date: 2017-03-24T17:21:39Z
title: Customise Page Templates
linktitle: Page Templates
menu:
  main:
    parent: "Customise"
weight: 2 
---

The Tyk Developer Portal can be fully customised using templates. The templates for the Portal are only available to On-Premises users currently. These templates are located in the `/opt/tyk-dashboard/portal` folder of your Tyk installation.

All templates are based on Twitter Bootstrap and are standard HTML with some Golang Template snippets to handle dynamic content rendering.

### Adding new templates

The Tyk content editor enables you to specify a template name to use when rendering templates. two are provided by default:

*   Default Home Page Template
*   Default Page Template

The third option is "Custom" and this allows you to enter a template name into the field editor that will set the template name to use on render.

To set a new template name up in your Tyk installation, you will need to add the file to the `portal` folder and ensure it starts and ends with the templates directive:

```
{{ define "customPage" }}
<!--- HTML IN HERE --/>
{{ end }}
```

In the above snippet, we've created the `customPage` template, this can then be used as the template name in the CMS form when generating for the page type.

### Content fields

You'll notice that in existing templates, certain fields are mapped out as content:

```
{{.Page.Fields.PanelThreeContent | markDown }}
```

When you generate your own templates, you can use your own field names so that you can manage the content from inside the CMS:

![Custom templates section][1]

In the above example, you would be able to read the `MyContent` field by requesting it from the page data in the template like so:

```
{{.Page.Fields.MyContent| markDown }}
```

You do not need to pipe the content through the Markdown filter, but it is advised as it gives you a lot more freedom with regards to how to style content blocks.

In existing page types, these content fields are already set out.

[1]: /docs/img/dashboard/portal-management/page_settings_2.5.png