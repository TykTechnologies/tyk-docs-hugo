---
title: "Configure Audit Logs in Tyk Cloud"
tags: ["Audit Logs", "Tyk Cloud", "Control Plane", "Data Plane"]
description: "Learn how to set up and manage audit logs in Tyk Cloud Control Plane deployments."
---

## Introduction

Tyk Cloud provides comprehensive audit logging capabilities to track and monitor all administrative actions performed within your Tyk Dashboard. This feature is essential for compliance and security.

## What are Audit Logs?

Audit logs capture detailed records of all requests made to endpoints under the `/api` route in your Tyk Dashboard. These logs include information about:

- User actions and administrative operations
- API changes and configurations
- Authentication and authorisation events
- System access and modifications
- Response status codes and timestamps

## Enabling Audit Logs for Control Plane Deployments

{{< note success >}}**Note**

The audit log feature is available for Control Plane versions v5.7.0 or later.
{{< /note >}}

### How to Enable Audit Logging

1. **Contact Your Account Manager**: Audit logging must be enabled at the subscription level. Reach out to your Tyk account manager to add this feature to your plan.

2. **Enable via Tyk Cloud UI**: Once the feature is available in your subscription, you can enable audit logging directly from the Tyk Cloud console:
   - Navigate to your Control Plane deployment
   - Select **Edit** from the deployment options
   - Enable the **Audit Logging** option
   - Save and redeploy your Control Plane

Audit logs will be stored in your Control Plane's database for easy access and management.

### Viewing and Accessing Audit Logs

Once audit logging is enabled, you can retrieve the logs via the Tyk Dashboard API. 

For details on the API endpoints and usage, see [Retrieving Audit Logs via API]({{< ref "api-management/dashboard-configuration#retrieving-audit-logs-via-api" >}}).

## Storage Size Caps

Tyk Cloud enforces audit log storage size caps based on your subscription terms:

- **Storage Limits**: A size cap is applied to audit logs based on your subscription plan
- **Automatic Cleanup**: When the storage limit is reached, the oldest logs are automatically removed to make space for new entries.

