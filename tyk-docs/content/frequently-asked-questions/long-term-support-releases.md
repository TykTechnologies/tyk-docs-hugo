---
title: "Long Term Support Releases"
date: 2022-03-11
tags: ["FAQ", "Long Term Support", "LTS"]
description: "Long Term Releases and how we support them"
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

## What is a Tyk Long Term Support (LTS) release

A Tyk LTS release is usually aimed at customers who want predictability and stability. It means that throughout the lifetime of the release, there will be a commitment to update, fix and maintain the elements that are part of the release. Our LTS releases are scheduled for Q1 release annually.

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}

## How do we support LTS releases?

Here’s what you need to know about how we support an LTS release at Tyk:

An LTS release at Tyk is left on production for 3 months in [Hypercare](#what-is-hypercare) - a period immediately after a release where an elevated period of support is available, patches are run based on need and criticality, and single fix patching is done whenever needed. During this period, the release is carefully monitored and anything that needs fixing is fixed then and there to ensure stability.

During the Hypercare period, measures are taken to stabilize the release, and breaking changes are released. All this is done while also aiming for backward compatibility.

After the Hypercare 3 month period, this release is labelled as a recommended release to customers. This is followed by full support for 12 months. This means that the release will be on full support for 15 months.

{{< note success >}}
**Note**  

Minor releases are not a part of the LTS but are fully supported until the next minor release is live. See [How do we support minor releases?](#how-do-we-support-minor-releases)
{{< /note >}}

After 12 months, there is a new LTS release, and the previous version remains in full support for a further 3 months before it moves into [extended support](#what-is-extended-support).

If you are on an LTS release (RX.0), you can directly put any minor release on top of that( RX.1, RX.2, etc) instead of installing the previous version of the minor release.

{{< note success >}}
**Note**  

For exceptional cases, a data migration script run might be required.
{{< /note >}}

## LTS release timetable

| Version | Live          | Becomes Recommended Version | Full Support End Date | Extended Support End Date |
|---------|---------------|-----------------------------|-----------------------|---------------------------|
| R3      | July 2020     | Nov 2020                    | May 2022              | May 2024                  |
| R4      | February 2022 | May 2022                    | May 2023              | May 2024                  |
| R5      | February 2023 | May 2023                    | May 2024              | May 2025                  |
| R6      | February 2024 | May 2024                    | May 2025              | May 2026                  |
| R7      | February 2025 | May 2025                    | May 2026              | May 2027                  |

## What is Hypercare?

Hypercare is a period immediately after a release where an elevated period of support is available. We run patches based on need and criticality, and single fix patching can be done if the severity and impact of a bug denotes that a fix is critical.

## What Is Extended Support?
In the extended support period Tyk will continue to patch any production critical patches and security issues, we will not add new features to the platform during this period.

{{< note success >}}
**Note**  

From R4 onwards, extended support will be for 12 months after the full support end date.
{{< /note >}}

## How do we support minor releases?

We only patch our minor releases (4.1. 4.2, 4.3, etc) until the next minor is out.

### Example for release 4
 - Our next LTS patch release will be 4.0.3, and a minor release (4.1) will have all of the 4.0.3 patches
 - The following LTS patch release will be 4.0.4 and our minor release 4.1 will be patched, becoming 4.1.1
 - The following LTS patch will be 4.0.5 and our minor release 4.1.1 will be patched, becoming 4.1.2
 - The following LTS patch will be 4.0.6 and a new minor release (4.2) will have all of the 4.0.6 patches
 - At this point we stop supporting minor release 4.1 and only patch 4.2
 - This schedule is repeated until our next LTS release