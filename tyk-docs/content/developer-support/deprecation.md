---
title: "Tyk Deprecation and EOL Notices"
date: 2025-03-11 # Or today's date
description: "Official schedule and information regarding Tyk component deprecation and End-of-Life (EOL)."
---

## Introduction

This page provides important information about the deprecation and End-of-Life (EOL) schedules for various Tyk components. Our goal is to keep you informed so you can plan your upgrades effectively and maintain a secure and supported environment.

Currently, this page focuses on Tyk software **packages** (Debian/RPM distributions). We will expand this page to include other components or features as their lifecycle status changes. Please consider this a living document and check back periodically for updates.

## Understanding End-of-Life (EOL) and Deprecation Dates

It's crucial to understand the terms we use for component lifecycles, especially as our usage might differ slightly from generic definitions in specific contexts:

*   **End-of-Life (EOL) Date:** This is the date after which a specific version of a Tyk component will **no longer receive updates, security patches, or technical support** from Tyk. Running components beyond their EOL date is not recommended due to potential security risks and lack of support. You should plan to upgrade *before* this date.

*   **Deprecation Date (for Packages):** In the context of the software packages listed in the table below (hosted on [packagecloud.io/tyk/](https://packagecloud.io/tyk/)), the "Deprecation Date" refers specifically to the date when these older package versions **will be removed** from our public package repository. This removal occurs *after* the official EOL date has passed, providing a grace period before the installation artifacts themselves are no longer readily available via the standard package managers.

**Key Difference:** Typically, deprecation signals phasing out *before* EOL. However, for the packages listed here, EOL occurs first (support ends), and the "Deprecation Date" marks the subsequent removal of the package artifact from the repository.

## Deprecated Packages Schedule

The table below outlines the EOL and upcoming removal (Deprecation Date) for specific versions of Tyk software packages hosted on [packagecloud.io/tyk/](https://packagecloud.io/tyk/):

| Component                 | EOL Date | Deprecation Date (Package Removal) | Reason                       | Recommended Action             |
| :------------------------ | :------- | :------------------------------- | :--------------------------- | :----------------------------- |
| Gateway & Dashboard < v3.0 | 2023     | March 15, 2025                   | Version reached End-of-Life  | Upgrade to a supported version |
| Pump < v1.6.0             | 2023     | March 15, 2025                   | Version reached End-of-Life  | Upgrade to a supported version |
| Tyk Identity Broker < v1.1.0 | 2023     | March 15, 2025                   | Version reached End-of-Life  | Upgrade to a supported version |
| MDCB < v1.8.2             | 2023     | March 15, 2025                   | Version reached End-of-Life  | Upgrade to a supported version |

*EOL Date indicates the time support and updates ceased. Deprecation Date indicates when the package artifact will be removed from the public repository.*

## Plan Your Upgrade

Running outdated software versions can expose your systems to security vulnerabilities and prevent you from benefiting from the latest features, performance improvements, and bug fixes.

We strongly recommend upgrading any components that have reached or are nearing their EOL date to a currently supported version.

*   **Upgrade Guides:** Please consult the official [Tyk Upgrade Documentation]({{< ref "developer-support/upgrading" >}}) for detailed instructions.
*   **Release Notes:** Review the [Tyk Release Notes]({{< ref "developer-support/release-notes/overview" >}}) for information on new features and changes in recent versions.

## Need Assistance?

If you have questions regarding this schedule, require help planning your upgrade strategy, or need specific guidance related to your Tyk deployment:

*   **Contact Tyk Support:** Please reach out to our [Support Team](https://tyk.io/contact) for assistance. We're here to help ensure your upgrade process is as smooth as possible.