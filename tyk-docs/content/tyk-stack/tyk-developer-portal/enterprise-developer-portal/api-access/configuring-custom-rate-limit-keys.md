---
title: "Configuring Custom Rate Limit Keys in Developer Portal"
date: 2025-02-10
tags: ["Developer Portal", "Tyk", "Rate Limit"]
keywords: ["Developer Portal", "Tyk", "Rate Limit"]
description: "How to configure custom rate limit keys in Tyk Developer Portal"
---

## Introduction

The Tyk Enterprise Developer Portal supports custom rate limiting patterns that allow you to apply rate limits based on entities other than just credentials, such as per application, per developer, or per organization. This is particularly useful for B2B scenarios where API quotas need to be shared across multiple developers and applications within an organization.

For detailed information about custom rate limiting concepts and configuration, see the [Custom Rate Limiting]({{< ref "api-management/rate-limit#custom-rate-limiting" >}}) section in the main Rate Limiting documentation.

**Prerequisites**

This capability works with [Tyk 5.3.0]({{< ref "developer-support/release-notes/dashboard#530-release-notes" >}}) or higher.

## Configuring Custom Rate Limit Keys in the Portal

{{< note >}}
**Note**

If you are using Tyk Developer Portal version 1.13.0 or later, you can configure the custom rate limit keys directly from the Developer Portal in the Advanced settings (optional) collapsible section of the Plan's view (by Credentials metadata).
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-advanced-settings.png" alt="Add Plan Advanced Settings" >}}
{{< /note >}}

For general configuration of custom rate limit keys in policies, refer to the [Custom Rate Limiting]({{< ref "api-management/rate-limit#custom-rate-limiting" >}}) documentation.

## Using Custom Rate Limit Keys with the Portal

The Tyk Enterprise Developer Portal facilitates the configuration of various rate limiting options based on a business model for API Products published in the portal.

To achieve this, the portal, by default, populates the following attributes in the credential metadata, which can be used as part of a custom rate limit key:
- **ApplicationID**: The ID of the application to which the credential belongs.
- **DeveloperID**: The ID of the developer who created the credential.
- **OrganisationID**: The ID of the organization to which the developer belongs.

Additionally, it's possible to attach [custom attribute values]({{< ref "portal/customization/user-model#add-custom-attributes-to-the-user-model" >}}) defined in a developer profile as metadata fields to credentials.

When a credential is provisioned by the portal, all the fields described above are added as metadata values to the credential, making them valid options for configuring the rate limit key:

{{< img src="/img/dashboard/portal-management/enterprise-portal/credential-metadata.png" alt="Credential's metadata" >}}

This approach allows the portal to seamlessly apply rate limits based on any combination of the aforementioned fields and other custom metadata objects defined in policies used for plans or products. This is in addition to credentials.

---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

