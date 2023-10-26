---
title: Tyk Enterprise Developer Portal v1.2.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.2.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.2.0"]
menu:
main:
parent: "Release Notes"
weight: 2
---

# Release Highlights
This release is primarily focused on improved deployment support for Kubernetes and a variety of features to achieve better developer experience.

## Full Kubernetes support
The Tyk Enterprise Developer Portal is now available in Kubernetes and customer can launch it using our [helm charts]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm">}}). This feature makes the portal Kubernetes friendly by adding liveness, readiness probes, graceful shutdown and changing the portal lifecycle so that it’s possible to set an initial user and bootstrap the portal via APIs.

## SSO for API Consumers and admins
API Providers can [configure Single Sign-on]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso">}}) for the Enterprise developer portal so that it’s possible to login developers and admins to the portal user 3rd party IdP.

## API Analytics for API Consumers
This capability enables API Providers to get aggregated statistics about consumption of their APIs using Tyk Pump. In 1.2.0, we enabled the portal to attach the following tags to API Keys and oAuth clients:
- Application (app-XXX, where XXX is the app ID); 
- Organization (org-XXX, where XXX is the org ID).

## Admin API for API Products
This feature provides an API to make it easier for admin users to manage their API Products:
- List available API Products.
- Change the content and description.
- Add link to Open API specification for APIs.

## Add TLS support
This feature enables API Provides to secure the portal with [HTTPs]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_tls_enable">}}).

## Add enhanced logging configuration
This new setting allows API Providers to set the logging [level]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_log_level">}}) and [format]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_log_format">}}). This offers API Providers more control over the logging behaviour of their APIs.

# Changelog

## Added
- Added Kubernetes support and [helm charts]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm">}}).
- Added [Single Sign-on]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso">}}) for API Consumers and admin users so that they can use their IdPs for managing admin users and developers.
- Added organisation and application metadata to auth tokens and OAuth2.0 clients so that API Providers can use Tyk Pump to create aggregated reports based on the metadata from tokens and OAuth2.0 clients.
- Added Admin APIs for API Products to enable API Providers to update API Products using CI/CD pipelines.
- Added [TLS]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_tls_enable">}}) support for the portal's UI.
- Added config options to set the logging [level]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_log_level">}}) and [format]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_log_format">}}). This offers API Providers more control over the logging behaviour of their APIs.


## Fixed
- Fixed grammar in the copy section of the admin application on the Application page.
- Fixes an issue with DCR that was encountered when a developer deletes an app with two DCR products from different catalogues.  In that case, the client was deleted from IdP but the app was not deleted from the Portal.