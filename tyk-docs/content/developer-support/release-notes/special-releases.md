---
title: "Long Term Support Releases"
date: 2023-12-11
tags: ["FAQ", "Long Term Support", "LTS"]
tags: ["FAQ", "Lab Releases", "Special Release"]
tags: ["FAQ", "FIPS Releases", "Special Release - FIPS"]
tags: ["FAQ", "Long Term Support", "LTS"]
aliases:
  - /frequently-asked-questions/long-term-support-releases
  - /developer-support/long-term-support-releases
  - /developer-support/special-releases-and-features/early-access-features
  - /developer-support/special-releases-and-features/fips-release
  - /developer-support/special-releases-and-features/lab-releases
  - /developer-support/special-releases-and-features/long-term-support-releases
  - /frequently-asked-questions/using-early-access-features

description: "Long Term Releases and how we support them"
---

## Long Term Support Releases

Welcome to Tyk's Long Term Support (LTS) Releases section. Here, we'll walk you through the practical aspects of how LTS benefits your business. Explore our approach to stability, understand semantic versioning and learn about our compatibility policies. We'll also cover support for non-LTS components and provide links on upgrading and staying informed about new LTS releases.

### What Makes Long-Term Support (LTS) So Valuable to Our Customers?

Long Term Support describes a release of our Gateway and Dashboard which offers our customers, stability over a 1-2 year period. It also means we are committed to ensuring you have uninterrupted service for the lifetime of the long term release. There are many customer benefits in keeping pace with our long term release:

1. **Stability**: Tyk will always strive to avoid issuing its latest release as a long term support release. Instead, we prefer to let the release be proven in a production setting before it becomes LTS so we can iron out any rare issues.
2. **Security**: Tyk commits that the latest LTS will be secure at the point of release by containing the latest available Go version. This ensures Go related security issues are minimized.
3. **Functional Richness**: There will always be great capability contained in out latest LTS which moves your game on in terms of workflows.
4. **Continuation of Service**: We will patch the LTS version every 7 weeks for the period it remains in full support.

In summary, LTS releases are stable minor or patch releases that are suitable for production use.

{{< note success >}}
Our current long term support release is 5.3 LTS. This is in full support from May 2024 to May 2025. This release will enter maintenance support until May 2026. Our next long term support release will be announced end of April 2025.
{{</ note >}}

---

### What Is Our LTS Offering?

We provide [full support]({{< ref "#full-support" >}}) for the first 12 months, including regular maintenance intervals every seven weeks. Following this period, we transition to [maintenance support]({{< ref "#maintenance-support" >}}) for an additional 12 months, focusing on critical fixes and essential security patching as needed.

We release a new Gateway LTS version every 12 months, which includes the [latest stable Golang version](https://go.dev/dl/).

#### Advantages of a 12-Month Long-Term Support (LTS) Cycle
1. It allows us to keep pace with Golang versions and other key dependency upgrades, which keeps both our customers and your customers safe (low CVE).
2. It allows us to bring you the best capability whilst offering stability.
3. It allows us to get great product insight and use that to improve the product.

In case there's a need to operate on a version beyond the established LTS policy, potential assistance may be available. However, this requires a discussion with your designated *Account Manager*.

#### Support Definitions

##### Full Support {#full-support}

During the full support period, we patch the LTS branch on a regular 7-week cadence. 
These patches may include any of the following:
- Security updates
- Bug fixes
- UX and UI improvements
- Any other necessary changes, regardless of severity level.

##### Maintenance Support {#maintenance-support}

After the initial 12 months of full support, Tyk will release a new LTS version. This means that the previous LTS version now enters maintenance support. In maintenance support, we do not offer regular planned patching. Instead, we will only fix bugs and security issues deemed critical, and this will be a reactive process based on need. If your internal upgrade processes are heavily governed, this may be something you want to take advantage of
If we find something critical we will react immediately and invoke our critical fix process. Generally critical fixes are expressed as a system down with no workaround, or an urgent security issue.

### Current LTS releases Timeline

| Version | Full Support Window | Maintenance Support Window | Completely Unsupported From |
| ------- | ------------------- | -------------------------- | --------------------------- |
| 5.0 LTS | April 2023 - April 2024 | May 2024 - April 2025 | May 2025 |
| 5.3 LTS | May 2024-May 2025 | June 2025 - May 2026 | June 2026 |
| LTS+1 (version TBC) | April 2025 - April 2026 | May 2026 - April 2027 | May 2027 |

---

### What About Non-LTS Gateway Releases?

While we maintain a regular release schedule, it's important to clarify that these releases do not fall under the Long Term Support (LTS) category. They introduce new capabilities, appealing to teams seeking the latest features upon release. However, these specific features become part of the subsequent LTS release.

Although these releases receive support, it's essential to note their limited support duration, extending only until the arrival of the subsequent release that supersedes them. For users prioritizing stability and consistent patching, the LTS releases offer a more suitable choice.

---

### Major / Minor / Patch - How Do We Decide?

We know that an LTS release that has a major semantic version is not a desirable practice.

So, we will always endeavor to avoid shipping major versions, especially major versions as LTS releases. However, sometimes it is unavoidable and we have to ship a major version. 

Our first commitment to you is to make our definitions of major / minor / patch are transparent:

#### Major Version

The major version is designated as X.0 and is defined by one or more of the following:

1. Breaking changes to Tyk APIs, including Tyk Gateway API, Tyk Dashboard API, MDCB, Tyk EDP, and any other component that exposes APIs. Changes include not just the endpoints, but also behavior and functionality, schemas, input parameters, return error codes, and messages. The APIs are documented and published as an OpenAPI Spec document. In case we need to introduce breaking changes, we will create a new version of the API. However, currently, none of Tyk APIs are versioned.
2. Breaking changes to Tyk custom plugins interfaces, breaking plugin compiler for customer Go plugins after plugins have been recompiled.
3. Breaking changes in the config files in all Tyk components, fields in the config files, environment variables used by Tyk components, APIs (function calls) of Tyk middleware, Go template interface.
4. Deprecation of existing functionalities or engines that break a key business process.
5. Crypto deprecations.
6. Changes to common names in certificates.

In summary, breaking changes involves anything with which a user interacts with a Tyk product and might have to make changes to maintain functionality in response to a change we implement. Subsequently, breaking changes are introduced in a major version, in accordance with the *Semantic Versioning* [specification](https://semver.org/).

#### Minor Version

According to the *Semantic Versioning* [specification](https://semver.org/), a MINOR version is incremented when you add functionality in a backward compatible manner. In other words, if Tyk makes changes to your software that do not break any existing functionality, you can increment the MINOR version number. For example, if you add new features or capabilities to your software without changing any existing functionality, you can increase the MINOR version number.

#### Patch Version

A patch, sometimes just called a fix, is a small piece of code that's used to correct a problem, usually called a bug, with an operating system or software program.

Patches are software and Operating System (OS) updates that address security vulnerabilities within a program or product. Tyk may choose to release updates to fix performance bugs, as well as to provide enhanced security features.

---

### Compatibility

Tyk has a few different components that can drive questions on what version of X goes with what version of Y.

When we release a new Gateway version, it triggers us to be clear on version compatibility with other areas of the Tyk stack.

As part of the release of the new Gateway LTS version we will commit to showing everyone two compatibility dimensions:

1. **Recommended releases** - To ensure you get the most out of the latest Tyk experience, we'll provide information on which versions of different components across the entire stack you need.
2. **Backwards Compatibility** - We'll provide information on what components and versions remain backward compatible with the new Tyk Dashboard and Tyk Gateway versions.

Our next LTS version will be announced in April 2024.

<!-- COMMENTED OUT UNTIL LTS ANNOUNCED

The table below shows the recommended compatibility:

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| x.x LTS | MDCB v2.5     | MDCB v2.4.2 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

The compatibility matrix table shown above will be part of upcoming [Gateway release notes](/developer-support/release-notes/gateway) for versions x.x and beyond. Additionally, these release notes will list tested third-party dependencies like *PostgreSQL, MongoDB, Redis* and more.
-->

--- 

### How Do I Upgrade and How Can Tyk Help?

We have step-by-step install guides for various architectures and installation types. Refer to [upgrading tyk]({{< ref "developer-support/upgrading" >}}) for further details.

And don't forget, our brilliant Customer Success Teams and Account Managers are here to assist you with any issues - pleases refer to your SLA on the specifics of how we can help!

---

### Keep Me Informed!

We release a new LTS version every 12 months. If you want to be alerted about our next LTS release and what capabilities will be released within it, please sign up to our [mailing list](https://pages.tyk.io/long-term-support).

We will release our preliminary communications a month before the new LTS version gets released.

---

### Support Arrangements for Other Tyk Components

We have established a detailed LTS structure for Tyk Gateway and Tyk Dashboard due to their foundational role in our customers’ infrastructure. However, our support strategy for Tyk Pump, Tyk Identity Broker (TIB), MDCB, and Tyk Operator is tailored to reflect their distinct operational aspects and risk profiles, and is deeply integrated with our LTS model.

These components are often more standalone in nature and are subject to infrequent and minor changes compared to the core products. Therefore, aligning them with the same LTS versioning isn’t necessary or practical. Instead, we employ a continuous delivery model that ensures these components are always updated with the latest improvements and security patches. Our commitment extends beyond version numbers, as we ensure each of these components is thoroughly tested for quality assurance with all active LTS releases of the Gateway and Dashboard.

Ultimately, our diversified support approach aims to balance agility with assurance, offering the most appropriate level of support for each component while minimizing risk and maximizing value for our customers.
To provide the most secure and efficient environment, we advise the following with the release of a new LTS version:

#### Developer Portal
Continually evolves with frequent updates. We recommend adopting the latest release for optimal performance and feature set, ensuring consistent user experience and accessibility to the newest enhancements.

#### MDCB and Helm
Receive updates synchronized with the core Gateway and Dashboard to support new features and capabilities. These components are mature and updates typically consist of minor iterations.

#### Pump, TIB, Sync and Operator
We recommend staying up to date with these components because they are rigorously tested to operate smoothly with the active LTS versions of Tyk Gateway and Tyk Dashboard.

With new releases of Tyk Gateway and Tyk Dashboard LTS versions, our customers should follow the above guidelines to ensure the most secure, stable and efficient environment.

---

## Lab Releases

*Lab Release* is a release for a product still in the lab phase, during which features are still under active development and testing.
Lab phase releases are crucial in our product discovery and proving. They bring our customers, prospects, and the open-source community to the
heart of our product design. This collaboration provides valuable feedback, helping us refine and improve the product while giving you early
access to some key ideas we are testing. We really value your feedback - we want to learn what works for you, new use cases we've missed,
or things that can be improved before we release the capability as production-ready.

### Important information when using products in a *Lab Release* phase
Lab phase releases are not intended for production use and there are a few things you need to be aware of if you are 
helping us prove a lab release:
- **They are not ready for production use:** they have not been through our normal software development lifecycle of build and test so are 
not suitable for production use
- **You may find bugs:** these are very early iterations of the code - bugs will be present
- **They may be insecure:** the code has not gone through any security testing, so you may find exposure risk; comprehensive security test 
will be conducted before production release.
- **They are unstable:** we will be iterating this code frequently, responding to your feedback. This might lead to instability
- **Data Integrity:** there is a small risk of data loss or corruption. We strongly recommend backing up important information regularly
- **APIs and Configuration Changes:** the lab release product may undergo interface and configuration changes, as well as API contract alterations, 
as part of ongoing development and refinement efforts
- **Documentation could be limited:** we will endeavor to document the proof of concepts, but we may miss things
- **User Experience:** The user experience might not be finalized. Some features might only be accessible through API calls
- **Limited Support:** official support is not available for lab products. We encourage reporting any issues or feedback directly through any of the following channels: 
  - [Tyk Public Issues Tracker](https://github.com/TykTechnologies/tyk/issues/new/choose)
  - [Tyk Community Forum](https://community.tyk.io/)
  - Contact your Account Manager directly.
 
Your insight and feedback are paramount to us, that is why we make lab releases available. But, by using Tyk Lab Release, (a product that is in a lab phase) you acknowledge these conditions. You also agree that Tyk will not be liable for any losses or damages caused in connection with the usage of Lab Release unless the relevant losses or damages are due to our fraud, willful misconduct or gross negligence. This limitation does not apply to limitations that cannot be limited by law.

**Thank you for your understanding and cooperation**

---

## Early Access Features

Early Access features are fully tested Tyk features. However, please note that your access to these features is on an "early access" basis and as a result they may not support the functionality of similar features or functionality that you would otherwise expect. 

As we extend the capabilities of our Early Access features we may make changes that are not backwards compatible. Please ensure that you consider these limitations before using an Early Access feature. 

Early Access features are provided "as is" and Tyk disclaims and excludes to the fullest extent permitted by applicable laws all warranties, representations, conditions and all other terms, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose. 

By accessing the Early Access features, you agree that Tyk will not be liable for any losses or damages caused in connection with Early Access features, unless the relevant losses or damages are due to our fraud, willful misconduct or gross negligence. 

This limitation does not apply to limitations that cannot be limited by law.

---

## FIPS Releases

The Federal Information Processing Standards (FIPS) are a series of cryptography and hashing standards defined by the U.S.
Federal Government's National Institute of Standards and Technology (NIST). These standards are crucial for organizations dealing with sensitive
government data and are widely recognized as a benchmark for security in various regulated industries.

FIPS compliance is particularly important for industries such as:
- Government and military
- Healthcare
- Finance
- Critical infrastructure

### Importance of FIPS Compliance in API Management

FIPS compliance is particularly important in API management for several reasons:

1. **Security of Data in Transit:** API management often involves handling sensitive data as it moves between clients
and backend services. FIPS compliance ensures that this data is encrypted using approved, robust cryptographic
algorithms.
2. **Authentication and Authorization:** API gateways typically handle user authentication and authorization.
FIPS-compliant cryptographic modules ensure these processes are performed securely, using approved methods for key
generation, storage, and cryptographic operations.
3. **Regulatory Compliance:** For organizations working with U.S. government agencies or in regulated industries, using
a FIPS-compliant API management solution can be a requirement to meet regulatory standards.
4. **Key Management:** API keys and other secrets used in API management need to be securely generated, stored, and
managed. FIPS provides standards for these cryptographic operations.
5. **SSL/TLS Implementation:** API gateways often terminate SSL/TLS connections. FIPS compliance ensures that these
connections use approved protocols and cipher suites.
6. **Logging and Auditing:** FIPS compliance can extend to how API activity logs are stored and protected, which is a
crucial part of API management.
7. **Plugin and Extension Security:** For API management platforms that support plugins or extensions, FIPS compliance
ensures that any cryptographic operations performed by these components also adhere to the required standards.
8. **Identity Federation:** When API management platforms integrate with identity providers, FIPS compliance ensures
that the cryptographic aspects of these integrations meet federal standards.

### FIPS 140-2 Overview

[FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) is a specific standard within the FIPS
framework that focuses on the security of cryptographic modules. It defines four levels of security, from Level 1
(lowest) to Level 4 (highest), each building upon the security requirements of the previous level. These levels cover
a wide range of potential applications and environments in which cryptographic modules may be employed. A cryptographic
module, as defined by FIPS 140-2, is a set of hardware, software, firmware, or some combination thereof that implements
cryptographic functions or processes, including cryptographic algorithms and optional key generation, and is contained
within a defined cryptographic boundary.

FIPS 140-2 validation is performed by accredited [Cryptographic and Security Testing](https://csrc.nist.rip/Projects/cryptographic-module-validation-program/Standards#:~:text=FIPS%20140%2D2%20(effective%2015%2DNov%2D2001)&text=NVLAP%20accredited%20Cryptographic%20and%20Security,for%20Cryptographic%20Modules%20%5B%20PDF%20%5D.)
(CST) laboratories. The validation covers various aspects of the cryptographic module, including Electromagnetic
Interference/Electromagnetic Compatibility (EMI/EMC), Cryptographic Module Specification, and mitigation of Other Attacks.

### Tyk's FIPS Compliance

We are pleased to announce that Tyk Gateway and Pump offer a FIPS compliant package (together, the *"FIPS Tyk
Product”*).

The *FIPS Tyk Product* has not been submitted to a [NIST](https://www.nist.gov/federal-information-processing-standards-fips) testing lab for validation.

*FIPS compliance* means that the *FIPS Tyk Product* only uses FIPS 140-2 approved cryptographic [algorithms]({{< ref "#fips-compliant-cryptographic-operations" >}})
while running in FIPS mode. This compliance applies only to specific Tyk-built packages or Docker images of the *FIPS Tyk Product*.
These packages and images are not publicly accessible. Please speak to your assigned account manager for more information.

{{< note success >}}
**Note**  

Use of the <i>FIPS Tyk Product</i> is conditional on the user accepting any specific terms and conditions
applicable to this feature and a paid license. Please contact your account manager if you would like further information.
{{< /note >}}

#### FIPS Compliant Cryptographic Operations

The *FIPS Tyk Product* uses the [BoringCrypto](https://boringssl.googlesource.com/boringssl/+/master/crypto/fipsmodule/FIPS.md#fips-140_2) module to provide FIPS 140-2 validated cryptographic operations. This ensures that when running in FIPS mode, only FIPS 140-2 approved algorithms are used.

For more details on the cryptographic operations supported in Tyk's FIPS-compliant mode, please contact your Tyk account manager.

### Configuring Tyk for FIPS Compliance

The *FIPS Tyk Product* packages are identifiable by the `-fips` suffix. E.g. `tyk-gateway-fips` or `tyk-pump-fips`.

The only change to configuration, when using the *FIPS Tyk Product*, is to set your key hashing algorithm to SHA256 either by setting `hash_key_function` in your Gateway configuration file (`tyk.conf`) or the `TYK_GW_HASHKEYFUNCTION` environment variable to the value: `sha256`.

### Frequently Asked Questions

Q: What level of FIPS 140-2 compliance does Tyk support?

A: Tyk provides FIPS 140-2 compliance, ensuring the use of approved algorithms in FIPS mode.

Q: Can I use Tyk in FIPS mode in the Tyk Cloud environment?

A: Yes but only for hybrid gateways deployed on your premises and connecting to the Tyk Cloud control plane.

Q: Does FIPS mode affect Tyk's performance?

A: There should be no material impact on performance from the use of FIPS mode.

### Additional Resources

- [Official NIST FIPS 140-2 documentation](https://csrc.nist.gov/publications/detail/fips/140/2/final)

For more information on FIPS compliance in Tyk, please contact your account manager or {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}.



