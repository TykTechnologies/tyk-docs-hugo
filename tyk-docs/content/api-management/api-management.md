---
title: "Tyk API Management"
date: 2020-06-24
weight: 4
menu: "main"
url: "/apim/"
linkTitle: API Management
tags: ["Tyk API Management", "Licencing", "Open Source", "Self-Managed", "Tyk Cloud", "API Gateway"]
description: "How to decide on which Tyk deployment option is best for you"
aliases:
    - /getting-started/deployment-options/
---

What is API Management? API management helps ensure the creation and publishing of your APIs is consistent and secure. It monitors performance and activity through analytics and logging and let's you manage all your transformations and policies in one central place.

{{< youtube CsNHkpQvVlQ >}}

Tyk API Management deployment options are comprised of the various [open and closed source](/docs/tyk-stack/) components.

Which one is right for your organisation depends on your requirements and preferences.  Please contact us for help:

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

|                          | [Open Source][11]  |   [Self-Managed][12]     |  [Cloud][13]
|--------------------------|--------------|--------------------|---------
| API Gateway Capabilities <br> <ul><li>Rate Limiting</li><li>Authentication</li> <li>API Versioning</li><li>Granular Access Control</li><li>GraphQL</li>  <li>and [much more][1]</li></ul> | ✅               |✅	                |✅      
| [Version Control][2] Integration | ✅		  |✅	              |✅	 
| [API Analytics Exporter][3]| ✅		      |✅	              |✅	 
| [Tyk Manager][4] | -	          |✅	              |✅	 
| [Single Sign On (SSO)][5]     | -	          |✅	              |✅	      
| [RBAC and API Teams][6]         | -	          |✅	              |✅	      
| [Universal Data Graph][7]     | -	          |✅	              |✅	      
| [Multi-Tenant][15]             | -	          |✅	              |✅	      
| [Multi-Data Center][8]        | -	          |✅	              |✅	      
| [Developer Portal][9]         | -		      |✅	              |✅	 
| [Developer API Analytics][10]  | -		      |✅	              |✅	   
| Hybrid Deployments                       | -		      |-	              |✅
| Fully-Managed SaaS       | -		      |-	              |✅
| HIPAA, SOC2, PCI          | ✅		      |✅	              | -

[1]: /docs/apim/open-source#tyk-gateway
[2]: /docs/tyk-sync/
[3]: /docs/tyk-pump/
[4]: /docs/tyk-dashboard/
[5]: /docs/advanced-configuration/integrate/sso/
[6]: /docs/tyk-dashboard/rbac/
[7]: /docs/universal-data-graph/
[8]: /docs/tyk-multi-data-centre/
[9]: /docs/tyk-developer-portal/
[10]: /docs/tyk-dashboard-analytics/
[11]:/docs/apim/open-source
[12]: /docs/tyk-on-premises/
[13]: https://account.cloud-ara.tyk.io/signup
[14]: https://tyk.io/price-comparison/?__hstc=181257784.269e6993c6140df347029595da3a8f[…]4015210561.61&__hssc=181257784.22.1614015210561&__hsfp=1600587040
[15]: /docs/basic-config-and-security/security/dashboard/organisations/


# Licensing
### Open Source (OSS)
The Tyk Gateway is the backbone of all our solutions.  You can deploy it for free, forever.

Head on over to the [OSS section][11] for more information on it and the other open source components.
### Self-managed (On-Prem)

{{< include "self-managed-licensing-include" >}}


### Cloud (Software as a Service / SaaS)
With Tyk Cloud all of the above closed-source components are available. Get your free account [here][13].


There are many open and closed source [Tyk components](/docs/tyk-stack) that make up the various solutions.
