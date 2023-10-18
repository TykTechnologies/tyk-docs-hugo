---
title: Tyk Enterprise Developer Portal v1.2.0
menu:
main:
parent: "Release Notes"
weight: 2
---

# Release Highlights
This release is primarily focused on the better deployment support for Kubernetes and a variety of features to achieve better developer experience.

## Full Kubernetes support
The Tyk Enterprise Developer Portal is now available in Kubernetes and customer can launch it using our [helm charts]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm.md">}}). This feature makes the portal Kubernetes friendly by adding liveness, readiness probes, graceful shutdown, and changing the portal lifecycle so that it’s possible to set an initial user and bootstrap the portal via APIs.

## SSO for API Consumers and admins
API Providers can [configure Single Sign-on]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md">}}) for the Enterprise developer portal so that it’s possible to login developers and admins to the portal user 3rd party IdP.

## API Analytics for API Consumers
This capability enables API Providers to get aggregated statistics about consumption of their APIs using Tyk Pump. In 1.2.0, we enabled the portal to attach the following tags to API Keys and oAuth clients:
- Application (app-XXX, where XXX is the app ID); 
- Organization (org-XXX, where XXX is the org ID).

## Admin API for API Products
This feature enables the admin users to manage API Products:
- List available API Products;
- Change the content and description;
- Add API specs to APIs.

## Add TLS support
This feature enables API Provides to secure the portal with [HTTPs]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_tls_enable">}}).

## Add a config option to set the log level
This new setting allows API Provides to set the [log level]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_log_level">}}) and [format]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_log_format">}}): INFO, DEBUG, ERROR, etc.

# Changelog
## Added
- Added Kubernetes support and [helm charts]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm.md">}}).
- Added [Single Sign-on]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md">}}) for API Consumers and admin users.
- Added organisation and application metadata to auth tokens and oAuth2.0 clients.
- Added Admin APIs for API Products.
- Added [TLS]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_tls_enable">}}) support.
- Added the config option to set the [log level]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_log_level">}}) and [format]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_log_format">}}).


## Fixed
- Fixed copy in the admin application on the Application page.
- Fixes the DCR issue when developer wants to delete an app with two DCR products from different catalogues.  In that case, the client was deleted from IdP but the app is not deleted from the Portal.
- Fixes wrong path to the executable in .service file.