---
title: Tyk Enterprise Developer Portal v1.8.4
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.4
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.4"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 5 Mar 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


## Release Highlights
The 1.8.4 release addresses ten high-priority bugs and vulnerabilities, and introduces multiple improvements to experience of admins in the portal's admin app.

## Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.4/images/sha256-4dd01c11b79f46a06934b0b0ea8d3bbb63835bd31953eccd896481aa4d9cfe56?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.4)

## Changelog
#### Added
- Added [new configuration option]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for setting the `SameSite` attribute on the portal's cookie.
- Added [new welcome email for admin users]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) that is sent when new admin account is created.
- Added [new welcome email for developers]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) that is sent when new developer account is created.
- Added a fallback mechanism for referencing assets. This searches for assets, such as images, referenced in the rich text editor or markdown editor. It searches the container's filesystem whenever the portal can't find the referenced asset in the `PORTAL_STORAGE`.

#### Changed
- Changed the title for the subject of the new developer registration request from "Registering email - subject" in the settings UI to "Developer Registration Approval Request - Subject" to better reflect the context in which this email is used.
- Adjusted the portal's behavior for saving pages through the admin API or the Pages UI. Now, if a content block referenced in a template is absent in the page using that template, the portal will ignore this issue instead of preventing the page from being saved. When rendering the respective page, any missing content blocks will be filled with empty strings.
- Changed title for the portal's private pages for better SEO performance:

| URL                          | Page title             |
|------------------------------|------------------------|
| /portal/private/analytics    | Analytics              |
| /portal/private/dashboard    | Dashboard              |
| /portal/private/apps/        | Create an application  |
| /portal/private/apps/:id     | Applications           |
| /portal/private/users        | Users                  |
| /portal/private/organisation | Create an organisation |
| /portal/private/users/invite | Invite a user          |
| /portal/private/users        | Users                  |
| /portal/private/users/:id    | Users                  |
| /portal/private/profile      | Profile                |
| /auth/password/login         | Developer portal login |
| /auth/password/new           | Password reset         |
- Changed the credential provisioning flow to automatically include DeveloperID, OrganisationID, ApplicationID, and TeamIDs in [the credential metadata]({{< ref "/product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model#default-attributes" >}}).
- Added warning regarding potential PII exposure to the [custom attributes menu]({{< ref "/product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model#default-attributes" >}}).
- Changed the behavior of the portal for 404 errors. Now whenever a user requests non-existing page both private (e.i. requiring sign-in to access) or public, the portal now always renders the `not_found.tmpl` template.
- Changed the behavior of the `Secure` cookie attribute that is set by [PORTAL_SESSION_SECURE]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_session_secure" >}}) so that the `Secure` attribute is always add to the `Set-Cookie` header whenever `PORTAL_SESSION_SECURE` is set to `true` or when TLS is enabled.
- Changed the behavior of removing a developer profile within the developers UI in the admin app. Now, when an admin tries to remove a developer profile and some of their credentials have been removed from the credentials provider, or if the provider itself is down or unreachable, the portal asks the admin if they still want to remove the developer profile by displaying a modal window.
- Extended the `DELETE /users/:id` API endpoint by adding the [?force]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) query parameter to force removal of a user even if some of their credentials have been removed from the credentials provider, or if the provider itself is down or unreachable.
- Extended the `GET /pages/:id/content-blocks/:id:` API endpoint by adding additional fields in the response body: `Content`, `MarkdownContent`, `MarkdownEnabled`, `Name`, and `PageID`.
- Extended [filesize limit]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-1-create-a-new-theme" >}}) for individual files in themes to 5 MB.
- Made the organisation invite email's subject configurable via [the emails settings section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization#list-of-email-notifications" >}}).

#### Fixed
- Fixed the bug where it was impossible to create an ordered list in the rich text editor in the admin app due to CSS issues.
- Fixed the bug where it was possible to copy the 'portal-session' cookie and use it with different IP address or browser.
- Fixed the bug where the audit log didn't reflect some actions initiated by admin users and developers.
- Fixed the bug where sensitive data such as hashed API tokens and passwords were exposed in the audit log.
- Fixed the bug where menu items were still persistent after deletion.
- Fixed the bug where admin users couldn't edit custom attributes created after a user profile is created.
- Fixed the bug where the UI errors when uploading theme were not consistent with the API error messages.
- Fixed the bug where scroll appeared in the API description box in the API Product page when the API description was longer than 50 symbols.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
