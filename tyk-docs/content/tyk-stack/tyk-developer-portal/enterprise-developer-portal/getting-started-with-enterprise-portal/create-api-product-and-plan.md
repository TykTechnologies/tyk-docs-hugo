---
title: "Create API Product and Plans"
date: 2022-02-08
tags: [""]
description: ""
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

When integrating with Tyk, the Tyk policies will be imported into the Developer Portal. Depending on the configuration that’s been set in the policy section, the policy will either be imported as an API Product or a Plan. Read more about [Understanding the portal concepts]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/enterprise-portal-concepts.md" >}}).

- A Tyk Self-Managed [installation]({{< ref "/content/tyk-on-prem/installation/installation.md" >}})
- Tyk Self-Managed [added as a provider]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/with-tyk-self-managed-as-provider.md" >}})
- Have APIs [created in your Tyk installation]({{< ref "/content/getting-started/tutorials/create-api.md" >}})

## Create and import an API product from Tyk

API Products are partitioned policies that provide an ACL but not quota/rate limits.
To create one, assuming you have one or more APIs already created.

1. From your Tyk Self-Managed installation, go to **Policies** and click **Add policy**.
2. Select which APIs you want to add to your API product.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-policy.png" alt="Create a policy" >}}

3. From the **Access Rights** drop-down list, select one or more APIs to include in your policy.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-select-api-to-include-into-policy.png" alt="Add an API into the policy" >}}

4. Under **Global limits and Quota**, select **Enforce access rights**. Ensure **Enforce usage quota** and **Enforce rate limit** are **not** selected.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-enforce-access-rights.png" alt="Enforce access rights" >}}

5. From the **Configurations** tab, add the information needed under name and settings.
6. From the **Tags** tab, a tag can be added to tell the portal this should be imported. If you have specified a specific label in the Provider section within the Developer portal when adding Tyk, the way the portal would know which Policies to import can be specified here.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-tags.png" alt="Add tags to the policy" >}}

7. To import the API Products into the Developer portal, from the Tyk Portal admin app, click **Synchronise**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-sync-with-dashboard.png" alt="Sync with the Tyk Pro" >}}


## Create and import plans from Tyk

Plans are policies that implement rate limit or quota, or both, but do **NOT** include the ACL.
To create a Plan for the developer portal, follow the same steps as for creating an API Product. However, within the Global limits and quota in the Policies, configure the policy as follows:

1. From your Tyk Self-Managed installation, go to **Policies** and click **Add policy**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-policy.png" alt="Create a policy" >}}

2. Select an API, it doesn’t matter which API you select since the purpose of this policy is simply just to control the allowance. However, selecting an API is a required field which means you need to select an API anyway.
3.  Under **Global limits and Quota**, select **Enforce usage quota** and **Enforce rate limit**. Ensure **Disable rate-limiting** and **Unlimited requests** are **not** selected so you can set these limits.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-enforce-quota.png" alt="Enforce quota and rate limit" >}}

4.  To import the plans into the Developer portal, from the Tyk Portal admin app, click **Synchronise**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-sync-with-dashboard.png" alt="Sync with the Tyk Pro" >}}
