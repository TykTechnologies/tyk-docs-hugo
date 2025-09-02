---
title: "Tyk Deprecation and EOL Policy"
date: 2025-03-11
description: "Official schedule and information regarding Tyk component deprecation and End-of-Life (EOL)."
tags: [ "Deprecation policy", "EOL Policy", "End of Life Policy" ]
---

## Introduction

This page provides important information about the deprecation and End-of-Life (EOL) schedules for various **Tyk components, features, and packages**. Our goal is to keep you informed so you can plan your upgrades effectively and maintain a secure and supported environment.

**Scope:** This policy and the notices on this page apply specifically to software, features, and components developed and distributed by Tyk. While we actively manage and update our external dependencies (like databases, libraries, Go versions), their individual EOL schedules are governed by their respective maintainers and are outside the scope of this specific Tyk deprecation policy.

Currently, this page primarily focuses on Tyk software **packages** (Debian/RPM distributions hosted on packagecloud.io). We will expand this page to include other components or features as their lifecycle status changes. Please consider this a living document and check back periodically for updates.

## Understanding Deprecation and End-of-Life (EOL)

It's crucial to understand the terms we use for the lifecycle of Tyk components and features:

*   **Deprecation:** This marks the phased retirement of a Tyk component or feature.
    *   **What it means:** The component/feature will still be available for a period but will **no longer receive active support, updates, or enhancements** from Tyk.
    *   **Action Required:** Customers are advised to plan and execute an upgrade or migration to the recommended alternative within the specified timeframe (the deprecation window).
    *   **Future State:** Continued use is discouraged as the component/feature will eventually reach its End-of-Life (EOL).

*   **End-of-Life (EOL):** This is the final stage following deprecation.
    *   **What it means:** The Tyk component or feature is **completely removed from the product or service**, or rendered inaccessible.
    *   **Action Required:** After the specified EOL date, the component/feature will no longer be available or functional. All dependencies on it within your systems must be eliminated *before* this date.

*   **Deprecation Window:** This refers to the period between the initial deprecation announcement (when support ceases) and the final End-of-Life (EOL) date when the component/feature is removed or becomes inaccessible.

**Key Distinction:** Deprecation is the *start* of the retirement process (support ends), while EOL is the *end* (removal/inaccessibility).

## Deprecated Packages Schedule & Repository Removal

The table below outlines the lifecycle dates for specific versions of Tyk software **packages** hosted on [packagecloud.io/tyk/](https://packagecloud.io/tyk/).

| Component                 | Deprecation Date (Support Ends) | EOL Date (Package Removal) | Reason                       | Recommended Action             |
| :------------------------ | :------------------------------ | :------------------------- | :--------------------------- | :----------------------------- |
| Gateway & Dashboard < v3.0 | 2023                            | March 15, 2025             | Version reached End-of-Life  | Upgrade to a supported version |
| Pump < v1.6.0             | 2023                            | March 15, 2025             | Version reached End-of-Life  | Upgrade to a supported version |
| Tyk Identity Broker < v1.1.0 | 2023                            | March 15, 2025             | Version reached End-of-Life  | Upgrade to a supported version |
| MDCB < v1.8.2             | 2023                            | March 15, 2025             | Version reached End-of-Life  | Upgrade to a supported version |

*Deprecation Date indicates when support and updates ceased. EOL Date indicates when the package artifact will be removed from the public repository.*

## Plan Your Upgrade

Running outdated software versions can expose your systems to security vulnerabilities and prevent you from benefiting from the latest features, performance improvements, and bug fixes. Components that have passed their Deprecation Date are unsupported.

We strongly recommend upgrading any components that are deprecated or nearing their EOL date to a currently supported version.

*   **Upgrade Guides:** Please consult the official [Tyk Upgrade Documentation]({{< ref "developer-support/upgrading" >}}) for detailed instructions.
*   **Release Notes:** Review the [Tyk Release Notes]({{< ref "developer-support/release-notes/overview" >}}) for information on new features and changes in recent versions.

## Need Assistance?

If you have questions regarding this schedule, require help planning your upgrade strategy, or need specific guidance related to your Tyk deployment:

*   **Contact Tyk Support:** Please reach out to our [Support Team](https://tyk.io/contact) for assistance. We're here to help ensure your upgrade process is as smooth as possible.