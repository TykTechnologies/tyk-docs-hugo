---
title: "Health Checks"
date: 2025-02-10
keywords: ["health check", "liveness health check", "readiness health check", "Tyk Gateway", "Tyk Dashboard", "MDCB", "load balancer", "Kubernetes liveness probe", "Kubernetes readiness probe"]
description: "How to set up liveness and readiness health checks for the Tyk Gateway to ensure high availability and monitor the status of components like Redis, Dashboard, and RPC."
aliases:
  - /tyk-rest-api/health-checking
---

## Overview

Tyk Gateway provides two health check endpoints to help you monitor and manage your API gateway:

### Quick Reference

| Endpoint | Purpose | When to Use | HTTP Response |
|----------|---------|-------------|---------------|
| `/hello` | **Liveness check** | Load balancers, basic monitoring | Always 200 OK |
| `/ready` | **Readiness check** | Kubernetes, traffic routing decisions | 200 OK when ready, 503 when not |

### Which endpoint should I use?

- **Use `/hello` for**: Load balancers, basic uptime monitoring, general health checks
- **Use `/ready` for**: Kubernetes readiness probes, deciding when to route traffic to a new Gateway instance

## What Gets Monitored

The health check endpoints monitor these critical Gateway dependencies:

✅ **Monitored Components:**
- **Redis** (required) - Data storage and caching
- **Tyk Dashboard** (if configured) - API management interface  
- **RPC connection** (for MDCB setups) - Multi-data center communication


### Kubernetes Deployments
```yaml
# Liveness probe - restarts pod if Gateway process is dead
livenessProbe:
  httpGet:
    path: /hello
    port: 8080

# Readiness probe - removes from service when not ready
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
```


{{< note success >}}
**Note**  

Health check is implemented as per the [Health Check Response Format for HTTP APIs](https://inadarei.github.io/rfc-healthcheck/) RFC
{{< /note >}}

An example of the response from this API is as follows:


```yaml
{
  "status": "pass",
  "version": "v3.1.1",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "dashboard": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "rpc": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    }
  }
}
```

## Status Levels

The following status levels can be returned in the JSON response.

- **pass**: Indicates that all components required for the Gateway to work 100% are available, and there is no impact on your traffic.

- **warn**: Indicates that one of the components is having an outage but your Gateway is able to keep processing traffic. The impact is medium (i.e. no quotas are applied, no analytics, no RPC connection to MDCB).

- **fail**: Indicates that Redis AND the Tyk Dashboard are unavailable, and can and indicate other failures. The impact is high (i.e. no configuration changes are available for API/policies/keys, no quotas are applied, and no analytics).

## The `/ready` Endpoint (Readiness Check)

Use this endpoint when you need to know if the Gateway is **actually ready** to handle API traffic.

### What it checks
- ✅ Redis is connected and working
- ✅ APIs have been loaded successfully at least once

### How it responds
- **Gateway is ready**: Returns `HTTP 200 OK` 
- **Gateway is NOT ready**: Returns `HTTP 503 Service Unavailable`

### When to use `/ready`
- **Kubernetes readiness probes** - Removes pod from service when not ready
- **Graceful Terminations** - Removes pod from service when Gateway is shutting down
- **New deployments** - Wait for 200 response before routing traffic
- **Automated scaling** - Verify new instances are ready before adding to pool

### Configuration
The endpoint runs on `/ready` by default. To change it:

```yaml
readiness_check_endpoint_name: "status-ready"
```

[config ref](https://tyk.io/docs/tyk-oss-gateway/configuration/#readiness_check_endpoint_name)

## The `/hello` Endpoint (Liveness Check)

Use this endpoint for basic health monitoring and load balancer health checks.  This check returns 200 when the Gateway has started and is attempting to or has arrived to a stable condition.

### How it responds
- **Always returns `HTTP 200 OK`** (even when components are failing).  
- **Check the response body** to see which components are healthy or failing

### When to use `/hello`
- **Load balancers** - Route traffic to instances that respond
- **Basic monitoring** - Simple uptime checks
- **MDCB setups** - Monitor both Management and Worker Gateways

### Configuration
The endpoint runs on `/hello` by default. To change it:

```yaml
health_check_endpoint_name: "status"
```

[Config Ref](https://tyk.io/docs/tyk-oss-gateway/configuration/#health_check_endpoint_name)

### Important Notes
- **Updates every 10 seconds** - Health status is cached and refreshed automatically
- **Always responds with 200** - Even when Redis or Dashboard are down (check response body for details)
- **Use for load balancers** - Perfect for HAProxy, NGINX, AWS ALB health checks

## Testing the Health Check Endpoints

### Quick Health Check
```bash
# Check if Gateway is alive (always returns 200)
curl http://localhost:8080/hello

# Check if Gateway is ready to serve traffic
curl http://localhost:8080/ready
```

### `/ready` Endpoint Examples

**✅ Gateway is ready** (returns `HTTP 200 OK`):
```bash
$ curl -i http://localhost:8080/ready
HTTP/1.1 200 OK

{
  "status": "pass",
  "description": "Tyk GW",
  "details": {
    "redis": { "status": "pass" }
  }
}
```

**❌ Gateway is NOT ready** (returns `HTTP 503 Service Unavailable`):
```bash
$ curl -i http://localhost:8080/ready  
HTTP/1.1 503 Service Unavailable

{
  "status": "fail",
  "description": "Tyk GW", 
  "details": {
    "redis": { 
      "status": "fail",
      "output": "Redis is down or not configured"
    }
  }
}
```

### `/hello` Endpoint Examples

**✅ All systems healthy** (always returns `HTTP 200 OK`):
```bash
$ curl http://localhost:8080/hello
{
  "status": "pass",
  "description": "Tyk GW",
  "details": {
    "redis": { "status": "pass" },
    "dashboard": { "status": "pass" }
  }
}
```

**⚠️ Redis is down** (still returns `HTTP 200 OK`):
```bash
$ curl http://localhost:8080/hello  
{
  "status": "warn",
  "description": "Tyk GW",
  "details": {
    "redis": { 
      "status": "fail",
      "output": "Redis is down or not configured" 
    },
    "dashboard": { "status": "pass" }
  }
}
```

**❌ Multiple components down** (still returns `HTTP 200 OK`):
```bash
$ curl http://localhost:8080/hello
{
  "status": "fail", 
  "description": "Tyk GW",
  "details": {
    "redis": { "status": "fail" },
    "dashboard": { "status": "fail" }
  }
}
```

## Troubleshooting with Health Checks

### Understanding Status Levels

| Status | Meaning | What to do |
|--------|---------|------------|
| `pass` | All components healthy | ✅ Gateway is working normally |
| `warn` | Some components down | ⚠️ Gateway works but with reduced functionality |
| `fail` | Critical components down | ❌ Gateway may not work properly |

### Common Issues

**Redis connection failed**:
- Check Redis is running: `redis-cli ping`
- Verify connection settings in Gateway config
- Check network connectivity to Redis

**Dashboard connection failed**:
- Verify Dashboard is running and accessible
- Check Dashboard URL in Gateway config
- Test connectivity: `curl http://dashboard:3000/hello`

