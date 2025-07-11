---
title: Tyk Pump v1.10 Release Notes
date: 2024-02-02T26:33:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Pump versions within the 1.10.X series."
tags: ["Tyk Pump", "Release notes", "v1.10", "changelog"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 1.9.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 1.10 Release Notes

### Release Date 3 July 2024

### Breaking Changes
This release has no breaking changes.

### Dependencies

#### 3rd Party Dependencies & Tools

With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "planning-for-production/database-settings/postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

| Third Party Dependency                                    | Tested Versions   | Compatible Versions      | Comments                   |
| --------------------------------------------------------- | ----------------- | ------------------------ | -------------------------- |
| [GoLang](https://go.dev/dl/)                              | 1.19, 1.20, 1.21  | 1.19, 1.20, 1.21         | All our binaries           |
| [MongoDB](https://www.mongodb.com/try/download/community) | 5.x, 6.x, and 7.0 | 4.4.x, 5.x, 6.x, and 7.0 | Used by Tyk Dashboard      |
| [PostgreSQL](https://www.postgresql.org/download/)        | 12.x - 16.x    | 12.x - 16.x              | Used by Tyk Dashboard      |
| [Redis](https://redis.io/download/)                       | 6.x - 7.0         | 6.x - 7.x                | Used by all Tyk components |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

There are no deprecations in this release.

### Upgrade instructions

For users currently on v1.9.X, we strongly recommend promptly upgrading to the latest release. If you are working with an older version, it is advisable to bypass version 1.9 and proceed directly to this latest release.

### Release Highlights

#### FIPS Compliance

Tyk Pump now offers [FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) compliance. For further details please consult [Tyk API Management FIPS support]({{< ref "developer-support/special-releases-and-features/fips-release" >}})

#### Security fixes
This release focuses on improving security and compliance, enhancing integration capabilities, and ensuring robust performance in secure environments.

### Downloads
- [Docker Image v1.10.0](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=&page_size=&ordering=&name=v1.10)
- ```bash
  docker pull tykio/tyk-pump-docker-pub:v1.10.0
  ```
- Source code tarball for OSS - [GH Tyk Pump Repo](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.10.0)

### Changelog {#Changelog-v1.10.0}

#### Added

<ul>
<li>
<details>
<summary>Added FIPS compliance</summary>

Added [FIPS compliance]({{< ref "developer-support/special-releases-and-features/fips-release" >}}) for Tyk Pump.
</details>
</li>
</ul>


#### Fixed

<ul>
<li>
<details>
<summary>Fixed Tyk Pump Splunk Integration using http_proxy and https_proxy Environment Variables</summary>

Resolved an issue where `http_proxy` and `https_proxy` environment variables were not being respected in the Tyk Pump pod for Splunk connections.

</details>
</li>

</ul>

#### Security Fixes

<ul>
<li>
<details>
<summary>Fixed the following CVEs</summary>
<ul>
<li>PRISMA-2021-0108</li>
<li>PRISMA-2023-0056</li>
<li>[CVE-2024-27304](https://nvd.nist.gov/vuln/detail/CVE-2024-27304)</li>
<li>[CVE-2023-45288](https://nvd.nist.gov/vuln/detail/CVE-2023-45288)</li>
</ul>
</details>
</li>
</ul>

---

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### FAQ

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
