---
title: "Template Data in Tyk Enterprise Developer Portal"
date: 2024-08-28
tags: ["Tyk Developer Portal", "Enterprise Portal", "Templates", "Customization", "Template Data"]
description: "Comprehensive guide to template data structures in Tyk Enterprise Developer Portal"
---

This guide outlines the Tyk Enterprise Developer Portal [templates]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/overview" >}}) that have access to specific template data. 

It's important to note that data availability varies between templates, depending on their context and purpose. For instance, a product detail template has access to product-specific data that may not be available in a blog listing template.

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
```
<select id="analytics-overview-select-apps" class="analytics-select-overview">
<option value="0" selected>All apps</option>
{{ range $app := .apps}}
<option value="{{$app.ID}}">
{{$app.Name}}
</option>
{{end}}
</select>
```

## Application Create

**Template Path**: `themes/default/views/app_form_create.tmpl`

This template is used to render the application creation form.

### Available Objects

- `{{ .errors }}`: Map of template errors (Key: category, Value: error message)

#### Example Usage
```
{{ if .errors }}
{{ range $key, $errs := .errors }}
<div class="alert alert-warning cart-error" role="alert">
<i class="tyk-icon tykon tykon-warning "></i>
<div class="alert__content">
<strong>{{$key}}</strong>
<ul>
{{ range $errs }}
<li>{{.}}</li>
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
```
<h1>{{ .app.Name }}</h1>
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
```
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
h1>{{ .post.Title }}</h1>
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

#### Example Usage
```
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

#### Example Usage
```
<h1>User Details</h1>
{{ if .errors }}
{{ range $key, $errs := .errors }}
<div class="alert alert-warning cart-error error-wrapper" role="alert">
<i class="tyk-icon tykon tykon-warning "></i>
<div class="alert__content">
<strong>{{$key}}</strong>
<ul>
{{ range $errs }}
<li>{{.}}</li>
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

#### Example Usage
```
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
## Organisation Users List 

**Template Path**: `themes/default/views/user_list.tmpl`

This template is used to render the list of organisation users.

### Available Objects

- `{{ .roles }}`: Map of available roles (Key: role, Value: role display name)

#### Example Usage
```
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

#### Example Usage
```
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

## Product OAS Documentation 

**Template Paths**: 
- `themes/default/views/product_doc_stoplight_spec.tmpl`
- `themes/default/views/product_doc_redoc.tmpl`

These templates are used to render the OpenAPI Specification (OAS) documentation for a product. The Stoplight Spec and ReDoc versions are available.

### Available Attributes

| Attribute | Description |
|-----------|-------------|
| `{{ .Name }}` | Product name |
| `{{ .Description }}` | Product description |
| `{{ .Path }}` | Product path |
| `{{ .Url }}` | OAS document URL |

#### Example Usage
```
<div class="docs-container">
<div class="card mt-4">
<div class="card-body">
<h3 class="card-title"><a href="/portal/catalogue-products/{{.Path}}">{{.Name}}</a></h3>
<p class="card-text">
{{.Description}}
</p>
</div>
</div>
<div>
<elements-api 
apiDescriptionUrl='{{.Url}}'
router="hash"
layout="responsive"
/>
</div>
</div>
```