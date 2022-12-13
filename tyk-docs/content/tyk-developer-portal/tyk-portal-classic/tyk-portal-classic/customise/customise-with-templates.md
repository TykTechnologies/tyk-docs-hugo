---
date: 2017-03-24T17:21:39Z
title: Customise Page Templates
linktitle: Page Templates
menu:
  main:
    parent: "Customise"
weight: 2 
url: /tyk-developer-portal/tyk-portal-classic/tyk-portal-classic/customise/customise-with-templates/
aliases:
  - /tyk-developer-portal/customise/customise-with-temp...
  - /tyk-stack/tyk-developer-portal/customise/customise-with-templates/
  - /tyk-developer-portal/customise/customise-with-templates/
---

The Tyk Developer Portal can be fully customised using templates. The templates for the Portal are only available to On-Premises users currently. These templates are located in the `/opt/tyk-dashboard/portal` folder of your Tyk installation.

All templates are based on Twitter Bootstrap and are standard HTML with some Golang Template snippets to handle dynamic content rendering.

{{< note success >}}
**Note**  

The Portal process (`tyk-analytics`) must be restarted for template changes to take effect. This is because the application caches templates on startup.
{{< /note >}}


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

### Dynamic Customisation

Portal templates now have access to the Developer object, its subscriptions and issued keys meta-data, providing the ability to conditionally show or hide content inside the Portal, based on the attributes described below.

The current logged in Developer can be accessed using `.UserData` variable with the following fields:

*   Id - Internal developer ID
*   Email - Developer email
*   OrgID - Tyk Organisation ID
*   Subscriptions  - Map containing subscriptions where key is a policy ID and value is an API key
*   Fields - Map containing custom developer fields
*   OauthClients - Map containing list of registered oAuth clients, where Key is the policy ID.

The current logged in Developer detailed subscription object can be accessed using the `.APIS` variable, containing map, where the key is PolicyID and value of the following format:
 
*   APIDescription - API definition
      * ID - Internal API id
      * Name - API name
      * More fields: https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L320
*   APIKey - API key
*   PolicyData - Policy object
      * ID - Internal Policy ID
      * Name - Policy Name
      * More fields: https://github.com/TykTechnologies/tyk/blob/master/user/policy.go#L5
*   KeyMetaData - Key metadata of map type

## Example
You have different teams of developers, and for each team we want to show them a different list of APIs. In this case, for each developer, we need to set a custom  `team` field, and assert it in a template like this:

```
{{if .UserData.Fields.Team == `internal`}}
… Display internal APIs …
{{end}}
{{if .UserData.Fields.Team == `public`}}
… Display public set of APIs …
{{end}}
```

### Add Files for Downloading

If you want to have files available for download from your portal you can add them to your `/tyk-dashboard/portal/portal-assets` directory. 

You can then refer to them by using a `/opt/tyk-dashboard/...` link.

[1]: /img/dashboard/portal-management/page_settings_2.5.png
