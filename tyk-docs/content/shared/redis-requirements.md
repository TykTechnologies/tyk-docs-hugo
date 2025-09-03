---
title: "Redis Requirements"
date: 2025-09-03
tags: ["Redis", "Prerequisites", "Configuration"]
description: "Essential Redis requirements and configuration guidance for Tyk products"
menu:
  main:
    parent: "Prerequisites"
---

# Redis Requirements for Tyk Products

Redis is an essential prerequisite for all Tyk products. This guide outlines the specific Redis requirements and configuration recommendations for different Tyk deployment scenarios.

## Overview

Redis serves as a critical component in Tyk's architecture, providing:
- Session state management
- Rate limiting and quota tracking
- Analytics data buffering
- Inter-node communication

## Version Requirements

- Minimum Redis version: 6.2.0
- Recommended Redis version: 7.0.0 or later
- Redis Enterprise and AWS ElastiCache are fully supported

## Control Plane Requirements

The Tyk Dashboard and associated control plane components require:

- Dedicated Redis instance recommended
- Minimum 2GB RAM allocation
- Persistence enabled (RDB snapshots recommended)
- Network latency under 10ms to Redis
- Connection pool size: 100-500 depending on load

## Data Plane Requirements

Tyk Gateway nodes require:

- Can share Redis with control plane in small deployments
- Dedicated Redis recommended for high-traffic scenarios
- Minimum 1GB RAM per gateway node
- Persistence optional (can be disabled for performance)
- Ultra-low latency critical (under 5ms)
- Connection pool size: 50-300 per gateway node

## Deployment Scenarios

### Single-Node Development
- Single Redis instance
- Minimal persistence
- Default configurations acceptable

### Production Single-Region
- Separate Redis for control/data planes
- Enable persistence
- Configure maxmemory-policy to "allkeys-lru"
- Regular backups
- Consider Redis Sentinel for HA

### Multi-Region Production
- Local Redis per region for data plane
- Central Redis cluster for control plane
- Cross-region replication where needed
- Active-Active configurations supported

## Configuration Recommendations

### Basic Redis Configuration
```
maxmemory 2gb
maxmemory-policy allkeys-lru
timeout 0
tcp-keepalive 60
appendonly yes
appendfsync everysec
```

### High-Performance Settings
```
save ""  # Disable RDB persistence
appendonly no
maxmemory-policy allkeys-lru
no-appendfsync-on-rewrite yes
```

### Security Recommendations
- Enable TLS encryption
- Use strong authentication
- Implement network isolation
- Regular security patches
- Monitor access patterns

## Monitoring

Key metrics to monitor:
- Memory usage
- Connection count
- Latency
- Hit/miss ratios
- Eviction rates

## Troubleshooting

Common issues and solutions:
1. High latency
   - Check network configuration
   - Monitor system resources
   - Verify proper connection pooling

2. Memory issues
   - Adjust maxmemory settings
   - Review eviction policies
   - Monitor key space

3. Connection problems
   - Check security groups/firewall
   - Verify credentials
   - Review connection limits

## Additional Resources

- [Redis Documentation](https://redis.io/documentation)
- [Redis Best Practices](https://redis.io/topics/optimization)
- [Redis Security](https://redis.io/topics/security)
