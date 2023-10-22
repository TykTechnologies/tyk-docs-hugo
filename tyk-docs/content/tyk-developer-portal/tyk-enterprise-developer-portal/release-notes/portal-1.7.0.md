---
title: Tyk Enterprise Developer Portal v1.7.0
menu:
main:
parent: "Release Notes"
weight: 7
---

# Release Highlights
## Content blocks validation
We added validation to the content pages. Now when an admin user tries to delete a content block that is necessary to render the page, the portal won’t let them to save the page.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-content-block-validation.png" width=500px alt="Content-block validation">}}

## Audit log capability 
We added capability to enable audit log for any action that changes state of the portal or queries data from the portal. When the audit log is enabled, every action of admin users or developers performed via the UI or an API (only for admin users) will be noted in the audit log. 
To enable the audit log, just specify path to the audit log file and enable it.

To configure the audit log with environment variables, use PORTAL_AUDIT_LOG_ENABLE to enable the audit log and PORTAL_AUDIT_LOG_PATH to specify path to the audit log file:
```shell
PORTAL_AUDIT_LOG_ENABLE=true
PORTAL_AUDIT_LOG_PATH=./audit.log
```

To configure the audit log with the config file, use AuditLog.Enable to enable the audit log and AuditLog.Path to specify path to the audit log file:
```json
  "AuditLog": {
    "Enable": true,
    "Path": "./audit"
  }
```

When specifying path ot the audit file make sure it's mapped to a file on the host machine.

## Capability to limit frequency of access requests
Now admin users can specify how often developers can request access to a specific plan. This way the admins can prevent developers from creating too many keys and abusing their free plan.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-rate-limit-for-access-requests.png" width=500px alt="Access requests frequency limit">}}


# Changelog

## Added
- Added content blocks validation for content pages.
- Added the audit log capability. 
- Added the capability to limit frequency of access requests. 

## Changed
- Disable autocomplete for passwords in the default theme to prevent the access credentials from being stored on the local computer. The stored credentials can be captured by an attacker who gains control over the user's computer.

## Fixed
- Fixed the bug where developers could get access to applications of other developers if they know the app ID.
- Fixed the bug where developers and apps of an organization were not deleted when the organization was deleted.
- Fixed the big where it was possible to remove the default organisation with resulted in the portal being non-operational.

