---
title: "Long Term Support Releases"
date: 2023-12-11
tags: ["FAQ", "Long Term Support", "LTS"]
aliases:
  - /frequently-asked-questions/long-term-support-releases
  - /developer-support/long-term-support-releases/
description: "Long Term Releases and how we support them"
---

Welcome to Tyk's Long Term Support (LTS) Releases page. Here, we'll walk you through the practical aspects of how LTS benefits your business. Explore our approach to stability, understand semantic versioning and learn about our compatibility policies. We'll also cover support for non-LTS components and provide links on upgrading and staying informed about new LTS releases.

## What Makes Long-Term Support (LTS) So Valuable to Our Customers?

Long Term Support describes a release of our Gateway and Dashboard which offers our customers, stability over a 1-2 year period. It also means we are committed to ensure you have uninterrupted service for the lifetime of the long term release. There are many customer benefits in keeping pace with our long term release:

1. **Stability**: Tyk will always strive to avoid issuing its latest release as a long term support release. Instead we prefer to let the release be proven in a production setting before it becomes LTS so we can iron out any rare issues.
2. **Security**: Tyk commits that the latest LTS will be secure at the point of release by containing the latest available Go version. This ensures Go related security issues are minimized.
3. **Functional Richness**: There will always be great capability contained in out latest LTS which moves your game on in terms of workflows.
4. **Continuation of Service**: We will patch the LTS version every 7 weeks for the period it remains in full support.

In summary, LTS releases are stable minor or patch releases that are suitable for production use.

{{< note success >}}
Our current long term support release is 5.3 LTS. This is in full support from May 2024 to May 2025. This release will enter maintenance support until May 2026. Our next long term support release will be announced end of April 2025.
{{</ note >}}

---

## What Is Our LTS Offering?

We provide full support for the first 12 months, including regular maintenance intervals every seven weeks. Following this period, we transition to maintenance support for an additional 12 months, focusing on critical fixes and essential security patching as needed.

We release a new Gateway LTS version every 12 months which includes the [latest stable Golang version](https://go.dev/dl/).

The advantages of a 12-month Long-Term Support (LTS) window include:

1. It allows us to keep pace with Golang versions and other key dependency upgrades, which keeps both our customers and your customers safe (low CVE).
2. It allows us to bring you the best capability whilst offering stability.
3. It allows us to get great product insight and use that to improve the product.

In case there's a need to operate on a version beyond the established LTS policy, potential assistance may be available. However, this requires a discussion with your designated Account Manager.

| Version | Full Support Window | Maintenance Support Window | Completely Unsupported From |
| ---- | ---- | ---- | ---- |
| 5.0 LTS | April 2023 - April 2024 | May 2024 - April 2025 | May 2025 |
| 5.3 LTS | May 2024-May 2025 | June 2025 - May 2026 | June 2026 |
| LTS+1 (version TBC) | April 2025 - April 2026 | May 2026 - April 2027 | May 2027 |

---

## What About Non LTS Gateway Releases?

While we maintain a regular release schedule, it's important to clarify that these releases do not fall under the Long Term Support (LTS) category. They introduce new capabilities, appealing to teams seeking the latest features upon release. However, these specific features become part of the subsequent LTS release.

Although these releases receive support, it's essential to note their limited support duration, extending only until the arrival of the subsequent release that supersedes them. For users prioritizing stability and consistent patching, the LTS releases offer a more suitable choice.

---

## Major / Minor / Patch - How Do We Decide?

We know that an LTS release which has a major semantic version is not a desirable practice.

So, we will always endeavor to avoid shipping major versions, especially major versions as LTS releases. However, sometimes it is unavoidable and we have to ship a major version. 

Our first commitment to you is to make our definitions of major / minor / patch transparent:

#### Major Version

The major version is designated as X.0 and is defined by one or more of the following:

1. Breaking changes to Tyk APIs, including Tyk Gateway API, Tyk Dashboard API, MDCB, Tyk EDP and any other component which exposes APIs. Changes include not just the endpoints, but also behavior and functionality, schemas, input parameters, return error codes and messages. The APIs are documented and published as an OpenAPI Spec document. In case we need to introduce breaking changes, we will create a new version for the API. However, currently none of Tyk APIs are versioned.
2. Breaking changes to Tyk custom plugins interfaces, breaking plugin compiler for customer Go plugins after plugins have been recompiled.
3. Breaking changes in the config files in all Tyk components, fields in the config files, environment variables used by Tyk components, APIs (function calls) of Tyk middleware, Go template interface.
4. Deprecation of existing functionality or engines that breaks a key business process.
5. Crypto deprecations.
6. Changes to common names in certificates.

In summary, breaking changes involves anything with which a user interacts with a Tyk product and might have to make changes to maintain functionality in response to a change we implement. Subsequently, breaking changes are introduced in a major version, in accordance with the *Semantic Versioning* [specification](https://semver.org/).

#### Minor Version

According to the *Semantic Versioning* [specification](https://semver.org/), a MINOR version is incremented when you add functionality in a backwards compatible manner. In other words, if Tyk makes changes to your software that do not break any existing functionality, you can increment the MINOR version number. For example, if you add new features or capabilities to your software without changing any existing functionality, you can increase the MINOR version number.

#### Patch Version

A patch, sometimes just called a fix, is a small piece of code that's used to correct a problem, usually called a bug, with an operating system or software program.

Patches are software and Operating System (OS) updates that address security vulnerabilities within a program or product. Tyk may choose to release updates to fix performance bugs, as well as to provide enhanced security features.

---

## Compatibility

Tyk has a few different components which can drive questions on what version of X goes with what version of Y.

When we release a new Gateway version, it triggers us to be clear on version compatibility with other areas of the Tyk stack.

As part of the release for the new Gateway LTS version we will commit to show everyone two compatibility dimensions:

1. **Recommended releases** - To ensure you get the most out of the latest Tyk experience, we'll provide information on which versions of different components across the entire stack you need.
2. **Backwards Compatibility** - We'll provide information on what components and versions remain backwards compatible with the new Tyk Dashboard and Tyk Gateway versions.

Our next LTS version will be announced in April 2024.

<!-- COMMENTED OUT UNTIL LTS ANNOUNCED

The table below shows recommended compatibility:

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| x.x LTS | MDCB v2.5     | MDCB v2.4.2 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

The compatibility matrix table shown above will be part of upcoming [Gateway release notes]({{< ref "product-stack/tyk-gateway/release-notes/overview" >}}) for versions x.x and beyond. Additionally, these release notes will list tested third-party dependencies like *PostgreSQL, MongoDB, Redis* and more.
-->

--- 

## How Do I Upgrade and How Can Tyk Help?

We have step by step install guides for various architectures and installation types. Refer to [upgrading tyk]({{< ref "upgrading-tyk" >}}) for further details.

And don't forget, our brilliant Customer Success Teams and Account Managers are here to assist you with any issues - pleases refer to your SLA on the specifics of how we can help!

---

## Keep Me Informed!

We release a new LTS version every 12 months. If you want to be alerted about our next LTS release and what capabilities will be released within it, please sign up to our [mailing list](https://pages.tyk.io/long-term-support).

We will release our preliminary communications a month before the new LTS version gets released.

---

## Support Arrangements for Other Tyk Components

We have established a detailed LTS structure for Tyk Gateway and Tyk Dashboard due to their foundational role in our customers’ infrastructure. However, our support strategy for Tyk Pump, Tyk Identity Broker (TIB), MDCB, and Tyk Operator is tailored to reflect their distinct operational aspects and risk profiles, and is deeply integrated with our LTS model.

These components are often more standalone in nature and are subject to infrequent and minor changes compared to the core products. Therefore, aligning them with the same LTS versioning isn’t necessary or practical. Instead, we employ a continuous delivery model that ensures these components are always updated with the latest improvements and security patches. Our commitment extends beyond version numbers, as we ensure each of these components is thoroughly tested for quality assurance with all active LTS releases of the Gateway and Dashboard.

Ultimately, our diversified support approach aims to balance agility with assurance, offering the most appropriate level of support for each component while minimizing risk and maximizing value for our customers.
To provide the most secure and efficient environment, we advise the following with the release of a new LTS version:

### Developer Portal
Continually evolves with frequent updates. We recommend adopting the latest release for optimal performance and feature set, ensuring consistent user experience and accessibility to the newest enhancements.

### MDCB and Helm
Receive updates synchronized with the core Gateway and Dashboard to support new features and capabilities. These components are mature and updates typically consist of minor iterations.

### Pump, TIB, Sync and Operator
We recommend staying up to date with these components because they are rigorously tested to operate smoothly with the active LTS versions of Tyk Gateway and Tyk Dashboard.

With new releases of Tyk Gateway and Tyk Dashboard LTS versions, our customers should follow the above guidelines to ensure the most secure, stable and efficient environment.
