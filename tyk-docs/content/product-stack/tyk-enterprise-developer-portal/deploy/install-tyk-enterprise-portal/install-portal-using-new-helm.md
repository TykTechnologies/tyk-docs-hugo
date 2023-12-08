---
title: "Install Tyk Enterprise Developer Portal with new helm chart"
date: 2023-12-06
tags: ["Install the portal with new helm chart", "Tyk Enterprise Developer Portal"]
description: "Guide for installing the Tyk Enterprise Developer Portal in Kubernetes using new helm chart"
menu:
  main:
    parent: "Installation options"
weight: 4
---

There are two ways to install Tyk Enterprise Developer Portal. You can enable `global.components.devPortal` during Tyk Self-Managed deployment by following the [Tyk Self-Managed installation instruction]({{< ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack" >}}) using our `tyk-stack` umbrella chart. It will install Tyk Enterprise Developer Portal together with Tyk Gateway and Dashboard in the same namespace.

Alternatively, you can install Tyk Enterprise Developer Portal as standalone component using our `tyk-dev-portal` chart. This page provides a clear and concise, step-by-step guide for installing the Tyk Enterprise Developer Portal as standalone component using the new helm chart.

To install the portal using helm charts, you need to take the following steps:

- Create the `tyk-dev-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart


### Create the `tyk-dev-portal-conf` secret

Make sure the `tyk-dev-portal-conf` secret exists in your namespace. 
This secret will automatically be generated if Tyk Dashboard instance was bootstrapped with [tyk-boostrap](https://artifacthub.io/packages/helm/tyk-helm/tyk-bootstrap) component chart 
and `bootstrap.devPortal` was set to `true` in the `values.yaml`.

If the secret does not exist, you can create it by running the following command.

```bash
kubectl create secret generic tyk-dev-portal-conf -n ${NAMESPACE} \
  --from-literal=TYK_ORG=${TYK_ORG} \
  --from-literal=TYK_AUTH=${TYK_AUTH}
```

The fields `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard _Organisation ID_ and the Tyk Dashboard API _Access Credentials_ respectively. These can be obtained under your profile in the Tyk Dashboard.

### Config settings

You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}` using the helm upgrade command:

| Field Name | Description |
| ---------- | ----------- |
| `global.secrets.devPortal` | Enable portal bootstrapping by providing secret name |
| `license` | Tyk license key for your portal installation |
| `storage.type` | Portal storage type, e.g. *fs*, *s3* and *db* |
| `image.tag` | Enterprise Portal version. You can get the latest version image tag from [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) |
| `database.dialect` | Portal database dialect, e.g. *mysql*, *postgres* and *sqlite3* |
| `database.connectionString`| Connection string to the Portal's database, e.g. for the *mysql* dialect: `admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true` |

In addition to `values.yaml`, you can also define the environment variables described in the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) to further customise your portal deployment. These environment variables can also be listed as a name value list under the `extraEnvs` section of the helm chart.

### Launch the portal using the helm chart

Run the following command to update your infrastructure and install the developer portal:

```bash
helm install tyk-dev-portal tyk-helm/tyk-dev-portal -f values.yaml -n tyk
```

### Configuration
Please refer to this [guide]({{<ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack.md">}}) for an explanation of all configuration options.

> **Note**: Helm chart supports Enterprise Portal v1.2.0+.
