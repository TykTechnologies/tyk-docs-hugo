---
title: "Customize Webhooks in Developer Portal"
date: 2025-02-10
keywords: ["Developer Portal", "Tyk", "Customization", "Webhooks"]
description: "How to customize webhooks in developer portal"
aliases:
  - /product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks
---

In this section, you will learn how to configure webhooks for events that occur within the portal.
Webhooks enable asynchronous integration with the portal by notifying third-party software about an event that has occurred.
This feature facilitates the implementation of complex business logic when the portal is integrated with third-party systems such as CRMs and ITSM systems.
Typical use cases for the webhooks include:
- An asynchronous approval that occurs externally (e.g., in a third-party CRM, ITSM, or another system managing approvals). In this scenario, an access request (such as an API product access request, an organization registration request, or a new developer profile in an inactive state) is created in the portal. The portal then informs the third-party system by calling a registered webhook.
- A follow-up action that needs to occur after a specific event in the portal. For example, after a developer profile is created, the customer must create a billing profile in their internal billing system (or a profile in a third-party billing engine such as Moesif, Lago, or a similar service) to automatically update and add this information into custom attributes.

## Create a Webhook in Developer Portal

The configuration process consists of two steps:
- Configure connectivity to the target endpoint by specify the Target URL, HTTP method, timeout, and request headers.
- Select types of events that should be sent to the target endpoint.

1. **Configure the Target Endpoint**

    Each webhook delivers events to the **Target URL** via the specified **HTTP Method**. Additionally, it's possible to configure timeout header for requests.

    Finally, for each webhook it's possible to define HTTP headers that should be used for requests to the target URL via the **Headers** section.
    To add a new header, click on the **Add Headers** button, specify **Name** and **Value** of the header.

    Note that you can test connectivity to the **Target URL** by clicking on the **Test Connection** button.
    For testing connectivity, the portal sends a HEAD request to the specified target endpoint.
    Please note that the connectivity is tested only with the HEAD method, and the test call does not include any headers defined in the **Headers** section.

    {{< img src="img/dashboard/portal-management/enterprise-portal/edp-configure-webhook-channel.png" alt="Create new webhook channel" >}}

    Once the target endpoint is configured, proceed to the next section to select the types of events that should be sent to that endpoint.

2. **Select Event Types for the Webhook**

    To finish configuration, select types of events that should be sent to the **Target URL** and save the changes. Refer the docs below to know more about [supported event types]({{< ref "#supported-portal-events" >}})
    {{< img src="img/dashboard/portal-management/enterprise-portal/edp-select-webhook-events-for-channel.png" alt="Select webhook events" >}}


## Supported Portal Events

The portal fires the following webhook events:
- [UserRegistered]({{< ref "portal/customization/webhooks#new-user-registered" >}}) when a new user is registered.
- [UserAccountActivated]({{< ref "portal/customization/webhooks#user-account-activated" >}}) when a user is activated.
- [UserAccountDeactivated]({{< ref "portal/customization/webhooks#user-account-deactivated" >}}) when a user is deactivated.
- [PasswordReset]({{< ref "portal/customization/webhooks#password-reset" >}}) when a user tries to reset a password.
- [ApplicationRegistered]({{< ref "portal/customization/webhooks#new-application-registered" >}}) when a new API consumer application is created.
- [CredentialRegistered]({{< ref "portal/customization/webhooks#new-credential-is-created" >}}) when a new API credential is created.
- [AccessRequestCreated]({{< ref "portal/customization/webhooks#new-access-request-created" >}}) when a new API access request is created.
- [AccessRequestApproved]({{< ref "portal/customization/webhooks#an-access-request-is-approved" >}}) when an API access request is approved.
- [AccessRequestRejected]({{< ref "portal/customization/webhooks#an-access-request-is-rejected" >}}) when an API access request is rejected.
- [OrganizationRegistered]({{< ref "portal/customization/webhooks#new-organization-registered" >}}) when an API consumer organization is created.
- [OrganizationRequestCreated]({{< ref "portal/customization/webhooks#new-organization-registration-request-created" >}}) when a new API consumer organization registration request is created.
- [OrganizationRequestApproved]({{< ref "portal/customization/webhooks#organization-registration-request-is-approved" >}}) when an API consumer organization registration request is approved.
- [OrganizationRequestRejected]({{< ref "portal/customization/webhooks#organization-request-is-rejected" >}}) when an API consumer organization registration request is rejected.

The complete list of events and their corresponding payloads is outlined below.

### New User Registered
This event is fired whenever a new user is created via APIs, the admin UI, and the live portal UI (SSO or invite though the org dashboard or self-registration or invite code). 

Sample payload:
```json
{
    "Event": "UserRegistered",
    "Message": {
        "ID": 29,
        "Email": "developer@user.com",
        "First": "FirstName",
        "Last": "Lastname",
        "OrgID": 1,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T16:38:54.068565+02:00",
        "ByUser": 1,
        "CustomAttributes": [
            {
                "Identifier": "company-name",
                "Value": "ACME"
            }
        ]
    },
    "Timestamp": "2024-04-22T16:38:54.082037+02:00"
}
```

### User Account Activated
This event is fired whenever a user (either an admin or a developer) account is activated via APIs or the admin UI.

Sample payload:
```json
{
    "Event": "UserAccountActivated",
    "Message": {
        "ID": 7,
        "Email": "devD1@tyk.io",
        "First": "Test",
        "Last": "User",
        "OrgID": 7,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T15:46:40.128398Z",
        "ByUser": 1,
        "CustomAttributes": [
            {
                "Identifier": "boolean-custom-attribute",
                "Value": "false"
            }
        ]
    },
    "Timestamp": "2024-04-22T17:52:22.673077+02:00"
}
```

### User Account Deactivated

This event is fired whenever a user account is deactivated via APIs or the admin UI.

Sample payload:
```json
{
  "Event": "UserAccountDeactivated",
  "Message": {
    "ID": 7,
    "Email": "test@user.io",
    "First": "Test",
    "Last": "User",
    "OrgID": 7,
    "Provider": "password",
    "Status": "inactive",
    "CreatedAt": "2024-04-22T15:46:40.128398Z",
    "ByUser": 1,
    "CustomAttributes": [
      {
        "Identifier": "boolean-custom-attribute",
        "Value": "false"
      }
    ]
  },
  "Timestamp": "2024-04-22T17:51:22.24066+02:00"
}
```

### Password Reset

This event is fired whenever a user tries to reset their password.

Sample payload:
```json
{
    "Event": "PasswordReset",
    "Message": {
        "ID": 7,
        "Email": "test@user.io",
        "First": "Test",
        "Last": "User",
        "OrgID": 7,
        "Provider": "password",
        "Status": "active",
        "CreatedAt": "2024-04-22T15:46:40.128398Z",
        "CustomAttributes": [
            {
                "Identifier": "boolean-custom-attribute",
                "Value": "false"
            }
        ]
    },
    "Timestamp": "2024-04-22T17:58:10.223162+02:00"
}
```

### New Application Registered

This event is fired whenever a new app is created via APIs, and the live portal UI (either via the checkout or the create app button in the developer’s dashboard).

Sample payload:
```json
{
    "Event": "ApplicationRegistered",
    "Message": {
        "ID": 1,
        "Name": "New App",
        "UserID": 1,
        "CreatedAt": "2024-04-18T13:29:23.738726+02:00"
    },
    "Timestamp": "2024-04-18T13:29:23.744826+02:00"
}
```

### New Credential Is Created

This event is fired whenever a new credential is created via APIs, the admin UI (creation after approval) and the live portal UI.

Sample payload:
```json
{
    "Event": "CredentialRegistered",
    "Message": {
        "ID": 1,
        "ByUser": 3,
        "AccessRequestID": 1,
        "AppID": 3,
        "CreatedAt": "2024-04-18T13:48:08.489611+02:00"
    },
    "Timestamp": "2024-04-18T13:48:08.494266+02:00"
}
```

### New Access Request Created

This event is fired whenever a new access request is created via APIs and the live portal UI.

Sample payload:
```json
{
    "Event": "AccessRequestCreated",
    "Message": {
        "ID": 0,
        "AppID": 1,
        "ByUser": 2,
        "Status": "approved",
        "ProductIDs": [
            1
        ],
        "PlanID": 2,
        "CreatedAt": "0001-01-01T00:00:00Z"
    },
    "Timestamp": "2024-04-22T18:09:45.245357+02:00"
}
```

### An Access Request Is Approved

This event is fired whenever an access request is approved or auto-approved via the admin APIs or admin UI.

Sample payload:
```json
{
    "Event": "AccessRequestApproved",
    "Message": {
        "ID": 1,
        "AppID": 3,
        "ByUser": 3,
        "Status": "approved",
        "ProductIDs": [
            1
        ],
        "PlanID": 2,
        "CreatedAt": "2024-04-18T13:36:02.769109+02:00"
    },
    "Timestamp": "2024-04-18T13:48:08.508925+02:00"
}
```

### An Access Request Is Rejected

This event is fired whenever an access request is rejected via the admin APIs or the admin UI.

Sample payload:
```json
{
    "Event": "AccessRequestRejected",
    "Message": {
        "ID": 6,
        "AppID": 7,
        "ByUser": 3,
        "Status": "rejected",
        "ProductIDs": [],
        "PlanID": 2,
        "CreatedAt": "2024-04-18T14:40:15.81038+02:00"
    },
    "Timestamp": "2024-04-18T14:40:28.998297+02:00"
}
```

### New Organization Registered

This event is fired whenever a new consumer organization is created via the admin APIs, the live portal ([the become an organization flow]({{< ref "portal/api-consumer" >}})) or the admin UI.

Sample payload:
```json
{
    "Event": "OrganisationRegistered",
    "Message": {
        "ID": 8,
        "Name": "Organisation added from Admin UI",
        "CreatedAt": "2024-04-18T16:12:09.8437+02:00"
    },
    "Timestamp": "2024-04-18T16:12:09.849045+02:00"
}
```

### New Organization Registration Request Created

This event is fired whenever a new organization request is created via the live portal ([the become an organization flow]({{< ref "portal/api-consumer" >}})) or the admin UI.

Sample payload:
```json
{
    "Event": "OrganisationRequestCreated",
    "Message": {
        "Name": "Organisation added from Live Portal (the become an org flow)",
        "AdminEmail": "dev@tyk.io",
        "AdminID": 3,
        "ByUser": 3,
        "TeamIDs": [],
        "Status": "pending",
        "CreatedAt": "2024-04-18T16:13:50.766139+02:00"
    },
    "Timestamp": "2024-04-18T16:13:50.796234+02:00"
}
```

### Organization Registration Request Is Approved

This event is fired whenever an organization registration request is approved by an admin user.

Sample payload:
```json
{
  "Event": "OrganisationRequestApproved",
  "Message": {
    "ID": 11,
    "Email": "dev@tyk.io",
    "First": "Developer",
    "Last": "User",
    "OrgID": 2,
    "Provider": "password",
    "Status": "inactive",
    "CreatedAt": "2024-04-24T15:26:04.312618088Z",
    "CustomAttributes": []
  },
  "Timestamp": "2024-04-24T15:26:04.329072196Z"
}
```

### Organization Request Is Rejected

This event is fired whenever a new organization request is rejected by an admin user.

Sample payload:
```json
{
    "Event": "OrganisationRequestRejected",
    "Message": {
        "Name": "ACME",
        "AdminEmail": "dev@tyk.io",
        "AdminID": 17,
        "ByUser": 17,
        "TeamIDs": [],
        "Status": "rejected",
        "CreatedAt": "2024-04-18T16:27:34.012613+02:00"
    },
    "Timestamp": "2024-04-18T16:27:50.504654+02:00"
}
```
