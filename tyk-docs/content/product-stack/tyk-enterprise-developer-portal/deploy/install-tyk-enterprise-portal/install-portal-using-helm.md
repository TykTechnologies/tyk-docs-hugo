---
title: "Install Tyk Enterprise Developer Portal with legacy helm chart"
date: 2022-02-08
tags: ["Install the portal with legacy helm chart", "Tyk Enterprise Developer Portal"]
description: "Guide for installing the Tyk Enterprise Developer Portal in Kubernetes using helm"
menu:
  main:
    parent: "Installation options"
weight: 5
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm
---

{{< warning success >}}
**Note**

It is recommended to use new helm charts instead of legacy charts. Guide for new charts can be found [here]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-new-helm.md">}})

{{< /warning >}}

To install the portal using helm charts, you need to take the following steps:

- Create the `tyk-enterprise-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart

This guide provides a clear and concise, step-by-step recipe for installing the Tyk Enterprise Developer Portal using helm charts.

## Create the `tyk-enterprise-portal-conf` secret

Make sure the `tyk-enterprise-portal-conf` secret exists in your namespace. This secret will automatically be generated during the Tyk Dashboard bootstrap if the `dash.enterprisePortalSecret` value is set to `true` in the `values.yaml`.

If the secret does not exist, you can create it by running the following command.

```bash
kubectl create secret generic tyk-enterprise-portal-conf -n ${NAMESPACE} \
  --from-literal=TYK_ORG=${TYK_ORG} \
  --from-literal=TYK_AUTH=${TYK_AUTH}
```

Where `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard Organization ID and the Tyk Dashboard API Access Credentials respectively. Which can be obtained under your profile in the Tyk Dashboard.

## Config settings

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}` with the helm upgrade command:

| Field Name | Description |
| ---------- | ----------- |
| `enterprisePortal.enabled` | Enable Portal installation |
| `enterprisePortal.bootstrap` | Enable Portal bootstrapping |
| `enterprisePortal.license`| Tyk license key for your portal installation |
| `enterprisePortal.storage.type`| Portal database dialect, e.g *mysql*, *postgres* or *sqlite3* |
| `enterprisePortal.storage.connectionString` | Connection string to the Portal's database, e.g for the mysql dialect: `admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true` |

In addition to values.yaml, you can also define the environment variables described in the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) to further customize your portal deployment. These environment variables can also be listed as a name value list under the `extraEnvs` section of the helm chart.

### Launch the portal using the helm chart

Run the following command to update your infrastructure and install the developer portal:

```bash
helm upgrade tyk-pro tyk-helm/tyk-pro -f values.yaml -n tyk
```

{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it. For detailed instructions, please refer to the [bootstrapping documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}).
{{</ note >}}

> **Note**: Helm chart supports Enterprise Portal v1.2.0+.
