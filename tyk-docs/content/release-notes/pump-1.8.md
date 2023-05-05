---
title: MDCB v2.0
menu:
  main:
    parent: "Release Notes"
weight: 300
---
## 1.8
Release date: 2023-05-04

### Summary
Pump 1.8 introduces two new pumps: The GraphQL SQL Aggregate Pump - which allows you to transfer GraphQL transaction logs to SQL; and Resurface Pump - which allows you to transfer data to [Resurface.io](http://resurface.io/) for context based security analysis. 

We have changed the default MongoDB driver from [mgo](https://github.com/go-mgo/mgo) to [mongo-go](https://github.com/mongodb/mongo-go-driver). The new driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please update the driver type [here](https://github.com/TykTechnologies/tyk-pump#driver-type).

We have also added a config option that allow you to decode the raw requests and responses for all pumps so you don't need to worry about processing them in your data pipeline. For demo mode, there is now an option to generate future data for your convenience.

In this release, we are using a new Tyk storage library to connect to Mongo DB. This would allow us to switch to use the official Mongo Driver very easily in the future.

### Notes on MongoDB v3.x compatibility

We have changed the default MongoDB driver from [mgo](https://github.com/go-mgo/mgo) to [mongo-go](https://github.com/mongodb/mongo-go-driver). The new driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please update the driver type [here](https://github.com/TykTechnologies/tyk-pump#driver-type).

### Added
- Added GraphQL SQL Aggregate Pump.
- Added Resurface Pump - Resurface can provide context-based security analysis for attack and failure triage, root cause, threat and risk identification based on detailed API logs sent from Tyk Pump.
- Add config option raw_request_decoded and raw_response_decoded for decoding from base64 the raw requests/responses fields before writing to Pump. This is useful if you want to search for specific values in the raw request/response. Both are disabled by default. This setting is not available for Mongo and SQL pumps, since the dashboard will decode the raw request/response.
- Add the ability to generate future data in demo mode using --demo-future-data flag. 
- Remove critical CVE go.uuid vulnerability 
- Use the latest Tyk storage library to connect to Mongo 
- Hybrid Pump refactoring - we now have better RPC connection control, testability, and documentation 

### Fixed
- Std pump does not log accurate time when set to json format 
- GraphPump doesn’t include names of queries/mutation and subscriptions called 
- Mongo Pump’s connection hangs forever if misconfigured 
