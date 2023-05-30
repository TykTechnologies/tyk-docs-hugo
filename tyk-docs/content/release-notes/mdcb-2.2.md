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
* [mgo](https://github.com/go-mgo/mgo) (default): Uses the mgo driver. This driver supports Mongo versions lower or equal to v4. You can get more information about this driver [here](https://github.com/go-mgo/mgo). To allow users more time for migration, we will update our default driver to mongo-go in next release.
* [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports Mongo versions greater or equal to v4. You can get more information about this driver [here](https://github.com/mongodb/mongo-go-driver).

Tyk 5.0.2 and Tyk Pump 1.8.0 also support new driver option.

We have also worked on performance improvement and fixes like preventing successive frequent reloads, handles storage error gracefully, retry connection to storage during startup. If ownership is enabled, gateways will also load APIs that are not associated with any user or group.

### Added
- Support for "mongo-go" driver option
- Support for the "+srv" connection string with "mongo-go" driver option
- Support for SCRAM-SHA-256 with “mongo-go” driver option
- Performance Enhancement: MDCB enqueue APIs and Policies for reload to reduce multiple reloads
### Fixed
MDCB handles error from storage gracefully and prevents sending 0 APIs to gateways which would cause outage
- MDCB will retry connection to storage to prevent startup failure
### Updated
- If both mongo_url and connection_type + connection_string are set, Mongo will be loaded by default.
- With ownership enabled in MDCB gateways should load APIs that are not associated with user or group
