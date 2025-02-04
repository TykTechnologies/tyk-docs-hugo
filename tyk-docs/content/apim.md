---
title: "Tyk API Management Deployment Options"
date: 2020-06-24
linkTitle: API Management
tags: ["Tyk API Management", "Licensing", "Open Source", "Self-Managed", "Tyk Cloud", "API Gateway"]
description: "How to decide on which Tyk deployment option is best for you"
aliases:
    - /getting-started/deployment-options/
---

Tyk API Platform offers various deployment options, consisting of both [open source and proprietary]({{< ref "tyk-stack" >}})
components.

Choosing the right one for your organization depends on your specific requirements and preferences.
</br>Don’t hesitate to contact us for assistance {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

|                                                                                                                                                                                                                                    | [Open Source]({{< ref "tyk-open-source" >}})  |   [Self-Managed]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}})      |  [Cloud](https://account.cloud-ara.tyk.io/signup)
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|-------------------|---------
| API Gateway Capabilities <br> <ul><li>Rate Limiting</li><li>Authentication</li> <li>API Versioning</li><li>Granular Access Control</li><li>GraphQL</li>  <li>and [much more]({{< ref "tyk-open-source" >}})</li></ul> | ✅             |✅	              |✅
| [Version Control]({{< ref "api-management/automations/sync" >}}) Integration                                                                                                                                                      | -		      |✅	              |✅
| [API Analytics Exporter]({{< ref "tyk-pump" >}})                                                                                                                                                                                   | ✅		      |✅	              |✅	 
| [Tyk Dashboard]({{< ref "tyk-dashboard" >}})                                                                                                                                                                                       | -	          |✅	              |✅	 
| [Single Sign On (SSO)]({{< ref "advanced-configuration/integrate/sso" >}})                                                                                                                                                         | -	          |✅	              |✅	      
| [RBAC and API Teams]({{< ref "api-management/user-management#" >}})                                                                                                                                                                             | -	          |✅	              |✅	      
| [Universal Data Graph]({{< ref "universal-data-graph" >}})                                                                                                                                                                         | -	          |✅	              |✅	      
| [Multi-Tenant]({{< ref "api-management/dashboard-configuration#organizations" >}})                                                                                                                                           | -	          |✅	              |✅	      
| [Multi-Data Center]({{< ref "tyk-multi-data-centre#managing-geographically-distributed-gateways-to-minimize-latency-and-protect-data-sovereignty" >}})                                                                                                                                                                           | -	          |✅	              |✅	      
| [Developer Portal]({{< ref "tyk-developer-portal" >}})                                                                                                                                                                             | -		      |✅	              |✅	 
| [Developer API Analytics]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}})                                                                                                                                                                   | -		      |✅	              |✅	   
| Hybrid Deployments                                                                                                                                                                                                                 | -		      |-	              |✅
| Fully-Managed SaaS                                                                                                                                                                                                                 | -		      |-	              |✅
| [HIPAA, SOC2, PCI](https://tyk.io/governance-and-auditing/)                                                                                                                                                                        | ✅		      |✅	              | -


## Licensing

### Self-managed (On-Prem)
{{< include "self-managed-licensing-include" >}}

### Cloud (Software as a Service / SaaS)
With Tyk Cloud, all of the above closed-source components are available. Get your free account [here](https://account.cloud-ara.tyk.io/signup).

### Open Source (OSS)
The Tyk Gateway is the backbone of all our solutions and can be deployed for free, forever.
Visit the [OSS section]({{< ref "tyk-open-source" >}}) for more information on it and other open source components.

Explore the various open and closed source [Tyk components]({{< ref "tyk-stack" >}}) that are part of the Tyk platform
solutions.

