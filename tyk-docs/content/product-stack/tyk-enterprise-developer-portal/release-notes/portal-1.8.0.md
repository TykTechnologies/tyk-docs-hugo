---
title: Tyk Enterprise Developer Portal v1.8.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

### Support Lifetime
We strive to avoid any long term support arrangements for our enterprise portal. We run a regular 6 week release cadence which delivers new capability, extension of existing capability, and bug fix. Our policy is that we aim to avoid any breaking changes, so in effect the entire enterprise portal is supported. Here we'd increment our version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

Occasionally, we may see a need to issue a critical fix if there is a systems down or a critical security defect. Here we would release this as soon as is physically possible and the semantic versioning would reflect a patch (1.3.1, 1.4.1 etc).

The only exception to this policy is if we ever need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After the six months is up, the previous major version falls out of support.

##### Release Date 24 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.7.0 or an older version we advise you to upgrade ASAP directly to this release.

# Release Highlights
## Custom attributes for the User model and the sign-up form customization
We added capability to add additional data fields to the User model and set their behaviour. This way API Providers can:
Extend the User model with additional fields of one of four types:
  - String
  - Number
  - List of strings
  - Boolean
- Configure behaviour of those fields:
  - Add the new data fields to the user sign-up form
  - Force the portal to add the fields to the key metadata to make them available to custom plugins during API calls
  - Make the fields required or optional and lock them once a user profile is created
- Set visibility and access rights for the custom data fields:
  - Determine if developers can view the fields or are they restricted to only admin users?
  - Can developers edit the fields?

All settings are available via the [admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api.md" >}}) and the UI.

To create a custom attribute, define it in the custom attributes menu:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-create-custom-attribute.png" width=500px alt="Create a custom attribute for the User model">}}

This is how it looks like in the user sign-up form:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-sign-up-form.png" width=500px alt="The user sign-up form with the custom attribute">}}

## CORS settings
In this release we introduced the config options to set up CORS settings such as:
- Allowed origins
- Allowed headers
- Allowed methods
- Are credentials (cookie or client side certificates) allowed?
- max age of the preflight request cache

These settings are useful when the portal sits behind a proxy or a CDN and the portal admin needs to configure the CORS settings on the portal side so that the incoming call from a third party origin (e.g. a CDN or a proxy) are not rejected by browser.
To set the CORS configuration please refer to the Portal's [configuration documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#cors-settings" >}}).

## Connection testing to OAuth2.0 Identity providers
We enhanced our OAuth2.0 support by adding the capability to test connections to OAuth2.0 Identity providers (IdPs) when setting up OAuth2.0 with the Tyk Enterprise Developer Portal.
This way, you can make sure the Portal has connectivity with the IdP before saving the OAuth2.0 settings and creating the first OAuth2.0 client.

{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-test-idp-connectivity.png" width=500px alt="Test connectivity to an IdP">}}

## Verbose logs for the DCR flow
In addition to the new connection testing functionality, we added one more tool to help customer's resolve complex integration issues when integrating with OAuth2.0 providers.
Now when the [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) environment variable is set to `true`, the portal will output not only the status and status code of the request to the IdP, but also actual payload returned by the IdP: 
```json
{"level":"error","time":"2023-10-10T17:02:27.484+0200","caller":"client/dcr-helpers.go:152","message":"IdPResponse: {\"error\":\"insufficient_scope\",\"error_description\":\"Policy 'Allowed Client Scopes' rejected request to client-registration service. Details: Not permitted to use specified clientScope\"}
```

# Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.0/images/sha256-d93fcfbbcc4a72d3f6abf49ce65f234e6e65915a43cca3a30d5376e5fab2d644?context=explore)

# Changelog

## Added
- Added the custom attributes to the User model so that the portal admins can extend the data stored in the user profile and customize the user sign-up form.
- Added the capability to test the connection to OAuth2.0 Identity providers menu to help the portal admin troubleshoot connectivity issues when configuring OAuth2.0 with the portal.
- Added the config options for configuring the CORS settings.

## Changed
- Display an actual item title instead of generic iterative name in the Pages and the Providers UI (e.g. "HeaderButtonLabel" instead of "ContentBlock 1" in the Pages menu).
- When [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) is enabled the portal now returns not only the status and status code of the request to the IdP but also actual payload returned by the IdP

## Fixed
- Fixed the bug where the database credentials were printed in the logs when bootstrapping the portal.
- Fixed the bug where the session cookie was disclosing the username and role.
- Fixed the bug where the [Forgot Password page]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/reset-password.md#introduction" >}}) did not reflect the current theme.
- Fixed the bug where the DCR flow failed to create a client with policies managed by Tyk Operator.
- Fixed the bug where an admin user couldn't upload a new theme file in Kubernetes environment.
- Fixed the bug where the portal application went down after running for several hours in Kubernetes environment.
- Fixed the bug where it was possible to remove the default organisation which resulted in the portal being non-operational.
- Fixed the bug where the portal panicked when an IdP is not available while creating a new OAuth2.0 client.
- Fixed the bug where a developer could access API Products regardless of the access rights set by catalogs.
- Fixed the bug where it wasn't possible to change a team for a user.
- Fixed the bug where the error wasn't displayed to an admin user when the theme validation fails while uploading a theme package.
- Fixed the bug where the rich text editor added extra `<p>` tags to the text.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where it wasn't possible to remove an API from an API Product.

# Further Information

## Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

## FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.