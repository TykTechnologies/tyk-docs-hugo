---
title: "Developer Portal Customization"
date: 2025-02-10
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "Customization", "Webhook", "Email", "Themes", "Templates", "Pages", "Menus", "Branding", "User Model"]
keywords: ["Developer Portal", "Tyk", "Customization", "Webhook", "Email", "Themes", "Templates", "Pages", "Menus", "Branding", "User Model"]
description: "Customization options for enterprise developer portal"
aliases:
  - /product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks
  - /product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/quick-customisation
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/templates
  - /product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/edit-manage-page-content
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/menus-customisation
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/create-new-page-template
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization
  - /product-stack/tyk-enterprise-developer-portal/getting-started/customize-sign-up-form
  - /product-stack/tyk-enterprise-developer-portal/getting-started/customize-products-and-plans
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Portal Customization Overview

The Tyk Enterprise Developer Portal uses themes for customizing the live portal. We provide an out of the box theme that is using our own branding, it’s called the `default` theme. You are welcome to use it and modify it for your needs, yet if you want to start with a blank page, you can also create a completely new theme.

This section provides a complete guide to full customization from the developer's point of view.

## Configure Themes

### What is a Theme?

The Tyk Enterprise Developer Portal uses **themes** for customizing the live portal. We provide an out of the box theme that is using our own branding, it’s called the `default` theme. You are welcome to use it and modify it for your needs, yet if you want to start with a blank page, you can also create a completely new theme.

The following section explains how they are structured and their main concepts. We recommend you to read this if you are creating your own theme, or making extensive changes to the ones we provide.

### File Structure of a Theme

Generally speaking, a theme defines an application’s styling, templates and scripts.
In the Tyk Developer Portal a `themes` folder is located in the root of the application and is the directory where each theme folder must be added. If you navigate to `path /themes/` you’ll see our default theme which has the following structure:

{{< img src="/img/dashboard/portal-management/enterprise-portal/theme-file-structure.png" alt="Default Tyk Enterprise Portal theme structure" >}}

- Manifest file (`theme.json`): It uses JSON syntax to define theme metadata (name, version and author) as well as a list of templates that are part of the theme.
- `assets`: It intended for static assets like CSS, JS or images that are used by the theme. All contents from this directory are mounted under the `/assets` path in the portal HTTP server.
- `layouts`: The layout is the top level view of your theme.
- `views`: The view is rendered as a part of a layout. Each view can be rendered using a different layout.
- `partials`: Partials provide an easier way to handle snippets of code that are reused across different views or layouts, for example if you want to inject a JS snippet that’s used in different places, you could set this code in a partial and include it anywhere by using the appropriate 'Go template directive'. In this way you could improve code readability and organize the theme in the most efficient way.

#### Manifest File

This file should sit in the root of a theme and hold the theme configuration. You can define a name and your templates along other options such as the version and the author.

You can find an example of the manifest within the `default` theme that is located in `/themes/default`. The syntax looks as follows:

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

#### Go Templates

All theme template files use the Go template syntax. You will find every file in the layouts and views. Partials directory uses the `.tmpl` file extension, which is the default Go template extension. Go templates work in a similar way to ERB or EJS templates by letting the user mix HTML code with dynamic values. Sample syntax is as follows:

`{{ render “top_nav” }}`

The code sample above would execute the `render` template helper, which is a common function that’s used to inject code from other `views` into the current one. You may use this to embed content from other parts of the theme, typically `partials` or `views`. In this case, it will insert a `view` or `partial` named `top_nav` to the template where it’s used.

The same delimiters `{{` and `}}` are used for all Go template directives. We’ll explore some of them in the upcoming sections.

See the [Go package template documentation](https://pkg.go.dev/text/template#pkg-overview) for more information.

#### Content Blocks

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

### Managing Themes

The Tyk Enterprise Developer Portal enables the admin users and developers to manage themes and select which theme is visible in the portal.
To enable this capability, the portal has theme management UI.

#### Create a Theme
Follow the example below to create a new theme called "TestTheme" using the default theme as a blueprint:

1. As an admin user, navigate to the Theme management UI and download the default theme. The Tyk Enterprise Developer Portal doesn't allow modifications to the default theme so that you will always have access to the vanilla theme.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/download-default-theme.png" alt="Download default theme" >}}
2. Unzip the theme and rename it by modifying the Manifest file as described above.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/rename-a-theme.png" alt="Rename theme" >}}
3. You can also modify other assets in the theme as described later in this guide. Once all modifications are done, you need to zip the theme and upload it to the portal.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/compress-a-theme.png" alt="Zip theme" >}}
4. To upload the theme as an admin user, navigate to **Themes** and click on the **Add new theme** button. Please note that the size of individual files should not exceed 5 MB and the total size of all files in the theme should not exceed `PORTAL_MAX_UPLOAD_SIZE`. This parameter is [configurable]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_max_upload_size" >}}).
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-new-theme.png" alt="Add new theme" >}}
5. Then click on the **Add theme file** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-theme-file.png" alt="Add theme file" >}}
6. Select the archive that you've created earlier and click on the **Save** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/save-new-theme.png" alt="Save new theme" >}}
7. Now you should see a success message meaning the theme was successfully created.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/new-theme-is-created.png" alt="Theme is created" >}}

#### Preview a Theme
The Tyk Enterprise Developer Portal enables the admin users to preview the theme before it gets reflected on the public-facing portal. This enables to review the changes that are made to the theme before exposing them to the developer community.
1. To preview a theme as an admin user, navigate to the **Themes** menu. Select a theme, and click on the **Preview** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/preview-theme-button.png" alt="Preview theme" >}}
2. The previewer will open the selected theme in a new tab. Now you can browse your theme and review the changes. For the demonstration purposes, we've modified the API Catalog page so it displays "Modified catalog" instead of "Product Catalogs".
   {{< img src="/img/dashboard/portal-management/enterprise-portal/theme-preview.png" alt="Preview theme" >}}
3. Once the review is done, you can quit the preview by clicking on the **Quit preview button**.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/quit-theme-preview.png" alt="Quite theme preview" >}}

#### Activate a Theme
The Tyk Enterprise Developer Portal enables you to have multiple themes at the same time but only one of them is active.
1. As an admin user, navigate to the **Themes** menu. The current status of each theme is displayed in the **Status** column.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/default-theme-is-current.png" alt="Default theme is the current theme" >}}
2. To activate the new theme, click on the **Activate** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/activate-a-theme.png" alt="Activate theme" >}}
3. The selected theme is now active and displayed to all API consumers on the Live portal.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/modified-theme-is-active.png" alt="Modified theme is activated" >}}

#### Modify an Existing Theme
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

### Upgrading Themes

The Tyk Enterprise Developer Portal does not automatically update the default theme with each new release of the product, because doing so could result in the loss of customizations made by customers.
Therefore, customers are required to manually upgrade their themes to access the latest updates and fixes. We recommend using GitFlow for the latest theme updates.

Alternatively, you can download the theme package from the **Releases** section of the [portal-default-theme](https://github.com/TykTechnologies/portal-default-theme) repository.
However, we advise against this method, as it requires you to merge your customized theme with the downloaded one, which is much simpler to accomplish via GitFlow.
Follow the guide below to obtain the latest version of the portal theme and merge it with your customized version.

#### Merge Latest Changes using Gitflow

The default theme for the Tyk Enterprise Developer Portal is located in the [portal-default-theme](https://github.com/TykTechnologies/portal-default-theme) repository.
The `main` branch contains code corresponding to the latest stable release. If you wish to check out a specific release (e.g., v1.8.3), you can use tags:

```console
git checkout tags/1.8.3 -b my-custom-theme branch
```

To organize local development in a way that facilitates seamless theme updates using git merge, follow the steps below:
1. Fork the `portal-default-theme` repo in [github](https://github.com/TykTechnologies/portal-default-theme).
   {{< img src="/img/dashboard/portal-management/enterprise-portal/fork-portal-theme-repo.png" alt="Fork the portal-theme repo" >}}

2. Clone the forked repository:
```console
git clone https://github.com/my-github-profile/portal-default-theme && cd ./portal-default-theme
```

3. If you have an existing repository, check if you already have the `portal-default-theme` repo among your remotes before adding it. Execute the following command to check:
```console
git remote -v | grep 'TykTechnologies/portal-default-theme'
```

Skip the next step if you see the following:
```console
# portal-default-theme  https://github.com/TykTechnologies/portal-default-theme (fetch)
# portal-default-theme  https://github.com/TykTechnologies/portal-default-theme (push)
```

If the output of the above command is empty, proceed to step 5 to add the `portal-default-theme`.

4. Add the `portal-default-theme` to the remotes by executing the following command:
```console
git remote add portal-default-theme https://github.com/TykTechnologies/portal-default-theme
```

5. Create a new local branch that tracks the remote `main` branch. That branch will mirror the latest changes from the `portal-default-theme` main. You will be using it to import the latest changes from the `portal-default-theme` to your custom theme:
```console
git fetch portal-default-theme main:portal-default-theme-main
```

If you have an existing local branch that tracks the `main` branch in the `portal-default-theme` repo, you can just pull the latest updates:
```console
git checkout portal-default-theme-main
git pull portal-default-theme main
```

6. To start customizing the theme, create a local develop branch from the `portal-default-theme-main`:
```console
git checkout portal-default-theme-main
git checkout -b dev-branch
```

7. Once the required customizations are completed, commit the changes to the `dev-branch`.

8. Merge the latest updates from the `portal-default-theme` into the `dev-branch`. Please remember to always pull the latest changes from the `portal-default-theme-main` branch before merging:
  - Checkout to the portal-default-theme-main and fetch the latest changes.
    ```console
    git checkout portal-default-theme-main
    git pull portal-default-theme main
    ```
  - Checkout the dev-branch and merge the changes from the portal-default-theme-main to retrieve the latest changes from the portal-default-theme repo with the customized theme.
    ```console
    git checkout dev-branch
    git merge portal-default-theme-main
    ```

Finally, address merge conflicts and commit changes.

{{< note success >}}
**You have successfully updated your custom theme**

Now you can repeat the above described process when upgrading the portal version to make sure you have incorporated the latest theme changes to your customized theme.

{{< /note >}}

#### Upload the Theme to the Portal
Once you have merged your local changes with the latest changes from the `portal-default-theme` repo, you need to create a zip archive with the customized theme and upload it to the portal.
1. Create a zip archive with the customized theme. Make sure you zip the content of the `src` folder and not the folder itself. To create a zip archive with the customized theme execute the following:
   - cd to the `src` directory to make sure you:
    ```console
    cd ./src
    ```
    - zip the content of the `src` directory:
    ```console
    zip -r9 default.zip 
    ```

2. Upload the theme package that is created in the previous step to the portal. You can use the portal's [Admin dashboard]({{< ref "portal/customization#create-a-theme" >}}) or the [admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) to do it.
![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/f0e547b2-b521-4c3e-97ce-fd3a2a3b170b)
3. Finally, you need to [activate]({{< ref "portal/customization#activate-a-theme" >}}) the theme so that it will be applied to the portal.

## Configure Templates

Templates are a fundamental component of the Tyk Enterprise Developer Portal, enabling dynamic content generation and
customization. The portal uses Golang templates to render the live portal views, allowing you to generate dynamic HTML
by embedding directives inside HTML that are replaced with values when the template is executed.

Golang's templates use the following syntax:
- `{{ . }}` to output a value
- `{{ .FieldName }}` to access a field of an object
- `{{ .MethodName }}` to call a method on an object 
- `{{ if }} {{ else }} {{ end }}` for conditionals
- `{{ range . }} {{ . }} {{ end }}` to iterate over a slice
- Functions can be called like `{{ FuncName . }}` or just `{{ FuncName }}`

These templates are part of the default theme that ships with the portal, which can be fully customized by modifying the
template files. The templates have access to template data which contains dynamic values that can be rendered into the
HTML. There are also a number of global helper functions available to transform data before output.

The Tyk Enterprise Developer Portal uses several types of templates to render different parts of the portal:
- Public Pages Templates: Render the portal's publicly accessible pages (such as Home, About Us, and Blog pages),
forming the foundation of your portal's public-facing content. These can be customized through the Pages
[section]({{< ref "portal/customization#edit-page-content" >}})
of the admin dashboard.
- Private Pages Templates: Responsible for rendering the portal's authenticated user pages, like Profile settings and
My Apps.
- Email Templates: Define the structure and content of emails sent by the portal, such as signup confirmations or access
request approvals.

Both Public and Private Pages Templates have access to global helper functions (funcmaps) and template-specific data.
Email templates can include template data and specific template functions, but do not have access to the global helper
functions.

The following sections provide comprehensive information on the various components of the Tyk Enterprise Developer
Portal templates:

- [Template Data](#template-data): Detailed explanation of the data structures available in different templates.
- [Global Helper Functions](#global-helper-functions): A list of global functions that can be used across templates to
manipulate and display data.
- [Email Templates](#email-templates): Information about email-specific templates and their available data.

### Template Data

This section outlines the Tyk Enterprise Developer Portal templates that have access to specific template data. 
It's important to note that data availability varies between templates, depending on their context and purpose.
For instance, a product detail template has access to product-specific data that may not be available in a blog listing
template.

#### Templates with specific template data

- [Analytics](#analytics)
- [Application Create](#application-create)
- [Application Detail](#application-detail)
- [Blogs](#blogs)
- [Blog Detail](#blog-detail)
- [Cart Checkout](#cart-checkout)
- [Organization User Detail](#organization-user-detail)
- [Organization User Edit](#organization-user-edit)
- [Organization Users List](#organization-users-list)
- [Product Detail](#product-detail)
- [Product OAS Documentation](#product-oas-documentation)

#### Analytics

**Template Path**: `themes/default/views/analytics.tmpl`

This template is used to render the analytics page.

##### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .apps }}`: List of available applications

##### Application Attributes

Accessible via `{{ range .apps }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Application ID |
| `{{ .Name }}` | Application name |
| `{{ .Description }}` | Application description |
| `{{ .RedirectURLs }}` | Application redirect URLs |

###### Example Usage
```html
<select id="analytics-overview-select-apps" class="analytics-select-overview">
  <option value="0" selected>All apps</option>
  {{ range $app := .apps }}
    <option value="{{ $app.ID }}">
      {{ $app.Name }}
    </option>
  {{ end }}
</select>
```

#### Application Create

**Template Path**: `themes/default/views/app_form_create.tmpl`

This template is used to render the application creation form.

##### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)

###### Example Usage
```html
{{ if .errors }}
{{ range $key, $errs := .errors }}
<div class="alert alert-warning cart-error" role="alert">
  <i class="tyk-icon tykon tykon-warning"></i>
  <div class="alert__content">
    <strong>{{ $key }}</strong>
    <ul>
      {{ range $errs }}
      <li>{{ . }}</li>
      {{ end }}
    </ul>
  </div>
</div>
{{ end }}
{{ end }}
```

#### Application Detail

**Template Path**: `themes/default/views/app_form_update.tmpl`

This template is used to render the application detail and update form.

##### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .app }}`: Selected application object.
- `{{ .appCerts }}`: Map of application MTLS certificates if applicable (Key: access request ID, Value: certificate)
- `{{ .allCerts }}`: Map of all MTLS certificates stored if applicable (Key: cert fingerprint, Value: cert)

##### MTLS Certificate Attributes (appCerts)

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Certificate ID |
| `{{ .Name }}` | Certificate name |
| `{{ .Fingerprint }}` | Certificate fingerprint |
| `{{ .SignatureAlgorithm }}` | Signature algorithm |
| `{{ .Issuer }}` | Certificate issuer |
| `{{ .IsValid }}` | Boolean indicating if the certificate is valid |
| `{{ .ValidNotBefore }}` | Start date of validity |
| `{{ .ValidNotAfter }}` | End date of validity |
| `{{ .Subject }}` | Certificate subject |

##### MTLS Certificate Attributes (allCerts)

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Certificate ID |
| `{{ .Name }}` | Certificate name |

##### Client Attributes

Accessible via `{{ .app }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Client ID |
| `{{ .Name }}` | Client name |
| `{{ .Description }}` | Client description |
| `{{ .RedirectURLs }}` | Client redirect URLs |
| `{{ .Credentials }}` | Array of client credentials |
| `{{ .AccessRequests }}` | Array of client access requests |

##### Client Credentials Attributes

Accessible via `{{ range $cred := .app.Credentials }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Credential ID |
| `{{ .Credential }}` | Credential |
| `{{ .CredentialHash }}` | Credential hash |
| `{{ .OAuthClientID }}` | OAuth client ID |
| `{{ .OAuthClientSecret }}` | OAuth client secret |
| `{{ .Expires }}` | Credential expiration |
| `{{ .AccessRequestID }}` | Access request ID associated with the credential |

##### Client Access Requests Attributes

Accessible via `{{ range $acreq := .app.AccessRequests }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Access request ID |
| `{{ .Status }}` | Access request status |
| `{{ .UserID }}` | User ID associated with access request |
| `{{ .AuthType }}` | Access request auth type |
| `{{ .DCREnabled }}` | true if access request DCR enabled |
| `{{ .ProvisionImmediately }}` | true if provisioned immediately is enabled |
| `{{ .CatalogueID }}` | Catalogue ID |

##### Product Attributes (within Access Request)

Accessible via `{{ $product := $acreq.Product }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Product ID |
| `{{ .Name }}` | Product name |
| `{{ .DisplayName }}` | Product display name |
| `{{ .Path }}` | Product path |
| `{{ .Description }}` | Product description |
| `{{ .Content }}` | Product content |
| `{{ .AuthType }}` | Product auth type |
| `{{ .DCREnabled }}` | true if product DCR enabled |

##### Plan Attributes (within Access Request)

Accessible via `{{ $acreq.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Plan name |
| `{{ .DisplayName }}` | Plan display name |
| `{{ .Description }}` | Plan description |
| `{{ .AuthType }}` | Plan auth type |
| `{{ .Rate }}` | Plan rate |
| `{{ .Per }}` | Plan period |
| `{{ .QuotaMax }}` | Plan quota maximum |
| `{{ .QuotaRenewalRate }}` | Plan quota renewal rate |
| `{{ .AutoApproveAccessRequests }}` | true if auto-approve access requests is enabled |

###### Example Usage
```html
<h1>{{ .app.Name >}}</h1>
<p>{{ .app.Description }}</p>
<h2>Credentials</h2>
{{ range $cred := .app.Credentials }}
<div>
  <p>ID: {{ $cred.ID }}</p>
  <p>OAuth Client ID: {{ $cred.OAuthClientID }}</p>
  <p>Expires: {{ $cred.Expires }}</p>
</div>
{{ end }}
<h2>Access Requests</h2>
{{ range $acreq := .app.AccessRequests }}
<div>
  <p>ID: {{ $acreq.ID }}</p>
  <p>Status: {{ $acreq.Status }}</p>
  <p>Product: {{ $acreq.Product.Name }}</p>
  <p>Plan: {{ $acreq.Plan.Name }}</p>
</div>
{{ end }}
```

#### Blogs

**Template Path**: `themes/default/views/blog_listing.tmpl`

This template is used to render the blog listing page.

##### Available Objects

- `{{ .posts }}`: List of all published blog posts

##### Blog Attributes

Accessible via `{{ range .posts }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Title }}` | Blog post title |
| `{{ .Lede }}` | Blog post summary |
| `{{ .Content }}` | Blog post content |
| `{{ .MarkdownContent }}` | Markdown content |
| `{{ .MarkdownEnabled }}` | Boolean for Markdown enablement |
| `{{ .Path }}` | Blog post path |
| `{{ .HeaderImage.URL }}` | Header image URL |
| `{{ .BlogSiteID }}` | Blog site ID |
| `{{ .ProductID }}` | Associated product ID |
| `{{ .AuthorID }}` | Author ID |
| `{{ .URL }}` | Full URL of the blog post |

###### Example Usage
```html
<h1>Blog Posts</h1>
{{ range .posts }}
<div class="blog-post">
  <h2><a href="{{ .URL }}">{{ .Title }}</a></h2>
  <img src="{{ .HeaderImage.URL }}" alt="{{ .Title }}">
  <p>{{ .Lede }}</p>
</div>
{{ end }}
```

#### Blog Detail

**Template Path**: `themes/default/views/blog_detail.tmpl`

This template is used to render the blog detail page.

##### Available Objects

- `{{ .post }}`: The selected blog post object. 
- `{{ .latest_posts }}`: List of 3 latest blog posts.

##### Blog Attributes

Accessible via `{{ .post }}` or `{{ range .latest_posts }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Title }}` | Blog post title |
| `{{ .Lede }}` | Blog post summary |
| `{{ .Content }}` | Blog post content |
| `{{ .MarkdownContent }}` | Markdown content |
| `{{ .MarkdownEnabled }}` | Boolean for Markdown enablement |
| `{{ .Path }}` | Blog post path |
| `{{ .HeaderImage.URL }}` | Header image URL |
| `{{ .BlogSiteID }}` | Blog site ID |
| `{{ .ProductID }}` | Associated product ID |
| `{{ .AuthorID }}` | Author ID |
| `{{ .URL }}` | Full URL of the blog post |

###### Example Usage
```
<h1>{{ .post.Title }}</h1>
<img src="{{ .post.HeaderImage.URL }}" alt="{{ .post.Title }}">
<p>{{ .post.Lede }}</p>
{{ if .post.MarkdownEnabled }}
{{ .post.MarkdownContent | markdownify }}
{{ else }}
{{ .post.Content }}
{{ end }}
<p>Read more at: <a href="{{ .post.URL }}">{{ .post.URL }}</a></p>
<h2>Latest Posts</h2>
{{ range .latest_posts }}
<div>
  <h3><a href="{{ .URL }}">{{ .Title }}</a></h3>
  <p>{{ .Lede }}</p>
</div>
{{ end }}
```

#### Cart Checkout 

**Template Path**: `themes/default/views/portal_checkout.tmpl`

This template is used to render the cart checkout page.

##### Available Objects

- `{{ .cart }}`: Map with the cart items for the current user
- `{{ .apps }}`: List of applications for the current user
- `{{ .catalogue_count }}`: Cart catalogues count
- `{{ .certs }}`: List of MTLS certificates if applicable
- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .provisioned }}`: Boolean indicating whether an access request has been provisioned for the cart

##### Application Attributes

Accessible via `{{ range .apps }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Application name |
| `{{ .Description }}` | Application description |
| `{{ .RedirectURLs }}` | Application redirect URLs |

##### MTLS Certificate Attributes

Accessible via `{{ range .certs }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Certificate ID |
| `{{ .Name }}` | Certificate name |

##### Cart Item Attributes

Accessible via `{{ range $key, $value := .cart }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $value.AuthType }}` | Cart item auth type |
| `{{ $value.Catalogue }}` | Cart item catalogue |
| `{{ $value.Products }}` | Cart item array of products |
| `{{ $value.Plan }}` | Cart item plan |
| `{{ $value.DCREnabled }}` | true if cart order consists of DCR products |

##### Plan Attributes (Within cart item)

Accessible via `{{ $plan := $value.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Plan ID |
| `{{ .PlanName }}` | Plan name |
| `{{ .FormatQuota }}` | Formatted quota information |
| `{{ .FormatRateLimit }}` | Formatted rate limit information |

##### Catalogue Attributes (Within cart item)

Accessible via `{{ $catalogue := $value.Catalogue }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Catalogue ID |

##### Product Attributes (Within cart item)

Accessible via `{{ range $product := $value.Products }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Product ID |
| `{{ .Name }}` | Product name |
| `{{ .DisplayName }}` | Product display name |
| `{{ .Path }}` | Product path |
| `{{ .Description }}` | Product description |
| `{{ .Content }}` | Product content |
| `{{ .AuthType }}` | Product auth type |
| `{{ .DCREnabled }}` | true if product DCR enabled |
| `{{ .AuthTypes }}` | List of product auth types |

##### Auth Type Attributes (Within product)

Accessible via `{{ range $auth_type := $product.AuthTypes }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .AuthType }}` | Auth type |

##### DCR Client Template Attributes (Within product)

Accessible via `{{ range $template := $product.Templates }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Template ID |
| `{{ .Name }}` | Template name |
| `{{ .GrantType }}` | Template grant type |
| `{{ .ResponseTypes }}` | Template response types |
| `{{ .TokenEndpointAuthMethod }}` | Template token endpoint auth method |
| `{{ .OktaAppType }}` | Template Okta app type |

<details>
<summary> <b>Example Usage</b></summary>

```html
<h1>Cart Checkout</h1>
{{ range $key, $value := .cart }}
<div class="cart-item">
  <p>Auth Type: {{ $value.AuthType }}</p>
  <p>Plan: {{ $value.Plan.Name }}</p>
  {{ range $product := $value.Products }}
  <div class="product">
    <h3>{{ $product.DisplayName }}</h3>
    <p>{{ $product.Description }}</p>
    <p>Path: {{ $product.Path }}</p>
  </div>
  {{ end }}
</div>
{{ end }}
<h2>Your Applications</h2>
{{ range $app := .apps }}
<div class="application">
  <h3>{{ $app.Name }}</h3>
  <p>{{ $app.Description }}</p>
</div>
{{ end }}
{{ if .certs }}
<h2>MTLS Certificates</h2>
{{ range $cert := .certs }}
<div class="certificate">
  <p>ID: {{ $cert.ID }}</p>
  <p>Name: {{ $cert.Name }}</p>
</div>
{{ end }}
{{ end }}
```
</details>


#### Organization User Detail

**Template Path**: `themes/default/views/user_detail.tmpl`

This template is used to render the organization user detail page.

##### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .user }}`: The organization user object.

##### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |


<details>
<summary> <b>Example Usage</b></summary>

```html
<h1>User Details</h1>
{{ if .errors }}
{{ range $key, $errs := .errors }}
<div class="alert alert-warning cart-error error-wrapper" role="alert">
  <i class="tyk-icon tykon tykon-warning"></i>
  <div class="alert__content">
    <strong>{{ $key }}</strong>
    <ul>
      {{ range $errs }}
      <li>{{ . }}</li>
      {{ end }}
    </ul>
  </div>
</div>
{{ end }}
{{ end }}
<p>Name: {{ .user.DisplayName }}</p>
<p>Email: {{ .user.Email }}</p>
<p>Role: {{ .user.DisplayRole }}</p>
```

</details>

#### Organization User Edit

**Template Path**: `themes/default/views/user_edit.tmpl`

This template is used to render the edit page for organization user.

##### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .roles }}`: List of possible roles
- `{{ .user }}`: The organization user object.

##### Role Attributes

Accessible via `{{ range .roles }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Role ID |
| `{{ .DisplayName }}` | Role display name |

##### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |

<details>
<summary> <b>Example Usage</b></summary>

```html
<form action="edit" method="post" id="user-edit">
  {{ if .error }}
  <div class="alert alert-danger" role="alert">
    {{ .error }}
  </div>
  {{ end }}
  <h2>Developer details</h2>
  <div>
    <label>Name:</label>
    <input type="text" name="first" value="{{ .user.First }}" required />
  </div>
  <div>
    <label>Last name:</label>
    <input type="text" name="last" value="{{ .user.Last }}" required />
  </div>
  <div>
    <label>Email:</label>
    <input type="email" name="email" value="{{ .user.Email }}" required disabled />
  </div>
  {{ if .roles }}
  <div>
    <label>Role:</label>
    <select name="role" required>
      {{ range $role := .roles }}
      <option value="{{ $role.ID }}">{{ $role.DisplayName }}</option>
      {{ end }}
    </select>
  </div>
  {{ end }}
  <div>
    <a href="/portal/private/users">Cancel</a>
    <input type="submit" value="Save Changes" />
  </div>
</form>
```

</details>

#### Organization Users List

**Template Path**: `themes/default/views/user_list.tmpl`

This template is used to render the list of organization users.

##### Available Objects

- `{{ .roles }}`: Map of available roles (Key: role, Value: role display name)

###### Example Usage
```html
<td> {{ index $roles $userInvite.Role }} </td>
{{ end }}
```

#### Product Detail 

**Template Path**: `themes/default/views/portal_product_detail.tmpl`

This template is used to render the product detail page.

##### Available Objects

- `{{ .product }}`: The selected product object
- `{{ .catalogues }}`: List of catalogue objects including the selected product
- `{{ .unique_plans }}`: List of plan objects available for the product
- `{{ .scopes }}`: Product scopes as an array of strings
- `{{ .posts }}`: List of related blog post objects
- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .added }}`: Boolean indicating if the product is added to the cart

##### Product Attributes

Accessible via `{{ .product }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Product ID |
| `{{ .Name }}` | Product name |
| `{{ .DisplayName }}` | Product display name |
| `{{ .Path }}` | Product path |
| `{{ .ReferenceID }}` | Product reference ID |
| `{{ .Description }}` | Product description |
| `{{ .AuthType }}` | Product auth type |
| `{{ .Logo.URL }}` | Product logo URL |
| `{{ .Feature }}` | true if the product is featured |
| `{{ .DCREnabled }}` | true if DCR is enabled |
| `{{ .ProviderID }}` | Provider ID |

##### API Details (Within product)

Accessible via `{{ .product.APIDetails }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | API name |
| `{{ .Description }}` | API description |
| `{{ .APIType }}` | API type |
| `{{ .TargetURL }}` | API target URL |
| `{{ .ListenPath }}` | API listen path |
| `{{ .OASUrl }}` | API OAS URL |
| `{{ .Status }}` | "Active" if API status is active, otherwise "Inactive" |

##### Documentation (Within product)

Accessible via `{{ .product.Docs }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Title }}` | Document title |
| `{{ .ID }}` | Document identifier |
| `{{ .Content }}` | Document content |
| `{{ .MarkdownContent }}` | Markdown content |
| `{{ .MarkdownEnabled }}` | Boolean for Markdown enablement |

##### Catalogues

Accessible via `{{ range .catalogues }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Catalogue name |
| `{{ .VisibilityStatus }}` | Catalogue visibility status |

##### Plans

Accessible via `{{ range .unique_plans }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Plan name |
| `{{ .ID }}` | Plan ID |
| `{{ .DisplayName }}` | Plan display name |
| `{{ .Description }}` | Plan description |
| `{{ .AuthType }}` | Plan authentication type |
| `{{ .Rate }}` | Plan rate |
| `{{ .Per }}` | Plan rate per time unit |
| `{{ .QuotaMax }}` | Plan maximum quota |
| `{{ .QuotaRenewalRate }}` | Plan quota renewal rate |
| `{{ .AutoApproveAccessRequests }}` | Boolean for auto-approval of access requests |

##### Related Posts

Accessible via `{{ range .posts }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Title }}` | Post title |
| `{{ .Lede }}` | Post summary |
| `{{ .Content }}` | Post content |
| `{{ .MarkdownContent }}` | Markdown content |
| `{{ .MarkdownEnabled }}` | Boolean for Markdown enablement |
| `{{ .Path }}` | Post path |
| `{{ .HeaderImage.URL }}` | Header image URL |
| `{{ .BlogSiteID }}` | Blog site ID |
| `{{ .ProductID }}` | Associated product ID |
| `{{ .AuthorID }}` | Author ID |

<details>
<summary> <b>Example Usage</b></summary>

```html
<div class="product-detail">
  <h1>{{ .product.DisplayName }}</h1>
  <img src="{{ .product.Logo.URL }}" alt="{{ .product.Name }} logo">
  <p>{{ .product.Description }}</p>
  <h2>API Details</h2>
  {{ range .product.APIDetails }}
  <h3>{{ .Name }}</h3>
  <p>Status: {{ .Status }}</p>
  <p>Target URL: {{ .TargetURL }}</p>
  {{ end }}
  <h2>Documentation</h2>
  {{ range .product.Docs }}
  <h3>{{ .Title }}</h3>
  {{ if .MarkdownEnabled }}
  {{ .MarkdownContent | markdownify }}
  {{ else }}
  {{ .Content }}
  {{ end }}
  {{ end }}
  <h2>Available in Catalogues</h2>
  <ul>
    {{ range .catalogues }}
    <li>{{ .Name }} ({{ .VisibilityStatus }})</li>
    {{ end }}
  </ul>
  <h2>Available Plans</h2>
  {{ range .unique_plans }}
  <div class="plan">
    <h3>{{ .DisplayName }}</h3>
    <p>{{ .Description }}</p>
    <p>Rate: {{ .Rate }} per {{ .Per }}</p>
    <p>Quota: {{ .QuotaMax }}</p>
  </div>
  {{ end }}
  <h2>Related Posts</h2>
  {{ range .posts }}
  <div class="related-post">
    <h3><a href="{{ .Path }}">{{ .Title }}</a></h3>
    <img src="{{ .HeaderImage.URL }}" alt="{{ .Title }}">
    <p>{{ .Lede }}</p>
  </div>
  {{ end }}
</div>
```

</details>

#### Product OAS Documentation 

**Template Paths**: 
- `themes/default/views/product_doc_stoplight_spec.tmpl`
- `themes/default/views/product_doc_redoc.tmpl`

These templates are used to render the OpenAPI Specification (OAS) documentation for a product. The Stoplight Spec and
ReDoc versions are available.

##### Available Attributes

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Product name |
| `{{ .Description }}` | Product description |
| `{{ .Path }}` | Product path |
| `{{ .Url }}` | OAS document URL |

<details>
<summary> <b>Example Usage</b></summary>

```html
<div class="docs-container">
  <div class="card mt-4">
    <div class="card-body">
      <h3 class="card-title">
        <a href="/portal/catalogue-products/{{ .Path }}">{{ .Name }}</a>
      </h3>
      <p class="card-text">
        {{ .Description }}
      </p>
    </div>
  </div>
  <div>
    <elements-api
      apiDescriptionUrl='{{ .Url }}'
      router="hash"
      layout="responsive"
    />
  </div>
</div>
```

</details>

### Global Helper Functions

This section provides a detailed overview of the global helper functions available in the Tyk Enterprise Developer
Portal templates. These functions are accessible across the public and private templates and allow you to perform
various operations, retrieve specific data, and create dynamic content within your templates.

#### Available Functions

- [CanCreateOrganisation](#cancreateorganisation)
- [Clients](#clients)
- [Current User](#currentuser)
- [FeaturedProducts](#featuredproducts)
- [FilterUserInvites](#filteruserinvites)
- [FormatTime](#formattime)
- [GetCart](#getcart)
- [GetCatalogueList](#getcataloguelist)
- [GetCataloguesForProduct](#getcataloguesforproduct)
- [GetClientDescription](#getclientdescription)
- [GetClientName](#getclientname)
- [GetMenus](#getmenus)
- [GetProducts](#getproducts)
- [IsPortalDisabled](#isportaldisabled)
- [IsPortalPrivate](#isportalprivate)
- [ProductDocRenderer](#productdocrenderer)
- [ProviderUpstreamURL](#providerupstreamurl)
- [SplitStrings](#splitstrings)
- [TruncateString](#truncatestring)
- [TypeOfCredential](#typeofcredential)

##### CanCreateOrganisation

Returns true if user can create an organization.

###### Example Usage
```
{{ if CanCreateOrganisation req }}
  ...
{{ end }}
```

##### Clients

Returns the list of applications for the current user. Expects the request as argument.

###### Client Attributes

Accessible via `{{ range $client := Clients req }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $client.ID }}` | Client ID |
| `{{ $client.Name }}` | Client name |
| `{{ $client.Description }}` | Client description |
| `{{ $client.RedirectURLs }}` | Client redirect URLs |
| `{{ $client.Credentials }}` | Array of client credentials |
| `{{ $client.AccessRequests }}` | Array of client access requests |

###### Credential Attributes (Within client)

Accessible via `{{ range $cred := $client.Credentials }}` 

| Attribute | Description |
|-----------|-------------|
| `{{ $cred.ID }}` | Credential ID |
| `{{ $cred.Credential }}` | Credential |
| `{{ $cred.CredentialHash }}` | Credential hash |
| `{{ $cred.OAuthClientID }}` | OAuth client ID |
| `{{ $cred.OAuthClientSecret }}` | OAuth client secret |
| `{{ $cred.Expires }}` | Credential expiration |
| `{{ $cred.AccessRequestID }}` | Access request ID associated with the credential |

###### Access Request Attributes (Within client)

Accessible via `{{ range $acreq := $client.AccessRequests }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $acreq.ID }}` | Access request ID |
| `{{ $acreq.Status }}` | Access request status |
| `{{ $acreq.UserID }}` | User ID associated with access request |
| `{{ $acreq.AuthType }}` | Access request auth type |
| `{{ $acreq.DCREnabled }}` | true if access request DCR enabled |
| `{{ $acreq.ProvisionImmediately }}` | true if provisioned immediately is enabled |
| `{{ $acreq.CatalogueID }}` | Catalogue ID |

###### Product Attributes (Within access request)

Accessible via `{{ range $product := $acreq.Products }}` 

| Attribute | Description |
|-----------|-------------|
| `{{ $product.ID }}` | Product ID |
| `{{ $product.Name }}` | Product name |
| `{{ $product.DisplayName }}` | Product display name |
| `{{ $product.Path }}` | Product path |
| `{{ $product.Description }}` | Product description |
| `{{ $product.Content }}` | Product content |
| `{{ $product.AuthType }}` | Product auth type |
| `{{ $product.DCREnabled }}` | true if product DCR enabled |

###### Plan Attributes (Within access request)

Accessible via `{{ $acreq.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Plan name |
| `{{ .DisplayName }}` | Plan display name |
| `{{ .Description }}` | Plan description |
| `{{ .AuthType }}` | Plan auth type |
| `{{ .Rate }}` | Plan rate |
| `{{ .Per }}` | Plan period |
| `{{ .QuotaMax }}` | Plan quota maximum |
| `{{ .QuotaRenewalRate }}` | Plan quota renewal rate |
| `{{ .AutoApproveAccessRequests }}` | true if auto-approve access requests is enabled |

###### Example Usage
```html
{{ range $client := Clients req }}
<div class="client">
  <h2>Client: {{ $client.Name }}</h2>
  {{ range $acreq := $client.AccessRequests }}
  <h4>Products:</h4>
  <ul>
    {{ range $product := $acreq.Products }}
    <li>
      <strong>{{ $product.Name }}</strong>
      {{ $product.Description }}
    </li>
    {{ end }}
  </ul>
  <h4>Plan:</h4>
  <p><strong>Name:</strong> {{ $acreq.Plan.Name }}</p>
  <p><strong>Rate:</strong> {{ $acreq.Plan.Rate }} per {{ $acreq.Plan.Per }}</p>
  <p><strong>Quota Max:</strong> {{ $acreq.Plan.QuotaMax }}</p>
  {{ end }}
</div>
{{ end }}
```

##### CurrentUser

The `CurrentUser` function returns the current user object if a user is logged in. It expects the request as an argument.

##### User Attributes

Accessible via `{{ $user := CurrentUser req }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ $user.ID }}` | User ID |
| `{{ $user.First }}` | User name |
| `{{ $user.Last }}` | User surname |
| `{{ $user.Email }}` | User email |
| `{{ $user.OrganisationID }}` | User organization ID |
| `{{ $user.DisplayName }}` | User complete name |
| `{{ $user.IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ $user.GetOrganisationID }}` | User's organization ID |
| `{{ $user.IsAdmin }}` | true if user is an admin |
| `{{ $user.IsOrgAdmin }}` | true if user is an organization admin |
| `{{ $user.DisplayRole }}` | User's role |

###### Example Usage
```html
{{ $user := CurrentUser req }}
{{ if $user }}
<div class="user-info">
  <h2>Welcome, {{ $user.DisplayName }}!</h2>
  <p>Email: {{ $user.Email }}</p>
  {{ if $user.IsAdmin }}
  <p>You have admin privileges.</p>
  {{ else if $user.IsOrgAdmin }}
  <p>You are an organization admin.</p>
  {{ else }}
  <p>Your role: {{ $user.DisplayRole }}</p>
  {{ end }}
</div>
{{ else }}
<p>Please log in to view your account information.</p>
{{ end }}
```

##### FeaturedProducts

Returns a list of featured products.

###### Product Attributes

Accessible via `{{ range FeaturedProducts }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Product ID |
| `{{ .Name }}` | Product name |
| `{{ .DisplayName }}` | Product display name |
| `{{ .Path }}` | Product path |
| `{{ .ReferenceID }}` | Product reference ID |
| `{{ .Description }}` | Product description |
| `{{ .AuthType }}` | Product auth type |
| `{{ .Scopes }}` | Product scopes |
| `{{ .Logo.URL }}` | Product logo URL |
| `{{ .Feature }}` | true if the product is featured |
| `{{ .DCREnabled }}` | true if DCR is enabled |
| `{{ .ProviderID }}` | Provider ID |
| `{{ .APIDetails }}` | Array of API details associated with the product |
| `{{ .Catalogues }}` | Array of catalogues associated with the product |

###### API Details Attributes (Within product)

Accessible via `{{ range .APIDetails }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | API name |
| `{{ .Description }}` | API description |
| `{{ .APIType }}` | API type |
| `{{ .TargetURL }}` | API target URL |
| `{{ .ListenPath }}` | API listen path |
| `{{ .OASUrl }}` | API OAS URL |
| `{{ .Status }}` | "Active" if API status is active, otherwise "Inactive" |

###### Catalogue Attributes (Within product)

Accessible via `{{ range .Catalogues }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Catalogue name |
| `{{ .VisibilityStatus }}` | Catalogue visibility status |

<details>
<summary> <b>Example Usage</b></summary>

```html
{{ $featured_products := FeaturedProducts }}
<h2>Featured API Products</h2>
<p>Explore our highlighted API offerings</p>
<div class="featured-products-container">
  {{ range $featured_products }}
  <div class="product-card">
    {{ if .Logo }}
    <img src="{{ .Logo.URL }}" alt="{{ .Name }} logo">
    {{ end }}
    <div class="product-info">
      <span class="auth-type">{{ .AuthType }}</span>
      <h3>{{ .Name }}</h3>
      <p>{{ .Description }}</p>
    </div>
    <div class="product-actions">
      <a href="/portal/catalogue-products/{{ .Path }}" class="btn">More Info</a>
      <div class="dropdown-content">
        {{ range .APIDetails }}
        {{ if or (gt (.OASDocument.Base.Url | trim | length) 0) (gt (.OASUrl | trim | length) 0) }}
        <a href="/portal/catalogue-products/{{ $.Path }}/{{ .APIID }}/docs" target="blank">
          {{ .Name }}
        </a>
        {{ end }}
        {{ end }}
      </div>
    </div>
  </div>
  {{ end }}
</div>
```

</details>

##### FilterUserInvites

Returns a list of users that were invited to the current user's organization, if the user became an organization.
Expects the request as a parameter.

###### User Attributes

Accessible via `{{ range $invite := FilterUserInvites req }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $invite.ID }}` | User ID |
| `{{ $invite.Email }}` | User email |
| `{{ $invite.First }}` | User first name |
| `{{ $invite.Last }}` | User last name |
| `{{ $invite.Role }}` | User role |
| `{{ $invite.JoinedAt }}` | User joined at time |
| `{{ $invite.Joined }}` | Whether the user has joined |
| `{{ $invite.Uactive }}` | Whether the user is active |

<details>
<summary> <b>Example Usage</b></summary>

```html
{{ $userInvites := FilterUserInvites req }}
{{ if $userInvites }}
<h2>Invited Users</h2>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {{ range $invite := $userInvites }}
    <tr>
      <td>{{ $invite.First }} {{ $invite.Last }}</td>
      <td>{{ $invite.Email }}</td>
      <td>{{ $invite.Role }}</td>
      <td>
        {{ if $invite.Joined }}
        Joined
        {{ else if $invite.Uactive }}
        Pending
        {{ else }}
        Inactive
        {{ end }}
      </td>
    </tr>
    {{ end }}
  </tbody>
</table>
{{ else }}
<p>No pending invitations.</p>
{{ end }}
```

</details>

##### FormatTime

Formats a given time with a given format.

###### Example Usage
```gotemplate
{{ $user := CurrentUser req }}
{{ if $user}}
{{$time := FormatTime $user.CreatedAt "2 Jan, 2006 at 3:04:00 PM (MST)"}}
<!-- Use $time or other variables here -->
...
{{end}}
```

##### GetCart

Returns a map with the cart items for a given user ID. Expects the user ID as an argument. This function is useful for
retrieving and displaying the contents of a user's cart, including detailed information about the products, their
authentication types, and associated templates.

###### Cart Item Attributes

Accessible via `{{ range $key, $value := GetCart $user.ID }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $value.AuthType }}` | Cart item auth type |
| `{{ $value.Catalogue }}` | Cart item catalogue |
| `{{ $value.DCREnabled }}` | true if cart order consists of DCR products |
| `{{ $value.Plan }}` | Cart item plan |
| `{{ $value.Products }}` | Cart item array of products |

##### Plan Attributes (Within cart item)

Accessible via `{{ $plan := $value.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Plan ID |
| `{{ .PlanName }}` | Plan name |
| `{{ .FormatQuota }}` | Formatted quota information |
| `{{ .FormatRateLimit }}` | Formatted rate limit information |

##### Catalogue Attributes (Within cart item)

Accessible via `{{ $catalogue := $value.Catalogue }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Catalogue ID |

###### Product Attributes (Within cart item)

Accessible via `{{ range $product := $value.Products }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Product ID |
| `{{ .Name }}` | Product name |
| `{{ .DisplayName }}` | Product display name |
| `{{ .Path }}` | Product path |
| `{{ .Description }}` | Product description |
| `{{ .Content }}` | Product content |
| `{{ .AuthType }}` | Product auth type |
| `{{ .DCREnabled }}` | true if product DCR enabled |
| `{{ .AuthTypes }}` | List of product auth types |

###### DCR Client Template Attributes (Within product)

Accessible via `{{ range $template := $product.Templates }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Template ID |
| `{{ .Name }}` | Template name |
| `{{ .GrantType }}` | Template grant type |
| `{{ .ResponseTypes }}` | Template response types |
| `{{ .TokenEndpointAuthMethod }}` | Template token endpoint auth method |
| `{{ .OktaAppType }}` | Template Okta app type |

###### Example Usage
```html
{{ $user := CurrentUser req }}
{{ if $user }}
  {{ $cart := GetCart $user.ID }}
  {{ if $cart }}
  <h2>Your Cart</h2>
  {{ range $key, $value := $cart }}
  <div class="cart-item">
    <h3>{{ $value.Catalogue.Name }}</h3>
    <p>Auth Type: {{ $value.AuthType }}</p>
    {{ range $product := $value.Products }}
    <div class="product">
      <h4>{{ $product.DisplayName }}</h4>
      <p>{{ $product.Description }}</p>
    </div>
    {{ end }}
  </div>
  {{ end }}
  {{ else }}
  <p>Your cart is empty.</p>
  {{ end }}
{{ end }}
```

##### GetCatalogueList

Returns a list of catalogue names. Expects the request as parameter.

###### Example Usage
```gotemplate
{{ range $key, $value := GetCatalogueList req }}
<option value="{{ $key }}" {{ if eq $value.Selected true }} selected {{ end }}>{{ $value.Name }}</option>
{{ end }}
```

##### GetCataloguesForProduct

Returns a list of products for a given user and product ID. Expects the request, a user and a product ID as parameters.

###### Catalogue Attributes

Accessible via `{{ range GetCataloguesForProduct req $user $product.ID }}` 

| Attribute | Description |
|-----------|-------------|
| `{{ .VisibilityStatus }}` | Catalogue visibility status |
| `{{ .Name }}` | Catalogue name |

###### Example Usage
```html
{{ $thisProduct := .product }}
{{ $user := CurrentUser req }}
{{ $catalogues_for_product := GetCataloguesForProduct req $user $thisProduct.ID }}
<h3>Catalogues for {{ $thisProduct.Name }}</h3>
<ul>
  {{ range $catalogues_for_product }}
  <li>
    <strong>{{ .Name }}</strong>
    (Visibility: {{ .VisibilityStatus }})
  </li>
  {{ end }}
</ul>
```

##### GetClientDescription

Returns an application description given a credential ID.

###### Example Usage
```
{{ range $app.Credentials }}
...
{{ GetClientDescription .ID}}
{{end}}
```

##### GetClientName

Returns an application name given a credential ID.

###### Example Usage
```
{{ range $app.Credentials }}
...
{{ GetClientName .ID}}
{{end}}
```

##### GetMenus

Returns a map of all [menus]({{< ref "portal/customization#configure-menus" >}}).

###### Example Usage
```html
{{ if GetMenus.Primary }}
  {{ range GetMenus.Primary.Children }}
    {{ range .Children }}
    <li class="nav-item">
      <a class="dropdown-item" href="{{ .Path }}">{{ .Tag }}</a>
    </li>
    {{ end }}
  {{ end }}
{{ end }}
```

##### GetProducts

Returns the list of products for the current user. Expects the request as an argument.

###### Product Attributes

Accessible via `{{ range $product := GetProducts req }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $product.ID }}` | Product ID |
| `{{ $product.Name }}` | Product name |
| `{{ $product.DisplayName }}` | Product display name |
| `{{ $product.Path }}` | Product path |
| `{{ $product.ReferenceID }}` | Product reference ID |
| `{{ $product.Description }}` | Product description |
| `{{ $product.AuthType }}` | Product auth type |
| `{{ $product.Scopes }}` | Product scopes |
| `{{ $product.Logo.URL }}` | Product logo URL |
| `{{ $product.Feature }}` | true if the product is featured |
| `{{ $product.DCREnabled }}` | true if DCR is enabled |
| `{{ $product.ProviderID }}` | Provider ID |
| `{{ $product.APIDetails }}` | Array of API details associated with the product |
| `{{ $product.Catalogues }}` | Array of catalogues associated with the product |

###### API Details Attributes (Within product)

Accessible via `{{ range $api := $product.APIDetails }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $api.Name }}` | API name |
| `{{ $api.Description }}` | API description |
| `{{ $api.APIType }}` | API type |
| `{{ $api.TargetURL }}` | API target URL |
| `{{ $api.ListenPath }}` | API listen path |
| `{{ $api.OASUrl }}` | API OAS URL |
| `{{ $api.Status }}` | "Active" if API status is active, otherwise "Inactive" |

###### Catalogue Attributes (Within product)

Accessible via `{{ range $catalogue := $product.Catalogues }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $catalogue.Name }}` | Catalogue name |
| `{{ $catalogue.VisibilityStatus }}` | Catalogue visibility status |

<details>
<summary> <b>Example Usage</b></summary>

```html
{{ range GetProducts req }}
<div class="col-lg-12 card-container">
  <div class="card d-flex flex-row {{ if .Logo.URL }}has-logo{{ end }}">
    {{ if .Logo.URL }}
    <img class="card-img-top img-fluid" src="{{ .Logo.URL }}" alt="">
    {{ end }}
    <div class="card-body align-self-center w-100">
      <div class="card-title d-flex flex-column justify-content-end align-items-baseline">
        <div class="pill-container">
          <span class="pill">{{ .AuthType }}</span>
        </div>
        <h2>{{ .ProductName }}</h2>
      </div>
      {{ if .Description }}
      <p class="card-text">{{ .Description }}</p>
      {{ end }}
    </div>
    <div class="card-cta d-flex flex-column align-self-center justify-content-between align-items-baseline w-100">
      <div>
        <a href="/portal/catalogue-products/{{ .Path }}" class="btn btn-secondary">More Info</a>
      </div>
    </div>
  </div>
</div>
{{ end }}
```

</details>

##### IsPortalDisabled

Returns true (exception: for admins is always enabled) if portal visibility was set to hidden. Expects the request as
parameter.

###### Example Usage
```
{{ $portalDisabled := IsPortalDisabled req }}
```

##### IsPortalPrivate

Returns true (exception: for admins is always enabled) if portal visibility was set to private. Expects the request as
parameter.

###### Example Usage
```
{{ $portalPrivate  := IsPortalPrivate req }}
```

##### ProductDocRenderer

Returns the configured product OAS renderer (redoc or stoplight).

###### Example Usage
```
{{ $oas_template := ProductDocRenderer }}
```

##### ProviderUpstreamURL

Returns the provider upstream URL for a given providerID. Expects the request and a provider ID as parameters.

###### Example Usage
```
{{ $upstreamURL := ProviderUpstreamURL req $thisProduct.ProviderID }}
```

##### SplitStrings

Splits a given string with given separator and returns a slice of split strings.

###### Example Usage
```
{{ range $app.Credentials }}
...
{{ range SplitStrings .GrantType "," }}
...
{{ end }}
{{ end }}
```

##### TruncateString

Truncates a given string to a given length, returning the truncated string followed by three dots (…).

###### Example Usage
```
{{ TruncateString $api.Description 60 }}
```

##### TypeOfCredential

Returns the credential type ("oAuth2.0" or "authToken") given the credential.

###### Example Usage
```
{{ range $app.Credentials }}
...
{{ if eq (TypeOfCredential . ) "oAuth2.0" }}
...
{{ end }}
{{end}}
```


### Email Templates

This section provides a detailed overview of the email template data available in the Tyk Enterprise Developer Portal. 
The Tyk Enterprise Developer Portal uses a variety of email templates for different purposes, such as user registration
and access request status or organization status updates. Each template has access to specific data or functions relevant
to its purpose.

It's important to note that while email templates can include template data or specific template functions, they do not
have access to the global helper functions available in other portal templates.

Please refer to [email workflow]({{< ref "portal/customization#configure-email-notifications" >}})
for additional detail on email notifications sent by the portal.


#### Available Email Templates

- [Access Request Approve/Reject](#access-request-approvereject)
- [Access Request Submitted](#access-request-submitted)
- [Activate and Deactivate](#activate-and-deactivate)
- [New User Request](#new-user-request)
- [Organization Approve](#organization-approve)
- [Organization Reject](#organization-reject)
- [Organization Request](#organization-request)
- [Reset Password](#reset-password)
- [Targeted Invite](#targeted-invite)
- [Welcome User](#welcome-user)

##### Access Request Approve/Reject

**Template Paths**: 
- `themes/default/mailers/approve.tmpl`
- `themes/default/mailers/reject.tmpl`

These templates are used for sending notifications to users when their access requests are approved or rejected.

###### Available Objects

There's no data sent to these templates.

###### Example Usage
```
Hi,
The API Credentials you provisioned have been rejected.
Thanks,
The Team
```

##### Access Request Submitted

**Template Path**: `themes/default/mailers/submitted.tmpl`

This template is used for notifying administrators about pending access requests.

###### Available Objects

- `{{ .requests }}`: Returns the list of access requests pending approval.

###### Access Request Attributes

Accessible via `{{ range .requests }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .PlanID }}` | Plan ID associated with access request |
| `{{ .Status }}` | Request status |
| `{{ .AuthType }}` | Request authentication type |
| `{{ .UserID }}` | User ID associated with the request |
| `{{ .ClientID }}` | Client ID associated with the request |
| `{{ .DCREnabled }}` | Indicates if DCR (Dynamic Client Registration) is enabled for the request |
| `{{ .ProvisionImmediately }}` | Indicates if provisioning is immediate for the request |
| `{{ .CatalogueID }}` | Catalogue ID associated with the request |

###### Product Attributes (within Access Request)

Accessible via `{{ range $product := $acreq.Products }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $product.ID }}` | Product ID |
| `{{ $product.Name }}` | Product name |
| `{{ $product.DisplayName }}` | Product display name |
| `{{ $product.Description }}` | Product description |
| `{{ $product.AuthType }}` | Product authentication type |
| `{{ $product.DCREnabled }}` | Indicates if DCR (Dynamic Client Registration) is enabled for the product |

###### Example Usage
```html
<p>A new Access request has been submitted. Please log in to the administration dashboard to view the request.</p>
<ul>
  {{ range $acreq := .requests }}
  <li>
    <strong>Status:</strong> {{ $acreq.Status }}<br>
    <strong>User ID:</strong> {{ $acreq.UserID }}<br>
    <strong>Products:</strong>
    <ul>
      {{ range $product := $acreq.Products }}
      <li>{{ $product.DisplayName }} ({{ $product.AuthType }})</li>
      {{ end }}
    </ul>
  </li>
  {{ end }}
</ul>
```


##### Activate and Deactivate

**Template Paths**: 
- `themes/default/mailers/activate.tmpl`
- `themes/default/mailers/deactivate.tmpl`

These templates are used for sending activation and deactivation notifications to users.

###### Available Objects

- `{{ .name }}`: Returns the user's full name.

###### Example Usage
```
Hi, <strong>{{.name}}</strong><br/>
Your account has been activated.
```

##### New User Request

**Template Path**: `themes/default/mailers/newuser.tmpl`

This template is used for notifying administrators about new user registration requests pending activation.

###### Available Objects

- `{{ .user }}`: Returns the new user pending activation.

##### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |
| `{{ .Organisation.Name }}` | Organization name |
| `{{ .Teams }}` | Array of user teams |
| `{{ .Teams.ID }}` | Team ID |
| `{{ .Teams.Name }}` | Team name |
| `{{ .Teams.Default }}` | Indicates if the team is the default team (true/false) |

###### Example Usage
```
<p>There is a new user request pending. Please approve it from the admin console.</p>
<p>
  Id: {{ .user.ID }}<br/>
  User: {{ .user.DisplayName }} ({{ .user.Email }})<br/>
  Role: {{ .user.Role }}<br/>
  {{ if gt .user.OrganisationID 0 }}
  Organisation: {{ .user.Organisation.Name }}<br/>
  {{ else }}
  Organisation: Administrators' organisation<br/>
  {{ end }}
  {{ if gt (len .user.Teams) 0 }}
  Teams:<br/>
  <ul>
    {{ range .user.Teams }}
    <li>{{ .Name }}</li>
    {{ end }}
  </ul>
  {{ else }}
  Teams: none
  {{ end }}
</p>
```

##### Organization Approve

**Template Path**: `themes/default/mailers/organisation_request.tmpl`

This template is used for notifying users that their organization creation request has been approved.

###### Available Objects

- `{{ site }}`: Returns the application host.

###### Example Usage
```
Hello,
The organization registration request has been approved. You can now manage your organization in your dashboard here: https://{{.site}}/portal/private/dashboard
Thanks,
The team
```

##### Organization Reject

**Template Path**: `themes/default/mailers/organisation_reject.tmpl`

This template is used for notifying users that their organization creation request has been rejected.

###### Available Objects

There's no data sent to this template.

###### Example Usage
```
Hello,
The organization registration request has been rejected.
Thanks,
The team
```

##### Organization Request

**Template Path**: `themes/default/mailers/organisation_request.tmpl`

This template is used for notifying administrators about new organization creation requests.

###### Available Objects

- `{{ .user }}`: Returns the user who made the request. 
- `{{ .organisationName }}`: Returns the new organization name.

##### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |

###### Example Usage
```
There is a new organization registration request pending. Please approve it from the admin console.
The organization name: {{ .organisationName }}.
The user: {{ .user.DisplayName }} ({{ .user.Email }}).
```

##### Reset Password

**Template Path**: `themes/default/mailers/auth/reset_password.tmpl`

This template is used for sending password reset emails to users.

###### Available Functions

- `{{ current_user }}`: Returns the current user object.
- `{{ reset_password_url }}`: Returns the URL with the token for setting the password.

###### User Attributes

Accessible via `{{ current_user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .Role }}` | User role |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |

###### Example Usage
```
{{ $user := current_user}}
<p>Hello {{ $user.DisplayName }},</p>
<p>Someone has requested a link to change your password. You can do this through the link below.</p>
<p>{{reset_password_url}}</p>
<p>If you didn't request this, please ignore this email.</p>
<p>Your password won't change until you access the link above and create a new one.</p>
```

##### Targeted Invite

**Template Path**: `themes/default/mailers/auth/targeted_invite.tmpl`

This template is used for sending targeted invitations to users.

###### Available Functions

- `{{ user }}`: Returns the targeted user object.
- `{{ team }}`: Returns the team name to which the user is being invited.
- `{{ invite_url }}`: Returns the URL with the token for setting the password.

###### User Attributes

Accessible via `{{ user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .Role }}` | User role |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |

###### Example Usage
```html
{{ $u := user }}
Hi, <strong>{{ $u.DisplayName }}</strong><br/>
<p>Someone is inviting you to join {{ if $u.IsAdmin }}as an Administrator{{ else }}the {{ team }} team{{end }}. You can do this through the link below.</p>
<p>{{ invite_url }}</p>
<p>If you didn't request this, please ignore this email.</p>
```

##### Welcome User

**Template Paths**: 
- `themes/default/mailers/welcome_admin.tmpl`
- `themes/default/mailers/welcome_dev.tmpl`

These templates are used for sending welcome emails to new users, with separate templates for administrators and developers.

###### Available Objects

- `{{ .user }}`: Returns the user who made the request. Refer to the CurrentUser section for accessible attributes and methods.

##### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organization ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organization ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organization admin |
| `{{ .DisplayRole }}` | User's role |
| `{{ .Organisation.Name }}` | organization name |
| `{{ .Teams }}` | Array of user teams |
| `{{ .Teams.ID }}` | Team ID |
| `{{ .Teams.Name }}` | Team name |
| `{{ .Teams.Default }}` | Indicates if the team is the default team (true/false) |

<details>
<summary> <b>Example Usage</b></summary>

```html
<h1>Welcome to Tyk Enterprise Developer Portal</h1>
<p>Hello {{ .user.DisplayName }},</p>
<p>Your account has been created for the {{ .user.Organisation.Name }} organisation.</p>
<p>Your assigned teams:</p>
<ul>
  {{ range .user.Teams }}
  <li>{{ .Name }}{{ if .Default }} (Default){{ end }}</li>
  {{ end }}
</ul>
<p>We're excited to have you on board!</p>
```

</details>

## Configure Pages

We suggest you read the [portal concepts]({{< ref "portal/overview#developer-portal-concepts" >}}) first. If you've already done that, we will show you an example on how to:

- create a new layout.
- create a new template from the file system.
- create a new page from the admin dashboard.

**Prerequisites**

- Access to the file system
- Access to your Tyk Self-Managed installation

### Create a New Page using an Existing Template

Follow the example below to create a new page called “My first page” using an existing template.

{{< img src="/img/dashboard/portal-management/enterprise-portal/create-new-page1.png" alt="The pages section within the Tyk Enterprise Portal app" >}}

1. Log in to the Admin Dashboard.
2. Navigate to Pages from the side bar menu.
3. Click Add and enter the following values:

{{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-content-page-using-an-existing-template.png" alt="Add a new content page" >}}

### Create a New Page

#### Create the Layout File

A layout behaves like a component that can be reused to inject templates in order to avoid duplicating elements such as `<head>` and `<link>`.So let’s create one that looks like the one below.

1. From the file system navigate to `/themes/default/layouts`.
2. Create a new file named `my_layout.tmpl`.
3. Copy the code below, paste it to your new layout file and save it.

```html
<!DOCTYPE html>
<html lang="en">

 <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

   <title>{{ if .page}} {{.page.Title}} {{else}} Developer Portal {{end}}</title>

    <!-- Bootstrap core CSS -->
    <link href="/system/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/stylesheets/fonts.css" rel="stylesheet">
    <link href="/assets/stylesheets/main.css" rel="stylesheet">

 </head>

 <body>
    {{ render "top_nav" . }}
    <div class="page-wrapper">
      <!-- Page Content -->
      {{ yield }}
   </div>


   {{ render "footer" . }}

 </body>

</html>
```
{{< note success >}}
**Note**

The above snippet is taking into account the default developer portal setup, directories and references of the appropriate styling files.

{{< /note >}}

We have also added the top and footer navigation menus for demonstration purposes, `{{ render "top_nav" . }}` and `{{ render "footer" . }}` respectively.

#### Create the Template File

{{< note success >}}
**Note**

Only follow this step after creating a new template file in Section 1 above, unless you want to use an existing template.

{{< /note >}}

1. From the file system; navigate to `/themes/default/views`.
2. Create a new file (template)
3. In this example, we will keep it simple and create a couple of HTML tags. Copy and paste the following code:

```go
<div class="container">
  <h1>{{ .page.Title }}</h1>
  <p> {{ .blocks.Description.Content }}</p>
</div>
```
In this example, we use the code references in the template:
- Inside the template’s `<h1>` we use `{{ .page.Title }}` to display the page name.
- Inside the template’s `<p>` we use `{{ .blocks.Description.Content }}` to display the page content.

4. Name this `my_template.tmpl` and save it.
5. You now need to reference your new layout and template. From your Manifest file (`themes.json`) add a new key to the object that will look like this:

```json
{
  "name": "My new Template",
  "template": "my_template",
  "layout": "my_layout"
}
```
Alternatively, you can give it your preferred name but reference the template and layout names we created earlier in the manifest file.

6. Now restart your developer portal service and go through the tutorial on how to add a new page. The template dropdown within the add new page form should have a new entry called `My new Template`, so create a page that will look like this:

{{< img src="/img/dashboard/portal-management/enterprise-portal/add-page-details.png" alt="Add new page details" >}}

7. Now navigate to the path we have entered on your browser (`my-domain.io/my-first-page`) and you should be able to see your new page with the content added via the UI:

{{< img src="/img/dashboard/portal-management/enterprise-portal/my-first-page-example.png" alt="Example new UI page" >}}

Taking as a scenario our above example, let’s see a visual explaining the correlation between the different files and UI.

{{< img src="/img/dashboard/portal-management/enterprise-portal/scenario-correlation-diagram.png" alt="Scenario correlation" >}}


### Edit Page Content

Content managers or similar roles that are responsible for the content displayed on the developer portal can edit and manage pages within the **Page section** of the Developer Portal.

**Prerequisites**

- Install the Developer portal
- Log in to the portal dashboard
- Default pages available or a page created by a developer which has the custom theme linked to it

#### Instructions

1. From the Pages section, open an existing page. This could be a page based on the default template or a new page that one of your developers set up when creating a new custom template.
2. Edit the page meta data. Change the name of the page if needed. Set or change the path URL if needed.

{{< img src="/img/dashboard/portal-management/enterprise-portal/page-content-edit.png" alt="Edit Portal page content" >}}

3. Edit the page content within the existing content blocks.

{{< note success >}}
**Note**

The content block name is linked to the content block name in the template html file. If this name is changed, and not reflected in the template html, the page will get an error and won’t show.

{{< /note >}}

4. Publish the page and view it from the external portal URL. If you want the page to be published and visible on the external portal, you need to change the state to Published.



## Configure Menus

The Developer portal has two types of menus:
1. The main navigation at the top (in the header)
2. The footer at the bottom.

Both of them are defined as [partials]({{< ref "portal/customization#file-structure-of-a-theme" >}}) in the portal directory in `/themes/default/partials/`.

### Top Navigation Menu

The Enterprise Developer portal enables admin users to customize the navigation menu that appears on the top navigational bar of the live portal. An admin user can create and manage menu items without any code from the admin dashboard of the Developer portal.
{{< img src="img/dashboard/portal-management/enterprise-portal/top-nav-menu.png" alt="The navigation menu" >}}

Each menu item may:
- lead to a specific page or URL:
  {{< img src="img/dashboard/portal-management/enterprise-portal/regular-menu-item.png" alt="Regular menu item" >}}
- show a dropdown list with possible navigational options:
  {{< img src="img/dashboard/portal-management/enterprise-portal/dropdown-menu-item.png" alt="Dropdown menu item" >}}

Admin users can create additional navigational menus and render them on any page of the live portal. This customization requires changes to a theme and is covered in the [Full customization section]({{< ref "portal/customization#configure-menus" >}}).

#### Manage Menu Items

The management of the menu items is done from the **Menus** section of the Developer portal.

1. Open the admin dashboard. Navigate to the **Menus** section.
   {{< img src="img/dashboard/portal-management/enterprise-portal/navigation-to-menus-section.png" alt="Navigate to the Menus section" >}}

2. Select a menu that you want to modify. By default, the Developer portal has only one **Primary** menu. If you want to add more menus and render them on the live portal, please refer to [Full customization section]({{< ref "portal/customization#configure-menus" >}}).
   {{< img src="img/dashboard/portal-management/enterprise-portal/select-a-menu.png" alt="Select a menu" >}}

3. Click on a **menu item** to modify it. You can change the following items:
    1. **Title** that will be exposed to developers.
    2. **Path** where developers will be redirected by clicking on that menu item.
    3. **Children** items that will be exposed in the dropdown list that will appear when hovering mouse over the menu item.
    4. To make the changes effectively, you need to save the changes by clicking on the **Save changes** button.
       {{< img src="img/dashboard/portal-management/enterprise-portal/menu-item.png" alt="Modify a menu item" >}}

4. To remove a menu item from the menu click on the **bin** icon and click on the **Save changes** button.
   {{< img src="img/dashboard/portal-management/enterprise-portal/delete-a-menu-item.png" alt="Delete a menu item" >}}

#### Create New Menu Items
To create a new menu item, you need to:

1. Click on the **Add Menu Item** button.
2. Fill **Title**, **Path**, and **Children** fields. Save the changes by clicking on the **Save changes** button.
   {{< img src="img/dashboard/portal-management/enterprise-portal/save-new-menu-item.png" alt="Save a menu item" >}}

The new menu item will appear on the live portal immediately.
{{< img src="img/dashboard/portal-management/enterprise-portal/new-menu-item-on-the-live-portal.png" alt="New menu item on the live portal" >}}s

#### Update Existing Menus

1. Log into your portal
2. Select **Menus** from the navigation menu
3. Click **Primary** to edit the menu

{{< img src="/img/dashboard/portal-management/enterprise-portal/edit-menu.png" alt="Edit Menu dialog" >}}

**Field Descriptions**

- **Name**: You can give it any name you like, it does not have any effect in the live portal nor the admin app.
- **Path**: This will be used in the code as a reference in order to render the menu. If you don’t have access to the template files, we recommend that you do not edit this field. Editing the `Path` for the default menus will hide the menu as there will be a mismatch between the Path and the reference in the template.
- **Menu Items**:
  1. **Title**: This will be the text that will be displayed in the live portal.
  2. **Path**: this is where the user will be redirected to.
  3. **Children**: In this section you add another nested menu item. We have added a dummy item (Product 1) to demonstrate

Below is the menu item from its own view, which is available from the **Menu Items** option in the admin app side menu.

{{< img src="/img/dashboard/portal-management/enterprise-portal/edit-menu-item.png" alt="Edit Menu item dialog" >}}

Here's the menu as displayed in the app:

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-menu-live.png" alt="Live menu in app" >}}

We have mentioned above the relationship between a menu’s `Path` and the code reference in the menu template. Let’s see how the main menu template looks like (the file is `/themes/default/partials/` directory and is called `top_nav.tmpl`) for the part that we are interested in:

```go
{{ if GetMenus.Primary }}
  {{ range GetMenus.Primary.Children }}
    <li class="nav-item {{ if .Children }}dropdown{{end}} mr-2">
      <a class="nav-link {{ if .Children }}dropdown-toggle{{end}}" href="{{.Path}}" {{ if .Children }}data-toggle="dropdown" aria-haspopup=”true" aria-expanded="false"{{end}}>{{.Tag}}</a>
      {{ if .Children }}
        <ul class="dropdown-menu submenu" aria-labelledby="navbarDropdownMenuLink">
          {{ range .Children }}
            <li class="nav-item">
              <a class="dropdown-item" href="{{.Path}}">{{.Tag}}</a>
            </li>
          {{ end }}
        </ul>
      {{ end }}
    </li>
  {{ end }}
{{ end }}
```
Let's pick each line that is used to render the menu attributes and see how they work:

1. `{{ if GetMenus.Primary }}`: This statement calls the “GetMenus” function and checks if there is a menu called `Primary`. If present, it goes into the next line:
2. `{{ range GetMenus.Primary.Children }}` Each Menu (Primary) has some children (Menu items) so what this code does is loop through all the children and they are rendered as below:

```go
<li class="nav-item {{ if .Children }}dropdown{{end}} mr-2">
<a class="nav-link {{ if .Children }}dropdown-toggle{{end}}" href="{{.Path}}" {{ if .Children }}data-toggle="dropdown" aria-haspopup=”true" aria-expanded="false"{{end}}>{{.Tag}}</a>
```
Where:

- `{{ .Path }}` is the Path we have defined from the UI and
- `{{ .Tag }}` is the Name we have defined from the UI.

So this will render all the menu items (Catalogs - as per screenshot) of the menu (Primary - the name we’ve given to the menu).

3. `{{ if .Children }}`: This line checks if the menu item has any submenus. If it does it loops through those children `{{ range .Children }}` and finally renders them `<a class="dropdown-item" href="{{.Path}}">{{.Tag}}</a>` similarly as the main menu items.
So now the child of **Catalogs** which we named **Product 1** has been rendered.

## Configure Branding

In this section we will explain how to apply your branding (styling - CSS) on the portal elements with your own colors and logo within minutes.

**Prerequisites**

- A Tyk Self-Managed [installation]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}})
- A login for the portal admin app
- Access to your Tyk portal file system

### Changing Portal Logo

1. Access the file directory for the Developer portal
2. The default logo is located in `/themes/default/assets/images/` and is called `dev-portal-logo.svg`.
3. Replace the default image with your own, keeping the same file name and in `.svg` format, ensuring that `xmlns="http://www.w3.org/2000/svg"` is included within your `<svg>` tag.

{{< note success >}}
**Note**

If you want to use different naming, path reference or extension, the code is `<img src="/assets/images/dev-portal-logo.svg">` and is found on line 6 from the `/themes/default/partials/footer.tmpl` template.
{{< /note >}}

### Changing Brand Colors

Let’s now explain how to manage borders and change the colors of buttons, texts and backgrounds. The file we’ll be looking at is `/themes/default/assets/stylesheets/main.css` which contains some CSS variables that are used throughout the app. Let’s take a closer look.
You can apply some changes in the portal based on your preferences. For example, you can change the navigation background color, the text color and the different button theme colors. Furthermore, you can change table border color and radius.

If you want to change the navigation background color you need to edit the variable called `--tdp-nav-bg-color` Similarly other variables as you can see where/how each one is used:

{{< note success >}}
**Note**

`tdp` stands for Tyk Developer Portal

{{< /note >}}

#### Background Colors

{{< img src="/img/dashboard/portal-management/enterprise-portal/background-colors.png" alt="Background Colour settings Tyk Enterprise Portal" >}}

- `--tdp-nav-bg-color` navigation background color
- `--tdp-body-bg-color` App background color

#### Text Colors

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

## Configure Sign Up Form

In this section, you will learn how to customize the sign-up form for your API Consumers and extend the data stored in the user profile.
To achieve that, you will need to:
- Add a new attribute to the user profile and make it available in the sign-up form.
- Optionally, add a description and set other parameters that suit your requirements.

### Navigate to the Custom Attributes menu

To customize the sign-up form, you need to add new data attributes to the user model so that when a user profile is being created, those attributes will be recorded against the user profile.
To start customizing the user sign-up form, navigate to the **Custom attributes** menu and the select the **User** model. Currently, it is possible to extend only the user model. In future releases we will add the same capabilities to other models.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-user-attributes.png" alt="Navigate to the User's attributes" >}}

### Add a new attribute to the user model
To add a new attribute to the user model, click on the **Add Custom attribute** button and then fill in properties of the new attribute:
- **Attribute ID**: A string that consists of letters (a-zA-Z), numbers (0-9), dashes, and underscores. This is used to reference the attribute in the [Admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) screen.
- **Attribute Label**: The attribute's name that is displayed in the UI.
- **Description**: Explains the intended usage of this attribute. It is also displayed in the UI.
- **Type of attribute**: The type of data that can be stored in this attribute. You cannot change the value of this field once the attribute is created. The following data types are acceptable:
  - Boolean (true or false).
  - Dropdown (a list of values).
  - String.
  - Number.
- **Validation Reg Exp**: A regular expression that is used to validate the value of this field. It is available for the **String** data type only.
- **Enable validation**: Determines if the portal should apply the regular expression defined in the **Validation Reg Exp** to validate the value of this attribute when creating or updating a user profile. It is available for the **String** data type only.
- **Dropdown Values**: A list of values for the attribute. It is available for the **Dropdown** data type only.
- Fields that define the attribute's behavior:
  - **Write once read many**: Determines if the value of the attribute can be changed after a user profile is created.
  - **Add to the key metadata**: Determines if the value of the attribute should be added to the metadata of Auth keys or OAuth2.0 clients when a user creates them. Keep in mind that credential-level metadata will be accessible in both the gateway runtime and gateway database. Please be cautious when handling personally identifiable information (PII) data.
  - **Required**: Determines if this attribute is required to create a user profile.
  - **Show on sign-up form**: Determines if this attribute should be visible in the sing-up form.
- **Behavior**: Determines if developers can view or edit this attribute. Possible values are:
  - Developers can view and edit the attribute.
  - Developers can only view the attribute.
  - Developers cannot see the attribute.

For the purpose of this guide, make sure to tick the **Required** and **Show on sign-up form** checkboxes and select the **Developers can only view the attribute** option.
{{< img src="img/dashboard/portal-management/enterprise-portal/add-new-attribute-to-user-model.png" alt="Add a new attribute to the user model" >}}

The new attribute will be added to the user sign-up form, once you have created a new custom attribute and saved changes to the user model by clicking on the **Save** button.
{{< img src="img/dashboard/portal-management/enterprise-portal/custom-attribute-in-the-sign-up-form.png" alt="Customized user sign-up form" >}}


## Configure Email Notifications

The Tyk Enterprise Developer Portal enables admin users to customize emails that are sent to the API consumers and admin users upon certain events that happen on the portal.
As an admin user, you can fully customize emails that are sent from the  portal.

This section provides a guide to email customization.

### Supported Email Notifications

The Tyk Enterprise Developer Portal sends notifications for the following events:

| Event                                                  | Recipient                     | Email subject                                        | Text template                  | HTML template                  | Default template          |
|--------------------------------------------------------|-------------------------------|------------------------------------------------------|--------------------------------|--------------------------------|---------------------------|
| Password reset                                         | User who reset their password | Reset password email - subject                       | auth/reset.text.tmpl           | auth/reset.html.tmpl           | auth/reset.tmpl           |
| New API access request is created                      | All portal admins             | Access request sent for approval (not configurable)  | submitted.text.tmpl            | submitted.html.tmpl            | submitted.tmpl            |
| API access request approved                            | Developer                     | Approve access request - subject                     | approve.text.tmpl              | approve.html.tmpl              | approve.tmpl              |
| API access request rejected                            | Developer                     | Reject access request - subject                      | reject.text.tmpl               | reject.html.tmpl               | reject.tmpl               |
| Pending developer registration request                 | All portal admins             | Invite new admin user - subject                      | newuser.text.tmpl              | newuser.html.tmpl              | newuser.tmpl              |
| An admin user is invited to register in the portal     | Admin                         | Developer registration approval request - subject    | invite.text.tmpl               | invite.html.tmpl               | invite.tmpl               |
| A developer is invited to register in the portal       | Developer                     | Invite new user to a consumer organization - subject | auth/targeted_invite.text.tmpl | auth/targeted_invite.html.tmpl | auth/targeted_invite.tmpl |
| Admin or developer account is activated                | Activated user                | Activate user - subject                              | activate.text.tmpl             | activate.html.tmpl             | activate.tmpl             |
| Admin or developer account is deactivated              | Deactivated user              | Dectivate user - subject                             | deactivate.text.tmpl           | deactivate.html.tmpl           | deactivate.tmpl           |
| New consumer organization registration request         | All portal admins             | New organization registration request - subject      | organisation_request.text.tmpl | organisation_request.html.tmpl | organisation_request.tmpl |
| Consumer organization registration request is approved | Consumer organization admin   | Approve organization registration request - subject  | organisation_approve.text.tmpl | organisation_approve.html.tmpl | organisation_approve.tmpl |
| Consumer organization registration request is rejected | Consumer organization admin   | Reject organization registration request - subject   | organisation_reject.text.tmpl  | organisation_reject.html.tmpl  | organisation_reject.tmpl  |
| New admin account is created                           | Admin                         | Welcome email for admins - subject                   | welcome_admin.text.tmpl        | welcome_admin.html.tmpl        | welcome_admin.tmpl        |
| New developer account is created                       | Developer                     | Welcome email for developers - subject               | welcome_dev.text.tmpl          | welcome_dev.html.tmpl          | welcome_dev.tmpl          |


### Behavior of Welcome and Activation Emails

When creating a user account from the admin UI or via [the admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api">}}), an admin user can create the user account as active or inactive.
The behavior of activation emails varies depending on whether the user account is activated upon creation:
- If the user account is created as inactive, the portal will send the welcome email. Then, upon activation of the user account, it will send the activation email.
- If the user account is created as active, the portal will only send the welcome email and will suppress the activation email.

### Modification of Email Templates

To render an email, the portal uses the email templates that are contained inside `/mailers` directory of your active theme.
To modify the templates, as an admin user, you need to download and unzip the theme that you want to modify:
1. Navigate to the Themes menu.
2. Download the theme that you want to modify:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/download-a-theme.png" alt="Download a theme" >}}
3. Unzip the theme and navigate to the mailers folder:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/mailers-folder.png" alt="Mailers folder" >}}
4. Inside the mailer folder there are two types of assets: **layouts** and **templates**:
- The templates define the content for a specific email notification.
- The layouts are responsible for displaying the content of the templates.

#### Layouts

These are three layouts:
* **HTML layout**: emails.html.tmpl.
* **Text layout**: emails.text.tmpl.
* **The default layout**: emails.tmpl.

The HTML and text layout are used to render HTML and plain text content respectively. If the portal fails to find both the HTML and the text templates, it will use the default one.
To display the content of a template, the layout use special keyword `yield`: `{{ yield }}`.

#### Templates

Each event has three email templates:
* **HTML template** is used to display the HTML content in email client.
* **Text template** is used to display the plain text content in email client.
* **Default template** is used when neither HTML nor text templates is presented.

As an admin user, you can modify any of these templates.

#### Applying Changes to Themes

You need to upload the theme to the portal and activate it to make the changes to the email templates effectively:
1. Navigate to the theme folder. Select all the files and compress them:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/compress-a-theme.png" alt="Compress theme" >}}
2. As an admin user, navigate to Theme menu. Select the theme you want to update and upload the theme archive:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/select-a-theme-file.png" alt="Upload a theme" >}}
3. Once the theme archive is selected, click on the Save changes button to upload the archive:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/upload-a-theme.png" alt="Upload a theme" >}}
4. Finally, you need to activate the theme if it's not already active:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/activate-theme.png" alt="Activate a theme" >}}

## Configure User Model

A **Model** in developer portal represents an physical entity. Currenlty, we only have the User model, which represent a user who will be consuming the API by signing up.

In this section, you will learn how to customize the User model and the sign-up form for your API consumers.
Customizing the User model enables the storage of custom data attributes in the User profile.
Additionally, it allows these attributes to be optionally included in the credentials metadata (therefore accessible by the gateway runtime) and exposed in the user sign-up form.

This feature enables the implementation of complex business logic when processing API requests.
For example, it is particularly useful when the quota for API calls needs to be distributed among all developers of consumer organizations.
In such cases, both the quota and the rate limit should be applied at the organization level, rather than according to individual credentials.
In this event, the organization ID should be known to the gateway in runtime. This feature helps to achieve that.

### Add Custom Attributes to the User Model

To customize the User model, navigate to the **Custom attributes** menu and then select the **User** model. Currently, it is possible to extend only the User model. In future releases we will add the same capabilities to other models.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-user-attributes.png" alt="Navigate to the User's attributes" >}}

To add a new attribute to the user model, click on the **Add Custom attribute** button and then fill in properties of the new attribute:
- **Attribute ID**: A string that consists of letters (a-zA-Z), numbers (0-9), dashes, and underscores. This is used to reference the attribute in the [Admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) screen.
- **Attribute Label**: The attribute's name that is displayed in the UI.
- **Description**: Explains the intended usage of this attribute. It is also displayed in the UI.
- **Type of attribute**: The type of data that can be stored in this attribute. You cannot change the value of this field once the attribute is created. The following data types are acceptable:
  - Boolean (true or false).
  - Dropdown (a list of values).
  - String.
  - Number.
- **Validation Reg Exp**: A regular expression that is used to validate the value of this field. It is available for the **String** data type only.
- **Enable validation**: Determines if the portal should apply the regular expression defined in the **Validation Reg Exp** to validate the value of this attribute when creating or updating a user profile. It is available for the **String** data type only.
- **Dropdown Values**: A list of values for the attribute. It is available for the **Dropdown** data type only.
- Fields that define the attribute's behavior:
  - **Write once read many**: Determines whether the value of the attribute can be changed after a user profile is created. This means that when **Write once read many** is enabled, the value of this attribute can be set only during the creation of a user profile. After the user profile is created, the value of this attribute cannot be edited, either through the admin APIs or via the Users UI.
  - **Add to the key metadata**: Determines if the value of the attribute should be added to the metadata of Auth keys or OAuth2.0 clients when a user creates them. Keep in mind that credential-level metadata will be accessible in both the gateway runtime and gateway database. Please be cautious when handling personally identifiable information (PII) data.
  - **Required**: Determines if this attribute is required to create a user profile.
  - **Show on sign-up form**: Determines if this attribute should be visible in the sing-up form.
- **Behavior**: Determines if developers can view or edit this attribute. Possible values are:
  - Developers can view and edit the attribute.
  - Developers can only view the attribute.
  - Developers cannot see the attribute.

For the purpose of this guide, make sure to tick the **Required** and **Show on sign-up form** checkboxes and select the **Developers can only view the attribute** option.
{{< img src="img/dashboard/portal-management/enterprise-portal/add-new-attribute-to-user-model.png" alt="Add a new attribute to the user model" >}}

The new attribute will be added to the user sign-up form, once you have created a new custom attribute and saved changes to the user model by clicking on the **Save** button.
{{< img src="img/dashboard/portal-management/enterprise-portal/custom-attribute-in-the-sign-up-form.png" alt="Customized user sign-up form" >}}

### Default Attributes of User Model
By default, the portal assigns the following attributes to credentials metadata in the gateway when provisioning API credentials:
| Attribute       | Name of the credential metadata field | Description                                                                       |
|-----------------|---------------------------------------|-----------------------------------------------------------------------------------|
| Developer ID    | DeveloperID                           | ID of the developer who created the credential                                    |
| Application ID  | ApplicationID                         | ID of the application to which it belongs                                         |
| Organisation ID | OrganisationID                        | ID of the organization to which the developer who created the application belongs |
| Team IDs        | TeamIDs                               | Array of team IDs to which the developer, who created the application, belongs    |

Additionally, it is possible to include other default attributes of the User model in the credential metadata fields.
However, it is important to remember that metadata at the credential level will be accessible both in the gateway runtime and in the gateway database.
Exercise caution when dealing with personally identifiable information (PII). Additional default attributes include:
| Attribute         | Name of the credential metadata field | Description                                                                         |
|-------------------|---------------------------------------|-------------------------------------------------------------------------------------|
| First name        | First                                 | First name of the developer who created the credential                              |
| Last name         | Last                                  | Last name of the developer who created the credential                               |
| Email             | Email                                 | Email name of the developer who created the credential                              |
| Role              | Role                                  | Array of team IDs to which the developer, who created the application, belongs      |
| Organisation name | Organisation                          | Name of the organization to which the developer who created the application belongs |
| Teams name        | TeamNames                             | Array of team names to which the developer, who created the application, belongs     |

## Configure Webhooks

In this section, you will learn how to configure webhooks for events that occur within the portal.
Webhooks enable asynchronous integration with the portal by notifying third-party software about an event that has occurred.
This feature facilitates the implementation of complex business logic when the portal is integrated with third-party systems such as CRMs and ITSM systems.
Typical use cases for the webhooks include:
- An asynchronous approval that occurs externally (e.g., in a third-party CRM, ITSM, or another system managing approvals). In this scenario, an access request (such as an API product access request, an organization registration request, or a new developer profile in an inactive state) is created in the portal. The portal then informs the third-party system by calling a registered webhook.
- A follow-up action that needs to occur after a specific event in the portal. For example, after a developer profile is created, the customer must create a billing profile in their internal billing system (or a profile in a third-party billing engine such as Moesif, Lago, or a similar service) to automatically update and add this information into custom attributes.

### Create a Webhook in Developer Portal

The configuration process consists of two steps:
- Configure connectivity to the target endpoint by specify the Target URL, HTTP method, timeout, and request headers.
- Select types of events that should be sent to the target endpoint.

1. **Configure the Target Endpoint**

    Each webhook delivers events to the **Target URL** via the specified **HTTP Method**. Additionally, it's possible to configure timeout header for requests.

    Finally, for each webhook it's possible to define HTTP headers that should be used for requests to the target URL via the **Headers** section.
    To add a new header, click on the **Add Headers** button, specify **Name** and **Value** of the header.

    Note that you can test connectivity to the **Target URL** by clicking on the **Test Connection** button.
    For testing connectivity, the portal sends a HEAD request to the specified target endpoint.
    Please note that the connectivity is tested only with the HEAD method, and the test call does not include any headers defined in the **Headers** section.

    {{< img src="img/dashboard/portal-management/enterprise-portal/edp-configure-webhook-channel.png" alt="Create new webhook channel" >}}

    Once the target endpoint is configured, proceed to the next section to select the types of events that should be sent to that endpoint.

2. **Select Event Types for the Webhook**

    To finish configuration, select types of events that should be sent to the **Target URL** and save the changes. Refer the docs below to know more about [supported event types]({{<ref "#supported-portal-events" >}})
    {{< img src="img/dashboard/portal-management/enterprise-portal/edp-select-webhook-events-for-channel.png" alt="Select webhook events" >}}


### Supported Portal Events

The portal fires the following webhook events:
- [UserRegistered]({{< ref "portal/customization#new-user-registered" >}}) when a new user is registered.
- [UserAccountActivated]({{< ref "portal/customization#user-account-activated" >}}) when a user is activated.
- [UserAccountDeactivated]({{< ref "portal/customization#user-account-deactivated" >}}) when a user is deactivated.
- [PasswordReset]({{< ref "portal/customization#password-reset" >}}) when a user tries to reset a password.
- [ApplicationRegistered]({{< ref "portal/customization#new-application-registered" >}}) when a new API consumer application is created.
- [CredentialRegistered]({{< ref "portal/customization#new-credential-is-created" >}}) when a new API credential is created.
- [AccessRequestCreated]({{< ref "portal/customization#new-access-request-created" >}}) when a new API access request is created.
- [AccessRequestApproved]({{< ref "portal/customization#an-access-request-is-approved" >}}) when an API access request is approved.
- [AccessRequestRejected]({{< ref "portal/customization#an-access-request-is-rejected" >}}) when an API access request is rejected.
- [OrganizationRegistered]({{< ref "portal/customization#new-organization-registered" >}}) when an API consumer organization is created.
- [OrganizationRequestCreated]({{< ref "portal/customization#new-organization-registration-request-created" >}}) when a new API consumer organization registration request is created.
- [OrganizationRequestApproved]({{< ref "portal/customization#organization-registration-request-is-approved" >}}) when an API consumer organization registration request is approved.
- [OrganizationRequestRejected]({{< ref "portal/customization#organization-request-is-rejected" >}}) when an API consumer organization registration request is rejected.

The complete list of events and their corresponding payloads is outlined below.

#### New User Registered
This event is fired whenever a new user is created via APIs, the admin UI, and the live portal UI (SSO or invite though the org dashboard or self-registration or invite code). 

Sample payload:
```json
{
    "Event": "UserRegistered",
    "Message": {
        "ID": 29,
        "Email": "developer@user.com",
        "First": "FirstName",
        "Last": "Lastname",
        "OrgID": 1,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T16:38:54.068565+02:00",
        "ByUser": 1,
        "CustomAttributes": [
            {
                "Identifier": "company-name",
                "Value": "ACME"
            }
        ]
    },
    "Timestamp": "2024-04-22T16:38:54.082037+02:00"
}
```

#### User Account Activated
This event is fired whenever a user (either an admin or a developer) account is activated via APIs or the admin UI.

Sample payload:
```json
{
    "Event": "UserAccountActivated",
    "Message": {
        "ID": 7,
        "Email": "devD1@tyk.io",
        "First": "Test",
        "Last": "User",
        "OrgID": 7,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T15:46:40.128398Z",
        "ByUser": 1,
        "CustomAttributes": [
            {
                "Identifier": "boolean-custom-attribute",
                "Value": "false"
            }
        ]
    },
    "Timestamp": "2024-04-22T17:52:22.673077+02:00"
}
```

#### User Account Deactivated

This event is fired whenever a user account is deactivated via APIs or the admin UI.

Sample payload:
```json
{
  "Event": "UserAccountDeactivated",
  "Message": {
    "ID": 7,
    "Email": "test@user.io",
    "First": "Test",
    "Last": "User",
    "OrgID": 7,
    "Provider": "password",
    "Status": "inactive",
    "CreatedAt": "2024-04-22T15:46:40.128398Z",
    "ByUser": 1,
    "CustomAttributes": [
      {
        "Identifier": "boolean-custom-attribute",
        "Value": "false"
      }
    ]
  },
  "Timestamp": "2024-04-22T17:51:22.24066+02:00"
}
```

#### Password Reset

This event is fired whenever a user tries to reset their password.

Sample payload:
```json
{
    "Event": "PasswordReset",
    "Message": {
        "ID": 7,
        "Email": "test@user.io",
        "First": "Test",
        "Last": "User",
        "OrgID": 7,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T15:46:40.128398Z",
        "CustomAttributes": [
            {
                "Identifier": "boolean-custom-attribute",
                "Value": "false"
            }
        ]
    },
    "Timestamp": "2024-04-22T17:58:10.223162+02:00"
}
```

#### New Application Registered

This event is fired whenever a new app is created via APIs, and the live portal UI (either via the checkout or the create app button in the developer’s dashboard).

Sample payload:
```json
{
    "Event": "ApplicationRegistered",
    "Message": {
        "ID": 1,
        "Name": "New App",
        "UserID": 1,
        "CreatedAt": "2024-04-18T13:29:23.738726+02:00"
    },
    "Timestamp": "2024-04-18T13:29:23.744826+02:00"
}
```

#### New Credential Is Created

This event is fired whenever a new credential is created via APIs, the admin UI (creation after approval) and the live portal UI.

Sample payload:
```json
{
    "Event": "CredentialRegistered",
    "Message": {
        "ID": 1,
        "ByUser": 3,
        "AccessRequestID": 1,
        "AppID": 3,
        "CreatedAt": "2024-04-18T13:48:08.489611+02:00"
    },
    "Timestamp": "2024-04-18T13:48:08.494266+02:00"
}
```

#### New Access Request Created

This event is fired whenever a new access request is created via APIs and the live portal UI.

Sample payload:
```json
{
    "Event": "AccessRequestCreated",
    "Message": {
        "ID": 0,
        "AppID": 1,
        "ByUser": 2,
        "Status": "approved",
        "ProductIDs": [
            1
        ],
        "PlanID": 2,
        "CreatedAt": "0001-01-01T00:00:00Z"
    },
    "Timestamp": "2024-04-22T18:09:45.245357+02:00"
}
```

#### An Access Request Is Approved

This event is fired whenever an access request is approved or auto-approved via the admin APIs or admin UI.

Sample payload:
```json
{
    "Event": "AccessRequestApproved",
    "Message": {
        "ID": 1,
        "AppID": 3,
        "ByUser": 3,
        "Status": "approved",
        "ProductIDs": [
            1
        ],
        "PlanID": 2,
        "CreatedAt": "2024-04-18T13:36:02.769109+02:00"
    },
    "Timestamp": "2024-04-18T13:48:08.508925+02:00"
}
```

#### An Access Request Is Rejected

This event is fired whenever an access request is rejected via the admin APIs or the admin UI.

Sample payload:
```json
{
    "Event": "AccessRequestRejected",
    "Message": {
        "ID": 6,
        "AppID": 7,
        "ByUser": 3,
        "Status": "rejected",
        "ProductIDs": [],
        "PlanID": 2,
        "CreatedAt": "2024-04-18T14:40:15.81038+02:00"
    },
    "Timestamp": "2024-04-18T14:40:28.998297+02:00"
}
```

#### New Organization Registered

This event is fired whenever a new consumer organization is created via the admin APIs, the live portal ([the become an organization flow]({{< ref "portal/api-consumer#self-registration" >}})) or the admin UI.

Sample payload:
```json
{
    "Event": "OrganisationRegistered",
    "Message": {
        "ID": 8,
        "Name": "Organisation added from Admin UI",
        "CreatedAt": "2024-04-18T16:12:09.8437+02:00"
    },
    "Timestamp": "2024-04-18T16:12:09.849045+02:00"
}
```

#### New Organization Registration Request Created

This event is fired whenever a new organization request is created via the live portal ([the become an organization flow]({{< ref "portal/api-consumer#self-registration" >}})) or the admin UI.

Sample payload:
```json
{
    "Event": "OrganisationRequestCreated",
    "Message": {
        "Name": "Organisation added from Live Portal (the become an org flow)",
        "AdminEmail": "dev@tyk.io",
        "AdminID": 3,
        "ByUser": 3,
        "TeamIDs": [],
        "Status": "pending",
        "CreatedAt": "2024-04-18T16:13:50.766139+02:00"
    },
    "Timestamp": "2024-04-18T16:13:50.796234+02:00"
}
```

#### Organization Registration Request Is Approved

This event is fired whenever an organization registration request is approved by an admin user.

Sample payload:
```json
{
  "Event": "OrganisationRequestApproved",
  "Message": {
    "ID": 11,
    "Email": "dev@tyk.io",
    "First": "Developer",
    "Last": "User",
    "OrgID": 2,
    "Provider": "password",
    "Status": "inactive",
    "CreatedAt": "2024-04-24T15:26:04.312618088Z",
    "CustomAttributes": []
  },
  "Timestamp": "2024-04-24T15:26:04.329072196Z"
}
```

#### Organization Request Is Rejected

This event is fired whenever a new organization request is rejected by an admin user.

Sample payload:
```json
{
    "Event": "OrganisationRequestRejected",
    "Message": {
        "Name": "ACME",
        "AdminEmail": "dev@tyk.io",
        "AdminID": 17,
        "ByUser": 17,
        "TeamIDs": [],
        "Status": "rejected",
        "CreatedAt": "2024-04-18T16:27:34.012613+02:00"
    },
    "Timestamp": "2024-04-18T16:27:50.504654+02:00"
}
```
