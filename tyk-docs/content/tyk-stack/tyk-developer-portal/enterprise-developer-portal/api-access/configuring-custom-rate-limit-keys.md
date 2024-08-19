---
title: "Configuring custom rate limit keys"
date: 2022-02-11
tags: ["Tyk Developer Portal","Enterprise Portal", "Rate limit", "Quota"]
description: "How to configure custom rate limit keys with the Enterprise Portal"
menu:
  main:
    parent: "API Access"
weight: 5
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Different business models may require applying rate limits and quotas not only by credentials but also by other entities, e.g. per application, per developer, per organization etc.
For example, if an API Product is sold to a B2B customer, the quota of API calls is usually applied to all developers and their respective applications combined, in addition to a specific credential.

To enable this, Tyk introduced support for custom rate limit keys in [Tyk 5.3.0]({{< ref "product-stack/tyk-dashboard/release-notes/version-5.3.md" >}}). This guide explains how to configure custom rate limit keys.

## Prerequisites for getting started
This capability works with [Tyk 5.3.0]({{< ref "product-stack/tyk-dashboard/release-notes/version-5.3.md" >}}) or higher.

## Configuring custom rate limit keys for policies in Tyk Dashboard
Custom rate limit keys are applied at a policy level. When a custom rate limit key is specified, quota, rate limit and throttling will be calculated against the specified value and not against a credential ID.

To specify a custom rate limit key, add to a policy a new metadata field called `rate_limit_pattern`.
In the value field you can specify any value or expression that you want to use as a custom rate limit key for your APIs.
The `rate_limit_pattern` field supports referencing session metadata using `$tyk_meta.FIELD_NAME` syntax.
In addition, it's possible to concatenate multiple values together using the pipe operator (`|`).

For instance, if you want to specify a rate limit pattern to calculate the rate limit for a combination of developers and plans, where all credentials of a developer using the same plan share the same rate limit, you can use the following expression.
This assumes that the `DeveloperID` and `PlanID` metadata fields are available in a session:

```gotemplate
$tyk_meta.DeveloperID|$tyk_meta.PlanID
```

Here's how it looks like in the Tyk Dashboard UI:

{{< img src="/img/dashboard/portal-management/enterprise-portal/configuring-custom-rate-limit-keys.png" alt="Configuring custom rate limit keys" >}}

<br/>

{{< note success >}}
**Updating credential metadata**

Please note that the custom rate limit key capability uses only metadata objects, such as credentials metadata available in a session.
Therefore, if the `rate_limit_pattern` relies on credentials metadata, this capability will work only if those values are present.
If, after evaluating the `rate_limit_pattern`, its value is equal to an empty string, the rate limiter behavior defaults to rate limiting by credential IDs.

{{< /note >}}

## Using custom rate limit keys with the portal

The Tyk Enterprise Developer Portal facilitates the configuration of various rate limiting options based on a business model for API Products published in the portal.

To achieve this, the portal, by default, populates the following attributes in the credential metadata, which can be used as part of a custom rate limit key:
- **ApplicationID**: The ID of the application to which the credential belongs.
- **DeveloperID**: The ID of the developer who created the credential.
- **OrganizationID**: The ID of the organization to which the developer belongs.

Additionally, it's possible to attach [custom attribute values]({{< ref "product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model#add-attributes-to-the-user-model" >}}) defined in a developer profile as metadata fields to credentials.

When a credential is provisioned by the portal, all the fields described above are added as metadata values to the credential, making them valid options for configuring the rate limit key:

{{< img src="/img/dashboard/portal-management/enterprise-portal/credential-metadata.png" alt="Credential's metadata" >}}

This approach allows the portal to seamlessly apply rate limits based on any combination of the aforementioned fields and other custom metadata objects defined in policies used for plans or products. This is in addition to credentials.
