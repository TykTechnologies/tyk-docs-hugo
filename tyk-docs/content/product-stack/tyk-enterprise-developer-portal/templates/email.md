---
title: "Email Templates Data"
date: 2024-08-28
tags: [ "Tyk Developer Portal","Enterprise Portal","Templates","Customization","Template Data" ]
description: "Explains template data"
---

This guide provides a detailed overview of the email template data available in the Tyk Enterprise Developer Portal. 

The Tyk Enterprise Developer Portal uses a variety of email templates for different purposes, such as user registration and access request status or organisation status updates. Each template has access to specific data or functions relevant to its purpose.

It's important to note that while email templates can include template data or specific template functions, they do not have access to the global helper functions available in other portal [templates]({{< ref "/product-stack/tyk-enterprise-developer-portal/templates/overview" >}}).

## Email Templates
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
```
A new Access request has been submitted, please log in to the administration dashboard to view the request
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
There is a new user request pending please approve it from the admin console<br/>
Id: {{ .user.ID }}<br/>
User: {{ .user.DisplayName }} ({{ .user.Email }})<br/>
Role: {{ .user.Role }} <br/>
{{ if gt .user.OrganisationID 0 }}
Organisation: {{ .user.Organisation.Name }} <br/>
{{ else }}
Organisation: Administrators' organisation <br/>
{{end}}
{{ if gt (len .user.Teams) 0 }}
Teams: <br/>
<ul>
{{ range .user.Teams }}
li>{{.Name}}</li>
{{ end }}
</ul>
{{ else }}
Teams: none
{{end}}
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
```
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

#### Example Usage
```
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