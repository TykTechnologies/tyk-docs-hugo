---
date: 2025-02-10
title: "Capping Analytics Data Storage"
tags: ["FAQ", "Analytics", "MongoDB", "Storage", "Performance"]
description: "How to cap analytics data storage to manage database size and performance"
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 5
aliases:
  - /frequently-asked-questions/capping-analytics-data-storage
---

## How do I cap analytics data storage?

Tyk Gateways can generate a lot of analytics data. A guideline is that for every 3 million requests that your Gateway processes it will generate roughly 1GB of data.

### Quick answer

For detailed information on capping analytics data storage, including:
- Size-based capping with MongoDB capped collections
- Time-based capping with TTL indexes
- Multi-tenant analytics expiration
- Configuration examples

Please see the comprehensive guide in our [Tyk Pump documentation]({{< ref "api-management/tyk-pump#tyk-pump-capping-analytics-data-storage" >}}).

### Key points

- **Size-based capping**: Use MongoDB capped collections to limit storage by size
- **Time-based capping**: Use TTL indexes to automatically expire old data
- **Multi-tenant support**: Control analytics expiration per organization
- **DocumentDB compatibility**: Note that DocumentDB doesn't support capped collections

The main analytics documentation covers all configuration options, examples, and best practices for managing your analytics data storage efficiently.