---
title: "Tyk Operator - API Management in Kubernetes"
date: 2025-01-10
tags: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
description: Kubernetes native API management using Tyk Operator
keywords: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
aliases:
  - /getting-started/key-concepts/gitops-with-tyk
  - /product-stack/tyk-operator/advanced-configurations/api-categories
  - /product-stack/tyk-operator/advanced-configurations/api-versioning
  - /product-stack/tyk-operator/advanced-configurations/client-authentication
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
  - /tyk-operator
  - /tyk-stack/tyk-operator/access-an-api
  - /tyk-stack/tyk-operator/getting-started-tyk-operator
  - /tyk-stack/tyk-operator/migration
  - /tyk-stack/tyk-operator/secure-an-api
  - /tyk-stack/tyk-operator/tyk-operator-reconciliation
---

## Introduction

Using Tyk Operator within Kubernetes allows you to manage API lifecycles declaratively. This section provides instructions for setting up and configuring the Tyk Operator to automate API creation, updates, and security in Kubernetes clusters, ensuring your APIs align with Kubernetes management practices.


## What is Tyk Operator?
If you’re using Kubernetes, or if you’re building an API that operates within a Kubernetes environment, the Tyk Operator is a powerful tool for automating the API lifecycle.

Tyk Operator is a native Kubernetes operator, allowing you to define and manage APIs as code. This means you can deploy, update, and secure APIs using the same declarative configuration approach Kubernetes uses for other application components. 

{{< img src="/img/operator/tyk-operator.svg" alt="Tyk Operator" width="600" >}}

## Key Concepts

### GitOps With Tyk
With Tyk Operator, you can configure your APIs using Kubernetes native manifest files. You can use the manifest files in a GitOps workflow as the single source of truth for API deployment.

{{< note success >}}
**Note**  

If you use Tyk Operator to manage your APIs, you should set up RBAC such that human users cannot have the "write" permission on the API definition endpoints using Tyk Dashboard. 
{{< /note >}}

#### What is GitOps?
“GitOps” refers to the operating model of using Git as the “single source of truth” to drive continuous delivery for infrastructure and software through automated CI/CD workflow.

#### Tyk Operator in your GitOps workflow
You can install Argo CD, Flux CD or the GitOps tool of your choice in a cluster, and connect it to the Git repository where you version control your API manifests. The tool can synchronise changes from Git to your cluster. The API manifest updates in cluster would be detected by Tyk Operator, which has a Kubernetes controller to automatically reconcile the API configurations on your Tyk Gateway or Tyk Dashboard. 

**Kubernetes-Native Developer Experience** 
API Developers enjoy a smoother Continuous Integration process as they can develop, test, and deploy the microservices. API configurations together use familiar development toolings and pipeline.

**Reliability** 
With declarative API configurations, you have a single source of truth to recover after any system failures, reducing the meantime to recovery from hours to minutes.

#### Single Source of Truth for API Configurations
Tyk Operator will reconcile any divergence between the Kubernetes desired state and the actual state in [Tyk Gateway]({{< ref "tyk-oss-gateway" >}}) or [Tyk Dashboard]({{< ref "tyk-dashboard" >}}). Therefore, you should maintain the API definition manifests in Kubernetes as the single source of truth for your system. If you update your API configurations using Tyk Dashboard, those changes would be reverted by Tyk Operator eventually.

To learn more about Gitops with Tyk, refer the following blog posts:
- [GitOps-enabled API management in Kubernetes](https://tyk.io/blog/gitops-enabled-api-management-in-kubernetes/)
- [A practical guide using Tyk Operator, ArgoCD, and Kustomize](https://tyk.io/blog/a-practical-guide-using-tyk-operator-argocd-and-kustomize/)

### Custom Resources in Tyk

In Kubernetes, a [Custom Resource (CR)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) is an extension of the Kubernetes API that allows you to introduce custom objects in your cluster. Custom Resources enable you to define and manage custom configurations and settings specific to your applications, making Kubernetes highly extensible. These custom objects are defined using Custom Resource Definitions (CRDs), which specify the schema and structure of the resource.

Tyk Operator manages multiple custom resources to help users create and maintain their API configurations:

**TykOasApiDefinition**: Available from Tyk Operator v1.0. It represents a [Tyk OAS API configuration]({{< ref "api-management/gateway-config-tyk-oas">}}). Tyk OAS API is based on the OpenAPI specification (OAS) and is the recommended format for standard HTTP APIs.

**ApiDefinition**: Available on all versions of Tyk Operator. It represents a [Tyk Classic API configuration]({{< ref "api-management/gateway-config-tyk-classic" >}}). Tyk Classic API is the traditional format used for defining all APIs in Tyk, and now the recommended format for non-HTTP APIs such as TCP, GraphQL, and Universal Data Graph (UDG). Tyk Operator supports the major features of Tyk Classic API and the feature support details can be tracked [here]({{< ref "api-management/automations/operator#apidefinition-crd" >}}).

**TykStreamsApiDefinition**: Available from Tyk Operator v1.1. It represents an [Async API configuration]({{< ref "api-management/event-driven-apis#configuration-options">}}) which is based on [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas">}}). Tyk Operator supports all [Tyk Streams]({{< ref "api-management/event-driven-apis#">}}) features as they become available on the Gateway.

**SecurityPolicy**: Available on all versions of Tyk Operator. It represents a [Tyk Security Policy configuration]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}}). Security Policies in Tyk provide a way to define and enforce security controls, including authentication, authorization, and rate limiting for APIs managed in Tyk. Tyk Operator supports essential features of Security Policies, allowing users to centrally manage access control and security enforcement for all APIs across clusters.

These custom resources enable users to leverage Kubernetes' declarative configuration management to define, modify, and version their APIs, seamlessly integrating with other Kubernetes-based workflows and tools.

#### Custom Resources for API and Policy Configuration

The following custom resources can be used to configure APIs and policies at [Tyk Gateway]({{< ref "tyk-oss-gateway" >}}) or [Tyk Dashboard]({{< ref "tyk-dashboard" >}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| TykOasApiDefinition| tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk OAS API Definition object]({{< ref "api-management/gateway-config-tyk-oas" >}})                                 |
| ApiDefinition      | tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk Classic API Definition object]({{< ref "api-management/gateway-config-tyk-classic" >}})                                 |
| TykStreamsApiDefinition| tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk Streams]({{< ref "api-management/event-driven-apis#configuration-options" >}})                                 |
| SecurityPolicy     | tyk.tyk.io  | v1alpha1  | Defines configuration of [security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}). Operator supports linking ApiDefinition custom resources in SecurityPolicy's access list so that API IDs do not need to be hardcoded in the resource manifest.        |
| SubGraph           | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation subgraph]({{< ref "api-management/graphql#subgraphs-and-supergraphs" >}}).                                           |
| SuperGraph         | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation supergraph]({{< ref "api-management/graphql#subgraphs-and-supergraphs" >}}).                                        |
| OperatorContext    | tyk.tyk.io  | v1alpha1  | Manages the context in which the Tyk Operator operates, affecting its overall behavior and environment. See [Operator Context]({{< ref "api-management/automations/operator#multi-tenancy-in-tyk" >}}) for details. |

#### Tyk Classic Developer Portal

The following custom resources can be used to configure [Tyk Classic Developer Portal]({{< ref "tyk-developer-portal/tyk-portal-classic" >}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| APIDescription     | tyk.tyk.io  | v1alpha1  | Configures [Portal Documentation]({{< ref "tyk-apis/tyk-portal-api/portal-documentation" >}}). |
| PortalAPICatalogue | tyk.tyk.io  | v1alpha1  | Configures [Portal API Catalogue]({{< ref "getting-started/key-concepts/api-catalogue" >}}). |
| PortalConfig       | tyk.tyk.io  | v1alpha1  | Configures [Portal Configuration]({{< ref "tyk-apis/tyk-portal-api/portal-configuration" >}}). |


### Reconciliation With Tyk Operator 
#### Controllers & Operators
In Kubernetes, [controllers](https://kubernetes.io/docs/concepts/architecture/controller/) watch one or more Kubernetes resources, which can be built-in types like *Deployments* or custom resources like *ApiDefinition* - in this case, we refer to Controller as Operator. The purpose of a controller is to match the desired state by using Kubernetes APIs and external APIs.

> A [Kubernetes operator](https://www.redhat.com/en/topics/containers/what-is-a-kubernetes-operator) is an application-specific controller that extends the functionality of the Kubernetes API to create, configure, and manage instances of complex applications on behalf of a Kubernetes user.

#### Desired State vs Observed State
Let’s start with the *Desired State*. It is defined through Kubernetes Manifests, most likely YAML or JSON, to describe what you want your system to be in. Controllers will watch the resources and try to match the actual state (the observed state) with the desired state for Kubernetes Objects. For example, you may want to create a Deployment that is intended to run three replicas. So, you can define this desired state in the manifests, and Controllers will perform necessary operations to make it happen.

How about *Observed State*? Although the details of the observed state may change controller by controller, usually controllers update the status field of Kubernetes objects to store the observed state. For example, in Tyk Operator, we update the status to include *api_id*, so that Tyk Operator can understand that the object was successfully created on Tyk.

#### Reconciliation
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


### CRD Versioning

Tyk follows standard practices for naming and versioning custom resources as outlined by the Kubernetes Custom Resource Definition [versioning guidelines](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/). Although we are currently on the `v1alpha1` version, no breaking changes will be introduced to existing Custom Resources without a version bump. This means that any significant changes or updates that could impact existing resources will result in a new version (e.g., `v1beta1` or `v1`) and Operator will continue supporting all CRD versions for a reasonable time before deprecating an older version. This ensures a smooth transition and compatibility, allowing you to upgrade without disrupting your current configurations and workflows.

For more details on Kubernetes CRD versioning practices, refer to the Kubernetes Custom Resource Definition [Versioning documentation](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/).


### Operator User
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


### Multi-tenancy in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate [organizations]({{< ref "api-management/dashboard-configuration#organizations" >}}) for each team or department. Each organization is a completely isolated unit with its own:

- API Definitions
- API Keys
- Users
- Developers
- Domain
- Tyk Classic Portal

This structure is ideal for businesses with a complex hierarchy, where distinct departments operate independently but within the same overall infrastructure.

{{< img src="/img/operator/tyk-organisations.svg" alt="Multi-tenancy in Tyk Dashboard" width="600" >}}

#### Define OperatorContext for Multi-Tenant API Management

The `OperatorContext` in Tyk Operator allows you to create isolated management environments by defining specific access parameters for different teams or departments within a shared Tyk Operator instance. It helps you specify:

- The Tyk Dashboard with which the Operator interacts
- The organization under which API management occurs
- The user identity utilized for requests
- The environment in which the Operator operates

By setting different `OperatorContext` configurations, you can define unique access and management contexts for different teams. These contexts can then be referenced directly in your `ApiDefinition`, `TykOasApiDefinition`, `TykStreamsApiDefinition` or `SecurityPolicy` custom resource definitions (CRDs) using the `contextRef` field, enabling precise control over API configurations.

#### Example Scenarios Using OperatorContext

1. **No OperatorContext Defined**
   - If no `OperatorContext` is defined, Tyk Operator defaults to using credentials from the `tyk-operator-conf` secret or from environment variables. This means all API management actions are performed under the system’s default user credentials, with no specific contextual isolation.

2. **OperatorContext Defined but Not Referenced**
   - When an `OperatorContext` is defined but not referenced in an API configuration, Tyk Operator continues to use the default credentials from `tyk-operator-conf`. The specified `OperatorContext` is ignored, resulting in API operations being managed under default credentials.

3. **OperatorContext Defined and Referenced**
   - If a specific `OperatorContext` is both defined and referenced in an API or policy, Tyk Operator utilizes the credentials and parameters from the referenced `OperatorContext` to perform API operations. This allows each API or policy to be managed with isolated configurations, enabling team-based or department-specific API management within the same Kubernetes cluster.

Using `OperatorContext` offers flexibility for multi-tenancy, helping organizations manage and isolate API configurations based on their specific team or departmental needs.

{{< img src="/img/operator/tyk-operator-context.svg" alt="Multi-tenancy in Kubernetes Tyk Operator" width="600" >}}

### TLS Certificates

Tyk Operator is designed to offer a seamless Kubernetes-native experience by managing TLS certificates stored within Kubernetes for your API needs. Traditionally, to use a certificate (e.g., as a client certificate, domain certificate, or certificate for accessing an upstream service), you would need to manually upload the certificate to Tyk and then reference it using a 'Certificate ID' in your API definitions. This process can become cumbersome, especially in a Kubernetes environment where certificates are often managed as secrets and may rotate frequently.

To address this challenge, Tyk Operator allows you to directly reference certificates stored as Kubernetes secrets within your custom resource definitions (CRDs). This reduces operational overhead, minimizes the risk of API downtime due to certificate mismatches, and provides a more intuitive experience for API developers.

#### Benefits of Managing Certificates with Tyk Operator
- **Reduced operational overhead**: Automates the process of updating certificates when they rotate.
- **Minimized risk of API downtime**: Ensures that APIs continue to function smoothly, even when certificates are updated.
- **Improved developer experience**: Removes the need for API developers to manage certificate IDs manually.

#### Examples

| Certificate Type | Supported in ApiDefinition | Supported in TykOasApiDefinition | Supported in TykStreamsApiDefinition |
|------------------|-------------|---------|---------|
| Client certifates | ✅ [Client mTLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#setup-static-mtls-in-tyk-operator-using-the-tyk-classic-api-definition" >}}) | ✅ [Client mTLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#setup-static-mtls-in-tyk-operator-using-tyk-oas-api-definition" >}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Custom domain certificates | ✅ [TLS and SSL]({{< ref "api-management/certificates#dynamically-setting-ssl-certificates-for-custom-domains" >}}) | ✅ [TLS and SSL]({{< ref "api-management/certificates#dynamically-setting-ssl-certificates-for-custom-domains" >}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Public keys pinning | ✅ [Certificate pinning]({{< ref "api-management/upstream-authentication/mtls#using-tyk-operator-to-configure-mtls-for-tyk-classic-apis" >}}) | ✅ [Certificate pinning]({{< ref "api-management/upstream-authentication/mtls#certificate-pinning" >}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |
| Upstream mTLS | ✅ [Upstream mTLS via Operator]({{< ref "api-management/upstream-authentication/mtls#using-tyk-operator-to-configure-mtls-for-tyk-classic-apis" >}}) | ✅ [Upstream mTLS via Operator]({{< ref "api-management/upstream-authentication/mtls#using-tyk-operator-to-configure-mtls" >}}) | Certificate ID can be set in the API Definition but configuring certificates from Secrets in CRD is not supported. |

## What Features Are Supported By Tyk Operator?

### APIDefinition CRD
Tyk stores API configurations as JSON objects called API Definitions. If you are using Tyk Dashboard to manage Tyk, then these are stored in either Postgres or MongoDB, as specified in the database settings. On the other hand, if you are using Tyk OSS, these configurations are stored as files in the /apps directory of the Gateway which is located at the default path /opt/tyk-gateway.

An API definition includes various settings and middleware that control how incoming requests are processed.

#### API Types
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

#### Management of APIs
Tyk offers flexible API management features such as setting active/inactive status, categorizing and naming APIs, versioning, and defining ownership within teams or organizations for streamlined administration.

| Type                           | Support | Supported From | Comments                     |
|--------------------------------|---------|----------------|------------------------------|
| API Name                       | ✅      | v0.1           | Assign and manage names for your APIs. |
| API Status (inactive/active)   | ✅      | v0.2           | Toggle API status between active and inactive. |
| API Categories                 | ✅      | v0.1           | Categorize APIs for easier management. |
| API ID                         | ✅      | v0.1           | Assign unique IDs to APIs for tracking and management. |
| API Ownership                  | ✅      | v0.12          | Define ownership of APIs within teams or organizations. |
| API Versioning                 | ✅      | v0.1           | Enable version control for APIs. |

#### Traffic Routing
Tyk enables traffic routing through path-based or host-based proxies and allows redirection to specific target URLs, providing control over how requests are directed to backend services.

| Type                        | Supported | Supported From | Comments                     |
| --------------------------- | --------- | -------------- | ---------------------------- |
| Path-Based Proxy            | ✅        | v0.1           | Route traffic based on URL path. |
| Host-Based Proxy            | ✅        | v0.1           | Route traffic based on the request host. |
| Target URL                  | ✅        | v0.1           | Redirect traffic to a specific target URL. |

#### Client to Gateway Authentication and Authorization
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

#### Gateway to Upstream Authentication
Tyk supports secure upstream connections through mutual TLS, certificate pinning, and public key verification to ensure data integrity between the gateway and backend services. For full details, please see the [Upstream Authentication]({{< ref "api-management/upstream-authentication" >}}) section.

| Type                                            | Supported | Supported From |
|-------------------------------------------------|-----------|----------------|
| Mutual TLS for upstream connectioons            | ✅        | v0.9           | Mutual TLS authentication for upstream connections. |
| Public Key Certificate Pinning                  | ✅        | v0.9           | Ensures that the upstream certificate matches a known key. |
| Upstream Request Signing using HMAC             | ✅        | v1.2.0         | Attach an encrypted signature to requests to verify the gateway as the sender. |

#### API-level (Global) Features
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

#### Endpoint-level Features
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


### TykOasAPIDefinition CRD
The TykOasApiDefinition Custom Resource Definition (CRD) manages [Tyk OAS API Definition objects]({{< ref "api-management/gateway-config-tyk-oas" >}}) within a Kubernetes environment. This CRD enables the integration and management of Tyk API definitions using Kubernetes-native tools, simplifying the process of deploying and managing OAS APIs on the Tyk Dashboard.

#### TykOasApiDefinition Features

`TykOasApiDefinition` can support all features of the Tyk OAS API definition. You just need to provide the Tyk OAS API definition via a ConfigMap. In addition to managing the CRUD (Create, Read, Update, Delete) of Tyk OAS API resources, the Tyk Operator helps you better manage resources through object linking to Ingress, Security Policies, and certificates stored as Kubernetes secrets. See below for a list of Operator features and examples:

| Features | Support | Supported From | Comments | Example |
|----------|---------|-----------------|----------|--------|
| API Category | ✅      | v1.0 | - | [Manage API Categories]({{< ref "#api-categories" >}}) |
| API Version | ✅      | v1.0 | - | [Manage API versioning]({{< ref "#api-versioning" >}}) |
| API Ownership via OperatorContext | ✅      | v1.0 | - | [API Ownership]({{< ref "api-management/user-management#when-to-use-api-ownership" >}}) |
| Client Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Custom Domain Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Public keys pinning | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Upstream mTLS | ✅      | v1.0 | - | [Manage TLS certificate]({{< ref "#tls-certificates" >}}) |
| Kubernetes Ingress | ✅      | v1.0 | - | [Kubernetes Ingress Controller]({{< ref "product-stack/tyk-operator/tyk-ingress-controller" >}}) |
| Link with SecurityPolicy | ✅      | v1.0 | - | [Protect an API]({{< ref "tyk-stack/tyk-operator/create-an-api#add-a-security-policy-to-your-api" >}}) |

### TykStreamsApiDefinition CRD
The TykStreamsApiDefinition Custom Resource Definition (CRD) manages [Async API configuration]({{< ref "api-management/event-driven-apis#configuration-options" >}}) within a Kubernetes environment.

#### TykStreamsApiDefinition Features

`TykStreamsApiDefinition` can support all features of [Tyk Streams]({{< ref "api-management/event-driven-apis#" >}}). You just need to provide the Tyk Streams API definition via a ConfigMap. In addition to managing the CRUD (Create, Read, Update, Delete) of Tyk Streams API resources, the Tyk Operator helps you better manage resources through object linking to Security Policies. See below for a list of Operator features and examples:

| Features | Support | Supported From | Comments | Example |
|----------|---------|-----------------|----------|--------|
| API Ownership via OperatorContext | ✅      | v1.0 | - | [API Ownership]({{< ref "api-management/user-management#when-to-use-api-ownership" >}}) |
| Link with SecurityPolicy | ✅      | v1.0 | - | [Protect an API]({{< ref "tyk-stack/tyk-operator/create-an-api#add-a-security-policy-to-your-api" >}}) |

### Version Compatability
Ensuring compatibility between different versions is crucial for maintaining stable and efficient operations. This document provides a comprehensive compatibility matrix for Tyk Operator with various versions of Tyk and Kubernetes. By understanding these compatibility details, you can make informed decisions about which versions to deploy in your environment, ensuring that you leverage the latest features and maintain backward compatibility where necessary.

#### Compatibility with Tyk
Tyk Operator can work with all version of Tyk beyond Tyk 3.x+. Since Tyk is backward compatible, you can safely use the
latest version of Tyk Operator to work with any version of Tyk.
However, if you're using a feature that was not yet available on an earlier version of Tyk, e.g. Defining a Subgraph with Tyk 3.x, you'll see error in Tyk Operator controller manager logs.

See [Release notes]({{< ref "developer-support/release-notes/operator" >}}) to check for each Tyk Operator release,
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

#### Compatibility with Kubernetes Version

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


### Security Policy CRD
The SecurityPolicy custom resource defines configuration of [Tyk Security Policy object]({{< ref "api-management/policies" >}}).

Here are the supported features:

| Features                       | Support   | Supported From | Example |
|--------------------------------|-----------|----------------|---------|
| API Access                     | ✅        | v0.1           | [API Access]({{< ref "tyk-stack/tyk-operator/create-an-api#define-the-security-policy-manifest" >}})        |
| Rate Limit, Throttling, Quotas | ✅        | v0.1           | [Rate Limit, Throttling, Quotas]({{< ref "tyk-stack/tyk-operator/create-an-api#define-the-security-policy-manifest" >}})        |
| Meta Data & Tags               | ✅        | v0.1           | [Tags and Meta-data]({{< ref "tyk-stack/tyk-operator/create-an-api#define-the-security-policy-manifest" >}})        |
| Path and Method based permissions | ✅     | v0.1           | [Path based permission]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}})        |
| Partitions                     | ✅        | v0.1           | [Partitioned policies]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}})       |
| Per API limit                  | ✅        | v1.0           | [Per API Limit]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}})        |
| Per-Endpoint limit             | ✅        | v1.0           | [Per Endpoint Limit]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}})        |

## Manage API MetaData


### API Name

#### Tyk OAS API and Tyk Streams API

API name can be set through `x-tyk-api-gateway.info.name` field in [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas" >}}) object.

#### Tyk Classic API

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

### API Status

#### API Active Status

An active API will be loaded to the Gateway, while an inactive API will not, resulting in a 404 response when called.

#### Tyk OAS API and Tyk Streams API

API active state can be set through `x-tyk-api-gateway.info.state.active` field in [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas" >}}) object.

#### Tyk Classic API

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

### API Accessibility

An API can be configured as internal so that external requests are not processed. 

#### Tyk OAS API and Tyk Streams API

API accessibility can be set through `x-tyk-api-gateway.info.state.internal` field in [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas" >}}) object.

#### Tyk Classic API

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

### API ID

#### Creating a new API

If you're creating a new API using Tyk Operator, you don't need to specify the ID. The API ID will be generated in a deterministic way.

#### Tyk OAS API and Tyk Streams API

The generated ID is stored in `status.id` field. Run the following command to inspect generated API ID of a Tyk OAS API.

```bash
% kubectl get tykoasapidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.id}'
ZGVmYXVsdC9wZXRzdG9yZQ
```

In this example, the generated API ID is `ZGVmYXVsdC9wZXRzdG9yZQ`.

#### Tyk Classic API

The generated ID is stored in `status.api_id` field. Run the following command to inspect generated API ID of a Tyk Classic API.

```bash
% kubectl get apidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.api_id}'
ZGVmYXVsdC90ZXN0
```

In this example, the generated API ID is `ZGVmYXVsdC90ZXN0`.

### Updating an existing API

#### Tyk OAS API and Tyk Streams API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `x-tyk-api-gateway.info.id` field in [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas" >}}) object.

#### Tyk Classic API

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


### API Categories
[API categories]({{< ref "api-management/dashboard-configuration#governance-using-api-categories" >}}) are configured differently for Tyk OAS APIs and Tyk Classic APIs. Please see below for examples.

#### Tyk OAS API

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

#### Tyk Streams API

As of Tyk Operator v1.1, API categories is not supported in `TykStreamsApiDefinition` CRD.

#### Tyk Classic API

For a Tyk Classic API, you can specify the category name using the `name` field with a `#` qualifier. This will categorize the API in the Tyk Dashboard. See [How API categories work]({{< ref "api-management/dashboard-configuration#tyk-classic-apis" >}}) to learn about limitations on API names.

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

### API Versioning
[API versioning]({{< ref "api-management/api-versioning" >}}) are configured differently for [Tyk OAS APIs]({{< ref "#tyk-oas-api" >}}) and [Tyk Classic APIs]({{< ref "#tyk-classic-api" >}}). Please see below for examples.

#### Configuring API Version in Tyk OAS API Definition

In the [Tyk OAS API Definition]({{< ref "api-management/api-versioning" >}}), versioning can be configured via `x-tyk-api-gateway.versioning` object of the Base API, where the child API's IDs are specified. In the Kubernetes environment with Tyk Operator, where we reference API resources through its Kubernetes name and namespace, this is not desired. Therefore, we add support for versioning configurations through the field `versioning` in `TykOasApiDefinition` custom resource definition (CRD).

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

`versioning` is configured at `order-api` (v1), the Base API, and it has similiar structure as [Tyk OAS API Definition]({{< ref "api-management/api-versioning" >}}):

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

In case if there is original versioning information in the base API Definition, the versioning information will be kept and be merged with what is specified in CRD. If there are conflicts between the Tyk OAS API Definition and CRD, we will make use of CRD values as the final configuration. 

Tyk Operator would also protect you from accidentally deleting a version of an API that is being referenced by another API, maintaining your API integrity.

#### Configuring API Version in Tyk Streams API Definition

As of Tyk Operator v1.1, API versioning is not supported in `TykStreamsApiDefinition` CRD. This can be configured natively in the Tyk Streams API Definition.

#### Configuring API Version in Tyk Classic API Definition

For Tyk Classic API, versioning can be configured via `ApiDefinition` custom resource definition (CRD). See [Tyk Classic versioning]({{< ref "api-management/gateway-config-tyk-classic#tyk-classic-api-versioning" >}}) for a comprehensive example of configuring API versioning for Tyk Classic API with Tyk Operator.

### API Ownership

Please consult the [API Ownership]({{< ref "api-management/user-management#api-ownership" >}}) documentation for the fundamental concepts of API Ownership in Tyk and [Operator Context]({{< ref "api-management/automations/operator#multi-tenancy-in-tyk" >}}) documentation for an overview of the use of OperatorContext to manage resources for different teams effectively.

The guide includes practical examples for managing API ownership via OperatorContext. Key topics include defining user owners and user group owners in OperatorContext for connecting and authenticating with a Tyk Dashboard, and using `contextRef` in `TykOasApiDefinition` or `ApiDefinition` objects to ensure configurations are applied within specific organizations. The provided YAML examples illustrate how to set up these configurations.

#### How API Ownership works in Tyk Operator

In Tyk Dashboard, API Ownership ensures that only designated 'users' who own an API can modify it. This security model is crucial for maintaining control over API configurations, especially in a multi-tenant environment where multiple teams or departments may have different responsibilities and permissions.

Tyk Operator is designed to interact with Tyk Dashboard as a system user. For the Tyk Dashboard, Tyk Operator is just another user that must adhere to the same access controls and permissions as any other user. This means:

- Tyk Operator needs the correct access rights to modify any APIs.
- It must be capable of managing APIs according to the ownership rules set in Tyk Dashboard.

To facilitate API ownership and ensure secure operations, Tyk Operator must be able to 'impersonate' different users for API operations. This is where `OperatorContext` comes into play. Users can define different `OperatorContext` objects that act as different agents to connect to Tyk Dashboard. Each `OperatorContext` can specify different access parameters, including the user access key and organization it belongs to. Within `OperatorContext`, users can specify the IDs of owner users or owner user groups. All APIs managed through that `OperatorContext` will be owned by the specified users and user groups, ensuring compliance with Tyk Dashboard's API ownership model.

{{< img src="/img/operator/tyk-api-ownership.svg" alt="Enabling API ownership with OperatorContext" width="600" >}}

#### OperatorContext

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

#### Tyk OAS API and Tyk Streams API

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

#### Tyk Classic API

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

## Troubleshooting and FAQ

<details> <summary><b>Can I use Tyk Operator with non-Kubernetes Tyk installations?</b></summary>

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

</details> 

<details> <summary><b>Tyk Operator changes not applied?</b></summary>

From [Tyk Operator v0.15.0](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.15.0), we introduce a new status [subresource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#subresources) in APIDefinition CRD, called _latestTransaction_ which holds information about reconciliation status.

> The [Status subresource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#status-subresource) in Kubernetes is a specialized endpoint that allows developers and operators to retrieve the real-time status of a specific Kubernetes resource. By querying this subresource, users can efficiently access essential information about a resource's current state, conditions, and other relevant details without fetching the entire resource, simplifying monitoring and aiding in prompt decision-making and issue resolution.

The new status subresource _latestTransaction_ consists of a couple of fields that show the latest result of the reconciliation:
- `.status.latestTransaction.status`: shows the status of the latest reconciliation, either Successful or Failed;
- `.status.latestTransaction.time`: shows the time of the latest reconciliation;
- `.status.latestTransaction.error`: shows the message of an error if observed in the latest transaction.

**Example: Find out why an APIDefinition resource cannot be deleted**

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

</details> 

<details> <summary><b>Can I use Tyk Operator with multiple Tyk installations?</b></summary>

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

</details> 
