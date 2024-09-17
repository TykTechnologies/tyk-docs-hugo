---
title: "Template functions"
date: 2024-08-28
tags: [ "Tyk Developer Portal","Enterprise Portal","Templates","Customization","Template Data" ]
description: "Explains template data"
---

This guide provides a detailed overview of the global helper functions available in the Tyk Enterprise Developer Portal [templates]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/overview" >}}). 
Global helper functions are accessible across the public and private templates in the Tyk Enterprise Developer Portal. They allow you to perform various operations, retrieve specific data, and create dynamic content within your templates.

## Global Helper Functions
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
```
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
</div>
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
```
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

#### Example Usage
```
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

### FilterUserInvites

Returns a list of users that were invited to the current user's organisation, if the user became an organisation. Expects the request as a parameter.

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

#### Example Usage
```
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

### FormatTime

Formats a given time with a given format.

#### Example Usage
```
{{ $user := CurrentUser req }}
{{ if $user}}
{{$time := FormatTime $user.CreatedAt "2 Jan, 2006 at 3:04:00 PM (MST)"}}
...
{{end}}
```

### GetCart

Returns a map with the cart items for a given user ID. Expects the user ID as an argument. This function is useful for retrieving and displaying the contents of a user's cart, including detailed information about the products, their authentication types, and associated templates.

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
```
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
{{ end }}
```

### GetCatalogueList

Returns a list of catalogue names. Expects the request as parameter.

#### Example Usage
```
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
```
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
```
{{ if GetMenus.Primary }}
{{ range GetMenus.Primary.Children }}
{{ range .Children }}
<li class="nav-item">
<a class="dropdown-item" href="{{.Path}}">{{.Tag}}</a>
</li>
{{ end }}
{{end}}
{{end}}
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

#### Example Usage
```
{{ range GetProducts req }}
<div class="col-lg-12 card-container">
<div class="card d-flex flex-row {{ if .Logo.URL }}has-logo{{end}}">
{{ if .Logo.URL }}
<img class="card-img-top img-fluid" src='{{.Logo.URL}}' alt="">
{{ end }}
<div class="card-body align-self-center w-100">
<div class="card-title d-flex flex-column justify-content-end align-items-baseline">
<div class="pill-container">
<span class="pill">{{ .AuthType }}</span>
</div>
<h2>{{ .ProductName }}</h2>
</div>
{{if .Description }}
<p class="card-text">{{ .Description }}</p>
{{end}}
</div>
<div class="card-cta d-flex flex-column align-self-center justify-content-between align-items-baseline w-100">
<div>
<a href="/portal/catalogue-products/{{ .Path }}" class="btn btn-secondary">more info</a>
</div>
</div>
</div>
</div>
{{ end }}
```

### IsPortalDisabled

Returns true (exception: for admins is always enabled) if portal visibility was set to hidden. Expects the request as parameter.

#### Example Usage
```
{{ $portalDisabled := IsPortalDisabled req }}
```

### IsPortalPrivate

Returns true (exception: for admins is always enabled) if portal visibility was set to private. Expects the request as parameter.

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

