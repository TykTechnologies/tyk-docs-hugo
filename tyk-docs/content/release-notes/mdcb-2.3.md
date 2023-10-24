---
title: MDCB v2.3
menu:
  main:
    parent: "Release Notes"
weight: 252
---

## 2.3.1

Release date: 2023-08-31

### Fixed

- In MDCB 2.3, the embedded OAS API Definition introduced in 5.1 is not backward compatible. It causes Gateway panic when MDCB is connecting to Tyk 5.0.x or earlier releases. In this fix, MDCB will transform the old API Definition to new format to avoid panic.
- Users should use URL-encoded values in username and password of a MongoDB connection string if it contains following characters - "?", "@". The same connection string should always be accepted by both mgo and mongo-go drivers. (Note: Same fix for Dashboard will be available in upcoming release Tyk Dashboard v5.0.6 and v5.2.0)


## 2.3.0

Release date: 2023-06-28

MDCB 2.3.0 is an update for compatibility for synchronisation with Tyk v5.1 API Definitions.

### Updated

- Update MDCB to Go 1.19
- Update for compatibility with API definitions for Tyk v5.1
