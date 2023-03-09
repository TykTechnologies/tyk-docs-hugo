---
title: MDCB v2.1
menu:
  main:
    parent: "Release Notes"
weight: 254
---

## 2.1.0
Release date: 2023-02-20

### Added
- Added a new configuration option [`enable_ownership`]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_ownership" >}}) that allows MDCB filter APIs by API Ownership. 
- MDCB works without group id. This means that when an Edge Gateway doesn’t have a group, it will defaults to the `ungrouped` group. This has some fallbacks, as we can’t use the synchroniser for the ungrouped gateways.


### Fixed
- Updated API Definition to support 4.3.3 Gateways. 
