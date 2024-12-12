---
description: Tyk Tools that help with automating deployment and API Management operations
linkTitle: Automation Tools
tags: ["Tyk API Management", "Open Source", "Self-Managed", "Tyk Cloud", "API Gateway"]
title: Automation Tools
aliases:
  - /advanced-configuration/manage-multiple-environments/tyk-sync
  - /product-stack/tyk-operator/advanced-configurations/api-categories
  - /product-stack/tyk-operator/advanced-configurations/api-versioning
  - /product-stack/tyk-operator/advanced-configurations/client-authentication
  - /product-stack/tyk-operator/advanced-configurations/internal-looping
  - /product-stack/tyk-operator/advanced-configurations/management-of-api
  - /product-stack/tyk-operator/advanced-configurations/tls-certificate
  - /product-stack/tyk-operator/getting-started/create-an-api-overview
  - /product-stack/tyk-operator/getting-started/create-an-oas-api
  - /product-stack/tyk-operator/getting-started/example-tyk-oas-api
  - /product-stack/tyk-operator/getting-started/quick-start-graphql
  - /product-stack/tyk-operator/getting-started/quick-start-http
  - /product-stack/tyk-operator/getting-started/quick-start-tcp
  - /product-stack/tyk-operator/getting-started/quick-start-udg
  - /product-stack/tyk-operator/getting-started/secure-an-api-overview
  - /product-stack/tyk-operator/getting-started/secure-an-oas-api
  - /product-stack/tyk-operator/getting-started/security-policy-example
  - /product-stack/tyk-operator/getting-started/tyk-operator-api-ownership
  - /product-stack/tyk-operator/getting-started/tyk-operator-multiple-organisations
  - /product-stack/tyk-operator/key-concepts/custom-resources
  - /product-stack/tyk-operator/key-concepts/key-concepts
  - /product-stack/tyk-operator/key-concepts/operator-context
  - /product-stack/tyk-operator/key-concepts/operator-user
  - /product-stack/tyk-operator/reference/api-definition
  - /product-stack/tyk-operator/reference/security-policy
  - /product-stack/tyk-operator/reference/tyk-oas-api-definition
  - /product-stack/tyk-operator/reference/version-compatibility
  - /product-stack/tyk-operator/troubleshooting/tyk-operator-changes-not-applied
  - /product-stack/tyk-operator/troubleshooting/tyk-operator-reconciliation-troubleshooting
  - /product-stack/tyk-operator/tyk-ingress-controller
  - /product-stack/tyk-sync/commands/sync-dump
  - /product-stack/tyk-sync/commands/sync-examples
  - /product-stack/tyk-sync/commands/sync-publish
  - /product-stack/tyk-sync/commands/sync-sync
  - /product-stack/tyk-sync/commands/sync-update
  - /product-stack/tyk-sync/installing-tyk-sync
  - /product-stack/tyk-sync/overview
  - /product-stack/tyk-sync/tutorials/tutorial-backup-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-synchronise-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-update-api-configurations
  - /tyk-operator
  - /tyk-stack/tyk-operator/access-an-api
  - /tyk-stack/tyk-operator/create-an-api
  - /tyk-stack/tyk-operator/getting-started-tyk-operator
  - /tyk-stack/tyk-operator/installing-tyk-operator
  - /tyk-stack/tyk-operator/migration
  - /tyk-stack/tyk-operator/publish-an-api
  - /tyk-stack/tyk-operator/secure-an-api
  - /tyk-stack/tyk-operator/tyk-operator-reconciliation
  - /tyk-sync

---
## Introduction
Managing APIs across multiple environments can quickly become complex. Updating and overseeing multiple configurations, security policies, and deployments requires a significant amount of effort without the right tools. Tyk’s suite of automation tools simplifies this process by enabling automated control over API management tasks, helping teams ensure reliability, reduce manual errors, and maintain consistency across deployments.

In this guide, we’ll walk through the primary tools for automating API management with Tyk, including:

* **Tyk Operator for Kubernetes**: Automate API deployments within Kubernetes environments.
* **Tyk Sync**: Sync configurations across environments for consistent API management.

## Prerequisites

Before diving into lifecycle automations with Tyk, ensure you have the following:

- **A Tyk installation** (Self-Managed or Cloud)
  - If you don't have Tyk installed, follow our [installation guide]({{<ref "tyk-self-managed/install">}})
  - For Tyk Cloud, sign up [here](https://tyk.io/sign-up/)
  - Tyk Operator license key. Starting from Tyk Operator v1.0, a valid license key is required.

- **Access to a Kubernetes cluster v1.19+** (for Tyk Operator sections)
  - If you're new to Kubernetes, check out the official [Kubernetes documentation](https://kubernetes.io/docs/setup/)

- **Helm 3+** (for installing Tyk Operator)
  - If you don't have Helm installed, follow the [official Helm installation guide](https://helm.sh/docs/intro/install/)
  - Verify your installation by running `helm version` in your terminal

- **Tyk Dashboard v3+ access** (for Tyk Sync setup)
  - Learn how to set up the Tyk Dashboard [here]({{<ref "tyk-dashboard">}})

- **Basic knowledge of Kubernetes, YAML, and API concepts** (important for Tyk Operator and Tyk Sync)
  - For Kubernetes, visit the [official tutorials](https://kubernetes.io/docs/tutorials/)
  - For YAML, check out this [YAML tutorial](https://yaml.org/spec/1.2/spec.html)
  - For API concepts, review our [API management basics]({{<ref "getting-started/key-concepts">}})


If you're missing any of these prerequisites, please follow the provided links to set up the necessary components before proceeding with the lifecycle automation steps.


## Automate API Management in Kubernetes Environments

Using Tyk Operator within Kubernetes allows you to manage API lifecycles declaratively. This section provides instructions for setting up and configuring the Tyk Operator to automate API creation, updates, and security in Kubernetes clusters, ensuring your APIs align with Kubernetes management practices.


### What is Tyk Operator?
If you’re using Kubernetes, or if you’re building an API that operates within a Kubernetes environment, the Tyk Operator is a powerful tool for automating the API lifecycle.

Tyk Operator is a native Kubernetes operator, allowing you to define and manage APIs as code. This means you can deploy, update, and secure APIs using the same declarative configuration approach Kubernetes uses for other application components. 

{{< img src="/img/operator/tyk-operator.svg" alt="Tyk Operator" width="600" >}}


### Key Concepts

#### GitOps With Tyk
With Tyk Operator, you can configure your APIs using Kubernetes native manifest files. You can use the manifest files in a GitOps workflow as the single source of truth for API deployment.

{{< note success >}}
**Note**  

If you use Tyk Operator to manage your APIs, you should set up RBAC such that human users cannot have the "write" permission on the API definition endpoints using Tyk Dashboard. 
{{< /note >}}

##### What is GitOps?
“GitOps” refers to the operating model of using Git as the “single source of truth” to drive continuous delivery for infrastructure and software through automated CI/CD workflow.

##### Tyk Operator in your GitOps workflow
You can install Argo CD, Flux CD or the GitOps tool of your choice in a cluster, and connect it to the Git repository where you version control your API manifests. The tool can synchronise changes from Git to your cluster. The API manifest updates in cluster would be detected by Tyk Operator, which has a Kubernetes controller to automatically reconcile the API configurations on your Tyk Gateway or Tyk Dashboard. 

**Kubernetes-Native Developer Experience** 
API Developers enjoy a smoother Continuous Integration process as they can develop, test, and deploy the microservices. API configurations together use familiar development toolings and pipeline.

**Reliability** 
With declarative API configurations, you have a single source of truth to recover after any system failures, reducing the meantime to recovery from hours to minutes.

##### Single Source of Truth for API Configurations
Tyk Operator will reconcile any divergence between the Kubernetes desired state and the actual state in [Tyk Gateway]({{<ref "tyk-oss-gateway">}}) or [Tyk Dashboard]({{<ref "tyk-dashboard">}}). Therefore, you should maintain the API definition manifests in Kubernetes as the single source of truth for your system. If you update your API configurations using Tyk Dashboard, those changes would be reverted by Tyk Operator eventually.

To learn more about Gitops with Tyk, refer the following blog posts:
- [GitOps-enabled API management in Kubernetes](https://tyk.io/blog/gitops-enabled-api-management-in-kubernetes/)
- [A practical guide using Tyk Operator, ArgoCD, and Kustomize](https://tyk.io/blog/a-practical-guide-using-tyk-operator-argocd-and-kustomize/)

#### Custom Resources in Tyk

In Kubernetes, a [Custom Resource (CR)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) is an extension of the Kubernetes API that allows you to introduce custom objects in your cluster. Custom Resources enable you to define and manage custom configurations and settings specific to your applications, making Kubernetes highly extensible. These custom objects are defined using Custom Resource Definitions (CRDs), which specify the schema and structure of the resource.

Tyk Operator manages multiple custom resources to help users create and maintain their API configurations:

**TykOasApiDefinition**: Available from Tyk Operator v1.0. It represents a [Tyk OAS API configuration]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}). Tyk OAS API is based on the OpenAPI specification (OAS) and is the recommended format for standard HTTP APIs. Tyk Operator supports all [Tyk OAS API feature]({{<ref "getting-started/using-oas-definitions/oas-reference">}}) as they become available on the Gateway.

**ApiDefinition**: Available on all versions of Tyk Operator. It represents a [Tyk Classic API configuration]({{<ref "tyk-gateway-api/api-definition-objects">}}). Tyk Classic API is the traditional format used for defining all APIs in Tyk, and now the recommended format for non-HTTP APIs such as TCP, GraphQL, and Universal Data Graph (UDG). Tyk Operator supports the major features of Tyk Classic API and the feature support details can be tracked [here]({{< ref "#apidefinition-crd" >}}).

**TykStreamsApiDefinition**: Available from Tyk Operator v1.1. It represents an [Async API configuration]({{<ref "product-stack/tyk-streaming/overview#configuration-as-code">}}) which is based on [Tyk OAS API Definition]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}). Tyk Operator supports all [Tyk Streams]({{<ref "product-stack/tyk-streaming/overview">}}) and [Tyk OAS API feature]({{<ref "getting-started/using-oas-definitions/oas-reference">}}) as they become available on the Gateway.

**SecurityPolicy**: Available on all versions of Tyk Operator. It represents a [Tyk Security Policy configuration]({{< ref "#security-policy-example" >}}). Security Policies in Tyk provide a way to define and enforce security controls, including authentication, authorization, and rate limiting for APIs managed in Tyk. Tyk Operator supports essential features of Security Policies, allowing users to centrally manage access control and security enforcement for all APIs across clusters.

These custom resources enable users to leverage Kubernetes' declarative configuration management to define, modify, and version their APIs, seamlessly integrating with other Kubernetes-based workflows and tools.

##### Custom Resources for API and Policy Configuration

The following custom resources can be used to configure APIs and policies at [Tyk Gateway]({{<ref "tyk-oss-gateway">}}) or [Tyk Dashboard]({{<ref "tyk-dashboard">}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| TykOasApiDefinition| tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk OAS API Definition object]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}})                                 |
| ApiDefinition      | tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk Classic API Definition object]({{<ref "tyk-gateway-api/api-definition-objects">}})                                 |
| TykStreamsApiDefinition| tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk Streams]({{<ref "product-stack/tyk-streaming/overview#configuration-as-code">}})                                 |
| SecurityPolicy     | tyk.tyk.io  | v1alpha1  | Defines configuration of [security policies]({{<ref "getting-started/key-concepts/what-is-a-security-policy">}}). Operator supports linking ApiDefinition custom resources in SecurityPolicy's access list so that API IDs do not need to be hardcoded in the resource manifest.        |
| SubGraph           | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation subgraph]({{<ref "getting-started/key-concepts/graphql-federation#subgraphs-and-supergraphs">}}).                                           |
| SuperGraph         | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation supergraph]({{<ref "getting-started/key-concepts/graphql-federation#subgraphs-and-supergraphs">}}).                                        |
| OperatorContext    | tyk.tyk.io  | v1alpha1  | Manages the context in which the Tyk Operator operates, affecting its overall behavior and environment. See [Operator Context]({{< ref "#multi-tenancy-in-tyk" >}}) for details. |

##### Tyk Classic Developer Portal

The following custom resources can be used to configure [Tyk Classic Developer Portal]({{<ref "tyk-developer-portal/tyk-portal-classic">}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| APIDescription     | tyk.tyk.io  | v1alpha1  | Configures [Portal Documentation]({{<ref "tyk-apis/tyk-portal-api/portal-documentation">}}). |
| PortalAPICatalogue | tyk.tyk.io  | v1alpha1  | Configures [Portal API Catalogue]({{<ref "getting-started/key-concepts/api-catalogue">}}). |
| PortalConfig       | tyk.tyk.io  | v1alpha1  | Configures [Portal Configuration]({{<ref "tyk-apis/tyk-portal-api/portal-configuration">}}). |


#### Reconcilation With Tyk Operator 
##### Controllers & Operators
In Kubernetes, [controllers](https://kubernetes.io/docs/concepts/architecture/controller/) watch one or more Kubernetes resources, which can be built-in types like *Deployments* or custom resources like *ApiDefinition* - in this case, we refer to Controller as Operator. The purpose of a controller is to match the desired state by using Kubernetes APIs and external APIs.

> A [Kubernetes operator](https://www.redhat.com/en/topics/containers/what-is-a-kubernetes-operator) is an application-specific controller that extends the functionality of the Kubernetes API to create, configure, and manage instances of complex applications on behalf of a Kubernetes user.

##### Desired State vs Observed State
Let’s start with the *Desired State*. It is defined through Kubernetes Manifests, most likely YAML or JSON, to describe what you want your system to be in. Controllers will watch the resources and try to match the actual state (the observed state) with the desired state for Kubernetes Objects. For example, you may want to create a Deployment that is intended to run three replicas. So, you can define this desired state in the manifests, and Controllers will perform necessary operations to make it happen.

How about *Observed State*? Although the details of the observed state may change controller by controller, usually controllers update the status field of Kubernetes objects to store the observed state. For example, in Tyk Operator, we update the status to include *api_id*, so that Tyk Operator can understand that the object was successfully created on Tyk.

##### Reconciliation
Reconciliation is a special design paradigm used in Kubernetes controllers. Tyk Operator also uses the same paradigm, which is responsible for keeping our Kubernetes objects in sync with the underlying external APIs - which is Tyk in our case. 

**When would reconciliation happen?**
<br>
Before diving into Tyk Operator reconciliation, let's briefly mention some technical details about how and when reconciliation happens. Reconciliation only happens when certain events happen on your cluster or objects. Therefore, Reconciliation will **NOT** be triggered when there is an update or modification on Tyk’s side. It only watches certain Kubernetes events and is triggered based on them. Usually, the reconciliation happens when you modify a Kubernetes object or when the cache used by the controller expires - side note, controllers, in general, use cached objects to reduce the load in the Kube API server. Typically, caches expire in ~10 hours or so but the expiration time might change based on Operator configurations.

So, in order to trigger Reconciliation, you can either
- modify an object, which will trigger reconciliation over this modified object or,
- restart Tyk Operator pod, which will trigger reconciliation over each of the objects watched by Tyk Operator.

**What happens during Reconciliation?**
<br>
Tyk Operator will compare desired state of the Kubernetes object with the observed state in Tyk. If there is a drift, Tyk Operator will update the actual state on Tyk with the desired state. In the reconciliation, Tyk Operator mainly controls three operations; DELETE, CREATE, and UPDATE.

- **CREATE** - an object is created in Kubernetes but not exists in Tyk
- **UPDATE** - an object is in different in Kubernetes and Tyk (we compare that by hash)
- **DELETE** - an object is deleted in Kubernetes but exists in Tyk

**Drift Detection**
<br>
If human operators or any other system delete or modify API Definition from Tyk Gateway or Dashboard, Tyk Operator will restore the desired state back to Tyk during reconciliation. This is called Drift Detection. It can protect your systems from unauthorized or accidental modifications. It is a best practice to limit user access rights on production environment to read-only in order to prevent accidental updates through API Manager directly.


#### CRD Versioning

Tyk follows standard practices for naming and versioning custom resources as outlined by the Kubernetes Custom Resource Definition [versioning guidelines](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/). Although we are currently on the `v1alpha1` version, no breaking changes will be introduced to existing Custom Resources without a version bump. This means that any significant changes or updates that could impact existing resources will result in a new version (e.g., `v1beta1` or `v1`) and Operator will continue supporting all CRD versions for a reasonable time before deprecating an older version. This ensures a smooth transition and compatibility, allowing you to upgrade without disrupting your current configurations and workflows.

For more details on Kubernetes CRD versioning practices, refer to the Kubernetes Custom Resource Definition [Versioning documentation](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/).


#### Operator User
Tyk Operator is a Kubernetes Controller that manages Tyk Custom Resources (CRs) such as API Definitions and Security Policies. Developers define these resources as [Custom Resource (CRs)]({{< ref "#custom-resources-in-tyk" >}}), and Tyk Operator ensures that the desired state is reconciled with the Tyk Gateway or Dashboard. This involves creating, updating, or deleting API configurations until the target state matches the desired state.

For the Tyk Dashboard, Tyk Operator functions as a system user, bound by Organization and RBAC rules.

During start up, Tyk Operator looks for these keys from `tyk-operator-conf` secret or from the environment variables (listed in the table below).

| Key or Environment Variable | Description  |
|:-----|:-------------|
| `TYK_MODE` | "ce" for OSS or "pro" for licensed users |
| `TYK_URL` | URL of Tyk Gateway or Dashboard API |
| `TYK_ORG` | Organization ID of Operator user |
| `TYK_AUTH` | API key of Operator user |

These would be the default credentials Tyk Operator uses to connect to Tyk.


#### Multi-tenancy in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate [organizations]({{< ref "basic-config-and-security/security/dashboard/organisations">}}) for each team or department. Each organization is a completely isolated unit with its own:

- API Definitions
- API Keys
- Users
- Developers
- Domain
- Tyk Classic Portal

This structure is ideal for businesses with a complex hierarchy, where distinct departments operate independently but within the same overall infrastructure.

{{< img src="/img/operator/tyk-organisations.svg" alt="Multi-tenancy in Tyk Dashboard" width="600" >}}

##### Define OperatorContext for Multi-Tenant API Management

The `OperatorContext` in Tyk Operator allows you to create isolated management environments by defining specific access parameters for different teams or departments within a shared Tyk Operator instance. It helps you specify:

- The Tyk Dashboard with which the Operator interacts
- The organization under which API management occurs
- The user identity utilized for requests
- The environment in which the Operator operates

By setting different `OperatorContext` configurations, you can define unique access and management contexts for different teams. These contexts can then be referenced directly in your `ApiDefinition`, `TykOasApiDefinition`, `TykStreamsApiDefinition` or `SecurityPolicy` custom resource definitions (CRDs) using the `contextRef` field, enabling precise control over API configurations.

##### Example Scenarios Using OperatorContext

1. **No OperatorContext Defined**
   - If no `OperatorContext` is defined, Tyk Operator defaults to using credentials from the `tyk-operator-conf` secret or from environment variables. This means all API management actions are performed under the system’s default user credentials, with no specific contextual isolation.

2. **OperatorContext Defined but Not Referenced**
   - When an `OperatorContext` is defined but not referenced in an API configuration, Tyk Operator continues to use the default credentials from `tyk-operator-conf`. The specified `OperatorContext` is ignored, resulting in API operations being managed under default credentials.

3. **OperatorContext Defined and Referenced**
   - If a specific `OperatorContext` is both defined and referenced in an API or policy, Tyk Operator utilizes the credentials and parameters from the referenced `OperatorContext` to perform API operations. This allows each API or policy to be managed with isolated configurations, enabling team-based or department-specific API management within the same Kubernetes cluster.

Using `OperatorContext` offers flexibility for multi-tenancy, helping organizations manage and isolate API configurations based on their specific team or departmental needs.

{{< img src="/img/operator/tyk-operator-context.svg" alt="Multi-tenancy in Kubernetes Tyk Operator" width="600" >}}

#### TLS Certificates

Tyk Operator is designed to offer a seamless Kubernetes-native experience by managing TLS certificates stored within Kubernetes for your API needs. Traditionally, to use a certificate (e.g., as a client certificate, domain certificate, or certificate for accessing an upstream service), you would need to manually upload the certificate to Tyk and then reference it using a 'Certificate ID' in your API definitions. This process can become cumbersome, especially in a Kubernetes environment where certificates are often managed as secrets and may rotate frequently.

To address this challenge, Tyk Operator allows you to directly reference certificates stored as Kubernetes secrets within your custom resource definitions (CRDs). This reduces operational overhead, minimizes the risk of API downtime due to certificate mismatches, and provides a more intuitive experience for API developers.

##### Benefits of Managing Certificates with Tyk Operator
- **Reduced operational overhead**: Automates the process of updating certificates when they rotate.
- **Minimized risk of API downtime**: Ensures that APIs continue to function smoothly, even when certificates are updated.
- **Improved developer experience**: Removes the need for API developers to manage certificate IDs manually.

##### Examples

| Certificate Type | Supported in ApiDefinition | Supported in TykOasApiDefinition | Supported in TykStreamsApiDefinition |
|------------------|-------------|---------|---------|
| Client certifates | ✅ [Client mTLS]({{<ref "api-management/client-authentication#setup-static-mtls-in-tyk-operator-using-the-tyk-classic-api-definition">}}) | ✅ [Client mTLS]({{<ref "api-management/client-authentication#setup-static-mtls-in-tyk-operator-using-tyk-oas-api-definition">}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Custom domain certificates | ✅ [TLS and SSL]({{<ref "basic-config-and-security/security/tls-and-ssl#tyk-operator-classic">}}) | ✅ [TLS and SSL]({{<ref "basic-config-and-security/security/tls-and-ssl#tyk-operator-oas">}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Public keys pinning | ✅ [Certificate pinning]({{<ref "security/certificate-pinning#tyk-operator-classic">}}) | ✅ [Certificate pinning]({{<ref "security/certificate-pinning#tyk-operator-oas">}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Upstream mTLS | ✅ [Upstream mTLS via Operator]({{<ref "api-management/client-authentication#via-tyk-operator-using-the-tyk-classic-api-definition">}}) | ✅ [Upstream mTLS via Operator]({{<ref "api-management/client-authentication#tyk-operator-oas">}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |


### Install and Configure Tyk Operator

We assume you have already installed Tyk. If you don’t have it, check out [Tyk
Cloud]({{<ref "/deployment-and-operations/tyk-cloud-platform/quick-start">}}) or [Tyk Self
Managed]({{<ref "/getting-started/installation">}}) page. [Tyk Helm
Chart]({{<ref "/product-stack/tyk-charts/overview">}}) is the preferred (and easiest) way to install Tyk on Kubernetes.

In order for policy ID matching to work correctly, Dashboard must have `allow_explicit_policy_id` and
`enable_duplicate_slugs` set to `true` and Gateway must have `policies.allow_explicit_policy_id` set to `true`.

Tyk Operator needs a [user credential]({{< ref "#operator-user" >}}) to connect with
Tyk Dashboard. The Operator user should have write access to the resources it is going to manage, e.g. APIs, Certificates,
Policies, and Portal. It is the recommended practice to turn off write access for other users for the above resources. See
[Using Tyk Operator to enable GitOps with Tyk]({{< ref "getting-started/key-concepts/gitops-with-tyk" >}}) about
maintaining a single source of truth for your API configurations.

#### Install cert-manager

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

#### Option 1: Install Tyk Operator via Tyk's Umbrella Helm Charts

If you are using [Tyk Stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}), [Tyk Control
Plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}), or [Tyk Open
Source Chart]({{<ref "product-stack/tyk-charts/tyk-oss-chart">}}), you can install Tyk Operator alongside other Tyk
components by setting value `global.components.operator` to `true`.

Starting from Tyk Operator v1.0, a license key is required to use the Tyk Operator. You can provide it while installing
Tyk Stack, Tyk Control Plane or Tyk OSS helm chart by setting `global.license.operator` field. You can also set license
key via a Kubernetes secret using `global.secrets.useSecretName` field. The secret should contain a key called
`OperatorLicense`

Note: If you are using `global.secrets.useSecretName`, you must configure the operator license in the referenced Kubernetes secret. `global.license.operator` will not be used in this case.

#### Option 2: Install Tyk Operator via stand-alone Helm Chart

If you prefer to install Tyk Operator separately, follow this section to install Tyk Operator using Helm.

##### Configure Tyk Operator via environment variable or tyk-operator-conf secret

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
another name, configure it through Helm Chart [envFrom]({{< ref "#install-tyk-operator-and-custom-resource-definitions-crds" >}}) value.

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

**Connect to Tyk Gateway or Dashboard**

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

**Watch Namespaces**

Tyk Operator is installed with cluster permissions. However, you can optionally control which namespaces it watches by
setting the `WATCH_NAMESPACE` through `tyk-operator-conf` secret or the environment variable to a comma separated list
of k8s namespaces. For example:

- `WATCH_NAMESPACE=""` will watch for resources across the entire cluster.
- `WATCH_NAMESPACE="foo"` will watch for resources in the `foo` namespace.
- `WATCH_NAMESPACE="foo,bar"` will watch for resources in the `foo` and `bar` namespace.

**Watch custom ingress class**

You can configure [Tyk Operator as Ingress Controller]({{< ref "#control-kubernetes-ingress-resources" >}}) so
that [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources can be managed by Tyk as
APIs. By default, Tyk Operator looks for the value `tyk` in Ingress resources `kubernetes.io/ingress.class` annotation
and will ignore all other ingress classes. If you want to override this default behavior, you may do so by setting
[WATCH_INGRESS_CLASS]({{< ref "#configure-tyk-operator-via-environment-variable-or-tyk-operator-conf-secret" >}}) through `tyk-operator-conf` or the environment variable.

##### Install Tyk Operator and Custom Resource Definitions (CRDs)

You can install CRDs and Tyk Operator using the stand-alone Helm Chart by running the following command:

```console
$ helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
$ helm repo update

$ helm install tyk-operator tyk-helm/tyk-operator -n tyk-operator-system
```

This process will deploy Tyk Operator and its required Custom Resource Definitions (CRDs) into your Kubernetes cluster
in `tyk-operator-system` namespace.

**Helm configurations**

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

#### Upgrading Tyk Operator

##### Upgrading from v0.x to v1.0+

Starting from Tyk Operator v1.0, a valid license key is required for the Tyk Operator to function. If Tyk Operator is
upgraded from v0.x versions to one of v1.0+ versions, Tyk Operator needs a valid license key that needs to be provided
during upgrade process. This section describes how to set Tyk Operator license key to make sure Tyk Operator continues
functioning.

To provide the license key for Tyk Operator, Kubernetes secret used to configure Tyk Operator (typically named
tyk-operator-conf as described above) requires an additional field called `TYK_OPERATOR_LICENSEKEY`. Populate this field
with your Tyk Operator license key.

To configure the license key:

1. Locate the Kubernetes Secret used to configure Tyk Operator (typically named `tyk-operator-conf`).
2. Add a new field called `TYK_OPERATOR_LICENSEKEY` to this Secret.
3. Set the value of `TYK_OPERATOR_LICENSEKEY` to your Tyk Operator license key.

After updating the Kubernetes secret with this field, proceed with the standard upgrade process outlined below.

##### Upgrading Tyk Operator and CRDs

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

{{< note success >}} **Note**
Replace $TYK_OPERATOR_VERSION with the image tag corresponding to the Tyk Operator version to which
the Custom Resource Definitions (CRDs) belong. For example, to install CRDs compatible with Tyk Operator v1.0.0, set $TYK_OPERATOR_VERSION to v1.0.0. 
 {{< /note >}}


#### Uninstalling Tyk Operator

To uninstall Tyk Operator, you need to run the following command:

```console
$ helm delete tyk-operator -n tyk-operator-system
```

### Set Up OAS API
Setting up OpenAPI Specification (OAS) APIs with Tyk involves preparing an OAS-compliant API definition and configuring it within your Kubernetes cluster using Tyk Operator. This process allows you to streamline API management by storing the OAS definition in a Kubernetes ConfigMap and linking it to Tyk Gateway through a TykOasApiDefinition resource. 

#### Create your OAS API
##### Prepare the Tyk OAS API Definition
First, you need to have a complete Tyk OAS API definition file ready. This file will contain all the necessary configuration details for your API in OpenAPI Specification (OAS) format.

Here is an example of what the Tyk OAS API definition might look like. Note that Tyk extension `x-tyk-api-gateway` section should be present.

```json {hl_lines=["9-25"],linenos=true}
{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}
```

Save this API definition file (e.g., `oas-api-definition.json`) locally.

{{< note success >}}
**Tips**  

You can create and configure your API easily using Tyk Dashboard in a developer environment, and then obtain the OAS API definition following these instructions:

1. Open the Tyk Dashboard
2. Navigate to the API you want to manage with the Tyk Operator
3. Click on the "Actions" menu button and select "View Raw Definition."
4. This will display the raw OAS API definition of your API, which you can then copy and save locally.
{{< /note >}}

##### Create a ConfigMap for the Tyk OAS API Definition

You need to create a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-object) in Kubernetes to store your Tyk OAS API definition. The Tyk Operator will reference this ConfigMap to retrieve the API configuration.

To create the ConfigMap, run the following command:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk
```

This command creates a ConfigMap named `tyk-oas-api-config` in the `tyk` namespace (replace `tyk` with your actual namespace if different).

{{< note success >}}
**Notes**

There is inherent size limit to a ConfigMap. The data stored in a ConfigMap cannot exceed 1 MiB. In case your OpenAPI document exceeds this size limit, it is recommended to split your API into smaller sub-APIs for easy management. For details, please consult [Best Practices for Describing Large APIs](https://learn.openapis.org/best-practices.html#describing-large-apis) from the OpenAPI initiative.
{{< /note >}}

{{< note success >}}
**Notes**

If you prefer to create ConfigMap with a manifest using `kubectl apply` command, you may get an error that the annotation metadata cannot exceed 256KB. It is because by using `kubectl apply`, `kubectl` automatically saves the whole configuration in the annotation [kubectl.kubernetes.io/last-applied-configuration](https://kubernetes.io/docs/reference/labels-annotations-taints/#kubectl-kubernetes-io-last-applied-configuration) for tracking changes. Your OAS API Definition may easily exceed the size limit of annotations (256KB). Therefore, `kubectl create` is used here to get around the problem.
{{< /note >}}

##### Create a TykOasApiDefinition Custom Resource

Now, create a `TykOasApiDefinition` resource to tell the Tyk Operator to use the OAS API definition stored in the ConfigMap.

Create a manifest file named `tyk-oas-api-definition.yaml` with the following content:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: tyk-oas-api-config   # Metadata name of the ConfigMap resource that stores the OAS API Definition
      namespace: tyk             # Metadata namespace of the ConfigMap resource
      keyName: oas-api-definition.json # Key for retrieving OAS API Definition from the ConfigMap
```

##### Apply the TykOasApiDefinition Manifest

Use `kubectl` to apply the `TykOasApiDefinition` manifest to your cluster:

```sh
kubectl apply -f tyk-oas-api-definition.yaml
```

This command creates a new `TykOasApiDefinition` resource in your cluster. The Tyk Operator will watch for this resource and configures Tyk Gateway or Tyk Dashboard with a new API using the provided OAS API definition.

##### Verify the Tyk OAS API Creation

To verify that the API has been successfully created, check the status of the TykOasApiDefinition resource:

```sh
kubectl get tykoasapidefinition petstore
```

You should see the status of the resource, which will indicate if the API creation was successful.

```bash
NAME       DOMAIN   LISTENPATH   PROXY.TARGETURL                  ENABLED   SYNCSTATUS   INGRESSTEMPLATE
petstore            /petstore/   https://petstore.swagger.io/v2   true      Successful
```

##### Test the Tyk OAS API
After the Tyk OAS API has been successfully created, you can test it by sending a request to the API endpoint defined in your OAS file.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

##### Manage and Update the Tyk OAS API
To make any changes to your API configuration, update the OAS file in your ConfigMap and then re-apply the ConfigMap using `kubectl replace`:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk --dry-run=client -o yaml | kubectl replace -f -
```

The Tyk Operator will automatically detect the change and update the API in the Tyk Gateway.

{{< note success >}}
**Notes**

`kubectl replace` without `--save-config` option is used here instead of `kubectl apply` because we do not want to save the OAS API definition in its annotation. If you want to enable `--save-config` option or use `kubectl apply`, the OAS API definition size would be further limited to at most 262144 bytes.
{{< /note >}}

##### OAS API Example
This example shows the minimum resources and fields required to define a Tyk OAS API using Tyk Operator. 

```yaml{hl_lines=["7-7", "41-44"],linenos=true}
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm
  namespace: default
data:
  test_oas.json: |-
    {
        "info": {
          "title": "Petstore",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "Petstore",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "https://petstore.swagger.io/v2"
          },
          "server": {
            "listenPath": {
              "value": "/petstore/",
              "strip": true
            }
          }
        }
      }
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

Here, a `ConfigMap` is created that contains the Tyk OAS API Definition with the `data` field with key `test_oas.json`. This is linked to from a `TykOasApiDefinition` resource via `spec.tykOAS.configmapRef`.

To apply it, simply save the manifest into a file (e.g., `tyk-oas-api.yaml`) and use `kubectl apply -f tyk-oas-api.yaml` to create the required resources in your Kubernetes cluster. This command will create the necessary ConfigMap and TykOasApiDefinition resources in the `default` namespace.



#### Secure your OAS API
##### Update your Tyk OAS API Definition

First, you'll modify your existing Tyk OAS API Definition to include the API key authentication configuration.

When creating the OAS API, you stored your OAS definition in a file named `oas-api-definition.json` and created a ConfigMap named `tyk-oas-api-config` in the `tyk` namespace.

Modify your Tyk OAS API Definition `oas-api-definition.json` as follow. 

```json {hl_lines=["8-14","16-20","33-40"],linenos=true}
{
  "info": {
    "title": "Petstore protected",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {
    "securitySchemes": {
      "petstore_auth": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "petstore_auth": []
    }
  ],
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "authentication": {
        "enabled": true,
        "securitySchemes": {
          "petstore_auth": {
            "enabled": true
          }
        }
      },
      "listenPath": {
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}
```

In this example, we added the following sections to configure key authentication for this API. 

- `components.securitySchemes` defines the authentication method (in this case, `apiKey` in the header).
- `security`: Applies the authentication globally to all endpoints.
- `x-tyk-api-gateway.server.authentication`: Tyk-specific extension to enable the authentication scheme.

You can configure your API for any Tyk supported authentication method by following [Authentication with Tyk OAS]({{< ref "getting-started/key-concepts/authentication">}}) documentation.

Save your updated API definition in the same file, `oas-api-definition.json`.

##### Update the ConfigMap with the new Tyk OAS API Definition

Update the existing ConfigMap that contains your Tyk OAS API Definition with the following command:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk --dry-run=client -o yaml | kubectl replace -f -
```

This command updates the existing ConfigMap named `tyk-oas-api-config` in the `tyk` namespace (replace `tyk` with your actual namespace if different) with the new Tyk OAS API Definition stored in `oas-api-definition.json`.

Since a `TykOasApiDefinition` resource has been created with reference to this ConfigMap in the previous tutorial:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: tyk-oas-api-config   # Metadata name of the ConfigMap resource that stores the OAS API Definition
      namespace: tyk             # Metadata namespace of the ConfigMap resource
      keyName: oas-api-definition.json # Key for retrieving OAS API Definition from the ConfigMap
```

Any changes in the ConfigMap would be detected by Tyk Operator. Tyk Operator will then automatically reconcile the changes and update the API configuration at Tyk.

##### Verify the changes

Verify that the `TykOasApiDefinition` has been updated successfully:

```sh
kubectl get tykoasapidefinition petstore -o yaml
```

Look for the `latestTransaction` field in `status`:

```yaml
status:
  latestTransaction:
    status: Successful
    time: "2024-09-16T11:48:20Z"
```

The **Successful** status shows that Tyk Operator has reconciled the API with Tyk successfully. The last update time is shown in the `time` field.

##### Test the API Endpoint
Now, test your API endpoint to confirm that it requires an API key.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl -v "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

Request should fail with a `401 Unauthorized` response now as an API key is required for access. Your API has been secured by Tyk Gateway.

### Set Up Tyk Classic API

#### Create a Tyk Classic API
First, specify the details of your API using the [ApiDefinition CRD]({{< ref "#apidefinition-crd" >}}), then deploy it to create the corresponding Kubernetes resource. Tyk Operator will take control of the CRD and create the actual API in the Tyk data plane.

##### Create an ApiDefinition resource in YAML format
Create a file called `httpbin.yaml`, then add the following:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
 name: httpbin
spec:
 name: httpbin
 use_keyless: true
 protocol: http
 active: true
 proxy:
   target_url: http://httpbin.org
   listen_path: /httpbin
   strip_listen_path: true
```

You can also use other sample files from the following pages:

- [HTTP Proxy example]({{< ref "#set-up-manifest-for-http" >}})
- [TCP Proxy example]({{< ref "#set-up-manifest-for-tcp" >}})
- [GraphQL Proxy example]({{< ref "#set-up-manifest-for-graphql" >}})
- [UDG example]({{< ref "#set-up-manifest-for-udg" >}})

##### Deploy the ApiDefinition resource
We are going to create an ApiDefinition from the httpbin.yaml file, by running the  following command:

```console
$ kubectl apply -f httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
    name: httpbin
spec:
    name: httpbin
    use_keyless: true
    protocol: http
    active: true
    proxy:
        target_url: http://httpbin.org
        listen_path: /httpbin
        strip_listen_path: true
EOF
```

The ApiDefinition resource is created. You can verify by the following command:

```console
$ kubectl get tykapis
NAME      DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
httpbin            /httpbin     http://httpbin.org   true
```

You can make a request to verify that your API is working:

```bash
$ curl -i localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-62161e8c-2a1ece436633f2e42129be2a"
  },
  "origin": "127.0.0.1, 176.88.45.17",
  "url": "http://httpbin.org/get"
}
```

##### Understanding the ApiDefinition CRD

We have an ApiDefinition called `httpbin`, as specified in `spec.name` field, which listens to path `/httpbin` and proxies requests to [http://httpbin.org](http://httpbin.org), as specified under `spec.proxy` field. Now, any requests coming to the `/httpbin` endpoint will be proxied to the target URL that we defined in `spec.proxy.target_url`, which is [http://httpbin.org](http://httpbin.org) in our example.

You can visit the [ApiDefinition CRD]({{< ref "#apidefinition-crd" >}}) page to see all the latest API Definitions fields and features we support.

##### Configure Kubernetes service as an upstream target

Tyk Gateway deployed in your Kubernetes cluster can easily access other Kubernetes services as an upstream proxy target.
In the ApiDefinition manifest, set the `proxy.target_url` as a Kubernetes Service following [DNS for Services and Pods guideline](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/), so that the requests will be proxied to your service.
In general, Kubernetes Services have a `<service-name>.<namespace-name>`.svc.cluster.local DNS entry once they are created.
For example, if you have a service called `httpbin` in `default` namespace, you can contact `httpbin` service with `httpbin.default.svc` DNS record in the cluster, instead of IP addresses.
Please visit the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) for more details.
Suppose you want to create a Deployment of [httpbin](https://hub.docker.com/r/kennethreitz/httpbin/) service using [ci/upstreams/httpbin.yaml](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml) file. You are going to expose the application through port `8000` as described under the Service [specification](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml#L10).
You can create Service and Deployment by either applying the manifest defined in our repository:

```console
$ kubectl apply -f ci/upstreams/httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  ports:
    - name: http
      port: 8000
      targetPort: 80
  selector:
    app: httpbin
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
      version: v1
  template:
    metadata:
      labels:
        app: httpbin
        version: v1
    spec:
      containers:
        - image: docker.io/kennethreitz/httpbin
          imagePullPolicy: IfNotPresent
          name: httpbin
          ports:
            - containerPort: 80
EOF
```

You need to wait until all pods reach READY `1/1` and STATUS `Running` state.
Once the pod is ready, you can update your `httpbin` API's `target_url` field to proxy your requests to the Service that you created above.
You can check all services in the `<ns>` namespace as follows:

```console
$ kubectl get service -n <ns>
```

You can update your `httpbin` as follows:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```

Pay attention to the value of the `spec.proxy.target_url` field.
It is set to `http://httpbin.default.svc:8000` by following the convention described above (`<service_name>.<namespace>.svc:<service_port>`).
Now, if you send your request to the `/httpbin` endpoint of the Tyk Gateway, the request will be proxied to the `httpbin Service`:

```curl
curl -sS http://localhost:8080/httpbin/headers
{
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.default.svc:8000", 
    "User-Agent": "curl/7.68.0"
  }
}
```

As you can see from the response, the host that your request should be proxied to is `httpbin.default.svc:8000`.

#### Secure your Classic API
##### Update your API to Require a Key

You might already have realized that our `httpbin` API is keyless. If you check the APIDefinition's specification, the `use_keyless` field is set to `true`.
Tyk keyless access represents completely open access for your API and causes Tyk to bypass any session-based middleware (middleware that requires access to token-related metadata). Keyless access will enable all requests through.
You can disable keyless access by setting `use_keyless` to false. 

1. Update your `httpbin.yaml` file

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: false
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

2. Apply the changes

```bash
kubectl apply -f httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
    name: httpbin
spec:
    name: httpbin
    use_keyless: false
    protocol: http
    active: true
    proxy:
        target_url: http://httpbin.org
        listen_path: /httpbin
        strip_listen_path: true
EOF
```

If you have set `use_keyless` to false, the default authentication mode is Authentication token.

Now, to access `httpbin` API, you need to include a key to the header. Otherwise, you will get a `HTTP 401 Unauthorized` response.


```curl
curl -i localhost:8080/httpbin/get
HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Thu, 03 Mar 2022 15:47:30 GMT
Content-Length: 46

{
    "error": "Authorization field missing"
}
```

{{< note success >}}

**Note**  

Tyk Operator supported authentication types are listed in the [API Definition features]({{< ref "#apidefinition-crd" >}}) section.

{{< /note >}}

##### Create an API key

You need to generate a key to access the `httpbin` API now. Follow [this guide](https://tyk.io/docs/getting-started/create-api-key/) to see how to create an API key for your installation. 

You can obtain the API name and API ID of our example `httpbin` API by following command:

```yaml
kubectl describe tykapis httpbin
Name:         httpbin
Namespace:    default
Labels:       <none>
Annotations:  <none>
API Version:  tyk.tyk.io/v1alpha1
Kind:         ApiDefinition
Metadata:
  ...
Spec:
  ...
  Name: httpbin
  ...
Status:
  api_id:  ZGVmYXVsdC9odHRwYmlu
Events:    <none>
```

You can obtain the API name and API ID from `name` and `status.api_id` field.

In our example, it is as follows:

- {API-NAME}: httpbin
- {API-ID}: ZGVmYXVsdC9odHRwYmlu

When you have successfully created a key, you can use it to access the `httpbin` API.

```curl
curl -H "Authorization: Bearer {Key ID}" localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "Bearer {Key ID}",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-6221de2a-01aa10dd56f6f13f420ba313"
  },
  "origin": "127.0.0.1, 176.42.143.200",
  "url": "http://httpbin.org/get"
}
```
Since you have provided a valid key along with your request, you do not get a `HTTP 401 Unauthorized` response.


#### Set Up Tyk Classic API Authentication
Client to Gateway Authentication in Tyk ensures secure communication between clients and the Tyk Gateway. Tyk supports various authentication methods to authenticate and authorize clients before they can access your APIs. These methods include API keys, Static Bearer Tokens, JWT, mTLS, Basic Authentication, and more. This document provides example manifests for each authentication method supported by Tyk.

##### Keyless (Open)

This configuration allows [keyless (open)]({{< ref "api-management/client-authentication#open-no-authentication">}}) access to the API without any authentication.

```yaml {hl_lines=["7-7"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-keyless
spec:
  name: httpbin-keyless
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

##### Auth Token (Bearer Token)

This setup requires a [bearer token]({{< ref "api-management/client-authentication#use-auth-tokens">}}) for access.

In the below example, the authentication token is set by default to the `Authorization` header of the request. You can customize this behavior by configuring the following fields:

- `use_cookie`: Set to true to use a cookie value for the token.
- `cookie_name`: Specify the name of the cookie if use_cookie is enabled.
- `use_param`: Set to true to allow the token to be passed as a query parameter.
- `param_name`: Specify the parameter name if use_param is enabled.
- `use_certificate`: Enable client certificate. This allows you to create dynamic keys based on certificates.
- `validate_signature`: Enable [signature validation]({{< ref "api-management/client-authentication#auth-token-signature-validation">}}).

```yaml {hl_lines=["13-35"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-auth-token
spec:
  name: httpbin-auth-token
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  use_standard_auth: true
  auth_configs:
    authToken:
      # Auth Key Header Name
      auth_header_name: Authorization
      # Use cookie value
      use_cookie: false
      # Cookie name
      cookie_name: ""
      # Allow query parameter as well as header
      use_param: false
      # Parameter name
      param_name: ""
      # Enable client certificate
      use_certificate: false
      # Enable Signature validation
      validate_signature: false
      signature:
        algorithm: ""
        header: ""
        secret: ""
        allowed_clock_skew: 0
        error_code: 0
```

##### JWT

This configuration uses [JWT tokens]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt">}}) for authentication.

Users can configure JWT authentication by defining the following fields:

- `jwt_signing_method`: Specify the method used to sign the JWT. Refer to [JWT Signing Method]({{< ref "api-management/client-authentication#set-up-jwt-signing-method">}}) for supported methods.
- `jwt_source`: Specify the public key used for verifying the JWT.
- `jwt_identity_base_field`: Define the identity source, typically set to `sub` (subject), which uniquely identifies the user or entity.
- `jwt_policy_field_name`: Specify the claim within the JWT payload that indicates the policy ID to apply.
- `jwt_default_policies` (Optional): Define default policies to apply if no policy claim is found in the JWT payload.

The following example configures an API to use JWT authentication. It specifies the ECDSA signing method and public key, sets the `sub` claim as the identity source, uses the `pol` claim for policy ID, and assigns a default policy (`jwt-policy` SecurityPolicy in `default` namespace) if no policy is specified in the token.

```yaml {hl_lines=["13-22"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-jwt1
spec:
  name: httpbin-jwt1
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-jwt1
    strip_listen_path: true
  enable_jwt: true
  strip_auth_data: true
  jwt_signing_method: ecdsa
  # ecdsa pvt: LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JR0hBZ0VBTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEJHMHdhd0lCQVFRZ2V2WnpMMWdkQUZyODhoYjIKT0YvMk54QXBKQ3pHQ0VEZGZTcDZWUU8zMGh5aFJBTkNBQVFSV3oram42NUJ0T012ZHlIS2N2akJlQlNEWkgycgoxUlR3am1ZU2k5Ui96cEJudVE0RWlNbkNxZk1QV2lacUI0UWRiQWQwRTdvSDUwVnB1WjFQMDg3RwotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0t
  # ecdsa pub: LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRVZzL281K3VRYlRqTDNjaHluTDR3WGdVZzJSOQpxOVVVOEk1bUVvdlVmODZRWjdrT0JJakp3cW56RDFvbWFnZUVIV3dIZEJPNkIrZEZhYm1kVDlQT3hnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t
  jwt_source: LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRVZzL281K3VRYlRqTDNjaHluTDR3WGdVZzJSOQpxOVVVOEk1bUVvdlVmODZRWjdrT0JJakp3cW56RDFvbWFnZUVIV3dIZEJPNkIrZEZhYm1kVDlQT3hnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t
  jwt_identity_base_field: sub
  jwt_policy_field_name: pol
  jwt_default_policies:
    - default/jwt-policy
---
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: jwt-policy
spec:
  access_rights_array:
    - name: httpbin-jwt1
      namespace: default
      versions:
        - Default
  active: true
  name: jwt-policy
  state: active
```

You can verify the API is properly authenticated with following command:

1. JWT with default policy
```bash
curl http://localhost:8080/httpbin-jwt1/get -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyfQ.rgPyrCJYs2im7zG6im5XUqsf_oAf_Kqk-F6IlLb3yzZCSZvrQObhBnkLKgfmVTbhQ5El7Q6KskXPal5-eZFuTQ'
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "Traceparent": "00-d2b93d763ca27f29181c8e508b5ac0c9-a446afa3bd053617-01",
    "User-Agent": "curl/8.6.0",
    "X-Amzn-Trace-Id": "Root=1-6696f0bf-1d9e532c6a2eb3a709e7086b"
  },
  "origin": "127.0.0.1, 178.128.43.98",
  "url": "http://httpbin.org/get"
}
```

2. JWT with explicit policy
```bash
curl http://localhost:8080/httpbin-jwt1/get -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyLCJwb2wiOiJaR1ZtWVhWc2RDOXFkM1F0Y0c5c2FXTjUifQ.7nY9TvYgsAZqIHLhJdUPqZtzqU_5T-dcNtCt4zt8YPyUj893Z_NopL6Q8PlF8TlMdxUq1Ff8rt4-p8gVboIqlA'
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "Traceparent": "00-002adf6632ec20377cb7ccf6c3037e78-3c4cb97c70d790cb-01",
    "User-Agent": "curl/8.6.0",
    "X-Amzn-Trace-Id": "Root=1-6696f1dd-7f9de5f947c8c73279f7cca6"
  },
  "origin": "127.0.0.1, 178.128.43.98",
  "url": "http://httpbin.org/get"
}
```

##### Basic Authentication

This configuration uses [Basic Authentication]({{< ref "api-management/client-authentication#use-basic-authentication">}}), requiring a username and password for access.

```yaml {hl_lines=["13-13"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-basic-auth
spec:
  name: Httpbin Basic Authentication
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  use_basic_auth: true
```

##### Custom Plugin Auth (go)

This configuration uses a [Golang plugin]({{<ref "plugins/supported-languages/golang">}}) for custom authentication. The following example shows how to create an API definition with a Golang custom plugin for `httpbin-go-auth`.

For an example of Golang authentication middleware, see [Performing custom authentication with a Golang plugin]({{<ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples#performing-custom-authentication-with-a-golang-plugin">}}).

```yaml {hl_lines=["7-7", "14-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-go-auth
spec:
  name: httpbin-go-auth
  use_go_plugin_auth: true # Turn on GO auth
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  custom_middleware:
    driver: goplugin
    pre:
      - name: "AddFooBarHeader"
        path: "/mnt/tyk-gateway/example-go-plugin.so"
    auth_check:
        name: "MyPluginCustomAuthCheck"
        path: "/mnt/tyk-gateway/example-go-plugin.so"
```

##### Custom Plugin Auth (gRPC)

This configuration uses a [gRPC plugin]({{<ref "plugins/supported-languages/golang">}}) for custom authentication. The following example shows how to create an API definition with a gRPC custom plugin for `httpbin-grpc-auth`.

For a detailed walkthrough on setting up Tyk with gRPC authentication plugins, refer to [Extending Tyk with gRPC Authentication Plugins](https://tyk.io/blog/how-to-setup-custom-authentication-middleware-using-grpc-and-java/).

```yaml {hl_lines=["9-9", "14-26"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-grpc-auth
spec:
  name: httpbin-grpc-auth
  protocol: http
  active: true
  enable_coprocess_auth: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin-grpc-auth
    strip_listen_path: true
  custom_middleware:
    driver: grpc
    post_key_auth:
      - name: "HelloFromPostKeyAuth"
        path: ""
    auth_check:
      name: foo
      path: ""
    id_extractor:
      extract_from: header
      extract_with: value
      extractor_config:
        header_name: Authorization
```

##### Multiple (Chained) Auth

This setup allows for [multiple authentication]({{< ref "api-management/client-authentication#combine-authentication-methods">}}) methods to be chained together, requiring clients to pass through each specified authentication provider.

To enable multiple (chained) auth, you should set `base_identity_provided_by` field to one of the supported chained enums. Consult [Enable Multi (Chained) Authentication in your API Definition]({{< ref "api-management/client-authentication#enable-multi-chained-authentication-in-your-api-definition">}}) for the supported auths.

In this example, we are creating an API definition with basic authentication and mTLS with basic authentication as base identity for `httpbin-multiple-authentications`.

```yaml {hl_lines=["19-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-multiple-authentications
spec:
  name: Httpbin Multiple Authentications
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  base_identity_provided_by: basic_auth_user
  use_basic_auth: true
  use_mutual_tls_auth: true
```

##### IP Allowlist

To enable [IP Allowlist]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting">}}), set the following fields:

* `enable_ip_whitelisting`: Enables IPs allowlist. When set to `true`, only requests coming from the explicit list of IP addresses defined in (`allowed_ips`) are allowed through.
* `allowed_ips`: A list of strings that defines the IP addresses (in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) notation) that are allowed access via Tyk.

In this example, only requests coming from 127.0.0.2 is allowed.

```yaml {hl_lines=["10-12"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  enable_ip_whitelisting: true
  allowed_ips:
    - 127.0.0.2
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```

##### IP Blocklist

To enable [IP Blocklist]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting">}}), set the following fields:

* `enable_ip_blacklisting`: Enables IPs blocklist. If set to `true`, requests coming from the explicit list of IP addresses (blacklisted_ips) are not allowed through.
* `blacklisted_ips`: A list of strings that defines the IP addresses (in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) notation) that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. 

In this example, requests coming from 127.0.0.2 will be forbidden (`403`).

```yaml {hl_lines=["10-12"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  enable_ip_blacklisting: true
  blacklisted_ips:
    - 127.0.0.2
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```


#### Set Up Manifest for GraphQL
In the example below we can see that the configuration is contained within the `graphql` configuration object. A GraphQL schema is specified within the `schema` field and the execution mode is set to `proxyOnly`. The [GraphQL public playground]({{< ref "graphql/graphql-playground#enabling-public-graphql-playground" >}}) is enabled with the path set to `/playground`.

```yaml {hl_lines=["15-17", "18-92"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: trevorblades
spec:
  name: trevorblades
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: https://countries.trevorblades.com
    listen_path: /trevorblades
    strip_listen_path: true
  graphql:
    enabled: true
    version: "2"
    execution_mode: proxyOnly
    schema: |
      directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

      enum CacheControlScope {
        PUBLIC
        PRIVATE
      }

      type Continent {
        code: ID!
        name: String!
        countries: [Country!]!
      }

      input ContinentFilterInput {
        code: StringQueryOperatorInput
      }

      type Country {
        code: ID!
        name: String!
        native: String!
        phone: String!
        continent: Continent!
        capital: String
        currency: String
        languages: [Language!]!
        emoji: String!
        emojiU: String!
        states: [State!]!
      }

      input CountryFilterInput {
        code: StringQueryOperatorInput
        currency: StringQueryOperatorInput
        continent: StringQueryOperatorInput
      }

      type Language {
        code: ID!
        name: String
        native: String
        rtl: Boolean!
      }

      input LanguageFilterInput {
        code: StringQueryOperatorInput
      }

      type Query {
        continents(filter: ContinentFilterInput): [Continent!]!
        continent(code: ID!): Continent
        countries(filter: CountryFilterInput): [Country!]!
        country(code: ID!): Country
        languages(filter: LanguageFilterInput): [Language!]!
        language(code: ID!): Language
      }

      type State {
        code: String
        name: String!
        country: Country!
      }

      input StringQueryOperatorInput {
        eq: String
        ne: String
        in: [String]
        nin: [String]
        regex: String
        glob: String
      }

      """The `Upload` scalar type represents a file upload."""
      scalar Upload
    playground:
      enabled: true
      path: /playground
```

#### Set Up Manifest for HTTP
##### HTTP Proxy

This example creates a basic API definition that routes requests to listen path `/httpbin` to target URL `http://httpbin.org`.

Traffic routing can be configured under `spec.proxy`:
- `target_url` defines the upstream address (or target URL) to which requests should be proxied.
- `listen_path` is the base path on Tyk to which requests for this API should be sent. Tyk listens out for any requests coming into the host at this path, on the port that Tyk is configured to run on and processes these accordingly. For example, `/api/` or `/` or `/httpbin/`.
- `strip_listen_path` removes the inbound listen path (as accessed by the client) when generating the outbound request for the upstream service. For example, consider the scenario where the Tyk base address is `http://acme.com/`, the listen path is `example/` and the upstream URL is `http://httpbin.org/`: If the client application sends a request to `http://acme.com/example/get` then the request will be proxied to `http://httpbin.org/example/get`

```yaml {hl_lines=["10-13"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

##### HTTP Host-based Proxy

`spec.domain` is the domain to bind this API to. This enforces domain matching for client requests.

In this example, requests to `httpbin.tyk.io` will be proxied to upstream URL `http://httpbin.org`

```yaml {hl_lines=["10-10"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  domain: httpbin.tyk.io
  proxy:
    target_url: http://httpbin.org
    listen_path: /
    strip_listen_path: true
```

##### HTTPS Proxy

This example creates a API definition that routes requests to a http://httpbin.org via port 8443.

```yaml {hl_lines=["35-38"],linenos=false}
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: { }
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-test-cert
spec:
  secretName: my-test-tls
  dnsNames:
    - foo.com
    - bar.com
  privateKey:
    rotationPolicy: Always
  issuerRef:
    name: selfsigned-issuer
    # We can reference ClusterIssuers by changing the kind here.
    # The default value is Issuer (i.e. a locally namespaced Issuer)
    kind: Issuer
    # This is optional since cert-manager will default to this value however
    # if you are using an external issuer, change this to that issuer group.
    group: cert-manager.io
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: https
  listen_port: 8443
  certificate_secret_names:
    - my-test-tls
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

#### Set Up Manifest for TCP

This example creates a API definition that proxies request from TCP port `6380` to `tcp://localhost:6379`.

```yaml {hl_lines=["8-11"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: redis-tcp
spec:
  name: redis-tcp
  active: true
  protocol: tcp
  listen_port: 6380
  proxy:
    target_url: tcp://localhost:6379
```

#### Set Up Manifest for UDG
##### UDG v2 (Tyk 3.2 and above)

If you are on Tyk 3.2 and above, you can use the following manifest to create an UDG API. This example configures a Universal Data Graph from a [GraphQL datasource]({{<ref "universal-data-graph/datasources/graphql">}}) and a [REST Datasource]({{<ref "universal-data-graph/datasources/rest">}}).

```yaml {hl_lines=["20-39", "46-80"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph v2a
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }

      type Query {
        countries: [Country]
      }

      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: Int
      }
    version: "2"
    last_schema_update: "2022-10-12T14:27:55.511+03:00"
    type_field_configurations: []
    playground:
      enabled: true
      path: /playground
    engine:
      field_configs:
        - disable_default_mapping: false
          field_name: countries
          path:
            - "countries"
          type_name: Query
        - disable_default_mapping: true #very important for rest APIs
          field_name: restCountry
          path: []
          type_name: Country
      data_sources:
        - kind: "GraphQL"
          name: "countries"
          internal: false
          root_fields:
            - type: Query
              fields:
                - "countries"
          config:
            url: "https://countries.trevorblades.com/"
            method: "POST"
            headers: {}
            body: ""
        - kind: "REST"
          internal: false
          name: "restCountries"
          root_fields:
            - type: "Country"
              fields:
                - "restCountry"
          config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: "GET"
            body: ""
            headers: {}
```

##### UDG v1 (Tyk 3.1 or before)

If you are on Tyk 3.1, you can use the following manifest to create an UDG API. This example creates a Universal Data Graph with GraphQL datasource and HTTP JSON datasource.

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph Example
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }

      type Query {
        countries: [Country]
      }

      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: String
      }
    type_field_configurations:
      - type_name: Query
        field_name: countries
        mapping:
          disabled: false
          path: countries
        data_source:
          kind: GraphQLDataSource
          data_source_config:
            url: "https://countries.trevorblades.com"
            method: POST
            status_code_type_name_mappings: []
      - type_name: Country
        field_name: restCountry
        mapping:
          disabled: true
          path: ""
        data_source:
          kind: HTTPJSONDataSource
          data_source_config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: GET
            default_type_name: RestCountry
            status_code_type_name_mappings:
              - status_code: 200
    playground:
      enabled: true
      path: /playground
```

### Set Up Tyk Streams API
Tyk Streams integrates natively with Tyk OpenAPI Specification (OAS), allowing you to manage APIs as code and automate processes in Kubernetes using Tyk Operator. Setting up Tyk Streams API is similar to configuring a standard Tyk OAS API. You can store the Tyk Streams OAS definition in a Kubernetes ConfigMap and connect it to Tyk Gateway through a `TykStreamsApiDefinition` resource.

#### Create your Tyk Streams API
##### Prepare the Tyk Streams API Definition
To create a Tyk Streams API, start by preparing a complete Tyk Streams API definition in the OpenAPI Specification (OAS) format. This file must include:

- The `x-tyk-api-gateway` extension for Tyk-specific settings.
- The `x-tyk-streaming` extension for Tyk Streams configuration.

Here’s an example of a Tyk Streams API definition:

```json {hl_lines=["17-54"],linenos=true}
{
  "info": {
    "title": "Simple streaming demo",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://tyk-gw.local/streams/"
    }
  ],
  "security": [],
  "paths": {},
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-streaming": {
    "streams": {
      "example-publisher": {
        "input": {
          "http_server": {
            "allowed_verbs": [
              "POST"
            ],
            "path": "/pub",
            "timeout": "1s"
          }
        },
        "output": {
          "http_server": {
            "ws_path": "/ws"
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "Simple streaming demo",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/streams/"
      }
    },
    "upstream": {
      "url": "https://not-needed"
    }
  }
}
```

##### Create a TykStreamsApiDefinition Custom Resource
Once your Tyk Streams API definition is ready, use a Kubernetes ConfigMap to store the definition and link it to a `TykStreamsApiDefinition` custom resource.

Example manifest:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykStreamsApiDefinition
metadata:
  name: simple-stream
spec:
  tykStreams:
    configmapRef:
      name: simple-stream-cm            #k8s resource name of configmap
      namespace: default                #The k8s namespace of the resource being targeted. If Namespace is not provided,
                                        #we assume that the ConfigMap is in the same namespace as TykStreamsApiDefinition resource.
      keyName: test_stream.json
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: simple-stream-cm
data:
  test_stream.json: |-
    {
      "components": {},
      "info": {
        "title": "Simple streaming demo",
        "version": "1.0.0"
      },
      "openapi": "3.0.3",
      "paths": {},
      "x-tyk-api-gateway": {
        "info": {
          "name": "Simple streaming demo",
          "state": {
            "active": true
          }
        },
        "server": {
          "detailedTracing": {
            "enabled": true
          },
          "listenPath": {
            "strip": true,
            "value": "/streams/"
          }
        },
        "upstream": {
          "url": "https://not-needed"
        }
      },
      "x-tyk-streaming": {
        "streams": {
          "example-publisher": {
            "input": {
              "http_server": {
                "path": "/pub",
                "allowed_verbs": ["POST"],
                "timeout": "1s"
              }
            },
            "output": {
              "http_server": {
                "ws_path": "/ws"
              }
            }
          }
        }
      }
    }
```

##### Apply the TykStreamsApiDefinition Manifest

Use the `kubectl` command to apply the `TykStreamsApiDefinition` manifest to your Kubernetes cluster:

```sh
kubectl apply -f tyk-streams-api-definition.yaml
```

This will create a new `TykStreamsApiDefinition` resource. The Tyk Operator watches this resource and configures the Tyk Gateway or Tyk Dashboard with the new API.

##### Verify the Tyk Streams API Creation

Check the status of the `TykStreamsApiDefinition` resource to ensure that the API has been successfully created:

```sh
kubectl get tykstreamsapidefinitions simple-stream
```

You should see output similar to this:

```bash
NAME            DOMAIN   LISTENPATH   ENABLED   SYNCSTATUS
simple-stream            /streams/    true      Successful
```

##### Manage and Update the Tyk Streams API
To update your API configuration, modify the linked `ConfigMap`. The Tyk Operator will automatically detect changes and update the API in the Tyk Gateway.

#### Secure your Tyk Streams API
To secure your Tyk Streams API, configure security fields in the OAS definition just as you would for a standard Tyk OAS API. For more details, refer to the [Secure your OAS API](#secure-your-oas-api) guide.

### Add a Security Policy to your API
To further protect access to your APIs, you will want to add a security policy. 
Below, we take you through how to define the security policy but you can also find [Security Policy Example]({{< ref "#security-policy-example" >}}) below.

##### Define the Security Policy manifest

To create a security policy, you must define a Kubernetes manifest using the `SecurityPolicy` CRD. The following example illustrates how to configure a default policy for trial users for a Tyk Classic API named `httpbin`, a Tyk OAS API named `petstore`, and a Tyk Streams API named `http-to-kafka`.

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: trial-policy                    # Unique Kubernetes name
spec:
  name: Default policy for trial users  # Descriptive name for the policy
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # Omit this field or use `ApiDefinition` if you are referencing Tyk Classic API
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` if you are referencing Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
    - name: http-to-kafka
      namespace: default
      kind: TykStreamsApiDefinition         # Use `TykStreamsApiDefinition` if you are referencing Tyk Streams API
      versions:
        - ""                            # The default version of Tyk Streams API is ""
  quota_max: 1000
  quota_renewal_rate: 3600
  rate: 120
  per: 60
  throttle_interval: -1
  throttle_retry_limit: -1
```

Save the manifest locally in a file, e.g. `trial-policy.yaml`

In this example, we have defined a security policy as described below:

**Define Security Policy status and metadata**

  - **`name`**: A descriptive name for the security policy.
  - **`active`**: Marks the policy as active (true or false).
  - **`state`**: The current state of the policy. It can have one of three values:
    - **`active`**: Keys connected to this policy are enabled and new keys can be created.
    - **`draft`**: Keys connected to this policy are disabled; no new keys can be created.
    - **`deny`**: Policy is not published to Gateway; no keys can be created.
  - **`tags`**: A list of tags to categorize or label the security policy, e.g.

    ```yaml
    tags:
      - Hello
      - World
    ```

  - **`meta_data`**: Key-value pairs for additional metadata related to the policy, e.g.

    ```yaml
    meta_data:
      key: value
      hello: world
    ```

**Define Access Lists for APIs**

  - **`access_rights_array`**: Defines the list of APIs that the security policy applies to and the versions of those APIs.
    - **`name`**: The Kubernetes metadata name of the API resource to which the policy grants access.
    - **`namespace`**: The Kubernetes namespace where the API resource is deployed.
    - **`kind`**: Tyk OAS APIs (`TykOasApiDefinition`), Tyk Streams (`TykStreamsApiDefinition`) and Tyk Classic APIs (`ApiDefinition`) can be referenced here. The API format can be specified by `kind` field. If omitted, `ApiDefinition` is assumed.
    - **`versions`**: Specifies the API versions the policy will cover. If the API is not versioned, include the default version here. The default version of a Classic API is "Default". The default version of an OAS API is "".

In this example, the security policy will apply to an `ApiDefinition` resource named `httpbin` in the `default` namespace, a `TykOasApiDefinition` resource named `petstore` in the `default` namespace, and a `TykStreamsApiDefinition` resource named `http-to-kafka` in the `default` namespace. Note that with Tyk Operator, you do not need to specify API ID as in the raw [Policy definition]({{<ref "basic-config-and-security/security/security-policies/policies-guide">}}). Tyk Operator will automatically retrieve the API ID of referenced API Definition resources for you.

**Define Rate Limits, Usage Quota, and Throttling**

- **`rate`**: The maximum number of requests allowed per time period (Set to `-1` to disable).
- **`per`**: The time period (in seconds) for the rate limit (Set to `-1` to disable).
- **`throttle_interval`**: The interval (in seconds) between each request retry  (Set to `-1` to disable).
- **`throttle_retry_limit`**: The maximum number of retry attempts allowed  (Set to `-1` to disable).
- **`quota_max`**: The maximum number of requests allowed over a quota period (Set to `-1` to disable).
- **`quota_renewal_rate`**: The time, in seconds, after which the quota is renewed.

In this example, trial users under this security policy can gain access to the `httpbin` API at a rate limit of maximum 120 times per 60 seconds (`"rate": 120, "per": 60`), with a usage quota of 1000 every hour (`"quota_max": 1000, "quota_renewal_rate": 3600`), without any request throttling (`throttle_interval: -1, throttle_retry_limit: -1`).

##### Apply the Security Policy manifest
Once you have defined your security policy manifest, apply it to your Kubernetes cluster using the `kubectl apply` command:

```bash
kubectl apply -f trial-policy.yaml
```

##### Verify the Security Policy

After applying the manifest, you can verify that the security policy has been created successfully by running:

```bash
kubectl describe securitypolicy trial-policy

...
Status:
  Latest CRD Spec Hash:  901732141095659136
  Latest Tyk Spec Hash:  5475428707334545086
  linked_apis:
    Kind:       ApiDefinition
    Name:       httpbin
    Namespace:  default
    Kind:       TykOasApiDefinition
    Name:       petstore
    Namespace:  default
    Kind:       TykStreamsApiDefinition
    Name:       http-to-kafka
    Namespace:  default
  pol_id:       66e9a27bfdd3040001af6246
Events:         <none>
```

From the `status` field, you can see that this security policy has been linked to `httpbin`, `petstore`, and `http-to-kafka` APIs.


##### Security Policy Example
###### Key-Level Per-API Rate Limits and Quota

By configuring per-API limits, you can set specific rate limits, quotas, and throttling rules for each API in the access rights array. When these per-API settings are enabled, the API inherits the global limit settings unless specific limits and quotas are set in the `limit` field for that API.

The following manifest defines a security policy with per-API rate limits and quotas for two APIs: `httpbin` and `petstore`.

```yaml {hl_lines=["15-21", "27-33", "40-41"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-per-api-limits
spec:
  name: Policy with Per API Limits
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      limit:                            # APILimit stores quota and rate limit on ACL level
        rate: 10                        # Max 10 requests per 60 seconds
        per: 60                         # Time period for rate limit
        quota_max: 100                  # Max 100 requests allowed over the quota period
        quota_renewal_rate: 3600        # Quota renewal period in seconds (1 hour)
        throttle_interval: -1           # No throttling between retries
        throttle_retry_limit: -1        # No limit on request retries
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      limit:
        rate: 5                         # Max 5 requests per 60 seconds
        per: 60                         # Time period for rate limit
        quota_max: 100                  # Max 100 requests allowed over the quota period
        quota_renewal_rate: 3600        # Quota renewal period in seconds (1 hour)
        throttle_interval: -1           # No throttling between retries
        throttle_retry_limit: -1        # No limit on request retries
  rate: -1                              # Disable global rate limit
  per: -1                               # Disable global rate limit period
  throttle_interval: -1                 # Disable global throttling
  throttle_retry_limit: -1              # Disable global retry limit
  quota_max: -1                         # Disable global quota
  quota_renewal_rate: 60                # Quota renewal rate in seconds (1 minute)
```

With this security policy applied:

For the `httpbin` API:
- The rate limit allows a maximum of 10 requests per 60 seconds.
- The quota allows a maximum of 100 requests per hour (3600 seconds).
- There is no throttling or retry limit (throttle_interval and throttle_retry_limit are set to -1).

For the `petstore` API:
- The rate limit allows a maximum of 5 requests per 60 seconds.
- The quota allows a maximum of 100 requests per hour (3600 seconds).
- There is no throttling or retry limit (throttle_interval and throttle_retry_limit are set to -1).

Global Rate Limits and Quota:
- All global limits (rate, quota, and throttling) are disabled (-1), so they do not apply.

By setting per-API rate limits and quotas, you gain granular control over how each API is accessed and used, allowing you to apply different limits for different APIs as needed. This configuration is particularly useful when you want to ensure that critical APIs have stricter controls while allowing more flexibility for others. Use this example as a guideline to tailor your security policies to your specific requirements.

**Key-Level Per-Endpoint Rate Limits{#per-endpoint-rate-limit}**

By configuring key-level per-endpoint limits, you can restrict the request rate for specific API clients to a specific endpoint of an API.

The following manifest defines a security policy with per-endpoint rate limits for two APIs: `httpbin` and `petstore`.

```yaml {hl_lines=["15-29", "35-49"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-per-api-limits
spec:
  name: Policy with Per API Limits
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      endpoints:                        # Per-endpoint rate limits
        - path: /anything
          methods:
            - name: POST
              limit:
                rate: 5
                per: 60
            - name: PUT
              limit:
                rate: 5
                per: 60
            - name: GET
              limit:
                rate: 10
                per: 60
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      endpoints:                        # Per-endpoint rate limits
        - path: /pet
          methods:
            - name: POST
              limit:
                rate: 5
                per: 60
            - name: PUT
              limit:
                rate: 5
                per: 60
            - name: GET
              limit:
                rate: 10
                per: 60
  rate: -1                              # Disable global rate limit
  per: -1                               # Disable global rate limit period
  throttle_interval: -1                 # Disable global throttling
  throttle_retry_limit: -1              # Disable global retry limit
  quota_max: -1                         # Disable global quota
  quota_renewal_rate: 60                # Quota renewal rate in seconds (1 minute)
```

**Path based permissions{#path-based-permissions}**

You can secure your APIs by specifying [allowed URLs]({{<ref "security/security-policies/secure-apis-method-path">}}) (methods and paths) for each API within a security policy. This is done using the `allowed_urls` field under `access_rights_array`.

The following manifest defines a security policy that allows access only to specific URLs and HTTP methods for two APIs: `httpbin`(a Tyk Classic API) and `petstore` (a Tyk OAS API).

```yaml {hl_lines=["15-18", "24-28"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-with-allowed-urls
spec:
  name: Policy with allowed URLs
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      allowed_urls:                     # Define allowed paths and methods
        - url: /get                     # Only allow access to the "/get" path
          methods:
            - GET                       # Only allow the GET method
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      allowed_urls:                     # Define allowed paths and methods
        - url: "/pet/(.*)"              # Allow access to any path starting with "/pet/"
          methods:
            - GET                       # Allow GET method
            - POST                      # Allow POST method
```

With this security policy applied:

- Allowed access:
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/petstore/pet/10` returns a `200 OK` response.
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/httpbin/get` returns a `200 OK` response.

- Restricted access:
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/petstore/pet` returns a `403 Forbidden` response with the message:
        
    ```json
        { "error": "Access to this resource has been disallowed" }
    ```

    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/httpbin/anything` returns a `403 Forbidden` response with the message:

    ```json
        { "error": "Access to this resource has been disallowed" }
    ```

**Partitioned policies{#partitioned-policies}**

[Partitioned policies]({{<ref "basic-config-and-security/security/security-policies/partitioned-policies">}}) allow you to selectively enforce different segments of a security policy, such as quota, rate limiting, access control lists (ACL), and GraphQL complexity rules. This provides flexibility in applying different security controls as needed.

To configure a partitioned policy, set the segments you want to enable in the `partitions` field:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: partitioned-policy-example
spec:
  name: Partitioned Policy Example
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` if you are referencing Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
  partitions:
    quota: false                        # Do not enforce quota rules
    rate_limit: false                   # Do not enforce rate limiting rules
    acl: true                           # Enforce access control rules
    complexity: false                   # Do not enforce GraphQL complexity rules
```

- **`quota`**: Set to true to enforce quota rules (limits the number of requests allowed over a period).
- **`rate_limit`**: Set to true to enforce rate limiting rules (limits the number of requests per second or minute).
- **`acl`**: Set to true to enforce access control rules (controls which APIs or paths can be accessed).
- **`complexity`**: Set to true to enforce GraphQL complexity rules (limits the complexity of GraphQL queries to prevent resource exhaustion).


### Migrate Existing APIs to Tyk Operator 
If you have existing APIs and Policies running on your Tyk platform, and you want to start using Tyk Operator to manage them, you probably would not want to re-create the APIs and Policies on the platform using Operator CRDs. It is because you will lose keys, policies, and analytics linked to the APIs. You can instead link existing APIs and Policies to a CRD by specifying the API ID or Policy ID in the CRD spec. This way, Operator will update the existing API or Policy according to the CRD spec. Any keys, policies and analytics linked to the API will continue to operate the same. This is great for idempotency.

#### Export existing configurations to CRDs

Instead of creating the API and Policy CRDs from scratch, you can try exporting them from Dashboard using a snapshot tool. You can find the detail usage guide [here](https://github.com/TykTechnologies/tyk-operator/blob/master/pkg/snapshot/README.md). This is great if you want to have a quick start. However, this is still a PoC feature so we recommend you to double check the output files before applying them to your cluster.

#### Migration of existing API

If there are existing APIs that you want to link to a CRD, it's very easy to do so. You need to simply add the `api_id` from your API Definition to the YAML of your `ApiDefinition` type. Then, the Operator will take care of the rest.

Example:

1. From the existing API Definition, grab the following field:

```json
"api_id": "5e0fac4845bb46c77543be28300fd9d7"
```

2. Simply add this value to your YAML, in the `spec.api_id`field:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: my-existing-api
spec:
  api_id: 5e0fac4845bb46c77543be28300fd9d7
  name: existing API
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

3. Then apply your changes:

```console
$ kubectl apply -f config/samples/httpbin_protected.yaml
apidefinition.tyk.tyk.io/my-existing-api created
```

{{< note success >}}
**Note**  

The source of truth for the API definition is now the CRD, meaning it will override any differences in your existing API definition.
{{< /note >}}

#### Migration of existing Policy
If you have existing pre-Operator policies, you can easily link them to a CRD, which will allow you to modify them through the YAML moving forward.
Simply set the id field in the SecurityPolicy YAML to the _id field in the existing Policy's JSON. This will allow the Operator to make the link.
Note that the YAML becomes the source of truth and will overwrite any changes between it and the existing Policy.

**Example**:
1. Find out your existing Policy ID, e.g. `5f8f3933f56e1a5ffe2cd58c`

2. Stick the policy ID `5f8f3933f56e1a5ffe2cd58c` into the YAML's `spec.id` field like below

```yaml
my-security-policy.yaml:
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: new-httpbin-policy
spec:
  id: 5f8f3933f56e1a5ffe2cd58c
  name: My New HttpBin Policy
  state: active
  active: true
  access_rights_array:
    - name: new-httpbin-api # name of your ApiDefinition object.
      namespace: default    # namespace of your ApiDefinition object.
      versions:
        - Default
```

The `spec.access_rights_array` field of the YAML must refer to the ApiDefinition object that the policy identified by the id will affect.

To find available ApiDefinition objects:

```console
$ kubectl get tykapis -A
NAMESPACE   NAME               DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
default     new-httpbin-api             /httpbin     http://httpbin.org   true
```

3. And then apply this file:

```console
$ kubectl apply -f my-security-policy.yaml
securitypolicy.tyk.tyk.io/new-httpbin-policy created
```

Now the changes in the YAML were applied to the existing Policy. You can now manage this policy through the CRD moving forward.
Note, if this resource is unintentionally deleted, the Operator will recreate it with the same `id` field as above, allowing keys to continue to work as before the delete event.

#### Idempotency

Because of the ability to declaratively define the `api_id`, this gives us the ability to preserve Keys that are tied to APIs or policies which are tied to APIs.
Imagine any use case where you have keys tied to policies, and policies tied to APIs.
Now imagine that these resources are unintentionally destroyed. Our database goes down, or our cluster, or something else.
Well, using the Tyk Operator, we can easily re-generate all our resources in a non-destructive fashion. That's because the operator intelligently constructs the unique ID using the unique namespaced name of our CRD resources. For that reason.
Alternatively, if you don't explicitly state it, it will be hard-coded for you by Base64 encoding the namespaced name of the CRD.

For example:

1. we have keys tied to policies tied to APIs in production.
2. Our production DB gets destroyed, all our Policies and APIs are wiped
3. The Tyk Operator can resync all the changes from our CRDs into a new environment, by explicitly defining the Policy IDs and API IDs as before.
4. This allows keys to continue to work normally as Tyk resources are generated idempotently through the Operator.


### Publish Your API to Dev Portal
For Tyk Self Managed or Tyk Cloud, you can set up a Developer Portal to expose a facade of your APIs and then allow third-party developers to register and use your APIs.
You can make use of Tyk Operator CRDs to publish the APIs as part of your CI/CD workflow. If you have followed this Getting Started guide to create the httpbin example API, you can publish it to your Tyk Classic Developer Portal in a few steps.

{{< note success >}}

**Note**  
Currently Operator only supports publishing Tyk Classic API to the Tyk Classic Portal.
{{< /note >}}

#### Publish an API with Tyk Operator
1. **Creating a security policy**

When you publish an API to the Portal, Tyk actually publishes a way for developers to enroll in a policy, not into the API directly. Therefore, you should first set up a security policy for the developers, before proceeding with the publishing.

To do that, you can use the following command:

```yml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
 name: standard-pol
spec:
 name: standard-pol
 active: true
 state: active
 access_rights_array:
 - name: httpbin
   namespace: default
   versions:
     - Default
EOF
```

The above command will create a basic security policy and attribute it to the `httpbin` API that was previously created.

2. **Creating an API description**

The Tyk Classic Developer Portal enables you to host your API documentation in Swagger/OpenAPI or API Blueprint for developers to use. In the case of Swagger/OpenAPI, you can either paste your Swagger content (JSON or YAML) in the CRD, or via a link to a public Swagger hosted URL, which can then be rendered by using Swagger UI.

Create a file called `apidesc.yaml`, then add the following;

```yml
apiVersion: tyk.tyk.io/v1alpha1
kind: APIDescription
metadata:
 name: standard-desc
spec:
 name: HTTPBIN API
 policyRef:
  name: standard-pol
  namespace: default
 docs:
  doc_type: swagger_custom_url
  documentation: "https://httpbin.org/spec.json"
 show: true
 version: v2
```

3. **Apply the changes**

```console
kubectl apply -f apidesc.yaml
```
Or, if you don’t have the manifest with you, you can run the following command:

```yml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: APIDescription
metadata:
 name: standard-desc
spec:
 name: HTTPBIN API
 policyRef:
  name: standard-pol
  namespace: default
 docs:
  doc_type: swagger_custom_url
  documentation: "https://httpbin.org/spec.json"
 show: true
 version: v2
EOF
```

4. **Creating a PortalAPICatalog resource**

Unlike other platforms, Tyk will not auto-publish your APIs to the Portal, instead they are presented as a facade, you choose what APIs and what Policies to expose to the Portal. You can configure what APIs and what Policies to expose to the Portal via Tyk Operator by creating a PortalAPICatalog resource.

Create a file called `api_portal.yaml`, then add the following:

```yml
apiVersion: tyk.tyk.io/v1alpha1
kind: PortalAPICatalogue
metadata:
 name: test-httpbin-api
spec:
 apis:
 - apiDescriptionRef:
    name: standard-desc
    namespace: default
```

You have added your API Descriptions under `apis`.

5. **Apply the changes**

```console
kubectl apply -f api_portal.yaml
```

Now your new API and its documentation is loaded to the Developer Portal.

**APIDescription CRD**

Different types of documents are supported:

Swagger Documents:

- `doc_type: swagger`
- `documentation`: Base64 encoded swagger doc

Swagger Hosted URL:

- `doc_type: swagger_custom_url`
- `documentation`: The URL to the swagger documentation, for example *"https://httpbin.org/spec.json"*

GraphQL:

- `doc_type: graphql`



### Control Kubernetes Ingress Resources
In Kubernetes, the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource defines routing rules for external HTTP/S traffic to services within a cluster, based on domains or paths. An [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/), like NGINX or HAProxy, interprets these rules and configures the network infrastructure to route traffic, handling SSL termination and load balancing.

The Tyk Operator builds upon the idea of Kubernetes Ingress by allowing you to reuse existing Ingress definitions while adding advanced API management features like authentication, rate limiting, and monitoring. This approach provides seamless ingress traffic management with powerful API gateway capabilities in a unified solution.

#### How Tyk Operator Works as an Ingress Controller
When you use Tyk Operator as an Ingress Controller, each "path" defined in your existing Ingress resource is treated as an "API" within Tyk. 

Using this Ingress spec as example:

```yaml{hl_lines=["6-8", "13-13", "15-24"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # Specify Tyk as Ingress Controller
    tyk.io/template: myapideftemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: ApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
spec:
  tls:
    - hosts:
        - myingress.do.poc.tyk.technology
      secretName: httpbin-ingress-tls
  rules:
  - host: myingress.do.poc.tyk.technology
    http:
      paths:
      - path: /httpbin             # Corresponds to API listen path
        pathType: Prefix
        backend:                   # Corresponds to upstream URL
          service:
            name: httpbin
            port:
              number: 8000
```

Here's how it works:

- **Path Mapping**: Tyk Operator will automatically create APIs in Tyk for each path for a specific rule defined in Ingress resource. Just as with traditional Ingress, incoming requests are routed to the correct backend service within the cluster based on the host and paths defined in the Ingress rules.

  In the given example, Tyk Operator is designated as the Ingress Controller for this Ingress resource. Tyk Operator reads this Ingress definition and automatically creates a corresponding API in the Tyk Gateway. The API will have:
    
    - A **custom domain** set to `myingress.do.poc.tyk.technology`, as defined by the `host` field in the Ingress rule.
    - The TLS certificate from secret `httpbin-ingress-tls` uploaded to Tyk and **certificates** field set to the resulting certificate ID.
    - A **listen path** set to `/httpbin`, which is defined by the `path` field in the Ingress rule.
    - An **upstream URL** set to `http://httpbin.default.svc:8000`, which corresponds to the backend service defined in the Ingress (`httpbin` service running on port `8000`).

- **API Management Through Tyk**: At the same time, Tyk allows you to apply API management features by referencing a configuration template. This template is defined using either an `ApiDefinition` or `TykOasApiDefinition` resource. These resources provide a reference configuration that includes details on how the API should be managed, such as security policies, traffic controls, and transformations.

  In the given example, there are two important annotations in the Ingress metadata:

  ```yaml
    annotations:
      tyk.io/template: myapideftemplate
      tyk.io/template-kind: ApiDefinition
  ```

  These annotations specify that Tyk Operator should use a resource named `myapideftemplate` in the same namespace as the reference for API configuration. The `tyk.io/template-kind` annotation indicates that this reference is of type `ApiDefinition`. Alternatively, it could be a `TykOasApiDefinition`, depending on the user's choice. Tyk Operator detects these annotations and looks for the specified resource in the same namespace. For each path defined in the Ingress, Tyk Operator creates a corresponding API in Tyk by copying the specification from `myapideftemplate` resource (such as authentication type, rate limiting, etc.) and then updates only the relevant fields like custom domain, certificates, listen path, and upstream URL based on the Ingress spec.

  Note that `ApiDefinition` or `TykOasApiDefinition` created for use as a template for Ingress resources should have a special label set so that Tyk Operator would not manage it as ordinary APIs. Here is the required label for `ApiDefinition` and `TykOasApiDefinition` respectively:

  Label for `ApiDefinition` indicating it is a resource template.

  ```yaml
    labels:
      template: "true"
  ```

  Label for `TykOasApiDefinition` indicating it is a resource template.

  ```yaml
    labels:
      tyk.io/ingress-template: "true"
  ```

  Note that use of `TykStreamsApiDefinition` as resource template is not supported.

- **Automated Resource Handling**: Tyk Operator handles the automatic discovery and management of existing Ingress resources, eliminating the need for manual migration of all Ingress rules into API definitions. You can simply define an API configuration template as a `TykOasApiDefinition` resource or `ApiDefinition` resource and then let Tyk Operator creates all the APIs from your existing Ingress rules using the referenced resource as template, streamlining the transition process.

  Additionally, the Tyk Operator also handles any changes to the Ingress resources it manages. If an Ingress resource is updated — whether through the addition, removal, or modification of paths in the Ingress rules — Tyk Operator automatically reconfigures the corresponding Tyk APIs to ensure they remain in sync with the updated Ingress configuration. This dynamic updating capability ensures that your API management remains consistent and up-to-date with the latest changes in your Kubernetes environment.

This approach enables you to quickly and easily integrate advanced API management functionalities into your existing Kubernetes environment without needing to change your current configurations significantly.

#### Configuration Examples

To configure Tyk Operator to handle Ingress resources, specify ingress class as `tyk` in the Ingress resource. You can also optionally create a `ApiDefinition` or `TykOasApiDefinition` resource template that provides default API configurations. This allows Tyk Operator to read the Ingress resource and create API Definition resources based on ingress path and referenced template.

The following sections shows some example of Tyk `ApiDefinition` or `TykOasApiTemplate` template and Ingress specification.

##### HTTP host based and/or path based routing

<details>
  <summary>Click to expand</summary>

```yaml {hl_lines=["6-7", "10-48"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
spec:
  rules:
    - host: httpbin.ahmet
      http:
        paths:
          - path: / # host routing: http://httpbin.ahmet/
            pathType: Prefix
            backend:
              service:
                name: httpbin1
                port:
                  number: 8000
          - path: /httpbin # host + path routing: http://httpbin.ahmet/httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin2
                port:
                  number: 8000
    - http:
        paths:
          - path: /pathonly  # path only routing: http://IPADDRESS/pathonly
            pathType: Prefix
            backend:
              service:
                name: httpbin3
                port:
                  number: 8000
    - host: "*.foo.com" # wildcard
      # curl http://bar.foo.com/httpbin/get === OK Matches based on shared suffix
      # curl http://baz.bar.foo.com/httpbin/get === NOK No match, wildcard only covers a single DNS label
      # curl http://foo.com/httpbin/get === NOK No match, wildcard only covers a single DNS label
      http:
        paths:
          - path: /httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin4
                port:
                  number: 8000
```

In this example, 4 APIs will be created by Tyk Operator. It illustrates how different Ingress rules: host based routing, path based routing, host + path based routing, and wildcard hosts are handled by Tyk Operator.

| API Name | Custom Domain | Listen Path | Target URL | Example request that would be handled by this API |
|----------|---------------|-------------|------------|---------------------------------------------------|
| default-httpbin-ingress-a1863f096         |  httpbin.ahmet |  /          |  http://httpbin1.default.svc.cluster.local:8000 | http://httpbin.ahmet/  |
| default-httpbin-ingress-d33713b8b |  httpbin.ahmet |  /httpbin   |  http://httpbin2.default.svc.cluster.local:8000 | http://httpbin.ahmet/httpbin |
| default-httpbin-ingress-00254eeb0             |                |  /pathonly  |  http://httpbin3.default.svc.cluster.local:8000 | http://IPADDRESS/pathonly |
| default-httpbin-ingress-3af1fef04 |  {?:[^.]+}.foo.com  | /httpbin | http://httpbin4.default.svc:8000 | http://bar.foo.com/httpbin |

</details>

##### HTTPS with cert-manager integration

<details>
  <summary>Click to expand</summary>

```yaml {hl_lines=["7-7", "13-13", "15-24", "58-58"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress-tls
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    cert-manager.io/cluster-issuer: "letsencrypt-staging" # this annotation indicates the issuer to use.
    acme.cert-manager.io/http01-edit-in-place: "true"
spec:
  tls: 
    - hosts: # < placing a host in the TLS config will determine what ends up in the cert's subjectAltNames
        - myingress.do.poc.tyk.technology
      secretName: httpbin-ingress-tls-secret # < cert-manager will store the created certificate in this secret.
  rules:
    - host: myingress.do.poc.tyk.technology
      http:
        paths:
          - path: /httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin
                port:
                  number: 8000
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: ahmet@tyk.io
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
      - http01:
          ingress:
            class: tyk
---
apiVersion: v1
kind: Service
metadata:
  name: ingress-gateway
  namespace: tyk
spec:
  ports:
    - name: http
      targetPort: 8000
      port: 80
      protocol: TCP
    - name: https
      targetPort: 443
      port: 443
      protocol: TCP
  selector:
    app: gateway-tyk-stack-tyk-gateway
  type: LoadBalancer
  externalTrafficPolicy: Local
```

A common use-case for [cert-manager](https://cert-manager.io/docs/usage/ingress/) is requesting TLS signed certificates to secure your ingress resources. This can be done by simply adding [annotations](https://cert-manager.io/docs/usage/ingress/#supported-annotations), such as `cert-manager.io/cluster-issuer`, to your Ingress resources and cert-manager will facilitate creating the `Certificate` resource for you. 

In this example, cert-manager watches the ingress resource `httpbin-ingress-tls` and ensures a TLS secret named `httpbin-ingress-tls-secret` (provided by the `tls.secretName` field) in the same namespace will be created and configured as described on the Ingress. This example also exposes Tyk Gateway as a `LoadBalancer` service with the `ingress-gateway` resource. This is essential for completing the ACME challenge from [Let\'s Encrypt](https://letsencrypt.org).

With this configuration, Tyk Gateway can serve HTTPS requests via port 443, with a TLS certificate provisioned by cert-manager. An API is created by Tyk Operator to serve the ingress traffic at https://myingress.do.poc.tyk.technology/httpbin, and forwards the request to http://httpbin.default.svc:8000 within the cluster.

</details>

##### ApiDefinition Template

<details>
  <summary>Click to expand</summary>

```yaml{hl_lines=["5-6"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
 name: myapideftemplate
 labels:
  template: "true" # Instructs Tyk Operator to skip reconciliation for this resource
spec:
 name: foo
 protocol: http
 use_keyless: true
 proxy:
  target_url: http://example.com
```

This example defines an `ApiDefinition` resource that can be used as configuration template for APIs created for Ingresses. It has a label `template: "true"` which let Tyk Operator knows that it is not a real resource, and hence does not require reconciliation. This will allow the ApiDefinition to be stored inside Kubernetes as a resource, but will not reconcile the ApiDefinition inside Tyk. All mandatory fields inside the ApiDefinition spec are still mandatory, but can be replaced with placeholders as they will be overwritten by the Ingress reconciler.

```yaml{hl_lines=["7-8"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    tyk.io/template: myapideftemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: ApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
...
```

To make use of the ApiDefinition template, make sure to add annotations `tyk.io/template` and `tyk.io/template-kind` to your Ingress resource. Here, we specify that the template to be used is named "myapideftemplate", and the resource represents a Tyk Classic API "ApiDefinition".

</details>

##### TykOasApiDefinition Template

<details>
  <summary>Click to expand</summary>

```yaml{hl_lines=["39-40"],linenos=true}
apiVersion: v1
data:
  test_oas.json: |-
    {
        "info": {
          "title": "OAS Template",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "OAS Template",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "http://example"
          },
          "server": {
            "listenPath": {
              "value": "/example/",
              "strip": true
            }
          }
        }
      }
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: oasapitemplate
  labels:
    tyk.io/ingress-template: "true"
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

Here provides a minimum template as `TykOasApiDefinition`. The `TykOasApiDefinition` must have a label `tyk.io/ingress-template: "true"` so that Tyk Operator will not reconcile it with Tyk.

```yaml{hl_lines=["7-8"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    tyk.io/template: oasapitemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: TykOasApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
...
```

To make use of the TykOasApiDefinition template, make sure to add annotations `tyk.io/template` and `tyk.io/template-kind` to your Ingress resource. Here, we specify that the template to be used is named "oasapitemplate", and the resource represents a Tyk OAS API "TykOasApiDefinition".

</details>

#### Ingress Class

The value of the `kubernetes.io/ingress.class` annotation identifies the IngressClass that will process Ingress objects.

Tyk Operator by default looks for the value `tyk` and will ignore all other ingress classes. If you wish to override this default behavior,
 you may do so by setting the environment variable `WATCH_INGRESS_CLASS` in the operator manager deployment. [See Installing Tyk Operator]({{< ref "#install-and-configure-tyk-operator" >}}) for further information.

#### API name

Tyk Ingress Controller will create APIs in Tyk for each path defined for a specific rule in Ingress resource. Each API created inside Tyk will follow a special naming convention as follows:

```
<ingress_namespace>-<ingress_name>-<hash(Host + Path)>
```

For example, the following ingress resource will create an ApiDefinition called `default-httpbin-ingress-78acd160d` inside Tyk's Gateway.
ApiDefinition's name comes from:

- `default`: The namespace of this Ingress resource,
- `httpbin-ingress`: The name of this Ingress resource,
- `78acd160d`: Short hash (first 9 characters) of Host (`""`) and Path (`/httpbin`). The hash algorithm is SHA256.

```yaml{hl_lines=["4-4"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
 name: httpbin-ingress
 annotations:
  kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
  tyk.io/template: myapideftemplate # <---------------- REFERENCE TO APIDEFINITION IN SAME NAMESPACE
spec:
 rules:
  - http:
     paths:
      - path: /httpbin
        pathType: Prefix
        backend:
         service:
          name: httpbin
          port:
           number: 8000
```

#### Ingress Path Types

Each path in an Ingress must have its own particular path type. Kubernetes offers three types of path types: `ImplementationSpecific`, `Exact`, and `Prefix`. Currently, not all path types are supported. The below table shows the unsupported path types for [Sample HTTP Ingress Resource]({{< ref "#set-up-manifest-for-http" >}}) based on the examples in the [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/#examples).

| Kind   | Path(s)   | Request path(s) | Expected to match?               | Works as Expected                       |
|--------|-----------|-----------------|----------------------------------|-----------------------------------------|
| Exact  | /foo      | /foo/           | No                               | No.                                     |
| Prefix | /foo/     | /foo, /foo/     | Yes                              | No, /foo/ matches, /foo does not match. |
| Prefix | /aaa/bb   | /aaa/bbb        | No                               | No, the request forwarded to service.   |
| Prefix | /aaa/bbb/ | /aaa/bbb        | Yes, ignores trailing slash      | No, /aaa/bbb does not match.            |
| Prefix | /aaa/bbb  | /aaa/bbbxyz     | No, does not match string prefix | No, the request forwarded to service.   |

Please bear in mind that if `proxy.strip_listen_path` is set to true on API Definition, Tyk strips the listen-path (for example, the listen-path for the Ingress under [Sample HTTP Ingress Resource]({{< ref "#set-up-manifest-for-http" >}}) is /httpbin) with an empty string.

The following table shows an example of path matching if the listen-path is set to `/httpbin` or `/httpbin/`.

| Kind                   | Path(s)   | Request path(s)           | Matches?                                              |
|------------------------|-----------|---------------------------|-------------------------------------------------------|
| Exact                  | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    |
| Prefix                 | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    | 
| ImplementationSpecific | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    |
| Exact                  | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. |
| Prefix                 | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. | 
| ImplementationSpecific | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. |
| Exact                  | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. |
| Prefix                 | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. | 
| ImplementationSpecific | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. |
| Exact                  | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           |
| Prefix                 | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           |  
| ImplementationSpecific | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           | 

### Multi-Organization Management With Tyk Operator

If you want to set up multi-tenant API management with Tyk, follow these steps to define an OperatorContext for connecting and authenticating with a Tyk Dashboard and reference it in your API definitions for specific configurations.

#### Defining OperatorContext

An [OperatorContext]({{< ref "#multi-tenancy-in-tyk" >}}) specifies the parameters for connecting and authenticating with a Tyk Dashboard. Below is an example of how to define an `OperatorContext`:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
  namespace: default
spec:
  env:
    # The mode of the admin api
    # ce - community edition (open source gateway)
    # pro - dashboard (requires a license)
    mode: pro
    # Org ID to use
    org: *YOUR_ORGANIZATION_ID*
    # The authorization token this will be set in x-tyk-authorization header on the
    # client while talking to the admin api
    auth: *YOUR_API_ACCESS_KEY*
    # The url to the Tyk Dashboard API
    url: http://dashboard.tyk.svc.cluster.local:3000
    # Set this to true if you want to skip tls certificate and host name verification
    # this should only be used in testing
    insecureSkipVerify: true
    # For ingress the operator creates and manages ApiDefinition resources, use this to configure
    # which ports the ApiDefinition resources managed by the ingress controller binds to.
    # Use this to override default ingress http and https port
    ingress:
      httpPort: 8000
      httpsPort: 8443
```

For better security, you can also replace sensitive data with values contained within a referenced secret with `.spec.secretRef`.

In this example, API access key `auth` and organization ID `org` are not specified in the manifest. They are provided through a Kubernetes secret named `tyk-operator-conf` in `alpha` namespace. The secret contains keys `TYK_AUTH` and `TYK_ORG` which correspond to the `auth` and `org` fields respectively.

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
  namespace: default
spec:
  secretRef:
    name: tyk-operator-conf ## Secret containing keys TYK_AUTH and TYK_ORG
    namespace: alpha
  env:
    mode: pro
    url: http://tyk.tykce-control-plane.svc.cluster.local:8001
    insecureSkipVerify: true
    ingress:
      httpPort: 8000
      httpsPort: 8443
    user_owners:
    - a1b2c3d4f5e6f7
    user_group_owners:
    - 1a2b3c4d5f6e7f
```

You can provide the following fields through secret as referenced by `secretRef`. The table shows mappings between `.spec.env` properties and secret `.spec.data` keys. If a value is configured in both the secret and OperatorContext `spec.env` field, the value from secret will take precedence.

| Secret key | .spec.env |
|------------|-----------|
| TYK_MODE	 | mode |
| TYK_URL    | url |
| TYK_AUTH	 | auth |
| TYK_ORG	   | org |
| TYK_TLS_INSECURE_SKIP_VERIFY | insecureSkipVerify |
| TYK_USER_OWNERS (comma separated list) | user_owners |
| TYK_USER_GROUP_OWNERS (comma separated list) | user_group_owners |

#### Using contextRef in API Definitions

Once an `OperatorContext` is defined, you can reference it in your API Definition objects using `contextRef`. Below is an example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
  namespace: alpha
spec:
  contextRef:
    name: team-alpha
    namespace: default
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

In this example, the `ApiDefinition` object references the `team-alpha` context, ensuring that the configuration is applied within the `alpha` organization.

### Internal Looping With Tyk Operator

The concept of [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) allows you to use URL Rewriting to redirect your URL to *another API endpoint* or to *another API* in the Gateway. In Tyk, looping is generally targeted using the `tyk://<API_ID>/<path>` scheme, which requires prior knowledge of the `API_ID`. Tyk Operator simplifies the management and transformation of API traffic within Kubernetes environments by abstracting APIs as objects, managing them and dynamically assigning `API_ID`s by its Kubernetes metedata name and namespace.

#### Configuring looping to internal ApiDefinition resources

Looping can be configured within Tyk Operator for [URL Rewrites]({{< ref "#url-rewrites" >}}), [URL Rewrite Triggers]({{< ref "#url-rewrite-triggers" >}}) and [Proxy to internal APIs]({{< ref "#proxy-to-internal-apis" >}}) by configuring the `rewrite_to_internal` in `url_rewrite`, `rewrite_to_internal` in `triggers`, and `proxy.target_internal` fields respectively with these properties:

- **Path**: The `path` property specifies the endpoint on the target API where the request should be directed. This is the portion of the URL that follows the domain and is crucial for ensuring that the request reaches the correct resource. For example, setting a value of `"/myendpoint"` means that the request will be forwarded to the `/myendpoint` path on the target API.

- **Query**: The `query` property allows you to append additional query parameters to the target URL. These parameters can be used to modify the behavior of the target API or to pass along specific request information. For instance, setting `query: "check_limits=true"` will include this query string in the redirected request, potentially triggering special handling by the target API.

- **Target**: The `target` property identifies the API resource to which the request should be routed. It consists of two components: `name` and `namespace`. The `name` is the identifier of the target API, while the `namespace` specifies the Kubernetes namespace where the API resource resides. Together, these elements ensure that Tyk Operator accurately locates and routes the request to the intended API. For example, `name: "proxy-api"` and `namespace: "default"` direct the request to the `proxy-api` resource in the `default` namespace.

Tyk Operator would dynamically update the API definition by generating internal looping URL in the form of `tyk://<API_ID>/<path>`. This mechanism is essential for routing traffic within a microservices architecture or when managing APIs across different namespaces in Kubernetes. Using this object you can effectively manage and optimize API traffic within your Tyk Gateway.

---

#### URL Rewrites 

[URL rewriting]({{< ref "transform-traffic/url-rewriting" >}}) in Tyk enables the alteration of incoming API request paths to align with the expected endpoint format of your backend services.

Assume that we wish to redirect incoming `GET /basic/` requests to an API defined by an ApiDefinition object named `proxy-api` in the `default` namespace. We want the `/basic/` prefix to be stripped from the request path and the redirected path should be of the format `/proxy/$1`, where the context variable `$1` is substituted with the remainder of the path request. For example `GET /basic/456` should become `GET /proxy/456`.

In this case we can use a `rewrite_to_internal` object to instruct Tyk Operator to automatically generate the API rewrite URL on our behalf for the API identified by name `proxy-api` in the `default` namespace:

```yaml
url_rewrites:
  - path: "/{id}"
    match_pattern: "/basic/(.*)"
    method: GET
    rewrite_to_internal:
      target:
        name: proxy-api
        namespace: default
      path: proxy/$1
```

In the above example an incoming request of `/basic/456` would be matched by the `match_pattern` rule `/basic/(.*)` for `GET` requests specified in the `method` field. The `456` part of the URL will be captured and replaces `{id}` in the `path` field. Tyk Operator will use the `rewrite_to_internal` configuration to generate the URL rewrite for the API named `proxy-api` in the `default` namespace, and update the `rewrite_to` field accordingly:

```yaml
url_rewrites:
- match_pattern: /basic/(.*)
  method: GET
  path: /{id}
  rewrite_to: tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1
```

Here we can see that the `rewrite_to` field has been generated with the value `tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1` where `ZGVmYXVsdC9wcm94eS1hcGk` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice also that path `proxy/$1` is appended to the base URL `tyk://ZGVmYXVsdC9wcm94eS1hcGk` and contains the context variable `$1`. This will be substituted with the value of `{id}` in the `path` configuration parameter.

#### URL Rewrite Triggers 

[Triggers]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-triggers" >}}) are configurations that specify actions based on certain conditions present in HTTP headers, query parameters, path parameters etc.

Triggers are essential for executing specific actions when particular criteria are met, such as rewriting URLs. They are useful for automating actions based on real-time data received in requests. For example, you might use triggers to:

- Redirect users to different APIs in the Gateway based on their authentication status.
- Enforce business rules by redirecting requests to different APIs in the Gateway based on certain parameters.

The process for configuring internal looping in triggers to is similar to that explained in section [URL Rewrites]({{< ref "#url-rewrites" >}}).

Assume that we wish to instruct Tyk Operator to redirect all *Basic Authentication* requests to the API identified by `basic-auth-internal` within the `default` namespace. Subsequently, we can use a `rewrite_to_internal` object as follows:

```yaml
triggers:
  - "on": "all"
    options:
      header_matches:
        "Authorization":
          match_rx: "^Basic"
    rewrite_to_internal:
      target:
        name: basic-auth-internal
        namespace: default
      path: "basic/$2"
```

Here we we can see that a trigger is configured for all requests that include an `Authorization` header containing `Basic` in the header value.

A `rewrite_to_internal` configuration object is used to instruct Tyk Operator to generate a redirect to the API identified by the `basic-auth-internal` API resource in the `default` namespace. The redirect path will be prefixed with `basic`. For example, a basic authentication request to path `/` will be redirected to `/basic/`.

Tyk Operator will automatically generate a URL Rewrite (`rewrite_to`) to redirect the request to the API identified by `basic-auth-internal` within the `default` namespace as follows:

```yaml
triggers:
- "on": all
  options:
    header_matches:
      Authorization:
        match_rx: ^Basic
  rewrite_to: tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/basic/$2
```

Here we can see that the `rewrite_to` field has been generated with the value `tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/proxy/$1` where `ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice also that path `basic/$2` is appended to the base URL `tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs` and contains the context variable `$2`. This will be substituted with the remainder of the request path.

#### Proxy to Internal APIs 

Internal looping can also be used for [proxying to internal APIs]({{< ref "advanced-configuration/transform-traffic/looping" >}}).

Assume that we wish to redirect all incoming requests on listen path `/users` to an API defined by an ApiDefinition object named `users-internal-api` in the `default` namespace.

In this case we can use a `proxy.target_internal` field to instruct Tyk Operator to automatically generate the target URL on our behalf for the API identified by name `users-internal-api` in the `default` namespace:

```yaml {linenos=true, linenostart=1, hl_lines=["12-15"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: users
spec:
  name: Users API
  protocol: http
  active: true
  use_keyless: true
  proxy:
    target_url: ""
    target_internal:
      target:
        name: users-internal-api
        namespace: default
    listen_path: /users
    strip_listen_path: true
```

The proxy object’s `target_internal` field references other API resources. This field shares the same properties as those described for `rewrite_to_internal`, ensuring consistent configuration.

Tyk Operator will automatically generate the target URL to redirect the request to the API identified by `users-internal-api` within the `default` namespace as follows:

```yaml
  target_url: "tyk://ZGVmYXVsdC91c2Vycy1pbnRlcm5hbC1hcGk"
```

---

#### Example

Assume a business has legacy customers who authenticate with a service using *Basic Authentication*. The business also wants to support API Keys, enabling both client types to access the same ingress.

To facilitate this, Tyk must be configured for dynamic authentication, accommodating both *Basic Authentication* and *Auth Token* methods.

This setup requires configuring four API Definitions within Tyk:

1. Entry Point API
2. BasicAuth Internal API
3. AuthToken Internal API
4. Proxy Internal API

When a request arrives at the ingress route, a URL rewrite can direct it to either the *BasicAuth Internal* or *AuthToken Internal* API, depending on the authentication method used.

These internal APIs will authenticate the requests. Assuming successful authentication (the happy path), they will forward the requests to the *Proxy Internal API*, which handles the proxying to the underlying service.

</br>

{{< note success >}}
**Note**

There are no actual HTTP redirects in this scenario, meaning that there is no performance penalty in performing any of these *Internal Redirects*.

{{< /note >}}

##### Entry Point API

The *Entry Point* API is the first point of entry for a client request. It inspects the header to determine if the incoming client request requires authentication using *Basic Authentication* or *Auth Token*. Consequently, it then redirects the request to the *BasicAuth Internal* or *AuthToken Internal* API depending upon the header included in the client request.

The API definition resource for the *Entry Point* API is listed below. It is configured to listen for requests on the `/entry` path and forward requests upstream to `http://example.com`

We can see that there is a URL Rewrite rule (`url_rewrites`) with two triggers configured to match Basic Authentication and Auth Token requests:

- **Basic Authentication trigger**: Activated for incoming client requests that include an *Authorization* header containing a value starting with *Basic*. In this case a `rewrite_to_internal` configuration object is used to instruct Tyk Operator to redirect the request to the *BasicAuthInternal* API, identified by name `basic-auth-internal` in the `default` namespace. The request URL is rewritten, modifying the path to `/basic/<path>`.
- **Auth Token trigger**: Activated for incoming client requests that include an *Authorization* header containing a value starting with *Bearer*. In this case a `rewrite_to_internal` configuration object is used to instruct Tyk Operator to redirect the request to the *AuthTokenInternal* API, identified by name `auth-token-internal` in the `default` namespace. The request URL is rewritten, modifying the path to `/token/<path>`.

 ```yaml {linenos=true, linenostart=1, hl_lines=["21-45"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: entrypoint-api
spec:
  name: Entrypoint API
  protocol: http
  active: true
  proxy:
    listen_path: /entry
    target_url: http://example.com
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/(.*)/(.*)"
              method: GET
              triggers:
                - "on": "all"
                  options:
                    header_matches:
                      "Authorization":
                        match_rx: "^Basic"
                  rewrite_to_internal:
                    target:
                      name: basic-auth-internal
                      namespace: default
                    path: "basic/$2"
                - "on": "all"
                  options:
                    header_matches:
                      "Authorization":
                        match_rx: "^Bearer"
                  rewrite_to_internal:
                    target:
                      name: auth-token-internal
                      namespace: default
                    path: "token/$2"
```

##### BasicAuth Internal API

The *BasicAuth Internal* API listens to requests on path `/basic` and forwards them upstream to `http://example.com`.

The API is configured with a URL rewrite rule in `url_rewrites` to redirect incoming `GET /basic/` requests to the API in the Gateway represented by name `proxy-api` in the `default` namespace. The `/basic/` prefix will be stripped from the request URL and the URL will be rewritten with the format `/proxy/$1`. The context variable `$1` is substituted with the remainder of the path request. For example `GET /basic/456` will become `GET /proxy/456`.

Furthermore, a header transform rule is configured within `transform_headers` to add the header `x-transform-api` with value `basic-auth`, to the request.

```yaml {linenos=true, linenostart=1, hl_lines=["21-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: basic-auth-internal
spec:
  name: BasicAuth Internal API
  protocol: http
  proxy:
    listen_path: "/basic"
    target_url: http://example.com
  active: true
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/basic/(.*)"
              method: GET
              rewrite_to_internal:
                target:
                  name: proxy-api
                  namespace: default
                path: proxy/$1
          transform_headers:
            - add_headers:
                x-transform-api: "basic-auth"
              method: GET
              path: "/{id}"
              delete_headers: []
```

##### AuthToken Internal API

The *AuthToken Internal* API listens to requests on path `/token` and forwards them upstream to `http://example.com`.

The API is configured with a URL rewrite rule in `url_rewrites` to redirect incoming `GET /token/` requests to the API in the Gateway represented by name `proxy-api` in the `default` namespace. The `/token/` prefix will be stripped from the request URL and the URL will be rewritten to the format `/proxy/$1`. The context variable `$1` is substituted with the remainder of the path request. For example `GET /token/456` will become `GET /proxy/456`.

Furthermore, a header transform rule is configured within `transform_headers` to add the header `x-transform-api` with value `token-auth`, to the request.

```yaml {linenos=true, linenostart=1, hl_lines=["21-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: auth-token-internal
spec:
  name: AuthToken Internal API
  protocol: http
  proxy:
    listen_path: "/token"
    target_url: http://example.com
  active: true
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/token/(.*)"
              method: GET
              rewrite_to_internal:
                target:
                  name: proxy-api
                  namespace: default
                path: proxy/$1
          transform_headers:
            - add_headers:
                x-transform-api: "token-auth"
              method: GET
              path: "/{id}"
              delete_headers: []
```

##### Proxy Internal API

The *Proxy Internal* API is keyless and responsible for listening to requests on path `/proxy` and forwarding upstream to `http://httpbin.org`. The listen path is stripped from the request before it is sent upstream.

This API receives requests forwarded from the internal *AuthToken Internal* and *BasicAuth Internal APIs*. Requests will contain the header `x-transform-api` with value `token-auth` or `basic-auth`, depending upon which internal API the request originated from.

```yaml {linenos=true, linenostart=1, hl_lines=["10-13"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: proxy-api
spec:
  name: Proxy API
  protocol: http
  active: true
  internal: true
  proxy:
    listen_path: "/proxy"
    target_url: http://httpbin.org
    strip_listen_path: true
  use_keyless: true
```

### Manage API MetaData


#### API Name

##### Tyk OAS API and Tyk Streams API

API name can be set through `x-tyk-api-gateway.info.name` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

To set the name of an API in the `ApiDefinition`, use the `spec.name` string field. This name is displayed on the Tyk Dashboard and should concisely describe what the API represents.

Example:

```yaml {linenos=true, linenostart=1, hl_lines=["6-6"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: example-api # This is the metadata name of the Kubernetes resource
spec:
  name: Example API # This is the "API NAME" in Tyk
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://example.com
    listen_path: /example
    strip_listen_path: true
```

#### API Status

##### API Active Status

An active API will be loaded to the Gateway, while an inactive API will not, resulting in a 404 response when called.

##### Tyk OAS API and Tyk Streams API

API active state can be set through `x-tyk-api-gateway.info.state.active` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

The active status of an API can be set by modifying the `spec.active` configuration parameter. When set to `true`, this enables the API so that Tyk will listen for and process requests made to the `listenPath`. 

```yaml {linenos=true, linenostart=1, hl_lines=["9-9"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: inactive-api
spec:
  name: Inactive API
  use_keyless: true
  protocol: http
  active: false
  proxy:
    target_url: http://inactive.example.com
    listen_path: /inactive
    strip_listen_path: true
```

#### API Accessibility

An API can be configured as internal so that external requests are not processed. 

##### Tyk OAS API and Tyk Streams API

API accessibility can be set through `x-tyk-api-gateway.info.state.internal` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

API accessibility can be set through the `spec.internal` configuration parameter as shown in the example below.

```yaml {linenos=true, linenostart=1, hl_lines=["10-10"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: inactive-api
spec:
  name: Inactive API
  use_keyless: true
  protocol: http
  active: true
  internal: true
  proxy:
    target_url: http://inactive.example.com
    listen_path: /inactive
    strip_listen_path: true
```

#### API ID

##### Creating a new API

If you're creating a new API using Tyk Operator, you don't need to specify the ID. The API ID will be generated in a deterministic way.

##### Tyk OAS API and Tyk Streams API

The generated ID is stored in `status.id` field. Run the following command to inspect generated API ID of a Tyk OAS API.

```bash
% kubectl get tykoasapidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.id}'
ZGVmYXVsdC9wZXRzdG9yZQ
```

In this example, the generated API ID is `ZGVmYXVsdC9wZXRzdG9yZQ`.

##### Tyk Classic API

The generated ID is stored in `status.api_id` field. Run the following command to inspect generated API ID of a Tyk Classic API.

```bash
% kubectl get apidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.api_id}'
ZGVmYXVsdC90ZXN0
```

In this example, the generated API ID is `ZGVmYXVsdC90ZXN0`.

#### Updating an existing API

##### Tyk OAS API and Tyk Streams API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `x-tyk-api-gateway.info.id` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `spec.api_id` field. This way, when you apply the manifest, Tyk Operator will not create a new API in the Dashboard. Instead, it will update the original API with the Kubernetes spec.

Example

```yaml  {linenos=true, linenostart=1, hl_lines=["8-8"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: existing-api
  namespace: default
spec:
  name: Existing API
  api_id: 12345
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://existing.example.com
    listen_path: /existing
    strip_listen_path: true
```

In this example, the API with ID `12345` will be updated according to the provided spec instead of creating a new API.


#### API Categories
[API categories]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories">}}) are configured differently for Tyk OAS APIs and Tyk Classic APIs. Please see below for examples.

##### Tyk OAS API

API categories can be specified through `categories` field in `TykOasApiDefinition` CRD.

Here's an example:

```yaml  {linenos=true, linenostart=1, hl_lines=["7-9"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: oas-api-with-categories
  namespace: tyk
spec:
  categories:
  - category 1
  - category 2
  tykOAS:
    configmapRef:
      keyName: oas-api-definition.json
      name: tyk-oas-api-config
      namespace: tyk
```

##### Tyk Streams API

As of Tyk Operator v1.1, API categories is not supported in `TykStreamsApiDefinition` CRD.

##### Tyk Classic API

For a Tyk Classic API, you can specify the category name using the `name` field with a `#` qualifier. This will categorize the API in the Tyk Dashboard. See [How API categories work]({{<ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#tyk-classic-apis">}}) to learn about limitations on API names.

Example

```yaml  {linenos=true, linenostart=1, hl_lines=["6-6"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: categorized-api
spec:
  name: "my-classic-api #global #staging"
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://categorized.example.com
    listen_path: /categorized
    strip_listen_path: true
```

#### API Versioning
[API versioning]({{<ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning">}}) are configured differently for [Tyk OAS APIs]({{< ref "#tyk-oas-api" >}}) and [Tyk Classic APIs]({{< ref "#tyk-classic-api" >}}). Please see below for examples.

##### Configuring API Version in Tyk OAS API Definition

In the [Tyk OAS API Definition]({{<ref "getting-started/key-concepts/oas-versioning#configuring-api-versioning-in-the-tyk-oas-api-definition">}}), versioning can be configured via `x-tyk-api-gateway.versioning` object of the Base API, where the child API's IDs are specified. In the Kubernetes environment with Tyk Operator, where we reference API resources through its Kubernetes name and namespace, this is not desired. Therefore, we add support for versioning configurations through the field `versioning` in `TykOasApiDefinition` custom resource definition (CRD).

Here's an example:

```yaml{linenos=true, linenostart=1, hl_lines=["12-24"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: order-api
  namespace: default
spec:
  tykOAS:
    configmapRef:
      namespace: default
      name: order-api
      keyName: order-api-definition-v1.json
  versioning:
    enabled: true
    location: header
    key: x-api-version
    name: v1
    default: v1
    fallbackToDefault: true
    stripVersioningData: true
    versions:
      - name: v2
        tykOasApiDefinitionRef:
          name: order-api-v2
          namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: order-api-v2
  namespace: default
spec:
  tykOAS:
    configmapRef:
      namespace: default
      name: order-api-v2
      keyName: order-api-definition-v2.json
```

In this example, two different versions of an API are defined: `order-api` (v1) and `order-api-v2` (v2).

`versioning` is configured at `order-api` (v1), the Base API, and it has similiar structure as [Tyk OAS API Definition]({{<ref "getting-started/key-concepts/oas-versioning#configuring-api-versioning-in-the-tyk-oas-api-definition">}}):

- `versioning`: This object configures API versioning for the `order-api`.
    - `enabled`: Set to true to enable versioning.
    - `name`: an identifier for this version of the API (v1).
    - `default`: Specifies the default version (v1), which will be used if no version is specified in the request.
    - `location`: Specifies where the version key is expected (in this case, in the header). It can be set to `header` or `url-param`.
    - `key`: Specifies the versioning identifier key (`x-api-version`) to identify the version. In this example, the version is determined by an HTTP header named `x-api-version`.
    - `fallbackToDefault`: When set to true, if an unspecified or invalid version is requested, the default version (v1) will be used.
    - `stripVersioningData`: When true, removes versioning identifier (like headers or query parameters) from the upstream request to avoid exposing internal versioning details.
    - `urlVersioningPattern`: Specifies a regex that matches the format that you use for the versioning identifier (name) if you are using stripVersioningData and fallBackToDefault with location=url with Tyk 5.5.0 or later
    - `versions`: Defines the list of API versions available:
        - `name`: an identifier for this version of the API (v2).
        - `tykOasApiDefinitionRef`: Refers to a separate TykOasApiDefinition resource that represent a new API version.
          - `name`: Kubernetes metadata name of the resource (`order-api-v2`).
          - `namespace`: Kubernetes metadata namespace of the resource (`default`).

With Tyk Operator, you can easily associate different versions of your APIs using their Kubernetes names. This eliminates the need to include versioning information directly within the base API's definition (`x-tyk-api-gateway.versioning` object), which typically requires referencing specific API IDs. Instead, the Operator allows you to manage versioning declaratively in the `TykOasApiDefinition` CRD, using the `versioning` field to specify versions and their Kubernetes references (names and namespaces).

When using the CRD for versioning configuration, you don't have to worry about knowing or managing the unique API IDs within Tyk. The Tyk Operator handles the actual API definition configuration behind the scenes, reducing the complexity of version management.

In case if there is original versioning information in the base API Definition, the versioning information will be kept and be merged with what is specified in CRD. If there are conflicts between the OAS API Definition and CRD, we will make use of CRD values as the final configuration. 

Tyk Operator would also protect you from accidentally deleting a version of an API that is being referenced by another API, maintaining your API integrity.

##### Configuring API Version in Tyk Streams API Definition

As of Tyk Operator v1.1, API versioning is not supported in `TykStreamsApiDefinition` CRD. This can be configured natively in the Tyk Streams API Definition.

##### Configuring API Version in Tyk Classic API Definition

For Tyk Classic API, versioning can be configured via `ApiDefinition` custom resource definition (CRD). See [Tyk Classic versioning]({{<ref "getting-started/key-concepts/versioning">}}) for a comprehensive example of configuring API versioning for Tyk Classic API with Tyk Operator.

#### API Ownership

Please consult the [API Ownership]({{<ref "/product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership">}}) documentation for the fundamental concepts of API Ownership in Tyk and [Operator Context]({{< ref "#multi-tenancy-in-tyk" >}}) documentation for an overview of the use of OperatorContext to manage resources for different teams effectively.

The guide includes practical examples for managing API ownership via OperatorContext. Key topics include defining user owners and user group owners in OperatorContext for connecting and authenticating with a Tyk Dashboard, and using `contextRef` in `TykOasApiDefinition` or `ApiDefinition` objects to ensure configurations are applied within specific organizations. The provided YAML examples illustrate how to set up these configurations.

##### How API Ownership works in Tyk Operator

In Tyk Dashboard, API Ownership ensures that only designated 'users' who own an API can modify it. This security model is crucial for maintaining control over API configurations, especially in a multi-tenant environment where multiple teams or departments may have different responsibilities and permissions.

Tyk Operator is designed to interact with Tyk Dashboard as a system user. For the Tyk Dashboard, Tyk Operator is just another user that must adhere to the same access controls and permissions as any other user. This means:

- Tyk Operator needs the correct access rights to modify any APIs.
- It must be capable of managing APIs according to the ownership rules set in Tyk Dashboard.

To facilitate API ownership and ensure secure operations, Tyk Operator must be able to 'impersonate' different users for API operations. This is where `OperatorContext` comes into play. Users can define different `OperatorContext` objects that act as different agents to connect to Tyk Dashboard. Each `OperatorContext` can specify different access parameters, including the user access key and organization it belongs to. Within `OperatorContext`, users can specify the IDs of owner users or owner user groups. All APIs managed through that `OperatorContext` will be owned by the specified users and user groups, ensuring compliance with Tyk Dashboard's API ownership model.

{{< img src="/img/operator/tyk-api-ownership.svg" alt="Enabling API ownership with OperatorContext" width="600" >}}

##### OperatorContext

Here's how `OperatorContext` allows Tyk Operator to manage APIs under different ownerships:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
  namespace: default
spec:
  env:
    # The mode of the admin api
    # ce - community edition (open source gateway)
    # pro - dashboard (requires a license)
    mode: pro
    # Org ID to use
    org: *YOUR_ORGANIZATION_ID*
    # The authorization token this will be set in x-tyk-authorization header on the
    # client while talking to the admin api
    auth: *YOUR_API_ACCESS_KEY*
    # The url to the Tyk Dashboard API
    url: http://dashboard.tyk.svc.cluster.local:3000
    # Set this to true if you want to skip tls certificate and host name verification
    # this should only be used in testing
    insecureSkipVerify: true
    # For ingress the operator creates and manages ApiDefinition resources, use this to configure
    # which ports the ApiDefinition resources managed by the ingress controller binds to.
    # Use this to override default ingress http and https port
    ingress:
      httpPort: 8000
      httpsPort: 8443
    # Optional - The list of users who are authorized to update/delete the API.
    # The user pointed by auth needs to be in this list, if not empty.
    user_owners:
    - a1b2c3d4e5f6
    # Optional - The list of groups of users who are authorized to update/delete the API.
    # The user pointed by auth needs to be a member of one of the groups in this list, if not empty.
    user_group_owners:
    - 1a2b3c4d5e6f
```

##### Tyk OAS API and Tyk Streams API

Once an `OperatorContext` is defined, you can reference it in your Tyk OAS or Tyk Streams API Definition objects using `contextRef`. Below is an example with TykOasApiDefinition:

```yaml {hl_lines=["40-43"],linenos=true}
apiVersion: v1
data:
  test_oas.json: |-
    {
        "info": {
          "title": "Petstore",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "Petstore",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "https://petstore.swagger.io/v2"
          },
          "server": {
            "listenPath": {
              "value": "/petstore/",
              "strip": true
            }
          }
        }
      }
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  contextRef:
    name: team-alpha
    namespace: default
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

In this example, the `TykOasApiDefinition` object references the `team-alpha` context, ensuring that it is managed under the ownership of the specified users and user groups.

##### Tyk Classic API

Similarly, if you are using Tyk Classic API, you can reference it in your API Definition objects using `contextRef`. Below is an example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
  namespace: alpha
spec:
  contextRef:
    name: team-alpha
    namespace: default
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

In this example, the `ApiDefinition` object references the `team-alpha` context, ensuring that it is managed under the ownership of the specified users and user groups.



## Synchronize Tyk Environment With GitHub Repository

Tyk Sync enables you to export and import Tyk configurations directly from Git, keeping environments aligned without manual configuration updates. This section covers the setup and use of Tyk Sync, providing steps to ensure consistent configurations across different environments.


### Tyk Sync Features
Tyk Sync works with *Tyk Dashboard* installation. With Tyk Dashboard, Tyk Sync supports managing API definitions, security policies, and API templates.

| Tyk Sync Feature                                                           | Tyk Dashboard (Licensed) |
| ---------------------------------------------------------------------------|--------------------------|
| <h4>Backup objects from Tyk to a directory</h4>If you want to backup your API definitions, policies and templates in Tyk, you can use the `dump` command. It allows you to save the objects in transportable files. You can use this command to backup important API configurations before upgrading Tyk, or to save API configurations from one Dashboard instance and then use `update`, `publish`, or `sync` commands to update the API configurations to another Dashboard instance. | ✅ |
| <h4>Synchronise objects from Git (or any VCS) to Tyk</h4>To implement GitOps for API management, store your API definitions, policies and templates in Git or any version control system. Use the `sync` command to synchronise those objects to Tyk. During this operation, Tyk Sync will delete any objects in the Dashboard that cannot be found in the VCS, and update those that can be found and create those that are missing. | ✅ |
| <h4>Update objects</h4>The `update` command will read from VCS or file system and will attempt to identify matching API definitions, policies and templates in the target Dashboard, and update them. Unmatched objects will not be created. | ✅ |
| <h4>Publish objects</h4>The `publish` command will read from VCS or file system and create API definitions, policies, and templates in target Dashboard. This will not update any existing objects. If it detects a collision, the command will stop. | ✅ |
| <h4>Show and import Tyk examples</h4>The `examples` command allow you to show and import [Tyk examples](https://github.com/TykTechnologies/tyk-examples). An easy way to load up your Tyk installation with some interesting examples!| ✅ |

**Working with OAS APIs**

Starting with Sync v1.5+ and Dashboard v5.3.2+, Tyk Sync supports both [Tyk OAS APIs]({{<ref "getting-started/key-concepts/high-level-concepts">}}) and [Tyk Classic APIs]({{<ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types">}}) when working with the Tyk Dashboard, without requiring special flags or configurations.

For Sync versions v1.4.1 to v1.4.3, enabling Tyk Sync for Tyk OAS APIs requires the [allow-unsafe-oas]({{<ref "tyk-dashboard/configuration#allow_unsafe_oas">}}) configuration in the Dashboard, along with the `--allow-unsafe-oas` flag when invoking Tyk Sync. Note that Tyk Sync versions v1.4.1 to 1.4.3 do not support API Category for Tyk OAS APIs.

**Working with Tyk Streams APIs**

Tyk Streams API support was introduced in Tyk Dashboard v5.7.0. Tyk Sync v2.0 and later is compatible with Tyk Streams APIs and manages them similarly to Tyk OAS APIs. With Tyk Sync, you can seamlessly sync, publish, update, and dump Tyk Streams APIs just like OAS APIs.

Note: The Streams API validator is not applied during these operations.

**Working with Open Source Gateway**

From Sync v2.0, compatibility with the Open Source Tyk Gateway has been removed, making Tyk Sync v2.0 compatible exclusively with licensed Tyk Dashboard. As a result, Tyk Sync is no longer usable with the Open Source (OSS) version of the Tyk Gateway.


### Set up Tyk Sync
#### Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

#### Docker

To install Tyk Sync using Docker, follow these steps:

##### Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v1.5.0, use the following command:

```bash
SYNC_VERSION=v1.5.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All docker images are available on the [Tyk Sync Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags) page.

##### Run Tyk Sync

```bash
SYNC_VERSION=v1.5.0
docker run tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```

If you want to dump your API configurations to the local file system or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```bash
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```
Replace [command] with the specific Tyk Sync command you want to execute.


#### Specify target Tyk installation

##### Tyk Dashboard
For Dashboard users, you can provide the necessary connection details using the `--dashboard` and `--secret` options.

```bash
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to the API access key use to access your Dashboard API. For dashboard users, you can get it from the “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

##### Open Source Gateway
For open source Gateway users, you can provide the necessary connection details using the `--gateway` and `--secret` options.

```bash
tyk-sync --gateway <GATEWAY_URL> --secret <SECRET> [command] [flags]
```

GATEWAY_URL is the fully qualified gateway target URL (e.g. `http://localhost:8080`) and SECRET refers to the API secret (`secret` parameter in your tyk.conf file) used to access your Gateway API.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_GW_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_GW_SECRET=<SECRET>
tyk-sync --gateway <GATEWAY_URL> [command] [flags]
```

2. Export configurations from your development environment:

```bash
tyk-sync dump -d http://localhost:3000 -s <dashboard-secret> -t dev-backup
```

This command exports all configurations from your development Tyk Dashboard to a local directory named `dev-backup`.

3. Import configurations to your staging environment:

```bash
tyk-sync publish -d http://staging-dashboard:3000 -s <staging-secret> -p dev-backup
```

This command imports the configurations from the `dev-backup` directory to your staging Tyk Dashboard.

#### Specify Source API Configurations
For the `sync`, `update`, and `publish` commands, you need to specify where Tyk Sync can get the source API configurations to update the target Tyk installation. You can store the source files either in a Git repository or the local file system.

##### Working with Git
For any Tyk Sync command that requires Git repository access, specify the Git repository as the first argument after the command. By default, Tyk Sync reads from the `master` branch. To specify a different branch, use the `--branch` or `-b` flag. If the Git repository requires connection using Secure Shell Protocol (SSH), you can specify SSH keys with `--key` or `-k` flag.

```bash
tyk-sync [command] https://github.com/your-repo --branch develop
```

##### Working with the local file system
To update API configurations from the local file system, use the `--path` or `-p` flag to specify the source directory for your API configuration files.

```bash
tyk-sync [command] --path /path/to/local/directory
```

##### Index File Requirement
A `.tyk.json` index file is required at the root of the source Git repository or the specified path. This `.tyk.json` file lists all the files that should be processed by Tyk Sync.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    {
      "file": "api1/api1.json"
    },
    {
      "file": "api2/api2.json"
    },
    {
      "file": "api3.json"
    }
  ],
  "policies": [
    {
      "file": "policy1.json"
    }
  ],
  "assets": [
    {
      "file": "template1.json"
    }
  ]
}
```


### Automate API Configuration Management with Tyk Sync
By integrating GitHub Actions, teams can schedule backups to cloud storage, sync configurations from a Git repository, and update local API definitions directly to the Tyk Dashboard. These workflows ensure configurations are securely maintained, aligned across environments, and easily managed within the API lifecycle.


#### Backup API Configurations with Github Actions
API platform teams can automate configuration backups using GitHub Actions. By setting up a scheduled GitHub Action, API configurations can be periodically exported and stored in cloud storage, like AWS S3. This approach ensures backups remain up-to-date, offering a reliable way to safeguard data and simplify restoration if needed.


##### Create a GitHub Action workflow

1. In your repository, create a new file `.github/workflows/tyk-backup.yml`.
2. Add the following content to the `tyk-backup.yml` file:

```yaml
name: Tyk Backup

on:
  schedule:
    - cron: '0 0 * * *'  # Runs every day at midnight

jobs:
  backup:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Create Backup Directory
      run: |
        BACKUP_DIR="backup/$(date +%Y-%m-%d)"
        mkdir -p $BACKUP_DIR
        echo "BACKUP_DIR=$BACKUP_DIR" >> $GITHUB_ENV

    - name: Set Permissions for Backup Directory
      run: |
        sudo chown -R 1001:1001 ${{ github.workspace }}/backup

    - name: Dump API Configurations
      run: |
        docker run --user 1001:1001 -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} dump --target /app/data/${{ env.BACKUP_DIR }} --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}

    - name: Upload to S3
      uses: jakejarvis/s3-sync-action@v0.5.1
      with:
        args: --acl private --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'  # Change to your region
        SOURCE_DIR: ${{ env.BACKUP_DIR }}
```

##### Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use.
4. Add the following secrets:
   - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
   - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.
   - `AWS_S3_BUCKET`: The name of your AWS S3 bucket.
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

##### Commit and push changes

Commit the `tyk-backup.yml` file and push it to the main branch of your repository.

##### Verify backups

The GitHub Action will run every day at midnight, dumping API configurations into a backup directory and uploading them to your specified S3 bucket.


#### Synchronize API configurations with GitHub Actions
API platform teams can use GitHub Actions to sync API configurations, policies, and templates from a Git repository to Tyk. Triggered by repository changes, the action generates a .tyk.json file and applies updates with the sync command, keeping the Tyk setup aligned with the repository.

##### Setup GitHub repository
Organize your repository with the following structure:

- `/apis/` for API definition files.
- `/policies/` for security policy files.
- `/assets/` for API template files.

##### Create a GitHub Action workflow

1. In your repository, create a new file `.github/workflows/tyk-sync.yml`.
2. Add the following content to the `tyk-sync.yml` file:

```yaml
name: Tyk Sync

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Create .tyk.json
      run: |
        echo '{' > .tyk.json
        echo '  "type": "apidef",' >> .tyk.json
        echo '  "files": [' >> .tyk.json
        find . -type f -name '*.json' -path './apis/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ],' >> .tyk.json
        echo '  "policies": [' >> .tyk.json
        find . -type f -name '*.json' -path './policies/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ],' >> .tyk.json
        echo '  "assets": [' >> .tyk.json
        find . -type f -name '*.json' -path './assets/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ]' >> .tyk.json
        echo '}' >> .tyk.json
        cat .tyk.json

    - name: Sync with Tyk
      run: |
        docker run tykio/tyk-sync:${TYK_SYNC_VERSION} version
        docker run -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} sync --path /app/data --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}
```

##### Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v2.0.0).
4. Add the following secrets:
    - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
    - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

##### Commit and push changes

Commit the `tyk-sync.yml` file and push it to the main branch of your repository.

##### Verify synchronisation

Each time there is a change in the repository, the GitHub Action will be triggered. It will create the `.tyk.json` file including all JSON files in the repository and use the `sync` command to update the Tyk installation.


#### Update API Definitions locally
For API developers managing definitions locally, Tyk Sync's publish or update commands can upload local API definitions directly to the Tyk Dashboard, streamlining updates and keeping definitions in sync during development. Follow these steps to update your API definitions locally.

##### Prepare your API Definition

Create your API definition file and save it locally. For example, save it as *api1.json* in a directory structure of your choice.

##### Create a .tyk.json index file

In the root directory of your API definitions, create a `.tyk.json` file to list all API definition files that Tyk Sync should process.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    { 
        "file": "api1.json" 
    }
  ]
}
```

##### Install Tyk Sync via Docker

If you haven't installed Tyk Sync, you can do so via Docker:

```bash
docker pull tykio/tyk-sync:v2.0.0
```

##### Publish API Definitions to Tyk

Use the `publish` command to upload your local API definitions to Tyk. Use Docker bind mounts to access your local files.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 publish \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

##### Update API Definitions to Tyk

Similarly, to update existing API definitions, use the update command.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 update \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

##### Verify the update

Log in to your Tyk Dashboard to verify that the API definitions have been published or updated successfully.


### Tyk Sync Commands

#### Dump Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync dump`                                                                                       |
| **Usage**     | ```tyk-sync dump -d DASHBOARD_URL [-s SECRET] [-t PATH]```                                                 |
| **Flags**     | `-d, --dashboard DASHBOARD_URL`: Tyk Dashboard URL (required)<br>                                    `-h, --help`: Help for the dump command<br>                                   `-t, --target PATH`: Target directory for output files (optional)<br>                                    `-s, --secret SECRET`: API secret for Dashboard access (optional)<br>                                    `--apis IDS`: Specific API IDs to dump<br>                                    `--oas-apis IDS`: Specific OAS API IDs to dump<br>                                    `--policies IDS`: Specific policy IDs to dump<br>                                    `--templates IDS`: Specific template IDs to dump |
| **Example**   | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret ```|
| **Example** | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret --target /path/to/backup --apis c2ltcGxlLWdyYXBoLWRldi90eWthcGktc2NoZW1h,baa5d2b65f1b45385dac3aeb658fa04c ``` |

#### Examples Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync examples`                                                                                   |
| **Usage**     | ```tyk-sync examples [flags]```<br>```tyk-sync examples [command]```                                           |
| **Subcommands**| `publish`: Publish a specific example<br> `show`: Show details of a specific example              |
| **Flags**     | `-h, --help`: Help for examples command                                                             |
| **Example**   | ```tyk-sync examples ```                                                                         |

#### Examples Show Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples show```                                                                              |
| **Usage**     | ```tyk-sync examples show [flags]```                                                                      |
| **Flags**     | `-h, --help`: Help for show command<br> `-l, --location string`: Location of the example           |
| **Example**   | ```tyk-sync examples show --location="udg/vat-checker" ```                                       |

#### Examples Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples publish```                                                                           |
| **Usage**     | ```tyk-sync examples publish [flags]```                                                                   |
| **Flags**     | `-b, --branch string`: Branch to use (default "refs/heads/main")<br> `-d, --dashboard string`: Dashboard target URL<br> `-g, --gateway string`: Gateway target URL<br> `-h, --help`: Help for publish command<br> `-k, --key string`: Key file location for auth<br> `-l, --location string`: Location of the example<br> `-s, --secret string`: API secret<br> `--test`: Use test publisher, output to stdio |
| **Example**   | ```tyk-sync examples publish -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -l="udg/vat-checker" ``` |

#### Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync publish```                                                                                    |
| **Usage**     | ```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     |  `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for publish command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to publish<br> `--oas-apis IDS`: Specific OAS API IDs to publish<br> `--policies IDS`: Specific policy IDs to publish<br> `--templates IDS`: Specific template IDs to publish |
| **Example**   | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23 ```|
| **Example** | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

#### Sync Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync sync`                                                                                       |
| **Usage**     | ```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for sync command<br> `-k, --key SSHKEY`: SSH key file location<br> `-o, --org ORG_ID`: Override organization ID<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to sync (to be deprecated)<br> `--policies IDS`: Specific policy IDs to sync (to be deprecated) |
| **Example**   | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo/your-apis ```|
| **Example** | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret -p /path/to/your/apis ``` |

#### Update Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync update`                                                                                     |
| **Usage**     | ```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for update command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to update<br> `--oas-apis IDS`: Specific OAS API IDs to update<br> `--policies IDS`: Specific policy IDs to update<br> `--templates IDS`: Specific template IDs to update |
| **Example**   | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23```|
| **Example** | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

## Troubleshooting and FAQ

### What Features Are Supported By Tyk Operator?

#### APIDefinition CRD
Tyk stores API configurations as JSON objects called API Definitions. If you are using Tyk Dashboard to manage Tyk, then these are stored in either Postgres or MongoDB, as specified in the database settings. On the other hand, if you are using Tyk OSS, these configurations are stored as files in the /apps directory of the Gateway which is located at the default path /opt/tyk-gateway.

An API Definition has many settings and middlewares that influence the way incoming requests are processed.

##### API Types
Tyk supports various API types, including HTTP, HTTPS, TCP, TLS, and GraphQL. It also includes Universal Data Graph versions for unified data access and federation, allowing seamless querying across multiple services.

| Type                           | Support | Supported From | Comments                     |
|--------------------------------|---------|----------------|------------------------------|
| HTTP                           | ✅      | v0.1           | Standard HTTP proxy for API requests. |
| HTTPS                          | ✅      | v0.4           | Secure HTTP proxy using SSL/TLS encryption. |
| TCP                            | ✅      | v0.1           | Handles raw TCP traffic, useful for non-HTTP APIs. |
| TLS                            | ✅      | v0.1           | Handles encrypted TLS traffic for secure communication. |
| GraphQL - Proxy                | ✅      | v0.1           | Proxy for GraphQL APIs, routing queries to the appropriate service. |
| Universal Data Graph v1        | ✅      | v0.1           | Supports Universal Data Graph v1 for unified data access. |
| Universal Data Graph v2        | ✅      | v0.12          | Supports the newer Universal Data Graph v2 for more advanced data handling. |
| GraphQL - Federation           | ✅      | v0.12          | Supports GraphQL Federation for querying multiple services as one API. |

##### Management of APIs
Tyk offers flexible API management features such as setting active/inactive status, categorizing and naming APIs, versioning, and defining ownership within teams or organizations for streamlined administration.

| Type                           | Support | Supported From | Comments                     |
|--------------------------------|---------|----------------|------------------------------|
| API Name                       | ✅      | v0.1           | Assign and manage names for your APIs. |
| API Status (inactive/active)   | ✅      | v0.2           | Toggle API status between active and inactive. |
| API Categories                 | ✅      | v0.1           | Categorize APIs for easier management. |
| API ID                         | ✅      | v0.1           | Assign unique IDs to APIs for tracking and management. |
| API Ownership                  | ✅      | v0.12          | Define ownership of APIs within teams or organizations. |
| API Versioning                 | ✅      | v0.1           | Enable version control for APIs. |

##### Traffic Routing
Tyk enables traffic routing through path-based or host-based proxies and allows redirection to specific target URLs, providing control over how requests are directed to backend services.

| Type                        | Supported | Supported From | Comments                     |
| --------------------------- | --------- | -------------- | ---------------------------- |
| Path-Based Proxy            | ✅        | v0.1           | Route traffic based on URL path. |
| Host-Based Proxy            | ✅        | v0.1           | Route traffic based on the request host. |
| Target URL                  | ✅        | v0.1           | Redirect traffic to a specific target URL. |

##### Client to Gateway Authentication and Authorization
Tyk provides multiple authentication options for client-to-gateway interactions, including keyless access, JWT, client mTLS, IP allow/block lists, and custom authentication plugins for enhanced security.

| Type                          | Supported | Supported From | Comments                                        |
| ----------------------------- | --------- | -------------- | ----------------------------------------------- |
| Keyless                       | ✅        | v0.1           | No authentication required, open access.        |
| Auth Token                    | ✅        | v0.1           | Requires an authentication token (Bearer token).|
| JWT                           | ✅️        | v0.5           | Uses JSON Web Tokens for secure authentication. |
| OpenID Connect                | ❌        | -              | Recommended to use JWT for OIDC authentication. |
| OAuth2                        | ❌        | -              | OAuth2 not supported, JWT is recommended.       |
| Client mTLS                   | ✅        | v0.11          | Supports static client mutual TLS authentication. |
| HMAC                          | ❌        | -              | HMAC authentication is not implemented.         |
| Basic Authentication          | ✅        | v0.12          | Only supports enabling with default metadata.   |
| Custom Authentication Plugin (Go)   | ✅        | v0.11          | Custom authentication plugin written in Go.     |
| Custom Authentication Plugin (gRPC) | ✅        | v0.1           | Custom authentication plugin using gRPC.        |
| Multiple Authentication       | ✅        | v0.14          | Chain multiple authentication methods.          |
| IP Allowlist                  | ✅        | v0.5           | Allows access only from specific IP addresses.  |
| IP Blocklist                  | ✅        | v0.5           | Blocks access from specific IP addresses.       |

##### Gateway to Upstream Authentication
Tyk supports secure upstream connections through mutual TLS, certificate pinning, and public key verification to ensure data integrity between the gateway and backend services.

| Type                                            | Supported | Supported From | Comments                     |
|-------------------------------------------------|-----------|----------------|------------------------------|
| Upstream Certificates mTLS                      | ✅        | v0.9           | Mutual TLS authentication for upstream connections. |
| Public Key Certificate Pinning                  | ✅        | v0.9           | Ensures that the upstream certificate matches a known key. |
| Upstream Request Signing                        | ❌        | -              | Upstream request signing is not implemented. |

##### API-level (Global) Features
Tyk offers global features for APIs, such as detailed traffic logging, CORS management, rate limiting, header transformations, and analytics plugins, with support for tagging, load balancing, and dynamic variables.

| Feature                              | Supported | Supported From | Comments                                                               |
|--------------------------------------|-----------|----------------|------------------------------------------------------------------------|
| Detailed recording (in Log Browser)  | ✅        | v0.4.0         | Records detailed API traffic logs for analysis. |
| Config Data                          | ✅        | v0.8.2         | Stores additional configuration data for APIs. |
| Context Variables                    | ✅        | v0.1           | Enables dynamic context-based variables in APIs. |
| Cross Origin Resource Sharing (CORS) | ✅        | v0.2           | Manages CORS settings for cross-domain requests. |
| Service Discovery                    | ⚠️         | -              | Service discovery is untested in this version. |
| Segment Tags                         | ✅        | v0.1           | Tags APIs for segmentation across environments. |
| Internal API (not exposed by Gateway)| ✅        | v0.6.0         | Internal APIs are not exposed via the Gateway. |
| Global (API-level) Header Transform  | ✅        | v0.1.0         | Transforms request and response headers at the API level. |
| Global (API-level) Rate Limit        | ✅        | v0.10          | Sets rate limits globally for APIs. |
| Custom Plugins                       | ✅        | v0.1           | Supports the use of custom plugins for API processing. |
| Analytics Plugin                     | ✅        | v0.16.0        | Integrates analytics plugins for API monitoring. |
| Batch Requests                       | ❌        | -              | Batch requests are not supported. |
| Custom Analytics Tags (Tag Headers)  | ✅        | v0.10.0        | Custom tags for API analytics data. |
| Expire Analytics After               | ❌        | -              | Not supported in this version. |
| Do not track Analytics (per API)     | ✅        | v0.1.0         | Disable analytics tracking on specific APIs. |
| Webhooks                             | ❌        | -              | Webhook support is not available. |
| Looping                              | ✅        | v0.6           | Enables internal looping of API requests. |
| Round Robin Load Balancing           | ✅        | -              | Supports round-robin load balancing across upstream servers. |

##### Endpoint-level Features
For specific API endpoints, Tyk includes features like caching, circuit breaking, request validation, URL rewriting, and response transformations, allowing for precise control over request processing and response handling at an endpoint level.

| Endpoint Middleware               | Supported | Supported From | Comments                                       |
|-----------------------------------|-----------|----------------|------------------------------------------------|
| Allow list                        | ✅️        | v0.8.2         | Allows requests only from approved sources.    |
| Block list                        | ✅️        | v0.8.2         | Blocks requests from disapproved sources.      |
| Cache                             | ✅        | v0.1           | Caches responses to reduce latency.            |
| Advance Cache                     | ✅        | v0.1           | Provides advanced caching capabilities.        |
| Circuit Breaker                   | ✅        | v0.5           | Prevents service overload by breaking circuits. |
| Track Endpoint                    | ✅        | v0.1           | Tracks API endpoint usage for analysis.        |
| Do Not Track Endpoint             | ✅        | v0.1           | Disables tracking for specific endpoints.      |
| Enforced Timeouts                 | ✅        | v0.1           | Ensures timeouts for long-running requests.    |
| Ignore Authentication             | ✅        | v0.8.2         | Bypasses authentication for selected endpoints.|
| Internal Endpoint                 | ✅        | v0.1           | Restricts access to internal services.         |
| URL Rewrite                       | ✅️        | v0.1           | Modifies request URLs before processing.       |
| Validate Request                  | ✅        | v0.8.2         | Validates incoming requests before forwarding. |
| Rate Limit                        | ❌        | -              | Rate limiting is not supported per endpoint.   |
| Request Size Limit                | ✅️        | v0.1           | Limits the size of requests to prevent overload.|
| Request Method Transform          | ✅        | v0.5           | Modifies HTTP methods for incoming requests.   |
| Request Header Transform          | ✅        | v0.1           | Transforms request headers.                    |
| Request Body Transform            | ✅        | v0.1           | Transforms request bodies for processing.      |
| Request Body JQ Transform         | ⚠️         | v0.1           | Requires JQ support on the Gateway Docker image.|
| Response Header Transform         | ✅        | v0.1           | Transforms response headers.                   |
| Response Body Transform           | ✅        | v0.1           | Transforms response bodies.                    |
| Response Body JQ Transform        | ⚠️         | v0.1           | Requires JQ support on the Gateway Docker image.|
| Mock Response                     | ✅        | v0.1           | Simulates API responses for testing.           |
| Virtual Endpoint                  | ✅        | v0.1           | Allows creation of dynamic virtual endpoints.  |
| Per-Endpoint Plugin               | ❌        | -              | Plugin support per endpoint is not available.  |
| Persist Graphql                   | ❌        | -              | Not supported in this version.                 |


#### TykOasAPIDefinition CRD
The TykOasApiDefinition Custom Resource Definition (CRD) manages [Tyk OAS API Definition object]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) within a Kubernetes environment. This CRD enables the integration and management of Tyk API definitions using Kubernetes-native tools, simplifying the process of deploying and managing OAS APIs on the Tyk Dashboard.

##### TykOasApiDefinition Features

`TykOasApiDefinition` can support all [features of the Tyk OAS API]({{<ref "getting-started/using-oas-definitions/oas-reference">}}). You just need to provide the Tyk OAS API definition via a ConfigMap. In addition to managing the CRUD (Create, Read, Update, Delete) of Tyk OAS API resources, the Tyk Operator helps you better manage resources through object linking to Ingress, Security Policies, and certificates stored as Kubernetes secrets. See below for a list of Operator features and examples:

| Features | Support | Supported From | Comments | Example |
|----------|---------|-----------------|----------|--------|
| API Category | ✅      | v1.0 | - | [Manage API Categories]({{< ref "#api-categories" >}}) |
| API Version | ✅      | v1.0 | - | [Manage API versioning]({{< ref "#api-versioning" >}}) |
| API Ownership via OperatorContext | ✅      | v1.0 | - | [API Ownership]({{<ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership#when-to-use-api-ownership">}}) |
| Client Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Custom Domain Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Public keys pinning | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Upstream mTLS | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Kubernetes Ingress | ✅      | v1.0 | - | [Kubernetes Ingress Controller]({{< ref "#control-kubernetes-ingress-resources" >}}) |
| Link with SecurityPolicy | ✅      | v1.0 | - | [Protect an API]({{< ref "#add-a-security-policy-to-your-api" >}}) |

#### TykStreamsApiDefinition CRD
The TykStreamsApiDefinition Custom Resource Definition (CRD) manages [Async API configuration]({{<ref "product-stack/tyk-streaming/overview#configuration-as-code">}}) within a Kubernetes environment.

##### TykStreamsApiDefinition Features

`TykStreamsApiDefinition` can support all features of [Tyk Streams]({{<ref "product-stack/tyk-streaming/overview">}}) and [Tyk OAS API]({{<ref "getting-started/using-oas-definitions/oas-reference">}}). You just need to provide the Tyk Streams API definition via a ConfigMap. In addition to managing the CRUD (Create, Read, Update, Delete) of Tyk Streams API resources, the Tyk Operator helps you better manage resources through object linking to Security Policies. See below for a list of Operator features and examples:

| Features | Support | Supported From | Comments | Example |
|----------|---------|-----------------|----------|--------|
| API Ownership via OperatorContext | ✅      | v1.0 | - | [API Ownership]({{<ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership#when-to-use-api-ownership">}}) |
| Link with SecurityPolicy | ✅      | v1.0 | - | [Protect an API]({{< ref "#add-a-security-policy-to-your-api" >}}) |

#### Version Compatability
Ensuring compatibility between different versions is crucial for maintaining stable and efficient operations. This document provides a comprehensive compatibility matrix for Tyk Operator with various versions of Tyk and Kubernetes. By understanding these compatibility details, you can make informed decisions about which versions to deploy in your environment, ensuring that you leverage the latest features and maintain backward compatibility where necessary.

##### Compatibility with Tyk
Tyk Operator can work with all version of Tyk beyond Tyk 3.x+. Since Tyk is backward compatible, you can safely use the
latest version of Tyk Operator to work with any version of Tyk.
However, if you're using a feature that was not yet available on an earlier version of Tyk, e.g. Defining a Subgraph with Tyk 3.x, you'll see error in Tyk Operator controller manager logs.

See [Release notes]({{<ref "developer-support/release-notes/operator">}}) to check for each Tyk Operator release,
which version of Tyk it is tested against.

| Tyk Version          | 3.2 | 4.0 | 4.1 | 4.2 | 4.3 | 5.0 | 5.2 | 5.3 | 5.4 | 5.5 | 5.6 | 5.7 |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tyk Operator v0.13   | Y   |     |     |     | Y   |     |     |     |     |     |     |     |
| Tyk Operator v0.14   | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |     |
| Tyk Operator v0.14.1 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |     |
| Tyk Operator v0.15.0 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |     |
| Tyk Operator v0.15.1 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |     |
| Tyk Operator v0.16.0 | Y   | Y   |     |     | Y   | Y   | Y   |     |     |     |     |     |
| Tyk Operator v0.17.0 | Y   | Y   |     |     | Y   | Y   | Y   | Y   |     |     |     |     |
| Tyk Operator v0.17.1 | Y   | Y   |     |     |     | Y   | Y   | Y   |     |     |     |     |
| Tyk Operator v0.18.0 | Y   | Y   |     |     |     | Y   | Y   | Y   |  Y  |     |     |     |
| Tyk Operator v1.0.0  | Y   | Y   |     |     |     | Y   |     | Y   |     | Y   | Y   |     |
| Tyk Operator v1.1.0  | Y   | Y   |     |     |     | Y   |     | Y   |     | Y   | Y   | Y   |

##### Compatibility with Kubernetes Version

See [Release notes](https://github.com/TykTechnologies/tyk-operator/releases) to check for each Tyk Operator release,
which version of Kubernetes it is tested against.

| Kubernetes Version   | 1.19 | 1.20 | 1.21 | 1.22 | 1.23 | 1.24 | 1.25 | 1.26 | 1.27 | 1.28 | 1.29 | 1.30 |
| -------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Tyk Operator v0.13   | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |      |
| Tyk Operator v0.14   | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |      |
| Tyk Operator v0.14.1 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.15.0 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.15.1 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.16.0 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.17.0 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v0.17.1 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v0.18.0 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v1.0.0  |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    | Y    |
| Tyk Operator v1.1.0  |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    | Y    |


#### Security Policy CRD
The SecurityPolicy custom resource defines configuration of [Tyk Security Policy object]({{<ref "basic-config-and-security/security/security-policies">}}).

Here are the supported features:

| Features                       | Support   | Supported From | Example |
|--------------------------------|-----------|----------------|---------|
| API Access                     | ✅        | v0.1           | [API Access]({{< ref "#define-the-security-policy-manifest" >}})        |
| Rate Limit, Throttling, Quotas | ✅        | v0.1           | [Rate Limit, Throttling, Quotas]({{< ref "#define-the-security-policy-manifest" >}})        |
| Meta Data & Tags               | ✅        | v0.1           | [Tags and Meta-data]({{< ref "#define-the-security-policy-manifest" >}})        |
| Path and Method based permissions | ✅     | v0.1           | [Path based permission]({{< ref "#security-policy-example" >}})        |
| Partitions                     | ✅        | v0.1           | [Partitioned policies]({{< ref "#security-policy-example" >}})       |
| Per API limit                  | ✅        | v1.0           | [Per API Limit]({{< ref "#security-policy-example" >}})        |
| Per-Endpoint limit             | ✅        | v1.0           | [Per Endpoint Limit]({{< ref "#security-policy-example" >}})        |


### How are Tyk configurations synchronized to Git?

Tyk Sync allows you to dump configurations to a local directory, which can then be committed to a Git repository. This enables version control and easy synchronization across environments.

For example:
1. Dump configurations: `tyk-sync dump -d http://dashboard:3000 -s secret -t ./configs`
2. Commit to Git: 
   ```
   cd configs
   git add .
   git commit -m "Update Tyk configurations"
   git push
   ```

### Can I sync multiple APIs to a single Git repository?

Yes, you can store multiple API definitions, policies, and other Tyk resources in a single Git repository. Tyk Sync and Tyk Operator can work with multiple resources in the same directory.

Your repository structure might look like this:
```
tyk-configs/
├── apis/
│   ├── api1.yaml
│   └── api2.yaml
├── policies/
│   ├── policy1.yaml
│   └── policy2.yaml
└── tyk-operator/
    └── operator-context.yaml
```

### Tyk Operator changes not applied

From [Tyk Operator v0.15.0](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.15.0), we introduce a new status [subresource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#subresources) in APIDefinition CRD, called _latestTransaction_ which holds information about reconciliation status.

> The [Status subresource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#status-subresource) in Kubernetes is a specialized endpoint that allows developers and operators to retrieve the real-time status of a specific Kubernetes resource. By querying this subresource, users can efficiently access essential information about a resource's current state, conditions, and other relevant details without fetching the entire resource, simplifying monitoring and aiding in prompt decision-making and issue resolution.

The new status subresource _latestTransaction_ consists of a couple of fields that show the latest result of the reconciliation:
- `.status.latestTransaction.status`: shows the status of the latest reconciliation, either Successful or Failed;
- `.status.latestTransaction.time`: shows the time of the latest reconciliation;
- `.status.latestTransaction.error`: shows the message of an error if observed in the latest transaction.

#### Example: Find out why an APIDefinition resource cannot be deleted
Consider the scenario when APIDefinition and SecurityPolicy are connected. Usually, APIDefinition cannot be deleted directly since it is protected by SecurityPolicy. The proper approach to remove an APIDefinition is to first remove the reference to the SecurityPolicy (either by deleting the SecurityPolicy CR or updating SecurityPolicy CR’s specification), and then remove the APIDefinition itself. However, if we directly delete this APIDefinition, Tyk Operator won’t delete the APIDefinition unless the link between SecurityPolicy and APIDefinition is removed. It is to protect the referential integrity between your resources.

```console
$ kubectl delete tykapis httpbin 
apidefinition.tyk.tyk.io "httpbin" deleted 
^C%
```

After deleting APIDefinition, the operation hangs, and we suspect that something is wrong. 
Users might still look through the logs to comprehend the issue, as they did in the past, but they can now examine their APIDefinition’s status subresource to make their initial, speedy issue diagnosis.

```console
$ kubectl get tykapis httpbin 
NAME      DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED   STATUS
httpbin            /httpbin     http://httpbin.org   true      Failed
```
As seen in the STATUS column, something went wrong, and the STATUS is Failed. 

To get more information about the APIDefinition resource, we can use `kubectl describe` or `kubectl get`:
```console
$ kubectl describe tykapis httpbin 
Name:         httpbin 
Namespace:    default 
API Version:  tyk.tyk.io/v1alpha1 
Kind:         ApiDefinition 
Metadata:
  ... 
Spec:
   ...
Status:
  api_id:                ZGVmYXVsdC9odHRwYmlu
  Latest CRD Spec Hash:  9169537376206027578
  Latest Transaction:
    Error:               unable to delete api due to security policy dependency=default/httpbin
    Status:              Failed
    Time:                2023-07-18T07:26:45Z
  Latest Tyk Spec Hash:  14558493065514264307
  linked_by_policies:
    Name:       httpbin
    Namespace:  default
```
or
```console
$ kubectl get tykapis httpbin -o json | jq .status.latestTransaction
{
  "error": "unable to delete api due to security policy dependency=default/httpbin",
  "status": "Failed",
  "time": "2023-07-18T07:26:45Z"
}
```
Instead of digging into Tyk Operator's logs, we can now diagnose this issue simply by looking at the `.status.latestTransaction` field. As `.status.latestTransaction.error` implies, the error is related to *SecurityPolicy* dependency. 




### Can I use Tyk Operator with multiple Tyk installations?

Yes, you can use Tyk Operator to manage multiple Tyk installations. You'll need to create separate `OperatorContext` resources for each installation:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: prod-context
spec:
  env:
    TYK_MODE: pro
    TYK_URL: http://tyk-dashboard-staging
    TYK_AUTH: prod-secret
---
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: staging-context
spec:
  env:
    TYK_MODE: pro
    TYK_URL: http://tyk-dashboard-staging
    TYK_AUTH: staging-secret
```

Then, you can specify which context to use in your API and Policy resources:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: my-api
spec:
  name: My API
  context: prod-context
  # ... other API configuration
```

### How do I roll back changes made with Tyk Sync?

To roll back changes made with Tyk Sync:

1. If you're using Git, check out the previous version of your configurations:
   ```bash
   git checkout <previous-commit-hash>
   ```

2. Use Tyk Sync to publish the previous version:
   ```bash
   tyk-sync sync -d http://dashboard:3000 -s <secret> -p ./
   ```

It's a good practice to maintain separate branches or tags for different environments to make rollbacks easier.

### Can I use Tyk Operator with non-Kubernetes Tyk installations?

While Tyk Operator is designed to work within a Kubernetes environment, you can still use it to manage non-Kubernetes Tyk installations. You'll need to:

1. Run Tyk Operator in a Kubernetes cluster.
2. Configure Tyk Operator to point to your external Tyk installation, e.g. via `tyk-operator-conf`, environment variable, or OperatorContext:
```yaml
    TYK_MODE: pro
    TYK_URL: http://external-tyk-dashboard
    TYK_AUTH: api-access-key
    TYK_ORG: org-id
```

This allows you to manage your external Tyk installation using Kubernetes resources.


## Conclusion

With Tyk’s automation tools, you now have a set of options for streamlining API management, from handling deployments within Kubernetes to establishing consistency across multiple environments. By integrating these tools, you can simplify complex API workflows, maintain secure configurations, and save time through reduced manual intervention.

To continue building on what you’ve set up here, explore the following topics:

- **Advanced Tyk API Management**: Leverage more of Tyk’s API capabilities for custom integrations and further automation possibilities. You can learn more about Tyk's custom integrations [here]({{<ref "product-stack/tyk-operator/advanced-configurations/custom-plugins">}})
- **GraphQL Support**: You can learn more about how to support GraphQL federation via Tyk Operator [here]({{<ref "product-stack/tyk-operator/advanced-configurations/graphql-federation">}})