---
title: Tyk Enterprise Developer Portal v1.1.0
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
API Providers can add [Get started guides]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products.md">}}) to API Products for better developer experiences:
- API Providers can add the Get started guides to API Products to speed-up onboarding of API Consumers.
- API Providers can use HTML or Markdown editors for authoring content for API Consumers such as the Get started guides and blog posts.

## Tags for API Products and blog posts
API Providers can select which blogs posts to display on an API Product page using [the tags feature]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products.md#step-4-add-tags-to-blogs-and-api-products">}}). To achieve that, an API Provider can specify tags for both API Products and blog posts. Blog posts that match tags with an API Product are displayed in the 'Related blog content' section in the API Product page.

## S3 support
We added [S3 support]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_storage">}}) for the portal assets storage (themes, images, OAS files).

# Changelog
## Added
- Added the [organization management capability]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations.md">}}) for API Consumers.
- Added the [Get started guides]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products.md">}}) for API Products
- Added support for [`s3` storage type]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_storage">}}) for the portal's assets storage.
- Added [tags]({{<ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products.md#step-4-add-tags-to-blogs-and-api-products">}}) for API Products and blog posts


## Fixed
- Fixed a bug in the DCR flow when scope from an API Product were not assigned to the oAuth2.0 client.
- Fixed the bootstrap process to print JWT instead of the portal’s internal auth token when bootstrapping the portal.
- The portal hadn't removed plans and products that are fetched from a Tyk Dashboard instance that was disconnected from the portal instance. This fix resolves this problem.