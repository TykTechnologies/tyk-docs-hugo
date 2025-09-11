---
title: "Installation (Kubernetes)"
date: 2025-04-25
tags: ["AI Studio", "AI Management"]
description: "Install Tyk AI Studio"
keywords: ["AI Studio", "AI Management"]
---

This guide explains how to deploy Tyk AI Studio, a secure and extensible AI gateway, using pure Kubernetes manifests.

## Prerequisites

- Kubernetes 1.16+
- kubectl configured with access to your cluster
- A `TYK_AI_LICENSE` string from Tyk Technologies (contact support@tyk.io or your account manager to obtain)
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

1. Create a `local-deployment.yaml` file:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tyk-ai-studio
---
apiVersion: v1
kind: Secret
metadata:
  name: tyk-ai-config
  namespace: tyk-ai-studio
type: Opaque
stringData:
  ALLOW_REGISTRATIONS: "true"
  ADMIN_EMAIL: "admin@localhost"
  SITE_URL: "http://localhost:32580"
  FROM_EMAIL: "noreply@localhost"
  DEV_MODE: "true"
  DATABASE_TYPE: "postgres"
  TYK_AI_SECRET_KEY: "your-secret-key"
  TYK_AI_LICENSE: "your-license"
  DATABASE_URL: "postgres://postgres:localdev123@postgres:5432/tyk-ai-studio"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: tyk-ai-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: "tyk-ai-studio"
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          value: "localdev123"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-data
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: tyk-ai-studio
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tyk-ai-studio
  template:
    metadata:
      labels:
        app: tyk-ai-studio
    spec:
      containers:
      - name: ai-studio
        image: tykio/ai-studio:latest
        envFrom:
        - secretRef:
            name: tyk-ai-config
        ports:
        - containerPort: 8080
        - containerPort: 9090
---
apiVersion: v1
kind: Service
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  type: NodePort
  selector:
    app: tyk-ai-studio
  ports:
  - name: http
    port: 8080
    targetPort: 8080
    nodePort: 32580
  - name: gateway
    port: 9090
    targetPort: 9090
    nodePort: 32590
```

2. Deploy the application:

```bash
kubectl apply -f local-deployment.yaml
```

3. Access the application:
- Web Interface: http://localhost:32580
- Gateway: http://localhost:32590

### Option 2: Production without TLS

For a production deployment without TLS certificates:

1. Create `production-no-tls.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tyk-ai-studio
---
apiVersion: v1
kind: Secret
metadata:
  name: tyk-ai-config
  namespace: tyk-ai-studio
type: Opaque
stringData:
  ALLOW_REGISTRATIONS: "true"
  ADMIN_EMAIL: "admin@yourdomain.com"
  SITE_URL: "http://app.yourdomain.com"
  FROM_EMAIL: "noreply@yourdomain.com"
  DEV_MODE: "false"
  DATABASE_TYPE: "postgres"
  TYK_AI_SECRET_KEY: "your-production-key"
  TYK_AI_LICENSE: "your-production-license"
  DATABASE_URL: "postgres://your-db-user:your-db-password@your-db-host:5432/tyk-ai-studio"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tyk-ai-studio
  template:
    metadata:
      labels:
        app: tyk-ai-studio
    spec:
      containers:
      - name: ai-studio
        image: tykio/ai-studio:latest
        envFrom:
        - secretRef:
            name: tyk-ai-config
        ports:
        - containerPort: 8080
        - containerPort: 9090
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: 1000m
            memory: 2Gi
---
apiVersion: v1
kind: Service
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  selector:
    app: tyk-ai-studio
  ports:
  - name: http
    port: 8080
    targetPort: 8080
  - name: gateway
    port: 9090
    targetPort: 9090
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tyk-ai-studio-ingress
  namespace: tyk-ai-studio
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: app.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tyk-ai-studio
            port:
              number: 8080
  - host: gateway.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tyk-ai-studio
            port:
              number: 9090
```

2. Deploy:

```bash
kubectl apply -f production-no-tls.yaml
```

### Option 3: Production with TLS

For a secure production deployment with TLS:

1. Create `production-tls.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tyk-ai-studio
---
apiVersion: v1
kind: Secret
metadata:
  name: tyk-ai-config
  namespace: tyk-ai-studio
type: Opaque
stringData:
  ALLOW_REGISTRATIONS: "true"
  ADMIN_EMAIL: "admin@yourdomain.com"
  SITE_URL: "https://app.yourdomain.com"
  FROM_EMAIL: "noreply@yourdomain.com"
  DEV_MODE: "false"
  DATABASE_TYPE: "postgres"
  TYK_AI_SECRET_KEY: "your-production-key"
  TYK_AI_LICENSE: "your-production-license"
  DATABASE_URL: "postgres://user:password@your-production-db:5432/tyk-ai-studio"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tyk-ai-studio
  template:
    metadata:
      labels:
        app: tyk-ai-studio
    spec:
      containers:
      - name: ai-studio
        image: tykio/ai-studio:latest
        envFrom:
        - secretRef:
            name: tyk-ai-config
        ports:
        - containerPort: 8080
        - containerPort: 9090
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: 1000m
            memory: 2Gi
---
apiVersion: v1
kind: Service
metadata:
  name: tyk-ai-studio
  namespace: tyk-ai-studio
spec:
  selector:
    app: tyk-ai-studio
  ports:
  - name: http
    port: 8080
    targetPort: 8080
  - name: gateway
    port: 9090
    targetPort: 9090
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: app-tls-certificate
  namespace: tyk-ai-studio
spec:
  secretName: app-tls-secret
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - app.yourdomain.com
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: gateway-tls-certificate
  namespace: tyk-ai-studio
spec:
  secretName: gateway-tls-secret
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - gateway.yourdomain.com
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tyk-ai-studio-ingress
  namespace: tyk-ai-studio
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - app.yourdomain.com
    secretName: app-tls-secret
  - hosts:
    - gateway.yourdomain.com
    secretName: gateway-tls-secret
  rules:
  - host: app.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tyk-ai-studio
            port:
              number: 8080
  - host: gateway.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tyk-ai-studio
            port:
              number: 9090
```

2. Deploy:

```bash
kubectl apply -f production-tls.yaml
```

## Optional Components

### Reranker Service

The Reranker service improves RAG result relevance. Add it to your deployment:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reranker
  namespace: tyk-ai-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reranker
  template:
    metadata:
      labels:
        app: reranker
    spec:
      containers:
      - name: reranker
        image: tykio/reranker_cpu:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: 1000m
            memory: 2Gi
---
apiVersion: v1
kind: Service
metadata:
  name: reranker
  namespace: tyk-ai-studio
spec:
  selector:
    app: reranker
  ports:
  - port: 8080
    targetPort: 8080
```

### Transformer Server

The Transformer Server handles embedding generation and model inference. Add it to your deployment:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: transformer-server
  namespace: tyk-ai-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: transformer-server
  template:
    metadata:
      labels:
        app: transformer-server
    spec:
      containers:
      - name: transformer-server
        image: tykio/transformer_server_cpu:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: 1000m
            memory: 2Gi
---
apiVersion: v1
kind: Service
metadata:
  name: transformer-server
  namespace: tyk-ai-studio
spec:
  selector:
    app: transformer-server
  ports:
  - port: 8080
    targetPort: 8080
```

## Database Options

### Using Internal PostgreSQL

For development or small deployments, you can deploy PostgreSQL within your cluster:

```yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: tyk-ai-studio
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: tyk-ai-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: "tyk-ai-studio"
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          value: "secure-password"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: 500m
            memory: 1Gi
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: tyk-ai-studio
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
```

### Using External Database

For production environments, configure your external database connection in the Secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tyk-ai-config
  namespace: tyk-ai-studio
type: Opaque
stringData:
  DATABASE_URL: "postgres://user:password@your-db-host:5432/tyk-ai-studio"
  # ... other config values
```

## Maintenance

### Upgrading

To upgrade an existing installation:

```bash
# Update the deployment with new configuration
kubectl apply -f your-deployment.yaml

# Or update just the image
kubectl set image deployment/tyk-ai-studio ai-studio=tykio/ai-studio:new-version -n tyk-ai-studio
```

### Uninstalling

To remove the deployment:

```bash
# Delete all resources in the namespace
kubectl delete namespace tyk-ai-studio

# Or delete specific resources
kubectl delete -f your-deployment.yaml
```

### Viewing Logs

```bash
# Main application logs
kubectl logs -l app.kubernetes.io/name=tyk-ai-studio

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

## First User Registration

After deployment, you need to create your first admin user:

1. **Access the application**: Navigate to your configured `SITE_URL` (e.g., `https://app.yourdomain.com`)
2. **Register with admin email**: Use the EXACT email address you set in the `ADMIN_EMAIL` environment variable in your Secret
3. **Complete registration**: The first user who registers with the admin email will automatically become the administrator

{{< note success >}}
**Important**: The first user registration must use the same email address specified in the `ADMIN_EMAIL` environment variable. This user will have full administrative privileges.
{{< /note >}}

## Next Steps

Once deployed and you've registered your first user, proceed to the [First Steps guide]({{< ref "ai-management/ai-studio/configuration" >}}) to configure Tyk AI Studio.
