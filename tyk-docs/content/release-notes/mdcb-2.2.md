---
title: MDCB v2.2
menu:
  main:
    parent: "Release Notes"
weight: 253
---

## 2.2.0
Release date: 2023-05-26

MDCB 2.2.0 brings support for using the official [MongoDB go driver](https://www.mongodb.com/docs/drivers/go/current/?_ga=2.196564399.289488302.1688466439-526957880.1688466345#mongodb-go-driver), as well as some performance fixes.

From MDCB 2.2.0, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set the new *MDCB* config option driver to `mongo-go`.

The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
* [mgo](https://github.com/go-mgo/mgo) (default): Uses the `mgo` driver which is the existing one Tyk has been using till now. This driver supports *MongoDB* versions up to v4 (lower or equal to v4, <=v4). You can get more information about this driver [here](https://github.com/go-mgo/mgo). This driver will stay the default till the next release, to allow users more time for migration. After that, the default driver will be `mongo-go`.
* [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official *MongoDB driver*. This driver supports MongoDB v4 or newer (greater or equal to v4, >=v4).

Tyk 5.0.2 and Tyk Pump 1.8.0 also support the new driver option.

We have also worked on performance improvement and fixes like preventing successive frequent reloads, handling storage errors gracefully, retry connection to storage during startup. If ownership is enabled, gateways will also load APIs that are not associated with any user or group.

### Added
- Support for `mongo-go` driver option
- Support for the `+srv` connection string with `mongo-go` driver option
- Support for SCRAM-SHA-256 with “mongo-go” driver option
- Performance Enhancement: MDCB enqueue APIs and Policies for reload to reduce multiple reloads
### Fixed
- MDCB handles errors from storage gracefully and prevents sending an empty list of APIs to gateways which would cause an outage
- MDCB will retry the connection to storage to prevent startup failure
### Updated
- If both mongo_url and connection_type + connection_string are set, Mongo will be loaded by default.
- When ownership is enabled, gateways should only load APIs that are associated with the user or group. Additionally, APIs with no association with any users or groups are also loaded.
