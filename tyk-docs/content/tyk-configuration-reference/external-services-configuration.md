---
title: "External Services Configuration"
date: 2025-01-10
tags: ["Configuration", "External Services", "Proxy", "mTLS", "OAuth", "Security"]
description: "Complete guide to configuring external services in Tyk Gateway including proxy settings, mutual TLS, and service-specific configurations"
keywords: ["external services", "proxy", "mTLS", "OAuth", "webhooks", "service discovery", "health checks", "configuration"]
weight: 4
---

## Overview

The External Services Configuration feature provides centralized HTTP client management for Tyk Gateway's external service interactions. This enterprise-grade feature enables secure, performant, and manageable external service integrations with comprehensive support for:

- **Proxy Configuration**: HTTP/HTTPS proxy support with bypass rules
- **mTLS Client Certificates**: Mutual TLS for secure external communications  
- **Service-Specific Settings**: Dedicated configurations for OAuth, Storage, Webhooks, Health Checks, and Service Discovery
- **Configuration Hierarchy**: Global settings with service-specific overrides
- **Performance Optimization**: Service-specific connection pooling and timeouts

### Supported External Services

| Service Type | Description | Components |
|--------------|-------------|------------|
| `oauth` | OAuth/JWT token validation and introspection | JWT middleware, External OAuth middleware, JWK fetching |
| `storage` | External storage operations | Redis connections, database interactions |
| `webhooks` | Webhook event notifications | Event handlers, notification delivery |
| `health` | Health check requests | Host checker, uptime monitoring |  
| `discovery` | Service discovery requests | Load balancer, service registry |

### Key Features

- **Zero Downtime Configuration**: Hot-reload support for configuration changes
- **Backward Compatibility**: Existing configurations continue to work unchanged
- **Enterprise Security**: Production-ready mTLS and proxy authentication
- **Performance Optimized**: Service-specific connection pooling and timeouts
- **Comprehensive Logging**: Detailed debug information for troubleshooting

## Configuration Guide

### Basic Configuration Structure

Add the `external_services` section to your `tyk.conf` file:

```json
{
  "external_services": {
    "proxy": {
      "use_environment": false,
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128",
      "no_proxy": "localhost,127.0.0.1,.internal,*.local"
    },
    "oauth": {
      "proxy": {
        "http_proxy": "http://localhost:3128"
      },
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/oauth-client.crt",
        "key_file": "/etc/tyk/certs/oauth-client.key",
        "ca_file": "/etc/tyk/certs/oauth-ca.crt",
        "insecure_skip_verify": false,
        "tls_min_version": "1.2",
        "tls_max_version": "1.3"
      }
    }
  }
}
```

### Configuration Parameters

#### Global Proxy Configuration

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `use_environment` | boolean | No | Read proxy settings from environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`) |
| `http_proxy` | string | No | HTTP proxy URL for HTTP requests (e.g., `http://localhost:3128`) |
| `https_proxy` | string | No | HTTPS proxy URL for HTTPS requests (e.g., `http://localhost:3128`) |
| `no_proxy` | string | No | Comma-separated list of hosts to bypass proxy |

#### Service-Specific Configuration

Each service type (`oauth`, `storage`, `webhooks`, `health`, `discovery`) supports:

**Proxy Configuration:**
```json
"proxy": {
  "use_environment": false,
  "http_proxy": "http://localhost:3128",
  "https_proxy": "http://localhost:3128",
  "no_proxy": "localhost,127.0.0.1,.internal"
}
```

**mTLS Configuration:**
```json
"mtls": {
  "enabled": true,
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "ca_file": "/path/to/ca.crt",
  "insecure_skip_verify": false,
  "tls_min_version": "1.2",
  "tls_max_version": "1.3"
}
```

#### mTLS Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `enabled` | boolean | Yes | Enable/disable mTLS for this service |
| `cert_file` | string | Yes* | Path to client certificate file |
| `key_file` | string | Yes* | Path to client private key file |
| `ca_file` | string | No | Path to CA certificate for server verification |
| `insecure_skip_verify` | boolean | No | Skip server certificate verification (not recommended for production) |
| `tls_min_version` | string | No | Minimum TLS version ("1.2", "1.3") |
| `tls_max_version` | string | No | Maximum TLS version ("1.2", "1.3") |

*Required when `enabled: true`

### Configuration Hierarchy and Precedence

Settings are applied in the following priority order (highest to lowest):

1. **Service-specific configuration** - Overrides all other settings
2. **Global external_services configuration** - Applies to all services  
3. **Environment variables** - Used when `use_environment: true`
4. **Default settings** - Built-in fallback values

#### Configuration Resolution Example

```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128"
    },
    "oauth": {
      "proxy": {
        "https_proxy": "http://localhost:3129"
      }
    },
    "webhooks": {
      "proxy": {
        "use_environment": true
      }
    }
  }
}
```

**Result:**
- **OAuth service**: Uses `http://localhost:3129` for HTTPS, `http://localhost:3128` for HTTP
- **Webhook service**: Uses environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`)
- **Other services**: Use global proxy settings

## Configuration Examples

### 1. Basic Proxy Setup (Local Testing)
```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128",
      "no_proxy": "localhost,127.0.0.1,.internal"
    }
  }
}
```

### 2. OAuth with Dedicated Proxy and mTLS
```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128",
      "no_proxy": "localhost,127.0.0.1"
    },
    "oauth": {
      "proxy": {
        "http_proxy": "http://localhost:3129",
        "https_proxy": "http://localhost:3129"
      },
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/oauth-client.crt",
        "key_file": "/etc/tyk/certs/oauth-client.key",
        "ca_file": "/etc/tyk/certs/oauth-ca.crt",
        "tls_min_version": "1.2"
      }
    }
  }
}
```

### 3. Mixed Environment and Service-Specific Configuration
```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128",
      "no_proxy": "localhost,127.0.0.1,redis"
    },
    "storage": {
      "proxy": {
        "no_proxy": "localhost,127.0.0.1,redis.internal"
      },
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/redis-client.crt",
        "key_file": "/etc/tyk/certs/redis-client.key"
      }
    },
    "webhooks": {
      "proxy": {
        "http_proxy": "http://localhost:3130",
        "https_proxy": "http://localhost:3130"
      }
    }
  }
}
```

### 4. Production Enterprise Configuration
```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://proxy.company.com:8080",
      "https_proxy": "http://proxy.company.com:8080",
      "no_proxy": "localhost,127.0.0.1,.company.internal"
    },
    "oauth": {
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/oauth-client.crt",
        "key_file": "/etc/tyk/certs/oauth-client.key",
        "ca_file": "/etc/tyk/certs/company-ca.crt",
        "insecure_skip_verify": false,
        "tls_min_version": "1.2"
      }
    },
    "webhooks": {
      "proxy": {
        "use_environment": true
      },
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/webhook-client.crt",
        "key_file": "/etc/tyk/certs/webhook-client.key"
      }
    }
  }
}
```

## Security Best Practices

### Certificate Management

1. **Secure Storage**: Store certificates in a secure directory with restricted permissions
   ```bash
   sudo chmod 644 /etc/tyk/certs/*.crt
   sudo chmod 600 /etc/tyk/certs/*.key
   ```

2. **Certificate Validation**: Always validate certificate chains in production
   ```bash
   openssl verify -CAfile /etc/tyk/certs/ca.crt /etc/tyk/certs/client.crt
   ```

3. **Regular Rotation**: Implement automated certificate rotation procedures

### Proxy Security

1. **Authentication**: Use proxy authentication where required
   ```json
   {
     "external_services": {
       "proxy": {
         "http_proxy": "http://user:password@proxy.company.com:8080"
       }
     }
   }
   ```

2. **Environment Variables**: Store sensitive credentials in environment variables
   ```bash
   export TYK_GW_EXTERNAL_SERVICES_PROXY_HTTP_PROXY="http://user:$PROXY_PASSWORD@proxy:8080"
   ```

3. **Network Segmentation**: Use `no_proxy` to exclude internal services
   ```json
   {
     "external_services": {
       "proxy": {
         "no_proxy": "localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.internal"
       }
     }
   }
   ```

## Performance Optimization

### Connection Pooling

The feature implements optimized connection pooling for each service type:

| Service Type | Max Connections | Per Host | Idle Timeout | Reasoning |
|--------------|-----------------|----------|--------------|-----------|
| OAuth | 50 | 10 | 30s | Frequent auth requests, connection reuse |
| Health | 20 | 5 | 15s | Quick, frequent health checks |
| Storage | 50 | 15 | 90s | Longer-lived connections, bulk operations |
| Discovery | 30 | 5 | 20s | Service registry lookups |
| Webhooks | 50 | 10 | 30s | Reliable delivery, connection reuse |

### Service-Specific Timeouts

| Service Type | Client Timeout | Purpose |
|--------------|----------------|---------|
| OAuth | 15 seconds | Quick authentication responses |
| Health | 10 seconds | Fast health check responses |
| Discovery | 10 seconds | Quick service discovery |
| Storage | 20 seconds | Storage operation variability |
| Webhooks | 30 seconds | Reliable delivery with timeout |

## Migration from Legacy Configuration

### Backward Compatibility

The External Services Configuration maintains full backward compatibility:

| Legacy Setting | New Location | Migration Required |
|----------------|--------------|-------------------|
| `http_proxy` | `external_services.proxy.http_proxy` | Optional |
| `https_proxy` | `external_services.proxy.https_proxy` | Optional |
| `jwt_ssl_insecure_skip_verify` | `external_services.oauth.mtls.insecure_skip_verify` | Recommended |

### Migration Strategy

**Phase 1: Assessment**
1. Backup current configuration
2. Identify existing proxy settings
3. Document current external service dependencies

**Phase 2: Gradual Migration**
1. Add `external_services` section alongside existing settings
2. Test in staging environment
3. Validate all external service functionality

**Phase 3: Optimization**
1. Add service-specific configurations
2. Implement mTLS where appropriate
3. Optimize proxy settings per service

**Phase 4: Cleanup (Optional)**
1. Remove legacy settings
2. Validate production deployment
3. Update documentation

### Migration Example

**Before:**
```json
{
  "http_proxy": "http://localhost:3128",
  "jwt_ssl_insecure_skip_verify": true
}
```

**After:**
```json
{
  "external_services": {
    "proxy": {
      "http_proxy": "http://localhost:3128",
      "https_proxy": "http://localhost:3128"
    },
    "oauth": {
      "mtls": {
        "enabled": true,
        "cert_file": "/etc/tyk/certs/oauth-client.crt",
        "key_file": "/etc/tyk/certs/oauth-client.key",
        "insecure_skip_verify": false
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

#### Proxy Connection Failures
**Symptoms**: Connection timeouts, "dial tcp" errors, HTTP 407 errors

**Solutions**:
1. Verify proxy connectivity: `curl --proxy http://localhost:3128 https://httpbin.org/get`
2. Check proxy configuration syntax
3. Validate `no_proxy` settings

#### mTLS Certificate Issues
**Symptoms**: "tls: handshake failure", "x509: certificate signed by unknown authority"

**Solutions**:
1. Verify certificate validity: `openssl x509 -in cert.crt -text -noout -dates`
2. Check certificate and key pair match
3. Validate certificate chain

#### Configuration Not Taking Effect
**Symptoms**: Settings ignored, service-specific overrides not working

**Solutions**:
1. Validate JSON syntax: `python -m json.tool tyk.conf`
2. Check configuration hierarchy
3. Verify environment variables

### Debug Logging

Enable debug logging to troubleshoot issues:

```json
{
  "log_level": "debug"
}
```

Monitor for key debug messages:
- `Creating HTTP client for service type: <service>`
- `HTTP client for <service> configured with proxy support`
- `HTTP client for <service> configured with mTLS certificates`

## Environment Variables

All configuration options support environment variable overrides with the prefix `TYK_GW_EXTERNAL_SERVICES_`:

```bash
# Global proxy settings
export TYK_GW_EXTERNAL_SERVICES_PROXY_HTTP_PROXY="http://localhost:3128"
export TYK_GW_EXTERNAL_SERVICES_PROXY_HTTPS_PROXY="http://localhost:3128"
export TYK_GW_EXTERNAL_SERVICES_PROXY_NO_PROXY="localhost,127.0.0.1"

# OAuth-specific settings
export TYK_GW_EXTERNAL_SERVICES_OAUTH_MTLS_ENABLED="true"
export TYK_GW_EXTERNAL_SERVICES_OAUTH_MTLS_CERT_FILE="/etc/tyk/certs/oauth-client.crt"
export TYK_GW_EXTERNAL_SERVICES_OAUTH_MTLS_KEY_FILE="/etc/tyk/certs/oauth-client.key"
```

## Complete Configuration Reference

For detailed information about all configuration parameters, see the [Gateway Configuration Options]({{< ref "tyk-oss-gateway/configuration" >}}) documentation.

The External Services Configuration feature represents a significant enhancement to Tyk Gateway's enterprise capabilities, providing the foundation for secure, performant, and manageable external service integrations at scale.