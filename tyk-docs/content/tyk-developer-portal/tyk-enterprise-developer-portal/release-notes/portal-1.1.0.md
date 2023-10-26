---
title: Tyk Enterprise Developer Portal v1.1.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.1.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.1.0"]
menu:
main:
parent: "Release Notes"
weight: 1
---

# Release Highlights
This release introduce a variety of features to improve developer experience. Additionally, we've included support for the S3 storage type as well as some bug fixes.

## Organization management for API Consumers
Now API Consumers can [create organizations]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations">}}) and securely share credentials between their teammates. In greater detail:
- API Consumers can request to upgrade their account to an organizational account.
- API Consumers can invite teammates to their organization and manage their roles.
- API Consumers in the same organization share access credentials so that the API Consumer team will still have access to API credentials even if an admin user is on vacation or left the organization.
- API Providers can configure whether they allow API consumers to request an upgrade to their accounts for an organizational account. 
- API Providers can manually accept, reject or configure to accept all such request to accepted by default.
 
## Get started guides
API Providers can add [Get started guides]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products">}}) to API Products for better developer experiences:
- API Providers can add the **Get started guides** to API Products to speed-up onboarding of API Consumers.
- API Providers can use HTML or Markdown editors for authoring content for API Consumers such as the Get started guides and blog posts.

## Tags for API Products and blog posts
API Providers can select which blogs posts to display on an API Product page using [the tags feature]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products#step-4-add-tags-to-blogs-and-api-products">}}). To achieve that, an API Provider can specify tags for both API Products and blog posts. Blog posts that match tags with an API Product are displayed in the 'Related blog content' section in the API Product page. This offers API Providers greater control over what blog posts to display on their API Product page.

## S3 support
We added [S3 support]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_storage">}}) for the portal assets storage (themes, images, OAS files). This update enhances the extensibility of our platform, allowing you to choose different storage solutions to better align with your specific needs.

# Changelog

## Added
- Added the [organization management capability]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations">}}) for API Consumers to safely share API access credentials between team members.
- Added the [Get started guides]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products">}}) for API Products so that admins can explain to their consumers how use their API Products.
- Added support for [S3 storage]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration#portal_storage">}}) for the portal's assets storage. Now our customers can use `s3` storage in addition to the filesystem which is especially important in Kubernetes environments.
- Added [tags]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products#step-4-add-tags-to-blogs-and-api-products">}}) for API Products and blog posts so that API Providers have greater control over which blog posts to display on their API Product page.


## Fixed
- Fixed a bug in the DCR flow where scopes from an API Product were not assigned to the OAuth2.0 client when creating a new OAuth2.0 client.
- Fixed a bug issue with the bootstrap process to print _JWT_ instead of the portal’s internal auth token when bootstrapping the portal.
- Fixed a bug where plans and products were not removed for Tyk Dashboard instances that were disconnected from the portal instance. Subsequently, after this fix plans and products are only displayed for available Tyk Dashboard instances.