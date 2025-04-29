---
title: "Installation (Helm/Kubernetes)"
weight: 2
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---

# Installation (Helm/Kubernetes)

This guide explains how to deploy Tyk AI Studio (Tyk AI Studio), a secure and extensible AI gateway, using Helm on Kubernetes.

## Prerequisites

- Kubernetes 1.16+
- Helm 3.0+
- kubectl configured with access to your cluster
- A `tykAiLicense` string from Tyk Technologies
- A securely generated `TYK_AI_SECRET_KEY` string for secrets encryption
- If using SSL/TLS: cert-manager installed in your cluster

*Note: The following examples use placeholder values (e.g., `your-domain.com`, `your-secret-key`). Remember to replace these with your actual configuration values.*

## Installation Options

Tyk AI Studio can be deployed in several configurations:

1. Local Development
2. Production without TLS
3. Production with TLS
4. Production with External Database

### Option 1: Local Development Setup

1. Create a `values-local.yaml` file:

```yaml
midsommar:
  ingress:
    enabled: false
  service:
    type: NodePort
    ports:
      - name: http
        port: 8080
        nodePort: 32580
      - name: gateway
        port: 9090
        nodePort: 32590

config:
  allowRegistrations: "true"
  adminEmail: "admin@localhost"
  siteUrl: "http://localhost:32580"
  fromEmail: "noreply@localhost"
  devMode: "true"
  databaseType: "postgres"
  tykAiSecretKey: "your-secret-key"
  tykAiLicense: "your-license"

database:
  internal: true
  user: "postgres"
  password: "localdev123"
  name: "midsommar"

# Optional AI components
reranker:
  enabled: true
  image:
    repository: tykio/reranker_cpu
    tag: latest

transformer-server:
  enabled: true
  image:
    repository: tykio/transformer_server_cpu
    tag: latest
```

2. Install the chart:

```bash
helm install midsommar . -f values-local.yaml
```

3. Access the application:
- Web Interface: http://localhost:32580
- Gateway: http://localhost:32590

### Option 2: Production without TLS

For a production deployment without TLS certificates:

1. Create `values-prod-no-tls.yaml`:

```yaml
midsommar:
  ingress:
    enabled: true
    certificateEnabled: false
    className: nginx
    hosts:
      - host: app.yourdomain.com
        paths:
          - path: /
            pathType: Prefix
            port: 8080
      - host: gateway.yourdomain.com
        paths:
          - path: /
            pathType: Prefix
            port: 9090

config:
  allowRegistrations: "true"
  adminEmail: "admin@yourdomain.com"
  siteUrl: "http://app.yourdomain.com"
  fromEmail: "noreply@yourdomain.com"
  devMode: "false"
  databaseType: "postgres"
  tykAiSecretKey: "your-production-key"
  tykAiLicense: "your-production-license"

database:
  internal: false
  host: "your-db-host"
  port: 5432
  name: "midsommar"
  user: "your-db-user"
  password: "your-db-password"
```

2. Install:

```bash
helm install midsommar . -f values-prod-no-tls.yaml
```

### Option 3: Production with TLS

For a secure production deployment with TLS:

1. Create `values-prod-tls.yaml`:

```yaml
midsommar:
  ingress:
    enabled: true
    certificateEnabled: true
    className: nginx
    certManager:
      issuer: letsencrypt-prod
    hosts:
      - host: app.yourdomain.com
        paths:
          - path: /
            pathType: Prefix
            port: 8080
      - host: gateway.yourdomain.com
        paths:
          - path: /
            pathType: Prefix
            port: 9090
    tls:
      - secretName: app-tls-secret
        hosts:
          - app.yourdomain.com
      - secretName: gateway-tls-secret
        hosts:
          - gateway.yourdomain.com

config:
  allowRegistrations: "true"
  adminEmail: "admin@yourdomain.com"
  siteUrl: "https://app.yourdomain.com"
  fromEmail: "noreply@yourdomain.com"
  devMode: "false"
  databaseType: "postgres"
  tykAiSecretKey: "your-production-key"
  tykAiLicense: "your-production-license"

database:
  internal: false
  url: "postgres://user:password@your-production-db:5432/midsommar"
```

2. Install:

```bash
helm install midsommar . -f values-prod-tls.yaml
```

## Optional Components

### Reranker Service

The Reranker service improves RAG result relevance. Enable it with:

```yaml
reranker:
  enabled: true
  image:
    repository: tykio/reranker_cpu
    tag: latest
  resources:
    requests:
      cpu: 500m
      memory: 1Gi
```

### Transformer Server

The Transformer Server handles embedding generation and model inference. Enable it with:

```yaml
transformer-server:
  enabled: true
  image:
    repository: tykio/transformer_server_cpu
    tag: latest
  resources:
    requests:
      cpu: 500m
      memory: 1Gi
```

## Database Options

### Using Internal PostgreSQL

For development or small deployments:

```yaml
database:
  internal: true
  user: "postgres"
  password: "secure-password"
  name: "midsommar"

postgres:
  persistence:
    enabled: true
    size: 10Gi
    storageClass: "standard"
```

### Using External Database

For production environments:

```yaml
database:
  internal: false
  url: "postgres://user:password@your-db-host:5432/midsommar"
```

## Maintenance

### Upgrading

To upgrade an existing installation:

```bash
helm upgrade midsommar . -f your-values.yaml
```

### Uninstalling

To remove the deployment:

```bash
helm uninstall midsommar
```

### Viewing Logs

```bash
# Main application logs
kubectl logs -l app.kubernetes.io/name=midsommar

# Database logs (if using internal database)
kubectl logs -l app=postgres

# Optional component logs
kubectl logs -l app=reranker
kubectl logs -l app=transformer
```

## Troubleshooting

1. Check pod status:
```bash
kubectl get pods
```

2. Check ingress configuration:
```bash
kubectl get ingress
```

3. View pod details:
```bash
kubectl describe pod <pod-name>
```

4. Common issues:
- Database connection failures: Check credentials and network access
- Ingress not working: Verify DNS records and TLS configuration
- Resource constraints: Check pod resource limits and node capacity

## Next Steps

Once deployed, proceed to the [Initial Configuration](./configuration.md) guide to set up Tyk AI Studio.
