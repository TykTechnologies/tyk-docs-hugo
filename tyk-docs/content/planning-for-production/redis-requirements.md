---
title: Redis Requirements
menu:
  main:
    parent: "Planning for Production"
weight: 3
---

# Redis Requirements

Redis is an essential prerequisite for all Tyk products. This guide outlines the specific Redis requirements for both control plane and data plane components.

## Overview

Redis serves as a critical component in Tyk's architecture, providing:
- Session state management
- Rate limiting data storage
- Analytics temporary storage
- API Definitions caching
- OAuth client/token storage

## Control Plane Redis Requirements

The Tyk Dashboard and its components require a highly resilient Redis instance with:

- Redis version 6.2 or later
- Sufficient memory allocation (minimum 2GB recommended)
- Persistence enabled (both RDB and AOF recommended)
- Regular backup schedule (at least daily)
- Network latency under 10ms to the Dashboard
- Data durability prioritized over performance
- Full backup and restore capabilities
- Retention of all OAuth tokens and keys

This Redis instance stores critical configuration data that must be preserved, including:
- API Definitions
- Policy configurations
- Security policies
- OAuth client credentials
- Long-term analytics data

## Data Plane Redis Requirements

Tyk Gateways can use more performance-optimized Redis instances:

- Redis version 6.2 or later
- Ultra-low latency access (under 5ms)
- Sufficient memory for your API traffic volume
- Can be configured for ephemeral storage when using MDCB
- Performance-optimized persistence settings
- Focus on speed over durability

When using MDCB (Multi Data Centre Bridge):
- Gateway Redis can be treated as a cache
- Data can be reconstructed from the control plane if lost
- Persistence can be disabled for maximum performance
- Memory can be optimized for short-term rate limiting only

## MDCB Deployment Considerations

In Multi Data Center Bridge (MDCB) deployments, Redis requirements differ significantly between control plane and data plane:

### Control Plane Redis in MDCB
- Must maintain high durability and reliability
- Serves as the source of truth for all configuration
- Requires full persistence and backup capabilities
- Should be deployed with high availability configuration
- Needs sufficient storage for all environment configurations

### Data Plane Redis in MDCB
- Can be treated as an ephemeral cache
- Data can be rebuilt from control plane if lost
- Can disable persistence for performance gains
- May use smaller instances focused on rate limiting
- Can be scaled independently per data center
- Local to each Gateway cluster for low latency

This separation allows for optimized Redis deployments at each tier, balancing durability needs at the control plane with performance requirements at the data plane.

## High Availability Considerations

For production deployments, we strongly recommend:

- Redis Cluster or Sentinel for high availability
- Multiple Redis replicas
- Automated failover configuration
- Regular monitoring of Redis metrics
- Separate Redis instances for control plane and data plane

## Backup and Recovery

Implement these essential backup practices:

1. Regular automated backups
2. Point-in-time recovery capability
3. Backup verification procedures
4. Documented restore procedures
5. Regular restore testing

## Performance Recommendations

For optimal performance:

- Use dedicated Redis instances
- Monitor memory usage
- Configure appropriate maxmemory-policy
- Enable persistence with performance-optimized settings
- Regular Redis maintenance and optimization

## Security Requirements

Secure your Redis deployment with:

- Strong authentication
- TLS encryption for all connections
- Network isolation
- Regular security updates
- Access control lists
