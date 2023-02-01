---
title: MDCB v2.0
menu:
  main:
    parent: "Release Notes"
weight: 255
---
## 2.0.5
Release date: 2023-01-31

### Added
- Added a new configuration option (`group_key_ttl`) that specifies the group key TTL in seconds. This key is used for locking a group of re-syncing. This TTL gets renewed on each Login call, so if the group cluster is down, it's going to get removed. Default value: 180 seconds. Min value: 30 seconds.

### Fixed
- Fixed an issue where to re-synchronise the keys was changing the `group_id`, this is useful in situations where for any reason the edge cluster's redis is reset. 

## 2.0.4
Release date: 2022-12-06

### Added
- Changes in the API definition introduced in Tyk Gateway 4.3 
- Update to Go 1.16 
- Update the embedded Pump to the latest (v1.7.0)

### Fixed
- Fixed a minor security issue when logging Mongo URL 

## 2.0.3
Release date: 2022-08-12

### Fixed
- Fixed a bug when using MDCB with Tyk Gateway versions prior to 4.1 where an error could be reported when querying an API from a worker gateway.
- Fixed an incompatibility with MDCB logging format changes
- Fixed an issue where, with the MDCB Synchroniser disabled, all API resources were still pushed out to workers upon creation in the controller; the behaviour should be as it was pre-synchroniser.

## 2.0.2
Release date: 2022-08-12

### Fixed
- Fixed a bug when using MDCB with Tyk Gateway versions prior to 4.1 where an error could be reported when querying an API from a worker gateway.

## 2.0.1
Release date: 2022-07-20

### Added
- Updated MDCB to support Tyk Gateway v4.1
- Added a new configuration option (`omit_analytics_index_creation`) that supresses the creation of indexes in Mongo pumps (to match Pump 1.6)
- Added the option to configure MDCB certificates using environment variables.

### Fixed
- Fixed a bug when using MDCB to transfer analytics to MongoDB, where the indexes Tyk created in the MongoDB did not correctly include a time stamp.

### Changed
- Updated the pump embedded in MDCB to the latest version (Pump v1.6)


## 2.0.0
Release date: 2022-05-17

### Added

#### SQL support
Since Tyk v4.0, the dashboard supports SQL engine natively. This means that Tyk has support for an SQL relational database to be used instead of the default MongoDB and lets users decide which DB type is the best for their usage. MDCB 2.0 introduces support for SQL to the multi data centre bridge, enabling MDCB orchestrated deployments using SQL databases.
MDCB now uses embedded Tyk Mongo and SQL pumps to write analytics. 

### Fixed
- Fixed a security risk where API keys could be logged in plain text in MDCB logs.

### Changed
- Improved the formatting of debug logs to align with the rest of the Tyk product suite.
- Hide innocent and unhelpful error messages related to the RPC connection that were spamming the logs

