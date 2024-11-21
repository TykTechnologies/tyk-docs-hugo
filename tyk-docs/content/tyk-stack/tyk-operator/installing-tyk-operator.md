---
date: 2017-03-24T16:39:31Z
title: Installing Tyk Operator
weight: 1
menu:
  main:
    parent: "Getting started with Tyk Operator"
---

Follow this guide to install and configure Tyk Operator using [Helm](https://helm.sh/docs/) to manage API resources on
one Tyk Gateway or Dashboard. Since Tyk Operator is a cluster-scoped resource, it should be deployed once for a cluster
only. For advanced usage where you need to connect to multiple Tyk installations or Organizations, see [Managing
Multiple Organizations with Operator Context]({{<ref "product-stack/tyk-operator/getting-started/tyk-operator-multiple-organisations">}}).

## Prerequisites

- [Kubernetes v1.19+](https://kubernetes.io/docs/setup/)
- [Helm 3+](https://helm.sh/docs/intro/install/)
- Kubernetes Cluster Admin rights for installing
  [CustomResourceDefinitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/)
- [cert-manager v1.8+](https://cert-manager.io/docs/installation/kubectl/). Check
  [cert-manager installation guide](#installing-cert-manager) if you do not have it.
- Tyk Gateway or Tyk Dashboard v3+. Check [Required Tyk configurations](#configuring-tyk) for necessary configurations.
- Tyk Operator license key. Starting from Tyk Operator v1.0, a valid [license key](#obtain-a-license-key) is required.

{{< note success >}}

###### **Note**

Tyk Operator supports any Tyk installation whether it is on Tyk Cloud, Hybrid, or self-managed. You only need to make
sure that the control plane URL is accessible by Tyk Operator. {{< /note >}}

{{< note success >}}

###### **Obtain a license key**

Starting from Tyk Operator v1.0, a license key is required to use the Tyk Operator. Prospects can obtain a license by
using our [contact form](https://tyk.io/contact/). For existing customers, please reach out to your account manager
directly. If you're unsure who to contact, you can also use the contact form and our team will guide you accordingly.
{{< /note >}}

{{< button_left href="https://tyk.io/sign-up" color="green" content="Free Trial" >}}

### Configuring Tyk

We assume you have already installed Tyk. If you don’t have it, check out [Tyk
Cloud]({{<ref "deployment-and-operations/tyk-cloud-platform/quick-start">}}) or [Tyk Self
Managed]({{<ref "getting-started/installation">}}) page. [Tyk Helm
Chart]({{<ref "product-stack/tyk-charts/overview">}}) is the preferred (and easiest) way to install Tyk on Kubernetes.

In order for policy ID matching to work correctly, Dashboard must have `allow_explicit_policy_id` and
`enable_duplicate_slugs` set to `true` and Gateway must have `policies.allow_explicit_policy_id` set to `true`.

Tyk Operator needs a [user credential]({{<ref "product-stack/tyk-operator/key-concepts/operator-user">}}) to connect with
Tyk Dashboard. The Operator user should have write access to the resources it is going to manage, e.g. APIs, Certificates,
Policies, and Portal. It is the recommended practice to turn off write access for other users for the above resources. See
[Using Tyk Operator to enable GitOps with Tyk]({{< ref "getting-started/key-concepts/gitops-with-tyk" >}}) about
maintaining a single source of truth for your API configurations.

### Installing cert-manager

Tyk Operator uses cert-manager to provision certificates for the webhook server. If you don't have cert-manager
installed, you can follow this command to install it:

```console
$ kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
```

Since Tyk Operator supports Kubernetes v1.19+, the minimum cert-manager version you can use is v1.8. If you run into the
cert-manager related errors, please ensure that the desired version of Kubernetes version works with the chosen version
of cert-manager by checking [supported releases page](https://cert-manager.io/docs/installation/supported-releases/) and
[cert-manager documentation](https://cert-manager.io/docs/installation/supported-releases/).

Please wait for the cert-manager to become available before continuing with the next step.

## Installation steps

### Option 1: Installing Tyk Operator via Tyk's Umbrella Helm Charts

If you are using [Tyk Stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}), [Tyk Control
Plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}), or [Tyk Open
Source Chart]({{<ref "product-stack/tyk-charts/tyk-oss-chart">}}), you can install Tyk Operator alongside other Tyk
components by setting value `global.components.operator` to `true`.

Starting from Tyk Operator v1.0, a license key is required to use the Tyk Operator. You can provide it while installing
Tyk Stack, Tyk Control Plane or Tyk OSS helm chart by setting `global.license.operator` field. You can also set license
key via a Kubernetes secret using `global.secrets.useSecretName` field. The secret should contain a key called
`OperatorLicense`

### Option 2: Installing Tyk Operator via stand-alone Helm Chart

If you prefer to install Tyk Operator separately, follow this section to install Tyk Operator using Helm.

#### Step 1: Configure Tyk Operator via environment variable or tyk-operator-conf secret

Tyk Operator configurations can be set using `envVars` field of helm chart. See the table below for a list of expected
environment variable names and example values.

```yaml
envVars:
  - name: TYK_OPERATOR_LICENSEKEY
    value: "{YOUR_LICENSE_KEY}"
  - name: TYK_MODE
    value: "pro"
  - name: TYK_URL
    value: "http://dashboard-svc-tyk-tyk-dashboard.tyk.svc:3000"
  - name: TYK_AUTH
    value: "2d095c2155774fe36d77e5cbe3ac963b"
  - name: TYK_ORG
    value: "5e9d9544a1dcd60001d0ed20"
```

It can also be set via a Kubernetes secret. The default K8s secret name is `tyk-operator-conf`. If you want to use
another name, configure it through Helm Chart [envFrom](#helm-configurations) value.

The Kubernetes secret or envVars field should set the following keys:

{{< tabs_start >}}

{{< tab_start "Licensed mode (Self-managed or Tyk Cloud)" >}}

| Key                          | Mandatory | Example Value                                       | Description                                                                                                                  |
| :--------------------------- | :-------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| TYK_OPERATOR_LICENSEKEY      | Yes       | <JWT_ENCODED_LICENSE_KEY>                           | Tyk Operator license key                                                                                                     |
| TYK_MODE                     | Yes       | pro                                                 | “ce” for Tyk Open Source mode, “pro” for Tyk licensed mode.                                                                  |
| TYK_URL                      | Yes       | http://dashboard-svc-tyk-tyk-dashboard.tyk.svc:3000 | Management URL of Tyk Gateway (Open Source) or Tyk Dashboard                                                                 |
| TYK_AUTH                     | Yes       | 2d095c2155774fe36d77e5cbe3ac963b                    | Operator user API key.                                                                                                       |
| TYK_ORG                      | Yes       | 5e9d9544a1dcd60001d0ed20                            | Operator user ORG ID.                                                                                                        |
| TYK_TLS_INSECURE_SKIP_VERIFY | No        | true                                                | Set to `“true”` if the Tyk URL is HTTPS and has a self-signed certificate. If it isn't set, the default value is `false`.    |
| WATCH_NAMESPACE              | No        | foo,bar                                             | Comma separated list of namespaces for Operator to operate on. The default is to operate on all namespaces if not specified. |
| WATCH_INGRESS_CLASS          | No        | customclass                                         | Define the ingress class Tyk Operator should watch. Default is `tyk`                                                         |
| TYK_HTTPS_INGRESS_PORT       | No        | 8443                                                | Define the ListenPort for HTTPS ingress. Default is `8443`.                                                                  |
| TYK_HTTP_INGRESS_PORT        | No        | 8080                                                | Define the ListenPort for HTTP ingress. Default is `8080`.                                                                   |

{{< tab_end >}}

{{< tab_start "Open Source" >}}

**Note**: From Tyk Operator v1.0, although Tyk Operator is compatible with the Open Source Tyk Gateway, a valid license
key is required for running Tyk Operator.

| Key                          | Mandatory | Example Value                                      | Description                                                                                                                  |
| :--------------------------- | :-------- | :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| TYK_OPERATOR_LICENSEKEY      | Yes       | <JWT_ENCODED_LICENSE_KEY>                          | Tyk Operator license key                                                                                                     |
| TYK_MODE                     | Yes       | ce                                                 | “ce” for Tyk Open Source mode, “pro” for Tyk licensed mode.                                                                  |
| TYK_URL                      | Yes       | http://gateway-svc-tyk-ce-tyk-gateway.tyk.svc:8080 | Management URL of Tyk Gateway (Open Source) or Tyk Dashboard                                                                 |
| TYK_AUTH                     | Yes       | myapisecret                                        | Operator user API key.                                                                                                       |
| TYK_ORG                      | Yes       | myorgid                                            | Operator user ORG ID.                                                                                                        |
| TYK_TLS_INSECURE_SKIP_VERIFY | No        | true                                               | Set to `“true”` if the Tyk URL is HTTPS and has a self-signed certificate. If it isn't set, the default value is `false`.    |
| WATCH_NAMESPACE              | No        | foo,bar                                            | Comma separated list of namespaces for Operator to operate on. The default is to operate on all namespaces if not specified. |
| WATCH_INGRESS_CLASS          | No        | customclass                                        | Define the ingress class Tyk Operator should watch. Default is `tyk`                                                         |
| TYK_HTTPS_INGRESS_PORT       | No        | 8443                                               | Define the ListenPort for HTTPS ingress. Default is `8443`.                                                                  |
| TYK_HTTP_INGRESS_PORT        | No        | 8080                                               | Define the ListenPort for HTTP ingress. Default is `8080`.                                                                   |

{{< tab_end >}}

{{< tabs_end >}}

##### Connection to Tyk Gateway or Dashboard

If you install Tyk using Helm Chart, `tyk-operator-conf` will have been created with the following keys:
`TYK_OPERATOR_LICENSEKEY, TYK_AUTH, TYK_MODE, TYK_ORG`, and `TYK_URL` by default. If you didn't use Helm Chart for
installation, please prepare `tyk-operator-conf` secret yourself using the commands below:

```console
$ kubectl create namespace tyk-operator-system

$ kubectl create secret -n tyk-operator-system generic tyk-operator-conf \
  --from-literal "TYK_OPERATOR_LICENSEKEY=${TYK_OPERATOR_LICENSEKEY}" \
  --from-literal "TYK_AUTH=${TYK_AUTH}" \
  --from-literal "TYK_ORG=${TYK_ORG}" \
  --from-literal "TYK_MODE=${TYK_MODE}" \
  --from-literal "TYK_URL=${TYK_URL}"
```

{{< note success >}} **Note**

User API key and Organization ID can be found under "Add / Edit User" page within Tyk Dashboard. `TYK_AUTH` corresponds
to <b>Tyk Dashboard API Access Credentials</b>. `TYK_ORG` corresponds to <b>Organization ID</b>. {{< /note >}}

{{< note success >}} **Note**

If the credentials embedded in the `tyk-operator-conf` are ever changed or updated, the tyk-operator-controller-manager
pod must be restarted to pick up these changes. {{< /note >}}

##### Watching Namespaces

Tyk Operator is installed with cluster permissions. However, you can optionally control which namespaces it watches by
setting the `WATCH_NAMESPACE` through `tyk-operator-conf` secret or the environment variable to a comma separated list
of k8s namespaces. For example:

- `WATCH_NAMESPACE=""` will watch for resources across the entire cluster.
- `WATCH_NAMESPACE="foo"` will watch for resources in the `foo` namespace.
- `WATCH_NAMESPACE="foo,bar"` will watch for resources in the `foo` and `bar` namespace.

##### Watching custom ingress class

You can configure [Tyk Operator as Ingress Controller]({{<ref "product-stack/tyk-operator/tyk-ingress-controller">}}) so
that [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources can be managed by Tyk as
APIs. By default, Tyk Operator looks for the value `tyk` in Ingress resources `kubernetes.io/ingress.class` annotation
and will ignore all other ingress classes. If you want to override this default behavior, you may do so by setting
[WATCH_INGRESS_CLASS](#watching-custom-ingress-class) through `tyk-operator-conf` or the environment variable.

#### Step 2: Installing Tyk Operator and Custom Resource Definitions (CRDs)

You can install CRDs and Tyk Operator using the stand-alone Helm Chart by running the following command:

```console
$ helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
$ helm repo update

$ helm install tyk-operator tyk-helm/tyk-operator -n tyk-operator-system
```

This process will deploy Tyk Operator and its required Custom Resource Definitions (CRDs) into your Kubernetes cluster
in `tyk-operator-system` namespace.

##### Helm configurations

| Key                                         | Type   | Default                                |
| ------------------------------------------- | ------ | -------------------------------------- |
| envFrom[0].secretRef.name                   | string | `"tyk-operator-conf"`                  |
| envVars[0].name                             | string | `"TYK_OPERATOR_LICENSEKEY"`            |
| envVars[0].value                            | string | `"{OPERATOR_LICENSEKEY}"`              |
| envVars[1].name                             | string | `"TYK_HTTPS_INGRESS_PORT"`             |
| envVars[1].value                            | string | `"8443"`                               |
| envVars[2].name                             | string | `"TYK_HTTP_INGRESS_PORT"`              |
| envVars[2].value                            | string | `"8080"`                               |
| extraVolumeMounts                           | list   | `[]`                                   |
| extraVolumes                                | list   | `[]`                                   |
| fullnameOverride                            | string | `""`                                   |
| healthProbePort                             | int    | `8081`                                 |
| hostNetwork                                 | bool   | `false`                                |
| image.pullPolicy                            | string | `"IfNotPresent"`                       |
| image.repository                            | string | `"tykio/tyk-operator"`                 |
| image.tag                                   | string | `"v1.0.0"`                             |
| imagePullSecrets                            | list   | `[]`                                   |
| metricsPort                                 | int    | `8080`                                 |
| nameOverride                                | string | `""`                                   |
| nodeSelector                                | object | `{}`                                   |
| podAnnotations                              | object | `{}`                                   |
| podSecurityContext.allowPrivilegeEscalation | bool   | `false`                                |
| rbac.image.pullPolicy                       | string | `"IfNotPresent"`                       |
| rbac.image.repository                       | string | `"gcr.io/kubebuilder/kube-rbac-proxy"` |
| rbac.image.tag                              | string | `"v0.8.0"`                             |
| rbac.port                                   | int    | `8443`                                 |
| rbac.resources                              | object | `{}`                                   |
| replicaCount                                | int    | `1`                                    |
| resources                                   | object | `{}`                                   |
| serviceMonitor                              | bool   | `false`                                |
| webhookPort                                 | int    | `9443`                                 |

## Upgrading Tyk Operator

### Upgrading from v0.x to v1.0+

Starting from Tyk Operator v1.0, a valid license key is required for the Tyk Operator to function. If Tyk Operator is
upgraded from v0.x versions to one of v1.0+ versions, Tyk Operator needs a valid license key that needs to be provided
during upgrade process. This section describes how to set Tyk Operator license key to make sure Tyk Operator continues
functioning.

{{< note >}} When upgrading Tyk Operator between licensed versions, follow the standard upgrade procedure described
under [Upgrading
Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator#upgrading-tyk-operator-and-crds">}}) section. It is
important to note that this process differs if transitioning from an unlicensed to a licensed version. {{< /note >}}

To provide the license key for Tyk Operator, Kubernetes secret used to configure Tyk Operator (typically named
tyk-operator-conf as described above) requires an additional field called `TYK_OPERATOR_LICENSEKEY`. Populate this field
with your Tyk Operator license key.

To configure the license key:

1. Locate the Kubernetes Secret used to configure Tyk Operator (typically named `tyk-operator-conf`).
2. Add a new field called `TYK_OPERATOR_LICENSEKEY` to this Secret.
3. Set the value of `TYK_OPERATOR_LICENSEKEY` to your Tyk Operator license key.

After updating the Kubernetes secret with this field, proceed with the standard upgrade process outlined below.

### Upgrading Tyk Operator and CRDs

You can upgrade Tyk Operator through Helm Chart by running the following command:

```console
$ helm upgrade -n tyk-operator-system tyk-operator tyk-helm/tyk-operator --wait
```

[Helm does not upgrade or delete CRDs](https://helm.sh/docs/chart_best_practices/custom_resource_definitions/#some-caveats-and-explanations)
when performing an upgrade. Because of this restriction, an additional step is required when upgrading Tyk Operator with
Helm.

```console
$ kubectl apply -f https://raw.githubusercontent.com/TykTechnologies/tyk-charts/refs/heads/main/tyk-operator-crds/crd-$TYK_OPERATOR_VERSION.yaml
```

{{< note success >}} Replace $TYK_OPERATOR_VERSION with the image tag corresponding to the Tyk Operator version to which
the Custom Resource Definitions (CRDs) belong. For example, to install CRDs compatible with Tyk Operator v1.0.0, set
$TYK_OPERATOR_VERSION to v1.0.0. {{< /note >}}

## Uninstalling Tyk Operator

To uninstall Tyk Operator, you need to run the following command:

```console
$ helm delete tyk-operator -n tyk-operator-system
```
