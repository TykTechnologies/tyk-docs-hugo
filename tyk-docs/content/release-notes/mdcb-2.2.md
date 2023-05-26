---
title: MDCB v2.2
menu:
  main:
    parent: "Release Notes"
weight: 253
---

## 2.2.0
Release date: 2023-05-26

MDCB 2.2.0 brings support for using official MongoDB go driver, as well as some performance fix.

From MDCB 2.2.0, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set new MDCB config option driver to mongo-go.

The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
* [mgo](https://github.com/go-mgo/mgo) (default): Uses the mgo driver. This driver supports Mongo versions lower or equal to v4. You can get more information about this driver [here](https://github.com/go-mgo/mgo).
* [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports Mongo versions greater or equal to v4. You can get more information about this driver [here](https://github.com/mongodb/mongo-go-driver).

Tyk 5.0.2 and Tyk Pump 1.8.0 also support new driver option.

We have also worked on performance improvement and fixes like preventing successive frequent reloads, handles storage error gracefully, retry connection to storage during startup. If ownership is enabled, gateways will also load APIs that are not associated with any user or group.

### Added
- Added a new configuration option [enable_ownership]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_ownership" >}}) that allows MDCB filter APIs by API Ownership. 
- MDCB works without group id. This means that when an Edge Gateway doesn’t have a group, it will defaults to the `ungrouped` group. This has some fallbacks, as we can’t use the synchroniser for the ungrouped gateways.


### Fixed
- Updated API Definition to support 4.3.3 Gateways. 
