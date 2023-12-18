---
title: Tyk Enterprise Developer Portal v1.7.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.7.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.7.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

### Support Lifetime
We strive to avoid any long term support arrangements for our enterprise portal. We run a regular 6 week release cadence which delivers new capability, extension of existing capability, and bug fix. Our policy is that we aim to avoid any breaking changes, so in effect the entire enterprise portal is supported. Here we'd increment our version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

Occasionally, we may see a need to issue a critical fix if there is a systems down or a critical security defect. Here we would release this as soon as is physically possible, and the semantic versioning would reflect a patch (1.3.1, 1.4.1 etc).

The only exception to this policy is if we ever need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After the six months is up, the previous major version falls out of support.

##### Release Date 6 Oct 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.6.0 or an older version we advise you to upgrade ASAP directly to this release.

## Release Highlights
#### Content blocks validation
We added validation to the content pages. Now when an admin user tries to delete a content block that is necessary to render the page, the portal won’t let them to save the page.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-content-block-validation.png" width=500px alt="Content-block validation">}}

#### Audit log capability 
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

#### Capability to limit frequency of access requests
Now admin users can specify how often developers can request access to a specific plan. This way the admins can prevent developers from creating too many keys and abusing their free plan.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-rate-limit-for-access-requests.png" width=500px alt="Access requests frequency limit">}}

## Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.7.0/images/sha256-1204c9f2d53ac8cbf7230f7c73bd2edb117b33ec11547d595c58264301c9172b?context=explore)

## Changelog

#### Added
- Added content blocks validation for content pages to avoid changes to content pages that result in page render errors.
- Added the audit log capability to track any action that changes state of the portal or queries data from the portal.
- Added the capability to limit frequency of access requests to block any abuse of free plans. 

- Disable autocomplete for passwords in the default theme to prevent the access credentials from being stored on the local computer. The stored credentials can be captured by an attacker who gains control over the user's computer.
#### Changed

#### Fixed
- Fixed the bug where developers could get access to applications of other developers if they know the app ID.
- Fixed the bug where developers and apps of an organisation were not deleted when the organisation was deleted.
- Fixed the bug where it was possible to remove the default organisation with resulted in the portal being non-operational.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.