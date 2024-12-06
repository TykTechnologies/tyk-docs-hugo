---
title: "Inclusive Naming Initiative"
date: 2024-05-17T15:51:00+01:00
tags: [ "Inclusive Naming Initiative", "Inclusivity", "Inclusive" ]
description: "Explains the inclusive naming initiative concerning Tyk docs"
---

This document is intended for Tyk users, contributors, and anyone interested in our commitment to inclusive language within Tyk's documentation and product interfaces.

## Introduction
We are excited to announce the launch of our *Inclusive Naming* project, in June 2024, dedicated to updating our documentation and aligning with the [Inclusive Naming Initiative (INI)](https://inclusivenaming.org). This initiative reflects our commitment to fostering an inclusive and respectful environment for our users and within our company.

The [Inclusive Naming Initiative](https://inclusivenaming.org/) is a community-driven effort to promote and standardize the use of inclusive language in software and documentation. By adhering to their guidelines, we aim to eliminate terms that can be considered exclusionary, offensive, or insensitive and replace them with language that is respectful and welcoming to all.

---

## Purpose

Our commitment to diversity, equity, and inclusion is foundational to our values. By updating our documentation to comply with the *Inclusive Naming Initiative (INI)*, we are taking a significant step towards ensuring that our language reflects our dedication to inclusivity. This project will help us:

- **Create a more welcoming environment**: By using inclusive language, we create a space where everyone feels valued and respected.
- **Enhance accessibility**: Clear and inclusive documentation improves accessibility for all users, regardless of their background or identity.

---

## Tier 1 word list

INI sorts terms into word lists, considering both the severity of the term and the level of scrutiny it has received. [INI Tier 1 words](https://inclusivenaming.org/word-lists/tier-1) are considered critical and are recommended to be replaced immediately.

INI has identified that terms included in this list have one or all of the following attributes:

- Strong social consensus within the software development community on replacements
- Are identified by the INI as high-severity terms in need of immediate replacement
- Terms where the impact of change or removal is low: for example, there is little entanglement in low-level systems or standardized language set by standards bodies
- Have passed through all the review stages in Tiers 2 and 3

---

## Phase #1: Review of Tyk Documentation for Tier 1 Words

An initial review of the Tyk documentation was conducted in April 2024 to check which tier 1 words can be replaced, which can't, and why.

### Findings and planning
The main findings of the review are:

1. **Explanatory content with INI tier 1 words**: The content on these pages can be easily rephrased and is now completed.
2. **Configuration parameters containing INI tier 1 words**:
   - Some *INI tier 1 words* are embedded in the code as part of the name of parameters, fields, and keywords.
   - These words are sourced from Tyk products, and third-party libraries, and tooling, e.g. Redis.
   - Possible actions:
     - Being part of the source code, we can't simply rephrase and use a different terminology. Such change requires following a deprecation process to ensure there are no breaking changes for our users.
     - For now, we can minimize their usage and rephrase the explanatory content to use inclusive words.

   
## Phase #2: Removing Tier 1 words from Tyk documentation

In June 2024, based on the review we executed the planned changes to the content in our [documentation](https://github.com/tykTechnologies/tyk-docs/).

### Status update
This is the update on the status of our documentation
1. **Regular explanatory content with INI tier 1 words**: Content in the documentation has been rephrased and the work is now completed. 
2. **Configuration parameters containing INI tier 1 words**: These words are still in our docs, however, we minimized their usage and rephrased their explanatory content to use inclusive words.
   - **Tyk products**: These words are still in our docs, however, Tyk aims to gradually replace them (in a backward-compatible way) and update the docs accordingly.
   - **Third-party and dependencies**: There's nothing much we can do at the moment except wait for them to replace these parameters, however, we are committed to updating our docs once this gets done.

### List of configuration parameters containing INI tier 1 word
For your records, the following sections highlight the existing *INI tier 1 words* in our docs, per Tyk component:

#### Tyk Gateway

##### Config parameters
- [allow_master_keys]({{< ref "tyk-oss-gateway/configuration#allow_master_keys" >}})
- [analytics_storage.master_name]({{< ref "tyk-oss-gateway/configuration#analytics_storagemaster_name" >}})
- [cache_storage.master_name]({{< ref "tyk-oss-gateway/configuration#cache_storagemaster_name" >}})
- [storage.master_name]({{< ref "tyk-oss-gateway/configuration#storagemaster_name" >}})
- [slave_options]({{< ref "tyk-oss-gateway/configuration#slave_options" >}})
- [blacklisted_ips]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [disable_ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})
- [enable_ip_blacklisting]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})

##### Tyk Classic API Definition {#gw-classic-api-definition}

The [Tyk Gateway OpenAPI Document](https://github.com/TykTechnologies/tyk-docs/blob/master/tyk-docs/assets/others/gateway-swagger.yml) (Tyk Gateway swagger), includes references to the following Tyk Classic API Definition parameters:

- [version_data.versions.{version-name}.extended_paths.black_list]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic#tyk-classic" >}}). There is also a parameter with equivalent functionality under the `paths` object (`version_data.versions.{version_name}.paths.black_list`).
- [version_data.versions.{version-name}.extended_paths.white_list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-tyk-classic-api-definition" >}}). There is also a parameter with equivalent functionality under the `paths` object (`version_data.versions.{version_name}.paths.while_list`).


#### Tyk Dashboard

##### Config parameters
- [enable_master_keys]({{< ref "tyk-dashboard/configuration#enable_master_keys" >}})
- [redis_master_name]({{< ref "tyk-dashboard/configuration#redis_master_name" >}})

##### Tyk Classic API Definition 

The [Tyk Dashboard OpenAPI Document](https://github.com/TykTechnologies/tyk-docs/blob/master/tyk-docs/assets/others/dashboard-swagger.yml) (Tyk Dashboard swagger), contains references to [the parameters from the above Tyk Classic API Definition list]({{< ref "#gw-classic-api-definition" >}}).

##### Dashboard UI

The Tyk Classic APIs *Endpoint Designer* shows configuration of [blacklist]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic#configuring-the-block-list-in-the-api-designer" >}}) and [whitelist]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) middleware plugins.
    
#### Tyk MDCB

The following MDCB configuration parameters contain tier 1 word occurrences:
- [analytics_storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#analytics_storagemaster_name" >}})
- [storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#storagemaster_name" >}})

#### Tyk Pump

The following Tyk Pump configuration parameters contain tier 1 word occurrences:
- [analytics_storage_config.master_name]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configmaster_name" >}})

#### Third-party dependencies 

Content contains *INI Tier 1 word* occurrences due to the following external dependencies:
- Links to Tyk Component GitHub repositories with a default branch set as `master`. 
- Tyk Gateway and Tyk Pump content use Redis terminology for `master` in relation to key storage and analytics. 
- Tyk Classic Developer Portal provides [documentation]({{< ref "tyk-developer-portal/tyk-portal-classic/keycloak-dcr" >}}) that explains how to integrate Tyk with Keycloak using the [OpenID Connect Dynamic Client Registration](https://tools.ietf.org/html/rfc7591) protocol. The example in the guide uses the Keycloak default `master` realm.
- Tyk Bitnami Helm charts use a service with a DNS name of *tyk-redis-master.tyk.svc*.

---
