---
title: "Launch Tyk Developer Enterprise Portal with helm chart"
date: 2022-02-08
tags: ["Install the portal with helm chart", "Tyk Developer Enterprise Portal"]
description: "Guide for installing the Tyk Developer Enterprise Portal using helm"
menu:
  main:
    parent: "Launching the Tyk Developer Enterprise Portal"
weight: 5
---

## Introduction
To launch the portal using helm chart, you need to take the following steps:
- Create the `tyk-enterprise-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart

This guide provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal using helm charts.

### Create the `tyk-enterprise-portal-conf` secret  
Make sure the `tyk-enterprise-portal-conf` secret exists in your namespace.

If it does not, you can create it by running the following command. 

```
kubectl create secret generic tyk-enterprise-portal-conf -n ${NAMESPACE} \
  --from-literal=TYK_ORG=${TYK_ORG} \
  --from-literal=TYK_AUTH=${TYK_AUTH}
```

Where `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard Organisation ID and the Tyk Dashboard API Access Credentials respectively. Which can be obtained under your profile in the Tyk Dashboard. 

This secret will automatically be generated during the Tyk Dashboard bootstrap if the `dash.enterprisePortalSecret` value is set to `true` in the `values.yaml`.

### Specify config settings for the portal
You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}`with the helm upgrade command:

|  | Description                      | Field name                                 |
|--|----------------------------------|--------------------------------------------|
|1.| Enable portal installation       | `enterprisePortal.enabled`                 |
|2.| Enable portal bootstrapping      | `enterprisePortal.bootstrap`               |
|3.| Portal license                   | `enterprisePortal.license`                 |
|4.| Portal storage type              | `enterprisePortal.storage.type`            |
|5.| Portal storage connection string | `enterprisePortal.storage.connectionString`|

### Launch the portal using the helm chart
Run the following command to update your infrastructure and install the developer portal:
```shell
helm upgrade tyk-pro tyk-helm/tyk-pro -f values.yaml -n tyk
```

{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it. For detailed instructions, please refer to [the bootstrapping documentation]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/bootstrapping-portal.md" >}}).
{{</ note >}}

>**Note**: Helm chart supports Enterprise Portal v1.2.0+.