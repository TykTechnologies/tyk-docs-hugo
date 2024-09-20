---
title: "Templates"
date: 2024-09-18
tags: ["Tyk Developer Portal", "Enterprise Portal", "Templates", "Customization"]
description: |
    Comprehensive guide to customizing the Tyk Enterprise Developer Portal using templates. Covers template
    types, data structures, global helper functions, and email templates to enable full control over portal appearance
    and functionality.
---

# Overview

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
[section]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/edit-manage-page-content" >}})
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

# Template Data

This section outlines the Tyk Enterprise Developer Portal templates that have access to specific template data. 
It's important to note that data availability varies between templates, depending on their context and purpose.
For instance, a product detail template has access to product-specific data that may not be available in a blog listing
template.

## Templates with specific template data

- [Analytics](#analytics)
- [Application Create](#application-create)
- [Application Detail](#application-detail)
- [Blogs](#blogs)
- [Blog Detail](#blog-detail)
- [Cart Checkout](#cart-checkout)
- [Organisation User Detail](#organisation-user-detail)
- [Organisation User Edit](#organisation-user-edit)
- [Organisation Users List](#organisation-users-list)
- [Product Detail](#product-detail)
- [Product OAS Documentation](#product-oas-documentation)

## Analytics

**Template Path**: `themes/default/views/analytics.tmpl`

This template is used to render the analytics page.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .apps }}`: List of available applications

### Application Attributes

Accessible via `{{ range .apps }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Application ID |
| `{{ .Name }}` | Application name |
| `{{ .Description }}` | Application description |
| `{{ .RedirectURLs }}` | Application redirect URLs |

#### Example Usage
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

## Application Create

**Template Path**: `themes/default/views/app_form_create.tmpl`

This template is used to render the application creation form.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)

#### Example Usage
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

## Application Detail

**Template Path**: `themes/default/views/app_form_update.tmpl`

This template is used to render the application detail and update form.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .app }}`: Selected application object.
- `{{ .appCerts }}`: Map of application MTLS certificates if applicable (Key: access request ID, Value: certificate)
- `{{ .allCerts }}`: Map of all MTLS certificates stored if applicable (Key: cert fingerprint, Value: cert)

### MTLS Certificate Attributes (appCerts)

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

### MTLS Certificate Attributes (allCerts)

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Certificate ID |
| `{{ .Name }}` | Certificate name |

### Client Attributes

Accessible via `{{ .app }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Client ID |
| `{{ .Name }}` | Client name |
| `{{ .Description }}` | Client description |
| `{{ .RedirectURLs }}` | Client redirect URLs |
| `{{ .Credentials }}` | Array of client credentials |
| `{{ .AccessRequests }}` | Array of client access requests |

### Client Credentials Attributes

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

### Client Access Requests Attributes

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

### Product Attributes (within Access Request)

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

### Plan Attributes (within Access Request)

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

#### Example Usage
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

## Blogs

**Template Path**: `themes/default/views/blog_listing.tmpl`

This template is used to render the blog listing page.

### Available Objects

- `{{ .posts }}`: List of all published blog posts

### Blog Attributes

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

#### Example Usage
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

## Blog Detail

**Template Path**: `themes/default/views/blog_detail.tmpl`

This template is used to render the blog detail page.

### Available Objects

- `{{ .post }}`: The selected blog post object. 
- `{{ .latest_posts }}`: List of 3 latest blog posts.

### Blog Attributes

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

#### Example Usage
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

## Cart Checkout 

**Template Path**: `themes/default/views/portal_checkout.tmpl`

This template is used to render the cart checkout page.

### Available Objects

- `{{ .cart }}`: Map with the cart items for the current user
- `{{ .apps }}`: List of applications for the current user
- `{{ .catalogue_count }}`: Cart catalogues count
- `{{ .certs }}`: List of MTLS certificates if applicable
- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .provisioned }}`: Boolean indicating whether an access request has been provisioned for the cart

### Application Attributes

Accessible via `{{ range .apps }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Application name |
| `{{ .Description }}` | Application description |
| `{{ .RedirectURLs }}` | Application redirect URLs |

### MTLS Certificate Attributes

Accessible via `{{ range .certs }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Certificate ID |
| `{{ .Name }}` | Certificate name |

### Cart Item Attributes

Accessible via `{{ range $key, $value := .cart }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $value.AuthType }}` | Cart item auth type |
| `{{ $value.Catalogue }}` | Cart item catalogue |
| `{{ $value.Products }}` | Cart item array of products |
| `{{ $value.Plan }}` | Cart item plan |
| `{{ $value.DCREnabled }}` | true if cart order consists of DCR products |

### Plan Attributes (Within cart item)

Accessible via `{{ $plan := $value.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Plan ID |
| `{{ .PlanName }}` | Plan name |
| `{{ .FormatQuota }}` | Formatted quota information |
| `{{ .FormatRateLimit }}` | Formatted rate limit information |

### Catalogue Attributes (Within cart item)

Accessible via `{{ $catalogue := $value.Catalogue }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Catalogue ID |

### Product Attributes (Within cart item)

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

### Auth Type Attributes (Within product)

Accessible via `{{ range $auth_type := $product.AuthTypes }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .AuthType }}` | Auth type |

### DCR Client Template Attributes (Within product)

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


## Organisation User Detail 

**Template Path**: `themes/default/views/user_detail.tmpl`

This template is used to render the organisation user detail page.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .user }}`: The organisation user object.

### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
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

## Organisation User Edit

**Template Path**: `themes/default/views/user_edit.tmpl`

This template is used to render the edit page for organisation user.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .roles }}`: List of possible roles
- `{{ .user }}`: The organisation user object. 

### Role Attributes

Accessible via `{{ range .roles }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Role ID |
| `{{ .DisplayName }}` | Role display name |

### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
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

## Organisation Users List 

**Template Path**: `themes/default/views/user_list.tmpl`

This template is used to render the list of organisation users.

### Available Objects

- `{{ .roles }}`: Map of available roles (Key: role, Value: role display name)

#### Example Usage
```html
<td> {{ index $roles $userInvite.Role }} </td>
{{ end }}
```

## Product Detail 

**Template Path**: `themes/default/views/portal_product_detail.tmpl`

This template is used to render the product detail page.

### Available Objects

- `{{ .product }}`: The selected product object
- `{{ .catalogues }}`: List of catalogue objects including the selected product
- `{{ .unique_plans }}`: List of plan objects available for the product
- `{{ .scopes }}`: Product scopes as an array of strings
- `{{ .posts }}`: List of related blog post objects
- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)
- `{{ .added }}`: Boolean indicating if the product is added to the cart

### Product Attributes

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

### API Details (Within product)

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

### Documentation (Within product)

Accessible via `{{ .product.Docs }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Title }}` | Document title |
| `{{ .ID }}` | Document identifier |
| `{{ .Content }}` | Document content |
| `{{ .MarkdownContent }}` | Markdown content |
| `{{ .MarkdownEnabled }}` | Boolean for Markdown enablement |

### Catalogues

Accessible via `{{ range .catalogues }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Catalogue name |
| `{{ .VisibilityStatus }}` | Catalogue visibility status |

### Plans

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

### Related Posts

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

## Product OAS Documentation 

**Template Paths**: 
- `themes/default/views/product_doc_stoplight_spec.tmpl`
- `themes/default/views/product_doc_redoc.tmpl`

These templates are used to render the OpenAPI Specification (OAS) documentation for a product. The Stoplight Spec and
ReDoc versions are available.

### Available Attributes

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

# Global Helper Functions

This section provides a detailed overview of the global helper functions available in the Tyk Enterprise Developer
Portal templates. These functions are accessible across the public and private templates and allow you to perform
various operations, retrieve specific data, and create dynamic content within your templates.

## Available Functions

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

### CanCreateOrganisation

Returns true if user can create an organisation.

#### Example Usage
```
{{ if CanCreateOrganisation req }}
  ...
{{ end }}
```

### Clients

Returns the list of applications for the current user. Expects the request as argument.

#### Client Attributes

Accessible via `{{ range $client := Clients req }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $client.ID }}` | Client ID |
| `{{ $client.Name }}` | Client name |
| `{{ $client.Description }}` | Client description |
| `{{ $client.RedirectURLs }}` | Client redirect URLs |
| `{{ $client.Credentials }}` | Array of client credentials |
| `{{ $client.AccessRequests }}` | Array of client access requests |

#### Credential Attributes (Within client)

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

#### Access Request Attributes (Within client)

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

#### Product Attributes (Within access request)

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

#### Plan Attributes (Within access request)

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

#### Example Usage
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

### CurrentUser

The `CurrentUser` function returns the current user object if a user is logged in. It expects the request as an argument.

### User Attributes

Accessible via `{{ $user := CurrentUser req }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ $user.ID }}` | User ID |
| `{{ $user.First }}` | User name |
| `{{ $user.Last }}` | User surname |
| `{{ $user.Email }}` | User email |
| `{{ $user.OrganisationID }}` | User organisation ID |
| `{{ $user.DisplayName }}` | User complete name |
| `{{ $user.IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ $user.GetOrganisationID }}` | User's organisation ID |
| `{{ $user.IsAdmin }}` | true if user is an admin |
| `{{ $user.IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ $user.DisplayRole }}` | User's role |

#### Example Usage
```html
{{ $user := CurrentUser req }}
{{ if $user }}
<div class="user-info">
  <h2>Welcome, {{ $user.DisplayName }}!</h2>
  <p>Email: {{ $user.Email }}</p>
  {{ if $user.IsAdmin }}
  <p>You have admin privileges.</p>
  {{ else if $user.IsOrgAdmin }}
  <p>You are an organisation admin.</p>
  {{ else }}
  <p>Your role: {{ $user.DisplayRole }}</p>
  {{ end }}
</div>
{{ else }}
<p>Please log in to view your account information.</p>
{{ end }}
```

### FeaturedProducts

Returns a list of featured products.

#### Product Attributes

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

#### API Details Attributes (Within product)

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

#### Catalogue Attributes (Within product)

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

### FilterUserInvites

Returns a list of users that were invited to the current user's organisation, if the user became an organisation.
Expects the request as a parameter.

#### User Attributes

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

### FormatTime

Formats a given time with a given format.

#### Example Usage
```gotemplate
{{ $user := CurrentUser req }}
{{ if $user}}
{{$time := FormatTime $user.CreatedAt "2 Jan, 2006 at 3:04:00 PM (MST)"}}
<!-- Use $time or other variables here -->
...
{{end}}
```

### GetCart

Returns a map with the cart items for a given user ID. Expects the user ID as an argument. This function is useful for
retrieving and displaying the contents of a user's cart, including detailed information about the products, their
authentication types, and associated templates.

#### Cart Item Attributes

Accessible via `{{ range $key, $value := GetCart $user.ID }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $value.AuthType }}` | Cart item auth type |
| `{{ $value.Catalogue }}` | Cart item catalogue |
| `{{ $value.DCREnabled }}` | true if cart order consists of DCR products |
| `{{ $value.Plan }}` | Cart item plan |
| `{{ $value.Products }}` | Cart item array of products |

### Plan Attributes (Within cart item)

Accessible via `{{ $plan := $value.Plan }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Plan ID |
| `{{ .PlanName }}` | Plan name |
| `{{ .FormatQuota }}` | Formatted quota information |
| `{{ .FormatRateLimit }}` | Formatted rate limit information |

### Catalogue Attributes (Within cart item)

Accessible via `{{ $catalogue := $value.Catalogue }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Catalogue ID |

#### Product Attributes (Within cart item)

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

#### DCR Client Template Attributes (Within product)

Accessible via `{{ range $template := $product.Templates }}`

| Attribute | Description |
|-----------|-------------|
| `{{ .ID }}` | Template ID |
| `{{ .Name }}` | Template name |
| `{{ .GrantType }}` | Template grant type |
| `{{ .ResponseTypes }}` | Template response types |
| `{{ .TokenEndpointAuthMethod }}` | Template token endpoint auth method |
| `{{ .OktaAppType }}` | Template Okta app type |

#### Example Usage
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

### GetCatalogueList

Returns a list of catalogue names. Expects the request as parameter.

#### Example Usage
```gotemplate
{{ range $key, $value := GetCatalogueList req }}
<option value="{{ $key }}" {{ if eq $value.Selected true }} selected {{ end }}>{{ $value.Name }}</option>
{{ end }}
```

### GetCataloguesForProduct

Returns a list of products for a given user and product ID. Expects the request, a user and a product ID as parameters.

#### Catalogue Attributes

Accessible via `{{ range GetCataloguesForProduct req $user $product.ID }}` 

| Attribute | Description |
|-----------|-------------|
| `{{ .VisibilityStatus }}` | Catalogue visibility status |
| `{{ .Name }}` | Catalogue name |

#### Example Usage
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

### GetClientDescription

Returns an application description given a credential ID.

#### Example Usage
```
{{ range $app.Credentials }}
...
{{ GetClientDescription .ID}}
{{end}}
```

### GetClientName

Returns an application name given a credential ID.

#### Example Usage
```
{{ range $app.Credentials }}
...
{{ GetClientName .ID}}
{{end}}
```

### GetMenus

Returns a map of all [menus]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/menus-customisation" >}}).

#### Example Usage
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

### GetProducts

Returns the list of products for the current user. Expects the request as an argument.

#### Product Attributes

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

#### API Details Attributes (Within product)

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

#### Catalogue Attributes (Within product)

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

### IsPortalDisabled

Returns true (exception: for admins is always enabled) if portal visibility was set to hidden. Expects the request as
parameter.

#### Example Usage
```
{{ $portalDisabled := IsPortalDisabled req }}
```

### IsPortalPrivate

Returns true (exception: for admins is always enabled) if portal visibility was set to private. Expects the request as
parameter.

#### Example Usage
```
{{ $portalPrivate  := IsPortalPrivate req }}
```

### ProductDocRenderer

Returns the configured product OAS renderer (redoc or stoplight).

#### Example Usage
```
{{ $oas_template := ProductDocRenderer }}
```

### ProviderUpstreamURL

Returns the provider upstream URL for a given providerID. Expects the request and a provider ID as parameters.

#### Example Usage
```
{{ $upstreamURL := ProviderUpstreamURL req $thisProduct.ProviderID }}
```

### SplitStrings

Splits a given string with given separator and returns a slice of split strings.

#### Example Usage
```
{{ range $app.Credentials }}
...
{{ range SplitStrings .GrantType "," }}
...
{{ end }}
{{ end }}
```

### TruncateString

Truncates a given string to a given length, returning the truncated string followed by three dots (…).

#### Example Usage
```
{{ TruncateString $api.Description 60 }}
```

### TypeOfCredential

Returns the credential type ("oAuth2.0" or "authToken") given the credential.

#### Example Usage
```
{{ range $app.Credentials }}
...
{{ if eq (TypeOfCredential . ) "oAuth2.0" }}
...
{{ end }}
{{end}}
```


# Email Templates

This section provides a detailed overview of the email template data available in the Tyk Enterprise Developer Portal. 
The Tyk Enterprise Developer Portal uses a variety of email templates for different purposes, such as user registration
and access request status or organisation status updates. Each template has access to specific data or functions relevant
to its purpose.

It's important to note that while email templates can include template data or specific template functions, they do not
have access to the global helper functions available in other portal templates.

Please refer to [email workflow]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization" >}})
for additional detail on email notifications sent by the portal.


## Available Email Templates

- [Access Request Approve/Reject](#access-request-approvereject)
- [Access Request Submitted](#access-request-submitted)
- [Activate and Deactivate](#activate-and-deactivate)
- [New User Request](#new-user-request)
- [Organisation Approve](#organisation-approve)
- [Organisation Reject](#organisation-reject)
- [Organisation Request](#organisation-request)
- [Reset Password](#reset-password)
- [Targeted Invite](#targeted-invite)
- [Welcome User](#welcome-user)

### Access Request Approve/Reject

**Template Paths**: 
- `themes/default/mailers/approve.tmpl`
- `themes/default/mailers/reject.tmpl`

These templates are used for sending notifications to users when their access requests are approved or rejected.

#### Available Objects

There's no data sent to these templates.

#### Example Usage
```
Hi,
The API Credentials you provisioned have been rejected.
Thanks,
The Team
```

### Access Request Submitted

**Template Path**: `themes/default/mailers/submitted.tmpl`

This template is used for notifying administrators about pending access requests.

#### Available Objects

- `{{ .requests }}`: Returns the list of access requests pending approval.

#### Access Request Attributes

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

#### Product Attributes (within Access Request)

Accessible via `{{ range $product := $acreq.Products }}`

| Attribute | Description |
|-----------|-------------|
| `{{ $product.ID }}` | Product ID |
| `{{ $product.Name }}` | Product name |
| `{{ $product.DisplayName }}` | Product display name |
| `{{ $product.Description }}` | Product description |
| `{{ $product.AuthType }}` | Product authentication type |
| `{{ $product.DCREnabled }}` | Indicates if DCR (Dynamic Client Registration) is enabled for the product |

#### Example Usage
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


### Activate and Deactivate

**Template Paths**: 
- `themes/default/mailers/activate.tmpl`
- `themes/default/mailers/deactivate.tmpl`

These templates are used for sending activation and deactivation notifications to users.

#### Available Objects

- `{{ .name }}`: Returns the user's full name.

#### Example Usage
```
Hi, <strong>{{.name}}</strong><br/>
Your account has been activated.
```

### New User Request

**Template Path**: `themes/default/mailers/newuser.tmpl`

This template is used for notifying administrators about new user registration requests pending activation.

#### Available Objects

- `{{ .user }}`: Returns the new user pending activation.

### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ .DisplayRole }}` | User's role |
| `{{ .Organisation.Name }}` | Organisation name |
| `{{ .Teams }}` | Array of user teams |
| `{{ .Teams.ID }}` | Team ID |
| `{{ .Teams.Name }}` | Team name |
| `{{ .Teams.Default }}` | Indicates if the team is the default team (true/false) |

#### Example Usage
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

### Organisation Approve

**Template Path**: `themes/default/mailers/organisation_request.tmpl`

This template is used for notifying users that their organisation creation request has been approved.

#### Available Objects

- `{{ site }}`: Returns the application host.

#### Example Usage
```
Hello,
The organisation registration request has been approved. You can now manage your organisation in your dashboard here: https://{{.site}}/portal/private/dashboard
Thanks,
The team
```

### Organisation Reject

**Template Path**: `themes/default/mailers/organisation_reject.tmpl`

This template is used for notifying users that their organisation creation request has been rejected.

#### Available Objects

There's no data sent to this template.

#### Example Usage
```
Hello,
The organisation registration request has been rejected.
Thanks,
The team
```

### Organisation Request

**Template Path**: `themes/default/mailers/organisation_request.tmpl`

This template is used for notifying administrators about new organisation creation requests.

#### Available Objects

- `{{ .user }}`: Returns the user who made the request. 
- `{{ .organisationName }}`: Returns the new organisation name.

### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ .DisplayRole }}` | User's role |

#### Example Usage
```
There is a new organisation registration request pending. Please approve it from the admin console.
The organisation name: {{ .organisationName }}.
The user: {{ .user.DisplayName }} ({{ .user.Email }}).
```

### Reset Password

**Template Path**: `themes/default/mailers/auth/reset_password.tmpl`

This template is used for sending password reset emails to users.

#### Available Functions

- `{{ current_user }}`: Returns the current user object.
- `{{ reset_password_url }}`: Returns the URL with the token for setting the password.

#### User Attributes

Accessible via `{{ current_user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .Role }}` | User role |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ .DisplayRole }}` | User's role |

#### Example Usage
```
{{ $user := current_user}}
<p>Hello {{ $user.DisplayName }},</p>
<p>Someone has requested a link to change your password. You can do this through the link below.</p>
<p>{{reset_password_url}}</p>
<p>If you didn't request this, please ignore this email.</p>
<p>Your password won't change until you access the link above and create a new one.</p>
```

### Targeted Invite

**Template Path**: `themes/default/mailers/auth/targeted_invite.tmpl`

This template is used for sending targeted invitations to users.

#### Available Functions

- `{{ user }}`: Returns the targeted user object.
- `{{ team }}`: Returns the team name to which the user is being invited.
- `{{ invite_url }}`: Returns the URL with the token for setting the password.

#### User Attributes

Accessible via `{{ user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .Role }}` | User role |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ .DisplayRole }}` | User's role |

#### Example Usage
```html
{{ $u := user }}
Hi, <strong>{{ $u.DisplayName }}</strong><br/>
<p>Someone is inviting you to join {{ if $u.IsAdmin }}as an Administrator{{ else }}the {{ team }} team{{end }}. You can do this through the link below.</p>
<p>{{ invite_url }}</p>
<p>If you didn't request this, please ignore this email.</p>
```

### Welcome User

**Template Paths**: 
- `themes/default/mailers/welcome_admin.tmpl`
- `themes/default/mailers/welcome_dev.tmpl`

These templates are used for sending welcome emails to new users, with separate templates for administrators and developers.

#### Available Objects

- `{{ .user }}`: Returns the user who made the request. Refer to the CurrentUser section for accessible attributes and methods.

### User Attributes

Accessible via `{{ .user }}`

| Attribute/Method | Description |
|-------------------|-------------|
| `{{ .ID }}` | User ID |
| `{{ .First }}` | User name |
| `{{ .Last }}` | User surname |
| `{{ .Email }}` | User email |
| `{{ .OrganisationID }}` | User organisation ID |
| `{{ .DisplayName }}` | User complete name |
| `{{ .IdentityProvider }}` | User provider (Portal or Tyk Identity Broker) |
| `{{ .GetOrganisationID }}` | User's organisation ID |
| `{{ .IsAdmin }}` | true if user is an admin |
| `{{ .IsOrgAdmin }}` | true if user is an organisation admin |
| `{{ .DisplayRole }}` | User's role |
| `{{ .Organisation.Name }}` | Organisation name |
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