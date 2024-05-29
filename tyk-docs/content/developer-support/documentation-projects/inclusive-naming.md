---
title: "Inclusive Naming Initative"
date: 2024-05-17T15:51:00+01:00
tags: [ "Inclusive Naming Initiative", "Inclusivity", "Inclusive" ]
description: "Explains the inclusive naming initative in relation to Tyk docs"
---

We are announcing the *Inclusive Naming* project aimed at updating our documentation to comply with Tier 1 words of the [Inclusive Naming Initiative (INI)](https://inclusivenaming.org/). This initiative is part of our ongoing commitment to foster an inclusive and respectful environment within our company and for our users.

The [Inclusive Naming Initiative](https://inclusivenaming.org/) is a community-driven effort to promote and standardise the use of inclusive language in software and documentation. By adhering to the guidelines, we aim to eliminate terms that can be considered exclusionary, offensive or insensitive and replace them with language that is respectful and welcoming to all.

---

## Purpose

Our commitment to diversity, equity and inclusion is foundational to our values. By updating our documentation to comply with Inclusive Naming Initiative (INI) Tier 1 [words](https://inclusivenaming.org/word-lists/tier-1), we are taking a significant step towards ensuring that our language reflects our dedication to inclusivity. This project will help us:

- **Create a more welcoming environment**: By using inclusive language, we create a space where everyone feels valued and respected.
- **Enhance accessibility**: Clear and inclusive documentation improves accessibility for all users, regardless of their background or identity.

---

## Tier 1 Words

### What is Tier 1 
The inclusive naming initiative sorts terms into word lists, considering both the severity of the term and the level of scrutiny it has received. Tier 1 [words](https://inclusivenaming.org/word-lists/tier-1) are considered critical and are recommended to be replaced immediately.

Terms included in this list have one or all of the following:

- Strong social consensus within the software development community on replacements
- Are identified by the Inclusive Naming Initiative as high-severity terms in need of immediate replacement
- Terms where the impact of change or removal is low: for example, there is little entanglement in low-level systems or standardised language set by standards bodies
- Have passed through all the review stages in Tiers 2 and 3

At the time of writing the following are considered as Tier 1 keywords:

- [abort](https://inclusivenaming.org/word-lists/tier-1/abort/)
- [blackhat-whitehat](https://inclusivenaming.org/word-lists/tier-1/blackhat-whitehat/)
- [cripple](https://inclusivenaming.org/word-lists/tier-1/_cripple/)
- [master](https://inclusivenaming.org/word-lists/tier-1/_master/)
- [master-slave](https://inclusivenaming.org/word-lists/tier-1/_master-slave/)
- [tribe](https://inclusivenaming.org/word-lists/tier-1/tribe/)
- [whitelist](https://inclusivenaming.org/word-lists/tier-1/whitelist/)

---

## Tier 1 Occurrences

An initial review of the Tyk documentation has been conducted and there are instances of tier 1 keywords for
*Master/Slave* and *Whitelist/Blacklist*.
 
### Master and Slave

There are instances where *master* and *slave* keywords are used within configuration parameters for the following Tyk components:

- **Tyk Dashboard Configuration**:
    - [enable_master_keys]({{< ref "tyk-dashboard/configuration#enable_master_keys" >}})
    - [redis_master_name]({{< ref "tyk-dashboard/configuration#redis_master_name" >}})
- **Tyk Gateway Configuration**:
    - [allow_master_keys]({{< ref "tyk-dashboard/configuration#enable_master_keys" >}})
    - [analytics_storage.master_name]({{< ref "tyk-oss-gateway/configuration#analytics_storagemaster_name" >}})
    - [cache_storage.master_name]({{< ref "tyk-oss-gateway/configuration#cache_storagemaster_name" >}})
    - [storage.master_name]({{< ref "tyk-oss-gateway/configuration#storagemaster_name" >}})
    - [slave_options]({{< ref "tyk-oss-gateway/configuration#slave_options" >}})
- **Tyk MDCB Configuration Parameters**:
    - [analytics_storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#analytics_storagemaster_name" >}})
    - [storage.master_name]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#storagemaster_name" >}})
- **Tyk Pump Configuration**:
    - [analytics_storage_config.master_name]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configmaster_name" >}})

Additionally, content contains instances of *master* under the following circumstances:
- Links to Tyk Component GitHub repositories with a default branch set as master. 
- Tyk Gateway and Tyk Pump content use Redis terminology for master in relation to key storage and analytics. 
- Tyk Classic Developer Portal provides [documentation]({{< ref "tyk-developer-portal/tyk-portal-classic/keycloak-dcr" >}}) that explains how to integrate Tyk with Keycloak using the [OpenID Connect Dynamic Client Registration](https://tools.ietf.org/html/rfc7591) protocol. The example in the guide uses the Keycloak default *master* realm.
- Tyk Bitnami Helm Charts use a service with a DNS name of *tyk-redis-master.tyk.svc*.

---

### Whitelist and Blacklist

Tyk Gateway has the following configuration parameters with tier 1 occurrences:

- [blacklisted_ips]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [disable_ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})
- [enable_ip_blacklisting]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [ports_whitelist]({{< ref "key-concepts/tcp-proxy#allowing-specific-ports" >}})
- [version_data.{version-name}.extended_paths.black_list]({{< ref "" >}})
- [version_data.{version-name}.extended_paths.white_list]({{< ref "" >}})

The Graphical User Interface for the Endpoint Designer of Tyk Classic APIs in Tyk Dashboard allows configuration of a [blacklist]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic#configuring-the-block-list-in-the-api-designer" >}}) and [whitelist]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) plugin.

---
