---
title: "Managing API Access Requests"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Dynamic Client Registration"]
keywords: ["Developer Portal", "Tyk", "Dynamic Client Registration"]
description: "How to provision API Access Requests in Tyk Developer Portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/approve-self-registering-requests
---

## Introduction

API Access Requests are formal requests from API Consumers to access specific API Products and Plans through the Developer Portal. These requests initiate the workflow for granting, or provisioning, API access to users.

### Understanding the Provisioning Request Workflow

When API Consumers discover APIs in your Catalog that they need access to, they initiate a API Access Request through the Live Portal. This request:

- Identifies the specific API Product and subscriptionPlan they want to access
- Specifies which Developer App should receive the access credentials
- Creates an auditable record of the access request

Depending on your configuration, these requests can be processed [automatically]() or require [manual approval]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/approve-requests#manual-approval-workflow" >}}).

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-provisioning-flow.png" >}}


## Requesting Access to an API Product

**API Consumers** can request access to a combination of API Product and Plan from the Catalog(s) presented to them in the Live Portal.

1. From the **Catalogues** page, choose the API Product of interest and select **More info**
2. On the API Product detail page, decide which of the available Plans to subscribe to and select **Access with this Plan**
3. The combination of API Product and Plan will be added to their *cart*
4. Repeat steps 1-3 for all the API Products you want to access
5. Go to the **Cart** using the icon in the top right of the screen
6. Review the selected API Products and Plan
    - all API Products must use the same Authentication method
    - a single subscription Plan will be selected
7. Select which Developer App to associate with the request
    - if approved, the Access Credentials will be stored in this Developer App
    - you can create a new App within the Cart, or select an existing App
8. Select **Submit request**


## Manual Approval Workflow

The manual approval workflow provides API Owners with oversight of all API access. When an API Consumer completes an [access request]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/approve-requests#requesting-access-to-an-api-product" >}}), API Owners receive notification of pending request via [email]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications" >}}) and should then:

1. Navigate to the **API Consumers > Access Requests** page in the Admin Portal
2. Review the request
    - User name
    - Developer App
    - Requested API Products
    - Selected subscription Plan
3. Approve or reject the request from the three dot menu
    - If approved, access is provisioned with credentials issued to the specified Developer App
    - If rejected, access will not be granted
    - API Consumer receives notification of the decision via email


## Automatic Approval Workflow

For trusted users or specific API Products, you can enable automatic approval in the [subscription Plan]({{< ref "portal/api-plans#auto-approve-provisioning-requests" >}}).

To configure automatic approval, the API Owner should:

1. Navigate to the **Plans** page in the Admin Portal
2. Select or create the API Plan that should be automatically approved
3. Set the **Auto approve access request** checkbox
    {{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-requests.png" alt="Auto Approve API provisioning requests" >}}
4. Select **Save changes**

When an API Consumer requests access using this plan, the request will be approved immediately and access credentials provisioned to the Developer App.

{{< note success >}}
**Note**  

Despite automatic approval, a record of the request is maintained in the **API Consumers > Access requests** page in the Admin Portal.
{{< /note >}}


## Notification of Decision

The Dev Portal sends notification to the API Consumer when their request is approved or rejected.

If the [email service]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications" >}}) is configured, then:

- When a request is approved:
    - The system sends an approval notification email to the user
    - The email uses the template "approve" with a configurable subject
    - The notification includes details about the approved access
- When a request is rejected:
    - The system sends a rejection notification email to the user
    - The email uses the template "reject" with a configurable subject

