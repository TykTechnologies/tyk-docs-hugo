---
title: "Inclusive Naming Initiative"
date: 2024-05-17T15:51:00+01:00
tags: [ "Inclusive Naming Initiative", "Inclusivity", "Inclusive" ]
description: "Explains the inclusive naming initiative concerning Tyk docs"
---

This document is for Tyk users, contributors, and anyone interested in our commitment to inclusive language.

We are excited to announce the launch of our *Inclusive Naming* project, in June 2024, dedicated to updating our documentation and working towards alignment with the [Inclusive Naming Initiative (INI)](https://inclusivenaming.org). This initiative reflects our commitment to fostering an inclusive and respectful environment for our users and within our company.

The [Inclusive Naming Initiative](https://inclusivenaming.org/) is a community-driven effort to promote and standardise the use of inclusive language in software and documentation. By adhering to their guidelines, we aim to eliminate terms that can be considered exclusionary, offensive, or insensitive and replace them with language that is respectful and welcoming to all.

---

## Purpose

Our commitment to diversity, equity and inclusion is foundational to our values. By updating our documentation to comply with the *Inclusive Naming Initiative (INI)*, we are taking a significant step towards ensuring that our language reflects our dedication to inclusivity. This project will help us:

- **Create a more welcoming environment**: By using inclusive language, we create a space where everyone feels valued and respected.
- **Enhance accessibility**: Clear and inclusive documentation improves accessibility for all users, regardless of their background or identity.

---

## Phase 1 Tier 1 compliance

### Tier 1 word list

INI sorts terms into word lists, considering both the severity of the term and the level of scrutiny it has received. [INI Tier 1 words](https://inclusivenaming.org/word-lists/tier-1) are considered critical and are recommended to be replaced immediately.

INI have identified that terms included in this list have one or all of the following attributes:

- Strong social consensus within the software development community on replacements
- Are identified by the INI as high-severity terms in need of immediate replacement
- Terms where the impact of change or removal is low: for example, there is little entanglement in low-level systems or standardised language set by standards bodies
- Have passed through all the review stages in Tiers 2 and 3

---

### Phase 1 current status

An initial review of the Tyk documentation has been conducted and where possible content has been updated to replace instances of *INI tier 1 word* occurrences.
The main findings and actions of the review are:
1. **Documentation pages containing INI tier 1 words**: The content in these pages has been easily rephrased and is now completed.
2. **Configuration parameters with INI tier 1 words**: These fields are in Tyk products as well as in third-party libraries and dependencies, e.g. Redis. For obvious reasons, we can't easily remove the use of these words. We have updated the content that explains these parameters and only left references to the actual parameter names. The list of fields is presented for you in [the subsequent section](#Tyk-components). There are occurrences in the Tyk products, in addition to third-party libraries and dependencies:

    - **Tyk products**: Aim to work on this and once they are removed from the product (in a backwards-compatible way) the documentation will get updated accordingly.
    - **Third-party libraries and dependencies**: There's nothing much we can do at the moment except wait, but if or once they get updated, we will update our documentation.


### Tyk components

In this section, we will detail all the existing occurrences of *INI tier 1 words* in our docs, per Tyk component:

#### Tyk Gateway

##### Config parameters
- [allow_master_keys]({{< ref "tyk-dashboard/configuration#enable_master_keys" >}})
- [analytics_storage.master_name]({{< ref "tyk-oss-gateway/configuration#analytics_storagemaster_name" >}})
- [cache_storage.master_name]({{< ref "tyk-oss-gateway/configuration#cache_storagemaster_name" >}})
- [storage.master_name]({{< ref "tyk-oss-gateway/configuration#storagemaster_name" >}})
- [slave_options]({{< ref "tyk-oss-gateway/configuration#slave_options" >}})
- [blacklisted_ips]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [disable_ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})
- [enable_ip_blacklisting]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})

##### Tyk Classic API Definition

The [Tyk Gateway OpenAPI Document](https://github.com/TykTechnologies/tyk-docs/blob/master/tyk-docs/assets/others/gateway-swagger.yml) (Tyk Gateway swagger), includes references to the following Tyk Classic API Definition parameters:

- [version_data.versions.{version-name}.extended_paths.black_list]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic#configuring-the-block-list-in-the-tyk-classic-api-definition" >}}). There is also a parameter with equivalent functionality under the `paths` object (`version_data.versions.{version_name}.paths.black_list`).
- [version_data.{version-name}.extended_paths.white_list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-tyk-classic-api-definition" >}}). There is also a parameter with equivalent functionality under the `paths` object (`version_data.versions.{version_name}.paths.while_list`).

#### Tyk Dashboard

##### Config parameters
- [enable_master_keys]({{< ref "tyk-dashboard/configuration#enable_master_keys" >}})
- [redis_master_name]({{< ref "tyk-dashboard/configuration#redis_master_name" >}})

##### Tyk Classic API Definition 

The [Tyk Dashboard OpenAPI Document](https://github.com/TykTechnologies/tyk-docs/blob/master/tyk-docs/assets/others/dashboard-swagger.yml) (Tyk Dashboard swagger), includes references to [the parameters from the above Tyk Classic API Definition list]({{< ref "#Parameters-in-Tyk-classic-API--definition" >}}).

-  Tyk Classic APIs *Endpoint Designer* in the Dashboard UI shows configuration of [blacklist]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic#configuring-the-block-list-in-the-api-designer" >}}) and [whitelist]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) middleware plugins.
    
#### Tyk MDCB

The following MDCB configuration parameters contain tier 1 word occurrences:
- [analytics_storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#analytics_storagemaster_name" >}})
- [storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#storagemaster_name" >}})

#### Tyk Pump

The folllowing Tyk Pump configuration parameters contain tier 1 word occurrences:
- [analytics_storage_config.master_name]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configmaster_name" >}})

### Miscellaneous

Content contains *INI Tier 1 word* occurrences due to the following external dependencies:
- Links to Tyk Component GitHub repositories with a default branch set as `master`. 
- Tyk Gateway and Tyk Pump content use Redis terminology for `master` in relation to key storage and analytics. 
- Tyk Classic Developer Portal provides [documentation]({{< ref "tyk-developer-portal/tyk-portal-classic/keycloak-dcr" >}}) that explains how to integrate Tyk with Keycloak using the [OpenID Connect Dynamic Client Registration](https://tools.ietf.org/html/rfc7591) protocol. The example in the guide uses the Keycloak default `master` realm.
- Tyk Bitnami Helm Charts use a service with a DNS name of *tyk-redis-master.tyk.svc*.

---
