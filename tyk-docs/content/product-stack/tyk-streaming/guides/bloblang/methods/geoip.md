---
title: GeoIP Methods
description: Explains Bloblang GeoIP Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "GeoIP", "Methods" ]
---

GeoIP methods provide a powerful way to obtain geographical and network-related information associated with IP addresses by querying MaxMind database files. This document details the various Bloblang methods used to look up IP addresses and retrieve information such as anonymous IP data, ASN (Autonomous System Number), city, connection type, country, domain, enterprise, and ISP (Internet Service Provider) details.

## geoip_anonymous_ip

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the anonymous IP associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_asn

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the ASN associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_city

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the city associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_connection_type

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the connection type associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_country

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the country associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_domain

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the domain associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_enterprise

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the enterprise associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

## geoip_isp

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the ISP associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  
