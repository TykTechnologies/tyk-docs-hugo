---
date: 2017-03-24T16:39:31Z
title: Installing Tyk Operator
weight: 1
menu:
    main:
        parent: "Getting started with Tyk Operator"
---
Tyk Operator is a Kubernetes controller that manages state of Tyk CRDs and reconciles changes with Tyk Gateway or Dashboard. Given Tyk Operator is a cluster-scoped resource, it should be deployed once for a cluster only. Below shows how you can configure Tyk Operator to connect to a Tyk Gateway or Dashboard. For advanced usage where you need to connect to separate Tyk installations or Organizations within the same cluster, see [Operator context](https://github.com/TykTechnologies/tyk-operator/blob/master/docs/operator_context.md)

## Prerequisites

- Kubernetes v1.19+
- Kubernetes Cluster Admin rights for installing CustomResourceDefinitions
- Tyk Gateway or Tyk Dashboard v3+

{{< note success >}}
**Note**  

Tyk Operator supports any Tyk installation whether it is on Tyk Cloud, Hybrid, or self-managed on VMs and K8s. You only need to make sure that the management URL is accessible by Tyk Operator.
{{< /note >}}

## Step 1: Configuring Tyk

We assume you have already installed Tyk. If you don’t have it, check [this](https://tyk.io/docs/getting-started/installation/) page. Tyk Helm Chart is the preferred (and easiest) way to install Tyk on Kubernetes.

{{< note success >}}
**Note**  

Tyk Operator is tested as compatible with v3+ of the Tyk Gateway and Tyk Dashboard.
{{< /note >}}

In order for policy ID matching to work correctly, your Dashboard must have `allow_explicit_policy_id: true` and `enable_duplicate_slugs: true` and your Gateway must have `policies.allow_explicit_policy_id: true`.

For Self Managed / Hybrid edition, you may want to create a user account to be used by Tyk Operator. It should have write access to the resources it is going to manage, e.g. APIs, Certificates, Policies, and Portal.

It is the recommended practice to turn off write access for other users for
the above resources. See [Using Tyk Operator to enable GitOps with Tyk]({{< ref "getting-started/key-concepts/gitops-with-tyk" >}}) about
maintaining a single source of truth for your API configurations.
## Step 2: Installing cert-manager

Tyk Operator uses the cert-manager to provision certificates for the webhook server. If you don't have cert-manager installed, you can follow this command to install it:

```console
$ kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
```

Since Tyk Operator supports Kubernetes v1.19+, the minimum cert-manager version you can use is v1.8.
If you run into the cert-manager related errors, please ensure that the desired version of Kubernetes version works with the chosen version of cert-manager by checking [supported releases page](https://cert-manager.io/docs/installation/supported-releases/) and [cert-manager documentation](https://cert-manager.io/docs/installation/supported-releases/).

Please wait for the cert-manager to become available before continuing with the next step.


## Step 3: Configuring Tyk Operator

Tyk Operator configurations are set via K8s secret. The default K8s secret name is `tyk-operator-conf.` You can use a different secret name by setting it at `envFrom` field of [values.yaml](https://github.com/TykTechnologies/tyk-operator/blob/master/helm/values.yaml). You can also override the configuration values through environment variables by setting `envVars` field in [values.yaml](https://github.com/TykTechnologies/tyk-operator/blob/master/helm/values.yaml) when you install Operator through Helm.

### Connecting to your Tyk Gateway or Dashboard

Tyk Operator needs to connect to a Tyk deployment. It also needs to know whether it is talking to Open Source Gateway or Self Managed installation.
You can see how to set up the connection for Tyk Open Source and Tyk Self Managed respectively:

#### Tyk Open Source

Tyk Operator looks for these Keys from `tyk-operator-conf` secret or from the environment variables to make a connection to the Tyk Gateway.

| Key | Example Value   | Description  |
|:-----|:----------------|:-------------|
| `TYK_MODE` | `ce` | “ce” for Tyk Open Source mode. |
| `TYK_URL` | `http://gateway-svc-ce-tyk-headless.tykce-control-plane.svc.cluster.local:8080` | Management URL of Tyk Gateway (Open Source).|| `TYK_ORG` | `5e9d9544a1dcd60001d0ed20` | Operator user ORG ID.|
| `TYK_AUTH` | `2d095c2155774fe36d77e5cbe3ac963b` | Gateway Management API Key.|
|`TYK_ORG`| `5e9d9544a1dcd60001d0ed20`| Operator User ORG ID|
| `TYK_TLS_INSECURE_SKIP_VERIFY`| `true` | Set to `“true”` if the Tyk URL is HTTPS and has a self-signed certificate. If it isn't set, the default value is `false`.|

For Tyk Open Source, you can create the Kubernetes Secret object `tyk-operator-conf` through `kubectl` by running this command:

```console
$ kubectl create namespace tyk-operator-system

$ kubectl create secret -n tyk-operator-system generic tyk-operator-conf \
  --from-literal "TYK_AUTH=${TYK_AUTH}" \
  --from-literal "TYK_ORG=${TYK_ORG}" \
  --from-literal "TYK_MODE=${TYK_MODE}" \
  --from-literal "TYK_URL=${TYK_URL}" \
  --from-literal "TYK_TLS_INSECURE_SKIP_VERIFY=true"
```

After running the command, the values get automatically Base64 encoded:

```console
$ kubectl get secret/tyk-operator-conf -n tyk-operator-system -o json | jq '.data'
{
  "TYK_AUTH": "NWFhOTIyMTQwMTA0NGYxYzcwZDFjOTUwMDhkMzllZGE=",
  "TYK_MODE": "cHJv",
  "TYK_ORG": "NWY5MmQ5YWQyZGFiMWMwMDAxM2M3NDlm",
  "TYK_URL": "aHR0cDovL2Rhc2hib2FyZC50eWtwcm8tY29udHJvbC1wbGFuZS5zdmMuY2x1c3Rlci5sb2NhbDozMDAw",
  "TYK_TLS_INSECURE_SKIP_VERIFY": "dHJ1ZQ=="
}
```

If you use Helm Chart to deploy Tyk Open Source, you can obtain the values for `TYK_AUTH` and `TYK_ORG` from Helm Chart values.yaml:

- `TYK_AUTH` corresponds to the value of the `secrets.APISecret`.
- `TYK_ORG` corresponds to the value of the `secrets.OrgID`.

#### Tyk Self Managed/ Hybrid

Tyk Operator looks for these keys from `tyk-operator-conf` secret or from the environment variables to make a connection to the Tyk Dashboard.

| Key | Example Value | Description |
|:------|:------------|:-------------|
| `TYK_MODE` | `pro` | “pro” for Tyk Self Managed mode.|
| `TYK_URL` | `http://dashboard.tykpro.svc:3000` | Management URL of your Tyk Dashboard.|
| `TYK_ORG` | `5e9d9544a1dcd60001d0ed20` | Operator user ORG ID.|
| `TYK_AUTH` | `2d095c2155774fe36d77e5cbe3ac963b` | Operator user API Key.|
| `TYK_TLS_INSECURE_SKIP_VERIFY` | `true` | Set to `“true”` if the Tyk URL is HTTPS and has a self-signed certificate. If it isn't set, the default value is `false`.|

There are 2 ways to install Tyk Self Managed, either using Helm or manually:

If you install Tyk Self Managed using Helm, `tyk-operator-conf` will have been created with the following keys: `TYK_AUTH, TYK_MODE, TYK_ORG`, and `TYK_URL` by default.

The following command shows how you can access the value of `TYK_ORG` assuming that Tyk Self Managed is installed in the `tyk` namespace:

```console
$ kubectl get secrets -n tyk tyk-operator-conf --template={{.data.TYK_ORG}} | base64 -d
```

If you install Tyk Self Managed manually, you can access `TYK_AUTH` and `TYK_ORG` values from the dashboard.

Under the Users page, you can click on the Operator user to find associated values for that particular user.

`TYK_AUTH` corresponds to `Tyk Dashboard API Access Credentials`. `TYK_ORG` corresponds to `Organisation ID`. You can follow the instructions for our Tyk Open Source Gateway to create a `tyk-operator-conf` secret using `kubectl` command.

{{< note success >}}
 **Note**
 If the credentials embedded in the `tyk-operator-conf` are ever changed or updated, the tyk-operator-controller-manager pod must be restarted to pick up these changes.
{{< /note >}}

### Other configurations

You can include additional fields in the secret or environment variables to control Tyk Operator. These configuration fields are optional.

Here are the configurations you can use:

| Key | Example Value | Description |
|:-----|:-------------|:------------|
| `WATCH_NAMESPACE` | `foo,bar` | Comma separated list of namespaces for Operator to operate on. The default is to all namespaces if not specified.|
| `WATCH_INGRESS_CLASS` | `customclass` | Define the ingress class Tyk Operator to watch for. Default is `tyk`|
| `TYK_HTTPS_INGRESS_PORT` | `8443` | Define the ListenPort for HTTPS ingress. Default is `8443`.|
| `TYK_HTTP_INGRESS_PORT` | `8080` | Define the ListenPort for HTTP ingress. Default is `8080`.|

#### Watching Namespaces

Tyk Operator is installed with cluster permissions. However, you can optionally control which namespaces it watches by setting the `WATCH_NAMESPACE` through `tyk-operator-conf` secret or the environment variable to a comma separated list of k8s namespaces. For example:

- `WATCH_NAMESPACE=""` will watch for resources across the entire cluster.
- `WATCH_NAMESPACE="foo"` will watch for resources in the `foo` namespace.
- `WATCH_NAMESPACE="foo,bar"` will watch for resources in the `foo` and `bar` namespace.

#### Watching custom ingress class

The value of the `kubernetes.io/ingress.class` annotation identifies Ingress objects to be processed.
Tyk Operator looks for the value `tyk` and will ignore all other ingress classes by default. If you want to override this default behaviour, you may do so by setting `WATCH_INGRESS_CLASS` through `tyk-operator-conf` or the environment variable .

For example:

```console
$ kubectl create secret -n tyk-operator-system generic tyk-operator-conf \
  --from-literal "TYK_AUTH=${TYK_AUTH}" \
  --from-literal "TYK_ORG=${TYK_ORG}" \
  --from-literal "TYK_MODE=${TYK_MODE}" \
  --from-literal "TYK_URL=${TYK_URL}" \
  --from-literal "WATCH_INGRESS_CLASS=foo"
```

## Step 4: Installing Tyk Operator and CRDs
### From Tyk official Helm repository

Tyk Operator can be installed using Helm in two ways:

- Stand-alone Helm Chart: This method involves installing Tyk Operator directly from the official Helm repository.
- Sub-chart Installation: Tyk Operator can also be installed as a sub-chart within your existing `tyk-oss`, `tyk-stack`, or `tyk-control-plane` Helm installations.
Please take a look at our [Helm Chart product page]({{<ref "product-stack/tyk-charts/overview">}}) for detailed instructions on installing Tyk Operator as a sub-chart.

**Installing Tyk Operator via Stand-alone Helm Chart**

You can install CRDs and Tyk Operator using the stand-alone Helm Chart by running the following command:

```console
$ helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
$ helm repo update
$ helm install tyk-operator tyk-helm/tyk-operator -n tyk-operator-system
```

This process will deploy Tyk Operator and its required Custom Resource Definitions (CRDs) into your Kubernetes cluster in
`tyk-operator-system` namespace.

### From Tyk Operator repository

You can install CRDs and Tyk Operator by checking out [tyk-operator](https://github.com/TykTechnologies/tyk-operator) repository.

Run the following command to install the CRDs:

```console
$ kubectl apply -f ./helm/crds
customresourcedefinition.apiextensions.k8s.io/apidefinitions.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/apidescriptions.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/operatorcontexts.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/portalapicatalogues.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/portalconfigs.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/securitypolicies.tyk.tyk.io configured
```

Run the following command to install Tyk Operator:

```console
$ helm install tyk-operator ./helm -n tyk-operator-system

NAME: tyk-operator
LAST DEPLOYED: Tue Nov 10 18:38:32 2020
NAMESPACE: tyk-operator-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
You have deployed the tyk-operator! See https://github.com/TykTechnologies/tyk-operator for more information.
```

## Upgrading Tyk Operator
### From Tyk official Helm repository

You can upgrade CRDs and Tyk Operator through Helm Chart by running the following command:

```console
$ helm upgrade -n tyk-operator-system tyk-operator tyk-helm/tyk-operator  --wait
```

### From Tyk Operator repository

You can install CRDs and Tyk Operator by checking out [tyk-operator](https://github.com/TykTechnologies/tyk-operator) repository. If there is a specific version you want to upgrade to, you can checkout the tag by running `git checkout tags/{.ReleaseTag}`.

To upgrade CRDs, run the following command:

```console
$ kubectl apply -f ./helm/crds
```

To upgrade helm release, run the following command:

```console
$ helm upgrade tyk-operator ./helm -n tyk-operator-system
```

## Uninstall

If you think we did something wrong, you can create a [GitHub issue](https://github.com/TykTechnologies/tyk-operator/issues/new). We will try to improve your experience and others. To uninstall Tyk Operator, you need to run the following command:

```console
$ helm delete tyk-operator -n tyk-operator-system
```

## Troubleshooting Tyk Operator
If you experience issues with the behavior of the Tyk Operator (e.g. API changes not being applied), to investigate, you can check the logs of the tyk-operator-controller-manager pod in your cluster with the following command:

```console
$ kubectl logs <tyk-controller-manager-pod-name> -n tyk-operator-system manager
```

If the operator webhook cannot be reached, this internal error occurs:

```console
failed calling webhook "mapidefinition.kb.io": failed to call webhook: Post "https://tyk-operator-webhook-service.tyk.svc:443/mutate-tyk-tyk-io-v1alpha1-apidefinition?timeout=10s": context deadline exceeded
Solution:
```
This typically happens when the webhook does not have access to the operator manager service. This is typically due to connectivity issues or if the manager is not up.

Please refer to cert-manager [The Definitive Debugging Guide](https://cert-manager.io/docs/troubleshooting/webhook/#error-context-deadline-exceeded) for the cert-manager Webhook Pod documentation about possible solutions based on your environment (GKE, EKS, etc.)
