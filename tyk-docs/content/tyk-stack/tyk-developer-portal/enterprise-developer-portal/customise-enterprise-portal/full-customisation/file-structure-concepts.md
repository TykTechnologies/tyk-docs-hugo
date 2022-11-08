---
title: "File Structure and Concepts"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Developer Workflow"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Developer portal themes

The Developer Portal uses themes for customising the live portal.
We provide a perfect theme that is using our own branding. It’s called the ‘default’ theme. You are welcome to use it and modify it for your needs. If you want to start with a blank page, you can also create a completely new theme.

The following page explains how they are structured and their main concepts. We recommend you to read this if you are creating your own theme, or making extensive changes to the ones we provide.

## Theming


Generally speaking, a theme defines an application’s styling, templates and scripts.
In the Tyk Developer Portal a “themes” folder is located in the root of the application and is the directory where each theme folder must be added. If you navigate to `path /themes/` you’ll see our default theme which has the following structure:

{{< img src="/img/dashboard/portal-management/enterprise-portal/theme-file-structure.png" alt="Default Tyk Enterprise Portal theme structure" >}}

- Manifest file (`theme.json`): It uses JSON syntax to define theme metadata (name, version and author) as well as a list of templates that are part of the theme.
- `assets`: It intended for static assets like CSS, JS or images that are used by the theme. All contents from this directory are mounted under the `/assets` path in the portal HTTP server.
- `layouts`: The layout is the top level view of your theme.
- `views`: The view is rendered as a part of a layout. Each view can be rendered using a different layout.
- `partials`: Partials provide an easier way to handle snippets of code that are reused across different views or layouts, for example if you want to inject a JS snippet that’s used in different places, you could set this code in a partial and include it anywhere by using the appropriate 'Go template directive'. In this way you could improve code readability and organise the theme in the most efficient way.

### Manifest file

This file should sit in the root of a theme and hold the theme configuration. You can define a name and your templates along other options such as the version and the author.

You can find an example of the manifest within the “default” theme that is located in `/themes/default`. The syntax looks as follows:

```json
{
  "name": "default",
  "version": "0.0.1",
  "author": "Tyk Technologies Ltd. <hello@tyk.io>",
  "templates": [
      {
        "name": "Content Page",
        "template": "page",
        "layout": "site_layout"
      },
      {
        "name": "Portal Home",
        "template": "portal_home",
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

The `templates` field establishes a list of available templates. Every template consists of three fields where `name` is a user-friendly name that will be seen on the Admin app when creating a page. `template` is a reference to the template file itself. `layout` is a reference to the layout that will be used to render the previously set template.

To illustrate the current template hierarchy, this is what a typically rendered page would look like. The `layout` would be the top level template and base structure of the page:
{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-template-layout.png" alt="Template structure" >}}


Also note that the Developer Portal will let you use not just multiple `layouts` and `views` but also any combination of them. These combinations are set in your manifest file (`theme.json`).

Regarding `partials`, even though the illustration above shows two partials embedded on the `view` section, `partials` are intended for using in any place. You should be able to embed a `partial` directly into a layout, or even in multiple layouts.

Content blocks are explored more deeply in the next sections. To summarise, its relationship with the above hierarchy is when rendering a particular page, a `layout`, a `view` and potentially a combination of partials get loaded from the theme directory. Content blocks are different because their content gets dynamically populated by database content. These contents are created from the Admin section.

To be Concluded:

- A layout is the wrapper of everything you want to include inside it. So, typically it would consist of tags such as `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, and `<body>`.
- A `template` is what we would inject in a layout and specifically within the `<body>` of a layout.
- A `partial` can be, for example, the navigation menu so that you can inject it in the layout and it will be visible every time this layout is used

### Go templates

All theme template files use the Go template syntax. You will find every file in the layouts and views. Partials directory uses the `.tmpl` file extension, which is the default Go template extension. Go templates work in a similar way to ERB or EJS templates by letting the user mix HTML code with dynamic values. Sample syntax is as follows:

`{{ render “top_nav” }}`

The code sample above would execute the `render` template helper, which is a common function that’s used to inject code from other `views` into the current one. You may use this to embed content from other parts of the theme, typically `partials` or `views`. In this case, it will insert a `view` or `partial` named `top_nav` to the template where it’s used.

The same delimiters `{{` and `}}` are used for all Go template directives. We’ll explore some of them in the upcoming sections.

See the [Go package template documentation](https://pkg.go.dev/text/template#pkg-overview) for more information.

### Content blocks

The Developer Portal themes use content blocks to facilitate content management. A content block is defined as a part of a `view` by using a particular template directive in combination with a name or ID to identify the given block. For example, if you check the `home` template in the default theme (`themes/default/views/home.tmpl`), you will find the following code:

```go
div class="container">
  <div class="row">
    <div class="col-sm-6">
      <div class="text-container">
        <h1>{{.page.Title}}</h1>
        <p>{{.blocks.HeaderDescription.Content}}</p>
        <a href="{{.blocks.HeaderButtonLink.Content}}" class="btn btn-primary">{{.blocks.HeaderButtonLabel.Content}}</a>
    </div>
….
```

There are four code references in the above snippet. In this example we have a header, some text and then a button that act as a link. Let's see what each one is and how it correlates with the UI.

1. `{{ .page.Title }}`. This is the `Title` input in the form UI (Screenshot #1)
1. `{{ .blocks.HeaderDescription.Content }}`. This is the `HeaderDescription` input in the form UI (Screenshot #2)
2. `{{ .blocks.HeaderButtonLink.Content }}`. This is the `HeaderDescription` input in the form UI (Screenshot #3)
3. `{{ .blocks.HeaderButtonLabel.Content }}`. This is the `HeaderButtonLabel` input in the form UI (Screenshot #4)

{{< img src="/img/dashboard/portal-management/enterprise-portal/go-template-ui.png" alt="Go template blocks and portal UI" >}}

This will display in your portal as following:

{{< img src="/img/dashboard/portal-management/enterprise-portal/example-portal-content-block.png" alt="Example Portal content block" >}}

In order for a page to render properly the content manager will need to be aware of the content blocks that are required by a particular template.

## Theme management workflow
The Tyk Enterprise Developer Portal enables the admin users and developers to manage theme such as create, delete, modify, and select which theme is visible in the portal.
To enable this capability, the portal has theme management UI.

### Part 1: Create a new theme
Follow the example below to create a new theme called "TestTheme" using the default theme as a blueprint:

1. As an admin user, navigate to the Theme management UI and download the default theme. The Tyk Enterprise Developer Portal doesn't allow modifications to the default theme so that you will always have access to the vanilla theme.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/download-default-theme.png" alt="Download default theme" >}}
2. Unzip the theme and rename it by modifying the Manifest file as described above.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/rename-a-theme.png" alt="Rename theme" >}}
3. You can also modify other assets in the theme as described later in this guide. Once all modifications are done, you need to zip the theme and upload it to the portal.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/compress-a-theme.png" alt="Zip theme" >}}
4. To upload the theme as an admin user, navigate to **Themes** and click on the **Add new theme** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-new-theme.png" alt="Add new theme" >}}
5. Then click on the **Add theme file** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-theme-file.png" alt="Add theme file" >}}
6. Select the archive that you've created earlier and click on the **Save** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/save-new-theme.png" alt="Save new theme" >}}
7. Now you should see a success message meaning the theme was successfully created.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/new-theme-is-created.png" alt="Theme is created" >}}

###  Part 2: Preview a theme
The Tyk Enterprise Developer Portal enables the admin users to preview the theme before it gets reflected on the public-facing portal. This enables to review the changes that are made to the theme before exposing them to the developer community.
1. To preview a theme as an admin user, navigate to the **Themes** menu. Select a theme, and click on the **Preview** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/preview-theme-button.png" alt="Preview theme" >}}
2. The previewer will open the selected theme in a new tab. Now you can browse your theme and review the changes. For the demonstration purposes, we've modified the API Catalogue page so it displays "Modified catalogue" instead of "Product Catalogues".
   {{< img src="/img/dashboard/portal-management/enterprise-portal/theme-preview.png" alt="Preview theme" >}}
3. Once the review is done, you can quit the preview by clicking on the **Quit preview button**.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/quit-theme-preview.png" alt="Quite theme preview" >}}

###  Part 3: Activate a theme
The Tyk Enterprise Developer Portal enables you to have multiple themes at the same time but only one of them is active.
1. As an admin user, navigate to the **Themes** menu. The current status of each theme is displayed in the **Status** column.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/default-theme-is-current.png" alt="Default theme is the current theme" >}}
2. To activate the new theme, click on the **Activate** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/activate-a-theme.png" alt="Activate theme" >}}
3. The selected theme is now active and displayed to all API consumers on the Live portal.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/modified-theme-is-active.png" alt="Modified theme is activated" >}}

### Part 4: Modify an existing theme (not default)
The Tyk Enterprise Developer Portal enables modification to any existing theme, except the default one.
1. To start modification of any existing theme, navigate to the **Themes** menu and download the theme package.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/download-a-theme.png" alt="Download existing theme" >}}
2. Unzip the package, do any required modification and zip it back. You should keep the name of the theme. If you need to change the name of the theme, you will need to create a new theme as described above.
3. As an admin user, navigate to the **Themes** menu and select the modified theme.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/select-a-modified-theme.png" alt="Select modified theme" >}}
4. Click on the **Add Theme File** button and select the theme archive.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-theme-file-to-existing-theme.png" alt="Add theme file" >}}
5. Click on the **Save changes** button to save changes to the theme.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/save-changes-to-theme.png" alt="Save changes" >}}
6. If the theme is the current changes to the Live portal, it will be applied immediately. Otherwise, you can preview and activate the theme as described above.

