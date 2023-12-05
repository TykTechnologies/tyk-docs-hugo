---
title: "Install Tyk Enterprise Developer Portal with legacy helm chart"
date: 2022-02-08
tags: ["Install the portal with legacy helm chart", "Tyk Enterprise Developer Portal"]
description: "Guide for installing the Tyk Enterprise Developer Portal in Kubernetes using helm"
menu:
  main:
    parent: "Installation options"
weight: 4
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm
---

{{< warning success >}}
**Note**

It is recommended to use new helm charts instead of legacy charts. Guide for new charts can be found [here]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/kubernetes/install-portal-using-new-helm.md">}})

{{< /warning >}}

## Introduction

To install the portal using helm charts, you need to take the following steps:

- Create the `tyk-enterprise-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart

This guide provides a clear and concise, step-by-step recipe for installing the Tyk Enterprise Developer Portal using helm charts.

### Create the `tyk-enterprise-portal-conf` secret

Make sure the `tyk-enterprise-portal-conf` secret exists in your namespace. This secret will automatically be generated during the Tyk Dashboard bootstrap if the `dash.enterprisePortalSecret` value is set to `true` in the `values.yaml`.

If the secret does not exist, you can create it by running the following command.

```bash
kubectl create secret generic tyk-enterprise-portal-conf -n ${NAMESPACE} \
  --from-literal=TYK_ORG=${TYK_ORG} \
  --from-literal=TYK_AUTH=${TYK_AUTH}
```

Where `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard Organisation ID and the Tyk Dashboard API Access Credentials respectively. Which can be obtained under your profile in the Tyk Dashboard.

### Config settings

You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}` with the helm upgrade command:

<table>
  <thead>
    <tr>
      <th></th>
      <th>
        Description
      </th>
      <th>
        Field name
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1.
      </td>
      <td>
        Enable portal installation
      </td>
      <td>
        <code>enterprisePortal.enabled</code>
      </td>
    </tr>
    <tr>
      <td>
        2.
      </td>
      <td>
        Enable portal bootstrapping
      </td>
      <td>
        <code>enterprisePortal.bootstrap</code>
      </td>
    </tr>
    <tr>
      <td>
        3.
      </td>
      <td>
        Tyk license key for your portal installation
      </td>
      <td>
        <code>enterprisePortal.license</code>
      </td>
    </tr>
    <tr>
      <td>
        4.
      </td>
      <td>
        Portal database dialect. Available dialects are:
        <ul>
        <li><code>mysql</code></li>
        <li><code>postgres</code></li>
        <li><code>sqlite3</code></li>
        </ul>
      </td>
      <td>
        <code>enterprisePortal.storage.type</code>
      </td>
    </tr>
    <tr>
      <td>
        5.
      </td>
      <td>
Connection string to the portal's database.
<br/>

An example for the `mysql` dialect:

<code>
admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true
</code>

<br/>
       </td>
      <td>
        <code>enterprisePortal.storage.connectionString</code>
      </td>
    </tr>
  </tbody>
</table>

In addition to value.yaml, you can also define the environment variables described in [the Configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) to further customize your portal deployment. These environment variables can also be listed as a name value list under the `extraEnvs` section of the helm chart.

### Launch the portal using the helm chart

Run the following command to update your infrastructure and install the developer portal:

```console
helm upgrade tyk-pro tyk-helm/tyk-pro -f values.yaml -n tyk
```

{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it. For detailed instructions, please refer to the [bootstrapping documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}).
{{</ note >}}

> **Note**: Helm chart supports Enterprise Portal v1.2.0+.
